/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionItemToggle,
  AccordionItemContent,
} from "@/components/uikit";

const meta = {
  title: "UIKit/Accordion",
} satisfies Meta;

export default meta;

const features = Array.from({ length: 3 }, (_, idx) => ({
  id: "product-" + idx,
  title: faker.commerce.product(),
  desc: faker.commerce.productDescription(),
}));

export const Basic = {
  render: () => {
    return (
      <Accordion>
        {features.map(({ id, title, desc }) => {
          return (
            <AccordionItem key={id}>
              <AccordionItemToggle textStyle="heading.3">
                {title}
              </AccordionItemToggle>
              <AccordionItemContent>{desc}</AccordionItemContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  },
};
