/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { VStack } from "~/styled-system/jsx";

const meta = {
  title: "UIKit/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: faker.company.catchPhrase(),
  },
};

export const Invalid: Story = {
  args: {
    ...Basic.args,
    "aria-invalid": true,
  },
};

export const Disabled = {
  render: () => {
    return (
      <VStack alignItems="flex-start">
        <Checkbox label={faker.hacker.adjective()} checked disabled />
        <Checkbox label={faker.hacker.adjective()} disabled />
      </VStack>
    );
  },
};
