import {
  Button,
  Flex,
  VStack,
  HStack,
  TableContainer,
  Tbody,
  Tr,
  Td,
  Table,
  useDisclosure,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import { MdClear } from "react-icons/md";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { daysOfTheWeek, OpenHoursModal } from "@/components/places/OpenHours";
import { useLocale } from "@/utils/use-locale.ts";

export const PlaceOpenHoursSchema = z.record(
  z.enum(daysOfTheWeek),
  z.array(
    z.object({
      start: z.string(),
      end: z.string(),
    }),
  ),
);

export function NewPlaceOpenHours({
  openHours,
  setOpenHours,
  activeStep,
  setActiveStep,
}: {
  openHours?: z.infer<typeof PlaceOpenHoursSchema>;
  setOpenHours?: Dispatch<
    SetStateAction<z.infer<typeof PlaceOpenHoursSchema> | undefined>
  >;
  activeStep?: number;
  setActiveStep?: Dispatch<SetStateAction<number>>;
}) {
  const { t } = useLocale();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formatTimeInterval = (
    interval: z.infer<
      typeof PlaceOpenHoursSchema
    >[(typeof daysOfTheWeek)[number]],
  ) => {
    if (!interval || !interval.length) return t("places.closed");
    return interval
      .sort((a, b) =>
        moment(a.start, "HH:mm").isBefore(moment(b.start, "HH:mm")) ? -1 : 1,
      )
      .map(
        ({ start, end }) =>
          `${moment(start, "HH:mm").format("HH:mm")}-${moment(
            end,
            "HH:mm",
          ).format("HH:mm")}`,
      )
      .join(", ");
  };
  return (
    <Formik
      initialValues={
        openHours || {
          MONDAY: [],
          TUESDAY: [],
          WEDNESDAY: [],
          THURSDAY: [],
          FRIDAY: [],
          SATURDAY: [],
          SUNDAY: [],
        }
      }
      validationSchema={toFormikValidationSchema(PlaceOpenHoursSchema)}
      onSubmit={(values, actions) => {
        setActiveStep && setActiveStep((activeStep || 0) + 1);
        setOpenHours && setOpenHours(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Flex w={"full"} py={10} flexDirection={["column", "column", "row"]}>
            <VStack w={["full", "full", "50%"]} mx={"auto"} px={5} spacing={7}>
              <Heading variant={"brand"}>
                {t(`places.hours_of_premises`)}
              </Heading>
              <TableContainer>
                <Table variant="simple">
                  <Tbody>
                    {daysOfTheWeek.map((day) => (
                      <Field
                        key={`field-${day.toLocaleLowerCase()}`}
                        name={day}
                      >
                        {({ field }: FieldProps) => (
                          <Tr>
                            <Td>
                              {t(`places.hours_${day.toLocaleLowerCase()}`)}
                            </Td>
                            <Td>{formatTimeInterval(field.value)}</Td>
                            <Td>
                              <IconButton
                                aria-label="clear"
                                icon={<MdClear />}
                                onClick={() =>
                                  field.onChange({
                                    target: {
                                      name: day,
                                      value: [],
                                    },
                                  })
                                }
                              />
                            </Td>
                          </Tr>
                        )}
                      </Field>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>

              <Flex flexDirection={["column", "column", "row"]}>
                <Field name={"reset"}>
                  {({ form }: FieldProps) => (
                    <Button
                      variant={"secondary"}
                      onClick={() => form.resetForm()}
                      m={1}
                    >
                      {t("places.hours_reset_button")}
                    </Button>
                  )}
                </Field>
                <Button variant={"secondary"} onClick={onOpen} m={1}>
                  {t("places.hours_modal_button")}
                </Button>
              </Flex>
              <Field name={"modal"}>
                {({ form }: FieldProps) => (
                  <OpenHoursModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onDone={(timepickerValues) => {
                      timepickerValues.forEach((timepicker, i) =>
                        timepicker
                          ? form.setFieldValue(daysOfTheWeek[i], timepicker)
                          : null,
                      );
                    }}
                  />
                )}
              </Field>
            </VStack>
          </Flex>
          <HStack w={"full"} justifyContent={"center"}>
            {activeStep !== 0 ? (
              <Button
                variant={"secondary"}
                onClick={() =>
                  setActiveStep && setActiveStep((activeStep || 0) - 1)
                }
              >
                {t("places.new_place_prev")}
              </Button>
            ) : null}
            <Button
              variant={"secondary"}
              isLoading={props.isSubmitting}
              type="submit"
            >
              {t("places.new_place_next")}
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  );
}
