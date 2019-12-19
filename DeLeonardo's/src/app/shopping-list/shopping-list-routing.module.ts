import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./containers/shopping-list.component";

const routes: Routes = [{ path: "", component: ShoppingListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {}
