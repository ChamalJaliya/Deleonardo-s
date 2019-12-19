import { ShoppingListItem } from "./../../../shopping-list/models/shopping-list-item.model";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-shopping-list-list",
  templateUrl: "./shopping-list-list.component.html",
  styleUrls: ["./shopping-list-list.component.scss"]
})
export class ShoppingListListComponent implements OnInit {
  @Input() shoppingList: ShoppingListItem[];
  @Output() shoppingListItemDeleted = new EventEmitter<ShoppingListItem>();
  @Output() shoppingListItemEdited = new EventEmitter<ShoppingListItem>();

  constructor() {}

  ngOnInit() {}

  onEdit(shoppingListItem: ShoppingListItem) {
    this.shoppingListItemEdited.emit(shoppingListItem);
  }

  onDelete(shoppingListItem: ShoppingListItem) {
    this.shoppingListItemDeleted.emit(shoppingListItem);
  }

  trackByFn(index: any) {
    return index;
  }
}
