import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Simulate} from "react-dom/test-utils";
import style from "./queue-page.module.css";
import {v4 as uuidv4} from "uuid";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {Queue} from "./queue";
import {TQueueItem} from "../../types/types";

const empty = Array.from({length: 7}, () => ({
    item: '',
    state: ElementStates.Default
}));
export const QueuePage: React.FC = () => {
const [array, setArray] = useState(empty);
const [inputValue, setInputValue] = useState("");
const [queue, setQueue] = useState(new Queue<TQueueItem>(7));
const [isActive, setActive] = useState(false);
const [isAdding, setAdding] = useState(false);
const [isRemoving, setRemoving] = useState(false);
const [isClearing, setClearing] = useState(false);

const handleInputValueChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
};

const handleAddButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
};

const handleRemoveButtonClick = async () => {

};

const handleClearButtonClick = () => {

};
  return (
    <SolutionLayout title="Очередь">
      <form
          className={`${style["container"]}`}
          onSubmit={handleAddButton}
      >
        <Input
            placeholder="Введите текст"
            onChange={handleInputValueChange}
            extraClass={`${style["queue-input"]}`}
            maxLength={4}
            isLimitText={true}
            value={inputValue}
        />
        <Button
          text="Добавить"
          type={"submit"}
          extraClass={`${style["queue-btn"]}`}
          disabled={!inputValue || isActive}
          isLoader={isAdding}
        />
        <Button
          text="Удалить"
          onClick={handleRemoveButtonClick}
          extraClass={`${style["queue-btn"]}`}
          disabled={queue.isEmpty() || isActive}
          isLoader={isRemoving}
        />
        <Button
          text="Очистить"
          onClick={handleClearButtonClick}
          extraClass={`${style["queue-btn"]}`}
          disabled={queue.isEmpty() || isActive}
          isLoader={isClearing}
        />
      </form>
        <ul
            className={`${style["queue-list"]}`}
        >
            {array.map((item, index) =>
                <li
                    key={uuidv4()}
                >
                    <Circle
                        letter={item.item}
                        state={item.state}
                        index={index}
                        // head={}
                        // tail={}
                    />
                </li>
            )}
        </ul>
    </SolutionLayout>
  );
};
