/* Calendar Rail. No network, browser APIs, storage, message or calendar reads. */
(() => {
  'use strict';
  if (location.origin !== 'https://mail.google.com' || !location.pathname.startsWith('/mail/')) return;
  const ID = 'calendar-rail-shortcut-v1';
  const OWNER = 'calendar-rail';
  // An isolated-world singleton also handles re-injection during development.
  const key = '__calendarRailV1';
  if (globalThis[key]) { globalThis[key].refresh(); return; }
  const icon = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="3"/><path d="M7.5 3v4M16.5 3v4M3.5 10h17M8 14h1M15 14h1M11.5 17.5h1"/></svg>';
  let host, link, timer, resize, railObserver, observedParent;
  let suspended = false;
  const owned = n => n?.nodeType === 1 && n.getAttribute('data-calendar-rail') === OWNER;
  const visible = n => n?.isConnected && n.getClientRects().length > 0 && getComputedStyle(n).visibility !== 'hidden';

  function identity() {
    // ONLY the active account control, never the account menu, title, inbox or message DOM.
    const controls = [...document.querySelectorAll('header a[href^="https://accounts.google.com/SignOutOptions"], [role="banner"] a[href^="https://accounts.google.com/SignOutOptions"], .gb a[href^="https://accounts.google.com/SignOutOptions"]')].filter(visible);
    return CalendarRailRouting.accountFromLabels(controls.map(n => n.getAttribute('aria-label') || ''));
  }
  function destination() { return CalendarRailRouting.destination(identity()); }
  function findMount() {
    // Current integrated Gmail app rail. Require multiple known, direct sibling controls.
    // Labels can be localized: product label variants live here, never search message text.
    const mailNames = /^(Mail|Email|E-mail|Correo|Courrier|Posta|E-Mail|メール|邮件|郵件)$/i;
    const others = /^(Chat|Meet|Spaces|Espaces|Espacios|Spazi|チャット|スペース|聊天|聊天室|会议|會議)$/i;
    const candidates = [...document.querySelectorAll('[role="navigation"] [role="link"][aria-label], [role="navigation"] [role="button"][aria-label], [role="tablist"] [role="tab"][aria-label], .brC-brG [aria-label]')];
    for (const item of candidates) {
      if (!mailNames.test((item.getAttribute('aria-label') || '').split(',')[0].trim()) || !visible(item)) continue;
      // The known Gmail rail has a wrapper per item. Do not clone its DOM or handlers.
      for (const row of [item, item.parentElement]) {
        const parent = row?.parentElement;
        if (!parent || parent === document.body || !visible(parent)) continue;
        const siblings = [...parent.children].filter(n => !owned(n));
        const peer = siblings.find(n => others.test((n.getAttribute('aria-label') || '').split(',')[0].trim()) || [...n.querySelectorAll('[aria-label]')].some(c => others.test((c.getAttribute('aria-label') || '').split(',')[0].trim())));
        const r = parent.getBoundingClientRect();
        if (peer && visible(peer) && siblings.length <= 8 && r.width >= 40 && r.width <= 150 && r.height > 100 && r.left < 180) {
          const rows = siblings.filter(n => n === row || others.test((n.getAttribute('aria-label') || '').split(',')[0].trim()) || [...n.querySelectorAll('[aria-label]')].some(c => others.test((c.getAttribute('aria-label') || '').split(',')[0].trim())));
          const anchor = rows[rows.length - 1];
          const sample = anchor.matches('[aria-label]') ? anchor : anchor.querySelector('[role=link][aria-label]') || item;
          return {parent, anchor, sample, mode:'rail'};
        };
      }
    }
    // Mail-only Gmail: insert after Compose, outside the labels and message list.
    for (const nav of document.querySelectorAll('[role="navigation"]')) {
      const compose = nav.querySelector('[gh="cm"][role="button"]');
      const inbox = nav.querySelector('a[href*="#inbox"]');
      const top = compose?.closest('.aic');
      const r = nav.getBoundingClientRect();
      if (visible(compose) && inbox && top?.parentElement === nav && r.width >= 40 && r.width <= 360 && r.left < 180) return {parent:nav, anchor:top, sample:inbox, mode:'mail'};
    }
    return null;
  }
  function unmount() {
    resize?.disconnect(); railObserver?.disconnect();
    if (host && owned(host)) host.remove();
    host = link = observedParent = null;
  }
  function mount(m) {
    unmount();
    // A second installation/context must not produce a second button.
    if (document.getElementById(ID)) return;
    host = document.createElement('div');
    host.id = ID; host.setAttribute('data-calendar-rail', OWNER);
    host.style.cssText = 'display:block;flex:0 0 auto;box-sizing:border-box;';
    const shadow = host.attachShadow({mode:'closed'});
    const style = document.createElement('style');
    style.textContent = `:host{color:inherit}*{box-sizing:border-box}a{display:flex;align-items:center;justify-content:center;gap:4px;min-height:48px;padding:8px 4px;margin:4px auto;color:inherit;font:inherit;text-decoration:none;border-radius:24px;cursor:pointer;line-height:16px;-webkit-tap-highlight-color:transparent}a:hover{background:color-mix(in srgb,currentColor 10%,transparent)}a:focus-visible{outline:2px solid currentColor;outline-offset:-3px}svg{flex:none}span{font-size:11px;white-space:nowrap}:host([data-mode=rail]) a{flex-direction:column;height:64px;min-height:64px;max-width:72px;margin:0 auto;padding:8px 0;gap:2px}:host([data-mode=rail]) svg{width:20px;height:20px}:host([data-mode=rail]) span{font-size:12px}:host([data-mode=mail]) a{justify-content:flex-start;padding-inline:26px;gap:18px;margin-inline:0;min-height:40px}:host([data-mode=mail]) span{font-size:14px}:host([data-collapsed]) a{justify-content:center;padding-inline:4px}:host([data-collapsed]) span{display:none}@media(forced-colors:active){a{color:LinkText}a:focus-visible{outline-color:Highlight}}`;
    link = document.createElement('a');
    link.innerHTML = icon + '<span>Calendar</span>';
    link.target = '_blank'; link.rel = 'noopener noreferrer'; link.referrerPolicy = 'no-referrer';
    link.setAttribute('aria-label','Open Calendar in a new tab');
    link.title = 'Calendar — opens in a new tab · Calendar Rail';
    link.href = destination();
    const updateDestination = () => { if(link) link.href = destination(); };
    link.addEventListener('pointerdown',updateDestination);
    link.addEventListener('focus',updateDestination);
    link.addEventListener('click',updateDestination);
    link.addEventListener('auxclick',updateDestination);
    shadow.append(style,link);
    host.dataset.mode = m.mode;
    m.anchor.insertAdjacentElement('afterend',host);
    observedParent = m.parent;
    const adapt = () => {
      if (!host || !visible(m.sample)) { schedule(); return; }
      const cs = getComputedStyle(m.sample);
      host.style.color = cs.color;
      host.style.fontFamily = cs.fontFamily;
      // Match the actual page theme, not only the OS dark-mode preference.
      host.toggleAttribute('data-collapsed', m.mode === 'mail' && m.parent.getBoundingClientRect().width < 130 || m.mode === 'rail' && m.parent.getBoundingClientRect().width < 60);
    };
    resize = new ResizeObserver(adapt); resize.observe(m.parent);
    railObserver = new MutationObserver(schedule);
    railObserver.observe(m.parent,{attributes:true,childList:true,subtree:true,attributeFilter:['class','style','aria-label','hidden']});
    adapt();
  }
  function refresh() {
    if (suspended) return;
    clearTimeout(timer); timer = null;
    try {
      const m = findMount();
      if (!m) { unmount(); return; }
      if (!host?.isConnected || observedParent !== m.parent || host.dataset.mode !== m.mode) mount(m);
      else {
        const color = getComputedStyle(m.sample).color;
        if (host.style.color !== color) host.style.color = color;
        host.toggleAttribute('data-collapsed', m.parent.getBoundingClientRect().width < (m.mode === 'mail' ? 130 : 60));
      }
    } catch { unmount(); } // Never propagate failures into Gmail.
  }
  function schedule() { if (!timer && !suspended) timer = setTimeout(refresh,200); }
  // Observe structural changes without reading mutation records or any message content.
  // Throttle scans; identity is read only at mount and explicit user interactions.
  const observer = new MutationObserver(schedule);
  function start() { observer.observe(document.body,{childList:true,subtree:true}); schedule(); }
  globalThis[key] = {refresh};
  addEventListener('hashchange',schedule);
  addEventListener('popstate',schedule);
  addEventListener('resize',schedule,{passive:true});
  addEventListener('pagehide',()=>{suspended=true;clearTimeout(timer);observer.disconnect();unmount();});
  addEventListener('pageshow',()=>{if(suspended){suspended=false;start();}});
  start();
})();
