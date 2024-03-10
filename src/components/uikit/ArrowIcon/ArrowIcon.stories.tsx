// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, StoryObj } from "@storybook/react";
import { ArrowIcon } from "./ArrowIcon";
import { Box } from "~/styled-system/jsx";
import { arrowIcon } from "~/styled-system/recipes";

const meta = {
  title: "UIKit/ArrowIcon",
  component: ArrowIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      options: arrowIcon.variantMap.direction,
      control: "radio",
    },
  },
} satisfies Meta<typeof ArrowIcon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultArrowIcon: Story = {};

export const DifferentDirectionsArrowIcon: Story = {
  args: DefaultArrowIcon.args,
  render: () => {
    const data = arrowIcon.variantMap.direction.map((direction) => {
      return (
        <Box m="20px">
          <ArrowIcon direction={direction} />
        </Box>
      );
    });

    return <>{data}</>;
  },
};
