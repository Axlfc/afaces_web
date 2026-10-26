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
  {n:91, title: "EL CICLO DE LA DECEPCIÓN", vid:"viX1QzYFF4Q", phase:"Sin clasificar", pb:"pb-rec"},
  {n:92, title: "LA HERENCIA DEL TESTIGO VACÍO", vid:"qPa4SJEa5UQ", phase:"Sin clasificar", pb:"pb-rec"},
  {n:93, title: "EL TESTIGO DE REEMPLAZO", vid:"7WoDnzL7A0g", phase:"Sin clasificar", pb:"pb-rec"},
  {n:94, title: "NO HABRÁ MÁS PREGUNTAS", vid:"gbECDu3gyoE", phase:"Sin clasificar", pb:"pb-rec"},
  {n:95, title: "EL RITUAL DEL MANTENIMIENTO", vid:"7RO7f-gpMx8", phase:"Sin clasificar", pb:"pb-rec"},
  {n:96, title: "LA DEGRADACIÓN MATERIAL DEL REGISTRO: ENTROPÍA BUROCRÁTICA", vid:"0Dm8ORZboaM", phase:"Sin clasificar", pb:"pb-rec"},
  {n:97, title: "RESONANCIA FÓSIL", vid:"2EYF3_8U8go", phase:"Sin clasificar", pb:"pb-rec"},
  {n:98, title: "EL ÓRGANO DE LOS LÍMITES", vid:"h0v7YzEGxQg", phase:"Sin clasificar", pb:"pb-rec"},
  {n:99, title: "LA SEGUNDA MAYOR", vid:"hDUDayP5xwo", phase:"Sin clasificar", pb:"pb-rec"},
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

// ══════════════════════════════════════════════════════════════════
//  RADIO PLAYER
// ══════════════════════════════════════════════════════════════════
//
//  Track paths follow the GitHub raw URL pattern used in afaces.github.io:
//  https://github.com/afaces/afaces.github.io/raw/refs/heads/main/assets/music/<folder>/<file>.mp3
//
//  Add / remove / reorder entries freely. The `album` field is used for
//  the playlist subtitle and the cover art (YouTube thumbnail via vid).
//  Leave `vid` empty ('') if no YouTube thumbnail is available.
// ──────────────────────────────────────────────────────────────────
const BASE = 'https://github.com/afaces/afaces.github.io/raw/refs/heads/main/assets/music/';

