import { Component, OnInit, OnDestroy } from "@angular/core";
import { MDBModalRef, MDBModalService } from "angular-bootstrap-md";
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers/index";

import * as fromShoppingList from "../store/shopping-list.actions";
import { ShoppingListItem } from "../models/shopping-list-item.model";
import { Subscription, Observable } from "rxjs";
import {
  getShoppingList,
  getIsLoading
} from "../store/shopping-list.selectors";
import { take, map } from "rxjs/operators";
import { ConfirmModalComponent } from "../../shared/components/confirm-modal/confirm-modal.component";
import { ShoppingListModalComponent } from "../../shared/components/shopping-list-modal/shopping-list-modal.component";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  shoppingList: ShoppingListItem[] | null;
  modalRef: MDBModalRef;

  shoppingListSub: Subscription;

  modalConfig = {
    class: "modal-dialog-centered"
  };

  lastShoppingListItemIndex: number;

  constructor(
    private modalService: MDBModalService,
    private store: Store<AppState>,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);

    this.shoppingListSub = this.store
      .select(getShoppingList)
      .pipe(
        map((shoppingList: ShoppingListItem[]) => {
          if (this.user && !shoppingList) {
            this.store.dispatch(new fromShoppingList.ShoppingListQuery());
          }
          return shoppingList;
        })
      )
      .subscribe((shoppingList: ShoppingListItem[]) => {
        if (shoppingList && shoppingList.length !== 0) {
          const index: number = Number(
            shoppingList[shoppingList.length - 1].id
          );
          this.lastShoppingListItemIndex = index;
        } else {
          this.lastShoppingListItemIndex = 0;
        }

        this.shoppingList = shoppingList;
      });
  }

  get user() {
    return this.afAuth.auth.currentUser;
  }

  ngOnDestroy() {
    if (this.shoppingListSub) {
      this.shoppingListSub.unsubscribe();
    }
  }

  onAddShoppingListItem() {
    this.modalRef = this.modalService.show(
      ShoppingListModalComponent,
      this.modalConfig
    );

    this.modalRef.content.heading = "Add new shopping List Item";
    this.modalRef.content.shoppingListItem.id =
      this.lastShoppingListItemIndex + 1;

    this.modalRef.content.shoppingListItemData
      .pipe(take(1))
      .subscribe((shoppingListItemData: ShoppingListItem) => {
        this.store.dispatch(
          new fromShoppingList.ShoppingListAdded({
            shoppingListItem: shoppingListItemData
          })
        );
      });
  }

  openEditShoppingListItemModal(shoppingListItem: ShoppingListItem) {
    this.modalRef = this.modalService.show(
      ShoppingListModalComponent,
      this.modalConfig
    );

    this.modalRef.content.heading = "Edit Item";
    const shoppingListItemCopy = {
      key: shoppingListItem.key,
      id: shoppingListItem.id || null,
      name: shoppingListItem.name || null,
      description: shoppingListItem.description || null
    };
    this.modalRef.content.shoppingListItem = shoppingListItemCopy;

    this.modalRef.content.shoppingListItemData
      .pipe(take(1))
      .subscribe((shoppingListItemData: ShoppingListItem) => {
        this.store.dispatch(
          new fromShoppingList.ShoppingListEdited({
            shoppingListItem: shoppingListItemData
          })
        );
      });
  }

  openConfirmModal(shoppingListItem: ShoppingListItem) {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(
            new fromShoppingList.ShoppingListDeleted({ shoppingListItem })
          );
        }
      });
  }

  onShoppingListItemEdit(shoppingListItem: ShoppingListItem) {
    this.openEditShoppingListItemModal(shoppingListItem);
  }

  onShoppingListItemDelete(shoppingListItem: ShoppingListItem) {
    this.openConfirmModal(shoppingListItem);
  }
}
