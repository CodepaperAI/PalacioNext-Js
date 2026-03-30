import type { BlogPost } from "@/data/blogs";

interface BlogPostsResponse {
  posts?: BlogPost[];
}

interface BlogPostResponse {
  post?: BlogPost | null;
}

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await fetch("/api/blogs", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  const data = (await response.json()) as BlogPostsResponse;
  return Array.isArray(data.posts) ? data.posts : [];
};

export const fetchBlogPost = async (slug: string): Promise<BlogPost | null> => {
  const response = await fetch(`/api/blogs/${slug}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch blog post");
  }

  const data = (await response.json()) as BlogPostResponse;
  return data.post ?? null;
};
