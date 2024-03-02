import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { Avatar } from "@/components/uikit";
import { Card, CardBody } from "@/components/uikit/Card";
import {
  SmallCard,
  SmallCardAvatar,
  SmallCardContent,
} from "@/components/uikit/SmallCard/SmallCard";
import logo from "~/public/img/9.svg";
import { css } from "~/styled-system/css";
import { Box, Flex } from "~/styled-system/jsx";

export default function Uikit() {
  return (
    <Box p="5">
      <ProfileImagePicker name="profile_image" />
      <Flex gap="5px">
        <Box w="300px">
          <SmallCard rating={4.4}>
            <SmallCardAvatar src={logo.src} name="alex" />
            <SmallCardContent
              title="Alexander Bachinskiy"
              description="fullstack junior"
            />
          </SmallCard>
        </Box>
        <Box w="300px">
          <Card variant="speaker">
            <CardBody>
              <Flex gap="5px">
                <Avatar image={logo.src} name="alex" />
                <Flex direction="column" gap="3px">
                  <h4>Alexander</h4>
                  <div className={css({ textStyle: "body.3" })}>Developer</div>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </Box>
        <Box w="300px">
          <Card variant="marker">
            <CardBody>
              <Flex gap="5px">
                <Avatar image={logo.src} name="alex" />
                <Flex direction="column" gap="3px">
                  <h4>Bank</h4>
                  <div className={css({ textStyle: "body.3" })}>
                    пр. независимости 92
                  </div>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
}
