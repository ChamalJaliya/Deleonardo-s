import { createSelector, createFeatureSelector } from "@ngrx/store";
// import { AppState } from '../../reducers/index';
import { RecipesState } from "./recipes.state";

export const getRecipesState = createFeatureSelector<RecipesState>("recipes");

export const getRecipes = createSelector(
  getRecipesState,
  recipes => recipes.recipes
);

export const getAllLoaded = createSelector(
  getRecipesState,
  recipes => recipes.loading
);

export const getError = createSelector(
  getRecipesState,
  recipes => recipes.error
);
