import authBg from "~/public/img/auth-page/auth-page-bg.jpg";

import { css } from "~/styled-system/css";
import { Center, Flex } from "~/styled-system/jsx";

export function AuthContainer({ children }: { children: React.ReactNode }) {
  return (
    <Center
      height="full"
      bgRepeat="no-repeat"
      bgPosition="center"
      bgSize="cover"
      style={{ backgroundImage: `url(${authBg.src})` }}
      pos="relative"
      className={css({ "& h1": { mb: "38px" } })}
    >
      <span
        className={css({
          pos: "absolute",
          inset: "0",
          backdropFilter: "blur(5px)",
        })}
      />
      <Flex
        flexDirection="column"
        position="relative"
        maxWidth="380px"
        width="full"
        layerStyle="outlinePrimaryWrapper"
        textAlign="center"
      >
        {children}
      </Flex>
    </Center>
  );
}
