import {fireEvent, render, screen, act} from "@testing-library/react";
import { Button } from "./button";
import { Direction } from "../../../types/direction";
import React from "react";
describe("Testing button component", () => {
    it("Button with text", () => {
        const { container } = render(<Button text="test text" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it("Button without text", () => {
        const { container } = render(<Button />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it("Button disabled", () => {
        const { container } = render(<Button disabled />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it("Button has loading", () => {
        const { container } = render(<Button isLoader={true} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it("Button has Ascending", () => {
        const { container } = render(<Button sorting={Direction.Ascending}/>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it("Button has Descending", () => {
        const { container } = render(<Button sorting={Direction.Descending}/>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it("Button has sizes", () => {
        const { container } = render(<Button sizes="small" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it("Callback should work correctly after click", () => {
        const cb = jest.fn();
        render(<Button onClick={cb} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(cb).toHaveBeenCalled();
    });
});