const RADIO_TRACKS = [
  // ── Álbum 1.- 'Nefasto' ──
  {
    name: "A Team Fight",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/8%20-%20A%20Team%20Fight.mp3"
  },
  {
    name: "Aberrante",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/10%20-%20Aberrante.mp3"
  },
  {
    name: "aceptable",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/22%20-%20aceptable.mp3"
  },
  {
    name: "Baby On Fire",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/4%20-%20Baby%20On%20Fire.mp3"
  },
  {
    name: "Back from there",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/16%20-%20Back%20from%20there.mp3"
  },
  {
    name: "Catastrofico",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/17%20-%20Catastrofico.mp3"
  },
  {
    name: "Cough",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/12%20-%20Cough.mp3"
  },
  {
    name: "Desgarrador2",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/3%20-%20Desgarrador2.mp3"
  },
  {
    name: "Don't remind me",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/23%20-%20Don%27t%20remind%20me.mp3"
  },
  {
    name: "egipto",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/18%20-%20egipto.mp3"
  },
  {
    name: "Floating",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/5%20-%20Floating.mp3"
  },
  {
    name: "Forgotten past",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/2%20-%20Forgotten%20past.mp3"
  },
  {
    name: "Ha ha ha",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/9%20-%20Ha%20ha%20ha.mp3"
  },
  {
    name: "Helo",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/15%20-%20Helo.mp3"
  },
  {
    name: "Help",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/11%20-%20Help.mp3"
  },
  {
    name: "Hot  Spicy",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/7%20-%20Hot%20%26%20Spicy.mp3"
  },
  {
    name: "Inconscience",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/6%20-%20Inconscience.mp3"
  },
  {
    name: "Just enough",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/13%20-%20Just%20enough.mp3"
  },
  {
    name: "Nefasto",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/1%20-%20Nefasto.mp3"
  },
  {
    name: "Platform",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/24%20-%20Platform.mp3"
  },
  {
    name: "Song for the deaf",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/14%20-%20Song%20for%20the%20deaf.mp3"
  },
  {
    name: "take those pills",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/19%20-%20take%20those%20pills.mp3"
  },
  {
    name: "Uh-uh ft. Yellow Button",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/20%20-%20Uh-uh%20ft.%20Yellow%20Button.mp3"
  },
  {
    name: "Waves Not Found",
    album: "1.- 'Nefasto'",
    vid: "SWNbhMxS4S4",
    path: BASE + "1.-%20%27Nefasto%27/21%20-%20Waves%20Not%20Found.mp3"
  },
  // ── Álbum 2.- 'Writer' ──
  {
    name: "Assault",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/3%20-%20Assault.mp3"
  },
  {
    name: "back to lack",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/16%20-%20back%20to%20lack.mp3"
  },
  {
    name: "Birthday of Universe",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/6%20-%20Birthday%20of%20Universe.mp3"
  },
  {
    name: "BONDAGE",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/21%20-%20BONDAGE.mp3"
  },
  {
    name: "Christmas again",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/15%20-%20Christmas%20again.mp3"
  },
  {
    name: "DEPresion",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/8%20-%20DEPresion.mp3"
  },
  {
    name: "Desires",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/11%20-Desires.mp3"
  },
  {
    name: "Dirty clothes",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/17%20-%20Dirty%20clothes.mp3"
  },
  {
    name: "Go  Catch A Flight",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/12%20-Go%20%26%20Catch%20A%20Flight.mp3"
  },
  {
    name: "haunted love",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/7%20-%20haunted%20love.mp3"
  },
  {
    name: "innocent",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/23%20-%20innocent.mp3"
  },
  {
    name: "Last Sight",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/24%20-%20Last%20Sight.mp3"
  },
  {
    name: "No Reason",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/2%20-%20No%20Reason.mp3"
  },
  {
    name: "Paint Over the Floor",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/4%20-%20Paint%20Over%20the%20Floor.mp3"
  },
  {
    name: "Pencil",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/1%20-%20Pencil.mp3"
  },
  {
    name: "Phoenix Arising From The Ashes",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/5%20-%20Phoenix%20Arising%20From%20The%20Ashes.mp3"
  },
  {
    name: "sick of it",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/19%20-%20sick%20of%20it.mp3"
  },
  {
    name: "tears",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/20%20-%20tears.mp3"
  },
  {
    name: "Time just gone",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/10%20-%20Time%20just%20gone.mp3"
  },
  {
    name: "too much",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/14%20-%20too%20much.mp3"
  },
  {
    name: "Warm in Winter",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/9%20-%20Warm%20in%20Winter.mp3"
  },
  {
    name: "What did he gone",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/13%20-%20What%20did,%20he%20gone.mp3"
  },
  {
    name: "Why so sad",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/18%20-%20Why%20so%20sad.mp3"
  },
  {
    name: "Writer",
    album: "2.- 'Writer'",
    vid: "1PB176jjic8",
    path: BASE + "2.-%20%27Writer%27/22%20-%20Writer.mp3"
  },
  // ── Álbum 3.- 'Back and Fro' ──
  {
    name: "Ball",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/18%20-%20Ball.mp3"
  },
  {
    name: "city lights",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/14%20-%20city%20lights.mp3"
  },
  {
    name: "day owl",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/4%20-%20day%20owl.mp3"
  },
  {
    name: "explorer",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/17%20-%20explorer.mp3"
  },
  {
    name: "goodbye beach",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/16%20-%20goodbye%20beach.mp3"
  },
  {
    name: "got the music of tonight",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/10%20-%20got%20the%20music%20of%20tonight.mp3"
  },
  {
    name: "Landscape",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/12%20-%20Landscape.mp3"
  },
  {
    name: "mirage",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/13%20-%20mirage.mp3"
  },
  {
    name: "moth",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/19%20-%20moth.mp3"
  },
  {
    name: "Oclock",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/7%20-%20Oclock.mp3"
  },
  {
    name: "shout",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/5%20-%20shout.mp3"
  },
  {
    name: "storm",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/9%20-%20storm.mp3"
  },
  {
    name: "sunrise",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/11%20-%20sunrise.mp3"
  },
  {
    name: "taste",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/1%20-%20taste.mp3"
  },
  {
    name: "teenage drive",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/3%20-%20teenage%20drive.mp3"
  },
  {
    name: "to and fro",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/20%20-%20to%20and%20fro.mp3"
  },
  {
    name: "troop",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/2%20-%20troop.mp3"
  },
  {
    name: "TUESDAY",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/15%20-%20TUESDAY.mp3"
  },
  {
    name: "village",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/8%20-%20village.mp3"
  },
  {
    name: "War King",
    album: "3.- 'Back and Fro'",
    vid: "uwmr2eNdpE4",
    path: BASE + "3.-%20%27Back%20and%20Fro%27/6%20-%20War%20King.mp3"
  },
  // ── Álbum 4.- 'Planetc' ──
  {
    name: "Ambrosia",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/1%20-%20Ambrosia.mp3"
  },
  {
    name: "aphostmere",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/19%20-%20aphostmere.mp3"
  },
  {
    name: "cold space",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/6%20-%20cold%20space.mp3"
  },
  {
    name: "encelato",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/17%20-%20encelato.mp3"
  },
  {
    name: "fast bad",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/3%20-%20fast%20bad.mp3"
  },
  {
    name: "ganimidi",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/18%20-%20ganimidi.mp3"
  },
  {
    name: "kind of weird",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/7%20-%20kind%20of%20weird.mp3"
  },
  {
    name: "LUNE",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/9%20-%20LUNE.mp3"
  },
  {
    name: "MARS",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/10%20-%20MARS.mp3"
  },
  {
    name: "memory",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/2%20-%20memory.mp3"
  },
  {
    name: "mercury",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/11%20-%20mercury.mp3"
  },
  {
    name: "Need",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/5%20-%20Need.mp3"
  },
  {
    name: "NETPUNO",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/15%20-%20NETPUNO.mp3"
  },
  {
    name: "Retipuj",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/13%20-%20Retipuj.mp3"
  },
  {
    name: "soon",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/16%20-%20soon.mp3"
  },
  {
    name: "stream",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/4%20-%20stream.mp3"
  },
  {
    name: "terre",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/8%20-%20terre.mp3"
  },
  {
    name: "uranio",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/14%20-%20uranio.mp3"
  },
  {
    name: "venus",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/12%20-%20venus.mp3"
  },
  {
    name: "yeahr",
    album: "4.- 'Planetc'",
    vid: "F44txcWQoJQ",
    path: BASE + "4.-%20%27Planetc%27/20%20-%20yeahr.mp3"
  },
  // ── Álbum 5.- 'Black' ──
  {
    name: "ad's grace",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/6%20-%20ad%27s%20grace.mp3"
  },
  {
    name: "andorthe",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/8%20-%20andorthe.mp3"
  },
  {
    name: "artrist",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/17%20-%20artrist.mp3"
  },
  {
    name: "BITTERCANDY",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/21%20-%20BITTERCANDY.mp3"
  },
  {
    name: "Bive",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/5%20-%20Bive.mp3"
  },
  {
    name: "Bulb",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/11%20-%20Bulb.mp3"
  },
  {
    name: "control_plus_s",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/20%20-%20control_plus_s.mp3"
  },
  {
    name: "COUNTLESS",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/15%20-%20COUNTLESS.mp3"
  },
  {
    name: "derklight",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/16%20-%20derklight.mp3"
  },
  {
    name: "furtherword",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/13%20-%20furtherword.mp3"
  },
  {
    name: "gallery",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/3%20-%20gallery.mp3"
  },
  {
    name: "Juggler",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/10%20-%20Juggler.mp3"
  },
  {
    name: "late",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/24%20-%20late.mp3"
  },
  {
    name: "orange",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/2%20-%20orange.mp3"
  },
  {
    name: "Petri dish",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/23%20-%20Petri%20dish.mp3"
  },
  {
    name: "scratch",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/12%20-%20scratch.mp3"
  },
  {
    name: "screan",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/1%20-%20screan.mp3"
  },
  {
    name: "Sentinel",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/14%20-%20Sentinel.mp3"
  },
  {
    name: "Shipfriend",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/25%20-%20Shipfriend.mp3"
  },
  {
    name: "shock",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/9%20-%20shock.mp3"
  },
  {
    name: "surrend",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/7%20-%20surrend.mp3"
  },
  {
    name: "todya",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/4%20-%20todya.mp3"
  },
  {
    name: "UNKNOWN",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/19%20-%20UNKNOWN.mp3"
  },
  {
    name: "water small",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/22%20-%20water%20small.mp3"
  },
  {
    name: "whatdidhappen",
    album: "5.- 'Black'",
    vid: "rcAxMjoC7fw",
    path: BASE + "5.-%20%27Black%27/18%20-%20whatdidhappen.mp3"
  },
  // ── Álbum 6.- 'list' ──
  {
    name: "ace",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/1%20-%20ace.mp3"
  },
  {
    name: "clear",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/8%20-%20clear.mp3"
  },
  {
    name: "clueless",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/9%20-%20clueless.mp3"
  },
  {
    name: "dancefloor",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/17%20-%20dancefloor.mp3"
  },
  {
    name: "depart",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/11%20-%20depart.mp3"
  },
  {
    name: "ease",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/13%20-%20ease.mp3"
  },
  {
    name: "escalene",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/16%20-%20escalene.mp3"
  },
  {
    name: "flash",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/14%20-%20flash.mp3"
  },
  {
    name: "Gone",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/10%20-%20Gone.mp3"
  },
  {
    name: "HitHats",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/18%20-%20HitHats.mp3"
  },
  {
    name: "leftovers",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/21%20-%20leftovers.mp3"
  },
  {
    name: "Noon",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/7%20-%20Noon.mp3"
  },
  {
    name: "petals",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/20%20-%20petals.mp3"
  },
  {
    name: "plate",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/19%20-%20plate.mp3"
  },
  {
    name: "robots in london",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/15%20-%20robots%20in%20london.mp3"
  },
  {
    name: "sniks",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/6%20-%20sniks.mp3"
  },
  {
    name: "start",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/2%20-%20start.mp3"
  },
  {
    name: "the power of gabber",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/3%20-%20the%20power%20of%20gabber.mp3"
  },
  {
    name: "Track lost",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/4%20-%20Track%20lost.mp3"
  },
  {
    name: "upward",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/22%20-%20upward.mp3"
  },
  {
    name: "wait",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/12%20-%20wait.mp3"
  },
  {
    name: "yawn",
    album: "6.- 'list'",
    vid: "_DSxx9E3MCQ",
    path: BASE + "6.-%20%27list%27/5%20-%20yawn.mp3"
  },
  // ── Álbum 7.- 'A cool name' ──
  {
    name: "boom!",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/18%20-%20boom!.mp3"
  },
  {
    name: "celebrate",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/10%20-%20celebrate.mp3"
  },
  {
    name: "Fly",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/3%20-%20Fly.mp3"
  },
  {
    name: "graph",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/12%20-%20graph.mp3"
  },
  {
    name: "haul",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/8%20-%20haul.mp3"
  },
  {
    name: "heartbreak",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/5%20-%20heartbreak.mp3"
  },
  {
    name: "hustle",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/6%20-%20hustle.mp3"
  },
  {
    name: "lasers through smoke",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/7%20-%20lasers%20through%20smoke.mp3"
  },
  {
    name: "mirror",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/14%20-%20mirror.mp3"
  },
  {
    name: "Negativ",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/1%20-%20Negativ.mp3"
  },
  {
    name: "r u there",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/17%20-%20r%20u%20there.mp3"
  },
  {
    name: "resources",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/16%20-%20resources.mp3"
  },
  {
    name: "shining stars",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/9%20-%20shining%20stars.mp3"
  },
  {
    name: "sos",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/13%20-%20sos.mp3"
  },
  {
    name: "step",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/11%20-%20step.mp3"
  },
  {
    name: "unbalanced",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/2%20-%20unbalanced.mp3"
  },
  {
    name: "Untitled",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/4%20-%20Untitled.mp3"
  },
  {
    name: "vortex attack",
    album: "7.- 'A cool name'",
    vid: "RVxpNONLZ8o",
    path: BASE + "7.-%20%27A%20cool%20name%27/15%20-%20vortex%20attack.mp3"
  },
  // ── Álbum 8.- '50%' ──
  {
    name: "50%",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/21%20-%2050%.mp3"
  },
  {
    name: "best beast",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/17%20-%20best%20beast.mp3"
  },
  {
    name: "branch",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/5%20-%20branch.mp3"
  },
  {
    name: "Cute As Hell",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/18%20-%20Cute%20As%20Hell.mp3"
  },
  {
    name: "edge",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/20%20-%20edge.mp3"
  },
  {
    name: "gap",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/8%20-%20gap.mp3"
  },
  {
    name: "hot pockets",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/22%20-%20hot%20pockets.mp3"
  },
  {
    name: "jackpot",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/2%20-%20jackpot.mp3"
  },
  {
    name: "loco motion",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/16%20-%20loco%20motion.mp3"
  },
  {
    name: "meet",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/3%20-%20meet.mp3"
  },
  {
    name: "missing",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/10%20-%20missing.mp3"
  },
  {
    name: "new titles",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/15%20-%20new%20titles.mp3"
  },
  {
    name: "no one",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/1%20-%20no%20one.mp3"
  },
  {
    name: "Prince",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/9%20-%20Prince.mp3"
  },
  {
    name: "regreat",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/19%20-%20regreat.mp3"
  },
  {
    name: "roundabout",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/4%20-%20roundabout.mp3"
  },
  {
    name: "sirens",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/14%20-%20sirens.mp3"
  },
  {
    name: "skid",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/6%20-%20skid.mp3"
  },
  {
    name: "sticky heat",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/11%20-%20sticky%20heat.mp3"
  },
  {
    name: "stop",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/7%20-%20stop.mp3"
  },
  {
    name: "surcease",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/12%20-%20surcease.mp3"
  },
  {
    name: "Weissbier",
    album: "8.- '50%'",
    vid: "_4Vfk487foQ",
    path: BASE + "8.-%20%2750%%27/13%20-%20Weissbier.mp3"
  },
  // ── Álbum 9.- 'advisory content' ──
  {
    name: "candle",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/15%20-%20candle.mp3"
  },
  {
    name: "Chasing papers",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/19%20-%20Chasing%20papers.mp3"
  },
  {
    name: "cigarret advertisement",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/1%20-%20cigarret%20advertisement.mp3"
  },
  {
    name: "club the clap",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/14%20-%20club%20the%20clap.mp3"
  },
  {
    name: "coolture",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/9%20-%20coolture.mp3"
  },
  {
    name: "dessert",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/7%20-%20dessert.mp3"
  },
  {
    name: "enchanted",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/18%20-%20enchanted.mp3"
  },
  {
    name: "forbear",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/21%20-%20forbear.mp3"
  },
  {
    name: "freemium",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/10%20-%20freemium.mp3"
  },
  {
    name: "keen",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/12%20-%20keen.mp3"
  },
  {
    name: "lab",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/5%20-%20lab.mp3"
  },
  {
    name: "lesshome",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/17%20-%20lesshome.mp3"
  },
  {
    name: "lit",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/6%20-%20lit.mp3"
  },
  {
    name: "no more recall",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/11%20-%20no%20more%20recall.mp3"
  },
  {
    name: "nostalgia",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/3%20-%20nostalgia.mp3"
  },
  {
    name: "one blink two eyes",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/20%20-%20one%20blink%20two%20eyes.mp3"
  },
  {
    name: "parlor",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/16%20-%20parlor.mp3"
  },
  {
    name: "ray-v",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/4%20-%20ray-v.mp3"
  },
  {
    name: "seawatch",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/2%20-%20seawatch.mp3"
  },
  {
    name: "tahw",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/8%20-%20tahw.mp3"
  },
  {
    name: "try",
    album: "9.- 'advisory content'",
    vid: "ybNa3a48fxk",
    path: BASE + "9.-%20%27advisory%20content%27/13%20-%20try.mp3"
  },
  // ── Álbum 10.- 'BUY NEVER' ──
  {
    name: "1 .- Entrance",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/1%20.-%20Entrance.mp3"
  },
  {
    name: "Adrian",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/16.-%20Adrian.mp3"
  },
  {
    name: "Ana",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/11.-%20Ana.mp3"
  },
  {
    name: "Aubrey",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/9.-%20Aubrey.mp3"
  },
  {
    name: "Breath Pause",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/6.-%20Breath%20Pause.mp3"
  },
  {
    name: "Confidant",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/4.-%20Confidant.mp3"
  },
  {
    name: "Cruiser",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/19.-%20Cruiser.mp3"
  },
  {
    name: "Darcy",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/10.-%20Darcy.mp3"
  },
  {
    name: "Deter",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/18.-%20Deter.mp3"
  },
  {
    name: "Extravaganza",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/3.-%20Extravaganza.mp3"
  },
  {
    name: "Field Company",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/5.-%20Field%20Company.mp3"
  },
  {
    name: "Haze",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/2.-%20Haze.mp3"
  },
  {
    name: "John",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/14.-%20John.mp3"
  },
  {
    name: "Jugular",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/8.-%20Jugular.mp3"
  },
  {
    name: "Julia",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/12.-%20Julia.mp3"
  },
  {
    name: "Land",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/17.-%20Land.mp3"
  },
  {
    name: "Martin",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/15.-%20Martin.mp3"
  },
  {
    name: "Off Faces",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/20.-%20Off%20Faces.mp3"
  },
  {
    name: "Pete",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/13.-%20Pete.mp3"
  },
  {
    name: "Roads to Nowhere",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/21.-%20Roads%20to%20Nowhere.mp3"
  },
  {
    name: "Violence en l'amour",
    album: "10.- 'BUY NEVER'",
    vid: "Utmf9RgCITo",
    path: BASE + "10.-%20%27BUY%20NEVER%27/7.-%20Violence%20en%20l%27amour.mp3"
  },
  // ── Álbum 11.- 'Bull's-eye' ──
  {
    name: "Ashore",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/12%20-%20Ashore.mp3"
  },
  {
    name: "Bearer",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/10%20-%20Bearer.mp3"
  },
  {
    name: "Cap",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/11%20-%20Cap.mp3"
  },
  {
    name: "Confine Yourself",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/17%20-%20Confine%20Yourself.mp3"
  },
  {
    name: "darts",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/6%20-%20darts.mp3"
  },
  {
    name: "Heights",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/9%20-%20Heights.mp3"
  },
  {
    name: "Heirs",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/5%20-%20Heirs.mp3"
  },
  {
    name: "Nightmares",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/14%20-%20Nightmares.mp3"
  },
  {
    name: "Nights Alone fake  Bill",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/2%20-Nights%20Alone%20(fake%20$%20Bill).mp3"
  },
  {
    name: "Not's new",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/20%20-%20Not%27s%20new.mp3"
  },
  {
    name: "On try",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/18%20-%20On%20try.mp3"
  },
  {
    name: "Play my mind",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/19%20-%20Play%20my%20mind.mp3"
  },
  {
    name: "Powder",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/7%20-%20Powder.mp3"
  },
  {
    name: "Presage",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/15%20-%20Presage.mp3"
  },
  {
    name: "r-Cycle",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/3%20-%20r-Cycle.mp3"
  },
  {
    name: "Real Heterogeneous Fauna",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/13%20-%20Real%20Heterogeneous%20Fauna.mp3"
  },
  {
    name: "scrape",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/16%20-%20scrape.mp3"
  },
  {
    name: "Struggles",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/4%20-%20Struggles.mp3"
  },
  {
    name: "Traeh",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/8%20-Traeh.mp3"
  },
  {
    name: "Try your worst",
    album: "11.- 'Bull's-eye'",
    vid: "VCzKkBZ-03w",
    path: BASE + "11.-%20%27Bull%27s-eye%27/1%20-%20Try%20your%20worst.mp3"
  },
  // ── Álbum 12.- 'Where are my royalties' ──
  {
    name: "26536",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/15%20-%2026536.mp3"
  },
  {
    name: "abmas",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/14%20-%20abmas.mp3"
  },
  {
    name: "Calmly",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/11%20-%20Calmly.mp3"
  },
  {
    name: "Corsair",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/2%20-%20Corsair.mp3"
  },
  {
    name: "End",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/13%20-%20End.mp3"
  },
  {
    name: "God knows no",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/1%20-%20God%20knows%20no.mp3"
  },
  {
    name: "How",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/9%20-%20How.mp3"
  },
  {
    name: "migraine",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/12%20-%20migraine.mp3"
  },
  {
    name: "Mnoalu",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/18%20-%20Mnoalu.mp3"
  },
  {
    name: "Oh yeah hey",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/10%20-%20Oh%20yeah%20hey.mp3"
  },
  {
    name: "Prevail",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/4%20-%20Prevail.mp3"
  },
  {
    name: "Sari",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/6%20-%20Sari.mp3"
  },
  {
    name: "shadows",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/16%20-%20shadows.mp3"
  },
  {
    name: "Shudder",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/5-%20Shudder.mp3"
  },
  {
    name: "Stay Home metamorphosis",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/3%20-%20Stay%20Home%20(metamorphosis).mp3"
  },
  {
    name: "Subterfuge",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/7%20-%20Subterfuge.mp3"
  },
  {
    name: "trial",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/17%20-%20trial.mp3"
  },
  {
    name: "Tú",
    album: "12.- 'Where are my royalties'",
    vid: "zg2NECdI3OY",
    path: BASE + "12.-%20%27Where%20are%20my%20royalties%27/8-%20Tú.mp3"
  },
  // ── Álbum 13.- 'Who u tryna' impress' ──
  {
    name: "annexes",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/17%20-%20annexes.mp3"
  },
  {
    name: "castle queenside",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/24%20-%20castle%20queenside.mp3"
  },
  {
    name: "check it out",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/15%20-%20check%20it%20out.mp3"
  },
  {
    name: "doll",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/11%20-%20doll.mp3"
  },
  {
    name: "door",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/19%20-%20door.mp3"
  },
  {
    name: "first",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/12%20-%20first.mp3"
  },
  {
    name: "fletsif",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/8%20-%20fletsif.mp3"
  },
  {
    name: "funk-o-matic",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/3%20-%20funk-o-matic.mp3"
  },
  {
    name: "not the last",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/14%20-%20not%20the%20last.mp3"
  },
  {
    name: "now what",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/10%20-%20now%20what.mp3"
  },
  {
    name: "numbers",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/16%20-%20numbers.mp3"
  },
  {
    name: "Over lovely",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/1%20-%20Over%20lovely.mp3"
  },
  {
    name: "pledge",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/7%20-%20pledge.mp3"
  },
  {
    name: "State of matters",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/9%20-%20State%20of%20matters.mp3"
  },
  {
    name: "swarmv",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/6%20-%20swarmv.mp3"
  },
  {
    name: "Sway",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/2-%20Sway.mp3"
  },
  {
    name: "though",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/13%20-%20though.mp3"
  },
  {
    name: "together stay",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/21%20-%20together%20stay.mp3"
  },
  {
    name: "toutlair",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/5%20-%20toutlair.mp3"
  },
  {
    name: "Una luz",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/18%20-%20Una%20luz.mp3"
  },
  {
    name: "Wired",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/20%20-%20Wired.mp3"
  },
  {
    name: "yes",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/22%20-%20yes.mp3"
  },
  {
    name: "you dont want to know anything about me",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/4%20-%20you%20dont%20want%20to%20know%20anything%20about%20me.mp3"
  },
  {
    name: "zoom",
    album: "13.- 'Who u tryna' impress'",
    vid: "Nx3ucT01P-g",
    path: BASE + "13.-%20%27Who%20u%20tryna%27%20impress%27/23%20-%20zoom.mp3"
  },
  // ── Álbum 14.- 'The bad words' ──
  {
    name: "Accomplices of Tyranny",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/13%20-%20Accomplices%20of%20Tyranny.mp3"
  },
  {
    name: "Back to a New State of Normality",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/21%20-%20Back%20to%20a%20New%20State%20of%20Normality.mp3"
  },
  {
    name: "Breakfast at FakeNew's",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/15%20-%20Breakfast%20at%20FakeNew%27s.mp3"
  },
  {
    name: "Corruption pillage",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/10%20-%20Corruption%20pillage.mp3"
  },
  {
    name: "Denounce your neighbor",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/9%20-%20Denounce%20your%20neighbor.mp3"
  },
  {
    name: "Disobey the Children",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/12%20-%20Disobey%20the%20Children.mp3"
  },
  {
    name: "Dumb Intellectual Property",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/18%20-%20Dumb%20Intellectual%20Property.mp3"
  },
  {
    name: "Emotional terrorism",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/7%20-%20Emotional%20terrorism.mp3"
  },
  {
    name: "F the industry",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/2%20-%20F%20the%20industry.mp3"
  },
  {
    name: "Freedom slaught",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/5%20-%20Freedom%20slaught.mp3"
  },
  {
    name: "Global Alarm",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/20%20-%20Global%20Alarm.mp3"
  },
  {
    name: "Hijack thoughts",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/6%20-%20Hijack%20thoughts.mp3"
  },
  {
    name: "Pure uncut drug",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/16%20-%20Pure%20uncut%20drug.mp3"
  },
  {
    name: "Rape my pockets",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/4%20-%20Rape%20my%20pockets.mp3"
  },
  {
    name: "Reveal the Lies",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/17%20-%20Reveal%20the%20Lies.mp3"
  },
  {
    name: "Sedition from Earth",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/11%20-%20Sedition%20from%20Earth.mp3"
  },
  {
    name: "Smoke The Law",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/3%20-%20Smoke%20The%20Law.mp3"
  },
  {
    name: "Speech of Fake Freedom",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/19%20-%20Speech%20of%20Fake%20Freedom.mp3"
  },
  {
    name: "Suicide Collective",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/14%20-%20Suicide%20Collective.mp3"
  },
  {
    name: "Traffic under other's influence",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/8%20-%20Traffic%20under%20other%27s%20influence.mp3"
  },
  {
    name: "YouThieve",
    album: "14.- 'The bad words'",
    vid: "rEKs9ttSOLA",
    path: BASE + "14.-%20%27The%20bad%20words%27/1%20-%20YouThieve.mp3"
  },
  // ── Álbum 15.- 'Journey to Wasted Youth' ──
  {
    name: "Afflatus",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/10%20-%20Afflatus.mp3"
  },
  {
    name: "Bloody Valhalla",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/9%20-%20Bloody%20Valhalla.mp3"
  },
  {
    name: "Conquer",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/13%20-%20Conquer.mp3"
  },
  {
    name: "crossed looks",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/12%20-%20crossed%20looks.mp3"
  },
  {
    name: "deal",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/19%20-%20deal.mp3"
  },
  {
    name: "Desolate",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/18%20-%20Desolate.mp3"
  },
  {
    name: "do your will",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/2%20-%20do%20your%20will.mp3"
  },
  {
    name: "elope",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/20%20-%20elope.mp3"
  },
  {
    name: "For what do",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/15%20-%20For%20what%20do.mp3"
  },
  {
    name: "get you hype",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/1%20-%20get%20you%20hype.mp3"
  },
  {
    name: "I own a computer",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/4%20-%20I%20own%20a%20computer.mp3"
  },
  {
    name: "lewej",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/16%20-%20lewej.mp3"
  },
  {
    name: "Melalcoholiac",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/7%20-%20Melalcoholiac.mp3"
  },
  {
    name: "Not me to talk",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/14%20-%20Not%20me%20to%20talk.mp3"
  },
  {
    name: "Peevish",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/8%20-%20Peevish.mp3"
  },
  {
    name: "Soul impulse",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/5%20-%20Soul%20impulse.mp3"
  },
  {
    name: "Techne",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/6%20-%20Techne.mp3"
  },
  {
    name: "Way to Death",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/11%20-%20Way%20to%20Death.mp3"
  },
  {
    name: "Weight of Ego",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/3%20-%20Weight%20of%20Ego.mp3"
  },
  {
    name: "Wicked",
    album: "15.- 'Journey to Wasted Youth'",
    vid: "0EdaPCRZXmY",
    path: BASE + "15.-%20%27Journey%20to%20Wasted%20Youth%27/17%20-%20Wicked.mp3"
  },
  // ── Álbum 16.- 'Lyricless Miracles' ──
  {
    name: "all almost",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/12%20-%20all%20almost.mp3"
  },
  {
    name: "Amalgam",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/5%20-%20Amalgam.mp3"
  },
  {
    name: "Back your watch",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/11%20-%20Back%20your%20watch.mp3"
  },
  {
    name: "Blue",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/7%20-%20Blue.mp3"
  },
  {
    name: "Burn it",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/19%20-%20Burn%20it.mp3"
  },
  {
    name: "casual",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/16%20-%20casual.mp3"
  },
  {
    name: "concealed",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/20%20-%20concealed.mp3"
  },
  {
    name: "Drifted",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/4%20-%20Drifted.mp3"
  },
  {
    name: "Forgotten kisses",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/8%20-%20Forgotten%20kisses.mp3"
  },
  {
    name: "Headway",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/2%20-%20Headway.mp3"
  },
  {
    name: "It Seems That The Clouds Left With You",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/14%20-%20It%20Seems%20That%20The%20Clouds%20Left%20With%20You.mp3"
  },
  {
    name: "Lightning",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/21%20-%20Lightning.mp3"
  },
  {
    name: "might",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/15%20-%20might.mp3"
  },
  {
    name: "Nitwit",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/9%20-%20Nitwit.mp3"
  },
  {
    name: "Paramount echoes",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/3%20-%20Paramount%20echoes.mp3"
  },
  {
    name: "Place",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/1%20-%20Place.mp3"
  },
  {
    name: "regrowth",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/18%20-%20regrowth.mp3"
  },
  {
    name: "skyline",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/13%20-%20skyline.mp3"
  },
  {
    name: "Soulmates",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/6%20-%20Soulmates.mp3"
  },
  {
    name: "Untangled",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/17%20-%20Untangled.mp3"
  },
  {
    name: "Wait me for",
    album: "16.- 'Lyricless Miracles'",
    vid: "FzD53ikXz5w",
    path: BASE + "16.-%20%27Lyricless%20Miracles%27/10%20-%20Wait%20me%20for.mp3"
  },
  // ── Álbum 17.- 'irl' ──
  {
    name: "3",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/3%20-%203.mp3"
  },
  {
    name: "4444",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/4%20-%204444.mp3"
  },
  {
    name: "Bad DJ",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/17%20-%20Bad%20DJ.mp3"
  },
  {
    name: "Bitter Goodbyes",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/11%20-%20Bitter%20Goodbyes.mp3"
  },
  {
    name: "Downstairs",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/8%20-%20Downstairs.mp3"
  },
  {
    name: "Flummox",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/9%20-%20Flummox.mp3"
  },
  {
    name: "Handhold",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/16%20-%20Handhold.mp3"
  },
  {
    name: "Have to have",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/6%20-%20Have%20to%20have.mp3"
  },
  {
    name: "Last Summer",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/7%20-%20Last%20Summer.mp3"
  },
  {
    name: "Misery",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/1.-%20Misery.mp3"
  },
  {
    name: "Old Hat",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/14%20-%20Old%20Hat.mp3"
  },
  {
    name: "Outcast",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/10%20-%20Outcast.mp3"
  },
  {
    name: "Pay day",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/18%20-%20Pay%20day.mp3"
  },
  {
    name: "Poor aching heart",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/15%20-%20Poor%20aching%20heart.mp3"
  },
  {
    name: "Sand",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/12%20-%20Sand.mp3"
  },
  {
    name: "Sunshine eyes",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/13%20-%20Sunshine%20eyes.mp3"
  },
  {
    name: "The music you skip",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/5%20-%20The%20music%20you%20skip.mp3"
  },
  {
    name: "Wonder",
    album: "17.- 'irl'",
    vid: "g9dWBnJ20MQ",
    path: BASE + "17.-%20%27irl%27/2%20-%20Wonder.mp3"
  },
  // ── Álbum 18.- 'before senescence' ──
  {
    name: "14 - New Titles1",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/13%20-%2014%20-%20New%20Titles[1].mp3"
  },
  {
    name: "Awry astrays",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/7%20-%20Awry%20astrays.mp3"
  },
  {
    name: "Bottle",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/2%20-%20Bottle.mp3"
  },
  {
    name: "Cat",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/16%20-%20Cat.mp3"
  },
  {
    name: "Chiripitiflauticus",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/15%20-Chiripitiflauticus.mp3"
  },
  {
    name: "External thoughts",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/14%20-%20External%20thoughts.mp3"
  },
  {
    name: "Flail",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/11%20-%20Flail.mp3"
  },
  {
    name: "Greedings",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/9%20-%20Greedings.mp3"
  },
  {
    name: "Hang up",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/5%20-%20Hang%20up.mp3"
  },
  {
    name: "Hi there",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/17%20-%20Hi%20there.mp3"
  },
  {
    name: "Infraencer",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/6%20-%20Infraencer.mp3"
  },
  {
    name: "Large dresses",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/8%20-%20Large%20dresses.mp3"
  },
  {
    name: "Lonely - Bella Thorne - Afaces remix",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/Lonely%20-%20Bella%20Thorne%20-%20Afaces%20remix.mp3"
  },
  {
    name: "Preshrunk",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/1%20-%20Preshrunk.mp3"
  },
  {
    name: "Questions",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/12%20-%20Questions.mp3"
  },
  {
    name: "Soundtest3",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/18%20-%20Soundtest3.mp3"
  },
  {
    name: "That epoch you existed",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/3%20-%20That%20epoch%20you%20existed.mp3"
  },
  {
    name: "Unplaylisted",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/4%20-%20Unplaylisted.mp3"
  },
  {
    name: "Whim",
    album: "18.- 'before senescence'",
    vid: "uEgdTjGGk-Y",
    path: BASE + "18.-%20%27before%20senescence%27/10%20-%20Whim.mp3"
  },
  // ── Álbum 19.- 'back to the origins' ──
  {
    name: "Astronauta",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/18.-%20Astronauta.mp3"
  },
  {
    name: "blue lighted rain",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/20.-%20blue%20lighted%20rain.mp3"
  },
  {
    name: "Destiny repeats",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/13.-%20Destiny%20repeats.mp3"
  },
  {
    name: "dial",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/15.-%20dial.mp3"
  },
  {
    name: "Flying neon tires",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/11.-%20Flying%20neon%20tires.mp3"
  },
  {
    name: "good night",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/21.-%20good%20night.mp3"
  },
  {
    name: "La hija de Franco",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/16.-%20La%20hija%20de%20Franco.mp3"
  },
  {
    name: "liek",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/3.-%20liek.mp3"
  },
  {
    name: "Long time no see",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/9.-%20Long%20time%20no%20see.mp3"
  },
  {
    name: "Making me crazy",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/4.-%20Making%20me%20crazy.mp3"
  },
  {
    name: "mixptakes",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/7.-%20mixptakes.mp3"
  },
  {
    name: "My mother's softener",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/14.-%20My%20mother%27s%20softener.mp3"
  },
  {
    name: "Old times",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/8.-%20Old%20times.mp3"
  },
  {
    name: "Schedules",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/19.-%20Schedules.mp3"
  },
  {
    name: "Sintonize",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/17.-%20Sintonize.mp3"
  },
  {
    name: "Soundtest2",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/12.-%20Soundtest2.mp3"
  },
  {
    name: "Stick to the tree",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/5.-%20Stick%20to%20the%20tree.mp3"
  },
  {
    name: "Tarnish",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/2.-%20Tarnish.mp3"
  },
  {
    name: "This song has no video",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/1.-%20This%20song%20has%20no%20video.mp3"
  },
  {
    name: "trap'd by u",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/10.-%20trap%27d%20by%20u.mp3"
  },
  {
    name: "vitriolic",
    album: "19.- 'back to the origins'",
    vid: "Lt66WnK2Xq4",
    path: BASE + "19.-%20%27back%20to%20the%20origins%27/6.-%20vitriolic.mp3"
  },
  // ── Álbum 20.- 'conversation conservation' ──
  {
    name: "aftermath",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/6.-%20aftermath.mp3"
  },
  {
    name: "bday boi",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/19.-%20bday%20boi.mp3"
  },
  {
    name: "change of view",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/13.-%20change%20of%20view.mp3"
  },
  {
    name: "first day's afternoon dormer junk",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/8.-%20first%20day%27s%20afternoon%20dormer%20junk.mp3"
  },
  {
    name: "gators",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/11.-%20gators.mp3"
  },
  {
    name: "improvise over",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/12.-%20improvise%20over.mp3"
  },
  {
    name: "last day's morning bedroom trash",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/7.-%20last%20day%27s%20morning%20bedroom%20trash.mp3"
  },
  {
    name: "mami call you later",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/4.-%20mami%20call%20you%20later.mp3"
  },
  {
    name: "man's compliments",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/3.-%20man%27s%20compliments.mp3"
  },
  {
    name: "Messy streak",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/1.-%20Messy%20streak.mp3"
  },
  {
    name: "more work",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/18.-%20more%20work.mp3"
  },
  {
    name: "raw",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/20.-%20raw.mp3"
  },
  {
    name: "so cheap",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/5.-%20so%20cheap.mp3"
  },
  {
    name: "taboo",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/16.-%20taboo.mp3"
  },
  {
    name: "the ether",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/14.-%20the%20ether.mp3"
  },
  {
    name: "things removed",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/2.-%20things%20removed.mp3"
  },
  {
    name: "tired",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/9.-%20tired.mp3"
  },
  {
    name: "Unbidden",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/15.-%20Unbidden.mp3"
  },
  {
    name: "where do I weirdo I",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/17.-%20where%20do%20I%20(weirdo%20I).mp3"
  },
  {
    name: "words of choice",
    album: "20.- 'conversation conservation'",
    vid: "msZJIYzS7vA",
    path: BASE + "20.-%20%27conversation%20conservation%27/10.-%20words%20of%20choice.mp3"
  },
  // ── Álbum 21.- 'Gloomy dances' ──
  {
    name: "almsgiving",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/4.-%20almsgiving.mp3"
  },
  {
    name: "appear",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/12.-%20appear.mp3"
  },
  {
    name: "bby",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/2.-%20bby.mp3"
  },
  {
    name: "cascade",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/8.-%20cascade.mp3"
  },
  {
    name: "distractions",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/6.-%20distractions.mp3"
  },
  {
    name: "flickering",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/15.-%20flickering.mp3"
  },
  {
    name: "La cour de mon grand-père",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/16.-%20La%20cour%20de%20mon%20grand-père.mp3"
  },
  {
    name: "mcguffin",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/3.-%20mcguffin.mp3"
  },
  {
    name: "Plans",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/14.-%20Plans.mp3"
  },
  {
    name: "product project",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/5.-%20product%20project.mp3"
  },
  {
    name: "promise",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/18.-%20promise.mp3"
  },
  {
    name: "secrets",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/7.-%20secrets.mp3"
  },
  {
    name: "So far so close your friends will be okay",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/10.-%20So%20far%20so%20close%20(your%20friends%20will%20be%20okay).mp3"
  },
  {
    name: "sunscreen",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/9.-%20sunscreen.mp3"
  },
  {
    name: "trip",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/11.-%20trip.mp3"
  },
  {
    name: "unspeak",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/19.-%20unspeak.mp3"
  },
  {
    name: "Unveil",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/13.-%20Unveil.mp3"
  },
  {
    name: "Used to be my friend",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/20.-%20Used%20to%20be%20my%20friend.mp3"
  },
  {
    name: "what's poppin'",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/17.-%20what%27s%20poppin%27.mp3"
  },
  {
    name: "yeah yeah",
    album: "21.- 'Gloomy dances'",
    vid: "jojN7p_oBsw",
    path: BASE + "21.-%20%27Gloomy%20dances%27/1.-%20yeah%20yeah.mp3"
  },
  // ── Álbum 22.- 'Not Too Bad' ──
  {
    name: "aigre-doux",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/15.-%20aigre-doux.mp3"
  },
  {
    name: "bane",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/17.-%20bane.mp3"
  },
  {
    name: "batteries not included",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/20.-%20batteries%20not%20included.mp3"
  },
  {
    name: "Bleak",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/2.-%20Bleak.mp3"
  },
  {
    name: "cloaks",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/19.-%20cloaks.mp3"
  },
  {
    name: "dear diary",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/14.-%20dear%20diary.mp3"
  },
  {
    name: "dim bone",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/9.-%20dim%20bone.mp3"
  },
  {
    name: "Distant echoes of lost loves",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/10.-%20Distant%20echoes%20of%20lost%20loves.mp3"
  },
  {
    name: "forlorn",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/18.-%20forlorn.mp3"
  },
  {
    name: "giddy",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/12.-%20giddy.mp3"
  },
  {
    name: "grewth",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/4.-%20grewth.mp3"
  },
  {
    name: "Ker al Loch",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/1.-%20Ker%20al%20Loch.mp3"
  },
  {
    name: "Life without u",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/16.-%20Life%20without%20u.mp3"
  },
  {
    name: "nab",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/8.-%20nab.mp3"
  },
  {
    name: "pleasant strangeness",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/21.-%20%20pleasant%20strangeness.mp3"
  },
  {
    name: "resile",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/7.-%20resile.mp3"
  },
  {
    name: "Sad kids game",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/5.-%20%20Sad%20kids%20game.mp3"
  },
  {
    name: "seed",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/3.-%20seed.mp3"
  },
  {
    name: "Stalwart",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/11.-%20Stalwart.mp3"
  },
  {
    name: "wag",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/13.-%20wag.mp3"
  },
  {
    name: "Worthless",
    album: "22.- 'Not Too Bad'",
    vid: "5D2dG7wPEGc",
    path: BASE + "22.-%20%27Not%20Too%20Bad%27/6.-%20Worthless.mp3"
  },
  // ── Álbum 23.- 'There is Another' ──
  {
    name: "alive verge",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/21.-%20alive%20verge.mp3"
  },
  {
    name: "cross lines",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/6.-%20cross%20lines.mp3"
  },
  {
    name: "diffident age",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/12.-%20diffident%20age.mp3"
  },
  {
    name: "dissent",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/15.-%20dissent.mp3"
  },
  {
    name: "dubious",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/13.-%20dubious.mp3"
  },
  {
    name: "flowers",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/20.-%20flowers.mp3"
  },
  {
    name: "half below",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/23.-%20half%20below.mp3"
  },
  {
    name: "handle",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/9.-%20handle.mp3"
  },
  {
    name: "humdrum",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/16.-%20humdrum.mp3"
  },
  {
    name: "Kept me hanging",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/1.-%20%20Kept%20me%20hanging.mp3"
  },
  {
    name: "Leaks",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/4.-%20Leaks.mp3"
  },
  {
    name: "mayhap",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/11.-%20mayhap.mp3"
  },
  {
    name: "milling",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/10.-%20milling.mp3"
  },
  {
    name: "nothing left",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/7.-%20nothing%20left.mp3"
  },
  {
    name: "one floor",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/8.-%20one%20floor.mp3"
  },
  {
    name: "salver",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/18.-%20salver.mp3"
  },
  {
    name: "Solution",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/2.-%20Solution.mp3"
  },
  {
    name: "strike",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/14.-%20strike.mp3"
  },
  {
    name: "tie your shoes",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/22.-%20tie%20your%20shoes.mp3"
  },
  {
    name: "toss",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/17.-%20toss.mp3"
  },
  {
    name: "trite",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/19.-%20trite.mp3"
  },
  {
    name: "undertow",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/5.-%20undertow.mp3"
  },
  {
    name: "Where were you this friday night",
    album: "23.- 'There is Another'",
    vid: "yJaQezPFOdc",
    path: BASE + "23.-%20%27There%20is%20Another%27/3.-%20Where%20were%20you%20this%20friday%20night.mp3"
  },
  // ── Añade más pistas aquí siguiendo el mismo patrón ──
  // {
  //   name: "Nombre de la canción",
  //   album: "N.- 'Nombre del álbum'",
  //   vid: "ID_YOUTUBE",
  //   path: BASE + "N.-%20'Album%20folder'/N%20-%20track.mp3"
  // },
];


