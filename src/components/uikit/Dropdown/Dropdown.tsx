"use client";

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { cx } from "~/styled-system/css";
import { customDivider } from "~/styled-system/patterns";
import { dropdown, type DropdownVariantProps } from "~/styled-system/recipes";

type DropdownProps = DropdownVariantProps & {
  children: React.ReactNode;
  hiddenState?: boolean;
};

const DropdownContext = createContext<{
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
  dropdownSlot: ReturnType<typeof dropdown>;
}>({
  hidden: true,
  setHidden: () => {},
  dropdownSlot: dropdown(),
});

export function useDropdown() {
  return useContext(DropdownContext);
}

export function Dropdown({
  children,
  size = "sm",
  hiddenState = true,
}: DropdownProps) {
  const [hidden, setHidden] = useState(hiddenState);
  const dropdownSlot = dropdown({ size });

  return (
    <DropdownContext.Provider value={{ hidden, setHidden, dropdownSlot }}>
      <div className={dropdownSlot.dropdown}>{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenu({
  children,
  shouldCloseOnClick = true,
}: DropdownProps & { shouldCloseOnClick?: boolean }) {
  const { hidden, dropdownSlot, setHidden } = useContext(DropdownContext);

  return (
    <div
      className={cx(dropdownSlot.menu, customDivider({}))}
      data-hidden={hidden}
      onClickCapture={() => setHidden(shouldCloseOnClick)}
    >
      {children}
    </div>
  );
}

export function DropdownInitiator({ children }: DropdownProps) {
  const { setHidden } = useContext(DropdownContext);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setHidden((prevState) => !prevState)}
    >
      {children}
    </div>
  );
}
