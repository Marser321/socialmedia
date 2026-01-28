import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSolution } from '@/components/sections/ProblemSolution';
import { ServicesCatalog } from '@/components/sections/ServicesCatalog';
import { Automations } from '@/components/sections/Automations';
import { PricingTable } from '@/components/sections/PricingTable';
import { Portfolio } from '@/components/sections/Portfolio';
import { ContactForm } from '@/components/sections/ContactForm';

export default function Home() {
  return (
    <main id="content" className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      <HeroSection />

      <ProblemSolution />

      <ServicesCatalog />

      <Automations />

      <PricingTable />

      <Portfolio />

      <ContactForm />

      <Footer />
    </main>
  );
}
