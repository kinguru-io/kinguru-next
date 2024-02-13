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
        className={css({
          "& h1": { mb: "30px", fontSize: "20px" }, // fontSize is temporary since no tokens in design
          "& button[type=submit]": { mt: "30px" },
          "& p": { mt: "20px" },
        })}
      >
        {children}
      </Flex>
    </Center>
  );
}
