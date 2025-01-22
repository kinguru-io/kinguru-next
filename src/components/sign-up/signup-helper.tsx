import { useTranslations, type RichTranslationValues } from "next-intl";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";

export const helperClassName = css({
  fontSize: "xs",
  lineHeight: "1.6",
  color: "secondary",
  maxWidth: "breakpoint-md",
  "&[data-dark-background]": {
    color: "light",
  },
  "& > a, button": {
    color: "dark",
    _hoverOrFocusVisible: { textDecoration: "underline" },
    _disabled: { color: "secondary", textDecoration: "underline" },
  },
  "&[data-dark-background] > a, button": {
    color: "primary",
    _hoverOrFocusVisible: { textDecoration: "underline" },
    _disabled: { color: "secondary", textDecoration: "underline" },
  },
});

const translationValues: RichTranslationValues = {
  partnerAgreement: (chunks) => <Link href="#">{chunks}</Link>,
  personalDataPolicy: (chunks) => <Link href="#">{chunks}</Link>,
  personalDataProcess: (chunks) => <Link href="#">{chunks}</Link>,
};

export function SignUpHelper({ darkBackground }: { darkBackground?: boolean }) {
  const t = useTranslations("auth");

  return (
    <p className={helperClassName} data-dark-background={darkBackground}>
      {t.rich("signup_helper", translationValues)}
    </p>
  );
}
