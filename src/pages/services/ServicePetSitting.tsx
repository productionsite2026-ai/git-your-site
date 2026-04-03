import { Header } from "@/components/ui/header";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/ui/seo-head";
import { SEOFAQ } from "@/components/ui/seo-faq";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingContact } from "@/components/ui/floating-contact";
import { ClientReviews } from "@/components/ui/client-reviews";
import { CaseStudies } from "@/components/ui/case-studies";
import { getReviewsByService, getCaseStudiesByService } from "@/data/clientReviewsData";
import { motion } from "framer-motion";
import { 
  PawPrint, Clock, Shield, Camera, Star, Heart,
  CheckCircle, ArrowRight, Award, Cat, Bird, Fish, Rabbit
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Images uniques pour Pet Sitting
import petSittingHero from "@/assets/services/pet-sitting-hero.jpg";
import petSittingMulti from "@/assets/services/pet-sitting-multi-animaux.jpg";
import petSittingOrganisation from "@/assets/services/pet-sitting-organisation.jpg";
import petSittingSerenite from "@/assets/services/pet-sitting-serenite.jpg";
import petSittingPetitsAnimaux from "@/assets/services/pet-sitting-petits-animaux.jpg";

// Données pour reviews et case studies
const reviews = getReviewsByService("pet-sitting");
const caseStudies = getCaseStudiesByService("pet-sitting");

const petSittingFAQs = [
  {
    question: "Quels types d'animaux sont pris en charge par le pet sitting ?",
    answer: "Notre service de pet sitting s'adresse à tous les animaux de compagnie : chiens, chats, oiseaux, rongeurs (hamsters, cochons d'Inde, lapins), reptiles, poissons et NAC (Nouveaux Animaux de Compagnie). Chaque pet sitter indique sur son profil les animaux qu'il peut gérer. Vous trouverez facilement un professionnel adapté à votre ménagerie."
  },
  {
    question: "Comment le pet sitter s'occupe-t-il de plusieurs animaux différents ?",
    answer: "Nos pet sitters expérimentés savent gérer des foyers multi-animaux. Ils établissent un planning précis pour chaque animal : heures de repas, sorties, soins spécifiques. Les besoins de chaque espèce sont respectés. Vous fournissez les instructions détaillées et le pet sitter les suit rigoureusement. Les tarifs peuvent être ajustés selon le nombre et le type d'animaux."
  },
  {
    question: "Le pet sitting inclut-il le nettoyage des cages et litières ?",
    answer: "Oui, le pet sitting comprend l'entretien de base : nettoyage des litières pour chats, changement de l'eau des gamelles et aquariums, nettoyage léger des cages pour rongeurs et oiseaux. Pour un entretien plus approfondi, vous pouvez opter pour notre formule visite sanitaire qui inclut des soins plus complets."
  },
  {
    question: "Puis-je faire garder mon chat seul à la maison avec des visites ?",
    answer: "Absolument ! C'est même la solution idéale pour les chats, animaux très territoriaux qui n'aiment pas changer d'environnement. Le pet sitter vient chez vous 1 à 3 fois par jour selon vos besoins : nourriture, eau fraîche, changement de litière, câlins et jeux. Votre chat reste dans son territoire familier, ce qui réduit considérablement le stress."
  },
  {
    question: "Que faire si mon animal a des besoins médicaux particuliers ?",
    answer: "Indiquez tous les besoins médicaux lors de la réservation. Nos pet sitters peuvent administrer des médicaments oraux, des gouttes, et surveiller l'état de santé de votre animal. Pour les soins plus complexes (injections, pansements), nous orientons vers des pet sitters ayant une formation vétérinaire. Les coordonnées de votre vétérinaire sont toujours à disposition."
  },
  {
    question: "Comment fonctionne le pet sitting pour les poissons et reptiles ?",
    answer: "Pour les poissons : nourrissage selon vos instructions, vérification de la température et du fonctionnement des filtres, surveillance de l'état général. Pour les reptiles : nourrissage adapté, maintien de la température et de l'humidité du terrarium, nettoyage léger. Nos pet sitters spécialisés connaissent les besoins spécifiques de ces animaux."
  },
  {
    question: "Combien de visites par jour pour mon animal ?",
    answer: "Cela dépend de l'espèce et de ses besoins. Pour un chat adulte, 1 à 2 visites suffisent. Pour un chien, 2 à 3 visites sont recommandées. Pour un chiot ou un animal malade, des visites plus fréquentes peuvent être organisées. Nous adaptons la fréquence à chaque situation pour garantir le bien-être de votre compagnon."
  },
  {
    question: "Le pet sitter peut-il arroser mes plantes et relever mon courrier ?",
    answer: "Oui ! En plus des soins aux animaux, le pet sitter peut effectuer des petits services pour votre domicile : arrosage des plantes, relevé du courrier, ouverture/fermeture des volets. Ces services supplémentaires sont généralement inclus ou facturés à un tarif modique. C'est aussi une surveillance rassurante pour votre maison."
  }
];

const ServicePetSitting = () => {
  const navigate = useNavigate();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Pet Sitting Multi-Animaux en France",
    "description": "Service de pet sitting pour tous vos animaux : chiens, chats, oiseaux, rongeurs, reptiles. Pet sitters vérifiés, preuves photo, assurance incluse.",
    "provider": {
      "@type": "Organization",
      "name": "DogWalking",
      "url": "https://dogwalking.fr"
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Options de pet sitting",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Visite pet sitting 30 min",
          "price": "10",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "name": "Visite pet sitting 1h",
          "price": "18",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "name": "Forfait journée multi-animaux",
          "price": "35",
          "priceCurrency": "EUR"
        }
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const animals = [
    { icon: "🐕", name: "Chiens", desc: "Promenades, repas, jeux" },
    { icon: "🐱", name: "Chats", desc: "Visites, litière, câlins" },
    { icon: "🐦", name: "Oiseaux", desc: "Nourriture, eau, nettoyage" },
    { icon: "🐹", name: "Rongeurs", desc: "Soins quotidiens" },
    { icon: "🐰", name: "Lapins", desc: "Alimentation, propreté" },
    { icon: "🐠", name: "Poissons", desc: "Nourrissage, surveillance" },
    { icon: "🦎", name: "Reptiles", desc: "Terrarium, température" },
    { icon: "🐾", name: "NAC", desc: "Soins adaptés" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Tout Animal | Garde Multi-Animaux | Chiens, Chats, Oiseaux, NAC | DogWalking"
        description="Garde de tous vos animaux : chiens, chats, oiseaux, rongeurs, reptiles. Pet sitters vérifiés partout en France. Preuves photo, assurance incluse."
        keywords="garde animaux, cat sitting, garde chat, garde rongeur, garde oiseau, garde multi-animaux, NAC, pet sitter france"
        canonicalUrl="https://dogwalking.fr/services/pet-sitting"
        structuredData={serviceJsonLd}
        ogImage={petSittingHero}
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/10" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 relative z-10"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  <PawPrint className="w-3 h-3 mr-1" />
                  Tous vos animaux choyés
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Tout Animal <span className="text-primary">Multi-Animaux</span> : Tous Vos Compagnons Gardés
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Que vous ayez un chien, un chat, des oiseaux, des rongeurs ou même des reptiles, nos pet sitters 
                  polyvalents s'occupent de tous vos animaux avec le même soin et la même attention. Une seule 
                  réservation pour toute votre ménagerie.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" onClick={() => navigate("/walkers?service=pet_sitting")}>
                    Trouver un pet sitter
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/tarifs")}>
                    Voir les tarifs
                  </Button>
                </div>
                <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <PawPrint className="h-4 w-4 text-primary" />
                    <span>Multi-espèces</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-primary" />
                    <span>Preuves photo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Assurance incluse</span>
                  </div>
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <img 
                  src={petSittingHero} 
                  alt="Pet sitter avec chien, chat et lapin dans un intérieur chaleureux" 
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
                />
                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl">8+</p>
                      <p className="text-sm text-muted-foreground">Types d'animaux</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Animaux pris en charge */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tous Vos Animaux Sont les Bienvenus
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Du plus grand au plus petit, nos pet sitters prennent soin de toutes les espèces 
                avec expertise et bienveillance. Chaque animal reçoit une attention adaptée à ses besoins.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {animals.map((animal, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-3">{animal.icon}</div>
                      <h3 className="font-bold mb-1">{animal.name}</h3>
                      <p className="text-xs text-muted-foreground">{animal.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Multi-animaux en détail */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.img
                src={petSittingMulti}
                alt="Pet sitter avec chiens et chat ensemble dans un salon"
                className="rounded-2xl shadow-lg w-full object-cover aspect-video"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Une Seule Réservation pour Toute Votre Ménagerie
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Vous avez un chien, deux chats et un aquarium ? Pas de problème. Nos pet sitters 
                  polyvalents s'occupent de tous vos compagnons en une seule visite. Plus besoin de 
                  multiplier les réservations ou de chercher différents prestataires.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Planning personnalisé pour chaque animal</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Tarif groupé avantageux</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Un seul interlocuteur de confiance</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Photos de tous vos animaux</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Organisation des visites */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Organisation Rigoureuse des Visites
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Chaque pet sitter établit un planning précis pour s'assurer que tous vos animaux 
                  reçoivent les soins dont ils ont besoin, aux bons horaires. Nourrissage, entretien, 
                  jeux : rien n'est laissé au hasard.
                </p>
                <div className="space-y-4">
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-1">Matin</h3>
                      <p className="text-sm text-muted-foreground">
                        Nourrissage de tous les animaux, promenade du chien, nettoyage des litières
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-1">Midi</h3>
                      <p className="text-sm text-muted-foreground">
                        Deuxième sortie du chien, jeux avec le chat, vérification des rongeurs
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-1">Soir</h3>
                      <p className="text-sm text-muted-foreground">
                        Repas, dernière promenade, câlins, vérification générale
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
              <motion.img
                src={petSittingOrganisation}
                alt="Pet sitter organisant les soins des animaux avec un planning"
                className="rounded-2xl shadow-lg w-full object-cover aspect-video order-1 lg:order-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </section>

        {/* Avantages propriétaire */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Les Avantages du Pet Sitting pour Vous
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-4"
              >
                <motion.div variants={itemVariants}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <Clock className="h-8 w-8 text-primary mb-4" />
                      <h3 className="font-bold mb-2">Gain de temps</h3>
                      <p className="text-sm text-muted-foreground">
                        Plus besoin de multiplier les prestataires ou les réservations
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <Heart className="h-8 w-8 text-primary mb-4" />
                      <h3 className="font-bold mb-2">Moins de stress</h3>
                      <p className="text-sm text-muted-foreground">
                        Vos animaux restent chez eux, dans leur environnement
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <Shield className="h-8 w-8 text-primary mb-4" />
                      <h3 className="font-bold mb-2">Confiance totale</h3>
                      <p className="text-sm text-muted-foreground">
                        Pet sitters vérifiés avec assurance et preuves photo
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <Star className="h-8 w-8 text-primary mb-4" />
                      <h3 className="font-bold mb-2">Service premium</h3>
                      <p className="text-sm text-muted-foreground">
                        Attention personnalisée pour chaque membre de votre famille animale
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
              <motion.img
                src={petSittingSerenite}
                alt="Propriétaire serein avec ses animaux gardés par un pet sitter"
                className="rounded-2xl shadow-lg w-full object-cover aspect-video"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </section>

        {/* Petits animaux */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.img
                src={petSittingPetitsAnimaux}
                alt="Pet sitter prenant soin de hamsters et petits animaux"
                className="rounded-2xl shadow-lg w-full object-cover aspect-video"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Expertise avec les Petits Animaux et NAC
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Nos pet sitters spécialisés maîtrisent les soins des petits animaux : rongeurs, 
                  oiseaux, reptiles et autres NAC. Ils connaissent les besoins spécifiques de 
                  chaque espèce et adaptent leurs soins en conséquence.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Rabbit className="h-5 w-5 text-primary" />
                    <span>Rongeurs : nourriture spéciale, litière, manipulation douce</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Bird className="h-5 w-5 text-primary" />
                    <span>Oiseaux : graines, eau fraîche, nettoyage de cage</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Fish className="h-5 w-5 text-primary" />
                    <span>Poissons : nourrissage, surveillance des équipements</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <PawPrint className="h-5 w-5 text-primary" />
                    <span>Reptiles : température, humidité, alimentation adaptée</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>



        {/* CTA Final */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tous Vos Animaux Méritent les Meilleurs Soins
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Confiez toute votre ménagerie à un pet sitter de confiance.
              </p>
              <Button size="lg" variant="secondary" onClick={() => navigate("/walkers?service=pet_sitting")}>
                Trouver un pet sitter maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>


        {/* Section Preuves de Confiance (E-E-A-T) */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pourquoi Faire Confiance a DogWalking pour ce Service ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nos garanties de confiance et de securite sont sans equivalent en France.
              </p>
            </div>
            <TrustBadges />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Questions Fréquentes sur le Pet Sitting
              </h2>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <SEOFAQ faqs={petSittingFAQs} />
            </div>
          </div>
        </section>
      </main>
        {/* Client Reviews Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <ClientReviews reviews={reviews} />
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <CaseStudies studies={caseStudies} />
          </div>
        </section>


      <Footer />
      <FloatingContact />
    </div>
  );
};

export default ServicePetSitting;
