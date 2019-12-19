import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";
import {
  ButtonsModule,
  InputsModule,
  TableModule,
  IconsModule,
  ModalModule
} from "angular-bootstrap-md";

import * as fromShoppingList from "./store/shopping-list.reducer";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../shared/shared.module";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListEffects } from "./store/shopping-list.effects";
import { ShoppingListComponent } from "./containers/shopping-list.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ShoppingListRoutingModule,
    ModalModule,
    FormsModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    TableModule,
    StoreModule.forFeature(
      "shoppingList",
      fromShoppingList.shoppingListReducer
    ),
    EffectsModule.forFeature([ShoppingListEffects])
  ],
  declarations: [ShoppingListComponent],
  exports: [ShoppingListComponent]
})
export class ShoppingListModule {}
