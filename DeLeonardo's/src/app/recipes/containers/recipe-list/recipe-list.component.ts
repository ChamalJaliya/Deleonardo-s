import { AppState } from "./../../../reducers/index";
import { Recipe } from "./../../models/recipe.model";
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";

import * as fromRecipes from "../../store/recipes.actions";
import { Observable } from "rxjs";
import { getRecipes, getAllLoaded } from "../../store/recipes.selectors";
import { map } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"]
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[] | null>;
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(getAllLoaded);
    this.recipes$ = this.store.pipe(
      select(getRecipes),
      map((recipes: Recipe[]) => {
        if (this.user && !recipes) {
          this.store.dispatch(new fromRecipes.RecipesQuery());
        }
        return recipes;
      })
    );
  }

  get user() {
    return this.afAuth.auth.currentUser;
  }
}
