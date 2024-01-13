import {TArrayItem} from "../../types/types";
import {Dispatch, SetStateAction} from "react";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {swap} from "../../utils/swap";

export const selectSort = async (
    array: TArrayItem[],
    setArray: Dispatch<SetStateAction<TArrayItem[]>>,
    setActive: Dispatch<SetStateAction<boolean>>,
    setIsReversed: Dispatch<SetStateAction<boolean>>,
    compare: (a: number, b: number) => boolean
) => {
    setActive(true);
    setIsReversed(false);

    for (let i = 0; i < array.length - 1; i++) {
        let indexToCompare = i;
        for (let j = i + 1; j < array.length; j++) {
            array[i].state = ElementStates.Changing;
            array[j].state = ElementStates.Changing;
            setArray([...array]);
            await delay(SHORT_DELAY_IN_MS);

            if (compare(array[j].item, array[indexToCompare].item)) {
                indexToCompare = j;
            }

            array[j].state = ElementStates.Default;
            setArray([...array]);
        }

        swap(array, i, indexToCompare);
        array[i].state = ElementStates.Modified;
        setArray([...array]);
    }

    array[array.length - 1].state = ElementStates.Modified;
    setArray([...array]);
    setActive(false);
    setIsReversed(true);
};

export const selectSortAscending = async (
    array: TArrayItem[],
    setArray: Dispatch<SetStateAction<TArrayItem[]>>,
    setActive: Dispatch<SetStateAction<boolean>>,
    setIsReversed: Dispatch<SetStateAction<boolean>>
) => {
    await selectSort(array, setArray, setActive, setIsReversed, (a, b) => a < b);
};

export const selectSortDescending = async (
    array: TArrayItem[],
    setArray: Dispatch<SetStateAction<TArrayItem[]>>,
    setActive: Dispatch<SetStateAction<boolean>>,
    setIsReversed: Dispatch<SetStateAction<boolean>>
) => {
    await selectSort(array, setArray, setActive, setIsReversed, (a, b) => a > b);
};

// The code represents the implementation of the Selection Sort algorithm for an array of elements TArrayItem.
// This sorting algorithm, at each step, finds the minimum (for ascending order) or maximum (for descending order)
// element in the remaining part of the array and swaps it with the element at the current position.

// Let's break down the key components of the code:
//
// selectSort Function:
//     - Takes an array array, state management functions (setArray, setActive, setIsReversed), and a comparison function compare.
//     - Sets the setActive(true) flag to lock the interface during sorting and resets the setIsReversed(false) flag.
//     - The outer loop iterates through all elements of the array, excluding the last one.
//     - The inner loop finds the minimum or maximum element, depending on the sorting direction, and swaps the current element with the found one.
//     - Sets the state of elements for visualization (Changing, Default, Modified).
//     - Calls the delay function to visualize sorting steps.
//     - Updates the array state after each iteration of the inner loop.
//     - After completing the sorting, sets the state of the element in the last position to Modified,
//       updates the array, and removes the lock and state change flags.

//  selectSortAscending and selectSortDescending Functions:
//     - Represent variations of selectSort for sorting in ascending and descending order, respectively.
//     - Simply call selectSort, passing the comparison function (a, b) => a < b for ascending order and (a, b) => a > b for descending order.

//  Helper Functions:
//     - The code uses helper functions delay for introducing a delay in visualizing sorting steps and swap for swapping elements in the array.
//     - The code is structured in a way that allows reusing the common sorting logic for different directions.
//       All actions related to visualization and array state management are encapsulated in separate functions,
//       making the code more readable and modular.