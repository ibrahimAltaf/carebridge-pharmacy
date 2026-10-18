import Catalog from "../components/products/Catalog"
import CategorySection from "../components/home/CategorySection"
import EssentialsCarousel from "../components/home/EssentialsCarousel"
import Hero from "../components/home/Hero"
import InfoBand from "../components/home/InfoBand"
import PromoBanner from "../components/home/PromoBanner"
import TrustStrip from "../components/home/TrustStrip"
import { usePageTitle } from "../hooks/usePageTitle"

export default function HomePage() {
  usePageTitle("Everyday health essentials")

  return (
    <>
      <Hero />
      <TrustStrip />
      <CategorySection />
      <div className="mx-auto max-w-7xl bg-white px-4 pb-4 sm:px-6">
        <Catalog heading="Featured Products" />
      </div>
      <PromoBanner />
      <EssentialsCarousel />
      <InfoBand />
    </>
  )
}
