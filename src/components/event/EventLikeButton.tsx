"use client";
import { useEffect, useState, useTransition } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "../uikit";

type EventImageProps = {
  id: string;
  url: string;
  size: "sm" | "lg" | "md" | "xl";
};

export function EventLikeButton({ id, url, size }: EventImageProps) {
  const [isLike, toggleLike] = useState(false);
  const [isPending, startTransition] = useTransition();

  const getLikeInfo = async () => {
    const res = await fetch(`${url}/api/likedEvents`);
    if (!res) throw new Error();
    const arr = await res.json();

    toggleLike(arr.some(({ eventId }: { eventId: string }) => eventId === id));
  };

  const setOrRemoveLike = () => {
    startTransition(() => {
      void fetch(`${url}/api/likedEvents`, {
        method: "POST",
        body: JSON.stringify({
          eventId: id,
        }),
      });
    });
  };

  useEffect(() => {
    void getLikeInfo();
  }, [isPending, []]);
  return (
    <>
      <Button size={size} onClick={setOrRemoveLike} disabled={isPending}>
        {isLike ? <FaHeart fill="#DC1414" /> : <FaRegHeart />}
      </Button>
    </>
  );
}
