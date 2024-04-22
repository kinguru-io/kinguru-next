/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta } from "@storybook/react";
import { AccordionGroup } from "./AccordionGroup";
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
  content: faker.commerce.productDescription(),
}));

export const Basic = {
  render: () => {
    return (
      <Accordion>
        {features.map(({ id, title, content }) => {
          return (
            <AccordionItem key={id}>
              <AccordionItemToggle textStyle="heading.3">
                {title}
              </AccordionItemToggle>
              <AccordionItemContent>{content}</AccordionItemContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  },
};

export const ControlledGroup = {
  render: () => <AccordionGroup items={features} btnLabel="Next" />,
};
