import { Avatar, Card, CardBody, Slider, SliderItem } from "../uikit";
import { css } from "~/styled-system/css";
import { Box, Flex } from "~/styled-system/jsx";

type EventSpeakersSliderProps = {
  speakers: any;
};

export function EventSpeakersSlider({ speakers }: EventSpeakersSliderProps) {
  return (
    <Box w="740px" h="67px">
      <Slider buttonPosition="outer" slidesCount={speakers.length}>
        {speakers.map(
          ({
            speaker: {
              user: { image, name, position },
            },
          }: any) => (
            <SliderItem key={name} buttonPosition="outer">
              <Box w="270px" color="neutral.1" key={name}>
                <Card variant="speaker">
                  <CardBody>
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
          ),
        )}
      </Slider>
    </Box>
  );
}
