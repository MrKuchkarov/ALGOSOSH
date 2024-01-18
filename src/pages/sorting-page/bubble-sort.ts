import {TArrayItem} from "../../types/types";
import {Dispatch, SetStateAction} from "react";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/delay";
import {DELAY_IN_MS} from "../../constants/delays";
import {swap} from "../../utils/swap";

const bubbleSort = async (
    array: TArrayItem[],
    setArray: Dispatch<SetStateAction<TArrayItem[]>>,
    setActive: Dispatch<SetStateAction<boolean>>,
    setIsReversed: Dispatch<SetStateAction<boolean>>,
    compare: (a: number, b: number) => boolean
) => {
    setActive(true);
    setIsReversed(false);

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            array[j].state = ElementStates.Changing;
            array[j + 1].state = ElementStates.Changing;
            setArray([...array]);
            await delay(DELAY_IN_MS);
            if (compare(array[j].item, array[j + 1].item)) {
                swap(array, j, j + 1);
            }
            array[j].state = ElementStates.Default;
        }
        array[array.length - i - 1].state = ElementStates.Modified;
        setArray([...array]);
    }

    setActive(false);
    setIsReversed(true);
};

export const bubbleSortAscending = async (
    array: TArrayItem[],
    setArray: Dispatch<SetStateAction<TArrayItem[]>>,
    setActive: Dispatch<SetStateAction<boolean>>,
    setIsReversed: Dispatch<SetStateAction<boolean>>
) => {
    await bubbleSort(array, setArray, setActive, setIsReversed, (a, b) => a < b);
};

export const bubbleSortDescending = async (
    array: TArrayItem[],
    setArray: Dispatch<SetStateAction<TArrayItem[]>>,
    setActive: Dispatch<SetStateAction<boolean>>,
    setIsReversed: Dispatch<SetStateAction<boolean>>
) => {
    await bubbleSort(array, setArray, setActive, setIsReversed, (a, b) => a > b);
};

// Generalized bubbleSort Function
// - compare: (a: number, b: number) => boolean: This is a comparison function that takes two arguments a and b and returns a boolean value.
//   It is used to determine the sorting order (ascending or descending).
// - await bubbleSort(array, setArray, setActive, setIsReversed, (a, b) => a < b);:
//   Calls the bubble sort function for ascending order using the comparison function (a, b) => a < b.
// - await bubbleSort(array, setArray, setActive, setIsReversed, (a, b) => a > b);:
//   Calls the bubble sort function for descending order using the comparison function (a, b) => a > b.

// Helper Functions
// - bubbleSortAscending and bubbleSortDescending: These functions provide an interface to call the generalized bubbleSort
//   function with the respective comparison functions for ascending and descending order.
// - By introducing the generalized bubbleSort function, it avoids code duplication for bubble sort in different directions,
//   ensuring a more flexible and easily extendable implementation.