import { getSession } from "@/auth";

export default async function EditProfileLayout({
  user,
  company,
}: {
  user: React.ReactNode;
  company: React.ReactNode;
}) {
  const session = await getSession();

  return <>{session?.user?.role === "organization" ? company : user}</>;
}
