import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./string.module.css"
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {TCircleItem} from "../../types/types";
import {ElementStates} from "../../types/element-states";
import {reverseStringArray} from "./reverse-string";
import { v4 as uuidv4 } from 'uuid';
export const StringReverseComponent: React.FC = () => {
  const [array, setArray] = useState<TCircleItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleStringReverse = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stringSymbols = inputValue.split('').map(item => ({
      item,
      state: ElementStates.Default
    }));
    setIsReversed(false); // Resetting the state upon new input
      reverseStringArray(stringSymbols, setArray, setIsActive)
        .then(() => {
          setIsReversed(true); // Setting the state upon completion of the operation
          setInputValue("");
        })
        .catch(error => {
          console.error("An error occurred:", error);
          // Error handling, if necessary
        });
    setInputValue("");
  }

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }

  return (
    <SolutionLayout title="Строка">
      <form
          className={`${style["container"]}`}
          onSubmit={handleStringReverse}
      >
        <Input
          placeholder="Введите строку"
          extraClass={`${style["input-string"]}`}
          isLimitText={true}
          maxLength={11}
          onChange={handleInputChange}
        />
        <Button
            text="Развернуть"
            type="submit"
            disabled={!inputValue}
            isLoader={isActive}
        />
      </form>
        <ul className={`${style["list-string"]}`}>
            {array?.map((item: TCircleItem) =>
                <li
                    key={uuidv4()}
                >
                      <Circle
                          letter={item.item}
                          state={item.state}
                      />
                </li>
            )}
        </ul>
      {isReversed && (
          <p className={`${style["notification"]} text_type_h3`}>
            Строка развёрнута
          </p>
      )}
    </SolutionLayout>
  );
};

// The provided code consists of a React component named ArrayReverseComponent that facilitates the reversal of a string.
// Let's break down the code into its key components:

// StringReverseComponent:
//    - This is a functional React component that utilizes the state hook to manage the state of the array,
//      input value, the activity status of the reversal operation, and whether the string is reversed or not.
//    - The component is wrapped in a SolutionLayout component, which is likely a higher-level component defining the layout structure.
//    - Inside the form, there is an Input component for entering the string and a Button component for triggering the reversal operation.
//    - The list of reversed characters is rendered using the Circle component within a ul element.
//    - A notification is displayed when the string is successfully reversed.
//
//     Function reverseStringArray:
//    - This function is responsible for asynchronously reversing the array of characters.
//    - It accepts the array of characters, the setArray function for updating the state,
//      and the setActive function for managing the activity status.
//    - The function sets the isActive state to true to indicate that the reversal operation is active.
//    - It calculates the middle index of the array to determine the stopping point for the reversal.
//    - It iterates through the first half of the array and swaps characters between the first and last positions,
//      visually representing the reversal.
//    - During the iteration, the state of characters is updated to reflect the changing and modified states,
//      allowing for a visual representation of the reversal process.
//    - The setActive state is set to false once the reversal operation is complete.
//
//     Event Handlers:
//    - handleStringReverse: Handles the form submission event, preventing the default form behavior.
//      It converts the input string into an array of characters with initial states,
//      initiates the reversal operation, and updates states accordingly.
//    - handleInputChange: Handles changes in the input field, updating the inputValue state.

//     Styling:
//    - The styling is applied using CSS modules, with classes defined in the string.module.css file.
//     Imports:
//    - The component imports various React components (SolutionLayout, Input, Button, Circle), types (TCircleItem, ElementStates),
//      and utility functions (reverseArray, swap, delay). The constants (DELAY_IN_MS)
//      are used for defining delays during the reversal process.

//     Overall, the code provides a clear and concise implementation for reversing a string with a visual representation of the reversal process.
//     The separation of concerns and asynchronous handling of the reversal logic contribute to the maintainability of the code.
//
//
//
//

