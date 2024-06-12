/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import {
  $Enums,
  PrismaClient,
  type Organization,
  type Prisma,
  type SocialNetwork,
} from "@prisma/client";
import slugify, { slugifyWithCounter } from "@sindresorhus/slugify";
import { ageRestrictionList } from "../src/lib/shared/config/age-restriction";
import { amenitiesTags } from "../src/lib/shared/config/amenities";
import { bookingCancelTerms } from "../src/lib/shared/config/booking-cancel-terms";
import { premiseTypes } from "../src/lib/shared/config/premise-types";

const dayOfTheWeek = Object.values($Enums.DayOfTheWeek);
const allAmenities = Object.values(amenitiesTags).flat();
const prisma = new PrismaClient();

const cafeMapboxIds = [
  "dXJuOm1ieHBsYzpBbnVvdFE",
  "dXJuOm1ieHBvaTo0NzNkNzVmMy1kMzM2LTQ1OGYtODgyZi0xZWNmZjg4YTg2OTA",
  "dXJuOm1ieHBvaTo4YWJkOWY0ZC04MzFjLTQ5ZGItYTMzNy00ZTE5OWU4NTYxNDI",
  "dXJuOm1ieHBsYzpGVUpvdFE",
  "dXJuOm1ieHBvaTphMDgyNzgzMi1iYjVjLTQzOTQtOWY1NC0wZDhlZDQ0YTcyMDE",
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

const fakeSocialLinks: Array<{ network: SocialNetwork; url: string }> = [
  { network: "linkedin", url: "https://linkedin.com/test" },
  { network: "facebook", url: "https://facebook.com/test" },
  {
    network: "instagram",
    url: "https://instagram.com/test",
  },
];

function getImage() {
  return faker.image.urlLoremFlickr({
    width: 1280,
    height: 720,
    category: "random",
  });
}

const userSchema = (): Prisma.UserCreateInput => ({
  email: faker.internet.email(),
  name: faker.person.fullName(),
  image: faker.image.avatar(),
  confirmed: Math.random() > 0.5,
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  description: faker.person.bio(),
  gender: faker.person.sexType(),
  birthdate: faker.date.past(),
  country: faker.location.country(),
  city: faker.location.city(),
  company: faker.company.name(),
  position: faker.person.jobTitle(),
  interests: faker.lorem.words().split(" "),
  socialLinks: {
    createMany: {
      data: faker.helpers.arrayElements(fakeSocialLinks, {
        min: 1,
        max: fakeSocialLinks.length,
      }),
    },
  },
});

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
          { length: faker.number.int({ min: 5, max: 7 }) },
          (_, idx) => premiseOpenHoursSchema(idx),
        ).flat(),
      },
    },
  };
};

const pickUniqueValues = <T>(array: T[], count: number): T[] => {
  return Array.from(
    new Set(
      Array<number>(Math.round(Math.random() * count))
        .fill(0)
        .map(() => Math.round(Math.random() * (array.length - 1))),
    ),
  ).map((index) => array[index]);
};

