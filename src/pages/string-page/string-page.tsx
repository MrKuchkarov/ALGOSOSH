import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import styles from "./string-page.module.css"
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {Circle} from "../../components/ui/circle/circle";
import {TCircleItem} from "../../types/types";
import {ElementStates} from "../../types/element-states";
import {reverseStringArray} from "./utils/reverse-string";
import {delay} from "../../utils/delay";
import {useForm} from "../../hooks/useForm";
import {nanoid} from "nanoid";
export const StringReversePage: React.FC = () => {
  const {values, handleChange, setValues} = useForm({
    inputValue: "",
  });
  const [array, setArray] = useState<TCircleItem[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleStringReverse = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stringSymbols = values.inputValue.split("").map(item => ({
      _id: nanoid(7),
      item,
      state: ElementStates.Default
    }));

    try {
      await reverseStringArray({
        array: stringSymbols,
        setArray,
        setActive: setIsActive,
        delayFunction: delay
      });

      setIsReversed(true);
      setValues({ inputValue: "" });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <SolutionLayout title="Строка">
      <form
          className={`${styles["container"]}`}
          onSubmit={handleStringReverse}
      >
        <Input
            placeholder="Введите строку"
            extraClass={`${styles["input-string-page"]}`}
            isLimitText={true}
            maxLength={11}
           onChange={handleChange}
            value={values.inputValue || ""}
            name="inputValue"
        />
        <Button
            text="Развернуть"
            type="submit"
            disabled={!values.inputValue}
            isLoader={isActive}
            sizes="medium"
        />
      </form>
        <ul className={`${styles["list-string-page"]}`}>
            {array?.map((item: TCircleItem) =>
                <li
                    key={item._id}
                >
                      <Circle
                          letter={item.item}
                          state={item.state}
                      />
                </li>
            )}
        </ul>
      {isReversed && (
          <p className={`${styles["notification"]} text_type_h3`}>
            Строка развёрнута
          </p>
      )}
    </SolutionLayout>
  );
};