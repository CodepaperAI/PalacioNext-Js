import { notFound } from "next/navigation";
import BarPackagesPage from "@/site/pages/menus/BarPackages";
import CaribbeanPage from "@/site/pages/menus/Caribbean";
import EuropeanPage from "@/site/pages/menus/European";
import GujaratiPage from "@/site/pages/menus/Gujarati";
import HolidayPromPage from "@/site/pages/menus/HolidayProm";
import MiddleEasternPage from "@/site/pages/menus/MiddleEastern";
import OutsideCateringPage from "@/site/pages/menus/OutsideCatering";
import PakistaniHalalPage from "@/site/pages/menus/PakistaniHalal";
import SouthAsianPage from "@/site/pages/menus/SouthAsian";

const menuPages = {
  "bar-packages": BarPackagesPage,
  caribbean: CaribbeanPage,
  european: EuropeanPage,
  gujarati: GujaratiPage,
  "holiday-prom": HolidayPromPage,
  "middle-eastern": MiddleEasternPage,
  "outside-catering": OutsideCateringPage,
  "pakistani-halal": PakistaniHalalPage,
  "south-asian": SouthAsianPage,
} as const;

interface MenuRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return Object.keys(menuPages).map((slug) => ({ slug }));
}

export default async function MenuRoute({ params }: MenuRouteProps) {
  const { slug } = await params;
  const Page = menuPages[slug as keyof typeof menuPages];

  if (!Page) {
    notFound();
  }

  return <Page />;
}