// ── Radio state ──────────────────────────────────────────────────
const radio = {
  audio: new Audio(),
  idx: 0,
  playing: false,
  shuffle: false,
  shuffleHistory: [],

  get track() { return RADIO_TRACKS[this.idx]; }
};

// ── DOM refs ────────────────────────────────────────────────────
const rPanel      = document.getElementById('radioPanel');
const rBackdrop   = document.getElementById('radioBackdrop');
const rToggleBtn  = document.getElementById('radioToggle');
const rCloseBtn   = document.getElementById('radioClose');
const rPlayBtn    = document.getElementById('rPlay');
const rPrevBtn    = document.getElementById('rPrev');
const rNextBtn    = document.getElementById('rNext');
const rShuffleBtn = document.getElementById('rShuffle');
const rSeek       = document.getElementById('radioSeek');
const rVolSlider  = document.getElementById('radioVol');
const rFill       = document.getElementById('radioProgressFill');
const rCurrTime   = document.getElementById('radioCurrTime');
const rDuration   = document.getElementById('radioDuration');
const rTrackName  = document.getElementById('radioTrackName');
const rTrackArtist= document.getElementById('radioTrackArtist');
const rTrackCount = document.getElementById('radioTrackCount');
const rArtImg     = document.getElementById('radioArtImg');
const rVinyl      = document.getElementById('radioVinyl');
const rDot        = document.getElementById('rpDot');
const rLiveDot    = document.getElementById('radioLiveDot');
const rPlaylist   = document.getElementById('radioPlaylist');

