import { isUserOrganization } from "@/lib/utils/premise-booking";

export default async function EditProfileLayout({
  user,
  company,
}: {
  user: React.ReactNode;
  company: React.ReactNode;
}) {
  const isUserOrg = await isUserOrganization();

  return <>{isUserOrg ? company : user}</>;
}
