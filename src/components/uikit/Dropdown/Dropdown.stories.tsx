/* eslint-disable import/no-extraneous-dependencies */

import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Dropdown, DropdownInitiator, DropdownMenu } from "./Dropdown";
import { Button } from "../Button";
import { css } from "~/styled-system/css";
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
    hidden: { control: "boolean" },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDropdown: Story = {
  args: {
    size: "sm",
    hidden: false,
    children: [<div>English</div>, <div>Русский</div>],
  },
  render: ({ children, hidden, size }) => {
    const Data = () => {
      const [isOpen, changeOpen] = useState(hidden);
      return (
        <Dropdown>
          <DropdownInitiator>
            <Button onClick={() => changeOpen(!isOpen)}>Menu</Button>
          </DropdownInitiator>
          <DropdownMenu hidden={isOpen} size={size}>
            {children}
          </DropdownMenu>
        </Dropdown>
      );
    };
    return (
      <div
        className={css({
          margin: "100px",
        })}
      >
        <Data />
      </div>
    );
  },
};

export const SizedDropdown: Story = {
  args: DefaultDropdown.args,
  render: ({ children, hidden }) => {
    const data = dropdown.variantMap.size.map((value) => {
      const [isOpen, changeOpen] = useState(hidden);
      return (
        <Dropdown>
          <DropdownInitiator>
            <Button onClick={() => changeOpen(!isOpen)}>Menu</Button>
          </DropdownInitiator>
          <DropdownMenu hidden={isOpen} size={value}>
            {children}
          </DropdownMenu>
        </Dropdown>
      );
    });

    return (
      <div
        className={css({
          display: "flex",
          gap: "100px",
          flexDirection: "column",
          margin: "100px",
        })}
      >
        {data}
      </div>
    );
  },
};
