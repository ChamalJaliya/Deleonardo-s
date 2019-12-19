import { createSelector } from "@ngrx/store";
import { AppState } from "../../reducers/index";

export const getAdminState = (state: AppState) => state.admin;

export const getUsersList = createSelector(
  getAdminState,
  admin => admin.usersList
);

export const getUsersListLoading = createSelector(
  getAdminState,
  admin => admin.usersListLoading
);

export const getSelectedUser = createSelector(
  getUsersList,
  (usersList: any, uid: string) =>
    usersList.filter((user: any) => user.uid === uid)[0]
);

export const getUserRecipes = createSelector(
  getAdminState,
  (admin: any, uid: string) => {
    if (admin.userRecipes.hasOwnProperty(uid)) {
      return admin.userRecipes[uid];
    } else {
      return null;
    }
  }
);

export const getUserShoppingList = createSelector(
  getAdminState,
  (admin: any, uid: string) => {
    if (admin.userShoppingList.hasOwnProperty(uid)) {
      return admin.userShoppingList[uid];
    } else {
      return null;
    }
  }
);

export const getUserRecipesLoading = createSelector(
  getAdminState,
  admin => admin.userRecipesLoading
);

export const getUserShoppingListLoading = createSelector(
  getAdminState,
  admin => admin.userShoppingListLoading
);
