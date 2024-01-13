import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import style from "./sorting-page.module.css";
import {Direction} from "../../types/direction";
import {SortName, TArrayItems} from "../../types/types";
import {Column} from "../ui/column/column";

export const SortingPage: React.FC = () => {
  const [initArray, setInitArray] = useState<TArrayItems[]>([]);
  const [sort, setSort] = useState<Direction>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [radioBtnValue, setRadioBtnValue] = useState<string>(SortName.select);
  const [isReversed, setIsReversed] = useState<boolean>(false);

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
              // onChange={handleRadioBtnChange}
            />
            <RadioInput
              label="Пузырёк"
              // onChange={handleRadioBtnChange}
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
              // onChange={() => handleSortBtnClick(Direction.Ascending)}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              extraClass={`${style["sort-btn"]}`}
              isLoader={sort === Direction.Descending && isActive}
              disabled={isActive}
              // onChange={() => handleSortBtnClick(Direction.Descending)}
            />
            <Button
              text="Новый массив"
              extraClass={`${style["sort-btn"]}`}
              disabled={isActive}
              // onClick={getRandomArr}
            />
          </div>
        </div>
        <ul
            className={`${style["column-container"]}`}
        >
          {initArray?.map((item, index) => (
          <li>
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
