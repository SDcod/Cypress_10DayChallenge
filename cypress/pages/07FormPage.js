class FormPage {
  elements = {
    firstNameInput: () => cy.get("#firstName"),
    lastNameInput: () => cy.get("#lastName"),
    emailInput: () => cy.get("#userEmail"),
    mobileInput: () => cy.get("#userNumber"),
    genderRadioButton: (gender) =>
      cy.get(`input[name="gender"][value="${gender}"]`),
    dobInput: () => cy.get("#dateOfBirthInput"),
    subjectsInput: () => cy.get("#subjectsInput"),
    hobbiesCheckbox: (hobby) =>
      cy.get(`label[for="hobbies-checkbox-${hobby}"]`),
    addressInput: () => cy.get("#currentAddress"),
    stateDropdown: () => cy.get(".css-1hwfws3"),
    cityDropdown: () => cy.get(".css-1wa3eu0-placeholder"),
  };

  // Actions
  enterFirstName(name) {
    this.elements.firstNameInput().clear().type(name);
    return this;
  }

  enterLastName(name) {
    this.elements.lastNameInput().clear().type(name);
    return this;
  }

  enterEmail(email) {
    this.elements.emailInput().clear().type(email);
    return this;
  }

  enterMobileNumber(number) {
    this.elements.mobileInput().clear().type(number);
    return this;
  }

  selectGender(gender) {
    this.elements.genderRadioButton(gender).check({ force: true });
    return this;
  }

  selectDOB(dob) {
    this.elements.dobInput().type(dob);
    cy.get("@selectdob").type("{enter}");
    return this;
  }

  enterSubjects(subject) {
    this.elements.subjectsInput().type(subject).type("{enter}");
    return this;
  }

  selectHobby(hobbyIndex) {
    this.elements.hobbiesCheckbox(hobbyIndex).click();
    return this;
  }

  enterAddress(address) {
    this.elements.addressInput().clear().type(address);
    return this;
  }

  selectState(state) {
    this.elements.stateDropdown().click().type(`${state}{enter}`);
    return this;
  }

  selectCity(city) {
    this.elements.cityDropdown().click().type(`${city}{enter}`);
    return this;
  }
}

export default new FormPage();
