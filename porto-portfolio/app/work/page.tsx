import type { Metadata } from "next";
import WorkPage from "@/components/sections/Work-Page";

export const metadata: Metadata = {
  title: "Work Archive — RAPHREV // Ajay Johnson",
  description:
    "Explore the editorial motorsport and automotive visual storytelling archive by Ajay Johnson — Formula 1, endurance, hillclimb, and hypercar photography.",
};

export default function Work() {
  return <WorkPage />;
}
