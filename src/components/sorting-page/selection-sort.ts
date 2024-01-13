import {TArrayItem} from "../../types/types";
import {Dispatch, SetStateAction} from "react";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {swap} from "../../utils/swap";

export const selectSortAscending = async (array: TArrayItem[],
                                          setArray: Dispatch<SetStateAction<TArrayItem[]>>,
                                          setActive: Dispatch<SetStateAction<boolean>>) => {
    setActive(true);
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = 0; j < array.length; j++) {
            array[i].state = ElementStates.Changing;
            array[j].state = ElementStates.Changing;
            setArray([...array]);
            await delay(SHORT_DELAY_IN_MS);
            if (array[j].item < array[minIndex].item) {
                minIndex = j;
            }
            array[j].state = ElementStates.Default;
            setArray([...array]);
        }
        swap(array, i, minIndex);
        array[i].state = ElementStates.Modified;
    }
    array[array.length - 1].state = ElementStates.Modified;
    setArray([...array]);
    setActive(false);
};

export const selectSortDescending = async (array: TArrayItem[],
                                           setArray: Dispatch<SetStateAction<TArrayItem[]>>,
                                           setActive: Dispatch<SetStateAction<boolean>>) => {
    setActive(true);
    for (let i = 0; i < array.length - 1; i++) {
        let maxIndex = i;
        for (let j = 0; j < array.length; j++) {
            array[i].state = ElementStates.Changing;
            array[j].state = ElementStates.Changing;
            setArray([...array]);
            await delay(SHORT_DELAY_IN_MS);
            if (array[j].item > array[maxIndex].item) {
                maxIndex = j;
            }
            array[j].state = ElementStates.Default;
            setArray([...array]);
        }
        swap(array, i, maxIndex);
        array[i].state = ElementStates.Modified;
    }
    array[array.length - 1].state = ElementStates.Modified;
    setArray([...array]);
    setActive(false);
};