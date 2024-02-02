/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AvatarGroup } from "@/components/uikit/AvatarGroup";

const meta = {
  title: "UIKit/Avatar/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    avatars: {
      control: "none",
    },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const avatars = Array.from({ length: 5 }, () => ({
  image: faker.image.avatar(),
  name: faker.person.fullName(),
}));

export const GroupThree: Story = {
  name: "Group of 3 items",
  args: { avatars },
};

export const GroupFive: Story = {
  name: "Group of 5 items",
  args: { avatars, showCount: 5 },
};
