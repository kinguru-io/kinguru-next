"use client";

import type { SocialNetwork } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormContext, type FieldErrors } from "react-hook-form";
import { SubSection } from "@/components/common/cards/sub-section";
import { ErrorField, Icon, Input } from "@/components/uikit";
import type { SpritesMap } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Flex, HStack, InlineBox, Stack } from "~/styled-system/jsx";

type SocialNetworkItem = {
  network: SocialNetwork;
  social: string;
  iconName: SpritesMap["social"];
};

const socialNetworkList: Array<SocialNetworkItem> = [
  {
    network: "linkedin",
    social: "LinkedIn",
    iconName: "linkedin",
  },
  {
    network: "facebook",
    social: "Facebook",
    iconName: "facebook",
  },
  {
    network: "instagram",
    social: "Instagram",
    iconName: "instagram",
  },
];

const getErrorFromArr = (fieldName: string, errors: FieldErrors) => {
  const [mainKey, indexStr, secondName] = fieldName.split(".");
  const index = parseInt(indexStr);
  // @ts-expect-error
  return errors?.[mainKey]?.[index]?.[secondName];
};

export function SocialLinks({
  role,
}: {
  role: Extract<keyof IntlMessages, "organization" | "user">;
}) {
  const t = useTranslations(`${role}.basic_info_form`);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <SubSection>
      <h2 className="title">{t("social_links_title")}</h2>
      <span className="helper">{t("social_links_helper")}</span>
      <Stack gap="2">
        {socialNetworkList.map(({ network, social, iconName }, idx) => (
          <React.Fragment key={network}>
            <HStack gap="3">
              <InlineBox srOnly>{social}</InlineBox>
              <Icon
                name={`social/${iconName}`}
                className={css({ fontSize: { base: "2xl", md: "2.5rem" } })}
              />
              <Flex grow="1" direction="column">
                <input
                  type="text"
                  defaultValue={network}
                  readOnly
                  hidden
                  {...register(`socialLinks.${idx}.network`)}
                />
                <Input
                  type="text"
                  inputMode="url"
                  variant="outline"
                  placeholder={t("social_link_placeholder")}
                  data-invalid={getErrorFromArr(
                    `socialLinks.${idx}.url`,
                    errors,
                  )}
                  {...register(`socialLinks.${idx}.url`)}
                />
                <ErrorField
                  error={getErrorFromArr(`socialLinks.${idx}.url`, errors)}
                />
              </Flex>
            </HStack>
          </React.Fragment>
        ))}
      </Stack>
      <ErrorField error={errors?.socialLinks} />
    </SubSection>
  );
}
