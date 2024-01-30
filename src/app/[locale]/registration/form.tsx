"use client";
import { FormEvent } from "react";

export default function form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = new FormData(e.currentTarget);
    await fetch("/api/auth-organization/registration/", {
      method: "POST",
      body: JSON.stringify({
        name: credentials.get("name"),
        foundationDate: credentials.get("foundationDate"),
        requisitesUrl: credentials.get("requisitesUrl"),
        aboutCompany: credentials.get("aboutCompany"),
        activitySphere: credentials.get("activitySphere"),
        logotype: credentials.get("logotype"),
        email: credentials.get("email"),
        password: credentials.get("password"),
      }),
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
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        required
        id="name"
        style={{ border: "2px solid black" }}
      />
      <label htmlFor="foundationDate">foundationDate</label>
      <input
        type="date"
        name="foundationDate"
        id="foundationDate"
        required
        style={{ border: "2px solid black" }}
      />
      <label htmlFor="requisitesUrl">requisitesUrl</label>
      <input
        type="text"
        name="requisitesUrl"
        id="requisitesUrl"
        required
        style={{ border: "2px solid black" }}
      />
      <label htmlFor="aboutCompany">aboutCompany</label>
      <input
        type="text"
        name="aboutCompany"
        id="aboutCompany"
        required
        style={{ border: "2px solid black" }}
      />
      <label htmlFor="activitySphere">activitySphere</label>
      <input
        type="text"
        name="activitySphere"
        id="activitySphere"
        style={{ border: "2px solid black" }}
        required
      />
      <label htmlFor="logotype">logotype</label>
      <input
        type="text"
        name="logotype"
        id="logotype"
        style={{ border: "2px solid black" }}
      />
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
