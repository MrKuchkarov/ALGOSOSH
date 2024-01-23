import React, {ChangeEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {RadioInput} from "../../components/ui/radio-input/radio-input";
import {Button} from "../../components/ui/button/button";
import styles from "./sorting-page.module.css";
import {Direction} from "../../types/direction";
import {SortName, TArrayItem} from "../../types/types";
import {Column} from "../../components/ui/column/column";
import {randomArray} from "../../utils/randomArray";
import {selectSortAscending, selectSortDescending} from "./utils/selection-sort";
import {delay} from "../../utils/delay";
import {bubbleSortAscending, bubbleSortDescending} from "./utils/bubble-sort";
export const SortingPage: React.FC = () => {
  const [initialArray, setInitialArray] = useState<TArrayItem[]>([]);
  const [sortDirection, setSortDirection] = useState<Direction>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedSortType, setSelectedSortType] = useState<string>(SortName.select);
  const [isSortFinished, setIsSortFinished] = useState<boolean>(false);
  const [notificationText, setNotificationText] = useState<string>("");

  useEffect(() => {
    setInitialArray(randomArray());
  }, []);

  const generateRandomArray = () => {
    setIsSortFinished(false);
    setInitialArray(randomArray());
  };

  const handleRadioButtonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedSortType(e.target.value);
  };

  const handleSortButtonClick = async (value: Direction) => {
    setSortDirection(value);
    try {
      switch (selectedSortType) {
        case SortName.select:
          return value === Direction.Ascending
              ? selectSortAscending(initialArray, setInitialArray, setIsActive, setIsSortFinished, delay)
              : selectSortDescending(initialArray, setInitialArray, setIsActive, setIsSortFinished, delay);
        case SortName.bubble:
          return value === Direction.Descending
              ? bubbleSortAscending(initialArray, setInitialArray, setIsActive, setIsSortFinished, delay)
              : bubbleSortDescending(initialArray, setInitialArray, setIsActive, setIsSortFinished, delay);
        default:
      }
    } catch (error) {
      console.error("Ошибка при сортировке:", error);
    }
  };
  const handleSortAscendingClick = () => handleSortButtonClick(Direction.Ascending);
  const handleSortDescendingClick = () => handleSortButtonClick(Direction.Descending);

  useEffect(() => {
    // Checking for the completion of sorting and setting the corresponding text
    if (isSortFinished) {
      const sortType =
          selectedSortType === SortName.select ? "отсортирован выбором" : "отсортирован пузырьком";
      const sortOrder = sortDirection === Direction.Ascending ? "по возрастанию" : "по убыванию";

      setNotificationText(`Массив ${sortType} ${sortOrder}`);
    } else {
      setNotificationText(""); // If the array is not sorted, I clear the text
    }
  }, [isSortFinished, sortDirection, selectedSortType]);

  return (
    <SolutionLayout title="Сортировка массива">
      <div
          className={`${styles["container"]}`}
      >
        <div
            className={`${styles["container-radio-btn"]}`}
        >
          <div
              className={`${styles["container-radio-input"]}`}
          >
            <RadioInput
              label="Выбор"
              onChange={handleRadioButtonChange}
              value={SortName.select}
              checked={selectedSortType === SortName.select}
              disabled={isActive}
            />
            <RadioInput
              label="Пузырёк"
              onChange={handleRadioButtonChange}
              value={SortName.bubble}
              checked={selectedSortType === SortName.bubble}
              disabled={isActive}
            />
          </div>
          <div
              className={`${styles["container-btn"]}`}
          >
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              extraClass={`${styles["sort-btn"]}`}
              isLoader={sortDirection === Direction.Ascending && isActive}
              disabled={isActive}
              onClick={handleSortAscendingClick}
              sizes="medium"
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              extraClass={`${styles["sort-btn"]}`}
              isLoader={sortDirection === Direction.Descending && isActive}
              disabled={isActive}
              onClick={handleSortDescendingClick}
              sizes="medium"
            />
            <Button
              text="Новый массив"
              extraClass={`${styles["sort-btn"]}`}
              disabled={isActive}
              onClick={generateRandomArray}
              sizes="medium"
            />
          </div>
        </div>
        <ul
            className={`${styles["column-container"]}`}
        >
          {initialArray!.map((item) => (
          <li
              key={item._id}
          >
                <Column
                  index={item.item}
                  state={item.state}
                  extraClass={`${styles["array-column"]}`}
                />
          </li>
          ))}
        </ul>
        {notificationText && (
            <p className={`${styles["notification"]} text_type_h3`}>
              {notificationText}
            </p>
        )}
      </div>
    </SolutionLayout>
  );
};
