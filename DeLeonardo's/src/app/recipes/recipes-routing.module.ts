import { RecipeViewComponent } from "./containers/recipe-view/recipe-view.component";
import { RecipeStartComponent } from "./containers/recipe-start/recipe-start.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "./containers/recipes.component";

const routes: Routes = [
  {
    path: "",
    component: RecipeStartComponent,
    children: [
      { path: "", component: RecipesComponent },
      { path: ":id", component: RecipeViewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
