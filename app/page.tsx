import Hero from "@/app/components/home/Hero";
import WhyBoard from "@/app/components/home/WhyBoard";
import Marquee from "@/app/components/home/Marquee";
import BoardScene from "@/app/components/home/BoardScene";
import Manifesto from "@/app/components/home/Manifesto";
import ComingSoon from "@/app/components/home/ComingSoon";
import FooterFinale from "@/app/components/FooterFinale";

export default function Home() {
  return (
    <>
      <main id="main-content" className="flex-1">
        <Hero />
        <WhyBoard />
        <Marquee />
        <BoardScene />
        <Manifesto />
        <ComingSoon />
      </main>
      <FooterFinale />
    </>
  );
}
