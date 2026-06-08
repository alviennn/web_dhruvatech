import { Hero } from "../components/Hero";
import { HomeIntro, ServicesPreview, FeaturedWorkPreview, ProcessPreview, MindsetPreview } from "../components/Sections";
import { CTABlock } from "../components/shared";
import { useT } from "../providers";

export function Home() {
  const { t } = useT();
  return (
    <>
      <Hero />
      <HomeIntro />
      <ServicesPreview />
      <FeaturedWorkPreview />
      <ProcessPreview />
      <MindsetPreview />
      <CTABlock title={t("cta_home")} primaryTo="/contact" />
    </>
  );
}
