import { CategoryStartComponent } from "./containers/category-start/category-start.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoriesComponent } from "./containers/categories.component";
import { RecipesViewComponent } from "./components/recipes-view/recipes-view.component";

const routes: Routes = [
  {
    path: "",
    component: CategoryStartComponent,
    children: [
      { path: "", component: CategoriesComponent },
      { path: ":id", component: RecipesViewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
