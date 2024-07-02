import { EditPremiseForm } from "./form";
import { getSession } from "@/auth.ts";
import { ProfileSectionLayout } from "@/layout/page";
import { editPremiseAction } from "@/lib/actions/premise";
import { redirect } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";

export default async function EditPremisePage({
  params: { id: venueId, premiseId },
}: {
  params: { id?: string; premiseId?: string };
}) {
  if (!venueId || !premiseId) {
    return redirect("/profile/venues");
  }

  const session = await getSession();
  const organization = session?.user?.organizations.at(0);
  const venue = await prisma.venue.findUnique({
    where: {
      id: venueId,
      organizationId: organization?.id,
    },
    include: {
      premises: {
        where: { id: premiseId },
        include: {
          discounts: true,
          openHours: true,
          resources: true,
        },
      },
    },
  });

  if (!venue) {
    return redirect("/profile/venues");
  }

  const premise = venue.premises.at(0);

  if (!premise) {
    return redirect(`/profile/venues/${venue.id}`);
  }

  return (
    <ProfileSectionLayout>
      <h1 className="heading">{premise.name}</h1>
      <section>
        <EditPremiseForm
          editPremise={editPremiseAction}
          mapboxId={venue.locationMapboxId}
          premise={premise}
        />
      </section>
    </ProfileSectionLayout>
  );
}
