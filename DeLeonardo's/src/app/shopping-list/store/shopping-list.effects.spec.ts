import { ShoppingListEffects } from "./shopping-list.effects";
import { TestBed, inject } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable } from "rxjs";

describe("ShoppingListEffects", () => {
  let actions$: Observable<any>;
  let effects: ShoppingListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingListEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(ShoppingListEffects);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });
});
