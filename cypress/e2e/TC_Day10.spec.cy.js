// 🚀 Day 10 Challenge: UI Automation - Mock Interview Style
// 📝 Scenario:
// You're testing an e-commerce website's checkout process to ensure a smooth user experience. The website has a multi-step checkout, including:

// Product Selection
// Cart Review
// User Login / Guest Checkout
// Payment & Order Confirmation
// Your task is to automate the entire checkout flow using Cypress.

// 🔹 Requirements:
// ✅ Visit the website: https://automationexercise.com/
// ✅ Select a product and add it to the cart
// ✅ Proceed to checkout and handle login/signup checkout
// ✅ Fill in billing & payment details
// ✅ Complete the order and validate the success message

// 🛠️ Additional Challenge Tasks (Optional but Recommended for Mastery)
// Use Page Object Model (POM)
// Parameterize test cases (e.g., test both guest checkout and logged-in checkout)
// Validate order summary after checkout
// Handle any pop-ups or dynamic elements
// Use Cypress commands to improve reusability
// 🎯 Mock Interview Question:
// ❓ "How would you design a Cypress framework for testing an e-commerce checkout process? Walk me through your approach."

// ➡️ What I'm Evaluating:

// Test strategy & modularization (POM, reusable methods)
// Assertions & error handling (Validating success message, handling failures)
// Efficiency (Using Cypress commands, fixtures, and intercepts if needed)
// 🔥 Bonus (Advanced UI Challenge)
// Verify UI responsiveness (Run test in different viewports)
// Validate animations and UI transitions
// Take screenshots on test failure
// Expected Deliverables:
// A well-structured Cypress test automating the checkout process
// A brief explanation of your approach (as you would in an interview)
// Optional: Screenshot or video proof of execution

import SignUpAndLogin from "../pages/AutomationExercise/SignUpAndLogin";
import HomePage from "../pages/AutomationExercise/HomePage";
import UserRegister from "../pages/AutomationExercise/UserRegister";
import DeleteAccount from "../pages/AutomationExercise/DeleteAccount";
import AccountCreated from "../pages/AutomationExercise/AccountCreated";

