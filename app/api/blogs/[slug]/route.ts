import { NextResponse } from "next/server";
import { fetchPublishedBlogPost } from "@/server/blogs";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const post = await fetchPublishedBlogPost(slug);

    if (!post) {
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("[api/blogs/:slug] Failed to fetch post:", error);
    return NextResponse.json(
      { message: "Failed to fetch blog post." },
      { status: 500 },
    );
  }
}
