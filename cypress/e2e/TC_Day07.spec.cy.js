import FormPage from "../pages/07FormPage";

describe("form validations : day 07", () => {
  let formData = [];
  beforeEach(() => {
    formData = cy.fixture("FormTestData.json").then((data) => {
      formData = data;
    });
  });
  it("form submit scenario", () => {
    formData.forEach((record) => {
      cy.visit("https://demoqa.com/automation-practice-form");
      FormPage.enterFirstName(record.firstName)
        .enterLastName(record.lastName)
        .enterEmail(record.email)
        .enterMobileNumber(record.mobile)
        .selectGender(record.gender)
        .selectDOB(record.dob);
      return;
      FormPage.enterSubjects(record.subjects) //apply multiselect
        .selectHobby(1) // apply multiselect
        .enterAddress("123, Test Street")
        .selectState("NCR")
        .selectCity("Delhi")
        .submitForm();

      cy.get(".modal-content>.modal-header").contains(
        "Thanks for submitting the form"
      );

      // cy.get(".modal-content>.modal-header").should("not.exist");

      cy.get("#closeLargeModal")
        .scrollIntoView()
        .should("exist")
        .click({ force: true });
    });
  });
});
