// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
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

type CodeVerificationEmailProps = {
  code: string;
  t: (...args: any[]) => string;
};
export default function CodeVerificationEmail({
  code,
  t,
}: CodeVerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{t("verify_code.preview")}</Preview>
      <Body style={main}>
        <Container style={container}>
          <HeaderLogo />
          <Heading style={heading}>{t("verify_code.heading")}</Heading>
          <Section style={body}>
            <Text style={paragraph}>
              {t("verify_code.code_label")}: <b>{code}</b>
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

CodeVerificationEmail.PreviewProps = {
  code: String(Math.random()).slice(2, 8),
  t: (key: string) => `[${key}]`,
} satisfies CodeVerificationEmailProps;

export async function renderCodeVerificationEmail(
  props: CodeVerificationEmailProps,
  plainText?: boolean,
) {
  return renderAsync(<CodeVerificationEmail {...props} />, {
    plainText,
  });
}
