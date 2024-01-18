import { TArrayItem } from "../../types/types";
import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/swap";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {delay} from "../../utils/delay";

export const selectSort = async (
    array: TArrayItem[],
    setArray: Dispatch<SetStateAction<TArrayItem[]>>,
    setActive: Dispatch<SetStateAction<boolean>>,
    setIsReversed: Dispatch<SetStateAction<boolean>>,
    compare: (a: number, b: number) => boolean,
    delayFunction: (ms: number) => Promise<void> = delay
) => {
    setActive(true);
    setIsReversed(false);

    const newArray = [...array]; // Создаем новый массив для изменений

    for (let i = 0; i < newArray.length - 1; i++) {
        let indexToCompare = i;
        for (let j = i + 1; j < newArray.length; j++) {
            newArray[i].state = ElementStates.Changing;
            newArray[j].state = ElementStates.Changing;
            setArray([...newArray]);
            await delayFunction(SHORT_DELAY_IN_MS);

            if (compare(newArray[j].item, newArray[indexToCompare].item)) {
                indexToCompare = j;
            }

            newArray[j].state = ElementStates.Default;
            setArray([...newArray]);
        }

        swap(newArray, i, indexToCompare);
        newArray[i].state = ElementStates.Modified;
        setArray([...newArray]);
    }

    newArray[newArray.length - 1].state = ElementStates.Modified;
    setArray([...newArray]);
    setActive(false);
    setIsReversed(true);
};

export const selectSortAscending = async (
    array: TArrayItem[],
    setArray: Dispatch<SetStateAction<TArrayItem[]>>,
    setActive: Dispatch<SetStateAction<boolean>>,
    setIsReversed: Dispatch<SetStateAction<boolean>>,
    delayFunction: (ms: number) => Promise<void> = delay
) => {
    const newArray = [...array];
    await selectSort(newArray, setArray, setActive, setIsReversed, (a, b) => a < b, delayFunction);
};

export const selectSortDescending = async (
    array: TArrayItem[],
    setArray: Dispatch<SetStateAction<TArrayItem[]>>,
    setActive: Dispatch<SetStateAction<boolean>>,
    setIsReversed: Dispatch<SetStateAction<boolean>>,
    delayFunction: (ms: number) => Promise<void> = delay
) => {
    const newArray = [...array];
    await selectSort(newArray, setArray, setActive, setIsReversed, (a, b) => a > b, delayFunction);
};
