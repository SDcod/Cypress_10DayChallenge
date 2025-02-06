// Challenge: Handling API Intercepts & Mocking API Responses
// You’ll be testing API interactions in a UI-based scenario using Cypress intercepts.

// Scenario:
// Visit JSONPlaceholder Users List.
// Intercept the API request for fetching users and mock the response.
// Validate that the modified response is reflected on the UI.
// Assert the network call to ensure it was made correctly.
// Bonus Section:
// Implement retry logic to wait for an API response if the request fails initially.
// Capture API response time and log it.

describe("Day 08: API Stub and Mock", () => {
  it("should mock API response and validate data with retry logic", () => {
    cy.visit("https://jsonplaceholder.typicode.com");

    // Capture start time
    let requestStartTime;

    cy.intercept("GET", "/users", (req) => {
      requestStartTime = Date.now(); // Start time before sending the request
      req.reply((res) => {
        res.send([
          { id: 1, username: "john" },
          { id: 2, username: "papa" },
        ]);
      });
    }).as("users");

    cy.get("table:nth-of-type(1) a[href='/users']").click();

    cy.wait("@users", { timeout: 10000 }) // 🔄 Retry mechanism
      .its("response")
      .then((response) => {
        const requestEndTime = Date.now(); // Capture request end time
        const duration = requestEndTime - requestStartTime; // Calculate duration

        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.length(2);

        // ✅ Log API response time
        cy.log(`API Response Time: ${duration} ms`);
      });

    // ✅ Validate that the user names appear in the DOM
    cy.get("body").should(($body) => {
      expect($body.text()).to.include("john");
      expect($body.text()).to.include("papa");
    });
  });
});
