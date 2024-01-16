import React, {FormEvent} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import style from "./list-page.module.css";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {ElementColors} from "../../types/types";

export const ListPage: React.FC = () => {

  const handleInputValueChange = (e: FormEvent<HTMLInputElement>) => {

  };

  const handleInputIndexChange = (e: FormEvent<HTMLInputElement>) => {

  };

  const prepend = async () => {

  };

  const append = async () => {

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
              // onChange={handleInputValueChange}
              // value={inputValue}
              maxLength={4}
              isLimitText={true}
          />
          <Button
              text="Добавить в head"
              // onClick={prepend}
              // isLoader={isAddingToHead}
              // disable={!inputValue}
          />
          <Button
              text="Добавить в tail"
              // onClick={append}
              // isLoader={isAddingToTail}
              // disable={!inputValue}
          />
          <Button
              text="Удалить из head"
              // onClick={shift}
              // isLoader={isRemoveFromHead}
              // disable={!list.getSize}
          />
          <Button
              text="Удалить из tail"
              // onClick={pop}
              // isLoader={isRemoveFromTail}
              // disable={!list.getSize}
          />
        </div>
        <div
            className={`${style["adding-container"]}`}
        >
          <Input
              placeholder="Введите значение"
              extraClass={`${style["list-page-input"]}`}
              // onChange={handleInputIndexChange}
              // value={inputValue}
          />
          <Button
              text="Добавить по индексу"
              extraClass={`${style["list-page-button"]}`}
              // onClick={addByIndex}
              // isLoader={isInsertByIndex}
              // disabled={!inputIndex || parseInt(inputIndex) > list.getSize - 1}
          />
          <Button
              text="Удалить по индексу"
              extraClass={`${style["list-page-button"]}`}
              // onClick={removeByIndex}
              // isLoader={isRemoveByIndex}
              // disabled={!inputIndex || parseInt(inputIndex) > list.getSize - 1}
          />
        </div>
        <ul
            className={`${style["list-circle"]}`}
        >
          <li>
            <Circle
                isSmall={true}
                // extraClass={`${style["list-circle-top"]}`}
                // letter={inputValue}
                // state={ElementStates.Changing}
            />
            <Circle
                isSmall={true}
                // extraClass={`${style["list-circle-bottom"]}`}
                // letter={tempValue}
                // state={ElementStates.Changing}
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
