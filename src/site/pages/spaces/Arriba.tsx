"use client";

import SpacePageTemplate from "@/components/SpacePageTemplate";
import { getVenueSpaceBySlug, venueSpaces } from "@/data/spaces";
import NotFound from "@/site/pages/NotFound";

const Arriba = () => {
  const space = getVenueSpaceBySlug("arriba");

  if (!space) {
    return <NotFound />;
  }

  const relatedSpaces = venueSpaces.filter((item) => item.slug === "ibiza-grand-ballroom");

  return (
    <SpacePageTemplate
      space={space}
      relatedSpaces={relatedSpaces}
      heroTitle="A Luxury Event Space Mississauga Offers for Intimate Occasions"
      seo={{
        title: "Luxury Event Space Mississauga | Arriba at Palacio",
        description:
          "Arriba is a luxury event space Mississauga families and businesses choose for intimate celebrations, executive meetings, and private events with panoramic views.",
      }}
    />
  );
};

export default Arriba;
