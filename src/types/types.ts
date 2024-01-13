import {ElementStates} from "./element-states";

export type TCircleItem = {
    item: string;
    state: ElementStates;
}

export enum SortName {
    bubble = "пузырёк",
    select = "выбор",
}

export type TArrayItem = {
    item: number;
    state: ElementStates;
}