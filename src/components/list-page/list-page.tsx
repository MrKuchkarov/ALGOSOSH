import React, {FormEvent, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import style from "./list-page.module.css";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {ElementColors, TCircleItem} from "../../types/types";
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
  const [isInsertByIndex, setSsInsertByIndex] = useState(false);
  const [isRemoveByIndex, setIsRemoveByIndex] = useState(false);

  const initialValues = useMemo(() => ['0', '34', '8', '1'], []);
  const listClass = useMemo(() => new ListClass<string>(initialValues),
      [initialValues]);
  const [arrayWithState, setArrayWithState] = useState<TCircleItem[]>(listClass.getArrayWithState);
  const handleInputValueChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleInputIndexChange = (e: FormEvent<HTMLInputElement>) => {
    setInputIndex(e.currentTarget.value);
  };

  const prepend = async () => {
    if (inputValue) {
      setIsActive(true);
      setIsAddingToTail(true);
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

  };

  const pop = async () => {

  };

  const addByIndex = async () => {

  };

  const removeByIndex = async () => {

  };

  const showHead = () => {

  };

  const showTail = () => {

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
              value={inputValue}
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
          <li>
            <Circle
                isSmall={true}
                extraClass={`${style["list-circle-top"]}`}
                letter={inputValue}
                state={ElementStates.Changing}
            />
            <Circle
                isSmall={true}
                extraClass={`${style["list-circle-bottom"]}`}
                letter={tempValue}
                state={ElementStates.Changing}
            />
            <Circle
                // index={index}
                // head={(isAddingToHead || isInsertByIndex) ? '' : showHead(index)}
                // tail={isRemoveFromTail || isRemoveByIndex ? '' : showTail(index)}
                // letter={item.item}
                // state={item.state}
            />
            <ArrowIcon
                fill={ElementColors.Default}
            />
          </li>
        </ul>
      </form>
    </SolutionLayout>
  );
};
