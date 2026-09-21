import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RACING_EVENTS_DATA } from "@/lib/data/event-gallery-data";
import EventDetailPage from "@/components/sections/Event-Detail-Page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = RACING_EVENTS_DATA[id];
  if (!event) return { title: "Event Not Found — RAPHREV" };

  return {
    title: `${event.title} — RAPHREV // Motorsport Work`,
    description: event.details,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const event = RACING_EVENTS_DATA[id];

  if (!event) {
    notFound();
  }

  return <EventDetailPage event={event} />;
}
