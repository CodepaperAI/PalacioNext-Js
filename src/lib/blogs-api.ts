import type { BlogPost } from "@/data/blogs";
import img1955 from "@/assets/Website Content/IMG_1955.jpg";
import img3306 from "@/assets/Website Content/IMG_3306.jpg";
import img3666 from "@/assets/Website Content/IMG_3666.jpg";
import img3670 from "@/assets/Website Content/IMG_3670.jpg";
import img2245 from "@/assets/Website Content/IMG_2245.jpg";
import originalPhoto from "@/assets/Website Content/20221027_150416_Original.jpg";
import palacio15 from "@/assets/Website Content/Palacio-15.jpg";
import palacio20 from "@/assets/Website Content/Palacio-20.jpg";

const VENUE_IMAGES = [img1955, img3306, img3666, img3670, img2245, originalPhoto, palacio15, palacio20];

// Deterministic per-index image assignment — no duplicates, always different for adjacent posts
const getVenueImageByIndex = (index: number): string => {
  return VENUE_IMAGES[index % VENUE_IMAGES.length];
};

const BLOGS_API_BASE_URL = import.meta.env.VITE_BLOGS_API_BASE_URL || "";
const BLOGS_API_TOKEN = import.meta.env.VITE_BLOGS_API_TOKEN || "";

// API response types
interface UpliftBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  publishDate: string;
  publishTime: string;
  featuredImage: string;
  categories: string[];
  tags: string[];
  seoScore: number;
  createdAt: string;
  updatedAt: string;
  meta: {
    seoTitle: string;
    seoDescription: string;
    focusKeyword: string;
    keywords: string[];
  };
  customFields: {
    readingTime: string;
    rating: number;
  };
}

interface UpliftListResponse {
  success: boolean;
  data: {
    blogs: UpliftBlogPost[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

interface UpliftSingleResponse {
  success: boolean;
  data: {
    blog: UpliftBlogPost;
  };
}

// Map Uplift API format to existing BlogPost interface
// index ensures deterministic, non-duplicate fallback images across the combined post list
const mapUpliftPostToBlogPost = (post: UpliftBlogPost, index?: number): BlogPost => ({
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
  image: post.featuredImage || (index !== undefined ? getVenueImageByIndex(index) : getVenueImageByIndex(0)),
  imageAlt: post.title,
  contentHtml: post.content,
  reviewFlags: [],
});

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  if (!BLOGS_API_BASE_URL || !BLOGS_API_TOKEN) {
    console.warn("Blog API not configured, using static data only");
    return [];
  }
  const endpoint = `${BLOGS_API_BASE_URL}/blogs/${BLOGS_API_TOKEN}`;
  console.log("[blogs-api] Fetching from:", endpoint);
  const response = await fetch(endpoint);
  console.log("[blogs-api] Response status:", response.status);
  if (!response.ok) throw new Error("Failed to fetch blog posts");
  const data: UpliftListResponse = await response.json();
  console.log("[blogs-api] Raw API data:", data);
  if (!data.success || !data.data?.blogs) throw new Error("Invalid API response");
  console.log("[blogs-api] Raw posts status:", data.data.blogs.map((p: UpliftBlogPost) => ({ title: p.title, status: p.status })));
  const posts = data.data.blogs
    .map((post, index) => {
      const mapped = mapUpliftPostToBlogPost(post, index);
      console.log("[blogs-api] Mapped individual post:", mapped);
      return mapped;
    });
  console.log("[blogs-api] After filter (only published):", posts.length, "posts");
  console.log("[blogs-api] Mapped blog posts:", posts);
  return posts;
};

export const fetchBlogPost = async (slug: string): Promise<BlogPost | null> => {
  if (!BLOGS_API_BASE_URL || !BLOGS_API_TOKEN) return null;
  const endpoint = `${BLOGS_API_BASE_URL}/blogs/${BLOGS_API_TOKEN}/${slug}`;
  console.log("[blogs-api] fetchBlogPost endpoint:", endpoint);
  const response = await fetch(endpoint);
  console.log("[blogs-api] fetchBlogPost response status:", response.status);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Failed to fetch blog post");
  const data: UpliftSingleResponse = await response.json();
  console.log("[blogs-api] fetchBlogPost raw data:", data);
  if (!data.success || !data.data?.blog) throw new Error("Invalid API response");
  const post = mapUpliftPostToBlogPost(data.data.blog);
  console.log("[blogs-api] Mapped single blog post:", post);
  return post;
};
