import {
  shoppingListInitialState,
  ShoppingListState
} from "./shopping-list.state";
import {
  ShoppingListActions,
  ShoppingListActionTypes
} from "./shopping-list.actions";

export function shoppingListReducer(
  state = shoppingListInitialState,
  action: ShoppingListActions
): ShoppingListState {
  switch (action.type) {
    case ShoppingListActionTypes.SHOPPINGLIST_QUERY: {
      return Object.assign({}, state, {
        isLoading: true
      });
    }

    case ShoppingListActionTypes.SHOPPINGLIST_LOADED: {
      return Object.assign({}, state, {
        shoppingList: action.payload.shoppingList,
        isLoading: false
      });
    }

    case ShoppingListActionTypes.SHOPPINGLIST_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
