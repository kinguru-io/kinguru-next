import { DayOfTheWeek } from "@prisma/client";
import moment from "moment";
import { z } from "zod";
import { publicProcedure, t } from "../trpc";
import {
  PlaceFeaturesSchema,
  PlaceGeneralSchema,
  PlaceLocationSchema,
  PlaceOpenHoursSchema,
  PlacePricingSchema,
  PlaceResourcesSchema,
} from "@/components/places/create";

export const placesRouter = t.router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.place.findMany({
      include: {
        resources: true,
      },
    });
  }),
  get: publicProcedure
    .input(
      z.object({
        placeId: z.string(),
      }),
    )
    .query(({ ctx, input: { placeId } }) => {
      return ctx.prisma.place.findUnique({
        where: {
          id: placeId,
        },
        include: {
          resources: true,
        },
      });
    }),
  createPlace: publicProcedure
    .input(
      z.object({
        general: PlaceGeneralSchema,
        features: PlaceFeaturesSchema,
        location: PlaceLocationSchema,
        openHours: PlaceOpenHoursSchema,
        resources: PlaceResourcesSchema,
        pricing: PlacePricingSchema,
      }),
    )
    .mutation(
      ({
        ctx,
        input: {
          general: {
            typeOfPremises,
            title,
            description,
            rules,
            area,
            minCapacity,
            maxCapacity,
            ageRestrictions: { value: ageRestrictions },
          },
          features: {
            parkingArea,
            cameraOrAudioRecording,
            doesPremisesHaveWifi,
            wifiLogin,
            wifiPassword,
            amenities,
          },
          location: { locationMapboxId, billingMapboxId, routeToPremises },
          openHours,
          resources: { resources },
          pricing: { rentalPriceByHour, cleaningFeePrice },
        },
      }) => {
        return ctx.prisma.place.create({
          data: {
            typeOfPremises: typeOfPremises.map(({ value }) => value),
            title,
            description,
            rules,
            area,
            minCapacity,
            maxCapacity,
            ageRestrictions,
            parkingArea: parkingArea.map(({ value }) => value),
            cameraOrAudioRecording,
            hasWifi: doesPremisesHaveWifi,
            wifiLogin,
            wifiPassword,
            amenities: amenities.map(({ value }) => value),
            locationMapboxId,
            billingMapboxId,
            routeToPremises,
            rentalPriceByHour,
            cleaningFeePrice,
            ownerId: ctx.session!.user!.id,
            location: "123",
            coordsLat: 0,
            coordsLng: 0,
            openingHours: {
              createMany: {
                data: Object.keys(openHours)
                  .map((key) => openHours[key as DayOfTheWeek])
                  .filter((value) => value !== undefined)
                  .map(
                    (day, index) =>
                      day?.map((value) => ({
                        openTime: moment(value.start, "HH:mm").toDate(),
                        closeTime: moment(value.end, "HH:mm").toDate(),
                        day: Object.keys(DayOfTheWeek)[index] as DayOfTheWeek,
                      })) as {
                        openTime: Date;
                        closeTime: Date;
                        day: DayOfTheWeek;
                      }[],
                  )
                  .flat(),
              },
            },
            resources: {
              createMany: {
                data: resources,
              },
            },
          },
        });
      },
    ),
});
