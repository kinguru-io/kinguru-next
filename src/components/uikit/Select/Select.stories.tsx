import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../icon";
import { Select } from "@/components/uikit/Select";

const meta = {
  title: "UIKit/Forms/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: { icon: { control: { disable: true } } },
  args: {
    placeholder: "Select value",
    disabled: false,
    rounded: false,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOptions = Array.from({ length: 5 }, (_, i) => (
  <option key={i} value={i + 1}>
    Value {i + 1}
  </option>
));

export const Basic: Story = {
  render: (args) => {
    return (
      <div style={{ width: "268px" }}>
        <Select {...args}>{mockOptions}</Select>
      </div>
    );
  },
};

export const WithOptionChecked: Story = {
  args: { defaultValue: "4" },
  render: (args) => {
    return (
      <div style={{ width: "268px" }}>
        <Select {...args}>{mockOptions}</Select>
      </div>
    );
  },
};

export const Invalid: Story = {
  args: { defaultValue: "4" },
  render: (args) => {
    return (
      <div style={{ width: "268px" }}>
        <Select data-invalid {...args}>
          {mockOptions}
        </Select>
      </div>
    );
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: "Code",
    icon: <Icon name="common/phone" />,
    rounded: true,
    children: (
      <>
        <option value="pl">PL</option>
        <option value="lv">LV</option>
      </>
    ),
  },
};
