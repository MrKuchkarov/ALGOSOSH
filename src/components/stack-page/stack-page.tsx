import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import { v4 as uuidv4 } from 'uuid';
import {TCircleItem} from "../../types/types";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Stack} from "./stack";
export const StackPage: React.FC = () => {
    const [stack] = useState(() => new Stack<TCircleItem>());
    const [array, setArray] = useState<TCircleItem[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [isCleaning, setIsCleaning] = useState<boolean>(false);
    const [isRemoving, setIsRemoving] = useState<boolean>(false);
    const stackSize = stack.getSize();
    const stackItems = stack.getItems();

    const handleOperation = async (operationType: "add" | "remove" | "clear") => {
        setIsActive(true);
        if (operationType === "add" && inputValue && stackSize < 12) {
            setIsActive(true);
            setIsAdding(true);
            stack.push({ item: inputValue, state: ElementStates.Changing });
            setInputValue("");
            setArray([...stackItems]);
            await delay(SHORT_DELAY_IN_MS);
            stack.peak().state = ElementStates.Default;
            setArray([...stackItems]);
            setIsActive(false);
            setIsAdding(false);
        } else if (operationType === "add" && stack.getSize() >= 12) {
            console.warn("Стек переполнен. Нельзя добавить более 12 элементов.");
        } else if (operationType === "remove") {
            setIsActive(true);
            setIsRemoving(true);
            stack.peak().state = ElementStates.Changing;
            setArray([...stackItems]);
            await delay(SHORT_DELAY_IN_MS);
            stack.pop();
            setArray([...stackItems]);
            setIsActive(false);
            setIsRemoving(false);
        } else if (operationType === "clear") {
            setIsActive(true);
            setIsCleaning(true);
            await delay(SHORT_DELAY_IN_MS);
            stack.clear();
            setArray([...stackItems]);
            setIsActive(false);
            setIsCleaning(false);
        }
        setIsActive(false);
    };

    const handleAddButton = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleOperation("add");
    };

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    };

    const handleRemoveButton = async () => {
        await handleOperation("remove");
    };

    const handleClearButton = async () => {
        await handleOperation("clear");
        setArray([]);
    };


  return (
    <SolutionLayout title="Стек">
      <form
          className={`${style["container"]}`}
          onSubmit={handleAddButton}
      >
        <Input
            placeholder="Введите текст"
            extraClass={`${style["stack-input"]}`}
            isLimitText={true}
            maxLength={4}
            value={inputValue}
            onChange={handleInputChange}
        />
        <Button
          text="Добавить"
          extraClass={`${style["stack-btn"]}`}
          type="submit"
          disabled={!inputValue || isActive}
          isLoader={isAdding}
        />
        <Button
          text="Удалить"
          extraClass={`${style["stack-btn"]}`}
          onClick={handleRemoveButton}
          disabled={!array.length || isActive}
          isLoader={isRemoving}
        />
        <Button
          text="Очистить"
          extraClass={`${style["stack-btn"]}`}
          disabled={!array.length || isActive}
          onClick={handleClearButton}
          isLoader={isCleaning}
        />
      </form>
      <ul
          className={`${style["stack-list"]}`}
      >
        {array.map((item, index) =>
        <li
          key={uuidv4()}
        >
          <Circle
              letter={item.item}
              tail={index.toString()}
              state={item.state}
              head={array.length - 1 === index ? "top" : ""}
          />
        </li>
        )}
      </ul>
        {stackSize > 0 && (
            <p className={`${style["notification"]} text_type_h3`}>
                {stackSize === 12
                    ? "В стеке 12 элементов. Стек переполнен."
                    : `В стеке ${stackSize} ${stackSize === 1
                        ? 'элемент'
                        : `${stackSize > 1 && stackSize < 5 ? 'элемента' : 'элементов'}`}`
                }
            </p>
        )}
    </SolutionLayout>
  );
};


// const handleAddButton = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsActive(true);
//     setIsAdding(true);
//     if (inputValue && stackSize < 12) {
//         stack.push({ item: inputValue, state: ElementStates.Changing });
//         setInputValue("");
//         setArray([...stackItems]);
//         await delay(SHORT_DELAY_IN_MS);
//         stack.peak().state = ElementStates.Default;
//         setArray([...stackItems]);
//     } else if (stackSize >= 12) {
//         console.warn("Стек переполнен. Нельзя добавить более 12 элементов.");
//         }
//     setIsAdding(false);
//     setIsActive(false);
// };
//
// const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
//     setInputValue(e.currentTarget.value)
// };
// const handleRemoveButton = async () => {
//     setIsActive(true);
//     setIsRemoving(true);
//     stack.peak().state = ElementStates.Changing;
//     setArray([...stackItems]);
//     await delay(SHORT_DELAY_IN_MS);
//     stack.pop();
//     setArray([...stackItems]);
//     setIsActive(false);
//     setIsRemoving(false);
// };
//
// const handleClearButton = async () => {
//     setIsActive(true);
//     setIsCleaning(true);
//     await delay(SHORT_DELAY_IN_MS);
//     stack.clear();
//     setArray([...stackItems]);
//     setIsCleaning(false);
//     setIsActive(false);
// };