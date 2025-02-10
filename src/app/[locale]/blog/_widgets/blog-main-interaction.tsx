"use client";

import { Blog } from "@prisma/client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { BlogCard } from "./blog-card";
import { Button } from "@/components/uikit";
import { BLOG_DETAIL } from "@/lib/routes/constants";
import { css } from "~/styled-system/css";
import { Container, HStack } from "~/styled-system/jsx";

export const BlogMainInteraction = ({
  initialBlogs,
}: {
  initialBlogs: Blog[];
}) => {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const t = useTranslations("blog");
  console.log(page);
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`/api/blogs?page=${page}`);
      const data = await response.json();

      const newBlogs = data.blogs;
      setBlogs((prev) => [...prev, ...newBlogs]);
      setHasMore(data.hasMore);
    };

    if (page > 1) {
      void fetchBlogs();
    }
  }, [page]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
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
          {blogs.map((blog) => (
            <Link href={BLOG_DETAIL(blog.slug)} key={blog.id}>
              <BlogCard {...blog} />
            </Link>
          ))}
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
