import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ShoppingListService } from "../services/shopping-list.service";
import { ShoppingListActionTypes } from "./shopping-list.actions";
import { switchMap, map, catchError, withLatestFrom } from "rxjs/operators";
import { ShoppingListItem } from "../models/shopping-list-item.model";

import * as fromShoppingList from "./shopping-list.actions";
import { of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers/index";
import { getUser } from "../../auth/store/auth.selectors";

@Injectable()
export class ShoppingListEffects {
  constructor(
    private actions$: Actions,
    private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(ShoppingListActionTypes.SHOPPINGLIST_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) =>
      this.shoppingListService.get(user.uid).pipe(
        map((data: any) => {
          const shoppingListData: ShoppingListItem[] = data.map((res: any) => {
            const key = res.payload.key;
            const shoppingListItem: ShoppingListItem = res.payload.val();
            return {
              key: key,
              id: shoppingListItem.id,
              name: shoppingListItem.name,
              description: shoppingListItem.description
            };
          });
          return new fromShoppingList.ShoppingListLoaded({
            shoppingList: shoppingListData
          });
        }),
        catchError(error => {
          return of(new fromShoppingList.ShoppingListError({ error }));
        })
      )
    )
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(ShoppingListActionTypes.SHOPPINGLIST_ADDED),
    map((action: fromShoppingList.ShoppingListAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.shoppingListService.add(payload.shoppingListItem, user.uid)
    )
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(ShoppingListActionTypes.SHOPPINGLIST_EDITED),
    map((action: fromShoppingList.ShoppingListEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.shoppingListService.update(payload.shoppingListItem, user.uid).pipe(
        catchError(error => {
          return of(new fromShoppingList.ShoppingListError({ error }));
        })
      )
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(ShoppingListActionTypes.SHOPPINGLIST_DELETED),
    map((action: fromShoppingList.ShoppingListDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.shoppingListService.delete(payload.shoppingListItem, user.uid)
    )
  );
}
