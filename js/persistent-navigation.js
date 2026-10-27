'use strict';
// El documento que reproduce audio permanece estable; solo navega el iframe editorial.
(() => {
  const pages = new Set([
    'welcome.html', 'onboarding.html', 'perfiles.html', 'mapa.html',
    'timeline.html', 'lanzamiento.html', 'recomendaciones.html',
    'feedback.html', 'letras.html', 'accesibilidad.html', 'prensa.html'
  ]);
  const directory = location.pathname.slice(0, location.pathname.lastIndexOf('/') + 1);
  const localPage = value => {
    try {
      const url = new URL(value, location.href);
      const folder = url.pathname.slice(0, url.pathname.lastIndexOf('/') + 1);
      return url.origin === location.origin && folder === directory &&
        pages.has(url.pathname.slice(folder.length)) ? url : null;
    } catch { return null; }
  };
  const clickTarget = event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey) return null;
    const anchor = event.target.closest?.('a[href]');
    if (!anchor || anchor.hasAttribute('download') ||
        (anchor.target && anchor.target !== '_self')) return null;
    return localPage(anchor.href);
  };

  // En las páginas embebidas no se crea otro Audio; RADIO controla al padre.
  if (window !== window.top) {
    let host;
    try { host = window.parent.__AfacesPersistentSite; } catch { return; }
    if (!host || host.origin !== location.origin) return;
    document.documentElement.dataset.afacesEmbedded = 'true';
    document.getElementById('radioPanel')?.remove();
    document.getElementById('radioBackdrop')?.remove();
    const button = document.getElementById('radioToggle');
    button?.removeAttribute('aria-controls');
    button?.addEventListener('click', event => {
      event.preventDefault();
      host.toggleRadio();
    });
    document.addEventListener('click', event => {
      const url = clickTarget(event);
      if (url) { event.preventDefault(); host.navigate(url.href); }
    }, true);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && host.radioOpen()) {
        event.preventDefault();
        host.closeRadio();
      }
    });
    const syncTheme = () => host.setTheme(document.documentElement.dataset.theme);
    syncTheme();
    if (typeof MutationObserver !== 'undefined') {
      new MutationObserver(syncTheme).observe(document.documentElement, {
        attributes: true, attributeFilter: ['data-theme']
      });
    }
    window.addEventListener('hashchange', () => host.syncFromChild(location.href));
    window.addEventListener('pageshow', () => host.syncFromChild(location.href));
    host.syncFromChild(location.href);
    host.updateRadio();
    return;
  }

  if (!window.AfacesRadio) return;
  let frame = null;
  const panel = document.getElementById('radioPanel');
  const backdrop = document.getElementById('radioBackdrop');
  if (!panel || !backdrop) return;
  function frameDocument() {
    try { return frame?.contentDocument || null; } catch { return null; }
  }
  function updateRadio() {
    const doc = frameDocument();
    if (!doc) return;
    const button = doc.getElementById('radioToggle');
    const open = panel.classList.contains('open');
    if (button) {
      button.classList.toggle('active', open);
      button.setAttribute('aria-expanded', String(open));
    }
    doc.getElementById('radioLiveDot')?.classList.toggle(
      'on', window.AfacesRadio.getState().playing
    );
  }
  function focusRadioToggle() {
    const button = frameDocument()?.getElementById('radioToggle');
    if (!button) return false;
    button.focus();
    return true;
  }
  function syncFromChild(href) {
    const url = localPage(href);
    if (url && location.href !== url.href)
      history.pushState({afacesPage:true}, '', url.href);
  }
  function mount() {
    if (frame) return;
    frame = document.createElement('iframe');
    frame.id = 'afaces-page-frame';
    frame.title = 'Contenido y navegación de AFACES';
    frame.style.cssText = 'position:fixed;inset:0;width:100%;height:100vh;height:100dvh;' +
      'border:0;display:block;z-index:1;background:var(--bg);';
    frame.addEventListener('load', () => {
      const doc = frameDocument();
      if (doc) document.title = doc.title;
      updateRadio();
      try { syncFromChild(frame.contentWindow.location.href); } catch { /* página ajena */ }
    });
    document.body.replaceChildren(frame, backdrop, panel);
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
  }
  function navigate(href, fromHistory = false) {
    const url = localPage(href);
    if (!url) return false;
    mount();
    if (!fromHistory && location.href !== url.href)
      history.pushState({afacesPage:true}, '', url.href);
    const child = frame.contentWindow;
    try {
      if (child.location.pathname === url.pathname &&
          child.location.search === url.search &&
          child.location.protocol !== 'about:') {
        child.history.replaceState(child.history.state, '', url.href);
        if (url.hash) {
          const target = child.document.getElementById(decodeURIComponent(url.hash.slice(1)));
          target?.scrollIntoView();
        } else child.scrollTo(0, 0);
        child.dispatchEvent(new child.Event('hashchange'));
        updateRadio();
        return true;
      }
    } catch { /* iframe todavía cargando */ }
    // El padre gestiona History; replace evita duplicar cada paso en el iframe.
    child.location.replace(url.href);
    return true;
  }
  window.__AfacesPersistentSite = {
    origin: location.origin, navigate, syncFromChild, updateRadio, focusRadioToggle,
    setTheme(theme) {
      document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
    },
    radioOpen: () => panel.classList.contains('open'),
    toggleRadio: () => {
      window.AfacesRadio.toggle();
      updateRadio();
      if (panel.classList.contains('open'))
        document.getElementById('radioClose')?.focus();
      else focusRadioToggle();
    },
    closeRadio: () => {
      window.AfacesRadio.close();
      updateRadio();
      focusRadioToggle();
    }
  };
  document.addEventListener('click', event => {
    const url = clickTarget(event);
    if (!url) return;
    // Las anclas en la página de entrada se mantienen nativas.
    if (!frame && url.pathname === location.pathname &&
        url.search === location.search) return;
    event.preventDefault();
    navigate(url.href);
  }, true);
  window.addEventListener('popstate', () => {
    if (frame) navigate(location.href, true);
  });
})();
