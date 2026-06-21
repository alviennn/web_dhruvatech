import {
  ServicesPreview,
  WhyChoosePreview,
  FeaturedWorkPreview,
  HomeAboutPreview,
  HomeFAQ,
  DigitalProductCTA,
  Footer,
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

      <HomeAboutPreview />

      <HomeFAQ />

      <DigitalProductCTA
        title={t("home_cta_title")}
        subtitle={t("home_cta_sub")}
        buttonLabel={t("home_cta_button")}
        note={t("home_cta_note")}
      />

      <Footer />
    </>
  );
}