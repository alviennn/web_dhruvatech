import {
  ServicesPreview,
  WhyChoosePreview,
  FeaturedWorkPreview,
  HomeAboutPreview,
  HomeFAQ,
} from "../components/Sections";
import { Hero } from "../components/Hero";
import { Helmet, HelmetProvider } from "react-helmet-async";

export function Home() {
  <HelmetProvider>
    <Helmet>
      <title>Dhurva Tech - Home</title>
      <meta name="description" content="Dhurva Tech Home Page" />
    </Helmet>
  </HelmetProvider>;

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
