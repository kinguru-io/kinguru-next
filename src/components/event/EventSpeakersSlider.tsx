import { Prisma } from "@prisma/client";
import { Avatar, Card, CardBody, Slider, SliderItem, Tag } from "../uikit";
import { css } from "~/styled-system/css";
import { Box, Flex, Float } from "~/styled-system/jsx";

type EventSpeakersSliderProps = {
  speakers: Prisma.SpeakersOnEventMaxAggregateOutputType[];
};

export function EventSpeakersSlider({ speakers }: EventSpeakersSliderProps) {
  return (
    <Box w="740px" h="67px">
      <Slider buttonPosition="outer" slidesCount={speakers.length}>
        {speakers.map(
          ({
            speaker: {
              user: { image, name, position },
              comments,
            },
          }: any) => {
            const rating = comments.reduce(
              (
                acc: number,
                item: Prisma.SpeakerCommentMaxAggregateOutputType,
                index: number,
              ) => {
                if (index === comments.length - 1) {
                  return (acc / comments.length).toFixed(1);
                }
                if (item.rating !== null) return acc + item.rating;
                return acc;
              },
              0,
            );
            return (
              <SliderItem key={name} buttonPosition="outer">
                <Box w="270px" color="neutral.1" key={name}>
                  <Card variant="speaker">
                    <CardBody>
                      <Float
                        zIndex="1"
                        placement="top-start"
                        offsetY="6px"
                        offsetX="34px"
                        translate="none"
                      >
                        <Tag>{rating}</Tag>
                      </Float>
                      <Flex gap="5px" p="7px 10px">
                        <Avatar
                          image={image || ""}
                          name={name || "speakerName"}
                        />
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
