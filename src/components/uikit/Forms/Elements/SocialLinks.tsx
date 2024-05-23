import type { SocialNetwork } from "@prisma/client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorField, Input } from "@/components/uikit";
import { OrgRegisterInput } from "@/lib/validations";

import fbIcon from "~/public/img/footerIcons/FaceBook.svg";
import instagramIcon from "~/public/img/footerIcons/Instagram.svg";
import linkedInIcon from "~/public/img/footerIcons/LinkedIn.svg";

import { Flex, HStack, Stack, VStack } from "~/styled-system/jsx";

type SocialNetworkItem = {
  network: SocialNetwork;
  label: string;
  iconSrc: string;
};

const socialNetworkList: Array<SocialNetworkItem> = [
  {
    network: "linkedin",
    label: "LinkedIn",
    iconSrc: linkedInIcon.src,
  },
  {
    network: "facebook",
    label: "Facebook",
    iconSrc: fbIcon.src,
  },
  {
    network: "instagram",
    label: "Instagram",
    iconSrc: instagramIcon.src,
  },
];

export function SocialLinks() {
  const t = useTranslations("organization.basic_info_form");
  const {
    register,
    formState: { errors },
  } = useFormContext<OrgRegisterInput>();

  const getError = (fieldName: string) => {
    const [mainKey, indexStr, secondName] = fieldName.split(".");
    const index = parseInt(indexStr);

    return (
      errors?.[mainKey]?.[index]?.[secondName] ||
      errors?.[mainKey]?.[mainKey]?.[index]?.url
    );
  };

  return (
    <Stack gap="20px" flexBasis="460px">
      {socialNetworkList.map(({ network, label, iconSrc }, idx) => (
        <React.Fragment key={network}>
          <HStack gap="30px">
            <VStack
              gap="8px"
              flexShrink="0"
              flexBasis="60px"
              textStyle="body.3"
            >
              <Image src={iconSrc} alt="" width={40} height={40} />
              {label}
            </VStack>
            <Flex grow="1" direction="column">
              <input
                type="text"
                defaultValue={network}
                readOnly
                hidden
                data-invalid={getError(`socialLinks.${idx}.network`)}
                {...register(`socialLinks.${idx}.network`)}
              />
              <Input
                type="text"
                variant="outline"
                placeholder={t("social_link_placeholder", { social: label })}
                data-invalid={getError(`socialLinks.${idx}.url`)}
                {...register(`socialLinks.${idx}.url`)}
              />
              <ErrorField error={getError(`socialLinks.${idx}.url`)} />
            </Flex>
          </HStack>
        </React.Fragment>
      ))}
    </Stack>
  );
}
