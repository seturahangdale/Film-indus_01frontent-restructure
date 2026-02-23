import { HeroSection } from "@/components/hero-section"
import { TextBanner } from "@/components/text-banner"
import { MPProjectSection } from "@/components/mp-project-section"
import { BenefitsSection } from "@/components/benefits-section"
import {
  AboutPreviewSection,
  GalleryPreviewSection,
} from "@/components/home-preview-sections"
import { SubsidySection } from "@/components/subsidy-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <HeroSection />
      <TextBanner />

      <MPProjectSection />


      {/* 🔥 SHOWREEL */}
      <SubsidySection />

      <BenefitsSection />
      <AboutPreviewSection />
      <GalleryPreviewSection />

      <Footer />
    </>
  )
}




