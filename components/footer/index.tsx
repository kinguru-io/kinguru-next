import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { Section } from "@/components/common/section";
import { useLocale } from "@/utils/use-locale";

export const FooterSection = () => {
  const { t } = useLocale();
  return (
    <Section className="bg-secondary py-10">
      <div className="text-center lg:grid lg:grid-cols-5 lg:text-left">
        <div className="mb-4 flex flex-col lg:mb-0">
          <Image
            src="/img/logo_header.svg"
            className="mx-auto"
            alt=""
            width={80}
            height={73}
          />
          <Image
            src="/img/logo_header_text.svg"
            className="mx-auto pt-3"
            alt=""
            width={105}
            height={24}
          />
        </div>
        <div className="grid grid-cols-1 content-center text-footer-text">
          <p>+375 29 656 17 57</p>
          <p>info@kinguru.info</p>
        </div>
        <div className="grid grid-cols-1 content-center text-footer-text">
          <div className="mx-auto flex items-center py-2 lg:mx-0">
            <FaFacebookF />
            <a
              className="pl-4"
              href="https://www.facebook.com/kinguru.online/"
              target="_blank"
            >
              facebook
            </a>
          </div>
          <div className="mx-auto flex items-center py-2 lg:mx-0">
            <FaLinkedin />
            <a
              className="pl-4"
              href="https://www.linkedin.com/"
              target="_blank"
            >
              linkedin
            </a>
          </div>
          <div className="mx-auto flex items-center py-2 lg:mx-0">
            <FaInstagram />
            <a
              className="pl-4"
              href="https://www.instagram.com/kinguru.online/"
              target="_blank"
            >
              instagram
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 content-center text-footer-text">
          <Link href="/#events">{t("footer.upcoming_events")}</Link>
          <Link href="/#how_it_works">{t("footer.how_it_works")}</Link>
          <Link href="/#events">{t("footer.reviews")}</Link>
        </div>
        <div className="grid grid-cols-1 content-center text-footer-text">
          <Link href="/#">{t("footer.photo_reports")}</Link>
          <Link href="/#">{t("footer.contacts")}</Link>
        </div>
      </div>
    </Section>
  );
};
