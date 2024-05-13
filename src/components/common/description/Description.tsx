"use client";

import { useState } from "react";
import { Button, TextCollapse, ArrowIcon } from "@/components/uikit";
import { Box, Stack } from "~/styled-system/jsx";

type DescriptionProps = {
  description: string;
  maxW?: string;
  showMoreLabel: string;
  showLessLabel: string;
};

export function Description({
  description,
  maxW,
  showLessLabel,
  showMoreLabel,
}: DescriptionProps) {
  const [isShown, setIsShown] = useState(false);

  const handleExpandClick = () => {
    setIsShown((prevState) => !prevState);
  };

  return (
    <Stack gap="30px" maxW={maxW} alignSelf="stretch">
      <TextCollapse
        isShown={isShown}
        textContent={description}
        visibleCharsCount={500}
      />
      {description.length > 500 && (
        <Box color="neutral.1">
          <Button
            variant="outline"
            icon={<ArrowIcon direction={isShown ? "up" : "down"} />}
            iconPosition="right"
            onClick={handleExpandClick}
          >
            {isShown ? showLessLabel : showMoreLabel}
          </Button>
        </Box>
      )}
    </Stack>
  );
}
