import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "6");
  const offset = (page - 1) * limit;

  const totalBlogs = await prisma.blog.count();

  const blogs = await prisma.blog.findMany({
    take: limit,
    skip: offset,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    blogs: blogs || [],
    hasMore: offset + limit < totalBlogs,
  });
}
