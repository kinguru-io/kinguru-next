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
    backgroundColor: { control: "color" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    status: "default",
    children: "Hello",
  },
};

export const Secondary: Story = {
  args: {
    status: "default",
    children: "Hello",
  },
};

export const Large: Story = {
  args: {
    status: "default",
    children: "Hello",
  },
};

export const Small: Story = {
  args: {
    status: "default",
    children: "Hello",
  },
};
