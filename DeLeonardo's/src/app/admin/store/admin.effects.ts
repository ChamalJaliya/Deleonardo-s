import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as fromAdmin from "./../store/admin.actions";
import { switchMap, map, catchError, mergeMap } from "rxjs/operators";
import { AdminService } from "../services/admin.service";
import { Recipe } from "../../recipes/models/recipe.model";
import { of } from "rxjs";
import { ShoppingListItem } from "../../shopping-list/models/shopping-list-item.model";

@Injectable()
export class AdminEffects {
  constructor(private actions$: Actions, private adminService: AdminService) {}

  @Effect()
  getUsersList$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.GET_USERS_LIST),
    switchMap(() =>
      this.adminService.getUsersList().pipe(
        map((users: any) => {
          const usersList: any[] = users.map((res: any) => {
            const key = res.payload.key;
            const user: any = res.payload.val();
            return {
              key: key,
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              providerId: user.providerId,
              photoUrl: user.photoUrl,
              isNewUser: user.isNewUser,
              isAdmin: user.isAdmin,
              isOnline: user.isOnline
            };
          });
          return new fromAdmin.UsersListFetched({ usersList });
        }),
        catchError((error: any) => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect()
  getUserRecipes$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.GET_USER_RECIPES),
    map((action: fromAdmin.GetUserRecipes) => action.payload),
    mergeMap((payload: any) =>
      this.adminService.getUserRecipes(payload.uid).pipe(
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
          return new fromAdmin.UserRecipesLoaded({
            uid: payload.uid,
            userRecipes: recipesData
          });
        }),
        catchError(error => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  deleteUserRecipe$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.DELETE_USER_RECIPE),
    map((action: fromAdmin.DeleteUserRecipe) => action.payload),
    switchMap((payload: any) =>
      this.adminService
        .deleteUserRecipe(payload.userId, payload.recipeId)
        .pipe(
          catchError((error: any) => of(new fromAdmin.AdminError({ error })))
        )
    )
  );

  @Effect()
  getUserShoppingList$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.GET_USER_SHOPPINGLIST),
    map((action: fromAdmin.GetUserShoppingList) => action.payload),
    mergeMap((payload: any) =>
      this.adminService.getUserShoppingList(payload.uid).pipe(
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
          return new fromAdmin.UserShoppingListLoaded({
            uid: payload.uid,
            userShoppingList: shoppingListData
          });
        }),
        catchError(error => of(new fromAdmin.AdminError({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  deleteUserShoppingListItem$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.DELETE_USER_SHOPPINGLISTITEM),
    map((action: fromAdmin.DeleteUserShoppingListItem) => action.payload),
    switchMap((payload: any) =>
      this.adminService
        .deleteUserShoppingListItem(payload.userId, payload.shoppingListItemId)
        .pipe(
          catchError((error: any) => of(new fromAdmin.AdminError({ error })))
        )
    )
  );

  @Effect({ dispatch: false })
  addAdminPrivileges$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.ADD_ADMIN_PRIVILEGES),
    map((action: fromAdmin.AddAdminPrivileges) => action.payload),
    switchMap((payload: any) =>
      this.adminService
        .addAdminPrivileges(payload.userId)
        .pipe(
          catchError((error: any) => of(new fromAdmin.AdminError({ error })))
        )
    )
  );

  @Effect({ dispatch: false })
  removeAdminPrivileges$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.REMOVE_ADMIN_PRIVILEGES),
    map((action: fromAdmin.RemoveAdminPrivileges) => action.payload),
    switchMap((payload: any) =>
      this.adminService
        .removeAdminPrivileges(payload.userId)
        .pipe(
          catchError((error: any) => of(new fromAdmin.AdminError({ error })))
        )
    )
  );
}
