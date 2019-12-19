import { RecipesComponent } from "./containers/recipes.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { HttpClientModule } from "@angular/common/http";
import {
  ButtonsModule,
  InputsModule,
  CardsModule,
  WavesModule,
  IconsModule,
  ModalModule,
  CarouselModule
} from "angular-bootstrap-md";

import * as fromRecipes from "./store/recipes.reducer";
import { EffectsModule } from "@ngrx/effects";
import { RecipesEffects } from "./store/recipes.effects";
import { FormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { RecipeViewComponent } from "./containers/recipe-view/recipe-view.component";
import { RecipeStartComponent } from "./containers/recipe-start/recipe-start.component";
import { RecipeItemComponent } from "./containers/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./containers/recipe-list/recipe-list.component";
import { RelatedRecipesComponent } from "./containers/related-recipes/related-recipes.component";

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    SharedModule,
    RecipesRoutingModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,
    ButtonsModule,
    InputsModule,
    WavesModule,
    IconsModule,
    CardsModule,
    StoreModule.forFeature("recipes", fromRecipes.recipesReducer),
    EffectsModule.forFeature([RecipesEffects])
  ],
  declarations: [
    RecipesComponent,
    RecipeViewComponent,
    RecipeStartComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RelatedRecipesComponent
  ],
  exports: [RecipesComponent, RecipeStartComponent, RecipeListComponent]
})
export class RecipesModule {}
