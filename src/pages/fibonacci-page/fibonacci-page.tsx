import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import styles from "./fibonacci-page.module.css";
import {Circle} from "../../components/ui/circle/circle";
import {getFibonacciNumbers} from "./utils/fibonacci";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {useForm} from "../../hooks/useForm";
import {nanoid} from "nanoid";
export const FibonacciPage: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const {values, handleChange, setValues} = useForm({inputValues: ""});
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const numbersFib = numbers.map((number, index) => ({ value: number, _id: nanoid(7), index }));
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
    if (/^\d+$/.test(values.inputValue)) {
        setIsCalculated(false);
      calculateFibonacci(values.inputValue)
          .then(() => {
              setIsCalculated(true);
          })
          .catch(error => {
            console.error("An error occurred:", error);
          });
    }
  };

    const shouldDisableButton = (value: string) =>
        !/^\d+$/.test(value) || parseInt(value) > 19 || parseInt(value) < 1;


    // const calculateFibonacci = async (value: string) => {
    //     setIsActive(true);
    //
    //     const fibonacciNumbers = getFibonacciNumbers(parseInt(value));
    //     for (let i = 0; i < fibonacciNumbers.length; i++) {
    //         await delay(SHORT_DELAY_IN_MS);
    //         setNumbers(fibonacciNumbers.slice(0, i + 1));
    //     }
    //     setIsActive(false);
    // };
    //
    // const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     if (values.inputValue.length !== 0) {
    //         setIsCalculated(false);
    //         calculateFibonacci(values.inputValue)
    //             .then(() => {
    //                 setIsCalculated(true);
    //             })
    //             .catch(error => {
    //                 console.error("An error occurred:", error);
    //             });
    //     }
    // };
    // const shouldDisableButton = (value: string) =>
    //     !value || parseInt(value) > 19 || parseInt(value) < 1;
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
            onChange={handleChange}
            type="number"
            value={values.inputValue || ""}
            name="inputValue"
        />
        <Button
            text="Расчитать"
            type="submit"
            disabled={shouldDisableButton(values.inputValue)}
            isLoader={isActive}
            sizes="medium"
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
