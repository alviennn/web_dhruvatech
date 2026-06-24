import {
  ServicesPreview,
  WhyChoosePreview,
  FeaturedWorkPreview,
<<<<<<< HEAD
  HomeAboutPreview,
  HomeFAQ,
  DigitalProductCTA,
  Footer,
=======
  ProcessPreview,
  MindsetPreview,
>>>>>>> aeb3390fe11b63c5cd73d3232debd9036691fd6e
} from "../components/Sections";
import { Hero } from "../components/Hero";
import { useT } from "../providers";

export function Home() {
  const { t } = useT();

  return (
    <>
      <Hero />

      <ServicesPreview />

      <WhyChoosePreview />

      <FeaturedWorkPreview />
<<<<<<< HEAD

      <HomeAboutPreview />

      <HomeFAQ />

      <DigitalProductCTA
        title={t("home_cta_title")}
        subtitle={t("home_cta_sub")}
        buttonLabel={t("home_cta_button")}
        note={t("home_cta_note")}
      />

      <Footer />
=======
      <ProcessPreview />
      <MindsetPreview />
>>>>>>> aeb3390fe11b63c5cd73d3232debd9036691fd6e
    </>
  );
}