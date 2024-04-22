"use client";

import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("react-hot-toast").then((module) => module.Toaster),
  { ssr: false },
);

export { Toaster };
