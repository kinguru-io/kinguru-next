import { SignUpHelper } from "@/components/sign-up";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <SignUpHelper />
    </>
  );
}
