import {selectSortAscending, selectSortDescending} from "./utils/selection-sort";
import {bubbleSortAscending, bubbleSortDescending} from "./utils/bubble-sort";
import {
    arrayWithItems,
    resultArrayWithItemsAsc,
    arrayWithOneItem,
    resultArrayWithItemsDesc
} from "../../constants/testing";
import {delay} from "../../utils/delay";

jest.setTimeout(30000);
let setArray: jest.Mock;
let setActive: jest.Mock;
let setIsReversed: jest.Mock;

beforeEach(() => {
    setArray = jest.fn();
    setActive = jest.fn();
    setIsReversed = jest.fn();
});

afterEach(() => {
    setArray.mockReset();
    setActive.mockReset();
    setIsReversed.mockReset();
});

describe("Selection sort ascending", () => {
    it("Should be correct with empty array", async () => {
        await selectSortAscending([], setArray, setActive, setIsReversed, delay);
        expect(setArray).toHaveBeenCalledTimes(0);
    });
    it("Should be correct with only one item", async () => {
        await selectSortAscending(arrayWithOneItem, setArray, setActive, setIsReversed);
        expect(setArray).toHaveBeenCalledTimes(0);
    });
    it("Should be correct with items", async () => {
        await selectSortAscending(arrayWithItems, setArray, setActive, setIsReversed);
        expect(setArray).toHaveBeenLastCalledWith(resultArrayWithItemsAsc);
    });
});

describe("Selection sort descending", () => {
    it("Should be correct with empty array", async () => {
        await selectSortDescending([], setArray, setActive, setIsReversed, delay);
        expect(setArray).toHaveBeenCalledTimes(0);
    });
    it( "Should be correct with only one item", async () => {
        await selectSortDescending(arrayWithOneItem, setArray, setActive, setIsReversed);
        expect(setArray).toHaveBeenCalledTimes(0);
    });
    it("Should be correct with items", async () => {
        await selectSortDescending(arrayWithItems, setArray, setActive, setIsReversed);
        expect(setArray).toHaveBeenLastCalledWith(resultArrayWithItemsDesc)
    });
});

describe("Bubble sort ascending", () => {
    it("Should be correct with empty array", async () => {
        await bubbleSortAscending([], setArray, setActive, setIsReversed, delay);
        expect(setArray).toHaveBeenCalledTimes(0);
    });
    it("Should be correct with only one item", async () => {
        await bubbleSortAscending(arrayWithOneItem, setArray, setActive, setIsReversed);
        expect(setArray).toHaveBeenCalledTimes(0);
    });
    it("Should be correct with items", async () => {
        await bubbleSortAscending(arrayWithItems, setArray, setActive, setIsReversed);
        expect(setArray).toHaveBeenLastCalledWith(resultArrayWithItemsDesc);
    });
});

describe("Bubble sort descending", () => {
    it("Should be correct with empty array", async () => {
        await bubbleSortDescending([], setArray, setActive, setIsReversed, delay);
        expect(setArray).toHaveBeenCalledTimes(0);
    });
    it("Should be correct with only one item", async () => {
        await bubbleSortDescending(arrayWithOneItem, setArray, setActive, setIsReversed);
        expect(setArray).toHaveBeenCalledTimes(0);
    });
    it("Should be correct with items", async () => {
        await bubbleSortDescending(arrayWithItems, setArray, setActive, setIsReversed);
        expect(setArray).toHaveBeenLastCalledWith(resultArrayWithItemsAsc);
    });
})