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

type VerificationEmailProps = {
  linkHref: string;
  t: (...args: any[]) => string;
};
export default function VerificationEmail({
  linkHref,
  t,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{t("verify.preview")}</Preview>
      <Body style={main}>
        <Container style={container}>
          <HeaderLogo />
          <Heading style={heading}>{t("verify.heading")}</Heading>
          <Section style={body}>
            <Text style={paragraph}>
              <Link href={linkHref}>{t("verify.verification_link_label")}</Link>
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

VerificationEmail.PreviewProps = {
  linkHref: "https://example.com/verify",
  t: (key: string) => `[${key}]`,
} satisfies VerificationEmailProps;

export async function renderVerificationEmail(
  props: VerificationEmailProps,
  plainText?: boolean,
) {
  return renderAsync(<VerificationEmail {...props} />, { plainText });
}
