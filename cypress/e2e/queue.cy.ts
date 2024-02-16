import {TEST_URL} from "../../src/constants/testing";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const addElements = (value: string) => {
    cy.get("input").type(value);
    cy.contains("button", "Добавить").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=circle_default]").contains(value);
};

const removeElements = (value: string[]) => {
    cy.contains("button", "Удалить").click();
    cy.get("[class*=circle_changing]").contains(value);
}

const values: any = ["c", "b", "a"];

describe("queue", () => {
    beforeEach(() => {
        cy.visit(`${TEST_URL}/queue`)
    });

    it("Button should be disabled if string is empty", () => {
        cy.get("input").should("be.empty");
        cy.get('button[type="submit"]').should("be.disabled");
    });

    it("Should adding correctly", () => {
        addElements(values[0]);
        cy.get("[class*=circle_content]").as("circle");
        cy.get("@circle").eq(0)
            .should("contain", values[0])
            .and("contain", "head")
            .and("contain", "tail");

       addElements(values[1]);
       cy.get("@circle").each((element, idx) => {
           idx === 1 && expect(element.text()).to.contain(values[1]);
           idx === 0 && expect(element.text()).to.contain("head");
           idx === 1 && expect(element.text()).to.contain("tail");
       })
    });

    it("Should removing correctly", () => {
        addElements(values[0]);
        addElements(values[1])
        cy.get("[class*=circle_content").as("circle");
        removeElements(values[0]);
        cy.get("@circle").each((element, idx) => {
            idx === 0 && expect(element.text()).to.contain(values[0]);
            if (idx === 1) {
                expect(element.text()).to.contain(values[1]);
                expect(element.text()).to.contain("tail");
            }
        });

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get("@circle").eq(1).should("contain", "head")
    });

    it("Should clear correctly", () => {
        values.forEach((item: string) => addElements(item))
        cy.contains("Очистить").click();
        cy.get("[class*=circle_circle]").should("have.text", "")
    });
});