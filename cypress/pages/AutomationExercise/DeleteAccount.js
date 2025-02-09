class DeleteAccount {
  elements = {
    pageUrl: "delete_account",
    successMessage: () => cy.contains("Account Deleted!"),
    continueBtn: () => cy.getDataQa("continue-button"),
  };

  validateURL() {
    cy.url().should((url) => {
      expect(url).to.equal(
        `https://www.automationexercise.com/${this.elements.pageUrl}`
      );
    });
    return this;
  }
  validateSuccessMsg() {
    this.elements.successMessage();
    return this;
  }

  clickContinue() {
    this.elements.continueBtn().should("be.visible").click();
  }
}

export default new DeleteAccount();
