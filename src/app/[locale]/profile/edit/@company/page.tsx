import { EditProfileForm } from "./form";
import { getSession } from "@/auth";
import { orgRegister } from "@/lib/actions";
import { redirect } from "@/navigation";

export default async function EditCompanyPage() {
  const session = await getSession();
  if (session?.user?.role !== "organization") {
    redirect("/");
  }
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    include: {
      organizations: { include: { socialLinks: true, address: true } },
    },
  });

  if (!user) {
    return redirect("/");
  }

  const organizationData = user.organizations.at(0);
  const companyName = organizationData?.name || user.company || "";

  return (
    <EditProfileForm
      companyName={companyName}
      companyData={organizationData}
      orgRegister={orgRegister}
    />
  );
}
