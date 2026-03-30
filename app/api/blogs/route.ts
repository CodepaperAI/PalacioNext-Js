import { NextResponse } from "next/server";
import { fetchPublishedBlogPosts } from "@/server/blogs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await fetchPublishedBlogPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("[api/blogs] Failed to fetch posts:", error);
    return NextResponse.json(
      { message: "Failed to fetch blog posts." },
      { status: 500 },
    );
  }
}
