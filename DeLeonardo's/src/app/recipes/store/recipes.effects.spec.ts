import { TestBed, inject } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable } from "rxjs";

import { RecipesEffects } from "./recipes.effects";

describe("RecipesEffects", () => {
  let actions$: Observable<any>;
  let effects: RecipesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipesEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(RecipesEffects);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });
});
