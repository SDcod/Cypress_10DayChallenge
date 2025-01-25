describe("Pagination Day 06", () => {
  let pageConfig;

  before(() => {
    // Load the configuration data once before all tests.
    cy.fixture("pageSetting.json").then((data) => {
      pageConfig = data;
    });
  });

  it("Iterate through pages and capture book titles", () => {
    const selectors = {
      bookList: "section > div:nth-child(2) > ol > li",
      nextBtn: "li.next > a",
      prevBtn: "li.previous > a",
      currentPage: ".current",
      bookTitle: "h3 > a",
    };

    const allBookTitles = []; // Array to store all book titles across pages.

    // Visit the website.
    cy.visit("https://books.toscrape.com/");

    for (let i = 1; i <= pageConfig.pagesToVisit; i++) {
      const currentPageTitles = []; // Temporary array for current page titles.

      // Validate the current page number.
      cy.get(selectors.currentPage)
        .should("be.visible")
        .and("include.text", `Page ${i}`);

      // Validate the number of books on the current page.
      cy.get(selectors.bookList)
        .its("length")
        .should("eq", pageConfig.booksPerPage);

      // Extract book titles on the current page.
      cy.get(selectors.bookList).each(($item) => {
        cy.wrap($item)
          .find(selectors.bookTitle)
          .invoke("attr", "title")
          .then((title) => {
            currentPageTitles.push(title); // Store the title in the temporary array.
            allBookTitles.push(title); // Also store the title in the global array.
          });
      });

      // Log the titles for the current page.
      cy.then(() => {
        cy.log(`Page ${i} Titles:`, currentPageTitles);
      });

      // Navigate to the next page unless it's the last page.
      if (i < pageConfig.pagesToVisit) {
        cy.get(selectors.nextBtn).should("be.visible").click();
      }
    }

    // Validate the last page number.
    cy.get(selectors.currentPage)
      .should("be.visible")
      .and("include.text", `Page ${pageConfig.pagesToVisit}`);

    // Log all titles after completing pagination.
    cy.then(() => {
      cy.log("All Book Titles:", allBookTitles);
    });
  });
});
