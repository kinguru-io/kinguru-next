"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Address, Organization, SocialLink } from "@prisma/client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useTransition } from "react";
import { useFormState } from "react-dom";
import {
  SubmitHandler,
  FormProvider,
  useForm,
  useFormContext,
  type UseFormGetValues,
} from "react-hook-form";
import toast from "react-hot-toast";
import formFieldsConfig from "./form-config.json";
import { SubSection } from "@/components/common/cards/sub-section";
import { ImagePickerForm } from "@/components/common/form/image-picker-form";
import { BaseForm, Button, Checkbox, SocialLinks } from "@/components/uikit";
import { OrgRegisterAction } from "@/lib/actions/auth";
import { OrgRegisterInput, orgRegisterSchema } from "@/lib/validations";

import { css } from "~/styled-system/css";
import { Flex, Grid, Stack } from "~/styled-system/jsx";

interface EditProfileFormProps {
  companyName: string;
  companyData?: Organization & {
    address: Address[];
    socialLinks: SocialLink[];
  };
  orgRegister: OrgRegisterAction;
}

export function EditProfileForm({
  companyName,
  companyData,
  orgRegister,
}: EditProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const defaultValues = companyData
    ? { ...companyData, IBAN: formatIBAN(companyData.IBAN) }
    : { name: companyName };

  const t = useTranslations("form.common");
  const formT = useTranslations("organization.basic_info_form");

  const methods = useForm<OrgRegisterInput>({
    mode: "all",
    // @ts-expect-error
    resolver: zodResolver(orgRegisterSchema(formT)),
    defaultValues,
  });

  const [response, formAction] = useFormState(orgRegister, null);

  const onSubmit: SubmitHandler<OrgRegisterInput> = useCallback(
    (data) => {
      // @ts-expect-error
      startTransition(() => formAction(data));
    },
    [formAction],
  );

  useEffect(() => {
    if (!response) return;

    const { status, message } = response;

    if (status === "error") {
      toast.error(message);
    }

    if (status === "success") {
      toast.success(t("company_info_saved"), {
        className: css({
          fontSize: "xl",
          md: { marginInlineStart: "20.75rem" }, // to be located at the visual center of the dashboard content
        }),
      });
    }
  }, [response]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <OrganizationRegisterFormInner isPending={isPending} />
      </form>
    </FormProvider>
  );
}

type InputAddress = OrgRegisterInput["address"][number];
const emptyAddressObject: InputAddress = {
  country: "",
  city: "",
  street: "",
  building: "",
  room: "",
  zipCode: "",
};

const areAddressesSame = (get: UseFormGetValues<OrgRegisterInput>) => {
  return (Object.keys(emptyAddressObject) as (keyof InputAddress)[]).every(
    (key) => get(`address.0.${key}`) === get(`address.1.${key}`),
  );
};

function OrganizationRegisterFormInner({ isPending }: { isPending: boolean }) {
  const { setValue, getValues } = useFormContext<OrgRegisterInput>();

  const t = useTranslations("organization.basic_info_form");

  const sameAddressStateChanged = (checked: boolean) => {
    const postAddress = getValues("address.0");

    if (!checked && !areAddressesSame(getValues)) return;

    setValue("address.1", checked ? postAddress : emptyAddressObject);
  };

  return (
    <Stack css={{ md: { gap: "6" } }}>
      <SubSection>
        <h2 className="title">{t("group.main")}</h2>
        <Grid
          css={{
            gap: "4",
            gridTemplateColumns: { base: "1fr", md: "{sizes.32} 1fr" },
          }}
        >
          <ImagePickerForm groupKey="company" name="logotype" />
          <Stack gap="2" justifyContent="center">
            <BaseForm<OrgRegisterInput>
              config={formFieldsConfig.main}
              // @ts-expect-error
              schema={orgRegisterSchema(t)}
              translationsKey="organization.basic_info_form"
            />
          </Stack>
        </Grid>
      </SubSection>

      <SubSection>
        <h2 className="title">{t("group.credentials")}</h2>
        <Grid
          css={{
            gridTemplateColumns: "repeat(auto-fill, minmax({spacing.72}, 1fr))",
            gap: "4",
            md: { gap: "8" },
          }}
        >
          <FormColumn>
            <span className="subtitle">{t("column.business")}</span>
            <BaseForm<OrgRegisterInput>
              config={formFieldsConfig.credentials.business}
              // @ts-expect-error
              schema={orgRegisterSchema(t)}
              translationsKey="organization.basic_info_form"
            />
          </FormColumn>
          <FormColumn>
            <span className="subtitle">{t("column.bank")}</span>
            <BaseForm<OrgRegisterInput>
              config={formFieldsConfig.credentials.bank}
              // @ts-expect-error
              schema={orgRegisterSchema(t)}
              translationsKey="organization.basic_info_form"
            />
          </FormColumn>
          <FormColumn>
            <span className="subtitle">{t("column.postAddress")}</span>
            <AddressGroup type="post" />
          </FormColumn>
          <FormColumn>
            <span className="subtitle">{t("column.billingAddress")}</span>
            <AddressGroup type="billing" />
          </FormColumn>
        </Grid>
        <FormFooter>
          <Checkbox
            label={t("same_addresses_label")}
            defaultChecked={areAddressesSame(getValues)}
            onChange={({ target }) => sameAddressStateChanged(target.checked)}
          />
          <span className="notice">{t("credentials_asterisk_helper")}</span>
        </FormFooter>
      </SubSection>

      <SocialLinks role="organization" />

      <Button type="submit" size="lg" isLoading={isPending} centered>
        {t("submit")}
      </Button>
    </Stack>
  );
}

function AddressGroup({ type }: { type: "post" | "billing" }) {
  const t = useTranslations("organization.basic_info_form");
  const index = type === "post" ? 0 : 1;

  const customFieldName = (field: { name: string }): string => {
    return `address.${index}.${field.name}`;
  };

  return (
    <BaseForm<OrgRegisterInput>
      config={formFieldsConfig.credentials.postAddress}
      // @ts-expect-error
      schema={orgRegisterSchema(t)}
      // @ts-expect-error
      customFieldName={customFieldName}
      translationsKey="organization.basic_info_form"
    />
  );
}

function FormColumn({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      css={{
        flexDirection: "column",
        gap: "2",
        fontSize: "px15",
        "& > .subtitle": { marginBlockEnd: "2" },
      }}
    >
      {children}
    </Flex>
  );
}

function FormFooter({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" gap="2">
      {children}
    </Flex>
  );
}

function formatIBAN(iban: string) {
  return iban.replace(/[a-z0-9]{4}/gi, (x) => `${x} `).trimEnd();
}
