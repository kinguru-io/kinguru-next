import { useTranslations } from "next-intl";
import { Button, Icon } from "@/components/uikit";
import { useRouter } from "@/navigation";

export function CloseMapButton({ variant }: { variant: "labeled" | "icon" }) {
  const t = useTranslations("search_map");
  const router = useRouter();

  const label = t("close_map");

  return (
    <Button
      type="button"
      colorPalette="dark"
      onClick={router.back}
      aria-label={variant === "icon" ? label : undefined}
    >
      {variant === "icon" ? <Icon name="action/cross" /> : label}
    </Button>
  );
}
