import textLogo from "~/public/img/defaultImages/eventify-logo-text.svg";
import { Box } from "~/styled-system/jsx";

export function DefaultImage() {
  return (
    <Box
      display="inline"
      position="absolute"
      bgColor="neutral.4"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="50%"
      style={{ backgroundImage: `url(${textLogo.src})` }}
    />
  );
}
