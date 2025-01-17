class LoginHeroku {
  elements = {
    userNameInput: () => cy.get("#username"),
    passwordInput: () => cy.get("#password"),
    loginButton: () => cy.get("button[type='submit']"),
    flashMessage: () => cy.get("#flash"),
  };

  //actions
  enterUserName(val) {
    this.elements.userNameInput().should("be.visible").type(val);
    return this;
  }
  enterPassword(val) {
    this.elements.passwordInput().should("be.visible").type(val);
    return this;
  }
  submitLogin() {
    this.elements.loginButton().should("be.visible").click();
    return this;
  }

  validateFlashMessage(msg) {
    this.elements
      .flashMessage()
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.contain(msg);
      });
  }
}

export default new LoginHeroku();
