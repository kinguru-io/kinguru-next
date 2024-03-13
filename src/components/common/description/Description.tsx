"use client";

import { useState } from "react";
import { Button, TextCollapse, ArrowIcon } from "@/components/uikit";
import { Box, VStack } from "~/styled-system/jsx";

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
    <VStack gap="30px" alignItems="flex-start" maxW={maxW}>
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
          {isShown ? showLessLabel : showMoreLabel}
        </Button>
      </Box>
    </VStack>
  );
}
