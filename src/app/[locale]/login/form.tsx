"use client";
import { FormEvent } from "react";
import { signIn } from "@/utils/singInOrganization";

export default function form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = new FormData(e.currentTarget);
    await signIn("credentials", {
      email: credentials.get("email"),
      password: credentials.get("password"),
      redirect: false,
    });
  };
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "300px",
      }}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email">email</label>
      <input
        type="email"
        name="email"
        id="email"
        style={{ border: "2px solid black" }}
        required
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        name="password"
        id="password"
        style={{ border: "2px solid black" }}
        required
      />
      <input
        type="submit"
        value={"Registration"}
        style={{ border: "2px solid black" }}
      />
    </form>
  );
}
