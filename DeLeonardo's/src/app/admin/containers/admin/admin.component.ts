import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../../app/reducers";

import * as fromAdmin from "../../store/admin.actions";
import { Observable } from "rxjs";
import {
  getUsersList,
  getUserRecipes,
  getSelectedUser,
  getUsersListLoading,
  getUserRecipesLoading,
  getUserShoppingList,
  getUserShoppingListLoading
} from "../../store/admin.selectors";
import { Recipe } from "../../../recipes/models/recipe.model";
import { User } from "../../../auth/models/user.model";
import { map, delay, take } from "rxjs/operators";
import { MDBModalService, MDBModalRef } from "angular-bootstrap-md";
import { ConfirmModalComponent } from "../../../shared/components/confirm-modal/confirm-modal.component";
import { ShoppingListItem } from "../../../shopping-list/models/shopping-list-item.model";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private modalService: MDBModalService
  ) {}

  users$: Observable<any>;
  userRecipes$: Observable<Recipe[]>;
  userShoppingList$: Observable<ShoppingListItem[]>;
  usersListLoading$: Observable<boolean>;
  userRecipesLoading$: Observable<boolean>;
  userShoppingListLoading$: Observable<boolean>;
  selectedUser$: Observable<any>;
  selectedUser: any;
  uid: any;

  private modalRef: MDBModalRef;

  modalConfig = {
    class: "modal-dialog-centered"
  };

  ngOnInit() {
    this.users$ = this.store.pipe(
      select(getUsersList),
      delay(0),
      map((users: User[]) => {
        if (!users || (users && users.length === 0)) {
          this.store.dispatch(new fromAdmin.GetUsersList());
        }
        return users;
      })
    );
    this.usersListLoading$ = this.store.select(getUsersListLoading);
    this.userRecipesLoading$ = this.store.select(getUserRecipesLoading);
    this.userShoppingListLoading$ = this.store.select(
      getUserShoppingListLoading
    );
  }

  onUserSelect(user: any) {
    this.uid = user.uid;
    this.selectedUser = user;
    this.selectedUser$ = this.store.select(getSelectedUser, user.uid);
    this.userRecipes$ = this.store.select(getUserRecipes, user.uid).pipe(
      map(recipes => {
        if (recipes && recipes.length !== 0) {
          return recipes;
        } else {
          return null;
        }
      })
    );

    this.userShoppingList$ = this.store
      .select(getUserShoppingList, user.uid)
      .pipe(
        map(shoppingList => {
          if (shoppingList && shoppingList.length !== 0) {
            return shoppingList;
          } else {
            return null;
          }
        })
      );
  }

  onRecipesLoad() {
    this.store.dispatch(new fromAdmin.GetUserRecipes({ uid: this.uid }));
  }

  onShoppingListLoad() {
    this.store.dispatch(new fromAdmin.GetUserShoppingList({ uid: this.uid }));
  }

  onDetailsClose() {
    this.selectedUser = null;
  }

  openRecipeConfirmModal(recipe: Recipe) {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(
            new fromAdmin.DeleteUserRecipe({
              userId: this.selectedUser.key,
              recipeId: recipe.key
            })
          );
        }
      });
  }

  openShoppingListItemConfirmModal(shoppingListItem: ShoppingListItem) {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(
            new fromAdmin.DeleteUserShoppingListItem({
              userId: this.selectedUser.key,
              shoppingListItemId: shoppingListItem.key
            })
          );
        }
      });
  }

  onShoppingListItemDelete(shoppingListItem: ShoppingListItem) {
    this.openShoppingListItemConfirmModal(shoppingListItem);
  }

  onRecipeDelete(recipe: Recipe) {
    this.openRecipeConfirmModal(recipe);
  }

  addAdminPrivileges(user: any) {
    this.store.dispatch(new fromAdmin.AddAdminPrivileges({ userId: user.key }));
  }

  removeAdminPrivileges(user: any) {
    this.store.dispatch(
      new fromAdmin.RemoveAdminPrivileges({ userId: user.key })
    );
  }
}
