import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Lock, Camera, CreditCard, Clock, Award, Sparkles, ArrowRight, Star, Users } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/seo/SEOHead";
import { SEOFAQ } from "@/components/ui/seo-faq";
import { FloatingContact } from "@/components/ui/floating-contact";
import { motion } from "framer-motion";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { AnimatedCard, AnimatedGrid, AnimatedGridItem } from "@/components/ui/animated-card";
import { SectionHeader } from "@/components/ui/section-header";
import tarifsHero from "@/assets/pages/tarifs-hero.jpg";

const Tarifs = () => {
  const navigate = useNavigate();
  const services = [
    {
      name: "Promenade",
      minPrice: "8€",
      description: "Durée libre",
      features: ["Exercice adapté au rythme de votre chien", "Preuves photo/vidéo obligatoires", "Message du promeneur après chaque sortie", "Tarif libre défini par le promeneur"],
      icon: "🚶"
    },
    {
      name: "Visite à domicile",
      minPrice: "8€",
      description: "Passage chez vous",
      features: ["Nourriture et eau fraîche servies", "Compagnie, câlins et jeux", "Preuves photo/vidéo de la visite", "Rapport détaillé de la visite"],
      icon: "🏠"
    },
    {
      name: "Hébergement nuit",
      minPrice: "10€",
      description: "Chez le promeneur",
      features: ["Nuit complète en sécurité", "Environnement familial et chaleureux", "Suivi régulier et attention", "Photos et messages quotidiens"],
      popular: true,
      icon: "🌙"
    },
    {
      name: "Garderie jour",
      minPrice: "10€",
      description: "Garderie de jour",
      features: ["Journée complète d'activités", "Socialisation avec d'autres chiens", "Activités variées et stimulantes", "Preuves régulières envoyées"],
      icon: "☀️"
    },
    {
      name: "Garde à domicile",
      minPrice: "12€",
      description: "Chez vous - Nuit",
      features: ["Promeneur présent chez vous", "Routine de votre chien préservée", "Sécurité maximale garantie", "Suivi complet de la mission"],
      icon: "🏡"
    },
    {
      name: "Visite sanitaire",
      minPrice: "16€",
      description: "Entretien + soins",
      features: ["Brossage et soins du pelage", "Produits du propriétaire utilisés", "Hygiène quotidienne assurée", "Photos avant/après incluses"],
      icon: "🧴"
    },
    {
      name: "Accomp. vétérinaire",
      minPrice: "13€",
      description: "Transport inclus",
      features: ["Prise en charge complète", "Accompagnement RDV vétérinaire", "Compte-rendu détaillé", "Photos et suivi post-visite"],
      icon: "🏥"
    }
  ];

  const guarantees = [
    { icon: Shield, title: "Promeneurs 100% vérifiés", description: "CNI, casier judiciaire et assurance RC vérifiés manuellement", variant: "primary" as const },
    { icon: Lock, title: "Paiement sécurisé", description: "Argent bloqué jusqu'à validation de la preuve", variant: "accent" as const },
    { icon: Camera, title: "Preuves obligatoires", description: "Photo/vidéo + message pendant chaque mission", variant: "success" as const },
    { icon: CreditCard, title: "Tarifs transparents", description: "Tout inclus : assurance, support, plateforme", variant: "warning" as const }
  ];

  const faqItems = [
    {
      question: "Comment sont calculés les tarifs sur DogWalking ?",
      answer: "Nous fixons des tarifs minimums garantis pour chaque type de service (à partir de 8€). Chaque promeneur est ensuite libre de fixer ses propres tarifs au-dessus de ces minimums, en fonction de son expérience, de sa zone géographique et de ses services spécifiques. Cette flexibilité permet de trouver le meilleur rapport qualité-prix adapté à vos besoins."
    },
    {
      question: "Que comprennent les tarifs affichés ?",
      answer: "Les tarifs DogWalking incluent l'assurance responsabilité civile jusqu'à 2M€ pour chaque prestation, le support client disponible 7j/7, la plateforme sécurisée avec messagerie intégrée, le système de paiement sécurisé qui protège votre argent, et la gestion automatisée des preuves photo/vidéo. C'est un service complet sans frais cachés."
    },
    {
      question: "Puis-je donner un pourboire au promeneur ?",
      answer: "Oui, vous pouvez donner un pourboire à votre promeneur après chaque prestation réussie. Les pourboires sont 100% reversés au promeneur sans aucune commission prélevée par DogWalking. C'est une excellente façon de remercier un service exceptionnel et de fidéliser votre promeneur préféré."
    },
    {
      question: "Quand suis-je débité pour une réservation ?",
      answer: "Le paiement est effectué au moment de la réservation mais reste bloqué (compte séquestre sécurisé). Il n'est libéré au promeneur qu'après réception et validation de la preuve de prestation (photo/vidéo obligatoire). Si aucune preuve n'est envoyée, vous êtes automatiquement remboursé."
    },
    {
      question: "Puis-je annuler une réservation et être remboursé ?",
      answer: "Oui, vous pouvez annuler gratuitement jusqu'à 24h avant la prestation prévue avec remboursement intégral. Passé ce délai, des frais d'annulation peuvent s'appliquer selon les conditions du promeneur. En cas d'urgence médicale justifiée, contactez notre support pour un traitement au cas par cas."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Tarifs DogWalking | Prix Promenade Chien, Garde, Visite à Domicile"
        description="Découvrez nos tarifs transparents : promenade dès 8€, garde dès 10€, visite à domicile dès 8€. Tout inclus avec assurance 2M€ et paiement sécurisé."
        canonical="https://dogwalking.fr/tarifs"
      />
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-12">
        {/* Hero Section animée */}
        <motion.div 
          className="relative rounded-3xl overflow-hidden mb-12"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src={tarifsHero} 
            alt="Réservation et paiement sécurisé sur l'application DogWalking" 
            className="w-full h-56 md:h-72 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-primary/10 backdrop-blur text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Tarifs transparents & sans surprise
              </Badge>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Nos Services & Tarifs
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Tarifs minimums garantis. Tout inclus (assurance + support).
            </motion.p>
          </div>
        </motion.div>

        {/* Garanties avec icônes animées */}
        <AnimatedGrid className="grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12" staggerDelay={0.1}>
          {guarantees.map((item, index) => (
            <AnimatedGridItem key={index}>
              <div className="bg-card rounded-2xl p-5 text-center shadow-sm border border-border hover:border-primary/30 transition-colors">
                <AnimatedIcon icon={item.icon} size="md" variant={item.variant} className="mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </AnimatedGridItem>
          ))}
        </AnimatedGrid>

        {/* Section explicative SEO */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Des tarifs adaptés à chaque besoin
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Chez DogWalking, nous croyons que chaque chien mérite des soins de qualité à un prix juste. 
            Nos tarifs minimums garantissent une rémunération équitable pour nos promeneurs professionnels 
            tout en restant accessibles pour les propriétaires. Chaque prestation inclut l'assurance 
            responsabilité civile jusqu'à 2 millions d'euros, les preuves photo/vidéo obligatoires 
            et un support client disponible 7 jours sur 7.
          </p>
        </motion.div>

        {/* Grille des services avec animations */}
        <AnimatedGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto mb-12" staggerDelay={0.08}>
          {services.map((plan, index) => (
            <AnimatedGridItem key={index}>
              <Card 
                className={`relative h-full transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'hover:border-primary/30'
                }`}
              >
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.5 }}
                  >
                    <Star className="h-3 w-3" />
                    Populaire
                  </motion.div>
                )}
                <CardHeader className="pb-3">
                  <div className="text-3xl mb-2">{plan.icon}</div>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary">dès {plan.minPrice}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2.5 mb-5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => navigate('/walkers')}
                  >
                    Réserver
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </AnimatedGridItem>
          ))}
        </AnimatedGrid>

        {/* Comment fonctionne le paiement - Section enrichie */}
        <div className="max-w-4xl mx-auto space-y-6">
          <SectionHeader
            title="Comment fonctionne le paiement ?"
            subtitle="Un système sécurisé qui protège à la fois les propriétaires et les promeneurs"
            icon={Lock}
            iconVariant="accent"
            badge="Paiement sécurisé"
          />

          <AnimatedCard className="overflow-hidden" glow>
            <div className="grid md:grid-cols-2">
              <div className="p-8 bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Lock className="h-6 w-6" />
                  Paiement bloqué
                </h3>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Réservation", desc: "Votre paiement est bloqué en sécurité. Le promeneur ne reçoit rien immédiatement." },
                    { step: "2", title: "Mission + Preuve", desc: "Le promeneur effectue la mission et envoie obligatoirement une preuve photo/vidéo." },
                    { step: "3", title: "Validation", desc: "Vous recevez la preuve. Le paiement est débloqué après validation." },
                    { step: "4", title: "Paiement", desc: "Le promeneur reçoit son paiement intégralement." }
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm opacity-90">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Protection garantie
                </h3>
                <ul className="space-y-3">
                  {[
                    "Remboursement intégral si prestation non effectuée",
                    "Médiation gratuite en cas de litige",
                    "Historique des preuves conservé 90 jours",
                    "Support disponible 7j/7 par chat et email",
                    "Assurance RC 2M€ incluse"
                  ].map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <SectionHeader
            title="Questions fréquentes"
            subtitle="Tout ce que vous devez savoir sur nos tarifs et notre fonctionnement"
            icon={Users}
          />
          <div className="mt-8">
            <SEOFAQ items={faqItems} />
          </div>
        </div>
      </main>

      <FloatingContact />
      <Footer />
    </div>
  );
};

export default Tarifs;
