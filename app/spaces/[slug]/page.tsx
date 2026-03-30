import { notFound } from "next/navigation";
import ArribaPage from "@/site/pages/spaces/Arriba";
import IbizaAPage from "@/site/pages/spaces/IbizaA";
import IbizaBPage from "@/site/pages/spaces/IbizaB";
import IbizaGrandBallroomPage from "@/site/pages/spaces/IbizaGrandBallroom";

const spacePages = {
  arriba: ArribaPage,
  "ibiza-a": IbizaAPage,
  "ibiza-b": IbizaBPage,
  "ibiza-grand-ballroom": IbizaGrandBallroomPage,
} as const;

interface SpaceRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return Object.keys(spacePages).map((slug) => ({ slug }));
}

export default async function SpaceRoute({ params }: SpaceRouteProps) {
  const { slug } = await params;
  const Page = spacePages[slug as keyof typeof spacePages];

  if (!Page) {
    notFound();
  }

  return <Page />;
}
