import type { Meta, StoryObj } from "@storybook/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { fn } from "@storybook/test";
import { Button } from "@/components/uikit";

const meta = {
  title: "UIKit/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "default | unfilled",
      options: ["default", "unfilled"],
      control: { type: "radio" },
    },
    size: {
      description: "sm | ...",
      options: ["sm"],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Подробнее",
  },
};

export const Unfilled: Story = {
  args: {
    variant: "unfilled",
    children: "Показать все направления",
  },
};
