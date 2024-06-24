"use client";

import { useRef, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemToggle,
  Button,
} from "@/components/uikit";

type EssentialItemParts = {
  title: string;
  content: React.ReactNode;
};

export function AccordionGroup<T extends EssentialItemParts>({
  items,
  btnLabel,
  allowAll = false,
  isValid,
  setActiveForm,
  validateFormType,
}: {
  items: T[];
  btnLabel: string;
  allowAll?: boolean;
  isValid: boolean;
  setActiveForm: (activeIdx: number) => void;
  validateFormType: (callback: () => void) => void;
}) {
  const [activeIdx, setActiveIdx] = useState<number>(allowAll ? -1 : 0);
  const doneIdxList = useRef<Set<number>>(new Set());

  const nextItemChosen = (nextIdx: number) => {
    if (isValid) {
      setActiveForm(nextIdx);
      doneIdxList.current.add(nextIdx - 1);
      setActiveIdx(nextIdx === items.length ? -1 : nextIdx);
    }
  };

  const checkboxChanged = (idx: number) => {
    if (!allowAll && !doneIdxList.current.has(idx)) return;

    setActiveForm(idx);
    setActiveIdx((prevIdx) => (prevIdx === idx ? -1 : idx));
    validateFormType(() => {});
  };

  return (
    <Accordion>
      {items.map(({ title, content }, index) => {
        const isActive = activeIdx === index;
        const isDisabledYet =
          !allowAll && !isActive && !doneIdxList.current.has(index);

        return (
          <AccordionItem
            key={title}
            css={{
              "&[data-disabled=true]": {
                color: "secondary",
                backgroundColor: "secondary.lighter",
              },
            }}
            data-disabled={isDisabledYet}
          >
            <AccordionItemToggle
              textStyle="heading.6"
              checkboxProps={{
                checked: isActive,
                onChange: () => checkboxChanged(index),
                disabled: isDisabledYet,
              }}
            >
              {title}
            </AccordionItemToggle>
            <AccordionItemContent>
              {content}
              {!allowAll && (
                <Button
                  type="submit"
                  onClick={() =>
                    validateFormType(() => nextItemChosen(index + 1))
                  }
                  disabled={isDisabledYet || !isActive}
                >
                  {btnLabel}
                </Button>
              )}
            </AccordionItemContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
