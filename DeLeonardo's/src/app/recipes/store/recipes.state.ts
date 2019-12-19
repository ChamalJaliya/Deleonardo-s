import { Recipe } from "../models/recipe.model";

export interface RecipesState {
  recipes: Recipe[] | null;
  loading: boolean;
  error: any;
}

export const recipesInitialState: RecipesState = {
  recipes: null,
  loading: false,
  error: null
};
