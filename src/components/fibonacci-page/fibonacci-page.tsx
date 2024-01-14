import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import style from "./fibonacci.module.css";
import {Circle} from "../ui/circle/circle";
import {getFibonacciNumbers} from "./fibonacci";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import { v4 as uuidv4 } from 'uuid';
export const FibonacciPage: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const calculateFibonacci = async (value: string) => {
    setIsActive(true);
    const numbers = getFibonacciNumbers(parseInt(value));
    for (let i = 0; i < numbers.length; i++) {
      await delay(SHORT_DELAY_IN_MS);
      setNumbers(numbers.slice(0, i + 1));
    }
    setIsActive(false);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length !== 0) {
      setIsReversed(false);
      calculateFibonacci(inputValue)
          .then(() => {
            setIsReversed(true);
          })
          .catch(error => {
            console.error("An error occurred:", error);
          });
    }
  };
    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    }

    const isDisabledButton = (value: string) =>
        !value || parseInt(value) > 19 || parseInt(value) < 1;

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form
          className={`${style["container"]}`}
          onSubmit={handleSubmit}
      >
        <Input
            placeholder="Введите текст"
            extraClass={`${style["input-string"]}`}
            isLimitText={true}
            maxLength={19}
            onChange={handleInputChange}
        />
        <Button
            text="Расчитать"
            type="submit"
            disabled={isDisabledButton(inputValue)}
            isLoader={isActive}
        />
      </form>
      <ul className={`${style["list-string"]}`}>
        {numbers?.map((number, index) =>
            <li
                key={uuidv4()}
            >
                  <Circle
                      letter={number.toString()}
                      tail={index.toString()}
                  />
            </li>
        )}
      </ul>
      {isReversed && (
          <p className={`${style["notification"]} text_type_h3`}>
            Числа Фибоначчи вычеслены
          </p>
      )}
    </SolutionLayout>
  );
};

// This code represents a React component for displaying a page with Fibonacci sequence numbers.
//
//     1. States:
//     - numbers: Stores Fibonacci numbers to be displayed on the page.
//     - inputValue: Holds the current value of the number entered by the user.
//     - isActive: Tracks the activity state during the computation of Fibonacci numbers.
//     - isReversed: Tracks the state when Fibonacci numbers are calculated.

//     2. Method calculateFibonacci:
//     - Asynchronously calculates Fibonacci numbers based on the entered value.
//     - During the calculations, it updates the numbers state and introduces a delay between updates for a visual effect.

//     3. Method handleSubmit:
//     - Triggered when the form is submitted.
//     - Initiates an asynchronous operation performance to compute Fibonacci numbers.
//     - Sets the isReversed state to true after completing the operation.

//     4. Method handleInputChange:
//     - Updates the inputValue state when the user input changes.

//     5. Method isDisabled:
//     - Determines whether the calculate button should be disabled based on the input value.

//     6. Rendering:
//     - Displays a form for entering a number.
//     - Shows Fibonacci numbers as circles in the list.
//     - Outputs a notification that Fibonacci numbers are calculated if isReversed is true.

//     7. Utility Functions:
//     - delay: Creates a Promise for a delay in milliseconds.
//     - getFibonacciNumbers: Returns an array of Fibonacci numbers up to the specified index n.