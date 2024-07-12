import { EditUserProfileForm } from "./form";
import { getSession } from "@/auth";
import { updateUserProfile } from "@/lib/actions";
import { redirect } from "@/navigation";
import prisma from "@/server/prisma";

export default async function EditUserPage() {
  const session = await getSession();

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id || "" },
    include: { socialLinks: { select: { network: true, url: true } } },
  });

  if (!user) {
    return redirect("/auth/signin");
  }

  return (
    <EditUserProfileForm userData={user} updateProfile={updateUserProfile} />
  );
}
