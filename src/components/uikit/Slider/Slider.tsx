"use client";

import { GrPrevious, GrNext } from "react-icons/gr";
import { useSnapCarousel } from "react-snap-carousel";
import { cx } from "~/styled-system/css";
import { slider } from "~/styled-system/recipes";

type SliderProps = {
  slidesCount: number;
  children: React.ReactNode;
};

type SliderItemProps = {
  children: React.ReactNode;
};

export function Slider({ slidesCount, children }: SliderProps) {
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

  const classes = slider();

  return (
    <div className={classes.slider}>
      <ul className={classes.sliderOptions} ref={scrollRef}>
        {children}
      </ul>
      <button
        type="button"
        className={cx(classes.sliderButton, classes.prevButton)}
        onClick={prevSlide}
      >
        <GrPrevious />
      </button>
      <button
        type="button"
        className={cx(classes.sliderButton, classes.nextButton)}
        onClick={nextSlide}
      >
        <GrNext />
      </button>
    </div>
  );
}

export function SliderItem({ children }: SliderItemProps) {
  const classes = slider();

  return <li className={classes.item}>{children}</li>;
}
