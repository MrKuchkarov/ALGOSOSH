import {ElementStates} from "./element-states";

export type TCircleItem = {
    item: string;
    state: ElementStates;
}

export enum SortName {
    bubble = "пузырёк",
    select = "выбор",
}

export type TArrayItems = {
    item: number;
    state: ElementStates;
}