import { createContext, useContext } from "react";

type SliderContextValues = {
  goTo: (page: number) => void;
  activePageIndex: number;
};

const SliderContext = createContext<SliderContextValues | null>(null);

export function useSliderContext() {
  const context = useContext(SliderContext);

  if (!context) {
    throw new Error(
      "useSliderContext must be used within a <SliderProvider />",
    );
  }

  return context;
}

export function SliderProvider({
  children,
  ...values
}: { children: React.ReactNode } & SliderContextValues) {
  return (
    <SliderContext.Provider value={values}>{children}</SliderContext.Provider>
  );
}
