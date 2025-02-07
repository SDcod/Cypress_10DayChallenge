// 🚀 Day 09 Challenge: UI & API Validation Combined
describe("Day 09: Mocking API Responses", () => {
  it("Stubs the users list API", () => {
    cy.intercept("GET", "https://reqres.in/api/users?page=2", {
      statusCode: 200,
      body: {
        data: [
          { id: 1, first_name: "John", last_name: "Doe" },
          { id: 2, first_name: "Jane", last_name: "Smith" },
        ],
      },
    }).as("mockUsers");

    cy.visit("https://reqres.in/");
    cy.contains(" List users ").click(); // Opens the users list

    cy.wait("@mockUsers").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      cy.log(interception.response.body);
    });

    cy.contains("John").should("be.visible");
    cy.contains("Jane").should("be.visible");
  });
});
