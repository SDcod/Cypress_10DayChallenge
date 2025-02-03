class FormPage {
  elements = {
    firstNameInput: () => cy.get("#firstName"),
    lastNameInput: () => cy.get("#lastName"),
    emailInput: () => cy.get("#userEmail"),
    mobileInput: () => cy.get("#userNumber"),
    genderRadioButton: (gender) =>
      cy.get(`input[name="gender"][value="${gender}"]`),
    dobInput: () => cy.get("#dateOfBirthInput"),
    dobMonth: () => cy.get(".react-datepicker__month-select"),
    dobYear: () => cy.get(".react-datepicker__year-select"),
    dobDay: (day) =>
      cy.get(
        `.react-datepicker__day.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`
      ),
    subjectsInput: () => cy.get("#subjectsInput"),
    hobbiesCheckbox: (hobby) =>
      cy.get(`label[for="hobbies-checkbox-${hobby}"]`),
    addressInput: () => cy.get("#currentAddress"),
    stateDropdown: () => cy.get("#state"),
    cityDropdown: () => cy.get("#city"),
    submitBtn: () => cy.get("#submit"),
  };

  // Actions
  enterFirstName(name) {
    if (name) {
      this.elements.firstNameInput().clear().type(name);
    } else {
      this.elements.firstNameInput().invoke("val", "");
    }
    return this;
  }

  enterLastName(name) {
    if (name) {
      this.elements.lastNameInput().clear().type(name);
    } else {
      this.elements.lastNameInput().invoke("val", "");
    }

    return this;
  }

  enterEmail(email) {
    if (email) {
      this.elements.emailInput().clear().type(email);
    } else {
      this.elements.emailInput().invoke("val", "");
    }
    return this;
  }

  enterMobileNumber(number) {
    if (number) {
      this.elements.mobileInput().clear().type(number);
    } else {
      this.elements.mobileInput().invoke("val", "");
    }
    return this;
  }

  selectGender(gender) {
    if (gender) {
      this.elements.genderRadioButton(gender).check({ force: true });
    }
    return this;
  }

  selectDOB(dob) {
    if (dob) {
      const [day, month, year] = dob.split(" "); //Expected format "01 January 2000"

      this.elements.dobInput().click();

      this.elements.dobMonth().select(month);

      this.elements.dobYear().select(year);

      cy.get(
        ".react-datepicker__current-month.react-datepicker__current-month--hasYearDropdown.react-datepicker__current-month--hasMonthDropdown"
      ).should("have.text", `${month} ${year}`); //validate selected month and year
      cy.wait(500); //small wait to avoid flaky test.

      this.elements.dobDay(day).click();
    }

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

  submitForm() {
    this.elements.submitBtn().click();
    return this;
  }
}

export default new FormPage();
