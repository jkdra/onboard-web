import Hero from "@/app/components/home/Hero";
import BoardCountdown from "@/app/components/home/BoardCountdown";
import WhyBoard from "@/app/components/home/WhyBoard";
import PostUpClose from "@/app/components/home/PostUpClose";
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
        <BoardCountdown />
        <WhyBoard />
        <PostUpClose />
        <Marquee />
        <BoardScene />
        <Manifesto />
        <ComingSoon />
      </main>
      <FooterFinale />
    </>
  );
}
