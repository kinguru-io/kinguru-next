import { AuthContainer } from "@/components/auth-page";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthContainer>{children}</AuthContainer>;
}
