import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ErrorField, Input } from "@/components/uikit";
import { CreateVenueFormSchemaProps } from "@/lib/actions/venue";
import { Flex } from "~/styled-system/jsx";

export function ContactsGroup() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateVenueFormSchemaProps>();
  const t = useTranslations("profile.venues.add");

  const formFieldPath = "manager.manager";

  return (
    <>
      <span className="helper">{t("fields.contacts_tip")}</span>
      <Flex
        css={{
          gap: "2",
          flexWrap: "wrap",
          "& > div": {
            flexBasis: "calc(50% - {spacing.1})",
            flexGrow: "1",
            minWidth: "60",
          },
        }}
      >
        <div>
          <Input
            placeholder={t("fields.firstname_placeholder")}
            data-invalid={errors?.manager?.manager?.firstname}
            {...register(`${formFieldPath}.firstname`)}
          />
          <ErrorField error={errors?.manager?.manager?.firstname} />
        </div>
        <div>
          <Input
            placeholder={t("fields.lastname_placeholder")}
            data-invalid={errors?.manager?.manager?.lastname}
            {...register(`${formFieldPath}.lastname`)}
          />
          <ErrorField error={errors?.manager?.manager?.lastname} />
        </div>
        <div>
          <Input
            type="email"
            inputMode="email"
            placeholder={t("fields.email_placeholder")}
            data-invalid={errors?.manager?.manager?.email}
            {...register(`${formFieldPath}.email`)}
          />
          <ErrorField error={errors?.manager?.manager?.email} />
        </div>
        <div>
          <Input
            type="text"
            inputMode="tel"
            placeholder={t("fields.phoneNumber_placeholder")}
            data-invalid={errors?.manager?.manager?.phoneNumber}
            {...register(`${formFieldPath}.phoneNumber`, {
              onChange: makePhoneNumber,
            })}
          />
          <ErrorField error={errors?.manager?.manager?.phoneNumber} />
        </div>
      </Flex>
    </>
  );
}

function makePhoneNumber({ target }: React.ChangeEvent<HTMLInputElement>) {
  target.value = `+${target.value.replace(/\D/g, "")}`;
}
