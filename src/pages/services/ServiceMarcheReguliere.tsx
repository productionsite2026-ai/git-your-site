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
  Calendar, Clock, Shield, Camera, Star, Heart, Repeat,
  CheckCircle, ArrowRight, Award, TrendingUp, Users, Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Images uniques pour Marche Régulière
import marcheHero from "@/assets/services/marche-reguliere-hero.jpg";
import marcheQuotidienne from "@/assets/services/marche-reguliere-quotidienne.jpg";
import marcheEquilibre from "@/assets/services/marche-reguliere-chien-equilibre.jpg";
import marchePlanning from "@/assets/services/marche-reguliere-planning.jpg";
import marcheLien from "@/assets/services/marche-reguliere-lien.jpg";

// Données pour reviews et case studies
const reviews = getReviewsByService("marche-reguliere");
const caseStudies = getCaseStudiesByService("marche-reguliere");

const marcheReguliereFAQs = [
  {
    question: "Quelle est la différence entre marche régulière et promenade ponctuelle ?",
    answer: "La marche régulière est un engagement sur le long terme avec le même promeneur, généralement plusieurs fois par semaine. Cela permet de créer un lien fort entre le promeneur et votre chien, d'établir une routine stable et d'observer l'évolution comportementale de votre animal. La promenade ponctuelle est idéale pour des besoins occasionnels."
  },
  {
    question: "Combien de promenades par semaine sont recommandées ?",
    answer: "Cela dépend de l'énergie et des besoins de votre chien. Pour un chien adulte en appartement, 3 à 5 promenades par semaine avec un promeneur sont idéales en complément de vos propres sorties. Les races très énergiques (Border Collie, Berger Australien) peuvent nécessiter une sortie quotidienne. Nous adaptons la fréquence à chaque chien."
  },
  {
    question: "Le même promeneur viendra-t-il à chaque fois ?",
    answer: "Oui, c'est le principe fondamental de la marche régulière. Le même promeneur s'occupe de votre chien à chaque sortie, ce qui crée une relation de confiance et une stabilité émotionnelle pour votre animal. En cas d'absence exceptionnelle du promeneur, nous vous proposons un remplaçant vérifié que vous pouvez approuver."
  },
  {
    question: "Quels sont les bénéfices comportementaux de la marche régulière ?",
    answer: "Les chiens qui bénéficient de promenades régulières montrent des améliorations significatives : réduction de l'anxiété de séparation, diminution des aboiements excessifs, moins de comportements destructeurs, meilleure socialisation, équilibre émotionnel renforcé. La routine apporte une stabilité que les chiens apprécient particulièrement."
  },
  {
    question: "Comment se passe la mise en place d'un programme régulier ?",
    answer: "Après avoir choisi votre promeneur, vous définissez ensemble les jours et horaires de promenade. Une première rencontre permet d'établir la confiance. Le promeneur apprend les habitudes de votre chien, ses commandes, ses besoins spécifiques. Après quelques sorties, une routine s'installe naturellement."
  },
  {
    question: "Puis-je modifier le planning en cours de route ?",
    answer: "Absolument ! Les programmes de marche régulière sont flexibles. Vous pouvez ajouter ou supprimer des promenades, changer les horaires ou la durée. Prévenez simplement votre promeneur à l'avance (24-48h idéalement). Les ajustements sont faciles via notre application."
  },
  {
    question: "Y a-t-il des tarifs avantageux pour la marche régulière ?",
    answer: "Oui, les forfaits hebdomadaires ou mensuels offrent des tarifs préférentiels par rapport aux promenades ponctuelles. Plus vous réservez de promenades, plus le tarif unitaire diminue. C'est avantageux pour vous et garantit une régularité pour votre chien."
  },
  {
    question: "Mon chien est-il assuré à chaque promenade régulière ?",
    answer: "Oui, chaque promenade est couverte par notre assurance jusqu'à 2 millions d'euros, que ce soit une promenade ponctuelle ou régulière. Le système de paiement sécurisé s'applique également : vous ne payez qu'après réception des preuves photo de chaque sortie."
  }
];

