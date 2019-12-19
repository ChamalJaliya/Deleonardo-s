import { Component, OnInit, ViewChild } from "@angular/core";
import { MDBModalRef } from "angular-bootstrap-md";
import { Subject } from "rxjs";
import { Recipe } from "../../../recipes/models/recipe.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-recipe-modal",
  templateUrl: "./recipe-modal.component.html",
  styleUrls: ["./recipe-modal.component.scss"]
})
export class RecipeModalComponent implements OnInit {
  @ViewChild("recipeForm", { static: true }) recipeForm: NgForm;

  heading: string;

  title: string;
  description: string;
  photoUrl: string;

  recipeData: Subject<Recipe> = new Subject();
  recipe: Recipe = {};

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit() {}

  onSave() {
    if (this.recipeForm.valid) {
      this.recipeData.next(this.recipe);
      this.modalRef.hide();
    } else {
      const controls = this.recipeForm.controls;
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
    }
  }
}
