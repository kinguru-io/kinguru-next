import type { PurchaseNotification } from "@prisma/client";
import { format } from "date-fns";
import { Tag } from "@/components/uikit";

export function ProfileNotifications({
  notifications,
}: {
  notifications: PurchaseNotification[];
}) {
  return notifications.map(({ id, status, createdAt }) => (
    <Tag
      key={id}
      size="md"
      variant="secondaryLighter"
      textStyle="body.2"
      fontWeight="400"
    >
      {format(createdAt, "dd.MM.yyyy")} | {status}
    </Tag>
  ));
}
