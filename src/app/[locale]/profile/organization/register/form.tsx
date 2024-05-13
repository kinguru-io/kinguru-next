"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";
import { useForm, UseFormRegister } from "react-hook-form";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { Button, Select, Input, Textarea } from "@/components/uikit";
import { FormInnerLayout } from "@/layout/block";
import { OrgRegisterAction } from "@/lib/actions/auth";
import { FormActionState } from "@/lib/utils";
import { OrgRegisterInput, orgRegisterSchema } from "@/lib/validations";
import { Flex } from "~/styled-system/jsx";

export function OrganizationRegisterForm({
  orgRegister,
}: {
  orgRegister: OrgRegisterAction;
}) {
  const {
    register,
    formState: { isValid },
  } = useForm<OrgRegisterInput>({
    mode: "onChange",
    resolver: zodResolver(orgRegisterSchema),
  });
  // TODO `state` might be used for notifications?
  const [_state, formAction] = useFormState<FormActionState, FormData>(
    orgRegister,
    null,
  );

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
          <Flex direction="column" gap="20px">
            <Input
              placeholder={t("name")}
              disabled={pending}
              {...register("name")}
            />
            <Input
              type="number"
              inputMode="numeric"
              disabled={pending}
              placeholder={t("foundationDate")}
              {...register("foundationDate")}
            />
            <Select
              placeholder={t("activitySphere")}
              disabled={pending}
              {...register("activitySphere")}
            >
              <option>Hello</option>
            </Select>
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
