/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { lightFormat } from "date-fns";
import { useState } from "react";
import { getTimeSlotCondition, timeSlotCondition } from "./TimeSlot";
import { TimeSlot } from "@/components/uikit";
import { Grid } from "~/styled-system/jsx";

const meta = {
  title: "UIKit/Calendar/TimeSlot",
  component: TimeSlot,
  parameters: {
    layout: "centered",
  },
  args: {
    onClick: fn(),
    condition: "regular",
    selected: false,
  },
  argTypes: {
    condition: {
      options: Object.keys(timeSlotCondition),
      control: "radio",
    },
  },
} satisfies Meta<typeof TimeSlot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSlot: Story = {
  args: {
    price: +faker.finance.amount(),
    time: faker.date.anytime(),
  },
};

const mockSlots = Array.from({ length: 5 }, (_, idx) => ({
  id: idx,
  price: +faker.finance.amount({ min: 0, max: 100 }),
  time: faker.date.anytime(),
}));

const maxPrice = Math.max(...mockSlots.map(({ price }) => price));
const minPrice = Math.min(...mockSlots.map(({ price }) => price));

export const Controlled = {
  render: () => {
    const [selectedSlots, setSelectedSlot] = useState<number[]>([]);

    const toggleSlot = (clickedId: number) => {
      setSelectedSlot((prevSlotsState) => {
        if (prevSlotsState.includes(clickedId)) {
          return prevSlotsState.filter((id) => id !== clickedId);
        }

        return prevSlotsState.concat(clickedId);
      });
    };

    return (
      <Grid gridTemplateColumns="auto 100px">
        <Grid gridAutoFlow="row">
          {mockSlots.map((slot) => (
            <TimeSlot
              key={slot.id}
              {...slot}
              onClick={() => toggleSlot(slot.id)}
              condition={getTimeSlotCondition({
                price: slot.price,
                minPrice,
                maxPrice,
              })}
              selected={selectedSlots.includes(slot.id)}
            />
          ))}
        </Grid>
        <div>
          {selectedSlots.length > 0 &&
            selectedSlots.map((selectedId) => (
              <p>
                {lightFormat(
                  mockSlots.find(({ id }) => id === selectedId)!.time,
                  "H:mm",
                )}
              </p>
            ))}
        </div>
      </Grid>
    );
  },
};
