import { HeroSection } from "@/components/hero-section"
import { SignalsSection } from "@/components/signals-section"
import { WorkSection } from "@/components/work-section"
import { PrinciplesSection } from "@/components/principles-section"
import { ColophonSection } from "@/components/colophon-section"
import { TopNav } from "@/components/top-nav"
import { SmoothScroll } from "@/components/smooth-scroll"

export default function Page() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen">
        <TopNav />
        <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

        <div className="relative z-10">
          <HeroSection />
          <SignalsSection />
          <WorkSection />
          <PrinciplesSection />
          <ColophonSection />
        </div>
      </main>
    </SmoothScroll>
  )
}
