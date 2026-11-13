const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const source=fs.readFileSync(require('node:path').join(__dirname,'../extension/workspace.js'),'utf8');
function fixture({ambiguous=false,missing=false}={}){
 const listeners={},timers=new Map(),state={events:[],styles:[],reads:0};let id=0;
 const rect={left:324,top:64,right:808,bottom:654,width:484,height:590};
 const element=(r=rect)=>({isConnected:true,inert:false,attrs:{},getClientRects:()=>[r],getBoundingClientRect:()=>r,setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]},getAttribute(k){return this.attrs[k]??null}});
 const tabRect={left:1144,top:64,right:1200,bottom:120,width:56,height:56};
 const headerRect={left:0,top:0,right:1200,bottom:64,width:1200,height:64};
 const tab=element(tabRect),banner=element(headerRect);tab.attrs['aria-selected']='false';tab.dispatchEvent=e=>{state.events.push(e.type);if(e.type==='mouseup')tab.attrs['aria-selected']=tab.attrs['aria-selected']==='true'?'false':'true'};
 const main=element(),clip=element({left:824,top:64,right:1144,bottom:654,width:320,height:590}),panel=element();main.closest=()=>null;panel.contains=e=>e===frame;panel.querySelectorAll=()=>Array(ambiguous?2:1).fill(frame);
 const frame=element({left:824,top:64,right:1144,bottom:654,width:320,height:590});frame.getAttribute=k=>k==='src'?'https://calendar.google.com/calendar/u/7/companion':null;frame.closest=s=>s==='[role="tabpanel"]'?panel:s==='.WN9Ejb'?clip:null;
 for(const prop of ['contentDocument','contentWindow'])Object.defineProperty(frame,prop,{get(){state.reads++;throw Error('Calendar document access')}});
 const doc={querySelector:s=>s==='[role="banner"]'?banner:missing?null:tab,querySelectorAll:s=>s.startsWith('iframe.brC')?(tab.attrs['aria-selected']==='true'?[frame]:[]):[main],getElementById:()=>null,addEventListener(n,f){listeners[n]=f},createElement:()=>({textContent:'',setAttribute(){},remove(){state.styles.pop()}}),head:{append(s){state.styles.push(s)}}};
 const ctx={document:doc,location:{origin:'https://mail.google.com',pathname:'/mail/u/3/',href:'https://mail.google.com/mail/u/3/'},innerWidth:1200,innerHeight:670,URL,MouseEvent:class{constructor(type){this.type=type}},ResizeObserver:class{observe(){}disconnect(){}},getComputedStyle:()=>({visibility:'visible'}),setTimeout(f){timers.set(++id,f);return id},clearTimeout(n){timers.delete(n)},setInterval(f){timers.set(++id,f);return id},clearInterval(n){timers.delete(n)},addEventListener(n,f){listeners[n]=f},Date};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(source,ctx);
 return {ctx,api:ctx.CalendarRailWorkspace,state,main,panel,clip,tab,banner,rect,tabRect,headerRect,listeners,tick(){for(const fn of [...timers.values()])fn()}};
}
test('opens native companion once without an extra click, URL mapping or frame document read',()=>{
 const f=fixture();f.api.open();assert.deepEqual(f.state.events,['mousedown','mouseup']);assert.equal(f.panel.attrs['data-calendar-rail-pane'],'calendar-rail');assert.equal(f.main.inert,true);assert.equal(f.state.reads,0);assert.equal(f.state.styles.length,1);f.api.refresh();assert.equal(f.state.styles.length,1);f.api.close();assert.equal(f.main.inert,false);assert.equal(f.state.styles.length,0);assert.equal(f.panel.attrs['data-calendar-rail-pane'],undefined);
});
test('temporary 1px viewport does not dismiss the native Calendar session',()=>{const f=fixture();f.api.open();f.ctx.innerWidth=1;f.ctx.innerHeight=1;f.tick();assert.equal(f.panel.attrs['data-calendar-rail-pane'],'calendar-rail');f.ctx.innerWidth=1200;f.ctx.innerHeight=670;f.tick();assert.equal(f.tab.attrs['aria-selected'],'true');f.api.close();});
test('native close restores main focusability; existing inert state is preserved',()=>{const f=fixture();f.main.inert=true;f.api.open();f.tab.attrs['aria-selected']='false';f.tick();assert.equal(f.main.inert,true);assert.equal(f.state.styles.length,0)});
test('unknown or ambiguous companion structure receives no layout styles',()=>{const f=fixture({ambiguous:true});f.api.open();assert.equal(f.state.styles.length,0);assert.equal(f.main.inert,false);f.api.close();const g=fixture({missing:true});g.api.open();assert.equal(g.state.events.length,0)});
test('keyboard-style app click and route changes restore layout',()=>{const f=fixture();f.api.open();f.listeners.click({target:{closest:()=>({getAttribute:()=> 'Chat, 0 unread messages'})}});assert.equal(f.state.styles.length,0);assert.equal(f.main.inert,false);f.api.open();f.listeners.hashchange();assert.equal(f.state.styles.length,0)});
test('inactive extension does not close a user-opened native sidebar',()=>{const f=fixture();f.tab.attrs['aria-selected']='true';f.listeners.click({target:{closest:()=>({getAttribute:()=> 'Mail'})}});assert.equal(f.tab.attrs['aria-selected'],'true');assert.equal(f.state.events.length,0)});

test('scrolled Mail content cannot move Calendar above the Gmail header',()=>{const f=fixture();f.rect.top=-450;f.rect.height=1600;f.api.open();assert.match(f.state.styles[0].textContent,/top:64px!important/);assert.match(f.state.styles[0].textContent,/height:590px!important/);assert.doesNotMatch(f.state.styles[0].textContent,/top:-/);assert.equal(f.state.reads,0)});
test('live viewport and native rail edges determine new width after resizing',()=>{const f=fixture();f.api.open();assert.match(f.state.styles[0].textContent,/width:820px!important/);f.ctx.innerWidth=1000;f.tabRect.left=944;f.tick();assert.match(f.state.styles[0].textContent,/width:620px!important/);f.headerRect.height=80;f.headerRect.bottom=80;f.tick();assert.match(f.state.styles[0].textContent,/top:80px!important/);assert.match(f.state.styles[0].textContent,/height:574px!important/)});
test('unrecognized header geometry restores Gmail instead of applying an offscreen panel',()=>{const f=fixture();f.api.open();f.headerRect.top=-100;f.tick();assert.equal(f.state.styles.length,0);assert.equal(f.main.inert,false)});
