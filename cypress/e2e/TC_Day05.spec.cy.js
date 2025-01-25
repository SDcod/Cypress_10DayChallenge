// Visit the File Download page.
// Identify and click on a file link (e.g., some-file.txt).
// Use Cypress commands to validate the file's existence in the downloads folder.
// Open and read the file to verify its content.

describe("file download and validation : Day 05", () => {
  beforeEach(() => {
    cy.task("deleteDownloads");
    cy.visit("https://the-internet.herokuapp.com/download");
  });

  //Using cypress readfile
  xit("download new file", () => {
    cy.get('a[href="download/new.txt"]').click();
    cy.readFile("cypress/downloads/new.txt").should("contain", "df");
  });
  xit("download some file", () => {
    cy.get('a[href="download/some-file.txt"]').click();
    cy.readFile("cypress/downloads/some-file.txt").should("contain", "asdf");
  });

  //using cypress-download file plugin
  xit("download some file using plugin", () => {
    //  cy.get('a[href="download/some-file.txt"]').click();
    cy.downloadFile(
      "https://the-internet.herokuapp.com/download/some-file.txt",
      "cypress/downloads",
      "some-file.txt"
    );
    cy.readFile("cypress/downloads/some-file.txt").should("contain", "asdf");
  });

  //using Node.js utility
  it("using node js", () => {
    const fileName = "some-file.txt";
    cy.get('a[href="download/new.txt"]').click();
    cy.task("readDownloadedFile", fileName).then((fileContent) => {
      expect(fileContent).to.contain("asdf");
    });
  });
});
