// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, StoryObj } from "@storybook/react";
import { Modal, ModalInitiator, ModalWindow } from "./Modal";
import { Button } from "../Button";

const meta = {
  title: "UIKit/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultModal: Story = {
  args: {
    children: null,
  },
  render: () => {
    return (
      <Modal>
        <ModalInitiator>
          <Button> Open Modal</Button>
        </ModalInitiator>
        <ModalWindow>
          <h1>Header</h1>
        </ModalWindow>
      </Modal>
    );
  },
};