describe("E-commerce checkout suite", () => {
  let userdata = {};
  let paymentData = {};

  beforeEach(() => {
    cy.fixture("AutomationExerciseUsers/RegisterData.json").then((data) => {
      userdata = data;
    });

    cy.fixture("AutomationExerciseUsers/PaymentData.json").then((data) => {
      paymentData = data;
    });
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit("https://www.automationexercise.com/");
  });

  it("Guest visit Register checkout", () => {
    //user vistits the page- selects product - go to cart -click proceed to checkout - register user - click continue - go to cart - checkout - fill card details - order success.

    //get first item
    cy.get(
      ".features_items>div.col-sm-4:nth-of-type(2) div.single-products"
    ).trigger("mouseover");
    cy.get(
      ".features_items>div.col-sm-4:nth-of-type(2) div.single-products div.overlay-content>a.add-to-cart"
    )
      .should("be.visible")
      .click({ force: true });

    cy.wait(1000);
    //go to cart by clicking on modal
    cy.get("#cartModal .modal-content .modal-body").within(($body) => {
      cy.get("p")
        .eq(0)
        .should("have.text", "Your product has been added to cart.");
      cy.get('a[href="/view_cart"]').click({ force: true });
    });

    //click proceed to checkout
    cy.contains("Proceed To Checkout").click();

    //click register/login button
    cy.get(
      "#checkoutModal .modal-content .modal-body a[href='/login']"
    ).click();

    //Register new user
    SignUpAndLogin.validateSignupTitle()
      .enterSignupName(userdata.validUser.name)
      .enterSignupEmail(userdata.validUser.email)
      .submitSignUpform();

    UserRegister.validateURL()
      .validateFormTitle()
      .chooseGenderMr()
      .validateUserName(`${userdata.validUser.name}`)
      .validateUserEmail(`${userdata.validUser.email}`)
      .enterPassword(`${userdata.validUser.password}`)
      .selectDay("11")
      .selectMonth("March")
      .selectYear("2000")
      .checkNewsletter()
      .checkOptin()
      .fillFirstName(`${userdata.validUser.firstname}`)
      .fillLastName(`${userdata.validUser.lastname}`)
      .fillCompany(`${userdata.validUser.company}`)
      .fillAddress(`${userdata.validUser.address}`)
      .selectCountry("India")
      .fillState(`${userdata.validUser.state}`)
      .fillCity(`${userdata.validUser.city}`)
      .fillZipcode(`${userdata.validUser.zipcode}`)
      .fillMobileNumber(`${userdata.validUser.mobile_number}`)
      .clickCreateAccount(); // 13. Click 'Create Account button'
    AccountCreated.validateURL().validateSuccessMsg().clickContinue();
    cy.url().should("eq", "https://www.automationexercise.com/");
    HomePage.validateLoggedInUser(`Logged in as ${userdata.validUser.name}`);

    //go to cart
    cy.get('#header a[href="/view_cart"]').click();

    //validate one item is added in cart
    cy.get("#cart_info_table tbody tr").should("have.length", 1);

    //click checkout button
    cy.contains("Proceed To Checkout").click();

    cy.url().should("eq", "https://www.automationexercise.com/checkout");

    //checkout page validations
    cy.get("#address_delivery").contains(`${userdata.validUser.firstname}`);

    //click placeorder
    cy.get("a[href='/payment']")
      .should("be.visible")
      .contains("Place Order")
      .click();

    //Payment page
    cy.url().should("eq", "https://www.automationexercise.com/payment");

    cy.get('[data-qa="name-on-card"]').type(`${paymentData.cardName}`);
    cy.get('[data-qa="card-number"]').type(`${paymentData.cardNumber}`);
    cy.get('[data-qa="cvc"]').type(`${paymentData.cvv}`);
    cy.get('[data-qa="expiry-month"]').type(`${paymentData.expirationMonth}`);
    cy.get('[data-qa="expiry-year"]').type(`${paymentData.expirationYear}`);

    cy.get('button[id="submit"]').click();

    cy.get('[data-qa="order-placed"]').as("orderPlacedTitle", {
      timeout: 10000,
    });

    cy.wait(2000);

    HomePage.clickLogoutBtn();
    //cleanup if needed to delete account before login
    // HomePage.clickDeleteAccount();
    // DeleteAccount.validateURL().validateSuccessMsg().clickContinue();
  });

  it("Guest visit login checkout", () => {
    //user vistits the page- selects product - go to cart - login user - click continue - go to cart - checkout - fill card details - order success.

    //get first item
    cy.get(
      ".features_items>div.col-sm-4:nth-of-type(2) div.single-products"
    ).trigger("mouseover");
    cy.get(
      ".features_items>div.col-sm-4:nth-of-type(2) div.single-products div.overlay-content>a.add-to-cart"
    )
      .should("be.visible")
      .click({ force: true });

    cy.wait(1000);
    //go to cart by clicking on modal
    cy.get("#cartModal .modal-content .modal-body").within(() => {
      cy.get("p")
        .eq(0)
        .should("have.text", "Your product has been added to cart.");
      cy.get('a[href="/view_cart"]').click({ force: true });
    });

    //click proceed to checkout
    cy.contains("Proceed To Checkout").should("be.visible").click();

    //click register/login button
    cy.get(
      "#checkoutModal .modal-content .modal-body a[href='/login']"
    ).click();

    //Login to new user created in earlier testcase.
    SignUpAndLogin.validateLoginTitle()
      .enterLoginEmail(userdata.validUser.email)
      .enterLoginPassword(userdata.validUser.password)
      .submitLoginform();

    cy.wait(1000);
    HomePage.validateLoggedInUser(
      `Logged in as ${userdata.validUser.firstname}`
    );

    //go to cart
    cy.get('#header a[href="/view_cart"]').click();

    //validate one item is added in cart
    cy.get("#cart_info_table tbody tr").should("have.length", 1);

    //click checkout button
    cy.contains("Proceed To Checkout").click();

    cy.url().should("eq", "https://www.automationexercise.com/checkout");

    //checkout page validations
    cy.get("#address_delivery").contains(`${userdata.validUser.firstname}`);

    //click placeorder
    cy.get("a[href='/payment']")
      .should("be.visible")
      .contains("Place Order")
      .click();

    //Payment page
    cy.url().should("eq", "https://www.automationexercise.com/payment");

    cy.get('[data-qa="name-on-card"]').type(`${paymentData.cardName}`);
    cy.get('[data-qa="card-number"]').type(`${paymentData.cardNumber}`);
    cy.get('[data-qa="cvc"]').type(`${paymentData.cvv}`);
    cy.get('[data-qa="expiry-month"]').type(`${paymentData.expirationMonth}`);
    cy.get('[data-qa="expiry-year"]').type(`${paymentData.expirationYear}`);

    cy.get('button[id="submit"]').click();

    cy.get('[data-qa="order-placed"]').as("orderPlacedTitle", {
      timeout: 10000,
    });

    cy.wait(2000);

    // cleanup if needed to delete account before login
    HomePage.clickDeleteAccount();
    DeleteAccount.validateURL().validateSuccessMsg().clickContinue();
  });
});
