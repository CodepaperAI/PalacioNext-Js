import type { BlogPost } from "@/data/blogs";

const venueImages = [
  "/site-assets/Website Content/IMG_1955.jpg",
  "/site-assets/Website Content/IMG_3306.jpg",
  "/site-assets/Website Content/IMG_3666.jpg",
  "/site-assets/Website Content/IMG_3670.jpg",
  "/site-assets/Website Content/IMG_2245.jpg",
  "/site-assets/Website Content/20221027_150416_Original.jpg",
  "/site-assets/Website Content/Palacio-15.jpg",
  "/site-assets/Website Content/Palacio-20.jpg",
];

interface UpliftBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishDate: string;
  publishTime: string;
  featuredImage: string;
  categories: string[];
  tags: string[];
  meta: {
    seoTitle: string;
    seoDescription: string;
  };
  customFields: {
    readingTime: string;
  };
}

interface UpliftListResponse {
  success: boolean;
  data?: {
    blogs?: UpliftBlogPost[];
  };
}

interface UpliftSingleResponse {
  success: boolean;
  data?: {
    blog?: UpliftBlogPost;
  };
}

const getVenueImageByIndex = (index: number) =>
  venueImages[index % venueImages.length];

const getBlogsApiConfig = () => {
  const baseUrl = process.env.BLOGS_API_BASE_URL?.trim() ?? "";
  const token = process.env.BLOGS_API_TOKEN?.trim() ?? "";

  if (!baseUrl || !token) {
    return null;
  }

  return { baseUrl, token };
};

const mapUpliftPostToBlogPost = (
  post: UpliftBlogPost,
  index = 0,
): BlogPost => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  seoTitle: post.meta?.seoTitle || post.title,
  excerpt: post.excerpt,
  metaDescription: post.meta?.seoDescription || post.excerpt,
  category: post.categories?.[0] || null,
  tags: post.tags || [],
  author: "Palacio Event Centre",
  publishedAt: `${post.publishDate} ${post.publishTime}`,
  readingTime: post.customFields?.readingTime || "5 min read",
  image: post.featuredImage || getVenueImageByIndex(index),
  imageAlt: post.title,
  contentHtml: post.content,
  reviewFlags: [],
});

export const fetchPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  const config = getBlogsApiConfig();

  if (!config) {
    return [];
  }

  const response = await fetch(`${config.baseUrl}/blogs/${config.token}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  const data = (await response.json()) as UpliftListResponse;
  const posts = data.data?.blogs ?? [];

  return posts.map((post, index) => mapUpliftPostToBlogPost(post, index));
};

export const fetchPublishedBlogPost = async (
  slug: string,
): Promise<BlogPost | null> => {
  const config = getBlogsApiConfig();

  if (!config) {
    return null;
  }

  const response = await fetch(`${config.baseUrl}/blogs/${config.token}/${slug}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch blog post");
  }

  const data = (await response.json()) as UpliftSingleResponse;
  const post = data.data?.blog;

  return post ? mapUpliftPostToBlogPost(post) : null;
};
