import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "@/components/common";
import { Button } from "@/components/uikit";
import { button as buttonRecipe } from "~/styled-system/recipes";

const variantMap = buttonRecipe.variantMap;

const meta: Meta<typeof Button> = {
  title: "UIKit/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: variantMap.size,
      control: { type: "radio" },
    },
    colorPalette: {
      options: variantMap.colorPalette,
      control: { type: "radio" },
    },
    icon: { control: { disable: true } },
  },
  args: {
    colorPalette: "primary",
    size: "sm",
    disabled: false,
    isLoading: false,
    centered: true,
    iconPosition: "left",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SolidSM: Story = {
  args: {
    children: "Log in / sign in",
  },
};

export const iconButton: Story = {
  args: {
    children: "Icon button",
    icon: <Icon name="action/arrow" />,
  },
};

export const PrimaryWithIcon: StoryObj = {
  name: "Primary with an icon",
  args: {
    children: "Primary",
    icon: <Icon name="action/arrow" />,
  },
};

export const SecondaryWithIcon: StoryObj = {
  name: "Secondary with an icon on the right side",
  args: {
    children: "Outline",
    colorPalette: "secondary",
    icon: <Icon name="action/arrow" />,
    iconPosition: "right",
  },
};
