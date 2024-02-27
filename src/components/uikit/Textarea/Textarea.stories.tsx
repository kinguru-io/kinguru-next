import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@/components/uikit/Textarea";

const meta = {
  title: "UIKit/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Placeholder...",
    disabled: false,
    rows: 4,
    cols: 31,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextAreaEmpty: Story = {
  args: {
    placeholder: "Placeholder...",
  },
};

export const TextAreaFilled: Story = {
  args: {
    defaultValue: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
};
