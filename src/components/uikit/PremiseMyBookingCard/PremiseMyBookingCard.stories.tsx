/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import { NextIntlClientProvider } from "next-intl";
import {
  PremiseMyBookingCard,
  PremiseMyBookingCardDescription,
  PremiseMyBookingCardTitle,
  PremiseMyBookingCardContent,
} from "@/components/uikit";
import { Container } from "~/styled-system/jsx";

const items = Array.from({ length: 3 }).map((_, i) => ({
  id: i,
  src: faker.image.urlLoremFlickr({
    width: 720,
    height: 405,
    category: "random",
  }),
}));

const meta: Meta = {
  title: "UIKit/Cards/PremiseMyBookingCard",
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en">
        <Container>
          <Story />
        </Container>
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;

export const PremiseMyBookingCardTemplate: StoryObj = {
  render: () => {
    return (
      <PremiseMyBookingCard>
        <Image src={items[0].src} width={159} height={90} alt="" />
        <PremiseMyBookingCardContent href="/#" label="Go to premise page">
          <PremiseMyBookingCardTitle>Hall 1</PremiseMyBookingCardTitle>
          <PremiseMyBookingCardDescription>{faker.lorem.lines(6)}</PremiseMyBookingCardDescription>
        </PremiseMyBookingCardContent>
      </PremiseMyBookingCard>
    );
  },
};
