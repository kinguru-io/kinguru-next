"use client";

import Image from "next/image";

export function AvatarImage({ src }: { src: string }) {
  return (
    <Image src={src} onError={addFailedAttribute} alt="" sizes="40px" fill />
  );
}

function addFailedAttribute({
  currentTarget,
}: React.SyntheticEvent<HTMLImageElement>) {
  // due to black/gray border on broken image
  currentTarget.setAttribute("data-failed", "true");
}
