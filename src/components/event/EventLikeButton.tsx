"use client";

import { useEffect, useOptimistic, useState, useTransition } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "../uikit";
import { Box } from "~/styled-system/jsx";
import { token } from "~/styled-system/tokens";

type EventImageProps = {
  id: string;
  isLikedAction: Function;
  createLikeAction: Function;
  deleteLikeAction: Function;
  likeTranslate: string;
  dislikeTranslate: string;
};

export function EventLikeButton({
  id,
  isLikedAction,
  createLikeAction,
  deleteLikeAction,
  likeTranslate,
  dislikeTranslate,
}: EventImageProps) {
  const [isLike, setLike] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [optimisticLike, setOptimisticLike] = useOptimistic(isLike);

  const getLikeInfo = async () => {
    setLike(await isLikedAction(id));
  };

  const toggleLike = async () => {
    startTransition(async () => {
      setOptimisticLike(!isLike);
      if (isLike) {
        await deleteLikeAction(id);
      } else {
        await createLikeAction(id);
      }
      setLike(!isLike);
    });
  };

  useEffect(() => {
    void getLikeInfo();
  }, []);

  return (
    <Box fontSize="16px">
      <Button
        size="iconOnly"
        onClick={toggleLike}
        disabled={isPending}
        icon={
          optimisticLike ? (
            <FaHeart fill={token("colors.red.1")} />
          ) : (
            <FaRegHeart />
          )
        }
      >
        {optimisticLike ? dislikeTranslate : likeTranslate}
      </Button>
    </Box>
  );
}
