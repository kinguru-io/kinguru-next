import { rule, shield } from "trpc-shield";
import { Context } from "./context";

export const isAuthenticated = rule<Context>()(async (ctx) => {
  return ctx.session?.user !== undefined;
});

export const isAdmin = rule<Context>()(async (ctx) => {
  return ctx.session?.user?.role === "admin";
});

export const permissions = shield<Context>({
  query: {},
  mutation: {},
});
