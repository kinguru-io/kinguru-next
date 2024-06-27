import { getProviders } from "next-auth/react";
import { SigninForm } from "./form";
import { redirect } from "@/navigation";

export default async function SignInUser() {
  const providers = await getProviders();

  if (!providers) {
    return redirect("/");
  }

  return (
    <SigninForm
      providers={Object.values(providers).filter(
        ({ name }) => name !== "Credentials",
      )}
    />
  );
}
