import { getSession } from "@/auth";
import { redirect } from "@/navigation";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session?.user?.role !== "admin") {
    return redirect("/profile/edit");
  }

  return <>{children}</>;
}
