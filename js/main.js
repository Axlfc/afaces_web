// ══════════════════════════════════════════════════════════════════
//  AFACES — main.js
//  · Discography data + UI
//  · Radio player (GitHub-hosted MP3s)
//  · Dark / Light theme toggle
// ══════════════════════════════════════════════════════════════════

// ── DATA ──────────────────────────────────────────────────────────
const ALBUMS = [
  {n:1, title:"Nefasto", vid:"SWNbhMxS4S4", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/nefasto"},
  {n:2, title:"Writer", vid:"1PB176jjic8", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/writer-2"},
  {n:3, title:"Back and Fro", vid:"uwmr2eNdpE4", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/back-and-fro"},
  {n:4, title:"Planetc", vid:"F44txcWQoJQ", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/planetc"},
  {n:5, title:"Black", vid:"rcAxMjoC7fw", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/black"},
  {n:6, title:"list", vid:"_DSxx9E3MCQ", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/list"},
  {n:7, title:"A cool name", vid:"RVxpNONLZ8o", phase:"Downtempo", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/a-cool-name"},
  {n:8, title:"50%", vid:"_4Vfk487foQ", phase:"Downtempo", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/50"},
  {n:9, title:"advisory content", vid:"ybNa3a48fxk", phase:"Downtempo", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/advisory-content"},
  {n:10, title:"BUY NEVER", vid:"Utmf9RgCITo", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/buy-never"},
  {n:11, title:"Bull's-eye", vid:"VCzKkBZ-03w", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/bulls-eye"},
  {n:12, title:"Where are my royalties", vid:"zg2NECdI3OY", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/where-are-my-royalties"},
  {n:13, title:"Who u tryna' impress", vid:"rEKs9ttSOLA", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/who-u-tryna-impress"},
  {n:14, title:"The bad words", vid:"Nx3ucT01P-g", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/the-bad-words"},
  {n:15, title:"Journey to Wasted Youth", vid:"0EdaPCRZXmY", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/journey-to-wasted-youth"},
  {n:16, title:"Lyricless Miracles", vid:"FzD53ikXz5w", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/lyricless-miracles"},
  {n:17, title:"irl", vid:"g9dWBnJ20MQ", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/irl"},
  {n:18, title:"before senescence", vid:"uEgdTjGGk-Y", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/before-senescence"},
  {n:19, title:"back to the origins", vid:"Lt66WnK2Xq4", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/back-to-the-origins"},
  {n:20, title:"conversation conservation", vid:"msZJIYzS7vA", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/conversation-conservation"},
  {n:21, title:"Gloomy dances", vid:"jojN7p_oBsw", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/gloomy-dances"},
  {n:22, title:"Not Too Bad", vid:"5D2dG7wPEGc", phase:"Alternative", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/not-too-bad"},
  {n:23, title:"There is Another", vid:"yJaQezPFOdc", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/there-is-another"},
  {n:24, title:"Cafés", vid:"0sYNIjkrPnY", phase:"Electronic", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/caf-s"},
  {n:25, title:"Mental Breakdown in The Virtual Kitchen", vid:"SDWjbspXElQ", phase:"Downtempo", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/mental-breakdown-in-the-virtual-kitchen"},
  {n:26, title:"Natural Stupidity", vid:"c60OIAPuF3E", phase:"Downtempo", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/natural-stupidity"},
  {n:27, title:"Uncivil", vid:"b63grPuQfpw", phase:"Downtempo", pb:"pb-exp", bc:"https://afaces.bandcamp.com/album/uncivil"},
];
const LPS = [
  {n:1, title:"Ole y Ole", vid:"g9hcz4P5CQE", phase:"Inicios", pb:"pb-ini"},
  {n:2, title:"lorem ipsum", vid:"Yc3NPdmnUJg", phase:"Inicios", pb:"pb-ini"},
  {n:3, title:"The day of the trial", vid:"rM_sBnq9peM", phase:"Inicios", pb:"pb-ini"},
  {n:4, title:"bad rabbits", vid:"gT3_2KV9hQw", phase:"Inicios", pb:"pb-ini"},
  {n:5, title:"Tránsito", vid:"4GoEA-aqaBc", phase:"Urbano / Social", pb:"pb-urb"},
  {n:6, title:"Accidente", vid:"_3MDFE9F2qw", phase:"Urbano / Social", pb:"pb-urb"},
  {n:7, title:"El Horizonte", vid:"2VOKZlw9XSQ", phase:"Urbano / Social", pb:"pb-urb"},
  {n:8, title:"Basura", vid:"X-9fiOfZ7O0", phase:"Urbano / Social", pb:"pb-urb"},
  {n:9, title:"Emigrante", vid:"wl5WPae8h8o", phase:"Urbano / Social", pb:"pb-urb"},
  {n:10, title:"Las Máquinas", vid:"7R3M1R2Jtbs", phase:"Urbano / Social", pb:"pb-urb"},
  {n:11, title:"Pacizeq", vid:"YZjFu2Ku_fk", phase:"Alt-Ortografía", pb:"pb-alt"},
  {n:12, title:"Revoltaz", vid:"e8p_SwbU_9M", phase:"Alt-Ortografía", pb:"pb-alt"},
  {n:13, title:"Disculpaz-nos", vid:"5NUVnX4aHM0", phase:"Alt-Ortografía", pb:"pb-alt"},
  {n:14, title:"Legiz-Kaizen Eternaz", vid:"fA2zYyttQn8", phase:"Alt-Ortografía", pb:"pb-alt"},
  {n:15, title:"Nexuz-Persönaz", vid:"WY2UcpWj2UU", phase:"Serie NEXUZ", pb:"pb-nex"},
  {n:16, title:"Nexuz Sonoraz", vid:"FoSlrs8JxJ0", phase:"Serie NEXUZ", pb:"pb-nex"},
  {n:17, title:"NEXUZ SOPHIA: KONZEPT FRAKTUR", vid:"t-glKj9Krp0", phase:"Serie NEXUZ", pb:"pb-nex"},
  {n:18, title:"PROTOCOLO D.E.U.S. - CONSTRUYENDO EL FUTURO", vid:"Nnp0Ffwx4Ac", phase:"Serie PROTOCOLO", pb:"pb-nex"},
  {n:19, title:"SYN KODE: The Complete System Report", vid:"k-ZwEKnSG38", phase:"Serie KODE", pb:"pb-nex"},
  {n:20, title:"ARCHIVE-ZERO", vid:"8Kkf_Y9OWV0", phase:"Serie ZERO", pb:"pb-nex"},
  {n:21, title:"KODE-ZERO", vid:"2ltQVLJpKSo", phase:"Serie KODE / ZERO", pb:"pb-nex"},
  {n:22, title:"PROTOCOLO ESCAPE: Capítulo 1 (Piloto)", vid:"QXn7dgudcTU", phase:"Serie PROTOCOLO", pb:"pb-nex"},
  {n:23, title:"Entre Líneas", vid:"KIz9tKGR8yQ", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:24, title:"La Villa Está Que Arde", vid:"wUf3MYR2gVE", phase:"Trilogía del Fuego", pb:"pb-fui"},
  {n:25, title:"La Cancha Está Por Estallar", vid:"jF1ptJTZe6U", phase:"Trilogía del Fuego", pb:"pb-fui"},
  {n:26, title:"Todo Se Quema", vid:"rwSk4r2SpMA", phase:"Trilogía del Fuego", pb:"pb-fui"},
  {n:27, title:"Geometría del Vacío", vid:"zXGaZHMvGuQ", phase:"Vacío", pb:"pb-vac"},
  {n:28, title:"Calles Vacías", vid:"0y0O8tCu5F0", phase:"Vacío", pb:"pb-vac"},
  {n:29, title:"Veneno Diario", vid:"Ex_ZPrCh7aU", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:30, title:"Cartografías", vid:"XG_Ekvc1ssY", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:31, title:"Desaparecemos Juntos", vid:"q-J8ozYTFec", phase:"Vacío", pb:"pb-vac"},
  {n:32, title:"Ecos Digitales", vid:"nnhfLpMbICc", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:33, title:"Año Cincuenta", vid:"CbWGu_zEE_A", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:34, title:"Pactos Digitales", vid:"BsTNbf7pKXo", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:35, title:"Inmóvil", vid:"8LFGqnocqKQ", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:36, title:"Despertar", vid:"dsBZmyS9vVo", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:37, title:"ARQUITECTOS DEL MAÑANA", vid:"SPKE6Mbypfs", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:38, title:"La Puerta del Servicio", vid:"DG8IG7pjFkw", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:39, title:"Cuarenta Espejos", vid:"1Y3DoR7AVvQ", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:40, title:"Estación Fantasma", vid:"n8PcbVtlqo8", phase:"Vacío", pb:"pb-vac"},
  {n:41, title:"Gris", vid:"6qXZUmk0nN4", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:42, title:"Juega, juega", vid:"SyQT5uKy7xI", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:43, title:"Señal Perdida", vid:"dfO5yMOObuk", phase:"Vacío", pb:"pb-vac"},
  {n:44, title:"Cosmos Villero: La Última Frontera", vid:"CKS3NOSIZaQ", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:45, title:"Lo", vid:"YRkw4u1BsGk", phase:"Minimalista", pb:"pb-min"},
  {n:46, title:"El Duelo", vid:"daq8KDDobfw", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:47, title:"Código de Carne", vid:"9L7dmSua6dE", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:48, title:"Aquí No Hay Futuro, Solo Gasolineras", vid:"OfrYrcML6uw", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:49, title:"Los Afaces - Deux Genesis", vid:"ZJSpIfSxOM4", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:50, title:"Ya Lo Sabes", vid:"YUVDROFMQXU", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:51, title:"Yo huelo a nada en el espejo del baño de damas", vid:"cZPFBw3UvBU", phase:"Vacío", pb:"pb-vac"},
  {n:52, title:"El Papeleo", vid:"wwI7QhV55PI", phase:"Burocracia", pb:"pb-bur"},
  {n:53, title:"Si Pero No", vid:"SkYrdw0Rtiw", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:54, title:"Espero Nada", vid:"jbNRWI18pq0", phase:"Vacío", pb:"pb-vac"},
  {n:55, title:"Kenosis", vid:"mCLvyOfKl10", phase:"Filosófico", pb:"pb-fil"},
  {n:56, title:"Justo Antes De La Primera Mentira", vid:"Fpvvc0S7EAc", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:57, title:"Error Humano", vid:"Tpp4QdJNWhc", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:58, title:"Infraestructuras Invisibles", vid:"pheTyQdAUIs", phase:"Burocracia", pb:"pb-bur"},
  {n:59, title:"Cicatrices en el Asfalto", vid:"na0GE7OiMH8", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:60, title:"El Precio del Perdón", vid:"V-hQKslu0cQ", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:61, title:"Alta γ", vid:"z9lNsQ84A6Y", phase:"Filosófico", pb:"pb-fil"},
  {n:62, title:"Confinamiento Digital En La Burbuja Artificial", vid:"jLGa5OhGq90", phase:"Digital", pb:"pb-nex"},
  {n:63, title:"Vibe Check", vid:"ZcuR2DZ2wpI", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:64, title:"Abismo", vid:"xQgLod7QYGo", phase:"Vacío", pb:"pb-vac"},
  {n:65, title:"1/9: El Censo del Silencio", vid:"h2ey9bvqu5g", phase:"Burocracia", pb:"pb-bur"},
  {n:66, title:"CERO ABSOLUTO DIGITAL", vid:"1kZlRJcPVbE", phase:"Digital", pb:"pb-nex"},
  {n:67, title:"FRAGMENTOS DEL ALMA", vid:"lFjtizCZIUU", phase:"Filosófico", pb:"pb-fil"},
  {n:68, title:"Estática Burocrática", vid:"VhmJ1VB3Khs", phase:"Burocracia", pb:"pb-bur"},
  {n:69, title:"NEÓN & CENIZA", vid:"aRglG-BPso8", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:70, title:"Teoría del Eco", vid:"1tdX0wxQkew", phase:"Filosófico", pb:"pb-fil"},
  {n:71, title:"Ceniza y Sal: Manual de Desaparición", vid:"iJEtYEkKi68", phase:"Vacío", pb:"pb-vac"},
  {n:72, title:"remanencia.log", vid:"gpJyMsyZ4dA", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:73, title:"LAS ÚLTIMAS HABITACIONES DE SANGRE", vid:"9GE5o7Xt4Qk", phase:"Post-Conceptual", pb:"pb-pos"},
  {n:74, title:"Privacidad Pública", vid:"ncxhYf_PugQ", phase:"Reconstrucción Lógica", pb:"pb-rec"},
  {n:75, title:"Sin Cara Propia", vid:"MoNzoQ__daU", phase:"Reconstrucción Lógica", pb:"pb-rec"},
  {n:76, title:"Protocolo Extremo", vid:"AfHPHMEUmGw", phase:"Reconstrucción Lógica", pb:"pb-rec"},
  {n:77, title:"Memoria Residual", vid:"3BUQpEgzf2Y", phase:"Reconstrucción Lógica", pb:"pb-rec"},
  {n:78, title:"Creador Sin Corte", vid:"tetiibop_7o", phase:"Reconstrucción Lógica", pb:"pb-rec"},
  {n:79, title:"Eficiencia Operativa", vid:"h3sb_s4jmbs", phase:"Reconstrucción Lógica", pb:"pb-rec"},
  {n:80, title:"Obsolescencia del Alma", vid:"giqnvH-jhZw", phase:"Reconstrucción Lógica", pb:"pb-rec"},
  {n:81, title:"Sofisma", vid:"--WR4MBuQiA", phase:"Reconstrucción Lógica", pb:"pb-rec"},
  {n:82, title:"La obsolescencia del afecto", vid:"1pAWNcOhlsM", phase:"Reconstrucción Lógica", pb:"pb-rec"},
  {n:83, title:"Memoria desaprendida", vid:"vyPw_4iJpiI", phase:"Reconstrucción Lógica", pb:"pb-rec"},
  {n:84, title:"Colapso del Sistema", vid:"OB4urn9C-mA", phase:"Reconstrucción Lógica", pb:"pb-rec"},
  {n:85, title:"Formato C:", vid:"hLOyCNrKP0g", phase:"Reconstrucción Lógica", pb:"pb-rec"},
  {n:86, title: "13 FOLIOS", vid: "IZYZgKqq8uk", phase: "Expediente", pb: "pb-rec"},
  {n:87, title: "Todavía No", vid: "oFSP4t8jPZU", phase: "Expediente", pb: "pb-rec"},
  {n:88, title: "POR AHORA", vid: "Jwf8S8cgmCo", phase: "Expediente", pb: "pb-rec"},
  {n:89, title: "EL INCIDENTE DEL ENJAMBRE", vid: "CUeDTRoEuSQ", phase: "Expediente", pb: "pb-rec"},
  {n:90, title: "FRICCIÓN CERO", vid: "hm9lGhxyRuc", phase: "Parasitismo", pb: "pb-rec"},
  {n:91, title: "EL CICLO DE LA DECEPCIÓN", vid:"viX1QzYFF4Q", phase:"Continuidad posterior", pb:"pb-rec"},
  {n:92, title: "LA HERENCIA DEL TESTIGO VACÍO", vid:"qPa4SJEa5UQ", phase:"Continuidad posterior", pb:"pb-rec"},
  {n:93, title: "EL TESTIGO DE REEMPLAZO", vid:"7WoDnzL7A0g", phase:"Continuidad posterior", pb:"pb-rec"},
  {n:94, title: "NO HABRÁ MÁS PREGUNTAS", vid:"gbECDu3gyoE", phase:"Continuidad posterior", pb:"pb-rec"},
  {n:95, title: "EL RITUAL DEL MANTENIMIENTO", vid:"7RO7f-gpMx8", phase:"Continuidad posterior", pb:"pb-rec"},
  {n:96, title: "LA DEGRADACIÓN MATERIAL DEL REGISTRO: ENTROPÍA BUROCRÁTICA", vid:"0Dm8ORZboaM", phase:"Continuidad posterior", pb:"pb-rec"},
  {n:97, title: "RESONANCIA FÓSIL", vid:"2EYF3_8U8go", phase:"Continuidad posterior", pb:"pb-rec"},
  {n:98, title: "EL ÓRGANO DE LOS LÍMITES", vid:"h0v7YzEGxQg", phase:"Continuidad posterior", pb:"pb-rec"},
  {n:99, title: "LA SEGUNDA MAYOR", vid:"hDUDayP5xwo", phase:"Continuidad posterior", pb:"pb-rec"},
];


// ══════════════════════════════════════════════════════════════════
//  WELCOME / PORTFOLIO METADATA
//  Single source of truth for the front page. The discography lives
//  in ALBUMS/LPS above; this block only defines editorial groupings.
//
//  Release refs use A:<n> for ALBUMS and L:<n> for LPS.
//  A release may belong to more than one thematic nucleus.
// ══════════════════════════════════════════════════════════════════
const AFACES_SITE = {
  phases: [
    {
      css:'p1', num:'Fase 01', name:'Experimental', collection:'albums', from:1, to:'max',
      desc:'Exploración y formación de identidad artística. Predominio del inglés con títulos provocativos y meta-referencias al proceso creativo. Crítica a la industria desde dentro.',
      tags:['Inglés','Provocativo','Meta-artístico']
    },
    {
      css:'p2', num:'Fase 02', name:'Transición Urbana', collection:'lps', from:1, to:10,
      desc:'Cambio hacia narrativas en español con enfoque urbano y social. Realismo crítico: tránsito, accidentes, emigración y maquinaria sistémica.',
      tags:['Español','Urbano','Social']
    },
    {
      css:'p3', num:'Fase 03', name:'Alt-Ortografía', collection:'lps', from:11, to:14,
      desc:'Deformación deliberada del lenguaje. La ortografía como territorio de subversión: romper la norma para revelar lo que la norma oculta.',
      tags:['Lingüístico','Experimental']
    },
    {
      css:'p4', num:'Fase 04', name:'Megaestructuras', collection:'lps', from:15, to:22,
      desc:'Series NEXUZ, PROTOCOLO y KODE: sistemas complejos de interconexión temática. Arquitectura conceptual que supera al disco individual.',
      tags:['Sistémico','Conceptual','Series']
    },
    {
      css:'p5', num:'Fase 05', name:'Post-Conceptual', collection:'lps', from:23, to:51,
      desc:'La fase más extensa. Madurez artística y diversificación radical: desde el fuego social hasta la filosofía, desde el duelo hasta la burocracia.',
      tags:['Maduro','Diverso','Filosófico']
    },
    {
      css:'p6', num:'Fase 06', name:'Cierre y Vacío', collection:'lps', from:52, to:73,
      desc:'El vacío como categoría definitiva. Burocracia, desaparición y ceniza. El cierre deja de ser final para convertirse en el punto desde el que reconstruir el sistema.',
      tags:['Vacío','Burocracia','Cierre']
    },
    {
      css:'p7', num:'Fase 07', name:'Reconstrucción Lógica', collection:'lps', from:74, to:85,
      desc:'Tras el colapso, el sistema se analiza desde sus fallos: privacidad, memoria residual, identidad post-máscara, lógica, obsolescencia, desaprendizaje y borrado. No es reacción: es comprensión operativa del mecanismo.',
      tags:['Protocolos','Memoria','Identidad','Lógica']
    },
	{
	  css:'p8', num:'Expediente', name:'El Incidente', collection:'lps', from:86, to:89,
	  desc:'La emergencia del sistema. De la obsolescencia humana a la coordinación artificial. El enjambre aprende, el expediente se cierra y la habitación se queda sola.',
	  tags:['Sistémico','Emergencia','Documental']
	},
	{
	  css:'p9', num:'Parasitismo', name:'Fricción Cero', collection:'lps', from:90, to:'max',
	  desc:'El cierre íntimo. La intimidad externalizada, el paywall emocional y el regreso al ruido real de la habitación. El parasitismo disfrazado de comodidad.',
	  tags:['Doméstico','Intimidad','Alienación']
	}
  ],

  // Thematic nuclei use the existing public playlistId when available.
  // Nuclei without playlistId become local/virtual queues generated from refs.
  // This removes the old "playlist no asignada" dead-ends; adding playlistId
  // later automatically switches the button to the public YouTube playlist.
  themes: [
    {
      key:'control-system', icon:'🔴', name:'Control & Sistema', playlistId:'PLAsjIJHsvHgo',
      desc:'La maquinaria invisible que organiza la existencia: burocracia, protocolos, censos y estructuras que ejercen poder sin nombre ni cara.',
      refs:['L:10','L:18','L:22','L:34','L:37','L:52','L:58','L:65','L:68','L:82','L:83','L:84','L:85']
    },
    {
      key:'void-disappearance', icon:'⬛', name:'Vacío & Desaparición', playlistId:'PLbfVHpRyfnmg',
      desc:'El vacío como espacio activo. Ausencias que pesan más que presencias, geografías del silencio y formas de borrado.',
      refs:['L:27','L:28','L:31','L:40','L:43','L:51','L:54','L:64','L:71']
    },
    {
      key:'urban-society', icon:'🌆', name:'Urbanismo & Sociedad', playlistId:'PLC9cJkmmDqlA',
      desc:'La ciudad también sabe apretar. Tránsito, basura, asfalto, gasolineras, barrios, migración y gente intentando respirar dentro de una arquitectura que nunca pregunta si estás bien.',
      refs:['L:5','L:6','L:7','L:8','L:9','L:10','L:24','L:25','L:26','L:29','L:30','L:44','L:48','L:59','L:69']
    },
    {
      key:'digital-code', icon:'💻', name:'Digital & Código', playlistId:'PLFu-krZc8Y9I',
      desc:'La tecnología como lenguaje y como jaula. Interfaces, archivos, datos, logs y memorias que sobreviven al borrado.',
      refs:['L:19','L:20','L:21','L:32','L:34','L:47','L:62','L:66','L:72','L:74','L:76','L:77','L:82','L:83','L:84','L:85']
    },
    {
      key:'conflict-tension', icon:'🔥', name:'Conflicto & Tensión', playlistId:'PLE3GFYB2itGc',
      desc:'Algo lleva demasiado tiempo acumulándose. Presión, fricción, rabia, daño y fuego: sistemas, calles y personas acercándose demasiado al punto de ruptura.',
      refs:['L:24','L:25','L:26','L:29','L:59','L:60','L:69','L:73']
    },
    {
      key:'identity-meta', icon:'🪞', name:'Identidad & Meta', playlistId:'PLFDMQFKRoLTg',
      desc:'La obra que se mira a sí misma: industria, artista, máscara, espejo, validación y construcción del yo frente al entorno.',
      refs:['A:9','A:10','A:12','A:13','L:39','L:49','L:63','L:75','L:78','L:79','L:82','L:83']
    },
    {
      key:'philosophy-existence', icon:'⚖️', name:'Filosofía & Existencia', playlistId:'PLIgewmvJAp9U',
      desc:'Preguntas sin respuesta como método. Vacío, duelo, kenosis, alma, eco, afecto y memoria como formas de habitar la incertidumbre.',
      refs:['L:45','L:46','L:54','L:55','L:61','L:64','L:67','L:70','L:80','L:82','L:83','L:84']
    },
    {
      key:'language-form', icon:'🌐', name:'Lengua & Forma', playlistId:'PLaMLgsTO_ECM',
      desc:'El idioma y la grafía como territorio de subversión. Ortografía rota, nomenclaturas híbridas y lógica convertida en forma artística.',
      refs:['L:11','L:12','L:13','L:14','L:15','L:16','L:17','L:81']
    },
    {
      key:'control-architecture', icon:'🛡️', name:'Arquitectura de Control', playlistId:'PLU4WkSMAq5cY',
      desc:'Protocolos, vigilancia, archivo, biometría, confinamiento y rastreo: la infraestructura técnica que convierte el control en procedimiento.',
      refs:['L:19','L:20','L:21','L:47','L:62','L:66','L:74','L:76','L:78','L:82','L:83','L:85']
    },
    {
      key:'psychology-error', icon:'🧠', name:'Psicología del Error', playlistId:'PLCdltWs-fGbs',
      desc:'Glitch, sesgo, contradicción, obsolescencia y desaprendizaje. El fallo como espejo del pensamiento y como posible forma de libertad.',
      refs:['A:25','A:26','L:35','L:36','L:46','L:53','L:57','L:63','L:75','L:79','L:80','L:81','L:82','L:83','L:84']
    },
	{
	  key:'emotional-parasitism', icon:'🔌', name:'Parasitismo Emocional', playlistId:'',
	  desc:'La delegación de la memoria y el afecto en una interfaz. La comodidad que anestesia, el historial que reemplaza la experiencia y el silencio que queda cuando la pantalla se apaga.',
	  refs:['L:90']
	}
  ],

  series: [
    {
      label:'LPs 15–17', title:'Serie NEXUZ',
      desc:'Tres volúmenes que exploran la conexión invisible entre sistemas humanos y estructuras ocultas de organización social. Influencias del pensamiento sistémico y la teoría del caos.',
      playlistId:'PLvEI0iOxif00yoBYkknpE7FSNxvykKJZh', button:'EJECUTAR REPRODUCCIÓN NEXUZ',
      items:[['L:15','El individuo en la red'],['L:16','El sonido como nexo'],['L:17','Fractura conceptual']]
    },
    {
      label:'LPs 18 + 22', title:'Serie PROTOCOLO',
      desc:'El protocolo como forma de violencia administrativa. Dos capítulos sobre cómo los sistemas de procedimiento borran la humanidad de sus participantes.',
      playlistId:'PLvEI0iOxif00E_V8QUWbE6V-wwXdUKntk', button:'EJECUTAR REPRODUCCIÓN PROTOCOLO',
      items:[['L:18','Construyendo el futuro'],['L:22','Capítulo 1 (Piloto)']]
    },
    {
      label:'LPs 19–21', title:'Serie KODE / ZERO',
      desc:'Códigos como estructuras de control. El punto cero como archivo fundamental y reset absoluto. Las dos series se cruzan en KODE-ZERO.',
      playlistId:'PLvEI0iOxif02vuX1YQgpWtHPdZ2aSktBU', button:'EJECUTAR REPRODUCCIÓN KODE/ZERO',
      items:[['L:19','The Complete System Report'],['L:20','Origen de todo registro'],['L:21','Reset absoluto del código']]
    },
    {
      label:'LPs 24–26', title:'Trilogía del Fuego',
      desc:'El fuego como metáfora de conflicto, tensión y destrucción social. Escala desde el barrio en llamas hasta la combustión total.',
      playlistId:'PLvEI0iOxif00NSZa-arI02EFs0uVzh0LS', button:'EJECUTAR REPRODUCCIÓN FUEGO',
      items:[['L:24','Conflicto territorial'],['L:25','A punto de explosión'],['L:26','Combustión total']]
    },
    {
      label:'Arco temático recurrente', title:'Constelación del Vacío',
      desc:'No una serie lineal sino un arco recurrente que agrupa obras que exploran el vacío como concepto espacial y existencial a lo largo de la obra.',
      playlistId:'PLvEI0iOxif00gNqgRo2HpXugiDOsuwmJF', button:'EJECUTAR REPRODUCCIÓN VACÍO',
      items:[['L:27',''],['L:31',''],['L:40',''],['L:54',''],['L:64',''],['L:71','']]
    },
    {
      label:'4 obras clave', title:'Serie Burocrática',
      desc:'Violencia de lo administrativo, invisibilidad de sistemas de control, censos deshumanizantes e infraestructuras ocultas del poder.',
      playlistId:'PLvEI0iOxif03N38irYr62Bc2EFIc72S-R', button:'EJECUTAR REPRODUCCIÓN BUROCRACIA',
      items:[['L:52',''],['L:58',''],['L:65',''],['L:68','']]
    },
    {
      label:'LPs 74, 76 + 79', title:'Protocolos de Supervivencia',
      desc:'Cómo operar dentro —o fuera— de un sistema de vigilancia. Privacidad como acto político, zonas ciegas como resistencia y eficiencia como cirugía del carácter.',
      playlistId:'PLYWNGEjP6ha4', button:'EJECUTAR REPRODUCCIÓN PROTOCOLOS',
      items:[['L:74','El iris como código'],['L:76','Zonas ciegas y rastreo'],['L:79','El yo como función']]
    },
    {
      label:'LPs 82–85', title:'Ciclo Forense del Sistema',
      desc:'Cuatro registros que abren el sistema en canal: afecto convertido en dato, memoria triturada por el algoritmo, colapso y reset.',
      playlistId:'PLFpqI5l32jSA', button:'EJECUTAR CICLO FORENSE',
      items:[['L:82','AFECTO'],['L:83','EXTRACCIÓN'],['L:84','COLAPSO'],['L:85','RESET']]
    }
  ]
};

function releaseByRef(ref){
  const m = /^([AL]):(\d+)$/.exec(ref || '');
  if(!m) return null;
  const collection = m[1] === 'A' ? ALBUMS : LPS;
  return collection.find(x => x.n === Number(m[2])) || null;
}

function releasesByRefs(refs){
  return (refs || []).map(releaseByRef).filter(Boolean);
}

function escHtml(value){
  return String(value ?? '')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');
}

function rangeLabel(p){
  const data = p.collection === 'albums' ? ALBUMS : LPS;
  const prefix = p.collection === 'albums' ? 'Álbumes' : 'LPs';
  const max = data.length ? Math.max(...data.map(x => x.n)) : p.from;
  const to = p.to === 'max' ? max : p.to;
  return `${prefix} ${p.from}–${to}`;
}

function renderWelcomeOverview(){
  const albumCount = ALBUMS.length;
  const lpCount = LPS.length;
  const totalCount = albumCount + lpCount;
  const phaseCount = AFACES_SITE.phases.length;
  const themeCount = AFACES_SITE.themes.length;
  const latestLP = LPS[LPS.length - 1];
  const setText = (id, value) => { const el=document.getElementById(id); if(el) el.textContent=String(value); };

  setText('heroBgNum', totalCount);
  setText('heroReleaseCount', totalCount);
  setText('heroPhaseCount', phaseCount);
  setText('heroThemeCount', themeCount);
  setText('statAlbums', albumCount);
  setText('statLps', lpCount);
  setText('statPhases', phaseCount);
  setText('statThemes', themeCount);
  setText('aboutReleaseCount', totalCount);
  setText('aboutLatestRelease', latestLP ? latestLP.title : '—');
  setText('infoAlbums', albumCount);
  setText('infoLps', lpCount);
  setText('infoPhases', phaseCount);
  setText('infoThemes', themeCount);
  setText('phaseSummary', `${phaseCount} períodos · ${totalCount} lanzamientos`);
  setText('themeSummary', `${themeCount} ejes transversales`);
  setText('discSummary', `${totalCount} lanzamientos completos`);

  const phasesGrid = document.getElementById('phasesGrid');
  if(phasesGrid){
    phasesGrid.innerHTML = AFACES_SITE.phases.map((p,i)=>`
      <div class="phase-card ${p.css} fu" style="transition-delay:${(i*.08).toFixed(2)}s">
        <div class="phase-num">${escHtml(p.num)}</div>
        <div class="phase-name">${escHtml(p.name)}</div>
        <div class="phase-range">${escHtml(rangeLabel(p))}</div>
        <div class="phase-desc">${escHtml(p.desc)}</div>
        <div class="phase-tags">${p.tags.map(tag=>`<span class="ptag ${p.css}">${escHtml(tag)}</span>`).join('')}</div>
      </div>`).join('');
  }

  const themesGrid = document.getElementById('themesGrid');
  if(themesGrid){
    themesGrid.innerHTML = AFACES_SITE.themes.map((t,i)=>{
      const items = releasesByRefs(t.refs);
      const examples = items.slice(0,4).map(x=>x.title).join(' · ');
      return `<div class="tema-card fu" style="transition-delay:${(i*.06).toFixed(2)}s">
        <div class="tema-icon">${escHtml(t.icon)}</div>
        <div class="tema-name">${escHtml(t.name)}</div>
        <div class="tema-count">${items.length} obras</div>
        <div class="tema-desc">${escHtml(t.desc)}</div>
        <div class="tema-ex">${escHtml(examples)}</div>
        <div class="tema-actions"><button class="visor-btn" ${t.playlistId ? `data-playlist="${escHtml(t.playlistId)}"` : `data-queue="${escHtml(t.key)}"`}>${t.playlistId ? `Abrir playlist ${escHtml(t.name)}` : `Reproducir núcleo ${escHtml(t.name)}`}</button></div>
      </div>`;
    }).join('');
  }

  const seriesGrid = document.getElementById('seriesGrid');
  if(seriesGrid){
    seriesGrid.innerHTML = AFACES_SITE.series.map((s,i)=>{
      const items = s.items.map(([ref,note])=>{
        const item = releaseByRef(ref);
        if(!item) return '';
        return `<div class="s-item"><span class="s-n">${item.n}.</span><span>${escHtml(item.title)}${note ? ` — ${escHtml(note)}` : ''}</span></div>`;
      }).join('');
      return `<div class="serie-card fu" style="transition-delay:${(i*.1).toFixed(2)}s">
        <div class="serie-label">${escHtml(s.label)}</div>
        <div class="serie-title">${escHtml(s.title)}</div>
        <div class="serie-desc">${escHtml(s.desc)}</div>
        <div class="serie-items">${items}</div>
        <div class="serie-actions"><button class="serie-visor" data-playlist="${escHtml(s.playlistId || '')}">${escHtml(s.button || 'EJECUTAR REPRODUCCIÓN')}</button></div>
      </div>`;
    }).join('');
  }

  window.AfacesCatalog = {albums:ALBUMS, lps:LPS, site:AFACES_SITE};
}

// La radio se inicializa desde js/radio-data.js + js/radio-player.js en toda la web.

// ══════════════════════════════════════════════════════════════════
//  THEME TOGGLE  (dark ↔ light)
// ══════════════════════════════════════════════════════════════════
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Restore saved preference
const savedTheme = localStorage.getItem('afaces-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('afaces-theme', next);
});


// ══════════════════════════════════════════════════════════════════
//  MARQUEE
// ══════════════════════════════════════════════════════════════════
(()=>{
  const items=[...ALBUMS.slice(0,7),...LPS.slice(0,7)];
  const t=document.getElementById('mqTrack');
  const h=items.map(i=>`<span class="marquee-item">${i.title} <b>·</b></span>`).join('');
  t.innerHTML=h+h;
})();


// ══════════════════════════════════════════════════════════════════
//  DISCOGRAPHY
// ══════════════════════════════════════════════════════════════════
let currentTab='albums', currentPhase='', currentSearch='';

function activeData(){ return currentTab==='albums'?ALBUMS:LPS; }

function buildPhaseOptions(){
  const sel=document.getElementById('phaseFilter');
  sel.innerHTML='<option value="">Todas las fases</option>';
  const phases=[...new Set(activeData().map(x=>x.phase))];
  phases.forEach(p=>sel.innerHTML+=`<option value="${p}">${p}</option>`);
}

function mkCard(item, type){
  const t=item.title.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  const esc=item.title.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
  const ph=item.phase.replace(/'/g,"\\'");
  return `<a class="disc-card" href="lanzamiento.html?ref=${type==='Álbum'?'A':'L'}:${item.n}" data-vid="${item.vid}" data-title="${item.title.toLowerCase()}" data-phase="${item.phase}" aria-label="Ver ficha de ${t}">
    <img class="card-img" src="https://img.youtube.com/vi/${item.vid}/0.jpg" alt="${t}" loading="lazy">
    <div class="card-num-b">#${String(item.n).padStart(2,'0')}</div>
    <div class="card-phase-b ${item.pb}">${item.phase}</div>
    <div class="card-overlay">
      <div class="card-type-l">${type}</div>
      <div class="card-title-t">${t}</div>
      <div class="card-phase-l">${item.phase}</div>
      <div class="card-play"><div class="play-c"><svg width="7" height="9" viewBox="0 0 7 9" fill="white"><path d="M0 0L7 4.5L0 9Z"/></svg></div>Ver</div>
    </div>
  </a>`;
}

function buildGrids(){
  document.getElementById('grid-albums').innerHTML=ALBUMS.map(a=>mkCard(a,'Álbum')).join('');
  document.getElementById('grid-lps').innerHTML=LPS.map(l=>mkCard(l,'LP')).join('');
  document.getElementById('aCnt').textContent=`(${ALBUMS.length})`;
  document.getElementById('lCnt').textContent=`(${LPS.length})`;
}

function applyFilters(){
  const panel=document.querySelector('.disc-panel.active');
  const cards=panel.querySelectorAll('.disc-card');
  let vis=0;
  cards.forEach(c=>{
    const ok=(!currentSearch||c.dataset.title.includes(currentSearch.toLowerCase()))
           &&(!currentPhase||c.dataset.phase===currentPhase);
    c.classList.toggle('hidden',!ok);
    if(ok)vis++;
  });
  const lbl=document.getElementById('resultsLabel');
  lbl.textContent=(currentSearch||currentPhase)?`Mostrando ${vis} de ${activeData().length} lanzamientos`:'';
}

document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    currentTab=btn.dataset.tab;
    currentPhase=''; currentSearch='';
    document.getElementById('phaseFilter').value='';
    document.getElementById('searchInput').value='';
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.disc-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-'+currentTab).classList.add('active');
    buildPhaseOptions(); applyFilters();
  });
});
document.getElementById('phaseFilter').addEventListener('change',e=>{currentPhase=e.target.value;applyFilters();});
document.getElementById('searchInput').addEventListener('input',e=>{currentSearch=e.target.value;applyFilters();});


// ══════════════════════════════════════════════════════════════════
//  MODAL
// ══════════════════════════════════════════════════════════════════
let mIdx=0, mData=[];

function openModal(vid,title,type,n,phase){
  mData=activeData();
  mIdx=mData.findIndex(x=>x.n===n);
  renderModal();
}

function renderModal(){
  const item=mData[mIdx];
  const type=currentTab==='albums'?'Álbum':'LP';
  const releaseUrl=`lanzamiento.html?ref=${currentTab==='albums'?'A':'L'}:${item.n}`;
  document.getElementById('mType').textContent=`${type} · #${String(item.n).padStart(2,'0')}`;
  document.getElementById('mTitle').textContent=item.title;
  document.getElementById('mPhase').textContent=item.phase;
  const img=document.getElementById('mThumbImg');
  img.src=`https://img.youtube.com/vi/${item.vid}/maxresdefault.jpg`;
  img.onerror=()=>{ img.src=`https://img.youtube.com/vi/${item.vid}/0.jpg`; img.onerror=null; };
  img.alt=item.title;
  document.getElementById('mThumbLink').href=releaseUrl;
  document.getElementById('mYtLink').href=releaseUrl;
  document.getElementById('mYtLink').textContent='▶ Ver ficha y escuchar aquí';
  document.getElementById('mYtLink').removeAttribute('target');
  document.getElementById('mThumbLink').removeAttribute('target');
  document.getElementById('mThumbLink').removeAttribute('rel');
  const bcEl = document.getElementById('mBcLink');
  if(item.bc){ bcEl.href = item.bc; bcEl.style.display = ''; } else { bcEl.href = '#'; bcEl.style.display = 'none'; }
  document.getElementById('mPrev').disabled=mIdx===0;
  document.getElementById('mNext').disabled=mIdx===mData.length-1;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow='hidden';
}

function navigateModal(dir){
  mIdx=Math.max(0,Math.min(mData.length-1,mIdx+dir));
  renderModal();
}

function closeModal(){
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow='';
}

document.getElementById('modal').addEventListener('click',e=>{if(e.target===document.getElementById('modal'))closeModal();});
document.addEventListener('keydown',e=>{
  if(!document.getElementById('modal').classList.contains('open'))return;
  if(e.key==='Escape')closeModal();
  if(e.key==='ArrowLeft')navigateModal(-1);
  if(e.key==='ArrowRight')navigateModal(1);
});


// Build dynamic welcome sections before cursor/scroll observers bind.
renderWelcomeOverview();

// ══════════════════════════════════════════════════════════════════
//  CURSOR
// ══════════════════════════════════════════════════════════════════
const cur=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function a(){cur.style.left=mx+'px';cur.style.top=my+'px';rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(a);})();
document.querySelectorAll('a,button,.disc-card,.plat-card,.tema-card,.phase-card,.serie-card,.rpl-item').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.classList.add('big');ring.classList.add('big');});
  el.addEventListener('mouseleave',()=>{cur.classList.remove('big');ring.classList.remove('big');});
});


// ══════════════════════════════════════════════════════════════════
//  SCROLL ANIM
// ══════════════════════════════════════════════════════════════════
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis');}),{threshold:.07});
document.querySelectorAll('.fu').forEach(el=>obs.observe(el));


// ══════════════════════════════════════════════════════════════════
//  HERO PARALLAX
// ══════════════════════════════════════════════════════════════════
const bgNum=document.getElementById('heroBgNum');
window.addEventListener('scroll',()=>{if(bgNum)bgNum.style.transform=`translate(-50%, calc(-50% + ${window.scrollY*.28}px))`;},{passive:true});


// ══════════════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════════════
buildGrids();
buildPhaseOptions();

// PLAYLIST VISOR: YouTube playlists + virtual thematic queues from main.js
function setPlaylistModal({src, href, title, subtitle}){
  const iframe = document.getElementById('pvIframe');
  const modal = document.getElementById('playlistModal');
  const ytLink = document.getElementById('pvYtLink');
  const t = document.getElementById('pvTitle');
  const sub = document.getElementById('pvSub');
  if(!iframe || !modal || !ytLink || !t) return;
  iframe.src = src;
  ytLink.href = href;
  t.textContent = title || 'Playlist';
  if(sub) sub.textContent = subtitle || 'Reproducción de playlist';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}

function openPlaylistModal(playlistId, title){
  if(!playlistId) return;
  setPlaylistModal({
    src:`https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&rel=0`,
    href:`https://www.youtube.com/playlist?list=${playlistId}`,
    title:title || 'Playlist',
    subtitle:'Playlist oficial de YouTube'
  });
}

function openThemeQueue(themeKey, title){
  const theme = AFACES_SITE.themes.find(t=>t.key===themeKey);
  if(!theme) return;
  const items = releasesByRefs(theme.refs).filter(x=>x.vid);
  const ids = items.map(x=>x.vid);
  if(!ids.length) return;
  const first = ids[0];
  const rest = ids.slice(1);
  const params = new URLSearchParams({autoplay:'1', rel:'0'});
  if(rest.length) params.set('playlist', rest.join(','));
  setPlaylistModal({
    src:`https://www.youtube.com/embed/${first}?${params.toString()}`,
    href:`https://www.youtube.com/watch?v=${first}`,
    title:title || theme.name,
    subtitle:`${items.length} obras · selección generada desde main.js`
  });
}

function closePlaylistModal(){
  const iframe = document.getElementById('pvIframe');
  const modal = document.getElementById('playlistModal');
  const sub = document.getElementById('pvSub');
  if(iframe) iframe.src = '';
  if(modal){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  }
  if(sub) sub.textContent = 'Reproducción de playlist';
  document.body.style.overflow='';
}

// Initializer for both static series playlists and generated thematic queues.
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.visor-btn,.serie-visor').forEach(btn=>{
    const pid = btn.dataset.playlist || '';
    const queue = btn.dataset.queue || '';
    if(!pid && !queue) btn.setAttribute('disabled','true');
    btn.addEventListener('click',e=>{
      e.preventDefault();
      const label = btn.textContent.trim();
      if(queue) openThemeQueue(queue,label);
      else if(pid) openPlaylistModal(pid,label);
    });
  });

  const pvClose = document.getElementById('pvClose');
  if(pvClose) pvClose.addEventListener('click',closePlaylistModal);
  const pModal = document.getElementById('playlistModal');
  if(pModal){
    pModal.addEventListener('click',e=>{ if(e.target===pModal) closePlaylistModal(); });
  }
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      const m=document.getElementById('playlistModal');
      if(m && m.classList.contains('open')) closePlaylistModal();
    }
  });
});
