"use client";

import { useSnapCarousel } from "react-snap-carousel";
import { SliderProvider } from "./slider-context";
import { ArrowIcon } from "@/components/uikit";
import { cx } from "~/styled-system/css";
import { SliderVariantProps, slider } from "~/styled-system/recipes";

type SliderProps = {
  slidesCount: number;
  children: React.ReactNode;
  previewTrack?: React.ReactNode;
  trackClassName?: string;
} & SliderVariantProps;

type SliderItemProps = {
  children: React.ReactNode;
  className?: string;
} & SliderVariantProps;

export function Slider({
  slidesCount,
  children,
  previewTrack,
  buttonPosition,
  trackClassName,
}: SliderProps) {
  const { scrollRef, prev, next, activePageIndex, goTo, pages } =
    useSnapCarousel();

  const nextSlide = () => {
    if (pages[activePageIndex].includes(slidesCount - 1)) {
      goTo(0);
    } else {
      next();
    }
  };

  const prevSlide = () => {
    if (activePageIndex === 0) {
      goTo(pages.length - 1);
    } else {
      prev();
    }
  };

  const classes = slider({ buttonPosition });

  return (
    <>
      <div className={classes.slider}>
        <ul
          className={cx(classes.sliderOptions, trackClassName)}
          ref={scrollRef}
        >
          {children}
        </ul>
        {slidesCount > 1 && (
          <>
            <button
              type="button"
              className={cx(classes.sliderButton, classes.prevButton)}
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ArrowIcon />
            </button>
            <button
              type="button"
              className={cx(classes.sliderButton, classes.nextButton)}
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ArrowIcon direction="right" />
            </button>
          </>
        )}
      </div>
      {previewTrack && (
        <SliderProvider goTo={goTo} activePageIndex={activePageIndex}>
          {previewTrack}
        </SliderProvider>
      )}
    </>
  );
}

export function SliderItem({
  children,
  buttonPosition,
  className,
}: SliderItemProps) {
  const classes = slider({ buttonPosition });

  return <li className={cx(classes.item, className)}>{children}</li>;
}
