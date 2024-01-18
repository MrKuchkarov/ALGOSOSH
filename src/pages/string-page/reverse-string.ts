import {TCircleItem} from "../../types/types";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";
import {swap} from "../../utils/swap";

type TReverseStringArrayParams = {
    array: TCircleItem[];
    setArray: (newArray: TCircleItem[]) => void;
    setActive: (isActive: boolean) => void;
    delayFunction: (ms: number) => Promise<void>;
}

type TReverseStringArrayResult = {
    newArray: TCircleItem[];
}

export const reverseStringArray = async (
    params: TReverseStringArrayParams
): Promise<TReverseStringArrayResult> => {
    const { array, setArray, setActive, delayFunction} = params;
    setActive(true);

    const middle = Math.ceil(array.length / 2);
    const newArray = [...array];

    for (let i = 0; i < middle; i++) {
        let j = array.length - i - 1;
        if (i !== j) {
            newArray[i].state = ElementStates.Changing;
            newArray[j].state = ElementStates.Changing;
            setArray([...newArray]);
            await delayFunction(DELAY_IN_MS);
        }
        swap(newArray, i, j);
        newArray[i].state = ElementStates.Modified;
        newArray[j].state = ElementStates.Modified;
        setArray([...newArray]);
    }

    setActive(false);
    return { newArray };
};