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
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

    const calculateFibonacci = async (value: string) => {
        setIsActive(true);

        const fibonacciNumbers = getFibonacciNumbers(parseInt(value));
        for (let i = 0; i < fibonacciNumbers.length; i++) {
            await delay(SHORT_DELAY_IN_MS);
            setNumbers(fibonacciNumbers.slice(0, i + 1));
        }
        setIsActive(false);
    };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length !== 0) {
        setIsCalculated(false);
      calculateFibonacci(inputValue)
          .then(() => {
              setIsCalculated(true);
          })
          .catch(error => {
            console.error("An error occurred:", error);
          });
    }
  };
    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    }

    const shouldDisableButton = (value: string) =>
        !value || parseInt(value) > 19 || parseInt(value) < 1;

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form
          className={`${style["container"]}`}
          onSubmit={handleFormSubmit}
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
            disabled={shouldDisableButton(inputValue)}
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
      {isCalculated && (
          <p className={`${style["notification"]} text_type_h3`}>
            Числа Фибоначчи вычеслены
          </p>
      )}
    </SolutionLayout>
  );
};
