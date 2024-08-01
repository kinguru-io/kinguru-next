// eslint-disable-next-line import/no-extraneous-dependencies
import { Img, Link } from "@react-email/components";

const baseUrl = process.env.SITE_URL;

export function FooterLogo() {
  return (
    <Link href={baseUrl}>
      <Img
        src={`${baseUrl}/img/logotypes/footer-logotype-52x52.png`}
        width={52}
        height={52}
        alt="Eventify"
      />
    </Link>
  );
}

export function HeaderLogo() {
  return (
    <Link href={baseUrl}>
      <Img
        src={`${baseUrl}/img/logotypes/header-logotype-109x40.png`}
        width={109}
        height={40}
        alt="Eventify"
      />
    </Link>
  );
}
