import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import styles from "./fibonacci-page.module.css";
import {Circle} from "../../components/ui/circle/circle";
import {getFibonacciNumbers} from "./utils/fibonacci";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import { v4 as uuidv4 } from 'uuid';
export const FibonacciPage: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const numbersFib = numbers.map((number, index) => ({ value: number, _id: uuidv4(), index }));
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
    if (/^\d+$/.test(inputValue)) {
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
    setInputValue(e.currentTarget.value);
    }

    const shouldDisableButton = (value: string) =>
        !/^\d+$/.test(value) || parseInt(value) > 19 || parseInt(value) < 1;

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form
          className={`${styles["container"]}`}
          onSubmit={handleFormSubmit}
      >
        <Input
            placeholder="Введите число"
            extraClass={`${styles["input-fibonacci"]}`}
            isLimitText={true}
            max={19}
            onChange={handleInputChange}
            type="numbers"
        />
        <Button
            text="Расчитать"
            type="submit"
            disabled={shouldDisableButton(inputValue)}
            isLoader={isActive}
        />
      </form>
      <ul className={`${styles["list-fibonacci"]}`}>
        {numbersFib?.map((number) =>
            <li
                key={number._id}
            >
                  <Circle
                      letter={number.value.toString()}
                      tail={number.index.toString()}
                  />
            </li>
        )}
      </ul>
      {isCalculated && (
          <p className={`${styles["notification"]} text_type_h3`}>
            Числа Фибоначчи вычеслены
          </p>
      )}
    </SolutionLayout>
  );
};
