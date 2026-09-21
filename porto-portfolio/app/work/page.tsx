import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { getWorkEditorialCategories } from "@/lib/data/portfolio-categories";
import { EditorialWorkPanels } from "@/components/portfolio/EditorialWorkPanels";

export const metadata: Metadata = {
  title: "Work — RAPHREV // Editorial Photography",
  description:
    "Full-screen editorial photography portfolio by Ajay Johnson — exploring Motorsports, Music, and Fashion.",
};

export default function WorkPage() {
  const editorialCategories = getWorkEditorialCategories();

  return (
    <div className="min-h-screen w-full flex flex-col text-off-white selection:bg-racing-red selection:text-off-white bg-carbon overflow-x-hidden">
      {/* Existing Site Header & Navigation */}
      <Header />

      {/* Full-Viewport Height 3-Panel Editorial Section */}
      <main className="w-full flex-grow flex flex-col">
        <EditorialWorkPanels categories={editorialCategories} />
      </main>
    </div>
  );
}
