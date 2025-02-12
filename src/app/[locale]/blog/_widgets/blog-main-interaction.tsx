"use client";

import { Blog } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BlogCard } from "./blog-card";
import { Button } from "@/components/uikit";
import { BLOG_DETAIL } from "@/lib/routes/constants";
import { truncateText } from "@/lib/utils";
import { formatText } from "@/lib/utils/format-text";
import { css } from "~/styled-system/css";
import { Container, HStack } from "~/styled-system/jsx";

export const BlogMainInteraction = ({
  initialBlogs,
  initialHasMore,
}: {
  initialBlogs: Blog[];
  initialHasMore: boolean;
}) => {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [, setPage] = useState(1);
  const t = useTranslations("blog");

  const handleShowMore = async () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;

      const fetchBlogs = async () => {
        const response = await fetch(`/api/blogs?page=${nextPage}`);
        const data = await response.json();
        const newBlogs = data.blogs;
        setBlogs((prev) => [...prev, ...newBlogs]);
        setHasMore(data.hasMore);
      };
      hasMore && void fetchBlogs();
      return nextPage;
    });
  };

  return (
    <section
      className={css({
        paddingY: "15",
        md: {
          paddingY: "24",
        },
        background:
          "linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(239, 239, 239) 100%)",
      })}
    >
      <Container>
        <HStack
          className={css({
            flexWrap: "wrap",
          })}
        >
          {blogs?.map((blog) => {
            const formattedCreatedDate = format(blog.createdAt, "dd.MM.yyyy");
            const formattedDescription = truncateText(
              formatText(blog.description),
              150,
              true,
            );
            const formattedTitle = truncateText(blog.title, 60, false);

            return (
              <Link href={BLOG_DETAIL(blog.slug)} key={blog.id}>
                <BlogCard
                  formattedCreatedDate={formattedCreatedDate}
                  formattedTitle={formattedTitle}
                  formattedDescription={formattedDescription}
                />
              </Link>
            );
          })}
        </HStack>

        {hasMore && (
          <HStack justify="center" marginTop="8">
            <Button onClick={handleShowMore}>{t("show_more")}</Button>
          </HStack>
        )}
      </Container>
    </section>
  );
};
