import {TCircleItem} from "../../types/types";
import {Dispatch, SetStateAction} from "react";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";
import {swap} from "../../utils/swap";
import {delay} from "../../utils/delay";

export const reverseStringArray = async (
    array: TCircleItem[],
    setArray:  Dispatch<SetStateAction<TCircleItem[]>>,
    setActive: Dispatch<SetStateAction<boolean>>
) => {
    setActive(true);

    const middle = Math.ceil(array.length / 2);

    for (let i = 0; i < middle; i++) {
        let j = array.length - i - 1;
        if (i !== j) {
            array[i].state = ElementStates.Changing;
            array[j].state = ElementStates.Changing;
            setArray([...array]);
            await delay(DELAY_IN_MS);
        }
        swap(array, i, j);
        array[i].state = ElementStates.Modified;
        array[j].state = ElementStates.Modified;
        setArray([...array]);
    }
    setActive(false);
}

// This code defines a function called reverseString that takes three parameters:
//
//     - array: An array of TCircleItem, representing symbols and their states.
//     - setArray: A function that updates the state of the array.
//     - setActive: A function that sets the loading state.

//     The function begins by setting the loading state to true using setActive(true).
//     Then, it calculates the middle index of the array.
//
//     The function then enters a loop that iterates up to the middle index of the array.
//     During each iteration, it performs the following steps:
//
//     1. It calculates the symmetric index j corresponding to the current index i.
//     2. If i is not equal to j, it sets the state of the elements at indices i and j to ElementStates.Changing.
//        The array state is then updated using setArray([...array]), and there is an asynchronous delay introduced using await delay(DELAY_IN_MS).
//     3. It swaps the elements at indices i and j in the array using the swap utility function.
//     4. It sets the state of the swapped elements to ElementStates.Modified, updates the array state, and repeats the process for the next iteration.

//     After the loop completes, the loading state is set to false using setActive(false), indicating the end of the operation.
//     The swap and delay utility functions are assumed to be defined elsewhere in the codebase.