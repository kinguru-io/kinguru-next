// pages/blog.tsx

import { BlogMainInteraction } from "./blog-main-interaction";

export const BlogMain = async () => {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });
  const totalBlogs = await prisma.blog.count();
  return (
    <BlogMainInteraction
      initialBlogs={blogs}
      initialHasMore={blogs.length < totalBlogs}
    />
  );
};
export default BlogMain;
