import { AddItemLink } from "@/components/profile";
import { ProfileSectionLayout } from "@/layout/page";
import { redirect } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";

export default async function ProfileVenuePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const venue = await prisma.venue.findUnique({ where: { id } });

  if (!venue) {
    return redirect("/profile/venues");
  }

  return (
    <ProfileSectionLayout>
      <h1 className="heading">{venue.name}</h1>
      <section>
        <AddItemLink
          href={`/profile/venues/${id}/add-premise?venueId=${id}`}
          minHeight="273px"
          borderRadius="27px"
        />
      </section>
    </ProfileSectionLayout>
  );
}
