// import { Project } from 'src/app/projects/models/project.model';

export interface AdminState {
  usersList: any[];
  usersListLoading: boolean;
  userRecipes: any;
  userRecipesLoading: boolean;
  userShoppingList: any;
  userShoppingListLoading: boolean;
  error: any;
}

export const adminInitialState: AdminState = {
  usersList: [],
  usersListLoading: false,
  userRecipes: {},
  userRecipesLoading: false,
  userShoppingList: {},
  userShoppingListLoading: false,
  error: null
};
