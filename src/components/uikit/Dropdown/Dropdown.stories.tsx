/* eslint-disable import/no-extraneous-dependencies */

import { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";
import { dropdown } from "~/styled-system/recipes";

const meta = {
  title: "UIKit/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: dropdown.variantMap.size,
      control: "radio",
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDropdown: Story = {
  args: {
    size: "sm",
    children: [<div>English</div>, <div>Русский</div>],
  },
};

export const SizedDropdown: Story = {
  args: DefaultDropdown.args,
  render: ({ children }) => {
    const data = dropdown.variantMap.size.map((value) => {
      return <Dropdown size={value}>{children}</Dropdown>;
    });

    return <>{data}</>;
  },
};
