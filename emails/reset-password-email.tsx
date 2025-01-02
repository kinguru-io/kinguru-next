// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
// eslint-disable-next-line import/no-extraneous-dependencies
import { renderAsync } from "@react-email/render";
import {
  body,
  container,
  footer,
  heading,
  hr,
  main,
  paragraph,
} from "./base-styles";
import { FooterLogo, HeaderLogo } from "./logos";

type ResetPasswordEmailProps = {
  linkHref: string;
  t: (...args: any[]) => string;
};
export default function ResetPasswordEmail({
  linkHref,
  t,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{t("reset_password.preview")}</Preview>
      <Body style={main}>
        <Container style={container}>
          <HeaderLogo />
          <Heading style={heading}>{t("reset_password.heading")}</Heading>
          <Section style={body}>
            <Text style={paragraph}>{t("reset_password.preliminary")}</Text>
            <Text style={paragraph}>
              <Link href={linkHref}>
                {t("reset_password.reset_link_label")}
              </Link>
            </Text>
            <Text style={paragraph}>{t("ignore_notice")}</Text>
          </Section>
          <Text style={paragraph}>
            {t("author_remark")}
            <br />— {t("brand_label")}
          </Text>
          <Hr style={hr} />
          <FooterLogo />
          <Text style={footer}>© {new Date().getFullYear()} Eventify</Text>
        </Container>
      </Body>
    </Html>
  );
}

ResetPasswordEmail.PreviewProps = {
  linkHref: "https://example.com/reset-password?token=abcd-1234",
  t: (key: string) => `[${key}]`,
} satisfies ResetPasswordEmailProps;

export async function renderResetPasswordEmail(
  props: ResetPasswordEmailProps,
  plainText?: boolean,
) {
  return renderAsync(<ResetPasswordEmail {...props} />, { plainText });
}
