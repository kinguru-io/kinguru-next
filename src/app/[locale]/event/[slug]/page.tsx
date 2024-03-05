"use server";
import { notFound } from "next/navigation";
import { MainInfo } from "./MainInfo";
import prisma from "@/server/prisma";

export default async function EventPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const event = await prisma.event.findFirst({
    where: { slug },
    include: {
      usersOnEvent: { include: { user: true } },
      speakersOnEvent: { include: { speaker: { include: { user: true } } } },
      place: true,
    },
  });

  if (!event) {
    notFound();
  }

  return (
    <>
      <MainInfo event={event} />
    </>
  );
}
