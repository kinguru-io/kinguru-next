/* eslint-disable import/no-extraneous-dependencies */
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FaAccessibleIcon } from "react-icons/fa6";
import { Button, buttonColorPalette } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { button as buttonRecipe } from "~/styled-system/recipes";

const variantMap = buttonRecipe.variantMap;

const meta = {
  title: "UIKit/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: variantMap.variant.join(" | "),
      options: variantMap.variant,
      control: { type: "radio" },
    },
    size: {
      description: variantMap.size.join(" | "),
      options: variantMap.size,
      control: { type: "radio" },
    },
    colorPalette: {
      description: buttonColorPalette.join(" | "),
      options: buttonColorPalette,
      control: { type: "radio" },
    },
    iconPosition: { description: "left | right" },
    disabled: { control: "boolean" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SolidSM: Story = {
  args: {
    children: "Подробнее",
  },
};

export const RandomVariantConditionalSize: StoryObj = {
  name: "Random color with conditional size",
  args: {
    colorPalette: buttonColorPalette.at(
      Math.floor(Math.random() * buttonColorPalette.length),
    ),
    children: "[md, xl]",
    size: ["md", "xl"],
  },
};

function renderSizedFn(colorPalette: (typeof buttonColorPalette)[number]) {
  return () => {
    const sizes = variantMap.size;

    return (
      <div
        className={css({
          display: "flex",
          gap: 3,
          alignItems: "end",
        })}
      >
        {sizes.map((size) => (
          <Button colorPalette={colorPalette} size={size}>
            {colorPalette} [{size}]
          </Button>
        ))}
      </div>
    );
  };
}

export const PrimarySized: Story = {
  render: renderSizedFn("primary"),
};

export const SecondarySized: Story = {
  render: renderSizedFn("secondary"),
};

export const DangerSized: Story = {
  render: renderSizedFn("danger"),
};

export const SuccessSized: Story = {
  render: renderSizedFn("success"),
};

export const PrimaryWithIcon: StoryObj = {
  name: "Primary with an icon",
  args: {
    children: "Primary",
    icon: <FaAccessibleIcon />,
    size: "md",
  },
};

export const OutlineSecondaryWithIcon: StoryObj = {
  name: "Outline secondary with an icon on the right side",
  args: {
    variant: "outline",
    colorPalette: "secondary",
    children: "Outline",
    icon: <FaAccessibleIcon />,
    iconPosition: "right",
    size: "md",
  },
};
