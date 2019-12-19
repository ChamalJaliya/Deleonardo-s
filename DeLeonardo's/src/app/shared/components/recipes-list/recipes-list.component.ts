import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from "@angular/core";
import { Recipe } from "../../../recipes/models/recipe.model";

@Component({
  selector: "app-recipes-list",
  templateUrl: "./recipes-list.component.html",
  styleUrls: ["./recipes-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent implements OnInit {
  @Input() recipes: Recipe[];
  @Input() editable = true;
  @Output() recipeDeleted = new EventEmitter<Recipe>();
  @Output() recipeEdited = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit() {}

  onRecipeDelete(recipe: Recipe) {
    this.recipeDeleted.emit(recipe);
  }

  onRecipeEdit(recipe: Recipe) {
    this.recipeEdited.emit(recipe);
  }

  trackByFunction(index: any) {
    return index;
  }
}
