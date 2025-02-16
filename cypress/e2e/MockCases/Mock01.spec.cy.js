//write resuable methods using POM
//make use of screenshots and videos
//try implementing custom configs and scripts
//integrate CICD using githubActions

import FormValidation from "../../pages/MockPages/01FormValidationPage";

describe("Form Validations", () => {
  let mockdata = [];
  beforeEach(() => {
    cy.fixture("MockFixtures/FormValidationData.json").then((data) => {
      mockdata = data;
    });
  });

  it("TDD form submission", () => {
    mockdata.forEach((record) => {
      cy.visit("https://practice.expandtesting.com/form-validation");
      FormValidation.enterName(record.contactName)
        .enterNumber(record.contactNumber)
        .enterDate(record.pickupDate)
        .selectPaymentMethod(record.paymentMethod, record.paymentValue)
        .clickRegister();

      //if submission values are valid then validate success message.
      if (record.type == "valid") {
        cy.url().should(
          "eq",
          "https://practice.expandtesting.com/form-confirmation"
        );
        cy.contains("Thank you for validating your ticket");
      }
      //if submission values are invalid then assert validation messages.
      if (record.type == "invalid") {
        cy.contains("Please enter your Contact name.");
        cy.contains("Please provide your Contact number.");
        cy.contains("Please provide valid Date.");
        cy.contains("Please select the Paymeny Method.");
        cy.screenshot("EmptyValueValidations");
      }
    });
  });
});
