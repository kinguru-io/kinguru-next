"use client";
import { useEffect, useState, useTransition } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "../uikit";
import { getLikedEvent } from "@/lib/actions/likedEvent/getLikedEvents";
import { toggleLikeEvent } from "@/lib/actions/likedEvent/toggleLike";
import { Box } from "~/styled-system/jsx";

type EventImageProps = {
  id: string;
};

export function EventLikeButton({ id }: EventImageProps) {
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
    <Box fontSize="16px">
      <Button size="iconOnly" onClick={setOrRemoveLike} disabled={isPending}>
        {isLike ? <FaHeart fill="#DC1414" /> : <FaRegHeart />}
      </Button>
    </Box>
  );
}
