import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { RecipesActionTypes } from "./recipes.actions";
import { Store, select } from "@ngrx/store";
import { map, switchMap, catchError, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../models/recipe.model";
import { of } from "rxjs";
import { RecipesService } from "../services/recipes.service";

import * as fromRecipes from "./../store/recipes.actions";
import { AppState } from "../../reducers/index";
import { getUser } from "../../auth/store/auth.selectors";

@Injectable()
export class RecipesEffects {
  constructor(
    private actions$: Actions,
    private recipesService: RecipesService,
    private store: Store<AppState>
  ) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(RecipesActionTypes.RECIPES_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => {
      return this.recipesService.get(user.uid).pipe(
        map((data: any) => {
          const recipesData: Recipe[] = data.map((res: any) => {
            const key = res.payload.key;
            const recipe: Recipe = res.payload.val();
            return {
              key: key || null,
              title: recipe.title || null,
              description: recipe.description || null,
              photoUrl: recipe.photoUrl || null
            };
          });
          return new fromRecipes.RecipesLoaded({ recipes: recipesData });
        }),
        catchError(error => of(new fromRecipes.RecipesError({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(RecipesActionTypes.RECIPE_ADDED),
    map((action: fromRecipes.RecipeAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.recipesService.add(payload.recipe, user.uid)
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(RecipesActionTypes.RECIPE_DELETED),
    map((action: fromRecipes.RecipeDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.recipesService.delete(payload.recipe, user.uid)
    )
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(RecipesActionTypes.RECIPE_EDITED),
    map((action: fromRecipes.RecipeEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.recipesService.update(payload.recipe, user.uid)
    )
  );
}
