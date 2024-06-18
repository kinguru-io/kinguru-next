"use client";

import { useSnapCarousel } from "react-snap-carousel";
import { Icon } from "@/components/common";
import { css, cx } from "~/styled-system/css";
import { SliderVariantProps, slider } from "~/styled-system/recipes";

type SliderProps = {
  slidesCount: number;
  children: React.ReactNode;
} & SliderVariantProps;

type SliderItemProps = {
  children: React.ReactNode;
} & SliderVariantProps;

export function Slider({ slidesCount, children, buttonPosition }: SliderProps) {
  const { scrollRef, prev, next, activePageIndex, goTo } = useSnapCarousel();

  const nextSlide = () => {
    if (slidesCount > activePageIndex + 1) {
      next();
    } else {
      goTo(0);
    }
  };

  const prevSlide = () => {
    if (activePageIndex > 0) {
      prev();
    } else {
      goTo(slidesCount - 1);
    }
  };

  const classes = slider({ buttonPosition });

  return (
    <div className={classes.slider}>
      <ul className={classes.sliderOptions} ref={scrollRef}>
        {children}
      </ul>
      {slidesCount > 1 && (
        <div className={classes.buttonGroup}>
          <button
            type="button"
            className={cx(classes.sliderButton, classes.prevButton)}
            onClick={prevSlide}
          >
            <Icon name="action/arrow" />
          </button>
          <button
            type="button"
            className={cx(classes.sliderButton, classes.nextButton)}
            onClick={nextSlide}
          >
            <Icon name="action/arrow" className={css({ rotate: "180deg" })} />
          </button>
        </div>
      )}
    </div>
  );
}

export function SliderItem({ children, buttonPosition }: SliderItemProps) {
  const classes = slider({ buttonPosition });

  return <li className={classes.item}>{children}</li>;
}
