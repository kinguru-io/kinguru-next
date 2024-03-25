/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { $Enums, PremiseOpenHours, Prisma, PrismaClient } from "@prisma/client";
import slugify from "@sindresorhus/slugify";
import { addHours } from "date-fns";

const dayOfTheWeek = Object.values($Enums.DayOfTheWeek);
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
] as const;

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
});

const venueSchema = (): Prisma.VenueCreateInput => {
  const name = faker.company.name();

  return {
    name,
    slug: slugify(name),
    image: faker.image.urlLoremFlickr({
      width: 1280,
      height: 720,
    }),
    description: faker.lorem.paragraph(30),
    locationMapboxId: faker.helpers.arrayElement(cafeMapboxIds),
  };
};

const premiseOpenHoursPricingSchema = ({
  id,
  openTime,
  closeTime,
}: PremiseOpenHours) =>
  Math.random() > 0.5
    ? ([
        {
          premiseOpenHours: { connect: { id } },
          priceForHour: faker.number.float({
            min: 0,
            max: 30,
            fractionDigits: 2,
          }),
          startTime: openTime,
          endTime: closeTime,
        },
      ] as Prisma.PremisePricingCreateInput[])
    : ([
        {
          premiseOpenHours: { connect: { id } },
          priceForHour: faker.number.float({
            min: 0,
            max: 30,
            fractionDigits: 2,
          }),
          startTime: openTime,
          endTime: addHours(openTime, 2),
        },
        {
          premiseOpenHours: { connect: { id } },
          priceForHour: faker.number.float({
            min: 0,
            max: 30,
            fractionDigits: 2,
          }),
          startTime: addHours(openTime, 2),
          endTime: closeTime,
        },
      ] as Prisma.PremisePricingCreateInput[]);

const premiseOpenHoursSchema = (idx: number) => {
  return Math.random() > 0.5
    ? ([
        {
          day: dayOfTheWeek[idx],
          openTime: "2020-01-01T06:00:00.000Z",
          closeTime: "2020-01-01T20:00:00.000Z",
        },
      ] as Prisma.PremiseOpenHoursCreateInput[])
    : ([
        {
          day: dayOfTheWeek[idx],
          openTime: "2020-01-01T06:00:00.000Z",
          closeTime: "2020-01-01T11:00:00.000Z",
        },
        {
          day: dayOfTheWeek[idx],
          openTime: "2020-01-01T12:00:00.000Z",
          closeTime: "2020-01-01T20:00:00.000Z",
        },
      ] as Prisma.PremiseOpenHoursCreateInput[]);
};
const premiseSchemaWithVenueConnection = (
  venueId: string,
): Prisma.PremiseCreateInput => {
  const name = `${faker.commerce.department()} ${faker.helpers.arrayElement(ROOM_WORD_SYNONYMS)}`;
  return {
    name: name,
    slug: slugify(name),
    description: faker.lorem.paragraph(5),
    area: faker.number.float({ min: 15, max: 100, fractionDigits: 1 }),
    amenities: faker.helpers.arrayElements(
      [
        "Wi-FI",
        "Экран проекционный",
        "Микрофон",
        "Колонки",
        "Маркеры",
        "Флипчарт",
        "Wi-FI",
        "Экран проекционный",
        "Микрофон",
        "Колонки",
        "Маркеры",
        "Флипчарт",
      ],
      { min: 3, max: 12 },
    ),
    direction: faker.lorem.paragraph(5),
    rules: faker.lorem.paragraph(5),
    bookingCancelTerm: faker.lorem.paragraph(5),
    venue: {
      connect: {
        id: venueId,
      },
    },
    resources: {
      createMany: {
        data: Array.from({ length: 5 }, () => ({
          url: faker.image.urlLoremFlickr({ width: 1280, height: 720 }),
        })),
      },
    },
    openHours: {
      createMany: {
        data: Array.from(
          // * simluates a sitatuion when a premise doesn't have working hours on saturday, sunday or both
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
        price: parseFloat(faker.finance.amount(0, 20)),
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
                    owner: {
                      create: userSchema(),
                    },
                    foundationDate: faker.date.past(),
                    requisitesUrl: faker.internet.url(),
                    aboutCompany: faker.company.catchPhrase(),
                    activitySphere: faker.company.buzzPhrase().split(" "),
                    logotype: faker.image.avatar(),
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
  (
    await Promise.allSettled(
      Array.from({ length: 15 }, () =>
        prisma.venue.create({ data: venueSchema() }),
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

  const allOpenHours = await prisma.premiseOpenHours.findMany();
  console.log(`* ${allOpenHours.length} PremiseOpenHours records found`);

  const pricingData = allOpenHours
    .reduce((acc, openHoursRecord) => {
      acc.push(premiseOpenHoursPricingSchema(openHoursRecord));

      return acc;
    }, [] as Prisma.PremisePricingCreateInput[][])
    .flat();
  console.log(
    `* ${pricingData.length} PremisePricing records should be generated`,
  );

  (
    await Promise.allSettled(
      // PremisePricing creation and connection with PremiseOpenHours
      pricingData.map((data) => prisma.premisePricing.create({ data })),
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
