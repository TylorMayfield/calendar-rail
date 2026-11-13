(() => {
 const state={network:[],storage:[],content:[],queries:[],roots:new WeakMap(),errors:[]};
 const originalAttach=Element.prototype.attachShadow;
 Element.prototype.attachShadow=function(init){const r=originalAttach.call(this,init);state.roots.set(this,r);return r;};
 // Guard real DOM content access. Only the test's synthetic private subtree is protected.
 const privateNode=document.querySelector('#private-message');
 for(const prop of ['textContent','innerText','innerHTML','outerHTML'])Object.defineProperty(privateNode,prop,{get(){state.content.push(prop);throw Error('Message content read: '+prop);},configurable:true});
 for(const api of ['fetch','XMLHttpRequest','WebSocket','EventSource'])window[api]=function(){state.network.push(api);throw Error('Unexpected network API: '+api);};
 navigator.sendBeacon=function(){state.network.push('sendBeacon');throw Error('Unexpected beacon');};
 for(const api of ['localStorage','sessionStorage','indexedDB'])Object.defineProperty(window,api,{get(){state.storage.push(api);throw Error('Unexpected storage API');},configurable:true});
 Object.defineProperty(document,'cookie',{get(){state.storage.push('cookie');throw Error('Unexpected cookie read');},set(){state.storage.push('cookie write');throw Error('Unexpected cookie write');}});
 const query=Document.prototype.querySelectorAll;
 Document.prototype.querySelectorAll=function(s){state.queries.push(s);return query.call(this,s);};
 window.addEventListener('error',e=>state.errors.push(e.message));
 const fixture=document.querySelector('#fixture');
 const glyphs={Mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',Chat:'<path d="M4 4h16v12H9l-5 4z"/>',Meet:'<path d="M3 6h12v12H3zM15 10l6-4v12l-6-4"/>'};
 function rail(){fixture.innerHTML='<nav role="navigation">'+['Mail','Chat','Meet'].map(label=>`<div class="Xa"><div role="link" aria-label="${label==='Meet'?label:label+', 0 unread messages'}" tabindex="0"><svg viewBox="0 0 24 24" aria-hidden="true">${glyphs[label]}</svg></div><h2>${label}</h2></div>`).join('')+'</nav>';}
 function mail(){fixture.innerHTML='<nav class="mailnav" role="navigation"><div class="aic"><div class="compose" gh="cm" role="button" tabindex="0">Compose</div></div><a gh="inbox" href="#inbox">Inbox</a></nav>';}
 const side=document.createElement('aside');side.setAttribute('role','complementary');side.innerHTML='<button role="tab" data-guest-app-id="6" aria-selected="false">Native Calendar</button><div class="WN9Ejb"><div role="tabpanel"><div class="brB-Jz"><div class="brC-brG-Jz-bBA"><iframe class="brC-brG-avO" title="Synthetic Calendar" data-fixture-calendar-url="https://calendar.google.com/calendar/u/9/companion" srcdoc="&lt;h1&gt;Synthetic Calendar&lt;/h1&gt;"></iframe></div></div></div></div>';document.body.append(side);
 const native=side.querySelector('[role=tab]'),panel=side.querySelector('[role=tabpanel]'),calendar=side.querySelector('iframe');panel.style.display='none';native.addEventListener('mouseup',()=>{const on=native.getAttribute('aria-selected')!=='true';native.setAttribute('aria-selected',String(on));panel.style.display=on?'block':'none'});
 for(const prop of ['contentDocument','contentWindow'])Object.defineProperty(calendar,prop,{get(){state.content.push('calendar '+prop);throw Error('Calendar content read')},configurable:true});
 rail();window.Fixture={state,rail,mail,fixture,link(){const h=document.getElementById('calendar-rail-shortcut-v1');return h?state.roots.get(h)?.querySelector('button'):null},host(){return document.getElementById('calendar-rail-shortcut-v1')}};
})();
