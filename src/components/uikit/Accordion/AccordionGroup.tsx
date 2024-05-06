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
  isNextBtnDisabled?: boolean;
};

export function AccordionGroup<T extends EssentialItemParts>({
  items,
  btnLabel,
  allowAll = false,
}: {
  items: T[];
  btnLabel: string;
  allowAll?: boolean;
}) {
  const [activeIdx, setActiveIdx] = useState<number>(allowAll ? -1 : 0);
  const doneIdxList = useRef<Set<number>>(new Set());

  const nextItemChosen = (nextIdx: number) => {
    doneIdxList.current.add(nextIdx - 1);
    setActiveIdx(nextIdx === items.length ? -1 : nextIdx);
  };

  const checkboxChanged = (idx: number) => {
    if (!allowAll && !doneIdxList.current.has(idx)) return;

    setActiveIdx((prevIdx) => (prevIdx === idx ? -1 : idx));
  };

  return (
    <Accordion>
      {items.map(({ title, content, isNextBtnDisabled = false }, index) => {
        const isActive = activeIdx === index;
        const isDisabledYet =
          !allowAll && !isActive && !doneIdxList.current.has(index);

        return (
          <AccordionItem
            key={title}
            css={{
              "&[data-disabled=true]": {
                color: "neutral.2",
                backgroundColor: "neutral.4",
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
                  type="button"
                  onClick={() => nextItemChosen(index + 1)}
                  disabled={isNextBtnDisabled || isDisabledYet || !isActive}
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
