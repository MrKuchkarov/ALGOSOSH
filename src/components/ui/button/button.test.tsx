import {fireEvent, render, screen} from "@testing-library/react";
import { Button } from "./button";
import { Direction } from "../../../types/direction";
import React from "react";

type ButtonProps = {
    text?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    sorting?: Direction;
    sizes?: "small" | "medium" | "big";
    isLoader?: boolean;
}
describe("Testing button component", () => {
    const testSnapshot = (props: ButtonProps) => {
        const { container } = render(<Button {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    };
    it("Button with text", () => {
        testSnapshot({ text: "text test" })
    });

    it("Button without text", () => {
        testSnapshot({ text: "" })
    });

    it("Button disabled", () => {
        testSnapshot({ disabled: true })
    });

    it("Button has loading", () => {
        testSnapshot({ isLoader: true })
    });

    it("Button has Ascending", () => {
        testSnapshot({ sorting: Direction.Ascending })
    });

    it("Button has Descending", () => {
        testSnapshot({ sorting: Direction.Descending })
    });

    it("Button has sizes", () => {
        testSnapshot({ sizes: "small" })
    });

    it("Callback should work correctly after click", () => {
        const cb = jest.fn();
        render(<Button onClick={cb} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(cb).toHaveBeenCalled();
    });
});
