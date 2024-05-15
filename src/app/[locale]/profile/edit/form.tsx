"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type {
  SocialNetwork,
  Address,
  Organization,
  SocialLink,
} from "@prisma/client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { Button, Checkbox, Input } from "@/components/uikit";
import { FormInnerLayout } from "@/layout/block";
import { OrgRegisterAction } from "@/lib/actions/auth";
import { OrgRegisterInput, orgRegisterSchema } from "@/lib/validations";

import fbIcon from "~/public/img/footerIcons/FaceBook.svg";
import instagramIcon from "~/public/img/footerIcons/Instagram.svg";
import linkedInIcon from "~/public/img/footerIcons/LinkedIn.svg";

import { Box, Flex, HStack, Stack, VStack } from "~/styled-system/jsx";

export function EditProfileForm({
  companyName,
  companyData,
  orgRegister,
}: {
  companyName: string;
  companyData?: Organization & {
    address: Address[];
    socialLinks: SocialLink[];
  };
  orgRegister: OrgRegisterAction;
}) {
  const defaultValues = companyData || { name: companyName };

  const methods = useForm<OrgRegisterInput>({
    mode: "onChange",
    resolver: zodResolver(orgRegisterSchema),
    defaultValues,
  });
  const t = useTranslations("form.common");
  const [response, formAction] = useFormState(orgRegister, null);

  useEffect(() => {
    if (!response) return;
    const { status, message } = response;

    if (status === "error") {
      toast.error(message);
    }

    if (status === "success") {
      toast.success(t("updated"));
    }
  }, [response]);

  return (
    <FormProvider {...methods}>
      <form action={formAction}>
        <OrganizationRegisterFormInner />
      </form>
    </FormProvider>
  );
}

const emptyAddressObject: OrgRegisterInput["address"][number] = {
  country: "",
  city: "",
  street: "",
  building: "",
  room: "",
  zipCode: "",
};

function OrganizationRegisterFormInner() {
  const { register, setValue, getValues } = useFormContext<OrgRegisterInput>();
  const t = useTranslations("organization.basic_info_form");
  const { pending } = useFormStatus();

  const sameAddressStateChanged = (checked: boolean) => {
    const postAddress = getValues("address.0");

    setValue("address.1", checked ? postAddress : emptyAddressObject);
  };

  return (
    <FormInnerLayout>
      <OrganizationRegisterFormBoxLayout>
        <h3>{t("group.main")}</h3>
        <OrganizationRegisterFormGroupLayout>
          <FormColumn>
            <Input placeholder={t("name")} {...register("name")} />
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
            <Input placeholder={t("country")} {...register("country")} />
            <Input placeholder={t("city")} {...register("city")} />
          </FormColumn>
          <CompanyImagePicker />
        </OrganizationRegisterFormGroupLayout>
      </OrganizationRegisterFormBoxLayout>

      <OrganizationRegisterFormBoxLayout>
        <h3>{t("group.credentials")}</h3>
        <OrganizationRegisterFormGroupLayout>
          <FormColumn>
            {t("column.business")}
            <Input
              type="text"
              placeholder={t("businessName")}
              {...register("businessName")}
            />
            <Input
              type="number"
              inputMode="numeric"
              placeholder="NIP(XXXXXXXXX)"
              {...register("NIP")}
            />
          </FormColumn>
          <FormColumn>
            {t("column.bank")}
            <Input
              type="text"
              placeholder={t("bankName")}
              {...register("bankName")}
            />
            <Input type="text" placeholder="IBAN" {...register("IBAN")} />
          </FormColumn>
          <FormColumn>
            {t("column.postAddress")}
            <AddressGroup type="post" />
          </FormColumn>
          <FormColumn>
            {t("column.billingAddress")}
            <AddressGroup type="billing" />
          </FormColumn>
        </OrganizationRegisterFormGroupLayout>
        <Checkbox
          label={t("same_addresses_label")}
          defaultChecked={false}
          onChange={({ target }) => sameAddressStateChanged(target.checked)}
        />
        <span className="helper">{t("credentials_asterisk_helper")}</span>
      </OrganizationRegisterFormBoxLayout>

      <OrganizationRegisterFormBoxLayout>
        <h3>{t("group.social")}</h3>
        <span className="subheading">{t("social_helper")}</span>
        <OrganizationRegisterFormGroupLayout>
          <SocialLinks />
        </OrganizationRegisterFormGroupLayout>
      </OrganizationRegisterFormBoxLayout>

      <Button type="submit" size="md" isLoading={pending}>
        {t("submit")}
      </Button>
    </FormInnerLayout>
  );
}

