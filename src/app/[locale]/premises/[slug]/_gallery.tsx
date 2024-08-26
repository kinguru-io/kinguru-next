import type { PremiseResource } from "@prisma/client";
import Image from "next/image";
import { Video } from "@/components/common";
import { PreviewTrack, Slider, SliderItem } from "@/components/uikit";
import { videoRegex } from "@/lib/shared/utils/regex";
import { AspectRatio, Box, Stack } from "~/styled-system/jsx";

export function PremiseGallery({
  resources,
}: {
  resources: PremiseResource[];
}) {
  return (
    <Stack gap="2">
      <Slider
        slidesCount={resources.length}
        buttonPosition="center"
        previewTrack={
          <Box css={{ paddingInline: { base: "2", md: "0" } }}>
            <PreviewTrack items={resources} />
          </Box>
        }
      >
        {resources.map((resource, idx) => (
          <SliderItem key={resource.id}>
            <AspectRatio
              ratio={1.5}
              md={{
                borderRadius: "md",
                overflow: "hidden",
                bgImage: "{gradients.darken-to-bottom-lighter}",
              }}
            >
              {videoRegex.test(resource.url) ? (
                <Video src={resource.url} />
              ) : (
                <Image
                  src={resource.url}
                  fill
                  alt=""
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </AspectRatio>
          </SliderItem>
        ))}
      </Slider>
    </Stack>
  );
}
