import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import { SearchForm } from "@/components/ui/search-form";
import { WhySection } from "@/components/ui/why-section";
import { HowItWorksSection } from "@/components/ui/how-it-works-section";
import { ServicesSection } from "@/components/ui/services-section";
import { DogWalkingProtect } from "@/components/ui/dogwalking-protect";
import { SecurityTrustSection } from "@/components/ui/security-trust-section";
import { UserTypesSection } from "@/components/ui/user-types-section";

import { HomeIntroSection } from "@/components/ui/home-intro-section";
import { HomeFAQSection } from "@/components/ui/home-faq-section";
import { Footer } from "@/components/ui/footer";
import { FloatingContact } from "@/components/ui/floating-contact";
import { SEOHead } from "@/components/seo/SEOHead";
import { ExpertBio } from "@/components/ui/expert-bio";
import { getRandomExpert } from "@/data/expertsData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Promenade de Chien Partout en France | Promeneurs Vérifiés | DogWalking"
        description="Trouvez un promeneur de chien vérifié près de chez vous. Paiement sécurisé, preuves photo obligatoires, assurance incluse jusqu'à 2M€. Service de promenade et garde dans toute la France."
        canonical="https://dogwalking.fr"
      />
      <Header />
      <main>
        <HeroSection />
        <section className="py-8 md:py-12 px-4 -mt-16 md:-mt-24 relative z-10">
          <div className="container mx-auto">
            <SearchForm />
          </div>
        </section>
        
        {/* Section Services immédiatement après le formulaire */}
        <ServicesSection />
        
        {/* Section Comment ça marche après les services */}
        <HowItWorksSection />
        
        <HomeIntroSection />
        
        {/* Section Pourquoi Choisir DogWalking pour Promeneur Votre Chien ? */}
        <WhySection />
        

        <SecurityTrustSection />
        <UserTypesSection />
        
        <HomeFAQSection />
        
        {/* Section Expert (E-E-A-T) */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nos Experts au Service de Votre Chien
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                DogWalking est dirigee par une equipe d'experts reconnus en comportement canin, veterinaire et bien-etre animal.
              </p>
            </div>
            <ExpertBio expert={getRandomExpert()} />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Index;
