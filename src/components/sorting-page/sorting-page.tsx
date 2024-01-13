import React, {ChangeEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import style from "./sorting-page.module.css";
import {Direction} from "../../types/direction";
import {SortName, TArrayItem} from "../../types/types";
import {Column} from "../ui/column/column";
import {randomArray} from "../../utils/randomArray";
import {selectSortAscending, selectSortDescending} from "./selection-sort";
import {bubbleSortAscending, bubbleSortDescending} from "./bubble-sort";

export const SortingPage: React.FC = () => {
  const [initArray, setInitArray] = useState<TArrayItem[]>([]);
  const [sort, setSort] = useState<Direction>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [radioBtnValue, setRadioBtnValue] = useState<string>(SortName.select);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  useEffect(() => {
    setInitArray(randomArray());
  }, []);

  const getRandomArray = () => {
    setInitArray(randomArray());
  };

  const handleRadioBtnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioBtnValue(e.target.value);
  };

  const handleSortBtnClick = (value: Direction) => {
    setSort(value);
    if (radioBtnValue === SortName.select && value === Direction.Ascending) {
      return selectSortAscending(initArray, setInitArray, setIsActive);
    }
    if (radioBtnValue === SortName.select && value === Direction.Descending) {
      return selectSortDescending(initArray, setInitArray, setIsActive);
    }
    if (radioBtnValue === SortName.bubble && value === Direction.Ascending) {
      return bubbleSortAscending(initArray, setInitArray, setIsActive);
    }
    if (radioBtnValue === SortName.bubble && value === Direction.Descending) {
      return  bubbleSortDescending(initArray, setInitArray, setIsActive);
    }
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <div
          className={`${style["container"]}`}
      >
        <div
            className={`${style["container-radio-btn"]}`}
        >
          <div
              className={`${style["container-radio-input"]}`}
          >
            <RadioInput
              label="Выбор"
              onChange={handleRadioBtnChange}
              value={SortName.select}
              checked={radioBtnValue === SortName.select}
              disabled={isActive}
            />
            <RadioInput
              label="Пузырёк"
              onChange={handleRadioBtnChange}
              value={SortName.bubble}
              checked={radioBtnValue === SortName.bubble}
              disabled={isActive}
            />
          </div>
          <div
              className={`${style["container-btn"]}`}
          >
            <Button
              text="По возростанию"
              sorting={Direction.Ascending}
              extraClass={`${style["sort-btn"]}`}
              isLoader={sort === Direction.Ascending && isActive}
              disabled={isActive}
              onClick={() => handleSortBtnClick(Direction.Ascending)}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              extraClass={`${style["sort-btn"]}`}
              isLoader={sort === Direction.Descending && isActive}
              disabled={isActive}
              onClick={() => handleSortBtnClick(Direction.Descending)}
            />
            <Button
              text="Новый массив"
              extraClass={`${style["sort-btn"]}`}
              disabled={isActive}
              onClick={getRandomArray}
            />
          </div>
        </div>
        <ul
            className={`${style["column-container"]}`}
        >
          {initArray?.map((item, index) => (
          <li key={index}>
            <Column
              index={item.item}
              state={item.state}
              extraClass={`${style["array-column"]}`}
            />
          </li>
          ))}
        </ul>
        {isReversed && (
            <p className={`${style["notification"]} text_type_h3`}>
              Массив отсортирован
            </p>
        )}
      </div>
    </SolutionLayout>
  );
};
