import { SigninForm } from "./form";
import { revalidateAll } from "@/lib/actions";

export default async function CompanySignInPage() {
  return <SigninForm revalidateAll={revalidateAll} />;
}
