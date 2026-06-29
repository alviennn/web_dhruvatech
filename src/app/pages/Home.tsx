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
      <title>
        Dhurva Tech | Software House Yogyakarta - Web, Mobile & AI Development
      </title>
      <meta
        name="description"
        content="Dhurva Tech membantu membangun produk digital anda mulai dari website company profile, aplikasi mobile, hingga solusi berbasis AI/ML. Mari Realisasikan Ide Besar Anda Bersama Kami!"
      />
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
