import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Experience from "@/components/home/Experience";
import Work from "@/components/home/Work";
import Contact from "@/components/home/Contact";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Work />
      <Contact />
    </>
  );
}
