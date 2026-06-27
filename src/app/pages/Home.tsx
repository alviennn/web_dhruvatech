import {
  ServicesPreview,
  WhyChoosePreview,
  FeaturedWorkPreview,
  HomeAboutPreview,
  HomeFAQ,
} from "../components/Sections";
import { Hero } from "../components/Hero";

export function Home() {
  return (
    <>
      <Hero />

      <ServicesPreview />

      <WhyChoosePreview />

      <FeaturedWorkPreview />

      <HomeAboutPreview />

      <HomeFAQ />
    </>
  );
}
