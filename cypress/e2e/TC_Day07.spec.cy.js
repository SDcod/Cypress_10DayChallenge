import FormPage from "../pages/07FormPage";

describe("form validations : day 07", () => {
  it("form submit scenario", () => {
    cy.visit("https://demoqa.com/automation-practice-form");
    FormPage.enterFirstName("John")
      .enterLastName("Doe")
      .enterEmail("johndoe@example.com")
      .enterMobileNumber("9876543210")
      .selectGender("Male")
      .selectDOB("01 January 2000")
      .enterSubjects("Maths")
      .selectHobby(1) // 1 for 'Sports', use respective index for others
      .enterAddress("123, Test Street")
      .selectState("NCR")
      .selectCity("Delhi");
  });
});
