import { getTranslations } from "next-intl/server";
import { Icon, type SpritesMap } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Flex } from "~/styled-system/jsx";

const socialMedia: Array<{
  iconName: SpritesMap["social"];
  link: string;
  social: string;
}> = [
  {
    iconName: "instagram",
    link: "https://www.instagram.com/eventify.today/",
    social: "Instagram",
  },
  {
    iconName: "facebook",
    link: "https://www.facebook.com/eventify.today",
    social: "Facebook",
  },
  {
    iconName: "linkedin",
    link: "https://www.linkedin.com/company/eventifytoday/",
    social: "LinkedIn",
  },
];

export async function SocialMediaLinks() {
  const t = await getTranslations("footer");

  return (
    <Flex gap="2">
      {socialMedia.map(({ iconName, link, social }) => (
        <a
          key={iconName}
          href={link}
          title={t("follow_us", { social })}
          target="_blank"
        >
          <Icon
            className={css({
              width: "10",
              height: "10",
              _hover: { color: "primary" },
            })}
            name={`social/${iconName}`}
          />
        </a>
      ))}
    </Flex>
  );
}
