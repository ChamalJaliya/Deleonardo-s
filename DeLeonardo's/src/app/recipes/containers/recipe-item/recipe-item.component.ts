import { Recipe } from "./../../models/recipe.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.scss"]
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  constructor() {}

  ngOnInit() {}
}
