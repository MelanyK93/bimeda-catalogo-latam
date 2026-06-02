import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, BookOpen, Search, Settings, Share2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useLanguage } from "@/lib/LanguageContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ChatWidget from "../components/chat/ChatWidget";
import BuzonSugerencias from "../components/BuzonSugerencias";

const baseNavItems = [
  { title: "Inicio", url: createPageUrl("Home"), icon: Home },
  { title: "Catálogo", url: createPageUrl("Catalogo"), icon: BookOpen },
  { title: "Búsqueda Avanzada", url: createPageUrl("Busqueda"), icon: Search },
  { title: "Redes Sociales", url: createPageUrl("RedesSociales"), icon: Share2 },
];

const adminNavItem = { title: "Administrar Productos", url: createPageUrl("Admin"), icon: Settings };

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    base44.auth.me().then(user => {
      if (user?.role === "admin") setIsAdmin(true);
    }).catch(() => {});
  }, []);

  const baseNavItemsTranslated = [
    { title: t("nav_home"), url: createPageUrl("Home"), icon: Home },
    { title: t("nav_catalog"), url: createPageUrl("Catalogo"), icon: BookOpen },
    { title: t("nav_search"), url: createPageUrl("Busqueda"), icon: Search },
    { title: t("nav_social"), url: createPageUrl("RedesSociales"), icon: Share2 },
  ];
  const adminNavItemTranslated = { title: t("nav_admin"), url: createPageUrl("Admin"), icon: Settings };
  const navigationItems = isAdmin ? [...baseNavItemsTranslated, adminNavItemTranslated] : baseNavItemsTranslated;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-red-50 to-rose-50">
        <Sidebar className="border-r border-slate-200 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691343752dd769d27639030b/d7dc605ce_Bimeda-logotipoPNG.png"
                alt="Bimeda"
                className="h-10 object-contain"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">{t("nav_subtitle")}</p>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-2">
                {t("nav_navigation")}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`transition-all duration-200 rounded-xl mb-1 ${
                          location.pathname === item.url 
                            ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-200' 
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-2.5">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Language Toggle */}
            <div className="mx-3 mt-4 space-y-2">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3">{t("nav_language")}</p>
              <div className="flex gap-2">
                {["es", "pt", "en"].map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      localStorage.setItem("bimeda_lang", l);
                    }}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      lang === l
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-200"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {l === "es" ? "Español" : l === "pt" ? "Português" : "English"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 mx-3 p-4 bg-gradient-to-br from-red-600 to-red-700 rounded-xl text-white overflow-hidden relative">
              <div className="relative z-10">
                <p className="text-sm font-medium mb-1">{t("nav_tagline")}</p>
                <p className="text-xs opacity-90">{t("nav_tagline_sub")}</p>
              </div>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691343752dd769d27639030b/956eafb9a_Bimeda_Logo_white-text.png"
                alt="Bimeda"
                className="absolute bottom-2 right-2 h-6 opacity-30"
              />
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 md:hidden sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691343752dd769d27639030b/d7dc605ce_Bimeda-logotipoPNG.png"
                alt="Bimeda"
                className="h-6 object-contain"
              />
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>

        <ChatWidget />
        <BuzonSugerencias />
      </div>
    </SidebarProvider>
  );
}