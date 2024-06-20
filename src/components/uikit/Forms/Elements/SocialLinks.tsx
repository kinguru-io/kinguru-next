"use client";

import type { SocialNetwork } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorField, Icon, Input } from "@/components/uikit";
import type { SpritesMap } from "@/sprite.gen";
import { Flex, HStack, Stack, VStack } from "~/styled-system/jsx";

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
    iconName: "linkedin",
  },
];

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

  const getErrorFromArr = (fieldName: string) => {
    const [mainKey, indexStr, secondName] = fieldName.split(".");
    const index = parseInt(indexStr);
    // @ts-expect-error
    return errors?.[mainKey]?.[index]?.[secondName];
  };

  return (
    <Stack gap="20px" flexBasis="460px">
      {socialNetworkList.map(({ network, social, iconName }, idx) => (
        <React.Fragment key={network}>
          <HStack gap="30px">
            <VStack
              gap="8px"
              flexShrink="0"
              flexBasis="60px"
              textStyle="body.3"
            >
              <Icon name={`social/${iconName}`} />
              {social}
            </VStack>
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
                variant="outline"
                placeholder={t("social_link_placeholder", { social })}
                data-invalid={getErrorFromArr(`socialLinks.${idx}.url`)}
                {...register(`socialLinks.${idx}.url`)}
              />
              <ErrorField error={getErrorFromArr(`socialLinks.${idx}.url`)} />
            </Flex>
          </HStack>
        </React.Fragment>
      ))}
      <ErrorField error={errors?.socialLinks} />
    </Stack>
  );
}
