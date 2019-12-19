import { Action } from "@ngrx/store";
import { ShoppingListItem } from "../models/shopping-list-item.model";

export enum ShoppingListActionTypes {
  SHOPPINGLIST_QUERY = "[ShoppingList] Query",
  SHOPPINGLIST_LOADED = "[ShoppingList] Fetched",

  SHOPPINGLIST_ADDED = "[ShoppingList] Added",
  SHOPPINGLIST_EDITED = "[ShoppingList] Edited",
  SHOPPINGLIST_DELETED = "[ShoppingList] Deleted",

  SHOPPINGLIST_ERROR = "[ShoppingList] Error"
}

export class ShoppingListQuery implements Action {
  readonly type = ShoppingListActionTypes.SHOPPINGLIST_QUERY;
}

export class ShoppingListLoaded implements Action {
  readonly type = ShoppingListActionTypes.SHOPPINGLIST_LOADED;

  constructor(public payload: { shoppingList: ShoppingListItem[] }) {}
}

export class ShoppingListAdded implements Action {
  readonly type = ShoppingListActionTypes.SHOPPINGLIST_ADDED;

  constructor(public payload: { shoppingListItem: ShoppingListItem }) {}
}

export class ShoppingListEdited implements Action {
  readonly type = ShoppingListActionTypes.SHOPPINGLIST_EDITED;

  constructor(public payload: { shoppingListItem: ShoppingListItem }) {}
}

export class ShoppingListDeleted implements Action {
  readonly type = ShoppingListActionTypes.SHOPPINGLIST_DELETED;

  constructor(public payload: { shoppingListItem: ShoppingListItem }) {}
}

export class ShoppingListError implements Action {
  readonly type = ShoppingListActionTypes.SHOPPINGLIST_ERROR;

  constructor(public payload: { error: any }) {}
}

export type ShoppingListActions =
  | ShoppingListQuery
  | ShoppingListLoaded
  | ShoppingListAdded
  | ShoppingListEdited
  | ShoppingListDeleted
  | ShoppingListError;
