import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { Box } from "~/styled-system/jsx";

export default function Uikit() {
  return (
    <Box p="5">
      <ProfileImagePicker name="profile_image" />
    </Box>
  );
}
