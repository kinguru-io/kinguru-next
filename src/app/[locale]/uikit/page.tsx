import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import {
  SmallCard,
  SmallCardAvatar,
  SmallCardContent,
} from "@/components/uikit/SmallCard/SmallCard";
import logo from "~/public/img/9.svg";
import { Box, Flex } from "~/styled-system/jsx";

export default function Uikit() {
  return (
    <Box p="5" bg="blue">
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
          <SmallCard variant="marker">
            <SmallCardAvatar src={logo.src} name="alex" />
            <SmallCardContent
              title="Stander bank"
              description="пр. независимости 115"
            />
          </SmallCard>
        </Box>
      </Flex>
    </Box>
  );
}
