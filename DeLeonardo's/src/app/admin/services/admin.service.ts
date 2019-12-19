import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { from, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(private db: AngularFireDatabase) {}

  selectedUser = new Subject();
  selectedUser$ = this.selectedUser.asObservable();

  getUsersList() {
    const usersRef = this.db.list("users");
    return usersRef.snapshotChanges();
  }

  getUserRecipes(uid: string) {
    const recipesRef = this.db.list("recipes/" + uid);
    return recipesRef.snapshotChanges();
  }

  getUserShoppingList(uid: string) {
    const shoppingListRef = this.db.list("shoppingList/" + uid);
    return shoppingListRef.snapshotChanges();
  }

  checkAdminRole(uid: string) {
    return this.db.object("admins/" + uid).valueChanges();
  }

  deleteUserRecipe(uid: string, recipeId: string) {
    return from(this.db.object(`recipes/${uid}/` + recipeId).remove());
  }

  deleteUserShoppingListItem(uid: string, shoppingListItemId: string) {
    return from(
      this.db.object(`shoppingList/${uid}/` + shoppingListItemId).remove()
    );
  }

  addAdminPrivileges(uid: string) {
    const adminsRef = this.db.object("admins/" + uid);
    this.db.object("users/" + uid).update({ isAdmin: true });
    return from(adminsRef.set(true));
  }

  removeAdminPrivileges(uid: string) {
    this.db.object("users/" + uid).update({ isAdmin: false });
    return from(this.db.object("admins/" + uid).remove());
  }
}
