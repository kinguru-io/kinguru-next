import dynamic from "next/dynamic";

const BlogHeader = dynamic(() => import("./_widgets/blog-header"), {
  ssr: true,
});

const BlogMain = dynamic(() => import("./_widgets/blog-main"), {
  ssr: true,
});

export default function BlogPage() {
  return (
    <>
      <BlogHeader />
      <BlogMain />
    </>
  );
}
