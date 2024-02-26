import { useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { cx } from "~/styled-system/css";
import { SliderVariantProps, slider } from "~/styled-system/recipes";

type SliderProps = {
  children: React.ReactNode;
} & SliderVariantProps;

export function Slider({ children }: SliderProps) {
  const [cur, setCur] = useState(0);
  const classes = slider();

  const nextMoving = () => {
    if (cur >= 2 - 1) {
      setCur(0);
    } else {
      setCur(cur + 1);
    }
  };
  const prevMoving = () => {
    if (cur <= 0) {
      setCur(2 - 1);
    } else {
      setCur(cur - 1);
    }
  };

  return (
    <div className={classes.slider}>
      <div
        role="button"
        tabIndex={0}
        className={cx(classes.sliderButton, classes.prevButton)}
        onClick={prevMoving}
      >
        <GrPrevious />
      </div>
      <div
        role="button"
        tabIndex={0}
        className={cx(classes.sliderButton, classes.nextButton)}
        onClick={nextMoving}
      >
        <GrNext />
      </div>
      <div
        className={classes.sliderOptions}
        style={{ left: `-${cur * 339}px` }}
      >
        {children}
      </div>
    </div>
  );
}
