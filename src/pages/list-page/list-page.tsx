import React, {FormEvent, useMemo, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import styles from "./list-page.module.css";
import {Circle} from "../../components/ui/circle/circle";
import {ArrowIcon} from "../../components/ui/icons/arrow-icon";
import {ElementColors, position, TCircleItem} from "../../types/types";
import {ElementStates} from "../../types/element-states";
import {LinkedList} from "./list-class";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState("");
  const [temporaryValue, setTemporaryValue] = useState("");
  const [inputValueIndex, setInputValueIndex] = useState<number>();
  const [isActive, setIsActive] = useState(false);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const initialListValues = useMemo(() => ["0", "34", "8", "1"], []);
  const linkedList = useMemo(() => new LinkedList<string>(initialListValues),
      [initialListValues]);
  const [arrayWithState, setArrayWithState] = useState<TCircleItem[]>(linkedList.getArrayWithState());

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };
  const handleInputValueChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value || "");
  };

  const handleInputIndexChange = (e: FormEvent<HTMLInputElement>) => {
    setInputIndex(e.currentTarget.value || "");
  };

  const startAction = (action: string) => {
    setIsActive(true);
    setCurrentAction(action);
  };

  const endAction = () => {
    setIsActive(false);
    setCurrentAction(null);
  };

  const prepend = async () => {
    if (inputValue) {
      startAction("addingToHead");
      setInputValueIndex(0);

      await delay(SHORT_DELAY_IN_MS);
      linkedList.prepend(inputValue);
      endAction();

      const arrayWithState = linkedList.getArrayWithState();
      setArrayWithState(arrayWithState);

      await delay(SHORT_DELAY_IN_MS);
      arrayWithState[0].state = ElementStates.Default;
      setArrayWithState(arrayWithState);
      showNotification("Элемент добавлен в начало списка");
    }
    setInputValue("");
    setIsActive(false);
  };

  const append = async () => {
    if (inputValue) {
      startAction("addingToTail");
      setInputValueIndex(linkedList.getSize() - 1);

      await delay(SHORT_DELAY_IN_MS);
      linkedList.append(inputValue);
      endAction();
      const arrayWithState = linkedList.getArrayWithState();
      arrayWithState[arrayWithState.length - 1].state = ElementStates.Modified;
      setArrayWithState(arrayWithState);
      await delay(SHORT_DELAY_IN_MS);

      arrayWithState[arrayWithState.length - 1].state = ElementStates.Default;
      setArrayWithState(arrayWithState);
      showNotification("Элемент добавлен в конец списка");
    }
    setInputValue("");
  };

  const shift = async () => {
    if (linkedList.getSize()) {
      const arrayWithState = linkedList.getArrayWithState();
      startAction("removeFromHead");
      setInputValueIndex(0);
      arrayWithState[0].item = "";
      setArrayWithState(arrayWithState);
      await delay(SHORT_DELAY_IN_MS);
      linkedList.shift();
      endAction();
      setArrayWithState(linkedList.getArrayWithState());
      showNotification("Элемент удалён из начала списка");
    }
    setIsActive(false);
  };

  const pop = async () => {
    if (linkedList.getSize) {
      startAction("removeFromTail");
      setInputValueIndex(linkedList.getSize() - 1);
      const arrayWithState = linkedList.getArrayWithState();
      setTemporaryValue(arrayWithState[arrayWithState.length - 1].item);

      arrayWithState[arrayWithState.length - 1].item = "";
      setArrayWithState(arrayWithState);
      await delay(SHORT_DELAY_IN_MS);

      linkedList.pop();
      endAction();
      setArrayWithState(linkedList.getArrayWithState());
      showNotification("Элемент удален с конца списка");
    }
    setIsActive(false);
};

  const addByIndex = async () => {
    const numericIndex = parseInt(inputIndex);
    if (numericIndex > linkedList.getSize()) return;

    startAction("insertByIndex");

    const arrayWithState = linkedList.getArrayWithState();
    for (let i = 0; i < numericIndex; i++) {
      setInputValueIndex(i);
      await delay(SHORT_DELAY_IN_MS);
      if (i < numericIndex) {
        arrayWithState[i].state = ElementStates.Changing;
        setArrayWithState(arrayWithState);

      }
    }
    setInputValueIndex(undefined);
    linkedList.insertByIndex(inputValue, numericIndex);
    const newArrayWithState = linkedList.getArrayWithState();
    newArrayWithState[numericIndex].state = ElementStates.Modified;

    setArrayWithState(newArrayWithState);
    await delay(SHORT_DELAY_IN_MS);
    newArrayWithState[numericIndex].state = ElementStates.Default;
    setArrayWithState(newArrayWithState);
    showNotification("Элемент добавлен по индексу");
    endAction();
    setIsActive(false);
    setInputValue("");
    setInputIndex("");
  };

  const removeByIndex = async () => {
    const numericIndex = parseInt(inputIndex);
    if (isNaN(numericIndex) || numericIndex >= linkedList.getSize()) return;

    startAction("removeByIndex");

    const arrayWithState = linkedList.getArrayWithState();
    for (let i = 0; i < numericIndex; i++) {
      await delay(SHORT_DELAY_IN_MS);
      arrayWithState[i].state = ElementStates.Changing;
      setArrayWithState([...arrayWithState]);
    }
    await delay(SHORT_DELAY_IN_MS);
    setTemporaryValue(arrayWithState[numericIndex].item);
    arrayWithState[numericIndex].item = "";
    showNotification("Элемент удалён по индексу");
    arrayWithState[numericIndex].state = ElementStates.Default;
    setInputValueIndex(numericIndex);

    await delay(SHORT_DELAY_IN_MS);
    linkedList.removeByIndex(numericIndex);
    setArrayWithState(linkedList.getArrayWithState());
    endAction();
    setInputIndex("");
  };

  const showHead = (index: number): string | undefined => {
    if (index === 0 && !currentAction) {
      return position.head;
    } else if (index === 0 && currentAction === "insertByIndex" && inputValueIndex !== 0) {
      return position.head;
    }
    return undefined;
  };

  const showTail = (index: number): string | undefined => {
    if (index === arrayWithState.length - 1 && !currentAction) {
      return position.tail;
    } else if (index === arrayWithState.length - 1 && currentAction === "removeByIndex") {
      return undefined;
    }
    return undefined;
  };

  return (
    <SolutionLayout title="Связный список">
      <form
          className={`${styles["list-page-container"]}`}
      >
        <div
            className={`${styles["adding-container"]}`}
        >
          <Input
              placeholder="Введите значение"
              extraClass={`${styles["list-page-input"]}`}
              onChange={handleInputValueChange}
              value={inputValue}
              maxLength={4}
              isLimitText={true}
          />
          <Button
              text="Добавить в head"
              onClick={prepend}
              isLoader={currentAction === "addingToHead"}
              disabled={!inputValue}
          />
          <Button
              text="Добавить в tail"
              onClick={append}
              isLoader={currentAction === "addingToTail"}
              disabled={!inputValue}
          />
          <Button
              text="Удалить из head"
              onClick={shift}
              isLoader={currentAction === "removeFromHead"}
              disabled={!linkedList.getSize}
          />
          <Button
              text="Удалить из tail"
              onClick={pop}
              isLoader={currentAction === "removeFromTail"}
              disabled={!linkedList.getSize}
          />
        </div>
        <div
            className={`${styles["adding-container"]}`}
        >
          <Input
              placeholder="Введите значение"
              extraClass={`${styles["list-page-input"]}`}
              onChange={handleInputIndexChange}
              value={inputIndex}
          />
          <Button
              text="Добавить по индексу"
              extraClass={`${styles["list-page-button"]}`}
              onClick={addByIndex}
              isLoader={currentAction === "insertByIndex"}
              disabled={!inputIndex || parseInt(inputIndex) > linkedList.getSize() - 1}
          />
          <Button
              text="Удалить по индексу"
              extraClass={`${styles["list-page-button"]}`}
              onClick={removeByIndex}
              isLoader={currentAction === "removeByIndex"}
              disabled={!inputIndex || parseInt(inputIndex) > linkedList.getSize() - 1}
          />
        </div>
        <ul
            className={`${styles["list-circle"]}`}
        >
          {arrayWithState.map((item, index) => (
          <li
              key={index}
              className={`${styles["list-items"]}`}
          >
            {isActive && (currentAction === "addingToHead"
                    || currentAction === "addingToTail"
                    || currentAction === "insertByIndex"
                )
                && index === inputValueIndex && (
                <Circle
                    isSmall={true}
                    extraClass={`${styles["list-circle-top"]}`}
                    letter={inputValue}
                    state={ElementStates.Changing}
                />
              )}
            {isActive && (currentAction === "removeFromHead"
                    || currentAction === "removeFromTail"
                    || currentAction === "removeByIndex"
                )
                && index === inputValueIndex && (
                  <Circle
                      isSmall={true}
                      extraClass={`${styles["list-circle-bottom"]}`}
                      letter={temporaryValue}
                      state={ElementStates.Changing}
                  />
                )}
            <Circle
                index={index}
                head={(currentAction === "addingToHead"
                    || currentAction === "insertByIndex")
                    ? ""
                    : showHead(index)}
                tail={(currentAction === "removeFromTail"
                    || currentAction === "removeByIndex")
                    ? ""
                    : showTail(index)}
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
        <p className={`${styles["notification"]} text_type_h3`}>{notification}</p>
      </form>
    </SolutionLayout>
  );
};
