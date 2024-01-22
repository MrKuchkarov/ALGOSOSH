import {ElementStates} from "./element-states";

export type TCircleItem = {
    _id?: string
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

export type TQueueItem = TCircleItem & {
    head?: string;
}

export enum position {
    head = "head",
    tail = "tail",
}

export enum ElementColors {
    Default = "#0032ff",
    Changing = "#d252e1",
    Modified = "#7fe051",
}