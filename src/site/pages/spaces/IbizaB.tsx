"use client";

import SpacePageTemplate from "@/components/SpacePageTemplate";
import { getVenueSpaceBySlug, venueSpaces } from "@/data/spaces";
import NotFound from "@/site/pages/NotFound";

const IbizaB = () => {
  const space = getVenueSpaceBySlug("ibiza-b");

  if (!space) {
    return <NotFound />;
  }

  const relatedSpaces = venueSpaces.filter(
    (item) => item.slug === "ibiza-grand-ballroom" || item.slug === "ibiza-a"
  );

  return (
    <SpacePageTemplate
      space={space}
      relatedSpaces={relatedSpaces}
      heroTitle="An Event Hall Mississauga Trusts for Mid-Size Elegance"
      seo={{
        title: "Event Hall Mississauga | Ibiza B at Palacio",
        description:
          "Ibiza B is a versatile event hall Mississauga hosts choose for polished mid‑size functions, corporate gatherings, and private celebrations up to 300 guests.",
      }}
    />
  );
};

export default IbizaB;
