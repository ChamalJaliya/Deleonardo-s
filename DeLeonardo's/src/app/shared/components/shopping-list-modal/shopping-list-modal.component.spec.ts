import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ShoppingListModalComponent } from "./shopping-list-modal.component";

describe("ShoppingListModalComponent", () => {
  let component: ShoppingListModalComponent;
  let fixture: ComponentFixture<ShoppingListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingListModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
