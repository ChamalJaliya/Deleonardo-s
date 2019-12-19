import { ShoppingListItem } from "../models/shopping-list-item.model";

export interface ShoppingListState {
  shoppingList: ShoppingListItem[] | null;
  isLoading: boolean;
  error: any;
}

export const shoppingListInitialState: ShoppingListState = {
  shoppingList: null,
  isLoading: true,
  error: null
};
