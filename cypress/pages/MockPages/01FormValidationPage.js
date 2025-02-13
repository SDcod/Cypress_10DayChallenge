class FormValidation {
  elements = {
    pageHeaderText: () =>
      cy
        .get(".container > h1")
        .contains("Form Validation page for Automation Testing Practice"),
    contactName: () =>
      cy.get("input[id='validationCustom01'][name='ContactName']"),
    contactNumber: () =>
      cy.get("input[id='validationCustom05'][name='contactnumber']"),
    pickupDate: () =>
      cy.get("input[id='validationCustom05'][name='pickupdate']"),
    paymentMethod: () =>
      cy.get("select[id='validationCustom04'][name='payment']"),
    registerBtn: () => cy.get("button").contains("Register"),
  };

  //form actions
  enterName(contactName) {
    if (contactName) {
      this.elements.contactName().clear().type(contactName);
    } else {
      this.elements.contactName().clear();
    }

    return this;
  }
  enterNumber(contactNumber) {
    if (contactNumber) {
      this.elements.contactNumber().clear().type(contactNumber);
    }

    return this;
  }
  enterDate(pickupdate) {
    if (pickupdate) {
      this.elements.pickupDate().clear().type(pickupdate);
    }

    return this;
  }

  selectPaymentMethod(method, val) {
    if (method) {
      this.elements.paymentMethod().select(method).should("have.value", val);
    }

    return this;
  }

  clickRegister() {
    this.elements.registerBtn().scrollIntoView().should("be.visible").click();
  }
}

export default new FormValidation();
