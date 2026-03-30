"use client";

import SpacePageTemplate from "@/components/SpacePageTemplate";
import { getVenueSpaceBySlug, venueSpaces } from "@/data/spaces";
import NotFound from "@/site/pages/NotFound";

const IbizaA = () => {
  const space = getVenueSpaceBySlug("ibiza-a");

  if (!space) {
    return <NotFound />;
  }

  const relatedSpaces = venueSpaces.filter(
    (item) => item.slug === "ibiza-grand-ballroom" || item.slug === "ibiza-b"
  );

  return (
    <SpacePageTemplate
      space={space}
      relatedSpaces={relatedSpaces}
      heroTitle="Your Private Event Space in Mississauga's Most Refined Venue"
      seo={{
        title: "Private Event Space Mississauga | Ibiza A at Palacio",
        description:
          "Ibiza A is a private event space Mississauga businesses and families trust for polished celebrations, corporate gatherings, and intimate receptions up to 450 guests.",
      }}
    />
  );
};

export default IbizaA;
