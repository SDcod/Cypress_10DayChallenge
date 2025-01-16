class SearchPage {
  elements = {
    searchBar: () => cy.get('[id = "twotabsearchtextbox"]'),
    resultList: () =>
      cy.get(
        "#sac-autocomplete-results-container .left-pane-results-container>div"
      ),
    searchExecutionList: () =>
      cy.get(
        "[data-component-type='s-search-results'] > :nth-child(1) [role='listitem']"
      ),
    searchButton: () => cy.get("#nav-search-submit-button"),
  };

  searchTerm(val) {
    this.elements.searchBar().type(val);
    return this;
  }

  getResultList(expected) {
    if (!expected) {
      this.elements.resultList().should("not.exist");
    } else {
      this.elements.resultList().should("be.visible");
      this.elements.resultList().each(($ele) => {
        cy.wrap($ele)
          .invoke("text")
          .then((text) => {
            expect(text.toLowerCase()).to.include(expected.toLowerCase());
          });
      });
    }
  }

  clickSearchButton() {
    this.elements.searchButton().click();
  }
  validateSearchExecutionResult(expected) {
    if (!expected) {
      this.elements.searchExecutionList().should("not.exist");
    } else {
      this.elements.searchExecutionList().should("be.visible");
      this.elements
        .searchExecutionList()
        .eq(3)
        .invoke("text")
        .should("include", expected);
    }
  }
}

export default new SearchPage();
