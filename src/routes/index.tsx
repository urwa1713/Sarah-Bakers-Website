import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Menu } from "@/components/site/Menu";
import { Gallery } from "@/components/site/Gallery";
import { HowToOrder } from "@/components/site/HowToOrder";
import { Reviews } from "@/components/site/Reviews";
import { Footer } from "@/components/site/Footer";
import { CustomCursor } from "@/components/site/CustomCursor";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-[var(--cream)] text-[var(--chocolate)]">
      <CustomCursor />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <HowToOrder />
      <Reviews />
      <Footer />
    </main>
  );
}
