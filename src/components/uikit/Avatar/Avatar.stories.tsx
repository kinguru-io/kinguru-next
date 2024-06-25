/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@/components/uikit/Avatar";
import { avatar as avatarRecipe } from "~/styled-system/recipes";

const meta = {
  title: "UIKit/Avatar/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: avatarRecipe.variantMap.size,
      control: "radio",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    image: faker.image.avatar(),
    name: faker.person.fullName(),
  },
};

export const WithBrokenSrc: Story = {
  args: {
    image: "???",
    name: faker.person.fullName(),
  },
};
