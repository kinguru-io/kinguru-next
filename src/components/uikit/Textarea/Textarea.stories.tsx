import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@/components/uikit/Textarea";

const meta = {
  title: "UIKit/Forms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    rows: { control: "number" },
  },
  args: {
    placeholder: "Lorem ipsum dolor",
    disabled: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithContent: Story = {
  args: {
    defaultValue: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
};
