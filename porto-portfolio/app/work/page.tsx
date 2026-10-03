import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { safeSanityFetch } from "@/lib/sanity/client";
import { CATEGORIES_QUERY } from "@/lib/sanity/queries";
import { EditorialWorkPanels } from "@/components/portfolio/EditorialWorkPanels";
import type { SanityCategory } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Work — RAPHREV // Editorial Photography",
  description:
    "Full-screen editorial photography portfolio by Ajay Johnson — exploring Motorsports, Live Events, Fashion, and Marketing.",
};

export default async function WorkPage() {
  const categories = await safeSanityFetch<SanityCategory[]>(CATEGORIES_QUERY, {}, []);

  return (
    <div className="min-h-screen w-full flex flex-col text-off-white selection:bg-racing-red selection:text-off-white bg-carbon overflow-x-hidden">
      <Header />
      <main className="w-full flex-grow flex flex-col">
        <EditorialWorkPanels categories={categories} />
      </main>
    </div>
  );
}
