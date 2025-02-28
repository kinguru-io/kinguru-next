/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { PremiseTags } from "./PremiseCard";
import {
  Slider,
  SliderItem,
  PremiseCard,
  PremiseDescription,
  PremiseSlider,
  PremiseTitle,
  Tag,
  PremiseContent,
} from "@/components/uikit";
import { priceFormatter } from "@/lib/utils";
import { css } from "~/styled-system/css";
import { AspectRatio, Container, Grid } from "~/styled-system/jsx";
import { linkOverlay } from "~/styled-system/patterns";

const items = Array.from({ length: 3 }).map((_, i) => ({
  id: i,
  src: faker.image.urlLoremFlickr({
    width: 720,
    height: 405,
    category: "random",
  }),
}));

const meta: Meta = {
  title: "UIKit/Cards/PremiseCard",
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en">
        <Container>
          <Grid gap="6" gridTemplateColumns={{ base: "1", sm: "2" }}>
            <Story />
          </Grid>
        </Container>
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;

export const PremiseCardTemplate: StoryObj = {
  render: () => {
    return (
      <PremiseCard>
        <PremiseTags>
          <Tag variant="solid" colorPalette="success">
            {faker.number.int({ min: 1, max: 100 })} m²
          </Tag>
          <Tag variant="solid" colorPalette="primary">
            from {priceFormatter.format(+faker.finance.amount())}
          </Tag>
        </PremiseTags>
        <PremiseContent href="/#" label="Go to premise page">
          <PremiseTitle>Hall 1</PremiseTitle>
          <PremiseDescription>{faker.lorem.lines(6)}</PremiseDescription>
        </PremiseContent>
        <PremiseSlider>
          <Slider slidesCount={items.length}>
            {items.map((item) => (
              <SliderItem key={item.id}>
                <AspectRatio ratio={16 / 9}>
                  <Image src={item.src} fill alt="Premise Card" />
                  <Link href="#" className={linkOverlay()}>
                    <span className={css({ srOnly: true })}>
                      Go to premise page
                    </span>
                  </Link>
                </AspectRatio>
              </SliderItem>
            ))}
          </Slider>
        </PremiseSlider>
      </PremiseCard>
    );
  },
};
