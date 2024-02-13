import {fireEvent, render, screen, act} from "@testing-library/react";
import { Button } from "./button";
import { Direction } from "../../../types/direction";
import React from "react";
describe("Testing button component", () => {
    test("button with text", () => {
        const { container } = render(<Button text="test text" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test("button without text", () => {
        const { container } = render(<Button />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test("button disabled", () => {
        const { container } = render(<Button disabled />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test("button has loading", () => {
        const { container } = render(<Button isLoader={true} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test("Button has Ascending", () => {
        const { container } = render(<Button sorting={Direction.Ascending}/>);
        expect(container.firstChild).toMatchSnapshot();
    });

    test("Button has Descending", () => {
        const { container } = render(<Button sorting={Direction.Descending}/>);
        expect(container.firstChild).toMatchSnapshot();
    });

    test("Button has sizes", () => {
        const { container } = render(<Button sizes="small" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test("Callback should work correctly after click", () => {
        const cb = jest.fn();
        render(<Button onClick={cb} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(cb).toHaveBeenCalled();
    });
});
