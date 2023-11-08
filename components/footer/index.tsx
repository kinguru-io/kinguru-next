import { Container, SimpleGrid, VStack, Link, Select } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import logo from "@/public/img/logo_header.svg";
import logoText from "@/public/img/logo_header_text.svg";
import { useLocale } from "@/utils/use-locale";

export const FooterSection = () => {
  const { t } = useLocale();

  const { i18n } = useTranslation();

  const router = useRouter();
  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    void router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const languageOptions = [
    {
      code: "en",
      text: t("navbar.lang_en"),
    },
    {
      code: "pl",
      text: t("navbar.lang_pl"),
    },
    {
      code: "ru",
      text: t("navbar.lang_ru"),
    },
  ];
  return (
    <Container maxW={"full"} bgColor={"brand.secondary"} py={10}>
      <SimpleGrid columns={[2, 5]} maxWidth={"5xl"} mx={"auto"}>
        <VStack py={5} justifyContent={"center"}>
          <Image
            src={logo}
            alt={t("company")}
            width={80}
            height={73}
            priority={false}
          />
          <Image
            src={logoText}
            alt={t("company")}
            width={105}
            height={24}
            priority={false}
          />
        </VStack>
        <VStack
          color={"gray.100"}
          py={5}
          alignItems={["center", "baseline"]}
          justifyContent={"center"}
        >
          <Link href={"tel:+48792665092"}>+48792665092</Link>
          <Link href={"mailto:t.yarosh@kinguru.io"}>t.yarosh@kinguru.io</Link>
          <Select
            w={"auto"}
            color="white"
            placeholder={
              languageOptions.find(({ code }) => code === i18n.resolvedLanguage)
                ?.text
            }
            onChange={({ target: { value } }) => onToggleLanguageClick(value)}
            mr={3}
          >
            {languageOptions
              .filter(({ code }) => code !== i18n.resolvedLanguage)
              .map(({ code, text }) => (
                <option value={code} key={code} style={{ color: "black" }}>
                  {text}
                </option>
              ))}
          </Select>
        </VStack>
        <VStack
          color={"gray.100"}
          py={5}
          alignItems={["center", "baseline"]}
          justifyContent={"center"}
        >
          <Link href={"https://www.facebook.com/kinguru.online/"} isExternal>
            <FaFacebook style={{ display: "inline", fontSize: "13px" }} />{" "}
            facebook
          </Link>
          <Link href={"https://www.linkedin.com/"} isExternal>
            <FaLinkedin style={{ display: "inline", fontSize: "13px" }} />{" "}
            linkedin
          </Link>
          <Link href={"https://www.instagram.com/kinguru.online/"} isExternal>
            <FaInstagram style={{ display: "inline", fontSize: "13px" }} />{" "}
            instagram
          </Link>
        </VStack>
        <VStack
          color={"gray.100"}
          py={5}
          alignItems={["center", "baseline"]}
          justifyContent={"center"}
        >
          <Link href="/#events">{t("footer.upcoming_events")}</Link>
          <Link href="/#how_it_works">{t("footer.how_it_works")}</Link>
          <Link href="/#events">{t("footer.reviews")}</Link>
        </VStack>
        <VStack
          color={"gray.100"}
          py={5}
          alignItems={["center", "baseline"]}
          justifyContent={"center"}
        >
          <Link href="/privacy-policy">{t("footer.privacy_policy")}</Link>
          <Link href="/#">{t("footer.photo_reports")}</Link>
          <Link href="/#">{t("footer.contacts")}</Link>
        </VStack>
      </SimpleGrid>
    </Container>
  );
};
