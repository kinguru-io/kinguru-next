/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import {
  $Enums,
  PrismaClient,
  type Organization,
  type Prisma,
} from "@prisma/client";
import { slugifyWithCounter } from "@sindresorhus/slugify";
import { ageRestrictionList } from "../src/lib/shared/config/age-restriction";
import { amenitiesTags } from "../src/lib/shared/config/amenities";
import { bookingCancelTerms } from "../src/lib/shared/config/booking-cancel-terms";
import { premiseTypes } from "../src/lib/shared/config/premise-types";

const dayOfTheWeek = Object.values($Enums.DayOfTheWeek);
const allAmenities = Object.values(amenitiesTags).flat();
const prisma = new PrismaClient();

const cafeMapboxIds = [
  "dXJuOm1ieGFkcjo2ZDczYjM3Ny01NDhiLTRlODEtOGExZC1iZDllOWQyOWFmN2E",
  "dXJuOm1ieHBvaTowYjJiNTE0OC0zMWM4LTRmY2QtODdkZi1kYzMyMGJkOTRkMTg",
  "dXJuOm1ieHBvaTpjMmFjYjY4Ni1jMDdmLTRmNDMtOTFlOC0xNDA3YzY3ZGRhOTQ",
  "dXJuOm1ieHBvaTozOWMyMDQwNi00ZjQ1LTQ3N2ItOWIzOS1mODdkM2I0YTg4ZTM",
] as const;
const ROOM_WORD_SYNONYMS = [
  "room",
  "hall",
  "place",
  "area",
  "territory",
  "space",
  "dwelling",
] as const;

function getImage() {
  return faker.image.urlLoremFlickr({
    width: 1280,
    height: 720,
    category: "hall",
  });
}

const slugifyVenueNameWithCounter = slugifyWithCounter();

const venueSchema = (
  organizationId: Organization["id"],
): Prisma.VenueCreateManyInput => {
  const name = faker.company.name();

  return {
    name,
    slug: slugifyVenueNameWithCounter(name),
    image: getImage(),
    description: faker.lorem.paragraph(30),
    organizationId,
    locationMapboxId: faker.helpers.arrayElement(cafeMapboxIds),
    locationTutorial: faker.lorem.paragraphs({ min: 2, max: 4 }),
    featureCCTV: Math.random() < 0.5,
    featureParking: Math.random() < 0.5,
    featureAge: faker.helpers.arrayElement(ageRestrictionList),
  };
};

const premiseOpenHoursSchema = (idx: number) => {
  const price = faker.number.float({
    min: 2,
    max: 200,
    fractionDigits: 2,
  });

  return Math.random() > 0.5
    ? ([
        {
          day: dayOfTheWeek[idx],
          openTime: "1970-01-01T06:00:00.000Z",
          closeTime: "1970-01-01T20:00:00.000Z",
          price,
        },
      ] as Prisma.PremiseOpenHoursCreateInput[])
    : ([
        {
          day: dayOfTheWeek[idx],
          openTime: "1970-01-01T06:00:00.000Z",
          closeTime: "1970-01-01T11:00:00.000Z",
          price,
        },
        {
          day: dayOfTheWeek[idx],
          openTime: "1970-01-01T12:00:00.000Z",
          closeTime: "1970-01-01T20:00:00.000Z",
          price: price + faker.number.int({ min: 10, max: 100 }),
        },
      ] as Prisma.PremiseOpenHoursCreateInput[]);
};

const slugifyPremiseNameWithCounter = slugifyWithCounter();

const premiseSchemaWithVenueConnection = (
  venueId: string,
): Prisma.PremiseCreateInput => {
  const name = `${faker.commerce.department()} ${faker.helpers.arrayElement(ROOM_WORD_SYNONYMS)}`;
  return {
    name: name,
    slug: slugifyPremiseNameWithCounter(name),
    description: faker.lorem.paragraph(5),
    room: `${faker.number.int({ min: 1, max: 1000 })}`,
    floor: `${faker.number.int({ min: 0, max: 128 })}`,
    type: faker.helpers.arrayElement(premiseTypes),
    capacity: faker.number.int({ min: 3, max: 200 }),
    area: faker.number.float({ min: 15, max: 100, fractionDigits: 1 }),
    amenities: faker.helpers.arrayElements(allAmenities, {
      min: 5,
      max: allAmenities.length,
    }),
    direction: faker.lorem.paragraph(5),
    rules: faker.lorem.paragraph(5),
    bookingCancelTerm: faker.helpers.arrayElement(bookingCancelTerms),
    venue: {
      connect: {
        id: venueId,
      },
    },
    resources: {
      createMany: {
        data: Array.from({ length: 5 }, () => ({ url: getImage() })),
      },
    },
    openHours: {
      createMany: {
        data: Array.from(
          // * simulates a situation when a premise doesn't have working hours on saturday, sunday or both
          { length: 7 },
          (_, idx) => premiseOpenHoursSchema(idx),
        ).flat(),
      },
    },
  };
};

async function main() {
  // * ------------------------------------ Venues START
  const createdOrganizations = await prisma.organization.findMany({
    select: { id: true },
  });
  console.log(`* ${createdOrganizations.length} Organization records found`);

  (
    await Promise.allSettled(
      Array.from({ length: 2 }, () =>
        prisma.venue.create({
          data: {
            ...venueSchema(faker.helpers.arrayElement(createdOrganizations).id),
            manager: {
              createMany: {
                data: [
                  {
                    firstname: faker.person.firstName(),
                    lastname: faker.person.lastName(),
                    email: faker.internet.email(),
                    phoneNumber: faker.phone.number(),
                  },
                ],
              },
            },
          },
        }),
      ),
    )
  ).forEach((result) => {
    if (result.status === "rejected") {
      console.log(result);
    }
  });

  const createdVenues = await prisma.venue.findMany();
  console.log(`* ${createdVenues.length} Venue records found`);

  const premisesData = createdVenues.reduce((acc, { id }) => {
    const premiseCount = faker.number.int({ min: 1, max: 6 });

    for (let i = 1; i <= premiseCount; i++) {
      acc.push(premiseSchemaWithVenueConnection(id));
    }

    return acc;
  }, [] as Prisma.PremiseCreateInput[]);
  console.log(`* ${premisesData.length} Premise records should be generated`);

  (
    await Promise.allSettled(
      // Premises creation and connection with Venues
      premisesData.map((data) => prisma.premise.create({ data })),
    )
  ).forEach((result) => {
    if (result.status === "rejected") {
      console.log(result);
    }
  });
  // * ------------------------------------ Venues END
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
