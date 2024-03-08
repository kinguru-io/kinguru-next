"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { GrNext } from "react-icons/gr";
import { Button, TextCollapse } from "../uikit";
import { css } from "~/styled-system/css";
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
          icon={<ExpandStateIcon isShown={isShown} />}
          iconPosition="right"
          onClick={handleExpandClick}
        >
          {isShown ? t("show_less") : t("show_more")}
        </Button>
      </Box>
    </VStack>
  );
}

function ExpandStateIcon({ isShown }: { isShown: boolean }) {
  return (
    <GrNext
      className={css({
        rotate: "90deg",
        "&[data-expanded=true]": {
          rotate: "-90deg",
        },
      })}
      data-expanded={isShown}
    />
  );
}
