"use client";

import Image from "next/image";
import { Icon, Slider, SliderItem } from "@/components/uikit";
import { useSliderContext } from "@/components/uikit/Slider/slider-context";
import { videoRegex } from "@/lib/shared/utils/regex";
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
            aria-label={`Show item at position ${idx + 1}`}
          >
            {videoRegex.test(item.url) ? (
              <Icon
                name="common/play-icon"
                className={css({
                  height: "8!",
                  width: "8!",
                  margin: "auto",
                  color: "secondary",
                })}
              />
            ) : (
              <Image
                src={item.url}
                fill
                alt=""
                priority={false}
                sizes="128px"
              />
            )}
          </AspectRatio>
        </SliderItem>
      ))}
    </Slider>
  );
}
