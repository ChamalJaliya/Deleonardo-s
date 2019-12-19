import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";
import { User } from "../../../auth/models/user.model";
import { Recipe } from "../../../recipes/models/recipe.model";
import { ShoppingListItem } from "../../../shopping-list/models/shopping-list-item.model";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Input() recipes: Recipe[];
  @Input() shoppingList: ShoppingListItem[];
  @Input() userRecipesLoading: boolean;
  @Input() userShoppingListLoading: boolean;
  @Output() detailsClosed = new EventEmitter<any>();
  @Output() recipesLoad = new EventEmitter<any>();
  @Output() shoppingListLoad = new EventEmitter<any>();
  @Output() recipeDeleted = new EventEmitter<Recipe>();
  @Output() shoppingListItemDeleted = new EventEmitter<ShoppingListItem>();
  @Output() addAdmin = new EventEmitter<any>();
  @Output() removeAdmin = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  closeDetails() {
    this.detailsClosed.emit();
  }

  loadRecipes() {
    this.recipesLoad.emit();
  }

  loadShoppingList() {
    this.shoppingListLoad.emit();
  }

  onRecipeDelete(recipe: Recipe) {
    this.recipeDeleted.emit(recipe);
  }

  onShoppingListItemDelete(shoppingListItem: ShoppingListItem) {
    this.shoppingListItemDeleted.emit(shoppingListItem);
  }

  onAddAdmin() {
    this.addAdmin.emit(this.user);
  }

  onRemoveAdmin() {
    this.removeAdmin.emit(this.user);
  }
}
