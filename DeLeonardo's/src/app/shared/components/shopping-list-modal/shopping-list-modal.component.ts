import { Component, OnInit, ViewChild } from "@angular/core";
import { MDBModalRef } from "angular-bootstrap-md";
import { ShoppingListItem } from "../../../shopping-list/models/shopping-list-item.model";
import { Subject } from "rxjs";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-shopping-list-modal",
  templateUrl: "./shopping-list-modal.component.html",
  styleUrls: ["./shopping-list-modal.component.scss"]
})
export class ShoppingListModalComponent implements OnInit {
  @ViewChild("shoppingListItemForm", { static: true })
  shoppingListItemForm: NgForm;

  heading: string;
  shoppingListItem: ShoppingListItem = {};

  shoppingListItemData: Subject<ShoppingListItem> = new Subject();

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit() {}

  onSave() {
    if (this.shoppingListItemForm.valid) {
      this.shoppingListItemData.next(this.shoppingListItem);
      this.modalRef.hide();
    } else {
      const controls = this.shoppingListItemForm.controls;
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
    }
  }
}