// ── Panel open/close ─────────────────────────────────────────────
function openRadio() {
  rPanel.classList.add('open');
  rPanel.setAttribute('aria-hidden','false');
  rBackdrop.classList.add('open');
  rToggleBtn.classList.add('active');
}
function closeRadio() {
  rPanel.classList.remove('open');
  rPanel.setAttribute('aria-hidden','true');
  rBackdrop.classList.remove('open');
  rToggleBtn.classList.remove('active');
}

rToggleBtn.addEventListener('click', () => rPanel.classList.contains('open') ? closeRadio() : openRadio());
rCloseBtn.addEventListener('click', closeRadio);
rBackdrop.addEventListener('click', closeRadio);

// ── Load track ───────────────────────────────────────────────────
function loadTrack(idx, autoplay = false) {
  radio.idx = idx;
  const t = radio.track;

  radio.audio.src = t.path;
  radio.audio.load();
  radio.audio.volume = rVolSlider.value / 100;

  // UI
  rTrackName.textContent = t.name;
  rTrackArtist.textContent = t.album;
  rTrackCount.textContent  = `${idx + 1} / ${RADIO_TRACKS.length}`;

  // Cover art via YouTube thumbnail
  if (t.vid) {
    rArtImg.style.backgroundImage = `url(https://img.youtube.com/vi/${t.vid}/hqdefault.jpg)`;
  } else {
    rArtImg.style.backgroundImage = 'none';
  }

  // Reset progress
  rFill.style.width = '0%';
  rCurrTime.textContent = '00:00';
  rDuration.textContent = '00:00';
  rSeek.value = 0;

  // Playlist highlight
  document.querySelectorAll('.rpl-item').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });

  if (autoplay) {
    playTrack();
  } else {
    // keep visual state consistent
    setPlayIcon(radio.playing);
  }
}

