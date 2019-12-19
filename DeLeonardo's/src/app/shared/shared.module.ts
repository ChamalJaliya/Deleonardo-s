import { ShoppingListModalComponent } from "./components/shopping-list-modal/shopping-list-modal.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmModalComponent } from "./components/confirm-modal/confirm-modal.component";
import {
  ButtonsModule,
  InputsModule,
  CardsModule,
  InputUtilitiesModule,
  IconsModule
} from "angular-bootstrap-md";

import { FormsModule } from "@angular/forms";
import { RecipeModalComponent } from "./components/recipe-modal/recipe-modal.component";
import { RecipesListComponent } from "./components/recipes-list/recipes-list.component";
import { RecipeComponent } from "./components/recipe/recipe.component";
import { ShoppingListListComponent } from "./components/shopping-list-list/shopping-list-list.component";

@NgModule({
  declarations: [
    ConfirmModalComponent,
    ShoppingListModalComponent,
    RecipeModalComponent,
    RecipesListComponent,
    RecipeComponent,
    ShoppingListListComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    InputUtilitiesModule,
    IconsModule,
    FormsModule,
    ButtonsModule,
    CardsModule
  ],
  exports: [RecipesListComponent, RecipeComponent, ShoppingListListComponent],
  providers: [],
  entryComponents: [
    ConfirmModalComponent,
    ShoppingListModalComponent,
    RecipeModalComponent
  ]
})
export class SharedModule {}
