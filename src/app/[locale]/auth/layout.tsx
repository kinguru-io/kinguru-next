import { getSession } from "@/auth";
import { redirect } from "@/navigation";
import bg from "~/public/img/auth-page/auth-bg.jpg";
import { Stack } from "~/styled-system/jsx";
import { token } from "~/styled-system/tokens";

const overlayAuthImage: React.CSSProperties = {
  backgroundImage: `
    ${token.var("gradients.dark-overlay-lighter")},
    ${token.var("gradients.darken-to-bottom-lighter")},
    url(${bg.src})
  `,
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <Stack
      gap="0"
      height="full"
      sm={{
        justifyContent: "center",
        alignItems: "center",
        bgSize: "cover",
        bgPosition: "center",
        paddingBlock: "4",
      }}
      style={overlayAuthImage}
    >
      <Stack
        css={{
          gap: "4",
          paddingBlock: "6",
          paddingInline: "4",
          bgColor: "light",
          flexBasis: "full",
          fontSize: "sm",
          "& h1": { fontSize: "xl", fontWeight: "bold", lineHeight: "1.1" },
          sm: {
            borderRadius: "sm",
            paddingBlock: "8",
            paddingInline: "10",
            width: "full",
            maxWidth: "32.5rem",
            minHeight: "26rem",
            flexBasis: "unset",
            "& h1": { fontSize: "2xl" },
          },
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
}
