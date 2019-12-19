import { ShoppingListModule } from "./shopping-list.module";

describe("ShoppingListModule", () => {
  let shoppingListModule: ShoppingListModule;

  beforeEach(() => {
    shoppingListModule = new ShoppingListModule();
  });

  it("should create an instance", () => {
    expect(shoppingListModule).toBeTruthy();
  });
});