// ── Play / Pause ─────────────────────────────────────────────────
function playTrack() {
  radio.audio.play().catch(() => {});
  radio.playing = true;
  setPlayIcon(true);
  rVinyl.classList.add('spinning');
  rDot.classList.add('on');
  rLiveDot.classList.add('on');
}

function pauseTrack() {
  radio.audio.pause();
  radio.playing = false;
  setPlayIcon(false);
  rVinyl.classList.remove('spinning');
  rDot.classList.remove('on');
  rLiveDot.classList.remove('on');
}

function setPlayIcon(playing) {
  rPlayBtn.querySelector('.play-icon').style.display  = playing ? 'none' : '';
  rPlayBtn.querySelector('.pause-icon').style.display = playing ? '' : 'none';
}

rPlayBtn.addEventListener('click', () => {
  if (radio.playing) pauseTrack(); else playTrack();
});

// ── Prev / Next ──────────────────────────────────────────────────
function nextTrack() {
  let next;
  if (radio.shuffle) {
    next = Math.floor(Math.random() * RADIO_TRACKS.length);
  } else {
    next = (radio.idx + 1) % RADIO_TRACKS.length;
  }
  loadTrack(next, radio.playing);
}

function prevTrack() {
  // If >3s into track, restart; otherwise go to prev
  if (radio.audio.currentTime > 3) {
    radio.audio.currentTime = 0;
    return;
  }
  const prev = radio.idx > 0 ? radio.idx - 1 : RADIO_TRACKS.length - 1;
  loadTrack(prev, radio.playing);
}

