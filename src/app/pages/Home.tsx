import { Hero } from "../components/Hero";
import {
  HomeIntro,
  ServicesPreview,
  FeaturedWorkPreview,
  ProcessPreview,
  MindsetPreview,
  DigitalProductCTA,
} from "../components/Sections";

export function Home() {
  return (
    <>
      <Hero />
      <HomeIntro />
      <ServicesPreview />
      <FeaturedWorkPreview />
      <ProcessPreview />
      <MindsetPreview />
      <DigitalProductCTA />
    </>
  );
}