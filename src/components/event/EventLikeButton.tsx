"use client";

import { useEffect, useOptimistic, useState, useTransition } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "@/components/uikit";
import {
  CreateLikeAction,
  DeleteLikeAction,
  IsLikedAction,
} from "@/lib/actions";
import { Box } from "~/styled-system/jsx";

type EventImageProps = {
  id: string;
  isLikedAction: IsLikedAction;
  createLikeAction: CreateLikeAction;
  deleteLikeAction: DeleteLikeAction;
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
        onClick={toggleLike}
        disabled={isPending}
        icon={optimisticLike ? <FaHeart /> : <FaRegHeart />}
      >
        {optimisticLike ? dislikeTranslate : likeTranslate}
      </Button>
    </Box>
  );
}
