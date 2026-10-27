'use strict';
// Fuente única de verdad: catálogo local publicado; sin servicios externos.
(() => {
  const fields = {
    total: document.querySelectorAll('[data-press-counter="total"]'),
    albums: document.querySelectorAll('[data-press-counter="albums"]'),
    lps: document.querySelectorAll('[data-press-counter="lps"]'),
    phases: document.querySelectorAll('[data-press-counter="phases"]'),
    nuclei: document.querySelectorAll('[data-press-counter="nuclei"]'),
    duration: document.querySelectorAll('[data-press-counter="duration"]')
  };
  if (!fields.total.length) return;
  const status = document.getElementById('pressDataStatus');
  const update = (key, value) => fields[key].forEach(node => { node.textContent = String(value); });
  const format = n => new Intl.NumberFormat('es-ES').format(n);

  async function load() {
    try {
      const response = await fetch('data/metadata.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error('Catálogo no disponible');
      const catalog = await response.json();
      if (!Array.isArray(catalog.videos) || !catalog.videos.length)
        throw new Error('Catálogo sin lanzamientos');
      const videos = catalog.videos;
      update('total', format(videos.length));
      update('albums', format(videos.filter(v => v.coleccion === 'album').length));
      update('lps', format(videos.filter(v => v.coleccion === 'lp').length));
      if (Array.isArray(catalog.architecture?.phases))
        update('phases', format(catalog.architecture.phases.length));
      if (Array.isArray(catalog.architecture?.nuclei))
        update('nuclei', format(catalog.architecture.nuclei.length));

      const durations = videos
        .map(v => v.durationSeconds)
        .filter(n => typeof n === 'number' && Number.isFinite(n) && n > 0);
      if (durations.length) {
        const seconds = durations.reduce((sum, n) => sum + n, 0);
        const minutes = Math.floor(seconds / 60);
        update('duration', `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, '0')} min`);
      }
      if (status) {
        status.textContent = durations.length === videos.length
          ? `Datos calculados a partir de ${format(videos.length)} lanzamientos con duración registrada.`
          : `Duración documentada de ${format(durations.length)} de ${format(videos.length)} lanzamientos; el total real puede ser mayor.`;
      }
    } catch (_) {
      // Se conservan las cifras orientativas del HTML; nunca mostrar cero falso.
      if (status) status.textContent = 'No se pudo actualizar el catálogo. Se muestran cifras de referencia.';
    }
  }
  load();
})();
