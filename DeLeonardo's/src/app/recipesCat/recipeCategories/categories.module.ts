import { SharedModule } from "./../../shared/shared.module";
import { MainCategoriesComponent } from "./components/main-categories/main-categories.component";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardsModule, ButtonsModule, InputsModule } from "angular-bootstrap-md";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CategoriesComponent } from "./containers/categories.component";
import { RecipesViewComponent } from "./components/recipes-view/recipes-view.component";
import { CategoryStartComponent } from "./containers/category-start/category-start.component";

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    CategoriesRoutingModule,
    CardsModule,
    ButtonsModule,
    InputsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    CategoriesComponent,
    MainCategoriesComponent,
    RecipesViewComponent,
    CategoryStartComponent
  ],
  exports: [CategoriesComponent, RecipesViewComponent, CategoryStartComponent]
})
export class CategoriesModule {}
