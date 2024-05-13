"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";
import { useForm, UseFormRegister } from "react-hook-form";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { Button, Input, Textarea } from "@/components/uikit";
import { FormInnerLayout } from "@/layout/block";
import { OrgRegisterAction } from "@/lib/actions/auth";
import { OrgRegisterInput, orgRegisterSchema } from "@/lib/validations";
import { Flex } from "~/styled-system/jsx";

export function EditProfileForm({
  companyName,
  orgRegister,
}: {
  companyName: string;
  orgRegister: OrgRegisterAction;
}) {
  const {
    register,
    formState: { isValid },
  } = useForm<OrgRegisterInput>({
    mode: "onChange",
    resolver: zodResolver(orgRegisterSchema),
    defaultValues: { name: companyName },
  });
  const [_state, formAction] = useFormState(orgRegister, null);

  return (
    <form action={formAction}>
      <OrganizationRegisterFormInner register={register} isValid={isValid} />
    </form>
  );
}

function OrganizationRegisterFormInner({
  register,
  isValid,
}: {
  register: UseFormRegister<OrgRegisterInput>;
  isValid: boolean;
}) {
  const t = useTranslations("organization.basic_info_form");
  const { pending } = useFormStatus();
  return (
    <FormInnerLayout>
      <OrganizationRegisterFormBoxLayout>
        <h3>{t("main_heading")}</h3>
        <OrganizationRegisterFormGroupLayout>
          <Flex direction="column" gap="20px" flexBasis="255px">
            <Input placeholder={t("name")} readOnly {...register("name")} />
            <Input
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              step="1"
              inputMode="numeric"
              disabled={pending}
              placeholder={t("foundationDate")}
              {...register("foundationDate")}
            />
          </Flex>
          <ProfileImagePicker disabled={pending} {...register("logotype")} />
        </OrganizationRegisterFormGroupLayout>
      </OrganizationRegisterFormBoxLayout>

      <OrganizationRegisterFormBoxLayout>
        <h3>{t("credentials_heading")}</h3>
        <OrganizationRegisterFormGroupLayout>
          <Input
            type="url"
            placeholder={t("requisites_url")}
            disabled={pending}
            {...register("requisitesUrl")}
          />
        </OrganizationRegisterFormGroupLayout>
        <span className="helper">{t("credentials_asterisk_helper")}</span>
      </OrganizationRegisterFormBoxLayout>

      <OrganizationRegisterFormBoxLayout>
        <h3>{t("extra_heading")}</h3>
        <OrganizationRegisterFormGroupLayout>
          <Textarea
            placeholder={t("aboutCompany")}
            rows={9}
            disabled={pending}
            {...register("aboutCompany")}
          />
        </OrganizationRegisterFormGroupLayout>
      </OrganizationRegisterFormBoxLayout>

      <Button type="submit" size="md" isLoading={pending} disabled={!isValid}>
        {t("submit")}
      </Button>
    </FormInnerLayout>
  );
}

function OrganizationRegisterFormBoxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

function OrganizationRegisterFormGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      justifyContent="space-around"
      alignItems="center"
      flexWrap="wrap-reverse"
      width="full"
      maxWidth="600px"
      gap="20px"
    >
      {children}
    </Flex>
  );
}
