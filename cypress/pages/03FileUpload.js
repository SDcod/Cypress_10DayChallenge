class FileUpload {
  elements = {
    fileSelectInput: () => cy.get("[data-testid='file-input']"),
    uploadBtn: () => cy.get("[data-testid='file-submit']"),
    fileUpoadedStatusMessage: () => cy.get("#uploaded-files").prev(),
    fileNameMessage: () => cy.get("#uploaded-files > p"),
  };

  chooseFile(filePath) {
    this.elements.fileSelectInput().selectFile(filePath);
    return this;
  }

  clickUpload() {
    this.elements.uploadBtn().click();
    return this;
  }

  validateSuccessMessage() {
    this.elements
      .fileUpoadedStatusMessage()
      .should("have.text", "File Uploaded!");
    return this;
  }

  validateFileName(filename) {
    this.elements.fileNameMessage().should("include.text", filename);
    return this;
  }
}

export default new FileUpload();
