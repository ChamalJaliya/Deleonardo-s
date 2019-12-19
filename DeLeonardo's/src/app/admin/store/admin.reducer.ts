import { adminInitialState, AdminState } from "./admin.state";
import { AdminActions, AdminActionTypes } from "./admin.actions";

export function adminReducer(
  state = adminInitialState,
  action: AdminActions
): AdminState {
  switch (action.type) {
    case AdminActionTypes.GET_USERS_LIST: {
      return Object.assign({}, state, {
        usersListLoading: true
      });
    }

    case AdminActionTypes.USERS_LIST_FETCHED: {
      return Object.assign({}, state, {
        usersList: action.payload.usersList,
        usersListLoading: false
      });
    }

    case AdminActionTypes.GET_USER_RECIPES: {
      return Object.assign({}, state, {
        userRecipesLoading: true
      });
    }

    case AdminActionTypes.USERS_RECIPES_LOADED: {
      return Object.assign({}, state, {
        userRecipes: {
          ...state.userRecipes,
          [action.payload.uid]: action.payload.userRecipes
        },
        userRecipesLoading: false
      });
    }

    case AdminActionTypes.GET_USER_SHOPPINGLIST: {
      return Object.assign({}, state, {
        userShoppingListLoading: true
      });
    }

    case AdminActionTypes.USERS_SHOPPINGLIST_LOADED: {
      return Object.assign({}, state, {
        userShoppingList: {
          ...state.userShoppingList,
          [action.payload.uid]: action.payload.userShoppingList
        },
        userShoppingListLoading: false
      });
    }

    case AdminActionTypes.ADMIN_ERROR: {
      return Object.assign({}, state, {
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
