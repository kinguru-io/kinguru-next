import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BlogLinkCard } from "./blog-link-card";
import { BLOG_DETAIL } from "@/lib/routes/constants";
import { css } from "~/styled-system/css";
import { container } from "~/styled-system/patterns";

export const WhySection = async ({
  anchorSlot,
}: {
  anchorSlot: React.ReactNode;
}) => {
  const t = await getTranslations("b2b");
  const blogs = await prisma.blog.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });
  return (
    <section className={container()}>
      <h2
        className={css({
          position: "relative",
          textAlign: "center",
          fontWeight: "900",
          fontSize: "2xl",
          zIndex: "1",
          md: {
            maxWidth: "fit-content",
            fontSize: "5xl",
            textAlign: "start",
          },
        })}
      >
        {t.rich("why_section_title", {
          brand: (chunks) => (
            <>
              <span
                aria-hidden
                className={css({
                  textTransform: "uppercase",
                  color: "light",
                  position: "absolute",
                  fontWeight: "500",
                  zIndex: "-1",
                  insetInlineStart: "50%",
                  transform: "translateX(-50%) scale(3)",
                })}
              >
                {chunks}
              </span>
              <span className={css({ textTransform: "uppercase" })}>
                {chunks}
              </span>
            </>
          ),
        })}
      </h2>
      <ul
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "4",
          marginBlockStart: "10",
          marginBlockEnd: "10",
          md: {
            marginBlockStart: "11",
            flexDirection: "row",
            flexWrap: "wrap",
            "& > *": {
              flexGrow: "1",
              flexBasis: "96",
            },
          },
        })}
      >
        {blogs.map((info, idx) => (
          <li key={info.id}>
            <Link href={BLOG_DETAIL(info.slug)}>
              <BlogLinkCard step={idx + 1} {...info} />
            </Link>
          </li>
        ))}
      </ul>
      <div className={css({ marginInline: "auto", width: "fit-content" })}>
        {anchorSlot}
      </div>
    </section>
  );
};
