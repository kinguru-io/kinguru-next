import type { Prisma } from "@prisma/client";
import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
} from "next/types";
import { Link } from "@/navigation";
import prisma from "@/server/prisma";
import { Center } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

type VenueLinkData = Pick<Prisma.VenueUncheckedCreateInput, "id" | "name">;

export const getServerSideProps = (async () => {
  const venues = await prisma.venue.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return { props: { venues } };
}) satisfies GetServerSideProps<{ venues: VenueLinkData[] }>;

export default function Places({
  venues,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Center flexDirection="column">
      {venues.map(({ id, name }) => (
        <Link className={button()} key={id} href={`/venue/${id}`}>
          {name}
        </Link>
      ))}
    </Center>
  );
}
