import { TArrayItem } from "../../types/types";
import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import { swap } from "../../utils/swap";

const bubbleSort = async (
    array: TArrayItem[],
    setArray: Dispatch<SetStateAction<TArrayItem[]>>,
    setActive: Dispatch<SetStateAction<boolean>>,
    setIsReversed: Dispatch<SetStateAction<boolean>>,
    compare: (a: number, b: number) => boolean,
    delayFunction: (ms: number) => Promise<void>
) => {
    setActive(true);
    setIsReversed(false);

    const newArray = [...array]; // Создаем новый массив для изменений

    for (let i = 0; i < newArray.length; i++) {
        for (let j = 0; j < newArray.length - i - 1; j++) {
            newArray[j].state = ElementStates.Changing;
            newArray[j + 1].state = ElementStates.Changing;
            setArray([...newArray]);
            await delayFunction(SHORT_DELAY_IN_MS);
            if (compare(newArray[j].item, newArray[j + 1].item)) {
                swap(newArray, j, j + 1);
            }
            newArray[j].state = ElementStates.Default;
        }
        newArray[newArray.length - i - 1].state = ElementStates.Modified;
        setArray([...newArray]);
    }

    setActive(false);
    setIsReversed(true);
};

export const bubbleSortAscending = async (
    array: TArrayItem[],
    setArray: Dispatch<SetStateAction<TArrayItem[]>>,
    setActive: Dispatch<SetStateAction<boolean>>,
    setIsReversed: Dispatch<SetStateAction<boolean>>,
    delayFunction: (ms: number) => Promise<void>
) => {
    const newArray = [...array]; // Создаем новый массив для изменений
    await bubbleSort(newArray, setArray, setActive, setIsReversed, (a, b) => a < b, delayFunction);
};

export const bubbleSortDescending = async (
    array: TArrayItem[],
    setArray: Dispatch<SetStateAction<TArrayItem[]>>,
    setActive: Dispatch<SetStateAction<boolean>>,
    setIsReversed: Dispatch<SetStateAction<boolean>>,
    delayFunction: (ms: number) => Promise<void>
) => {
    const newArray = [...array]; // Создаем новый массив для изменений
    await bubbleSort(newArray, setArray, setActive, setIsReversed, (a, b) => a > b, delayFunction);
};
