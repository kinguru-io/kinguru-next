/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import { useId } from "react";
import { Radio } from "./Radio";
import { VStack } from "~/styled-system/jsx";

const meta = {
  title: "UIKit/Forms/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Radio>;

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

export const RadioGroup = {
  render: () => {
    const radioName = useId();

    return (
      <VStack alignItems="flex-start">
        <Radio name={radioName} label={faker.hacker.adjective()} />
        <Radio name={radioName} label={faker.hacker.adjective()} />
      </VStack>
    );
  },
};

export const DisabledRadioGroup = {
  render: () => {
    const radioName = useId();

    return (
      <VStack alignItems="flex-start">
        <Radio
          name={radioName}
          label={faker.hacker.adjective()}
          checked
          disabled
          readOnly
        />
        <Radio
          name={radioName}
          label={faker.hacker.adjective()}
          disabled
          readOnly
        />
      </VStack>
    );
  },
};
