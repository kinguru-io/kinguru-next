import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ErrorField, Radio } from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { bookingCancelTerms } from "@/lib/shared/config/booking-cancel-terms";
import { css } from "~/styled-system/css";
import { Stack } from "~/styled-system/jsx";

export function BookingCancelTermsRadioGroup() {
  const t = useTranslations("booking_cancel_terms");
  const {
    register,
    formState: { errors },
  } = useFormContext<CreatePremiseFormSchemaProps>();

  return (
    <>
      <Stack gap="6">
        {bookingCancelTerms.map((term) => {
          return (
            <Stack key={term} css={{ gap: "3", fontWeight: "bold" }}>
              <Radio
                value={term}
                label={t(term)}
                {...register("bookingCancelTerm.bookingCancelTerm")}
              />
              <p
                className={css({
                  fontWeight: "normal",
                  fontSize: "sm",
                  color: "secondary",
                  lineHeight: "1.6",
                })}
              >
                {t(`${term}_desc`)}
              </p>
            </Stack>
          );
        })}
      </Stack>
      <ErrorField error={errors?.bookingCancelTerm?.bookingCancelTerm} />
    </>
  );
}
