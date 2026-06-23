import { LoadingScreen } from "@/components/portfolio/loading-screen";
import { Hero } from "@/components/portfolio/hero";
import { HomeExplore } from "@/components/portfolio/home-explore";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Hero />
      <HomeExplore />
    </>
  );
}
