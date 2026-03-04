(() => {
  const $ = (q) => document.querySelector(q);
  const $$ = (q) => Array.from(document.querySelectorAll(q));

  // ---------- THEME ----------
  const root = document.documentElement;
  const themeToggle = $("#themeToggle");
  const savedTheme = localStorage.getItem("ha_theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  themeToggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("ha_theme", next);
  });

  // ---------- DRAWER ----------
  const drawer = $("#drawer");
  const menuBtn = $("#menuBtn");
  const closeDrawerBtn = $("#closeDrawer");
  const drawerBackdrop = $("#drawerBackdrop");

  const openDrawer = () => {
    if (!drawer) return;
    drawer.hidden = false;
    menuBtn?.setAttribute("aria-expanded", "true");
  };
  const closeDrawer = () => {
    if (!drawer) return;
    drawer.hidden = true;
    menuBtn?.setAttribute("aria-expanded", "false");
  };

  menuBtn?.addEventListener("click", () => {
    if (!drawer) return;
    drawer.hidden ? openDrawer() : closeDrawer();
  });
  closeDrawerBtn?.addEventListener("click", closeDrawer);
  drawerBackdrop?.addEventListener("click", closeDrawer);
  drawer?.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) closeDrawer();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawer();
      closeCrud();
    }
  });

  // ---------- I18N ----------
  const langSelect = $("#langSelect");
  const dict = {
    pt: {
      skip: "Pular para conteúdo",
      theme: "Tema",

      menuBenefits: "Benefícios",
      menuHow: "Como funciona",
      menuImpact: "Impacto",
      menuFeedback: "Feedback",
      menuKit: "Kit 01",
      menuContact: "Contato",

      ctaNav: "Abrir Kit (PDF)",
      tagline: "Educação Étnico-Racial o ano todo • Lei 10.639/03",
      heroLine1: "Centralize a prática.",
      heroLine2: "Elimine o improviso.",
      heroLead:
        "Implementação contínua da Lei 10.639/03 com microformações aplicáveis, kit pedagógico e evidências reais para escolas e redes.",
      ctaWait: "Entrar para a Lista de Espera",
      ctaWait2: "Quero entrar na lista",
      ctaKitNow: "Abrir Kit 01 (PDF)",

      kpi1: "clareza didática",
      kpi2: "aplicabilidade",
      kpi3: "evento isolado",

      vip: "Lista de Espera VIP",
      beta: "Beta",
      cardTitle: "Receba acesso antecipado",
      perk1: "Suporte prioritário",
      perk2: "Sugira novas funções",
      perk3: "Grátis na fase Beta",
      cardNote: "MVP: inscrição salva localmente (opção de exportar depois).",

      benefTitle: "Por que o Horizonte Afro?",
      benefLead:
        "A Lei 10.639/03 ainda aparece como evento. A proposta transforma em prática contínua — com material, formação e evidência.",
      b1t: "Acessibilidade total",
      b1d: "Interface e materiais adaptáveis para celular e sala de aula. Ideal para aplicação no cotidiano escolar.",
      b2t: "Fonte única de verdade",
      b2d: "Kit + trilhas + checklists em um só lugar. Menos dispersão, mais consistência pedagógica.",
      b3t: "Território e conexão",
      b3d: "Conteúdos conectados às comunidades e à realidade local — sem “folclore de calendário”.",
      b4t: "Evidências e segurança",
      b4d: "Modelo simples de evidências (sem burocracia), útil para gestão, coordenação e rede.",

      howTitle: "O Itinerário de Valor",
      howLead:
        "Mesmo antes do produto completo, o fluxo já resolve o principal: continuidade com material e evidência.",
      s1t: "Diagnóstico",
      s1d: "Mapeie contexto, objetivos e ponto de partida da escola/rede.",
      s2t: "Aplicação guiada",
      s2d: "Microformações + kit para aplicar e adaptar com segurança pedagógica.",
      s3t: "Evidências & melhoria",
      s3d: "Registre evidências essenciais e evolua o percurso mensalmente.",
      callTitle: "Quer ver o Kit 01 agora?",
      callDesc: "Abra o documento institucional completo em uma nova aba.",
      callBtn: "Abrir PDF",

      impactTitle: "O Impacto Real na Prática",
      impactQuote:
        "“A Lei 10.639/03 ainda aparece como evento, não como prática contínua. A proposta responde a uma demanda concreta da escola.”",
      impactWho: "Feedback (Santander Xplorer)",
      impactOrg: "educação básica",

      fbTitle: "Feedback dos usuários",
      fbLead:
        "Relevância, aplicabilidade, território e evidências — os pontos mais citados por quem viu a proposta.",
      fbTag: "colegas do programa",

      kitTitle: "Kit Pedagógico 01",
      kitLead:
        "Documento institucional com proposta pedagógica, estrutura metodológica e modelo de aplicação.",
      seal: "DOCUMENTO OFICIAL",
      kitCardTitle: "Abrir o Kit Pedagógico",
      kitCardDesc:
        "Use o PDF como referência institucional e base de implementação. O preview pode variar por navegador.",
      kitOpen: "Abrir Kit 01 (PDF)",
      kitDownload: "Baixar PDF",
      kitNote: "Se o preview não carregar, use “Abrir Kit 01 (PDF)”.",

      waitTitle: "Pronto para inovar?",
      waitLead:
        "Entre na Lista de Espera VIP para acesso antecipado, novidades e possibilidade de co-criação.",
      waitSideTitle: "O que você recebe",
      crudNote: "CRUD é local (navegador). Para produção, plugamos num backend depois.",

      fName: "Nome completo *",
      fEmail: "E-mail *",
      fRole: "Perfil *",
      fRoleChoose: "Selecione",
      fRole1: "Docente",
      fRole2: "Gestão/Coordenação",
      fRole3: "Secretaria/Rede",
      fRole4: "Pesquisa/Universidade",
      fRole5: "Outro",
      fCity: "Cidade/UF",
      fMsg: "O que você quer ver no Horizonte Afro?",
      fSubmit: "Quero acesso antecipado",
      fAdmin: "Ver inscrições (CRUD)",

      crudTitle: "Inscrições — Lista de Espera",
      crudExport: "Exportar JSON",
      crudClear: "Limpar tudo",
      thName: "Nome",
      thEmail: "E-mail",
      thRole: "Perfil",
      thCity: "Cidade",
      thActions: "Ações",
      crudSave: "Salvar",
      crudCancel: "Cancelar",

      contactTitle: "Contato",
      contactLead: "Parceria, piloto ou apresentação? Fale direto.",
      contactCardTitle: "Fale com a equipe",
      emailBtn: "Enviar e-mail",
      waBtn: "Abrir WhatsApp",
      contactCtaTitle: "Acesse o Kit 01",
      contactCtaDesc: "Documento institucional para apresentar na escola/rede.",

      footerDesc: "MVP institucional no contexto do Santander Xplorer.",
    },

    // EN / FR / ES (curto e direto; mantém o essencial)
    en: {
      skip: "Skip to content",
      theme: "Theme",
      menuBenefits: "Benefits",
      menuHow: "How it works",
      menuImpact: "Impact",
      menuFeedback: "Feedback",
      menuKit: "Kit 01",
      menuContact: "Contact",
      ctaNav: "Open Kit (PDF)",
      tagline: "Ethnic-Racial Education all year • Law 10.639/03",
      heroLine1: "Centralize practice.",
      heroLine2: "Remove improvisation.",
      heroLead:
        "Sustained implementation of Law 10.639/03 with practical micro-trainings, a teaching kit and real evidence for schools and districts.",
      ctaWait: "Join the waitlist",
      ctaWait2: "Join the waitlist",
      ctaKitNow: "Open Kit 01 (PDF)",
      kpi1: "teaching clarity",
      kpi2: "practical use",
      kpi3: "isolated event",
      vip: "VIP Waitlist",
      beta: "Beta",
      cardTitle: "Get early access",
      perk1: "Priority support",
      perk2: "Suggest new features",
      perk3: "Free during Beta",
      cardNote: "MVP: saved locally (export later).",
      benefTitle: "Why Horizonte Afro?",
      benefLead:
        "Law 10.639/03 often becomes an event. Here, it becomes a continuous practice—with material, training and evidence.",
      b1t: "Full accessibility",
      b1d: "Mobile-friendly materials for everyday classroom use.",
      b2t: "Single source",
      b2d: "Kit + tracks + checklists in one place.",
      b3t: "Territory connection",
      b3d: "Community-grounded content (not calendar folklore).",
      b4t: "Evidence & confidence",
      b4d: "Simple evidence model without bureaucracy.",
      howTitle: "Value Journey",
      howLead: "A simple flow to ensure continuity with material and evidence.",
      s1t: "Diagnosis",
      s1d: "Map context and goals for school/district.",
      s2t: "Guided application",
      s2d: "Micro-trainings + kit to apply safely.",
      s3t: "Evidence & improvement",
      s3d: "Capture essential evidence and iterate monthly.",
      callTitle: "Want to see Kit 01 now?",
      callDesc: "Open the institutional document in a new tab.",
      callBtn: "Open PDF",
      impactTitle: "Real impact in practice",
      impactQuote:
        "“Law 10.639/03 still shows up as an event, not a continuous practice. This proposal meets a concrete school demand.”",
      impactWho: "Feedback (Santander Xplorer)",
      impactOrg: "basic education",
      fbTitle: "User feedback",
      fbLead: "Relevance, applicability, territory connection and evidence—most cited points.",
      fbTag: "program peers",
      kitTitle: "Teaching Kit 01",
      kitLead: "Institutional document with proposal, methodology and application model.",
      seal: "OFFICIAL DOCUMENT",
      kitCardTitle: "Open the Teaching Kit",
      kitCardDesc: "Use the PDF as institutional reference. Preview may vary by browser.",
      kitOpen: "Open Kit 01 (PDF)",
      kitDownload: "Download PDF",
      kitNote: "If preview fails, use “Open Kit 01 (PDF)”.",
      waitTitle: "Ready to innovate?",
      waitLead: "Join the VIP waitlist for early access, updates and co-creation.",
      waitSideTitle: "What you get",
      crudNote: "CRUD is local (browser). Add backend later.",
      fName: "Full name *",
      fEmail: "Email *",
      fRole: "Profile *",
      fRoleChoose: "Choose",
      fRole1: "Teacher",
      fRole2: "Management/Coordination",
      fRole3: "District/Department",
      fRole4: "Research/University",
      fRole5: "Other",
      fCity: "City/State",
      fMsg: "What do you want to see in Horizonte Afro?",
      fSubmit: "Request early access",
      fAdmin: "View signups (CRUD)",
      crudTitle: "Signups — Waitlist",
      crudExport: "Export JSON",
      crudClear: "Clear all",
      thName: "Name",
      thEmail: "Email",
      thRole: "Profile",
      thCity: "City",
      thActions: "Actions",
      crudSave: "Save",
      crudCancel: "Cancel",
      contactTitle: "Contact",
      contactLead: "Partnership, pilot or presentation? Reach out.",
      contactCardTitle: "Talk to the team",
      emailBtn: "Send email",
      waBtn: "Open WhatsApp",
      contactCtaTitle: "Access Kit 01",
      contactCtaDesc: "Institutional document to present to schools/districts.",
      footerDesc: "Institutional MVP in the Santander Xplorer context.",
    },

    fr: {
      skip: "Aller au contenu",
      theme: "Thème",
      menuBenefits: "Bénéfices",
      menuHow: "Fonctionnement",
      menuImpact: "Impact",
      menuFeedback: "Avis",
      menuKit: "Kit 01",
      menuContact: "Contact",
      ctaNav: "Ouvrir le kit (PDF)",
      tagline: "Éducation ethno-raciale toute l’année • Loi 10.639/03",
      heroLine1: "Centralisez la pratique.",
      heroLine2: "Stop à l’improvisation.",
      heroLead:
        "Mise en œuvre continue de la Loi 10.639/03 avec micro-formations, kit pédagogique et preuves pour écoles et réseaux.",
      ctaWait: "Rejoindre la liste d’attente",
      ctaWait2: "Rejoindre la liste",
      ctaKitNow: "Ouvrir le Kit 01 (PDF)",
      kpi1: "clarté pédagogique",
      kpi2: "applicabilité",
      kpi3: "événement isolé",
      vip: "Liste VIP",
      beta: "Bêta",
      cardTitle: "Accès anticipé",
      perk1: "Support prioritaire",
      perk2: "Suggérez des fonctions",
      perk3: "Gratuit en bêta",
      cardNote: "MVP : sauvegarde locale (export plus tard).",
      benefTitle: "Pourquoi Horizonte Afro ?",
      benefLead:
        "La loi devient souvent un événement. Ici, elle devient une pratique continue—avec matériel, formation et preuves.",
      b1t: "Accessibilité totale",
      b1d: "Adapté mobile et usage quotidien en classe.",
      b2t: "Source unique",
      b2d: "Kit + parcours + checklists au même endroit.",
      b3t: "Ancrage territorial",
      b3d: "Contenu connecté aux communautés.",
      b4t: "Preuves & confiance",
      b4d: "Modèle simple de preuves sans bureaucratie.",
      howTitle: "Parcours de valeur",
      howLead: "Un flux simple pour garantir la continuité.",
      s1t: "Diagnostic",
      s1d: "Cartographier contexte et objectifs.",
      s2t: "Application guidée",
      s2d: "Micro-formations + kit à appliquer.",
      s3t: "Preuves & amélioration",
      s3d: "Collecter l’essentiel et itérer mensuellement.",
      callTitle: "Voir le Kit 01 maintenant ?",
      callDesc: "Ouvrez le document institutionnel dans un nouvel onglet.",
      callBtn: "Ouvrir le PDF",
      impactTitle: "Impact réel",
      impactQuote:
        "« La loi apparaît encore comme un événement, pas comme une pratique continue. Cette proposition répond à une demande concrète. »",
      impactWho: "Avis (Santander Xplorer)",
      impactOrg: "éducation de base",
      fbTitle: "Avis des utilisateurs",
      fbLead: "Pertinence, applicabilité, territoire et preuves—points les plus cités.",
      fbTag: "pairs du programme",
      kitTitle: "Kit pédagogique 01",
      kitLead: "Document institutionnel avec proposition, méthodologie et modèle d’application.",
      seal: "DOCUMENT OFFICIEL",
      kitCardTitle: "Ouvrir le kit",
      kitCardDesc: "Utilisez le PDF comme référence. L’aperçu peut varier.",
      kitOpen: "Ouvrir le Kit 01 (PDF)",
      kitDownload: "Télécharger le PDF",
      kitNote: "Si l’aperçu échoue, utilisez « Ouvrir le Kit 01 ». ",
      waitTitle: "Prêt à innover ?",
      waitLead: "Rejoignez la liste VIP pour accès anticipé, nouvelles et co-création.",
      waitSideTitle: "Ce que vous obtenez",
      crudNote: "CRUD local (navigateur). Backend plus tard.",
      fName: "Nom complet *",
      fEmail: "Email *",
      fRole: "Profil *",
      fRoleChoose: "Choisir",
      fRole1: "Enseignant·e",
      fRole2: "Gestion/Coordination",
      fRole3: "Réseau/Direction",
      fRole4: "Recherche/Université",
      fRole5: "Autre",
      fCity: "Ville/Région",
      fMsg: "Que voulez-vous voir dans Horizonte Afro ?",
      fSubmit: "Demander l’accès",
      fAdmin: "Voir les inscriptions (CRUD)",
      crudTitle: "Inscriptions — Liste",
      crudExport: "Exporter JSON",
      crudClear: "Tout effacer",
      thName: "Nom",
      thEmail: "Email",
      thRole: "Profil",
      thCity: "Ville",
      thActions: "Actions",
      crudSave: "Enregistrer",
      crudCancel: "Annuler",
      contactTitle: "Contact",
      contactLead: "Partenariat, pilote ou présentation ? Contactez-nous.",
      contactCardTitle: "Parler à l’équipe",
      emailBtn: "Envoyer email",
      waBtn: "Ouvrir WhatsApp",
      contactCtaTitle: "Accéder au Kit 01",
      contactCtaDesc: "Document institutionnel pour écoles/réseaux.",
      footerDesc: "MVP institutionnel (Santander Xplorer).",
    },

    es: {
      skip: "Saltar al contenido",
      theme: "Tema",
      menuBenefits: "Beneficios",
      menuHow: "Cómo funciona",
      menuImpact: "Impacto",
      menuFeedback: "Feedback",
      menuKit: "Kit 01",
      menuContact: "Contacto",
      ctaNav: "Abrir kit (PDF)",
      tagline: "Educación étnico-racial todo el año • Ley 10.639/03",
      heroLine1: "Centraliza la práctica.",
      heroLine2: "Elimina la improvisación.",
      heroLead:
        "Implementación continua de la Ley 10.639/03 con microformaciones, kit pedagógico y evidencias para escuelas y redes.",
      ctaWait: "Entrar en la lista de espera",
      ctaWait2: "Entrar en la lista",
      ctaKitNow: "Abrir Kit 01 (PDF)",
      kpi1: "claridad didáctica",
      kpi2: "aplicabilidad",
      kpi3: "evento aislado",
      vip: "Lista VIP",
      beta: "Beta",
      cardTitle: "Acceso anticipado",
      perk1: "Soporte prioritario",
      perk2: "Sugiere funciones",
      perk3: "Gratis en beta",
      cardNote: "MVP: guardado local (exportar luego).",
      benefTitle: "¿Por qué Horizonte Afro?",
      benefLead:
        "La ley suele quedar como evento. Aquí se vuelve práctica continua: material, formación y evidencia.",
      b1t: "Accesibilidad total",
      b1d: "Adaptado a móvil y uso diario.",
      b2t: "Fuente única",
      b2d: "Kit + rutas + checklists en un solo lugar.",
      b3t: "Conexión territorial",
      b3d: "Contenido conectado a comunidades.",
      b4t: "Evidencias y seguridad",
      b4d: "Modelo simple de evidencias sin burocracia.",
      howTitle: "Itinerario de valor",
      howLead: "Flujo simple para garantizar continuidad.",
      s1t: "Diagnóstico",
      s1d: "Mapea contexto y objetivos.",
      s2t: "Aplicación guiada",
      s2d: "Microformaciones + kit para aplicar.",
      s3t: "Evidencias y mejora",
      s3d: "Registra lo esencial y mejora mensualmente.",
      callTitle: "¿Ver el Kit 01 ahora?",
      callDesc: "Abre el documento institucional en una nueva pestaña.",
      callBtn: "Abrir PDF",
      impactTitle: "Impacto real",
      impactQuote:
        "“La ley sigue apareciendo como evento, no como práctica continua. La propuesta responde a una demanda concreta.”",
      impactWho: "Feedback (Santander Xplorer)",
      impactOrg: "educación básica",
      fbTitle: "Feedback de usuarios",
      fbLead: "Relevancia, aplicabilidad, territorio y evidencias—puntos más citados.",
      fbTag: "compañeros del programa",
      kitTitle: "Kit pedagógico 01",
      kitLead: "Documento institucional con propuesta, metodología y modelo de aplicación.",
      seal: "DOCUMENTO OFICIAL",
      kitCardTitle: "Abrir el kit",
      kitCardDesc: "Usa el PDF como referencia. La vista previa puede variar.",
      kitOpen: "Abrir Kit 01 (PDF)",
      kitDownload: "Descargar PDF",
      kitNote: "Si falla la vista previa, usa “Abrir Kit 01 (PDF)”.",
      waitTitle: "¿Listo para innovar?",
      waitLead: "Únete a la lista VIP para acceso anticipado, novedades y co-creación.",
      waitSideTitle: "Qué recibes",
      crudNote: "CRUD local (navegador). Backend después.",
      fName: "Nombre completo *",
      fEmail: "Email *",
      fRole: "Perfil *",
      fRoleChoose: "Elegir",
      fRole1: "Docente",
      fRole2: "Gestión/Coordinación",
      fRole3: "Secretaría/Red",
      fRole4: "Investigación/Universidad",
      fRole5: "Otro",
      fCity: "Ciudad/Estado",
      fMsg: "¿Qué quieres ver en Horizonte Afro?",
      fSubmit: "Quiero acceso anticipado",
      fAdmin: "Ver inscripciones (CRUD)",
      crudTitle: "Inscripciones — Lista",
      crudExport: "Exportar JSON",
      crudClear: "Borrar todo",
      thName: "Nombre",
      thEmail: "Email",
      thRole: "Perfil",
      thCity: "Ciudad",
      thActions: "Acciones",
      crudSave: "Guardar",
      crudCancel: "Cancelar",
      contactTitle: "Contacto",
      contactLead: "¿Alianza, piloto o presentación? Contáctanos.",
      contactCardTitle: "Habla con el equipo",
      emailBtn: "Enviar email",
      waBtn: "Abrir WhatsApp",
      contactCtaTitle: "Acceder al Kit 01",
      contactCtaDesc: "Documento institucional para escuelas/redes.",
      footerDesc: "MVP institucional (Santander Xplorer).",
    },
  };

  const applyI18n = (lang) => {
    const t = dict[lang] || dict.pt;
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;

    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key]) el.textContent = t[key];
    });

    // dot tips (tooltips) de forma simples em PT/EN
    const tips = {
      pt: { top: "Topo", beneficios: "Benefícios", "como-funciona": "Como funciona", impacto: "Impacto", feedback: "Feedback", kit: "Kit", contato: "Contato" },
      en: { top: "Top", beneficios: "Benefits", "como-funciona": "How", impacto: "Impact", feedback: "Feedback", kit: "Kit", contato: "Contact" },
      fr: { top: "Haut", beneficios: "Bénéfices", "como-funciona": "Flux", impacto: "Impact", feedback: "Avis", kit: "Kit", contato: "Contact" },
      es: { top: "Inicio", beneficios: "Beneficios", "como-funciona": "Cómo", impacto: "Impacto", feedback: "Feedback", kit: "Kit", contato: "Contacto" },
    };
    const tipMap = tips[lang] || tips.pt;
    $$(".dotnav__dot").forEach((a) => {
      const href = a.getAttribute("href") || "";
      const id = href.startsWith("#") ? href.slice(1) : "top";
      a.dataset.tip = tipMap[id] || a.dataset.tip || "";
      a.setAttribute("aria-label", tipMap[id] || a.getAttribute("aria-label") || "Section");
    });
  };

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

  // ---------- DOTNAV SCROLLSPY ----------
  const sectionIds = ["top", "beneficios", "como-funciona", "impacto", "feedback", "kit", "contato"];
  const sections = sectionIds
    .map((id) => (id === "top" ? document.body : document.getElementById(id)))
    .filter(Boolean);

  const dotLinks = $$(".dotnav__dot");
  const setActiveDot = (id) => {
    dotLinks.forEach((a) => {
      const target = (a.getAttribute("href") || "").replace("#", "") || "top";
      a.setAttribute("aria-current", target === id ? "true" : "false");
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      // pega a entry mais "visível"
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target === document.body ? "top" : visible.target.id;
      setActiveDot(id);
    },
    { root: null, threshold: [0.2, 0.35, 0.5] }
  );

  sections.forEach((sec) => io.observe(sec === document.body ? document.body : sec));
  setActiveDot("top");

  // ---------- WAITLIST CRUD (localStorage) ----------
  const STORAGE_KEY = "ha_waitlist_v1";

  const waitForm = $("#waitForm");
  const formStatus = $("#formStatus");

  const crudModal = $("#crudModal");
  const crudBody = $("#crudBody");
  const crudSearch = $("#crudSearch");
  const editForm = $("#editForm");

  const openCrudBtn = $("#openCrud");
  const closeCrudBtn = $("#closeCrud");
  const crudBackdrop = $("#crudBackdrop");
  const exportJsonBtn = $("#exportJson");
  const clearAllBtn = $("#clearAll");
  const cancelEditBtn = $("#cancelEdit");

  const loadList = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const saveList = (list) => localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

  const uid = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

  const renderTable = (query = "") => {
    if (!crudBody) return;
    const q = query.trim().toLowerCase();
    const list = loadList();
    const filtered = q
      ? list.filter((x) =>
          [x.name, x.email, x.role, x.city, x.msg].some((v) => (v || "").toLowerCase().includes(q))
        )
      : list;

    crudBody.innerHTML = filtered
      .map(
        (x) => `
        <tr>
          <td>${escapeHtml(x.name || "")}</td>
          <td>${escapeHtml(x.email || "")}</td>
          <td><span class="mini">${escapeHtml(x.role || "")}</span></td>
          <td>${escapeHtml(x.city || "")}</td>
          <td>
            <button class="btn btn--ghost btn--pill" data-action="edit" data-id="${x.id}">Editar</button>
            <button class="btn btn--ghost btn--pill" data-action="del" data-id="${x.id}">Excluir</button>
          </td>
        </tr>
      `
      )
      .join("");

    if (!filtered.length) {
      crudBody.innerHTML = `<tr><td colspan="5" class="muted">Sem inscrições ainda.</td></tr>`;
    }
  };

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  const openCrud = () => {
    if (!crudModal) return;
    crudModal.hidden = false;
    renderTable(crudSearch?.value || "");
    crudSearch?.focus();
  };
  function closeCrud() {
    if (!crudModal) return;
    crudModal.hidden = true;
    if (editForm) editForm.hidden = true;
  }

  openCrudBtn?.addEventListener("click", openCrud);
  closeCrudBtn?.addEventListener("click", closeCrud);
  crudBackdrop?.addEventListener("click", closeCrud);

  crudSearch?.addEventListener("input", (e) => renderTable(e.target.value));

  crudBody?.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    const list = loadList();
    const item = list.find((x) => x.id === id);
    if (!item) return;

    if (action === "del") {
      const ok = confirm("Excluir esta inscrição?");
      if (!ok) return;
      saveList(list.filter((x) => x.id !== id));
      renderTable(crudSearch?.value || "");
      return;
    }

    if (action === "edit") {
      if (!editForm) return;
      editForm.hidden = false;
      editForm.elements.id.value = item.id;
      editForm.elements.name.value = item.name || "";
      editForm.elements.email.value = item.email || "";
      editForm.elements.role.value = item.role || "";
      editForm.elements.city.value = item.city || "";
      editForm.elements.msg.value = item.msg || "";
      editForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  editForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(editForm);
    const updated = {
      id: fd.get("id"),
      name: (fd.get("name") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      role: (fd.get("role") || "").toString().trim(),
      city: (fd.get("city") || "").toString().trim(),
      msg: (fd.get("msg") || "").toString().trim(),
    };

    const list = loadList();
    const idx = list.findIndex((x) => x.id === updated.id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...updated };
      saveList(list);
      renderTable(crudSearch?.value || "");
      editForm.hidden = true;
    }
  });

  cancelEditBtn?.addEventListener("click", () => {
    if (editForm) editForm.hidden = true;
  });

  exportJsonBtn?.addEventListener("click", () => {
    const data = JSON.stringify(loadList(), null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "horizonte-afro-waitlist.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  clearAllBtn?.addEventListener("click", () => {
    const ok = confirm("Tem certeza? Isso apaga todas as inscrições locais.");
    if (!ok) return;
    saveList([]);
    renderTable(crudSearch?.value || "");
    if (editForm) editForm.hidden = true;
  });

  waitForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(waitForm);

    const entry = {
      id: uid(),
      name: (fd.get("name") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      role: (fd.get("role") || "").toString().trim(),
      city: (fd.get("city") || "").toString().trim(),
      msg: (fd.get("msg") || "").toString().trim(),
      createdAt: new Date().toISOString(),
    };

    if (!entry.name || !entry.email || !entry.role) {
      if (formStatus) formStatus.textContent = "Preencha os campos obrigatórios (*).";
      return;
    }

    const list = loadList();
    // evita duplicar por email
    const exists = list.some((x) => (x.email || "").toLowerCase() === entry.email.toLowerCase());
    if (exists) {
      if (formStatus) formStatus.textContent = "Esse e-mail já está inscrito (no seu navegador).";
      return;
    }

    list.unshift(entry);
    saveList(list);

    waitForm.reset();
    if (formStatus) formStatus.textContent = "✅ Inscrição confirmada! (salva localmente neste navegador)";
  });

})();
