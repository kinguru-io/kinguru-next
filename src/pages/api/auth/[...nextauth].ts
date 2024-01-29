import NextAuth from "next-auth";
import { authOptions } from "@/auth.ts";

export default NextAuth(authOptions);
