/* Calendar Rail: layout only. Never reads a Calendar frame document or event data. */
(() => {
  'use strict';
  if (location.origin !== 'https://mail.google.com' || !location.pathname.startsWith('/mail/')) return;
  if(globalThis.CalendarRailWorkspace)return;
  const owner='calendar-rail';
  let pending=null,session=null,retry=null,poll=null,notify=()=>{};
  const visible=e=>!!e?.isConnected&&e.getClientRects().length>0&&getComputedStyle(e).visibility==='visible';
  const nativeTab=()=>document.querySelector('[role="complementary"] [role="tab"][data-guest-app-id="6"]');
  const selected=()=>nativeTab()?.getAttribute('aria-selected')==='true';
  function activate(e){
    // Gmail's tab controller handles mouse-up. Sending click as well toggles twice.
    for(const type of ['mousedown','mouseup'])e.dispatchEvent(new MouseEvent(type,{bubbles:true,cancelable:true,view:window,button:0}));
  }
  function frame(){return [...document.querySelectorAll('iframe.brC-brG-avO')].find(f=>{
    try {const u=new URL(f.getAttribute('src')||'',location.href);return visible(f)&&u.origin==='https://calendar.google.com'&&/^\/calendar\/u\/[^/]+\/companion\/?$/.test(u.pathname);}catch{return false;}
  });}
  function mainView(){return [...document.querySelectorAll('main,[role="main"],iframe[name="single_full_screen"],iframe[title="Meetings"]')].find(e=>{const r=e.getBoundingClientRect();return visible(e)&&r.width>=180&&r.height>=160&&r.left>=40;});}
  function bounds(s){
    const banner=document.querySelector('[role="banner"]'),tab=nativeTab();
    if(!visible(banner)||!visible(tab))return null;
    const header=banner.getBoundingClientRect(),rail=tab.getBoundingClientRect();
    // Mail's role=main is inside a scroller and can start hundreds of pixels
    // above the viewport. Its outer workspace, header and side rail stay put.
    const main=(s.main.closest('.aeI')||s.main).getBoundingClientRect();
    const edge=s.clip.getBoundingClientRect();
    if(header.top<0||header.height<24||header.height>200||header.width<innerWidth/2)return null;
    const top=Math.max(0,header.bottom),bottom=Math.min(innerHeight-8,edge.bottom);
    const right=Math.min(innerWidth-8,rail.left);
    let left=Math.max(0,main.left);
    if(right-left<280){const nav=document.getElementById('calendar-rail-shortcut-v1')?.parentElement;left=Math.max(0,nav?.getBoundingClientRect().right||68);}
    if(right-left<180||bottom-top<160)return null;
    return {left,top,width:right-left,height:bottom-top};
  }
  function clear(){
    clearTimeout(retry);clearInterval(poll);retry=poll=null;pending=null;
    if(session){const s=session;session=null;s.panel.removeAttribute('data-calendar-rail-pane');s.clip.removeAttribute('data-calendar-rail-unclip');s.style.remove();s.resize.disconnect();if(s.inertChanged)s.main.inert=s.wasInert;}
    notify(false);
  }
  function close({native=true}={}){clear();if(native&&selected())activate(nativeTab());}
  function position(){
    // Hidden windows and browser captures can temporarily report a 1px viewport.
    // Keep the session intact until the real viewport is restored.
    if(!session||innerWidth<180||innerHeight<160)return;
    const s=session;
    if(!visible(s.frame)||!visible(s.main)||!selected()||!s.panel.contains(s.frame)||s.panel.querySelectorAll('iframe').length!==1){clear();return;}
    const r=bounds(s);
    if(!r){clear();return;}
    const css=`[data-calendar-rail-unclip="${owner}"]{overflow:visible!important}[data-calendar-rail-pane="${owner}"]{position:fixed!important;inset:auto!important;left:${r.left}px!important;top:${r.top}px!important;width:${r.width}px!important;height:${r.height}px!important;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;margin:0!important;box-sizing:border-box!important;z-index:5!important;background:Canvas!important;border-radius:16px!important;overflow:hidden!important;overscroll-behavior:contain!important}[data-calendar-rail-pane="${owner}"] .brB-Jz,[data-calendar-rail-pane="${owner}"] .brC-brG-Jz-bBA,[data-calendar-rail-pane="${owner}"] iframe.brC-brG-avO{width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;min-width:0!important;min-height:0!important;box-sizing:border-box!important}[data-calendar-rail-pane="${owner}"] iframe.brC-brG-avO{display:block!important;border:0!important}`;
    if(s.style.textContent!==css)s.style.textContent=css;
  }
  function refresh(){
    if(session){position();return;}
    if(!pending)return;
    const f=frame(),main=mainView(),panel=f?.closest('[role="tabpanel"]'),clip=f?.closest('.WN9Ejb');
    if(f&&main&&panel&&clip&&selected()&&panel.querySelectorAll('iframe').length===1){
      const style=document.createElement('style'),resize=new ResizeObserver(position);
      style.setAttribute('data-calendar-rail-style',owner);
      session={frame:f,main,panel,clip,style,resize,wasInert:main.inert,inertChanged:!main.inert};
      pending=null;clearTimeout(retry);retry=null;
      panel.setAttribute('data-calendar-rail-pane',owner);clip.setAttribute('data-calendar-rail-unclip',owner);if(session.inertChanged)main.inert=true;
      document.head.append(style);resize.observe(main);position();
      // Only layout/control state is checked, never the frame's contents.
      if(session){poll=setInterval(position,400);notify(true);}return;
    }
    if(Date.now()-pending.started>10000){const wasOpen=pending.wasOpen;clear();if(!wasOpen&&selected())activate(nativeTab());notify(false,'Calendar could not open in this layout. Open Mail or Chat and try again.');return;}
    if(!retry)retry=setTimeout(()=>{retry=null;refresh();},150);
  }
  function open(){
    if(session||pending){close();return;}
    if(!visible(nativeTab())){notify(false,'Show Gmail’s right side panel, then try Calendar again.');return;}
    if(!mainView()){notify(false,'Open Mail or Chat, then select Calendar.');return;}
    pending={started:Date.now(),wasOpen:selected()};notify(false,'Opening Calendar…');
    if(!selected())activate(nativeTab());
    refresh();
  }
  // Returning to another app restores Gmail's existing layout and focusability.
  function appNavigation(e){
    if(!session&&!pending)return;
    const a=e.target.closest?.('[role="link"][aria-label]');
    if(a&&/^(Mail|Email|E-mail|Correo|Courrier|Posta|メール|邮件|郵件|Chat|Meet|Spaces|Espaces|Espacios|Spazi|チャット|スペース|聊天|聊天室|会议|會議)(,|$)/i.test(a.getAttribute('aria-label')||''))close();
  }
  document.addEventListener('mousedown',appNavigation,true);
  document.addEventListener('click',appNavigation,true);
  addEventListener('hashchange',()=>{if(session||pending)close();});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&(session||pending))close();});
  addEventListener('resize',position,{passive:true});
  addEventListener('pagehide',()=>clear());
  globalThis.CalendarRailWorkspace=Object.freeze({open,refresh,close,available:()=>visible(nativeTab()),setOnState(fn){notify=fn;notify(!!session);}});
})();
