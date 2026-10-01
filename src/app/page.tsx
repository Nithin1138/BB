import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "BBPulse — One house. A million perspectives.",
  description:
    "The story doesn’t end with the episode. Explore Bigg Boss Telugu contestant journeys, join the conversation, and find your people on BBPulse, an independent fan community.",
  openGraph: {
    title: "BBPulse — One house. A million perspectives.",
    description: "Outside the house. Inside the conversation. Your independent Bigg Boss Telugu fan community.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BBPulse — One house. A million perspectives.",
    description: "The story doesn’t end with the episode. It starts with you.",
  },
};

export default function HomePage() {
  return <LandingPage />;
}
