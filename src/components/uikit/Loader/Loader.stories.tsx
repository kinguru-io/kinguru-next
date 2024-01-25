import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "./Loader";
import { Button } from "../Button";
import { css } from "~/styled-system/css";

const meta = {
  title: "UIKit/Loader",
  component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Loader inside wrapper",
  render: (args) => {
    const { isLoading } = args;
    return (
      <div
        className={css({
          minH: "30vh",
          resize: "both",
          border: "1px solid",
          borderColor: "neutral.400",
          borderRadius: "md",
          overflow: "hidden",
          position: "relative",
          p: "2",
        })}
      >
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel mollitia
          magni accusamus aspernatur consequatur vero.
        </p>
        <Loader isLoading={isLoading} />
      </div>
    );
  },
  argTypes: {
    isLoading: {
      control: "boolean",
    },
  },
};

export const InsideButton: Story = {
  name: "Loader inside button",
  render: ({ isLoading = true }) => {
    return (
      <Button icon={<Loader isLoading={isLoading} />} disabled={isLoading}>
        Сохранить
      </Button>
    );
  },
  argTypes: {
    isLoading: {
      control: "boolean",
    },
  },
};
