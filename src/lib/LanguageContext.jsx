import React, { createContext, useContext, useState } from "react";

const translations = {
  es: {
    // Nav
    nav_home: "Inicio",
    nav_catalog: "Catálogo",
    nav_search: "Búsqueda Avanzada",
    nav_social: "Redes Sociales",
    nav_admin: "Administrar Productos",
    nav_subtitle: "Catálogo Digital",
    nav_tagline: "Laboratorio Veterinario",
    nav_tagline_sub: "Productos de calidad para el cuidado animal",

    // Home Hero
    hero_badge: "Catálogo Digital de Productos Veterinarios",
    hero_title_1: "Todo lo que",
    hero_title_2: "necesitas,",
    hero_title_3: "en un solo lugar.",
    hero_subtitle: "Accede a fichas técnicas, materiales de apoyo y información detallada de todos nuestros productos para Latinoamérica.",
    hero_btn_catalog: "Ver Catálogo",
    hero_btn_search: "Búsqueda Avanzada",
    hero_btn_download: "Descargar por País",

    // Stats
    stat_products: "Productos",
    stat_products_desc: "disponibles en el catálogo",
    stat_countries: "Países",
    stat_countries_desc: "en Latinoamérica",
    stat_categories: "Categorías",
    stat_categories_desc: "de productos especializados",

    // Recent Products
    recent_label: "Actualizados recientemente",
    recent_title: "Últimas actualizaciones",
    recent_view_all: "Ver todos",

    // Features
    features_title: "Diseñado para tu equipo de ventas",
    features_subtitle: "Toda la información que necesitas, organizada y al alcance de un clic.",
    feature_1_title: "Acceso Rápido",
    feature_1_desc: "Encuentra cualquier producto en segundos con nuestra búsqueda avanzada.",
    feature_2_title: "Calidad Garantizada",
    feature_2_desc: "Productos veterinarios certificados y avalados por Bimeda.",
    feature_3_title: "Cobertura Regional",
    feature_3_desc: "Materiales y fichas técnicas organizados por país y región.",

    // Species
    species_title: "Explora por Especie",
    species_subtitle: "Selecciona una especie para ver los productos indicados",
    species_view: "Ver productos",

    // CTA
    cta_title: "¿Listo para explorar",
    cta_title_2: "el catálogo completo?",
    cta_subtitle: "Accede a toda la información de productos, materiales de apoyo y fichas técnicas por región.",

    // Catalog page
    catalog_title: "Catálogo de Productos",
    catalog_subtitle: "Explora nuestra línea completa de productos veterinarios",
    catalog_search_placeholder: "Buscar productos...",
    catalog_all_species: "Todas las especies",
    catalog_all_categories: "Todas las categorías",
    catalog_all_countries: "Todos los países",
    catalog_showing: "Mostrando",
    catalog_product: "producto",
    catalog_products: "productos",
    catalog_active_filters: "Filtros activos:",
    catalog_clear_filters: "Limpiar filtros",
    catalog_not_found_title: "No se encontraron productos",
    catalog_not_found_sub: "Intenta ajustar los filtros de búsqueda",

    // Search page
    search_title: "Búsqueda Avanzada",
    search_subtitle: "Utiliza filtros múltiples para encontrar productos específicos",
    search_filters: "Filtros",
    search_clear_all: "Limpiar todo",
    search_text_label: "Búsqueda por texto",
    search_placeholder: "Buscar...",
    search_species: "Especies",
    search_categories: "Categorías",
    search_countries: "Países",
    search_showing: "Mostrando",
    search_result: "resultado",
    search_results: "resultados",
    search_not_found_title: "No se encontraron productos",
    search_not_found_sub: "Intenta ajustar los filtros de búsqueda",
    search_clear_all_filters: "Limpiar todos los filtros",

    // Product Modal
    modal_tab_info: "Información del Producto",
    modal_tab_materials: "Material de Producto",
    modal_description: "Descripción / Composición",
    modal_species: "Especies",
    modal_availability: "Disponibilidad por País",
    modal_tech_info: "Información Técnica",
    modal_no_materials_title: "No hay materiales disponibles",
    modal_no_materials_sub: "Este producto aún no tiene materiales de venta cargados.",
    modal_advertising: "Material Publicitario (lonas, flyers, banners...)",
    modal_tip: "💡 Tip: Haz clic en cualquier material para descargarlo. Los materiales están organizados por región para tu comodidad.",
    modal_region_mexico: "México",
    modal_region_camcar: "CAMCAR",
    modal_region_sur: "Suramérica",
    modal_region_brasil: "Brasil",
    modal_ficha: "Ficha Técnica",
    modal_presentacion: "Presentación",
    modal_infografia: "Infografía",
    modal_logotipo: "Logotipo",
  },
  pt: {
    // Nav
    nav_home: "Início",
    nav_catalog: "Catálogo",
    nav_search: "Busca Avançada",
    nav_social: "Redes Sociais",
    nav_admin: "Administrar Produtos",
    nav_subtitle: "Catálogo Digital",
    nav_tagline: "Laboratório Veterinário",
    nav_tagline_sub: "Produtos de qualidade para o cuidado animal",

    // Home Hero
    hero_badge: "Catálogo Digital de Produtos Veterinários",
    hero_title_1: "Tudo o que",
    hero_title_2: "você precisa,",
    hero_title_3: "em um só lugar.",
    hero_subtitle: "Acesse fichas técnicas, materiais de apoio e informações detalhadas de todos os nossos produtos para a América Latina.",
    hero_btn_catalog: "Ver Catálogo",
    hero_btn_search: "Busca Avançada",
    hero_btn_download: "Baixar por País",

    // Stats
    stat_products: "Produtos",
    stat_products_desc: "disponíveis no catálogo",
    stat_countries: "Países",
    stat_countries_desc: "na América Latina",
    stat_categories: "Categorias",
    stat_categories_desc: "de produtos especializados",

    // Recent Products
    recent_label: "Atualizados recentemente",
    recent_title: "Últimas atualizações",
    recent_view_all: "Ver todos",

    // Features
    features_title: "Projetado para sua equipe de vendas",
    features_subtitle: "Todas as informações que você precisa, organizadas e a um clique de distância.",
    feature_1_title: "Acesso Rápido",
    feature_1_desc: "Encontre qualquer produto em segundos com nossa busca avançada.",
    feature_2_title: "Qualidade Garantida",
    feature_2_desc: "Produtos veterinários certificados e aprovados pela Bimeda.",
    feature_3_title: "Cobertura Regional",
    feature_3_desc: "Materiais e fichas técnicas organizados por país e região.",

    // Species
    species_title: "Explorar por Espécie",
    species_subtitle: "Selecione uma espécie para ver os produtos indicados",
    species_view: "Ver produtos",

    // CTA
    cta_title: "Pronto para explorar",
    cta_title_2: "o catálogo completo?",
    cta_subtitle: "Acesse todas as informações de produtos, materiais de apoio e fichas técnicas por região.",

    // Catalog page
    catalog_title: "Catálogo de Produtos",
    catalog_subtitle: "Explore nossa linha completa de produtos veterinários",
    catalog_search_placeholder: "Buscar produtos...",
    catalog_all_species: "Todas as espécies",
    catalog_all_categories: "Todas as categorias",
    catalog_all_countries: "Todos os países",
    catalog_showing: "Mostrando",
    catalog_product: "produto",
    catalog_products: "produtos",
    catalog_active_filters: "Filtros ativos:",
    catalog_clear_filters: "Limpar filtros",
    catalog_not_found_title: "Nenhum produto encontrado",
    catalog_not_found_sub: "Tente ajustar os filtros de busca",

    // Search page
    search_title: "Busca Avançada",
    search_subtitle: "Use múltiplos filtros para encontrar produtos específicos",
    search_filters: "Filtros",
    search_clear_all: "Limpar tudo",
    search_text_label: "Busca por texto",
    search_placeholder: "Buscar...",
    search_species: "Espécies",
    search_categories: "Categorias",
    search_countries: "Países",
    search_showing: "Mostrando",
    search_result: "resultado",
    search_results: "resultados",
    search_not_found_title: "Nenhum produto encontrado",
    search_not_found_sub: "Tente ajustar os filtros de busca",
    search_clear_all_filters: "Limpar todos os filtros",

    // Product Modal
    modal_tab_info: "Informações do Produto",
    modal_tab_materials: "Material do Produto",
    modal_description: "Descrição / Composição",
    modal_species: "Espécies",
    modal_availability: "Disponibilidade por País",
    modal_tech_info: "Informações Técnicas",
    modal_no_materials_title: "Nenhum material disponível",
    modal_no_materials_sub: "Este produto ainda não tem materiais de venda carregados.",
    modal_advertising: "Material Publicitário (lonas, flyers, banners...)",
    modal_tip: "💡 Dica: Clique em qualquer material para baixá-lo. Os materiais estão organizados por região para sua conveniência.",
    modal_region_mexico: "México",
    modal_region_camcar: "CAMCAR",
    modal_region_sur: "América do Sul",
    modal_region_brasil: "Brasil",
    modal_ficha: "Ficha Técnica",
    modal_presentacion: "Apresentação",
    modal_infografia: "Infografia",
    modal_logotipo: "Logotipo",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("bimeda_lang") || "es");

  const toggleLang = () => {
    const next = lang === "es" ? "pt" : "es";
    setLang(next);
    localStorage.setItem("bimeda_lang", next);
  };

  const t = (key) => translations[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}