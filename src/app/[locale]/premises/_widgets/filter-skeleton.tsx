import { Button, Filter, FilterGroup, Icon } from "@/components/uikit";
import { css } from "~/styled-system/css";

export function FilterSkeleton() {
  return (
    <div
      className={css({
        "& > :first-child": { width: "full", md: { display: "none" } },
        "& > :last-child": { mdDown: { display: "none" } },
      })}
      aria-busy
    >
      <Button
        colorPalette="secondary"
        icon={
          <Icon name="common/settings" className={css({ fontSize: "xl" })} />
        }
        isLoading
      >
        ...
      </Button>
      <Filter heading="...">
        <FilterGroup heading="...">...</FilterGroup>
        <FilterGroup heading="...">...</FilterGroup>
      </Filter>
    </div>
  );
}
