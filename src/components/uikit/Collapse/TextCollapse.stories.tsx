// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button, TextCollapse } from "@/components/uikit";
import { Box, Flex } from "~/styled-system/jsx";

const meta = {
  title: "UIKit/Collapse/TextCollapse",
  component: TextCollapse,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TextCollapse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    visibleCharsCount: 500,
    isShown: false,
    textContent: faker.lorem.paragraph(30),
  },
  decorators: [
    (Story) => {
      return (
        <Box maxWidth="5xl">
          <Story />
        </Box>
      );
    },
  ],
};

export const WithTrigger: Story = {
  args: Basic.args,
  render: ({ isShown: _unused, ...restProps }) => {
    const [isShown, setIsShown] = useState(false);

    return (
      <Flex maxWidth="5xl" gap="2" direction="column" alignItems="center">
        <TextCollapse isShown={isShown} {...restProps} />
        <Button variant="outline" onClick={() => setIsShown((prev) => !prev)}>
          Show {isShown ? "less" : "more"}
        </Button>
      </Flex>
    );
  },
};
