import React, {ChangeEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {RadioInput} from "../../components/ui/radio-input/radio-input";
import {Button} from "../../components/ui/button/button";
import styles from "./sorting-page.module.css";
import {Direction} from "../../types/direction";
import {SortName, TArrayItem} from "../../types/types";
import {Column} from "../../components/ui/column/column";
import {randomArray} from "../../utils/randomArray";
import {selectSortAscending, selectSortDescending} from "./selection-sort";
import {bubbleSortAscending, bubbleSortDescending} from "./bubble-sort";
import { v4 as uuidv4 } from 'uuid';
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
  const handleSortButtonClick = (value: Direction) => {
    setSortDirection(value);
    switch (selectedSortType) {
      case SortName.select:
        return value === Direction.Ascending
            ? selectSortAscending(initialArray, setInitialArray, setIsActive, setIsSortFinished)
            : selectSortDescending(initialArray, setInitialArray, setIsActive, setIsSortFinished);
      case SortName.bubble:
        return value === Direction.Descending
            ? bubbleSortAscending(initialArray, setInitialArray, setIsActive, setIsSortFinished)
            : bubbleSortDescending(initialArray, setInitialArray, setIsActive, setIsSortFinished);
      default:
    }
  }
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
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              extraClass={`${styles["sort-btn"]}`}
              isLoader={sortDirection === Direction.Descending && isActive}
              disabled={isActive}
              onClick={handleSortDescendingClick}
            />
            <Button
              text="Новый массив"
              extraClass={`${styles["sort-btn"]}`}
              disabled={isActive}
              onClick={generateRandomArray}
            />
          </div>
        </div>
        <ul
            className={`${styles["column-container"]}`}
        >
          {initialArray!.map((item, index) => (
          <li
              key={index}
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


// The provided code is a React component named SortingPage, designed to visualize the sorting of an array.
// This component utilizes external components (SolutionLayout, RadioInput, Button, Column) and styles from the sorting-page.module.css file.
// Additionally, the code includes functions to implement sorting algorithms (selection sort and bubble sort).

// SortingPage:
//     - Uses state hooks to track the initial array, sorting direction, sorting activity, selected sorting algorithm, and whether the array is reversed.
//     - Initializes the initial array with random values inside the useEffect during the first render.

//    Sorting Functions:
//     - bubbleSortAscending and bubbleSortDescending: Implementation of the bubble sort algorithm (ascending and descending).
//     - selectSortAscending and selectSortDescending: Implementation of the selection sort algorithm (ascending and descending).
//     - Each of these functions employs asynchronous logic to visualize sorting steps by
//     changing the states of array elements using state hooks setArray, setActive, and setIsSortFinished.

//    Event Handlers:
//     - generateRandomArray: Generates a new random array and resets the reversed sorting flag.
//     - handleRadioButtonChange: Handles changes in the selected sorting algorithm.
//     - handleSortButtonClick: Handles the click event of the sorting buttons and calls the corresponding sorting function.

//    Rendering:
//     - Visualizes the component using child components, styles, and data about the state of array elements.

//    Imports:
//     - Includes imports for React components, UI components (SolutionLayout, RadioInput, Button, Column),
//     styles, data types, and utility functions (randomArray, delay, swap).

//     Overall, the code provides a structured and readable component for visualizing array sorting using different algorithms.
//     The sorting logic is encapsulated in separate functions, promoting better code maintainability and readability.
//
//


