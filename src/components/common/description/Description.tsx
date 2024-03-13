"use client";

import { useState } from "react";
import { Button, TextCollapse } from "../../uikit";
import { ArrowIcon } from "../../uikit/ArrowIcon/ArrowIcon";
import { Box, VStack } from "~/styled-system/jsx";

type DescriptionProps = {
  description: string;
  maxW?: string;
  showMoreTranslate: string;
  showLessTranslate: string;
};

export function Description({
  description,
  maxW,
  showLessTranslate,
  showMoreTranslate,
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
          {isShown ? showLessTranslate : showMoreTranslate}
        </Button>
      </Box>
    </VStack>
  );
}
