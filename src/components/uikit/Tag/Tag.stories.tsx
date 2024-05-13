import type { Meta, StoryObj } from "@storybook/react";
import { tagStyles } from "./Tag";
import { Tag } from "@/components/uikit";
import { Box } from "~/styled-system/jsx";

const meta = {
  title: "UIKit/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: tagStyles.variantMap.variant,
      control: "radio",
    },
    size: {
      options: tagStyles.variantMap.size,
      control: "radio",
    },
  },
  args: {
    children: "text",
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TagPrimary: Story = {
  args: {
    children: "Free",
  },
};

export const TagSecondary: Story = {
  args: {
    variant: "secondary",
    children: "1 = 2",
  },
};

export const TagEllipse: Story = {
  args: {
    variant: "ellipse",
    size: "ellipse",
    children: "Apple TV",
  },
};

export const TagTertiary: Story = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#d9d9d9" }],
    },
  },
  args: {
    variant: "tertiary",
    children: "100 zł",
  },
};

export const TagOuterCss: Story = {
  name: "Tag with outer CSS",
  render: () => {
    return (
      <Box
        w="10rem"
        h="10rem"
        p="1"
        bgColor="neutral.3"
        borderRadius="6px"
        position="relative"
      >
        <Tag variant="tertiary" position="absolute" top="1" right="1">
          $42
        </Tag>
      </Box>
    );
  },
};
