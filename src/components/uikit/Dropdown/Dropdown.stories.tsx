/* eslint-disable import/no-extraneous-dependencies */

import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Dropdown } from "./Dropdown";
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
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDropdown: Story = {
  args: {
    size: "sm",
    hidden: false,
    parent: <Button>Меню</Button>,
    children: [<div>English</div>, <div>Русский</div>],
  },
  render: ({ children, parent, hidden, size }) => {
    const Data = () => {
      const [isOpen, changeOpen] = useState(hidden);
      return (
        <Dropdown
          hidden={isOpen}
          size={size}
          parent={<div onClick={() => changeOpen(!isOpen)}>{parent}</div>}
        >
          {children}
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
  render: ({ children, parent, hidden }) => {
    const data = dropdown.variantMap.size.map((value) => {
      const [isOpen, changeOpen] = useState(hidden);
      return (
        <Dropdown
          hidden={isOpen}
          size={value}
          parent={<div onClick={() => changeOpen(!isOpen)}>{parent}</div>}
        >
          {children}
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
