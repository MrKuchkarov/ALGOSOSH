import {TArrayItem} from "../../types/types";
import {Dispatch, SetStateAction} from "react";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/delay";
import {DELAY_IN_MS} from "../../constants/delays";
import {swap} from "../../utils/swap";

export const bubbleSortAscending = async (
    array: TArrayItem[],
    setArray: Dispatch<SetStateAction<TArrayItem[]>>,
    setActive: Dispatch<SetStateAction<boolean>>,
    setIsReversed: Dispatch<SetStateAction<boolean>>) => {

    setActive(true);
    setIsReversed(false);

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            array[j].state = ElementStates.Changing;
            array[j + 1].state = ElementStates.Changing;
            setArray([...array]);
            await delay(DELAY_IN_MS);
            if (array[j].item < array[j + 1].item) {
                swap(array, j, j + 1);
            }
            array[j].state = ElementStates.Default;
        }
        array[array.length - i - 1].state = ElementStates.Modified;
        setArray([...array]);
    }
    setActive(false);
    setIsReversed(true)
};

export const bubbleSortDescending = async (
    array: TArrayItem[],
    setArray: Dispatch<SetStateAction<TArrayItem[]>>,
    setActive: Dispatch<SetStateAction<boolean>>,
    setIsReversed: Dispatch<SetStateAction<boolean>>) => {

    setActive(true);
    setIsReversed(false);

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            array[j].state = ElementStates.Changing;
            array[j + 1].state = ElementStates.Changing;
            setArray([...array]);
            await delay(DELAY_IN_MS);
            if (array[j].item > array[j + 1].item) {
                swap(array, j, j + 1);
            }
            array[j].state = ElementStates.Default;
        }
        array[array.length - i - 1].state = ElementStates.Modified;
        setArray([...array]);
    }
    setActive(false);
    setIsReversed(true)
};

