/**
 * Tavern Language v2.0.0 (Vue 3)
 * SillyTavern 酒馆助手沉浸式外语学习插件
 * Repo: https://github.com/cone97218-alt/language
 */
var Ah=Object.defineProperty;var Dh=(e,t)=>{for(var n in t)Ah(e,n,{get:t[n],enumerable:!0})};function pe(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent}catch{}return window}function ve(){return pe().document}function $n(){let e=pe();return window.TavernHelper||e.TavernHelper||null}function Yi(){let e=pe();return{eventOn:window.eventOn||e.eventOn||null,eventRemoveListener:window.eventRemoveListener||e.eventRemoveListener||null,tavern_events:window.tavern_events||e.tavern_events||null,iframe_events:window.iframe_events||e.iframe_events||null}}function Se(e,t="info"){let n=pe(),o=window.toastr||n.toastr;o&&typeof o[t]=="function"?o[t](e,"\u9152\u9986\u5916\u8BED\u5B66\u4E60"):console.log(`[TavernLanguage][${t}] ${e}`)}var zo="2.0.0",kc="tavern_language_config_v1",kh=["script","style","noscript","iframe","svg","canvas","audio","video",".tl-ignore",".tl-trans-block",".tl-mes-footer",".tl-word",".tl-popover",".tl-sel-bar",".tl-modal-backdrop","#tl-vue-root"],tr={enabled:!0,targetLang:"en",promptInjection:{enabled:!0,level:"B1",customInstruction:"",depth:0},theme:"tavern",excludeSelectors:["code","pre","kbd","math","summary","button","input","textarea","select"],dictionaryChains:{en:["free-dict","wiktionary","ai-context"],ja:["jotoba","wiktionary","ai-context"],fr:["wiktionary","ai-context"]},autoTranslateDict:!0,autoSpeakWord:!1,translator:"google",customAi:{baseUrl:"https://api.openai.com/v1",apiKey:"",model:"gpt-4o-mini"},tts:{engine:"auto",rate:1,enAccent:"us"},ui:{showWordUnderline:!0,autoShowMesButtons:!0}};function mo(e,t){if(!t||typeof t!="object")return e;let n=Array.isArray(e)?[...e]:{...e};for(let o of Object.keys(t)){let s=t[o];s&&typeof s=="object"&&!Array.isArray(s)&&e[o]&&typeof e[o]=="object"&&!Array.isArray(e[o])?n[o]=mo(e[o],s):s!==void 0&&(n[o]=Array.isArray(s)?[...s]:s)}return n}var Vt=mo(tr,{}),Qi=new Set;function Ic(){try{let e=pe().localStorage.getItem(kc);if(e){let t=JSON.parse(e);Vt=mo(tr,t)}else Vt=mo(tr,{})}catch(e){console.warn("[TavernLanguage] \u8BFB\u53D6\u914D\u7F6E\u5931\u8D25\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u914D\u7F6E:",e),Vt=mo(tr,{})}return Vt}function ee(){return Vt}function nr(e){Vt=mo(Vt,e);try{pe().localStorage.setItem(kc,JSON.stringify(Vt))}catch(t){console.warn("[TavernLanguage] \u4FDD\u5B58\u914D\u7F6E\u5931\u8D25:",t)}return Qi.forEach(t=>{try{t(Vt)}catch(n){console.error("[TavernLanguage] \u914D\u7F6E\u76D1\u542C\u56DE\u8C03\u5F02\u5E38:",n)}}),Vt}function Vc(e){return Qi.add(e),()=>Qi.delete(e)}function Go(e){return Array.isArray(e)?e.map(t=>String(t).trim()).filter(Boolean):String(e||"").split(/[\n,;，；]+/).map(t=>t.trim()).filter(Boolean)}function qo(e=Vt){let t=Go(e.excludeSelectors);return[...new Set([...kh,...t])]}var Jo=new Map;function yn(e){if(!e||!e.code)throw new Error("[TavernLanguage] registerLanguage \u9700\u8981\u5305\u542B code \u5B57\u6BB5");return Jo.set(e.code,e),e}function nt(e){return Jo.get(e)||Jo.get("en")||[...Jo.values()][0]||null}function go(){return[...Jo.values()]}var Rc="tavern-language-immersive-prompt",or=null;function Zi(){if(typeof or=="function"){try{or()}catch{}or=null}let e=$n();if(e&&typeof e.uninjectPrompts=="function")try{e.uninjectPrompts([Rc])}catch{}}function ea(){Zi();let e=ee();if(!e.enabled||!e.promptInjection?.enabled)return!1;let t=$n();if(!t||typeof t.injectPrompts!="function")return!1;let n=nt(e.targetLang);if(!n)return!1;let o=n.buildPrompt(e.promptInjection.level,e.promptInjection.customInstruction);try{let s=t.injectPrompts([{id:Rc,role:"system",content:o,position:"in_chat",depth:Number.isFinite(Number(e.promptInjection.depth))?Number(e.promptInjection.depth):0,should_scan:!1}]);return s&&typeof s.uninject=="function"&&(or=s.uninject),!0}catch(s){return console.warn("[TavernLanguage] injectPrompts \u6CE8\u5165\u5931\u8D25:",s),!1}}function ta(e,t){if(!e||e.nodeType!==1)return!1;let n=e.tagName?e.tagName.toLowerCase():"";for(let o of t)if(o){if(/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(o)){if(n===o.toLowerCase())return!0;continue}try{if(e.matches(o))return!0}catch{}}return!1}function rr(e,t,n){let o=e.nodeType===1?e:e.parentElement;for(;o&&o!==t;){if(ta(o,n))return!0;o=o.parentElement}return!1}function sr(e){if(!e)return;let t=e.querySelectorAll("span.tl-word");for(let n of t){let o=e.ownerDocument.createTextNode(n.textContent||"");n.replaceWith(o)}e.normalize(),delete e.dataset.tlTokenizedLang,delete e.dataset.tlExcludeHash}function Pc(e,t={}){if(!e)return;let n=ee();if(!n.enabled){sr(e);return}let o=t.lang||n.targetLang||"en",s=nt(o);if(!s)return;let r=qo(n),i=r.join("|");if(!t.force&&e.dataset.tlTokenizedLang===o&&e.dataset.tlExcludeHash===i)return;e.dataset.tlTokenizedLang&&sr(e);let a=e.ownerDocument||ve(),l=a.createTreeWalker(e,4,{acceptNode(c){return!c.nodeValue||!c.nodeValue.trim()||rr(c,e,r)?2:1}}),u=[],f;for(;f=l.nextNode();)u.push(f);for(let c of u){let p=s.tokenize(c.nodeValue);if(!p||p.length===0||!p.some(m=>m.isWord))continue;let _=a.createDocumentFragment();for(let m of p)if(m.isWord){let b=a.createElement("span");b.className="tl-word",b.textContent=m.text,b.dataset.tlWord=m.lookup||m.text,b.dataset.tlLang=o,_.appendChild(b)}else _.appendChild(a.createTextNode(m.text));c.replaceWith(_)}e.dataset.tlTokenizedLang=o,e.dataset.tlExcludeHash=i}function Mc(e){if(!e)return"";let t=e.closest("p, li, blockquote, div.mes_text, h1, h2, h3, h4, h5, h6")||e.parentElement;if(!t)return e.textContent||"";let n="",o=-1,s=-1,r=t.ownerDocument.createTreeWalker(t,4,{acceptNode(f){return f.parentElement?.closest(".tl-trans-block")?2:1}}),i;for(;i=r.nextNode();){let f=i.nodeValue||"";e.contains(i)&&o===-1&&(o=n.length,s=n.length+f.length),n+=f}if(o===-1)return n.trim();let a=/[.!?。！？\n]/,l=o;for(;l>0&&!a.test(n[l-1]);)l--;let u=s;for(;u<n.length&&!a.test(n[u]);)u++;return u<n.length&&/[.!?。！？]/.test(n[u])&&u++,n.slice(l,u).replace(/\s+/g," ").trim()}var ir=new Map,Fn=new Map,Ih=400;function Vh(e,t){if(Fn.size>=Ih){let n=Fn.keys().next().value;Fn.delete(n)}Fn.set(e,t)}function Yt(e){if(!e||!e.id)throw new Error("[TavernLanguage] registerTranslator \u9700\u8981 id \u5B57\u6BB5");return ir.set(e.id,e),e}function ar(){return[...ir.values()]}function Lc(){Fn.clear()}async function bt(e,t={}){let n=String(e||"").trim();if(!n)return"";let o=ee(),s=t.from||o.targetLang||"auto",r=t.to||"zh-CN",i=t.providerId||o.translator||"google",a=`${i}|${s}|${r}|${n}`;if(!t.bypassCache&&Fn.has(a))return Fn.get(a);let l=[i,"google","mymemory"].filter((f,c,p)=>p.indexOf(f)===c&&ir.has(f)),u=null;for(let f of l){let c=ir.get(f);try{let p=await c.translate(n,{from:s,to:r,context:t.context||"",config:o});if(p&&p.trim())return Vh(a,p.trim()),p.trim()}catch(p){u=p,console.warn(`[TavernLanguage] \u7FFB\u8BD1\u6E90 ${f} \u5931\u8D25\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A:`,p?.message||p)}}throw u||new Error("\u6240\u6709\u7FFB\u8BD1\u6E90\u5747\u4E0D\u53EF\u7528")}var Rt=null;function vo(){if(Rt){try{Rt.pause(),Rt.currentTime=0}catch{}Rt=null}let e=pe();if(e.speechSynthesis)try{e.speechSynthesis.cancel()}catch{}}function lr(e,t=1){return new Promise((n,o)=>{vo();let s=pe().Audio||Audio,r=new s(e);r.playbackRate=Math.max(.5,Math.min(2,t||1)),Rt=r,r.onended=()=>{Rt===r&&(Rt=null),n(!0)},r.onerror=a=>{Rt===r&&(Rt=null),o(a||new Error("\u97F3\u9891\u64AD\u653E\u5931\u8D25"))};let i=r.play();i&&typeof i.catch=="function"&&i.catch(a=>{Rt===r&&(Rt=null),o(a)})})}function na(e,t,n="us"){let o=encodeURIComponent(e);if(t==="en")return`https://dict.youdao.com/dictvoice?audio=${o}&type=${n==="uk"?1:2}`;let r={ja:"jap",fr:"fr",ko:"ko",de:"de",es:"es"}[t]||t;return`https://dict.youdao.com/dictvoice?audio=${o}&le=${encodeURIComponent(r)}`}function oa(e,t,n=1){return new Promise((o,s)=>{let r=pe(),i=r.speechSynthesis,a=r.SpeechSynthesisUtterance||window.SpeechSynthesisUtterance;if(!i||!a){s(new Error("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 Web Speech \u6717\u8BFB"));return}vo();let u=nt(t)?.bcp47||t||"en-US",f=new a(e);f.lang=u,f.rate=Math.max(.5,Math.min(2,n||1));let c=i.getVoices?i.getVoices():[],p=u.split("-")[0].toLowerCase(),d=c.find(_=>_.lang&&_.lang.toLowerCase()===u.toLowerCase())||c.find(_=>_.lang&&_.lang.toLowerCase().startsWith(p));d&&(f.voice=d),f.onend=()=>o(!0),f.onerror=_=>s(_),i.speak(f)})}async function Eo(e,t={}){let n=String(e||"").trim();if(!n)return;let o=ee(),s=t.lang||o.targetLang||"en",r=t.rate??o.tts?.rate??1;if((o.tts?.engine||"auto")==="webspeech")return oa(n,s,r);if(t.audioUrl)try{await lr(t.audioUrl,r);return}catch{}try{let a=na(n,s,o.tts?.enAccent||"us");await lr(a,r);return}catch{}return oa(n,s,r)}async function Qt(e,t={}){let n=String(e||"").replace(/\s+/g," ").trim();if(!n)return;let o=ee(),s=t.lang||o.targetLang||"en",r=t.rate??o.tts?.rate??1;if((o.tts?.engine||"auto")==="youdao"&&n.length<=220)try{let a=na(n,s,o.tts?.enAccent||"us");await lr(a,r);return}catch{}try{await oa(n,s,r)}catch{if(n.length<=220){let a=na(n,s,o.tts?.enAccent||"us");await lr(a,r)}}}var Yo=null;function cr(e,t,n){let o="",s=e.ownerDocument.createTreeWalker(e,4,{acceptNode(i){return i.parentElement?.closest(".tl-trans-block, .tl-mes-footer")||rr(i,t,n)?2:1}}),r;for(;r=s.nextNode();)o+=r.nodeValue||"";return o.replace(/\s+/g," ").trim()}function Rh(e,t){let n=[...e.querySelectorAll("p, li, blockquote")].filter(s=>s.closest(".tl-mes-footer, .tl-trans-block")||ta(s,t)||rr(s,e,t)||s.parentElement?.closest("p, li, blockquote")?!1:cr(s,e,t).length>0);return n.length>0?n:cr(e,e,t)?[e]:[]}async function Ph(e,t){let n=e.querySelector(".mes_text");if(!n)return;let o=[...n.querySelectorAll(".tl-trans-block")];if(o.length>0){let m=o[0].classList.contains("tl-hidden");o.forEach(x=>x.classList.toggle("tl-hidden",!m)),t.classList.toggle("tl-active",m);let b=t.querySelector("span");b&&(b.textContent=m?"\u9690\u85CF\u8BD1\u6587":"\u53CC\u8BED\u8BD1\u6587");return}let s=ee(),r=qo(s),i=Rh(n,r);if(i.length===0)return;t.classList.add("tl-active");let a=t.querySelector("span");a&&(a.textContent="\u7FFB\u8BD1\u4E2D...");let l=n.ownerDocument,u=s.targetLang||"en",f=n.querySelector(".tl-mes-footer"),c=i.map(m=>{let b=cr(m,n,r),x=l.createElement("div");return x.className="tl-trans-block tl-trans-loading tl-ignore",x.textContent="\u7FFB\u8BD1\u4E2D...",m===n?f?f.insertAdjacentElement("beforebegin",x):n.appendChild(x):m.insertAdjacentElement("afterend",x),{text:b,transDiv:x}}),p=3,d=0;async function _(){for(;d<c.length;){let m=c[d++];try{let b=await bt(m.text,{from:u,to:"zh-CN"});m.transDiv.classList.remove("tl-trans-loading"),m.transDiv.textContent=b}catch(b){m.transDiv.classList.remove("tl-trans-loading"),m.transDiv.textContent=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${b?.message||"\u8BF7\u7A0D\u540E\u91CD\u8BD5"}`}}}await Promise.all(Array.from({length:Math.min(p,c.length)},()=>_())),a&&(a.textContent="\u9690\u85CF\u8BD1\u6587")}function Qo(e,t){e.classList.toggle("tl-active",t),e.innerHTML=t?'<i class="fa-solid fa-stop"></i><span>\u505C\u6B62</span>':'<i class="fa-solid fa-volume-high"></i><span>\u6717\u8BFB</span>'}async function Mh(e,t){if(Yo===e){vo(),Yo=null,Qo(t,!1);return}let n=e.querySelector(".mes_text");if(!n)return;let o=ee(),s=qo(o),r=cr(n,n,s);if(r){e.ownerDocument.querySelectorAll('.tl-footer-pill[data-tl-mes-action="speak"].tl-active').forEach(i=>Qo(i,!1)),Yo=e,Qo(t,!0);try{await Qt(r,{lang:o.targetLang||"en"})}catch{}finally{Yo===e&&(Yo=null),Qo(t,!1)}}}function $c(e){e?.querySelectorAll(".tl-mes-btn").forEach(a=>a.remove());let t=ee();if(!t.enabled||t.ui?.autoShowMesButtons===!1){e?.querySelector(".tl-mes-footer")?.remove();return}let n=e?.querySelector(".mes_text");if(!n||n.querySelector(".tl-mes-footer")||!n.textContent||!n.textContent.trim())return;let o=e.ownerDocument,s=o.createElement("div");s.className="tl-mes-footer tl-ignore";let r=o.createElement("button");r.type="button",r.className="tl-footer-pill",r.dataset.tlMesAction="translate",r.title="\u5C55\u5F00/\u6536\u8D77\u6574\u6BB5\u53CC\u8BED\u5BF9\u7167\u7FFB\u8BD1",r.innerHTML='<i class="fa-solid fa-language"></i><span>\u53CC\u8BED\u8BD1\u6587</span>',r.addEventListener("click",a=>{a.stopPropagation(),Ph(e,r)});let i=o.createElement("button");i.type="button",i.className="tl-footer-pill",i.dataset.tlMesAction="speak",i.title="\u6717\u8BFB\u6574\u6761\u6D88\u606F\uFF08\u518D\u6B21\u70B9\u51FB\u505C\u6B62\uFF09",Qo(i,!1),i.addEventListener("click",a=>{a.stopPropagation(),Mh(e,i)}),s.appendChild(r),s.appendChild(i),n.appendChild(s)}var Zo=null,Un=null,en=!1,sa=[];function Lh(){return[...ve().querySelectorAll("#chat .mes")]}function $h(e,t={}){if(!e)return;let n=e.querySelector(".mes_text");n&&(Pc(n,t),$c(e))}function ra(e={}){let t=Lh();for(let n of t)$h(n,e)}function ia(){let e=ve();e.querySelectorAll("#chat .mes .mes_text").forEach(t=>sr(t)),e.querySelectorAll("#chat .mes .tl-trans-block").forEach(t=>t.remove()),e.querySelectorAll("#chat .mes .tl-mes-btn").forEach(t=>t.remove()),e.querySelectorAll("#chat .mes .tl-mes-footer").forEach(t=>t.remove())}function Zt(e=280){Un&&clearTimeout(Un),Un=setTimeout(()=>{Un=null,!en&&ee().enabled&&ra()},e)}function bn(e,t){let{eventOn:n,eventRemoveListener:o}=Yi();if(!(!n||!e))try{let s=n(e,t);sa.push(()=>{try{s&&typeof s.stop=="function"?s.stop():typeof o=="function"&&o(e,t)}catch{}})}catch{}}function Fc(){aa();let t=ve().getElementById("chat");t&&(Zo=new MutationObserver(s=>{if(en||!ee().enabled)return;s.some(i=>{let a=i.target;return!(a?.nodeType===1&&(a.classList?.contains("tl-word")||a.classList?.contains("tl-trans-block")||a.classList?.contains("tl-mes-btn")||a.classList?.contains("tl-mes-footer")||a.closest?.(".tl-popover, .tl-sel-bar, .tl-modal-backdrop, .tl-mes-footer, #tl-vue-root")))})&&Zt(320)}),Zo.observe(t,{childList:!0,subtree:!0}));let{tavern_events:n,iframe_events:o}=Yi();n&&(bn(n.GENERATION_STARTED,()=>{en=!0}),bn(n.GENERATION_STOPPED,()=>{en=!1,Zt(200)}),bn(n.GENERATION_ENDED,()=>{en=!1,Zt(200)}),bn(n.MESSAGE_RECEIVED,()=>{en=!1,Zt(220)}),bn(n.MESSAGE_UPDATED,()=>{Zt(200)}),bn(n.MESSAGE_SWIPED,()=>{Zt(250)}),bn(n.CHAT_CHANGED,()=>{en=!1,Zt(350)})),o&&bn(o.STREAM_TOKEN_RECEIVED_FULLY,()=>{en=!1,Zt(260)}),Zt(150)}function aa(){for(Un&&(clearTimeout(Un),Un=null),Zo&&(Zo.disconnect(),Zo=null);sa.length>0;)sa.pop()();en=!1}var Uc=9,Fh=420,Uh=260,la=0,ca=0,ur=0,es=!1,ua=!1,Bc=0,fr=!1,pr=null,dr=null,hr=null,_o=null;function Hc(){if(fr)return;let e=ve(),t=pe();pr=n=>{n.button&&n.button!==0||(la=n.clientX,ca=n.clientY,ur=Date.now(),es=!1,ua=!1)},dr=n=>{if(es)return;let o=n.clientX-la,s=n.clientY-ca;Math.hypot(o,s)>Uc&&(es=!0)},hr=n=>{n.touches&&n.touches.length>1&&(ua=!0)},_o=()=>{Bc=Date.now(),es=!0},e.addEventListener("pointerdown",pr,{passive:!0,capture:!0}),e.addEventListener("pointermove",dr,{passive:!0,capture:!0}),e.addEventListener("touchstart",hr,{passive:!0,capture:!0}),t.addEventListener("scroll",_o,{passive:!0,capture:!0}),e.addEventListener("scroll",_o,{passive:!0,capture:!0}),fr=!0}function jc(){if(!fr)return;let e=ve(),t=pe();pr&&e.removeEventListener("pointerdown",pr,!0),dr&&e.removeEventListener("pointermove",dr,!0),hr&&e.removeEventListener("touchstart",hr,!0),_o&&(t.removeEventListener("scroll",_o,!0),e.removeEventListener("scroll",_o,!0)),fr=!1}function Wc(e){let t=Date.now();if(ua||es||t-Bc<Uh||ur>0&&t-ur>Fh)return!1;if(e&&typeof e.clientX=="number"&&ur>0){let o=e.clientX-la,s=e.clientY-ca;if(Math.hypot(o,s)>Uc)return!1}let n=pe().getSelection();return!(n&&n.toString().trim().length>0)}var fa="tl-injected-styles",Bh=`
/* ========== Tavern Language: \u7EDF\u4E00 Design Tokens \u4E0E\u4E3B\u9898\u53D8\u91CF ========== */
:root[data-tl-theme="tavern"] {
  --tl-bg: var(--SmartThemeBlurTintColor, rgba(24, 26, 34, 0.95));
  --tl-surface: var(--SmartThemeChatTintColor, rgba(34, 37, 48, 0.9));
  --tl-surface-soft: color-mix(in srgb, var(--SmartThemeBodyColor, #e8eaf0) 8%, transparent);
  --tl-text: var(--SmartThemeBodyColor, #e8eaf0);
  --tl-text-muted: color-mix(in srgb, var(--SmartThemeBodyColor, #e8eaf0) 68%, transparent);
  --tl-accent: var(--SmartThemeQuoteColor, var(--SmartThemeEmColor, #7aa2f7));
  --tl-accent-soft: color-mix(in srgb, var(--SmartThemeQuoteColor, var(--SmartThemeEmColor, #7aa2f7)) 18%, transparent);
  --tl-border: var(--SmartThemeBorderColor, rgba(255, 255, 255, 0.14));
  --tl-shadow: 0 10px 30px var(--SmartThemeShadowColor, rgba(0, 0, 0, 0.36));
  --tl-blur: var(--SmartThemeBlurStrength, 10px);
  --tl-radius-lg: 14px;
  --tl-radius-md: 9px;
  --tl-radius-sm: 6px;
  --tl-pos-noun: #60a5fa;
  --tl-pos-verb: #34d399;
  --tl-pos-adj: #f59e0b;
  --tl-pos-adv: #c084fc;
  --tl-pos-other: #94a3b8;
}

:root[data-tl-theme="light"] {
  --tl-bg: rgba(255, 255, 255, 0.98);
  --tl-surface: #f4f6fa;
  --tl-surface-soft: rgba(15, 23, 42, 0.05);
  --tl-text: #1e2433;
  --tl-text-muted: #5f6b82;
  --tl-accent: #4668f2;
  --tl-accent-soft: rgba(70, 104, 242, 0.12);
  --tl-border: rgba(15, 23, 42, 0.12);
  --tl-shadow: 0 12px 32px rgba(15, 23, 42, 0.14);
  --tl-blur: 12px;
  --tl-radius-lg: 14px;
  --tl-radius-md: 9px;
  --tl-radius-sm: 6px;
  --tl-pos-noun: #2563eb;
  --tl-pos-verb: #059669;
  --tl-pos-adj: #d97706;
  --tl-pos-adv: #9333ea;
  --tl-pos-other: #64748b;
}

:root[data-tl-theme="dark"] {
  --tl-bg: rgba(24, 26, 33, 0.98);
  --tl-surface: #21242f;
  --tl-surface-soft: rgba(255, 255, 255, 0.07);
  --tl-text: #e7eaf2;
  --tl-text-muted: #98a2b8;
  --tl-accent: #7aa2f7;
  --tl-accent-soft: rgba(122, 162, 247, 0.18);
  --tl-border: rgba(255, 255, 255, 0.12);
  --tl-shadow: 0 14px 36px rgba(0, 0, 0, 0.5);
  --tl-blur: 12px;
  --tl-radius-lg: 14px;
  --tl-radius-md: 9px;
  --tl-radius-sm: 6px;
  --tl-pos-noun: #60a5fa;
  --tl-pos-verb: #34d399;
  --tl-pos-adj: #fbbf24;
  --tl-pos-adv: #c084fc;
  --tl-pos-other: #94a3b8;
}

/* \u7EDF\u4E00\u76D2\u6A21\u578B\uFF0C\u9632\u6B62\u79FB\u52A8\u7AEF\u4EFB\u4F55\u5B50\u5143\u7D20\u6491\u7834\u5BB9\u5668 */
.tl-popover,
.tl-popover *,
.tl-sel-bar,
.tl-sel-bar *,
.tl-modal-backdrop,
.tl-modal-backdrop * {
  box-sizing: border-box;
}

/* ========== \u539F\u751F\u6D88\u606F\u5185\u5355\u8BCD\u4EA4\u4E92 ========== */
.tl-word {
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.14s ease, color 0.14s ease;
  -webkit-tap-highlight-color: transparent;
}

:root[data-tl-underline="1"] .tl-word:hover {
  background-color: var(--tl-accent-soft);
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-color: var(--tl-accent);
  text-underline-offset: 3px;
}

:root[data-tl-underline="0"] .tl-word:hover {
  background-color: var(--tl-accent-soft);
}

.tl-word.tl-word-active {
  background-color: var(--tl-accent-soft);
  box-shadow: 0 0 0 1px var(--tl-accent);
}

/* ========== \u6BB5\u843D\u5185\u5D4C\u53CC\u8BED\u8BD1\u6587\u5757 ========== */
.tl-trans-block {
  margin: 5px 0 10px 0;
  padding: 6px 10px;
  border-left: 2.5px solid var(--tl-accent);
  background: var(--tl-surface-soft);
  color: var(--tl-text-muted);
  font-size: 0.9em;
  line-height: 1.55;
  border-radius: 0 var(--tl-radius-sm) var(--tl-radius-sm) 0;
  user-select: text;
  word-break: break-word;
}

.tl-trans-block.tl-trans-loading {
  opacity: 0.72;
  font-style: italic;
}

.tl-trans-block.tl-hidden {
  display: none;
}

/* ========== \u6D88\u606F\u6B63\u6587\u5E95\u90E8\u67D4\u548C\u80F6\u56CA\u5FAE\u680F\uFF08\u66FF\u4EE3\u7A81\u5140\u7684\u9876\u90E8\u7F16\u8F91\u680F\u6309\u94AE\uFF09 ========== */
.tl-mes-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 8px;
  padding-top: 4px;
  opacity: 0.48;
  transition: opacity 0.16s ease;
  user-select: none;
}

.mes:hover .tl-mes-footer,
.tl-mes-footer:hover,
.tl-mes-footer:has(.tl-active) {
  opacity: 1;
}

.tl-footer-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  font-size: 11.5px;
  line-height: 1.5;
  border-radius: 999px;
  border: 1px solid var(--tl-border);
  background: var(--tl-surface-soft);
  color: var(--tl-text-muted);
  cursor: pointer;
  transition: all 0.14s ease;
  -webkit-tap-highlight-color: transparent;
}

.tl-footer-pill:hover,
.tl-footer-pill.tl-active {
  color: var(--tl-accent);
  border-color: var(--tl-accent);
  background: var(--tl-accent-soft);
}

/* ========== \u661F\u6807\u6536\u85CF\u4E0E\u751F\u8BCD\u672C\u7EC4\u4EF6\u6837\u5F0F ========== */
.tl-star-active {
  color: #f59e0b !important;
  border-color: rgba(245, 158, 11, 0.45) !important;
  background: rgba(245, 158, 11, 0.14) !important;
}

.tl-book-picker {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  padding: 7px 14px;
  border-bottom: 1px solid var(--tl-border);
  background: var(--tl-surface);
}

.tl-book-picker-label {
  font-size: 11.5px;
  color: var(--tl-text-muted);
}

.tl-vocab-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tl-book-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tl-inline-form {
  display: flex;
  gap: 8px;
  align-items: center;
}

.tl-book-manage-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.tl-vocab-filters {
  display: flex;
  gap: 8px;
}

.tl-lang-filter {
  width: 112px;
  flex-shrink: 0;
}

.tl-empty-state {
  text-align: center;
  padding: 28px 12px;
  color: var(--tl-text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.tl-empty-state i {
  font-size: 24px;
  opacity: 0.6;
}

.tl-vocab-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tl-vocab-card {
  padding: 10px 12px;
  border-radius: var(--tl-radius-md);
  border: 1px solid var(--tl-border);
  background: var(--tl-surface);
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.tl-vocab-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.tl-vocab-word-main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.tl-vocab-word {
  font-size: 15px;
  font-weight: 700;
  color: var(--tl-text);
}

.tl-vocab-meta {
  font-size: 12px;
  color: var(--tl-text-muted);
}

.tl-vocab-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.tl-vocab-cn {
  font-size: 13px;
  color: var(--tl-accent);
  font-weight: 500;
}

.tl-vocab-ctx {
  font-size: 12px;
  color: var(--tl-text-muted);
  padding: 5px 8px;
  border-radius: var(--tl-radius-sm);
  background: var(--tl-surface-soft);
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  word-break: break-word;
}

.tl-vocab-ctx i {
  margin-top: 3px;
  font-size: 11px;
  flex-shrink: 0;
}

.tl-vocab-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 2px;
}

.tl-mini-select {
  width: auto;
  max-width: 160px;
  padding: 3px 8px;
  font-size: 12px;
}

.tl-vocab-io {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 4px;
}

/* ========== \u70B9\u6309\u5355\u8BCD\u8BCD\u5178\u6C14\u6CE1 ========== */
.tl-popover {
  position: fixed;
  z-index: 99990;
  width: min(360px, calc(100vw - 20px));
  max-width: calc(100vw - 20px);
  max-height: min(440px, 68dvh);
  display: flex;
  flex-direction: column;
  background: var(--tl-bg);
  color: var(--tl-text);
  border: 1px solid var(--tl-border);
  border-radius: var(--tl-radius-lg);
  box-shadow: var(--tl-shadow);
  backdrop-filter: blur(var(--tl-blur));
  -webkit-backdrop-filter: blur(var(--tl-blur));
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 13.5px;
  line-height: 1.5;
  overflow: hidden;
  animation: tlFadeIn 0.14s ease-out;
}

@keyframes tlFadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.tl-pop-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 14px 8px;
  border-bottom: 1px solid var(--tl-border);
}

.tl-pop-word-group {
  min-width: 0;
  flex: 1;
}

.tl-pop-word {
  font-size: 17px;
  font-weight: 700;
  color: var(--tl-text);
  word-break: break-word;
}

.tl-pop-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
  font-size: 12px;
  color: var(--tl-text-muted);
}

.tl-pop-brief {
  margin-top: 4px;
  font-size: 13px;
  color: var(--tl-accent);
  font-weight: 500;
  word-break: break-word;
}

.tl-pop-actions {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
}

.tl-icon-btn {
  border: 1px solid var(--tl-border);
  background: var(--tl-surface-soft);
  color: var(--tl-text);
  border-radius: var(--tl-radius-sm);
  padding: 5px 9px;
  min-height: 28px;
  font-size: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  white-space: nowrap;
  transition: background-color 0.14s ease, border-color 0.14s ease, color 0.14s ease;
  -webkit-tap-highlight-color: transparent;
}

.tl-icon-btn:hover {
  background: var(--tl-accent-soft);
  border-color: var(--tl-accent);
  color: var(--tl-accent);
}

.tl-icon-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.tl-pop-sources {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 7px 14px;
  border-bottom: 1px solid var(--tl-border);
  background: var(--tl-surface-soft);
}

.tl-source-pill {
  font-size: 11.5px;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid var(--tl-border);
  background: transparent;
  color: var(--tl-text-muted);
  cursor: pointer;
  transition: all 0.14s ease;
  -webkit-tap-highlight-color: transparent;
}

.tl-source-pill:hover,
.tl-source-pill.tl-active {
  color: var(--tl-accent);
  border-color: var(--tl-accent);
  background: var(--tl-accent-soft);
}

.tl-pop-body {
  padding: 10px 14px 12px;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  flex: 1;
}

.tl-meaning-block {
  margin-bottom: 10px;
}

.tl-meaning-block:last-child {
  margin-bottom: 0;
}

.tl-pos-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 5px;
  margin-bottom: 4px;
  background: var(--tl-surface-soft);
}

.tl-pos-noun { color: var(--tl-pos-noun); border: 1px solid color-mix(in srgb, var(--tl-pos-noun) 38%, transparent); }
.tl-pos-verb { color: var(--tl-pos-verb); border: 1px solid color-mix(in srgb, var(--tl-pos-verb) 38%, transparent); }
.tl-pos-adj  { color: var(--tl-pos-adj);  border: 1px solid color-mix(in srgb, var(--tl-pos-adj) 38%, transparent); }
.tl-pos-adv  { color: var(--tl-pos-adv);  border: 1px solid color-mix(in srgb, var(--tl-pos-adv) 38%, transparent); }
.tl-pos-other{ color: var(--tl-pos-other);border: 1px solid color-mix(in srgb, var(--tl-pos-other) 38%, transparent); }

.tl-def-item {
  margin: 4px 0 6px 4px;
  padding-left: 8px;
  border-left: 2px solid var(--tl-border);
  word-break: break-word;
}

.tl-def-cn {
  color: var(--tl-text);
  font-weight: 500;
}

.tl-def-orig {
  color: var(--tl-text-muted);
  font-size: 12px;
  margin-top: 2px;
}

.tl-def-example {
  margin-top: 4px;
  font-size: 12px;
  color: var(--tl-text-muted);
  font-style: italic;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  gap: 5px;
}

.tl-def-example i {
  margin-top: 3px;
  font-size: 11px;
  flex-shrink: 0;
}

.tl-def-example:hover {
  color: var(--tl-accent);
}

.tl-pop-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 14px;
  border-top: 1px solid var(--tl-border);
  background: var(--tl-surface-soft);
}

.tl-sentence-box {
  margin-top: 8px;
  padding: 8px 10px;
  border-radius: var(--tl-radius-md);
  background: var(--tl-surface-soft);
  border: 1px solid var(--tl-border);
  font-size: 12.5px;
  word-break: break-word;
}

.tl-sentence-orig {
  color: var(--tl-text);
  margin-bottom: 4px;
}

.tl-sentence-cn {
  color: var(--tl-accent);
}

/* ========== \u5212\u8BCD / \u9009\u53E5\u60AC\u6D6E\u6761 ========== */
.tl-sel-bar {
  position: fixed;
  z-index: 99992;
  max-width: min(380px, calc(100vw - 20px));
  background: var(--tl-bg);
  color: var(--tl-text);
  border: 1px solid var(--tl-border);
  border-radius: var(--tl-radius-md);
  box-shadow: var(--tl-shadow);
  backdrop-filter: blur(var(--tl-blur));
  -webkit-backdrop-filter: blur(var(--tl-blur));
  padding: 6px 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  animation: tlFadeIn 0.12s ease-out;
}

.tl-sel-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
}

.tl-sel-result {
  margin-top: 7px;
  padding-top: 7px;
  border-top: 1px solid var(--tl-border);
  font-size: 13px;
  line-height: 1.55;
  color: var(--tl-text);
  max-height: 180px;
  overflow-y: auto;
  word-break: break-word;
}

/* ========== \u8BBE\u7F6E\u5F39\u7A97\uFF08\u684C\u9762\u5C45\u4E2D / \u5B89\u5353\u624B\u673A\u7AEF\u5E95\u90E8\u62BD\u5C49\uFF09 ========== */
.tl-modal-backdrop {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100dvh;
  z-index: 99995;
  background: rgba(0, 0, 0, 0.48);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow: hidden;
  animation: tlFadeIn 0.14s ease-out;
}

.tl-modal {
  width: min(540px, 100%);
  max-width: 100%;
  max-height: min(680px, 86dvh);
  display: flex;
  flex-direction: column;
  background: var(--tl-bg);
  color: var(--tl-text);
  border: 1px solid var(--tl-border);
  border-radius: var(--tl-radius-lg);
  box-shadow: var(--tl-shadow);
  backdrop-filter: blur(var(--tl-blur));
  -webkit-backdrop-filter: blur(var(--tl-blur));
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 13.5px;
}

.tl-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--tl-border);
  flex-shrink: 0;
}

.tl-modal-title {
  font-size: 15.5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.tl-modal-version {
  font-size: 11px;
  font-weight: 500;
  padding: 1px 6px;
  border-radius: 999px;
  background: var(--tl-accent-soft);
  color: var(--tl-accent);
  flex-shrink: 0;
}

.tl-tabs {
  display: flex;
  gap: 2px;
  padding: 6px 14px 0;
  border-bottom: 1px solid var(--tl-border);
  overflow-x: auto;
  flex-shrink: 0;
}

.tl-tab {
  padding: 8px 10px;
  border: none;
  background: transparent;
  color: var(--tl-text-muted);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border-bottom: 2px solid transparent;
  transition: color 0.14s ease, border-color 0.14s ease;
}

.tl-tab.tl-active {
  color: var(--tl-accent);
  border-bottom-color: var(--tl-accent);
}

.tl-modal-body {
  padding: 14px 16px;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  flex: 1;
}

.tl-field {
  margin-bottom: 14px;
}

.tl-field-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.tl-field-row > div {
  min-width: 0;
  flex: 1;
}

.tl-label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--tl-text);
}

.tl-hint {
  font-size: 12px;
  color: var(--tl-text-muted);
  margin-top: 3px;
  word-break: break-word;
}

.tl-input,
.tl-select,
.tl-textarea {
  width: 100%;
  max-width: 100%;
  background: var(--tl-surface);
  color: var(--tl-text);
  border: 1px solid var(--tl-border);
  border-radius: var(--tl-radius-md);
  padding: 8px 10px;
  font-size: 13.5px;
  outline: none;
}

.tl-input:focus,
.tl-select:focus,
.tl-textarea:focus {
  border-color: var(--tl-accent);
}

.tl-textarea {
  min-height: 76px;
  resize: vertical;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.tl-tts-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.tl-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.tl-chip {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--tl-border);
  background: var(--tl-surface-soft);
  color: var(--tl-text-muted);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.tl-chip:hover {
  border-color: var(--tl-accent);
  color: var(--tl-accent);
}

.tl-dict-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tl-dict-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 10px;
  border-radius: var(--tl-radius-md);
  border: 1px solid var(--tl-border);
  background: var(--tl-surface);
}

.tl-dict-row-info {
  flex: 1;
  min-width: 0;
}

.tl-dict-row-name {
  font-weight: 600;
  font-size: 13px;
}

.tl-dict-row-desc {
  font-size: 11.5px;
  color: var(--tl-text-muted);
  word-break: break-word;
}

.tl-dict-row-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.tl-modal-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--tl-border);
  flex-shrink: 0;
}

.tl-btn {
  padding: 7px 14px;
  border-radius: var(--tl-radius-md);
  border: 1px solid var(--tl-border);
  background: var(--tl-surface-soft);
  color: var(--tl-text);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.tl-btn:hover {
  border-color: var(--tl-accent);
  color: var(--tl-accent);
}

.tl-btn-primary {
  background: var(--tl-accent);
  border-color: var(--tl-accent);
  color: #ffffff;
}

.tl-btn-primary:hover {
  color: #ffffff;
  filter: brightness(1.08);
}

/* ========== \u5B89\u5353 / \u79FB\u52A8\u7AEF\u6DF1\u5EA6\u54CD\u5E94\u5F0F\u9002\u914D\uFF08\u5F7B\u5E95\u675C\u7EDD\u6EA2\u51FA\u5C4F\u5E55\uFF09 ========== */
@media (max-width: 640px) {
  .tl-modal-backdrop {
    align-items: flex-end;
    padding: 0;
  }

  .tl-modal {
    width: 100vw;
    max-width: 100vw;
    max-height: 86dvh;
    border-radius: 16px 16px 0 0;
    border-left: none;
    border-right: none;
    border-bottom: none;
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }

  .tl-modal-header {
    padding: 12px 14px;
  }

  .tl-modal-body {
    padding: 12px 14px;
  }

  .tl-modal-footer {
    padding: 10px 14px;
  }

  .tl-tts-grid {
    grid-template-columns: 1fr;
  }

  /* \u624B\u673A\u7AEF\u8BCD\u5178\u6C14\u6CE1\u7531\u667A\u80FD\u907F\u8BA9\u7B97\u6CD5\u52A8\u6001\u51B3\u5B9A\u505C\u9760\u5728\u4E0A\u65B9\u6216\u4E0B\u65B9\uFF0C\u6B64\u5904\u4EC5\u89C4\u8303\u5706\u89D2\u4E0E\u89E6\u63A7\u5C3A\u5BF8 */
  .tl-popover {
    border-radius: 14px;
    max-width: calc(100vw - 20px);
  }

  .tl-mes-footer {
    opacity: 0.72;
  }

  .tl-footer-pill {
    padding: 4px 10px;
    font-size: 12px;
  }

  .tl-icon-btn {
    min-height: 32px;
    padding: 5px 9px;
    font-size: 12.5px;
  }

  .tl-pop-footer {
    padding: 9px 12px;
  }

  .tl-pop-footer .tl-icon-btn {
    flex: 1;
  }

  .tl-sel-bar {
    max-width: calc(100vw - 20px);
  }
}
`;function pa(e=ee()){let t=ve().documentElement;t&&(t.setAttribute("data-tl-theme",e.theme||"tavern"),t.setAttribute("data-tl-underline",e.ui?.showWordUnderline===!1?"0":"1"))}function Kc(){let e=ve(),t=e.getElementById(fa);t||(t=e.createElement("style"),t.id=fa,e.head.appendChild(t)),t.textContent=Bh,pa()}function Xc(){let e=ve(),t=e.getElementById(fa);t&&t.remove(),e.documentElement.removeAttribute("data-tl-theme"),e.documentElement.removeAttribute("data-tl-underline")}var Il={};Dh(Il,{BaseTransition:()=>nl,BaseTransitionPropsValidators:()=>ii,Comment:()=>xe,DeprecationTypes:()=>Rv,EffectScope:()=>Xn,ErrorCodes:()=>Cm,ErrorTypeStrings:()=>wv,Fragment:()=>Ve,KeepAlive:()=>hg,ReactiveEffect:()=>sn,Static:()=>un,Suspense:()=>lv,Teleport:()=>Km,Text:()=>Cn,TrackOpTypes:()=>Lu,Transition:()=>$v,TransitionGroup:()=>fE,TriggerOpTypes:()=>$u,VueElement:()=>Ei,assertNumber:()=>wm,callWithAsyncErrorHandling:()=>gt,callWithErrorHandling:()=>no,camelize:()=>le,capitalize:()=>St,cloneVNode:()=>Xt,compatUtils:()=>Vv,computed:()=>Fe,createApp:()=>Rs,createBlock:()=>Jr,createCommentVNode:()=>Pf,createElementBlock:()=>hv,createElementVNode:()=>gl,createHydrationRenderer:()=>hl,createPropsRestProxy:()=>jg,createRenderer:()=>dl,createSSRApp:()=>$p,createSlots:()=>Cg,createStaticVNode:()=>Ev,createTextVNode:()=>vl,createVNode:()=>ye,customRef:()=>Ir,defineAsyncComponent:()=>pg,defineComponent:()=>it,defineCustomElement:()=>Op,defineEmits:()=>Vg,defineExpose:()=>Rg,defineModel:()=>Lg,defineOptions:()=>Pg,defineProps:()=>Ig,defineSSRCustomElement:()=>rE,defineSlots:()=>Mg,devtools:()=>Cv,effect:()=>_u,effectScope:()=>du,getCurrentInstance:()=>ze,getCurrentScope:()=>Ra,getCurrentWatcher:()=>Fu,getTransitionRawChildren:()=>Os,guardReactiveProps:()=>Rf,h:()=>_l,handleError:()=>oo,hasInjectionContext:()=>Fm,hydrate:()=>wE,hydrateOnIdle:()=>ig,hydrateOnInteraction:()=>ug,hydrateOnMediaQuery:()=>cg,hydrateOnVisible:()=>lg,initCustomFormatter:()=>Xf,initDirectivesForSSR:()=>CE,inject:()=>rf,isMemoSame:()=>zf,isProxy:()=>zn,isReactive:()=>pt,isReadonly:()=>Ze,isRef:()=>Ne,isRuntimeOnly:()=>Bf,isShallow:()=>$e,isVNode:()=>pn,markRaw:()=>Dr,mergeDefaults:()=>Bg,mergeModels:()=>Hg,mergeProps:()=>Mf,nextTick:()=>Ts,nodeOps:()=>vp,normalizeClass:()=>Wn,normalizeProps:()=>su,normalizeStyle:()=>jn,onActivated:()=>mg,onBeforeMount:()=>Eg,onBeforeUnmount:()=>rl,onBeforeUpdate:()=>sl,onDeactivated:()=>gg,onErrorCaptured:()=>Ng,onMounted:()=>Cs,onRenderTracked:()=>bg,onRenderTriggered:()=>yg,onScopeDispose:()=>To,onServerPrefetch:()=>_g,onUnmounted:()=>il,onUpdated:()=>ai,onWatcherCleanup:()=>$a,openBlock:()=>Ns,patchProp:()=>Tp,popScopeId:()=>Pm,provide:()=>$m,proxyRefs:()=>ps,pushScopeId:()=>Rm,queuePostFlushCb:()=>Kt,reactive:()=>an,readonly:()=>us,ref:()=>ht,registerRuntimeCompiler:()=>El,render:()=>Lp,renderList:()=>wg,renderSlot:()=>Ag,resolveComponent:()=>xg,resolveDirective:()=>Og,resolveDynamicComponent:()=>Tg,resolveFilter:()=>Iv,resolveTransitionHooks:()=>Zn,setBlockTracking:()=>Ss,setDevtoolsHook:()=>Av,setTransitionHooks:()=>Ct,shallowReactive:()=>Cr,shallowReadonly:()=>Au,shallowRef:()=>kr,ssrContextKey:()=>af,ssrUtils:()=>kv,stop:()=>yu,toDisplayString:()=>ya,toHandlerKey:()=>nn,toHandlers:()=>Dg,toRaw:()=>Y,toRef:()=>Ru,toRefs:()=>Vu,toValue:()=>Iu,transformVNodeArgs:()=>gv,triggerRef:()=>ku,unref:()=>Gn,useAttrs:()=>Ug,useCssModule:()=>lE,useCssVars:()=>jv,useHost:()=>wp,useId:()=>zm,useModel:()=>zg,useSSRContext:()=>lf,useShadowRoot:()=>aE,useSlots:()=>Fg,useTemplateRef:()=>Gm,useTransitionState:()=>ri,vModelCheckbox:()=>Dl,vModelDynamic:()=>Ip,vModelRadio:()=>kl,vModelSelect:()=>Dp,vModelText:()=>yi,vShow:()=>Np,version:()=>Gf,warn:()=>pi,watch:()=>Vo,watchEffect:()=>Um,watchPostEffect:()=>Bm,watchSyncEffect:()=>cf,withAsyncContext:()=>Wg,withCtx:()=>tl,withDefaults:()=>$g,withDirectives:()=>Lm,withKeys:()=>OE,withMemo:()=>Ov,withModifiers:()=>xE,withScopeId:()=>Mm});function Ue(e){let t=Object.create(null);for(let n of e.split(","))t[n]=1;return n=>n in t}var Z={},Nn=[],De=()=>{},Sn=()=>!1,Ft=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),yo=e=>e.startsWith("onUpdate:"),q=Object.assign,ts=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},Hh=Object.prototype.hasOwnProperty,ae=(e,t)=>Hh.call(e,t),H=Array.isArray,tn=e=>Bn(e)==="[object Map]",Nt=e=>Bn(e)==="[object Set]",zc=e=>Bn(e)==="[object Date]",Zc=e=>Bn(e)==="[object RegExp]",Q=e=>typeof e=="function",z=e=>typeof e=="string",Ae=e=>typeof e=="symbol",re=e=>e!==null&&typeof e=="object",mr=e=>(re(e)||Q(e))&&Q(e.then)&&Q(e.catch),eu=Object.prototype.toString,Bn=e=>eu.call(e),ha=e=>Bn(e).slice(8,-1),bo=e=>Bn(e)==="[object Object]",ns=e=>z(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Pt=Ue(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ma=Ue("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),jh=1e4,gr=e=>{let t=Object.create(null),n=0;return(o=>{let s=t[o];return s!==void 0?s:(++n>jh&&(t=Object.create(null),n=1),t[o]=e(o))})},Wh=/-\w/g,le=gr(e=>e.replace(Wh,t=>t.slice(1).toUpperCase())),Kh=/\B([A-Z])/g,Ke=gr(e=>e.replace(Kh,"-$1").toLowerCase()),St=gr(e=>e.charAt(0).toUpperCase()+e.slice(1)),nn=gr(e=>e?`on${St(e)}`:""),ke=(e,t)=>!Object.is(e,t),xn=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},vr=(e,t,n,o=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:o,value:n})},Hn=e=>{let t=parseFloat(e);return isNaN(t)?e:t},No=e=>{let t=z(e)?Number(e):NaN;return isNaN(t)?e:t},Gc,os=()=>Gc||(Gc=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function tu(e,t){return e+JSON.stringify(t,(n,o)=>typeof o=="function"?o.toString():o)}var Xh="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol",nu=Ue(Xh);var qc=2;function ou(e,t=0,n=e.length){if(t=Math.max(0,Math.min(t,e.length)),n=Math.max(0,Math.min(n,e.length)),t>n)return"";let o=e.split(/(\r?\n)/),s=o.filter((a,l)=>l%2===1);o=o.filter((a,l)=>l%2===0);let r=0,i=[];for(let a=0;a<o.length;a++)if(r+=o[a].length+(s[a]&&s[a].length||0),r>=t){for(let l=a-qc;l<=a+qc||n>r;l++){if(l<0||l>=o.length)continue;let u=l+1;i.push(`${u}${" ".repeat(Math.max(3-String(u).length,0))}|  ${o[l]}`);let f=o[l].length,c=s[l]&&s[l].length||0;if(l===a){let p=t-(r-(f+c)),d=Math.max(1,n>r?f-p:n-t);i.push("   |  "+" ".repeat(p)+"^".repeat(d))}else if(l>a){if(n>r){let p=Math.max(Math.min(n-r,f),1);i.push("   |  "+"^".repeat(p))}r+=f+c}}break}return i.join(`
`)}function jn(e){if(H(e)){let t={};for(let n=0;n<e.length;n++){let o=e[n],s=z(o)?ga(o):jn(o);if(s)for(let r in s)t[r]=s[r]}return t}else if(z(e)||re(e))return e}var zh=/;(?![^(]*\))/g,Gh=/:([^]+)/,qh=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function ga(e){let t={};return e.replace(qh,n=>n.startsWith("/*")?"":n).split(zh).forEach(n=>{if(n){let o=n.split(Gh);o.length>1&&(t[o[0].trim()]=o[1].trim())}}),t}function Wn(e){let t="";if(z(e))t=e;else if(H(e))for(let n=0;n<e.length;n++){let o=Wn(e[n]);o&&(t+=o+" ")}else if(re(e))for(let n in e)e[n]&&(t+=n+" ");return t.trim()}function su(e){if(!e)return null;let{class:t,style:n}=e;return t&&!z(t)&&(e.class=Wn(t)),n&&(e.style=jn(n)),e}var Jh="html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot",Yh="svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view",Qh="annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics",Zh="area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr",va=Ue(Jh),Ea=Ue(Yh),_a=Ue(Qh),ru=Ue(Zh),iu="itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly",au=Ue(iu),em=Ue(iu+",async,autofocus,autoplay,controls,default,defer,disabled,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");function Er(e){return!!e||e===""}function tm(e,t,n){if(e.length!==t.length)return!1;let o=!0;for(let s=0;o&&s<e.length;s++)o=ot(e[s],t[s],n);return o}function Jc(e,t,n){if(e.size!==t.size)return!1;let o=Array.from(t),s=new Uint8Array(o.length);for(let r of e){let i=-1;for(let a=0;a<o.length;a++)if(!s[a]&&ot(r,o[a],n)){i=a;break}if(i<0)return!1;s[i]=1}return!0}function nm(e,t,n){let o=tn(e),s=tn(t);if(o||s||(o=Nt(e),s=Nt(t),o||s))return o&&s?Jc(e,t,n):!1;let r=Object.keys(e).length,i=Object.keys(t).length;if(r!==i)return!1;for(let a in e){let l=ae(e,a),u=ae(t,a);if(l&&!u||!l&&u||!ot(e[a],t[a],n))return!1}return Qc(e)===Qc(t)}function Yc(e,t,n,o){n||(n=[new Map,new Map]);let[s,r]=n;if(s.has(e)||r.has(t))return s.get(e)===t&&r.get(t)===e;s.set(e,t),r.set(t,e);let i=o(e,t,n);return s.delete(e),r.delete(t),i}function ot(e,t,n){if(e===t)return!0;let o=zc(e),s=zc(t);return o||s?o&&s?e.getTime()===t.getTime():!1:(o=Ae(e),s=Ae(t),o||s?e===t:(o=H(e),s=H(t),o||s?o&&s?Yc(e,t,n,tm):!1:(o=re(e),s=re(t),o||s?!o||!s?!1:Yc(e,t,n,nm):String(e)===String(t))))}function ss(e,t){return e.findIndex(n=>ot(n,t))}function Qc(e){return Object.getPrototypeOf(e)===null&&e[Symbol.toPrimitive]==null&&typeof e.toString!="function"&&typeof e.valueOf!="function"?Bn(e):String(e)}var lu=e=>!!(e&&e.__v_isRef===!0),ya=e=>z(e)?e:e==null?"":H(e)||re(e)&&(e.toString===eu||!Q(e.toString))?lu(e)?ya(e.value):JSON.stringify(e,cu,2):String(e),cu=(e,t)=>lu(t)?cu(e,t.value):tn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[o,s],r)=>(n[da(o,r)+" =>"]=s,n),{})}:Nt(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>da(n))}:Ae(t)?da(t):re(t)&&!H(t)&&!bo(t)?String(t):t,da=(e,t="")=>{var n;return Ae(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};function ba(e){return e==null?"initial":typeof e=="string"?e===""?" ":e:(typeof e!="number"||Number.isFinite(e),String(e))}function om(e,...t){console.warn(`[Vue warn] ${e}`,...t)}var Ie,Xn=class{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Ie&&(Ie.active?(this.parent=Ie,this.index=(Ie.scopes||(Ie.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes){let o=this.scopes.slice();for(t=0,n=o.length;t<n;t++)o[t].pause()}for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes){let s=this.scopes.slice();for(t=0,n=s.length;t<n;t++)s[t].resume()}let o=this.effects.slice();for(t=0,n=o.length;t<n;t++)o[t].resume()}}run(t){if(this._active){let n=Ie;try{return Ie=this,t()}finally{Ie=n}}}on(){++this._on===1&&(this.prevScope=Ie,Ie=this)}off(){if(this._on>0&&--this._on===0){if(Ie===this)Ie=this.prevScope;else{let t=Ie;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,o;for(n=0,o=this.effects.length;n<o;n++)this.effects[n].stop();for(this.effects.length=0,n=0,o=this.cleanups.length;n<o;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){let s=this.scopes.slice();for(n=0,o=s.length;n<o;n++)s[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){let s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}};function du(e){return new Xn(e)}function Ra(){return Ie}function To(e,t=!1){Ie&&(Ie.active?Ie.cleanups.push(e):e())}var Ee;var Na=new WeakSet,sn=class{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ie&&(Ie.active?Ie.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Na.has(this)&&(Na.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||mu(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,uu(this),gu(this);let t=Ee,n=Mt;Ee=this,Mt=!0;try{return this.fn()}finally{vu(this),Ee=t,Mt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)La(t);this.deps=this.depsTail=void 0,uu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Na.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ta(this)&&this.run()}get dirty(){return Ta(this)}},hu=0,is,as;function mu(e,t=!1){if(e.flags|=8,t){e.next=as,as=e;return}e.next=is,is=e}function Pa(){hu++}function Ma(){if(--hu>0)return;if(as){let t=as;for(as=void 0;t;){let n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;is;){let t=is;for(is=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(o){e||(e=o)}t=n}}if(e)throw e}function gu(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function vu(e){let t,n=e.depsTail,o=n;for(;o;){let s=o.prevDep;o.version===-1?(o===n&&(n=s),La(o),sm(o)):t=o,o.dep.activeLink=o.prevActiveLink,o.prevActiveLink=void 0,o=s}e.deps=t,e.depsTail=n}function Ta(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Eu(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Eu(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===ls)||(e.globalVersion=ls,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Ta(e))))return;e.flags|=2;let t=e.dep,n=Ee,o=Mt;Ee=e,Mt=!0;try{gu(e);let s=e.fn(e._value);(t.version===0||ke(s,e._value))&&(e.flags|=128,e._value=s,t.version++)}catch(s){throw t.version++,s}finally{Ee=n,Mt=o,vu(e),e.flags&=-3}}function La(e,t=!1){let{dep:n,prevSub:o,nextSub:s}=e;if(o&&(o.nextSub=s,e.prevSub=void 0),s&&(s.prevSub=o,e.nextSub=void 0),n.subs===e&&(n.subs=o,!o&&n.computed)){n.computed.flags&=-5;for(let r=n.computed.deps;r;r=r.nextDep)La(r,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function sm(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}function _u(e,t){e.effect instanceof sn&&(e=e.effect.fn);let n=new sn(e);t&&q(n,t);try{n.run()}catch(s){throw n.stop(),s}let o=n.run.bind(n);return o.effect=n,o}function yu(e){e.effect.stop()}var Mt=!0,bu=[];function xt(){bu.push(Mt),Mt=!1}function Tt(){let e=bu.pop();Mt=e===void 0?!0:e}function uu(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let n=Ee;Ee=void 0;try{t()}finally{Ee=n}}}var ls=0,Oa=class{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},xo=class{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!Ee||!Mt||Ee===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Ee)n=this.activeLink=new Oa(Ee,this),Ee.deps?(n.prevDep=Ee.depsTail,Ee.depsTail.nextDep=n,Ee.depsTail=n):Ee.deps=Ee.depsTail=n,Nu(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){let o=n.nextDep;o.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=o),n.prevDep=Ee.depsTail,n.nextDep=void 0,Ee.depsTail.nextDep=n,Ee.depsTail=n,Ee.deps===n&&(Ee.deps=o)}return n}trigger(t){this.version++,ls++,this.notify(t)}notify(t){Pa();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Ma()}}};function Nu(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let o=t.deps;o;o=o.nextDep)Nu(o)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Nr=new WeakMap,Kn=Symbol(""),wa=Symbol(""),cs=Symbol("");function Be(e,t,n){if(Mt&&Ee){let o=Nr.get(e);o||Nr.set(e,o=new Map);let s=o.get(n);s||(o.set(n,s=new xo),s.map=o,s.key=n),s.track()}}function Bt(e,t,n,o,s,r){let i=Nr.get(e);if(!i){ls++;return}let a=l=>{l&&l.trigger()};if(Pa(),t==="clear")i.forEach(a);else{let l=H(e),u=l&&ns(n);if(l&&n==="length"){let f=Number(o);i.forEach((c,p)=>{(p==="length"||p===cs||!Ae(p)&&p>=f)&&a(c)})}else switch((n!==void 0||i.has(void 0))&&a(i.get(n)),u&&a(i.get(cs)),t){case"add":l?u&&a(i.get("length")):(a(i.get(Kn)),tn(e)&&a(i.get(wa)));break;case"delete":l||(a(i.get(Kn)),tn(e)&&a(i.get(wa)));break;case"set":tn(e)&&a(i.get(Kn));break}}Ma()}function rm(e,t){let n=Nr.get(e);return n&&n.get(t)}function So(e){let t=Y(e);return t===e||(Be(t,"iterate",cs),$e(e))?t:Ze(e)?pt(e)?t.map(n=>rn(dt(n))):t.map(rn):t.map(dt)}function fs(e){return Be(e=Y(e),"iterate",cs),e}function Ut(e,t){return Ze(e)?rn(pt(e)?dt(t):t):dt(t)}var im={__proto__:null,[Symbol.iterator](){return Sa(this,Symbol.iterator,e=>Ut(this,e))},concat(...e){return So(this).concat(...e.map(t=>H(t)?So(t):t))},entries(){return Sa(this,"entries",e=>(e[1]=Ut(this,e[1]),e))},every(e,t){return on(this,"every",e,t,void 0,arguments)},filter(e,t){return on(this,"filter",e,t,n=>n.map(o=>Ut(this,o)),arguments)},find(e,t){return on(this,"find",e,t,n=>Ut(this,n),arguments)},findIndex(e,t){return on(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return on(this,"findLast",e,t,n=>Ut(this,n),arguments)},findLastIndex(e,t){return on(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return on(this,"forEach",e,t,void 0,arguments)},includes(...e){return xa(this,"includes",e)},indexOf(...e){return xa(this,"indexOf",e)},join(e){return So(this).join(e)},lastIndexOf(...e){return xa(this,"lastIndexOf",e)},map(e,t){return on(this,"map",e,t,void 0,arguments)},pop(){return rs(this,"pop")},push(...e){return rs(this,"push",e)},reduce(e,...t){return pu(this,"reduce",e,t)},reduceRight(e,...t){return pu(this,"reduceRight",e,t)},shift(){return rs(this,"shift")},some(e,t){return on(this,"some",e,t,void 0,arguments)},splice(...e){return rs(this,"splice",e)},toReversed(){return So(this).toReversed()},toSorted(e){return So(this).toSorted(e)},toSpliced(...e){return So(this).toSpliced(...e)},unshift(...e){return rs(this,"unshift",e)},values(){return Sa(this,"values",e=>Ut(this,e))}};function Sa(e,t,n){let o=fs(e),s=o[t],r=s.call(o);if(o!==e&&!$e(e)){if(r[Symbol.toStringTag]==="Array Iterator"){let i=Object.create(Object.getPrototypeOf(r));return i.next=()=>fu(r.next(),n),s!==Su[t]&&Object.defineProperties(i,{return:{get(){let a=r.return;return typeof a=="function"?a.bind(r):a}},throw:{get(){let a=r.throw;return typeof a=="function"?a.bind(r):a}}}),i}r._next=r.next,r.next=()=>fu(r._next(),n)}return r}function fu(e,t){return e.done||(e.value=t(e.value)),e}var Su=Array.prototype;function on(e,t,n,o,s,r){let i=fs(e),a=i!==e&&!$e(e),l=i[t];if(l!==Su[t]){let c=l.apply(e,r);return a?dt(c):c}let u=n;i!==e&&(a?u=function(c,p){return n.call(this,Ut(e,c),p,e)}:n.length>2&&(u=function(c,p){return n.call(this,c,p,e)}));let f=l.call(i,u,o);return a&&s?s(f):f}function pu(e,t,n,o){let s=fs(e),r=s!==e&&!$e(e),i=n,a=!1;s!==e&&(r?(a=o.length===0,i=function(u,f,c){return a&&(a=!1,u=Ut(e,u)),n.call(this,u,Ut(e,f),c,e)}):n.length>3&&(i=function(u,f,c){return n.call(this,u,f,c,e)}));let l=s[t](i,...o);return a?Ut(e,l):l}function xa(e,t,n){let o=Y(e);Be(o,"iterate",cs);let s=o[t](...n);return(s===-1||s===!1)&&zn(n[0])?(n[0]=Y(n[0]),o[t](...n)):s}function rs(e,t,n=[]){xt(),Pa();let o=Y(e)[t].apply(e,n);return Ma(),Tt(),o}var am=Ue("__proto__,__v_isRef,__isVue"),xu=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Ae));function lm(e){Ae(e)||(e=String(e));let t=Y(this);return Be(t,"has",e),t.hasOwnProperty(e)}var Sr=class{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,o){if(n==="__v_skip")return t.__v_skip;let s=this._isReadonly,r=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return r;if(n==="__v_raw")return o===(s?r?Cu:wu:r?Ou:Tu).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(o)?t:void 0;let i=H(t);if(!s){let l;if(i&&(l=im[n]))return l;if(n==="hasOwnProperty")return lm}let a=Reflect.get(t,n,Ne(t)?t:o);if((Ae(n)?xu.has(n):am(n))||(s||Be(t,"get",n),r))return a;if(Ne(a)){let l=i&&ns(n)?a:a.value;return s&&re(l)?us(l):l}return re(a)?s?us(a):an(a):a}},xr=class extends Sr{constructor(t=!1){super(!1,t)}set(t,n,o,s){let r=t[n],i=H(t)&&ns(n);if(!this._isShallow){let u=Ze(r);if(!$e(o)&&!Ze(o)&&(r=Y(r),o=Y(o)),!i&&Ne(r)&&!Ne(o))return u||(r.value=o),!0}let a=i?Number(n)<t.length:ae(t,n),l=Reflect.set(t,n,o,Ne(t)?t:s);return t===Y(s)&&l&&(a?ke(o,r)&&Bt(t,"set",n,o,r):Bt(t,"add",n,o)),l}deleteProperty(t,n){let o=ae(t,n),s=t[n],r=Reflect.deleteProperty(t,n);return r&&o&&Bt(t,"delete",n,void 0,s),r}has(t,n){let o=Reflect.has(t,n);return(!Ae(n)||!xu.has(n))&&Be(t,"has",n),o}ownKeys(t){return Be(t,"iterate",H(t)?"length":Kn),Reflect.ownKeys(t)}},Tr=class extends Sr{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}},cm=new xr,um=new Tr,fm=new xr(!0),pm=new Tr(!0),Ca=e=>e,_r=e=>Reflect.getPrototypeOf(e);function dm(e,t,n){return function(...o){let s=this.__v_raw,r=Y(s),i=tn(r),a=e==="entries"||e===Symbol.iterator&&i,l=e==="keys"&&i,u=s[e](...o),f=n?Ca:t?rn:dt;return!t&&Be(r,"iterate",l?wa:Kn),q(Object.create(u),{next(){let{value:c,done:p}=u.next();return p?{value:c,done:p}:{value:a?[f(c[0]),f(c[1])]:f(c),done:p}}})}}function yr(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function hm(e,t){let n={get(s){let r=this.__v_raw,i=Y(r),a=Y(s);e||(ke(s,a)&&Be(i,"get",s),Be(i,"get",a));let{has:l}=_r(i),u=t?Ca:e?rn:dt;if(l.call(i,s))return u(r.get(s));if(l.call(i,a))return u(r.get(a));r!==i&&r.get(s)},get size(){let s=this.__v_raw;return!e&&Be(Y(s),"iterate",Kn),s.size},has(s){let r=this.__v_raw,i=Y(r),a=Y(s);return e||(ke(s,a)&&Be(i,"has",s),Be(i,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){let i=this,a=i.__v_raw,l=Y(a),u=t?Ca:e?rn:dt;return!e&&Be(l,"iterate",Kn),a.forEach((f,c)=>s.call(r,u(f),u(c),i))}};return q(n,e?{add:yr("add"),set:yr("set"),delete:yr("delete"),clear:yr("clear")}:{add(s){let r=Y(this),i=_r(r),a=Y(s),l=!t&&!$e(s)&&!Ze(s)?a:s;return i.has.call(r,l)||ke(s,l)&&i.has.call(r,s)||ke(a,l)&&i.has.call(r,a)||(r.add(l),Bt(r,"add",l,l)),this},set(s,r){!t&&!$e(r)&&!Ze(r)&&(r=Y(r));let i=Y(this),{has:a,get:l}=_r(i),u=a.call(i,s);u||(s=Y(s),u=a.call(i,s));let f=l.call(i,s);return i.set(s,r),u?ke(r,f)&&Bt(i,"set",s,r,f):Bt(i,"add",s,r),this},delete(s){let r=Y(this),{has:i,get:a}=_r(r),l=i.call(r,s);l||(s=Y(s),l=i.call(r,s));let u=a?a.call(r,s):void 0,f=r.delete(s);return l&&Bt(r,"delete",s,void 0,u),f},clear(){let s=Y(this),r=s.size!==0,i=void 0,a=s.clear();return r&&Bt(s,"clear",void 0,void 0,i),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=dm(s,e,t)}),n}function wr(e,t){let n=hm(e,t);return(o,s,r)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_isShallow"?t:s==="__v_raw"?o:Reflect.get(ae(n,s)&&s in o?n:o,s,r)}var mm={get:wr(!1,!1)},gm={get:wr(!1,!0)},vm={get:wr(!0,!1)},Em={get:wr(!0,!0)};var Tu=new WeakMap,Ou=new WeakMap,wu=new WeakMap,Cu=new WeakMap;function _m(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function an(e){return Ze(e)?e:Ar(e,!1,cm,mm,Tu)}function Cr(e){return Ar(e,!1,fm,gm,Ou)}function us(e){return Ar(e,!0,um,vm,wu)}function Au(e){return Ar(e,!0,pm,Em,Cu)}function Ar(e,t,n,o,s){if(!re(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let r=s.get(e);if(r)return r;let i=_m(ha(e));if(i===0)return e;let a=new Proxy(e,i===2?o:n);return s.set(e,a),a}function pt(e){return Ze(e)?pt(e.__v_raw):!!(e&&e.__v_isReactive)}function Ze(e){return!!(e&&e.__v_isReadonly)}function $e(e){return!!(e&&e.__v_isShallow)}function zn(e){return e?!!e.__v_raw:!1}function Y(e){let t=e&&e.__v_raw;return t?Y(t):e}function Dr(e){return!ae(e,"__v_skip")&&Object.isExtensible(e)&&vr(e,"__v_skip",!0),e}var dt=e=>re(e)?an(e):e,rn=e=>re(e)?us(e):e;function Ne(e){return e?e.__v_isRef===!0:!1}function ht(e){return Du(e,!1)}function kr(e){return Du(e,!0)}function Du(e,t){return Ne(e)?e:new Aa(e,t)}var Aa=class{constructor(t,n){this.dep=new xo,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:Y(t),this._value=n?t:dt(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){let n=this._rawValue,o=this.__v_isShallow||$e(t)||Ze(t);t=o?t:Y(t),ke(t,n)&&(this._rawValue=t,this._value=o?t:dt(t),this.dep.trigger())}};function ku(e){e.dep&&e.dep.trigger()}function Gn(e){return Ne(e)?e.value:e}function Iu(e){return Q(e)?e():Gn(e)}var ym={get:(e,t,n)=>t==="__v_raw"?e:Gn(Reflect.get(e,t,n)),set:(e,t,n,o)=>{let s=e[t];return Ne(s)&&!Ne(n)?(s.value=n,!0):Reflect.set(e,t,n,o)}};function ps(e){return pt(e)?e:new Proxy(e,ym)}var Da=class{constructor(t){this.__v_isRef=!0,this._value=void 0;let n=this.dep=new xo,{get:o,set:s}=t(n.track.bind(n),n.trigger.bind(n));this._get=o,this._set=s}get value(){return this._value=this._get()}set value(t){this._set(t)}};function Ir(e){return new Da(e)}function Vu(e){let t=H(e)?new Array(e.length):{};for(let n in e)t[n]=Pu(e,n);return t}var ka=class{constructor(t,n,o){this._object=t,this._defaultValue=o,this.__v_isRef=!0,this._value=void 0,this._key=Ae(n)?n:String(n),this._raw=Y(t);let s=!0,r=t;if(!H(t)||Ae(this._key)||!ns(this._key))do s=!zn(r)||$e(r);while(s&&(r=r.__v_raw));this._shallow=s}get value(){let t=this._object[this._key];return this._shallow&&(t=Gn(t)),this._value=t===void 0?this._defaultValue:t}set value(t){if(this._shallow&&Ne(this._raw[this._key])){let n=this._object[this._key];if(Ne(n)){n.value=t;return}}this._object[this._key]=t}get dep(){return rm(this._raw,this._key)}},Ia=class{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}};function Ru(e,t,n){return Ne(e)?e:Q(e)?new Ia(e):re(e)&&arguments.length>1?Pu(e,t,n):ht(e)}function Pu(e,t,n){return new ka(e,t,n)}var Va=class{constructor(t,n,o){this.fn=t,this.setter=n,this._value=void 0,this.dep=new xo(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ls-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=o}notify(){if(this.flags|=16,!(this.flags&8)&&Ee!==this)return mu(this,!0),!0}get value(){let t=this.dep.track();return Eu(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}};function Mu(e,t,n=!1){let o,s;return Q(e)?o=e:(o=e.get,s=e.set),new Va(o,s,n)}var Lu={GET:"get",HAS:"has",ITERATE:"iterate"},$u={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"};var br={},Or=new WeakMap,Tn;function Fu(){return Tn}function $a(e,t=!1,n=Tn){if(n){let o=Or.get(n);o||Or.set(n,o=[]),o.push(e)}}function Uu(e,t,n=Z){let{immediate:o,deep:s,once:r,scheduler:i,augmentJob:a,call:l}=n,u=g=>{(n.onWarn||om)("Invalid watch source: ",g,"A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.")},f=g=>s?g:$e(g)||s===!1||s===0?Ht(g,1):Ht(g),c,p,d,_,m=!1,b=!1;if(Ne(e)?(p=()=>e.value,m=$e(e)):pt(e)?(p=()=>f(e),m=!0):H(e)?(b=!0,m=e.some(g=>pt(g)||$e(g)),p=()=>e.map(g=>{if(Ne(g))return g.value;if(pt(g))return f(g);if(Q(g))return l?l(g,2):g()})):Q(e)?t?p=l?()=>l(e,2):e:p=()=>{if(d){xt();try{d()}finally{Tt()}}let g=Tn;Tn=c;try{return l?l(e,3,[_]):e(_)}finally{Tn=g}}:p=De,t&&s){let g=p,D=s===!0?1/0:s;p=()=>Ht(g(),D)}let x=Ra(),N=()=>{c.stop(),x&&x.active&&ts(x.effects,c)};if(r&&t){let g=t;t=(...D)=>{try{return g(...D)}finally{N()}}}let v=b?new Array(e.length).fill(br):br,y=g=>{if(!(!(c.flags&1)||!c.dirty&&!g))if(t){let D=c.run();if(g||s||m||(b?D.some((k,S)=>ke(k,v[S])):ke(D,v))){let k=Tn;xt();try{d&&d(),Tn=c;let S=[D,v===br?void 0:b&&v[0]===br?[]:v,_];v=D,l?l(t,3,S):t(...S)}finally{Tn=k,Tt()}}}else c.run()};return a&&a(y),c=new sn(p),c.scheduler=i?()=>i(y,!1):y,_=g=>$a(g,!1,c),d=c.onStop=()=>{let g=Or.get(c);if(g){if(l)l(g,4);else for(let D of g)D();Or.delete(c)}},t?o?y(!0):v=c.run():i?i(y.bind(null,!0),!0):c.run(),N.pause=c.pause.bind(c),N.resume=c.resume.bind(c),N.stop=N,N}function Ht(e,t=1/0,n){if(t<=0||!re(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,Ne(e))Ht(e.value,t,n);else if(H(e))for(let o=0;o<e.length;o++)Ht(e[o],t,n);else if(Nt(e)||tn(e))e.forEach(o=>{Ht(o,t,n)});else if(bo(e)){for(let o in e)Ht(e[o],t,n);for(let o of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,o)&&Ht(e[o],t,n)}return e}var Yn=[];function bm(e){Yn.push(e)}function Nm(){Yn.pop()}var Fa=!1;function Bu(e,...t){if(Fa)return;Fa=!0,xt();let n=Yn.length?Yn[Yn.length-1].component:null,o=n&&n.appContext.config.warnHandler,s=Sm();if(o)no(o,n,11,[e+t.map(r=>{var i,a;return(a=(i=r.toString)==null?void 0:i.call(r))!=null?a:JSON.stringify(r)}).join(""),n&&n.proxy,s.map(({vnode:r})=>`at <${Kf(n,r.type)}>`).join(`
`),s]);else{let r=[`[Vue warn]: ${e}`,...t];s.length&&r.push(`
`,...xm(s)),console.warn(...r)}Tt(),Fa=!1}function Sm(){let e=Yn[Yn.length-1];if(!e)return[];let t=[];for(;e;){let n=t[0];n&&n.vnode===e?n.recurseCount++:t.push({vnode:e,recurseCount:0});let o=e.component&&e.component.parent;e=o&&o.vnode}return t}function xm(e){let t=[];return e.forEach((n,o)=>{t.push(...o===0?[]:[`
`],...Tm(n))}),t}function Tm({vnode:e,recurseCount:t}){let n=t>0?`... (${t} recursive calls)`:"",o=e.component?e.component.parent==null:!1,s=` at <${Kf(e.component,e.type,o)}`,r=">"+n;return e.props?[s,...Om(e.props),r]:[s+r]}function Om(e){let t=[],n=Object.keys(e);return n.slice(0,3).forEach(o=>{t.push(...Zu(o,e[o]))}),n.length>3&&t.push(" ..."),t}function Zu(e,t,n){return z(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):typeof t=="number"||typeof t=="boolean"||t==null?n?t:[`${e}=${t}`]:Ne(t)?(t=Zu(e,Y(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):Q(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=Y(t),n?t:[`${e}=`,t])}function wm(e,t){}var Cm={SETUP_FUNCTION:0,0:"SETUP_FUNCTION",RENDER_FUNCTION:1,1:"RENDER_FUNCTION",NATIVE_EVENT_HANDLER:5,5:"NATIVE_EVENT_HANDLER",COMPONENT_EVENT_HANDLER:6,6:"COMPONENT_EVENT_HANDLER",VNODE_HOOK:7,7:"VNODE_HOOK",DIRECTIVE_HOOK:8,8:"DIRECTIVE_HOOK",TRANSITION_HOOK:9,9:"TRANSITION_HOOK",APP_ERROR_HANDLER:10,10:"APP_ERROR_HANDLER",APP_WARN_HANDLER:11,11:"APP_WARN_HANDLER",FUNCTION_REF:12,12:"FUNCTION_REF",ASYNC_COMPONENT_LOADER:13,13:"ASYNC_COMPONENT_LOADER",SCHEDULER:14,14:"SCHEDULER",COMPONENT_UPDATE:15,15:"COMPONENT_UPDATE",APP_UNMOUNT_CLEANUP:16,16:"APP_UNMOUNT_CLEANUP"},Am={sp:"serverPrefetch hook",bc:"beforeCreate hook",c:"created hook",bm:"beforeMount hook",m:"mounted hook",bu:"beforeUpdate hook",u:"updated",bum:"beforeUnmount hook",um:"unmounted hook",a:"activated hook",da:"deactivated hook",ec:"errorCaptured hook",rtc:"renderTracked hook",rtg:"renderTriggered hook",0:"setup function",1:"render function",2:"watcher getter",3:"watcher callback",4:"watcher cleanup function",5:"native event handler",6:"component event handler",7:"vnode hook",8:"directive hook",9:"transition hook",10:"app errorHandler",11:"app warnHandler",12:"ref function",13:"async component loader",14:"scheduler flush",15:"component update",16:"app unmount cleanup function"};function no(e,t,n,o){try{return o?e(...o):e()}catch(s){oo(s,t,n)}}function gt(e,t,n,o){if(Q(e)){let s=no(e,t,n,o);return s&&mr(s)&&s.catch(r=>{oo(r,t,n,void 0,!0)}),s}if(H(e)){let s=[];for(let r=0;r<e.length;r++)s.push(gt(e[r],t,n,o));return s}}function oo(e,t,n,o=!0,s=!1){let r=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:a}=t&&t.appContext.config||Z;if(t){let l=t.parent,u=t.proxy,f=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){let c=l.ec;if(c&&!l.isUnmounted&&(!s||l.scope.active)){for(let p=0;p<c.length;p++)if(c[p](e,u,f)===!1)return}l=l.parent}if(i){xt(),no(i,null,10,[e,u,f]),Tt();return}}Dm(e,n,r,o,a)}function Dm(e,t,n,o=!0,s=!1){if(s)throw e;console.error(e)}var et=[],Lt=-1,Wt=[],wn=null,wo=0,ef=Promise.resolve(),Hr=null;function Ts(e){let t=Hr||ef;return e?t.then(this?e.bind(this):e):t}function km(e){let t=Lt+1,n=et.length;for(;t<n;){let o=t+n>>>1,s=et[o],r=vs(s);r<e||r===e&&s.flags&2?t=o+1:n=o}return t}function ti(e){if(!(e.flags&1)){let t=vs(e),n=et[et.length-1];!n||!(e.flags&2)&&t>=vs(n)?et.push(e):et.splice(km(t),0,e),e.flags|=1,tf()}}function tf(){Hr||(Hr=ef.then(of))}function Kt(e){if(!H(e))wn&&e.id===-1?wn.splice(wo+1,0,e):e.flags&1||(Wt.push(e),e.flags|=1);else for(let t=0;t<e.length;t++)Wt.push(e[t]);tf()}function nf(e,t,n,o=Lt+1){for(;o<et.length;o++){let s=et[o];if(s&&s.flags&2){if(e&&s.id!==e.uid||t!==void 0&&!(s.id>=t))continue;et.splice(o,1),o=e?o-1:Lt,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function jr(e,t,n=0){if(Wt.length){let o=Wt,s=0;if(t){o=[];for(let i=0;i<Wt.length;i++){let a=Wt[i];(a.i!==void 0?!a.i||a.i.uid<n:t.has(a))?Wt[s++]=a:o.push(a)}}let r=[...new Set(o)].sort((i,a)=>vs(i)-vs(a));if(Wt.length=s,wn){for(let i=0;i<r.length;i++)wn.push(r[i]);return}for(wn=r,wo=0;wo<wn.length;wo++){let i=wn[wo];i.flags&4&&(i.flags&=-2),i.flags&8||i(),i.flags&=-2}wn=null,wo=0}}var Ua=!1;function Im(e,t){if(Ua){e();return}let n=t===void 0?void 0:new Set(Wt);e(),Ua=!0;try{nf(void 0,t),jr(void 0,n,t)}finally{Ua=!1}}var vs=e=>e.id==null?e.flags&2?-1:1/0:e.id;function of(e){let t=De;try{for(Lt=0;Lt<et.length;Lt++){let n=et[Lt];n&&!(n.flags&8)&&(n.flags&4&&(n.flags&=-2),no(n,n.i,n.i?15:14),n.flags&4||(n.flags&=-2))}}finally{for(;Lt<et.length;Lt++){let n=et[Lt];n&&(n.flags&=-2)}Lt=-1,et.length=0,jr(e),Hr=null,(et.length||Wt.length)&&of(e)}}var Vm=!1;var Co,Vr=[],Hu=!1;function sf(e,t){var n,o;Co=e,Co?(Co.enabled=!0,Vr.forEach(({event:s,args:r})=>Co.emit(s,...r)),Vr=[]):typeof window<"u"&&window.HTMLElement&&!((o=(n=window.navigator)==null?void 0:n.userAgent)!=null&&o.includes("jsdom"))?((t.__VUE_DEVTOOLS_HOOK_REPLAY__=t.__VUE_DEVTOOLS_HOOK_REPLAY__||[]).push(r=>{sf(r,t)}),setTimeout(()=>{Co||(t.__VUE_DEVTOOLS_HOOK_REPLAY__=null,Hu=!0,Vr=[])},3e3)):(Hu=!0,Vr=[])}var je=null,ni=null;function Es(e){let t=je;return je=e,ni=e&&e.type.__scopeId||null,t}function Rm(e){ni=e}function Pm(){ni=null}var Mm=e=>tl;function tl(e,t=je,n){if(!t||e._n)return e;let o=(...s)=>{o._d&&Ss(-1);let r=Es(t),i=fn.length,a;try{a=e(...s)}finally{for(let l=fn.length;l>i;l--)ui();Es(r),o._d&&Ss(1)}return a};return o._n=!0,o._c=!0,o._d=!0,o}function Lm(e,t){if(je===null)return e;let n=As(je),o=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[r,i,a,l=Z]=t[s];r&&(Q(r)&&(r={mounted:r,updated:r}),r.deep&&Ht(i),o.push({dir:r,instance:n,value:i,oldValue:void 0,arg:a,modifiers:l}))}return e}function jt(e,t,n,o){let s=e;if(o==="beforeMount")e._mount=e;else if(o==="beforeUpdate"){let a=t&&t._mount;a&&(a._latest=e,e._mount=a)}else if(o==="mounted"){let a=e._latest;e._mount=e._latest=void 0,a&&(s=a,a._mount=void 0)}let r=s.dirs,i=t&&t.dirs;for(let a=0;a<r.length;a++){let l=r[a];i?l.oldValue=i[a].value:o==="mounted"&&l.oldValue!==void 0&&(l=q({},l,{oldValue:void 0}));let u=l.dir[o];u&&(xt(),gt(u,n,8,[e.el,l,s,t]),Tt())}}function $m(e,t){if(He){let n=He.provides,o=He.parent&&He.parent.provides;o===n&&(n=He.provides=Object.create(o)),n[e]=t}}function rf(e,t,n=!1){let o=ze();if(o||Qn){let s=Qn?Qn._context.provides:o?o.parent==null||o.ce?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&Q(t)?t.call(o&&o.proxy):t}}function Fm(){return!!(ze()||Qn)}var af=Symbol.for("v-scx"),lf=()=>{{let e=rf(af);return e}};function Um(e,t){return oi(e,null,t)}function Bm(e,t){return oi(e,null,{flush:"post"})}function cf(e,t){return oi(e,null,{flush:"sync"})}function Vo(e,t,n){return oi(e,t,n)}function oi(e,t,n=Z){let{immediate:o,deep:s,flush:r,once:i}=n,a=q({},n),l=t&&o||!t&&r!=="post",u;if(to){if(r==="sync"){let d=lf();u=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){let d=()=>{};return d.stop=De,d.resume=De,d.pause=De,d}}let f=He;a.call=(d,_,m)=>gt(d,f,_,m);let c=!1;r==="post"?a.scheduler=d=>{d.i=f,Oe(d,f&&f.suspense)}:r!=="sync"&&(c=!0,a.scheduler=(d,_)=>{_?d():ti(d)}),a.augmentJob=d=>{t&&(d.flags|=4),c&&(d.flags|=2,f&&(d.id=f.uid,d.i=f))};let p=Uu(e,t,a);return to&&(u?u.push(p):l&&p()),p}var On=new WeakMap,uf=Symbol("_vte"),si=e=>e.__isTeleport,Jn=e=>e&&(e.disabled||e.disabled===""),Hm=e=>e&&(e.defer||e.defer===""),ju=e=>typeof SVGElement<"u"&&e instanceof SVGElement,Wu=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,Wa=(e,t)=>{let n=e&&e.to;return z(n)?t?t(n):null:n},jm={name:"Teleport",__isTeleport:!0,process(e,t,n,o,s,r,i,a,l,u){let{mc:f,pc:c,pbc:p,o:{insert:d,querySelector:_,createText:m,createComment:b,parentNode:x}}=u,N=Jn(t.props),{dynamicChildren:v}=t,y=(k,S,O)=>{k.shapeFlag&16&&f(k.children,S,O,s,r,i,a,l)},g=(k=t)=>{let S=Jn(k.props),O=k.target=Wa(k.props,_),V=Ka(O,k,m,d);O&&(i!=="svg"&&ju(O)?i="svg":i!=="mathml"&&Wu(O)&&(i="mathml"),s&&s.isCE&&(s.ce._teleportTargets||(s.ce._teleportTargets=new Set)).add(O),S||(y(k,O,V),hs(k,!1)))},D=k=>{let S=()=>{if(On.get(k)===S){if(On.delete(k),Jn(k.props)){let O=x(k.el)||n;y(k,O,k.anchor),hs(k,!0)}g(k)}};On.set(k,S),Oe(S,r)};if(e==null){let k=t.el=m(""),S=t.anchor=m("");if(d(k,n,o),d(S,n,o),Hm(t.props)||r&&r.pendingBranch){D(t);return}N&&(y(t,n,S),hs(t,!0)),g()}else{t.el=e.el;let k=t.anchor=e.anchor,S=On.get(e);if(S){S.flags|=8,On.delete(e),D(t);return}t.targetStart=e.targetStart;let O=t.target=e.target,V=t.targetAnchor=e.targetAnchor,M=Jn(e.props),w=M?n:O,$=M?k:V;if(i==="svg"||ju(O)?i="svg":(i==="mathml"||Wu(O))&&(i="mathml"),v?(p(e.dynamicChildren,v,w,s,r,i,a),ml(e,t,!0)):l||c(e,t,w,$,s,r,i,a,!1),N)M?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):Rr(t,n,k,u,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){let P=Wa(t.props,_);P&&(t.target=P,Rr(t,P,null,u,0))}else M&&Rr(t,O,V,u,1);hs(t,N)}},remove(e,t,n,{um:o,o:{remove:s}},r){let{shapeFlag:i,children:a,anchor:l,targetStart:u,targetAnchor:f,target:c,props:p}=e,d=Jn(p),_=r||!d,m=On.get(e);if(m&&(m.flags|=8,On.delete(e)),c&&(s(u),s(f)),r&&s(l),!m&&(d||c)&&i&16)for(let b=0;b<a.length;b++){let x=a[b];o(x,t,n,_,!!x.dynamicChildren)}},move:Rr,hydrate:Wm};function Rr(e,t,n,{o:{insert:o},m:s},r=2){r===0&&(e.targetStart&&o(e.targetStart,t,n),o(e.targetAnchor,t,n),n=e.targetAnchor);let{el:i,anchor:a,shapeFlag:l,children:u,props:f}=e,c=r===2;if(c&&o(i,t,n),!On.has(e)&&(!c||Jn(f))&&l&16)for(let p=0;p<u.length;p++)s(u[p],t,n,2);c&&o(a,t,n)}function Wm(e,t,n,o,s,r,{o:{nextSibling:i,parentNode:a,querySelector:l,insert:u,createText:f}},c){function p(b,x){let N=x;for(;N;){if(N&&N.nodeType===8){if(N.data==="teleport start anchor")t.targetStart=N;else if(N.data==="teleport anchor"){t.targetAnchor=N,b._lpa=t.targetAnchor&&i(t.targetAnchor);break}}N=i(N)}}function d(b,x){x.anchor=c(i(b),x,a(b),n,o,s,r)}let _=t.target=Wa(t.props,l),m=Jn(t.props);if(_){let b=_._lpa||_.firstChild;t.shapeFlag&16&&(m?(p(_,b),d(e,t),t.targetAnchor||Ka(_,t,f,u,a(e)===_?e:null)):(t.anchor=i(e),p(_,b),t.targetAnchor||Ka(_,t,f,u),c(b&&i(b),t,_,n,o,s,r))),hs(t,m)}else m&&t.shapeFlag&16&&(d(e,t),t.targetStart=e,t.targetAnchor=i(e));return t.anchor&&i(t.anchor)}var Km=jm;function hs(e,t){let n=e.ctx;n&&n.ut&&(t?n.ut(e.el,e.anchor):n.ut(e.targetStart,e.targetAnchor))}function Ka(e,t,n,o,s=null){let r=t.targetStart=n(""),i=t.targetAnchor=n("");return r[uf]=i,e&&(o(r,e,s),o(i,e,s)),i}var mt=Symbol("_leaveCb"),ds=Symbol("_enterCb");function ri(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Cs(()=>{e.isMounted=!0}),rl(()=>{e.isUnmounting=!0}),e}var Ot=[Function,Array],ii={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Ot,onEnter:Ot,onAfterEnter:Ot,onEnterCancelled:Ot,onBeforeLeave:Ot,onLeave:Ot,onAfterLeave:Ot,onLeaveCancelled:Ot,onBeforeAppear:Ot,onAppear:Ot,onAfterAppear:Ot,onAppearCancelled:Ot},Xm={name:"BaseTransition",props:ii,setup(e,{slots:t}){let n=ze(),o=ri();return()=>{let s=t.default&&Os(t.default(),!0),r=s&&s.length?ff(s):n.subTree?Pf():void 0;if(!r)return;let i=Y(e),{mode:a}=i;if(o.isLeaving)return Ba(r);let l=Wr(r);if(!l)return Ba(r);let u=Zn(l,i,o,n);l.type!==xe&&Ct(l,u);let f=n.subTree&&Wr(n.subTree);if(f&&f.type!==xe&&!wt(f,l)&&_s(n.subTree)){let c=Zn(f,i,o,n);if(Ct(f,c),a==="out-in"&&l.type!==xe)return o.isLeaving=!0,c.afterLeave=()=>{if(o.isLeaving=!1,!(n.job.flags&8))if(n.effect.flags&2){let p=()=>{n.job.flags&8||n.update()};p.i=n,ti(p)}else n.update();delete c.afterLeave,f=void 0},Ba(r);a==="in-out"&&l.type!==xe?c.delayLeave=(p,d,_)=>{let m=pf(o,f);m[String(f.key)]=f,p[mt]=()=>{d(),p[mt]=void 0,delete u.delayedLeave,f=void 0},u.delayedLeave=()=>{_(),delete u.delayedLeave,f=void 0}}:f=void 0}else f&&(f=void 0);return r}}};function ff(e){let t=e[0];if(e.length>1){let n=!1;for(let o of e)if(o.type!==xe){t=o,n=!0;break}}return t}var nl=Xm;function pf(e,t){let{leavingVNodes:n}=e,o=n.get(t.type);return o||(o=Object.create(null),n.set(t.type,o)),o}function Zn(e,t,n,o){let{appear:s,mode:r,persisted:i=!1,onBeforeEnter:a,onEnter:l,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:c,onLeave:p,onAfterLeave:d,onLeaveCancelled:_,onBeforeAppear:m,onAppear:b,onAfterAppear:x,onAppearCancelled:N}=t,v=String(e.key),y=pf(n,e),g=(S,O)=>{S&&gt(S,o,9,O)},D=(S,O)=>{let V=O[1];g(S,O),H(S)?S.every(M=>M.length<=1)&&V():S.length<=1&&V()},k={mode:r,persisted:i,beforeEnter(S){let O=a;if(!n.isMounted)if(s)O=m||a;else return;S[mt]&&S[mt](!0);let V=y[v];if(V&&wt(e,V)){let M=V.el[mt];if(!M){let w=_s(V);M=w&&w.el[mt]}M&&M()}g(O,[S])},enter(S){if(!Vm&&S[mt]){k.delayedLeave&&k.delayedLeave();return}let O=l,V=u,M=f;if(!n.isMounted)if(s)O=b||l,V=x||u,M=N||f;else return;let w=!1;S[ds]=P=>{w||(w=!0,P?g(M,[S]):g(V,[S]),k.delayedLeave&&k.delayedLeave(),S[ds]=void 0)};let $=S[ds].bind(null,!1);O?D(O,[S,$]):$()},leave(S,O){let V=String(e.key);if(S[ds]&&S[ds](!0),n.isUnmounting)return O();g(c,[S]);let M=!1;S[mt]=$=>{M||(M=!0,O(),$?g(_,[S]):g(d,[S]),S[mt]=void 0,y[V]===e&&delete y[V])};let w=S[mt].bind(null,!1);y[V]=e,p?D(p,[S,w]):w()},clone(S){let O=Zn(S,t,n,o);return O.afterLeave=()=>{k.afterLeave&&k.afterLeave()},O.delayLeave=(V,M,w)=>{k.delayLeave?k.delayLeave(V,M,w):w()},O.delayedLeave=()=>{k.delayedLeave&&k.delayedLeave()},O}};return k}function Ba(e){if(ws(e))return e=Xt(e),e.children=null,e}function Wr(e){if(!ws(e))return si(e.type)&&e.children?ff(e.children):e;if(e.component)return e.component.subTree;let{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&Q(n.default))return n.default()}}function Ct(e,t){if(e.shapeFlag&6&&e.component){e.transition=t;let n=e.component.subTree;Ct(si(n.type)&&Wr(n)||n,t)}else if(e.shapeFlag&128){let n=e.suspense;if(n){let o=n.isHydrating?n.pendingBranch:n.activeBranch;o&&Ct(o,t.clone(o))}else e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)}else if(e.transition=t,e.type===Ve&&H(e.children)){let n=ul(e.children,!1);n&&Ct(n,t)}}function Os(e,t=!1,n){let o=[],s=0;for(let r=0;r<e.length;r++){let i=e[r],a=n==null?i.key:String(n)+String(i.key!=null?i.key:r);i.type===Ve?(i.patchFlag&128&&s++,o=o.concat(Os(i.children,t,a))):(t||i.type!==xe)&&o.push(a!=null?Xt(i,{key:a}):i)}if(s>1)for(let r=0;r<o.length;r++)o[r].patchFlag=-2;return o}function _s(e){if(e.component)return _s(e.component.subTree);if(e.type===Ve){let t=H(e.children)&&ul(e.children,!1);return t?_s(t):void 0}if(e.type!==xe)return e}function it(e,t){return Q(e)?q({name:e.name},t,{setup:e}):e}function zm(){let e=ze();return e?(e.appContext.config.idPrefix||"v")+"-"+e.ids[0]+e.ids[1]++:""}function df(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function Gm(e){let t=ze(),n=kr(null);if(t){let s=t.refs===Z?t.refs={}:t.refs;Object.defineProperty(s,e,{enumerable:!0,get:()=>n.value,set:r=>n.value=r})}return n}function Ku(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var Kr=new WeakMap;function Do(e,t,n,o,s=!1){if(H(e)){e.forEach((m,b)=>Do(m,t&&(H(t)?t[b]:t),n,o,s));return}if(cn(o)&&!s){o.shapeFlag&512&&o.type.__asyncResolved&&o.component.subTree.component&&Do(e,t,n,o.component.subTree);return}let r=o.shapeFlag&4?As(o.component):o.el,i=s?null:r,{i:a,r:l}=e,u=t&&t.r,f=a.refs===Z?a.refs={}:a.refs,c=a.setupState,p=Y(c),d=c===Z?Sn:m=>Ku(f,m)?!1:ae(p,m),_=(m,b)=>!(b&&Ku(f,b));if(u!=null&&u!==l){if(Xu(t),z(u))f[u]=null,d(u)&&(c[u]=null);else if(Ne(u)){let m=t;_(u,m.k)&&(u.value=null),m.k&&(f[m.k]=null)}}if(Q(l))no(l,a,12,[i,f]);else{let m=z(l),b=Ne(l);if(m||b){let x=()=>{if(e.f){let N=m?d(l)?c[l]:f[l]:_(l)||!e.k?l.value:f[e.k];if(s)H(N)&&ts(N,r);else if(H(N))N.includes(r)||N.push(r);else if(m)f[l]=[r],d(l)&&(c[l]=f[l]);else{let v=[r];_(l,e.k)&&(l.value=v),e.k&&(f[e.k]=v)}}else m?(f[l]=i,d(l)&&(c[l]=i)):b&&(_(l,e.k)&&(l.value=i),e.k&&(f[e.k]=i))};if(i){let N=()=>{x(),Kr.delete(e)};N.id=-1,Kr.set(e,N),Oe(N,n)}else Xu(e),x()}}}function Xu(e){let t=Kr.get(e);t&&(t.flags|=8,Kr.delete(e))}var zu=!1,Oo=()=>{zu||(console.error("Hydration completed but contains mismatches."),zu=!0)},qm=e=>e.namespaceURI.includes("svg")&&e.tagName!=="foreignObject",Jm=e=>e.namespaceURI.includes("MathML"),Pr=e=>{if(e.nodeType===1){if(qm(e))return"svg";if(Jm(e))return"mathml"}},Ao=e=>e.nodeType===8;function Ym(e){let{mt:t,p:n,o:{patchProp:o,createText:s,nextSibling:r,parentNode:i,remove:a,insert:l,createComment:u}}=e,f=(v,y)=>{if(!y.hasChildNodes()){n(null,v,y),jr(),y._vnode=v;return}c(y.firstChild,v,null,null,null),jr(),y._vnode=v},c=(v,y,g,D,k,S=!1)=>{S=S||!!y.dynamicChildren;let O=Ao(v)&&v.data==="[",V=()=>m(v,y,g,D,k,O),{type:M,ref:w,shapeFlag:$,patchFlag:P}=y,W=v.nodeType;y.el=v,P===-2&&(S=!1,y.dynamicChildren=null);let j=null;switch(M){case Cn:W!==3?y.children===""?(l(y.el=s(""),i(v),v),j=v):j=V():(v.data!==y.children&&(Oo(),v.data=y.children),j=r(v));break;case xe:N(v)?(j=r(v),x(y.el=v.content.firstChild,v,g)):W!==8||O?j=V():j=r(v);break;case un:if(O&&(v=r(v),W=v.nodeType),W===1||W===3){j=v;let ie=!y.children.length;for(let fe=0;fe<y.staticCount;fe++)ie&&(y.children+=j.nodeType===1?j.outerHTML:j.data),fe===y.staticCount-1&&(y.anchor=j),j=r(j);return O?r(j):j}else V();break;case Ve:O?j=_(v,y,g,D,k,S):j=V();break;default:if($&1)(W!==1||y.type.toLowerCase()!==v.tagName.toLowerCase())&&!N(v)?j=V():j=p(v,y,g,D,k,S);else if($&6){y.slotScopeIds=k;let ie=i(v);if(O?j=b(v):Ao(v)&&v.data==="teleport start"?j=b(v,v.data,"teleport end"):j=r(v),t(y,ie,null,g,D,Pr(ie),S),(cn(y)||y.component.asyncDep)&&!y.component.subTree){let fe;O?(fe=ye(un),fe.anchor=j?j.previousSibling:ie.lastChild):fe=v.nodeType===3?vl(""):ye(v.nodeType===8?xe:"div"),fe.el=v,y.component.subTree=fe}}else $&64?W!==8?j=V():j=y.type.hydrate(v,y,g,D,k,S,e,d):$&128&&(j=y.type.hydrate(v,y,g,D,Pr(i(v)),k,S,e,c))}return w!=null&&Do(w,null,D,y),j},p=(v,y,g,D,k,S)=>{S=S||!!y.dynamicChildren;let{type:O,dynamicProps:V,props:M,patchFlag:w,shapeFlag:$,dirs:P,transition:W}=y,j=O==="input"||O==="option",ie=!!V;if(j||ie||w!==-1){P&&jt(y,null,g,"created");let fe=!1;if(N(v)){fe=Cf(null,W)&&g&&g.vnode.props&&g.vnode.props.appear;let se=v.content.firstChild;if(fe){let Me=se.getAttribute("class");Me&&(se.$cls=Me),W.beforeEnter(se)}x(se,v,g),y.el=v=se}if($&16&&!(M&&(M.innerHTML||M.textContent))){let se=d(v.firstChild,y,v,g,D,k,S);for(se&&!Fr(v,1)&&Oo();se;){let Me=se;se=se.nextSibling,a(Me)}}else if($&8){let se=y.children;se[0]===`
`&&(v.tagName==="PRE"||v.tagName==="TEXTAREA")&&(se=se.slice(1));let{textContent:Me}=v;Me!==se&&Me!==se.replace(/\r\n|\r/g,`
`)&&(Fr(v,0)||Oo(),v.textContent=y.children)}if(M){if(j||ie||!S||w&48){let se=v.tagName.includes("-"),Me=v.namespaceURI.includes("svg")?"svg":v.namespaceURI.includes("MathML")?"mathml":void 0;for(let ge in M)if(j&&(ge.endsWith("value")||ge==="indeterminate")||Ft(ge)&&!Pt(ge)||ge[0]==="."||se&&!Pt(ge)||V&&V.includes(ge)){if(Zm(v,ge,M[ge]))continue;o(v,ge,null,M[ge],Me,g)}}else if(M.onClick)o(v,"onClick",null,M.onClick,void 0,g);else if(w&4&&pt(M.style))for(let se in M.style)M.style[se]}let he;(he=M&&M.onVnodeBeforeMount)&&st(he,g,y),P&&jt(y,null,g,"beforeMount"),((he=M&&M.onVnodeMounted)||P||fe)&&qr(()=>{he&&st(he,g,y),fe&&W.enter(v),P&&jt(y,null,g,"mounted")},D)}return v.nextSibling},d=(v,y,g,D,k,S,O)=>{O=O||!!y.dynamicChildren;let V=y.children,M=V.length,w=!1;for(let $=0;$<M;$++){let P=O?V[$]:V[$]=rt(V[$]),W=P.type===Cn;v?(W&&!O&&$+1<M&&rt(V[$+1]).type===Cn&&(l(s(v.data.slice(P.children.length)),g,r(v)),v.data=P.children),v=c(v,P,D,k,S,O)):W&&!P.children?l(P.el=s(""),g):(w||(w=!0,Fr(g,1)||Oo()),n(null,P,g,null,D,k,Pr(g),S))}return v},_=(v,y,g,D,k,S)=>{let{slotScopeIds:O}=y;O&&(k=k?k.concat(O):O);let V=i(v),M=d(r(v),y,V,g,D,k,S);return M&&Ao(M)&&M.data==="]"?r(y.anchor=M):(Oo(),l(y.anchor=u("]"),V,M),M)},m=(v,y,g,D,k,S)=>{if(tg(v,y)||Oo(),y.el=null,S){let M=b(v);for(;;){let w=r(v);if(w&&w!==M)a(w);else break}}let O=r(v),V=i(v);return a(v),n(null,y,V,O,g,D,Pr(V),k),g&&g.vnode.el===v&&(g.vnode.el=y.el,ci(g,y.el)),O},b=(v,y="[",g="]")=>{let D=0;for(;v;)if(v=r(v),v&&Ao(v)&&(v.data===y&&D++,v.data===g)){if(D===0)return r(v);D--}return v},x=(v,y,g)=>{let D=y.parentNode;D&&D.replaceChild(v,y);let k=g;for(;k;)k.vnode.el===y&&(k.vnode.el=k.subTree.el=v),k=k.parent},N=v=>v.nodeType===1&&v.tagName==="TEMPLATE";return[f,c]}var Qm=new Set(["src","srcset","href","poster"]);function Zm(e,t,n){return Qm.has(t)?e.getAttribute(t)===(n==null?null:`${n}`):!1}var Xr="data-allow-mismatch",eg={0:"text",1:"children",2:"class",3:"style",4:"attribute"};function Fr(e,t){if(t===0||t===1)for(;e&&!e.hasAttribute(Xr);)e=e.parentElement;return ol(e&&e.getAttribute(Xr),t)}function ol(e,t){if(e==null)return!1;if(e==="")return!0;{let n=e.split(",");return t===0&&n.includes("children")?!0:n.includes(eg[t])}}function tg(e,t){return Fr(e.parentElement,1)||ng(e)||og(t)}function ng(e){return e.nodeType===1&&ol(e.getAttribute(Xr),1)}function og({props:e}){let t=e&&e[Xr];return typeof t=="string"&&ol(t,1)}var sg=os().requestIdleCallback||(e=>setTimeout(e,1)),rg=os().cancelIdleCallback||(e=>clearTimeout(e)),ig=(e=1e4)=>t=>{let n=sg(t,{timeout:e});return()=>rg(n)};function ag(e){let{top:t,left:n,bottom:o,right:s}=e.getBoundingClientRect(),{innerHeight:r,innerWidth:i}=window;return(t>0&&t<r||o>0&&o<r)&&(n>0&&n<i||s>0&&s<i)}var lg=e=>(t,n)=>{let o=new IntersectionObserver(r=>{for(let i of r)if(i.isIntersecting){o.disconnect(),t();break}},e),s=r=>{if(ag(r))return t(),o.disconnect(),!1;if(getComputedStyle(r).display==="contents"){for(let i=0;i<r.children.length;i++)if(s(r.children[i])===!1)return!1}o.observe(r)};return n(r=>{if(r instanceof Element)return s(r)}),()=>o.disconnect()},cg=e=>t=>{if(e){let n=matchMedia(e);if(n.matches)t();else return n.addEventListener("change",t,{once:!0}),()=>n.removeEventListener("change",t)}},ug=(e=[])=>(t,n)=>{z(e)&&(e=[e]);let o=!1,s=i=>{o||(o=!0,r(),t(),i.target.dispatchEvent(new i.constructor(i.type,i)))},r=()=>{n(i=>{for(let a of e)i.removeEventListener(a,s)})};return n(i=>{for(let a of e)i.addEventListener(a,s,{once:!0})}),r};function fg(e,t){if(Ao(e)&&e.data==="["){let n=1,o=e.nextSibling;for(;o;){if(o.nodeType===1){if(t(o)===!1)break}else if(Ao(o))if(o.data==="]"){if(--n===0)break}else o.data==="["&&n++;o=o.nextSibling}}else t(e)}var cn=e=>!!e.type.__asyncLoader;function pg(e){Q(e)&&(e={loader:e});let{loader:t,loadingComponent:n,errorComponent:o,delay:s=200,hydrate:r,timeout:i,suspensible:a=!0,onError:l}=e,u=null,f,c=0,p=()=>(c++,u=null,d()),d=()=>{let _;return u||(_=u=t().catch(m=>{if(m=m instanceof Error?m:new Error(String(m)),l)return new Promise((b,x)=>{l(m,()=>b(p()),()=>x(m),c+1)});throw m}).then(m=>_!==u&&u?u:(m&&(m.__esModule||m[Symbol.toStringTag]==="Module")&&(m=m.default),f=m,m)))};return it({name:"AsyncComponentWrapper",__asyncLoader:d,__asyncHydrate(_,m,b){let x=_.isConnected,N=!1;(m.bu||(m.bu=[])).push(()=>N=!0);let v=()=>{N||!_.parentNode||x&&!_.isConnected||b()},y=r?()=>{let g=r(v,D=>fg(_,D));g&&(m.bum||(m.bum=[])).push(g)}:v;f?y():d().then(()=>!m.isUnmounted&&y())},get __asyncResolved(){return f},setup(){let _=He;if(df(_),f)return()=>Mr(f,_);let m=g=>{u=null,oo(g,_,13,!o,!0)};if(a&&_.suspense||to)return d().then(g=>()=>Mr(g,_)).catch(g=>(m(g),()=>o?ye(o,{error:g}):null));let b=ht(!1),x=ht(),N=ht(!!s),v,y;return To(()=>{v!=null&&clearTimeout(v),y!=null&&clearTimeout(y)}),s&&(y=setTimeout(()=>{_.isUnmounted||(N.value=!1)},s)),i!=null&&(v=setTimeout(()=>{if(!_.isUnmounted&&!b.value&&!x.value){let g=new Error(`Async component timed out after ${i}ms.`);m(g),x.value=g}},i)),d().then(()=>{_.isUnmounted||(b.value=!0,_.parent&&ws(_.parent.vnode)&&_.parent.update())}).catch(g=>{if(_.isUnmounted){u=null;return}m(g),x.value=g}),()=>{if(b.value&&f)return Mr(f,_);if(x.value&&o)return ye(o,{error:x.value});if(n&&!N.value)return Mr(n,_)}}})}function Mr(e,t){let{ref:n,props:o,children:s,ce:r}=t.vnode,i=ye(e,o,s);return i.ref=n,i.ce=r,delete t.vnode.ce,i}var ws=e=>e.type.__isKeepAlive,dg={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){let n=ze(),o=n.ctx;if(!o.renderer)return()=>{let N=t.default&&t.default();return N&&N.length===1?N[0]:N};let s=new Map,r=new Set,i=null,a=n.suspense,{renderer:{p:l,m:u,um:f,o:{createElement:c}}}=o,p=c("div");o.activate=(N,v,y,g,D)=>{let k=N.component;u(N,v,y,0,a),l(k.vnode,N,v,y,k,a,g,N.slotScopeIds,D),Oe(()=>{k.isDeactivated=!1,k.a&&xn(k.a);let S=N.props&&N.props.onVnodeMounted;S&&st(S,k.parent,N)},a)},o.deactivate=N=>{let v=s.get(N.key==null?N.type:N.key);if(!v||v.component!==N.component)return!1;let y=N.component;return zr(y.m),zr(y.a),u(N,p,null,1,a),Oe(()=>{y.da&&xn(y.da);let g=N.props&&N.props.onVnodeUnmounted;g&&st(g,y.parent,N),y.isDeactivated=!0},a),!0};function d(N){Lr(N),f(N,n,a,!0)}function _(N){s.forEach((v,y)=>{let g=ei(cn(v)?v.type.__asyncResolved||{}:v.type);g&&!N(g)&&m(y)})}function m(N){let v=s.get(N);v&&(!i||!wt(v,i))?d(v):i&&(Lr(i),v&&Lr(v)),s.delete(N),r.delete(N)}Vo(()=>[e.include,e.exclude],([N,v])=>{N&&_(y=>ms(N,y)),v&&_(y=>!ms(v,y))},{flush:"post",deep:!0});let b=null,x=()=>{if(b!=null)if(Gr(n.subTree.type)){let N=()=>{let v=$r(n.subTree);v.component&&s.set(b,v)};n.subTree.suspense.pendingBranch?Oe(N,n.subTree.suspense):N()}else s.set(b,$r(n.subTree))};return Cs(x),ai(x),rl(()=>{s.forEach(N=>{let{subTree:v,suspense:y}=n,g=$r(v);if(N.type===g.type&&N.key===g.key){Lr(g);let D=g.component.da;D&&Oe(D,y);return}d(N)})}),()=>{if(b=null,!t.default)return i=null;let N=t.default(),v=N[0];if(N.length>1)return i=null,N;if(!pn(v)||!(v.shapeFlag&4)&&!(v.shapeFlag&128))return i=null,v;let y=$r(v);if(y.type===xe)return i=null,y;let g=y.type,D=ei(cn(y)?y.type.__asyncResolved||{}:g),{include:k,exclude:S,max:O}=e;if(k&&(!D||!ms(k,D))||S&&D&&ms(S,D))return y.shapeFlag&=-257,i=y,v;let V=y.key==null?g:y.key,M=s.get(V);return y.el&&(y=Xt(y),v.shapeFlag&128&&(v.ssContent=y)),b=V,M?(y.el=M.el,y.component=M.component,y.transition&&Ct(y,y.transition),y.shapeFlag|=512,r.delete(V),r.add(V)):(r.add(V),O&&r.size>parseInt(O,10)&&m(r.values().next().value)),y.shapeFlag|=256,i=y,Gr(v.type)?v:y}}},hg=dg;function ms(e,t){return H(e)?e.some(n=>ms(n,t)):z(e)?e.split(",").includes(t):Zc(e)?(e.lastIndex=0,e.test(t)):!1}function mg(e,t){hf(e,"a",t)}function gg(e,t){hf(e,"da",t)}function hf(e,t,n=He){let o=e.__wdc||(e.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(ys(t,o,n),n){let s=n.parent;for(;s&&s.parent;)ws(s.parent.vnode)&&vg(o,t,n,s),s=s.parent}}function vg(e,t,n,o){let s=ys(t,e,o,!0),r=ys("um",()=>ts(o[t],s),n);r.flags=16}function Lr(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function $r(e){return e.shapeFlag&128?e.ssContent:e}function ys(e,t,n=He,o=!1){if(n){let s=n[e]||(n[e]=[]),r=t.__weh||(t.__weh=(...i)=>{xt();let a=fi(n),l=gt(t,n,e,i);return a(),Tt(),l});return o?s.unshift(r):s.push(r),r}}var dn=e=>(t,n=He)=>{(!to||e==="sp")&&ys(e,(...o)=>t(...o),n)},Eg=dn("bm"),Cs=dn("m"),sl=dn("bu"),ai=dn("u"),rl=dn("bum"),il=dn("um"),_g=dn("sp"),yg=dn("rtg"),bg=dn("rtc");function Ng(e,t=He){ys("ec",e,t)}var al="components",Sg="directives";function xg(e,t){return ll(al,e,!0,t)||e}var mf=Symbol.for("v-ndc");function Tg(e){return z(e)?ll(al,e,!1)||e:e||mf}function Og(e){return ll(Sg,e)}function ll(e,t,n=!0,o=!1){let s=je||He;if(s){let r=s.type;if(e===al){let a=ei(r,!1);if(a&&(a===t||a===le(t)||a===St(le(t))))return r}let i=Gu(s[e]||r[e],t)||Gu(s.appContext[e],t);return!i&&o?r:i}}function Gu(e,t){return e&&(e[t]||e[le(t)]||e[St(le(t))])}function wg(e,t,n,o){let s,r=n&&n[o],i=H(e);if(i||z(e)){let a=i&&pt(e),l=!1,u=!1;a&&(l=!$e(e),u=Ze(e),e=fs(e)),s=new Array(e.length);for(let f=0,c=e.length;f<c;f++)s[f]=t(l?u?rn(dt(e[f])):dt(e[f]):e[f],f,void 0,r&&r[f])}else if(typeof e=="number")if(!Number.isInteger(e)||e<0)s=[];else{s=new Array(e);for(let a=0;a<e;a++)s[a]=t(a+1,a,void 0,r&&r[a])}else if(re(e))if(e[Symbol.iterator])s=Array.from(e,(a,l)=>t(a,l,void 0,r&&r[l]));else{let a=Object.keys(e);s=new Array(a.length);for(let l=0,u=a.length;l<u;l++){let f=a[l];s[l]=t(e[f],f,l,r&&r[l])}}else s=[];return n&&(n[o]=s),s}function Cg(e,t){for(let n=0;n<t.length;n++){let o=t[n];if(H(o))for(let s=0;s<o.length;s++)e[o[s].name]=o[s].fn;else o&&(e[o.name]=o.key?(...s)=>{let r=o.fn(...s);return r&&(r.key=o.key),r}:o.fn)}return e}function Ag(e,t,n,o,s,r){if(n==null&&(n={}),je.ce||je.parent&&cn(je.parent)&&je.parent.ce){let u=r!=null&&n.key==null?q({},n,{key:r}):n,f=Object.keys(u).length>0;return t!=="default"&&(u.name=t),Ns(),Jr(Ve,null,[ye("slot",u,o&&o())],f?-2:64)}let i=e[t];i&&i._c&&(i._d=!1);let a=fn.length;Ns();let l;try{let u=i&&cl(i(n)),f=n.key||r||u&&u.key;l=Jr(Ve,{key:(f&&!Ae(f)?f:`_${t}`)+(!u&&o?"_fb":"")},u||(o?o():[]),u&&e._===1?64:-2)}catch(u){for(let f=fn.length;f>a;f--)ui();throw u}finally{i&&i._c&&(i._d=!0)}return!s&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),l}function cl(e){return e.some(t=>pn(t)?!(t.type===xe||t.type===Ve&&!cl(t.children)):!0)?e:null}function Dg(e,t){let n={};for(let o in e)n[t&&/[A-Z]/.test(o)?`on:${o}`:nn(o)]=e[o];return n}var Xa=e=>e?Ff(e)?As(e):Xa(e.parent):null;var gs=q(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Xa(e.parent),$root:e=>Xa(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>e.type,$forceUpdate:e=>e.f||(e.f=()=>{ti(e.update)}),$nextTick:e=>e.n||(e.n=Ts.bind(e.proxy)),$watch:e=>De});var Ha=(e,t)=>e!==Z&&!e.__isScriptSetup&&ae(e,t),za={get({_:e},t){if(t==="__v_skip")return!0;let{ctx:n,setupState:o,data:s,props:r,accessCache:i,type:a,appContext:l}=e;if(t[0]!=="$"){let p=i[t];if(p!==void 0)switch(p){case 1:return o[t];case 2:return s[t];case 4:return n[t];case 3:return r[t]}else{if(Ha(o,t))return i[t]=1,o[t];if(ae(r,t))return i[t]=3,r[t];if(n!==Z&&ae(n,t))return i[t]=4,n[t];i[t]=0}}let u=gs[t],f,c;if(u)return t==="$attrs"&&Be(e.attrs,"get",""),u(e);if((f=a.__cssModules)&&(f=f[t]))return f;if(n!==Z&&ae(n,t))return i[t]=4,n[t];if(c=l.config.globalProperties,ae(c,t))return c[t]},set({_:e},t,n){let{data:o,setupState:s,ctx:r}=e;return Ha(s,t)?(s[t]=n,!0):ae(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(r[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:o,appContext:s,props:r,type:i}},a){let l;return!!(n[a]||Ha(t,a)||ae(r,a)||ae(o,a)||ae(gs,a)||ae(s.config.globalProperties,a)||(l=i.__cssModules)&&l[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:ae(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},kg=q({},za,{get(e,t){if(t!==Symbol.unscopables)return za.get(e,t,e)},has(e,t){return t[0]!=="_"&&!nu(t)}});function Ig(){return null}function Vg(){return null}function Rg(e){}function Pg(e){}function Mg(){return null}function Lg(){}function $g(e,t){return null}function Fg(){return gf("useSlots").slots}function Ug(){return gf("useAttrs").attrs}function gf(e){let t=ze();return t.setupContext||(t.setupContext=Wf(t))}function Ga(e){return H(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}function Bg(e,t){let n=Ga(e);for(let o in t){if(o.startsWith("__skip"))continue;let s=n[o];s?H(s)||Q(s)?s=n[o]={type:s,default:t[o]}:s.default=t[o]:s===null&&(s=n[o]={default:t[o]}),s&&t[`__skip_${o}`]&&(s.skipFactory=!0)}return n}function Hg(e,t){return!e||!t?e||t:H(e)&&H(t)?e.concat(t):q({},Ga(e),Ga(t))}function jg(e,t){let n={};for(let o in e)t.includes(o)||Object.defineProperty(n,o,{enumerable:!0,get:()=>e[o]});return n}function Wg(e){let t=ze(),n=to,o=e();xs(),n&&An(!1);let s=()=>{fi(t),n&&An(!0)},r=()=>{ze()!==t&&t.scope.off(),xs(),n&&An(!1)};return mr(o)&&(o=o.catch(i=>{throw s(),Promise.resolve().then(()=>Promise.resolve().then(r)),i})),[o,()=>{s(),Promise.resolve().then(r)}]}function vf(){return{app:null,config:{isNativeTag:Sn,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var Kg=0;function Xg(e,t){return function(o,s=null){Q(o)||(o=q({},o)),s!=null&&!re(s)&&(s=null);let r=vf(),i=new WeakSet,a=[],l=!1,u=r.app={_uid:Kg++,_component:o,_props:s,_container:null,_context:r,_instance:null,version:Gf,get config(){return r.config},set config(f){},use(f,...c){return i.has(f)||(f&&Q(f.install)?(i.add(f),f.install(u,...c)):Q(f)&&(i.add(f),f(u,...c))),u},mixin(f){return u},component(f,c){return c?(r.components[f]=c,u):r.components[f]},directive(f,c){return c?(r.directives[f]=c,u):r.directives[f]},mount(f,c,p){if(!l){let d=u._ceVNode||ye(o,s);return d.appContext=r,p===!0?p="svg":p===!1&&(p=void 0),c&&t?t(d,f):e(d,f,p),l=!0,u._container=f,f.__vue_app__=u,As(d.component)}},onUnmount(f){a.push(f)},unmount(){l&&(gt(a,u._instance,16),e(null,u._container),delete u._container.__vue_app__)},provide(f,c){return r.provides[f]=c,u},runWithContext(f){let c=Qn;Qn=u;try{return f()}finally{Qn=c}}};return u}}var Qn=null;function zg(e,t,n=Z){let o=ze(),s=le(t),r=Ke(t),i=Ef(e,s),a=Ir((l,u)=>{let f,c=Z,p;return cf(()=>{let d=e[s];ke(f,d)&&(f=d,u())}),{get(){return l(),n.get?n.get(f):f},set(d){let _=n.set?n.set(d):d;if(!ke(_,f)&&!(c!==Z&&ke(d,c)))return;let m=o.vnode.props,b=!!(m&&(t in m||s in m||r in m)&&(`onUpdate:${t}`in m||`onUpdate:${s}`in m||`onUpdate:${r}`in m));b||(f=d,u()),o.emit(`update:${t}`,_),ke(d,c)&&(ke(d,_)&&!ke(_,p)||b&&c!==Z&&!ke(_,f))&&u(),c=d,p=_}}});return a[Symbol.iterator]=()=>{let l=0;return{next(){return l<2?{value:l++?i||Z:a,done:!1}:{done:!0}}}},a}var Ef=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${le(t)}Modifiers`]||e[`${Ke(t)}Modifiers`];function Gg(e,t,...n){if(e.isUnmounted)return;let o=e.vnode.props||Z,s=n,r=t.startsWith("update:"),i=r&&Ef(o,t.slice(7));i&&(i.trim&&(s=n.map(f=>z(f)?f.trim():f)),i.number&&(s=s.map(Hn)));let a,l=o[a=nn(t)]||o[a=nn(le(t))];!l&&r&&(l=o[a=nn(Ke(t))]),l&&gt(l,e,6,s);let u=o[a+"Once"];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,gt(u,e,6,s)}}function qg(e,t,n=!1){let o=t.emitsCache,s=o.get(e);if(s!==void 0)return s;let r=e.emits,i={};return!r&&!!1?(re(e)&&o.set(e,null),null):(H(r)?r.forEach(l=>i[l]=null):q(i,r),re(e)&&o.set(e,i),i)}function li(e,t){return!e||!Ft(t)?!1:(t=t.slice(2),t=t==="Once"?t:t.replace(/Once$/,""),ae(e,t[0].toLowerCase()+t.slice(1))||ae(e,Ke(t))||ae(e,t))}function Ur(e){let{type:t,vnode:n,proxy:o,withProxy:s,propsOptions:[r],slots:i,attrs:a,emit:l,render:u,renderCache:f,props:c,data:p,setupState:d,ctx:_,inheritAttrs:m}=e,b=Es(e),x,N;try{if(n.shapeFlag&4){let g=s||o,D=g;x=rt(u.call(D,g,f,c,d,p,_)),N=a}else{let g=t;x=rt(g.length>1?g(c,{attrs:a,slots:i,emit:l}):g(c,null)),N=t.props?a:Jg(a)}}catch(g){fn.length=0,oo(g,e,1),x=ye(xe)}let v=x,y;if(N&&m!==!1){let g=Object.keys(N),{shapeFlag:D}=v;g.length&&D&7&&(r&&g.some(yo)&&(N=Yg(N,r)),v=Xt(v,N,!1,!0))}if(n.dirs&&(v=Xt(v,null,!1,!0),v.dirs=v.dirs?v.dirs.concat(n.dirs):n.dirs),n.transition){let g=si(v.type)&&Wr(v)||v;Ct(g,n.transition)}return x=v,Es(b),x}function ul(e,t=!0){let n;for(let o=0;o<e.length;o++){let s=e[o];if(pn(s)){if(s.type!==xe||s.children==="v-if"){if(n)return;n=s}}else return}return n}var Jg=e=>{let t;for(let n in e)(n==="class"||n==="style"||Ft(n))&&((t||(t={}))[n]=e[n]);return t},Yg=(e,t)=>{let n={};for(let o in e)(!yo(o)||!(o.slice(9)in t))&&(n[o]=e[o]);return n};function Qg(e,t,n){let{props:o,children:s,component:r}=e,{props:i,children:a,patchFlag:l}=t,u=r.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return o?qu(o,i,u):!!i;if(l&8){let f=t.dynamicProps;for(let c=0;c<f.length;c++){let p=f[c];if(_f(i,o,p)&&!li(u,p))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:o===i?!1:o?i?qu(o,i,u):!0:!!i;return!1}function qu(e,t,n){let o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let s=0;s<o.length;s++){let r=o[s];if(!ae(e,r)||_f(t,e,r)&&!li(n,r))return!0}return!1}function _f(e,t,n){let o=e[n],s=t[n];return n==="style"&&re(o)&&re(s)?!ot(o,s):o!==s}function ci({vnode:e,parent:t,suspense:n},o){for(;t;){let s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.suspense.vnode.el=s.el=o,e=s),s===e)(e=t.vnode).el=o,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=o)}var yf={},bf=()=>Object.create(yf),Nf=e=>Object.getPrototypeOf(e)===yf;function Zg(e,t,n,o=!1){let s={},r=bf();e.propsDefaults=Object.create(null),Sf(e,t,s,r);for(let i in e.propsOptions[0])i in s||(s[i]=void 0);n?e.props=o?s:Cr(s):e.type.props?e.props=s:e.props=r,e.attrs=r}function ev(e,t,n,o){let{props:s,attrs:r,vnode:{patchFlag:i}}=e,a=Y(s),[l]=e.propsOptions,u=!1;if((o||i>0)&&!(i&16)){if(i&8){let f=e.vnode.dynamicProps;for(let c=0;c<f.length;c++){let p=f[c];if(li(e.emitsOptions,p))continue;let d=t[p];if(l)if(ae(r,p))d!==r[p]&&(r[p]=d,u=!0);else{let _=le(p);s[_]=qa(l,a,_,d,e,!1)}else d!==r[p]&&(r[p]=d,u=!0)}}}else{Sf(e,t,s,r)&&(u=!0);let f;for(let c in a)(!t||!ae(t,c)&&((f=Ke(c))===c||!ae(t,f)))&&(l?n&&(n[c]!==void 0||n[f]!==void 0)&&(s[c]=qa(l,a,c,void 0,e,!0)):delete s[c]);if(r!==a)for(let c in r)(!t||!ae(t,c))&&(delete r[c],u=!0)}u&&Bt(e.attrs,"set","")}function Sf(e,t,n,o){let[s,r]=e.propsOptions,i=!1,a;if(t)for(let l in t){if(Pt(l))continue;let u=t[l],f;s&&ae(s,f=le(l))?!r||!r.includes(f)?n[f]=u:(a||(a={}))[f]=u:li(e.emitsOptions,l)||(!(l in o)||u!==o[l])&&(o[l]=u,i=!0)}if(r){let l=Y(n),u=a||Z;for(let f=0;f<r.length;f++){let c=r[f];n[c]=qa(s,l,c,u[c],e,!ae(u,c))}}return i}function qa(e,t,n,o,s,r){let i=e[n];if(i!=null){let a=ae(i,"default");if(a&&o===void 0){let l=i.default;if(i.type!==Function&&!i.skipFactory&&Q(l)){let{propsDefaults:u}=s;if(n in u)o=u[n];else{let f=fi(s);o=u[n]=l.call(null,t),f()}}else o=l;s.ce&&s.ce._setProp(n,o)}i[0]&&(r&&!a?o=!1:i[1]&&(o===""||o===Ke(n))&&(o=!0))}return o}function tv(e,t,n=!1){let o=t.propsCache,s=o.get(e);if(s)return s;let r=e.props,i={},a=[];if(!r&&!!1)return re(e)&&o.set(e,Nn),Nn;if(H(r))for(let f=0;f<r.length;f++){let c=le(r[f]);Ju(c)&&(i[c]=Z)}else if(r)for(let f in r){let c=le(f);if(Ju(c)){let p=r[f],d=i[c]=H(p)||Q(p)?{type:p}:q({},p),_=d.type,m=!1,b=!0;if(H(_))for(let x=0;x<_.length;++x){let N=_[x],v=Q(N)&&N.name;if(v==="Boolean"){m=!0;break}else v==="String"&&(b=!1)}else m=Q(_)&&_.name==="Boolean";d[0]=m,d[1]=b,(m||ae(d,"default"))&&a.push(c)}}let u=[i,a];return re(e)&&o.set(e,u),u}function Ju(e){return e[0]!=="$"&&!Pt(e)}var fl=e=>e==="_"||e==="_ctx"||e==="$stable",pl=e=>H(e)?e.map(rt):[rt(e)],nv=(e,t,n)=>{if(t._n)return t;let o=tl((...s)=>pl(t(...s)),n);return o._c=!1,o},xf=(e,t,n)=>{let o=e._ctx;for(let s in e){if(fl(s))continue;let r=e[s];if(Q(r))t[s]=nv(s,r,o);else if(r!=null){let i=pl(r);t[s]=()=>i}}},Tf=(e,t)=>{let n=pl(t);e.slots.default=()=>n},Of=(e,t,n)=>{for(let o in t)(n||!fl(o))&&(e[o]=t[o])},ov=(e,t,n)=>{let o=e.slots=bf();if(e.vnode.shapeFlag&32){let s=t._;s?(Of(o,t,n),n&&vr(o,"_",s,!0)):xf(t,o)}else t&&Tf(e,t)},sv=(e,t,n)=>{let{vnode:o,slots:s}=e,r=!0,i=Z;if(o.shapeFlag&32){let a=t._;a?n&&a===1?r=!1:Of(s,t,n):(r=!t.$stable,xf(t,s)),i=t}else t&&(Tf(e,t),i={default:1});if(r)for(let a in s)!fl(a)&&i[a]==null&&delete s[a]};function rv(){let e=[]}var Oe=qr;function dl(e){return wf(e)}function hl(e){return wf(e,Ym)}function wf(e,t){rv();let n=os();n.__VUE__=!0;let{insert:o,remove:s,patchProp:r,createElement:i,createText:a,createComment:l,setText:u,setElementText:f,parentNode:c,nextSibling:p,setScopeId:d=De,insertStaticContent:_}=e,m=(h,E,T,R=null,C=null,I=null,U=void 0,F=null,L=!!E.dynamicChildren)=>{if(h===E)return;h&&!wt(h,E)&&(R=er(h),Qe(h,C,I,!0),h=null),E.patchFlag===-2&&(L=!1,E.dynamicChildren=null),E.dynamicChildren&&h&&h.dynamicChildren&&h.dynamicChildren.hasOnce&&(E.dynamicChildren===Nn&&(E.dynamicChildren=[]),E.dynamicChildren.hasOnce=!0);let{type:A,ref:X,shapeFlag:B}=E;switch(A){case Cn:b(h,E,T,R);break;case xe:x(h,E,T,R);break;case un:h==null&&N(E,T,R,U);break;case Ve:$(h,E,T,R,C,I,U,F,L);break;default:B&1?D(h,E,T,R,C,I,U,F,L):B&6?P(h,E,T,R,C,I,U,F,L):(B&64||B&128)&&A.process(h,E,T,R,C,I,U,F,L,ho)}X!=null&&C?Do(X,h&&h.ref,I,E||h,!E):X==null&&h&&h.ref!=null&&Do(h.ref,null,I,h,!0)},b=(h,E,T,R)=>{if(h==null)o(E.el=a(E.children),T,R);else{let C=E.el=h.el;E.children!==h.children&&u(C,E.children)}},x=(h,E,T,R)=>{h==null?o(E.el=l(E.children||""),T,R):E.el=h.el},N=(h,E,T,R)=>{[h.el,h.anchor]=_(h.children,E,T,R,h.el,h.anchor)},v=(h,E,T,R)=>{if(E.children!==h.children){let C=p(h.anchor);g(h),[E.el,E.anchor]=_(E.children,T,C,R)}else E.el=h.el,E.anchor=h.anchor},y=({el:h,anchor:E},T,R)=>{let C;for(;h&&h!==E;)C=p(h),o(h,T,R),h=C;o(E,T,R)},g=({el:h,anchor:E})=>{let T;for(;h&&h!==E;)T=p(h),s(h),h=T;s(E)},D=(h,E,T,R,C,I,U,F,L)=>{if(E.type==="svg"?U="svg":E.type==="math"&&(U="mathml"),h==null)k(E,T,R,C,I,U,F,L);else{let A=h.el&&h.el._isVueCE?h.el:null;try{A&&A._beginPatch(),V(h,E,C,I,U,F,L)}finally{A&&A._endPatch()}}},k=(h,E,T,R,C,I,U,F)=>{let L,A,{props:X,shapeFlag:B,transition:K,dirs:G}=h;if(L=h.el=i(h.type,I,X&&X.is,X),B&8?f(L,h.children):B&16&&O(h.children,L,null,R,C,ja(h,I),U,F),G&&jt(h,null,R,"created"),S(L,h,h.scopeId,U,R),X){for(let me in X)me!=="value"&&!Pt(me)&&r(L,me,null,X[me],I,R);"value"in X&&r(L,"value",null,X.value,I),(A=X.onVnodeBeforeMount)&&st(A,R,h)}G&&jt(h,null,R,"beforeMount");let ce=Cf(C,K);ce?K.beforeEnter(L):K&&!K.persisted&&(L[Ya]=!0),o(L,E,T),((A=X&&X.onVnodeMounted)||ce||G)&&Oe(()=>{let de;A&&st(A,R,h),ce&&K.enter(L),G&&jt(h,null,R,"mounted")},C)},S=(h,E,T,R,C)=>{if(T&&d(h,T),R)for(let I=0;I<R.length;I++)d(h,R[I]);if(C){let I=C.subTree;if(E===I||Gr(I.type)&&(I.ssContent===E||I.ssFallback===E)){let U=C.vnode;S(h,U,U.scopeId,U.slotScopeIds,C.parent)}}},O=(h,E,T,R,C,I,U,F,L=0)=>{for(let A=L;A<h.length;A++){let X=h[A]=F?ln(h[A]):rt(h[A]);m(null,X,E,T,R,C,I,U,F)}},V=(h,E,T,R,C,I,U)=>{let F=E.el=h.el,{patchFlag:L,dynamicChildren:A,dirs:X}=E;L|=h.patchFlag&16;let B=h.props||Z,K=E.props||Z,G;if(T&&qn(T,!1),(G=K.onVnodeBeforeUpdate)&&st(G,T,E,h),X&&jt(E,h,T,"beforeUpdate"),T&&qn(T,!0),A&&(!h.dynamicChildren||h.dynamicChildren.length!==A.length)&&(L=0,U=!1,A=null),(B.innerHTML&&K.innerHTML==null||B.textContent&&K.textContent==null)&&f(F,""),A?M(h.dynamicChildren,A,F,T,R,ja(E,C),I):U||he(h,E,F,null,T,R,ja(E,C),I,!1),L>0){if(L&16)w(F,B,K,T,C);else if(L&2&&B.class!==K.class&&r(F,"class",null,K.class,C),L&4&&r(F,"style",B.style,K.style,C),L&8){let ce=E.dynamicProps;for(let me=0;me<ce.length;me++){let de=ce[me],Ce=B[de],Le=K[de];(Le!==Ce||de==="value")&&r(F,de,Ce,Le,C,T)}}L&1&&h.children!==E.children&&f(F,E.children)}else!U&&A==null&&w(F,B,K,T,C);((G=K.onVnodeUpdated)||X)&&Oe(()=>{G&&st(G,T,E,h),X&&jt(E,h,T,"updated")},R)},M=(h,E,T,R,C,I,U)=>{for(let F=0;F<E.length;F++){let L=h[F],A=E[F],X=L.el||ko(L),B=X&&(L.type===Ve||!wt(L,A)||L.shapeFlag&198)?c(X):T;m(L,A,B,null,R,C,I,U,!0)}},w=(h,E,T,R,C)=>{if(E!==T){if(E!==Z)for(let I in E)!Pt(I)&&!(I in T)&&r(h,I,E[I],null,C,R);for(let I in T){if(Pt(I))continue;let U=T[I],F=E[I];U!==F&&I!=="value"&&r(h,I,F,U,C,R)}"value"in T&&r(h,"value",E.value,T.value,C)}},$=(h,E,T,R,C,I,U,F,L)=>{let A=E.el=h?h.el:a(""),X=E.anchor=h?h.anchor:a(""),{patchFlag:B,dynamicChildren:K,slotScopeIds:G}=E;G&&(F=F?F.concat(G):G),h==null?(o(A,T,R),o(X,T,R),O(E.children||[],T,X,C,I,U,F,L)):B>0&&B&64&&K&&h.dynamicChildren&&h.dynamicChildren.length===K.length?(M(h.dynamicChildren,K,T,C,I,U,F),(E.key!=null||C&&E===C.subTree)&&ml(h,E,!0)):he(h,E,T,X,C,I,U,F,L)},P=(h,E,T,R,C,I,U,F,L)=>{E.slotScopeIds=F,h==null?E.shapeFlag&512?C.ctx.activate(E,T,R,U,L):W(E,T,R,C,I,U,L):j(h,E,L)},W=(h,E,T,R,C,I,U)=>{let F=h.component=$f(h,R,C);if(ws(h)&&(F.ctx.renderer=ho),Uf(F,!1,U),F.asyncDep){if(C&&C.registerDep(F,ie,U,I),!h.el){let L=F.subTree=ye(xe);x(null,L,E,T),h.placeholder=L.el}}else ie(F,h,E,T,C,I,U)},j=(h,E,T)=>{let R=E.component=h.component;if(Qg(h,E,T))if(R.asyncDep&&!R.asyncResolved){E.el=h.el,E.placeholder=h.placeholder,fe(R,E,T);return}else R.next=E,R.update();else E.el=h.el,E.placeholder=h.placeholder,R.vnode=E},ie=(h,E,T,R,C,I,U)=>{let F=()=>{if(h.isMounted){let{next:B,bu:K,u:G,parent:ce,vnode:me}=h;{let ut=Af(h);if(ut){B&&(B.el=me.el,fe(h,B,U)),ut.asyncDep.then(()=>{let Jt=()=>{h.job.flags&8||(C&&C.pendingBranch?Oe(Jt,C):A())};Jt.flags=48,Oe(Jt,C)});return}}let de=B,Ce;qn(h,!1),B?(B.el=me.el,fe(h,B,U)):B=me,K&&xn(K),(Ce=B.props&&B.props.onVnodeBeforeUpdate)&&st(Ce,ce,B,me),qn(h,!0);let Le=Ur(h),yt=h.subTree;h.subTree=Le,m(yt,Le,c(yt.el||ko(yt)),er(yt),h,C,I),B.el=Le.el,de===null&&ci(h,Le.el),G&&Oe(G,C),(Ce=B.props&&B.props.onVnodeUpdated)&&Oe(()=>st(Ce,ce,B,me),C)}else{let B,{el:K,props:G}=E,{bm:ce,m:me,parent:de,root:Ce,type:Le}=h,yt=cn(E);if(qn(h,!1),ce&&xn(ce),!yt&&(B=G&&G.onVnodeBeforeMount)&&st(B,de,E),qn(h,!0),K&&Ji){let ut=()=>{h.subTree=Ur(h),Ji(K,h.subTree,h,C,null)};yt&&Le.__asyncHydrate?Le.__asyncHydrate(K,h,ut):ut()}else{Ce.ce&&Ce.ce._hasShadowRoot()&&Ce.ce._injectChildStyle(Le,h.parent?h.parent.type:void 0);let ut=h.subTree=Ur(h);m(null,ut,T,R,h,C,I),E.el=ut.el}if(me&&Oe(me,C),!yt&&(B=G&&G.onVnodeMounted)){let ut=E;Oe(()=>st(B,de,ut),C)}(E.shapeFlag&256||de&&cn(de.vnode)&&de.vnode.shapeFlag&256)&&h.a&&Oe(h.a,C),h.isMounted=!0,E=T=R=null}};h.scope.on();let L=h.effect=new sn(F);h.scope.off();let A=h.update=L.run.bind(L),X=h.job=L.runIfDirty.bind(L);X.i=h,X.id=h.uid,L.scheduler=()=>ti(X),qn(h,!0),A()},fe=(h,E,T)=>{E.component=h;let R=h.vnode.props;h.vnode=E,h.next=null,ev(h,E.props,R,T),sv(h,E.children,T),xt(),nf(h),Tt()},he=(h,E,T,R,C,I,U,F,L=!1)=>{let A=h&&h.children,X=h?h.shapeFlag:0,B=E.children,{patchFlag:K,shapeFlag:G}=E;if(K>0){if(K&128){Me(A,B,T,R,C,I,U,F,L);return}else if(K&256){se(A,B,T,R,C,I,U,F,L);return}}G&8?(X&16&&Xo(A,C,I),B!==A&&f(T,B)):X&16?G&16?Me(A,B,T,R,C,I,U,F,L):Xo(A,C,I,!0):(X&8&&f(T,""),G&16&&O(B,T,R,C,I,U,F,L))},se=(h,E,T,R,C,I,U,F,L)=>{h=h||Nn,E=E||Nn;let A=h.length,X=E.length,B=Math.min(A,X),K;for(K=0;K<B;K++){let G=E[K]=L?ln(E[K]):rt(E[K]);m(h[K],G,T,null,C,I,U,F,L)}A>X?Xo(h,C,I,!0,!1,B):O(E,T,R,C,I,U,F,L,B)},Me=(h,E,T,R,C,I,U,F,L)=>{let A=0,X=E.length,B=h.length-1,K=X-1;for(;A<=B&&A<=K;){let G=h[A],ce=E[A]=L?ln(E[A]):rt(E[A]);if(wt(G,ce))m(G,ce,T,null,C,I,U,F,L);else break;A++}for(;A<=B&&A<=K;){let G=h[B],ce=E[K]=L?ln(E[K]):rt(E[K]);if(wt(G,ce))m(G,ce,T,null,C,I,U,F,L);else break;B--,K--}if(A>B){if(A<=K){let G=K+1,ce=G<X?E[G].el:R;for(;A<=K;)m(null,E[A]=L?ln(E[A]):rt(E[A]),T,ce,C,I,U,F,L),A++}}else if(A>K)for(;A<=B;)Qe(h[A],C,I,!0),A++;else{let G=A,ce=A,me=new Map;for(A=ce;A<=K;A++){let ft=E[A]=L?ln(E[A]):rt(E[A]);ft.key!=null&&me.set(ft.key,A)}let de,Ce=0,Le=K-ce+1,yt=!1,ut=0,Jt=new Array(Le);for(A=0;A<Le;A++)Jt[A]=0;for(A=G;A<=B;A++){let ft=h[A];if(Ce>=Le){Qe(ft,C,I,!0);continue}let $t;if(ft.key!=null)$t=me.get(ft.key);else for(de=ce;de<=K;de++)if(Jt[de-ce]===0&&wt(ft,E[de])){$t=de;break}$t===void 0?Qe(ft,C,I,!0):(Jt[$t-ce]=A+1,$t>=ut?ut=$t:yt=!0,m(ft,E[$t],T,null,C,I,U,F,L),Ce++)}let Cc=yt?iv(Jt):Nn;for(de=Cc.length-1,A=Le-1;A>=0;A--){let ft=ce+A,$t=E[ft],Ac=E[ft+1],Dc=ft+1<X?Ac.el||ko(Ac):R;Jt[A]===0?m(null,$t,T,Dc,C,I,U,F,L):yt&&(de<0||A!==Cc[de]?ge($t,T,Dc,2):de--)}}},ge=(h,E,T,R,C=null)=>{let{el:I,type:U,transition:F,children:L,shapeFlag:A}=h;if(A&6){ge(h.component.subTree,E,T,R);return}if(A&128){h.suspense.move(E,T,R);return}if(A&64){U.move(h,E,T,ho);return}if(U===Ve){o(I,E,T);for(let B=0;B<L.length;B++)ge(L[B],E,T,R);o(h.anchor,E,T);return}if(U===un){y(h,E,T);return}if(R!==2&&A&1&&F)if(R===0)F.persisted&&!I[mt]?o(I,E,T):(F.beforeEnter(I),o(I,E,T),Oe(()=>F.enter(I),C));else{let{leave:B,delayLeave:K,afterLeave:G}=F,ce=()=>{h.ctx.isUnmounted?s(I):o(I,E,T)},me=()=>{let de=I._isLeaving||!!I[mt];I._isLeaving&&I[mt](!0),F.persisted&&!de?ce():B(I,()=>{ce(),G&&G()})};K?K(I,ce,me):me()}else o(I,E,T)},Qe=(h,E,T,R=!1,C=!1)=>{let{type:I,props:U,ref:F,children:L,dynamicChildren:A,shapeFlag:X,patchFlag:B,dirs:K,cacheIndex:G,memo:ce}=h;if((B===-2||A&&A.hasOnce)&&(C=!1),F!=null&&(xt(),Do(F,null,T,h,!0),Tt()),G!=null&&(!h.ctx||h.ctx===E)&&(E.renderCache[G]=void 0),X&256&&E.ctx.deactivate(h))return;let me=X&1&&K,de=!cn(h),Ce;if(de&&(Ce=U&&U.onVnodeBeforeUnmount)&&st(Ce,E,h),X&6)Ch(h.component,T,R);else{if(X&128){h.suspense.unmount(T,R);return}me&&jt(h,null,E,"beforeUnmount"),X&64?h.type.remove(h,E,T,ho,R):A&&!A.hasOnce&&(I!==Ve||B>0&&B&64)?Xo(A,E,T,!1,!0):(I===Ve&&B&384||!C&&X&16)&&Xo(L,E,T),R&&Gi(h)}let Le=ce!=null&&G==null;(de&&(Ce=U&&U.onVnodeUnmounted)||me||Le)&&Oe(()=>{Ce&&st(Ce,E,h),me&&jt(h,null,E,"unmounted"),Le&&(h.el=null)},T)},Gi=h=>{let{type:E,el:T,anchor:R,transition:C}=h,I=E===Ve;if(I&&!C){Oc(T,R);return}if(E===un){g(h),C&&!C.persisted&&C.afterLeave&&C.afterLeave();return}let U=I?_s(h):h,F=()=>{I?c(T)&&Oc(T,R):s(T),C&&!C.persisted&&C.afterLeave&&C.afterLeave()};if(U&&U.shapeFlag&1&&C&&!C.persisted){let{leave:L,delayLeave:A}=C,X=U.el,B=()=>L(X,F);A?A(X,F,B):B()}else F()},Oc=(h,E)=>{let T;for(;h!==E;)T=p(h),s(h),h=T;s(E)},Ch=(h,E,T)=>{let{bum:R,scope:C,job:I,subTree:U,um:F,m:L,a:A}=h;zr(L),zr(A),R&&xn(R),C.stop(),I?(I.flags|=8,Qe(U,h,E,T)):U&&(U.transition=h.vnode.transition,Qe(U,h,E,T)),F&&Oe(F,E);let X=()=>{h.isUnmounted=!0};X.flags=16,Oe(X,E)},Xo=(h,E,T,R=!1,C=!1,I=0)=>{for(let U=I;U<h.length;U++)Qe(h[U],E,T,R,C)},er=h=>{if(h.shapeFlag&6)return er(h.component.subTree);if(h.shapeFlag&128)return h.suspense.next();let E=p(h.anchor||h.el),T=E&&E[uf];return T?p(T):E},wc=(h,E,T)=>{let R=h&&E._vnode?void 0:h&&h.component?h.component.uid:yv();Im(()=>{h==null?E._vnode&&Qe(E._vnode,null,null,!0):m(E._vnode||null,h,E,null,null,null,T),E._vnode=h},R)},ho={p:m,um:Qe,m:ge,r:Gi,mt:W,mc:O,pc:he,pbc:M,n:er,o:e},qi,Ji;return t&&([qi,Ji]=t(ho)),{render:wc,hydrate:qi,createApp:Xg(wc,qi)}}function ja({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function qn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Cf(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function ml(e,t,n=!1){let o=e.children,s=t.children;if(H(o)&&H(s))for(let r=0;r<o.length;r++){let i=o[r],a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=ln(s[r]),a.el=i.el),!n&&a.patchFlag!==-2&&ml(i,a)),a.type===Cn&&(a.patchFlag===-1&&(a=s[r]=ln(a)),a.el=i.el),a.type===xe&&!a.el&&(a.el=i.el)}}function iv(e){let t=e.slice(),n=[0],o,s,r,i,a,l=e.length;for(o=0;o<l;o++){let u=e[o];if(u!==0){if(s=n[n.length-1],e[s]<u){t[o]=s,n.push(o);continue}for(r=0,i=n.length-1;r<i;)a=r+i>>1,e[n[a]]<u?r=a+1:i=a;u<e[n[r]]&&(r>0&&(t[o]=n[r-1]),n[r]=o)}}for(r=n.length,i=n[r-1];r-- >0;)n[r]=i,i=t[i];return n}function Af(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Af(t)}function zr(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function ko(e){if(e.placeholder)return e.placeholder;let t=e.component;if(t)return ko(t.subTree);let n=e.suspense;return n&&n.activeBranch?ko(n.activeBranch):null}var Gr=e=>e.__isSuspense,Ja=0,Ya=Symbol("_deferredEnter"),av={name:"Suspense",__isSuspense:!0,process(e,t,n,o,s,r,i,a,l,u){if(e==null)cv(t,n,o,s,r,i,a,l,u);else{let f=e.suspense;if(r&&r.deps>0&&!r.isHydrating){let c=f.parentComponent;if(!!c&&c.suspense===r&&c.suspenseId!==r.pendingId?r.pendingBranch&&!wt(t.ssContent,f.pendingBranch||f.activeBranch):!f.isInFallback){t.suspense=f,f.vnode=t,t.el=e.el;return}}uv(e,t,n,o,s,i,a,l,u)}},hydrate:fv,normalize:pv},lv=av;function bs(e,t){let n=e.props&&e.props[t];Q(n)&&n()}function Yu(e){let t=[];Qa(e,t,!0),t.length&&Kt(t)}function Qa(e,t,n){let{el:o,transition:s,children:r,shapeFlag:i}=e;if(i&6){Qa(e.component.subTree,t,n);return}if(!(i&192)&&(i&1&&(!n&&o&&o[Ya]&&(o[Ya]=void 0,s&&!s.persisted&&(s.beforeEnter(o),t.push(()=>s.enter(o)))),n=!1),i&16))for(let a=0;a<r.length;a++)Qa(r[a],t,n)}function cv(e,t,n,o,s,r,i,a,l){let{p:u,o:{createElement:f}}=l,c=f("div"),p=e.suspense=Df(e,s,o,t,c,n,r,i,a,l);u(null,p.pendingBranch=e.ssContent,c,null,o,p,r,i),p.deps>0?(bs(e,"onPending"),bs(e,"onFallback"),u(null,e.ssFallback,t,n,o,null,r,i),Io(p,e.ssFallback)):p.resolve(!1,!0)}function uv(e,t,n,o,s,r,i,a,{p:l,um:u,o:{createElement:f}}){let c=t.suspense=e.suspense;c.vnode=t,t.el=e.el;let p=t.ssContent,d=t.ssFallback,{activeBranch:_,pendingBranch:m,isInFallback:b,isHydrating:x}=c;if(m)c.pendingBranch=p,wt(m,p)?(c.deps++,l(m,p,x?n:c.hiddenContainer,null,s,c,r,i,a),c.deps--,c.deps<=0?c.resolve():b&&!x&&!c.isFallbackMountPending&&(l(_,d,n,o,s,null,r,i,a),Io(c,d))):(c.pendingId=Ja++,x?(c.isHydrating=!1,c.activeBranch=m):u(m,s,c),c.deps=0,kf(c),c.hiddenContainer=f("div"),b?(l(null,p,c.hiddenContainer,null,s,c,r,i,a),c.deps<=0?c.resolve():c.isFallbackMountPending||(l(_,d,n,o,s,null,r,i,a),Io(c,d))):_&&wt(_,p)?(l(_,p,n,o,s,c,r,i,a),c.resolve(!0)):(l(null,p,c.hiddenContainer,null,s,c,r,i,a),c.deps<=0&&c.resolve()));else if(_&&wt(_,p))l(_,p,n,o,s,c,r,i,a),Io(c,p);else if(bs(t,"onPending"),c.pendingBranch=p,c.pendingId=Ja++,l(null,p,c.hiddenContainer,null,s,c,r,i,a),c.deps<=0)c.resolve();else{let{timeout:N}=c;N>0?c.timeoutTimer=setTimeout(()=>{c.timeoutTimer=void 0,c.fallback(c.vnode.ssFallback)},N):N===0&&c.fallback(d)}}function Df(e,t,n,o,s,r,i,a,l,u,f=!1){let{p:c,m:p,um:d,n:_,o:{parentNode:m,remove:b}}=u,x,N=dv(e);N&&t&&t.pendingBranch&&(x=t.pendingId,t.deps++);let v=e.props?No(e.props.timeout):void 0,y=r,g={vnode:e,parent:t,parentComponent:n,namespace:i,container:o,hiddenContainer:s,deps:0,pendingId:Ja++,timeout:typeof v=="number"?v:-1,timeoutTimer:void 0,activeBranch:null,isFallbackMountPending:!1,pendingBranch:null,isInFallback:!f,isHydrating:f,isUnmounted:!1,effects:[],resolve(D=!1,k=!1){let{vnode:S,activeBranch:O,pendingBranch:V,pendingId:M,effects:w,parentComponent:$,container:P,isInFallback:W}=g,j=g.parent;for(;j&&!j.pendingBranch;)j=j.parent;let ie=!1;if(g.isHydrating)g.isHydrating=!1;else if(!D){ie=O&&V.transition&&V.transition.mode==="out-in";let he=!1;ie&&(O.transition.afterLeave=()=>{if(M===g.pendingId&&!g.isUnmounted){Yu(V),p(V,P,r===y&&!he?_(O):r,0);let se=!1;if(j){let Me=P,ge;for(;ge=m(Me);)Me=ge;se=Me===j.hiddenContainer}se||Kt(w),W&&S.ssFallback&&(S.ssFallback.el=null)}}),O&&!g.isFallbackMountPending&&(m(O.el||ko(O))===P&&(r=_(O),he=!0),d(O,$,g,!0),!ie&&W&&S.ssFallback&&Oe(()=>S.ssFallback.el=null,g)),ie||(Yu(V),p(V,P,r,0))}clearTimeout(g.timeoutTimer),g.timeoutTimer=void 0,g.isFallbackMountPending=!1,Io(g,V),g.pendingBranch=null,g.isInFallback=!1;let fe=0;for(let he=0;he<w.length;he++){let se=w[he];se.flags&32?Kt(se):w[fe++]=se}if(w.length=fe,j)for(let he=0;he<w.length;he++)j.effects.push(w[he]);else ie||Kt(w);g.effects=[],N&&t&&t.pendingBranch&&x===t.pendingId&&(x=void 0,t.deps--,t.deps===0&&!k&&t.resolve()),bs(S,"onResolve")},fallback(D){if(g.isUnmounted||!g.pendingBranch)return;let{vnode:k,activeBranch:S,parentComponent:O,container:V,namespace:M}=g;bs(k,"onFallback");let w=_(S),$=()=>{if(g.isFallbackMountPending=!1,g.isUnmounted||!g.isInFallback)return;let W=g.vnode.ssFallback;c(null,W,V,w,O,null,M,a,l),Io(g,W)},P=D.transition&&D.transition.mode==="out-in";P&&(g.isFallbackMountPending=!0,S.transition.afterLeave=$),g.isInFallback=!0,d(S,O,null,!0),P||$()},move(D,k,S){g.activeBranch&&p(g.activeBranch,D,k,S),g.container=D},next(){return g.activeBranch&&_(g.activeBranch)},registerDep(D,k,S,O){let V=!!g.pendingBranch;V&&g.deps++;let M=D.vnode.el,w=$=>{D.asyncResolved=!0;let{vnode:P}=D;Za(D,$,!1),M&&(P.el=M);let W=!M&&D.subTree.el;k(D,P,m(M||D.subTree.el),M?null:_(D.subTree),g,O,S),W&&(P.placeholder=null,b(W)),ci(D,P.el)};D.asyncDep.catch($=>(D.scope.active&&oo($,D,0,!1,!0),()=>null)).then($=>{if(D.isUnmounted||g.isUnmounted)return;let P=V&&g.pendingId===D.suspenseId;if(xs(),!D.scope.active){P&&--g.deps===0&&g.resolve();return}if(!P&&g.pendingBranch){let W=()=>{D.isUnmounted||g.isUnmounted||!D.scope.active||(g.pendingBranch?qr(W,g):w($))};W.flags=48,qr(W,g);return}w($),P&&--g.deps===0&&g.resolve()})},unmount(D,k){if(g.isUnmounted=!0,clearTimeout(g.timeoutTimer),g.timeoutTimer=void 0,x!==void 0){let S=g.parent,O=x;x=void 0,Kt(()=>{S.pendingId===O&&!S.isUnmounted&&--S.deps===0&&S.resolve()})}g.activeBranch&&d(g.activeBranch,n,D,k),g.pendingBranch&&(d(g.pendingBranch,n,g,k),kf(g))}};return g}function fv(e,t,n,o,s,r,i,a,l){let u=t.suspense=Df(t,o,n,e.parentNode,document.createElement("div"),null,s,r,i,a,!0),f=l(e,u.pendingBranch=t.ssContent,n,u,r,i);return u.deps===0&&u.resolve(!1,!0),f}function pv(e){let{shapeFlag:t,children:n}=e,o=t&32;e.ssContent=Qu(o?n.default:n),e.ssFallback=o?Qu(n.fallback):ye(xe)}function Qu(e){let t;if(Q(e)){let n=eo&&e._c;n&&(e._d=!1,Ns()),e=e(),n&&(e._d=!0,t=Xe,ui())}return H(e)&&(e=ul(e)),e=rt(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter(n=>n!==e)),e}function kf(e){let{effects:t}=e;for(let n=0;n<t.length;n++){let o=t[n];o.flags&16&&Kt(o)}t.length=0}function qr(e,t){t&&t.pendingBranch?H(e)?t.effects.push(...e):t.effects.push(e):Kt(e)}function Io(e,t){e.activeBranch=t;let{vnode:n,parentComponent:o}=e,s=t.el;for(;!s&&t.component;)t=t.component.subTree,s=t.el;n.el=s,o&&o.subTree===n&&(o.vnode.el=s,ci(o,s))}function dv(e){let t=e.props&&e.props.suspensible;return t!=null&&t!==!1}var Ve=Symbol.for("v-fgt"),Cn=Symbol.for("v-txt"),xe=Symbol.for("v-cmt"),un=Symbol.for("v-stc"),fn=[],Xe=null;function Ns(e=!1){fn.push(Xe=e?null:[])}function ui(){fn.pop(),Xe=fn[fn.length-1]||null}var eo=1;function Ss(e,t=!1){eo+=e,e<0&&Xe&&t&&(Xe.hasOnce=!0)}function If(e){return e.dynamicChildren=eo>0?Xe||Nn:null,ui(),eo>0&&Xe&&Xe.push(e),e}function hv(e,t,n,o,s,r){return If(gl(e,t,n,o,s,r,!0))}function Jr(e,t,n,o,s){return If(ye(e,t,n,o,s,!0))}function pn(e){return e?e.__v_isVNode===!0:!1}function wt(e,t){return e.type===t.type&&e.key===t.key}var mv;function gv(e){mv=e}var Vf=({key:e})=>e??null,Br=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?z(e)||Ne(e)||Q(e)?{i:je,r:e,k:t,f:!!n}:e:null);function gl(e,t=null,n=null,o=0,s=null,r=e===Ve?0:1,i=!1,a=!1){let l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Vf(t),ref:t&&Br(t),scopeId:ni,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:o,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:je};return a?(Yr(l,n),r&128&&e.normalize(l)):n&&(l.shapeFlag|=z(n)?8:16),eo>0&&!i&&Xe&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&Xe.push(l),l}var ye=vv;function vv(e,t=null,n=null,o=0,s=null,r=!1){if((!e||e===mf)&&(e=xe),pn(e)){let a=Xt(e,t,!0);return n&&Yr(a,n),eo>0&&!r&&Xe&&(a.shapeFlag&6?Xe[Xe.indexOf(e)]=a:Xe.push(a)),a.patchFlag=-2,a}if(Tv(e)&&(e=e.__vccOpts),t){t=Rf(t);let{class:a,style:l}=t;a&&!z(a)&&(t.class=Wn(a)),re(l)&&(zn(l)&&!H(l)&&(l=q({},l)),t.style=jn(l))}let i=z(e)?1:Gr(e)?128:si(e)?64:re(e)?4:Q(e)?2:0;return gl(e,t,n,o,s,i,r,!0)}function Rf(e){return e?zn(e)?q({},e):Nf(e)?q({},e[jf]||e):e:null}function Xt(e,t,n=!1,o=!1){let{props:s,ref:r,patchFlag:i,children:a,transition:l}=e,u=t?Mf(s||{},t):s,f={__v_isVNode:!0,__v_skip:!0,type:e.type,props:u,key:u&&Vf(u),ref:t&&t.ref?n&&r?H(r)?r.concat(Br(t)):[r,Br(t)]:Br(t):r,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Ve?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Xt(e.ssContent),ssFallback:e.ssFallback&&Xt(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce,cacheIndex:e.cacheIndex};return l&&o&&Ct(f,l.clone(f)),f}function vl(e=" ",t=0){return ye(Cn,null,e,t)}function Ev(e,t){let n=ye(un,null,e);return n.staticCount=t,n}function Pf(e="",t=!1){return t?(Ns(),Jr(xe,null,e)):ye(xe,null,e)}function rt(e){return e==null||typeof e=="boolean"?ye(xe):H(e)?ye(Ve,null,e.slice()):pn(e)?ln(e):ye(Cn,null,String(e))}function ln(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Xt(e)}function Yr(e,t){let n=0,{shapeFlag:o}=e;if(t==null)t=null;else if(H(t))n=16;else if(typeof t=="object")if(o&65){let s=t.default;s&&(s._c&&(s._d=!1),Yr(e,s()),s._c&&(s._d=!0));return}else{n=32;let s=t._;!s&&!Nf(t)?t._ctx=je:s===3&&je&&(je.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else if(Q(t)){if(o&65){Yr(e,{default:t});return}t={default:t,_ctx:je},n=32}else t=String(t),o&64?(n=16,t=[vl(t)]):n=8;e.children=t,e.shapeFlag|=n}function Mf(...e){let t={};for(let n=0;n<e.length;n++){let o=e[n];for(let s in o)if(s==="class")t.class!==o.class&&(t.class=Wn([t.class,o.class]));else if(s==="style")t.style=jn([t.style,o.style]);else if(Ft(s)){let r=t[s],i=o[s];i&&r!==i&&!(H(r)&&r.includes(i))?t[s]=r?[].concat(r,i):i:i==null&&r==null&&!yo(s)&&(t[s]=i)}else s!==""&&(t[s]=o[s])}return t}function st(e,t,n,o=null){gt(e,t,7,[n,o])}var _v=vf(),Lf=0;function yv(){return Lf}function $f(e,t,n){let o=e.type,s=(t?t.appContext:e.appContext)||_v,r={uid:Lf++,vnode:e,type:o,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Xn(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:tv(o,s),emitsOptions:qg(o,s),emit:null,emitted:null,propsDefaults:Z,inheritAttrs:o.inheritAttrs,ctx:Z,data:Z,props:Z,attrs:Z,slots:Z,refs:Z,setupState:Z,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=Gg.bind(null,r),e.ce&&e.ce(r),r}var He=null,ze=()=>He||je,Qr,An;{let e=os(),t=(n,o)=>{let s;return(s=e[n])||(s=e[n]=[]),s.push(o),r=>{s.length>1?s.forEach(i=>i(r)):s[0](r)}};Qr=t("__VUE_INSTANCE_SETTERS__",n=>He=n),An=t("__VUE_SSR_SETTERS__",n=>to=n)}var fi=e=>{let t=He;return Qr(e),e.scope.on(),()=>{e.scope.off(),Qr(t)}},xs=()=>{He&&He.scope.off(),Qr(null)};function Ff(e){return e.vnode.shapeFlag&4}var to=!1;function Uf(e,t=!1,n=!1){t&&An(t);let{props:o,children:s}=e.vnode,r=Ff(e);Zg(e,o,r,t),ov(e,s,n||t);let i=r?bv(e,t):void 0;return t&&An(!1),i}function bv(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,za);let{setup:o}=n;if(o){xt();let s=e.setupContext=o.length>1?Wf(e):null,r=fi(e),i=no(o,e,0,[e.props,s]),a=mr(i);if(Tt(),r(),(a||e.sp)&&!cn(e)&&df(e),a){if(i.then(xs,xs),t)return i.then(l=>{An(!0);try{Za(e,l,t)}finally{An(!1)}}).catch(l=>{oo(l,e,0,void 0,!0),e.ssrRender=(u,f)=>f("<!---->")});e.asyncDep=i}else Za(e,i,t)}else Hf(e,t)}function Za(e,t,n){Q(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:re(t)&&(e.setupState=ps(t)),Hf(e,n)}var Zr,el;function El(e){Zr=e,el=t=>{t.render._rc&&(t.withProxy=new Proxy(t.ctx,kg))}}var Bf=()=>!Zr;function Hf(e,t,n){let o=e.type;if(!e.render){if(!t&&Zr&&!o.render){let s=o.template||!1;if(s){let{isCustomElement:r,compilerOptions:i}=e.appContext.config,{delimiters:a,compilerOptions:l}=o,u=q(q({isCustomElement:r,delimiters:a},i),l);o.render=Zr(s,u)}}e.render=o.render||De,el&&el(e)}}var jf=Symbol(),Nv={get(e,t){return Be(e,"get",""),t===jf?e:e[t]}};function Wf(e){let t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,Nv),slots:e.slots,emit:e.emit,expose:t}}function As(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(ps(Dr(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in gs)return gs[n](e)},has(t,n){return n in t||n in gs}})):e.proxy}var Sv=/(?:^|[-_])\w/g,xv=e=>e.replace(Sv,t=>t.toUpperCase()).replace(/[-_]/g,"");function ei(e,t=!0){return Q(e)?e.displayName||e.name:e.name||t&&e.__name}function Kf(e,t,n=!1){let o=ei(t);if(!o&&t.__file){let s=t.__file.match(/([^/\\]+)\.\w+$/);s&&(o=s[1])}if(!o&&e){let s=r=>{for(let i in r)if(r[i]===t)return i};o=s(e.components)||e.parent&&s(e.parent.type.components)||s(e.appContext.components)}return o?xv(o):n?"App":"Anonymous"}function Tv(e){return Q(e)&&"__vccOpts"in e}var Fe=(e,t)=>Mu(e,t,to);function _l(e,t,n){try{Ss(-1);let o=arguments.length;return o===2?re(t)&&!H(t)?pn(t)?ye(e,null,[t]):ye(e,t):ye(e,null,t):(o>3?n=Array.prototype.slice.call(arguments,2):o===3&&pn(n)&&(n=[n]),ye(e,t,n))}finally{Ss(1)}}function Xf(){return;function r(c){let p=[];c.type.props&&c.props&&p.push(i("props",Y(c.props))),c.setupState!==Z&&p.push(i("setup",c.setupState)),c.data!==Z&&p.push(i("data",Y(c.data)));let d=l(c,"computed");d&&p.push(i("computed",d));let _=l(c,"inject");return _&&p.push(i("injected",_)),p.push(["div",{},["span",{style:o.style+";opacity:0.66"},"$ (internal): "],["object",{object:c}]]),p}function i(c,p){return p=q({},p),Object.keys(p).length?["div",{style:"line-height:1.25em;margin-bottom:0.6em"},["div",{style:"color:#476582"},c],["div",{style:"padding-left:1.25em"},...Object.keys(p).map(d=>["div",{},["span",o,d+": "],a(p[d],!1)])]]:["span",{}]}function a(c,p=!0){return typeof c=="number"?["span",t,c]:typeof c=="string"?["span",n,JSON.stringify(c)]:typeof c=="boolean"?["span",o,c]:re(c)?["object",{object:p?Y(c):c}]:["span",n,String(c)]}function l(c,p){let d=c.type;if(Q(d))return;let _={};for(let m in c.ctx)u(d,m,p)&&(_[m]=c.ctx[m]);return _}function u(c,p,d){let _=c[d];if(H(_)&&_.includes(p)||re(_)&&p in _||c.extends&&u(c.extends,p,d)||c.mixins&&c.mixins.some(m=>u(m,p,d)))return!0}function f(c){return $e(c)?"ShallowRef":c.effect?"ComputedRef":"Ref"}}function Ov(e,t,n,o){let s=n[o];if(s&&zf(s,e))return s;let r=t();return r.memo=e.slice(),r.cacheIndex=o,n[o]=r}function zf(e,t){let n=e.memo;if(n.length!=t.length)return!1;for(let o=0;o<n.length;o++)if(ke(n[o],t[o]))return!1;return eo>0&&Xe&&Xe.push(e),!0}var Gf="3.5.46",pi=De,wv=Am,Cv=Co,Av=sf,Dv={createComponentInstance:$f,setupComponent:Uf,renderComponentRoot:Ur,setCurrentRenderingInstance:Es,isVNode:pn,normalizeVNode:rt,getComponentPublicInstance:As,ensureValidVNode:cl,pushWarningContext:bm,popWarningContext:Nm},kv=Dv,Iv=null,Vv=null,Rv=null;var xl,qf=typeof window<"u"&&window.trustedTypes;if(qf)try{xl=qf.createPolicy("vue",{createHTML:e=>e})}catch{}var gp=xl?e=>xl.createHTML(e):e=>e,Pv="http://www.w3.org/2000/svg",Mv="http://www.w3.org/1998/Math/MathML",hn=typeof document<"u"?document:null,Jf=hn&&hn.createElement("template"),vp={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,o)=>{let s=t==="svg"?hn.createElementNS(Pv,e):t==="mathml"?hn.createElementNS(Mv,e):n?hn.createElement(e,{is:n}):hn.createElement(e);return e==="select"&&o&&o.multiple!=null&&s.setAttribute("multiple",o.multiple),s},createText:e=>hn.createTextNode(e),createComment:e=>hn.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>hn.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,o,s,r){let i=n?n.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===r||!(s=s.nextSibling)););else{Jf.innerHTML=gp(o==="svg"?`<svg>${e}</svg>`:o==="mathml"?`<math>${e}</math>`:e);let a=Jf.content;if(o==="svg"||o==="mathml"){let l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Dn="transition",Ds="animation",Ro=Symbol("_vtc"),Ep={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},_p=q({},ii,Ep),Lv=e=>(e.displayName="Transition",e.props=_p,e),$v=Lv((e,{slots:t})=>_l(nl,yp(e),t)),so=(e,t=[])=>{H(e)?e.forEach(n=>n(...t)):e&&e(...t)},Yf=e=>e?H(e)?e.some(t=>t.length>1):e.length>1:!1;function yp(e){let t={};for(let w in e)w in Ep||(t[w]=e[w]);if(e.css===!1)return t;let{name:n="v",type:o,duration:s,enterFromClass:r=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:a=`${n}-enter-to`,appearFromClass:l=r,appearActiveClass:u=i,appearToClass:f=a,leaveFromClass:c=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:d=`${n}-leave-to`}=e,_=Fv(s),m=_&&_[0],b=_&&_[1],{onBeforeEnter:x,onEnter:N,onEnterCancelled:v,onLeave:y,onLeaveCancelled:g,onBeforeAppear:D=x,onAppear:k=N,onAppearCancelled:S=v}=t,O=(w,$,P,W)=>{w._enterResolve=void 0,w._enterCancelled=W,kn(w,$?f:a),kn(w,$?u:i),P&&P()},V=(w,$)=>{w._leaveResolve=void 0,w._isLeaving=!1,kn(w,c),kn(w,d),kn(w,p),$&&$()},M=w=>($,P)=>{let W=w?k:N,j=()=>{$._enterResolve===j&&O($,w,P)};$._enterResolve=j,so(W,[$,j]),Qf(()=>{kn($,w?l:r),$._enterResolve===j&&(zt($,w?f:a),Yf(W)||Zf($,o,m,j))})};return q(t,{onBeforeEnter(w){so(x,[w]),zt(w,r),zt(w,i)},onBeforeAppear(w){so(D,[w]),zt(w,l),zt(w,u)},onEnter:M(!1),onAppear:M(!0),onLeave(w,$){w._isLeaving=!0;let P=()=>{w._leaveResolve===P&&V(w,$)};w._leaveResolve=P,zt(w,c),w._enterCancelled?(zt(w,p),Tl(w)):(Tl(w),zt(w,p)),Qf(()=>{w._leaveResolve===P&&(kn(w,c),zt(w,d),Yf(y)||Zf(w,o,b,P))}),so(y,[w,P])},onEnterCancelled(w){O(w,!1,void 0,!0),so(v,[w])},onAppearCancelled(w){O(w,!0,void 0,!0),so(S,[w])},onLeaveCancelled(w){V(w),so(g,[w])}})}function Fv(e){if(e==null)return null;if(re(e))return[yl(e.enter),yl(e.leave)];{let t=yl(e);return[t,t]}}function yl(e){return No(e)}function zt(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e[Ro]||(e[Ro]=new Set)).add(t)}function kn(e,t){t.split(/\s+/).forEach(o=>o&&e.classList.remove(o));let n=e[Ro];n&&(n.delete(t),n.size||(e[Ro]=void 0))}function Qf(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}var Uv=0;function Zf(e,t,n,o){let s=e._endId=++Uv,r=()=>{s===e._endId&&o()};if(n!=null)return setTimeout(r,n);let{type:i,timeout:a,propCount:l}=bp(e,t);if(!i)return o();let u=i+"end",f=0,c=()=>{e.removeEventListener(u,p),r()},p=d=>{d.target===e&&++f>=l&&c()};setTimeout(()=>{f<l&&c()},a+1),e.addEventListener(u,p)}function bp(e,t){let n=window.getComputedStyle(e),o=_=>(n[_]||"").split(", "),s=o(`${Dn}Delay`),r=o(`${Dn}Duration`),i=ep(s,r),a=o(`${Ds}Delay`),l=o(`${Ds}Duration`),u=ep(a,l),f=null,c=0,p=0;t===Dn?i>0&&(f=Dn,c=i,p=r.length):t===Ds?u>0&&(f=Ds,c=u,p=l.length):(c=Math.max(i,u),f=c>0?i>u?Dn:Ds:null,p=f?f===Dn?r.length:l.length:0);let d=f===Dn&&/\b(?:transform|all)(?:,|$)/.test(o(`${Dn}Property`).toString());return{type:f,timeout:c,propCount:p,hasTransform:d}}function ep(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,o)=>tp(n)+tp(e[o])))}function tp(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function Tl(e){return(e?e.ownerDocument:document).body.offsetHeight}function Bv(e,t,n){let o=e[Ro];o&&(t=(t?[t,...o]:[...o]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}var gi=Symbol("_vod"),Al=Symbol("_vsh"),Np={name:"show",beforeMount(e,{value:t},{transition:n}){e[gi]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):ks(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:o}){!t!=!n&&(o?t?(o.beforeEnter(e),ks(e,!0),o.enter(e)):o.leave(e,()=>{ks(e,!1)}):ks(e,t))},beforeUnmount(e,{value:t}){ks(e,t)}};function ks(e,t){e.style.display=t?e[gi]:"none",e[Al]=!t}function Hv(){Np.getSSRProps=({value:e})=>{if(!e)return{style:{display:"none"}}}}var Sp=Symbol("");function jv(e){let t=ze();if(!t)return;let n=(r=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(i=>vi(i,r))},o={uid:String(t.uid),update:n};To(()=>o.update=void 0),t.ut=(r,i)=>{r&&(r[Po]=[i,o],xp(r),Ol(r)),n()};let s=()=>{let r=e(t.proxy);t.ce?vi(t.ce,r):wl(t.subTree,r),n(r)};sl(()=>{Kt(s)}),Cs(()=>{Vo(s,De,{flush:"post"});let r=new MutationObserver(s);r.observe(t.subTree.el.parentNode,{childList:!0}),il(()=>r.disconnect())})}var Po=Symbol("");function Ol(e,t){let[n,o]=e[Po],s;if(o.update)for(let r=e;r&&r!==n;r=r.nextSibling)r.nodeType===1&&(!t||(t===!0||t.has(r))&&(r.getAttribute("data-v-owner")||o.uid)===o.uid)&&(r.setAttribute("data-v-owner",o.uid),s=o.update);return s}function xp(e){let t=e.parentNode;if(t){let n=t[Po];n||(n=t[Po]=new Set,new MutationObserver(Wv).observe(t,{childList:!0})),n.add(e)}}function Wv(e,t){let n=e[0].target,o=n[Po],s=new Set;for(let{addedNodes:i}of e)i.forEach(a=>s.add(a));let r=new Set;o.forEach(i=>{i.parentNode!==n?(o.delete(i),xp(i),r.add(Ol(i,!0))):s.size&&r.add(Ol(i,s))}),r.forEach(i=>i&&i()),o.size||(t.disconnect(),n[Po]=void 0)}function wl(e,t){if(e.shapeFlag&128){let n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push(()=>{wl(n.activeBranch,t)})}for(;e.component;)e=e.component.subTree;if(e.shapeFlag&1&&e.el)vi(e.el,t);else if(e.type===Ve)e.children.forEach(n=>wl(n,t));else if(e.type===un){let{el:n,anchor:o}=e;for(;n&&(vi(n,t),n!==o);)n=n.nextSibling}}function vi(e,t){if(e.nodeType===1){let n=e.style,o="";for(let s in t){let r=ba(t[s]);n.setProperty(`--${s}`,r),o+=`--${s}: ${r};`}n[Sp]=o}}var Kv=/(?:^|;)\s*display\s*:/;function Xv(e,t,n){let o=e.style,s=z(n),r=!1;if(n&&!s){if(t)if(z(t))for(let i of t.split(";")){let a=i.slice(0,i.indexOf(":")).trim();n[a]==null&&Is(o,a,"")}else for(let i in t)n[i]==null&&Is(o,i,"");for(let i in n){i==="display"&&(r=!0);let a=n[i];a!=null?Gv(e,i,!z(t)&&t?t[i]:void 0,a)||Is(o,i,a):Is(o,i,"")}}else if(s){if(t!==n){let i=o[Sp];i&&(n+=";"+i),o.cssText=n,r=Kv.test(n)}}else t&&e.removeAttribute("style");gi in e&&((!s||t!==n)&&(e[gi]=r?o.display:""),e[Al]&&(o.display="none"))}var di=/\s*!important$/;function Is(e,t,n){if(H(n))n.forEach(o=>Is(e,t,o));else if(n==null&&(n=""),t.startsWith("--"))di.test(n)?e.setProperty(t,n.replace(di,""),"important"):e.setProperty(t,n);else{let o=zv(e,t);di.test(n)?e.setProperty(Ke(o),n.replace(di,""),"important"):e[o]=n}}var np=["Webkit","Moz","ms"],bl={};function zv(e,t){let n=bl[t];if(n)return n;let o=le(t);if(o!=="filter"&&o in e)return bl[t]=o;o=St(o);for(let s=0;s<np.length;s++){let r=np[s]+o;if(r in e)return bl[t]=r}return t}function Gv(e,t,n,o){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&z(o)&&n===o}var op="http://www.w3.org/1999/xlink";function sp(e,t,n,o,s,r=au(t)){o&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(op,t.slice(6,t.length)):e.setAttributeNS(op,t,n):n==null||r&&!Er(n)?e.removeAttribute(t):e.setAttribute(t,r?"":Ae(n)?String(n):n)}function rp(e,t,n,o,s){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?gp(n):n);return}let r=e.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){let a=r==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let i=!1;if(n===""||n==null){let a=typeof e[t];a==="boolean"?n=Er(n):n==null&&a==="string"?(n="",i=!0):a==="number"&&(n=0,i=!0)}try{e[t]=n}catch{}i&&e.removeAttribute(s||t)}function mn(e,t,n,o){e.addEventListener(t,n,o)}function qv(e,t,n,o){e.removeEventListener(t,n,o)}var ip=Symbol("_vei");function Jv(e,t,n,o,s=null){let r=e[ip]||(e[ip]={}),i=r[t];if(o&&i)i.value=o;else{let[a,l]=Zv(t);if(o){let u=r[t]=nE(o,s);mn(e,a,u,l)}else i&&(qv(e,a,i,l),r[t]=void 0)}}var Yv=/(Once|Passive|Capture)$/,Qv=/^on:?(?:Once|Passive|Capture)$/;function Zv(e){let t,n;for(;(n=e.match(Yv))&&!Qv.test(e);)t||(t={}),e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===":"?e.slice(3):Ke(e.slice(2)),t]}var Nl=0,eE=Promise.resolve(),tE=()=>Nl||(eE.then(()=>Nl=0),Nl=Date.now());function nE(e,t){let n=o=>{if(!o._vts)o._vts=Date.now();else if(o._vts<=n.attached)return;let s=n.value;if(H(s)){let r=o.stopImmediatePropagation;o.stopImmediatePropagation=()=>{r.call(o),o._stopped=!0};let i=s.slice(),a=[o];for(let l=0;l<i.length&&!o._stopped;l++){let u=i[l];u&&gt(u,t,5,a)}}else gt(s,t,5,[o])};return n.value=e,n.attached=tE(),n}var ap=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Tp=(e,t,n,o,s,r)=>{let i=s==="svg";t==="class"?Bv(e,o,i):t==="style"?Xv(e,n,o):Ft(t)?yo(t)||Jv(e,t,n,o,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):oE(e,t,o,i))?(rp(e,t,o),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&sp(e,t,o,i,r,t!=="value")):e._isVueCE&&(sE(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!z(o)))?rp(e,le(t),o,r,t):(t==="true-value"?e._trueValue=o:t==="false-value"&&(e._falseValue=o),sp(e,t,o,i))};function oE(e,t,n,o){if(o)return!!(t==="innerHTML"||t==="textContent"||t in e&&ap(t)&&Q(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){let s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return ap(t)&&z(n)?!1:t in e}function sE(e,t){let n=e._def.props;if(!n)return!1;let o=le(t);return Array.isArray(n)?n.some(s=>le(s)===o):Object.keys(n).some(s=>le(s)===o)}var lp={};function Op(e,t,n){let o=it(e,t);bo(o)&&(o=q({},o,t));class s extends Ei{constructor(i){super(o,i,n)}}return s.def=o,s}var rE=((e,t)=>Op(e,t,$p)),iE=typeof HTMLElement<"u"?HTMLElement:class{},Ei=class e extends iE{constructor(t,n={},o=Rs){super(),this._def=t,this._props=n,this._createApp=o,this._isVueCE=!0,this._instance=null,this._app=null,this._nonce=this._def.nonce,this._connected=!1,this._resolved=!1,this._patching=!1,this._dirty=!1,this._numberProps=null,this._styleChildren=new WeakSet,this._styleAnchors=new WeakMap,this._ob=null,this.shadowRoot&&o!==Rs?this._root=this.shadowRoot:t.shadowRoot!==!1?(this.attachShadow(q({},t.shadowRootOptions,{mode:"open"})),this._root=this.shadowRoot):this._root=this}connectedCallback(){if(!this.isConnected)return;!this.shadowRoot&&!this._resolved&&this._parseSlots(),this._connected=!0;let t=this;for(;t=t&&(t.assignedSlot||t.parentNode||t.host);)if(t instanceof e){this._parent=t;break}this._instance||(this._resolved?this._mount(this._def):t&&t._pendingResolve?this._pendingResolve=t._pendingResolve.then(()=>{if(this._pendingResolve=void 0,this.isConnected)return this._resolveDef()}):this._resolveDef())}_setParent(t=this._parent){t&&(this._instance.parent=t._instance,this._inheritParentContext(t))}_inheritParentContext(t=this._parent){t&&this._app&&Object.setPrototypeOf(this._app._context.provides,t._instance.provides)}disconnectedCallback(){this._connected=!1,Ts(()=>{this._connected||(this._ob&&(this._ob.disconnect(),this._ob=null),this._app&&this._app.unmount(),this._instance&&(this._instance.ce=void 0),this._app=this._instance=null,this._teleportTargets&&(this._teleportTargets.clear(),this._teleportTargets=void 0))})}_processMutations(t){for(let n of t)this._setAttr(n.attributeName)}_resolveDef(){if(this._pendingResolve)return this._pendingResolve;for(let o=0;o<this.attributes.length;o++)this._setAttr(this.attributes[o].name);this._ob=new MutationObserver(this._processMutations.bind(this)),this._ob.observe(this,{attributes:!0});let t=(o,s=!1)=>{this._resolved=!0,this._pendingResolve=void 0;let{props:r,styles:i}=o,a;if(r&&!H(r))for(let l in r){let u=r[l];(u===Number||u&&u.type===Number)&&(l in this._props&&(this._props[l]=No(this._props[l])),(a||(a=Object.create(null)))[le(l)]=!0)}this._numberProps=a,this._resolveProps(o),this.shadowRoot&&this._applyStyles(i),this._connected&&this._mount(o)},n=this._def.__asyncLoader;if(n)return this._pendingResolve=n().then(o=>{o.configureApp=this._def.configureApp,t(this._def=o,!0)}),this._pendingResolve;t(this._def)}_mount(t){this._app=this._createApp(t),this._inheritParentContext(),t.configureApp&&t.configureApp(this._app),this._app._ceVNode=this._createVNode(),this._app.mount(this._root);let n=this._instance&&this._instance.exposed;if(n)for(let o in n)ae(this,o)||Object.defineProperty(this,o,{get:()=>Gn(n[o])})}_resolveProps(t){let{props:n}=t,o=H(n)?n:Object.keys(n||{});for(let s of Object.keys(this))s[0]!=="_"&&o.includes(s)&&this._setProp(s,this[s]);for(let s of o.map(le))Object.defineProperty(this,s,{get(){return this._getProp(s)},set(r){this._setProp(s,r,!0,!this._patching)}})}_setAttr(t){if(t.startsWith("data-v-"))return;let n=this.hasAttribute(t),o=n?this.getAttribute(t):lp,s=le(t);n&&this._numberProps&&this._numberProps[s]&&(o=No(o)),this._setProp(s,o,!1,!0)}_getProp(t){return this._props[t]}_setProp(t,n,o=!0,s=!1){if(n!==this._props[t]&&(this._dirty=!0,n===lp?delete this._props[t]:(this._props[t]=n,t==="key"&&this._app&&(this._app._ceVNode.key=n)),s&&this._instance&&this._update(),o)){let r=this._ob;r&&(this._processMutations(r.takeRecords()),r.disconnect()),n===!0?this.setAttribute(Ke(t),""):typeof n=="string"||typeof n=="number"?this.setAttribute(Ke(t),n+""):n||this.removeAttribute(Ke(t)),r&&r.observe(this,{attributes:!0})}}_update(){let t=this._createVNode();this._app&&(t.appContext=this._app._context),Lp(t,this._root)}_createVNode(){let t={};this.shadowRoot||(t.onVnodeMounted=t.onVnodeUpdated=this._renderSlots.bind(this));let n=ye(this._def,q(t,this._props));return this._instance||(n.ce=o=>{this._instance=o,o.ce=this,o.isCE=!0;let s=(r,i)=>{this.dispatchEvent(new CustomEvent(r,bo(i[0])?q({detail:i},i[0]):{detail:i}))};o.emit=(r,...i)=>{s(r,i),Ke(r)!==r&&s(Ke(r),i)},this._setParent()}),n}_applyStyles(t,n,o){if(!t)return;if(n){if(n===this._def||this._styleChildren.has(n))return;this._styleChildren.add(n)}let s=this._nonce,r=this.shadowRoot,i=o?this._getStyleAnchor(o)||this._getStyleAnchor(this._def):this._getRootStyleInsertionAnchor(r),a=null;for(let l=t.length-1;l>=0;l--){let u=document.createElement("style");s&&u.setAttribute("nonce",s),u.textContent=t[l],r.insertBefore(u,a||i),a=u,l===0&&(o||this._styleAnchors.set(this._def,u),n&&this._styleAnchors.set(n,u))}}_getStyleAnchor(t){if(!t)return null;let n=this._styleAnchors.get(t);return n&&n.parentNode===this.shadowRoot?n:(n&&this._styleAnchors.delete(t),null)}_getRootStyleInsertionAnchor(t){for(let n=0;n<t.childNodes.length;n++){let o=t.childNodes[n];if(!(o instanceof HTMLStyleElement))return o}return null}_parseSlots(){let t=this._slots={},n;for(;n=this.firstChild;){let o=n.nodeType===1&&n.getAttribute("slot")||"default";(t[o]||(t[o]=[])).push(n),this.removeChild(n)}}_renderSlots(){let t=this._getSlots(),n=this._instance.type.__scopeId;for(let o=0;o<t.length;o++){let s=t[o],r=s.getAttribute("name")||"default",i=this._slots[r],a=s.parentNode;if(i)for(let l of i){if(n&&l.nodeType===1){let u=n+"-s",f=document.createTreeWalker(l,1);l.setAttribute(u,"");let c;for(;c=f.nextNode();)c.setAttribute(u,"")}a.insertBefore(l,s)}else for(;s.firstChild;)a.insertBefore(s.firstChild,s);a.removeChild(s)}}_getSlots(){let t=[this];this._teleportTargets&&t.push(...this._teleportTargets);let n=new Set;for(let o of t){let s=o.querySelectorAll("slot");for(let r=0;r<s.length;r++)n.add(s[r])}return Array.from(n)}_injectChildStyle(t,n){this._applyStyles(t.styles,t,n)}_beginPatch(){this._patching=!0,this._dirty=!1}_endPatch(){this._patching=!1,this._dirty&&this._instance&&this._update()}_hasShadowRoot(){return this._def.shadowRoot!==!1}_removeChildStyle(t){}};function wp(e){let t=ze(),n=t&&t.ce;return n||null}function aE(){let e=wp();return e&&e.shadowRoot}function lE(e="$style"){{let t=ze();if(!t)return Z;let n=t.type.__cssModules;if(!n)return Z;let o=n[e];return o||Z}}var Cp=new WeakMap,Ap=new WeakMap,_i=Symbol("_moveCb"),cp=Symbol("_enterCb"),Cl=new WeakMap,cE=e=>(delete e.props.mode,e),uE=cE({name:"TransitionGroup",props:q({},_p,{tag:String,moveClass:String}),setup(e,{slots:t}){let n=ze(),o=ri(),s,r,i,a,l=()=>(a===void 0&&(a=s.length>0&&EE(s[0].el,n.vnode.el,up(e))),a);return ai(()=>{if(Cl.delete(n),!l()){s=[],i=void 0;return}let u=up(e);s.forEach(pE);let f=i&&vE(i,n.vnode.el);i=void 0,s.forEach(p=>dE(p,f));let c=s.filter(hE);Tl(n.vnode.el),c.forEach(p=>{let d=p.el,_=d.style;zt(d,u),_.transform=_.webkitTransform=_.transitionDuration="";let m=d[_i]=b=>{b&&b.target!==d||(!b||b.propertyName.endsWith("transform"))&&(d.removeEventListener("transitionend",m),d[_i]=null,kn(d,u))};d.addEventListener("transitionend",m)}),s=[]}),()=>{let u=Y(e),f=yp(u),c=u.tag||Ve;if(s=[],a=void 0,r)for(let p=0;p<r.length;p++){let d=r[p];d.el&&d.el instanceof Element&&!d.el[Al]&&(s.push(d),Ct(d,Zn(d,f,o,n)),Cp.set(d,bi(d.el)))}r=t.default?Os(t.default()):[];for(let p=0;p<r.length;p++){let d=r[p];d.key!=null&&Ct(d,Zn(d,f,o,n))}return s.length&&(i=mE(n),Cl.set(n,l)),ye(c,null,r)}}}),fE=uE;function pE(e){let t=e.el;t[_i]&&t[_i](),t[cp]&&t[cp]()}function up(e){return e.moveClass||`${e.name||"v"}-move`}function dE(e,t){Ap.set(e,bi(e.el,t))}function hE(e){let t=Cp.get(e),n=Ap.get(e),o=t.left-n.left,s=t.top-n.top;if(o||s){let r=e.el,i=r.style,a=r.getBoundingClientRect(),l=1,u=1;return r.offsetWidth&&(l=a.width/r.offsetWidth),r.offsetHeight&&(u=a.height/r.offsetHeight),(!Number.isFinite(l)||l===0)&&(l=1),(!Number.isFinite(u)||u===0)&&(u=1),Math.abs(l-1)<.01&&(l=1),Math.abs(u-1)<.01&&(u=1),i.transform=i.webkitTransform=`translate(${o/l}px,${s/u}px)`,i.transitionDuration="0s",e}}function bi(e,t){let n=e.getBoundingClientRect();return{left:n.left-(t?t.left:0),top:n.top-(t?t.top:0)}}function mE(e){let t;for(let n=e.parent;n;n=n.parent){let o=Cl.get(n);if(o){let s=gE(n.vnode.el,e.vnode.el);s&&(t||(t=[])).push(q(bi(s),{item:s,willMove:o}))}}return t}function gE(e,t){let n=e.nodeType===1?e:e.parentNode;for(;t&&t.parentNode!==n;)t=t.parentNode;if(t&&t.nodeType===1)return t}function vE(e,t){let n=e.find(o=>o.willMove()&&o.item.contains(t));return n&&bi(n.item,n)}function EE(e,t,n){let o=e.cloneNode(),s=e[Ro];s&&s.forEach(a=>{a.split(/\s+/).forEach(l=>l&&o.classList.remove(l))}),n.split(/\s+/).forEach(a=>a&&o.classList.add(a)),o.style.display="none";let r=t.nodeType===1?t:t.parentNode;r.appendChild(o);let{hasTransform:i}=bp(o);return r.removeChild(o),i}var In=e=>{let t=e.props["onUpdate:modelValue"]||!1;return H(t)?n=>xn(t,n):t};function _E(e){e.target.composing=!0}function fp(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}var vt=Symbol("_assign"),hi=Symbol("_initialValue");function Sl(e,t,n){return t&&(e=e.trim()),n&&(e=Hn(e)),e}var yi={created(e,{modifiers:{lazy:t,trim:n,number:o}},s){e.parentNode&&(e.type==="text"?e[hi]=e.defaultValue.replace(/[\r\n]/g,""):e.type==="textarea"&&(e[hi]=e.defaultValue.replace(/\r\n?/g,`
`))),e[vt]=In(s);let r=o||s.props&&s.props.type==="number";mn(e,t?"change":"input",i=>{i.target.composing||e[vt](Sl(e.value,n,r))}),(n||r)&&mn(e,"change",()=>{e.value=Sl(e.value,n,r)}),t||(mn(e,"compositionstart",_E),mn(e,"compositionend",fp),mn(e,"change",fp))},mounted(e,{value:t,modifiers:{trim:n,number:o}}){let s=t??"",r=e[hi];delete e[hi],r!==void 0&&(e.type==="text"||e.type==="textarea")&&e.value!==r?e[vt](Sl(e.value,n,o)):e.value=s},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:o,trim:s,number:r}},i){if(e[vt]=In(i),e.composing)return;let a=(r||e.type==="number")&&!/^0\d/.test(e.value)?Hn(e.value):e.value,l=t??"";if(a===l)return;let u=e.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===e&&e.type!=="range"&&(o&&t===n||s&&e.value.trim()===l)||(e.value=l)}},Dl={deep:!0,created(e,t,n){e[vt]=In(n),mn(e,"change",()=>{let o=e._modelValue,s=Mo(e),r=e.checked,i=e[vt];if(H(o)){let a=ss(o,s),l=a!==-1;if(r&&!l)i(o.concat(s));else if(!r&&l){let u=[...o];u.splice(a,1),i(u)}}else if(Nt(o)){let a=new Set(o);r?a.add(s):a.delete(s),i(a)}else i(kp(e,r))})},mounted:pp,beforeUpdate(e,t,n){e[vt]=In(n),pp(e,t,n)}};function pp(e,{value:t,oldValue:n},o){e._modelValue=t;let s;if(H(t))s=ss(t,o.props.value)>-1;else if(Nt(t))s=t.has(o.props.value);else{if(t===n)return;s=ot(t,kp(e,!0))}e.checked!==s&&(e.checked=s)}var kl={created(e,{value:t},n){e.checked=ot(t,n.props.value),e[vt]=In(n),mn(e,"change",()=>{e[vt](Mo(e))})},beforeUpdate(e,{value:t,oldValue:n},o){e[vt]=In(o),t!==n&&(e.checked=ot(t,o.props.value))}},Dp={deep:!0,created(e,{value:t,modifiers:{number:n}},o){e._modelValue=t,mn(e,"change",()=>{let s=Array.prototype.filter.call(e.options,l=>l.selected).map(l=>n?Hn(Mo(l)):Mo(l)),r=e.multiple,i=r?Nt(e._modelValue)?new Set(s):s:s[0],a=e._pendingValue=[r,r?H(i)?s.slice():s:i];try{e[vt](i)}finally{Ts(()=>{e._pendingValue===a&&(e._pendingValue=void 0)})}}),e[vt]=In(o)},mounted(e,{value:t,modifiers:{number:n}}){dp(e,t,n)},beforeUpdate(e,{value:t},n){e._modelValue=t,e[vt]=In(n)},updated(e,{value:t,modifiers:{number:n}}){let o=e._pendingValue;e._pendingValue=void 0,(!o||o[0]!==e.multiple||!yE(t,o[1],o[0]))&&dp(e,t,n)}};function yE(e,t,n){if(!n)return ot(e,t);if(H(e))return ot(e,t);if(Nt(e)){if(e.size!==t.length)return!1;for(let o of t)if(!e.has(o))return!1;return!0}return!1}function dp(e,t,n=!1){let o=e.multiple,s=H(t);if(!(o&&!s&&!Nt(t))){for(let r=0,i=e.options.length;r<i;r++){let a=e.options[r],l=Mo(a);if(o)if(s){let u=typeof l;u==="string"||u==="number"?a.selected=t.some(f=>String(f)===String(l)):a.selected=ss(t,l)>-1}else a.selected=t.has(l)||n&&typeof l=="string"&&t.has(Hn(l));else if(ot(Mo(a),t)){e.selectedIndex!==r&&(e.selectedIndex=r);return}}!o&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function Mo(e){return"_value"in e?e._value:e.value}function kp(e,t){let n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}var Ip={created(e,t,n){mi(e,t,n,null,"created")},mounted(e,t,n){mi(e,t,n,null,"mounted")},beforeUpdate(e,t,n,o){mi(e,t,n,o,"beforeUpdate")},updated(e,t,n,o){mi(e,t,n,o,"updated")}};function Vp(e,t){switch(e){case"SELECT":return Dp;case"TEXTAREA":return yi;default:switch(t){case"checkbox":return Dl;case"radio":return kl;default:return yi}}}function mi(e,t,n,o,s){let i=Vp(e.tagName,n.props&&n.props.type)[s];i&&i(e,t,n,o)}function bE(){yi.getSSRProps=({value:e})=>({value:e}),kl.getSSRProps=({value:e},t)=>{if(t.props&&ot(t.props.value,e))return{checked:!0}},Dl.getSSRProps=({value:e},t)=>{if(H(e)){if(t.props&&ss(e,t.props.value)>-1)return{checked:!0}}else if(Nt(e)){if(t.props&&e.has(t.props.value))return{checked:!0}}else if(e)return{checked:!0}},Ip.getSSRProps=(e,t)=>{if(typeof t.type!="string")return;let n=Vp(t.type.toUpperCase(),t.props&&t.props.type);if(n.getSSRProps)return n.getSSRProps(e,t)}}var NE=["ctrl","shift","alt","meta"],SE={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>NE.some(n=>e[`${n}Key`]&&!t.includes(n))},xE=(e,t)=>{if(!e)return e;let n=e._withMods||(e._withMods={}),o=t.join(".");return n[o]||(n[o]=((s,...r)=>{for(let i=0;i<t.length;i++){let a=SE[t[i]];if(a&&a(s,t))return}return e(s,...r)}))},TE={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},OE=(e,t)=>{let n=e._withKeys||(e._withKeys={}),o=t.join(".");return n[o]||(n[o]=(s=>{if(!("key"in s))return;let r=Ke(s.key);if(t.some(i=>i===r||TE[i]===r))return e(s)}))},Rp=q({patchProp:Tp},vp),Vs,hp=!1;function Pp(){return Vs||(Vs=dl(Rp))}function Mp(){return Vs=hp?Vs:hl(Rp),hp=!0,Vs}var Lp=((...e)=>{Pp().render(...e)}),wE=((...e)=>{Mp().hydrate(...e)}),Rs=((...e)=>{let t=Pp().createApp(...e),{mount:n}=t;return t.mount=o=>{let s=Up(o);if(!s)return;let r=t._component;!Q(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");let i=n(s,!1,Fp(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),i},t}),$p=((...e)=>{let t=Mp().createApp(...e),{mount:n}=t;return t.mount=o=>{let s=Up(o);if(s)return n(s,!0,Fp(s))},t});function Fp(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Up(e){return z(e)?document.querySelector(e):e}var mp=!1,CE=()=>{mp||(mp=!0,bE(),Hv())};var Ls=Symbol(""),Ms=Symbol(""),Wl=Symbol(""),Ci=Symbol(""),sd=Symbol(""),co=Symbol(""),rd=Symbol(""),id=Symbol(""),Kl=Symbol(""),Xl=Symbol(""),Hs=Symbol(""),zl=Symbol(""),ad=Symbol(""),Gl=Symbol(""),ql=Symbol(""),Jl=Symbol(""),Yl=Symbol(""),Ql=Symbol(""),Zl=Symbol(""),ld=Symbol(""),cd=Symbol(""),js=Symbol(""),Ai=Symbol(""),ec=Symbol(""),tc=Symbol(""),$s=Symbol(""),Ws=Symbol(""),nc=Symbol(""),Pl=Symbol(""),AE=Symbol(""),Ml=Symbol(""),Di=Symbol(""),DE=Symbol(""),kE=Symbol(""),oc=Symbol(""),IE=Symbol(""),VE=Symbol(""),sc=Symbol(""),ud=Symbol(""),Lo={[Ls]:"Fragment",[Ms]:"Teleport",[Wl]:"Suspense",[Ci]:"KeepAlive",[sd]:"BaseTransition",[co]:"openBlock",[rd]:"createBlock",[id]:"createElementBlock",[Kl]:"createVNode",[Xl]:"createElementVNode",[Hs]:"createCommentVNode",[zl]:"createTextVNode",[ad]:"createStaticVNode",[Gl]:"resolveComponent",[ql]:"resolveDynamicComponent",[Jl]:"resolveDirective",[Yl]:"resolveFilter",[Ql]:"withDirectives",[Zl]:"renderList",[ld]:"renderSlot",[cd]:"createSlots",[js]:"toDisplayString",[Ai]:"mergeProps",[ec]:"normalizeClass",[tc]:"normalizeStyle",[$s]:"normalizeProps",[Ws]:"guardReactiveProps",[nc]:"toHandlers",[Pl]:"camelize",[AE]:"capitalize",[Ml]:"toHandlerKey",[Di]:"setBlockTracking",[DE]:"pushScopeId",[kE]:"popScopeId",[oc]:"withCtx",[IE]:"unref",[VE]:"isRef",[sc]:"withMemo",[ud]:"isMemoSame"};function fd(e){Object.getOwnPropertySymbols(e).forEach(t=>{Lo[t]=e[t]})}var _t={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function RE(e,t=""){return{type:0,source:t,children:e,helpers:new Set,components:[],directives:[],hoists:[],imports:[],cached:[],temps:0,codegenNode:void 0,loc:_t}}function Fs(e,t,n,o,s,r,i,a=!1,l=!1,u=!1,f=_t){return e&&(a?(e.helper(co),e.helper(Uo(e.inSSR,u))):e.helper(Fo(e.inSSR,u)),i&&e.helper(Ql)),{type:13,tag:t,props:n,children:o,patchFlag:s,dynamicProps:r,directives:i,isBlock:a,disableTracking:l,isComponent:u,loc:f}}function ao(e,t=_t){return{type:17,loc:t,elements:e}}function At(e,t=_t){return{type:15,loc:t,properties:e}}function we(e,t){return{type:16,loc:_t,key:z(e)?J(e,!0):e,value:t}}function J(e,t=!1,n=_t,o=0){return{type:4,loc:n,content:e,isStatic:t,constType:t?3:o}}function Dt(e,t=_t){return{type:8,loc:t,children:e}}function Pe(e,t=[],n=_t){return{type:14,loc:n,callee:e,arguments:t}}function $o(e,t=void 0,n=!1,o=!1,s=_t){return{type:18,params:e,returns:t,newline:n,isSlot:o,loc:s}}function Ll(e,t,n,o=!0){return{type:19,test:e,consequent:t,alternate:n,newline:o,loc:_t}}function PE(e,t,n=!1,o=!1){return{type:20,index:e,value:t,needPauseTracking:n,inVOnce:o,needArraySpread:!1,loc:_t}}function ME(e){return{type:21,body:e,loc:_t}}function Fo(e,t){return e||t?Kl:Xl}function Uo(e,t){return e||t?rd:id}function rc(e,{helper:t,removeHelper:n,inSSR:o}){e.isBlock||(e.isBlock=!0,n(Fo(o,e.isComponent)),t(co),t(Uo(o,e.isComponent)))}var Bp=new Uint8Array([123,123]),Hp=new Uint8Array([125,125]);function jp(e){return e>=97&&e<=122||e>=65&&e<=90}function Et(e){return e===32||e===10||e===9||e===12||e===13}function Vn(e){return e===47||e===62||Et(e)}function ki(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}var Ge={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])},$l=class{constructor(t,n){this.stack=t,this.cbs=n,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=Bp,this.delimiterClose=Hp,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0}get inSFCRoot(){return this.mode===2&&this.stack.length===0}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=Bp,this.delimiterClose=Hp}getPos(t){let n=1,o=t+1,s=this.newlines.length,r=-1;if(s>100){let i=-1,a=s;for(;i+1<a;){let l=i+a>>>1;this.newlines[l]<t?i=l:a=l}r=i}else for(let i=s-1;i>=0;i--)if(t>this.newlines[i]){r=i;break}return r>=0&&(n=r+2,o=t-this.newlines[r]),{column:o,line:n,offset:t}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(t){t===60?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t))}stateInterpolationOpen(t){if(t===this.delimiterOpen[this.delimiterIndex])if(this.delimiterIndex===this.delimiterOpen.length-1){let n=this.index+1-this.delimiterOpen.length;n>this.sectionStart&&this.cbs.ontext(this.sectionStart,n),this.state=3,this.sectionStart=n}else this.delimiterIndex++;else this.inRCDATA?(this.state=32,this.stateInRCDATA(t)):(this.state=1,this.stateText(t))}stateInterpolation(t){t===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(t))}stateInterpolationClose(t){t===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(t))}stateSpecialStartSequence(t){let n=this.sequenceIndex===this.currentSequence.length;if(!(n?Vn(t):(t|32)===this.currentSequence[this.sequenceIndex]))this.inRCDATA=!1;else if(!n){this.sequenceIndex++;return}this.sequenceIndex=0,this.state=6,this.stateInTagName(t)}stateInRCDATA(t){if(this.sequenceIndex===this.currentSequence.length){if(t===62||Et(t)){let n=this.index-this.currentSequence.length;if(this.sectionStart<n){let o=this.index;this.index=n,this.cbs.ontext(this.sectionStart,n),this.index=o}this.sectionStart=n+2,this.stateInClosingTagName(t),this.inRCDATA=!1;return}this.sequenceIndex=0}(t|32)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:this.sequenceIndex===0?this.currentSequence===Ge.TitleEnd||this.currentSequence===Ge.TextareaEnd&&!this.inSFCRoot?!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t)):this.fastForwardTo(60)&&(this.sequenceIndex=1):this.sequenceIndex=+(t===60)}stateCDATASequence(t){t===Ge.Cdata[this.sequenceIndex]?++this.sequenceIndex===Ge.Cdata.length&&(this.state=28,this.currentSequence=Ge.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(t))}fastForwardTo(t){for(;++this.index<this.buffer.length;){let n=this.buffer.charCodeAt(this.index);if(n===10&&this.newlines.push(this.index),n===t)return!0}return this.index=this.buffer.length-1,!1}stateInCommentLike(t){t===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===Ge.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):this.sequenceIndex===0?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):t!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0)}startSpecial(t,n){this.enterRCDATA(t,n),this.state=31}enterRCDATA(t,n){this.inRCDATA=!0,this.currentSequence=t,this.sequenceIndex=n}stateBeforeTagName(t){t===33?(this.state=22,this.sectionStart=this.index+1):t===63?(this.state=24,this.sectionStart=this.index+1):jp(t)?(this.sectionStart=this.index,this.mode===0?this.state=6:this.inSFCRoot?this.state=34:this.inXML?this.state=6:t===116?this.state=30:this.state=t===115?29:6):t===47?this.state=8:(this.state=1,this.stateText(t))}stateInTagName(t){Vn(t)&&this.handleTagName(t)}stateInSFCRootTagName(t){if(Vn(t)){let n=this.buffer.slice(this.sectionStart,this.index);n!=="template"&&this.enterRCDATA(ki("</"+n),0),this.handleTagName(t)}}handleTagName(t){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)}stateBeforeClosingTagName(t){Et(t)||(t===62?(this.state=1,this.sectionStart=this.index+1):(this.state=jp(t)?9:27,this.sectionStart=this.index))}stateInClosingTagName(t){(t===62||Et(t))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(t))}stateAfterClosingTagName(t){t===62&&(this.state=1,this.sectionStart=this.index+1)}stateBeforeAttrName(t){t===62?(this.cbs.onopentagend(this.index),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):t===47?this.state=7:t===60&&this.peek()===47?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):Et(t)||this.handleAttrStart(t)}handleAttrStart(t){t===118&&this.peek()===45?(this.state=13,this.sectionStart=this.index):t===46||t===58||t===64||t===35?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index)}stateInSelfClosingTag(t){t===62?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):Et(t)||(this.state=11,this.stateBeforeAttrName(t))}stateInAttrName(t){(t===61||Vn(t))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(t))}stateInDirName(t){t===61||Vn(t)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===58?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):t===46&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDirArg(t){t===61||Vn(t)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===91?this.state=15:t===46&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDynamicDirArg(t){t===93?this.state=14:(t===61||Vn(t))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(t))}stateInDirModifier(t){t===61||Vn(t)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===46&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1)}handleAttrNameEnd(t){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(t)}stateAfterAttrName(t){t===61?this.state=18:t===47||t===62?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)):Et(t)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(t))}stateBeforeAttrValue(t){t===34?(this.state=19,this.sectionStart=this.index+1):t===39?(this.state=20,this.sectionStart=this.index+1):Et(t)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(t))}handleInAttrValue(t,n){(t===n||this.fastForwardTo(n))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(n===34?3:2,this.index+1),this.state=11)}stateInAttrValueDoubleQuotes(t){this.handleInAttrValue(t,34)}stateInAttrValueSingleQuotes(t){this.handleInAttrValue(t,39)}stateInAttrValueNoQuotes(t){Et(t)||t===62?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(t)):(t===39||t===60||t===61||t===96)&&this.cbs.onerr(18,this.index)}stateBeforeDeclaration(t){t===91?(this.state=26,this.sequenceIndex=0):this.state=t===45?25:23}stateInDeclaration(t){(t===62||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1)}stateInProcessingInstruction(t){(t===62||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeComment(t){t===45?(this.state=28,this.currentSequence=Ge.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23}stateInSpecialComment(t){(t===62||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeSpecialS(t){t===Ge.ScriptEnd[3]?this.startSpecial(Ge.ScriptEnd,4):t===Ge.StyleEnd[3]?this.startSpecial(Ge.StyleEnd,4):(this.state=6,this.stateInTagName(t))}stateBeforeSpecialT(t){t===Ge.TitleEnd[3]?this.startSpecial(Ge.TitleEnd,4):t===Ge.TextareaEnd[3]?this.startSpecial(Ge.TextareaEnd,4):(this.state=6,this.stateInTagName(t))}startEntity(){}stateInEntity(){}parse(t){for(this.buffer=t;this.index<this.buffer.length;){let n=this.buffer.charCodeAt(this.index);switch(n===10&&this.state!==33&&this.newlines.push(this.index),this.state){case 1:{this.stateText(n);break}case 2:{this.stateInterpolationOpen(n);break}case 3:{this.stateInterpolation(n);break}case 4:{this.stateInterpolationClose(n);break}case 31:{this.stateSpecialStartSequence(n);break}case 32:{this.stateInRCDATA(n);break}case 26:{this.stateCDATASequence(n);break}case 19:{this.stateInAttrValueDoubleQuotes(n);break}case 12:{this.stateInAttrName(n);break}case 13:{this.stateInDirName(n);break}case 14:{this.stateInDirArg(n);break}case 15:{this.stateInDynamicDirArg(n);break}case 16:{this.stateInDirModifier(n);break}case 28:{this.stateInCommentLike(n);break}case 27:{this.stateInSpecialComment(n);break}case 11:{this.stateBeforeAttrName(n);break}case 6:{this.stateInTagName(n);break}case 34:{this.stateInSFCRootTagName(n);break}case 9:{this.stateInClosingTagName(n);break}case 5:{this.stateBeforeTagName(n);break}case 17:{this.stateAfterAttrName(n);break}case 20:{this.stateInAttrValueSingleQuotes(n);break}case 18:{this.stateBeforeAttrValue(n);break}case 8:{this.stateBeforeClosingTagName(n);break}case 10:{this.stateAfterClosingTagName(n);break}case 29:{this.stateBeforeSpecialS(n);break}case 30:{this.stateBeforeSpecialT(n);break}case 21:{this.stateInAttrValueNoQuotes(n);break}case 7:{this.stateInSelfClosingTag(n);break}case 23:{this.stateInDeclaration(n);break}case 22:{this.stateBeforeDeclaration(n);break}case 25:{this.stateBeforeComment(n);break}case 24:{this.stateInProcessingInstruction(n);break}case 33:{this.stateInEntity();break}}this.index++}this.cleanup(),this.finish()}cleanup(){this.sectionStart!==this.index&&(this.state===1||this.state===32&&this.sequenceIndex===0?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):(this.state===19||this.state===20||this.state===21)&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index))}finish(){this.handleTrailingData(),this.cbs.onend()}handleTrailingData(){let t=this.buffer.length;this.sectionStart>=t||(this.state===28?this.currentSequence===Ge.CdataEnd?this.cbs.oncdata(this.sectionStart,t):this.cbs.oncomment(this.sectionStart,t):this.state===6||this.state===11||this.state===18||this.state===17||this.state===12||this.state===13||this.state===14||this.state===15||this.state===16||this.state===20||this.state===19||this.state===21||this.state===9||this.cbs.ontext(this.sectionStart,t))}emitCodePoint(t,n){}};function Wp(e,{compatConfig:t}){let n=t&&t[e];return e==="MODE"?n||3:n}function lo(e,t){let n=Wp("MODE",t),o=Wp(e,t);return n===3?o===!0:o!==!1}function Bo(e,t,n,...o){return lo(e,t)}function ic(e){throw e}function pd(e){}function _e(e,t,n,o){let s=`https://vuejs.org/error-reference/#compiler-${e}`,r=new SyntaxError(String(s));return r.code=e,r.loc=t,r}var Je=e=>e.type===4&&e.isStatic;function dd(e){switch(e){case"Teleport":case"teleport":return Ms;case"Suspense":case"suspense":return Wl;case"KeepAlive":case"keep-alive":return Ci;case"BaseTransition":case"base-transition":return sd}}var LE=/^$|^\d|[^\$\w\xA0-\uFFFF]/,ac=e=>!LE.test(e),hd=/[A-Za-z_$\xA0-\uFFFF]/,$E=/[\.\?\w$\xA0-\uFFFF]/,FE=/\s+[.[]\s*|\s*[.[]\s+/g,md=e=>e.type===4?e.content:e.loc.source,UE=e=>{let t=md(e).trim().replace(FE,a=>a.trim()),n=0,o=[],s=0,r=0,i=null;for(let a=0;a<t.length;a++){let l=t.charAt(a);switch(n){case 0:if(l==="[")o.push(n),n=1,s++;else if(l==="(")o.push(n),n=2,r++;else if(!(a===0?hd:$E).test(l))return!1;break;case 1:l==="'"||l==='"'||l==="`"?(o.push(n),n=3,i=l):l==="["?s++:l==="]"&&(--s||(n=o.pop()));break;case 2:if(l==="'"||l==='"'||l==="`")o.push(n),n=3,i=l;else if(l==="(")r++;else if(l===")"){if(a===t.length-1)return!1;--r||(n=o.pop())}break;case 3:l===i&&(n=o.pop(),i=null);break}}return!s&&!r};var gd=UE,BE=/^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/,HE=e=>BE.test(md(e));var jE=HE;function lt(e,t,n=!1){for(let o=0;o<e.props.length;o++){let s=e.props[o];if(s.type===7&&(n||s.exp)&&(z(t)?s.name===t:t.test(s.name)))return s}}function Ks(e,t,n=!1,o=!1){for(let s=0;s<e.props.length;s++){let r=e.props[s];if(r.type===6){if(n)continue;if(r.name===t&&(r.value||o))return r}else if(r.name==="bind"&&(r.exp||o)&&Pn(r.arg,t))return r}}function Pn(e,t){return!!(e&&Je(e)&&e.content===t)}function vd(e){return e.props.some(t=>t.type===7&&t.name==="bind"&&(!t.arg||t.arg.type!==4||!t.arg.isStatic))}function Vl(e){return e.type===5||e.type===2}function Kp(e){return e.type===7&&e.name==="pre"}function WE(e){return e.type===7&&e.name==="slot"}function Ii(e){return e.type===1&&e.tagType===3}function Vi(e){return e.type===1&&e.tagType===2}var KE=new Set([$s,Ws]);function lc(e,t=[]){if(e&&!z(e)&&e.type===14){let n=e.callee;if(!z(n)&&KE.has(n))return lc(e.arguments[0],t.concat(e))}return[e,t]}function Ri(e,t,n){if(e.type!==13&&XE(e,t))return;let o,s=e.type===13?e.props:e.arguments[2],r=[],i;if(s&&!z(s)&&s.type===14){let a=lc(s);s=a[0],r=a[1],i=r[r.length-1]}if(s==null||z(s))o=At([t]);else if(s.type===14){let a=s.arguments[0];!z(a)&&a.type===15?Fl(t,a)||a.properties.unshift(t):s.callee===nc?o=Pe(n.helper(Ai),[At([t]),s]):s.arguments.unshift(At([t])),!o&&(o=s)}else s.type===15?(Fl(t,s)||s.properties.unshift(t),o=s):(o=Pe(n.helper(Ai),[At([t]),s]),i&&i.callee===Ws&&(i=r[r.length-2]));e.type===13?i?i.arguments[0]=o:e.props=o:i?i.arguments[0]=o:e.arguments[2]=o}function XE(e,t){var n,o,s;if(t.key.type!==4||t.key.content!=="key")return!1;let r=e.arguments[2];if(r&&!z(r)){let[i]=lc(r);if(i&&!z(i)&&i.type===15&&Fl(t,i))return!0}return(n=e.arguments)[2]||(n[2]="{}"),(o=e.arguments)[3]||(o[3]="undefined"),(s=e.arguments)[4]||(s[4]="undefined"),e.arguments[5]=t.value,!0}function Fl(e,t){let n=!1;if(e.key.type===4){let o=e.key.content;n=t.properties.some(s=>s.key.type===4&&s.key.content===o)}return n}function Us(e,t){return`_${t}_${e.replace(/[^\w]/g,(n,o)=>n==="-"?"_":e.charCodeAt(o).toString())}`}function zE(e){return e.type===14&&e.callee===sc?e.arguments[1].returns:e}var GE=/([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;function Ed(e){for(let t=0;t<e.length;t++)if(!Et(e.charCodeAt(t)))return!1;return!0}function cc(e){return e.type===2&&Ed(e.content)||e.type===12&&cc(e.content)}function Mi(e){return e.type===3||cc(e)}var _d={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:Sn,isPreTag:Sn,isIgnoreNewlineTag:Sn,isCustomElement:Sn,onError:ic,onWarn:pd,comments:!1,prefixIdentifiers:!1},ue=_d,Bs=null,En="",qe=null,ne=null,at="",vn=-1,ro=-1,uc=0,Rn=!1,Ul=null,be=[],Te=new $l(be,{onerr:gn,ontext(e,t){Ni(We(e,t),e,t)},ontextentity(e,t,n){Ni(e,t,n)},oninterpolation(e,t){if(Rn)return Ni(We(e,t),e,t);let n=e+Te.delimiterOpen.length,o=t-Te.delimiterClose.length;for(;Et(En.charCodeAt(n));)n++;for(;Et(En.charCodeAt(o-1));)o--;let s=We(n,o);s.includes("&")&&(s=ue.decodeEntities(s,!1)),Bl({type:5,content:Ti(s,!1,Re(n,o)),loc:Re(e,t)})},onopentagname(e,t){let n=We(e,t);qe={type:1,tag:n,ns:ue.getNamespace(n,be[0],ue.ns),tagType:0,props:[],children:[],loc:Re(e-1,t),codegenNode:void 0}},onopentagend(e){zp(e)},onclosetag(e,t){let n=We(e,t);if(!ue.isVoidTag(n)){let o=!1;for(let s=0;s<be.length;s++)if(be[s].tag.toLowerCase()===n.toLowerCase()){o=!0,s>0&&gn(24,be[0].loc.start.offset);for(let i=0;i<=s;i++){let a=be.shift();xi(a,t,i<s)}break}o||gn(23,yd(e,60))}},onselfclosingtag(e){let t=qe.tag;qe.isSelfClosing=!0,zp(e),be[0]&&be[0].tag===t&&xi(be.shift(),e)},onattribname(e,t){ne={type:6,name:We(e,t),nameLoc:Re(e,t),value:void 0,loc:Re(e)}},ondirname(e,t){let n=We(e,t),o=n==="."||n===":"?"bind":n==="@"?"on":n==="#"?"slot":n.slice(2);if(!Rn&&o===""&&gn(26,e),Rn||o==="")ne={type:6,name:n,nameLoc:Re(e,t),value:void 0,loc:Re(e)};else if(ne={type:7,name:o,rawName:n,exp:void 0,arg:void 0,modifiers:n==="."?[J("prop")]:[],loc:Re(e)},o==="pre"){Rn=Te.inVPre=!0,Ul=qe;let s=qe.props;for(let r=0;r<s.length;r++)s[r].type===7&&(s[r]=s_(s[r]))}},ondirarg(e,t){if(e===t)return;let n=We(e,t);if(Rn&&!Kp(ne))ne.name+=n,io(ne.nameLoc,t);else{let o=n[0]!=="[";ne.arg=Ti(o?n:n.slice(1,-1),o,Re(e,t),o?3:0)}},ondirmodifier(e,t){let n=We(e,t);if(Rn&&!Kp(ne))ne.name+="."+n,io(ne.nameLoc,t);else if(ne.name==="slot"){let o=ne.arg;o&&(o.content+="."+n,io(o.loc,t))}else{let o=J(n,!0,Re(e,t));ne.modifiers.push(o)}},onattribdata(e,t){at+=We(e,t),vn<0&&(vn=e),ro=t},onattribentity(e,t,n){at+=e,vn<0&&(vn=t),ro=n},onattribnameend(e){let t=ne.loc.start.offset,n=We(t,e);ne.type===7&&(ne.rawName=n),qe.props.some(o=>(o.type===7?o.rawName:o.name)===n)&&gn(2,t)},onattribend(e,t){if(qe&&ne){if(io(ne.loc,t),e!==0)if(at.includes("&")&&(at=ue.decodeEntities(at,!0)),ne.type===6)ne.name==="class"&&(at=Nd(at).trim()),e===1&&!at&&gn(13,t),ne.value={type:2,content:at,loc:e===1?Re(vn,ro):Re(vn-1,ro+1)},Te.inSFCRoot&&qe.tag==="template"&&ne.name==="lang"&&at&&at!=="html"&&Te.enterRCDATA(ki("</template"),0);else{let n=0;ne.exp=Ti(at,!1,Re(vn,ro),0,n),ne.name==="for"&&(ne.forParseResult=JE(ne.exp));let o=-1;ne.name==="bind"&&(o=ne.modifiers.findIndex(s=>s.content==="sync"))>-1&&Bo("COMPILER_V_BIND_SYNC",ue,ne.loc,ne.arg.loc.source)&&(ne.name="model",ne.modifiers.splice(o,1))}(ne.type!==7||ne.name!=="pre")&&qe.props.push(ne)}at="",vn=ro=-1},oncomment(e,t){ue.comments&&Bl({type:3,content:We(e,t),loc:Re(e-4,t+3)})},onend(){let e=En.length;for(let t=0;t<be.length;t++)xi(be[t],e-1),gn(24,be[t].loc.start.offset)},oncdata(e,t){(be[0]?be[0].ns:ue.ns)!==0?Ni(We(e,t),e,t):gn(1,e-9)},onprocessinginstruction(e){(be[0]?be[0].ns:ue.ns)===0&&gn(21,e-1)}}),Xp=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,qE=/^\(|\)$/g;function JE(e){let t=e.loc,n=e.content,o=n.match(GE);if(!o)return;let[,s,r]=o,i=(c,p,d=!1)=>{let _=t.start.offset+p,m=_+c.length;return Ti(c,!1,Re(_,m),0,d?1:0)},a={source:i(r.trim(),n.indexOf(r,s.length)),value:void 0,key:void 0,index:void 0,finalized:!1},l=s.trim().replace(qE,"").trim(),u=s.indexOf(l),f=l.match(Xp);if(f){l=l.replace(Xp,"").trim();let c=f[1].trim(),p;if(c&&(p=n.indexOf(c,u+l.length),a.key=i(c,p,!0)),f[2]){let d=f[2].trim();d&&(a.index=i(d,n.indexOf(d,a.key?p+c.length:u+l.length),!0))}}return l&&(a.value=i(l,u,!0)),a}function We(e,t){return En.slice(e,t)}function zp(e){Te.inSFCRoot&&(qe.innerLoc=Re(e+1,e+1)),Bl(qe);let{tag:t,ns:n}=qe;n===0&&ue.isPreTag(t)&&uc++,ue.isVoidTag(t)?xi(qe,e):(be.unshift(qe),(n===1||n===2)&&(Te.inXML=!0)),qe=null}function Ni(e,t,n){{let r=be[0]&&be[0].tag;r!=="script"&&r!=="style"&&e.includes("&")&&(e=ue.decodeEntities(e,!1))}let o=be[0]||Bs,s=o.children[o.children.length-1];s&&s.type===2?(s.content+=e,io(s.loc,n)):o.children.push({type:2,content:e,loc:Re(t,n)})}function xi(e,t,n=!1){n?io(e.loc,yd(t,60)):io(e.loc,YE(t,62)+1),Te.inSFCRoot&&(e.children.length?e.innerLoc.end=q({},e.children[e.children.length-1].loc.end):e.innerLoc.end=q({},e.innerLoc.start),e.innerLoc.source=We(e.innerLoc.start.offset,e.innerLoc.end.offset));let{tag:o,ns:s,children:r}=e;if(Rn||(o==="slot"?e.tagType=2:Gp(e)?e.tagType=3:ZE(e)&&(e.tagType=1)),Te.inRCDATA||(e.children=bd(r)),s===0&&ue.isIgnoreNewlineTag(o)){let i=r[0];i&&i.type===2&&(i.content=i.content.replace(/^\r?\n/,""))}s===0&&ue.isPreTag(o)&&uc--,Ul===e&&(Rn=Te.inVPre=!1,Ul=null),Te.inXML&&(be[0]?be[0].ns:ue.ns)===0&&(Te.inXML=!1);{let i=e.props;if(!Te.inSFCRoot&&lo("COMPILER_NATIVE_TEMPLATE",ue)&&e.tag==="template"&&!Gp(e)){let l=be[0]||Bs,u=l.children.indexOf(e);l.children.splice(u,1,...e.children)}let a=i.find(l=>l.type===6&&l.name==="inline-template");a&&Bo("COMPILER_INLINE_TEMPLATE",ue,a.loc)&&e.children.length&&(a.value={type:2,content:We(e.children[0].loc.start.offset,e.children[e.children.length-1].loc.end.offset),loc:a.loc})}}function YE(e,t){let n=e;for(;En.charCodeAt(n)!==t&&n<En.length-1;)n++;return n}function yd(e,t){let n=e;for(;En.charCodeAt(n)!==t&&n>=0;)n--;return n}var QE=new Set(["if","else","else-if","for","slot"]);function Gp({tag:e,props:t}){if(e==="template"){for(let n=0;n<t.length;n++)if(t[n].type===7&&QE.has(t[n].name))return!0}return!1}function ZE({tag:e,props:t}){if(ue.isCustomElement(e))return!1;if(e==="component"||e_(e.charCodeAt(0))||dd(e)||ue.isBuiltInComponent&&ue.isBuiltInComponent(e)||ue.isNativeTag&&!ue.isNativeTag(e))return!0;for(let n=0;n<t.length;n++){let o=t[n];if(o.type===6){if(o.name==="is"&&o.value){if(o.value.content.startsWith("vue:"))return!0;if(Bo("COMPILER_IS_ON_ELEMENT",ue,o.loc))return!0}}else if(o.name==="bind"&&Pn(o.arg,"is")&&Bo("COMPILER_IS_ON_ELEMENT",ue,o.loc))return!0}return!1}function e_(e){return e>64&&e<91}var t_=/\r\n/g;function bd(e){let t=ue.whitespace!=="preserve",n=!1;for(let o=0;o<e.length;o++){let s=e[o];if(s.type===2)if(uc)s.content=s.content.replace(t_,`
`);else if(Ed(s.content)){let r=e[o-1]&&e[o-1].type,i=e[o+1]&&e[o+1].type;!r||!i||t&&(r===3&&(i===3||i===1)||r===1&&(i===3||i===1&&n_(s.content)))?(n=!0,e[o]=null):s.content=" "}else t&&(s.content=Nd(s.content))}return n?e.filter(Boolean):e}function n_(e){for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(n===10||n===13)return!0}return!1}function Nd(e){let t="",n=!1;for(let o=0;o<e.length;o++)Et(e.charCodeAt(o))?n||(t+=" ",n=!0):(t+=e[o],n=!1);return t}function Bl(e){(be[0]||Bs).children.push(e)}function Re(e,t){return{start:Te.getPos(e),end:t==null?t:Te.getPos(t),source:t==null?t:We(e,t)}}function o_(e){return{start:q({},e.start),end:q({},e.end),source:e.source}}function io(e,t){e.end=Te.getPos(t),e.source=We(e.start.offset,t)}function s_(e){let t={type:6,name:e.rawName,nameLoc:Re(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){let n=e.exp.loc;n.end.offset<e.loc.end.offset&&(n.start.offset--,n.start.column--,n.end.offset++,n.end.column++),t.value={type:2,content:e.exp.content,loc:n}}return t}function Ti(e,t=!1,n,o=0,s=0){return J(e,t,n,o)}function gn(e,t,n){ue.onError(_e(e,Re(t,t),void 0,n))}function r_(){Te.reset(),qe=null,ne=null,at="",vn=-1,ro=-1,be.length=0}function Sd(e,t){if(r_(),En=e,ue=q({},_d),t){let s;for(s in t)t[s]!=null&&(ue[s]=t[s])}Te.mode=ue.parseMode==="html"?1:ue.parseMode==="sfc"?2:0,Te.inXML=ue.ns===1||ue.ns===2;let n=t&&t.delimiters;n&&(Te.delimiterOpen=ki(n[0]),Te.delimiterClose=ki(n[1]));let o=Bs=RE([],e);return Te.parse(En),o.loc=Re(0,e.length),o.children=bd(o.children),Bs=null,o}function i_(e,t){Oi(e,void 0,t,!!xd(e))}function xd(e){let t=e.children.filter(n=>n.type!==3);return t.length===1&&t[0].type===1&&!Vi(t[0])?t[0]:null}function Oi(e,t,n,o=!1,s=!1){let{children:r}=e,i=[];for(let f=0;f<r.length;f++){let c=r[f];if(c.type===1&&c.tagType===0){let p=o?0:ct(c,n);if(p>0){if(p>=2){c.codegenNode.patchFlag=-1,i.push(c);continue}}else{let d=c.codegenNode;if(d.type===13){let _=d.patchFlag;if((_===void 0||_===512||_===1)&&Od(c,n)>=2){let m=wd(c);m&&(d.props=n.hoist(m))}d.dynamicProps&&(d.dynamicProps=n.hoist(d.dynamicProps))}}}else if(c.type===12&&(o?0:ct(c,n))>=2){c.codegenNode.type===14&&c.codegenNode.arguments.length>0&&c.codegenNode.arguments.push("-1"),i.push(c);continue}if(c.type===1){let p=c.tagType===1;p&&n.scopes.vSlot++,Oi(c,e,n,!1,s),p&&n.scopes.vSlot--}else if(c.type===11)Oi(c,e,n,c.children.length===1,!0);else if(c.type===9)for(let p=0;p<c.branches.length;p++)Oi(c.branches[p],e,n,c.branches[p].children.length===1,s)}let a=!1;if(i.length===r.length&&e.type===1){if(e.tagType===0&&e.codegenNode&&e.codegenNode.type===13&&H(e.codegenNode.children))e.codegenNode.children=l(ao(e.codegenNode.children)),a=!0;else if(e.tagType===1&&e.codegenNode&&e.codegenNode.type===13&&e.codegenNode.children&&!H(e.codegenNode.children)&&e.codegenNode.children.type===15){let f=u(e.codegenNode,"default");f&&(f.returns=l(ao(f.returns)),a=!0)}else if(e.tagType===3&&t&&t.type===1&&t.tagType===1&&t.codegenNode&&t.codegenNode.type===13&&t.codegenNode.children&&!H(t.codegenNode.children)&&t.codegenNode.children.type===15){let f=lt(e,"slot",!0),c=f&&f.arg&&u(t.codegenNode,f.arg);c&&(c.returns=l(ao(c.returns)),a=!0)}}if(!a)for(let f of i)f.codegenNode=n.cache(f.codegenNode);function l(f){let c=n.cache(f);return c.needArraySpread=!0,c}function u(f,c){if(f.children&&!H(f.children)&&f.children.type===15){let p=f.children.properties.find(d=>d.key===c||d.key.content===c);return p&&p.value}}i.length&&n.transformHoist&&n.transformHoist(r,n,e)}function ct(e,t){let{constantCache:n}=t;switch(e.type){case 1:if(e.tagType!==0)return 0;let o=n.get(e);if(o!==void 0)return o;let s=e.codegenNode;if(s.type!==13||s.isBlock&&e.tag!=="svg"&&e.tag!=="foreignObject"&&e.tag!=="math")return 0;if(s.patchFlag===void 0){let i=3,a=Od(e,t);if(a===0)return n.set(e,0),0;a<i&&(i=a);for(let l=0;l<e.children.length;l++){let u=ct(e.children[l],t);if(u===0)return n.set(e,0),0;u<i&&(i=u)}if(i>1)for(let l=0;l<e.props.length;l++){let u=e.props[l];if(u.type===7&&u.name==="bind"&&u.exp){let f=ct(u.exp,t);if(f===0)return n.set(e,0),0;f<i&&(i=f)}}if(s.isBlock){for(let l=0;l<e.props.length;l++)if(e.props[l].type===7)return n.set(e,0),0;t.removeHelper(co),t.removeHelper(Uo(t.inSSR,s.isComponent)),s.isBlock=!1,t.helper(Fo(t.inSSR,s.isComponent))}return n.set(e,i),i}else return n.set(e,0),0;case 2:case 3:return 3;case 9:case 11:case 10:return 0;case 5:case 12:return ct(e.content,t);case 4:return e.constType;case 8:let r=3;for(let i=0;i<e.children.length;i++){let a=e.children[i];if(z(a)||Ae(a))continue;let l=ct(a,t);if(l===0)return 0;l<r&&(r=l)}return r;case 20:return 2;default:return 0}}var a_=new Set([ec,tc,$s,Ws]);function Td(e,t){if(e.type===14&&!z(e.callee)&&a_.has(e.callee)){let n=e.arguments[0];if(n.type===4)return ct(n,t);if(n.type===14)return Td(n,t)}return 0}function Od(e,t){let n=3,o=wd(e);if(o&&o.type===15){let{properties:s}=o;for(let r=0;r<s.length;r++){let{key:i,value:a}=s[r],l=ct(i,t);if(l===0)return l;l<n&&(n=l);let u;if(a.type===4?u=ct(a,t):a.type===14?u=Td(a,t):u=0,u===0)return u;u<n&&(n=u)}}return n}function wd(e){let t=e.codegenNode;if(t.type===13)return t.props}function l_(e,{filename:t="",prefixIdentifiers:n=!1,hoistStatic:o=!1,hmr:s=!1,cacheHandlers:r=!1,nodeTransforms:i=[],directiveTransforms:a={},transformHoist:l=null,isBuiltInComponent:u=De,isCustomElement:f=De,expressionPlugins:c=[],scopeId:p=null,slotted:d=!0,ssr:_=!1,inSSR:m=!1,ssrCssVars:b="",bindingMetadata:x=Z,inline:N=!1,isTS:v=!1,onError:y=ic,onWarn:g=pd,compatConfig:D}){let k=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),S={filename:t,selfName:k&&St(le(k[1])),prefixIdentifiers:n,hoistStatic:o,hmr:s,cacheHandlers:r,nodeTransforms:i,directiveTransforms:a,transformHoist:l,isBuiltInComponent:u,isCustomElement:f,expressionPlugins:c,scopeId:p,slotted:d,ssr:_,inSSR:m,ssrCssVars:b,bindingMetadata:x,inline:N,isTS:v,onError:y,onWarn:g,compatConfig:D,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],cached:[],constantCache:new WeakMap,vForMemoKeyedNodes:new WeakSet,temps:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,grandParent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(O){let V=S.helpers.get(O)||0;return S.helpers.set(O,V+1),O},removeHelper(O){let V=S.helpers.get(O);if(V){let M=V-1;M?S.helpers.set(O,M):S.helpers.delete(O)}},helperString(O){return`_${Lo[S.helper(O)]}`},replaceNode(O){S.parent.children[S.childIndex]=S.currentNode=O},removeNode(O){let V=S.parent.children,M=O?V.indexOf(O):S.currentNode?S.childIndex:-1;!O||O===S.currentNode?(S.currentNode=null,S.onNodeRemoved()):S.childIndex>M&&(S.childIndex--,S.onNodeRemoved()),S.parent.children.splice(M,1)},onNodeRemoved:De,addIdentifiers(O){},removeIdentifiers(O){},hoist(O){z(O)&&(O=J(O)),S.hoists.push(O);let V=J(`_hoisted_${S.hoists.length}`,!1,O.loc,2);return V.hoisted=O,V},cache(O,V=!1,M=!1){let w=PE(S.cached.length,O,V,M);return S.cached.push(w),w}};return S.filters=new Set,S}function c_(e,t){let n=l_(e,t);Li(e,n),t.hoistStatic&&i_(e,n),t.ssr||u_(e,n),e.helpers=new Set([...n.helpers.keys()]),e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached,e.transformed=!0,e.filters=[...n.filters]}function u_(e,t){let{helper:n}=t,{children:o}=e;if(o.length===1){let s=xd(e);if(s&&s.codegenNode){let r=s.codegenNode;r.type===13&&rc(r,t),e.codegenNode=r}else e.codegenNode=o[0]}else if(o.length>1){let s=64;e.codegenNode=Fs(t,n(Ls),void 0,e.children,s,void 0,void 0,!0,void 0,!1)}}function f_(e,t){let n=0,o=()=>{n--};for(;n<e.children.length;n++){let s=e.children[n];z(s)||(t.grandParent=t.parent,t.parent=e,t.childIndex=n,t.onNodeRemoved=o,Li(s,t))}}function Li(e,t){t.currentNode=e;let{nodeTransforms:n}=t,o=[];for(let r=0;r<n.length;r++){let i=n[r](e,t);if(i&&(H(i)?o.push(...i):o.push(i)),t.currentNode)e=t.currentNode;else return}switch(e.type){case 3:t.ssr||t.helper(Hs);break;case 5:t.ssr||t.helper(js);break;case 9:for(let r=0;r<e.branches.length;r++)Li(e.branches[r],t);break;case 10:case 11:case 1:case 0:f_(e,t);break}t.currentNode=e;let s=o.length;for(;s--;)o[s]()}function Cd(e,t){let n=z(e)?o=>o===e:o=>e.test(o);return(o,s)=>{if(o.type===1){let{props:r}=o;if(o.tagType===3&&r.some(WE))return;let i=[];for(let a=0;a<r.length;a++){let l=r[a];if(l.type===7&&n(l.name)){r.splice(a,1),a--;let u=t(o,l,s);u&&i.push(u)}}return i}}}var $i="/*@__PURE__*/",Ad=e=>`${Lo[e]}: _${Lo[e]}`;function p_(e,{mode:t="function",prefixIdentifiers:n=t==="module",sourceMap:o=!1,filename:s="template.vue.html",scopeId:r=null,optimizeImports:i=!1,runtimeGlobalName:a="Vue",runtimeModuleName:l="vue",ssrRuntimeModuleName:u="vue/server-renderer",ssr:f=!1,isTS:c=!1,inSSR:p=!1}){let d={mode:t,prefixIdentifiers:n,sourceMap:o,filename:s,scopeId:r,optimizeImports:i,runtimeGlobalName:a,runtimeModuleName:l,ssrRuntimeModuleName:u,ssr:f,isTS:c,inSSR:p,source:e.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper(m){return`_${Lo[m]}`},push(m,b=-2,x){d.code+=m},indent(){_(++d.indentLevel)},deindent(m=!1){m?--d.indentLevel:_(--d.indentLevel)},newline(){_(d.indentLevel)}};function _(m){d.push(`
`+"  ".repeat(m),0)}return d}function d_(e,t={}){let n=p_(e,t);t.onContextCreated&&t.onContextCreated(n);let{mode:o,push:s,prefixIdentifiers:r,indent:i,deindent:a,newline:l,scopeId:u,ssr:f}=n,c=Array.from(e.helpers),p=c.length>0,d=!r&&o!=="module";h_(e,n);let m=f?"ssrRender":"render",x=(f?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ");if(s(`function ${m}(${x}) {`),i(),d&&(s("with (_ctx) {"),i(),p&&(s(`const { ${c.map(Ad).join(", ")} } = _Vue
`,-1),l())),e.components.length&&(Rl(e.components,"component",n),(e.directives.length||e.temps>0)&&l()),e.directives.length&&(Rl(e.directives,"directive",n),e.temps>0&&l()),e.filters&&e.filters.length&&(l(),Rl(e.filters,"filter",n),l()),e.temps>0){s("let ");for(let N=0;N<e.temps;N++)s(`${N>0?", ":""}_temp${N}`)}return(e.components.length||e.directives.length||e.temps)&&(s(`
`,0),l()),f||s("return "),e.codegenNode?Ye(e.codegenNode,n):s("null"),d&&(a(),s("}")),a(),s("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}function h_(e,t){let{ssr:n,prefixIdentifiers:o,push:s,newline:r,runtimeModuleName:i,runtimeGlobalName:a,ssrRuntimeModuleName:l}=t,u=a,f=Array.from(e.helpers);if(f.length>0&&(s(`const _Vue = ${u}
`,-1),e.hoists.length)){let c=[Kl,Xl,Hs,zl,ad].filter(p=>f.includes(p)).map(Ad).join(", ");s(`const { ${c} } = _Vue
`,-1)}m_(e.hoists,t),r(),s("return ")}function Rl(e,t,{helper:n,push:o,newline:s,isTS:r}){let i=n(t==="filter"?Yl:t==="component"?Gl:Jl);for(let a=0;a<e.length;a++){let l=e[a],u=l.endsWith("__self");u&&(l=l.slice(0,-6)),o(`const ${Us(l,t)} = ${i}(${JSON.stringify(l)}${u?", true":""})${r?"!":""}`),a<e.length-1&&s()}}function m_(e,t){if(!e.length)return;t.pure=!0;let{push:n,newline:o}=t;o();for(let s=0;s<e.length;s++){let r=e[s];r&&(n(`const _hoisted_${s+1} = `),Ye(r,t),o())}t.pure=!1}function fc(e,t){let n=e.length>3||!1;t.push("["),n&&t.indent(),Xs(e,t,n),n&&t.deindent(),t.push("]")}function Xs(e,t,n=!1,o=!0){let{push:s,newline:r}=t;for(let i=0;i<e.length;i++){let a=e[i];z(a)?s(a,-3):H(a)?fc(a,t):Ye(a,t),i<e.length-1&&(n?(o&&s(","),r()):o&&s(", "))}}function Ye(e,t){if(z(e)){t.push(e,-3);return}if(Ae(e)){t.push(t.helper(e));return}switch(e.type){case 1:case 9:case 11:Ye(e.codegenNode,t);break;case 2:g_(e,t);break;case 4:Dd(e,t);break;case 5:v_(e,t);break;case 12:Ye(e.codegenNode,t);break;case 8:kd(e,t);break;case 3:__(e,t);break;case 13:y_(e,t);break;case 14:N_(e,t);break;case 15:S_(e,t);break;case 17:x_(e,t);break;case 18:T_(e,t);break;case 19:O_(e,t);break;case 20:w_(e,t);break;case 21:Xs(e.body,t,!0,!1);break;case 22:break;case 23:break;case 24:break;case 25:break;case 26:break;case 10:break;default:}}function g_(e,t){t.push(JSON.stringify(e.content),-3,e)}function Dd(e,t){let{content:n,isStatic:o}=e;t.push(o?JSON.stringify(n):n,-3,e)}function v_(e,t){let{push:n,helper:o,pure:s}=t;s&&n($i),n(`${o(js)}(`),Ye(e.content,t),n(")")}function kd(e,t){for(let n=0;n<e.children.length;n++){let o=e.children[n];z(o)?t.push(o,-3):Ye(o,t)}}function E_(e,t){let{push:n}=t;if(e.type===8)n("["),kd(e,t),n("]");else if(e.isStatic){let o=ac(e.content)?e.content:JSON.stringify(e.content);n(o,-2,e)}else n(`[${e.content}]`,-3,e)}function __(e,t){let{push:n,helper:o,pure:s}=t;s&&n($i),n(`${o(Hs)}(${JSON.stringify(e.content)})`,-3,e)}function y_(e,t){let{push:n,helper:o,pure:s}=t,{tag:r,props:i,children:a,patchFlag:l,dynamicProps:u,directives:f,isBlock:c,disableTracking:p,isComponent:d}=e,_;l&&(_=String(l)),f&&n(o(Ql)+"("),c&&n(`(${o(co)}(${p?"true":""}), `),s&&n($i);let m=c?Uo(t.inSSR,d):Fo(t.inSSR,d);n(o(m)+"(",-2,e),Xs(b_([r,i,a,_,u]),t),n(")"),c&&n(")"),f&&(n(", "),Ye(f,t),n(")"))}function b_(e){let t=e.length;for(;t--&&e[t]==null;);return e.slice(0,t+1).map(n=>n||"null")}function N_(e,t){let{push:n,helper:o,pure:s}=t,r=z(e.callee)?e.callee:o(e.callee);s&&n($i),n(r+"(",-2,e),Xs(e.arguments,t),n(")")}function S_(e,t){let{push:n,indent:o,deindent:s,newline:r}=t,{properties:i}=e;if(!i.length){n("{}",-2,e);return}let a=i.length>1||!1;n(a?"{":"{ "),a&&o();for(let l=0;l<i.length;l++){let{key:u,value:f}=i[l];E_(u,t),n(": "),Ye(f,t),l<i.length-1&&(n(","),r())}a&&s(),n(a?"}":" }")}function x_(e,t){fc(e.elements,t)}function T_(e,t){let{push:n,indent:o,deindent:s}=t,{params:r,returns:i,body:a,newline:l,isSlot:u}=e;u&&n(`_${Lo[oc]}(`),n("(",-2,e),H(r)?Xs(r,t):r&&Ye(r,t),n(") => "),(l||a)&&(n("{"),o()),i?(l&&n("return "),H(i)?fc(i,t):Ye(i,t)):a&&Ye(a,t),(l||a)&&(s(),n("}")),u&&(e.isNonScopedSlot&&n(", undefined, true"),n(")"))}function O_(e,t){let{test:n,consequent:o,alternate:s,newline:r}=e,{push:i,indent:a,deindent:l,newline:u}=t;if(n.type===4){let c=!ac(n.content);c&&i("("),Dd(n,t),c&&i(")")}else i("("),Ye(n,t),i(")");r&&a(),t.indentLevel++,r||i(" "),i("? "),Ye(o,t),t.indentLevel--,r&&u(),r||i(" "),i(": ");let f=s.type===19;f||t.indentLevel++,Ye(s,t),f||t.indentLevel--,r&&l(!0)}function w_(e,t){let{push:n,helper:o,indent:s,deindent:r,newline:i}=t,{needPauseTracking:a,needArraySpread:l}=e;l&&n("[...("),n(`_cache[${e.index}] || (`),a&&(s(),n(`${o(Di)}(-1`),e.inVOnce&&n(", true"),n("),"),i(),n("(")),n(`_cache[${e.index}] = `),Ye(e.value,t),a&&(n(`).cacheIndex = ${e.index},`),i(),n(`${o(Di)}(1),`),i(),n(`_cache[${e.index}]`),r()),n(")"),l&&n(")]")}var Pb=new RegExp("\\b"+"arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b")+"\\b");var C_=Cd(/^(?:if|else|else-if)$/,(e,t,n)=>A_(e,t,n,(o,s,r)=>{let i=n.parent.children,a=i.indexOf(o),l=0;for(;a-->=0;){let u=i[a];u&&u.type===9&&(l+=u.branches.length)}return()=>{if(r)o.codegenNode=Jp(s,l,n);else{let u=D_(o.codegenNode);u.alternate=Jp(s,l+o.branches.length-1,n)}}}));function A_(e,t,n,o){if(t.name!=="else"&&(!t.exp||!t.exp.content.trim())){let s=t.exp?t.exp.loc:e.loc;n.onError(_e(28,t.loc)),t.exp=J("true",!1,s)}if(t.name==="if"){let s=qp(e,t),r={type:9,loc:o_(e.loc),branches:[s]};if(n.replaceNode(r),o)return o(r,s,!0)}else{let s=n.parent.children,r=[],i=s.indexOf(e);for(;i-->=-1;){let a=s[i];if(a&&Mi(a)){n.removeNode(a);continue}if(a&&a.type===9){(t.name==="else-if"||t.name==="else")&&a.branches[a.branches.length-1].condition===void 0&&n.onError(_e(30,e.loc)),n.removeNode();let l=qp(e,t);a.branches.push(l);let u=o&&o(a,l,!1);Li(l,n),u&&u(),n.currentNode=null}else n.onError(_e(30,e.loc));break}}}function qp(e,t){let n=e.tagType===3;return{type:10,loc:e.loc,condition:t.name==="else"?void 0:t.exp,children:n&&!lt(e,"for")?e.children:[e],userKey:Ks(e,"key"),isTemplateIf:n}}function Jp(e,t,n){return e.condition?Ll(e.condition,Yp(e,t,n),Pe(n.helper(Hs),['""',"true"])):Yp(e,t,n)}function Yp(e,t,n){let{helper:o}=n,s=we("key",J(`${t}`,!1,_t,2)),{children:r}=e,i=r[0];if(r.length!==1||i.type!==1)if(r.length===1&&i.type===11){let l=i.codegenNode;return Ri(l,s,n),l}else return Fs(n,o(Ls),At([s]),r,64,void 0,void 0,!0,!1,!1,e.loc);else{let l=i.codegenNode,u=zE(l);return u.type===13&&rc(u,n),Ri(u,s,n),l}}function D_(e){for(;;)if(e.type===19)if(e.alternate.type===19)e=e.alternate;else return e;else e.type===20&&(e=e.value)}var k_=Cd("for",(e,t,n)=>{let{helper:o,removeHelper:s}=n;return I_(e,t,n,r=>{let i=Pe(o(Zl),[r.source]),a=Ii(e),l=lt(e,"memo"),u=Ks(e,"key",!1,!0);u&&u.type;let f=u&&(u.type===6?u.value?J(u.value.content,!0):void 0:u.exp),c=f?we("key",f):null,p=r.source.type===4&&r.source.constType>0,d=p?64:u?128:256;return r.codegenNode=Fs(n,o(Ls),void 0,i,d,void 0,void 0,!0,!p,!1,e.loc),()=>{var _;let m,{children:b}=r,x=b.length!==1||b[0].type!==1,N=Vi(e)?e:a&&e.children.length===1&&Vi(e.children[0])?e.children[0]:null;if(N)m=N.codegenNode,a&&c&&Ri(m,c,n);else if(x)m=Fs(n,o(Ls),c?At([c]):void 0,e.children,64,void 0,void 0,!0,void 0,!1);else{m=b[0].codegenNode,a&&c&&Ri(m,c,n);let v=!p||m.isBlockRequired===!0;m.isBlock!==v&&(m.isBlock?(s(co),s(Uo(n.inSSR,m.isComponent))):s(Fo(n.inSSR,m.isComponent))),m.isBlock=v,m.isBlock?(o(co),o(Uo(n.inSSR,m.isComponent))):(o(Fo(n.inSSR,m.isComponent)),m.needsPatch&&(m.patchFlag=((_=m.patchFlag)!=null?_:0)|512))}if(l){let v=$o(Hl(r.parseResult,[J("_cached")]));v.body=ME([Dt(["const _memo = (",l.exp,")"]),Dt(["if (_cached && _cached.el",...f?[" && _cached.key === (",f,")"]:[],` && ${n.helperString(ud)}(_cached, _memo)) return _cached`]),Dt(["const _item = ",m]),J("_item.memo = _memo"),J("return _item")]),i.arguments.push(v,J("_cache"),J(String(n.cached.length))),n.cached.push(null)}else i.arguments.push($o(Hl(r.parseResult),m,!0))}})});function I_(e,t,n,o){if(!t.exp){n.onError(_e(31,t.loc));return}let s=t.forParseResult;if(!s){n.onError(_e(32,t.loc));return}Id(s,n);let{addIdentifiers:r,removeIdentifiers:i,scopes:a}=n,{source:l,value:u,key:f,index:c}=s,p={type:11,loc:t.loc,source:l,valueAlias:u,keyAlias:f,objectIndexAlias:c,parseResult:s,children:Ii(e)?e.children:[e]};n.replaceNode(p),a.vFor++;let d=o&&o(p);return()=>{a.vFor--,d&&d()}}function Id(e,t){e.finalized||(e.finalized=!0)}function Hl({value:e,key:t,index:n},o=[]){return V_([e,t,n,...o])}function V_(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map((n,o)=>n||J("_".repeat(o+1),!1))}var Qp=J("undefined",!1),R_=(e,t)=>{if(e.type===1&&(e.tagType===1||e.tagType===3)){let n=lt(e,"slot");if(n)return n.exp,t.scopes.vSlot++,()=>{t.scopes.vSlot--}}};var P_=(e,t,n,o)=>$o(e,n,!1,!0,n.length?n[0].loc:o);function M_(e,t,n=P_){t.helper(oc);let{children:o,loc:s}=e,r=[],i=[],a=t.scopes.vSlot>0||t.scopes.vFor>0,l=lt(e,"slot",!0);if(l){let{arg:b,exp:x}=l;b&&!Je(b)&&(a=!0),r.push(we(b||J("default",!0),n(x,void 0,o,s)))}let u=!1,f=!1,c=[],p=new Set,d=0;for(let b=0;b<o.length;b++){let x=o[b],N;if(!Ii(x)||!(N=lt(x,"slot",!0))){x.type!==3&&c.push(x);continue}if(l){t.onError(_e(37,N.loc));break}u=!0;let{children:v,loc:y}=x,{arg:g=J("default",!0),exp:D,loc:k}=N,S;Je(g)?S=g?g.content:"default":a=!0;let O=lt(x,"for"),V=n(D,O,v,y),M,w;if(M=lt(x,"if"))a=!0,i.push(Ll(M.exp,Si(g,V,d++),Qp));else if(w=lt(x,/^else(?:-if)?$/,!0)){let $=b,P;for(;$--&&(P=o[$],!!Mi(P)););if(P&&Ii(P)&&lt(P,/^(?:else-)?if$/)){let W=i[i.length-1];for(;W.alternate.type===19;)W=W.alternate;W.alternate=w.exp?Ll(w.exp,Si(g,V,d++),Qp):Si(g,V,d++)}else t.onError(_e(30,w.loc))}else if(O){a=!0;let $=O.forParseResult;$?(Id($,t),i.push(Pe(t.helper(Zl),[$.source,$o(Hl($),Si(g,V),!0)]))):t.onError(_e(32,O.loc))}else{if(S){if(p.has(S)){t.onError(_e(38,k));continue}p.add(S),S==="default"&&(f=!0)}r.push(we(g,V))}}if(!l){let b=(x,N)=>{let v=n(x,void 0,N,s);return t.compatConfig&&(v.isNonScopedSlot=!0),we("default",v)};u?c.length&&!c.every(cc)&&(f?t.onError(_e(39,c[0].loc)):r.push(b(void 0,c))):r.push(b(void 0,o))}let _=a?2:wi(e.children)?3:1,m=At(r.concat(we("_",J(_+"",!1))),s);return i.length&&(m=Pe(t.helper(cd),[m,ao(i)])),{slots:m,hasDynamicSlots:a}}function Si(e,t,n){let o=[we("name",e),we("fn",t)];return n!=null&&o.push(we("key",J(String(n),!0))),At(o)}function wi(e){for(let t=0;t<e.length;t++){let n=e[t];switch(n.type){case 1:if(n.tagType===2||wi(n.children))return!0;break;case 9:if(wi(n.branches))return!0;break;case 10:case 11:if(wi(n.children))return!0;break}}return!1}var Vd=new WeakMap,L_=(e,t)=>function(){if(e=t.currentNode,!(e.type===1&&(e.tagType===0||e.tagType===1)))return;let{tag:o,props:s}=e,r=e.tagType===1,i=r?$_(e,t):`"${o}"`,a=re(i)&&i.callee===ql,l,u,f=0,c,p,d,_=!1,m=!1,b=a||i===Ms||i===Wl||!r&&(o==="svg"||o==="foreignObject"||o==="math");if(s.length>0){let N=Rd(e,t,void 0,r,a);l=N.props,f=N.patchFlag,p=N.dynamicPropNames,_=N.needsPatch,m=N.isBlockRequired;let v=N.directives;d=v&&v.length?ao(v.map(y=>U_(y,t))):void 0,N.shouldUseBlock&&(b=!0)}if(e.children.length>0)if(i===Ci&&(b=!0,f|=1024),r&&i!==Ms&&i!==Ci){let{slots:v,hasDynamicSlots:y}=M_(e,t);u=v,y&&(f|=1024)}else if(e.children.length===1&&i!==Ms){let v=e.children[0],y=v.type,g=y===5||y===8;g&&ct(v,t)===0&&(f|=1),g||y===2?u=v:u=e.children}else u=e.children;p&&p.length&&(c=B_(p));let x=e.codegenNode=Fs(t,i,l,u,f===0?void 0:f,c,d,!!b,!1,r,e.loc);_=_&&(f===0||f===32),_&&(x.needsPatch=!0),m&&(x.isBlockRequired=!0)};function $_(e,t,n=!1){let{tag:o}=e,s=jl(o),r=Ks(e,"is",!1,!0);if(r)if(s||lo("COMPILER_IS_ON_ELEMENT",t)){let a;if(r.type===6?a=r.value&&J(r.value.content,!0):(a=r.exp,a||(a=J("is",!1,r.arg.loc))),a)return Pe(t.helper(ql),[a])}else r.type===6&&r.value.content.startsWith("vue:")&&(o=r.value.content.slice(4));let i=dd(o)||t.isBuiltInComponent(o);return i?(n||t.helper(i),i):(t.helper(Gl),t.components.add(o),Us(o,"component"))}function Rd(e,t,n=e.props,o,s,r=!1){let{tag:i,loc:a,children:l}=e,u=[],f=[],c=[],p=l.length>0,d=!1,_=!1,m=0,b=!1,x=!1,N=!1,v=!1,y=!1,g=!1,D=[],k=w=>{u.length&&(f.push(At(Zp(u),a)),u=[]),w&&f.push(w)},S=()=>{t.scopes.vFor>0&&u.push(we(J("ref_for",!0),J("true")))},O=({key:w,value:$})=>{if(Je(w)){let P=w.content,W=Ft(P);if(W&&(!o||s)&&P.toLowerCase()!=="onclick"&&P!=="onUpdate:modelValue"&&!Pt(P)&&(v=!0),W&&Pt(P)&&(g=!0),P==="ref"&&(b=!0),W&&$.type===14&&($=$.arguments[0]),$.type===20||($.type===4||$.type===8)&&ct($,t)>0)return;P==="class"?x=!0:P==="style"?N=!0:P!=="ref"&&P!=="key"&&!D.includes(P)&&D.push(P),o&&(P==="class"||P==="style")&&!D.includes(P)&&D.push(P)}else y=!0};for(let w=0;w<n.length;w++){let $=n[w];if($.type===6){let{loc:P,name:W,nameLoc:j,value:ie}=$,fe=!0;if(W==="ref"&&(b=!0,S()),W==="is"&&(jl(i)||ie&&ie.content.startsWith("vue:")||lo("COMPILER_IS_ON_ELEMENT",t)))continue;u.push(we(J(W,!0,j),J(ie?ie.content:"",fe,ie?ie.loc:P)))}else{let{name:P,arg:W,exp:j,loc:ie,modifiers:fe}=$,he=P==="bind",se=P==="on";if(P==="slot"){o||t.onError(_e(40,ie));continue}if(P==="once"||P==="memo"||P==="is"||he&&Pn(W,"is")&&(jl(i)||lo("COMPILER_IS_ON_ELEMENT",t))||se&&r)continue;if(he&&Pn(W,"key")&&(d=!0),se&&p&&W&&Je(W)&&le(W.content)==="vue:beforeUpdate"&&(d=!0,_=!0),he&&Pn(W,"ref")&&S(),!W&&(he||se)){if(y=!0,j)if(he){if(k(),lo("COMPILER_V_BIND_OBJECT_ORDER",t)){f.unshift(j);continue}S(),k(),f.push(j)}else k({type:14,loc:ie,callee:t.helper(nc),arguments:o?[j]:[j,"true"]});else t.onError(_e(he?34:35,ie));continue}he&&fe.some(ge=>ge.content==="prop")&&(m|=32);let Me=t.directiveTransforms[P];if(Me){let{props:ge,needRuntime:Qe}=Me($,e,t);!r&&ge.forEach(O),se&&W&&!Je(W)?k(At(ge,a)):u.push(...ge),Qe&&(c.push($),Ae(Qe)&&Vd.set($,Qe))}else ma(P)||(c.push($),p&&(d=!0,_=!0))}}let V;f.length?(k(),f.length>1?V=Pe(t.helper(Ai),f,a):V=f[0]):u.length&&(V=At(Zp(u),a)),y?m|=16:(x&&!o&&(m|=2),N&&!o&&(m|=4),D.length&&(m|=8),v&&(m|=32));let M=(m===0||m===32)&&(b||g||c.length>0);if(!d&&M&&(m|=512),!t.inSSR&&V)switch(V.type){case 15:let w=-1,$=-1,P=!1;for(let ie=0;ie<V.properties.length;ie++){let fe=V.properties[ie].key;Je(fe)?fe.content==="class"?w=ie:fe.content==="style"&&($=ie):fe.isHandlerKey||(P=!0)}let W=V.properties[w],j=V.properties[$];P?V=Pe(t.helper($s),[V]):(W&&!Je(W.value)&&(W.value=Pe(t.helper(ec),[W.value])),j&&(N||j.value.type===4&&j.value.content.trim()[0]==="["||j.value.type===17)&&(j.value=Pe(t.helper(tc),[j.value])));break;case 14:break;default:V=Pe(t.helper($s),[Pe(t.helper(Ws),[V])]);break}return{props:V,directives:c,patchFlag:m,dynamicPropNames:D,shouldUseBlock:d,needsPatch:M,isBlockRequired:_}}function Zp(e){let t=new Map,n=[];for(let o=0;o<e.length;o++){let s=e[o];if(s.key.type===8||!s.key.isStatic){n.push(s);continue}let r=s.key.content,i=t.get(r);i?(r==="style"||r==="class"||Ft(r))&&F_(i,s):(t.set(r,s),n.push(s))}return n}function F_(e,t){e.value.type===17?e.value.elements.push(t.value):e.value=ao([e.value,t.value],e.loc)}function U_(e,t){let n=[],o=Vd.get(e);o?n.push(t.helperString(o)):(t.helper(Jl),t.directives.add(e.name),n.push(Us(e.name,"directive")));let{loc:s}=e;if(e.exp&&n.push(e.exp),e.arg&&(e.exp||n.push("void 0"),n.push(e.arg)),Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));let r=J("true",!1,s);n.push(At(e.modifiers.map(i=>we(i,r)),s))}return ao(n,e.loc)}function B_(e){let t="[";for(let n=0,o=e.length;n<o;n++)t+=JSON.stringify(e[n]),n<o-1&&(t+=", ");return t+"]"}function jl(e){return e==="component"||e==="Component"}var H_=(e,t)=>{if(Vi(e)){let{children:n,loc:o}=e,{slotName:s,slotProps:r}=j_(e,t),i=[t.prefixIdentifiers?"_ctx.$slots":"$slots",s,"{}","undefined","true"],a=2;r&&(i[2]=r,a=3),n.length&&(i[3]=$o([],n,!1,!1,o),a=4),t.scopeId&&!t.slotted&&(a=5),i.splice(a),e.codegenNode=Pe(t.helper(ld),i,o)}};function j_(e,t){let n='"default"',o,s=[];for(let r=0;r<e.props.length;r++){let i=e.props[r];if(i.type===6)i.value&&(i.name==="name"?n=JSON.stringify(i.value.content):(i.name=le(i.name),s.push(i)));else if(i.name==="bind"&&Pn(i.arg,"name")){if(i.exp)n=i.exp;else if(i.arg&&i.arg.type===4){let a=le(i.arg.content);n=i.exp=J(a,!1,i.arg.loc)}}else i.name==="bind"&&i.arg&&Je(i.arg)&&(i.arg.content=le(i.arg.content)),s.push(i)}if(s.length>0){let{props:r,directives:i}=Rd(e,t,s,!1,!1);o=r,i.length&&t.onError(_e(36,i[0].loc))}return{slotName:n,slotProps:o}}var pc=(e,t,n,o)=>{let{loc:s,modifiers:r,arg:i}=e;!e.exp&&!r.length&&n.onError(_e(35,s));let a;if(i.type===4)if(i.isStatic){let c=i.content;c.startsWith("vue:")&&(c=`vnode-${c.slice(4)}`);let p=t.tagType!==0||c.startsWith("vnode")||!/[A-Z]/.test(c)?nn(le(c)):`on:${c}`;a=J(p,!0,i.loc)}else a=Dt([`${n.helperString(Ml)}(`,i,")"]);else a=i,a.children.unshift(`${n.helperString(Ml)}(`),a.children.push(")");let l=e.exp;l&&!l.content.trim()&&(l=void 0);let u=n.cacheHandlers&&!l&&!n.inVOnce;if(l){let c=gd(l),p=!(c||jE(l)),d=l.content.includes(";");(p||u&&c)&&(l=Dt([`${p?"$event":"(...args)"} => ${d?"{":"("}`,l,d?"}":")"]))}let f={props:[we(a,l||J("() => {}",!1,s))]};return o&&(f=o(f)),u&&(f.props[0].value=n.cache(f.props[0].value)),f.props.forEach(c=>c.key.isHandlerKey=!0),f},W_=(e,t,n)=>{let{modifiers:o,loc:s}=e,r=e.arg,{exp:i}=e;return i&&i.type===4&&!i.content.trim()&&(i=void 0),r.type!==4?(r.children.unshift("("),r.children.push(') || ""')):r.isStatic||(r.content=r.content?`${r.content} || ""`:'""'),o.some(a=>a.content==="camel")&&(r.type===4?r.isStatic?r.content=le(r.content):r.content=`${n.helperString(Pl)}(${r.content})`:(r.children.unshift(`${n.helperString(Pl)}(`),r.children.push(")"))),n.inSSR||(o.some(a=>a.content==="prop")&&ed(r,"."),o.some(a=>a.content==="attr")&&ed(r,"^")),{props:[we(r,i)]}},ed=(e,t)=>{e.type===4?e.isStatic?e.content=t+e.content:e.content=`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"))},K_=(e,t)=>{if(e.type===0||e.type===1||e.type===11||e.type===10)return()=>{let n=e.children,o,s=!1;for(let r=0;r<n.length;r++){let i=n[r];if(Vl(i)){s=!0;for(let a=r+1;a<n.length;a++){let l=n[a];if(Vl(l))o||(o=n[r]=Dt([i],i.loc)),o.children.push(" + ",l),n.splice(a,1),a--;else{o=void 0;break}}}}if(!(!s||n.length===1&&(e.type===0||e.type===1&&e.tagType===0&&!e.props.find(r=>r.type===7&&!t.directiveTransforms[r.name])&&e.tag!=="template")))for(let r=0;r<n.length;r++){let i=n[r];if(Vl(i)||i.type===8){let a=[];(i.type!==2||i.content!==" ")&&a.push(i),!t.ssr&&ct(i,t)===0&&a.push("1"),n[r]={type:12,content:i,loc:i.loc,codegenNode:Pe(t.helper(zl),a)}}}}},td=new WeakSet,X_=(e,t)=>{if(e.type===1&&lt(e,"once",!0))return td.has(e)||t.inVOnce||t.inSSR?void 0:(td.add(e),t.inVOnce=!0,t.helper(Di),()=>{t.inVOnce=!1;let n=t.currentNode;n.codegenNode&&(n.codegenNode=t.cache(n.codegenNode,!0,!0))})},dc=(e,t,n)=>{let{exp:o,arg:s}=e;if(!o)return n.onError(_e(41,e.loc)),Ps();let r=o.loc.source.trim(),i=o.type===4?o.content:r,a=n.bindingMetadata[r];if(a==="props"||a==="props-aliased")return n.onError(_e(44,o.loc)),Ps();if(a==="literal-const"||a==="setup-const")return n.onError(_e(45,o.loc)),Ps();if(!i.trim()||!gd(o))return n.onError(_e(42,o.loc)),Ps();let l=s||J("modelValue",!0),u=s?Je(s)?`onUpdate:${le(s.content)}`:Dt(['"onUpdate:" + ',s]):"onUpdate:modelValue",f,c=n.isTS?"($event: any)":"$event";f=Dt([`${c} => ((`,o,") = $event)"]);let p=[we(l,e.exp),we(u,f)];if(e.modifiers.length&&t.tagType===1){let d=e.modifiers.map(m=>m.content).map(m=>(ac(m)?m:JSON.stringify(m))+": true").join(", "),_=s?Je(s)?`${s.content}Modifiers`:Dt([s,' + "Modifiers"']):"modelModifiers";p.push(we(_,J(`{ ${d} }`,!1,e.loc,2)))}return Ps(p)};function Ps(e=[]){return{props:e}}var z_=/[\w).+\-_$\]]/,G_=(e,t)=>{lo("COMPILER_FILTERS",t)&&(e.type===5?Pi(e.content,t):e.type===1&&e.props.forEach(n=>{n.type===7&&n.name!=="for"&&n.exp&&Pi(n.exp,t)}))};function Pi(e,t){if(e.type===4)nd(e,t);else for(let n=0;n<e.children.length;n++){let o=e.children[n];typeof o=="object"&&(o.type===4?nd(o,t):o.type===8?Pi(o,t):o.type===5&&Pi(o.content,t))}}function nd(e,t){let n=e.content,o=!1,s=!1,r=!1,i=!1,a=0,l=0,u=0,f=0,c,p,d,_,m=[];for(d=0;d<n.length;d++)if(p=c,c=n.charCodeAt(d),o)c===39&&p!==92&&(o=!1);else if(s)c===34&&p!==92&&(s=!1);else if(r)c===96&&p!==92&&(r=!1);else if(i)c===47&&p!==92&&(i=!1);else if(c===124&&n.charCodeAt(d+1)!==124&&n.charCodeAt(d-1)!==124&&!a&&!l&&!u)_===void 0?(f=d+1,_=n.slice(0,d).trim()):b();else{switch(c){case 34:s=!0;break;case 39:o=!0;break;case 96:r=!0;break;case 40:u++;break;case 41:u--;break;case 91:l++;break;case 93:l--;break;case 123:a++;break;case 125:a--;break}if(c===47){let x=d-1,N;for(;x>=0&&(N=n.charAt(x),N===" ");x--);(!N||!z_.test(N))&&(i=!0)}}_===void 0?_=n.slice(0,d).trim():f!==0&&b();function b(){m.push(n.slice(f,d).trim()),f=d+1}if(m.length){for(d=0;d<m.length;d++)_=q_(_,m[d],t);e.content=_,e.ast=void 0}}function q_(e,t,n){n.helper(Yl);let o=t.indexOf("(");if(o<0)return n.filters.add(t),`${Us(t,"filter")}(${e})`;{let s=t.slice(0,o),r=t.slice(o+1);return n.filters.add(s),`${Us(s,"filter")}(${e}${r!==")"?","+r:r}`}}var od=new WeakSet,J_=(e,t)=>{if(e.type===1){let n=lt(e,"memo");return!n||od.has(e)||t.inSSR?void 0:(od.add(e),()=>{let o=e.codegenNode||t.currentNode.codegenNode;o&&o.type===13&&(e.tagType!==1&&rc(o,t),e.codegenNode=Pe(t.helper(sc),[n.exp,$o(void 0,o),"_cache",String(t.cached.length)]),t.cached.push(null))})}},Y_=(e,t)=>{if(e.type===1){for(let n of e.props)if(n.type===7&&n.name==="bind"&&(!n.exp||n.exp.type===4&&!n.exp.content.trim())&&n.arg){let o=n.arg;if(o.type!==4||!o.isStatic)t.onError(_e(53,o.loc)),n.exp=J("",!0,o.loc);else{let s=le(o.content);(hd.test(s[0])||s[0]==="-")&&(n.exp=J(s,!1,o.loc))}}}};function Q_(e){return[[Y_,X_,C_,J_,k_,G_,H_,L_,R_,K_],{on:pc,bind:W_,model:dc}]}function Pd(e,t={}){let n=t.onError||ic,o=t.mode==="module";t.prefixIdentifiers===!0?n(_e(48)):o&&n(_e(49));let s=!1;t.cacheHandlers&&n(_e(50)),t.scopeId&&!o&&n(_e(51));let r=q({},t,{prefixIdentifiers:s}),i=z(e)?Sd(e,r):e,[a,l]=Q_();return c_(i,q({},r,{nodeTransforms:[...a,...t.nodeTransforms||[]],directiveTransforms:q({},l,t.directiveTransforms||{})})),d_(i,r)}var Md=()=>({props:[]});var $d=Symbol(""),Fd=Symbol(""),Ud=Symbol(""),Bd=Symbol(""),hc=Symbol(""),Hd=Symbol(""),jd=Symbol(""),Wd=Symbol(""),mc=Symbol(""),Kd=Symbol("");fd({[$d]:"vModelRadio",[Fd]:"vModelCheckbox",[Ud]:"vModelText",[Bd]:"vModelSelect",[hc]:"vModelDynamic",[Hd]:"withModifiers",[jd]:"withKeys",[Wd]:"vShow",[mc]:"Transition",[Kd]:"TransitionGroup"});var Ho;function Z_(e,t=!1){return Ho||(Ho=document.createElement("div")),t?(Ho.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,Ho.children[0].getAttribute("foo")):(Ho.innerHTML=e,Ho.textContent)}var ey={parseMode:"html",isVoidTag:ru,isNativeTag:e=>va(e)||Ea(e)||_a(e),isPreTag:e=>e==="pre",isIgnoreNewlineTag:e=>e==="pre"||e==="textarea",decodeEntities:Z_,isBuiltInComponent:e=>{if(e==="Transition"||e==="transition")return mc;if(e==="TransitionGroup"||e==="transition-group")return Kd},getNamespace(e,t,n){let o=t?t.ns:n;if(t&&o===2)if(t.tag==="annotation-xml"){if(e==="svg")return 1;t.props.some(s=>s.type===6&&s.name==="encoding"&&s.value!=null&&(s.value.content==="text/html"||s.value.content==="application/xhtml+xml"))&&(o=0)}else/^m(?:[ions]|text)$/.test(t.tag)&&e!=="mglyph"&&e!=="malignmark"&&(o=0);else t&&o===1&&(t.tag==="foreignObject"||t.tag==="desc"||t.tag==="title")&&(o=0);if(o===0){if(e==="svg")return 1;if(e==="math")return 2}return o}},ty=e=>{e.type===1&&e.props.forEach((t,n)=>{t.type===6&&t.name==="style"&&t.value&&(e.props[n]={type:7,name:"bind",arg:J("style",!0,t.loc),exp:ny(t.value.content,t.loc),modifiers:[],loc:t.loc})})},ny=(e,t)=>{let n=ga(e);return J(JSON.stringify(n),!1,t,3)};function _n(e,t){return _e(e,t,void 0)}var oy=(e,t,n)=>{let{exp:o,loc:s}=e;return o||n.onError(_n(54,s)),t.children.length&&(n.onError(_n(55,s)),t.children.length=0),{props:[we(J("innerHTML",!0,s),o||J("",!0))]}},sy=(e,t,n)=>{let{exp:o,loc:s}=e;return o||n.onError(_n(56,s)),t.children.length&&(n.onError(_n(57,s)),t.children.length=0),{props:[we(J("textContent",!0),o?ct(o,n)>0?o:Pe(n.helperString(js),[o],s):J("",!0))]}},ry=(e,t,n)=>{let o=dc(e,t,n);if(!o.props.length||t.tagType===1)return o;e.arg&&n.onError(_n(59,e.arg.loc));function s(){let a=lt(t,"bind");a&&Pn(a.arg,"value")&&n.onError(_n(61,a.loc))}let{tag:r}=t,i=n.isCustomElement(r);if(r==="input"||r==="textarea"||r==="select"||i){let a=Ud,l=!1;if(r==="input"||i){let u=Ks(t,"type");if(u){if(u.type===7)a=hc;else if(u.value)switch(u.value.content){case"radio":a=$d;break;case"checkbox":a=Fd;break;case"file":l=!0,n.onError(_n(60,e.loc));break;default:break}}else vd(t)&&(a=hc)}else r==="select"&&(a=Bd);l||(o.needRuntime=n.helper(a))}else n.onError(_n(58,e.loc));return o.props=o.props.filter(a=>!(a.key.type===4&&a.key.content==="modelValue")),o},iy=Ue("passive,once,capture"),ay=Ue("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),ly=Ue("left,right"),Xd=Ue("onkeyup,onkeydown,onkeypress"),cy=(e,t,n,o)=>{let s=[],r=[],i=[];for(let a=0;a<t.length;a++){let l=t[a].content;l==="native"&&Bo("COMPILER_V_ON_NATIVE",n,o)||iy(l)?i.push(l):ly(l)?Je(e)?Xd(e.content.toLowerCase())?s.push(l):r.push(l):(s.push(l),r.push(l)):ay(l)?r.push(l):s.push(l)}return{keyModifiers:s,nonKeyModifiers:r,eventOptionModifiers:i}},Ld=(e,t)=>Je(e)&&e.content.toLowerCase()==="onclick"?J(t,!0):e.type!==4?Dt(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,uy=(e,t,n)=>pc(e,t,n,o=>{let{modifiers:s}=e;if(!s.length)return o;let{key:r,value:i}=o.props[0],{keyModifiers:a,nonKeyModifiers:l,eventOptionModifiers:u}=cy(r,s,n,e.loc);if(l.includes("right")&&(r=Ld(r,"onContextmenu")),l.includes("middle")&&(r=Ld(r,"onMouseup")),l.length&&(i=Pe(n.helper(Hd),[i,JSON.stringify(l)])),a.length&&(!Je(r)||Xd(r.content.toLowerCase()))&&(i=Pe(n.helper(jd),[i,JSON.stringify(a)])),u.length){let f=u.map(St).join("");r=Je(r)?J(`${r.content}${f}`,!0):Dt(["(",r,`) + "${f}"`])}return{props:[we(r,i)]}}),fy=(e,t,n)=>{let{exp:o,loc:s}=e;return o||n.onError(_n(62,s)),{props:[],needRuntime:n.helper(Wd)}},py=(e,t)=>{if(e.type===1&&e.tagType===1&&t.isBuiltInComponent(e.tag)===mc)return()=>{if(!e.children.length)return;let o=zd(e),s=e.children[0];if(s.type===1)for(let r of s.props)r.type===7&&r.name==="show"&&e.props.push({type:6,name:"persisted",nameLoc:e.loc,value:void 0,loc:e.loc})}};function zd(e){let t=e.children=e.children.filter(o=>!Mi(o)),n=t[0];return t.length!==1||n.type===11||n.type===9&&n.branches.some(zd)}var dy=(e,t)=>{e.type===1&&e.tagType===0&&(e.tag==="script"||e.tag==="style")&&t.removeNode()};var hy=[ty,py],my={cloak:Md,html:oy,text:sy,model:ry,on:uy,show:fy};function Gd(e,t={}){return Pd(e,q({},ey,t,{nodeTransforms:[dy,...hy,...t.nodeTransforms||[]],directiveTransforms:q({},my,t.directiveTransforms||{}),transformHoist:null}))}var qd=Object.create(null);function gy(e,t){if(!z(e))if(e.nodeType)e=e.innerHTML;else return De;let n=tu(e,t),o=qd[n];if(o)return o;if(e[0]==="#"){let l=document.querySelector(e);e=l?l.innerHTML:""}let s=q({hoistStatic:!0,onError:void 0,onWarn:De},t);!s.isCustomElement&&typeof customElements<"u"&&(s.isCustomElement=l=>!!customElements.get(l));let{code:r}=Gd(e,s);function i(l,u=!1){let f=u?l.message:`Template compilation error: ${l.message}`,c=l.loc&&ou(e,l.loc.start.offset,l.loc.end.offset);pi(c?`${f}
${c}`:f)}let a=new Function("Vue",r)(Il);return a._rc=!0,qd[n]=a}El(gy);var Jd="tavern_language_vocab_v1",gc="default";function Yd(){return{activeBookId:gc,books:[{id:gc,name:"\u9ED8\u8BA4\u751F\u8BCD\u672C",createdAt:Date.now()}],items:[]}}var oe=Yd(),vy=new Set;function Mn(){try{pe().localStorage.setItem(Jd,JSON.stringify(oe))}catch(e){console.warn("[TavernLanguage] \u4FDD\u5B58\u751F\u8BCD\u672C\u5931\u8D25:",e)}vy.forEach(e=>{try{e(oe)}catch{}})}function Qd(){try{let e=pe().localStorage.getItem(Jd);if(e){let t=JSON.parse(e);if(t&&Array.isArray(t.books)&&Array.isArray(t.items))return t.books.length===0&&t.books.push({id:gc,name:"\u9ED8\u8BA4\u751F\u8BCD\u672C",createdAt:Date.now()}),t.books.some(n=>n.id===t.activeBookId)||(t.activeBookId=t.books[0].id),oe=t,oe}}catch{}return oe=Yd(),oe}function vc(){return oe}function Fi(e,t){return`${String(t||"en").toLowerCase()}::${String(e||"").trim().toLowerCase()}`}function Zd(e,t){let n=Fi(e,t);return oe.items.find(o=>o.key===n)||null}function Ui(e){oe.books.some(t=>t.id===e)&&(oe.activeBookId=e,Mn())}function eh(e){let t=String(e||"").trim();if(!t)return null;let n=`book_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,o={id:n,name:t,createdAt:Date.now()};return oe.books.push(o),oe.activeBookId=n,Mn(),o}function th(e){if(oe.books.length<=1)return!1;let t=oe.books.findIndex(o=>o.id===e);if(t<0)return!1;oe.books.splice(t,1);let n=oe.books[0].id;return oe.items.forEach(o=>{o.bookId===e&&(o.bookId=n)}),oe.activeBookId===e&&(oe.activeBookId=n),Mn(),!0}function Ec(e){let t=String(e.word||"").trim(),n=String(e.lang||"en").toLowerCase();if(!t)return null;let o=Fi(t,n),s=e.bookId||oe.activeBookId||oe.books[0].id,r=oe.items.find(a=>a.key===o);if(r)return r.bookId=s,e.phonetic&&(r.phonetic=e.phonetic),e.reading&&(r.reading=e.reading),e.briefCn&&(r.briefCn=e.briefCn),e.pos&&(r.pos=e.pos),e.context&&(r.context=e.context),e.audioUrl&&(r.audioUrl=e.audioUrl),r.updatedAt=Date.now(),Mn(),r;let i={id:`w_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,key:o,word:t,lang:n,bookId:s,phonetic:e.phonetic||"",reading:e.reading||"",pos:e.pos||"",briefCn:e.briefCn||"",context:e.context||"",audioUrl:e.audioUrl||"",createdAt:Date.now(),updatedAt:Date.now()};return oe.items.unshift(i),Mn(),i}function Bi(e,t=null){let n=-1;if(t){let o=Fi(e,t);n=oe.items.findIndex(s=>s.key===o)}else n=oe.items.findIndex(o=>o.id===e);return n<0?!1:(oe.items.splice(n,1),Mn(),!0)}function nh(e,t){let n=oe.items.find(o=>o.id===e);return!n||!oe.books.some(o=>o.id===t)?!1:(n.bookId=t,n.updatedAt=Date.now(),Mn(),!0)}function oh(){return JSON.stringify(oe,null,2)}function sh(e){let t=JSON.parse(e);if(!t||!Array.isArray(t.books)||!Array.isArray(t.items))throw new Error("\u65E0\u6548\u7684\u751F\u8BCD\u672C JSON \u683C\u5F0F");for(let n of t.books)n?.id&&n?.name&&!oe.books.some(o=>o.id===n.id)&&oe.books.push({id:n.id,name:n.name,createdAt:n.createdAt||Date.now()});for(let n of t.items){if(!n?.word||!n?.lang)continue;let o=Fi(n.word,n.lang);if(!oe.items.some(s=>s.key===o)){let s=oe.books.some(r=>r.id===n.bookId)?n.bookId:oe.books[0].id;oe.items.push({...n,key:o,bookId:s})}}return Mn(),oe.items.length}var te=an({config:ee(),vocab:vc(),popover:{visible:!1,loading:!1,word:"",lang:"en",contextSentence:"",entry:null,activeSourceId:"",sentenceTranslation:"",sentenceLoading:!1,showBookPicker:!1,placement:"below",style:{}},selection:{visible:!1,text:"",lang:"en",translation:"",loading:!1,style:{}},modal:{visible:!1,activeTab:"vocab"}});function zs(){te.config=JSON.parse(JSON.stringify(ee()))}function kt(){te.vocab=JSON.parse(JSON.stringify(vc()))}function rh(){Ic(),Qd(),zs(),kt()}function uo(e="general"){te.modal.activeTab=e,te.modal.visible=!0}function _c(){te.modal.visible=!1}var yc="tl-option-language-settings",bc="tl-option-vocab-book",jo=null;function Ey(e){let t=e.getElementById("options");t&&(t.style.display="none")}function ih(e,t,n,o,s){let r=e.createElement("a");return r.id=t,r.className="tl-ignore",r.innerHTML=`<i class="fa-lg fa-solid ${n}"></i><span>${o}</span>`,r.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),Ey(e),uo(s)}),r}function ah(){let e=ve();e.getElementById("tl-settings-entry")?.remove(),e.getElementById("tl-options-entry")?.remove();let t=e.querySelector("#options .options-content")||e.getElementById("options_content")||e.getElementById("options");return t?(e.getElementById(bc)||t.appendChild(ih(e,bc,"fa-star","\u6211\u7684\u751F\u8BCD\u672C","vocab")),e.getElementById(yc)||t.appendChild(ih(e,yc,"fa-language","\u5916\u8BED\u5B66\u4E60\u8BBE\u7F6E","general")),!0):!1}function lh(){if(Nc(),ah())return;let e=0;jo=setInterval(()=>{e++,(ah()||e>=20)&&(clearInterval(jo),jo=null)},500)}function Nc(){jo&&(clearInterval(jo),jo=null);let e=ve();e.getElementById(yc)?.remove(),e.getElementById(bc)?.remove(),e.getElementById("tl-settings-entry")?.remove(),e.getElementById("tl-options-entry")?.remove()}var Gs=new Map,fo=new Map,_y=300,It={noun:{abbr:"n.",cn:"\u540D\u8BCD",tone:"noun"},"proper noun":{abbr:"prop.n.",cn:"\u4E13\u6709\u540D\u8BCD",tone:"noun"},verb:{abbr:"v.",cn:"\u52A8\u8BCD",tone:"verb"},adjective:{abbr:"adj.",cn:"\u5F62\u5BB9\u8BCD",tone:"adj"},adverb:{abbr:"adv.",cn:"\u526F\u8BCD",tone:"adv"},pronoun:{abbr:"pron.",cn:"\u4EE3\u8BCD",tone:"other"},preposition:{abbr:"prep.",cn:"\u4ECB\u8BCD",tone:"other"},conjunction:{abbr:"conj.",cn:"\u8FDE\u8BCD",tone:"other"},interjection:{abbr:"int.",cn:"\u611F\u53F9\u8BCD",tone:"other"},article:{abbr:"art.",cn:"\u51A0\u8BCD",tone:"other"},determiner:{abbr:"det.",cn:"\u9650\u5B9A\u8BCD",tone:"other"},particle:{abbr:"part.",cn:"\u52A9\u8BCD",tone:"other"},expression:{abbr:"expr.",cn:"\u60EF\u7528\u8BED",tone:"other"},numeral:{abbr:"num.",cn:"\u6570\u8BCD",tone:"other"},prefix:{abbr:"pref.",cn:"\u524D\u7F00",tone:"other"},suffix:{abbr:"suff.",cn:"\u540E\u7F00",tone:"other"}};function tt(e){let t=String(e||"").toLowerCase().trim();return It[t]?It[t]:t.includes("noun")?It.noun:t.includes("verb")?It.verb:t.includes("adj")?It.adjective:t.includes("adv")?It.adverb:t.includes("pron")?It.pronoun:t.includes("prep")?It.preposition:t.includes("conj")?It.conjunction:t.includes("interj")?It.interjection:t.includes("part")?It.particle:t.includes("expr")?It.expression:{abbr:e||"\u8BCD\u9879",cn:"",tone:"other"}}function ch(e,t){if(fo.size>=_y){let n=fo.keys().next().value;fo.delete(n)}fo.set(e,t)}function Gt(e){if(!e||!e.id)throw new Error("[TavernLanguage] registerDictionary \u9700\u8981 id \u5B57\u6BB5");return Gs.set(e.id,e),e}function Hi(e=null){let t=[...Gs.values()];return e?t.filter(n=>n.languages.includes("*")||n.languages.includes(e)):t}function uh(e){return Gs.get(e)||null}function fh(){fo.clear()}function qs(e){let t=ee(),n=nt(e),o=t.dictionaryChains?.[e];return(Array.isArray(o)&&o.length>0?o:n?.defaultDictionaries||["wiktionary","ai-context"]).filter(r=>Gs.has(r))}async function yy(e,t){let n=ee();if(!n.autoTranslateDict||!e||!Array.isArray(e.meanings))return e;let o=[];for(let s of e.meanings)for(let r of s.definitions||[])!r.cn&&r.text&&o.length<5&&o.push(r);if(o.length===0)return e;try{let s=[e.word,...o.map(l=>l.text)],r=s.join(`
`),a=(await bt(r,{from:"en",to:"zh-CN",providerId:n.translator==="tavern-ai"?"google":n.translator})).split(/\r?\n/).map(l=>l.trim());a.length===s.length?(e.briefCn||(e.briefCn=a[0]),o.forEach((l,u)=>{l.cn=a[u+1]||""})):e.briefCn||(e.briefCn=await bt(e.word,{from:t,to:"zh-CN",providerId:n.translator==="tavern-ai"?"google":n.translator}))}catch{}return e}async function ji(e,t={}){let n=String(e||"").trim();if(!n)return null;let o=ee(),s=t.lang||o.targetLang||"en",r=nt(s),i=t.sourceId||null,a=`${i||"auto"}|${s}|${n.toLowerCase()}`;if(!t.bypassCache&&fo.has(a))return fo.get(a);let l=i?[i]:qs(s);for(let u of l){let f=Gs.get(u);if(f&&!(!i&&u==="ai-context"&&l.length>1))try{let c=await f.lookup(n,{lang:s,langDef:r,context:t.context||"",config:o});if(c&&c.meanings&&c.meanings.length>0)return c.sourceId=f.id,c.sourceName=f.name,await yy(c,s),ch(a,c),c}catch(c){console.warn(`[TavernLanguage] \u8BCD\u5178 ${u} \u67E5\u8BCD\u5931\u8D25 (${n}):`,c?.message||c)}}try{let u=await bt(n,{from:s,to:"zh-CN"}),f={word:n,phonetic:"",reading:"",audioUrl:"",briefCn:u,tags:["\u5FEB\u6377\u91CA\u4E49"],sourceId:"fallback-translate",sourceName:"\u7FFB\u8BD1\u515C\u5E95",meanings:[{pos:"translation",posInfo:{abbr:"\u8BD1",cn:"\u76F4\u8BD1",tone:"other"},definitions:[{text:"",cn:u,example:""}]}]};return ch(a,f),f}catch{return null}}var qt=null,Js=null,Ys=null,ph=0;function Wi(){te.popover.visible=!1,te.popover.showBookPicker=!1,qt&&(qt.classList.remove("tl-word-active"),qt=null)}function by(e){let t=pe(),n=ve(),o=t.visualViewport?.width||t.innerWidth,s=t.visualViewport?.height||t.innerHeight,r=10,i=26,a=e.getBoundingClientRect(),l=a.top-i-r,u=s-(a.bottom+i)-r;if(l<210&&u<210){let b=n.getElementById("chat");if(b&&b.scrollHeight>b.clientHeight){let x=Math.round(s*.28),N=a.top-x;b.scrollTop+=N,a=e.getBoundingClientRect()}}let f=Math.max(r,a.top-i),c=Math.min(s-r,a.bottom+i),p=f-r,_=s-c-r>=p?"below":"above",m={};if(_==="below"){let b=Math.min(s-180,Math.round(c+6)),x=Math.max(170,Math.min(400,Math.round(s-b-r-6)));m.top=`${b}px`,m.bottom="auto",m.maxHeight=`${x}px`}else{let b=Math.min(s-180,Math.round(s-f+6)),x=Math.max(170,Math.min(400,Math.round(s-b-r-6)));m.bottom=`${b}px`,m.top="auto",m.maxHeight=`${x}px`}if(o<=640)m.left=`${r}px`,m.right=`${r}px`,m.width="auto";else{let b=Math.min(368,o-r*2),x=Math.max(r,Math.min(a.left+a.width/2-b/2,o-b-r));m.left=`${Math.round(x)}px`,m.right="auto",m.width=`${b}px`}return{placement:_,style:m}}async function dh(e,t=null){let n=e.dataset.tlWord||e.textContent||"",o=e.dataset.tlLang||ee().targetLang||"en";if(!n.trim())return;qt&&qt!==e&&qt.classList.remove("tl-word-active"),qt=e,qt.classList.add("tl-word-active");let s=Mc(e),{placement:r,style:i}=by(e),a=++ph,l=te.popover;l.visible=!0,l.loading=!0,l.word=n,l.lang=o,l.contextSentence=s,l.entry=null,l.activeSourceId=t||"",l.sentenceTranslation="",l.sentenceLoading=!1,l.showBookPicker=!1,l.placement=r,l.style=i,!t&&ee().autoSpeakWord&&Eo(n,{lang:o}).catch(()=>{});let u=await ji(n,{lang:o,context:s,sourceId:t});a!==ph||!te.popover.visible||(l.loading=!1,l.entry=u,l.activeSourceId=t||u?.sourceId||"",!t&&ee().autoSpeakWord&&u?.audioUrl&&Eo(n,{lang:o,audioUrl:u.audioUrl}).catch(()=>{}))}function hh(){Sc();let e=ve();Js=t=>{if(t.target?.closest?.(".tl-popover, .tl-sel-bar, .tl-modal-backdrop"))return;let n=t.target?.closest?.("span.tl-word");if(n&&ee().enabled){if(!Wc(t))return;t.stopPropagation(),dh(n);return}te.popover.visible&&Wi()},Ys=t=>{t.key==="Escape"&&te.popover.visible&&Wi()},e.addEventListener("click",Js,!1),e.addEventListener("keydown",Ys,!1)}function Sc(){Wi();let e=ve();Js&&(e.removeEventListener("click",Js,!1),Js=null),Ys&&(e.removeEventListener("keydown",Ys,!1),Ys=null)}var mh=it({name:"WordPopover",setup(){let e=te.popover,t=Fe(()=>qs(e.lang).map(_=>uh(_)).filter(Boolean)),n=Fe(()=>(te.vocab.items,Zd(e.entry?.word||e.word,e.lang))),o=Fe(()=>te.vocab.books||[]);function s(){return e.entry?.word||e.word}function r(){Eo(s(),{lang:e.lang,audioUrl:e.entry?.audioUrl||""}).catch(()=>{})}function i(d){d&&Qt(d,{lang:e.lang}).catch(()=>{})}function a(){e.contextSentence&&Qt(e.contextSentence,{lang:e.lang}).catch(()=>{})}async function l(){if(!(!e.contextSentence||e.sentenceLoading)){e.sentenceLoading=!0,e.sentenceTranslation="";try{e.sentenceTranslation=await bt(e.contextSentence,{from:e.lang,to:"zh-CN"})}catch(d){e.sentenceTranslation=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${d?.message||"\u7F51\u7EDC\u5F02\u5E38"}`}finally{e.sentenceLoading=!1}}}function u(d){qt&&dh(qt,d)}function f(d){let _=e.entry?.meanings?.[0],m=_?.definitions?.[0];return{word:s(),lang:e.lang,bookId:d,phonetic:e.entry?.phonetic||"",reading:e.entry?.reading||"",pos:_?.posInfo?.abbr||_?.pos||"",briefCn:e.entry?.briefCn||m?.cn||m?.text||"",context:e.contextSentence||"",audioUrl:e.entry?.audioUrl||""}}function c(){let d=s();if(n.value)Bi(d,e.lang),kt(),Se(`\u5DF2\u79FB\u51FA\u751F\u8BCD\u672C\uFF1A${d}`,"info");else{let _=te.vocab.activeBookId;Ec(f(_)),kt();let m=o.value.find(b=>b.id===_)?.name||"\u751F\u8BCD\u672C";Se(`\u5DF2\u6536\u85CF\u5230\u300C${m}\u300D`,"success")}}function p(d){Ui(d),Ec(f(d)),kt(),e.showBookPicker=!1;let _=o.value.find(m=>m.id===d)?.name||"\u751F\u8BCD\u672C";Se(`\u5DF2\u4FDD\u5B58\u5230\u300C${_}\u300D`,"success")}return{pop:e,sources:t,starredItem:n,books:o,closeWordPopover:Wi,onSpeakWord:r,onSpeakExample:i,onSpeakSentence:a,onTranslateSentence:l,onSwitchSource:u,onToggleStar:c,onSaveToBook:p}},template:`
    <div
      v-if="pop.visible"
      class="tl-popover tl-ignore"
      :class="'tl-pop-' + pop.placement"
      :style="pop.style"
      @click.stop
    >
      <div class="tl-pop-header">
        <div class="tl-pop-word-group">
          <div class="tl-pop-word">{{ pop.entry?.word || pop.word }}</div>
          <div class="tl-pop-meta">
            <span v-if="pop.entry?.reading">{{ pop.entry.reading }}</span>
            <span v-if="pop.entry?.phonetic">{{ pop.entry.phonetic }}</span>
            <span v-for="(tag, idx) in (pop.entry?.tags || [])" :key="idx">\xB7 {{ tag }}</span>
          </div>
          <div v-if="pop.entry?.briefCn" class="tl-pop-brief">{{ pop.entry.briefCn }}</div>
        </div>

        <div class="tl-pop-actions">
          <button type="button" class="tl-icon-btn" @click="onSpeakWord" title="\u6717\u8BFB\u5355\u8BCD">
            <i class="fa-solid fa-volume-high"></i>
          </button>
          <button
            type="button"
            class="tl-icon-btn"
            :class="{ 'tl-star-active': Boolean(starredItem) }"
            @click="onToggleStar"
            :title="starredItem ? '\u53D6\u6D88\u661F\u6807\u6536\u85CF' : '\u52A0\u661F\u6807\u6536\u85CF'"
          >
            <i :class="starredItem ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
          </button>
          <button
            type="button"
            class="tl-icon-btn"
            @click="pop.showBookPicker = !pop.showBookPicker"
            title="\u9009\u62E9\u5B58\u5165\u7684\u5355\u8BCD\u672C"
          >
            <i class="fa-solid fa-folder-plus"></i>
          </button>
          <button type="button" class="tl-icon-btn" @click="closeWordPopover" title="\u5173\u95ED">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- \u5FEB\u6377\u9009\u62E9\u5B58\u5165\u6307\u5B9A\u5355\u8BCD\u672C -->
      <div v-if="pop.showBookPicker" class="tl-book-picker">
        <span class="tl-book-picker-label">\u5B58\u5165\u5355\u8BCD\u672C\uFF1A</span>
        <button
          v-for="b in books"
          :key="b.id"
          type="button"
          class="tl-source-pill"
          :class="{ 'tl-active': starredItem?.bookId === b.id }"
          @click="onSaveToBook(b.id)"
        >
          <i class="fa-solid fa-book"></i> {{ b.name }}
        </button>
      </div>

      <div class="tl-pop-sources">
        <button
          v-for="dict in sources"
          :key="dict.id"
          type="button"
          class="tl-source-pill"
          :class="{ 'tl-active': pop.activeSourceId === dict.id }"
          @click="onSwitchSource(dict.id)"
        >
          {{ dict.name }}
        </button>
      </div>

      <div class="tl-pop-body">
        <div v-if="pop.loading" class="tl-def-orig">
          <i class="fa-solid fa-spinner fa-spin"></i> \u6B63\u5728\u67E5\u8BE2\u8BCD\u5178...
        </div>

        <template v-else-if="pop.entry">
          <div v-for="(m, mi) in pop.entry.meanings" :key="mi" class="tl-meaning-block">
            <div class="tl-pos-badge" :class="'tl-pos-' + (m.posInfo?.tone || 'other')">
              {{ [m.posInfo?.abbr, m.posInfo?.cn].filter(Boolean).join(' ') || m.pos || '\u8BCD\u4E49' }}
            </div>
            <div v-for="(d, di) in m.definitions" :key="di" class="tl-def-item">
              <div v-if="d.cn" class="tl-def-cn">{{ d.cn }}</div>
              <div v-if="d.text" class="tl-def-orig">{{ d.text }}</div>
              <div
                v-if="d.example"
                class="tl-def-example"
                @click="onSpeakExample(d.example)"
                title="\u70B9\u51FB\u6717\u8BFB\u4F8B\u53E5"
              >
                <i class="fa-solid fa-volume-high"></i>
                <span>{{ d.example }}</span>
              </div>
            </div>
          </div>
        </template>

        <div v-else class="tl-def-orig">
          \u672A\u627E\u5230\u8BE5\u8BCD\u6761\uFF0C\u53EF\u70B9\u51FB\u4E0A\u65B9\u300CAI \u8BED\u5883\u7CBE\u8BB2\u300D\u6216\u4E0B\u65B9\u300C\u7FFB\u8BD1\u6240\u5728\u53E5\u300D\u3002
        </div>

        <div v-if="pop.sentenceLoading || pop.sentenceTranslation" class="tl-sentence-box">
          <div class="tl-sentence-orig">{{ pop.contextSentence }}</div>
          <div v-if="pop.sentenceLoading" class="tl-def-orig">
            <i class="fa-solid fa-spinner fa-spin"></i> \u6B63\u5728\u7FFB\u8BD1\u6240\u5728\u53E5...
          </div>
          <div v-else class="tl-sentence-cn">{{ pop.sentenceTranslation }}</div>
        </div>
      </div>

      <div class="tl-pop-footer">
        <button type="button" class="tl-icon-btn" @click="onSpeakSentence">
          <i class="fa-solid fa-volume-high"></i><span>\u6717\u8BFB\u6240\u5728\u53E5</span>
        </button>
        <button type="button" class="tl-icon-btn" @click="onTranslateSentence">
          <i class="fa-solid fa-language"></i><span>\u7FFB\u8BD1\u6240\u5728\u53E5</span>
        </button>
      </div>
    </div>
  `});var po=null,Qs=null,Wo=null;function Ki(){te.selection.visible=!1,te.selection.text="",te.selection.translation="",te.selection.loading=!1}function Ny(e){let t=pe(),n=t.visualViewport?.width||t.innerWidth,o=t.visualViewport?.height||t.innerHeight,s=10;if(n<=640)return e.top<110?{left:`${s}px`,right:`${s}px`,top:`${Math.min(o-90,Math.round(e.bottom+12))}px`}:{left:`${s}px`,right:`${s}px`,bottom:`${Math.max(s,Math.round(o-e.top+12))}px`};let r=310,i=Math.max(s,Math.min(e.left+e.width/2-r/2,n-r-s));return e.top<110?{left:`${Math.round(i)}px`,top:`${Math.min(o-80,Math.round(e.bottom+10))}px`}:{left:`${Math.round(i)}px`,bottom:`${Math.max(s,Math.round(o-e.top+10))}px`}}function Sy(){if(!ee().enabled){Ki();return}let t=pe().getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return;let n=t.toString().replace(/\s+/g," ").trim();if(n.length<2)return;let o=t.getRangeAt(0),s=o.commonAncestorContainer.nodeType===1?o.commonAncestorContainer:o.commonAncestorContainer.parentElement;if(!s||!s.closest(".mes_text")||s.closest(".tl-trans-block, .tl-mes-footer"))return;let r=o.getBoundingClientRect();!r||r.width===0&&r.height===0||(te.selection.text=n,te.selection.lang=ee().targetLang||"en",te.selection.translation="",te.selection.loading=!1,te.selection.style=Ny(r),te.selection.visible=!0)}function gh(){xc();let e=ve();po=t=>{t.target?.closest?.(".tl-sel-bar, .tl-popover, .tl-modal-backdrop")||(Wo&&clearTimeout(Wo),Wo=setTimeout(Sy,70))},Qs=t=>{te.selection.visible&&!t.target?.closest?.(".tl-sel-bar")&&Ki()},e.addEventListener("mouseup",po,!1),e.addEventListener("touchend",po,!1),e.addEventListener("mousedown",Qs,!1)}function xc(){Wo&&(clearTimeout(Wo),Wo=null),Ki();let e=ve();po&&(e.removeEventListener("mouseup",po,!1),e.removeEventListener("touchend",po,!1),po=null),Qs&&(e.removeEventListener("mousedown",Qs,!1),Qs=null)}var vh=it({name:"SelectionBar",setup(){let e=te.selection;async function t(){if(!(!e.text||e.loading)){e.loading=!0,e.translation="";try{e.translation=await bt(e.text,{from:e.lang,to:"zh-CN"})}catch(s){e.translation=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${s?.message||"\u7F51\u7EDC\u5F02\u5E38"}`}finally{e.loading=!1}}}function n(){e.text&&Qt(e.text,{lang:e.lang}).catch(()=>{})}async function o(){try{await pe().navigator.clipboard.writeText(e.text),Se("\u5DF2\u590D\u5236\u9009\u4E2D\u6587\u672C","success")}catch{Se("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236","warning")}}return{sel:e,onTranslate:t,onSpeak:n,onCopy:o,closeSelectionBar:Ki}},template:`
    <div v-if="sel.visible" class="tl-sel-bar tl-ignore" :style="sel.style" @click.stop>
      <div class="tl-sel-actions">
        <button type="button" class="tl-icon-btn" @click="onTranslate">
          <i class="fa-solid fa-language"></i><span>\u7FFB\u8BD1\u9009\u53E5</span>
        </button>
        <button type="button" class="tl-icon-btn" @click="onSpeak">
          <i class="fa-solid fa-volume-high"></i><span>\u6717\u8BFB</span>
        </button>
        <button type="button" class="tl-icon-btn" @click="onCopy">
          <i class="fa-regular fa-copy"></i><span>\u590D\u5236</span>
        </button>
        <button type="button" class="tl-icon-btn" @click="closeSelectionBar" title="\u5173\u95ED">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div v-if="sel.loading || sel.translation" class="tl-sel-result">
        <span v-if="sel.loading"><i class="fa-solid fa-spinner fa-spin"></i> \u6B63\u5728\u7FFB\u8BD1\u9009\u4E2D\u5185\u5BB9...</span>
        <span v-else>{{ sel.translation }}</span>
      </div>
    </div>
  `});var Eh=it({name:"VocabBookView",setup(){let e=ht("all"),t=ht("all"),n=ht(""),o=ht(""),s=ht(!1),r=Fe(()=>te.vocab.books||[]),i=Fe(()=>(te.vocab.items||[]).length),a=Fe(()=>te.vocab.activeBookId),l=Fe(()=>go()),u=Fe(()=>{let y=n.value.trim().toLowerCase();return(te.vocab.items||[]).filter(g=>!(e.value!=="all"&&g.bookId!==e.value||t.value!=="all"&&g.lang!==t.value||y&&!`${g.word} ${g.briefCn} ${g.reading} ${g.context}`.toLowerCase().includes(y)))});function f(y){return(te.vocab.items||[]).filter(g=>g.bookId===y).length}function c(){let y=o.value.trim();if(!y)return;let g=eh(y);g&&(kt(),e.value=g.id,o.value="",s.value=!1,Se(`\u5DF2\u65B0\u5EFA\u5355\u8BCD\u672C\u300C${g.name}\u300D`,"success"))}function p(y){Ui(y),kt(),Se("\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u85CF\u5355\u8BCD\u672C","success")}function d(y){if(r.value.length<=1){Se("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u5355\u8BCD\u672C","warning");return}th(y.id),kt(),e.value===y.id&&(e.value="all"),Se(`\u5DF2\u5220\u9664\u300C${y.name}\u300D\uFF0C\u8BCD\u6761\u5DF2\u4FDD\u7559\u5230\u9ED8\u8BA4\u672C`,"info")}function _(y,g){nh(y.id,g.target.value),kt(),Se("\u5DF2\u79FB\u52A8\u81F3\u76EE\u6807\u5355\u8BCD\u672C","success")}function m(y){Bi(y.id),kt()}function b(y){Eo(y.word,{lang:y.lang,audioUrl:y.audioUrl}).catch(()=>{})}function x(y){y.context&&Qt(y.context,{lang:y.lang}).catch(()=>{})}async function N(){try{await pe().navigator.clipboard.writeText(oh()),Se("\u751F\u8BCD\u672C JSON \u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F","success")}catch{Se("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u526A\u8D34\u677F\u6743\u9650","warning")}}function v(){let g=pe().prompt("\u8BF7\u7C98\u8D34\u4E4B\u524D\u5BFC\u51FA\u7684\u751F\u8BCD\u672C JSON\uFF1A");if(g)try{let D=sh(g);kt(),Se(`\u5BFC\u5165\u6210\u529F\uFF0C\u5F53\u524D\u5171 ${D} \u6761\u751F\u8BCD`,"success")}catch(D){Se(`\u5BFC\u5165\u5931\u8D25\uFF1A${D?.message||"\u683C\u5F0F\u9519\u8BEF"}`,"error")}}return{selectedBookId:e,selectedLang:t,searchQuery:n,newBookName:o,showCreateBook:s,books:r,totalCount:i,activeBookId:a,languages:l,filteredItems:u,countByBook:f,onCreateBook:c,onSetDefaultBook:p,onDeleteBook:d,onMoveItem:_,onRemoveItem:m,onSpeakItem:b,onSpeakContext:x,onExport:N,onImport:v}},template:`
    <div class="tl-vocab-wrap">
      <!-- \u5355\u8BCD\u672C\u6A2A\u5411\u6807\u7B7E\u680F -->
      <div class="tl-book-bar">
        <button
          type="button"
          class="tl-source-pill"
          :class="{ 'tl-active': selectedBookId === 'all' }"
          @click="selectedBookId = 'all'"
        >
          \u5168\u90E8 ({{ totalCount }})
        </button>
        <button
          v-for="b in books"
          :key="b.id"
          type="button"
          class="tl-source-pill"
          :class="{ 'tl-active': selectedBookId === b.id }"
          @click="selectedBookId = b.id"
        >
          <i v-if="b.id === activeBookId" class="fa-solid fa-star"></i>
          {{ b.name }} ({{ countByBook(b.id) }})
        </button>
        <button type="button" class="tl-source-pill" @click="showCreateBook = !showCreateBook">
          <i class="fa-solid fa-plus"></i> \u65B0\u5EFA\u672C
        </button>
      </div>

      <!-- \u65B0\u5EFA\u5355\u8BCD\u672C\u8F93\u5165\u6846 -->
      <div v-if="showCreateBook" class="tl-inline-form">
        <input
          v-model="newBookName"
          type="text"
          class="tl-input"
          placeholder="\u8F93\u5165\u65B0\u5355\u8BCD\u672C\u540D\u79F0\uFF08\u5982\uFF1A\u65E5\u8BED\u9AD8\u9891 / \u5267\u60C5\u597D\u8BCD\uFF09"
          @keyup.enter="onCreateBook"
        />
        <button type="button" class="tl-btn tl-btn-primary" @click="onCreateBook">\u521B\u5EFA</button>
      </div>

      <!-- \u5F53\u524D\u9009\u4E2D\u5355\u8BCD\u672C\u7684\u7BA1\u7406\u5FEB\u6377\u64CD\u4F5C -->
      <div v-if="selectedBookId !== 'all'" class="tl-book-manage-row">
        <button
          v-if="selectedBookId !== activeBookId"
          type="button"
          class="tl-icon-btn"
          @click="onSetDefaultBook(selectedBookId)"
        >
          <i class="fa-regular fa-star"></i><span>\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u85CF\u672C</span>
        </button>
        <span v-else class="tl-hint" style="margin:0;">
          <i class="fa-solid fa-star"></i> \u5F53\u524D\u4E3A\u9ED8\u8BA4\u6536\u85CF\u672C
        </span>
        <button
          v-if="books.length > 1"
          type="button"
          class="tl-icon-btn"
          @click="onDeleteBook(books.find(b => b.id === selectedBookId))"
        >
          <i class="fa-regular fa-trash-can"></i><span>\u5220\u9664\u6B64\u672C</span>
        </button>
      </div>

      <!-- \u641C\u7D22\u4E0E\u8BED\u79CD\u8FC7\u6EE4 -->
      <div class="tl-vocab-filters">
        <input
          v-model="searchQuery"
          type="text"
          class="tl-input"
          placeholder="\u641C\u7D22\u5355\u8BCD\u3001\u91CA\u4E49\u6216\u539F\u53E5..."
        />
        <select v-model="selectedLang" class="tl-select tl-lang-filter">
          <option value="all">\u5168\u90E8\u8BED\u79CD</option>
          <option v-for="l in languages" :key="l.code" :value="l.code">{{ l.name }}</option>
        </select>
      </div>

      <!-- \u751F\u8BCD\u5217\u8868 -->
      <div v-if="filteredItems.length === 0" class="tl-empty-state">
        <i class="fa-regular fa-star"></i>
        <div>\u6682\u65E0\u6536\u85CF\u7684\u5355\u8BCD</div>
        <div class="tl-hint">\u70B9\u6309\u804A\u5929\u91CC\u7684\u4EFB\u610F\u5916\u8BED\u5355\u8BCD\uFF0C\u70B9\u51FB\u661F\u6807\u5373\u53EF\u52A0\u5165\u751F\u8BCD\u672C</div>
      </div>

      <div v-else class="tl-vocab-list">
        <div v-for="item in filteredItems" :key="item.id" class="tl-vocab-card">
          <div class="tl-vocab-card-top">
            <div class="tl-vocab-word-main">
              <span class="tl-vocab-word">{{ item.word }}</span>
              <span v-if="item.reading || item.phonetic" class="tl-vocab-meta">
                {{ item.reading || item.phonetic }}
              </span>
              <span v-if="item.pos" class="tl-pos-badge tl-pos-other" style="margin:0;">{{ item.pos }}</span>
            </div>
            <div class="tl-vocab-actions">
              <button type="button" class="tl-icon-btn" @click="onSpeakItem(item)" title="\u6717\u8BFB\u5355\u8BCD">
                <i class="fa-solid fa-volume-high"></i>
              </button>
              <button type="button" class="tl-icon-btn" @click="onRemoveItem(item)" title="\u79FB\u51FA\u751F\u8BCD\u672C">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>

          <div v-if="item.briefCn" class="tl-vocab-cn">{{ item.briefCn }}</div>

          <div v-if="item.context" class="tl-vocab-ctx" @click="onSpeakContext(item)" title="\u70B9\u51FB\u6717\u8BFB\u539F\u53E5">
            <i class="fa-solid fa-volume-high"></i>
            <span>{{ item.context }}</span>
          </div>

          <div class="tl-vocab-card-foot">
            <span class="tl-hint" style="margin:0;">\u8BED\u79CD\uFF1A{{ item.lang.toUpperCase() }}</span>
            <select class="tl-select tl-mini-select" :value="item.bookId" @change="onMoveItem(item, $event)">
              <option v-for="b in books" :key="b.id" :value="b.id">{{ b.name }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="tl-vocab-io">
        <button type="button" class="tl-icon-btn" @click="onExport">
          <i class="fa-solid fa-file-export"></i><span>\u5BFC\u51FA JSON</span>
        </button>
        <button type="button" class="tl-icon-btn" @click="onImport">
          <i class="fa-solid fa-file-import"></i><span>\u5BFC\u5165 JSON</span>
        </button>
      </div>
    </div>
  `});var xy=["details","blockquote","table","thinking","status",".status-bar","em","strong"],_h=it({name:"SettingsModal",components:{VocabBookView:Eh},setup(){let e=te.modal,t=an({enabled:!0,targetLang:"en",theme:"tavern",promptInjection:{enabled:!0,level:"B1",customInstruction:"",depth:0},dictionaryChains:{},autoTranslateDict:!0,autoSpeakWord:!1,translator:"google",customAi:{baseUrl:"",apiKey:"",model:""},tts:{engine:"auto",rate:1,enAccent:"us"},ui:{showWordUnderline:!0,autoShowMesButtons:!0},excludeText:""});function n(){let b=JSON.parse(JSON.stringify(ee()));Object.assign(t,b),t.excludeText=Go(b.excludeSelectors).join(", ")}Vo(()=>e.visible,b=>{b&&n()},{immediate:!0});let o=Fe(()=>go()),s=Fe(()=>ar()),r=Fe(()=>nt(t.targetLang)),i=Fe(()=>r.value?.levels||[]),a=Fe(()=>{let b=t.targetLang,x=t.dictionaryChains?.[b];return Array.isArray(x)&&x.length>0?x:qs(b)}),l=Fe(()=>{let b=Hi(t.targetLang),x=a.value;return[...x.map(N=>b.find(v=>v.id===N)).filter(Boolean),...b.filter(N=>!x.includes(N.id))]});function u(){let b=i.value;b.length&&!b.some(x=>x.id===t.promptInjection.level)&&(t.promptInjection.level=b[1]?.id||b[0].id)}function f(b){return a.value.includes(b)}function c(b,x){let N=t.targetLang,v=[...a.value];if(x&&!v.includes(b))v.push(b);else if(!x){let y=v.indexOf(b);y>=0&&v.splice(y,1)}t.dictionaryChains={...t.dictionaryChains,[N]:v}}function p(b,x){let N=t.targetLang,v=[...a.value],y=v.indexOf(b),g=y+x;y>=0&&g>=0&&g<v.length&&([v[y],v[g]]=[v[g],v[y]],t.dictionaryChains={...t.dictionaryChains,[N]:v})}function d(b){let x=Go(t.excludeText);x.includes(b)||(x.push(b),t.excludeText=x.join(", "))}function _(){fh(),Lc(),Se("\u5DF2\u6E05\u7406\u8BCD\u5178\u4E0E\u7FFB\u8BD1\u7F13\u5B58","success")}function m(){let b=JSON.parse(JSON.stringify(t));b.excludeSelectors=Go(t.excludeText),b.tts.rate=Number(t.tts.rate)||1,delete b.excludeText,nr(b),zs(),_c(),Se("\u5916\u8BED\u5B66\u4E60\u8BBE\u7F6E\u5DF2\u751F\u6548","success")}return{VERSION:zo,QUICK_EXCLUDE_CHIPS:xy,modal:e,draft:t,languages:o,translators:s,currentLangDef:r,currentLevels:i,orderedDictionaries:l,closeModal:_c,onLangChange:u,isDictEnabled:f,toggleDict:c,moveDict:p,addExcludeChip:d,onClearCache:_,onSave:m}},template:`
    <div v-if="modal.visible" class="tl-modal-backdrop tl-ignore" @click.self="closeModal">
      <div class="tl-modal">
        <div class="tl-modal-header">
          <div class="tl-modal-title">
            <i class="fa-solid fa-language"></i>
            <span>\u9152\u9986\u5916\u8BED\u5B66\u4E60</span>
            <span class="tl-modal-version">v{{ VERSION }}</span>
          </div>
          <button type="button" class="tl-icon-btn" @click="closeModal" title="\u5173\u95ED">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="tl-tabs">
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'vocab' }" @click="modal.activeTab = 'vocab'">
            <i class="fa-solid fa-star"></i><span>\u751F\u8BCD\u672C</span>
          </button>
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'general' }" @click="modal.activeTab = 'general'">
            <i class="fa-solid fa-sliders"></i><span>\u57FA\u7840</span>
          </button>
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'dict' }" @click="modal.activeTab = 'dict'">
            <i class="fa-solid fa-book-open"></i><span>\u8BCD\u5178</span>
          </button>
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'exclude' }" @click="modal.activeTab = 'exclude'">
            <i class="fa-solid fa-filter"></i><span>\u6392\u9664</span>
          </button>
        </div>

        <div class="tl-modal-body">
          <!-- Tab 0: \u751F\u8BCD\u672C -->
          <VocabBookView v-if="modal.activeTab === 'vocab'" />

          <!-- Tab 1: \u57FA\u7840\u4E0E\u4E3B\u9898 -->
          <div v-else-if="modal.activeTab === 'general'">
            <div class="tl-field-row">
              <div>
                <div class="tl-label" style="margin:0;">\u542F\u7528\u5916\u8BED\u5B66\u4E60\u589E\u5F3A</div>
                <div class="tl-hint">\u5173\u95ED\u540E\u81EA\u52A8\u8FD8\u539F\u9152\u9986\u539F\u751F\u6D88\u606F DOM\uFF0C\u4E0D\u7559\u6B8B\u7559</div>
              </div>
              <input type="checkbox" v-model="draft.enabled" />
            </div>

            <div class="tl-field">
              <label class="tl-label">\u76EE\u6807\u5B66\u4E60\u8BED\u79CD</label>
              <select class="tl-select" v-model="draft.targetLang" @change="onLangChange">
                <option v-for="l in languages" :key="l.code" :value="l.code">
                  {{ l.name }} ({{ l.nativeName }})
                </option>
              </select>
            </div>

            <div class="tl-field-row">
              <div>
                <div class="tl-label" style="margin:0;">API \u76F4\u51FA\u5916\u8BED\u6A21\u5F0F\uFF08\u81EA\u52A8\u6CE8\u5165\u63D0\u793A\u8BCD\uFF09</div>
                <div class="tl-hint">\u52A8\u6001\u6CE8\u5165\u7CFB\u7EDF\u6307\u4EE4\uFF0C\u8BA9 AI \u76F4\u63A5\u8F93\u51FA\u5730\u9053\u76EE\u6807\u5916\u8BED\uFF1B\u5173\u95ED\u5373\u5931\u6548\uFF0C\u4E0D\u6C61\u67D3\u89D2\u8272\u5361</div>
              </div>
              <input type="checkbox" v-model="draft.promptInjection.enabled" />
            </div>

            <div class="tl-field" :style="{ opacity: draft.promptInjection.enabled ? 1 : 0.55 }">
              <label class="tl-label">\u8F93\u51FA\u96BE\u5EA6\u7B49\u7EA7</label>
              <select class="tl-select" v-model="draft.promptInjection.level">
                <option v-for="lv in currentLevels" :key="lv.id" :value="lv.id">{{ lv.label }}</option>
              </select>
            </div>

            <div class="tl-field" :style="{ opacity: draft.promptInjection.enabled ? 1 : 0.55 }">
              <label class="tl-label">\u989D\u5916\u8BED\u8A00\u8981\u6C42\uFF08\u53EF\u9009\uFF09</label>
              <input
                type="text"
                class="tl-input"
                v-model="draft.promptInjection.customInstruction"
                placeholder="\u4F8B\u5982\uFF1A\u591A\u4F7F\u7528\u65E5\u5E38\u53E3\u8BED\u77ED\u8BED\uFF0C\u907F\u514D\u751F\u50FB\u53E4\u8BCD"
              />
            </div>

            <div class="tl-field">
              <label class="tl-label">\u754C\u9762\u914D\u8272\u4E3B\u9898</label>
              <select class="tl-select" v-model="draft.theme">
                <option value="tavern">\u8DDF\u968F\u9152\u9986\u7F8E\u5316\u4E3B\u9898\u53D8\u91CF\uFF08\u63A8\u8350\uFF09</option>
                <option value="light">\u7EAF\u51C0\u65E5\u95F4\u6A21\u5F0F</option>
                <option value="dark">\u62A4\u773C\u591C\u95F4\u6A21\u5F0F</option>
              </select>
              <div class="tl-hint">\u300C\u8DDF\u968F\u9152\u9986\u300D\u81EA\u52A8\u5F15\u7528 --SmartThemeBodyColor / --SmartThemeBlurTintColor \u7B49\u7F8E\u5316\u53D8\u91CF</div>
            </div>

            <div class="tl-field-row">
              <div><div class="tl-label" style="margin:0;">\u60AC\u505C\u5355\u8BCD\u663E\u793A\u8F7B\u67D4\u4E0B\u5212\u7EBF</div></div>
              <input type="checkbox" v-model="draft.ui.showWordUnderline" />
            </div>

            <div class="tl-field-row">
              <div><div class="tl-label" style="margin:0;">\u5728\u6D88\u606F\u5E95\u90E8\u663E\u793A\u300C\u53CC\u8BED\u8BD1\u6587 / \u6717\u8BFB\u300D\u8F7B\u80F6\u56CA</div></div>
              <input type="checkbox" v-model="draft.ui.autoShowMesButtons" />
            </div>
          </div>

          <!-- Tab 2: \u8BCD\u5178\u4E0E\u7FFB\u8BD1 -->
          <div v-else-if="modal.activeTab === 'dict'">
            <div class="tl-field">
              <label class="tl-label">\u53EF\u7EC4\u88C5\u8BCD\u5178\u94FE\uFF08\u5F53\u524D\uFF1A{{ currentLangDef?.name || draft.targetLang }}\uFF09</label>
              <div class="tl-hint" style="margin-bottom:8px;">\u52FE\u9009\u542F\u7528\u8BCD\u5178\u5E76\u8C03\u6574\u4F18\u5148\u7EA7\uFF0C\u67E5\u8BCD\u65F6\u6309\u987A\u5E8F\u81EA\u52A8\u5339\u914D\u4E0E\u515C\u5E95</div>
              <div class="tl-dict-list">
                <div v-for="(d, idx) in orderedDictionaries" :key="d.id" class="tl-dict-row">
                  <input
                    type="checkbox"
                    :checked="isDictEnabled(d.id)"
                    @change="toggleDict(d.id, $event.target.checked)"
                  />
                  <div class="tl-dict-row-info">
                    <div class="tl-dict-row-name">{{ d.name }}</div>
                    <div class="tl-dict-row-desc">{{ d.description }}</div>
                  </div>
                  <div v-if="isDictEnabled(d.id)" class="tl-dict-row-actions">
                    <button type="button" class="tl-icon-btn" :disabled="idx === 0" @click="moveDict(d.id, -1)" title="\u4E0A\u79FB">
                      <i class="fa-solid fa-chevron-up"></i>
                    </button>
                    <button type="button" class="tl-icon-btn" @click="moveDict(d.id, 1)" title="\u4E0B\u79FB">
                      <i class="fa-solid fa-chevron-down"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="tl-field-row">
              <div>
                <div class="tl-label" style="margin:0;">\u67E5\u8BCD\u81EA\u52A8\u8865\u5168\u4E2D\u6587\u91CA\u4E49</div>
                <div class="tl-hint">\u5C06\u82F1\u82F1 / \u65E5\u82F1\u8BCD\u5178\u91CA\u4E49\u81EA\u52A8\u9644\u5E26\u7B80\u660E\u4E2D\u6587</div>
              </div>
              <input type="checkbox" v-model="draft.autoTranslateDict" />
            </div>

            <div class="tl-field-row">
              <div><div class="tl-label" style="margin:0;">\u70B9\u6309\u5355\u8BCD\u65F6\u81EA\u52A8\u6717\u8BFB\u53D1\u97F3</div></div>
              <input type="checkbox" v-model="draft.autoSpeakWord" />
            </div>

            <div class="tl-field">
              <label class="tl-label">\u6574\u53E5 / \u6574\u6BB5\u4E2D\u6587\u7FFB\u8BD1\u5F15\u64CE</label>
              <select class="tl-select" v-model="draft.translator">
                <option v-for="t in translators" :key="t.id" :value="t.id">{{ t.name }}</option>
              </select>
              <div class="tl-hint">\u60F3\u8981\u5AB2\u7F8E\u4EBA\u5DE5\u7684\u4E2D\u6587\u5BF9\u7167\uFF0C\u63A8\u8350\u9009\u62E9\u300C\u9152\u9986\u5F53\u524D API\u300D\u6216\u914D\u7F6E\u4F4E\u6210\u672C\u300C\u81EA\u5B9A\u4E49 AI \u6A21\u578B\u300D</div>
            </div>

            <div class="tl-field">
              <label class="tl-label">\u81EA\u5B9A\u4E49 AI \u63A5\u53E3\uFF08\u7528\u4E8E\u9AD8\u8D28\u91CF\u7FFB\u8BD1 & AI \u8BED\u5883\u8BCD\u5178\uFF09</label>
              <input type="text" class="tl-input" style="margin-bottom:6px;" v-model="draft.customAi.baseUrl" placeholder="Base URL\uFF0C\u5982 https://api.openai.com/v1" />
              <input type="password" class="tl-input" style="margin-bottom:6px;" v-model="draft.customAi.apiKey" placeholder="API Key\uFF08\u4EC5\u4FDD\u5B58\u5728\u672C\u5730\u6D4F\u89C8\u5668\uFF09" />
              <input type="text" class="tl-input" v-model="draft.customAi.model" placeholder="\u6A21\u578B\u540D\u79F0\uFF0C\u5982 gpt-4o-mini / deepseek-chat" />
            </div>

            <div class="tl-field">
              <label class="tl-label">\u6717\u8BFB\u4E0E\u53D1\u97F3\u8BBE\u7F6E</label>
              <div class="tl-tts-grid">
                <select class="tl-select" v-model="draft.tts.engine">
                  <option value="auto">\u81EA\u52A8\uFF08\u63A8\u8350\uFF09</option>
                  <option value="webspeech">\u6D4F\u89C8\u5668\u8BED\u97F3</option>
                  <option value="youdao">\u6709\u9053\u5728\u7EBF\u8BED\u97F3</option>
                </select>
                <select class="tl-select" v-model="draft.tts.enAccent">
                  <option value="us">\u7F8E\u5F0F\u82F1\u8BED</option>
                  <option value="uk">\u82F1\u5F0F\u82F1\u8BED</option>
                </select>
                <select class="tl-select" v-model.number="draft.tts.rate">
                  <option :value="0.7">0.7x \u6162\u901F</option>
                  <option :value="0.85">0.85x \u7A0D\u6162</option>
                  <option :value="1">1.0x \u6B63\u5E38</option>
                  <option :value="1.2">1.2x \u8F83\u5FEB</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Tab 3: \u5B89\u5168\u5206\u8BCD\u6392\u9664 -->
          <div v-else>
            <div class="tl-field">
              <label class="tl-label">\u5B89\u5168\u5206\u8BCD\u6392\u9664\u540D\u5355\uFF08\u6807\u7B7E\u540D\u6216 CSS \u9009\u62E9\u5668\uFF09</label>
              <textarea
                class="tl-textarea"
                v-model="draft.excludeText"
                placeholder="\u7528\u9017\u53F7\u6216\u6362\u884C\u5206\u9694\uFF0C\u4F8B\u5982\uFF1Acode, pre, details, .status-bar, thinking"
              ></textarea>
              <div class="tl-hint">\u5199\u5728\u540D\u5355\u91CC\u7684 HTML \u6807\u7B7E\u3001\u81EA\u5B9A\u4E49\u6807\u7B7E\u6216 CSS \u9009\u62E9\u5668\u5185\u90E8\u4E0D\u4F1A\u88AB\u5206\u8BCD\uFF0C\u4E5F\u4E0D\u4F1A\u88AB\u6574\u6BB5\u7FFB\u8BD1\u7834\u574F\u6392\u7248\u3002</div>
              <div class="tl-chips">
                <button
                  v-for="chip in QUICK_EXCLUDE_CHIPS"
                  :key="chip"
                  type="button"
                  class="tl-chip"
                  @click="addExcludeChip(chip)"
                >
                  <i class="fa-solid fa-plus"></i><span>{{ chip }}</span>
                </button>
              </div>
            </div>
            <div class="tl-hint">
              \u7CFB\u7EDF\u5185\u7F6E\u59CB\u7EC8\u4FDD\u62A4\uFF1A<code>script, style, iframe, svg, canvas, audio, video</code> \u7B49\u975E\u6B63\u6587\u5143\u7D20\u3002<br/>
              \u4FDD\u5B58\u540E\u4F1A\u81EA\u52A8\u5B89\u5168\u8FD8\u539F\u5E76\u6309\u65B0\u540D\u5355\u91CD\u65B0\u5904\u7406\u5F53\u524D\u6240\u6709\u6D88\u606F\u3002
            </div>
          </div>
        </div>

        <div v-if="modal.activeTab !== 'vocab'" class="tl-modal-footer">
          <button type="button" class="tl-btn" @click="onClearCache">
            <i class="fa-solid fa-broom"></i><span>\u6E05\u7F13\u5B58</span>
          </button>
          <button type="button" class="tl-btn" @click="closeModal">\u53D6\u6D88</button>
          <button type="button" class="tl-btn tl-btn-primary" @click="onSave">\u4FDD\u5B58\u5E76\u5E94\u7528</button>
        </div>
      </div>
    </div>
  `});var yh="tl-vue-root",Zs=null,Ln=null,Ty=it({name:"TavernLanguageRoot",components:{WordPopover:mh,SelectionBar:vh,SettingsModal:_h},template:`
    <WordPopover />
    <SelectionBar />
    <SettingsModal />
  `});function bh(){Tc();let e=ve();Ln=e.createElement("div"),Ln.id=yh,Ln.className="tl-ignore",e.body.appendChild(Ln),Zs=Rs(Ty),Zs.mount(Ln)}function Tc(){if(Zs){try{Zs.unmount()}catch{}Zs=null}Ln&&(Ln.remove(),Ln=null);let e=ve().getElementById(yh);e&&e.remove()}var Nh=/([A-Za-z]+(?:['’][A-Za-z]+)?(?:-[A-Za-z]+)*)/g,XN=yn({code:"en",name:"\u82F1\u8BED",nativeName:"English",bcp47:"en-US",googleCode:"en",wiktionaryLang:"English",youdaoLang:"en",defaultDictionaries:["free-dict","wiktionary","ai-context"],levels:[{id:"A2",label:"A2 \u521D\u7EA7\uFF08\u65E5\u5E38\u9AD8\u9891\u8BCD\uFF09",desc:"Use simple A2-level English with short, clear sentences and high-frequency daily vocabulary."},{id:"B1",label:"B1 \u4E2D\u7EA7\uFF08\u81EA\u7136\u6D41\u7545\uFF09",desc:"Use natural B1-level intermediate English with everyday expressions and moderate sentence complexity."},{id:"B2",label:"B2 \u4E2D\u9AD8\u7EA7\uFF08\u5730\u9053\u8FDB\u9636\uFF09",desc:"Use rich, idiomatic B2-level upper-intermediate English with nuanced phrasing."},{id:"C1",label:"C1 \u9AD8\u7EA7\uFF08\u6587\u5B66/\u6DF1\u5EA6\uFF09",desc:"Use sophisticated C1-level advanced English with vivid literary vocabulary and natural idioms."},{id:"native",label:"\u6BCD\u8BED\u7EA7\uFF08\u4E0D\u9650\u96BE\u5EA6\uFF09",desc:"Use completely natural, authentic native-level English matching the character and setting."}],tokenize(e){let t=[],n=0;Nh.lastIndex=0;let o;for(;(o=Nh.exec(e))!==null;){o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1});let s=o[0];t.push({text:s,lookup:s.replace(/’/g,"'"),isWord:s.length>=1}),n=o.index+s.length}return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: English]","Write your ENTIRE response strictly in English (dialogue, narration, actions, and thoughts). Do not translate into Chinese unless explicitly asked in-character.",(this.levels.find(o=>o.id===e)||this.levels[1]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var Oy=/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u3400-\u4DBFー]/,Sh=/([\u4E00-\u9FFF\u3400-\u4DBF]+[\u3040-\u309F]*|[\u30A0-\u30FFー]+|[\u3040-\u309F]{2,})/g,Xi=null;try{typeof Intl<"u"&&typeof Intl.Segmenter=="function"&&(Xi=new Intl.Segmenter("ja",{granularity:"word"}))}catch{Xi=null}var qN=yn({code:"ja",name:"\u65E5\u8BED",nativeName:"\u65E5\u672C\u8A9E",bcp47:"ja-JP",googleCode:"ja",wiktionaryLang:"Japanese",youdaoLang:"ja",defaultDictionaries:["jotoba","wiktionary","ai-context"],levels:[{id:"N5",label:"JLPT N5\uFF08\u5165\u95E8\uFF09",desc:"Use beginner JLPT N5-level Japanese with simple grammar and basic everyday words."},{id:"N4",label:"JLPT N4\uFF08\u521D\u7EA7\uFF09",desc:"Use JLPT N4-level Japanese with clear conversational expressions."},{id:"N3",label:"JLPT N3\uFF08\u4E2D\u7EA7\u65E5\u5E38\uFF09",desc:"Use natural JLPT N3-level intermediate Japanese suitable for everyday conversation and light fiction."},{id:"N2",label:"JLPT N2\uFF08\u4E2D\u9AD8\u7EA7\uFF09",desc:"Use natural JLPT N2-level Japanese with rich expressions and nuanced tone."},{id:"native",label:"\u6BCD\u8BED\u7EA7\uFF08\u5730\u9053\u81EA\u7136\uFF09",desc:"Use completely natural, authentic native Japanese matching the character personality and context."}],tokenize(e){if(Xi){let s=[];for(let r of Xi.segment(e)){let i=!!(r.isWordLike&&Oy.test(r.segment));s.push({text:r.segment,lookup:r.segment,isWord:i})}return s}let t=[],n=0;Sh.lastIndex=0;let o;for(;(o=Sh.exec(e))!==null;)o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1}),t.push({text:o[0],lookup:o[0],isWord:!0}),n=o.index+o[0].length;return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: Japanese]","Write your ENTIRE response strictly in Japanese (dialogue, narration, actions, and thoughts). Do not include Chinese translations or romaji unless explicitly asked.",(this.levels.find(o=>o.id===e)||this.levels[2]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var xh="A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0152\u0153\xC6\xE6",Th=new RegExp(`([${xh}]+(?:-[${xh}]+)*)`,"g"),QN=yn({code:"fr",name:"\u6CD5\u8BED",nativeName:"Fran\xE7ais",bcp47:"fr-FR",googleCode:"fr",wiktionaryLang:"French",youdaoLang:"fr",defaultDictionaries:["wiktionary","ai-context"],levels:[{id:"A2",label:"A2 \u521D\u7EA7\uFF08\u57FA\u7840\u65E5\u5E38\uFF09",desc:"Use clear A2-level French with simple sentences and everyday vocabulary."},{id:"B1",label:"B1 \u4E2D\u7EA7\uFF08\u81EA\u7136\u6D41\u7545\uFF09",desc:"Use natural B1-level intermediate French with common idiomatic expressions."},{id:"B2",label:"B2 \u4E2D\u9AD8\u7EA7\uFF08\u5730\u9053\u8FDB\u9636\uFF09",desc:"Use expressive, idiomatic B2-level French with natural nuance."},{id:"C1",label:"C1 \u9AD8\u7EA7\uFF08\u6587\u5B66\u4F18\u96C5\uFF09",desc:"Use refined C1-level French with rich literary vocabulary and authentic turns of phrase."},{id:"native",label:"\u6BCD\u8BED\u7EA7\uFF08\u4E0D\u9650\u96BE\u5EA6\uFF09",desc:"Use completely authentic, natural native-level French matching the character and atmosphere."}],tokenize(e){let t=[],n=0;Th.lastIndex=0;let o;for(;(o=Th.exec(e))!==null;){o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1});let s=o[0];t.push({text:s,lookup:s,isWord:s.length>=1}),n=o.index+s.length}return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: French]","Write your ENTIRE response strictly in French (dialogue, narration, actions, and thoughts). Do not translate into Chinese unless explicitly asked in-character.",(this.levels.find(o=>o.id===e)||this.levels[1]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var tS=Gt({id:"free-dict",name:"Free Dictionary",description:"\u82F1\u8BED\u6743\u5A01\u5F00\u6E90\u8BCD\u5178\uFF0C\u63D0\u4F9B\u97F3\u6807\u3001\u8BCD\u6027\u3001\u4F8B\u53E5\u4E0E\u771F\u4EBA\u53D1\u97F3",languages:["en"],async lookup(e,{config:t}){let n=e.toLowerCase().replace(/^['’]+|['’]+$/g,""),o=`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(n)}`,s=await fetch(o);if(!s.ok)return null;let r=await s.json();if(!Array.isArray(r)||r.length===0)return null;let i=r[0],a=t?.tts?.enAccent||"us",l=i.phonetic||"",u="",f=Array.isArray(i.phonetics)?i.phonetics:[];for(let p of f)if(!l&&p.text&&(l=p.text),p.audio){let d=p.audio.toLowerCase();if(u||(u=p.audio),a==="uk"&&d.includes("-uk")){u=p.audio,p.text&&(l=p.text);break}if(a==="us"&&d.includes("-us")){u=p.audio,p.text&&(l=p.text);break}}let c=[];for(let p of i.meanings||[]){let d=(p.definitions||[]).slice(0,3).map(_=>({text:_.definition||"",cn:"",example:_.example||""}));d.length>0&&c.push({pos:p.partOfSpeech||"",posInfo:tt(p.partOfSpeech),definitions:d})}return c.length===0?null:{word:i.word||e,phonetic:l,reading:"",audioUrl:u,briefCn:"",tags:[],meanings:c}}});function wy(e){if(!Array.isArray(e)||e.length===0)return{raw:"word",info:tt("")};let t=e[0],n="";typeof t=="string"?n=t:t&&typeof t=="object"&&(n=Object.keys(t)[0]||"");let o=n.toLowerCase();return o.includes("noun")?{raw:"noun",info:tt("noun")}:o.includes("verb")||o.includes("godan")||o.includes("ichidan")?{raw:"verb",info:tt("verb")}:o.includes("adj")?{raw:"adjective",info:tt("adjective")}:o.includes("adv")?{raw:"adverb",info:tt("adverb")}:o.includes("part")?{raw:"particle",info:tt("particle")}:o.includes("expr")?{raw:"expression",info:tt("expression")}:{raw:n,info:tt(n)}}var sS=Gt({id:"jotoba",name:"Jotoba \u65E5\u8BED\u8BCD\u5178",description:"\u57FA\u4E8E JMdict \u7684\u65E5\u8BED\u5F00\u6E90\u8BCD\u5178\uFF0C\u63D0\u4F9B\u5047\u540D\u8BFB\u97F3\u3001\u8BCD\u6027\u3001\u5E38\u7528\u5EA6\u4E0E\u53D1\u97F3",languages:["ja"],async lookup(e){let t=await fetch("https://jotoba.de/api/search/words",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:e,language:"English",no_english:!1})});if(!t.ok)return null;let o=(await t.json())?.words;if(!Array.isArray(o)||o.length===0)return null;let s=o.find(c=>c.reading?.kanji===e||c.reading?.kana===e)||o[0],r=s.reading?.kanji||"",i=s.reading?.kana||"",a=s.audio?`https://jotoba.de${s.audio}`:"",l=[];s.common&&l.push("\u5E38\u7528\u8BCD");let u=new Map;for(let c of(s.senses||[]).slice(0,5)){let{raw:p,info:d}=wy(c.pos),_=Array.isArray(c.glosses)?c.glosses.slice(0,4).join("; "):"";if(!_)continue;let m=d.abbr||p;u.has(m)||u.set(m,{pos:p,posInfo:d,definitions:[]}),u.get(m).definitions.push({text:_,cn:"",example:""})}let f=[...u.values()];return f.length===0?null:{word:r||i||e,phonetic:"",reading:i&&i!==r?i:"",audioUrl:a,briefCn:"",tags:l,meanings:f}}});function Oh(e){return String(e||"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g," ").trim()}var aS=Gt({id:"wiktionary",name:"Wiktionary \u591A\u8BED\u79CD\u8BCD\u5178",description:"\u7EF4\u57FA\u8BCD\u5178\u5B98\u65B9\u63A5\u53E3\uFF0C\u539F\u751F\u652F\u6301\u82F1/\u65E5/\u6CD5\u53CA\u51E0\u4E4E\u6240\u6709\u5C0F\u8BED\u79CD",languages:["*"],async lookup(e,{lang:t,langDef:n}){let o=[e];e!==e.toLowerCase()&&o.push(e.toLowerCase());let s=null,r=e;for(let l of o){let u=`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(l)}`,f=await fetch(u);if(f.ok){s=await f.json(),r=l;break}}if(!s||typeof s!="object")return null;let i=s[t]||s[n?.code]||null;if(!Array.isArray(i)||i.length===0)return null;let a=[];for(let l of i.slice(0,4)){let u=[];for(let f of(l.definitions||[]).slice(0,3)){let c=Oh(f.definition);if(!c)continue;let p=Array.isArray(f.examples)&&f.examples[0]?Oh(f.examples[0]):"";u.push({text:c,cn:"",example:p})}u.length>0&&a.push({pos:l.partOfSpeech||"",posInfo:tt(l.partOfSpeech),definitions:u})}return a.length===0?null:{word:r,phonetic:"",reading:"",audioUrl:"",briefCn:"",tags:[n?.nativeName||t],meanings:a}}});async function Cy(e,t){let n=t?.customAi||{};if(n.apiKey&&n.baseUrl&&n.model){let s=`${n.baseUrl.replace(/\/+$/,"")}/chat/completions`,r=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n.apiKey}`},body:JSON.stringify({model:n.model,temperature:.2,messages:[{role:"system",content:'You are a concise multilingual dictionary. Respond ONLY in valid JSON: {"phonetic":"","reading":"","pos":"noun|verb|adjective|adverb|expression|other","briefCn":"","definitions":[{"cn":"","text":"","example":""}]}'},{role:"user",content:e}]})});if(!r.ok)throw new Error(`AI \u8BCD\u5178 HTTP ${r.status}`);return(await r.json())?.choices?.[0]?.message?.content||""}let o=$n();if(o&&typeof o.generateRaw=="function")return await o.generateRaw({user_input:`${e}

\u8BF7\u4EC5\u8F93\u51FA\u5408\u6CD5 JSON\uFF08\u4E0D\u8981 markdown \u4EE3\u7801\u5757\uFF09\uFF1A{"phonetic":"","reading":"","pos":"noun","briefCn":"","definitions":[{"cn":"","text":"","example":""}]}`,should_stream:!1});throw new Error("\u672A\u914D\u7F6E\u81EA\u5B9A\u4E49 AI \u4E14\u9152\u9986\u5F53\u524D\u4E0D\u652F\u6301 generateRaw")}var fS=Gt({id:"ai-context",name:"AI \u8BED\u5883\u7CBE\u8BB2",description:"\u7ED3\u5408\u5F53\u524D\u53E5\u5B50\u8BED\u5883\u89E3\u6790\u8BCD\u6027\u3001\u771F\u5B9E\u542B\u4E49\u4E0E\u5730\u9053\u7528\u6CD5\uFF08\u6309\u9700\u70B9\u51FB\u89E6\u53D1\uFF09",languages:["*"],async lookup(e,{langDef:t,context:n,config:o}){let s=[`Language: ${t?.name||"Foreign"} (${t?.nativeName||""})`,`Word: ${e}`,n?`Sentence context: "${n}"`:"","Give the base form/reading/IPA, part of speech, exact Chinese meaning in this context, a concise explanation, and one short example."].filter(Boolean).join(`
`),r=await Cy(s,o),i=String(r).match(/\{[\s\S]*\}/);if(!i)throw new Error("AI \u8BCD\u5178\u8FD4\u56DE\u683C\u5F0F\u65E0\u6CD5\u89E3\u6790");let a=JSON.parse(i[0]),l=Array.isArray(a.definitions)?a.definitions.slice(0,3).map(u=>({cn:u.cn||"",text:u.text||"",example:u.example||""})):[{cn:a.briefCn||"",text:"",example:""}];return{word:e,phonetic:a.phonetic||"",reading:a.reading||"",audioUrl:"",briefCn:a.briefCn||l[0]?.cn||"",tags:["AI \u8BED\u5883\u89E3\u6790"],meanings:[{pos:a.pos||"expression",posInfo:tt(a.pos),definitions:l}]}}});var hS=Yt({id:"google",name:"Google \u514D\u8D39\u7FFB\u8BD1",description:"\u514D Key\u3001\u901F\u5EA6\u5FEB\u3001\u652F\u6301\u591A\u8BED\u79CD\uFF08\u9ED8\u8BA4\u63A8\u8350\uFF09",async translate(e,{from:t="auto",to:n="zh-CN"}){let s=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(t==="auto"?"auto":t)}&tl=${encodeURIComponent(n)}&dt=t&q=${encodeURIComponent(e)}`,r=await fetch(s);if(!r.ok)throw new Error(`Google Translate HTTP ${r.status}`);let i=await r.json();if(!Array.isArray(i)||!Array.isArray(i[0]))throw new Error("Google Translate \u8FD4\u56DE\u683C\u5F0F\u5F02\u5E38");return i[0].map(a=>Array.isArray(a)?a[0]:"").join("")}});var vS=Yt({id:"mymemory",name:"MyMemory \u514D\u8D39\u7FFB\u8BD1",description:"\u514D Key \u5F00\u6E90\u7FFB\u8BD1\u515C\u5E95\u63A5\u53E3",async translate(e,{from:t="en",to:n="zh-CN"}){let o=t==="auto"?"en":t,s=`https://api.mymemory.translated.net/get?q=${encodeURIComponent(e)}&langpair=${encodeURIComponent(o)}|${encodeURIComponent(n)}`,r=await fetch(s);if(!r.ok)throw new Error(`MyMemory HTTP ${r.status}`);let a=(await r.json())?.responseData?.translatedText;if(!a)throw new Error("MyMemory \u672A\u8FD4\u56DE\u8BD1\u6587");return a}});var bS=Yt({id:"custom-ai",name:"\u81EA\u5B9A\u4E49 AI \u6A21\u578B\uFF08\u9AD8\u8D28\u91CF\u8BED\u5883\u7FFB\u8BD1\uFF09",description:"\u4F7F\u7528\u81EA\u5B9A\u4E49 OpenAI \u517C\u5BB9\u63A5\u53E3\uFF08\u5982 DeepSeek / GPT-4o-mini / Gemini\uFF09\u7FFB\u8BD1\uFF0C\u81EA\u7136\u5730\u9053",async translate(e,{from:t,to:n="\u7B80\u4F53\u4E2D\u6587",context:o,config:s}){let r=s?.customAi||{};if(!r.apiKey||!r.baseUrl||!r.model)throw new Error("\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u586B\u5199\u81EA\u5B9A\u4E49 AI \u7684 Base URL\u3001API Key \u4E0E\u6A21\u578B\u540D\u79F0");let i=`${r.baseUrl.replace(/\/+$/,"")}/chat/completions`,a=`You are a literary translator. Translate the user's ${t||"foreign"} text into natural, fluent ${n==="zh-CN"?"Simplified Chinese":n}. Preserve tone, emotion, and character voice. Output ONLY the translation without explanation.`,l=o&&o!==e?`Context:
${o}

Translate this text:
${e}`:e,u=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r.apiKey}`},body:JSON.stringify({model:r.model,temperature:.2,messages:[{role:"system",content:a},{role:"user",content:l}]})});if(!u.ok)throw new Error(`Custom AI HTTP ${u.status}`);let c=(await u.json())?.choices?.[0]?.message?.content;if(!c)throw new Error("Custom AI \u672A\u8FD4\u56DE\u5185\u5BB9");return c.trim()}}),NS=Yt({id:"tavern-ai",name:"\u9152\u9986\u5F53\u524D API\uFF08\u5927\u6A21\u578B\u8BED\u5883\u7FFB\u8BD1\uFF09",description:"\u76F4\u63A5\u8C03\u7528\u9152\u9986\u5F53\u524D\u8FDE\u63A5\u7684\u6A21\u578B\u8FDB\u884C\u9AD8\u8D28\u91CF\u7FFB\u8BD1\uFF0C\u65E0\u9700\u989D\u5916 Key",async translate(e,{from:t,to:n="\u7B80\u4F53\u4E2D\u6587"}){let o=$n();if(!o||typeof o.generateRaw!="function")throw new Error("\u5F53\u524D\u9152\u9986\u52A9\u624B\u7248\u672C\u4E0D\u652F\u6301 generateRaw");let s=`\u8BF7\u5C06\u4EE5\u4E0B${t||"\u5916\u8BED"}\u6587\u672C\u51C6\u786E\u3001\u81EA\u7136\u5730\u7FFB\u8BD1\u6210${n==="zh-CN"?"\u7B80\u4F53\u4E2D\u6587":n}\uFF0C\u4FDD\u7559\u539F\u672C\u7684\u8BED\u6C14\u4E0E\u60C5\u7EEA\u3002\u53EA\u8F93\u51FA\u4E2D\u6587\u8BD1\u6587\uFF0C\u4E0D\u8981\u9644\u52A0\u4EFB\u4F55\u89E3\u91CA\u6216\u5F15\u53F7\uFF1A

${e}`,r=await o.generateRaw({user_input:s,should_stream:!1});if(!r||typeof r!="string")throw new Error("\u9152\u9986 API \u672A\u8FD4\u56DE\u6709\u6548\u8BD1\u6587");return r.trim()}});var Ko="__TAVERN_LANG_INSTANCE__",zi=null;function wh(){zi&&(zi(),zi=null),vo(),Zi(),aa(),Sc(),xc(),jc(),Nc(),Tc(),ia(),Xc();let e=pe();e[Ko]?.destroy===wh&&delete e[Ko]}function Ay(e={}){let t=pe();if(t[Ko]&&typeof t[Ko].destroy=="function")try{t[Ko].destroy()}catch(o){console.warn("[TavernLanguage] \u6E05\u7406\u65E7\u5B9E\u4F8B\u65F6\u51FA\u73B0\u8B66\u544A:",o)}rh(),Kc(),bh(),Hc(),hh(),gh(),lh(),ea(),Fc(),zi=Vc(o=>{zs(),pa(o),ea(),o.enabled?ra({force:!0}):ia()});let n={version:zo,init:Ay,destroy:wh,openSettings:()=>uo("general"),openVocabBook:()=>uo("vocab"),getConfig:ee,updateConfig:nr,registerLanguage:yn,getLanguage:nt,listLanguages:go,registerDictionary:Gt,listDictionaries:Hi,lookupWord:ji,registerTranslator:Yt,listTranslators:ar,translateText:bt};if(t[Ko]=n,!e.silent){let o=nt(ee().targetLang)?.name||ee().targetLang;Se(`\u5DF2\u52A0\u8F7D v${zo}\uFF08\u5F53\u524D\u8BED\u79CD\uFF1A${o}\uFF09`,"success")}return n}function qS(){uo("general")}function JS(){uo("vocab")}export{wh as destroy,Ay as init,qS as openSettings,JS as openVocabBook,Gt as registerDictionary,yn as registerLanguage,Yt as registerTranslator,zo as version};
/*! Bundled license information:

@vue/shared/dist/shared.esm-bundler.js:
  (**
  * @vue/shared v3.5.46
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/reactivity/dist/reactivity.esm-bundler.js:
  (**
  * @vue/reactivity v3.5.46
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/runtime-core/dist/runtime-core.esm-bundler.js:
  (**
  * @vue/runtime-core v3.5.46
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/runtime-dom/dist/runtime-dom.esm-bundler.js:
  (**
  * @vue/runtime-dom v3.5.46
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/compiler-core/dist/compiler-core.esm-bundler.js:
  (**
  * @vue/compiler-core v3.5.46
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/compiler-dom/dist/compiler-dom.esm-bundler.js:
  (**
  * @vue/compiler-dom v3.5.46
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

vue/dist/vue.esm-bundler.js:
  (**
  * vue v3.5.46
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
