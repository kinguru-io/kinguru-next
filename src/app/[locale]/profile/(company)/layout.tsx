import { getSession } from "@/auth";
import { redirect } from "@/navigation";

export default async function ProtectedProfileVenuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session?.user?.role !== "organization") {
    return redirect("/profile/edit");
  }

  return <>{children}</>;
}
