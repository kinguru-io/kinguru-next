import {
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { usePresignedUpload } from "next-s3-upload";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ChakraTagInput from "@/components/common/form/tag";

export const EventDetailsSchema = z.object({
  topic: z.string(),
  description: z.string().min(40).max(2048),
  tags: z.array(z.string()).optional(),
  price: z.number().min(20),
  poster: z.string().url(),
});

export function NewEventDetails({
  details,
  setDetails,
  activeStep,
  setActiveStep,
}: {
  details?: z.infer<typeof EventDetailsSchema>;
  setDetails?: Dispatch<
    SetStateAction<z.infer<typeof EventDetailsSchema> | undefined>
  >;
  activeStep?: number;
  setActiveStep?: Dispatch<SetStateAction<number>>;
}) {
  const t = useTranslations();
  const { FileInput, openFileDialog, uploadToS3, files } = usePresignedUpload();

  return (
    <Formik
      initialValues={
        details || {
          topic: "",
          description: "",
          tags: [],
          price: 20,
          poster: "",
        }
      }
      validationSchema={toFormikValidationSchema(EventDetailsSchema)}
      onSubmit={(values, actions) => {
        setActiveStep && setActiveStep((activeStep || 0) + 1);
        setDetails && setDetails(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Flex w={"full"} py={10} flexDirection={["column", "column", "row"]}>
            <VStack w={["full", "full", "50%"]} px={5}>
              <Field name="topic">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.topic?.length &&
                      form.touched.topic !== undefined
                    }
                  >
                    <FormLabel>{t("events.new_event_topic")}</FormLabel>
                    <Input variant={"brand"} {...field} />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="description">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.description?.length &&
                      form.touched.description !== undefined
                    }
                  >
                    <FormLabel>{t("events.new_event_description")}</FormLabel>
                    <Textarea variant={"brand"} {...field} />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="tags">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.tags?.length &&
                      form.touched.tags !== undefined
                    }
                  >
                    <FormLabel>{t("events.new_event_tags")}</FormLabel>
                    <ChakraTagInput
                      tags={field.value}
                      variant={"brand"}
                      onTagsChange={(e: SyntheticEvent, tags) =>
                        field.onChange(
                          Object.assign(e, {
                            target: {
                              name: "tags",
                              value: tags,
                            },
                          }),
                        )
                      }
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="price">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.price?.length &&
                      form.touched.price !== undefined
                    }
                  >
                    <FormLabel>{t("events.new_event_ticket_price")}</FormLabel>
                    <HStack maxW="320px">
                      <Button
                        onClick={() =>
                          field.onChange({
                            target: {
                              name: "price",
                              value: field.value + 1,
                            },
                          })
                        }
                      >
                        <BiPlus size={36} />
                      </Button>
                      <Input type={"number"} variant={"brand"} {...field} />
                      <Button
                        onClick={() =>
                          field.onChange({
                            target: {
                              name: "price",
                              value: field.value - 1,
                            },
                          })
                        }
                      >
                        <BiMinus size={36} />
                      </Button>
                    </HStack>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </VStack>
            <Center>
              <Divider orientation="vertical" />
            </Center>
            <VStack w={["full", "full", "50%"]} px={5} pt={[5, 5, 0]}>
              <Field name="poster">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    display={"flex"}
                    w={"full"}
                    h={"full"}
                    bgColor={"gray.50"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    p={5}
                    isInvalid={
                      !!form.errors.poster?.length &&
                      form.touched.poster !== undefined
                    }
                  >
                    <FileInput
                      onChange={async (file: any) => {
                        const { url } = await uploadToS3(file);
                        field.onChange({
                          target: {
                            name: "poster",
                            value: url,
                          },
                        });
                      }}
                    />
                    {field.value && (
                      <Image
                        maxWidth={"320px"}
                        backgroundColor={"white"}
                        src={field.value}
                        p={5}
                        border={"1px solid"}
                        borderColor={"gray.100"}
                        mb={5}
                      />
                    )}
                    <Button
                      variant={"secondary"}
                      isLoading={
                        !!files.filter((file) => file.size !== file.uploaded)
                          .length
                      }
                      onClick={openFileDialog}
                    >
                      {t("events.new_event_select_poster")}
                    </Button>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
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
                {t("events.new_event_prev")}
              </Button>
            ) : null}
            <Button
              variant={"secondary"}
              isLoading={props.isSubmitting}
              type="submit"
            >
              {t("events.new_event_next")}
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  );
}
