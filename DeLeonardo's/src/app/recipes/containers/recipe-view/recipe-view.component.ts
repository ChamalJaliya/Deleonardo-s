// import { ActivatedRoute, Router, Params } from '@angular/router';
// import { RecipesService } from "./../../services/recipes.service";
// import { Recipe } from "./../../models/recipe.model";
import { Component} from "@angular/core";

@Component({
  selector: "app-recipe-view",
  templateUrl: "./recipe-view.component.html",
  styleUrls: ["./recipe-view.component.scss"]
})
export class RecipeViewComponent{
  // recipe: Recipe;
  // id: number;
  // constructor(
  //   private recipeService: RecipesService,
  //   private route: ActivatedRoute,
  //   private router: Router
  // ) {}
  // ngOnInit() {
  //   this.route.params
  //     .subscribe(
  //       (params: Params) => {
  //         this.id = +params['id'];
  //        // this.recipe = this.recipeService.getRecipe(this.id,);
  //       }
  //     );
  // }
}
