import {
  Container,
  SimpleGrid,
  VStack,
  Select,
  HStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import logo from "@/public/img/logo_header.svg";
import logoText from "@/public/img/logo_header_text.svg";
import { useLocale } from "@/utils/use-locale";

export const FooterSection = () => {
  const { t } = useLocale();
  const navigation = [
    { name: t("navbar.events"), href: "/events" },
    { name: t("navbar.speakers"), href: "/speakers" },
    { name: t("navbar.places"), href: "/places" },
    { name: t("navbar.price"), href: "/price" },
  ];

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
      <SimpleGrid columns={[2, 4]} maxWidth={"5xl"} mx={"auto"}>
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
          {navigation.map(({ href, name }) => (
            <Link key={name} href={href}>
              {name}
            </Link>
          ))}
        </VStack>
        <VStack
          color={"gray.100"}
          py={5}
          alignItems={["center", "baseline"]}
          justifyContent={"center"}
        >
          <Link href="/legal/privacy-policy">{t("footer.privacy_policy")}</Link>
          <Link href="/legal/terms-and-conditions">
            {t("footer.terms_and_conditions")}
          </Link>
          <Link href="/legal/cookie-policy">{t("footer.cookie_policy")}</Link>
          <Link href="/#">{t("footer.faq")}</Link>
        </VStack>
        <VStack
          color={"gray.100"}
          py={5}
          alignItems={["center", "baseline"]}
          justifyContent={"center"}
        >
          <HStack>
            <Link href={"#"}>
              <FaLinkedin style={{ display: "inline", fontSize: "18px" }} />
            </Link>
            <Link href={"#"}>
              <FaFacebook style={{ display: "inline", fontSize: "18px" }} />
            </Link>
            <Link href={"#"}>
              <FaInstagram style={{ display: "inline", fontSize: "18px" }} />
            </Link>
          </HStack>
          <Link href={"tel:+48792665092"}>+48792665092</Link>
          <Select
            mt={1}
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
      </SimpleGrid>
    </Container>
  );
};
