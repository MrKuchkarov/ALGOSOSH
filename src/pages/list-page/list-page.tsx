import React, {FormEvent, useMemo, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import styles from "./list-page.module.css";
import {Circle} from "../../components/ui/circle/circle";
import {ArrowIcon} from "../../components/ui/icons/arrow-icon";
import {ElementColors, position, TCircleItem} from "../../types/types";
import {ElementStates} from "../../types/element-states";
import {LinkedList} from "./utils/list-class";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {useForm} from "../../hooks/useForm";

export const ListPage: React.FC = () => {
  const {values, handleChange, setValues} = useForm({inputValue: ""});
  const [inputIndex, setInputIndex] = useState("");
  const [temporaryValue, setTemporaryValue] = useState("");
  const [inputValueIndex, setInputValueIndex] = useState<number>();
  const [isActive, setIsActive] = useState(false);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  // Инициализация связанного списка
  const initialListValues = useMemo(() => ["0", "34", "8", "1"], []);
  const linkedList = useMemo(() => new LinkedList<string>(initialListValues),
      [initialListValues]);
  // Получение массива с текущим состоянием элементов списка
  const [arrayWithState, setArrayWithState] = useState<TCircleItem[]>(linkedList.getArrayWithState());
  // Вычисление числового индекса из строки inputIndex и проверка его валидности
  const numericIndex = parseInt(inputIndex);
  const isValidIndex = !isNaN(numericIndex) && numericIndex >= 0 && numericIndex <= linkedList.getSize() - 1;

  // Функция для отображения уведомления с последующим скрытием
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };

  const handleInputIndexChange = (e: FormEvent<HTMLInputElement>) => {
    setInputIndex(e.currentTarget.value || "");
  };

  // Функции начала и завершения операции для визуализации
  const startAction = (action: string) => {
    setIsActive(true);
    setCurrentAction(action);
  };

  const endAction = () => {
    setIsActive(false);
    setCurrentAction(null);
  };

  const prepend = async () => {
    try {
      if (values.inputValue) {
        startAction("addingToHead");
        setInputValueIndex(0);

        await delay(SHORT_DELAY_IN_MS);
        linkedList.prepend(values.inputValue);
        endAction();

        const arrayWithState = linkedList.getArrayWithState();
        setArrayWithState(arrayWithState);

        await delay(SHORT_DELAY_IN_MS);
        arrayWithState[0].state = ElementStates.Default;
        setArrayWithState(arrayWithState);
        showNotification("Элемент добавлен в начало списка");
      }
    } catch (error) {
      console.error("Ошибка в функции prepend:", error);
      showNotification("Произошла ошибка при добавлении элемента в начало списка");
    }
    setValues({inputValue: ""});
    setIsActive(false);
  };

  const append = async () => {
    try {
      if (values.inputValue) {
        startAction("addingToTail");
        setInputValueIndex(linkedList.getSize() - 1);

        await delay(SHORT_DELAY_IN_MS);
        linkedList.append(values.inputValue);
        endAction();
        const arrayWithState = linkedList.getArrayWithState();
        arrayWithState[arrayWithState.length - 1].state = ElementStates.Modified;
        setArrayWithState(arrayWithState);
        await delay(SHORT_DELAY_IN_MS);

        arrayWithState[arrayWithState.length - 1].state = ElementStates.Default;
        setArrayWithState(arrayWithState);
        showNotification("Элемент добавлен в конец списка");
      }
    } catch (error) {
      console.error("Ошибка в функции append:", error);
      showNotification("Произошла ошибка при добавлении элемента в конец списка");
    }
    setValues({inputValue: ""});
  };

  const shift = async () => {
    try {
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
        showNotification("Элемент удалён из начало списка");
      }
    } catch (error) {
      console.error("Ошибка в функции shift:", error);
      showNotification("Произошла ошибка при удалении элемента из начала списка");
    }
    setIsActive(false);
  };

  const pop = async () => {
    try {
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
    } catch (error) {
      console.error("Ошибка в функции pop:", error);
      showNotification("Произошла ошибка при удалении элемента из конца списка");
    }
    setIsActive(false);
};

  const addByIndex = async () => {
    try {
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
      linkedList.insertByIndex(values.inputValue, numericIndex);
      const newArrayWithState = linkedList.getArrayWithState();
      newArrayWithState[numericIndex].state = ElementStates.Modified;

      setArrayWithState(newArrayWithState);
      await delay(SHORT_DELAY_IN_MS);
      newArrayWithState[numericIndex].state = ElementStates.Default;
      setArrayWithState(newArrayWithState);
      showNotification("Элемент добавлен по индексу");
    } catch (error) {
      console.error("Ошибка в функции addByIndex:", error);
      showNotification("Произошла ошибка при добавлении элемента по индексу");
    }
    endAction();
    setIsActive(false);
    setValues({inputValue: ""});
    setInputIndex("");
  };

  const removeByIndex = async () => {
    try {
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
    } catch (error) {
      console.error("Ошибка в функции removeByIndex:", error);
      showNotification("Произошла ошибка при удаление элемента по индексу");
    }
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
              onChange={handleChange}
              value={values.inputValue || ""}
              maxLength={4}
              isLimitText={true}
              name="inputValue"
          />
          <Button
              text="Добавить в head"
              onClick={prepend}
              isLoader={currentAction === "addingToHead"}
              disabled={!values.inputValue}
              sizes="medium"
          />
          <Button
              text="Добавить в tail"
              onClick={append}
              isLoader={currentAction === "addingToTail"}
              disabled={!values.inputValue}
              sizes="medium"
          />
          <Button
              text="Удалить из head"
              onClick={shift}
              isLoader={currentAction === "removeFromHead"}
              disabled={!linkedList.getSize}
              sizes="medium"
          />
          <Button
              text="Удалить из tail"
              onClick={pop}
              isLoader={currentAction === "removeFromTail"}
              disabled={!linkedList.getSize}
              sizes="medium"
          />
        </div>
        <div
            className={`${styles["adding-container"]}`}
        >
          <Input
              placeholder="Введите значение"
              extraClass={`${styles["list-page-input"]}`}
              onChange={handleInputIndexChange}
              value={inputIndex || ""}
              type="number"
          />
          <Button
              text="Добавить по индексу"
              onClick={addByIndex}
              isLoader={currentAction === "insertByIndex"}
              disabled={!inputIndex || !isValidIndex}
              sizes="big"
          />
          <Button
              text="Удалить по индексу"
              onClick={removeByIndex}
              isLoader={currentAction === "removeByIndex"}
              disabled={!inputIndex || !isValidIndex}
              sizes="big"
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
                    letter={values.inputValue}
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
