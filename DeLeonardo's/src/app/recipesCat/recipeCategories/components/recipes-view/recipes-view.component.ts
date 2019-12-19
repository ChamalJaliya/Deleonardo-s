import { AppState } from "./../../../../reducers/index";
import { Recipe } from "./../../../../recipes/models/recipe.model";
import { ConfirmModalComponent } from "./../../../../shared/components/confirm-modal/confirm-modal.component";
import { RecipeModalComponent } from "./../../../../shared/components/recipe-modal/recipe-modal.component";
import { Component, OnInit } from "@angular/core";
import { MDBModalService, MDBModalRef } from "angular-bootstrap-md";

import { Store, select } from "@ngrx/store";
import * as fromRecipes from "../../../../recipes/store/recipes.actions";
import { Observable } from "rxjs";
import {
  getRecipes,
  getAllLoaded
} from "../../../../recipes/store/recipes.selectors";
import { take, map } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-recipes-view",
  templateUrl: "./recipes-view.component.html",
  styleUrls: ["./recipes-view.component.scss"]
})
export class RecipesViewComponent implements OnInit {
  recipes$: Observable<Recipe[] | null>;
  isLoading$: Observable<boolean>;
  modalRef: MDBModalRef;

  modalConfig = {
    class: "modal-dialog-centered"
  };

  constructor(
    private store: Store<AppState>,
    private modalService: MDBModalService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(getAllLoaded);
    this.recipes$ = this.store.pipe(
      select(getRecipes),
      map((recipes: Recipe[]) => {
        if (this.user && !recipes) {
          this.store.dispatch(new fromRecipes.RecipesQuery());
        }
        return recipes;
      })
    );
  }

  get user() {
    return this.afAuth.auth.currentUser;
  }

  openAddRecipeModal() {
    this.modalRef = this.modalService.show(
      RecipeModalComponent,
      this.modalConfig
    );

    this.modalRef.content.heading = "Add new recipe";

    this.modalRef.content.recipeData
      .pipe(take(1))
      .subscribe((recipeData: Recipe) => {
        this.store.dispatch(
          new fromRecipes.RecipeAdded({ recipe: recipeData })
        );
      });
  }

  openEditRecipeModal(recipe: Recipe) {
    this.modalRef = this.modalService.show(
      RecipeModalComponent,
      this.modalConfig
    );

    this.modalRef.content.heading = "Edit Recipe";
    const recipeCopy = { ...recipe };
    this.modalRef.content.recipe = recipeCopy;

    this.modalRef.content.recipeData
      .pipe(take(1))
      .subscribe((recipeData: Recipe) => {
        this.store.dispatch(
          new fromRecipes.RecipeEdited({ recipe: recipeData })
        );
      });
  }

  openConfirmModal(recipe: Recipe) {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(new fromRecipes.RecipeDeleted({ recipe }));
        }
      });
  }

  onRecipeDelete(recipe: Recipe) {
    this.openConfirmModal(recipe);
  }

  onRecipeEdit(recipe: Recipe) {
    this.openEditRecipeModal(recipe);
  }
}
