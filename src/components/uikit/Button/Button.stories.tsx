/* eslint-disable import/no-extraneous-dependencies */
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FaAccessibleIcon } from "react-icons/fa6";
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
      description: "primary | outline",
      options: ["primary", "outline"],
      control: { type: "radio" },
    },
    size: {
      description: "sm | ...",
      options: ["sm"],
      control: { type: "radio" },
    },
    iconPosition: {
      description: "left | right",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Подробнее",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Показать все направления",
  },
};

export const PrimaryWithIcon: StoryObj = {
  name: "Primary with an icon",
  args: {
    variant: "primary",
    children: "Primary",
    icon: <FaAccessibleIcon />,
  },
};

export const OutlineWithIcon: StoryObj = {
  name: "Outline with an icon on the right side",
  args: {
    variant: "outline",
    children: "Outline",
    icon: <FaAccessibleIcon />,
    iconPosition: "right",
  },
};
