"use client";

import { useEffect, useOptimistic, useState, useTransition } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "../uikit";
import { Box } from "~/styled-system/jsx";
import { token } from "~/styled-system/tokens";

type EventImageProps = {
  id: string;
  getLikedAction: Function;
  createLikeAction: Function;
  deleteLikeAction: Function;
};

export function EventLikeButton({
  id,
  getLikedAction,
  createLikeAction,
  deleteLikeAction,
}: EventImageProps) {
  const [isLike, toggleLike] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [optimisticLike, setOptimisticLike] = useOptimistic(isLike);

  const getLikeInfo = async () => {
    const likedEvents = await getLikedAction();
    toggleLike(
      likedEvents.some(({ eventId }: { eventId: string }) => eventId === id),
    );
  };

  const setOrRemoveLike = async () => {
    startTransition(async () => {
      setOptimisticLike(!isLike);
      if (isLike) {
        await deleteLikeAction(id);
      } else {
        await createLikeAction(id);
      }
      toggleLike(!isLike);
    });
  };

  useEffect(() => {
    void getLikeInfo();
  }, []);

  return (
    <Box fontSize="16px">
      <Button
        size="iconOnly"
        onClick={setOrRemoveLike}
        disabled={isPending}
        icon={
          optimisticLike ? (
            <FaHeart fill={token("colors.red.1")} />
          ) : (
            <FaRegHeart />
          )
        }
      />
    </Box>
  );
}
