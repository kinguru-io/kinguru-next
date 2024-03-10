import textLogo from "~/public/img/defaultImages/eventify-logo-text.svg";
import { AspectRatio, Box } from "~/styled-system/jsx";

export function DefaultImage() {
  return (
    <AspectRatio ratio={16 / 9}>
      <Box
        display="inline"
        position="absolute"
        bgColor="neutral.4"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="50%"
        style={{ backgroundImage: `url(${textLogo.src})` }}
      />
    </AspectRatio>
  );
}