rNextBtn.addEventListener('click', nextTrack);
rPrevBtn.addEventListener('click', prevTrack);

radio.audio.addEventListener('ended', nextTrack);

// ── Shuffle ──────────────────────────────────────────────────────
rShuffleBtn.addEventListener('click', () => {
  radio.shuffle = !radio.shuffle;
  rShuffleBtn.classList.toggle('active', radio.shuffle);
});

// ── Seek ─────────────────────────────────────────────────────────
rSeek.addEventListener('input', () => {
  if (!isNaN(radio.audio.duration)) {
    radio.audio.currentTime = radio.audio.duration * (rSeek.value / 100);
  }
});

// ── Volume ───────────────────────────────────────────────────────
rVolSlider.addEventListener('input', () => {
  radio.audio.volume = rVolSlider.value / 100;
});

// ── Progress update ──────────────────────────────────────────────
radio.audio.addEventListener('timeupdate', () => {
  if (isNaN(radio.audio.duration)) return;

  const pct = (radio.audio.currentTime / radio.audio.duration) * 100;
  rFill.style.width = pct + '%';
  rSeek.value = pct;

  rCurrTime.textContent = fmtTime(radio.audio.currentTime);
  rDuration.textContent = fmtTime(radio.audio.duration);
});

function fmtTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

