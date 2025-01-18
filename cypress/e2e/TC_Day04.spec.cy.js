import DragDropg from "../pages/04DragDrop";

describe("Drag and drop : Day 04", () => {
  beforeEach(() => {
    cy.visit("https://practice.expandtesting.com/drag-and-drop");
  });

  it("Select and upload a file", () => {
    cy.get("#column-a").drag("#column-b");

    cy.get("#column-a").contains("B");
    cy.get("#column-b").contains("A");
  });
});
