import React, {FormEvent, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import style from "./list-page.module.css";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {ElementColors, position, TCircleItem} from "../../types/types";
import {ElementStates} from "../../types/element-states";
import {ListClass} from "./list-class";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState("");
  const [tempValue, setTempValue] = useState("");
  const [inputValueIndex, setInputValueIndex] = useState<number>();
  const [isActive, setIsActive] = useState(false);
  const [isAddingToHead, setIsAddingToHead] = useState(false);
  const [isAddingToTail, setIsAddingToTail] = useState(false);
  const [isRemoveFromHead, setIsRemoveFromHead] = useState(false);
  const [isRemoveFromTail, setIsRemoveFromTail] = useState(false);
  const [isInsertByIndex, setIsInsertByIndex] = useState(false);
  const [isRemoveByIndex, setIsRemoveByIndex] = useState(false);

  const initialValues = useMemo(() => ['0', '34', '8', '1'], []);
  const listClass = useMemo(() => new ListClass<string>(initialValues),
      [initialValues]);
  const [arrayWithState, setArrayWithState] = useState<TCircleItem[]>(listClass.getArrayWithState());

  const handleInputValueChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleInputIndexChange = (e: FormEvent<HTMLInputElement>) => {
    setInputIndex(e.currentTarget.value);
  };

  const prepend = async () => {
    if (inputValue) {
      setIsActive(true);
      setIsAddingToHead(true);
      setInputValueIndex(0);

      await delay(SHORT_DELAY_IN_MS);
      listClass.prepend(inputValue);
      setIsAddingToHead(false);

      const arrayWithState = listClass.getArrayWithState();
      setArrayWithState(arrayWithState);

      await delay(SHORT_DELAY_IN_MS);
      arrayWithState[0].state = ElementStates.Default;
      setArrayWithState(arrayWithState);
    }
    setInputValue("");
    setIsActive(false);
  };

  const append = async () => {
    if (inputValue) {
      setIsActive(true);
      setIsAddingToTail(true);
      setInputValueIndex(listClass.getSize() - 1);

      await delay(SHORT_DELAY_IN_MS);
      listClass.append(inputValue);
      setIsAddingToTail(false);
      const arrayWithState = listClass.getArrayWithState();
      arrayWithState[arrayWithState.length - 1].state = ElementStates.Modified;
      setArrayWithState(arrayWithState);
      await delay(SHORT_DELAY_IN_MS);

      arrayWithState[arrayWithState.length - 1].state = ElementStates.Default;
      setArrayWithState(arrayWithState);
    }
  };

  const shift = async () => {
    if (listClass.getSize()) {
      const arrayWithState = listClass.getArrayWithState();
      setIsActive(true);
      setIsRemoveFromHead(true);
      setInputValueIndex(0);
      arrayWithState[0].item = "";
      setArrayWithState(arrayWithState);
      await delay(SHORT_DELAY_IN_MS);
      listClass.shift();
      setIsRemoveFromHead(false);
      setArrayWithState(listClass.getArrayWithState());
    }
    setIsActive(false);
  };

  const pop = async () => {
    if (listClass.getSize) {
      const arrayWithState = listClass.getArrayWithState();
      setTempValue(arrayWithState[arrayWithState.length - 1].item);
      setIsActive(true);
      setIsRemoveFromTail(true);
      setInputValueIndex(listClass.getSize() - 1);

      arrayWithState[arrayWithState.length - 1].item = '';
      setArrayWithState(arrayWithState);
      await delay(SHORT_DELAY_IN_MS);

      listClass.pop();
      setIsRemoveFromTail(false);
      setArrayWithState(listClass.getArrayWithState());
    }
    setIsActive(false);
};

  const addByIndex = async () => {
    const numericIndex = parseInt(inputIndex);
    if (numericIndex > listClass.getSize()) return;

    setIsActive(true);
    setIsInsertByIndex(true);

    const arrayWithState = listClass.getArrayWithState();
    for (let i = 0; i < numericIndex; i++) {
      setInputValueIndex(i);
      await delay(SHORT_DELAY_IN_MS);
      if (i < numericIndex) {
        arrayWithState[i].state = ElementStates.Changing;
        setArrayWithState(arrayWithState);
      }
    }
    setIsInsertByIndex(false);
    setInputValueIndex(undefined);
    listClass.insertByIndex(inputValue, numericIndex);
    const newArrayWithState = listClass.getArrayWithState();
    newArrayWithState[numericIndex].state = ElementStates.Modified;

    setArrayWithState(newArrayWithState);
    await delay(SHORT_DELAY_IN_MS);
    newArrayWithState[numericIndex].state = ElementStates.Default;
    setArrayWithState(newArrayWithState);

    setIsActive(false);
    setInputValue("");
    setInputIndex("");
  };

  const removeByIndex = async () => {
    const numericIndex = parseInt(inputIndex);
    if (isNaN(numericIndex) || numericIndex >= listClass.getSize()) return;

    setIsActive(true);
    const arrayWithState = listClass.getArrayWithState();
    for (let i = 0; i < numericIndex; i++) {
      await delay(SHORT_DELAY_IN_MS);
      arrayWithState[i].state = ElementStates.Changing;
      setArrayWithState([...arrayWithState]);
    }
    await delay(SHORT_DELAY_IN_MS);
    setTempValue(arrayWithState[numericIndex].item);
    arrayWithState[numericIndex].item = '';
    setIsRemoveByIndex(true);
    arrayWithState[numericIndex].state = ElementStates.Default;
    setInputValueIndex(numericIndex);

    await delay(SHORT_DELAY_IN_MS);
    listClass.removeByIndex(numericIndex);
    setArrayWithState(listClass.getArrayWithState());
    setIsRemoveByIndex(false);
    setIsActive(false);
    setInputIndex("");
  };

  const showHead = (index: number): string | undefined => {
    if (index === 0 && (!isAddingToHead || !isInsertByIndex)) {
      return position.head;
    } else if (index === 0 && isInsertByIndex && inputValueIndex !== 0) {
      return position.head;
    }
    return undefined;
  };

  const showTail = (index: number): string | undefined => {
    if (index === arrayWithState.length - 1 && (!isRemoveFromTail || !isRemoveByIndex)) {
      return position.tail;
    } else if (index === arrayWithState.length - 1 && isRemoveByIndex) {
      return undefined;
    }
    return undefined;
  };

  return (
    <SolutionLayout title="Связный список">
      <form
          className={`${style["list-page-container"]}`}
      >
        <div
            className={`${style["adding-container"]}`}
        >
          <Input
              placeholder="Введите значение"
              extraClass={`${style["list-page-input"]}`}
              onChange={handleInputValueChange}
              value={inputValue}
              maxLength={4}
              isLimitText={true}
          />
          <Button
              text="Добавить в head"
              onClick={prepend}
              isLoader={isAddingToHead}
              disabled={!inputValue}
          />
          <Button
              text="Добавить в tail"
              onClick={append}
              isLoader={isAddingToTail}
              disabled={!inputValue}
          />
          <Button
              text="Удалить из head"
              onClick={shift}
              isLoader={isRemoveFromHead}
              disabled={!listClass.getSize}
          />
          <Button
              text="Удалить из tail"
              onClick={pop}
              isLoader={isRemoveFromTail}
              disabled={!listClass.getSize}
          />
        </div>
        <div
            className={`${style["adding-container"]}`}
        >
          <Input
              placeholder="Введите значение"
              extraClass={`${style["list-page-input"]}`}
              onChange={handleInputIndexChange}
              value={inputIndex}
          />
          <Button
              text="Добавить по индексу"
              extraClass={`${style["list-page-button"]}`}
              onClick={addByIndex}
              isLoader={isInsertByIndex}
              disabled={!inputIndex || parseInt(inputIndex) > listClass.getSize() - 1}
          />
          <Button
              text="Удалить по индексу"
              extraClass={`${style["list-page-button"]}`}
              onClick={removeByIndex}
              isLoader={isRemoveByIndex}
              disabled={!inputIndex || parseInt(inputIndex) > listClass.getSize() - 1}
          />
        </div>
        <ul
            className={`${style["list-circle"]}`}
        >
          {arrayWithState.map((item, index) => (
          <li
              key={index}
              className={`${style["list-items"]}`}
          >
            {isActive && (isAddingToHead || isAddingToTail || isInsertByIndex)
                && index === inputValueIndex && (
                <Circle
                    isSmall={true}
                    extraClass={`${style["list-circle-top"]}`}
                    letter={inputValue}
                    state={ElementStates.Changing}
                />
              )}
            {isActive && (isRemoveFromHead || isRemoveFromTail || isRemoveByIndex)
                && index === inputValueIndex && (
                  <Circle
                      isSmall={true}
                      extraClass={`${style["list-circle-bottom"]}`}
                      letter={tempValue}
                      state={ElementStates.Changing}
                  />
                )}
            <Circle
                index={index}
                head={(isAddingToHead || isInsertByIndex) ? "" : showHead(index)}
                tail={isRemoveFromTail || isRemoveByIndex ? "" : showTail(index)}
                letter={item.item}
                state={item.state}
            />
            {arrayWithState.length - 1 !== index && (
                <ArrowIcon
                    fill={ElementColors.Default}
                />
                )}
          </li>
          ))}
        </ul>
      </form>
    </SolutionLayout>
  );
};
