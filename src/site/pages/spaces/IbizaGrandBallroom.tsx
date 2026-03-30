"use client";

import SpacePageTemplate from "@/components/SpacePageTemplate";
import { getVenueSpaceBySlug, venueSpaces } from "@/data/spaces";
import NotFound from "@/site/pages/NotFound";

const IbizaGrandBallroom = () => {
  const space = getVenueSpaceBySlug("ibiza-grand-ballroom");

  if (!space) {
    return <NotFound />;
  }

  const relatedSpaces = venueSpaces.filter((item) => item.parentVenue === space.name || item.slug === "arriba");

  return (
    <SpacePageTemplate
      space={space}
      relatedSpaces={relatedSpaces}
      heroTitle="A Grand Ballroom Built for Mississauga's Most Memorable Events"
      seo={{
        title: "Grand Ballroom Mississauga | Palacio Event Centre",
        description:
          "Host exceptional events in a grand ballroom Mississauga trusts. 23‑ft ceilings, divisible layout, and refined elegance for weddings, galas, and conferences.",
      }}
    />
  );
};

export default IbizaGrandBallroom;
