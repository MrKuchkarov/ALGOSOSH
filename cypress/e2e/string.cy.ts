import {TEST_URL} from "../../src/constants/testing";
import {DELAY_IN_MS, DELAY_IN_MS_LONG} from "../../src/constants/delays";
describe("String", () => {
    beforeEach(() => {
        cy.visit(`${TEST_URL}/iterative`);
    });

    it("Button should be disabled if string is empty", () => {
        cy.get("input").should("be.empty");
        cy.get('button[type="submit"]').should("be.disabled");
    });
    it("Should reversed correctly", () => {
        cy.get("input").type("run");
        cy.contains("Развернуть").click();

        cy.get("[class^=circle_circle]").as("circle");

        cy.get("@circle").each((el, index) => {
            if (index === 0 || index === 2) {
                cy.wrap(el).should(
                    "have.css",
                    "border",
                    "4px solid rgb(210, 82, 225)"
                );
            }
            if (index === 0) expect(el).to.contain("r");
            if (index === 2) expect(el).to.contain("n");
        });
        cy.wait(DELAY_IN_MS);

        cy.get("@circle")
            .each((el, index) => {
                cy.wrap(el).should(
                    "have.css",
                    "border",
                    "4px solid rgb(127, 224, 81)"
                );
                if (index === 0) expect(el).to.contain("n");
                if (index === 1) expect(el).to.contain("u");
                if (index === 2) expect(el).to.contain("r");
            });
    });

    it("Should reverse correctly for even length strings", () => {
        cy.get("input").type("love");
        cy.contains("Развернуть").click();

        cy.get("[class^=circle_circle]").as("circle");

        cy.get("@circle").each((el, index) => {
            if (index === 0 || index === 3) {
                cy.wrap(el).should(
                    "have.css",
                    "border",
                    "4px solid rgb(210, 82, 225)"
                );
            }
            if (index === 0) expect(el).to.contain("l");
            if (index === 3) expect(el).to.contain("e");
        });
        cy.wait(DELAY_IN_MS_LONG);

        cy.get("@circle").each((el, index) => {
            cy.wrap(el).should(
                "have.css",
                "border",
                "4px solid rgb(127, 224, 81)"
            );
            if (index === 0) expect(el).to.contain("e");
            if (index === 1) expect(el).to.contain("v");
            if (index === 2) expect(el).to.contain("o");
            if (index === 3) expect(el).to.contain("l");
        });
    });
})