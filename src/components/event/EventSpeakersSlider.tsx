import { Avatar, Card, CardBody, Slider, SliderItem, Tag } from "../uikit";
import { css } from "~/styled-system/css";
import { Box, Flex, Float } from "~/styled-system/jsx";

type EventSpeakersSliderProps = {
  speakers: {
    speaker: {
      user: {
        name: string | null;
        image: string | null;
        position: string | null;
      };
      comments: {
        rating: number;
      }[];
    };
  }[];
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
          }) => {
            const ratingSum = comments.reduce((acc, item) => {
              return acc + item.rating;
            }, 0);
            const rating = ratingSum / comments.length;
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
