import { faker } from "@faker-js/faker";

describe("template spec", () => {
  beforeEach(() => {
    cy.fixture("user.json").as("user");
  });

  it.skip("Note API | User register", () => {
    cy.request({
      url: Cypress.env("noteApiBaseUrl") + "/users/register",
      method: "POST",
      body: {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    }).then((response) => {
      expect(response.status).to.be.equal(201);
    });
  });

  it("Note API | User login", function () {
    cy.log("mail : " + this.user.email + " pwd : " + this.user.pwd);
    cy.request({
      url: Cypress.env("noteApiBaseUrl") + "/users/login",
      method: "POST",
      body: {
        email: this.user.email,
        password: this.user.pwd,
      },
    }).then((response) => {
      expect(response.status).to.be.equal(200);
      if (response.status === 200) {
        cy.log("Store auth-token = " + response.body.data.token);
        Cypress.env("token", response.body.data.token);
      }
    });
  });

  it("Note API | Note creation", () => {
    const token = Cypress.env("token");
    cy.createNote(token, "myTile" + Math.floor(Math.random()*100), faker.definitions.animal.cat, "Home" ).then((response) => {
      expect(response.status).to.be.equal(200);
    });
  });
});
