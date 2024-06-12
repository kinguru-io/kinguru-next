"use client";

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { css, cx } from "~/styled-system/css";
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

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export function Dropdown({
  children,
  size = "sm",
  anchor,
  hiddenState = true,
}: DropdownProps) {
  const [hidden, setHidden] = useState(hiddenState);
  const dropdownSlot = dropdown({ size, anchor });

  const ref = useOutsideClick(() => {
    if (hidden) return;
    setHidden(!hidden);
  });

  return (
    <DropdownContext.Provider value={{ hidden, setHidden, dropdownSlot }}>
      <div className={dropdownSlot.dropdown} ref={ref}>
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
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { hidden, dropdownSlot, setHidden } = useContext(DropdownContext);

  useClickOutside([menuRef], (isOutside) => !hidden && setHidden(isOutside));

  return (
    <div
      ref={menuRef}
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
