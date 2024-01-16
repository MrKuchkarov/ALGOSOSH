import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Simulate} from "react-dom/test-utils";
import style from "../stack-page/stack-page.module.css";
import {v4 as uuidv4} from "uuid";
import {Circle} from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  return (
    <SolutionLayout title="Очередь">
      <form
          className={`${style["container"]}`}
        // onSubmit={handleFormSubmit}
      >
        <Input
            placeholder="Введите текст"
          // onChange={handleInputValueChange}
            extraClass={`${style["queue-input"]}`}
            maxLength={4}
            isLimitText={true}
            // value={inputValue}
        />
        <Button
          text="Добавить"
          type={"submit"}
          extraClass={`${style["queue-btn"]}`}
          // disabled={!inputValue || isActive}
          // isLoader={isAdding}
        />
        <Button
          text="Удалить"
          // onClick={handleRemoveButtonClick}
          extraClass={`${style["queue-btn"]}`}
          // disabled={!array.length || isActive}
          // isLoader={isRemoving}
        />
        <Button
          text="Очистить"
          // onClick={handleClearButtonClick}
          extraClass={`${style["queue-btn"]}`}
          // disabled={!array.length || isActive}
          // isLoader={isClearing}
        />
      </form>
        {/*<ul*/}
        {/*    className={`${style["queue-list"]}`}*/}
        {/*>*/}
        {/*    {array.map((item, index) =>*/}
        {/*        <li*/}
        {/*            key={uuidv4()}*/}
        {/*        >*/}
        {/*            <Circle*/}
        {/*                letter={item.item}*/}
        {/*                state={item.state}*/}
        {/*                index={index}*/}
        {/*                head={}*/}
        {/*                tail={}*/}
        {/*            />*/}
        {/*        </li>*/}
        {/*    )}*/}
        {/*</ul>*/}
        <ul className={`${style["queue-list"]}`}>
            <Circle />
            <Circle />
            <Circle />
            <Circle />
            <Circle />
            <Circle />
            <Circle />
        </ul>
    </SolutionLayout>
  );
};
