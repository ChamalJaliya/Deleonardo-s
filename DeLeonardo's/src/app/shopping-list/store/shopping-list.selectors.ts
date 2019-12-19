import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ShoppingListState } from "./shopping-list.state";

export const getShoppingListState = createFeatureSelector<ShoppingListState>(
  "shoppingList"
);

export const getShoppingList = createSelector(
  getShoppingListState,
  shoppingList => shoppingList.shoppingList
);

export const getIsLoading = createSelector(
  getShoppingListState,
  shoppingList => shoppingList.isLoading
);

export const getError = createSelector(
  getShoppingListState,
  shoppingList => shoppingList.error
);
