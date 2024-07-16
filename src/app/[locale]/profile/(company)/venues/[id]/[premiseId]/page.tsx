import { EditPremiseForm } from "./form";
import { getSession } from "@/auth";
import { editPremiseAction } from "@/lib/actions/premise";
import { redirect } from "@/navigation";
import prisma from "@/server/prisma";

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
    <>
      <h1 className="main-heading">{premise.name}</h1>
      <section>
        <EditPremiseForm editPremise={editPremiseAction} premise={premise} />
      </section>
    </>
  );
}
