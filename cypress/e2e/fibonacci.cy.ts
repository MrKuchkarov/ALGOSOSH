import {TEST_URL} from "../../src/constants/testing";
describe("fibonacci", () => {
    beforeEach(() => {
        cy.visit(`${TEST_URL}/fibonacci`);
    })

    it("Button should be disabled is string is empty", () => {
        cy.get("input").should("be.empty");
        cy.get('button[type="submit"]').should("be.disabled");
    });
    it("Numbers should be generated correctly", () => {
        cy.get("input").type("3");
        cy.contains("Расчитать").click();

        const expectedNumbers: any = [1, 1, 2, 3];
        cy.get("[class^=circle_circle]")
            .should("have.length", expectedNumbers.length)
            .each((el, index) => {
                const expectedNumber = expectedNumbers[index];
                expect(el).to.contain(expectedNumber.toString());
            })
    });
})