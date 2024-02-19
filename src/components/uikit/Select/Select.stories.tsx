import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "@/components/uikit/Select";

const meta = {
  title: "UIKit/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      defaultValue: "",
      control: "text",
    },
    disabled: {
      defaultValue: false,
      type: "boolean",
      control: "boolean",
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectPrimary: Story = {
  render: (args) => {
    return (
      <div style={{ width: "268px" }}>
        <Select {...args}>
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i} value={i + 1}>
              Value {i + 1}
            </option>
          ))}
        </Select>
      </div>
    );
  },
};

export const SelectWithPlaceholder: Story = {
  args: {
    placeholder: "Country",
  },
};
