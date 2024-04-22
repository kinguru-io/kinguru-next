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
}: {
  items: T[];
  btnLabel: string;
}) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const doneIdxList = useRef<Set<number>>(new Set());

  const nextItemChosen = (nextIdx: number) => {
    doneIdxList.current.add(nextIdx - 1);
    setActiveIdx(nextIdx === items.length ? -1 : nextIdx);
  };

  const checkboxChanged = (idx: number) => {
    if (!doneIdxList.current.has(idx)) return;

    setActiveIdx((prevIdx) => (prevIdx === idx ? -1 : idx));
  };

  return (
    <Accordion>
      {items.map(({ title, content, isNextBtnDisabled = false }, index) => {
        const isActive = activeIdx === index;
        const isDisabledYet = !isActive && !doneIdxList.current.has(index);

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
              <Button
                onClick={() => nextItemChosen(index + 1)}
                disabled={isNextBtnDisabled || isDisabledYet || !isActive}
              >
                {btnLabel}
              </Button>
            </AccordionItemContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
