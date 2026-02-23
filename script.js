(function () {
  const $ = (q) => document.querySelector(q);

  // --- Theme ---
  const themeToggle = $("#themeToggle");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("ha_theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  themeToggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("ha_theme", next);
  });

  // --- Mobile menu ---
  const hamburger = $("#hamburger");
  const mobileMenu = $("#mobileMenu");

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.hidden = true;
    hamburger?.setAttribute("aria-expanded", "false");
  }

  hamburger?.addEventListener("click", () => {
    if (!mobileMenu) return;
    const isOpen = !mobileMenu.hidden;
    mobileMenu.hidden = isOpen;
    hamburger.setAttribute("aria-expanded", String(!isOpen));
  });

  mobileMenu?.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) closeMobileMenu();
  });

  // Close on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });

  // --- i18n ---
  const langSelect = $("#langSelect");

  const dict = {
    pt: {
      skip: "Pular para conteúdo",
      theme: "Tema",
      badge: "Educação Étnico-Racial o ano todo • Lei 10.639/03",
      menuBenefits: "Benefícios",
      menuHow: "Como funciona",
      menuImpact: "Impacto",
      menuKit: "Kit 01",
      menuContact: "Contato",
      heroLine1: "Centralize a prática.",
      heroLine2: "Elimine o improviso.",
      heroSub:
        "O Horizonte Afro oferece formação prática + kit pedagógico + evidências para implementação contínua da Lei 10.639/03. Menos “evento” e mais rotina pedagógica.",
      ctaPrimary: "Abrir Kit 01 (PDF)",
      ctaSecondary: "Ver prévia do kit",
      kpi1: "clareza didática",
      kpi2: "kit aplicável",
      kpi3: "retrabalho sem evidência",
      cardTitle: "O que você leva",
      card1: "Roteiros prontos para aplicar",
      card2: "Checklist + sequência didática",
      card3: "Modelo de evidências por turma",
      card4: "Versão institucional do Kit 01",
      cardCta: "Abrir documento oficial",
      benefTitle: "Por que o Horizonte Afro?",
      benefLead:
        "Chega de fazer “uma aula no novembro” e chamar isso de implementação. Aqui é estrutura: prática + material + evidência.",
      b1t: "Aplicação real",
      b1d: "Atividades e sequências didáticas prontas para adaptar ao território e ao ano/série.",
      b2t: "Fonte única",
      b2d: "Kit + organização pedagógica: menos dispersão, mais consistência e continuidade.",
      b3t: "Evidências",
      b3d: "Modelo simples de evidências para acompanhamento por escola e rede (sem virar burocracia).",
      b4t: "Institucional",
      b4d: "Formato e linguagem prontos para apresentar em secretaria, direção e coordenação pedagógica.",
      howTitle: "Itinerário de valor",
      howLead: "Um fluxo simples para sair do “evento” e entrar no “processo contínuo”.",
      h1t: "Diagnóstico rápido",
      h1d: "Mapeie turma, contexto e pontos de partida (sem travar em burocracia).",
      h2t: "Aplicação com kit",
      h2d: "Use as sequências e adaptações por território, com roteiro e checklist.",
      h3t: "Evidências & melhoria",
      h3d: "Registre evidências essenciais e ajuste o percurso. Evolução mensal, sem sofrimento.",
      callTitle: "Pronto pra ver o Kit 01?",
      callDesc: "Abra o documento institucional completo em uma nova aba.",
      callBtn: "Abrir PDF",
      impactTitle: "Impacto real na prática",
      quoteText:
        "“Antes era só ação pontual. Com o kit e o roteiro, a escola ganhou continuidade. A coordenação passou a ter evidências simples, e a equipe se sentiu mais segura para trabalhar a temática o ano todo.”",
      quoteBy: "Coordenação pedagógica",
      quoteOrg: "Escola pública • Brasil",
      kitTitle: "Kit Pedagógico 01",
      kitLead: "Documento institucional com proposta pedagógica, estrutura metodológica e modelo de aplicação.",
      seal: "DOCUMENTO OFICIAL",
      kitCardTitle: "Abrir o Kit Pedagógico",
      kitCardDesc:
        "Use o PDF como referência institucional e base de implementação. O preview pode variar por navegador.",
      kitOpen: "Abrir Kit 01 (PDF)",
      kitDownload: "Baixar PDF",
      kitNote: "Se o preview não carregar, use “Abrir Kit 01 (PDF)”.",
      contactTitle: "Contato",
      contactLead: "Quer parceria, piloto ou apresentação? Fale direto.",
      contactCardTitle: "Fale com a equipe",
      emailBtn: "Enviar e-mail",
      waBtn: "Abrir WhatsApp",
      contactCtaTitle: "Baixe o Kit 01",
      contactCtaDesc: "Documento institucional para apresentar na escola/rede.",
      contactCtaBtn: "Abrir PDF",
      footerDesc: "Site institucional do Horizonte Afro.",
    },

    en: {
      skip: "Skip to content",
      theme: "Theme",
      badge: "Ethnic-Racial Education all year • Law 10.639/03",
      menuBenefits: "Benefits",
      menuHow: "How it works",
      menuImpact: "Impact",
      menuKit: "Kit 01",
      menuContact: "Contact",
      heroLine1: "Centralize practice.",
      heroLine2: "Remove improvisation.",
      heroSub:
        "Horizonte Afro delivers practical training + a teaching kit + evidence to sustain Law 10.639/03 year-round. Less “event”, more routine.",
      ctaPrimary: "Open Kit 01 (PDF)",
      ctaSecondary: "Preview the kit",
      kpi1: "teaching clarity",
      kpi2: "ready-to-use kit",
      kpi3: "rework without evidence",
      cardTitle: "What you get",
      card1: "Ready-to-apply lesson routes",
      card2: "Checklist + learning sequence",
      card3: "Evidence model per class",
      card4: "Institutional version of Kit 01",
      cardCta: "Open official document",
      benefTitle: "Why Horizonte Afro?",
      benefLead:
        "No more “one class in November” and calling it implementation. This is structure: practice + material + evidence.",
      b1t: "Real application",
      b1d: "Sequences and activities ready to adapt to territory and grade level.",
      b2t: "Single source",
      b2d: "Kit + organization: less dispersion, more consistency and continuity.",
      b3t: "Evidence",
      b3d: "Simple evidence model for school/district tracking (without bureaucracy).",
      b4t: "Institutional",
      b4d: "Ready to present to principals, coordinators, and education departments.",
      howTitle: "Value journey",
      howLead: "A simple flow to move from “event” to “continuous process”.",
      h1t: "Quick diagnosis",
      h1d: "Map class, context, and starting points (without getting stuck).",
      h2t: "Apply with the kit",
      h2d: "Use sequences and territory adaptations with checklist and guidance.",
      h3t: "Evidence & improvement",
      h3d: "Capture essential evidence and iterate monthly—without pain.",
      callTitle: "Ready to see Kit 01?",
      callDesc: "Open the full institutional document in a new tab.",
      callBtn: "Open PDF",
      impactTitle: "Real impact in practice",
      quoteText:
        "“It used to be only punctual actions. With the kit and guidance, the school gained continuity. Coordination got simple evidence, and the team felt safer to work year-round.”",
      quoteBy: "Pedagogical coordination",
      quoteOrg: "Public school • Brazil",
      kitTitle: "Teaching Kit 01",
      kitLead: "Institutional document with pedagogical proposal, methodology, and application model.",
      seal: "OFFICIAL DOCUMENT",
      kitCardTitle: "Open the Teaching Kit",
      kitCardDesc: "Use the PDF as an institutional reference. Preview may vary by browser.",
      kitOpen: "Open Kit 01 (PDF)",
      kitDownload: "Download PDF",
      kitNote: "If preview fails, use “Open Kit 01 (PDF)”.",
      contactTitle: "Contact",
      contactLead: "Partnership, pilot, or presentation? Reach out.",
      contactCardTitle: "Talk to the team",
      emailBtn: "Send email",
      waBtn: "Open WhatsApp",
      contactCtaTitle: "Get Kit 01",
      contactCtaDesc: "Institutional document to present to schools/districts.",
      contactCtaBtn: "Open PDF",
      footerDesc: "Institutional website of Horizonte Afro.",
    },

    fr: {
      skip: "Aller au contenu",
      theme: "Thème",
      badge: "Éducation ethno-raciale toute l’année • Loi 10.639/03",
      menuBenefits: "Bénéfices",
      menuHow: "Fonctionnement",
      menuImpact: "Impact",
      menuKit: "Kit 01",
      menuContact: "Contact",
      heroLine1: "Centralisez la pratique.",
      heroLine2: "Stop à l’improvisation.",
      heroSub:
        "Horizonte Afro propose une formation pratique + un kit pédagogique + des preuves pour maintenir la Loi 10.639/03 toute l’année.",
      ctaPrimary: "Ouvrir le Kit 01 (PDF)",
      ctaSecondary: "Aperçu du kit",
      kpi1: "clarté pédagogique",
      kpi2: "kit prêt à l’emploi",
      kpi3: "retravail sans preuves",
      cardTitle: "Ce que vous obtenez",
      card1: "Parcours prêts à appliquer",
      card2: "Checklist + séquence",
      card3: "Modèle de preuves par classe",
      card4: "Version institutionnelle du Kit 01",
      cardCta: "Ouvrir le document officiel",
      benefTitle: "Pourquoi Horizonte Afro ?",
      benefLead:
        "Fini “une séance en novembre” et on appelle ça une mise en œuvre. Ici: pratique + matériel + preuves.",
      b1t: "Application réelle",
      b1d: "Séquences et activités prêtes à adapter au territoire et au niveau.",
      b2t: "Source unique",
      b2d: "Kit + organisation: moins de dispersion, plus de continuité.",
      b3t: "Preuves",
      b3d: "Modèle simple de preuves (sans bureaucratie).",
      b4t: "Institutionnel",
      b4d: "Prêt à présenter aux directions et aux services d’éducation.",
      howTitle: "Parcours de valeur",
      howLead: "Un flux simple: de “l’événement” au “processus continu”.",
      h1t: "Diagnostic rapide",
      h1d: "Cartographier classe, contexte et points de départ.",
      h2t: "Application avec le kit",
      h2d: "Séquences + adaptations territoriales avec checklist.",
      h3t: "Preuves & amélioration",
      h3d: "Collecter l’essentiel et itérer mensuellement.",
      callTitle: "Voir le Kit 01 ?",
      callDesc: "Ouvrez le document institutionnel complet dans un nouvel onglet.",
      callBtn: "Ouvrir le PDF",
      impactTitle: "Impact réel",
      quoteText:
        "« Avant, c’était ponctuel. Avec le kit, l’école a gagné en continuité. La coordination a eu des preuves simples et l’équipe s’est sentie plus sûre toute l’année. »",
      quoteBy: "Coordination pédagogique",
      quoteOrg: "École publique • Brésil",
      kitTitle: "Kit pédagogique 01",
      kitLead: "Document institutionnel: proposition, méthodologie et modèle d’application.",
      seal: "DOCUMENT OFFICIEL",
      kitCardTitle: "Ouvrir le kit",
      kitCardDesc: "Utilisez le PDF comme référence institutionnelle. L’aperçu peut varier.",
      kitOpen: "Ouvrir le Kit 01 (PDF)",
      kitDownload: "Télécharger le PDF",
      kitNote: "Si l’aperçu échoue, utilisez « Ouvrir le Kit 01 ». ",
      contactTitle: "Contact",
      contactLead: "Partenariat, pilote ou présentation ? Contactez-nous.",
      contactCardTitle: "Parler à l’équipe",
      emailBtn: "Envoyer un e-mail",
      waBtn: "Ouvrir WhatsApp",
      contactCtaTitle: "Obtenir le Kit 01",
      contactCtaDesc: "Document institutionnel pour écoles/réseaux.",
      contactCtaBtn: "Ouvrir le PDF",
      footerDesc: "Site institutionnel de Horizonte Afro.",
    },

    es: {
      skip: "Saltar al contenido",
      theme: "Tema",
      badge: "Educación étnico-racial todo el año • Ley 10.639/03",
      menuBenefits: "Beneficios",
      menuHow: "Cómo funciona",
      menuImpact: "Impacto",
      menuKit: "Kit 01",
      menuContact: "Contacto",
      heroLine1: "Centraliza la práctica.",
      heroLine2: "Elimina la improvisación.",
      heroSub:
        "Horizonte Afro ofrece formación práctica + kit pedagógico + evidencias para sostener la Ley 10.639/03 todo el año.",
      ctaPrimary: "Abrir Kit 01 (PDF)",
      ctaSecondary: "Ver vista previa",
      kpi1: "claridad didáctica",
      kpi2: "kit aplicable",
      kpi3: "retrabajo sin evidencia",
      cardTitle: "Qué incluye",
      card1: "Rutas listas para aplicar",
      card2: "Checklist + secuencia",
      card3: "Modelo de evidencias por clase",
      card4: "Versión institucional del Kit 01",
      cardCta: "Abrir documento oficial",
      benefTitle: "¿Por qué Horizonte Afro?",
      benefLead:
        "Basta de “una clase en noviembre” y llamarlo implementación. Aquí: práctica + material + evidencias.",
      b1t: "Aplicación real",
      b1d: "Secuencias y actividades listas para adaptar a territorio y nivel.",
      b2t: "Fuente única",
      b2d: "Kit + organización: menos dispersión, más continuidad.",
      b3t: "Evidencias",
      b3d: "Modelo simple de evidencias (sin burocracia).",
      b4t: "Institucional",
      b4d: "Listo para presentar a dirección y secretarías.",
      howTitle: "Itinerario de valor",
      howLead: "Flujo simple: del “evento” al “proceso continuo”.",
      h1t: "Diagnóstico rápido",
      h1d: "Mapea clase, contexto y punto de partida.",
      h2t: "Aplicación con kit",
      h2d: "Secuencias + adaptaciones territoriales con checklist.",
      h3t: "Evidencias y mejora",
      h3d: "Registra lo esencial y ajusta mensualmente.",
      callTitle: "¿Listo para ver el Kit 01?",
      callDesc: "Abre el documento institucional completo en una nueva pestaña.",
      callBtn: "Abrir PDF",
      impactTitle: "Impacto real",
      quoteText:
        "“Antes eran acciones puntuales. Con el kit, la escuela ganó continuidad. La coordinación tuvo evidencias simples y el equipo se sintió más seguro todo el año.”",
      quoteBy: "Coordinación pedagógica",
      quoteOrg: "Escuela pública • Brasil",
      kitTitle: "Kit pedagógico 01",
      kitLead: "Documento institucional: propuesta, metodología y modelo de aplicación.",
      seal: "DOCUMENTO OFICIAL",
      kitCardTitle: "Abrir el kit",
      kitCardDesc: "Usa el PDF como referencia institucional. La vista previa puede variar.",
      kitOpen: "Abrir Kit 01 (PDF)",
      kitDownload: "Descargar PDF",
      kitNote: "Si falla la vista previa, usa “Abrir Kit 01 (PDF)”.",
      contactTitle: "Contacto",
      contactLead: "¿Alianza, piloto o presentación? Escríbenos.",
      contactCardTitle: "Habla con el equipo",
      emailBtn: "Enviar email",
      waBtn: "Abrir WhatsApp",
      contactCtaTitle: "Obtener Kit 01",
      contactCtaDesc: "Documento institucional para escuelas/redes.",
      contactCtaBtn: "Abrir PDF",
      footerDesc: "Sitio institucional de Horizonte Afro.",
    },
  };

  function applyI18n(lang) {
    const t = dict[lang] || dict.pt;
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key]) el.textContent = t[key];
    });
  }

  const savedLang = localStorage.getItem("ha_lang") || "pt";
  if (langSelect) {
    langSelect.value = savedLang;
    langSelect.addEventListener("change", (e) => {
      const lang = e.target.value;
      localStorage.setItem("ha_lang", lang);
      applyI18n(lang);
    });
  }
  applyI18n(savedLang);
})();