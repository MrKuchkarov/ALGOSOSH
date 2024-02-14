import {ElementStates} from "../types/element-states";

export const TEST_URL = "http://localhost:3000";
export const arrayWithOneItem = [{ item: 42, state: ElementStates.Default }];

export const arrayWithItems = [
    { item: 8, state: ElementStates.Modified },
    { item: 4, state:ElementStates.Modified },
    { item: 23, state:ElementStates.Modified },
    { item: 16, state:ElementStates.Modified },
    { item: 15, state:ElementStates.Modified },
    { item: 42, state:ElementStates.Modified }
];

export const resultArrayWithItemsAsc = [
    { item: 4, state: ElementStates.Modified },
    { item: 8, state:ElementStates.Modified },
    { item: 15, state:ElementStates.Modified },
    { item: 16, state:ElementStates.Modified },
    { item: 23, state:ElementStates.Modified },
    { item: 42, state:ElementStates.Modified }
];

export const resultArrayWithItemsDesc = [
    { item: 42, state: ElementStates.Modified },
    { item: 23, state:ElementStates.Modified },
    { item: 16, state:ElementStates.Modified },
    { item: 15, state:ElementStates.Modified },
    { item: 8, state:ElementStates.Modified },
    { item: 4, state:ElementStates.Modified },
];