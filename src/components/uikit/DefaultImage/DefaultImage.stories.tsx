// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, StoryObj } from "@storybook/react";
import { DefaultImage } from "./DefaultImage";
import { AspectRatio } from "~/styled-system/jsx";

const meta = {
  title: "UIKit/DefaultImage",
  component: DefaultImage,
  decorators: [
    (Story) => (
      <AspectRatio ratio={16 / 9} w="400px" h="200">
        <Story />
      </AspectRatio>
    ),
  ],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DefaultImage>;
export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultImageExample: Story = {};
