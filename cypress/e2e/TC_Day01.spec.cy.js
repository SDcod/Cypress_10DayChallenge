import LoginHeroku from "../pages/01LoginHeroku";

describe("Login Test : Day 01", () => {
  before(() => {
    cy.fixture("LoginData.json").as("loginData");
  });
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/login");
  });

  it("Login data driven", () => {
    cy.get("@loginData").then((data) => {
      data.forEach((user) => {
        LoginHeroku.enterUserName(user.username)
          .enterPassword(user.password)
          .submitLogin();

        if (user.expected.includes("logged into")) {
          cy.get("a[href='/logout']").should("be.visible").click();
        } else {
          LoginHeroku.validateFlashMessage(user.expected);
        }
      });
    });
  });
});
