import Hero from "@/app/components/home/Hero";
import Marquee from "@/app/components/home/Marquee";
import BoardScene from "@/app/components/home/BoardScene";
import Manifesto from "@/app/components/home/Manifesto";
import ComingSoon from "@/app/components/home/ComingSoon";
import FooterFinale from "@/app/components/FooterFinale";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Marquee />
        <BoardScene />
        <Manifesto />
        <ComingSoon />
      </main>
      <FooterFinale />
    </>
  );
}
