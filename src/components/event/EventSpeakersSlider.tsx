import { Avatar, Card, CardBody, Slider, SliderItem, Tag } from "../uikit";
import { assertFulfilled } from "@/utils/settledPromiseProfile";
import { css } from "~/styled-system/css";
import { Box, Flex, Float } from "~/styled-system/jsx";

type EventSpeakersSliderProps = {
  speakers: {
    speaker: {
      id: string;
      user: {
        name: string | null;
        image: string | null;
        position: string | null;
      };
    };
  }[];
};

export async function EventSpeakersSlider({
  speakers,
}: EventSpeakersSliderProps) {
  const speakersWithRatingResult = await Promise.allSettled(
    speakers.map(({ speaker }) =>
      prisma.speakerComment
        .aggregate({
          where: { speakerId: speaker.id },
          _avg: { rating: true },
        })
        .then(({ _avg: { rating } }) => ({ rating })),
    ),
  );
  const profiledSpeakersWithRating =
    speakersWithRatingResult.filter(assertFulfilled);

  return (
    <Box w="740px" h="67px">
      <Slider buttonPosition="outer" slidesCount={speakers.length}>
        {speakers.map(
          (
            {
              speaker: {
                user: { image, name, position },
              },
            },
            i,
          ) => {
            return (
              <SliderItem key={name} buttonPosition="outer">
                <Box w="270px" color="neutral.1" key={name}>
                  <Card variant="speaker">
                    <CardBody>
                      <Float
                        zIndex="1"
                        placement="top-start"
                        offsetY="6px"
                        offsetX="30px"
                        translate="none"
                      >
                        <Tag>
                          {(
                            profiledSpeakersWithRating[i].value.rating || 0
                          ).toFixed(1)}
                        </Tag>
                      </Float>
                      <Flex gap="10px" p="7px 10px">
                        <Avatar image={image} name={name} />
                        <Flex direction="column" gap="3px">
                          <h4>{name}</h4>
                          <div className={css({ textStyle: "body.3" })}>
                            {position}
                          </div>
                        </Flex>
                      </Flex>
                    </CardBody>
                  </Card>
                </Box>
              </SliderItem>
            );
          },
        )}
      </Slider>
    </Box>
  );
}
