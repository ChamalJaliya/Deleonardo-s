import { RecipesActions, RecipesActionTypes } from "./recipes.actions";
import { recipesInitialState, RecipesState } from "./recipes.state";

export function recipesReducer(
  state = recipesInitialState,
  action: RecipesActions
): RecipesState {
  switch (action.type) {
    case RecipesActionTypes.RECIPES_QUERY: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case RecipesActionTypes.RECIPES_LOADED: {
      return Object.assign({}, state, {
        recipes: action.payload.recipes,
        loading: false
      });
    }

    case RecipesActionTypes.RECIPES_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
