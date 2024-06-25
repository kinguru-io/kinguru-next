import type { Meta, StoryObj } from "@storybook/react";
import {
  Modal,
  ModalInitiator,
  Button,
  Filter,
  FilterGroup,
  Checkbox,
  Input,
} from "@/components/uikit";
// using renaming to obtain the original since ModalWindow is being exported as next.js dynamic()
import { _ModalWindow as ModalWindow } from "@/components/uikit/Modal/ModalWindow";

const meta: Meta<typeof Modal> = {
  title: "UIKit/Modal",
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultModal: Story = {
  render: () => {
    return (
      <Modal>
        <ModalInitiator>
          <Button>All filters</Button>
        </ModalInitiator>
        <ModalWindow>
          <Filter heading="All filters">
            <FilterGroup heading="Country">
              <Checkbox label="Poland" />
            </FilterGroup>
            <FilterGroup heading="Price">
              <Input placeholder="42 zl" />
            </FilterGroup>
          </Filter>
        </ModalWindow>
      </Modal>
    );
  },
};
