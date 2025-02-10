// pages/blog.tsx

import { BlogMainInteraction } from "./blog-main-interaction";

export const BlogMain = async () => {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });
  return <BlogMainInteraction initialBlogs={blogs} />;
};
export default BlogMain;
