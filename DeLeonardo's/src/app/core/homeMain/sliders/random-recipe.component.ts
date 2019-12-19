import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-random-recipe",
  templateUrl: "./random-recipe.component.html",
  styleUrls: ["./random-recipe.component.scss"]
})
export class RandomRecipeComponent implements OnInit {
  constructor() {}
  cards = [
    {
      title: "Meal Type",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card content",
      buttonText: "Button",
      img: "assets/resources/mealtype.jpg"
    },
    {
      title: "Diet & Healthy",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card content",
      buttonText: "Button",
      img: "assets/resources/healthy.jpg"
    },
    {
      title: "Cooking Style",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card content",
      buttonText: "Button",
      img: "assets/resources/cookingstyle.jpg"
    },
    {
      title: "Seosonal",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card content",
      buttonText: "Button",
      img: "assets/resources/specialeve.jpg"
    },
    {
      title: "Ingredient",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card content",
      buttonText: "Button",
      img: "assets/resources/ingredient.jpg"
    },
    {
      title: "Dish Type",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card content",
      buttonText: "Button",
      img: "assets/resources/dishtype.jpg"
    }
  ];
  slides: any = [[]];
  chunk(
    arr: {
      title: string;
      description: string;
      buttonText: string;
      img: string;
    }[],
    chunkSize: number
  ) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.slides = this.chunk(this.cards, 3);
  }
}
