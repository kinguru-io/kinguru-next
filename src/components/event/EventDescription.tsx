"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button, TextCollapse } from "../uikit";
import { ArrowIcon } from "../uikit/ArrowIcon/ArrowIcon";
import { Box, VStack } from "~/styled-system/jsx";

type EventDescriptionProps = {
  description: string;
};

export function EventDescription({ description }: EventDescriptionProps) {
  const [isShown, setIsShown] = useState(false);
  const t = useTranslations("event.future_event_page");

  const handleExpandClick = () => {
    setIsShown((prevState) => !prevState);
  };

  return (
    <VStack gap="30px" alignItems="flex-start" maxW="660px">
      <TextCollapse
        isShown={isShown}
        textContent={description}
        visibleCharsCount={500}
      />
      <Box color="neutral.1">
        <Button
          variant="outline"
          icon={<ArrowIcon direction={isShown ? "up" : "down"} />}
          iconPosition="right"
          onClick={handleExpandClick}
        >
          {isShown ? t("show_less") : t("show_more")}
        </Button>
      </Box>
    </VStack>
  );
}
