import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Experience from "@/components/home/Experience";
import Work from "@/components/home/Work";
import Contact from "@/components/home/Contact";
import ClarityPage from "@/components/analytics/ClarityPage";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ClarityPage tags={{ page_type: "home" }} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Work />
      <Contact />
    </>
  );
}
