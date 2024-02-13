import {ElementStates} from "../../types/element-states";
import {reverseStringArray} from "./utils/reverse-string";
import {TCircleItem} from "../../types/types";

const delayFunction = (ms: number): Promise<void> => {
    return new Promise<void>(resolve => {
        setTimeout(resolve, ms);
    });
};
// Функция для создания строки в обратном порядке
const createReversedStringArray = (string: string) => {
    return string.split("").reverse().map(item => ({ item, state: ElementStates.Modified }));
};
describe("Reverse string", () => {
    const setArray = jest.fn();
    const setActive = jest.fn();

    it("Should be correctly with even items", async () => {
        // Arrange
        const string = "1234";
        const stringArray = string
            .split("")
            .map(item => ({item, state: ElementStates.Default}));
        const reversedStringArray = createReversedStringArray(string)

        // Act
        await reverseStringArray({
            array: stringArray,
            setArray: setArray,
            setActive: setActive,
            delayFunction: delayFunction,
        });

        // Assert
        expect(setArray).toHaveBeenLastCalledWith(reversedStringArray);
    });
    it("Should be correctly with odd items", async () => {
        // Arrange
        const string = "12345";
        const stringArray = string
            .split("")
            .map(item => ({item, state: ElementStates.Default}));
        const reversedStringArray = createReversedStringArray(string);

        // Act
        await reverseStringArray({
            array: stringArray,
            setArray: setArray,
            setActive: setActive,
            delayFunction: delayFunction,
        });

        // Assert
        expect(setArray).toHaveBeenLastCalledWith(reversedStringArray);
    });
    it("Should be correctly with only one item", async () => {
        // Arrange
        const string = "7";
        const stringArray = string
            .split("")
            .map(item => ({item, state: ElementStates.Default}));
        const reversedStringArray = createReversedStringArray(string)

        // Act
        await reverseStringArray({
            array: stringArray,
            setArray: setArray,
            setActive: setActive,
            delayFunction: delayFunction,
        });

        // Assert
        expect(setArray).toHaveBeenLastCalledWith(reversedStringArray);
    });
    it("Should be correctly with empty string", async () => {
        // Arrange
        const string = "";
        const stringArray = string
            .split("")
            .map(item => ({item, state: ElementStates.Default}));

        // Act
        await reverseStringArray({
            array: stringArray,
            setArray: setArray,
            setActive: setActive,
            delayFunction: delayFunction,
        });

        // Assert
        expect(setArray).toHaveBeenCalledTimes(0);
    });
    it("Should be correctly with array of one element", async () => {
        // Arrange
        const stringArray = [{ item: "1", state: ElementStates.Default }];
        const reversedStringArray = [{ item: "1", state: ElementStates.Modified }];

        // Act
        // Ожидается, что массив с одним элементом останется неизменным после вызова функции
        await reverseStringArray({
            array: stringArray,
            setArray,
            setActive,
            delayFunction,
        });

        // Assert
        // Ожидается, что setArray был вызван с измененным массивом
        expect(setArray).toHaveBeenCalledWith(reversedStringArray);
    });
    it("Should be correctly with empty array", async () => {

        // Arrange
        const stringArray: TCircleItem[] = [];

        // Act
        // Ожидается, что массив останется пустым после вызова функции
        await reverseStringArray({
            array: stringArray,
            setArray,
            setActive,
            delayFunction,
        });

        // Assert
        // Ожидается, что функция не вызовет setArray
        expect(setArray).not.toHaveBeenCalled();
    });
})


