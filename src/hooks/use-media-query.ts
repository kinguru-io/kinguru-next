import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
  const subscribeMediaQuery = useCallback(
    (onChange: () => void) => subscribe(onChange, query),
    [query],
  );

  const matches = useSyncExternalStore(
    subscribeMediaQuery,
    () => getSnapshot(query),
    getServerSnapshot,
  );

  return matches;
}

function getSnapshot(query: string) {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return null;
}

function subscribe(onChange: () => void, query: string) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);

  return () => {
    mql.removeEventListener("change", onChange);
  };
}
