import { GrPrevious, GrNext } from "react-icons/gr";
import { useSnapCarousel } from "react-snap-carousel";
import { cx } from "~/styled-system/css";
import { slider } from "~/styled-system/recipes";

type SliderProps<T> = {
  readonly items: T[];
  readonly renderItem: (
    props: SliderRenderItemProps<T>,
  ) => React.ReactElement<SliderItemProps>;
};

type SliderRenderItemProps<T> = {
  readonly item: T;
  readonly isSnapPoint: boolean;
};

type SliderItemProps = {
  readonly isSnapPoint: boolean;
  readonly children?: React.ReactNode;
};

export function Slider<T extends any>({ items, renderItem }: SliderProps<T>) {
  const { scrollRef, prev, next, snapPointIndexes, activePageIndex, goTo } =
    useSnapCarousel();
  const classes = slider();

  const nextSlide = () => {
    if (items.length > activePageIndex + 1) {
      next();
    } else {
      goTo(0);
    }
  };

  const prevSlide = () => {
    if (activePageIndex > 0) {
      prev();
    } else {
      goTo(items.length - 1);
    }
  };

  return (
    <div className={classes.slider}>
      <ul className={classes.sliderOptions} ref={scrollRef}>
        {items.map((item, i) =>
          renderItem({ item, isSnapPoint: snapPointIndexes.has(i) }),
        )}
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

export function SliderItem({ children, isSnapPoint }: SliderItemProps) {
  const classes = slider();

  return (
    <li className={classes.item} data-snap-point={isSnapPoint}>
      {children}
    </li>
  );
}
