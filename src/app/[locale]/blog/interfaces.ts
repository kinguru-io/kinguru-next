import { BlogDetail } from "@prisma/client";

export interface InnerBlogProps {
  detailBlog: BlogDetail;
  formattedDescription?: string;
  formattedTitle?: string;
  formattedCreatedDate?: string;
}
export interface BlogPageProps {
  formattedDescription?: string;
  formattedTitle?: string;
  formattedCreatedDate?: string;
}
