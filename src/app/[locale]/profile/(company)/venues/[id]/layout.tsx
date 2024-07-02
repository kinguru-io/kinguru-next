import { getSession } from "@/auth.ts";
import { redirect } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";

export default async function ProfileVenueLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id?: string };
}) {
  const session = await getSession();

  const organization = session?.user?.organizations.at(0);

  const venue = await prisma.venue.findUnique({
    where: { id, organizationId: organization?.id },
  });

  if (!venue) {
    redirect("/profile/venues");
  }

  return <>{children}</>;
}
