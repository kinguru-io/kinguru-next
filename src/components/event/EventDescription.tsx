"use client";

import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { Button, TextCollapse } from "../uikit";
import { css } from "~/styled-system/css";
import { Flex, VStack } from "~/styled-system/jsx";

type EventDescriptionProps = {
  description: string;
};

export function EventDescription({ description }: EventDescriptionProps) {
  const [isShown, setIsShown] = useState(false);
  return (
    <VStack gap="20px" alignItems="baseline">
      <h3>Описание мероприятия</h3>
      <Flex maxW="660px" gap="25px" direction="column" align="baseline">
        <TextCollapse
          isShown={isShown}
          textContent={description}
          visibleCharsCount={500}
        />
        <Button
          variant="outline"
          onClick={() => setIsShown(!isShown)}
          iconPosition="right"
          icon={<MdExpandMore fill="neutral.1" />}
        >
          {isShown ? (
            <span className={css({ color: "neutral.1" })}>Меньше</span>
          ) : (
            <span className={css({ color: "neutral.1" })}>Подробнее</span>
          )}
        </Button>
      </Flex>
    </VStack>
  );
}
