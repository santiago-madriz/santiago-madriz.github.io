(() => {
  const storageKey = 'santiagoMadrizLanguage';
  const path = window.location.pathname.replace(/index\.html$/, '');

  const serviceCommon = [
    ['Ver portafolio', 'View portfolio'],
    ['Solicitar cotización', 'Request a quote'],
    ['Preguntas frecuentes', 'Frequently asked questions'],
    ['Producto', 'Product'],
    ['Eventos', 'Events'],
    ['Retratos', 'Portraits'],
    ['Producción audiovisual', 'Video production'],
    ['Contenido para redes', 'Social content'],
    ['Costa Rica', 'Costa Rica'],
    ['Producción', 'Production'],
    ['Servicios', 'Services'],
    ['Formato', 'Format'],
    ['Film · Edit', 'Film · Edit'],
    ['WhatsApp', 'WhatsApp']
  ];

  const filmCommon = [
    ['← Todo el trabajo', '← All work'],
    ['Portafolio de fotografía y film', 'Photography & film portfolio'],
    ['Tu navegador no admite video HTML.', 'Your browser does not support HTML video.'],
    ['Formato', 'Format'],
    ['Producción', 'Production'],
    ['Servicios', 'Services'],
    ['Costa Rica', 'Costa Rica'],
    ['Film · Edición', 'Film · Edit']
  ];

  const serviceMedia = [
    ['Ejemplos de fotografía de producto', 'Product photography examples'],
    ['Fotografía comercial de una computadora portátil para una tienda de tecnología en Costa Rica', 'Commercial laptop photography for a technology store in Costa Rica'],
    ['Detalle de cámara de iPhone fotografiado para Techy CR', 'iPhone camera detail photographed for Techy CR'],
    ['Caja de iPhone azul en una composición comercial', 'Blue iPhone box in a commercial composition'],
    ['iPhones y empaques fotografiados para contenido comercial', 'iPhones and packaging photographed for commercial content'],
    ['Ejemplos de fotografía de eventos', 'Event photography examples'],
    ['Motociclista durante un evento deportivo en Costa Rica', 'Motorcyclist during a sports event in Costa Rica'],
    ['Cobertura fotográfica de un evento de motociclismo en Costa Rica', 'Photographic coverage of a motorcycle event in Costa Rica'],
    ['Fotografía de acción durante un evento de motocicletas', 'Action photograph during a motorcycle event'],
    ['Detalle documental de una actividad de motociclismo', 'Documentary detail from a motorcycle activity'],
    ['Ejemplos de retratos profesionales', 'Professional portrait examples'],
    ['Retrato ambiental junto a una colorida torre de salvavidas de Miami Beach', 'Environmental portrait beside a colorful Miami Beach lifeguard tower'],
    ['Retrato editorial en Costa Rica', 'Editorial portrait in Costa Rica'],
    ['Retrato personal con iluminación natural', 'Personal portrait in natural light'],
    ['Sesión de retrato creativo en exteriores', 'Creative outdoor portrait session'],
    ['Video de campaña producido para MOVA', 'Campaign film produced for MOVA'],
    ['Ejemplos de producción para marcas', 'Brand production examples'],
    ['Campaña audiovisual y fotográfica para MOVA en Costa Rica', 'Film and photography campaign for MOVA in Costa Rica'],
    ['Retrato de campaña para una marca de ropa deportiva', 'Campaign portrait for a sportswear brand'],
    ['Selección de producción audiovisual para marcas', 'Selected brand video production'],
    ['Contenido audiovisual vertical producido para marcas', 'Vertical video content produced for brands'],
    ['Ejemplos de contenido para redes sociales', 'Social media content examples'],
    ['Reel vertical producido para MOVA', 'Vertical reel produced for MOVA'],
    ['Fotografía vertical para campaña de una marca deportiva', 'Vertical campaign photograph for a sportswear brand']
  ];

  const pages = {
    '/services/product-photography-costa-rica/': {
      meta: {
        es: ['Fotografía de producto en Costa Rica | Santiago Madriz', 'Fotografía de producto en Costa Rica para catálogos, ecommerce, campañas y redes sociales. Producción en estudio o locación con cotización personalizada.'],
        en: ['Product Photography in Costa Rica | Santiago Madriz', 'Product photography in Costa Rica for catalogs, ecommerce, campaigns, and social media. Studio or on-location production with a custom quote.']
      },
      pairs: [
        ['Producto · Ecommerce · Campañas', 'Product · Ecommerce · Campaigns'],
        ['Fotografía de producto en Costa Rica.', 'Product photography in Costa Rica.'],
        ['Imágenes limpias y consistentes para presentar productos con intención, desde una pieza individual hasta una campaña completa.', 'Clean, consistent images created to present products with intention, from a single item to a complete campaign.'],
        ['El proceso', 'The process'],
        ['Una producción diseñada alrededor del uso final.', 'A production designed around its final use.'],
        ['Antes de fotografiar definimos dónde vivirán las imágenes: ecommerce, catálogo, campaña, prensa o redes. Eso determina encuadres, fondos, iluminación y formatos de entrega.', 'Before photographing, we define where the images will live: ecommerce, catalog, campaign, press, or social media. That determines framing, backgrounds, lighting, and delivery formats.'],
        ['Dirección', 'Direction'], ['Objetivo, referencias, lista de productos y plan de tomas.', 'Goals, references, product list, and shot plan.'],
        ['Iluminación, composición y variaciones necesarias para cada canal.', 'Lighting, composition, and the variations required for each channel.'],
        ['Entrega', 'Delivery'], ['Selección, retoque y exportaciones listas para publicación.', 'Selection, retouching, and exports ready to publish.'],
        ['¿Dónde se realiza la sesión?', 'Where does the shoot take place?'],
        ['En estudio, en tu negocio o en una locación acordada dentro de Costa Rica, según el producto y la estética buscada.', 'In a studio, at your business, or at an agreed location in Costa Rica, depending on the product and desired aesthetic.'],
        ['¿Las fotografías se entregan editadas?', 'Are the photographs delivered edited?'],
        ['Sí. La entrega incluye selección, corrección de color y retoque según el uso definido.', 'Yes. Delivery includes selection, color correction, and retouching based on the intended use.'],
        ['¿Podemos crear ecommerce y redes en una misma sesión?', 'Can we create ecommerce and social content in the same shoot?'],
        ['Sí. La lista de tomas puede contemplar catálogo, sitio web, anuncios y formatos verticales para redes.', 'Yes. The shot list can cover catalog, website, ads, and vertical formats for social media.'],
        ['Disponible en Costa Rica', 'Available across Costa Rica'],
        ['Contame qué producto necesitás presentar.', 'Tell me about the product you need to present.']
      ]
    },
    '/services/event-photographer-costa-rica/': {
      meta: {
        es: ['Fotógrafo para eventos en Costa Rica | Santiago Madriz', 'Fotografía y video para eventos corporativos, celebraciones, lanzamientos y experiencias en Costa Rica. Cobertura documental y entrega profesional.'],
        en: ['Event Photographer in Costa Rica | Santiago Madriz', 'Photography and video for corporate events, celebrations, launches, and experiences in Costa Rica. Documentary coverage and professional delivery.']
      },
      pairs: [
        ['Corporativo · Deportivo · Social', 'Corporate · Sports · Social'],
        ['Fotógrafo para eventos en Costa Rica.', 'Event photographer in Costa Rica.'],
        ['Cobertura atenta a la energía, las personas y los detalles que hacen que un evento se sienta vivo.', 'Coverage focused on the energy, people, and details that make an event feel alive.'],
        ['La cobertura', 'The coverage'], ['Presencia discreta, momentos claros.', 'A discreet presence, clearly captured moments.'],
        ['La cobertura se organiza alrededor del programa, las personas clave y los entregables que el evento necesita después: memoria, prensa, comunicación interna o redes.', 'Coverage is organized around the schedule, key people, and the assets the event needs afterward: memories, press, internal communications, or social media.'],
        ['Planificación', 'Planning'], ['Horario, locación, momentos esenciales y prioridades de marca.', 'Schedule, location, essential moments, and brand priorities.'],
        ['Cobertura', 'Coverage'], ['Ambiente, participantes, acción, detalles y retratos espontáneos.', 'Atmosphere, guests, action, details, and candid portraits.'],
        ['Selección', 'Selection'], ['Edición coherente y entrega organizada para compartir y publicar.', 'Consistent editing and an organized delivery ready to share and publish.'],
        ['¿Qué tipos de eventos se pueden cubrir?', 'What kinds of events can be covered?'],
        ['Eventos corporativos, lanzamientos, actividades deportivas, celebraciones, presentaciones y experiencias de marca.', 'Corporate events, launches, sports activities, celebrations, performances, and brand experiences.'],
        ['¿Puede incluir fotografía y video?', 'Can coverage include photography and video?'],
        ['Sí. La propuesta puede combinar fotografías, un video resumen y piezas verticales según la necesidad.', 'Yes. The proposal can combine photographs, a highlight video, and vertical content as needed.'],
        ['¿Hay cobertura fuera de San José?', 'Do you cover events outside San José?'],
        ['Sí. Se coordinan producciones y desplazamientos en todo Costa Rica.', 'Yes. Productions and travel can be coordinated throughout Costa Rica.'],
        ['Fechas sujetas a disponibilidad', 'Dates subject to availability'],
        ['Compartime la fecha y el tipo de evento.', 'Share the date and type of event with me.']
      ]
    },
    '/services/professional-portraits-costa-rica/': {
      meta: {
        es: ['Retratos profesionales en Costa Rica | Santiago Madriz', 'Retratos profesionales, personales y editoriales en Costa Rica para perfiles, equipos, artistas y marcas. Dirección natural en estudio o locación.'],
        en: ['Professional Portraits in Costa Rica | Santiago Madriz', 'Professional, personal, and editorial portraits in Costa Rica for profiles, teams, artists, and brands. Natural direction in studio or on location.']
      },
      pairs: [
        ['Profesional · Personal · Editorial', 'Professional · Personal · Editorial'],
        ['Retratos profesionales en Costa Rica.', 'Professional portraits in Costa Rica.'],
        ['Retratos con dirección natural y una estética definida para personas, equipos, artistas y marcas.', 'Naturally directed portraits with a defined aesthetic for individuals, teams, artists, and brands.'],
        ['La sesión', 'The session'], ['Una imagen que se siente como vos.', 'An image that feels like you.'],
        ['Definimos intención, vestuario y locación antes de la sesión. En cámara, la dirección es sencilla y específica para evitar poses rígidas y construir imágenes útiles.', 'We define intention, wardrobe, and location before the session. On camera, direction is simple and specific, avoiding stiff poses and creating useful images.'],
        ['Intención', 'Purpose'], ['Perfil profesional, marca personal, prensa, equipo o proyecto editorial.', 'Professional profile, personal brand, press, team, or editorial project.'],
        ['Guía de postura, expresión y movimiento durante toda la sesión.', 'Guidance on posture, expression, and movement throughout the session.'],
        ['Selección', 'Selection'], ['Edición y formatos adecuados para web, prensa, impresión y redes.', 'Editing and formats suited for web, press, print, and social media.'],
        ['¿Necesito experiencia frente a cámara?', 'Do I need experience in front of the camera?'],
        ['No. Recibís dirección clara para postura, expresión y movimiento durante toda la sesión.', 'No. You receive clear direction for posture, expression, and movement throughout the session.'],
        ['¿Cómo elegimos la locación?', 'How do we choose the location?'],
        ['Según el objetivo del retrato, tu identidad visual y el lugar donde se publicarán las imágenes.', 'Based on the portrait’s purpose, your visual identity, and where the images will be published.'],
        ['¿Se pueden fotografiar equipos de trabajo?', 'Can you photograph teams?'],
        ['Sí. Podemos definir una guía consistente para retratos individuales y fotografías grupales.', 'Yes. We can define a consistent visual approach for individual portraits and team photographs.'],
        ['Estudio o locación', 'Studio or location'], ['Creemos un retrato con una intención clara.', 'Let’s create a portrait with clear intention.']
      ]
    },
    '/services/brand-video-production-costa-rica/': {
      meta: {
        es: ['Producción audiovisual para marcas en Costa Rica | Santiago Madriz', 'Producción audiovisual para marcas en Costa Rica: concepto, preproducción, filmación y edición de campañas, videos de producto y piezas digitales.'],
        en: ['Brand Video Production in Costa Rica | Santiago Madriz', 'Brand video production in Costa Rica: concept, preproduction, filming, and editing for campaigns, product videos, and digital content.']
      },
      pairs: [
        ['Concepto · Producción · Edición', 'Concept · Production · Editing'],
        ['Producción audiovisual para marcas.', 'Video production for brands.'],
        ['Videos construidos alrededor de una idea, una audiencia y el lugar donde la pieza va a vivir.', 'Films built around an idea, an audience, and the place where each piece will live.'],
        ['De idea a entrega', 'From idea to delivery'], ['Una producción coherente en cada formato.', 'A cohesive production in every format.'],
        ['El trabajo comienza por la intención de la marca, no por la cámara. Concepto, locación, ritmo y entregables se definen antes del rodaje para aprovechar cada jornada.', 'The work begins with the brand’s intention, not the camera. Concept, location, rhythm, and deliverables are defined before filming to make every production day count.'],
        ['Preproducción', 'Preproduction'], ['Objetivo, concepto, referencias, guion técnico, locación y logística.', 'Goals, concept, references, shot plan, location, and logistics.'],
        ['Rodaje', 'Filming'], ['Dirección visual y captura organizada según el plan de piezas.', 'Visual direction and capture organized around the content plan.'],
        ['Postproducción', 'Postproduction'], ['Montaje, color, sonido y versiones listas para cada plataforma.', 'Editing, color, sound, and versions ready for each platform.'],
        ['¿Incluye preproducción y edición?', 'Does production include preproduction and editing?'],
        ['Sí. La propuesta puede cubrir concepto, referencias, plan de rodaje, filmación, edición, color y exportaciones.', 'Yes. The proposal can cover concept, references, production planning, filming, editing, color, and final exports.'],
        ['¿Se entregan versiones horizontales y verticales?', 'Are horizontal and vertical versions delivered?'],
        ['Sí. Los formatos y duraciones se definen antes de producir según los canales de publicación.', 'Yes. Formats and durations are defined before production according to the publishing channels.'],
        ['¿Podemos combinar video y fotografía?', 'Can we combine video and photography?'],
        ['Sí. Una jornada puede diseñarse para generar una biblioteca consistente de fotografía y video.', 'Yes. A production day can be designed to create a consistent library of photography and video.'],
        ['Producciones en Costa Rica', 'Productions across Costa Rica'], ['Hablemos de la próxima pieza de tu marca.', 'Let’s talk about your brand’s next piece.']
      ]
    },
    '/services/social-media-content-costa-rica/': {
      meta: {
        es: ['Contenido para redes sociales en Costa Rica | Santiago Madriz', 'Producción de fotografía, reels y video vertical para redes sociales de marcas y negocios en Costa Rica. Jornadas de contenido con entregables planificados.'],
        en: ['Social Media Content Production in Costa Rica | Santiago Madriz', 'Photography, reels, and vertical video production for brands and businesses in Costa Rica. Planned content days with defined deliverables.']
      },
      pairs: [
        ['Reels · Fotografía · Campañas', 'Reels · Photography · Campaigns'], ['Contenido para redes sociales.', 'Social media content.'],
        ['Jornadas enfocadas en crear una biblioteca visual útil, coherente y preparada para diferentes formatos.', 'Production days focused on creating a useful, cohesive visual library prepared for different formats.'],
        ['Jornadas de contenido', 'Content days'], ['Más variedad, una misma dirección visual.', 'More variety, one visual direction.'],
        ['Planificamos por piezas, formatos y usos. Así una producción puede alimentar publicaciones, campañas y perfiles sin sentirse como contenido repetido.', 'We plan around assets, formats, and uses, so one production can support posts, campaigns, and profiles without feeling repetitive.'],
        ['Mapa de contenido', 'Content map'], ['Objetivos, referencias, productos, personas y lista de entregables.', 'Goals, references, products, people, and list of deliverables.'],
        ['Fotografía y clips organizados por concepto, formato y plataforma.', 'Photography and clips organized by concept, format, and platform.'],
        ['Versiones', 'Versions'], ['Edición y exportaciones verticales, cuadradas u horizontales.', 'Editing and vertical, square, or horizontal exports.'],
        ['¿Qué podemos producir en una jornada?', 'What can we produce in one content day?'],
        ['Según la complejidad, podemos combinar fotografías, reels, clips y variaciones para distintas publicaciones.', 'Depending on complexity, we can combine photographs, reels, clips, and variations for different posts.'],
        ['¿El contenido se entrega listo para publicar?', 'Is the content delivered ready to publish?'],
        ['Sí. Las piezas se exportan en las proporciones y especificaciones acordadas para cada plataforma.', 'Yes. Assets are exported in the dimensions and specifications agreed for each platform.'],
        ['¿Podemos trabajar de forma recurrente?', 'Can we work together on a recurring basis?'],
        ['Sí. Se pueden planificar jornadas periódicas para mantener una biblioteca visual consistente.', 'Yes. Recurring production days can be planned to maintain a consistent visual library.'],
        ['Contenido para marcas', 'Content for brands'], ['Planifiquemos una jornada que rinda más.', 'Let’s plan a production day that goes further.']
      ]
    },
    '/film/brand-content-production/': {
      meta: {
        en: ['Brand Content & Social Video Production | Santiago Madriz', 'A vertical brand content production created in Costa Rica by photographer and filmmaker Santiago Madriz.'],
        es: ['Producción de contenido para marcas | Santiago Madriz', 'Producción audiovisual vertical para marcas y redes sociales creada en Costa Rica por Santiago Madriz.']
      },
      pairs: [
        ['Film de marca · Contenido para redes', 'Brand film · Social content'], ['Producción de contenido para marcas.', 'Brand content production.'],
        ['Una producción vertical creada para captar atención, movimiento y distribución en redes.', 'A vertical production shaped for attention, movement, and social-first delivery.'],
        ['Creado para el formato.', 'Made for the format.'], ['Concepto, filmación, edición y entrega concebidos como un solo sistema visual para marcas que publican en redes.', 'Concept, filming, editing, and delivery considered as one visual system for brands publishing across social channels.'],
        ['Solicitar cotización', 'Request a quote'], ['Servicios de contenido para redes', 'Social content services'], ['Video vertical', 'Vertical film']
      ]
    },
    '/film/dias-de-lluvia-music-video/': {
      meta: {
        en: ['Días de Lluvia Music Video | Santiago Madriz', 'Watch a selected sequence from the Días de Lluvia music video by Costa Rica filmmaker Santiago Madriz.'],
        es: ['Video musical Días de Lluvia | Santiago Madriz', 'Mirá una secuencia seleccionada del video musical Días de Lluvia, realizado por Santiago Madriz en Costa Rica.']
      },
      pairs: [
        ['Video musical · Secuencia', 'Music video · Selected sequence'], ['Una secuencia cinematográfica construida alrededor de la atmósfera, la interpretación y el ritmo visual.', 'A cinematic music-video sequence built around atmosphere, performance, and visual rhythm.'],
        ['La música convertida en imagen.', 'Music shaped visually.'], ['Una pieza guiada por la interpretación, donde el encuadre, el ritmo y el color acompañan el tono de la canción.', 'A performance-led film where framing, pacing, and color support the tone of the track.'],
        ['Ver el video completo ↗', 'Watch the full video ↗'], ['Iniciar una producción', 'Start a production'], ['Video musical', 'Music video'], ['Enfoque', 'Focus'], ['Dirección · Film', 'Direction · Film']
      ]
    },
    '/film/pop-run-beats-aleste/': {
      meta: {
        en: ['Pop & Run Beats at Aleste Event Film | Santiago Madriz', 'Event film from Pop & Run Beats at Aleste, captured and edited in Costa Rica by Santiago Madriz.'],
        es: ['Video de Pop & Run Beats en Aleste | Santiago Madriz', 'Video del evento Pop & Run Beats en Aleste, filmado y editado en Costa Rica por Santiago Madriz.']
      },
      pairs: [
        ['Film de evento · Música', 'Event film · Music'], ['Un resumen ágil para redes, centrado en la atmósfera, las personas y la energía en vivo.', 'A fast, social-first event recap focused on atmosphere, people, and live energy.'],
        ['Energía en movimiento.', 'Energy in motion.'], ['Cobertura editada como una pieza vertical concisa, diseñada para conservar la sensación de estar ahí.', 'Event coverage edited into a concise vertical film designed to preserve the feeling of being there.'],
        ['Ver en Instagram ↗', 'View on Instagram ↗'], ['Cobertura de eventos', 'Event coverage'], ['Reel de evento', 'Event reel'], ['Ubicación', 'Location']
      ]
    },
    '/film/mova-made-to-move/': {
      meta: {
        en: ['MOVA Made to Move Campaign Film | Santiago Madriz', 'Watch MOVA Made to Move, a sportswear campaign film produced in Costa Rica by Santiago Madriz.'],
        es: ['Campaña MOVA Made to Move | Santiago Madriz', 'Mirá MOVA Made to Move, una campaña audiovisual de ropa deportiva producida en Costa Rica por Santiago Madriz.']
      },
      pairs: [
        ['MOVA · Campaña deportiva', 'MOVA · Sportswear campaign'], ['Una pieza de campaña guiada por el movimiento, creada para MOVA en una pista al aire libre en Costa Rica.', 'A movement-led campaign film created for MOVA on an outdoor track in Costa Rica.'],
        ['El movimiento como lenguaje visual.', 'Motion as the visual language.'], ['Ropa deportiva, paisaje y movimiento atlético reunidos en una pieza concisa para redes.', 'Sportswear, landscape, and athletic movement brought together in a concise campaign film for social delivery.'],
        ['Ver en Instagram ↗', 'View on Instagram ↗'], ['Producción audiovisual para marcas', 'Brand video production'], ['Cliente', 'Client'], ['Reel de campaña', 'Campaign reel']
      ]
    },
    '/film/baby-shower-highlight/': {
      meta: {
        en: ['Baby Shower Event Highlight Film | Santiago Madriz', 'A warm baby shower event highlight filmed and edited in Costa Rica by Santiago Madriz.'],
        es: ['Video resumen de baby shower | Santiago Madriz', 'Un video cálido de baby shower filmado y editado en Costa Rica por Santiago Madriz.']
      },
      pairs: [
        ['Film de evento · Familia', 'Event film · Family'], ['Resumen de baby shower.', 'Baby shower highlight.'],
        ['Una pieza cálida que conserva las personas, los detalles y la emoción de la celebración.', 'A warm event film preserving the people, details, and emotion of the celebration.'],
        ['Una celebración recordada en movimiento.', 'A celebration remembered in motion.'], ['Cobertura natural y una edición íntima diseñada para mantener presente la atmósfera del día.', 'Natural coverage and an intimate edit designed to keep the atmosphere of the day present.'],
        ['Cotizar cobertura de evento', 'Request event coverage'], ['Servicios para eventos', 'Event services'], ['Resumen de evento', 'Event highlight']
      ]
    }
  };

  const page = pages[path];
  if (!page) return;

  const pairs = [
    ...(path.startsWith('/film/') ? filmCommon : [...serviceCommon, ...serviceMedia]),
    ...(page.pairs || [])
  ];
  const normalize = (value) => value.replace(/\s+/g, ' ').trim();
  const lookup = {
    es: new Map(pairs.map(([es, en]) => [normalize(en), es])),
    en: new Map(pairs.map(([es, en]) => [normalize(es), en]))
  };

  const textNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement?.closest('script, style') || !normalize(node.nodeValue || '')
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT;
    }
  });
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  const translateValue = (value, language) => {
    const normalized = normalize(value);
    const translated = lookup[language].get(normalized);
    if (!translated) return value;
    const leading = value.match(/^\s*/)?.[0] || '';
    const trailing = value.match(/\s*$/)?.[0] || '';
    return `${leading}${translated}${trailing}`;
  };

  const applyLanguage = (language, persist = true) => {
    document.documentElement.lang = language;
    textNodes.forEach((node) => { node.nodeValue = translateValue(node.nodeValue || '', language); });
    document.querySelectorAll('[aria-label], [alt], [title]').forEach((element) => {
      ['aria-label', 'alt', 'title'].forEach((attribute) => {
        if (element.hasAttribute(attribute)) element.setAttribute(attribute, translateValue(element.getAttribute(attribute) || '', language));
      });
    });
    if (page.meta?.[language]) {
      document.title = page.meta[language][0];
      document.querySelector('meta[name="description"]')?.setAttribute('content', page.meta[language][1]);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', page.meta[language][0].replace(/ \| Santiago Madriz$/, ''));
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', page.meta[language][1]);
    }
    toggle.textContent = language === 'es' ? 'EN' : 'ES';
    toggle.setAttribute('aria-label', language === 'es' ? 'View in English' : 'Ver en español');
    toggle.setAttribute('title', language === 'es' ? 'View in English' : 'Ver en español');
    toggle.dataset.language = language;
    if (persist) {
      try { localStorage.setItem(storageKey, language); } catch {}
    }
  };

  const toggle = document.createElement('button');
  toggle.className = 'page-lang-toggle';
  toggle.type = 'button';
  const navTarget = document.querySelector('.nav-links') || document.querySelector('.nav-inner');
  navTarget?.append(toggle);

  const style = document.createElement('style');
  style.textContent = `.page-lang-toggle{appearance:none;border:0;background:transparent;color:inherit;font:inherit;font-size:11px;font-weight:700;letter-spacing:.14em;cursor:pointer;padding:8px 0;opacity:.72;transition:opacity .25s ease}.page-lang-toggle:hover,.page-lang-toggle:focus-visible{opacity:1}.page-lang-toggle:focus-visible{outline:1px solid currentColor;outline-offset:5px}`;
  document.head.append(style);

  let saved = null;
  try { saved = localStorage.getItem(storageKey); } catch {}
  const initial = saved === 'es' || saved === 'en'
    ? saved
    : (document.documentElement.lang === 'es' ? 'es' : 'en');
  applyLanguage(initial, false);
  toggle.addEventListener('click', () => applyLanguage(toggle.dataset.language === 'es' ? 'en' : 'es'));
})();
