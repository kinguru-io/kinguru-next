"use client";

import { useTranslations } from "next-intl";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { Button, Select, Input, Textarea } from "@/components/uikit";
import { FormInnerLayout } from "@/layout/block";
import { Flex } from "~/styled-system/jsx";

export function BasicInfoForm() {
  return (
    <form>
      <BasicInfoFormInner />
    </form>
  );
}

function BasicInfoFormInner() {
  const t = useTranslations("organization.basic_info_form");

  return (
    <FormInnerLayout>
      <BasicInfoFormBoxLayout>
        <h3>{t("main_heading")}</h3>
        <BasicInfoFormGroupLayout>
          <Flex direction="column" gap="20px">
            <Input name="name" placeholder={t("name")} />
            <Input
              type="number"
              inputMode="numeric"
              name="foundationDate"
              placeholder={t("foundationDate")}
            />
            <Select name="activitySphere" placeholder={t("activitySphere")} />
          </Flex>
          <ProfileImagePicker name="logotype" />
        </BasicInfoFormGroupLayout>
      </BasicInfoFormBoxLayout>

      <BasicInfoFormBoxLayout>
        <h3>{t("credentials_heading")}</h3>
        <BasicInfoFormGroupLayout>
          <Input name="email" placeholder={t("email")} />
        </BasicInfoFormGroupLayout>
        <span className="helper">{t("credentials_asterisk_helper")}</span>
      </BasicInfoFormBoxLayout>

      <BasicInfoFormBoxLayout>
        <h3>{t("extra_heading")}</h3>
        <BasicInfoFormGroupLayout>
          <Textarea
            name="aboutCompany"
            placeholder={t("aboutCompany")}
            rows={9}
          />
        </BasicInfoFormGroupLayout>
      </BasicInfoFormBoxLayout>

      <Button type="submit" size="md">
        {t("submit")}
      </Button>
    </FormInnerLayout>
  );
}

function BasicInfoFormBoxLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      layerStyle="outlineSecondaryWrapper"
      paddingInline="30px"
      marginBlockEnd="60px"
      direction="column"
      gap="30px"
      alignItems="center"
    >
      {children}
    </Flex>
  );
}

function BasicInfoFormGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      width="full"
      maxWidth="600px"
      gap="20px"
    >
      {children}
    </Flex>
  );
}
