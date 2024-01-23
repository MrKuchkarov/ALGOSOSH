import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {Circle} from "../../components/ui/circle/circle";
import {TCircleItem} from "../../types/types";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Stack} from "./utils/stack";
import {useForm} from "../../hooks/useForm";
import {nanoid} from "nanoid";
export const StackPage: React.FC = () => {
    const {values, handleChange, setValues} = useForm({
        inputValue: "",
    });
    const [stack] = useState(() => new Stack<TCircleItem>());
    const [array, setArray] = useState<TCircleItem[]>([]);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [isCleaning, setIsCleaning] = useState<boolean>(false);
    const [isRemoving, setIsRemoving] = useState<boolean>(false);
    const stackLength = stack.getSize();
    const stackItems = stack.getItems();

    // I limited the stack to 12 elements, because when drawing on the screen, more than 12 elements (Circle) do not fit
    const handleOperation = async (operationType: "add" | "remove" | "clear") => {
        setIsActive(true);

        switch (operationType) {
            case "add":
                if (values.inputValue && stackLength < 12) {
                    setIsAdding(true);
                    const newItem = { _id: nanoid(7), item: values.inputValue, state: ElementStates.Changing };
                    stack.push(newItem);
                    setValues({inputValue: ""});
                    setArray([...stackItems]);
                    await delay(SHORT_DELAY_IN_MS);
                    stack.peak().state = ElementStates.Default;
                    setArray([...stackItems]);
                    setIsAdding(false);
                } else if (stackLength >= 12) {
                    console.warn("Стек переполнен. Нельзя добавить более 12 элементов.");
                }
                break;
            case "remove":
                setIsRemoving(true);
                stack.peak().state = ElementStates.Changing;
                setArray([...stackItems]);
                await delay(SHORT_DELAY_IN_MS);
                stack.pop();
                setArray([...stackItems]);
                setIsRemoving(false);
                break;
            case "clear":
                setIsCleaning(true);
                await delay(SHORT_DELAY_IN_MS);
                stack.clear();
                setArray([...stackItems]);
                setIsCleaning(false);
                break;
            default:
                break;
        }

        setIsActive(false);
    };

    const handleAddButton = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleOperation("add");
    };


    const handleRemoveButtonClick = async () => {
        await handleOperation("remove");
    };

    const handleClearButtonClick = async () => {
        await handleOperation("clear");
        setArray([]);
    };


  return (
    <SolutionLayout title="Стек">
      <form
          className={`${styles["container"]}`}
          onSubmit={handleAddButton}
      >
        <Input
            placeholder="Введите текст"
            extraClass={`${styles["stack-input"]}`}
            isLimitText={true}
            maxLength={4}
            value={values.inputValue || ""}
            onChange={handleChange}
            name="inputValue"
        />
        <Button
            text="Добавить"
            extraClass={`${styles["stack-btn"]}`}
            type="submit"
            disabled={!values.inputValue || isActive}
            isLoader={isAdding}
            sizes="small"
        />
        <Button
            text="Удалить"
            extraClass={`${styles["stack-btn"]}`}
            onClick={handleRemoveButtonClick}
            disabled={!array.length || isActive}
            isLoader={isRemoving}
            sizes="small"
        />
        <Button
            text="Очистить"
            extraClass={`${styles["stack-btn"]}`}
            disabled={!array.length || isActive}
            onClick={handleClearButtonClick}
            isLoader={isCleaning}
            sizes="small"
        />
      </form>
      <ul
          className={`${styles["stack-list"]}`}
      >
          {array.length > 0 ? (
              array.map((item, index) => (
                  <li key={item._id}>
                      <Circle
                          letter={item.item}
                          tail={index.toString()}
                          state={item.state}
                          head={array.length - 1 === index ? "top" : ""}
                      />
                  </li>
              ))
          ) : (
              <li>
                  <p className={`${styles["empty-stack-message"]} text_type_h3`}>
                      Стек пустой
                  </p>
              </li>
        )}
      </ul>
        {stackLength > 0 && (
            <p className={`${styles["length-stack-message"]} text_type_h3`}>
                {stackLength === 12
                    ? "В стеке 12 элементов. Стек переполнен."
                    : `В стеке ${stackLength} ${stackLength === 1
                        ? 'элемент'
                        : `${stackLength > 1 && stackLength < 5 ? 'элемента' : 'элементов'}`}`
                }
            </p>
        )}
    </SolutionLayout>
  );
};