// ── Build playlist ───────────────────────────────────────────────
function buildPlaylist() {
  rPlaylist.innerHTML = RADIO_TRACKS.map((t, i) => `
    <div class="rpl-item${i === radio.idx ? ' active' : ''}" data-idx="${i}">
      <button class="rpl-download" data-idx="${i}" title="Descargar">
        <svg width="10" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
      </button>
      <span class="rpl-num">${String(i+1).padStart(2,'0')}</span>
      <div class="rpl-info">
        <div class="rpl-name">${t.name}</div>
        <div class="rpl-album">${t.album}</div>
      </div>
      <span class="rpl-play">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"><path d="M0 0l10 6-10 6z"/></svg>
      </span>
    </div>
  `).join('');

  rPlaylist.querySelectorAll('.rpl-item').forEach(el => {
    el.addEventListener('click', () => {
      const idx = +el.dataset.idx;
      loadTrack(idx, true);
      radio.playing = true;
    });
  });

  // download buttons
  rPlaylist.querySelectorAll('.rpl-download').forEach(btn=>{
    btn.addEventListener('click', async (e)=>{
      e.stopPropagation();
      const idx = +btn.dataset.idx;
      try{
        await downloadTrack(idx);
      }catch(err){
        console.error('Download failed',err);
        window.open(RADIO_TRACKS[idx].path,'_blank');
      }
    });
  });
}

async function downloadTrack(idx){
  const t = RADIO_TRACKS[idx];
  if(!t || !t.path) throw new Error('No track');
  const resp = await fetch(t.path);
  if(!resp.ok) throw new Error('Network error');
  const blob = await resp.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = t.name.replace(/[^a-z0-9\-_. ]/gi,'').trim() || `track-${idx+1}`;
  a.href = url;
  a.download = `${safeName}.mp3`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ── Init radio ───────────────────────────────────────────────────
buildPlaylist();
loadTrack(0, false);


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
