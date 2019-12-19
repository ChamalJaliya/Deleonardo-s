import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";
import { Recipe } from "../../../recipes/models/recipe.model";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() editable = true;
  @Output() deleted = new EventEmitter<Recipe>();
  @Output() edited = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit() {}

  onDelete() {
    this.deleted.emit(this.recipe);
  }

  onEdit() {
    this.edited.emit(this.recipe);
  }
  recipeDetail(){
    
  }
}
