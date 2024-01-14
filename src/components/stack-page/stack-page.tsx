import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import { v4 as uuidv4 } from 'uuid';
export const StackPage: React.FC = () => {

  return (
    <SolutionLayout title="Стек">
      <form
          className={`${style["container"]}`}
          // onSubmit={handleSubmit}
      >
        <Input
            placeholder="Введите текст"
            extraClass={`${style["stack-input"]}`}
            isLimitText={true}
            maxLength={4}
            // value={inputValue}
            // onChange={handleInputChange}
        />
        <Button
          text="Добавить"
          extraClass={`${style["stack-btn"]}`}
          type="submit"
          // disabled={!inputValue || isActive}
        />
        <Button
          text="Удалить"
          extraClass={`${style["stack-btn"]}`}
          // onClick={handleRemoveButton}
          //   disabled={!array.length || isActive}
        />
        <Button
          text="Очистить"
          extraClass={`${style["stack-btn"]}`}
          // disabled={!array.length || isActive}
        />
      </form>
      <ul
          className={`${style["stack-list"]}`}
      >
        {/*{array.map((item, index) =>*/}
        {/*<li*/}
        {/*  key={uuidv4()}*/}
        {/*>*/}
        {/*  <Circle*/}
        {/*      letter={item.item}*/}
        {/*      tail={item.toString()}*/}
        {/*  />*/}
        {/*</li>*/}
        {/*)}*/}
      </ul>
    </SolutionLayout>
  );
};
