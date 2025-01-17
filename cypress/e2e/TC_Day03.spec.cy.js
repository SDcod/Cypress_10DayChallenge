import FileUpload from "../pages/03FileUpload";

describe("File Upload : Day 03", () => {
  beforeEach(() => {
    cy.visit("https://practice.expandtesting.com/upload");
  });

  let filepath = "C:\\Users\\msiSD\\Downloads\\33221.jpg";
  it("Select and upload a file", () => {
    //handeled uncaught:exception in support/e2e.js
    FileUpload.chooseFile(filepath)
      .clickUpload()
      .validateSuccessMessage()
      .validateFileName("33221.jpg");
  });
});
