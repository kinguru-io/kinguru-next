/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import {
  PremiseCard,
  PremiseContent,
  PremiseDescription,
  PremisePrice,
  PremiseSlider,
  PremiseTextContent,
  PremiseTitle,
  PremiseTitleSize,
  PremiseTitleWrapper,
} from "./PremiseCard";
import { Button } from "../Button";
import { Slider, SliderItem } from "../Slider/Slider";
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
                  (20 m<sup>2</sup>)
                </PremiseTitleSize>
              </PremiseTitleWrapper>
              <PremiseDescription>{faker.lorem.lines(4)}</PremiseDescription>
            </PremiseTextContent>
            <Button size="md">More</Button>
          </PremiseContent>
          <PremiseSlider>
            <Slider
              items={items}
              renderItem={({ item, isSnapPoint }) => (
                <SliderItem key={item.id} isSnapPoint={isSnapPoint}>
                  <AspectRatio ratio={16 / 9}>
                    <Image src={item.src} fill alt="" />
                  </AspectRatio>
                </SliderItem>
              )}
            ></Slider>
            <PremisePrice>200$</PremisePrice>
          </PremiseSlider>
        </PremiseCard>
      </Container>
    );
  },
};
