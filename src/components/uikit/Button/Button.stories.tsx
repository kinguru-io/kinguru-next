/* eslint-disable import/no-extraneous-dependencies */
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FaAccessibleIcon } from "react-icons/fa6";
import { Button, button as buttonStyles } from "@/components/uikit";
import { css } from "~/styled-system/css";

const meta = {
  title: "UIKit/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: buttonStyles.variantMap.variant.join(" | "),
      options: buttonStyles.variantMap.variant,
      control: { type: "select" },
    },
    size: {
      description: buttonStyles.variantMap.size.join(" | "),
      options: buttonStyles.variantMap.size,
      control: { type: "radio" },
    },
    iconPosition: { description: "left | right" },
    disabled: { control: "boolean" },
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

const renderSizeVariantsFn =
  (variant: (typeof buttonStyles.variantMap.variant)[number]) => () => {
    const sizes = buttonStyles.variantMap.size;

    return (
      <div
        className={css({
          display: "flex",
          gap: 3,
          alignItems: "end",
        })}
      >
        {sizes.map((size) => (
          <Button variant={variant} size={size}>
            {variant} [{size}]
          </Button>
        ))}
      </div>
    );
  };

export const PrimarySized: Story = {
  render: renderSizeVariantsFn("primary"),
};

export const SecondarySized: Story = {
  render: renderSizeVariantsFn("secondary"),
};

export const OutlineSized: Story = {
  render: renderSizeVariantsFn("outline"),
};

export const DangerSized: Story = {
  render: renderSizeVariantsFn("danger"),
};

export const SuccessSized: Story = {
  render: renderSizeVariantsFn("success"),
};

export const PrimaryWithIcon: StoryObj = {
  name: "Primary with an icon",
  args: {
    variant: "primary",
    children: "Primary",
    icon: <FaAccessibleIcon />,
    size: "md",
  },
};

export const OutlineWithIcon: StoryObj = {
  name: "Outline with an icon on the right side",
  args: {
    variant: "outline",
    children: "Outline",
    icon: <FaAccessibleIcon />,
    iconPosition: "right",
    size: "md",
  },
};
