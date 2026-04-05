import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, FileText, Scale, Users, Database, Settings } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const RessourcesLegales = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("mentions");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["mentions", "cgu", "confidentialite"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Ressources Légales | DogWalking"
        description="Mentions légales, conditions générales d'utilisation et politique de confidentialité de DogWalking, plateforme de promenade de chiens en France."
        canonical="https://dogwalking.fr/ressources-legales"
        noindex
      />
      <Header />

      <main className="container mx-auto px-4 py-24 max-w-5xl">
        <h1 className="text-4xl font-bold mb-2">Ressources Légales</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Retrouvez toutes les informations juridiques et réglementaires de DogWalking.
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="mentions" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Mentions légales</span>
              <span className="sm:hidden">Mentions</span>
            </TabsTrigger>
            <TabsTrigger value="cgu" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              <span>CGU</span>
            </TabsTrigger>
            <TabsTrigger value="confidentialite" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Confidentialité</span>
              <span className="sm:hidden">RGPD</span>
            </TabsTrigger>
          </TabsList>

          {/* ===== MENTIONS LÉGALES ===== */}
          <TabsContent value="mentions">
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Éditeur du site</h2>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="mb-2"><strong>Raison sociale :</strong> DogWalking SAS</p>
                  <p className="mb-2"><strong>Forme juridique :</strong> Société par Actions Simplifiée</p>
                  <p className="mb-2"><strong>Capital social :</strong> 10 000 €</p>
                  <p className="mb-2"><strong>Siège social :</strong> 123 Avenue des Champs-Élysées, 75008 Paris</p>
                  <p className="mb-2"><strong>SIRET :</strong> XXX XXX XXX XXXXX</p>
                  <p className="mb-2"><strong>RCS :</strong> Paris B XXX XXX XXX</p>
                  <p className="mb-2"><strong>TVA Intracommunautaire :</strong> FR XX XXX XXX XXX</p>
                  <p className="mb-2"><strong>Directeur de la publication :</strong> [Nom du dirigeant]</p>
                  <p className="mb-2"><strong>Email :</strong> contact@dogwalking.fr</p>
                  <p><strong>Téléphone :</strong> 01 XX XX XX XX</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Hébergement</h2>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="mb-2"><strong>Hébergeur :</strong> Supabase Inc.</p>
                  <p className="mb-2"><strong>Adresse :</strong> 970 Toa Payoh North #07-04, Singapore 318992</p>
                  <p><strong>Site web :</strong> https://supabase.com</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Activité</h2>
                <p className="text-muted-foreground">
                  DogWalking est une plateforme de mise en relation entre propriétaires de chiens 
                  et promeneurs professionnels. Notre service permet de réserver des prestations 
                  de promenade, garde, et autres services animaliers en toute confiance.
                </p>
                <p className="text-muted-foreground mt-4"><strong>Code APE :</strong> 9609Z - Autres services personnels n.c.a.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Propriété intellectuelle</h2>
                <p className="text-muted-foreground">
                  L'ensemble du contenu de ce site est la propriété exclusive de DogWalking SAS 
                  ou de ses partenaires, et est protégé par les lois françaises et internationales 
                  relatives à la propriété intellectuelle.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Protection des données personnelles</h2>
                <p className="text-muted-foreground">
                  Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit 
                  d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
                </p>
                <div className="bg-muted/50 p-6 rounded-lg mt-4">
                  <p><strong>Délégué à la Protection des Données (DPO) :</strong></p>
                  <p>Email : dpo@dogwalking.fr</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Limitation de responsabilité</h2>
                <p className="text-muted-foreground">
                  En qualité de plateforme de mise en relation, DogWalking n'est pas partie aux 
                  contrats conclus entre les utilisateurs et n'assume aucune responsabilité quant 
                  à l'exécution des prestations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Droit applicable</h2>
                <p className="text-muted-foreground">
                  Les présentes mentions légales sont régies par le droit français. En cas de litige, 
                  les tribunaux français seront compétents.
                </p>
              </section>

              <p className="text-sm text-muted-foreground mt-12 pt-8 border-t">Dernière mise à jour : Décembre 2024</p>
            </div>
          </TabsContent>

          {/* ===== CGU ===== */}
          <TabsContent value="cgu">
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Préambule</h2>
                <p className="text-muted-foreground">
                  Les présentes Conditions Générales d'Utilisation régissent l'utilisation de la plateforme 
                  DogWalking accessible à l'adresse www.dogwalking.fr. En utilisant nos services, vous acceptez 
                  sans réserve les présentes CGU.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Article 1 - Définitions</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>"Plateforme"</strong> : le site internet DogWalking et ses fonctionnalités</li>
                  <li><strong>"Propriétaire"</strong> : utilisateur inscrit en qualité de propriétaire de chien</li>
                  <li><strong>"Promeneur"</strong> : utilisateur inscrit en qualité de prestataire de services</li>
                  <li><strong>"Prestation"</strong> : tout service réservé via la Plateforme</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Article 2 - Objet de la Plateforme</h2>
                <p className="text-muted-foreground">
                  DogWalking est une plateforme de mise en relation permettant la recherche de promeneurs, 
                  la réservation et le paiement de prestations, la communication et le suivi avec preuves.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Article 3 - Inscription et Compte</h2>
                <p className="text-muted-foreground">
                  L'inscription est ouverte à toute personne majeure (18 ans minimum). Les promeneurs doivent 
                  fournir des documents justificatifs (CNI, casier judiciaire, attestation d'assurance) vérifiés 
                  par nos équipes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Article 4 - Tarifs et Paiement</h2>
                <p className="text-muted-foreground mb-4">
                  Les tarifs sont librement fixés par les promeneurs. DogWalking prélève une commission de 13% 
                  sur chaque prestation. Le paiement est bloqué lors de la réservation (escrow) et libéré après 
                  validation de la prestation.
                </p>
                <h3 className="text-xl font-medium mb-2">Annulation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Plus de 48h avant : remboursement intégral</li>
                  <li>Entre 24h et 48h : remboursement de 50%</li>
                  <li>Moins de 24h : aucun remboursement</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Article 5 - Obligations des Utilisateurs</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Propriétaire</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                      <li>Informations exactes sur son chien</li>
                      <li>Vaccinations à jour</li>
                      <li>Respect des horaires</li>
                      <li>Paiement des prestations</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Promeneur</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                      <li>Qualifications nécessaires</li>
                      <li>Assurance RC professionnelle</li>
                      <li>Preuves de chaque prestation</li>
                      <li>Bienveillance envers les animaux</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Article 6 - Responsabilité</h2>
                <p className="text-muted-foreground">
                  DogWalking agit en qualité d'intermédiaire technique. L'assurance RC couvre les prestations 
                  réalisées via la plateforme.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Article 7 - Résiliation et Litiges</h2>
                <p className="text-muted-foreground">
                  L'utilisateur peut résilier son compte à tout moment. Les CGU sont soumises au droit français. 
                  Les tribunaux de Paris sont compétents.
                </p>
              </section>

              <p className="text-sm text-muted-foreground mt-12 pt-8 border-t">Dernière mise à jour : Décembre 2024</p>
            </div>
          </TabsContent>

          {/* ===== CONFIDENTIALITÉ ===== */}
          <TabsContent value="confidentialite">
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              {/* Key points */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 not-prose">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Shield className="h-10 w-10 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Conforme RGPD</h3>
                    <p className="text-sm text-muted-foreground">Respect du règlement européen</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Lock className="h-10 w-10 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Données sécurisées</h3>
                    <p className="text-sm text-muted-foreground">Chiffrement SSL/TLS</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Eye className="h-10 w-10 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Transparence</h3>
                    <p className="text-sm text-muted-foreground">Vous gardez le contrôle</p>
                  </CardContent>
                </Card>
              </div>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Database className="h-6 w-6 text-primary" />
                  1. Responsable du traitement
                </h2>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="mb-2"><strong>DogWalking SAS</strong></p>
                  <p className="mb-2">123 Avenue des Champs-Élysées, 75008 Paris</p>
                  <p>Email : dpo@dogwalking.fr</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  2. Données collectées
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Identification</h3>
                    <p className="text-sm text-muted-foreground">Nom, email, téléphone, adresse, photo</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Animaux</h3>
                    <p className="text-sm text-muted-foreground">Nom, race, âge, tempérament, santé</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Promeneurs</h3>
                    <p className="text-sm text-muted-foreground">CNI, casier, assurance, coordonnées bancaires</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Navigation</h3>
                    <p className="text-sm text-muted-foreground">IP, navigateur, pages visitées, cookies</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Settings className="h-6 w-6 text-primary" />
                  3. Finalités et durée de conservation
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Compte</strong> : durée de la relation + 3 ans</li>
                  <li><strong>Transactions</strong> : 10 ans (obligation légale)</li>
                  <li><strong>Documents de vérification</strong> : durée de l'activité + 5 ans</li>
                  <li><strong>Données de navigation</strong> : 13 mois maximum</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Vos droits RGPD</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["Droit d'accès", "Droit de rectification", "Droit à l'effacement", "Droit à la portabilité", "Droit d'opposition", "Droit à la limitation"].map((droit) => (
                    <div key={droit} className="bg-muted/50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-sm">{droit}</h4>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground mt-4">
                  Pour exercer vos droits : <strong>dpo@dogwalking.fr</strong>. Réponse sous 30 jours.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Sécurité des données</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Chiffrement SSL/TLS</li>
                  <li>Authentification à deux facteurs disponible</li>
                  <li>Accès restreint (principe du moindre privilège)</li>
                  <li>Sauvegardes régulières et sécurisées</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Réclamation</h2>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="mb-2"><strong>CNIL</strong></p>
                  <p className="mb-2">3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07</p>
                  <p><a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cnil.fr</a></p>
                </div>
              </section>

              <p className="text-sm text-muted-foreground mt-12 pt-8 border-t">Dernière mise à jour : Décembre 2024</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default RessourcesLegales;
