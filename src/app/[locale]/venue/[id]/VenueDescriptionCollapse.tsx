"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { GrNext } from "react-icons/gr";
import { Button, TextCollapse } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Flex } from "~/styled-system/jsx";

export function VenueDescriptionCollapse({
  description,
}: {
  description: string;
}) {
  const [isShown, setShown] = useState(false);
  const t = useTranslations("venue.public_page");

  const handleExpandClick = () => {
    setShown((prevState) => !prevState);
  };

  return (
    <Flex gap="30px" direction="column" alignItems="flex-start">
      <TextCollapse
        isShown={isShown}
        textContent={description}
        visibleCharsCount={500}
      />
      <Button
        variant="outline"
        icon={<ExpandStateIcon isShown={isShown} />}
        iconPosition="right"
        onClick={handleExpandClick}
      >
        {isShown ? t("show_less") : t("show_more")}
      </Button>
    </Flex>
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
