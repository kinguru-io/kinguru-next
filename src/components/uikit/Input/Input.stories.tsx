import type { Meta, StoryObj } from "@storybook/react";
import { Icon, Input, InputPassword } from "@/components/uikit";
import { vstack } from "~/styled-system/patterns";

const meta = {
  title: "UIKit/Forms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    prefix: { control: { disable: true } },
    suffix: { control: { disable: true } },
    "data-invalid": { control: { disable: true } },
  },
  args: {
    type: "text",
    placeholder: "Placeholder...",
    disabled: false,
    rounded: false,
    textCentered: false,
    "aria-invalid": false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    type: "text",
    placeholder: "Placeholder...",
  },
};

export const WithIcon: Story = {
  args: {
    type: "text",
    prefix: <Icon name="common/phone" />,
    placeholder: "Phone",
  },
};

export const WithIconAtEnd: Story = {
  args: {
    type: "text",
    suffix: <Icon name="action/arrow" />,
    placeholder: "Go back",
  },
};

export const TextFilled: Story = {
  args: {
    type: "text",
    defaultValue: "John Doe",
  },
};

export const ManyTextFields: Story = {
  render: () => {
    return (
      <div className={vstack({ gap: "4" })}>
        <fieldset className={vstack({ gap: "2" })}>
          <Input type="text" placeholder="First name" />
          <Input type="text" placeholder="Last name" />
        </fieldset>
        <fieldset className={vstack({ gap: "2" })}>
          <Input type="text" defaultValue="John" />
          <Input type="text" defaultValue="Doe" />
        </fieldset>
      </div>
    );
  },
};

export const InputTypePassword: Story = {
  argTypes: {
    type: { control: { disable: true } },
  },
  render: ({ type: _unused, ...restArgs }) => (
    <InputPassword {...restArgs} placeholder="Password" />
  ),
};