const ServiceMarcheReguliere = () => {
  const navigate = useNavigate();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Marche Régulière pour Chien en France",
    "description": "Service de promenade régulière avec le même promeneur vérifié. Routine établie, bénéfices comportementaux, lien de confiance. Forfaits hebdomadaires avantageux.",
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
      "name": "Forfaits marche régulière",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Forfait 3 promenades/semaine",
          "price": "30",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "name": "Forfait 5 promenades/semaine",
          "price": "45",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "name": "Forfait quotidien",
          "price": "55",
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

  const benefits = [
    {
      icon: TrendingUp,
      title: "Amélioration comportementale",
      description: "Réduction de l'anxiété, moins d'aboiements, comportements équilibrés"
    },
    {
      icon: Heart,
      title: "Lien de confiance",
      description: "Relation forte entre votre chien et son promeneur attitré"
    },
    {
      icon: Calendar,
      title: "Routine stable",
      description: "Horaires réguliers qui rassurent et structurent la journée"
    },
    {
      icon: Zap,
      title: "Dépense d'énergie",
      description: "Exercice quotidien pour un chien plus calme à la maison"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Marche Régulière Chien | Promeneur Attitré & Routine | DogWalking"
        description="Marche régulière avec le même promeneur vérifié. Routine stable, bénéfices comportementaux, lien de confiance. Forfaits avantageux dès 30€/semaine."
        keywords="marche régulière chien, promenade quotidienne, promeneur attitré, routine chien, forfait promenade, dog walking régulier"
        canonicalUrl="https://dogwalking.fr/services/marche-reguliere"
        structuredData={serviceJsonLd}
        ogImage={marcheHero}
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 relative z-10"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  <Repeat className="w-3 h-3 mr-1" />
                  Accompagnement long terme
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Marche Régulière : <span className="text-primary">Routine & Bien-être</span> pour Votre Chien
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Offrez à votre compagnon la stabilité d'un promeneur attitré. La marche régulière crée 
                  une routine rassurante, renforce le lien de confiance et améliore significativement 
                  le comportement de votre chien sur le long terme.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" onClick={() => navigate("/walkers?service=marche_reguliere")}>
                    Trouver mon promeneur
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/tarifs")}>
                    Voir les forfaits
                  </Button>
                </div>
                <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Repeat className="h-4 w-4 text-primary" />
                    <span>Même promeneur</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Routine établie</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span>Bénéfices prouvés</span>
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
                  src={marcheHero} 
                  alt="Promeneur régulier avec un chien heureux sur un chemin bordé d'arbres en automne" 
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
                />
                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl">85%</p>
                      <p className="text-sm text-muted-foreground">Amélioration comportementale</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Qu'est-ce que la marche régulière */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                La Marche Régulière : Un Engagement sur le Long Terme
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Contrairement aux promenades ponctuelles, la marche régulière établit une véritable 
                relation entre votre chien et son promeneur attitré. C'est un service récurrent qui 
                apporte stabilité, confiance et bénéfices durables pour votre compagnon.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.img
                src={marcheQuotidienne}
                alt="Promeneur quotidien avec un chien dans une rue de quartier"
                className="rounded-2xl shadow-lg w-full object-cover aspect-video"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Un promeneur attitré</h3>
                    <p className="text-muted-foreground">
                      Le même professionnel s'occupe de votre chien à chaque sortie. Il connaît 
                      ses habitudes, ses préférences, ses réactions. Une relation de confiance 
                      se construit naturellement.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Horaires réguliers</h3>
                    <p className="text-muted-foreground">
                      Votre chien sait quand son promeneur arrive. Cette prévisibilité réduit 
                      l'anxiété et structure sa journée. Les chiens adorent la routine.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Suivi de l'évolution</h3>
                    <p className="text-muted-foreground">
                      Votre promeneur observe les progrès de votre chien, note les changements 
                      comportementaux et vous fait des retours réguliers sur son évolution.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bénéfices comportementaux */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Les Bénéfices Comportementaux Prouvés
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Les chiens qui bénéficient de marches régulières montrent des améliorations 
                significatives dans leur comportement quotidien.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-4"
              >
                {benefits.map((benefit, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
                      <CardContent className="p-6">
                        <benefit.icon className="h-8 w-8 text-primary mb-4" />
                        <h3 className="font-bold mb-2">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              <motion.img
                src={marcheEquilibre}
                alt="Chien équilibré et heureux marchant calmement avec son promeneur"
                className="rounded-2xl shadow-lg w-full object-cover aspect-video"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-primary/5 rounded-2xl p-8 border border-primary/20"
            >
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">-65%</div>
                  <div className="text-sm text-muted-foreground">Anxiété de séparation</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">-50%</div>
                  <div className="text-sm text-muted-foreground">Aboiements excessifs</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">+80%</div>
                  <div className="text-sm text-muted-foreground">Calme à la maison</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">+90%</div>
                  <div className="text-sm text-muted-foreground">Socialisation</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Organisation hebdomadaire */}
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
                  Organisation Hebdomadaire Flexible
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Définissez avec votre promeneur un planning qui s'adapte à votre vie. 
                  Que vous ayez besoin de 3 promenades par semaine ou d'une sortie quotidienne, 
                  nous construisons ensemble un programme sur mesure.
                </p>
                <div className="space-y-4">
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold">Lundi • Mercredi • Vendredi</h3>
                          <p className="text-sm text-muted-foreground">Programme équilibré</p>
                        </div>
                        <Badge>3x/sem</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold">Du lundi au vendredi</h3>
                          <p className="text-sm text-muted-foreground">Couverture semaine complète</p>
                        </div>
                        <Badge>5x/sem</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold">7 jours sur 7</h3>
                          <p className="text-sm text-muted-foreground">Routine quotidienne complète</p>
                        </div>
                        <Badge variant="secondary">Premium</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
              <motion.img
                src={marchePlanning}
                alt="Planning de promenade hebdomadaire avec laisse et friandises"
                className="rounded-2xl shadow-lg w-full object-cover aspect-video order-1 lg:order-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </section>

        {/* Relation promeneur / chien */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.img
                src={marcheLien}
                alt="Lien fort entre un promeneur et un chien qui le regarde avec affection"
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
                  Un Lien Unique Entre Votre Chien et Son Promeneur
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Avec le temps, votre chien reconnaît son promeneur, l'attend avec impatience 
                  et développe une véritable complicité avec lui. Cette relation de confiance 
                  est bénéfique pour le bien-être émotionnel de votre compagnon.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Reconnaissance et joie à l'arrivée du promeneur</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Confiance établie après quelques semaines</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Complicité qui facilite les promenades</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Meilleure gestion des situations stressantes</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Forfaits */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nos Forfaits Marche Régulière
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Des tarifs avantageux pour un engagement sur le long terme
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">🚶</div>
                  <h3 className="font-bold text-xl mb-2">Essentiel</h3>
                  <p className="text-sm text-muted-foreground mb-2">3 promenades/semaine</p>
                  <p className="text-3xl font-bold text-primary mb-2">dès 30€</p>
                  <p className="text-xs text-muted-foreground mb-4">soit 10€/promenade</p>
                  <ul className="text-sm text-left space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Promeneur attitré
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      45 min par sortie
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Photos obligatoires
                    </li>
                  </ul>
                  <Button className="w-full" onClick={() => navigate("/walkers?service=marche_reguliere")}>
                    Choisir ce forfait
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow border-2 border-primary">
                <CardContent className="p-6">
                  <Badge className="mb-2">Populaire</Badge>
                  <div className="text-4xl mb-4">🏃</div>
                  <h3 className="font-bold text-xl mb-2">Confort</h3>
                  <p className="text-sm text-muted-foreground mb-2">5 promenades/semaine</p>
                  <p className="text-3xl font-bold text-primary mb-2">dès 45€</p>
                  <p className="text-xs text-muted-foreground mb-4">soit 9€/promenade</p>
                  <ul className="text-sm text-left space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Promeneur attitré
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      1h par sortie
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Rapport hebdomadaire
                    </li>
                  </ul>
                  <Button className="w-full" onClick={() => navigate("/walkers?service=marche_reguliere")}>
                    Choisir ce forfait
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2">Premium</Badge>
                  <div className="text-4xl mb-4">🌟</div>
                  <h3 className="font-bold text-xl mb-2">Quotidien</h3>
                  <p className="text-sm text-muted-foreground mb-2">7 promenades/semaine</p>
                  <p className="text-3xl font-bold text-primary mb-2">dès 55€</p>
                  <p className="text-xs text-muted-foreground mb-4">soit 7,85€/promenade</p>
                  <ul className="text-sm text-left space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Promeneur attitré
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      1h par sortie
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Suivi comportemental
                    </li>
                  </ul>
                  <Button className="w-full" onClick={() => navigate("/walkers?service=marche_reguliere")}>
                    Choisir ce forfait
                  </Button>
                </CardContent>
              </Card>
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
                Investissez dans le Bien-être de Votre Chien
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                La marche régulière est le meilleur investissement pour un chien équilibré et heureux.
              </p>
              <Button size="lg" variant="secondary" onClick={() => navigate("/walkers?service=marche_reguliere")}>
                Commencer mon programme
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
                Questions Fréquentes sur la Marche Régulière
              </h2>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <SEOFAQ faqs={marcheReguliereFAQs} />
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

export default ServiceMarcheReguliere;
