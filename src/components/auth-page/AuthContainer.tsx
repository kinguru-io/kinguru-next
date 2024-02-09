import authBg from "~/public/img/auth-page/auth-page-bg.jpg";

import { css } from "~/styled-system/css";
import { Center } from "~/styled-system/jsx";

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
      <Center
        position="relative"
        maxWidth="380px"
        width="full"
        layerStyle="outlinePrimaryWrapper"
      >
        {children}
      </Center>
    </Center>
  );
}
