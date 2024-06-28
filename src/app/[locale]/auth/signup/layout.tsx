import { useTranslations, type RichTranslationValues } from "next-intl";
import { ArrowIcon } from "@/components/uikit";
import { Link } from "@/navigation";
import { css, cx } from "~/styled-system/css";
import { button } from "~/styled-system/recipes";

const backToSignInLinkStyles = cx(
  button({ colorPalette: "secondary", rounded: false }),
  css({ alignSelf: "flex-start", gap: "1", padding: "3" }),
);

const helperClassName = css({
  fontSize: "xs",
  lineHeight: "1.6",
  color: "secondary",
  "& > a": {
    color: "dark",
    _hoverOrFocusVisible: { textDecoration: "underline" },
  },
});

const translationValues: RichTranslationValues = {
  partnerAgreement: (chunks) => <Link href="#">{chunks}</Link>,
  personalDataPolicy: (chunks) => <Link href="#">{chunks}</Link>,
  personalDataProcess: (chunks) => <Link href="#">{chunks}</Link>,
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("auth");

  return (
    <>
      <Link href="/auth/signin/user" className={backToSignInLinkStyles}>
        <ArrowIcon />
        {t("sign_in_heading")}
      </Link>
      {children}
      <p className={helperClassName}>
        {t.rich("signup_helper", translationValues)}
      </p>
    </>
  );
}
