import { getSession } from "@/auth";
import { redirect } from "@/navigation";

export default async function ProtectedProfileVenuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const organization = session?.user?.organizations.at(0);

  // redirect if user haven't completed company profile registration
  if (!organization) {
    redirect("/profile/venues");
  }

  return <>{children}</>;
}
