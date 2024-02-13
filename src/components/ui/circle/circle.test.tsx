import {render} from "@testing-library/react";
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

type CircleProps = {
    letter?: string;
    head?: string | JSX.Element;
    tail?: string | JSX.Element;
    index?: number;
    isSmall?: boolean;
    state?: ElementStates;
}

describe("Testing circle component", () => {
    const testSnapshot = (props: CircleProps) => {
        const { container } = render(<Circle {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    };
    it("Should be without a letter", () => {
        testSnapshot({});
    });
    it("Should be with a letter", () => {
        testSnapshot({ letter: "a" })
    });
    it("Should be with head", () => {
        testSnapshot({ head: "7" })
    });
    it("Should be with a react element in head", () => {
        testSnapshot({ head: <Circle /> })
    });
    it("Should be with tail", () => {
        testSnapshot({ tail: "7" })
    });
    it("Should be with a react element in tail", () => {
        testSnapshot({ tail: <Circle /> });
    });

    it("Should be with index", () => {
        testSnapshot({ index: 0 });
    });

    it("Props isSmall should be true", () => {
        testSnapshot({ isSmall: true });
    });

    it("Should be default state", () => {
        testSnapshot({ state: ElementStates.Default });
    });

    it("Should be changing state", () => {
        testSnapshot({ state: ElementStates.Changing });
    });

    it("Should be modified state", () => {
        testSnapshot({ state: ElementStates.Modified });
    });
});