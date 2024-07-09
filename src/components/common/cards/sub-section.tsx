import { cx } from "~/styled-system/css";
import { stack } from "~/styled-system/patterns";

export function SubSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cx(
        stack({
          gap: "4",
          layerStyle: "sub-section",
          "& .title": { fontWeight: "bold", fontSize: "xl" },
          "& .title + .helper": { marginBlockStart: "-3" },
          "& .helper": { fontSize: "px13", color: "secondary" },
          "& .notice": { fontSize: "xs", color: "secondary" },
          md: {
            gap: "8",
            "& .title": { fontWeight: "bold", fontSize: "2xl" },
            "& .title + .helper": { marginBlockStart: "-6" },
            "& .helper": { fontSize: "px17", color: "secondary" },
          },
        }),
        className,
      )}
    >
      {children}
    </section>
  );
}
