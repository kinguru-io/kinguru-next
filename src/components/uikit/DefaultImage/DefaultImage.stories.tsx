// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, StoryObj } from "@storybook/react";
import { DefaultImage } from "./DefaultImage";
import { Box } from "~/styled-system/jsx";

const meta = {
  title: "UIKit/DefaultImage",
  component: () => (
    <Box w="400px" h="200px">
      <DefaultImage />
    </Box>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DefaultImage>;
export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultImageExample: Story = {};
