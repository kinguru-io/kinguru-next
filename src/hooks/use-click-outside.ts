import { type RefObject, useCallback, useEffect } from "react";

/**
 * @link source: https://github.com/Keized/react-hooks-hub/blob/main/packages/use-click-outside/src/index.ts
 */
export function useClickOutside(
  refs: Array<RefObject<HTMLElement>>,
  callback: (isOutside: boolean) => unknown,
): void {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const isOutside = refs.every((ref) => {
        return ref.current && !ref.current.contains(event.target as Node);
      });

      callback(isOutside);
    },
    [refs, callback],
  );

  useEffect(() => {
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [handleClickOutside]);
}
