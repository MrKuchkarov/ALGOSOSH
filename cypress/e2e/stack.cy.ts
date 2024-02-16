import {TEST_URL} from "../../src/constants/testing";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const addElements = (value: string) => {
  cy.get("input").type(value);
  cy.contains("button", "Добавить").click();
  cy.get("[class*=circle_changing]").contains(value);
  cy.wait(SHORT_DELAY_IN_MS);
  cy.get("[class*=circle_default]").contains(value);
};

const removeElements = (value: string[]) => {
    cy.contains("button", "Удалить").click();
    cy.get("[class*=circle_changing]").contains(value);
    cy.get("[class*=circle_circle]").each((element, index) => {
        if (index === length - 1) {
            expect(element.text()).to.contains(value);
        }
    });
}
const value: any = ["a", "b", "c"];

describe("stack", () => {
    beforeEach(() => {
        cy.visit(`${TEST_URL}/stack`);
    });

    it("Button should be disabled if string is empty", () => {
        cy.get("input").should("be.empty");
        cy.get('button[type="submit"]').should("be.disabled");
    });

    it("Element should be adding correctly", () => {
        value.forEach((item: string, index: number) => {
            addElements(item);
            cy.get("[class*=circle_content]").as("circle");
            cy.get("@circle")
                .should("have.length", index + 1)
                .each((element, idx) => {
                idx === index && expect(element.text()).to.contain(item);
                idx === index && expect(element.text()).to.contain("top");
                idx === index && expect(element.text()).to.contain(item);
            })
        })
    });
    it("Element should be removing correctly", () => {
        value.forEach((item: string) => addElements(item));
        cy.get("[class*=circle_content]").as("circle");
        removeElements(value[2]);

        cy.get("@circle")
            .should("have.length", 2)
            .each((element, idx) => {
                idx === 0 && expect(element.text()).to.contains(value[0]);
                if (idx === 1) {
                    expect(element.text()).to.contains(value[1]);
                    expect(element.text()).to.contains("top");
                }
            })
    });

    it("Clear should be correctly", () => {
        value.forEach((item: string) => addElements(item));
        cy.contains("button", "Очистить").click();
        cy.get("[class*=circle_content]")
            .should("have.length", 0)
    });
});