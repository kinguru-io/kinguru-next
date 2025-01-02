import { ArrowIcon } from "@/components/uikit";
import { Link } from "@/navigation";
import { css, cx } from "~/styled-system/css";
import { button } from "~/styled-system/recipes";

const backToSignInLinkStyles = cx(
  button({ colorPalette: "secondary", rounded: false }),
  css({ alignSelf: "flex-start", gap: "1", padding: "3" }),
);

export function BackToSignIn({ label }: { label: string }) {
  return (
    <Link href="/auth/signin" className={backToSignInLinkStyles}>
      <ArrowIcon />
      {label}
    </Link>
  );
}
