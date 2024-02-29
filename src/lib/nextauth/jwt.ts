import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { decode, encode, JWTOptions } from "next-auth/jwt";
import { isCredentialsCallback } from "@/lib/nextauth/helpers.ts";

export const jwt = (request: NextRequest, params: { nextauth: string[] }) =>
  ({
    maxAge: 60 * 60 * 24 * 30,
    encode: async (arg) => {
      if (isCredentialsCallback(request, params)) {
        const cookie = cookies().get("next-auth.session-token");

        if (cookie) return cookie.value;
        return "";
      }

      return encode(arg);
    },
    decode: async (arg) => {
      if (isCredentialsCallback(request, params)) {
        return null;
      }
      return decode(arg);
    },
  }) as Partial<JWTOptions>;
