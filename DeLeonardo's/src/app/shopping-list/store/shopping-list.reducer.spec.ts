import { shoppingListReducer } from "./shopping-list.reducer";
import { shoppingListInitialState } from "./shopping-list.state";

describe("ShoppingList Reducer", () => {
  describe("an unknown action", () => {
    it("should return the previous state", () => {
      const action = {} as any;

      const result = shoppingListReducer(shoppingListInitialState, action);

      expect(result).toBe(shoppingListInitialState);
    });
  });
});
