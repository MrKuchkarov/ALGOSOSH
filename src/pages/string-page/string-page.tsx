import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import styles from "./string-page.module.css"
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {Circle} from "../../components/ui/circle/circle";
import {TCircleItem} from "../../types/types";
import {ElementStates} from "../../types/element-states";
import {reverseStringArray} from "./reverse-string";
import {delay} from "../../utils/delay";
export const StringReversePage: React.FC = () => {
  const [array, setArray] = useState<TCircleItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleStringReverse = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stringSymbols = inputValue.split("").map(item => ({
      item,
      state: ElementStates.Default
    }));

    try {
      await reverseStringArray({
        array: stringSymbols,
        setArray,
        setActive: setIsActive,
        delayFunction: delay
      });

      setIsReversed(true);
      setInputValue("");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }

  return (
    <SolutionLayout title="Строка">
      <form
          className={`${styles["container"]}`}
          onSubmit={handleStringReverse}
      >
        <Input
          placeholder="Введите строку"
          extraClass={`${styles["input-string-page"]}`}
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
        <ul className={`${styles["list-string-page"]}`}>
            {array?.map((item: TCircleItem, index) =>
                <li
                    key={index}
                >
                      <Circle
                          letter={item.item}
                          state={item.state}
                      />
                </li>
            )}
        </ul>
      {isReversed && (
          <p className={`${styles["notification"]} text_type_h3`}>
            Строка развёрнута
          </p>
      )}
    </SolutionLayout>
  );
};