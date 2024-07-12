import { SignInForm } from "../_sign-in-form/form";
import { revalidateAll } from "@/lib/actions";

export default async function CompanySignInPage() {
  return <SignInForm revalidateAll={revalidateAll} isCompany />;
}
