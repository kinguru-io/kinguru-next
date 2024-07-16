import { getTranslations } from "next-intl/server";
import { AddPremiseForm } from "./form";
import { getSession } from "@/auth";
import { createPremiseAction } from "@/lib/actions/premise";
import { redirect } from "@/navigation";
import prisma from "@/server/prisma";

export default async function AddPremisePage({
  params: { id: venueId },
}: {
  params: { id?: string };
}) {
  if (!venueId) {
    return redirect("/profile/venues");
  }

  const session = await getSession();

  const organization = session?.user?.organizations.at(0);

  const venue = await prisma.venue.findUnique({
    where: { id: venueId, organizationId: organization?.id },
    select: { id: true },
  });

  if (!venue) {
    return redirect("/profile/venues");
  }

  const t = await getTranslations("profile.premises.add");

  return (
    <>
      <h1 className="main-heading">{t("heading")}</h1>
      <AddPremiseForm
        createPremiseAction={createPremiseAction}
        venueId={venue.id}
      />
    </>
  );
}
