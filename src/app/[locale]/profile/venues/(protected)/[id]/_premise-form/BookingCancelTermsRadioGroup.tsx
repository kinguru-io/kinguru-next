import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorField, Radio } from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { bookingCancelTerms } from "@/lib/shared/config/booking-cancel-terms";
import { InlineBox, Stack } from "~/styled-system/jsx";

export function BookingCancelTermsRadioGroup() {
  const t = useTranslations("booking_cancel_terms");
  const {
    register,
    formState: { errors },
  } = useFormContext<CreatePremiseFormSchemaProps>();

  return (
    <>
      <Stack
        gap="20px"
        textStyle="body.1"
        css={{
          "& > p": {
            paddingInlineStart: "calc(12px + 1.125em)", // 10px (gap) + 1px * 2 (icon borders) + 1.125em (icon width)
          },
        }}
      >
        {bookingCancelTerms.map((term) => {
          return (
            <Fragment key={term}>
              <Radio
                value={term}
                {...register("bookingCancelTerm.bookingCancelTerm")}
                label={t(term)}
              />
              <p>
                <InlineBox textStyle="body.2">{t(`${term}_desc`)}</InlineBox>
              </p>
            </Fragment>
          );
        })}
      </Stack>
      <ErrorField error={errors?.bookingCancelTerm?.bookingCancelTerm} />
    </>
  );
}
