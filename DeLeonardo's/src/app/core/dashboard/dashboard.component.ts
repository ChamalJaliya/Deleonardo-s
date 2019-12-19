import { ShoppingListItem } from "./../../shopping-list/models/shopping-list-item.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, empty } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers/index";
import { RecipesService } from "../../recipes/services/recipes.service";
import { ShoppingListService } from "../../shopping-list/services/shopping-list.service";
import { getUser } from "../../auth/store/auth.selectors";
import { switchMap, take } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  recipesSub: Subscription;
  recipes = [
    {
      title: "Recipe 1",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
      photoUrl:
        "https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(97).jpg"
    },
    {
      title: "Recipe 2",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
      photoUrl:
        "https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(98).jpg"
    },
    {
      title: "Recipe 3",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
      photoUrl:
        "https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(99).jpg"
    },
    {
      title: "Recipe 4",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
      photoUrl:
        "https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(95).jpg"
    }
  ];

  shoppingListSub: Subscription;
  shoppingList: ShoppingListItem[] = [
    {
      id: 1,
      name: "Example item 1",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      id: 2,
      name: "Example item 2",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      id: 3,
      name: "Example item 3",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      id: 4,
      name: "Example item 4",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      id: 5,
      name: "Example item 5",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    }
  ];

  constructor(
    private store: Store<AppState>,
    private recipesService: RecipesService,
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit() {
    this.initRecipes();
    this.initShoppingList();
  }

  ngOnDestroy() {
    if (this.recipesSub) {
      this.recipesSub.unsubscribe();
    }

    if (this.shoppingListSub) {
      this.shoppingListSub.unsubscribe();
    }
  }

  initRecipes() {
    this.recipesSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.recipesService.get(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe(recipes => {
        if (recipes.length === 0) {
          this.recipesService.addRecipes(this.recipes);
        }
      });
  }

  initShoppingList() {
    this.shoppingListSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.shoppingListService.get(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe(shoppingList => {
        if (shoppingList.length === 0) {
          this.shoppingListService.addshoppingList(this.shoppingList);
        }
      });
  }
}
