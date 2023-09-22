// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

const pickUniqueValues = <T>(array: T[], count: number): T[] => {
  return Array.from(
    new Set(
      Array<number>(Math.round(Math.random() * count))
        .fill(0)
        .map(() => Math.round(Math.random() * (array.length - 1))),
    ),
  ).map((index) => array[index]);
};

// @ts-ignore
async function main() {
  const events = new Array(1000)
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
              owner: {
                create: userSchema(),
              },
            },
          },
        }) as Prisma.EventCreateInput,
    )
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
                owner: {
                  create: userSchema(),
                },
                organization: {
                  create: {
                    name: faker.company.name(),
                  },
                },
                resources: {
                  create: {
                    url: faker.image.url({ width: 200, height: 100 }),
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
                Math.round(Math.random() * eventsCreated.length),
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
                    Math.round(Math.random() * (eventsCreated.length - 400)),
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
                Math.round(Math.random() * eventsCreated.length),
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
  )
    .filter((result) => result.status === "rejected")
    .forEach(console.log);
}
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

(async function () {
  const users = await prisma.user.findMany();
  return prisma.eventComment.createMany({
    data: users.map((user) => ({
      eventId: "clmunmlcn00004l6c1m1vukfa",
      userId: user.id,
      message: faker.lorem.paragraph(),
    })),
    skipDuplicates: true,
  });
})()
  .then(console.log)
  .catch(console.log);
