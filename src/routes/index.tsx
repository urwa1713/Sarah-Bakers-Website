import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { HowToOrder } from "@/components/site/HowToOrder";
import { Reviews } from "@/components/site/Reviews";
import { CategoryCards } from "@/components/site/CategoryCards";
import { PageTransition } from "@/components/site/PageTransition";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home Baker Islamabad — Your Favourite Islamabadian Home Baker" },
      { name: "description", content: "Boutique custom cakes, cupcakes & desserts baked fresh with pyaar in Islamabad & Rawalpindi. Explore our wedding, birthday, custom and seasonal collections." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageTransition>
      <Hero />
      <CategoryCards />
      <About />
      <HowToOrder />
      <Reviews />
    </PageTransition>
  );
}
