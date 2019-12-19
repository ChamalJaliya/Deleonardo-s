import { Action } from "@ngrx/store";
import { Recipe } from "../models/recipe.model";

export enum RecipesActionTypes {
  RECIPES_QUERY = "[Recipes] Recipes query",
  RECIPES_LOADED = "[Recipes] Recipes loaded",

  RECIPE_ADDED = "[Recipes] Recipe added",

  RECIPE_EDITED = "[Recipes] Recipe edited",
  RECIPE_DELETED = "[Recipes]  Recipe deleted",

  RECIPES_ERROR = "[Recipes] Recipes error"
}

export class RecipesQuery implements Action {
  readonly type = RecipesActionTypes.RECIPES_QUERY;
}

export class RecipesLoaded implements Action {
  readonly type = RecipesActionTypes.RECIPES_LOADED;

  constructor(public payload: { recipes: Recipe[] }) {}
}

export class RecipeAdded implements Action {
  readonly type = RecipesActionTypes.RECIPE_ADDED;

  constructor(public payload: { recipe: Recipe }) {}
}

export class RecipeEdited implements Action {
  readonly type = RecipesActionTypes.RECIPE_EDITED;

  constructor(public payload: { recipe: Recipe }) {}
}

export class RecipeDeleted implements Action {
  readonly type = RecipesActionTypes.RECIPE_DELETED;

  constructor(public payload: { recipe: Recipe }) {}
}

export class RecipesError implements Action {
  readonly type = RecipesActionTypes.RECIPES_ERROR;

  constructor(public payload: { error: any }) {}
}

export type RecipesActions =
  | RecipesQuery
  | RecipesLoaded
  | RecipeAdded
  | RecipeEdited
  | RecipeDeleted
  | RecipesError;
