import {render} from "@testing-library/react";
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

describe("Testing circle component", () => {
    it("Should be without a letter", () => {
        const {container} = render(<Circle/>);
        expect(container.firstChild).toMatchSnapshot();
    });
    it("Should be with a letter", () => {
        const {container} = render(<Circle letter={"a"}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
    it("Should be with head", () => {
        const {container} = render(<Circle head={"7"}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
    it("Should be with a react element in head", () => {
        const {container} = render(<Circle head={<Circle/>}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
    it("Should be with tail", () => {
        const {container} = render(<Circle tail={"7"}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
    it("Should be with a react element in tail", () => {
        const {container} = render(<Circle tail={<Circle/>}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
    it("Should be with index", () => {
        const { container } = render(<Circle index={0}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
    it("Props isSmall should be true", () => {
        const { container } = render(<Circle isSmall={true}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
    it("Should be default state", () => {
        const { container } = render(<Circle state={ElementStates.Default}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
    it("Should be changing state", () => {
        const { container } = render(<Circle state={ElementStates.Changing} />);
        expect(container.firstChild).toMatchSnapshot();
    });
    it("Should be modified state", () => {
        const { container } = render(<Circle state={ElementStates.Modified}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
});