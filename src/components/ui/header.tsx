import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Menu, X, Dog, Home, Calendar, Shield, CreditCard, BookOpen, Users, MessageSquare, LogOut, MapPin, PlusCircle, FileText, HelpCircle, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, Link } from "react-router-dom";

export const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase) return;

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);

      if (!session) {
        setUserType(null);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("user_type")
        .eq("id", session.user.id)
        .single();
      setUserType(profile?.user_type || null);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);

      if (!session) {
        setUserType(null);
        return;
      }

      // Avoid additional Supabase calls inside the callback
      setTimeout(() => {
        supabase
          .from("profiles")
          .select("user_type")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => setUserType(data?.user_type || null));
      }, 0);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    navigate("/");
    setIsOpen(false);
  };

  const serviceLinks = [
    { href: "/services/promenade", label: "Promenade de chien", icon: Dog },
    { href: "/services/garde", label: "Garde à domicile", icon: Home },
    { href: "/services/visite", label: "Visite à domicile", icon: Calendar },
    { href: "/services/dog-sitting", label: "Garde à votre domicile", icon: Shield },
    { href: "/services/pet-sitting", label: "Tout animal", icon: BookOpen },
    { href: "/services/marche-reguliere", label: "Marche régulière", icon: Users },
  ];

  const navLinks = [
    { href: "/", label: "Accueil", icon: Home },
    { label: "Nos services", icon: Dog, isDropdown: true, subLinks: serviceLinks },
    { href: "/find-walkers?tab=deposer", label: "Déposer une demande", icon: PlusCircle },
    { href: "/tarifs", label: "Tarifs", icon: CreditCard },
    { href: "/nos-zones", label: "Nos zones", icon: MapPin },
    { href: "/aide", label: "Aide", icon: HelpCircle },
  ];

  const authLinks = isAuthenticated ? [
    { href: userType === "walker" ? "/walker/dashboard" : "/dashboard", label: "Tableau de bord", icon: Home },
    { href: "/bookings", label: "Mes réservations", icon: Calendar },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/profile", label: "Mon profil", icon: Users },
    { href: "/referral", label: "Parrainage", icon: Users },
  ] : [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xl">🐕</span>
          </div>
          <span className="text-xl font-bold text-primary">
            DogWalking
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            link.isDropdown ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {link.subLinks?.map((subLink) => (
                    <DropdownMenuItem key={subLink.href} onClick={() => navigate(subLink.href)}>
                      {subLink.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link 
                key={link.href}
                to={link.href} 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated && <NotificationCenter />}
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(isAuthenticated ? (userType === "walker" ? "/walker/dashboard" : "/dashboard") : "/auth")}
            >
              {isAuthenticated ? "Dashboard" : "Connexion"}
            </Button>
            {!isAuthenticated && (
              <Button variant="default" size="sm" onClick={() => navigate("/auth?type=owner")}>
                S'inscrire
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 pb-6 border-b">
                  <span className="text-xl">🐕</span>
                  <span className="text-xl font-bold text-primary">DogWalking</span>
                </div>

                <nav className="flex-1 py-6 space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Navigation</p>
                  {navLinks.map((link, index) => (
                    link.isDropdown ? (
                      <div key={`dropdown-${index}`}>
                        <Link
                          to={link.subLinks?.[0]?.href || "#"}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                        >
                          {link.icon && <link.icon className="h-4 w-4 text-muted-foreground" />}
                          {link.label}
                        </Link>
                        <div className="ml-8 mt-1 space-y-1">
                          {link.subLinks?.map((subLink) => (
                            <Link
                              key={subLink.href}
                              to={subLink.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent transition-colors"
                            >
                              {subLink.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={`link-${index}`}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                      >
                        {link.icon && <link.icon className="h-4 w-4 text-muted-foreground" />}
                        {link.label}
                      </Link>
                    )
                  ))}

                  {isAuthenticated ? (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2" 
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Déconnexion
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => { navigate("/auth"); setIsOpen(false); }}
                      >
                        Connexion
                      </Button>
                      <Button 
                        className="w-full" 
                        onClick={() => { navigate("/auth?type=owner"); setIsOpen(false); }}
                      >
                        S'inscrire gratuitement
                      </Button>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
