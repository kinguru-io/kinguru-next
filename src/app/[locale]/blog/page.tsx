import { Suspense } from "react";
import BlogHeader from "./_widgets/blog-header";
import BlogMain from "./_widgets/blog-main";
import { Loader } from "@/components/uikit";

export default function BlogPage() {
  return (
    <>
      <BlogHeader />
      <Suspense fallback={<Loader />}>
        <BlogMain />
      </Suspense>
    </>
  );
}
