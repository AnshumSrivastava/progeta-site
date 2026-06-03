import Hero from "@/components/hero/Hero";
import Values from "@/components/values/Values";
import Initiatives from "@/components/initiatives/Initiatives";
import Stats from "@/components/stats/Stats";
import Philosophy from "@/components/philosophy/Philosophy";
import CommunityCTA from "@/components/communitycta/Communitycta";
export default function Home() {
  return (
    <main>
      <Hero />
      <Values />
      <Initiatives />
      <Stats />
      <Philosophy />
      <CommunityCTA />
    </main>
  );
}