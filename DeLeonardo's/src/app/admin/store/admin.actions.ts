import { Action } from "@ngrx/store";
import { Recipe } from "../../recipes/models/recipe.model";
import { ShoppingListItem } from "../../shopping-list/models/shopping-list-item.model";

export enum AdminActionTypes {
  GET_USERS_LIST = "[Admin] Get Users List",
  USERS_LIST_FETCHED = "[Admin] Users list fetched",

  GET_USER_RECIPES = "[Admin] Get user recipes",
  USERS_RECIPES_LOADED = "[Admin] User recipes loaded",
  DELETE_USER_RECIPE = "[Admin] Delete user recipe",

  GET_USER_SHOPPINGLIST = "[Admin] Get user shoppingList",
  USERS_SHOPPINGLIST_LOADED = "[Admin] User shoppingList loaded",
  DELETE_USER_SHOPPINGLISTITEM = "[Admin] Delete user shoppingListItem",

  ADD_ADMIN_PRIVILEGES = "[Admin] Add admin privileges",
  REMOVE_ADMIN_PRIVILEGES = "[Admin] Remove admin privileges",

  ADMIN_ERROR = "[Admin] Error"
}

export class GetUsersList implements Action {
  readonly type = AdminActionTypes.GET_USERS_LIST;
}

export class UsersListFetched implements Action {
  readonly type = AdminActionTypes.USERS_LIST_FETCHED;

  constructor(public payload: { usersList: any[] }) {}
}

export class GetUserRecipes implements Action {
  readonly type = AdminActionTypes.GET_USER_RECIPES;

  constructor(public payload: { uid: string }) {}
}

export class DeleteUserRecipe implements Action {
  readonly type = AdminActionTypes.DELETE_USER_RECIPE;

  constructor(public payload: { userId: string; recipeId: string }) {}
}

export class UserRecipesLoaded implements Action {
  readonly type = AdminActionTypes.USERS_RECIPES_LOADED;

  constructor(public payload: { uid: string; userRecipes: Recipe[] }) {}
}

export class GetUserShoppingList implements Action {
  readonly type = AdminActionTypes.GET_USER_SHOPPINGLIST;

  constructor(public payload: { uid: string }) {}
}

export class DeleteUserShoppingListItem implements Action {
  readonly type = AdminActionTypes.DELETE_USER_SHOPPINGLISTITEM;

  constructor(public payload: { userId: string; shoppingListItemId: string }) {}
}

export class UserShoppingListLoaded implements Action {
  readonly type = AdminActionTypes.USERS_SHOPPINGLIST_LOADED;

  constructor(
    public payload: { uid: string; userShoppingList: ShoppingListItem[] }
  ) {}
}

export class AddAdminPrivileges implements Action {
  readonly type = AdminActionTypes.ADD_ADMIN_PRIVILEGES;

  constructor(public payload: { userId: string }) {}
}

export class RemoveAdminPrivileges implements Action {
  readonly type = AdminActionTypes.REMOVE_ADMIN_PRIVILEGES;

  constructor(public payload: { userId: string }) {}
}

export class AdminError implements Action {
  readonly type = AdminActionTypes.ADMIN_ERROR;

  constructor(public payload: { error: any }) {}
}

export type AdminActions =
  | GetUsersList
  | UsersListFetched
  | GetUserRecipes
  | UserRecipesLoaded
  | DeleteUserRecipe
  | GetUserShoppingList
  | UserShoppingListLoaded
  | DeleteUserShoppingListItem
  | AddAdminPrivileges
  | RemoveAdminPrivileges
  | AdminError;
