/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import {
  Slider,
  SliderItem,
  PremiseCard,
  Button,
  PremiseContent,
  PremiseDescription,
  PremisePrice,
  PremiseSlider,
  PremiseTextContent,
  PremiseTitle,
  PremiseTitleSize,
  PremiseTitleWrapper,
} from "@/components/uikit";
import { AspectRatio, Container } from "~/styled-system/jsx";

const items = Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  src: faker.image.urlLoremFlickr(),
}));

const meta = {
  title: "UIKit/Cards/PremiseCard",
  component: PremiseCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PremiseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPremiseCard: Story = {
  args: { children: null },
  render: () => {
    return (
      <Container>
        <PremiseCard>
          <PremiseContent>
            <PremiseTextContent>
              <PremiseTitleWrapper>
                <PremiseTitle>Hall 1</PremiseTitle>
                <PremiseTitleSize>
                  ({faker.number.float({ min: 10, max: 20, fractionDigits: 2 })}
                  m<sup>2</sup>)
                </PremiseTitleSize>
              </PremiseTitleWrapper>
              <PremiseDescription>{faker.lorem.lines(4)}</PremiseDescription>
            </PremiseTextContent>
            <Button size="md">More</Button>
          </PremiseContent>
          <PremiseSlider>
            <Slider slidesCount={items.length}>
              {items.map((item) => (
                <SliderItem key={item.id}>
                  <AspectRatio ratio={16 / 9}>
                    <Image src={item.src} fill alt="" />
                  </AspectRatio>
                </SliderItem>
              ))}
            </Slider>
            <PremisePrice>{faker.finance.amount()}$</PremisePrice>
          </PremiseSlider>
        </PremiseCard>
      </Container>
    );
  },
};
