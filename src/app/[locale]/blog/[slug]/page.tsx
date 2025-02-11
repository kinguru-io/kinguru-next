import { Metadata } from "next";
import { InnerBlogFooter } from "../_widgets/innerPage/inner-blog-footer";
import { InnerBlogHeader } from "../_widgets/innerPage/inner-blog-header";
import { InnerBlogMain } from "../_widgets/innerPage/inner-blog-main";
import { css } from "~/styled-system/css";
import { Container } from "~/styled-system/jsx";

interface BlogPageProps {
  slug: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: BlogPageProps;
}): Promise<Metadata> => {
  const { slug } = params;

  const post = await prisma.blog.findUnique({
    where: { slug },
    include: { blogDetail: true },
  });

  if (!post) {
    return {
      title: "Blog not found",
      description: "The requested blog post could not be found.",
    };
  }

  const updatedBlogDetail = post.blogDetail;

  return {
    title: updatedBlogDetail?.title,
    description: updatedBlogDetail?.description,
    openGraph: {
      title: updatedBlogDetail?.title,
      description: updatedBlogDetail?.description,
      type: "article",
      images: [
        {
          url: updatedBlogDetail?.image ?? "img/blog/blog.webp",
          width: 800,
          height: 600,
          alt: updatedBlogDetail?.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: updatedBlogDetail?.title,
      description: updatedBlogDetail?.description,
      images: updatedBlogDetail?.image ?? "img/blog/blog.webp",
    },
  };
};

const BlogPageDetail = async ({ params }: { params: BlogPageProps }) => {
  const { slug } = params;

  const post = await prisma.blog.findUnique({
    where: { slug },
    include: { blogDetail: true },
  });

  if (!post) {
    return <p>Post not found</p>;
  }

  const updatedBlogDetail = await prisma.blogDetail.upsert({
    where: { blogId: post.id },
    update: {
      title: post.title,
      blogId: post.id,
      description: post.description,
    },
    create: {
      blogId: post.id,
      title: post.title,
      description: post.description,
    },
  });

  return (
    <section className={css({ background: "#FFFFFF" })}>
      <Container>
        <InnerBlogHeader detailBlog={updatedBlogDetail} />
        <InnerBlogMain detailBlog={updatedBlogDetail} />
        <InnerBlogFooter detailBlog={updatedBlogDetail} />
      </Container>
    </section>
  );
};

export default BlogPageDetail;
