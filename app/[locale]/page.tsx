import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import YourRights from "@/components/YourRights";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import EasterEgg from "@/components/EasterEgg";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <HowItWorks />
      <YourRights />
      <FAQ />
      <Footer />
      <EasterEgg />
    </main>
  );
}
