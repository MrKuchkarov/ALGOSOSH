import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import style from "./queue-page.module.css";
import {v4 as uuidv4} from "uuid";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {Queue} from "./queue";
import {position, TQueueItem} from "../../types/types";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

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
const [notification, setNotification] = useState<string | null>(null);

const handleInputValueChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
};
const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
};
const updateArrayForAdding = () => {
    array[queue.getTail() - 1] = {
        item: "",
        state: ElementStates.Changing };
    setArray([...array]);
    delay(SHORT_DELAY_IN_MS).then(() => {
        array[queue.getTail() - 1] = {
            item: inputValue,
            state: ElementStates.Default };
        setArray([...array]);
    });
};
const handleAddButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(true);
    setAdding(true);
    if (queue.getLength() >= queue.getSize()) {
        // Максимальная длина достигнута, выводим предупреждение и завершаем функцию
        setNotification("Максимальная длина достигнута");
        setActive(false);
        setAdding(false);
        return;
    }
    queue.enqueue({
        item: inputValue,
        state: ElementStates.Default});
    setQueue(queue);

    updateArrayForAdding();

    setArray([...array]);
    setInputValue("");
    setActive(false);
    setAdding(false);
    showNotification(`Добавлен элемент в очередь: ${inputValue}`);
};
    const updateArrayForRemoving = () => {
        array[queue.getHead() - 1] = {
            item: array[queue.getHead() - 1].item,
            state: ElementStates.Changing };
        setArray([...array]);
        delay(SHORT_DELAY_IN_MS).then(() => {
            array[queue.getHead() - 1] = {
                item: "",
                state: ElementStates.Default };
            setArray([...array]);
        });
    };
    const handleRemoveButtonClick = async () => {
        setActive(true);
        setRemoving(true);
        if (queue.isEmpty()) {
            // Очередь пуста
            console.warn("No elements in the queue");
            setActive(false);
            setRemoving(false);
            return;
        }
        const removedItem = queue.peek();
        queue.dequeue();
        setQueue(queue);

        updateArrayForRemoving();

        setArray([...array]);
        setActive(false);
        setRemoving(false);
        showNotification(`Элемент удален из очереди: ${removedItem?.item}`);
    };


const handleClearButtonClick = () => {
    setActive(true);
    setClearing(true);
    queue.clear();
    setQueue(queue);
    setArray(Array.from({length: 7}, () => ({
        item: "",
        state: ElementStates.Default
    })));
    setActive(false);
    setClearing(false);
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
                        head={index === queue.getHead() && !queue.isEmpty() ? position.head : ""}
                        tail={index === queue.getTail() - 1 && !queue.isEmpty() ? position.tail : ""}
                    />
                </li>
            )}
        </ul>
        <p className={`${style["notification"]} text_type_h3`}>{notification}</p>
    </SolutionLayout>
  );
};


// const handleInputValueChange = (e: FormEvent<HTMLInputElement>) => {
//     setInputValue(e.currentTarget.value);
// }
//
// const handleAddButton = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setActive(true);
//     setAdding(true);
//     queue.enqueue({item: inputValue, state: ElementStates.Default});
//     setQueue(queue);
//     array[queue.getTail() - 1] = {item: '', state: ElementStates.Changing};
//     setArray([...array]);
//     await delay(SHORT_DELAY_IN_MS);
//     array[queue.getTail() - 1] = {
//         item: inputValue,
//         state: ElementStates.Changing
//     };
//     setArray([...array]);
//     array[queue.getTail() - 1] = {
//         item: inputValue,
//         state: ElementStates.Default
//     };
//     setArray([...array]);
//     setInputValue('');
//     setActive(false);
//     setAdding(false);
// }
//
// const handleRemoveButtonClick = async () => {
//     setActive(true);
//     setRemoving(true);
//     queue.dequeue();
//     setQueue(queue);
//     array[queue.getHead() - 1] = {
//         item: array[queue.getHead() - 1].item,
//         state: ElementStates.Changing
//     };
//     setArray([...array]);
//     await delay(SHORT_DELAY_IN_MS);
//     array[queue.getHead() - 1] = {item: '', state: ElementStates.Default};
//     setArray([...array]);
//     setActive(false);
//     setRemoving(false);
// }
//
// const handleClearButtonClick = () => {
//     setActive(true);
//     setClearing(true);
//     queue.clear();
//     setQueue(queue);
//     setArray(Array.from({length: 7}, () => ({
//         item: '',
//         state: ElementStates.Default
//     })));
//     setActive(false);
//     setClearing(false);
// }