function AddressGroup({ type }: { type: "post" | "billing" }) {
  const t = useTranslations("organization.basic_info_form");
  const { register } = useFormContext<OrgRegisterInput>();

  const index = type === "post" ? 0 : 1;

  return (
    <>
      <Input
        placeholder={t("country")}
        {...register(`address.${index}.country`)}
      />
      <Input placeholder={t("city")} {...register(`address.${index}.city`)} />
      <Input
        placeholder={t("street")}
        {...register(`address.${index}.street`)}
      />
      <Input
        placeholder={t("building")}
        {...register(`address.${index}.building`)}
      />
      <Input placeholder={t("room")} {...register(`address.${index}.room`)} />
      <Input
        placeholder={t("zipCode")}
        {...register(`address.${index}.zipCode`)}
      />
    </>
  );
}

function CompanyImagePicker() {
  const {
    control,
    register,
    setValue,
    formState: { defaultValues },
  } = useFormContext<OrgRegisterInput>();
  const src = useWatch({
    control,
    name: "logotype",
    defaultValue: defaultValues?.logotype,
  });

  return (
    <Box
      position="relative"
      css={{
        "& > .button": {
          position: "absolute",
          fontSize: "10px",
          insetBlockStart: "0.3rem",
          insetInlineEnd: "1rem",
        },
      }}
    >
      <ProfileImagePicker
        key={src}
        groupKey="company"
        imageSrc={src || ""}
        {...register("logotype")}
      />
      {src && (
        <Button
          type="button"
          size="iconOnly"
          variant="solid"
          colorPalette="primary"
          onClick={() => setValue("logotype", "")}
          icon={<RxCross1 size="1.7em" />}
        />
      )}
    </Box>
  );
}

type SocialNetworkItem = {
  network: SocialNetwork;
  label: string;
  iconSrc: string;
};

const socialNetworkList: Array<SocialNetworkItem> = [
  {
    network: "linkedin",
    label: "Linked In",
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

function SocialLinks() {
  const t = useTranslations("organization.basic_info_form");
  const { register } = useFormContext<OrgRegisterInput>();

  return (
    <Stack gap="20px" flexBasis="460px">
      {socialNetworkList.map(({ network, label, iconSrc }, idx) => (
        <HStack key={network} gap="30px">
          <VStack gap="14px" flexShrink="0" flexBasis="60px" textStyle="body.3">
            <Image src={iconSrc} alt="" width={40} height={40} />
            {label}
          </VStack>
          <input
            type="text"
            name={`socialLinks.${idx}.network`}
            defaultValue={network}
            readOnly
            hidden
          />
          <Input
            type="url"
            inputMode="url"
            variant="outline"
            placeholder={t("social_link_placeholder", { social: label })}
            {...register(`socialLinks.${idx}.url`)}
          />
        </HStack>
      ))}
    </Stack>
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
      css={{
        "& > .subheading": { marginBlockStart: "-1.5rem", textAlign: "center" },
      }}
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
      flexWrap="wrap"
      width="full"
      maxWidth="600px"
      gap="50px"
    >
      {children}
    </Flex>
  );
}

function FormColumn({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      direction="column"
      gap="20px"
      flexBasis="256px"
      justifyContent="flex-start"
    >
      {children}
    </Flex>
  );
}
