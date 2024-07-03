import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "@/components/uikit";

const meta = {
  title: "UIKit/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["solid", "outline"],
      control: "radio",
    },
    colorPalette: {
      options: ["success", "danger", "primary", "secondary"],
      control: "radio",
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TagPrimary: Story = {
  args: {
    children: "example",
  },
};

// export const CancelBookingBtn = {
//   render: (isActual: boolean) => {
//     return (
//       <button
//         type="button"
//         className={cx(
//           tagStyles({ variant: isActual ? "solid" : "outline" }),
//           css({
//             padding: "4",
//             _selected: { colorPalette: "dark" },
//             _hover: { colorPalette: "secondary" },
//           }),
//         )}
//         aria-selected={isActual}
//         disabled={!isActual}
//       >
//         Cancel booking
//       </button>
//     );
//   },
// };
