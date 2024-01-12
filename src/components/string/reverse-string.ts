import {TCircleItem} from "../../types/types";
import {Dispatch, SetStateAction} from "react";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";
import {swap} from "../../utils/swap";
import {delay} from "../../utils/delay";

export const reverseString = async (
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