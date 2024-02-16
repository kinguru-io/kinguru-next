import type { Meta, StoryObj } from "@storybook/react";
import { InputPassword } from "@/components/common/form/input-password";
import { Input } from "@/components/uikit/Input";
import { vstack } from "~/styled-system/patterns";
import { input as inputRecipe } from "~/styled-system/recipes";

const meta = {
  title: "UIKit/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: inputRecipe.variantMap.variant.join(" | "),
      options: inputRecipe.variantMap.variant,
      control: "radio",
    },
  },
  args: {
    placeholder: "Placeholder...",
    disabled: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: "text",
    placeholder: "Placeholder...",
  },
};

export const TextOutline: Story = {
  args: {
    type: "text",
    variant: "outline",
    placeholder: "Placeholder...",
  },
};

export const TextFilled: Story = {
  args: {
    type: "text",
    defaultValue: "John Doe",
  },
};

export const TextFilledOutline: Story = {
  args: {
    type: "text",
    variant: "outline",
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

export const ManyOutlineTextFields: Story = {
  render: () => {
    return (
      <div className={vstack({ gap: "3" })}>
        <fieldset className={vstack({ gap: "1" })}>
          <Input type="text" variant="outline" placeholder="First name" />
          <Input type="text" variant="outline" placeholder="Last name" />
        </fieldset>
        <fieldset className={vstack({ gap: "1" })}>
          <Input type="text" variant="outline" defaultValue="John" />
          <Input type="text" variant="outline" defaultValue="Doe" />
        </fieldset>
      </div>
    );
  },
};

export const InputTypePassword: Story = {
  render: () => (
    <>
      <InputPassword defaultValue="" placeholder="Password..." />
    </>
  ),
};
