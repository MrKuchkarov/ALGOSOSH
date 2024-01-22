import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import styles from "./queue-page.module.css";
import {Circle} from "../../components/ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {Queue} from "./utils/queue";
import {position, TQueueItem} from "../../types/types";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {useForm} from "../../hooks/useForm";

const empty = Array.from({length: 7}, () => ({
    item: '',
    state: ElementStates.Default
}));
export const QueuePage: React.FC = () => {
const [array, setArray] = useState(empty);
const {values, handleChange, setValues} = useForm({
        inputValue: "",
    });
const [queue, setQueue] = useState(new Queue<TQueueItem>(7));
const [isActive, setActive] = useState(false);
const [isAdding, setIsAdding] = useState(false);
const [isRemoving, setRemoving] = useState(false);
const [isClearing, setClearing] = useState(false);
const [notification, setNotification] = useState<string | null>(null);

const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
};

const handleAddButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(true);
    setIsAdding(true);
    queue.enqueue({item: values.inputValue, state: ElementStates.Default});
    setQueue(queue);
    array[queue.getTail() - 1] = {item: "", state: ElementStates.Changing};
    setArray([...array]);
    await delay(SHORT_DELAY_IN_MS);
    array[queue.getTail() - 1] = {
        item: values.inputValue,
        state: ElementStates.Changing
    };
    setArray([...array]);
    array[queue.getTail() - 1] = {
        item: values.inputValue,
        state: ElementStates.Default
    };
    setArray([...array]);
    setValues({inputValue: ""});
    setActive(false);
    setIsAdding(false);
    showNotification(`Элемент ${values.inputValue} добавлен в очередь`)
}

const handleRemoveButtonClick = async () => {
    setActive(true);
    setRemoving(true);
    queue.dequeue();
    setQueue(queue);
    array[queue.getHead() - 1] = {
        item: array[queue.getHead() - 1].item,
        state: ElementStates.Changing
    };
    setArray([...array]);
    await delay(SHORT_DELAY_IN_MS);
    array[queue.getHead() - 1] = {item: "", state: ElementStates.Default};
    setArray([...array]);
    setActive(false);
    setRemoving(false);
}

const handleClearButtonClick = () => {
    setActive(true);
    setClearing(true);
    queue.clear();
    setQueue(queue);
    setArray(Array.from({length: 7}, () => ({
        item: '',
        state: ElementStates.Default
    })));
    setActive(false);
    setClearing(false);
}

  return (
    <SolutionLayout title="Очередь">
      <form
          className={`${styles["container"]}`}
          onSubmit={handleAddButton}
      >
        <Input
            placeholder="Введите текст"
            onChange={handleChange}
            extraClass={`${styles["queue-input"]}`}
            maxLength={4}
            isLimitText={true}
            value={values.inputValue || ""}
            name="inputValue"
        />
        <Button
          text="Добавить"
          type={"submit"}
          extraClass={`${styles["queue-btn"]}`}
          disabled={!values.inputValue || isActive}
          isLoader={isAdding}
        />
        <Button
          text="Удалить"
          onClick={handleRemoveButtonClick}
          extraClass={`${styles["queue-btn"]}`}
          disabled={queue.isEmpty() || isActive}
          isLoader={isRemoving}
        />
        <Button
          text="Очистить"
          onClick={handleClearButtonClick}
          extraClass={`${styles["queue-btn"]}`}
          disabled={queue.isEmpty() || isActive}
          isLoader={isClearing}
        />
      </form>
        <ul
            className={`${styles["queue-list"]}`}
        >
            {array.map((item, index) =>
                <li
                    key={index}
                >
                    <Circle
                        letter={item.item}
                        state={item.state}
                        index={index}
                        head={index === queue.getHead() && !queue.isEmpty() ? position.head : ""}
                        tail={index === queue.getTail() - 1 && !queue.isEmpty() ? position.tail : ""}
                    />
                </li>
            )}
        </ul>
        <p className={`${styles["notification"]} text_type_h3`}>{notification}</p>
    </SolutionLayout>
  );
};




