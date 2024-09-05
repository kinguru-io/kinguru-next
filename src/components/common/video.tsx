"use client";

import { useTranslations } from "next-intl";
import {
  type ComponentProps,
  type MutableRefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import { Icon } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Box } from "~/styled-system/jsx";

type VideoProps = ComponentProps<"video"> & {
  stateControlOnly?: boolean;
};

export function Video({ src, stateControlOnly, ...props }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const t = useTranslations("form.common");

  const videoElement = (
    <video
      ref={videoRef}
      className={css({ inset: 0 })}
      muted
      playsInline
      loop
      {...props}
      controls={!stateControlOnly}
    >
      <source src={`${src}#t=0.1`} />
      {t("video_not_supported")}
    </video>
  );

  if (!stateControlOnly) {
    return videoElement;
  }

  return (
    <Box css={{ position: "absolute" }}>
      {videoElement}
      {stateControlOnly && <PlayStateVideoButton videoRef={videoRef} />}
    </Box>
  );
}

function PlayStateVideoButton({
  videoRef,
}: {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
}) {
  const t = useTranslations("form.common");
  const [isPlaying, setIsPlaying] = useState(false);

  const playButtonClicked = useCallback(() => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      void videoRef.current.play().then(() => setIsPlaying(true));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [videoRef, setIsPlaying]);

  return (
    <button
      type="button"
      className={css({
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
      })}
      onClick={playButtonClicked}
    >
      <Icon
        name="common/play-icon"
        className={css({
          fontSize: "3xl",
          borderRadius: "full",
          padding: "4",
          color: "secondary",
          bgColor: "light/80",
          transition: "opacity",
          _active: { opacity: "0" },
        })}
        data-active={isPlaying || undefined}
      />
      <span className={css({ srOnly: true })}>
        {t("change_video_play_state")}
      </span>
    </button>
  );
}
