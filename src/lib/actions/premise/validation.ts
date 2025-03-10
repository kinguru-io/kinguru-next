import { z } from "zod";
import {
  ParametersAndAmenitiesFormSchemaProps,
  parametersAndAmenitiesSchema,
} from "./tabs/amenities";
import {
  BookingCancelTermFormSchemaProps,
  bookingCancelTermSchema,
} from "./tabs/bookingCancelTerm";
import {
  MainInformationFormSchemaProps,
  mainInformationSchema,
} from "./tabs/mainInformation";
import {
  OpenHoursAndPriceFormSchemaProps,
  openHoursAndPriceSchema,
} from "./tabs/openHoursAndPrices";
import { ResourcesFormSchemaProps, resourcesSchema } from "./tabs/resources";
import { RulesFormSchemaProps, rulesSchema } from "./tabs/rules";

export enum CreatePremiseFormTypeEnum {
  MainInformation = "mainInformation",
  Resources = "resources",
  ParametersAndAmenities = "parametersAndAmenities",
  OpenHoursAndPrice = "openHoursAndPrice",
  Rules = "rules",
  BookingCancelTerm = "bookingCancelTerm",
}

export const createPremiseFormSchema = (t: (arg: string) => string) =>
  z.discriminatedUnion("formType", [
    z.object({
      formType: z.literal(CreatePremiseFormTypeEnum.MainInformation),
      mainInformation: mainInformationSchema(t),
    }),
    z.object({
      formType: z.literal(CreatePremiseFormTypeEnum.Resources),
      resources: resourcesSchema(t),
    }),
    z.object({
      formType: z.literal(CreatePremiseFormTypeEnum.ParametersAndAmenities),
      parametersAndAmenities: parametersAndAmenitiesSchema(t),
    }),
    z.object({
      formType: z.literal(CreatePremiseFormTypeEnum.OpenHoursAndPrice),
      openHoursAndPrice: openHoursAndPriceSchema(t),
    }),
    z.object({
      formType: z.literal(CreatePremiseFormTypeEnum.Rules),
      rules: rulesSchema(t),
    }),
    z.object({
      formType: z.literal(CreatePremiseFormTypeEnum.BookingCancelTerm),
      bookingCancelTerm: bookingCancelTermSchema(t),
    }),
  ]);

export type CreatePremiseFormSchemaProps = {
  formType: CreatePremiseFormTypeEnum;
  mainInformation: MainInformationFormSchemaProps;
  resources: ResourcesFormSchemaProps;
  parametersAndAmenities: ParametersAndAmenitiesFormSchemaProps;
  openHoursAndPrice: OpenHoursAndPriceFormSchemaProps;
  rules: RulesFormSchemaProps;
  bookingCancelTerm: BookingCancelTermFormSchemaProps;
};

export const mergedSchema = mainInformationSchema()
  .merge(resourcesSchema()) // Use merge instead of shape
  .merge(parametersAndAmenitiesSchema()) // Merge schemas
  .merge(openHoursAndPriceSchema().innerType()) // Merge openHoursAndPrice schema
  .merge(rulesSchema()) // Merge rules schema
  .merge(bookingCancelTermSchema()); // Merge bookingCancelTerm schema

export type MergedFormSchemaProps = z.infer<typeof mergedSchema>;
