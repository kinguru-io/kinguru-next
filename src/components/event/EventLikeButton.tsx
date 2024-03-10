"use client";
import { useEffect, useState, useTransition } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "../uikit";
import { getLikedEvent } from "@/lib/actions/likedEvent/getLikedEvents";
import { toggleLikeEvent } from "@/lib/actions/likedEvent/toggleLike";

type EventImageProps = {
  id: string;
  size: "sm" | "lg" | "md" | "xl";
};

export function EventLikeButton({ id, size }: EventImageProps) {
  const [isLike, toggleLike] = useState(false);
  const [isPending, startTransition] = useTransition();

  const getLikeInfo = async () => {
    const likedEvents = await getLikedEvent();
    toggleLike(
      likedEvents.some(({ eventId }: { eventId: string }) => eventId === id),
    );
  };

  const setOrRemoveLike = () => {
    startTransition(async () => {
      await toggleLikeEvent(id);
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
