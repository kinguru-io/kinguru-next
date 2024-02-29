import { NextRequest } from "next/server";

export const isCredentialsCallback = (
  request: NextRequest,
  params: { nextauth: string[] },
) =>
  params?.nextauth?.includes("callback") &&
  params.nextauth.includes("credentials") &&
  request.method === "POST";