async function main() {
  const events = new Array(50)
    .fill({})
    .map(
      () =>
        ({
          topic: faker.commerce.productName(),
          description: faker.lorem.paragraph(),
          status: "active",
          starts: faker.date.future(),
          duration: faker.date.future(),
          poster: faker.image.urlLoremFlickr(),
          price: parseFloat(faker.finance.amount({ min: 0, max: 20 })),
          tags: faker.lorem.words().split(" "),
          initiator: {
            create: userSchema(),
          },
          place: {
            create: {
              tel: faker.phone.number(),
              location: faker.location.city(),
              coordsLat: faker.location.latitude(),
              coordsLng: faker.location.longitude(),
              locationMapboxId: faker.helpers.arrayElement(cafeMapboxIds),
              owner: {
                create: userSchema(),
              },
            },
          },
        }) as Prisma.EventCreateInput,
    )
    .map(() => {
      const topic = faker.commerce.productName();
      return {
        topic: topic,
        slug: slugify(topic),
        description: faker.lorem.paragraph(),
        status: "active",
        starts: faker.date.future(),
        duration: faker.date.future(),
        poster: faker.image.urlLoremFlickr(),
        price: parseFloat(faker.finance.amount({ min: 0, max: 20 })),
        tags: faker.lorem.words().split(" "),
        initiator: {
          create: userSchema(),
        },
        place: {
          create: {
            tel: faker.phone.number(),
            location: faker.location.city(),
            coordsLat: faker.location.latitude(),
            coordsLng: faker.location.longitude(),
            locationMapboxId: faker.helpers.arrayElement(cafeMapboxIds),
            owner: {
              create: userSchema(),
            },
          },
        },
      } as Prisma.EventCreateInput;
    })
    .map((event) => {
      return Math.random() > 0.5
        ? event
        : {
            ...event,
            place: {
              create: {
                tel: faker.phone.number(),
                location: faker.location.city(),
                coordsLat: faker.location.latitude(),
                coordsLng: faker.location.longitude(),
                locationMapboxId: faker.helpers.arrayElement(cafeMapboxIds),
                owner: {
                  create: userSchema(),
                },
                organization: {
                  create: {
                    name: faker.company.name(),
                    owner: { create: userSchema() },
                    logotype: faker.image.avatar(),
                    foundationDate: faker.number.int({
                      min: 1900,
                      max: new Date().getFullYear(),
                    }),
                    country: faker.location.country(),
                    city: faker.location.city(),
                    businessName: faker.company.name(),
                    NIP: faker.string.numeric({ length: 10 }),
                    bankName: faker.company.name(),
                    IBAN: faker.finance.iban(),
                    address: {
                      createMany: {
                        data: [
                          {
                            country: faker.location.country(),
                            city: faker.location.city(),
                            street: faker.location.street(),
                            building: faker.location.buildingNumber(),
                            room: faker.string.numeric({
                              length: { min: 0, max: 4 },
                            }),
                            zipCode: faker.location.zipCode(),
                          },
                          {
                            country: faker.location.country(),
                            city: faker.location.city(),
                            street: faker.location.street(),
                            building: faker.location.buildingNumber(),
                            room: faker.string.numeric({
                              length: { min: 0, max: 4 },
                            }),
                            zipCode: faker.location.zipCode(),
                          },
                        ],
                      },
                    },
                    socialLinks: {
                      createMany: {
                        data: faker.helpers.arrayElements(fakeSocialLinks, {
                          min: 1,
                          max: fakeSocialLinks.length,
                        }),
                      },
                    },
                    resources: {
                      createMany: {
                        data: [
                          {
                            url: faker.image.url({ width: 200, height: 100 }),
                          },
                          {
                            url: faker.image.url({ width: 200, height: 100 }),
                          },
                          {
                            url: faker.image.url({ width: 200, height: 100 }),
                          },
                        ],
                      },
                    },
                  },
                },
                resources: {
                  createMany: {
                    data: [
                      {
                        url: faker.image.url({ width: 200, height: 100 }),
                      },
                      {
                        url: faker.image.url({ width: 200, height: 100 }),
                      },
                      {
                        url: faker.image.url({ width: 200, height: 100 }),
                      },
                    ],
                  },
                },
              },
            },
          };
    });

  const eventsCreated = (
    await Promise.allSettled(
      events.map((event) =>
        prisma.event.create({ data: event, include: { place: true } }),
      ),
    )
  )
    .map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      }
      return null;
    })
    .filter((result) => result !== null);

  const placesCreated = eventsCreated
    .filter((eventCreated) => eventCreated != null)
    .map((eventCreated) => eventCreated?.place);

  const users = new Array(20)
    .fill({})
    .map(() => {
      return Math.random() > 0.7
        ? ({
            ...userSchema(),
            speaker: {
              create: {},
            },
          } as Prisma.UserCreateInput)
        : userSchema();
    })
    .map((user) => {
      return Math.random() > 0.3
        ? ({
            ...user,
            participant: {
              create: pickUniqueValues(
                eventsCreated,
                Math.round(Math.random() * eventsCreated.length * 2),
              ).map((unique) => ({
                event: {
                  connect: {
                    id: unique?.id,
                  },
                },
              })),
            },
            speaker: {
              create: {
                participant: {
                  create: pickUniqueValues(
                    eventsCreated,
                    Math.round(Math.random() * (eventsCreated.length - 20)),
                  ).map((unique) => ({
                    event: {
                      connect: {
                        id: unique?.id,
                      },
                    },
                  })),
                },
              },
            },
          } as Prisma.UserCreateInput)
        : user;
    })
    .map((user) => {
      return Math.random() > 0.7
        ? ({
            ...user,
            eventComments: {
              create: pickUniqueValues(
                eventsCreated,
                Math.round(Math.random() * eventsCreated.length * 2),
              ).map((unique) => ({
                event: {
                  connect: {
                    id: unique?.id,
                  },
                },
                message: faker.lorem.paragraph(),
                rating: faker.number.float({ max: 5 }),
              })),
            },
            placeComments: {
              create: pickUniqueValues(
                placesCreated,
                Math.round(Math.random() * placesCreated.length),
              ).map((unique) => ({
                place: {
                  connect: {
                    id: unique?.id,
                  },
                },
                message: faker.lorem.paragraph(),
                rating: faker.number.float({ max: 5 }),
              })),
            },
          } as Prisma.UserCreateInput)
        : user;
    });

  (
    await Promise.allSettled(
      users.map((user) => prisma.user.create({ data: user })),
    )
  ).forEach((result) => {
    if (result.status === "rejected") {
      console.log(result);
    }
  });

  // * ------------------------------------ Venues START
  const createdOrganizations = await prisma.organization.findMany({
    select: { id: true },
  });
  console.log(`* ${createdOrganizations.length} Organization records found`);

  (
    await Promise.allSettled(
      Array.from({ length: 15 }, () =>
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

  const createdUsers = await prisma.user.findMany();
  const speakers = await prisma.speaker.findMany();

  await Promise.allSettled(
    speakers.map((speaker) =>
      prisma.speaker.update({
        where: {
          id: speaker.id,
        },
        data: {
          followers: {
            create: pickUniqueValues(
              createdUsers,
              Math.round(Math.random() * createdUsers.length),
            ).map((user) => ({
              user: {
                connect: {
                  id: user.id,
                },
              },
            })),
          },
        },
      }),
    ),
  );
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
