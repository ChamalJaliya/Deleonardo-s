import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { ShoppingListItem } from "../models/shopping-list-item.model";
import { of } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class ShoppingListService {
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {}

  get userId() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    }
  }

  add(shoppingListItem: ShoppingListItem, userId: string) {
    const shoppingList = this.db.list(`shoppingList/${userId}`);
    return shoppingList.push(shoppingListItem);
  }

  addshoppingList(shoppingList: ShoppingListItem[]) {
    const userId = this.userId;

    if (userId) {
      shoppingList.forEach((shoppingListItem: ShoppingListItem) => {
        this.db.list(`shoppingList/${userId}`).push(shoppingListItem);
      });
    }
  }

  get(userId: string) {
    return this.db.list(`shoppingList/${userId}`).snapshotChanges();
  }

  update(shoppingListItem: ShoppingListItem, userId: string) {
    return of(
      this.db.object(`shoppingList/${userId}/` + shoppingListItem.key).update({
        id: shoppingListItem.id,
        name: shoppingListItem.name,
        description: shoppingListItem.description
      })
    );
  }

  delete(shoppingListItem: ShoppingListItem, userId: string) {
    return this.db
      .object(`shoppingList/${userId}/` + shoppingListItem.key)
      .remove();
  }
}
