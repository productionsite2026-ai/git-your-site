import { useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { SEOFAQ } from "@/components/ui/seo-faq";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HelpCircle, Dog, Briefcase, CreditCard, Shield,
  MessageSquare, MapPin, Search, Send, CheckCircle,
  AlertCircle, Mail, Phone, Clock, Heart, Users,
  Award, Target, Eye, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import teamImage from "@/assets/pages/equipe-dogwalking.jpg";
import missionImage from "@/assets/trust/promeneur-verifie-badge.jpg";
import { ExpertBio } from "@/components/ui/expert-bio";
import { experts } from "@/data/expertsData";

// ===== FAQ Data =====
const faqCategories = {
  proprietaires: {
    title: "Propriétaires",
    icon: Dog,
    faqs: [
      { question: "Comment fonctionne DogWalking pour trouver un promeneur ?", answer: "Entrez votre adresse, choisissez le type de service, et découvrez les promeneurs vérifiés disponibles. Consultez leurs profils, avis, tarifs, puis réservez en ligne. Le paiement est sécurisé jusqu'à réception des preuves photo." },
      { question: "Les promeneurs sont-ils vraiment vérifiés ?", answer: "Absolument. Chaque promeneur fournit CNI, casier judiciaire vierge et attestation d'assurance RC. Seuls 35% des candidats sont acceptés." },
      { question: "Que se passe-t-il si je ne suis pas satisfait ?", answer: "Grâce au paiement sécurisé, votre argent reste bloqué jusqu'à validation. Vous pouvez contester et être remboursé. Notre support intervient sous 24h." },
      { question: "Puis-je annuler une réservation ?", answer: "Annulation gratuite jusqu'à 24h avant avec remboursement intégral. Des frais peuvent s'appliquer après ce délai." },
      { question: "Comment ajouter mon chien ?", answer: "Depuis votre tableau de bord, cliquez 'Ajouter un chien'. Remplissez nom, race, âge, poids, tempérament et ajoutez une photo." },
      { question: "Puis-je garder le même promeneur ?", answer: "Oui, ajoutez-le en favori et réservez-le directement. Les promeneurs réguliers connaissent mieux votre chien." },
    ],
  },
  promeneurs: {
    title: "Promeneurs",
    icon: Briefcase,
    faqs: [
      { question: "Comment devenir promeneur ?", answer: "Inscrivez-vous, complétez votre profil, soumettez vos documents (CNI, casier, assurance RC). Vérification sous 48h." },
      { question: "Quels documents sont nécessaires ?", answer: "CNI ou passeport, casier judiciaire (bulletin n°3), attestation d'assurance RC et photo professionnelle." },
      { question: "Comment fixer mes tarifs ?", answer: "Vous êtes libre au-dessus des minimums (8€ promenade, 10€ garde). Adaptez selon votre expérience et zone." },
      { question: "Comment suis-je payé ?", answer: "Le paiement est libéré après envoi des preuves et validation.Vous recevez l'intégralité du montant de la prestation. L'assurance et le support sont inclus.   { question: "Combien puis-je gagner ?", answer: "En moyenne 500-1500€/mois. Les promeneurs à temps plein dans les grandes villes dépassent 2000€/mois." },
    ],
  },
  paiement: {
    title: "Paiement",
    icon: CreditCard,
    faqs: [
      { question: "Comment fonctionne le paiement sécurisé ?", answer: "Le paiement est bloqué à la réservation. Il est libéré au promeneur après validation des preuves photo/vidéo." },
      { question: "Que comprennent les frais de service ?", answer: "Assurance RC jusqu'à 2M€, support 7j/7, messagerie sécurisée et système de paiement sécurisé." },
      { question: "Puis-je donner un pourboire ?", answer: "Oui, 100% reversé au promeneur." },
      { question: "Et si la prestation n'est pas effectuée ?", answer: "Remboursement automatique si aucune preuve n'est envoyée." },
    ],
  },
  securite: {
    title: "Sécurité",
    icon: Shield,
    faqs: [
      { question: "Comment sont vérifiés les promeneurs ?", answer: "Vérification d'identité, casier judiciaire, assurance RC et entretien. Seuls 35% sont acceptés." },
      { question: "Quelle assurance couvre les prestations ?", answer: "Assurance RC jusqu'à 2 millions d'euros par prestation." },
      { question: "Comment signaler un problème ?", answer: "Via la messagerie intégrée, email contact@dogwalking.fr, ou téléphone 01 23 45 67 89. Ligne prioritaire pendant les missions." },
      { question: "Les preuves photo sont-elles obligatoires ?", answer: "Oui. Sans preuve, le paiement n'est pas libéré." },
    ],
  },
};

const Support = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mainTab, setMainTab] = useState("faq");
  const [faqTab, setFaqTab] = useState("proprietaires");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "contact") setMainTab("contact");
    else if (tab === "a-propos") setMainTab("about");
    else if (tab && Object.keys(faqCategories).includes(tab)) {
      setMainTab("faq");
      setFaqTab(tab);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message envoyé avec succès !");
  };

  const getFilteredFaqs = () => {
    if (!searchQuery.trim()) return null;
    const results: { category: string; question: string; answer: string }[] = [];
    Object.values(faqCategories).forEach((cat) => {
      cat.faqs.forEach((faq) => {
        if (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({ category: cat.title, ...faq });
        }
      });
    });
    return results;
  };
  const filteredFaqs = getFilteredFaqs();

  const contactInfo = [
    { icon: Mail, title: "Email", value: "contact@dogwalking.fr", link: "mailto:contact@dogwalking.fr" },
    { icon: Phone, title: "Téléphone", value: "01 23 45 67 89", link: "tel:+33123456789" },
    { icon: MapPin, title: "Adresse", value: "Paris, France", link: null },
    { icon: Clock, title: "Horaires", value: "Lun-Ven: 9h-18h", link: null },
  ];

  const stats = [
    { value: "50 000+", label: "Promenades réalisées", icon: CheckCircle },
    { value: "2 500+", label: "Promeneurs actifs", icon: Users },
    { value: "4.9/5", label: "Note moyenne", icon: Award },
    { value: "50+", label: "Villes couvertes", icon: MapPin },
  ];

  const values = [
    { icon: Shield, title: "Sécurité Absolue", description: "Vérifications rigoureuses, paiement sécurisé, assurance premium." },
    { icon: Heart, title: "Passion Animale", description: "Des promeneurs passionnés et bienveillants." },
    { icon: Eye, title: "Transparence Totale", description: "Preuves photo, tarifs affichés, avis authentiques." },
    { icon: Zap, title: "Innovation Continue", description: "Technologie au service du bien-être animal." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Support & Aide | DogWalking - FAQ, Contact, À propos"
        description="Centre de support DogWalking : FAQ complète, formulaire de contact, et présentation de notre équipe. Trouvez toutes les réponses à vos questions."
        canonical="https://dogwalking.fr/support"
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <HelpCircle className="w-3 h-3 mr-1" />
                Centre de support
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Comment pouvons-nous vous aider ?</h1>
              <p className="text-lg text-muted-foreground mb-8">
                FAQ, contact et informations sur DogWalking, la plateforme n°1 de promenade de chiens en France.
              </p>

              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher dans l'aide..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search Results */}
        {filteredFaqs && (
          <section className="py-8">
            <div className="container mx-auto px-4 max-w-4xl">
              {filteredFaqs.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">{filteredFaqs.length} résultat{filteredFaqs.length > 1 ? "s" : ""}</h2>
                    <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>Effacer</Button>
                  </div>
                  <div className="space-y-4">
                    {filteredFaqs.map((faq, i) => (
                      <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <Badge variant="outline" className="mb-2">{faq.category}</Badge>
                          <h3 className="font-semibold mb-2">{faq.question}</h3>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-bold mb-2">Aucun résultat</h2>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>Effacer</Button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Main Content Tabs */}
        {!filteredFaqs && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Tabs value={mainTab} onValueChange={setMainTab} className="max-w-5xl mx-auto">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="faq" className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    FAQ
                  </TabsTrigger>
                  <TabsTrigger value="about" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="hidden sm:inline">À propos</span>
                    <span className="sm:hidden">Propos</span>
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Contact
                  </TabsTrigger>
                </TabsList>

                {/* ===== FAQ TAB ===== */}
                <TabsContent value="faq">
                  <Tabs value={faqTab} onValueChange={setFaqTab}>
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-2 bg-transparent p-0 mb-8">
                      {Object.entries(faqCategories).map(([key, cat]) => (
                        <TabsTrigger
                          key={key}
                          value={key}
                          className="flex items-center gap-2 py-3 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl border"
                        >
                          <cat.icon className="h-4 w-4" />
                          <span className="text-xs font-medium">{cat.title}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {Object.entries(faqCategories).map(([key, cat]) => (
                      <TabsContent key={key} value={key}>
                        <SEOFAQ faqs={cat.faqs} />
                      </TabsContent>
                    ))}
                  </Tabs>

                  {/* CTA si pas de réponse */}
                  <div className="mt-12 text-center p-8 bg-muted/30 rounded-2xl">
                    <h3 className="text-xl font-bold mb-2">Vous n'avez pas trouvé votre réponse ?</h3>
                    <p className="text-muted-foreground mb-4">Contactez-nous directement, notre équipe répond sous 24h.</p>
                    <Button onClick={() => setMainTab("contact")}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Nous contacter
                    </Button>
                  </div>
                </TabsContent>

                {/* ===== ABOUT TAB ===== */}
                <TabsContent value="about">
                  <div className="space-y-16">
                    {/* Hero About */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <div>
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                          <Heart className="w-3 h-3 mr-1" />
                          Notre Histoire
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                          Qui Sommes-Nous ? <span className="text-primary">L'Équipe DogWalking</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          Nous sommes une équipe de passionnés d'animaux et de technologie, unis par une mission : 
                          offrir aux chiens de France les meilleures promenades, en toute sécurité. Depuis 2023, 
                          nous révolutionnons le pet-sitting avec transparence, innovation et bienveillance.
                        </p>
                      </div>
                      <img src={teamImage} alt="L'équipe DogWalking" className="rounded-2xl shadow-2xl w-full object-cover aspect-video" />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-muted/30 p-8 rounded-2xl">
                      {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <stat.icon className="h-6 w-6 text-primary" />
                          </div>
                          <p className="text-3xl font-bold text-primary">{stat.value}</p>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Mission */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <img src={missionImage} alt="Badge de vérification DogWalking" className="rounded-2xl shadow-lg w-full object-cover aspect-square" />
                      <div>
                        <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                          <Target className="w-3 h-3 mr-1" />
                          Notre Mission
                        </Badge>
                        <h2 className="text-3xl font-bold mb-6">Révolutionner le Pet-Sitting en France</h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                          Chaque promeneur est soigneusement sélectionné, chaque prestation documentée, 
                          chaque paiement sécurisé. Zéro inquiétude.
                        </p>
                        <div className="space-y-3">
                          {["Vérification d'identité et casier judiciaire", "Assurance RC obligatoire", "Preuves photo/vidéo à chaque mission", "Paiement escrow 100% sécurisé"].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Values */}
                    <div>
                      <h2 className="text-3xl font-bold mb-8 text-center">Nos Valeurs</h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                          <Card key={i} className="h-full hover:shadow-lg transition-shadow border-2 hover:border-primary/30">
                            <CardContent className="p-6 text-center">
                              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <v.icon className="h-7 w-7 text-primary" />
                              </div>
                              <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                              <p className="text-muted-foreground">{v.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Experts */}
                    <div>
                      <h2 className="text-3xl font-bold mb-8 text-center">Les Experts Derrière DogWalking</h2>
                      <div className="grid md:grid-cols-2 gap-8">
                        {experts.map((expert, i) => (
                          <ExpertBio key={expert.id} expert={expert} />
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* ===== CONTACT TAB ===== */}
                <TabsContent value="contact">
                  {/* Contact Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {contactInfo.map((info, i) => (
                      <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <info.icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          {info.link ? (
                            <a href={info.link} className="text-sm text-muted-foreground hover:text-primary transition-colors">{info.value}</a>
                          ) : (
                            <p className="text-sm text-muted-foreground">{info.value}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Form */}
                  <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                      <CardTitle>Envoyez-nous un message</CardTitle>
                      <CardDescription>Nous vous répondrons dans les plus brefs délais.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isSubmitted ? (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Message envoyé !</h3>
                          <p className="text-muted-foreground mb-6">Réponse sous 24h maximum.</p>
                          <Button onClick={() => setIsSubmitted(false)} variant="outline">Envoyer un autre message</Button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Nom complet *</Label>
                              <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Jean Dupont" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email *</Label>
                              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jean@exemple.fr" required />
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone">Téléphone</Label>
                              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="06 12 34 56 78" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="subject">Sujet *</Label>
                              <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Demande d'information" required />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">Message *</Label>
                            <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Décrivez votre demande..." rows={5} required />
                          </div>
                          <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Envoi en cours..." : <><Send className="h-4 w-4 mr-2" />Envoyer le message</>}
                          </Button>
                        </form>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Support;
