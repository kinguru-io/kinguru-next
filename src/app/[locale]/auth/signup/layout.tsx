import { useTranslations, type RichTranslationValues } from "next-intl";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";

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
      {children}
      <p className={helperClassName}>
        {t.rich("signup_helper", translationValues)}
      </p>
    </>
  );
}
