import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { environment } from "../../../environments/environment";
import { AngularFireDatabase } from "@angular/fire/database";
import { of } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class RecipesService {
  url = environment.firebase.databaseURL;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {}

  get userId() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    }
  }

  add(recipe: Recipe, userId: string) {
    const recipes = this.db.list(`recipes/${userId}`);
    return recipes.push(recipe);
  }

  addRecipes(recipes: Recipe[]) {
    const userId = this.userId;
    recipes.forEach((recipe: Recipe) => {
      this.db.list(`recipes/${userId}`).push(recipe);
    });
  }

  get(userId: string) {
    return this.db.list(`recipes/${userId}`).snapshotChanges();
  }

  update(recipe: Recipe, userId: string) {
    return of(
      this.db.object(`recipes/${userId}/` + recipe.key).update({
        title: recipe.title,
        description: recipe.description,
        photoUrl: recipe.photoUrl
      })
    );
  }

  delete(recipe: Recipe, userId: string) {
    return this.db.object(`recipes/${userId}/` + recipe.key).remove();
  }
  getRecipe(userId: string, recipe: Recipe) {
    return this.db.object(`recipes/${userId}/` + recipe.key).snapshotChanges();
  }
}
