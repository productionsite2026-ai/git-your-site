import { User, Mail, Phone, MapPin, Camera, LogOut, FileText, Shield, Bell, Upload, RefreshCw, Trash2, Euro, Settings, Lock, Eye, EyeOff, Smartphone, Download, ChevronRight, CreditCard, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile, useWalkerProfile } from "@/hooks/useProfile";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import avatarWalker from "@/assets/avatar-walker.jpg";
import { mockProfile } from "@/data/demoData";
import { Switch } from "@/components/ui/switch";

const ProfileTab = ({ role }: { role: "owner" | "walker" }) => {
  const { user } = useAuth();
  const { data: realProfile } = useProfile();
  const { data: walkerProfile } = useWalkerProfile(user?.id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isDemo = !user;
  const profile = isDemo ? mockProfile : realProfile;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Walker pricing state
  const [hourlyRate, setHourlyRate] = useState(15);
  const [maxDogs, setMaxDogs] = useState(3);
  const [serviceRadius, setServiceRadius] = useState(5);
  const [savingPricing, setSavingPricing] = useState(false);

  // Notification prefs
  const [notifs, setNotifs] = useState({
    push: true, email: true, sms: false,
    bookings: true, messages: true, reviews: true, promos: false,
  });

  // Privacy
  const [privacy, setPrivacy] = useState({
    profileVisible: true, showCity: true, showPhone: false,
  });

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setPhone(profile.phone || "");
      setCity(profile.city || "");
      setBio(profile.bio || "");
      setAddress((profile as any).address || "");
    }
  }, [profile]);

  useEffect(() => {
    if (walkerProfile) {
      setHourlyRate(walkerProfile.hourly_rate || 15);
      setMaxDogs(walkerProfile.max_dogs || 3);
      setServiceRadius(walkerProfile.service_radius_km || 5);
    }
  }, [walkerProfile]);

  const handleSave = async () => {
    if (!user) return;
    const { error } = await supabase.from("profiles").update({
      first_name: firstName, last_name: lastName, phone, city, bio,
      updated_at: new Date().toISOString()
    }).eq("id", user.id);
    if (error) { toast.error("Erreur de sauvegarde"); return; }
    toast.success("Profil mis à jour !");
    queryClient.invalidateQueries({ queryKey: ["profile"] });
    setEditing(false);
  };

  const handleSavePricing = async () => {
    if (!user) return;
    setSavingPricing(true);
    const { error } = await supabase.from("walker_profiles").update({
      hourly_rate: hourlyRate,
      max_dogs: maxDogs,
      service_radius_km: serviceRadius,
      updated_at: new Date().toISOString()
    }).eq("user_id", user.id);
    if (error) toast.error("Erreur");
    else {
      toast.success("Tarifs enregistrés !");
      queryClient.invalidateQueries({ queryKey: ["walker_profile"] });
    }
    setSavingPricing(false);
    setActiveSection(null);
  };

  const handleAvatarUpload = async (file: File) => {
    if (!user) return;
    if (!file.type.startsWith('image/')) { toast.error("Format non supporté"); return; }
    if (file.size > 2 * 1024 * 1024) { toast.error("Image trop volumineuse (max 2MB)"); return; }
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar_${Date.now()}.${fileExt}`;
      if (profile?.avatar_url) {
        const oldPath = profile.avatar_url.split('/avatars/')[1];
        if (oldPath) await supabase.storage.from('avatars').remove([oldPath]);
      }
      const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file, { cacheControl: '3600', upsert: true });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
      await supabase.from('profiles').update({ avatar_url: urlData.publicUrl, updated_at: new Date().toISOString() }).eq('id', user.id);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Photo mise à jour !");
    } catch (error: any) { toast.error(error.message); }
    finally { setUploading(false); }
  };

  const handleRemoveAvatar = async () => {
    if (!user || !profile?.avatar_url) return;
    setUploading(true);
    try {
      const oldPath = profile.avatar_url.split('/avatars/')[1];
      if (oldPath) await supabase.storage.from('avatars').remove([oldPath]);
      await supabase.from('profiles').update({ avatar_url: null, updated_at: new Date().toISOString() }).eq('id', user.id);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Photo supprimée");
    } catch (error: any) { toast.error(error.message); }
    finally { setUploading(false); }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const serviceEstimates = [
    { label: "Promenade (1h)", price: hourlyRate },
    { label: "Visite à domicile", price: Math.round(hourlyRate * 0.8) },
    { label: "Garde journée", price: Math.round(hourlyRate * 3) },
    { label: "Accompagnement véto", price: Math.round(hourlyRate * 1.5) },
  ];

  return (
    <div className="px-4 py-6 space-y-3 pb-24">
      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl shadow-card p-5 text-center">
        <div className="relative inline-block mb-3 group">
          <img src={profile?.avatar_url || avatarWalker} alt="Avatar"
            className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/20 mx-auto transition-transform group-hover:scale-105" />
          {uploading ? (
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center mx-auto w-20 h-20">
              <RefreshCw className="w-5 h-5 text-white animate-spin" />
            </div>
          ) : (
            <button onClick={() => !isDemo && fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full gradient-primary flex items-center justify-center border-2 border-card shadow-lg hover:scale-110 transition-transform">
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
        {profile?.avatar_url && !isDemo && (
          <button onClick={handleRemoveAvatar} className="text-[10px] text-destructive font-medium flex items-center gap-1 mx-auto mb-1">
            <Trash2 className="w-3 h-3" /> Supprimer
          </button>
        )}
        <h2 className="text-lg font-black text-foreground">{profile?.first_name || "Utilisateur"} {profile?.last_name || ""}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{profile?.email}</p>
        <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">
          {role === "walker" ? "🏃 Promeneur" : "🐕 Propriétaire"}
        </span>
      </motion.div>

      <input type="file" ref={fileInputRef} accept="image/jpeg,image/png,image/webp" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleAvatarUpload(f); e.target.value = ''; }} />

      {/* Personal Info */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="bg-card rounded-2xl shadow-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-foreground text-sm">👤 Informations personnelles</h3>
          {!isDemo && (
            <button onClick={() => editing ? handleSave() : setEditing(true)}
              className="text-xs font-bold text-primary">
              {editing ? "💾 Sauvegarder" : "✏️ Modifier"}
            </button>
          )}
        </div>
        {[
          { icon: User, label: "Prénom", value: firstName, set: setFirstName },
          { icon: User, label: "Nom", value: lastName, set: setLastName },
          { icon: Phone, label: "Téléphone", value: phone, set: setPhone, placeholder: "06 12 34 56 78" },
          { icon: MapPin, label: "Ville", value: city, set: setCity, placeholder: "Paris, Lyon..." },
          { icon: Home, label: "Adresse", value: address, set: setAddress, placeholder: "12 rue de la Paix" },
        ].map((field) => (
          <div key={field.label} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
              <field.icon className="w-4 h-4 text-primary" />
            </div>
            {editing ? (
              <input value={field.value} onChange={e => field.set(e.target.value)}
                placeholder={field.placeholder || field.label}
                className="flex-1 px-3 py-2 rounded-xl bg-muted text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            ) : (
              <div className="flex-1">
                <p className="text-[10px] text-muted-foreground">{field.label}</p>
                <p className="text-sm font-semibold text-foreground">{field.value || "—"}</p>
              </div>
            )}
          </div>
        ))}
        {editing && (
          <div className="space-y-2">
            <label className="text-[10px] text-muted-foreground font-semibold">Bio</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Parlez de vous..."
              maxLength={500}
              className="w-full px-3 py-2 rounded-xl bg-muted text-sm text-foreground min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
            <p className="text-[9px] text-muted-foreground text-right">{bio.length}/500</p>
          </div>
        )}
        {!editing && bio && (
          <div className="bg-muted/50 rounded-xl p-3">
            <p className="text-[10px] text-muted-foreground mb-1">Bio</p>
            <p className="text-sm text-foreground leading-relaxed">{bio}</p>
          </div>
        )}
      </motion.div>

      {/* === WALKER ONLY: Pricing Section === */}
      {role === "walker" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl shadow-card overflow-hidden">
          <button onClick={() => setActiveSection(activeSection === "pricing" ? null : "pricing")}
            className="w-full p-4 flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Euro className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Mes Tarifs</p>
                <p className="text-[10px] text-muted-foreground">
                  {hourlyRate}€/h · Rayon {serviceRadius}km
                </p>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${activeSection === "pricing" ? "rotate-90" : ""}`} />
          </button>
          {activeSection === "pricing" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              className="px-4 pb-4 space-y-4 border-t border-border/50">

              {/* Hourly rate */}
              <div className="pt-3 space-y-2">
                <label className="text-xs font-bold text-muted-foreground">Tarif horaire</label>
                <div className="flex items-center gap-3">
                  <input type="range" min={8} max={50} value={hourlyRate}
                    onChange={e => setHourlyRate(Number(e.target.value))}
                    className="flex-1 accent-[hsl(var(--primary))]" />
                  <span className="text-lg font-black text-foreground w-14 text-right">{hourlyRate}€</span>
                </div>
                <div className="flex items-center justify-between bg-primary/5 rounded-xl px-3 py-2">
                  <span className="text-[10px] text-muted-foreground">Votre revenu net</span>
                  <span className="text-sm font-black text-primary">{hourlyRate}€/h</span>
                </div>
              </div>

              {/* Max dogs */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground">Chiens simultanés max</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} onClick={() => setMaxDogs(n)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        maxDogs === n ? "gradient-primary text-white shadow-card" : "bg-muted text-muted-foreground"
                      }`}>{n}</button>
                  ))}
                </div>
              </div>

              {/* Service radius */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground">Rayon d'intervention</label>
                <div className="flex items-center gap-3">
                  <input type="range" min={1} max={25} value={serviceRadius}
                    onChange={e => setServiceRadius(Number(e.target.value))}
                    className="flex-1 accent-[hsl(var(--primary))]" />
                  <span className="text-sm font-black text-foreground w-12 text-right">{serviceRadius}km</span>
                </div>
              </div>

              {/* Service estimates */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground">Tarifs estimés par service</label>
                {serviceEstimates.map(s => (
                  <div key={s.label} className="flex items-center justify-between bg-muted/50 rounded-xl px-3 py-2">
                    <span className="text-xs text-foreground">{s.label}</span>
                    <span className="text-xs font-bold text-foreground">{s.price}€</span>
                  </div>
                ))}
              </div>

              <button onClick={handleSavePricing} disabled={savingPricing}
                className="w-full py-2.5 rounded-xl gradient-primary text-white text-sm font-bold disabled:opacity-50">
                {savingPricing ? "Enregistrement..." : "💾 Enregistrer les tarifs"}
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* === WALKER ONLY: Documents Section === */}
      {role === "walker" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
          className="bg-card rounded-2xl shadow-card overflow-hidden">
          <button onClick={() => setActiveSection(activeSection === "documents" ? null : "documents")}
            className="w-full p-4 flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Mes Documents</p>
                <p className="text-[10px] text-muted-foreground">CNI, Casier B2, Attestation RC</p>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${activeSection === "documents" ? "rotate-90" : ""}`} />
          </button>
          {activeSection === "documents" && (
            <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-3">
              {[
                { label: "Pièce d'identité", status: "valid", date: "Vérifié le 12/01" },
                { label: "Extrait de casier judiciaire (B2)", status: "valid", date: "Vérifié le 12/01" },
                { label: "Attestation Assurance RC", status: "pending", date: "En cours de validation" },
              ].map(doc => (
                <div key={doc.label} className="flex items-center justify-between bg-muted/50 rounded-xl p-3">
                  <div>
                    <p className="text-xs font-bold text-foreground">{doc.label}</p>
                    <p className="text-[9px] text-muted-foreground">{doc.date}</p>
                  </div>
                  <Badge className={doc.status === "valid" ? "bg-green-500/10 text-green-600 border-0" : "bg-amber-500/10 text-amber-600 border-0"}>
                    {doc.status === "valid" ? "Vérifié" : "En attente"}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs font-bold gap-2">
                <Upload className="w-3 h-3" /> Ajouter un document
              </Button>
            </div>
          )}
        </motion.div>
      )}

      {/* Settings & Help */}
      <div className="space-y-2">
        {[
          { label: "Notifications", icon: Bell, path: "/walker/dashboard?tab=notifs" },
          { label: "Sécurité & Mot de passe", icon: Lock, path: "/walker/dashboard?tab=security" },
          { label: "Centre d'aide", icon: Shield, path: "/support" },
          { label: "Nous contacter", icon: Mail, path: "/contact" },
        ].map((item) => (
          <button key={item.label} onClick={() => navigate(item.path)}
            className="w-full bg-card rounded-2xl shadow-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                <item.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-sm font-bold text-foreground">{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button onClick={handleLogout}
        className="w-full py-4 rounded-2xl bg-destructive/5 text-destructive text-sm font-bold flex items-center justify-center gap-2 border border-destructive/10">
        <LogOut className="w-4 h-4" /> Déconnexion
      </button>
    </div>
  );
};

const Button = ({ children, variant, className, ...props }: any) => (
  <button className={`px-4 py-2 rounded-xl transition-all ${variant === "outline" ? "border border-border hover:bg-muted" : "gradient-primary text-white"} ${className}`} {...props}>
    {children}
  </button>
);

export default ProfileTab;
