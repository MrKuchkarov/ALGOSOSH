import {TEST_URL} from "../../src/constants/testing";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const values: any = ["0", "34", "8", "1"];
describe("list", () => {
    beforeEach(() => {
        cy.visit(`${TEST_URL}/list`);
    });

    it("Should default list rendering correctly", () => {
        const circles = cy.get("[class*=circle_content]")
            .should("have.length", 4);
        values.forEach((value: string, idx: number) => {
            circles.each((element, index) => {
                index === idx && expect(element).contain(value);
            })
        });
        cy.get("[class*=circle_content]")
            .should("have.length", 4).eq(0)
            .should("contain", "head");

        cy.get("[class*=circle_content]")
            .should("have.length", 4).eq(3)
            .should("contain", "tail");
    });

    it("Should add to head correctly", () => {
        cy.get("input").first().type("42");
        cy.contains("button", "Добавить в head").click();
        // cy.get("[class*=circle_modified]").contains("42");
        cy.wait(DELAY_IN_MS);
        cy.get("[class*=circle_content]")
            .should("have.length", 5)
            .each((element, index) => {
                index === 0 && expect(element).contain("42");
                index === 0 && expect(element).contain("head");
                index === 4 && expect(element).contain("tail");
            })
        cy.get("[class*=circle_default]").contains("42");
    });

    it("Should add to tail correctly", () => {
        cy.get("input").first().type("42");
        cy.contains("button", "Добавить в tail").click();
        cy.get("[class*=circle_modified]").contains("42");
        cy.wait(DELAY_IN_MS);
        cy.get("[class*=circle_content]")
            .should("have.length", 5)
            .each((element, index) => {
                index === 4 && expect(element).contain("42");
                index === 4 && expect(element).contain("tail");
            });
        cy.get("[class*=circle_default]").contains("42");
    });

    it("Should add by index correctly", () => {
        cy.get("input").first().type("42");
        cy.get("input").eq(1).type("1");
        cy.contains("button", "Добавить по индекс").click();
        cy.get("[class*=circle_content]")
            .should("have.length", 5);
        cy.get("[class*=circle_changing]").contains("42");
        cy.get("[class*=circle_modified]").contains("42");
        cy.get("[class*=circle_default]").contains("42");
        cy.get("[class*=circle_content]").eq(1).contains("42");
    });

    it("Should remove from head correctly", () => {
        cy.contains("button", "Удалить из head").click();
        cy.get("[class*=circle_small]").contains(values[0]);
        cy.get("[class*=circle_modified]");
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get("[class*=circle_content]").first().contains("head");
        cy.get("[class*=circle_content]").should("have.length", 3);
    });

    it("Should remove from tail correctly", () => {
        cy.contains("button", "Удалить из tail").click();
        cy.get("[class*=circle_small]").contains(values[3]);
        cy.get("[class*=circle_modified]");
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get("[class*=circle_content]").last().contains("tail");
        cy.get("[class*=circle_content]").last().contains(values[2])
        cy.get("[class*=circle_content]").should("have.length", 3);
    });

    it("Should remove by index correctly", () => {
        cy.get("input").eq(1).type("1");
        cy.contains("button", "Удалить по индексу").click();
        cy.get("[class*=circle_content]").eq(0).find("[class*=circle_changing]");
        cy.get("[class*=circle_small]").contains(values[1]);
        cy.get("[class*=circle_content]").should("have.length", 3);
    });
})

