import { faker } from "@faker-js/faker";

const { firstName, lastName, pwd, email } = require("../fixtures/user.json");

describe("template spec", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.get('button:contains("Tout refuser")').click();
  });

  it("Register success", () => {
    // run once
    // cy.signup(firstName, lastName, email, pwd);
    cy.signup(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.internet.email(),
      pwd
    );
    cy.url().should("include", "/dashboard/orders");
  });

  it("Login success", () => {
    // Fixture data
    cy.auth(email, pwd).then(() => {
      cy.url().should("include", "/dashboard/orders");
    });
  });

  it("Register failure [Email format]", () => {
    cy.signup(firstName, lastName, "badFormatMail.nowhere.dtc", pwd);
    cy.get("#signup-email")
      .should("have.prop", "validity")
      .and("have.property", "valid", false);
  });

  it("Register failure [Password format]", () => {
    cy.generateRandomEmail().then((email) => {
      cy.signup(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        "password"
      );
      cy.contains(
        "Au moins 8 caractères, dont 1 majuscule, 1 minuscule et 1 chiffre. Parce qu'on sait jamais."
      );
    });
  });
});
