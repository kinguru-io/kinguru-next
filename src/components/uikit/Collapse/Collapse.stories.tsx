import type { Meta } from "@storybook/react";
import { useState } from "react";
import { Button, Collapse, Textarea } from "@/components/uikit";
import { Flex } from "~/styled-system/jsx";

const meta = {
  title: "UIKit/Collapse/Collapse",
  component: Collapse,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Collapse>;

export default meta;

export const Basic = () => {
  const [isShown, setIsShown] = useState(false);

  return (
    <Flex maxWidth="xl" gap="2" direction="column" alignItems="center">
      <Collapse isShown={isShown}>
        <Textarea placeholder="Write your own story!" defaultValue="" />
      </Collapse>
      <Button onClick={() => setIsShown((prev) => !prev)}>
        {isShown ? "Close" : "Write a story"}
      </Button>
    </Flex>
  );
};
