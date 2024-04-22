import type { PurchaseNotification } from "@prisma/client";
import { format } from "date-fns";
import { Tag } from "@/components/uikit";
import { VStack } from "~/styled-system/jsx";

export function ProfileNotifications({
  notifications,
}: {
  notifications: PurchaseNotification[];
}) {
  return (
    <VStack gap="5px" alignItems="stretch">
      {notifications.map(({ id, status, createdAt }) => (
        <Tag
          key={id}
          size="sm"
          variant="secondaryLighter"
          textStyle="body.2"
          fontWeight="400"
        >
          {format(createdAt, "dd.MM.yyyy")} | {status}
        </Tag>
      ))}
    </VStack>
  );
}
