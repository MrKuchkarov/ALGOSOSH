import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./string.module.css"
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {TCircleItem} from "../../types/types";
import {ElementStates} from "../../types/element-states";
import {reverseString} from "./reverse-string";
export const StringComponent: React.FC = () => {
  const [array, setArray] = useState<TCircleItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const handleButtonClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const letters = inputValue.split('').map(item => ({
      item,
      state: ElementStates.Default
    }));
    setIsReversed(false); // Сбрасываем состояние при новом вводе
    reverseString(letters, setArray, setIsActive)
        .then(() => {
          setIsReversed(true); // Устанавливаем состояние после завершения операции
          setInputValue("");
        })
        .catch(error => {
          console.error("An error occurred:", error);
          // Обработка ошибок, если необходимо
        });
    setInputValue("");
  }
  return (
    <SolutionLayout title="Строка">
      <form
          className={`${style["container"]}`}
          onSubmit={handleButtonClick}
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
            {array?.map((char: TCircleItem, index: number) =>
                <li key={index}>
                    <Circle
                        letter={char.item}
                        state={char.state}
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
