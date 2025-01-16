import SearchPage from "../pages/02SearchPage";

describe("Search Test : Day 02", () => {
  before(() => {
    cy.fixture("SearchData.json").as("SearchData");
  });
  beforeEach(() => {
    cy.visit("https://www.amazon.in/");
  });

  it("Validate Dynamic Search Results list", () => {
    cy.get("@SearchData").then((data) => {
      data.forEach((search) => {
        SearchPage.searchTerm(search.term);
        cy.wait(4000);
        SearchPage.getResultList(search.expected);
        SearchPage.elements.searchBar().clear();
      });
    });
  });

  it.only("Validate the result after executing a search", () => {
    cy.get("@SearchData").then((data) => {
      data.forEach((search) => {
        SearchPage.searchTerm(search.term);
        cy.wait(2000);
        SearchPage.getResultList(search.expected);
        SearchPage.clickSearchButton();
        cy.wait(2000);
        SearchPage.validateSearchExecutionResult(search.expected);
        SearchPage.elements.searchBar().clear();
      });
    });
  });
});
