"use client";

import { useEffect } from "react";
import { buildCanonicalUrl, buildImageUrl } from "@/lib/seo";

interface SEOProps {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  type?: "website" | "article";
  noindex?: boolean;
}

const SEO = ({
  title,
  description,
  pathname,
  image,
  schema,
  type = "website",
  noindex = false,
}: SEOProps) => {
  const canonicalUrl = buildCanonicalUrl(pathname);
  const ogImage = buildImageUrl(image);
  const robotsContent = noindex ? "noindex, nofollow" : "index, follow";
  const schemaJson = JSON.stringify(schema ?? null);

  useEffect(() => {
    const schemaItems = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

    const upsertMeta = (
      selector: string,
      attributes: Record<string, string>,
      content: string,
    ) => {
      const existingElement = document.head.querySelector(
        `meta[${selector}]`,
      ) as HTMLMetaElement | null;
      const element = existingElement ?? document.createElement("meta");

      if (!existingElement) {
        Object.entries(attributes).forEach(([key, value]) =>
          element.setAttribute(key, value),
        );
        document.head.appendChild(element);
      }

      element.content = content;
    };

    const upsertLink = (rel: string, href: string) => {
      const existingElement = document.head.querySelector(
        `link[rel="${rel}"]`,
      ) as HTMLLinkElement | null;
      const element = existingElement ?? document.createElement("link");

      if (!existingElement) {
        element.rel = rel;
        document.head.appendChild(element);
      }

      element.href = href;
    };

    document.title = title;

    upsertMeta("name=\"description\"", { name: "description" }, description);
    upsertMeta("name=\"robots\"", { name: "robots" }, robotsContent);
    upsertMeta("property=\"og:site_name\"", { property: "og:site_name" }, "Palacio Event Centre");
    upsertMeta("property=\"og:title\"", { property: "og:title" }, title);
    upsertMeta("property=\"og:description\"", { property: "og:description" }, description);
    upsertMeta("property=\"og:url\"", { property: "og:url" }, canonicalUrl);
    upsertMeta("property=\"og:type\"", { property: "og:type" }, type);
    upsertMeta("property=\"og:locale\"", { property: "og:locale" }, "en_CA");
    upsertMeta("name=\"twitter:card\"", { name: "twitter:card" }, "summary_large_image");
    upsertMeta("name=\"twitter:title\"", { name: "twitter:title" }, title);
    upsertMeta("name=\"twitter:description\"", { name: "twitter:description" }, description);
    upsertLink("canonical", canonicalUrl);

    if (ogImage) {
      upsertMeta("property=\"og:image\"", { property: "og:image" }, ogImage);
      upsertMeta("name=\"twitter:image\"", { name: "twitter:image" }, ogImage);
    }

    const createdScripts = schemaItems.map((item, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.palacioSchema = `${pathname}-${index}`;
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      createdScripts.forEach((script) => script.remove());
    };
  }, [canonicalUrl, description, ogImage, pathname, robotsContent, schema, schemaJson, title, type]);

  return null;
};

export default SEO;
