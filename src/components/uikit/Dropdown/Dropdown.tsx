"use client";

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { css, cx } from "~/styled-system/css";
import { customDivider } from "~/styled-system/patterns";
import { dropdown, type DropdownVariantProps } from "~/styled-system/recipes";

type DropdownProps = DropdownVariantProps & {
  className?: string;
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
  className,
  children,
  size = "sm",
  anchor,
  hiddenState = true,
}: DropdownProps) {
  const [hidden, setHidden] = useState(hiddenState);
  const dropdownSlot = dropdown({ size, anchor });
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const outsideClicked = useCallback(
    (isOutside: boolean) => isOutside && setHidden(isOutside),
    [],
  );

  useClickOutside([dropdownRef], outsideClicked);

  return (
    <DropdownContext.Provider value={{ hidden, setHidden, dropdownSlot }}>
      <div className={cx(dropdownSlot.dropdown, className)} ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenu({
  children,
  shouldCloseOnClick = true,
  likeList = true,
}: {
  children: React.ReactNode;
  shouldCloseOnClick?: boolean;
  likeList?: boolean;
}) {
  const { hidden, dropdownSlot, setHidden } = useContext(DropdownContext);

  return (
    <div
      className={cx(
        dropdownSlot.menu,
        likeList && customDivider({ thickness: "1px" }),
      )}
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
      className={css({ cursor: "pointer" })}
      role="button"
      tabIndex={0}
      onClick={() => setHidden((prevState) => !prevState)}
      style={{ cursor: "pointer" }}
    >
      {children}
    </div>
  );
}
