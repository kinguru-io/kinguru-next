"use client";

import Image from "next/image";
import { Slider, SliderItem } from "@/components/uikit";
import { useSliderContext } from "@/components/uikit/Slider/slider-context";
import { css } from "~/styled-system/css";
import { AspectRatio } from "~/styled-system/jsx";

export function PreviewTrack({
  items,
}: {
  items: Array<{ id: string | number; url: string }>;
}) {
  const { activePageIndex, goTo } = useSliderContext();

  return (
    <Slider
      slidesCount={items.length}
      buttonPosition="hidden"
      trackClassName={css({ gap: "2" })}
    >
      {items.map((item, idx) => (
        <SliderItem
          key={item.id}
          buttonPosition="hidden"
          className={css({
            flexGrow: "1",
            flexBasis: "28",
            width: "unset",
            borderRadius: "md",
            overflow: "hidden",
          })}
        >
          <AspectRatio
            role="button"
            ratio={16 / 9}
            onClick={() => goTo(idx)}
            css={{
              cursor: "pointer",
              opacity: "0.4",
              _selected: { opacity: "1" },
              bgImage: "{gradients.darken-to-bottom-lighter}",
            }}
            aria-selected={idx === activePageIndex}
            aria-label={`Show image at position ${idx + 1}`}
          >
            <Image src={item.url} fill alt="" priority={false} sizes="128px" />
          </AspectRatio>
        </SliderItem>
      ))}
    </Slider>
  );
}
