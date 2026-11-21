/**
 * Tavern Language v2.1.0 (Vue 3)
 * SillyTavern 酒馆助手沉浸式外语学习插件
 * Repo: https://github.com/cone97218-alt/language
 */
var kh=Object.defineProperty;var Vh=(e,t)=>{for(var n in t)kh(e,n,{get:t[n],enumerable:!0})};function pe(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent}catch{}return window}function Ee(){return pe().document}function $n(){let e=pe();return window.TavernHelper||e.TavernHelper||null}function Qi(){let e=pe();return{eventOn:window.eventOn||e.eventOn||null,eventRemoveListener:window.eventRemoveListener||e.eventRemoveListener||null,tavern_events:window.tavern_events||e.tavern_events||null,iframe_events:window.iframe_events||e.iframe_events||null}}function Se(e,t="info"){let n=pe(),o=window.toastr||n.toastr;o&&typeof o[t]=="function"?o[t](e,"\u9152\u9986\u5916\u8BED\u5B66\u4E60"):console.log(`[TavernLanguage][${t}] ${e}`)}var zo="2.1.0",Rc="tavern_language_config_v1",Rh=["script","style","noscript","iframe","svg","canvas","audio","video",".tl-ignore",".tl-trans-block",".tl-mes-footer",".tl-word",".tl-popover",".tl-sel-bar",".tl-modal-backdrop","#tl-vue-root"],ts={enabled:!0,targetLang:"en",promptInjection:{enabled:!0,level:"B1",promptText:"",depth:0},theme:"tavern",excludeSelectors:["code","pre","kbd","math","summary","button","input","textarea","select"],dictionaryChains:{en:["free-dict","wiktionary","ai-context"],ja:["jotoba","wiktionary","ai-context"],fr:["wiktionary","ai-context"]},autoTranslateDict:!0,autoSpeakWord:!1,translator:"google",customAi:{baseUrl:"https://api.openai.com/v1",apiKey:"",model:"gpt-4o-mini"},tts:{engine:"auto",rate:1,enAccent:"us"},ui:{showWordUnderline:!0,autoShowMesButtons:!0}};function mo(e,t){if(!t||typeof t!="object")return e;let n=Array.isArray(e)?[...e]:{...e};for(let o of Object.keys(t)){let r=t[o];r&&typeof r=="object"&&!Array.isArray(r)&&e[o]&&typeof e[o]=="object"&&!Array.isArray(e[o])?n[o]=mo(e[o],r):r!==void 0&&(n[o]=Array.isArray(r)?[...r]:r)}return n}var kt=mo(ts,{}),Zi=new Set;function Pc(){try{let e=pe().localStorage.getItem(Rc);if(e){let t=JSON.parse(e);kt=mo(ts,t)}else kt=mo(ts,{})}catch(e){console.warn("[TavernLanguage] \u8BFB\u53D6\u914D\u7F6E\u5931\u8D25\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u914D\u7F6E:",e),kt=mo(ts,{})}return kt}function Q(){return kt}function ns(e){kt=mo(kt,e);try{pe().localStorage.setItem(Rc,JSON.stringify(kt))}catch(t){console.warn("[TavernLanguage] \u4FDD\u5B58\u914D\u7F6E\u5931\u8D25:",t)}return Zi.forEach(t=>{try{t(kt)}catch(n){console.error("[TavernLanguage] \u914D\u7F6E\u76D1\u542C\u56DE\u8C03\u5F02\u5E38:",n)}}),kt}function Mc(e){return Zi.add(e),()=>Zi.delete(e)}function Go(e){return Array.isArray(e)?e.map(t=>String(t).trim()).filter(Boolean):String(e||"").split(/[\n,;，；]+/).map(t=>t.trim()).filter(Boolean)}function os(e=kt){let t=Go(e.excludeSelectors);return[...new Set([...Rh,...t])]}var qo=new Map;function yn(e){if(!e||!e.code)throw new Error("[TavernLanguage] registerLanguage \u9700\u8981\u5305\u542B code \u5B57\u6BB5");return qo.set(e.code,e),e}function nt(e){return qo.get(e)||qo.get("en")||[...qo.values()][0]||null}function go(){return[...qo.values()]}var Lc="tavern-language-immersive-prompt",rs=null;function Jo(e,t){let n=nt(e);return n?n.buildPrompt(t,""):""}function ea(e=Q()){let t=String(e.promptInjection?.promptText||"").trim();return t||Jo(e.targetLang,e.promptInjection?.level)}function ta(){if(typeof rs=="function"){try{rs()}catch{}rs=null}let e=$n();if(e&&typeof e.uninjectPrompts=="function")try{e.uninjectPrompts([Lc])}catch{}}function na(){ta();let e=Q();if(!e.enabled||!e.promptInjection?.enabled)return!1;let t=$n();if(!t||typeof t.injectPrompts!="function")return!1;let n=ea(e);if(!n)return!1;try{let o=t.injectPrompts([{id:Lc,role:"system",content:n,position:"in_chat",depth:Number.isFinite(Number(e.promptInjection.depth))?Number(e.promptInjection.depth):0,should_scan:!1}]);return o&&typeof o.uninject=="function"&&(rs=o.uninject),!0}catch(o){return console.warn("[TavernLanguage] injectPrompts \u6CE8\u5165\u5931\u8D25:",o),!1}}function oa(e,t){if(!e||e.nodeType!==1)return!1;let n=e.tagName?e.tagName.toLowerCase():"";for(let o of t)if(o){if(/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(o)){if(n===o.toLowerCase())return!0;continue}try{if(e.matches(o))return!0}catch{}}return!1}function is(e,t,n){let o=e.nodeType===1?e:e.parentElement;for(;o&&o!==t;){if(oa(o,n))return!0;o=o.parentElement}return!1}function ss(e){if(!e)return;let t=e.querySelectorAll("span.tl-word");for(let n of t){let o=e.ownerDocument.createTextNode(n.textContent||"");n.replaceWith(o)}e.normalize(),delete e.dataset.tlTokenizedLang,delete e.dataset.tlExcludeHash}function $c(e,t={}){if(!e)return;let n=Q();if(!n.enabled){ss(e);return}let o=t.lang||n.targetLang||"en",r=nt(o);if(!r)return;let s=os(n),i=s.join("|");if(!t.force&&e.dataset.tlTokenizedLang===o&&e.dataset.tlExcludeHash===i)return;e.dataset.tlTokenizedLang&&ss(e);let a=e.ownerDocument||Ee(),l=a.createTreeWalker(e,4,{acceptNode(c){return!c.nodeValue||!c.nodeValue.trim()||is(c,e,s)?2:1}}),u=[],f;for(;f=l.nextNode();)u.push(f);for(let c of u){let p=r.tokenize(c.nodeValue);if(!p||p.length===0||!p.some(m=>m.isWord))continue;let v=a.createDocumentFragment();for(let m of p)if(m.isWord){let N=a.createElement("span");N.className="tl-word",N.textContent=m.text,N.dataset.tlWord=m.lookup||m.text,N.dataset.tlLang=o,v.appendChild(N)}else v.appendChild(a.createTextNode(m.text));c.replaceWith(v)}e.dataset.tlTokenizedLang=o,e.dataset.tlExcludeHash=i}function Fc(e){if(!e)return"";let t=e.closest("p, li, blockquote, div.mes_text, h1, h2, h3, h4, h5, h6")||e.parentElement;if(!t)return e.textContent||"";let n="",o=-1,r=-1,s=t.ownerDocument.createTreeWalker(t,4,{acceptNode(f){return f.parentElement?.closest(".tl-trans-block")?2:1}}),i;for(;i=s.nextNode();){let f=i.nodeValue||"";e.contains(i)&&o===-1&&(o=n.length,r=n.length+f.length),n+=f}if(o===-1)return n.trim();let a=/[.!?。！？\n]/,l=o;for(;l>0&&!a.test(n[l-1]);)l--;let u=r;for(;u<n.length&&!a.test(n[u]);)u++;return u<n.length&&/[.!?。！？]/.test(n[u])&&u++,n.slice(l,u).replace(/\s+/g," ").trim()}var as=new Map,Fn=new Map,Ph=400;function Mh(e,t){if(Fn.size>=Ph){let n=Fn.keys().next().value;Fn.delete(n)}Fn.set(e,t)}function Yt(e){if(!e||!e.id)throw new Error("[TavernLanguage] registerTranslator \u9700\u8981 id \u5B57\u6BB5");return as.set(e.id,e),e}function ls(){return[...as.values()]}function Uc(){Fn.clear()}async function Vt(e,t={}){let n=String(e||"").trim();if(!n)return"";let o=Q(),r=t.from||o.targetLang||"auto",s=t.to||"zh-CN",i=t.providerId||o.translator||"google",a=`${i}|${r}|${s}|${n}`;if(!t.bypassCache&&Fn.has(a))return Fn.get(a);let l=[i,"google","mymemory"].filter((f,c,p)=>p.indexOf(f)===c&&as.has(f)),u=null;for(let f of l){let c=as.get(f);try{let p=await c.translate(n,{from:r,to:s,context:t.context||"",config:o});if(p&&p.trim())return Mh(a,p.trim()),p.trim()}catch(p){u=p,console.warn(`[TavernLanguage] \u7FFB\u8BD1\u6E90 ${f} \u5931\u8D25\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A:`,p?.message||p)}}throw u||new Error("\u6240\u6709\u7FFB\u8BD1\u6E90\u5747\u4E0D\u53EF\u7528")}var Rt=null;function Eo(){if(Rt){try{Rt.pause(),Rt.currentTime=0}catch{}Rt=null}let e=pe();if(e.speechSynthesis)try{e.speechSynthesis.cancel()}catch{}}function cs(e,t=1){return new Promise((n,o)=>{Eo();let r=pe().Audio||Audio,s=new r(e);s.playbackRate=Math.max(.5,Math.min(2,t||1)),Rt=s,s.onended=()=>{Rt===s&&(Rt=null),n(!0)},s.onerror=a=>{Rt===s&&(Rt=null),o(a||new Error("\u97F3\u9891\u64AD\u653E\u5931\u8D25"))};let i=s.play();i&&typeof i.catch=="function"&&i.catch(a=>{Rt===s&&(Rt=null),o(a)})})}function ra(e,t,n="us"){let o=encodeURIComponent(e);if(t==="en")return`https://dict.youdao.com/dictvoice?audio=${o}&type=${n==="uk"?1:2}`;let s={ja:"jap",fr:"fr",ko:"ko",de:"de",es:"es"}[t]||t;return`https://dict.youdao.com/dictvoice?audio=${o}&le=${encodeURIComponent(s)}`}function sa(e,t,n=1){return new Promise((o,r)=>{let s=pe(),i=s.speechSynthesis,a=s.SpeechSynthesisUtterance||window.SpeechSynthesisUtterance;if(!i||!a){r(new Error("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 Web Speech \u6717\u8BFB"));return}Eo();let u=nt(t)?.bcp47||t||"en-US",f=new a(e);f.lang=u,f.rate=Math.max(.5,Math.min(2,n||1));let c=i.getVoices?i.getVoices():[],p=u.split("-")[0].toLowerCase(),d=c.find(v=>v.lang&&v.lang.toLowerCase()===u.toLowerCase())||c.find(v=>v.lang&&v.lang.toLowerCase().startsWith(p));d&&(f.voice=d),f.onend=()=>o(!0),f.onerror=v=>r(v),i.speak(f)})}async function vo(e,t={}){let n=String(e||"").trim();if(!n)return;let o=Q(),r=t.lang||o.targetLang||"en",s=t.rate??o.tts?.rate??1;if((o.tts?.engine||"auto")==="webspeech")return sa(n,r,s);if(t.audioUrl)try{await cs(t.audioUrl,s);return}catch{}try{let a=ra(n,r,o.tts?.enAccent||"us");await cs(a,s);return}catch{}return sa(n,r,s)}async function Qt(e,t={}){let n=String(e||"").replace(/\s+/g," ").trim();if(!n)return;let o=Q(),r=t.lang||o.targetLang||"en",s=t.rate??o.tts?.rate??1;if((o.tts?.engine||"auto")==="youdao"&&n.length<=220)try{let a=ra(n,r,o.tts?.enAccent||"us");await cs(a,s);return}catch{}try{await sa(n,r,s)}catch{if(n.length<=220){let a=ra(n,r,o.tts?.enAccent||"us");await cs(a,s)}}}var Yo=null;function Bc(e){return os(e).filter(t=>t!==".tl-word")}function us(e,t,n){let o="",r=e.ownerDocument.createTreeWalker(e,4,{acceptNode(i){return i.parentElement?.closest(".tl-trans-block, .tl-mes-footer")||is(i,t,n)?2:1}}),s;for(;s=r.nextNode();)o+=s.nodeValue||"";return o.replace(/\s+/g," ").trim()}function Lh(e,t){let n=[...e.querySelectorAll("p, li, blockquote")].filter(r=>r.closest(".tl-mes-footer, .tl-trans-block")||oa(r,t)||is(r,e,t)||r.parentElement?.closest("p, li, blockquote")?!1:us(r,e,t).length>0);return n.length>0?n:us(e,e,t)?[e]:[]}async function $h(e,t){let n=e.querySelector(".mes_text");if(!n)return;let o=[...n.querySelectorAll(".tl-trans-block")];if(o.length>0){let v=o[0].classList.contains("tl-hidden");o.forEach(m=>m.classList.toggle("tl-hidden",!v)),t.classList.toggle("tl-active",v);return}let r=Q(),s=Bc(r),i=Lh(n,s);if(i.length===0)return;t.classList.add("tl-active"),t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';let a=n.ownerDocument,l=r.targetLang||"en",u=n.querySelector(".tl-mes-footer"),f=i.map(v=>{let m=us(v,n,s),N=a.createElement("div");return N.className="tl-trans-block tl-trans-loading tl-ignore",N.textContent="\u7FFB\u8BD1\u4E2D...",v===n?u?u.insertAdjacentElement("beforebegin",N):n.appendChild(N):v.insertAdjacentElement("afterend",N),{text:m,transDiv:N}}),c=3,p=0;async function d(){for(;p<f.length;){let v=f[p++];try{let m=await Vt(v.text,{from:l,to:"zh-CN"});v.transDiv.classList.remove("tl-trans-loading"),v.transDiv.textContent=m}catch(m){v.transDiv.classList.remove("tl-trans-loading"),v.transDiv.textContent=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${m?.message||"\u8BF7\u91CD\u8BD5"}`}}}await Promise.all(Array.from({length:Math.min(c,f.length)},()=>d())),t.innerHTML='<i class="fa-solid fa-language"></i>'}function Qo(e,t){e.classList.toggle("tl-active",t),e.innerHTML=t?'<i class="fa-solid fa-stop"></i>':'<i class="fa-solid fa-volume-high"></i>'}async function Fh(e,t){if(Yo===e){Eo(),Yo=null,Qo(t,!1);return}let n=e.querySelector(".mes_text");if(!n)return;let o=Q(),r=Bc(o),s=us(n,n,r);if(s){e.ownerDocument.querySelectorAll('.tl-footer-icon[data-tl-mes-action="speak"].tl-active').forEach(i=>Qo(i,!1)),Yo=e,Qo(t,!0);try{await Qt(s,{lang:o.targetLang||"en"})}catch{}finally{Yo===e&&(Yo=null),Qo(t,!1)}}}function Hc(e){e?.querySelectorAll(".tl-mes-btn").forEach(a=>a.remove());let t=Q();if(!t.enabled||t.ui?.autoShowMesButtons===!1){e?.querySelector(".tl-mes-footer")?.remove();return}let n=e?.querySelector(".mes_text");if(!n||n.querySelector(".tl-mes-footer")||!n.textContent||!n.textContent.trim())return;let o=e.ownerDocument,r=o.createElement("div");r.className="tl-mes-footer tl-ignore";let s=o.createElement("button");s.type="button",s.className="tl-footer-icon",s.dataset.tlMesAction="translate",s.title="\u53CC\u8BED\u5BF9\u7167",s.innerHTML='<i class="fa-solid fa-language"></i>',s.addEventListener("click",a=>{a.stopPropagation(),$h(e,s)});let i=o.createElement("button");i.type="button",i.className="tl-footer-icon",i.dataset.tlMesAction="speak",i.title="\u6717\u8BFB",Qo(i,!1),i.addEventListener("click",a=>{a.stopPropagation(),Fh(e,i)}),r.appendChild(s),r.appendChild(i),n.appendChild(r)}var Zo=null,Un=null,en=!1,ia=[];function Uh(){return[...Ee().querySelectorAll("#chat .mes")]}function Bh(e,t={}){if(!e)return;let n=e.querySelector(".mes_text");n&&($c(n,t),Hc(e))}function aa(e={}){let t=Uh();for(let n of t)Bh(n,e)}function la(){let e=Ee();e.querySelectorAll("#chat .mes .mes_text").forEach(t=>ss(t)),e.querySelectorAll("#chat .mes .tl-trans-block").forEach(t=>t.remove()),e.querySelectorAll("#chat .mes .tl-mes-btn").forEach(t=>t.remove()),e.querySelectorAll("#chat .mes .tl-mes-footer").forEach(t=>t.remove())}function Zt(e=280){Un&&clearTimeout(Un),Un=setTimeout(()=>{Un=null,!en&&Q().enabled&&aa()},e)}function bn(e,t){let{eventOn:n,eventRemoveListener:o}=Qi();if(!(!n||!e))try{let r=n(e,t);ia.push(()=>{try{r&&typeof r.stop=="function"?r.stop():typeof o=="function"&&o(e,t)}catch{}})}catch{}}function jc(){ca();let t=Ee().getElementById("chat");t&&(Zo=new MutationObserver(r=>{if(en||!Q().enabled)return;r.some(i=>{let a=i.target;return!(a?.nodeType===1&&(a.classList?.contains("tl-word")||a.classList?.contains("tl-trans-block")||a.classList?.contains("tl-mes-btn")||a.classList?.contains("tl-mes-footer")||a.closest?.(".tl-popover, .tl-sel-bar, .tl-modal-backdrop, .tl-mes-footer, #tl-vue-root")))})&&Zt(320)}),Zo.observe(t,{childList:!0,subtree:!0}));let{tavern_events:n,iframe_events:o}=Qi();n&&(bn(n.GENERATION_STARTED,()=>{en=!0}),bn(n.GENERATION_STOPPED,()=>{en=!1,Zt(200)}),bn(n.GENERATION_ENDED,()=>{en=!1,Zt(200)}),bn(n.MESSAGE_RECEIVED,()=>{en=!1,Zt(220)}),bn(n.MESSAGE_UPDATED,()=>{Zt(200)}),bn(n.MESSAGE_SWIPED,()=>{Zt(250)}),bn(n.CHAT_CHANGED,()=>{en=!1,Zt(350)})),o&&bn(o.STREAM_TOKEN_RECEIVED_FULLY,()=>{en=!1,Zt(260)}),Zt(150)}function ca(){for(Un&&(clearTimeout(Un),Un=null),Zo&&(Zo.disconnect(),Zo=null);ia.length>0;)ia.pop()();en=!1}var Wc=9,Hh=420,jh=260,ua=0,fa=0,fs=0,er=!1,pa=!1,Kc=0,ps=!1,ds=null,hs=null,ms=null,_o=null;function Xc(){if(ps)return;let e=Ee(),t=pe();ds=n=>{n.button&&n.button!==0||(ua=n.clientX,fa=n.clientY,fs=Date.now(),er=!1,pa=!1)},hs=n=>{if(er)return;let o=n.clientX-ua,r=n.clientY-fa;Math.hypot(o,r)>Wc&&(er=!0)},ms=n=>{n.touches&&n.touches.length>1&&(pa=!0)},_o=()=>{Kc=Date.now(),er=!0},e.addEventListener("pointerdown",ds,{passive:!0,capture:!0}),e.addEventListener("pointermove",hs,{passive:!0,capture:!0}),e.addEventListener("touchstart",ms,{passive:!0,capture:!0}),t.addEventListener("scroll",_o,{passive:!0,capture:!0}),e.addEventListener("scroll",_o,{passive:!0,capture:!0}),ps=!0}function zc(){if(!ps)return;let e=Ee(),t=pe();ds&&e.removeEventListener("pointerdown",ds,!0),hs&&e.removeEventListener("pointermove",hs,!0),ms&&e.removeEventListener("touchstart",ms,!0),_o&&(t.removeEventListener("scroll",_o,!0),e.removeEventListener("scroll",_o,!0)),ps=!1}function Gc(e){let t=Date.now();if(pa||er||t-Kc<jh||fs>0&&t-fs>Hh)return!1;if(e&&typeof e.clientX=="number"&&fs>0){let o=e.clientX-ua,r=e.clientY-fa;if(Math.hypot(o,r)>Wc)return!1}let n=pe().getSelection();return!(n&&n.toString().trim().length>0)}var da="tl-injected-styles",Wh=`
/* ========== Tavern Language: \u7EDF\u4E00 Design Tokens \u4E0E\u4E3B\u9898\u53D8\u91CF ========== */
:root[data-tl-theme="tavern"] {
  --tl-bg: var(--SmartThemeBlurTintColor, rgba(24, 26, 34, 0.96));
  --tl-bg: rgb(from var(--SmartThemeBlurTintColor, #1c1e26) r g b / 0.97);
  --tl-surface: color-mix(in srgb, var(--SmartThemeBodyColor, #e8eaf0) 5%, var(--tl-bg));
  --tl-surface-soft: color-mix(in srgb, var(--SmartThemeBodyColor, #e8eaf0) 6%, transparent);
  --tl-text: var(--SmartThemeBodyColor, #e8eaf0);
  --tl-text-muted: color-mix(in srgb, var(--SmartThemeBodyColor, #e8eaf0) 64%, transparent);
  --tl-accent: var(--SmartThemeQuoteColor, var(--SmartThemeEmColor, #7aa2f7));
  --tl-accent-soft: color-mix(in srgb, var(--SmartThemeQuoteColor, var(--SmartThemeEmColor, #7aa2f7)) 14%, transparent);
  --tl-border: color-mix(in srgb, var(--SmartThemeBodyColor, #e8eaf0) 12%, transparent);
  --tl-divider: color-mix(in srgb, var(--SmartThemeBodyColor, #e8eaf0) 8%, transparent);
  --tl-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  --tl-blur: 18px;
  --tl-radius-lg: 14px;
  --tl-radius-md: 9px;
  --tl-radius-sm: 6px;
  --tl-pos-noun: #3b82f6;
  --tl-pos-verb: #10b981;
  --tl-pos-adj: #d97706;
  --tl-pos-adv: #9333ea;
  --tl-pos-other: #64748b;
}

:root[data-tl-theme="light"] {
  --tl-bg: #ffffff;
  --tl-surface: #f7f8fb;
  --tl-surface-soft: rgba(15, 23, 42, 0.045);
  --tl-text: #1e2433;
  --tl-text-muted: #647087;
  --tl-accent: #4668f2;
  --tl-accent-soft: rgba(70, 104, 242, 0.1);
  --tl-border: rgba(15, 23, 42, 0.1);
  --tl-divider: rgba(15, 23, 42, 0.07);
  --tl-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
  --tl-blur: 16px;
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
  --tl-bg: #1b1d24;
  --tl-surface: #232631;
  --tl-surface-soft: rgba(255, 255, 255, 0.06);
  --tl-text: #e7eaf2;
  --tl-text-muted: #98a2b8;
  --tl-accent: #7aa2f7;
  --tl-accent-soft: rgba(122, 162, 247, 0.16);
  --tl-border: rgba(255, 255, 255, 0.1);
  --tl-divider: rgba(255, 255, 255, 0.07);
  --tl-shadow: 0 14px 36px rgba(0, 0, 0, 0.45);
  --tl-blur: 16px;
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
  border-left: 2px solid var(--tl-accent);
  background: color-mix(in srgb, var(--tl-accent) 6%, transparent);
  color: var(--tl-text-muted);
  font-size: 0.9em;
  line-height: 1.6;
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

/* ========== \u6D88\u606F\u6B63\u6587\u5E95\u90E8\u7EAF\u56FE\u6807\u5FAE\u680F ========== */
.tl-mes-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 6px;
  opacity: 0.45;
  transition: opacity 0.16s ease;
  user-select: none;
}

.mes:hover .tl-mes-footer,
.tl-mes-footer:hover,
.tl-mes-footer:has(.tl-active) {
  opacity: 0.95;
}

.tl-footer-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 26px;
  font-size: 13px;
  border-radius: var(--tl-radius-sm);
  border: none;
  background: transparent;
  color: var(--tl-text-muted);
  cursor: pointer;
  transition: all 0.14s ease;
  -webkit-tap-highlight-color: transparent;
}

.tl-footer-icon:hover,
.tl-footer-icon.tl-active {
  color: var(--tl-accent);
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
  border-bottom: 1px solid var(--tl-divider);
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
  font-size: 13.5px;
  color: var(--tl-accent);
  font-weight: 600;
  word-break: break-word;
}

.tl-pop-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

.tl-icon-btn {
  border: none;
  background: transparent;
  color: var(--tl-text-muted);
  border-radius: var(--tl-radius-sm);
  padding: 5px 8px;
  min-width: 30px;
  min-height: 30px;
  font-size: 13px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  white-space: nowrap;
  transition: background-color 0.14s ease, color 0.14s ease;
  -webkit-tap-highlight-color: transparent;
}

.tl-icon-btn:hover {
  background: var(--tl-accent-soft);
  color: var(--tl-accent);
}

.tl-icon-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.tl-pop-sources {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 7px 14px;
  border-bottom: 1px solid var(--tl-divider);
  background: transparent;
}

.tl-loading-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
}

.tl-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}

.tl-prompt-textarea {
  min-height: 92px;
  font-size: 12.5px;
  line-height: 1.5;
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
  padding: 6px 14px;
  border-top: 1px solid var(--tl-divider);
  background: transparent;
}

.tl-pop-footer-label {
  font-size: 12px;
  color: var(--tl-text-muted);
}

.tl-pop-footer-actions {
  display: flex;
  align-items: center;
  gap: 4px;
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
    opacity: 0.65;
  }

  .tl-footer-icon {
    width: 32px;
    height: 28px;
    font-size: 14px;
  }

  .tl-icon-btn {
    min-width: 34px;
    min-height: 34px;
    padding: 5px 8px;
    font-size: 13.5px;
  }

  .tl-pop-footer {
    padding: 6px 12px;
  }

  .tl-sel-bar {
    max-width: calc(100vw - 20px);
  }
}
`;function ha(e=Q()){let t=Ee().documentElement;t&&(t.setAttribute("data-tl-theme",e.theme||"tavern"),t.setAttribute("data-tl-underline",e.ui?.showWordUnderline===!1?"0":"1"))}function qc(){let e=Ee(),t=e.getElementById(da);t||(t=e.createElement("style"),t.id=da,e.head.appendChild(t)),t.textContent=Wh,ha()}function Jc(){let e=Ee(),t=e.getElementById(da);t&&t.remove(),e.documentElement.removeAttribute("data-tl-theme"),e.documentElement.removeAttribute("data-tl-underline")}var Rl={};Vh(Rl,{BaseTransition:()=>rl,BaseTransitionPropsValidators:()=>ai,Comment:()=>xe,DeprecationTypes:()=>LE,EffectScope:()=>Xn,ErrorCodes:()=>Im,ErrorTypeStrings:()=>DE,Fragment:()=>Ve,KeepAlive:()=>Eg,ReactiveEffect:()=>rn,Static:()=>un,Suspense:()=>fE,Teleport:()=>Gm,Text:()=>Cn,TrackOpTypes:()=>Bu,Transition:()=>BE,TransitionGroup:()=>hv,TriggerOpTypes:()=>Hu,VueElement:()=>_i,assertNumber:()=>Dm,callWithAsyncErrorHandling:()=>gt,callWithErrorHandling:()=>no,camelize:()=>le,capitalize:()=>Nt,cloneVNode:()=>Xt,compatUtils:()=>ME,computed:()=>Fe,createApp:()=>Rr,createBlock:()=>Ys,createCommentVNode:()=>Ff,createElementBlock:()=>EE,createElementVNode:()=>vl,createHydrationRenderer:()=>gl,createPropsRestProxy:()=>Xg,createRenderer:()=>ml,createSSRApp:()=>Hp,createSlots:()=>Ig,createStaticVNode:()=>bE,createTextVNode:()=>_l,createVNode:()=>ye,customRef:()=>Vs,defineAsyncComponent:()=>mg,defineComponent:()=>it,defineCustomElement:()=>Dp,defineEmits:()=>Mg,defineExpose:()=>Lg,defineModel:()=>Ug,defineOptions:()=>$g,defineProps:()=>Pg,defineSSRCustomElement:()=>lv,defineSlots:()=>Fg,devtools:()=>IE,effect:()=>Su,effectScope:()=>Eu,getCurrentInstance:()=>ze,getCurrentScope:()=>Ma,getCurrentWatcher:()=>ju,getTransitionRawChildren:()=>wr,guardReactiveProps:()=>$f,h:()=>bl,handleError:()=>oo,hasInjectionContext:()=>Hm,hydrate:()=>Dv,hydrateOnIdle:()=>cg,hydrateOnInteraction:()=>dg,hydrateOnMediaQuery:()=>pg,hydrateOnVisible:()=>fg,initCustomFormatter:()=>Jf,initDirectivesForSSR:()=>Iv,inject:()=>uf,isMemoSame:()=>Yf,isProxy:()=>zn,isReactive:()=>pt,isReadonly:()=>Ze,isRef:()=>Ne,isRuntimeOnly:()=>Kf,isShallow:()=>$e,isVNode:()=>pn,markRaw:()=>Is,mergeDefaults:()=>Wg,mergeModels:()=>Kg,mergeProps:()=>Uf,nextTick:()=>Tr,nodeOps:()=>bp,normalizeClass:()=>Wn,normalizeProps:()=>lu,normalizeStyle:()=>jn,onActivated:()=>vg,onBeforeMount:()=>bg,onBeforeUnmount:()=>al,onBeforeUpdate:()=>il,onDeactivated:()=>_g,onErrorCaptured:()=>Tg,onMounted:()=>Cr,onRenderTracked:()=>xg,onRenderTriggered:()=>Sg,onScopeDispose:()=>To,onServerPrefetch:()=>Ng,onUnmounted:()=>ll,onUpdated:()=>li,onWatcherCleanup:()=>Ua,openBlock:()=>Nr,patchProp:()=>Ap,popScopeId:()=>$m,provide:()=>Bm,proxyRefs:()=>pr,pushScopeId:()=>Lm,queuePostFlushCb:()=>Kt,reactive:()=>an,readonly:()=>ur,ref:()=>ht,registerRuntimeCompiler:()=>yl,render:()=>Bp,renderList:()=>Dg,renderSlot:()=>kg,resolveComponent:()=>Og,resolveDirective:()=>Ag,resolveDynamicComponent:()=>Cg,resolveFilter:()=>PE,resolveTransitionHooks:()=>Zn,setBlockTracking:()=>Sr,setDevtoolsHook:()=>kE,setTransitionHooks:()=>Ot,shallowReactive:()=>As,shallowReadonly:()=>Vu,shallowRef:()=>ks,ssrContextKey:()=>ff,ssrUtils:()=>RE,stop:()=>xu,toDisplayString:()=>Na,toHandlerKey:()=>nn,toHandlers:()=>Vg,toRaw:()=>Y,toRef:()=>$u,toRefs:()=>Lu,toValue:()=>Mu,transformVNodeArgs:()=>_E,triggerRef:()=>Pu,unref:()=>Gn,useAttrs:()=>jg,useCssModule:()=>fv,useCssVars:()=>XE,useHost:()=>Ip,useId:()=>Jm,useModel:()=>Jg,useSSRContext:()=>pf,useShadowRoot:()=>uv,useSlots:()=>Hg,useTemplateRef:()=>Ym,useTransitionState:()=>ii,vModelCheckbox:()=>kl,vModelDynamic:()=>Mp,vModelRadio:()=>Vl,vModelSelect:()=>Rp,vModelText:()=>bi,vShow:()=>wp,version:()=>Qf,warn:()=>di,watch:()=>Vo,watchEffect:()=>jm,watchPostEffect:()=>Wm,watchSyncEffect:()=>df,withAsyncContext:()=>zg,withCtx:()=>ol,withDefaults:()=>Bg,withDirectives:()=>Um,withKeys:()=>Av,withMemo:()=>AE,withModifiers:()=>Ov,withScopeId:()=>Fm});function Ue(e){let t=Object.create(null);for(let n of e.split(","))t[n]=1;return n=>n in t}var ee={},Nn=[],De=()=>{},Sn=()=>!1,Ft=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),yo=e=>e.startsWith("onUpdate:"),q=Object.assign,tr=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},Kh=Object.prototype.hasOwnProperty,ae=(e,t)=>Kh.call(e,t),H=Array.isArray,tn=e=>Bn(e)==="[object Map]",bt=e=>Bn(e)==="[object Set]",Yc=e=>Bn(e)==="[object Date]",ou=e=>Bn(e)==="[object RegExp]",Z=e=>typeof e=="function",z=e=>typeof e=="string",Ae=e=>typeof e=="symbol",se=e=>e!==null&&typeof e=="object",gs=e=>(se(e)||Z(e))&&Z(e.then)&&Z(e.catch),ru=Object.prototype.toString,Bn=e=>ru.call(e),ga=e=>Bn(e).slice(8,-1),bo=e=>Bn(e)==="[object Object]",nr=e=>z(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Pt=Ue(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ea=Ue("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),Xh=1e4,Es=e=>{let t=Object.create(null),n=0;return(o=>{let r=t[o];return r!==void 0?r:(++n>Xh&&(t=Object.create(null),n=1),t[o]=e(o))})},zh=/-\w/g,le=Es(e=>e.replace(zh,t=>t.slice(1).toUpperCase())),Gh=/\B([A-Z])/g,Ke=Es(e=>e.replace(Gh,"-$1").toLowerCase()),Nt=Es(e=>e.charAt(0).toUpperCase()+e.slice(1)),nn=Es(e=>e?`on${Nt(e)}`:""),Ie=(e,t)=>!Object.is(e,t),xn=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},vs=(e,t,n,o=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:o,value:n})},Hn=e=>{let t=parseFloat(e);return isNaN(t)?e:t},No=e=>{let t=z(e)?Number(e):NaN;return isNaN(t)?e:t},Qc,or=()=>Qc||(Qc=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function su(e,t){return e+JSON.stringify(t,(n,o)=>typeof o=="function"?o.toString():o)}var qh="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol",iu=Ue(qh);var Zc=2;function au(e,t=0,n=e.length){if(t=Math.max(0,Math.min(t,e.length)),n=Math.max(0,Math.min(n,e.length)),t>n)return"";let o=e.split(/(\r?\n)/),r=o.filter((a,l)=>l%2===1);o=o.filter((a,l)=>l%2===0);let s=0,i=[];for(let a=0;a<o.length;a++)if(s+=o[a].length+(r[a]&&r[a].length||0),s>=t){for(let l=a-Zc;l<=a+Zc||n>s;l++){if(l<0||l>=o.length)continue;let u=l+1;i.push(`${u}${" ".repeat(Math.max(3-String(u).length,0))}|  ${o[l]}`);let f=o[l].length,c=r[l]&&r[l].length||0;if(l===a){let p=t-(s-(f+c)),d=Math.max(1,n>s?f-p:n-t);i.push("   |  "+" ".repeat(p)+"^".repeat(d))}else if(l>a){if(n>s){let p=Math.max(Math.min(n-s,f),1);i.push("   |  "+"^".repeat(p))}s+=f+c}}break}return i.join(`
`)}function jn(e){if(H(e)){let t={};for(let n=0;n<e.length;n++){let o=e[n],r=z(o)?va(o):jn(o);if(r)for(let s in r)t[s]=r[s]}return t}else if(z(e)||se(e))return e}var Jh=/;(?![^(]*\))/g,Yh=/:([^]+)/,Qh=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function va(e){let t={};return e.replace(Qh,n=>n.startsWith("/*")?"":n).split(Jh).forEach(n=>{if(n){let o=n.split(Yh);o.length>1&&(t[o[0].trim()]=o[1].trim())}}),t}function Wn(e){let t="";if(z(e))t=e;else if(H(e))for(let n=0;n<e.length;n++){let o=Wn(e[n]);o&&(t+=o+" ")}else if(se(e))for(let n in e)e[n]&&(t+=n+" ");return t.trim()}function lu(e){if(!e)return null;let{class:t,style:n}=e;return t&&!z(t)&&(e.class=Wn(t)),n&&(e.style=jn(n)),e}var Zh="html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot",em="svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view",tm="annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics",nm="area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr",_a=Ue(Zh),ya=Ue(em),ba=Ue(tm),cu=Ue(nm),uu="itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly",fu=Ue(uu),om=Ue(uu+",async,autofocus,autoplay,controls,default,defer,disabled,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");function _s(e){return!!e||e===""}function rm(e,t,n){if(e.length!==t.length)return!1;let o=!0;for(let r=0;o&&r<e.length;r++)o=ot(e[r],t[r],n);return o}function eu(e,t,n){if(e.size!==t.size)return!1;let o=Array.from(t),r=new Uint8Array(o.length);for(let s of e){let i=-1;for(let a=0;a<o.length;a++)if(!r[a]&&ot(s,o[a],n)){i=a;break}if(i<0)return!1;r[i]=1}return!0}function sm(e,t,n){let o=tn(e),r=tn(t);if(o||r||(o=bt(e),r=bt(t),o||r))return o&&r?eu(e,t,n):!1;let s=Object.keys(e).length,i=Object.keys(t).length;if(s!==i)return!1;for(let a in e){let l=ae(e,a),u=ae(t,a);if(l&&!u||!l&&u||!ot(e[a],t[a],n))return!1}return nu(e)===nu(t)}function tu(e,t,n,o){n||(n=[new Map,new Map]);let[r,s]=n;if(r.has(e)||s.has(t))return r.get(e)===t&&s.get(t)===e;r.set(e,t),s.set(t,e);let i=o(e,t,n);return r.delete(e),s.delete(t),i}function ot(e,t,n){if(e===t)return!0;let o=Yc(e),r=Yc(t);return o||r?o&&r?e.getTime()===t.getTime():!1:(o=Ae(e),r=Ae(t),o||r?e===t:(o=H(e),r=H(t),o||r?o&&r?tu(e,t,n,rm):!1:(o=se(e),r=se(t),o||r?!o||!r?!1:tu(e,t,n,sm):String(e)===String(t))))}function rr(e,t){return e.findIndex(n=>ot(n,t))}function nu(e){return Object.getPrototypeOf(e)===null&&e[Symbol.toPrimitive]==null&&typeof e.toString!="function"&&typeof e.valueOf!="function"?Bn(e):String(e)}var pu=e=>!!(e&&e.__v_isRef===!0),Na=e=>z(e)?e:e==null?"":H(e)||se(e)&&(e.toString===ru||!Z(e.toString))?pu(e)?Na(e.value):JSON.stringify(e,du,2):String(e),du=(e,t)=>pu(t)?du(e,t.value):tn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[o,r],s)=>(n[ma(o,s)+" =>"]=r,n),{})}:bt(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>ma(n))}:Ae(t)?ma(t):se(t)&&!H(t)&&!bo(t)?String(t):t,ma=(e,t="")=>{var n;return Ae(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};function Sa(e){return e==null?"initial":typeof e=="string"?e===""?" ":e:(typeof e!="number"||Number.isFinite(e),String(e))}function im(e,...t){console.warn(`[Vue warn] ${e}`,...t)}var ke,Xn=class{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&ke&&(ke.active?(this.parent=ke,this.index=(ke.scopes||(ke.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes){let o=this.scopes.slice();for(t=0,n=o.length;t<n;t++)o[t].pause()}for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes){let r=this.scopes.slice();for(t=0,n=r.length;t<n;t++)r[t].resume()}let o=this.effects.slice();for(t=0,n=o.length;t<n;t++)o[t].resume()}}run(t){if(this._active){let n=ke;try{return ke=this,t()}finally{ke=n}}}on(){++this._on===1&&(this.prevScope=ke,ke=this)}off(){if(this._on>0&&--this._on===0){if(ke===this)ke=this.prevScope;else{let t=ke;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,o;for(n=0,o=this.effects.length;n<o;n++)this.effects[n].stop();for(this.effects.length=0,n=0,o=this.cleanups.length;n<o;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){let r=this.scopes.slice();for(n=0,o=r.length;n<o;n++)r[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){let r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}};function Eu(e){return new Xn(e)}function Ma(){return ke}function To(e,t=!1){ke&&(ke.active?ke.cleanups.push(e):e())}var ve;var xa=new WeakSet,rn=class{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ke&&(ke.active?ke.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,xa.has(this)&&(xa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||_u(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,hu(this),yu(this);let t=ve,n=Mt;ve=this,Mt=!0;try{return this.fn()}finally{bu(this),ve=t,Mt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Fa(t);this.deps=this.depsTail=void 0,hu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?xa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Oa(this)&&this.run()}get dirty(){return Oa(this)}},vu=0,ir,ar;function _u(e,t=!1){if(e.flags|=8,t){e.next=ar,ar=e;return}e.next=ir,ir=e}function La(){vu++}function $a(){if(--vu>0)return;if(ar){let t=ar;for(ar=void 0;t;){let n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;ir;){let t=ir;for(ir=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(o){e||(e=o)}t=n}}if(e)throw e}function yu(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function bu(e){let t,n=e.depsTail,o=n;for(;o;){let r=o.prevDep;o.version===-1?(o===n&&(n=r),Fa(o),am(o)):t=o,o.dep.activeLink=o.prevActiveLink,o.prevActiveLink=void 0,o=r}e.deps=t,e.depsTail=n}function Oa(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Nu(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Nu(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===lr)||(e.globalVersion=lr,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Oa(e))))return;e.flags|=2;let t=e.dep,n=ve,o=Mt;ve=e,Mt=!0;try{yu(e);let r=e.fn(e._value);(t.version===0||Ie(r,e._value))&&(e.flags|=128,e._value=r,t.version++)}catch(r){throw t.version++,r}finally{ve=n,Mt=o,bu(e),e.flags&=-3}}function Fa(e,t=!1){let{dep:n,prevSub:o,nextSub:r}=e;if(o&&(o.nextSub=r,e.prevSub=void 0),r&&(r.prevSub=o,e.nextSub=void 0),n.subs===e&&(n.subs=o,!o&&n.computed)){n.computed.flags&=-5;for(let s=n.computed.deps;s;s=s.nextDep)Fa(s,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function am(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}function Su(e,t){e.effect instanceof rn&&(e=e.effect.fn);let n=new rn(e);t&&q(n,t);try{n.run()}catch(r){throw n.stop(),r}let o=n.run.bind(n);return o.effect=n,o}function xu(e){e.effect.stop()}var Mt=!0,Tu=[];function St(){Tu.push(Mt),Mt=!1}function xt(){let e=Tu.pop();Mt=e===void 0?!0:e}function hu(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let n=ve;ve=void 0;try{t()}finally{ve=n}}}var lr=0,Ca=class{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},xo=class{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!ve||!Mt||ve===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==ve)n=this.activeLink=new Ca(ve,this),ve.deps?(n.prevDep=ve.depsTail,ve.depsTail.nextDep=n,ve.depsTail=n):ve.deps=ve.depsTail=n,wu(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){let o=n.nextDep;o.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=o),n.prevDep=ve.depsTail,n.nextDep=void 0,ve.depsTail.nextDep=n,ve.depsTail=n,ve.deps===n&&(ve.deps=o)}return n}trigger(t){this.version++,lr++,this.notify(t)}notify(t){La();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{$a()}}};function wu(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let o=t.deps;o;o=o.nextDep)wu(o)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Ss=new WeakMap,Kn=Symbol(""),Aa=Symbol(""),cr=Symbol("");function Be(e,t,n){if(Mt&&ve){let o=Ss.get(e);o||Ss.set(e,o=new Map);let r=o.get(n);r||(o.set(n,r=new xo),r.map=o,r.key=n),r.track()}}function Bt(e,t,n,o,r,s){let i=Ss.get(e);if(!i){lr++;return}let a=l=>{l&&l.trigger()};if(La(),t==="clear")i.forEach(a);else{let l=H(e),u=l&&nr(n);if(l&&n==="length"){let f=Number(o);i.forEach((c,p)=>{(p==="length"||p===cr||!Ae(p)&&p>=f)&&a(c)})}else switch((n!==void 0||i.has(void 0))&&a(i.get(n)),u&&a(i.get(cr)),t){case"add":l?u&&a(i.get("length")):(a(i.get(Kn)),tn(e)&&a(i.get(Aa)));break;case"delete":l||(a(i.get(Kn)),tn(e)&&a(i.get(Aa)));break;case"set":tn(e)&&a(i.get(Kn));break}}$a()}function lm(e,t){let n=Ss.get(e);return n&&n.get(t)}function So(e){let t=Y(e);return t===e||(Be(t,"iterate",cr),$e(e))?t:Ze(e)?pt(e)?t.map(n=>sn(dt(n))):t.map(sn):t.map(dt)}function fr(e){return Be(e=Y(e),"iterate",cr),e}function Ut(e,t){return Ze(e)?sn(pt(e)?dt(t):t):dt(t)}var cm={__proto__:null,[Symbol.iterator](){return Ta(this,Symbol.iterator,e=>Ut(this,e))},concat(...e){return So(this).concat(...e.map(t=>H(t)?So(t):t))},entries(){return Ta(this,"entries",e=>(e[1]=Ut(this,e[1]),e))},every(e,t){return on(this,"every",e,t,void 0,arguments)},filter(e,t){return on(this,"filter",e,t,n=>n.map(o=>Ut(this,o)),arguments)},find(e,t){return on(this,"find",e,t,n=>Ut(this,n),arguments)},findIndex(e,t){return on(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return on(this,"findLast",e,t,n=>Ut(this,n),arguments)},findLastIndex(e,t){return on(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return on(this,"forEach",e,t,void 0,arguments)},includes(...e){return wa(this,"includes",e)},indexOf(...e){return wa(this,"indexOf",e)},join(e){return So(this).join(e)},lastIndexOf(...e){return wa(this,"lastIndexOf",e)},map(e,t){return on(this,"map",e,t,void 0,arguments)},pop(){return sr(this,"pop")},push(...e){return sr(this,"push",e)},reduce(e,...t){return gu(this,"reduce",e,t)},reduceRight(e,...t){return gu(this,"reduceRight",e,t)},shift(){return sr(this,"shift")},some(e,t){return on(this,"some",e,t,void 0,arguments)},splice(...e){return sr(this,"splice",e)},toReversed(){return So(this).toReversed()},toSorted(e){return So(this).toSorted(e)},toSpliced(...e){return So(this).toSpliced(...e)},unshift(...e){return sr(this,"unshift",e)},values(){return Ta(this,"values",e=>Ut(this,e))}};function Ta(e,t,n){let o=fr(e),r=o[t],s=r.call(o);if(o!==e&&!$e(e)){if(s[Symbol.toStringTag]==="Array Iterator"){let i=Object.create(Object.getPrototypeOf(s));return i.next=()=>mu(s.next(),n),r!==Ou[t]&&Object.defineProperties(i,{return:{get(){let a=s.return;return typeof a=="function"?a.bind(s):a}},throw:{get(){let a=s.throw;return typeof a=="function"?a.bind(s):a}}}),i}s._next=s.next,s.next=()=>mu(s._next(),n)}return s}function mu(e,t){return e.done||(e.value=t(e.value)),e}var Ou=Array.prototype;function on(e,t,n,o,r,s){let i=fr(e),a=i!==e&&!$e(e),l=i[t];if(l!==Ou[t]){let c=l.apply(e,s);return a?dt(c):c}let u=n;i!==e&&(a?u=function(c,p){return n.call(this,Ut(e,c),p,e)}:n.length>2&&(u=function(c,p){return n.call(this,c,p,e)}));let f=l.call(i,u,o);return a&&r?r(f):f}function gu(e,t,n,o){let r=fr(e),s=r!==e&&!$e(e),i=n,a=!1;r!==e&&(s?(a=o.length===0,i=function(u,f,c){return a&&(a=!1,u=Ut(e,u)),n.call(this,u,Ut(e,f),c,e)}):n.length>3&&(i=function(u,f,c){return n.call(this,u,f,c,e)}));let l=r[t](i,...o);return a?Ut(e,l):l}function wa(e,t,n){let o=Y(e);Be(o,"iterate",cr);let r=o[t](...n);return(r===-1||r===!1)&&zn(n[0])?(n[0]=Y(n[0]),o[t](...n)):r}function sr(e,t,n=[]){St(),La();let o=Y(e)[t].apply(e,n);return $a(),xt(),o}var um=Ue("__proto__,__v_isRef,__isVue"),Cu=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Ae));function fm(e){Ae(e)||(e=String(e));let t=Y(this);return Be(t,"has",e),t.hasOwnProperty(e)}var xs=class{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,o){if(n==="__v_skip")return t.__v_skip;let r=this._isReadonly,s=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return s;if(n==="__v_raw")return o===(r?s?ku:Iu:s?Du:Au).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(o)?t:void 0;let i=H(t);if(!r){let l;if(i&&(l=cm[n]))return l;if(n==="hasOwnProperty")return fm}let a=Reflect.get(t,n,Ne(t)?t:o);if((Ae(n)?Cu.has(n):um(n))||(r||Be(t,"get",n),s))return a;if(Ne(a)){let l=i&&nr(n)?a:a.value;return r&&se(l)?ur(l):l}return se(a)?r?ur(a):an(a):a}},Ts=class extends xs{constructor(t=!1){super(!1,t)}set(t,n,o,r){let s=t[n],i=H(t)&&nr(n);if(!this._isShallow){let u=Ze(s);if(!$e(o)&&!Ze(o)&&(s=Y(s),o=Y(o)),!i&&Ne(s)&&!Ne(o))return u||(s.value=o),!0}let a=i?Number(n)<t.length:ae(t,n),l=Reflect.set(t,n,o,Ne(t)?t:r);return t===Y(r)&&l&&(a?Ie(o,s)&&Bt(t,"set",n,o,s):Bt(t,"add",n,o)),l}deleteProperty(t,n){let o=ae(t,n),r=t[n],s=Reflect.deleteProperty(t,n);return s&&o&&Bt(t,"delete",n,void 0,r),s}has(t,n){let o=Reflect.has(t,n);return(!Ae(n)||!Cu.has(n))&&Be(t,"has",n),o}ownKeys(t){return Be(t,"iterate",H(t)?"length":Kn),Reflect.ownKeys(t)}},ws=class extends xs{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}},pm=new Ts,dm=new ws,hm=new Ts(!0),mm=new ws(!0),Da=e=>e,ys=e=>Reflect.getPrototypeOf(e);function gm(e,t,n){return function(...o){let r=this.__v_raw,s=Y(r),i=tn(s),a=e==="entries"||e===Symbol.iterator&&i,l=e==="keys"&&i,u=r[e](...o),f=n?Da:t?sn:dt;return!t&&Be(s,"iterate",l?Aa:Kn),q(Object.create(u),{next(){let{value:c,done:p}=u.next();return p?{value:c,done:p}:{value:a?[f(c[0]),f(c[1])]:f(c),done:p}}})}}function bs(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function Em(e,t){let n={get(r){let s=this.__v_raw,i=Y(s),a=Y(r);e||(Ie(r,a)&&Be(i,"get",r),Be(i,"get",a));let{has:l}=ys(i),u=t?Da:e?sn:dt;if(l.call(i,r))return u(s.get(r));if(l.call(i,a))return u(s.get(a));s!==i&&s.get(r)},get size(){let r=this.__v_raw;return!e&&Be(Y(r),"iterate",Kn),r.size},has(r){let s=this.__v_raw,i=Y(s),a=Y(r);return e||(Ie(r,a)&&Be(i,"has",r),Be(i,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){let i=this,a=i.__v_raw,l=Y(a),u=t?Da:e?sn:dt;return!e&&Be(l,"iterate",Kn),a.forEach((f,c)=>r.call(s,u(f),u(c),i))}};return q(n,e?{add:bs("add"),set:bs("set"),delete:bs("delete"),clear:bs("clear")}:{add(r){let s=Y(this),i=ys(s),a=Y(r),l=!t&&!$e(r)&&!Ze(r)?a:r;return i.has.call(s,l)||Ie(r,l)&&i.has.call(s,r)||Ie(a,l)&&i.has.call(s,a)||(s.add(l),Bt(s,"add",l,l)),this},set(r,s){!t&&!$e(s)&&!Ze(s)&&(s=Y(s));let i=Y(this),{has:a,get:l}=ys(i),u=a.call(i,r);u||(r=Y(r),u=a.call(i,r));let f=l.call(i,r);return i.set(r,s),u?Ie(s,f)&&Bt(i,"set",r,s,f):Bt(i,"add",r,s),this},delete(r){let s=Y(this),{has:i,get:a}=ys(s),l=i.call(s,r);l||(r=Y(r),l=i.call(s,r));let u=a?a.call(s,r):void 0,f=s.delete(r);return l&&Bt(s,"delete",r,void 0,u),f},clear(){let r=Y(this),s=r.size!==0,i=void 0,a=r.clear();return s&&Bt(r,"clear",void 0,void 0,i),a}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=gm(r,e,t)}),n}function Cs(e,t){let n=Em(e,t);return(o,r,s)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_isShallow"?t:r==="__v_raw"?o:Reflect.get(ae(n,r)&&r in o?n:o,r,s)}var vm={get:Cs(!1,!1)},_m={get:Cs(!1,!0)},ym={get:Cs(!0,!1)},bm={get:Cs(!0,!0)};var Au=new WeakMap,Du=new WeakMap,Iu=new WeakMap,ku=new WeakMap;function Nm(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function an(e){return Ze(e)?e:Ds(e,!1,pm,vm,Au)}function As(e){return Ds(e,!1,hm,_m,Du)}function ur(e){return Ds(e,!0,dm,ym,Iu)}function Vu(e){return Ds(e,!0,mm,bm,ku)}function Ds(e,t,n,o,r){if(!se(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let s=r.get(e);if(s)return s;let i=Nm(ga(e));if(i===0)return e;let a=new Proxy(e,i===2?o:n);return r.set(e,a),a}function pt(e){return Ze(e)?pt(e.__v_raw):!!(e&&e.__v_isReactive)}function Ze(e){return!!(e&&e.__v_isReadonly)}function $e(e){return!!(e&&e.__v_isShallow)}function zn(e){return e?!!e.__v_raw:!1}function Y(e){let t=e&&e.__v_raw;return t?Y(t):e}function Is(e){return!ae(e,"__v_skip")&&Object.isExtensible(e)&&vs(e,"__v_skip",!0),e}var dt=e=>se(e)?an(e):e,sn=e=>se(e)?ur(e):e;function Ne(e){return e?e.__v_isRef===!0:!1}function ht(e){return Ru(e,!1)}function ks(e){return Ru(e,!0)}function Ru(e,t){return Ne(e)?e:new Ia(e,t)}var Ia=class{constructor(t,n){this.dep=new xo,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:Y(t),this._value=n?t:dt(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){let n=this._rawValue,o=this.__v_isShallow||$e(t)||Ze(t);t=o?t:Y(t),Ie(t,n)&&(this._rawValue=t,this._value=o?t:dt(t),this.dep.trigger())}};function Pu(e){e.dep&&e.dep.trigger()}function Gn(e){return Ne(e)?e.value:e}function Mu(e){return Z(e)?e():Gn(e)}var Sm={get:(e,t,n)=>t==="__v_raw"?e:Gn(Reflect.get(e,t,n)),set:(e,t,n,o)=>{let r=e[t];return Ne(r)&&!Ne(n)?(r.value=n,!0):Reflect.set(e,t,n,o)}};function pr(e){return pt(e)?e:new Proxy(e,Sm)}var ka=class{constructor(t){this.__v_isRef=!0,this._value=void 0;let n=this.dep=new xo,{get:o,set:r}=t(n.track.bind(n),n.trigger.bind(n));this._get=o,this._set=r}get value(){return this._value=this._get()}set value(t){this._set(t)}};function Vs(e){return new ka(e)}function Lu(e){let t=H(e)?new Array(e.length):{};for(let n in e)t[n]=Fu(e,n);return t}var Va=class{constructor(t,n,o){this._object=t,this._defaultValue=o,this.__v_isRef=!0,this._value=void 0,this._key=Ae(n)?n:String(n),this._raw=Y(t);let r=!0,s=t;if(!H(t)||Ae(this._key)||!nr(this._key))do r=!zn(s)||$e(s);while(r&&(s=s.__v_raw));this._shallow=r}get value(){let t=this._object[this._key];return this._shallow&&(t=Gn(t)),this._value=t===void 0?this._defaultValue:t}set value(t){if(this._shallow&&Ne(this._raw[this._key])){let n=this._object[this._key];if(Ne(n)){n.value=t;return}}this._object[this._key]=t}get dep(){return lm(this._raw,this._key)}},Ra=class{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}};function $u(e,t,n){return Ne(e)?e:Z(e)?new Ra(e):se(e)&&arguments.length>1?Fu(e,t,n):ht(e)}function Fu(e,t,n){return new Va(e,t,n)}var Pa=class{constructor(t,n,o){this.fn=t,this.setter=n,this._value=void 0,this.dep=new xo(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=lr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=o}notify(){if(this.flags|=16,!(this.flags&8)&&ve!==this)return _u(this,!0),!0}get value(){let t=this.dep.track();return Nu(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}};function Uu(e,t,n=!1){let o,r;return Z(e)?o=e:(o=e.get,r=e.set),new Pa(o,r,n)}var Bu={GET:"get",HAS:"has",ITERATE:"iterate"},Hu={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"};var Ns={},Os=new WeakMap,Tn;function ju(){return Tn}function Ua(e,t=!1,n=Tn){if(n){let o=Os.get(n);o||Os.set(n,o=[]),o.push(e)}}function Wu(e,t,n=ee){let{immediate:o,deep:r,once:s,scheduler:i,augmentJob:a,call:l}=n,u=g=>{(n.onWarn||im)("Invalid watch source: ",g,"A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.")},f=g=>r?g:$e(g)||r===!1||r===0?Ht(g,1):Ht(g),c,p,d,v,m=!1,N=!1;if(Ne(e)?(p=()=>e.value,m=$e(e)):pt(e)?(p=()=>f(e),m=!0):H(e)?(N=!0,m=e.some(g=>pt(g)||$e(g)),p=()=>e.map(g=>{if(Ne(g))return g.value;if(pt(g))return f(g);if(Z(g))return l?l(g,2):g()})):Z(e)?t?p=l?()=>l(e,2):e:p=()=>{if(d){St();try{d()}finally{xt()}}let g=Tn;Tn=c;try{return l?l(e,3,[v]):e(v)}finally{Tn=g}}:p=De,t&&r){let g=p,O=r===!0?1/0:r;p=()=>Ht(g(),O)}let C=Ma(),y=()=>{c.stop(),C&&C.active&&tr(C.effects,c)};if(s&&t){let g=t;t=(...O)=>{try{return g(...O)}finally{y()}}}let E=N?new Array(e.length).fill(Ns):Ns,b=g=>{if(!(!(c.flags&1)||!c.dirty&&!g))if(t){let O=c.run();if(g||r||m||(N?O.some((D,S)=>Ie(D,E[S])):Ie(O,E))){let D=Tn;St();try{d&&d(),Tn=c;let S=[O,E===Ns?void 0:N&&E[0]===Ns?[]:E,v];E=O,l?l(t,3,S):t(...S)}finally{Tn=D,xt()}}}else c.run()};return a&&a(b),c=new rn(p),c.scheduler=i?()=>i(b,!1):b,v=g=>Ua(g,!1,c),d=c.onStop=()=>{let g=Os.get(c);if(g){if(l)l(g,4);else for(let O of g)O();Os.delete(c)}},t?o?b(!0):E=c.run():i?i(b.bind(null,!0),!0):c.run(),y.pause=c.pause.bind(c),y.resume=c.resume.bind(c),y.stop=y,y}function Ht(e,t=1/0,n){if(t<=0||!se(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,Ne(e))Ht(e.value,t,n);else if(H(e))for(let o=0;o<e.length;o++)Ht(e[o],t,n);else if(bt(e)||tn(e))e.forEach(o=>{Ht(o,t,n)});else if(bo(e)){for(let o in e)Ht(e[o],t,n);for(let o of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,o)&&Ht(e[o],t,n)}return e}var Yn=[];function xm(e){Yn.push(e)}function Tm(){Yn.pop()}var Ba=!1;function Ku(e,...t){if(Ba)return;Ba=!0,St();let n=Yn.length?Yn[Yn.length-1].component:null,o=n&&n.appContext.config.warnHandler,r=wm();if(o)no(o,n,11,[e+t.map(s=>{var i,a;return(a=(i=s.toString)==null?void 0:i.call(s))!=null?a:JSON.stringify(s)}).join(""),n&&n.proxy,r.map(({vnode:s})=>`at <${qf(n,s.type)}>`).join(`
`),r]);else{let s=[`[Vue warn]: ${e}`,...t];r.length&&s.push(`
`,...Om(r)),console.warn(...s)}xt(),Ba=!1}function wm(){let e=Yn[Yn.length-1];if(!e)return[];let t=[];for(;e;){let n=t[0];n&&n.vnode===e?n.recurseCount++:t.push({vnode:e,recurseCount:0});let o=e.component&&e.component.parent;e=o&&o.vnode}return t}function Om(e){let t=[];return e.forEach((n,o)=>{t.push(...o===0?[]:[`
`],...Cm(n))}),t}function Cm({vnode:e,recurseCount:t}){let n=t>0?`... (${t} recursive calls)`:"",o=e.component?e.component.parent==null:!1,r=` at <${qf(e.component,e.type,o)}`,s=">"+n;return e.props?[r,...Am(e.props),s]:[r+s]}function Am(e){let t=[],n=Object.keys(e);return n.slice(0,3).forEach(o=>{t.push(...of(o,e[o]))}),n.length>3&&t.push(" ..."),t}function of(e,t,n){return z(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):typeof t=="number"||typeof t=="boolean"||t==null?n?t:[`${e}=${t}`]:Ne(t)?(t=of(e,Y(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):Z(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=Y(t),n?t:[`${e}=`,t])}function Dm(e,t){}var Im={SETUP_FUNCTION:0,0:"SETUP_FUNCTION",RENDER_FUNCTION:1,1:"RENDER_FUNCTION",NATIVE_EVENT_HANDLER:5,5:"NATIVE_EVENT_HANDLER",COMPONENT_EVENT_HANDLER:6,6:"COMPONENT_EVENT_HANDLER",VNODE_HOOK:7,7:"VNODE_HOOK",DIRECTIVE_HOOK:8,8:"DIRECTIVE_HOOK",TRANSITION_HOOK:9,9:"TRANSITION_HOOK",APP_ERROR_HANDLER:10,10:"APP_ERROR_HANDLER",APP_WARN_HANDLER:11,11:"APP_WARN_HANDLER",FUNCTION_REF:12,12:"FUNCTION_REF",ASYNC_COMPONENT_LOADER:13,13:"ASYNC_COMPONENT_LOADER",SCHEDULER:14,14:"SCHEDULER",COMPONENT_UPDATE:15,15:"COMPONENT_UPDATE",APP_UNMOUNT_CLEANUP:16,16:"APP_UNMOUNT_CLEANUP"},km={sp:"serverPrefetch hook",bc:"beforeCreate hook",c:"created hook",bm:"beforeMount hook",m:"mounted hook",bu:"beforeUpdate hook",u:"updated",bum:"beforeUnmount hook",um:"unmounted hook",a:"activated hook",da:"deactivated hook",ec:"errorCaptured hook",rtc:"renderTracked hook",rtg:"renderTriggered hook",0:"setup function",1:"render function",2:"watcher getter",3:"watcher callback",4:"watcher cleanup function",5:"native event handler",6:"component event handler",7:"vnode hook",8:"directive hook",9:"transition hook",10:"app errorHandler",11:"app warnHandler",12:"ref function",13:"async component loader",14:"scheduler flush",15:"component update",16:"app unmount cleanup function"};function no(e,t,n,o){try{return o?e(...o):e()}catch(r){oo(r,t,n)}}function gt(e,t,n,o){if(Z(e)){let r=no(e,t,n,o);return r&&gs(r)&&r.catch(s=>{oo(s,t,n,void 0,!0)}),r}if(H(e)){let r=[];for(let s=0;s<e.length;s++)r.push(gt(e[s],t,n,o));return r}}function oo(e,t,n,o=!0,r=!1){let s=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:a}=t&&t.appContext.config||ee;if(t){let l=t.parent,u=t.proxy,f=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){let c=l.ec;if(c&&!l.isUnmounted&&(!r||l.scope.active)){for(let p=0;p<c.length;p++)if(c[p](e,u,f)===!1)return}l=l.parent}if(i){St(),no(i,null,10,[e,u,f]),xt();return}}Vm(e,n,s,o,a)}function Vm(e,t,n,o=!0,r=!1){if(r)throw e;console.error(e)}var et=[],Lt=-1,Wt=[],On=null,Oo=0,rf=Promise.resolve(),js=null;function Tr(e){let t=js||rf;return e?t.then(this?e.bind(this):e):t}function Rm(e){let t=Lt+1,n=et.length;for(;t<n;){let o=t+n>>>1,r=et[o],s=Er(r);s<e||s===e&&r.flags&2?t=o+1:n=o}return t}function ni(e){if(!(e.flags&1)){let t=Er(e),n=et[et.length-1];!n||!(e.flags&2)&&t>=Er(n)?et.push(e):et.splice(Rm(t),0,e),e.flags|=1,sf()}}function sf(){js||(js=rf.then(lf))}function Kt(e){if(!H(e))On&&e.id===-1?On.splice(Oo+1,0,e):e.flags&1||(Wt.push(e),e.flags|=1);else for(let t=0;t<e.length;t++)Wt.push(e[t]);sf()}function af(e,t,n,o=Lt+1){for(;o<et.length;o++){let r=et[o];if(r&&r.flags&2){if(e&&r.id!==e.uid||t!==void 0&&!(r.id>=t))continue;et.splice(o,1),o=e?o-1:Lt,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Ws(e,t,n=0){if(Wt.length){let o=Wt,r=0;if(t){o=[];for(let i=0;i<Wt.length;i++){let a=Wt[i];(a.i!==void 0?!a.i||a.i.uid<n:t.has(a))?Wt[r++]=a:o.push(a)}}let s=[...new Set(o)].sort((i,a)=>Er(i)-Er(a));if(Wt.length=r,On){for(let i=0;i<s.length;i++)On.push(s[i]);return}for(On=s,Oo=0;Oo<On.length;Oo++){let i=On[Oo];i.flags&4&&(i.flags&=-2),i.flags&8||i(),i.flags&=-2}On=null,Oo=0}}var Ha=!1;function Pm(e,t){if(Ha){e();return}let n=t===void 0?void 0:new Set(Wt);e(),Ha=!0;try{af(void 0,t),Ws(void 0,n,t)}finally{Ha=!1}}var Er=e=>e.id==null?e.flags&2?-1:1/0:e.id;function lf(e){let t=De;try{for(Lt=0;Lt<et.length;Lt++){let n=et[Lt];n&&!(n.flags&8)&&(n.flags&4&&(n.flags&=-2),no(n,n.i,n.i?15:14),n.flags&4||(n.flags&=-2))}}finally{for(;Lt<et.length;Lt++){let n=et[Lt];n&&(n.flags&=-2)}Lt=-1,et.length=0,Ws(e),js=null,(et.length||Wt.length)&&lf(e)}}var Mm=!1;var Co,Rs=[],Xu=!1;function cf(e,t){var n,o;Co=e,Co?(Co.enabled=!0,Rs.forEach(({event:r,args:s})=>Co.emit(r,...s)),Rs=[]):typeof window<"u"&&window.HTMLElement&&!((o=(n=window.navigator)==null?void 0:n.userAgent)!=null&&o.includes("jsdom"))?((t.__VUE_DEVTOOLS_HOOK_REPLAY__=t.__VUE_DEVTOOLS_HOOK_REPLAY__||[]).push(s=>{cf(s,t)}),setTimeout(()=>{Co||(t.__VUE_DEVTOOLS_HOOK_REPLAY__=null,Xu=!0,Rs=[])},3e3)):(Xu=!0,Rs=[])}var je=null,oi=null;function vr(e){let t=je;return je=e,oi=e&&e.type.__scopeId||null,t}function Lm(e){oi=e}function $m(){oi=null}var Fm=e=>ol;function ol(e,t=je,n){if(!t||e._n)return e;let o=(...r)=>{o._d&&Sr(-1);let s=vr(t),i=fn.length,a;try{a=e(...r)}finally{for(let l=fn.length;l>i;l--)fi();vr(s),o._d&&Sr(1)}return a};return o._n=!0,o._c=!0,o._d=!0,o}function Um(e,t){if(je===null)return e;let n=Ar(je),o=e.dirs||(e.dirs=[]);for(let r=0;r<t.length;r++){let[s,i,a,l=ee]=t[r];s&&(Z(s)&&(s={mounted:s,updated:s}),s.deep&&Ht(i),o.push({dir:s,instance:n,value:i,oldValue:void 0,arg:a,modifiers:l}))}return e}function jt(e,t,n,o){let r=e;if(o==="beforeMount")e._mount=e;else if(o==="beforeUpdate"){let a=t&&t._mount;a&&(a._latest=e,e._mount=a)}else if(o==="mounted"){let a=e._latest;e._mount=e._latest=void 0,a&&(r=a,a._mount=void 0)}let s=r.dirs,i=t&&t.dirs;for(let a=0;a<s.length;a++){let l=s[a];i?l.oldValue=i[a].value:o==="mounted"&&l.oldValue!==void 0&&(l=q({},l,{oldValue:void 0}));let u=l.dir[o];u&&(St(),gt(u,n,8,[e.el,l,r,t]),xt())}}function Bm(e,t){if(He){let n=He.provides,o=He.parent&&He.parent.provides;o===n&&(n=He.provides=Object.create(o)),n[e]=t}}function uf(e,t,n=!1){let o=ze();if(o||Qn){let r=Qn?Qn._context.provides:o?o.parent==null||o.ce?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides:void 0;if(r&&e in r)return r[e];if(arguments.length>1)return n&&Z(t)?t.call(o&&o.proxy):t}}function Hm(){return!!(ze()||Qn)}var ff=Symbol.for("v-scx"),pf=()=>{{let e=uf(ff);return e}};function jm(e,t){return ri(e,null,t)}function Wm(e,t){return ri(e,null,{flush:"post"})}function df(e,t){return ri(e,null,{flush:"sync"})}function Vo(e,t,n){return ri(e,t,n)}function ri(e,t,n=ee){let{immediate:o,deep:r,flush:s,once:i}=n,a=q({},n),l=t&&o||!t&&s!=="post",u;if(to){if(s==="sync"){let d=pf();u=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){let d=()=>{};return d.stop=De,d.resume=De,d.pause=De,d}}let f=He;a.call=(d,v,m)=>gt(d,f,v,m);let c=!1;s==="post"?a.scheduler=d=>{d.i=f,we(d,f&&f.suspense)}:s!=="sync"&&(c=!0,a.scheduler=(d,v)=>{v?d():ni(d)}),a.augmentJob=d=>{t&&(d.flags|=4),c&&(d.flags|=2,f&&(d.id=f.uid,d.i=f))};let p=Wu(e,t,a);return to&&(u?u.push(p):l&&p()),p}var wn=new WeakMap,hf=Symbol("_vte"),si=e=>e.__isTeleport,Jn=e=>e&&(e.disabled||e.disabled===""),Km=e=>e&&(e.defer||e.defer===""),zu=e=>typeof SVGElement<"u"&&e instanceof SVGElement,Gu=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,Xa=(e,t)=>{let n=e&&e.to;return z(n)?t?t(n):null:n},Xm={name:"Teleport",__isTeleport:!0,process(e,t,n,o,r,s,i,a,l,u){let{mc:f,pc:c,pbc:p,o:{insert:d,querySelector:v,createText:m,createComment:N,parentNode:C}}=u,y=Jn(t.props),{dynamicChildren:E}=t,b=(D,S,T)=>{D.shapeFlag&16&&f(D.children,S,T,r,s,i,a,l)},g=(D=t)=>{let S=Jn(D.props),T=D.target=Xa(D.props,v),V=za(T,D,m,d);T&&(i!=="svg"&&zu(T)?i="svg":i!=="mathml"&&Gu(T)&&(i="mathml"),r&&r.isCE&&(r.ce._teleportTargets||(r.ce._teleportTargets=new Set)).add(T),S||(b(D,T,V),hr(D,!1)))},O=D=>{let S=()=>{if(wn.get(D)===S){if(wn.delete(D),Jn(D.props)){let T=C(D.el)||n;b(D,T,D.anchor),hr(D,!0)}g(D)}};wn.set(D,S),we(S,s)};if(e==null){let D=t.el=m(""),S=t.anchor=m("");if(d(D,n,o),d(S,n,o),Km(t.props)||s&&s.pendingBranch){O(t);return}y&&(b(t,n,S),hr(t,!0)),g()}else{t.el=e.el;let D=t.anchor=e.anchor,S=wn.get(e);if(S){S.flags|=8,wn.delete(e),O(t);return}t.targetStart=e.targetStart;let T=t.target=e.target,V=t.targetAnchor=e.targetAnchor,M=Jn(e.props),w=M?n:T,$=M?D:V;if(i==="svg"||zu(T)?i="svg":(i==="mathml"||Gu(T))&&(i="mathml"),E?(p(e.dynamicChildren,E,w,r,s,i,a),El(e,t,!0)):l||c(e,t,w,$,r,s,i,a,!1),y)M?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):Ps(t,n,D,u,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){let P=Xa(t.props,v);P&&(t.target=P,Ps(t,P,null,u,0))}else M&&Ps(t,T,V,u,1);hr(t,y)}},remove(e,t,n,{um:o,o:{remove:r}},s){let{shapeFlag:i,children:a,anchor:l,targetStart:u,targetAnchor:f,target:c,props:p}=e,d=Jn(p),v=s||!d,m=wn.get(e);if(m&&(m.flags|=8,wn.delete(e)),c&&(r(u),r(f)),s&&r(l),!m&&(d||c)&&i&16)for(let N=0;N<a.length;N++){let C=a[N];o(C,t,n,v,!!C.dynamicChildren)}},move:Ps,hydrate:zm};function Ps(e,t,n,{o:{insert:o},m:r},s=2){s===0&&(e.targetStart&&o(e.targetStart,t,n),o(e.targetAnchor,t,n),n=e.targetAnchor);let{el:i,anchor:a,shapeFlag:l,children:u,props:f}=e,c=s===2;if(c&&o(i,t,n),!wn.has(e)&&(!c||Jn(f))&&l&16)for(let p=0;p<u.length;p++)r(u[p],t,n,2);c&&o(a,t,n)}function zm(e,t,n,o,r,s,{o:{nextSibling:i,parentNode:a,querySelector:l,insert:u,createText:f}},c){function p(N,C){let y=C;for(;y;){if(y&&y.nodeType===8){if(y.data==="teleport start anchor")t.targetStart=y;else if(y.data==="teleport anchor"){t.targetAnchor=y,N._lpa=t.targetAnchor&&i(t.targetAnchor);break}}y=i(y)}}function d(N,C){C.anchor=c(i(N),C,a(N),n,o,r,s)}let v=t.target=Xa(t.props,l),m=Jn(t.props);if(v){let N=v._lpa||v.firstChild;t.shapeFlag&16&&(m?(p(v,N),d(e,t),t.targetAnchor||za(v,t,f,u,a(e)===v?e:null)):(t.anchor=i(e),p(v,N),t.targetAnchor||za(v,t,f,u),c(N&&i(N),t,v,n,o,r,s))),hr(t,m)}else m&&t.shapeFlag&16&&(d(e,t),t.targetStart=e,t.targetAnchor=i(e));return t.anchor&&i(t.anchor)}var Gm=Xm;function hr(e,t){let n=e.ctx;n&&n.ut&&(t?n.ut(e.el,e.anchor):n.ut(e.targetStart,e.targetAnchor))}function za(e,t,n,o,r=null){let s=t.targetStart=n(""),i=t.targetAnchor=n("");return s[hf]=i,e&&(o(s,e,r),o(i,e,r)),i}var mt=Symbol("_leaveCb"),dr=Symbol("_enterCb");function ii(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Cr(()=>{e.isMounted=!0}),al(()=>{e.isUnmounting=!0}),e}var Tt=[Function,Array],ai={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Tt,onEnter:Tt,onAfterEnter:Tt,onEnterCancelled:Tt,onBeforeLeave:Tt,onLeave:Tt,onAfterLeave:Tt,onLeaveCancelled:Tt,onBeforeAppear:Tt,onAppear:Tt,onAfterAppear:Tt,onAppearCancelled:Tt},qm={name:"BaseTransition",props:ai,setup(e,{slots:t}){let n=ze(),o=ii();return()=>{let r=t.default&&wr(t.default(),!0),s=r&&r.length?mf(r):n.subTree?Ff():void 0;if(!s)return;let i=Y(e),{mode:a}=i;if(o.isLeaving)return ja(s);let l=Ks(s);if(!l)return ja(s);let u=Zn(l,i,o,n);l.type!==xe&&Ot(l,u);let f=n.subTree&&Ks(n.subTree);if(f&&f.type!==xe&&!wt(f,l)&&_r(n.subTree)){let c=Zn(f,i,o,n);if(Ot(f,c),a==="out-in"&&l.type!==xe)return o.isLeaving=!0,c.afterLeave=()=>{if(o.isLeaving=!1,!(n.job.flags&8))if(n.effect.flags&2){let p=()=>{n.job.flags&8||n.update()};p.i=n,ni(p)}else n.update();delete c.afterLeave,f=void 0},ja(s);a==="in-out"&&l.type!==xe?c.delayLeave=(p,d,v)=>{let m=gf(o,f);m[String(f.key)]=f,p[mt]=()=>{d(),p[mt]=void 0,delete u.delayedLeave,f=void 0},u.delayedLeave=()=>{v(),delete u.delayedLeave,f=void 0}}:f=void 0}else f&&(f=void 0);return s}}};function mf(e){let t=e[0];if(e.length>1){let n=!1;for(let o of e)if(o.type!==xe){t=o,n=!0;break}}return t}var rl=qm;function gf(e,t){let{leavingVNodes:n}=e,o=n.get(t.type);return o||(o=Object.create(null),n.set(t.type,o)),o}function Zn(e,t,n,o){let{appear:r,mode:s,persisted:i=!1,onBeforeEnter:a,onEnter:l,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:c,onLeave:p,onAfterLeave:d,onLeaveCancelled:v,onBeforeAppear:m,onAppear:N,onAfterAppear:C,onAppearCancelled:y}=t,E=String(e.key),b=gf(n,e),g=(S,T)=>{S&&gt(S,o,9,T)},O=(S,T)=>{let V=T[1];g(S,T),H(S)?S.every(M=>M.length<=1)&&V():S.length<=1&&V()},D={mode:s,persisted:i,beforeEnter(S){let T=a;if(!n.isMounted)if(r)T=m||a;else return;S[mt]&&S[mt](!0);let V=b[E];if(V&&wt(e,V)){let M=V.el[mt];if(!M){let w=_r(V);M=w&&w.el[mt]}M&&M()}g(T,[S])},enter(S){if(!Mm&&S[mt]){D.delayedLeave&&D.delayedLeave();return}let T=l,V=u,M=f;if(!n.isMounted)if(r)T=N||l,V=C||u,M=y||f;else return;let w=!1;S[dr]=P=>{w||(w=!0,P?g(M,[S]):g(V,[S]),D.delayedLeave&&D.delayedLeave(),S[dr]=void 0)};let $=S[dr].bind(null,!1);T?O(T,[S,$]):$()},leave(S,T){let V=String(e.key);if(S[dr]&&S[dr](!0),n.isUnmounting)return T();g(c,[S]);let M=!1;S[mt]=$=>{M||(M=!0,T(),$?g(v,[S]):g(d,[S]),S[mt]=void 0,b[V]===e&&delete b[V])};let w=S[mt].bind(null,!1);b[V]=e,p?O(p,[S,w]):w()},clone(S){let T=Zn(S,t,n,o);return T.afterLeave=()=>{D.afterLeave&&D.afterLeave()},T.delayLeave=(V,M,w)=>{D.delayLeave?D.delayLeave(V,M,w):w()},T.delayedLeave=()=>{D.delayedLeave&&D.delayedLeave()},T}};return D}function ja(e){if(Or(e))return e=Xt(e),e.children=null,e}function Ks(e){if(!Or(e))return si(e.type)&&e.children?mf(e.children):e;if(e.component)return e.component.subTree;let{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&Z(n.default))return n.default()}}function Ot(e,t){if(e.shapeFlag&6&&e.component){e.transition=t;let n=e.component.subTree;Ot(si(n.type)&&Ks(n)||n,t)}else if(e.shapeFlag&128){let n=e.suspense;if(n){let o=n.isHydrating?n.pendingBranch:n.activeBranch;o&&Ot(o,t.clone(o))}else e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)}else if(e.transition=t,e.type===Ve&&H(e.children)){let n=pl(e.children,!1);n&&Ot(n,t)}}function wr(e,t=!1,n){let o=[],r=0;for(let s=0;s<e.length;s++){let i=e[s],a=n==null?i.key:String(n)+String(i.key!=null?i.key:s);i.type===Ve?(i.patchFlag&128&&r++,o=o.concat(wr(i.children,t,a))):(t||i.type!==xe)&&o.push(a!=null?Xt(i,{key:a}):i)}if(r>1)for(let s=0;s<o.length;s++)o[s].patchFlag=-2;return o}function _r(e){if(e.component)return _r(e.component.subTree);if(e.type===Ve){let t=H(e.children)&&pl(e.children,!1);return t?_r(t):void 0}if(e.type!==xe)return e}function it(e,t){return Z(e)?q({name:e.name},t,{setup:e}):e}function Jm(){let e=ze();return e?(e.appContext.config.idPrefix||"v")+"-"+e.ids[0]+e.ids[1]++:""}function Ef(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function Ym(e){let t=ze(),n=ks(null);if(t){let r=t.refs===ee?t.refs={}:t.refs;Object.defineProperty(r,e,{enumerable:!0,get:()=>n.value,set:s=>n.value=s})}return n}function qu(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var Xs=new WeakMap;function Do(e,t,n,o,r=!1){if(H(e)){e.forEach((m,N)=>Do(m,t&&(H(t)?t[N]:t),n,o,r));return}if(cn(o)&&!r){o.shapeFlag&512&&o.type.__asyncResolved&&o.component.subTree.component&&Do(e,t,n,o.component.subTree);return}let s=o.shapeFlag&4?Ar(o.component):o.el,i=r?null:s,{i:a,r:l}=e,u=t&&t.r,f=a.refs===ee?a.refs={}:a.refs,c=a.setupState,p=Y(c),d=c===ee?Sn:m=>qu(f,m)?!1:ae(p,m),v=(m,N)=>!(N&&qu(f,N));if(u!=null&&u!==l){if(Ju(t),z(u))f[u]=null,d(u)&&(c[u]=null);else if(Ne(u)){let m=t;v(u,m.k)&&(u.value=null),m.k&&(f[m.k]=null)}}if(Z(l))no(l,a,12,[i,f]);else{let m=z(l),N=Ne(l);if(m||N){let C=()=>{if(e.f){let y=m?d(l)?c[l]:f[l]:v(l)||!e.k?l.value:f[e.k];if(r)H(y)&&tr(y,s);else if(H(y))y.includes(s)||y.push(s);else if(m)f[l]=[s],d(l)&&(c[l]=f[l]);else{let E=[s];v(l,e.k)&&(l.value=E),e.k&&(f[e.k]=E)}}else m?(f[l]=i,d(l)&&(c[l]=i)):N&&(v(l,e.k)&&(l.value=i),e.k&&(f[e.k]=i))};if(i){let y=()=>{C(),Xs.delete(e)};y.id=-1,Xs.set(e,y),we(y,n)}else Ju(e),C()}}}function Ju(e){let t=Xs.get(e);t&&(t.flags|=8,Xs.delete(e))}var Yu=!1,wo=()=>{Yu||(console.error("Hydration completed but contains mismatches."),Yu=!0)},Qm=e=>e.namespaceURI.includes("svg")&&e.tagName!=="foreignObject",Zm=e=>e.namespaceURI.includes("MathML"),Ms=e=>{if(e.nodeType===1){if(Qm(e))return"svg";if(Zm(e))return"mathml"}},Ao=e=>e.nodeType===8;function eg(e){let{mt:t,p:n,o:{patchProp:o,createText:r,nextSibling:s,parentNode:i,remove:a,insert:l,createComment:u}}=e,f=(E,b)=>{if(!b.hasChildNodes()){n(null,E,b),Ws(),b._vnode=E;return}c(b.firstChild,E,null,null,null),Ws(),b._vnode=E},c=(E,b,g,O,D,S=!1)=>{S=S||!!b.dynamicChildren;let T=Ao(E)&&E.data==="[",V=()=>m(E,b,g,O,D,T),{type:M,ref:w,shapeFlag:$,patchFlag:P}=b,W=E.nodeType;b.el=E,P===-2&&(S=!1,b.dynamicChildren=null);let j=null;switch(M){case Cn:W!==3?b.children===""?(l(b.el=r(""),i(E),E),j=E):j=V():(E.data!==b.children&&(wo(),E.data=b.children),j=s(E));break;case xe:y(E)?(j=s(E),C(b.el=E.content.firstChild,E,g)):W!==8||T?j=V():j=s(E);break;case un:if(T&&(E=s(E),W=E.nodeType),W===1||W===3){j=E;let ie=!b.children.length;for(let fe=0;fe<b.staticCount;fe++)ie&&(b.children+=j.nodeType===1?j.outerHTML:j.data),fe===b.staticCount-1&&(b.anchor=j),j=s(j);return T?s(j):j}else V();break;case Ve:T?j=v(E,b,g,O,D,S):j=V();break;default:if($&1)(W!==1||b.type.toLowerCase()!==E.tagName.toLowerCase())&&!y(E)?j=V():j=p(E,b,g,O,D,S);else if($&6){b.slotScopeIds=D;let ie=i(E);if(T?j=N(E):Ao(E)&&E.data==="teleport start"?j=N(E,E.data,"teleport end"):j=s(E),t(b,ie,null,g,O,Ms(ie),S),(cn(b)||b.component.asyncDep)&&!b.component.subTree){let fe;T?(fe=ye(un),fe.anchor=j?j.previousSibling:ie.lastChild):fe=E.nodeType===3?_l(""):ye(E.nodeType===8?xe:"div"),fe.el=E,b.component.subTree=fe}}else $&64?W!==8?j=V():j=b.type.hydrate(E,b,g,O,D,S,e,d):$&128&&(j=b.type.hydrate(E,b,g,O,Ms(i(E)),D,S,e,c))}return w!=null&&Do(w,null,O,b),j},p=(E,b,g,O,D,S)=>{S=S||!!b.dynamicChildren;let{type:T,dynamicProps:V,props:M,patchFlag:w,shapeFlag:$,dirs:P,transition:W}=b,j=T==="input"||T==="option",ie=!!V;if(j||ie||w!==-1){P&&jt(b,null,g,"created");let fe=!1;if(y(E)){fe=kf(null,W)&&g&&g.vnode.props&&g.vnode.props.appear;let re=E.content.firstChild;if(fe){let Me=re.getAttribute("class");Me&&(re.$cls=Me),W.beforeEnter(re)}C(re,E,g),b.el=E=re}if($&16&&!(M&&(M.innerHTML||M.textContent))){let re=d(E.firstChild,b,E,g,O,D,S);for(re&&!Us(E,1)&&wo();re;){let Me=re;re=re.nextSibling,a(Me)}}else if($&8){let re=b.children;re[0]===`
`&&(E.tagName==="PRE"||E.tagName==="TEXTAREA")&&(re=re.slice(1));let{textContent:Me}=E;Me!==re&&Me!==re.replace(/\r\n|\r/g,`
`)&&(Us(E,0)||wo(),E.textContent=b.children)}if(M){if(j||ie||!S||w&48){let re=E.tagName.includes("-"),Me=E.namespaceURI.includes("svg")?"svg":E.namespaceURI.includes("MathML")?"mathml":void 0;for(let ge in M)if(j&&(ge.endsWith("value")||ge==="indeterminate")||Ft(ge)&&!Pt(ge)||ge[0]==="."||re&&!Pt(ge)||V&&V.includes(ge)){if(ng(E,ge,M[ge]))continue;o(E,ge,null,M[ge],Me,g)}}else if(M.onClick)o(E,"onClick",null,M.onClick,void 0,g);else if(w&4&&pt(M.style))for(let re in M.style)M.style[re]}let he;(he=M&&M.onVnodeBeforeMount)&&rt(he,g,b),P&&jt(b,null,g,"beforeMount"),((he=M&&M.onVnodeMounted)||P||fe)&&Js(()=>{he&&rt(he,g,b),fe&&W.enter(E),P&&jt(b,null,g,"mounted")},O)}return E.nextSibling},d=(E,b,g,O,D,S,T)=>{T=T||!!b.dynamicChildren;let V=b.children,M=V.length,w=!1;for(let $=0;$<M;$++){let P=T?V[$]:V[$]=st(V[$]),W=P.type===Cn;E?(W&&!T&&$+1<M&&st(V[$+1]).type===Cn&&(l(r(E.data.slice(P.children.length)),g,s(E)),E.data=P.children),E=c(E,P,O,D,S,T)):W&&!P.children?l(P.el=r(""),g):(w||(w=!0,Us(g,1)||wo()),n(null,P,g,null,O,D,Ms(g),S))}return E},v=(E,b,g,O,D,S)=>{let{slotScopeIds:T}=b;T&&(D=D?D.concat(T):T);let V=i(E),M=d(s(E),b,V,g,O,D,S);return M&&Ao(M)&&M.data==="]"?s(b.anchor=M):(wo(),l(b.anchor=u("]"),V,M),M)},m=(E,b,g,O,D,S)=>{if(rg(E,b)||wo(),b.el=null,S){let M=N(E);for(;;){let w=s(E);if(w&&w!==M)a(w);else break}}let T=s(E),V=i(E);return a(E),n(null,b,V,T,g,O,Ms(V),D),g&&g.vnode.el===E&&(g.vnode.el=b.el,ui(g,b.el)),T},N=(E,b="[",g="]")=>{let O=0;for(;E;)if(E=s(E),E&&Ao(E)&&(E.data===b&&O++,E.data===g)){if(O===0)return s(E);O--}return E},C=(E,b,g)=>{let O=b.parentNode;O&&O.replaceChild(E,b);let D=g;for(;D;)D.vnode.el===b&&(D.vnode.el=D.subTree.el=E),D=D.parent},y=E=>E.nodeType===1&&E.tagName==="TEMPLATE";return[f,c]}var tg=new Set(["src","srcset","href","poster"]);function ng(e,t,n){return tg.has(t)?e.getAttribute(t)===(n==null?null:`${n}`):!1}var zs="data-allow-mismatch",og={0:"text",1:"children",2:"class",3:"style",4:"attribute"};function Us(e,t){if(t===0||t===1)for(;e&&!e.hasAttribute(zs);)e=e.parentElement;return sl(e&&e.getAttribute(zs),t)}function sl(e,t){if(e==null)return!1;if(e==="")return!0;{let n=e.split(",");return t===0&&n.includes("children")?!0:n.includes(og[t])}}function rg(e,t){return Us(e.parentElement,1)||sg(e)||ig(t)}function sg(e){return e.nodeType===1&&sl(e.getAttribute(zs),1)}function ig({props:e}){let t=e&&e[zs];return typeof t=="string"&&sl(t,1)}var ag=or().requestIdleCallback||(e=>setTimeout(e,1)),lg=or().cancelIdleCallback||(e=>clearTimeout(e)),cg=(e=1e4)=>t=>{let n=ag(t,{timeout:e});return()=>lg(n)};function ug(e){let{top:t,left:n,bottom:o,right:r}=e.getBoundingClientRect(),{innerHeight:s,innerWidth:i}=window;return(t>0&&t<s||o>0&&o<s)&&(n>0&&n<i||r>0&&r<i)}var fg=e=>(t,n)=>{let o=new IntersectionObserver(s=>{for(let i of s)if(i.isIntersecting){o.disconnect(),t();break}},e),r=s=>{if(ug(s))return t(),o.disconnect(),!1;if(getComputedStyle(s).display==="contents"){for(let i=0;i<s.children.length;i++)if(r(s.children[i])===!1)return!1}o.observe(s)};return n(s=>{if(s instanceof Element)return r(s)}),()=>o.disconnect()},pg=e=>t=>{if(e){let n=matchMedia(e);if(n.matches)t();else return n.addEventListener("change",t,{once:!0}),()=>n.removeEventListener("change",t)}},dg=(e=[])=>(t,n)=>{z(e)&&(e=[e]);let o=!1,r=i=>{o||(o=!0,s(),t(),i.target.dispatchEvent(new i.constructor(i.type,i)))},s=()=>{n(i=>{for(let a of e)i.removeEventListener(a,r)})};return n(i=>{for(let a of e)i.addEventListener(a,r,{once:!0})}),s};function hg(e,t){if(Ao(e)&&e.data==="["){let n=1,o=e.nextSibling;for(;o;){if(o.nodeType===1){if(t(o)===!1)break}else if(Ao(o))if(o.data==="]"){if(--n===0)break}else o.data==="["&&n++;o=o.nextSibling}}else t(e)}var cn=e=>!!e.type.__asyncLoader;function mg(e){Z(e)&&(e={loader:e});let{loader:t,loadingComponent:n,errorComponent:o,delay:r=200,hydrate:s,timeout:i,suspensible:a=!0,onError:l}=e,u=null,f,c=0,p=()=>(c++,u=null,d()),d=()=>{let v;return u||(v=u=t().catch(m=>{if(m=m instanceof Error?m:new Error(String(m)),l)return new Promise((N,C)=>{l(m,()=>N(p()),()=>C(m),c+1)});throw m}).then(m=>v!==u&&u?u:(m&&(m.__esModule||m[Symbol.toStringTag]==="Module")&&(m=m.default),f=m,m)))};return it({name:"AsyncComponentWrapper",__asyncLoader:d,__asyncHydrate(v,m,N){let C=v.isConnected,y=!1;(m.bu||(m.bu=[])).push(()=>y=!0);let E=()=>{y||!v.parentNode||C&&!v.isConnected||N()},b=s?()=>{let g=s(E,O=>hg(v,O));g&&(m.bum||(m.bum=[])).push(g)}:E;f?b():d().then(()=>!m.isUnmounted&&b())},get __asyncResolved(){return f},setup(){let v=He;if(Ef(v),f)return()=>Ls(f,v);let m=g=>{u=null,oo(g,v,13,!o,!0)};if(a&&v.suspense||to)return d().then(g=>()=>Ls(g,v)).catch(g=>(m(g),()=>o?ye(o,{error:g}):null));let N=ht(!1),C=ht(),y=ht(!!r),E,b;return To(()=>{E!=null&&clearTimeout(E),b!=null&&clearTimeout(b)}),r&&(b=setTimeout(()=>{v.isUnmounted||(y.value=!1)},r)),i!=null&&(E=setTimeout(()=>{if(!v.isUnmounted&&!N.value&&!C.value){let g=new Error(`Async component timed out after ${i}ms.`);m(g),C.value=g}},i)),d().then(()=>{v.isUnmounted||(N.value=!0,v.parent&&Or(v.parent.vnode)&&v.parent.update())}).catch(g=>{if(v.isUnmounted){u=null;return}m(g),C.value=g}),()=>{if(N.value&&f)return Ls(f,v);if(C.value&&o)return ye(o,{error:C.value});if(n&&!y.value)return Ls(n,v)}}})}function Ls(e,t){let{ref:n,props:o,children:r,ce:s}=t.vnode,i=ye(e,o,r);return i.ref=n,i.ce=s,delete t.vnode.ce,i}var Or=e=>e.type.__isKeepAlive,gg={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){let n=ze(),o=n.ctx;if(!o.renderer)return()=>{let y=t.default&&t.default();return y&&y.length===1?y[0]:y};let r=new Map,s=new Set,i=null,a=n.suspense,{renderer:{p:l,m:u,um:f,o:{createElement:c}}}=o,p=c("div");o.activate=(y,E,b,g,O)=>{let D=y.component;u(y,E,b,0,a),l(D.vnode,y,E,b,D,a,g,y.slotScopeIds,O),we(()=>{D.isDeactivated=!1,D.a&&xn(D.a);let S=y.props&&y.props.onVnodeMounted;S&&rt(S,D.parent,y)},a)},o.deactivate=y=>{let E=r.get(y.key==null?y.type:y.key);if(!E||E.component!==y.component)return!1;let b=y.component;return Gs(b.m),Gs(b.a),u(y,p,null,1,a),we(()=>{b.da&&xn(b.da);let g=y.props&&y.props.onVnodeUnmounted;g&&rt(g,b.parent,y),b.isDeactivated=!0},a),!0};function d(y){$s(y),f(y,n,a,!0)}function v(y){r.forEach((E,b)=>{let g=ti(cn(E)?E.type.__asyncResolved||{}:E.type);g&&!y(g)&&m(b)})}function m(y){let E=r.get(y);E&&(!i||!wt(E,i))?d(E):i&&($s(i),E&&$s(E)),r.delete(y),s.delete(y)}Vo(()=>[e.include,e.exclude],([y,E])=>{y&&v(b=>mr(y,b)),E&&v(b=>!mr(E,b))},{flush:"post",deep:!0});let N=null,C=()=>{if(N!=null)if(qs(n.subTree.type)){let y=()=>{let E=Fs(n.subTree);E.component&&r.set(N,E)};n.subTree.suspense.pendingBranch?we(y,n.subTree.suspense):y()}else r.set(N,Fs(n.subTree))};return Cr(C),li(C),al(()=>{r.forEach(y=>{let{subTree:E,suspense:b}=n,g=Fs(E);if(y.type===g.type&&y.key===g.key){$s(g);let O=g.component.da;O&&we(O,b);return}d(y)})}),()=>{if(N=null,!t.default)return i=null;let y=t.default(),E=y[0];if(y.length>1)return i=null,y;if(!pn(E)||!(E.shapeFlag&4)&&!(E.shapeFlag&128))return i=null,E;let b=Fs(E);if(b.type===xe)return i=null,b;let g=b.type,O=ti(cn(b)?b.type.__asyncResolved||{}:g),{include:D,exclude:S,max:T}=e;if(D&&(!O||!mr(D,O))||S&&O&&mr(S,O))return b.shapeFlag&=-257,i=b,E;let V=b.key==null?g:b.key,M=r.get(V);return b.el&&(b=Xt(b),E.shapeFlag&128&&(E.ssContent=b)),N=V,M?(b.el=M.el,b.component=M.component,b.transition&&Ot(b,b.transition),b.shapeFlag|=512,s.delete(V),s.add(V)):(s.add(V),T&&s.size>parseInt(T,10)&&m(s.values().next().value)),b.shapeFlag|=256,i=b,qs(E.type)?E:b}}},Eg=gg;function mr(e,t){return H(e)?e.some(n=>mr(n,t)):z(e)?e.split(",").includes(t):ou(e)?(e.lastIndex=0,e.test(t)):!1}function vg(e,t){vf(e,"a",t)}function _g(e,t){vf(e,"da",t)}function vf(e,t,n=He){let o=e.__wdc||(e.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return e()});if(yr(t,o,n),n){let r=n.parent;for(;r&&r.parent;)Or(r.parent.vnode)&&yg(o,t,n,r),r=r.parent}}function yg(e,t,n,o){let r=yr(t,e,o,!0),s=yr("um",()=>tr(o[t],r),n);s.flags=16}function $s(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function Fs(e){return e.shapeFlag&128?e.ssContent:e}function yr(e,t,n=He,o=!1){if(n){let r=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...i)=>{St();let a=pi(n),l=gt(t,n,e,i);return a(),xt(),l});return o?r.unshift(s):r.push(s),s}}var dn=e=>(t,n=He)=>{(!to||e==="sp")&&yr(e,(...o)=>t(...o),n)},bg=dn("bm"),Cr=dn("m"),il=dn("bu"),li=dn("u"),al=dn("bum"),ll=dn("um"),Ng=dn("sp"),Sg=dn("rtg"),xg=dn("rtc");function Tg(e,t=He){yr("ec",e,t)}var cl="components",wg="directives";function Og(e,t){return ul(cl,e,!0,t)||e}var _f=Symbol.for("v-ndc");function Cg(e){return z(e)?ul(cl,e,!1)||e:e||_f}function Ag(e){return ul(wg,e)}function ul(e,t,n=!0,o=!1){let r=je||He;if(r){let s=r.type;if(e===cl){let a=ti(s,!1);if(a&&(a===t||a===le(t)||a===Nt(le(t))))return s}let i=Qu(r[e]||s[e],t)||Qu(r.appContext[e],t);return!i&&o?s:i}}function Qu(e,t){return e&&(e[t]||e[le(t)]||e[Nt(le(t))])}function Dg(e,t,n,o){let r,s=n&&n[o],i=H(e);if(i||z(e)){let a=i&&pt(e),l=!1,u=!1;a&&(l=!$e(e),u=Ze(e),e=fr(e)),r=new Array(e.length);for(let f=0,c=e.length;f<c;f++)r[f]=t(l?u?sn(dt(e[f])):dt(e[f]):e[f],f,void 0,s&&s[f])}else if(typeof e=="number")if(!Number.isInteger(e)||e<0)r=[];else{r=new Array(e);for(let a=0;a<e;a++)r[a]=t(a+1,a,void 0,s&&s[a])}else if(se(e))if(e[Symbol.iterator])r=Array.from(e,(a,l)=>t(a,l,void 0,s&&s[l]));else{let a=Object.keys(e);r=new Array(a.length);for(let l=0,u=a.length;l<u;l++){let f=a[l];r[l]=t(e[f],f,l,s&&s[l])}}else r=[];return n&&(n[o]=r),r}function Ig(e,t){for(let n=0;n<t.length;n++){let o=t[n];if(H(o))for(let r=0;r<o.length;r++)e[o[r].name]=o[r].fn;else o&&(e[o.name]=o.key?(...r)=>{let s=o.fn(...r);return s&&(s.key=o.key),s}:o.fn)}return e}function kg(e,t,n,o,r,s){if(n==null&&(n={}),je.ce||je.parent&&cn(je.parent)&&je.parent.ce){let u=s!=null&&n.key==null?q({},n,{key:s}):n,f=Object.keys(u).length>0;return t!=="default"&&(u.name=t),Nr(),Ys(Ve,null,[ye("slot",u,o&&o())],f?-2:64)}let i=e[t];i&&i._c&&(i._d=!1);let a=fn.length;Nr();let l;try{let u=i&&fl(i(n)),f=n.key||s||u&&u.key;l=Ys(Ve,{key:(f&&!Ae(f)?f:`_${t}`)+(!u&&o?"_fb":"")},u||(o?o():[]),u&&e._===1?64:-2)}catch(u){for(let f=fn.length;f>a;f--)fi();throw u}finally{i&&i._c&&(i._d=!0)}return!r&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),l}function fl(e){return e.some(t=>pn(t)?!(t.type===xe||t.type===Ve&&!fl(t.children)):!0)?e:null}function Vg(e,t){let n={};for(let o in e)n[t&&/[A-Z]/.test(o)?`on:${o}`:nn(o)]=e[o];return n}var Ga=e=>e?jf(e)?Ar(e):Ga(e.parent):null;var gr=q(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Ga(e.parent),$root:e=>Ga(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>e.type,$forceUpdate:e=>e.f||(e.f=()=>{ni(e.update)}),$nextTick:e=>e.n||(e.n=Tr.bind(e.proxy)),$watch:e=>De});var Wa=(e,t)=>e!==ee&&!e.__isScriptSetup&&ae(e,t),qa={get({_:e},t){if(t==="__v_skip")return!0;let{ctx:n,setupState:o,data:r,props:s,accessCache:i,type:a,appContext:l}=e;if(t[0]!=="$"){let p=i[t];if(p!==void 0)switch(p){case 1:return o[t];case 2:return r[t];case 4:return n[t];case 3:return s[t]}else{if(Wa(o,t))return i[t]=1,o[t];if(ae(s,t))return i[t]=3,s[t];if(n!==ee&&ae(n,t))return i[t]=4,n[t];i[t]=0}}let u=gr[t],f,c;if(u)return t==="$attrs"&&Be(e.attrs,"get",""),u(e);if((f=a.__cssModules)&&(f=f[t]))return f;if(n!==ee&&ae(n,t))return i[t]=4,n[t];if(c=l.config.globalProperties,ae(c,t))return c[t]},set({_:e},t,n){let{data:o,setupState:r,ctx:s}=e;return Wa(r,t)?(r[t]=n,!0):ae(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(s[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:o,appContext:r,props:s,type:i}},a){let l;return!!(n[a]||Wa(t,a)||ae(s,a)||ae(o,a)||ae(gr,a)||ae(r.config.globalProperties,a)||(l=i.__cssModules)&&l[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:ae(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},Rg=q({},qa,{get(e,t){if(t!==Symbol.unscopables)return qa.get(e,t,e)},has(e,t){return t[0]!=="_"&&!iu(t)}});function Pg(){return null}function Mg(){return null}function Lg(e){}function $g(e){}function Fg(){return null}function Ug(){}function Bg(e,t){return null}function Hg(){return yf("useSlots").slots}function jg(){return yf("useAttrs").attrs}function yf(e){let t=ze();return t.setupContext||(t.setupContext=Gf(t))}function Ja(e){return H(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}function Wg(e,t){let n=Ja(e);for(let o in t){if(o.startsWith("__skip"))continue;let r=n[o];r?H(r)||Z(r)?r=n[o]={type:r,default:t[o]}:r.default=t[o]:r===null&&(r=n[o]={default:t[o]}),r&&t[`__skip_${o}`]&&(r.skipFactory=!0)}return n}function Kg(e,t){return!e||!t?e||t:H(e)&&H(t)?e.concat(t):q({},Ja(e),Ja(t))}function Xg(e,t){let n={};for(let o in e)t.includes(o)||Object.defineProperty(n,o,{enumerable:!0,get:()=>e[o]});return n}function zg(e){let t=ze(),n=to,o=e();xr(),n&&An(!1);let r=()=>{pi(t),n&&An(!0)},s=()=>{ze()!==t&&t.scope.off(),xr(),n&&An(!1)};return gs(o)&&(o=o.catch(i=>{throw r(),Promise.resolve().then(()=>Promise.resolve().then(s)),i})),[o,()=>{r(),Promise.resolve().then(s)}]}function bf(){return{app:null,config:{isNativeTag:Sn,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var Gg=0;function qg(e,t){return function(o,r=null){Z(o)||(o=q({},o)),r!=null&&!se(r)&&(r=null);let s=bf(),i=new WeakSet,a=[],l=!1,u=s.app={_uid:Gg++,_component:o,_props:r,_container:null,_context:s,_instance:null,version:Qf,get config(){return s.config},set config(f){},use(f,...c){return i.has(f)||(f&&Z(f.install)?(i.add(f),f.install(u,...c)):Z(f)&&(i.add(f),f(u,...c))),u},mixin(f){return u},component(f,c){return c?(s.components[f]=c,u):s.components[f]},directive(f,c){return c?(s.directives[f]=c,u):s.directives[f]},mount(f,c,p){if(!l){let d=u._ceVNode||ye(o,r);return d.appContext=s,p===!0?p="svg":p===!1&&(p=void 0),c&&t?t(d,f):e(d,f,p),l=!0,u._container=f,f.__vue_app__=u,Ar(d.component)}},onUnmount(f){a.push(f)},unmount(){l&&(gt(a,u._instance,16),e(null,u._container),delete u._container.__vue_app__)},provide(f,c){return s.provides[f]=c,u},runWithContext(f){let c=Qn;Qn=u;try{return f()}finally{Qn=c}}};return u}}var Qn=null;function Jg(e,t,n=ee){let o=ze(),r=le(t),s=Ke(t),i=Nf(e,r),a=Vs((l,u)=>{let f,c=ee,p;return df(()=>{let d=e[r];Ie(f,d)&&(f=d,u())}),{get(){return l(),n.get?n.get(f):f},set(d){let v=n.set?n.set(d):d;if(!Ie(v,f)&&!(c!==ee&&Ie(d,c)))return;let m=o.vnode.props,N=!!(m&&(t in m||r in m||s in m)&&(`onUpdate:${t}`in m||`onUpdate:${r}`in m||`onUpdate:${s}`in m));N||(f=d,u()),o.emit(`update:${t}`,v),Ie(d,c)&&(Ie(d,v)&&!Ie(v,p)||N&&c!==ee&&!Ie(v,f))&&u(),c=d,p=v}}});return a[Symbol.iterator]=()=>{let l=0;return{next(){return l<2?{value:l++?i||ee:a,done:!1}:{done:!0}}}},a}var Nf=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${le(t)}Modifiers`]||e[`${Ke(t)}Modifiers`];function Yg(e,t,...n){if(e.isUnmounted)return;let o=e.vnode.props||ee,r=n,s=t.startsWith("update:"),i=s&&Nf(o,t.slice(7));i&&(i.trim&&(r=n.map(f=>z(f)?f.trim():f)),i.number&&(r=r.map(Hn)));let a,l=o[a=nn(t)]||o[a=nn(le(t))];!l&&s&&(l=o[a=nn(Ke(t))]),l&&gt(l,e,6,r);let u=o[a+"Once"];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,gt(u,e,6,r)}}function Qg(e,t,n=!1){let o=t.emitsCache,r=o.get(e);if(r!==void 0)return r;let s=e.emits,i={};return!s&&!!1?(se(e)&&o.set(e,null),null):(H(s)?s.forEach(l=>i[l]=null):q(i,s),se(e)&&o.set(e,i),i)}function ci(e,t){return!e||!Ft(t)?!1:(t=t.slice(2),t=t==="Once"?t:t.replace(/Once$/,""),ae(e,t[0].toLowerCase()+t.slice(1))||ae(e,Ke(t))||ae(e,t))}function Bs(e){let{type:t,vnode:n,proxy:o,withProxy:r,propsOptions:[s],slots:i,attrs:a,emit:l,render:u,renderCache:f,props:c,data:p,setupState:d,ctx:v,inheritAttrs:m}=e,N=vr(e),C,y;try{if(n.shapeFlag&4){let g=r||o,O=g;C=st(u.call(O,g,f,c,d,p,v)),y=a}else{let g=t;C=st(g.length>1?g(c,{attrs:a,slots:i,emit:l}):g(c,null)),y=t.props?a:Zg(a)}}catch(g){fn.length=0,oo(g,e,1),C=ye(xe)}let E=C,b;if(y&&m!==!1){let g=Object.keys(y),{shapeFlag:O}=E;g.length&&O&7&&(s&&g.some(yo)&&(y=eE(y,s)),E=Xt(E,y,!1,!0))}if(n.dirs&&(E=Xt(E,null,!1,!0),E.dirs=E.dirs?E.dirs.concat(n.dirs):n.dirs),n.transition){let g=si(E.type)&&Ks(E)||E;Ot(g,n.transition)}return C=E,vr(N),C}function pl(e,t=!0){let n;for(let o=0;o<e.length;o++){let r=e[o];if(pn(r)){if(r.type!==xe||r.children==="v-if"){if(n)return;n=r}}else return}return n}var Zg=e=>{let t;for(let n in e)(n==="class"||n==="style"||Ft(n))&&((t||(t={}))[n]=e[n]);return t},eE=(e,t)=>{let n={};for(let o in e)(!yo(o)||!(o.slice(9)in t))&&(n[o]=e[o]);return n};function tE(e,t,n){let{props:o,children:r,component:s}=e,{props:i,children:a,patchFlag:l}=t,u=s.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return o?Zu(o,i,u):!!i;if(l&8){let f=t.dynamicProps;for(let c=0;c<f.length;c++){let p=f[c];if(Sf(i,o,p)&&!ci(u,p))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:o===i?!1:o?i?Zu(o,i,u):!0:!!i;return!1}function Zu(e,t,n){let o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let r=0;r<o.length;r++){let s=o[r];if(!ae(e,s)||Sf(t,e,s)&&!ci(n,s))return!0}return!1}function Sf(e,t,n){let o=e[n],r=t[n];return n==="style"&&se(o)&&se(r)?!ot(o,r):o!==r}function ui({vnode:e,parent:t,suspense:n},o){for(;t;){let r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.suspense.vnode.el=r.el=o,e=r),r===e)(e=t.vnode).el=o,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=o)}var xf={},Tf=()=>Object.create(xf),wf=e=>Object.getPrototypeOf(e)===xf;function nE(e,t,n,o=!1){let r={},s=Tf();e.propsDefaults=Object.create(null),Of(e,t,r,s);for(let i in e.propsOptions[0])i in r||(r[i]=void 0);n?e.props=o?r:As(r):e.type.props?e.props=r:e.props=s,e.attrs=s}function oE(e,t,n,o){let{props:r,attrs:s,vnode:{patchFlag:i}}=e,a=Y(r),[l]=e.propsOptions,u=!1;if((o||i>0)&&!(i&16)){if(i&8){let f=e.vnode.dynamicProps;for(let c=0;c<f.length;c++){let p=f[c];if(ci(e.emitsOptions,p))continue;let d=t[p];if(l)if(ae(s,p))d!==s[p]&&(s[p]=d,u=!0);else{let v=le(p);r[v]=Ya(l,a,v,d,e,!1)}else d!==s[p]&&(s[p]=d,u=!0)}}}else{Of(e,t,r,s)&&(u=!0);let f;for(let c in a)(!t||!ae(t,c)&&((f=Ke(c))===c||!ae(t,f)))&&(l?n&&(n[c]!==void 0||n[f]!==void 0)&&(r[c]=Ya(l,a,c,void 0,e,!0)):delete r[c]);if(s!==a)for(let c in s)(!t||!ae(t,c))&&(delete s[c],u=!0)}u&&Bt(e.attrs,"set","")}function Of(e,t,n,o){let[r,s]=e.propsOptions,i=!1,a;if(t)for(let l in t){if(Pt(l))continue;let u=t[l],f;r&&ae(r,f=le(l))?!s||!s.includes(f)?n[f]=u:(a||(a={}))[f]=u:ci(e.emitsOptions,l)||(!(l in o)||u!==o[l])&&(o[l]=u,i=!0)}if(s){let l=Y(n),u=a||ee;for(let f=0;f<s.length;f++){let c=s[f];n[c]=Ya(r,l,c,u[c],e,!ae(u,c))}}return i}function Ya(e,t,n,o,r,s){let i=e[n];if(i!=null){let a=ae(i,"default");if(a&&o===void 0){let l=i.default;if(i.type!==Function&&!i.skipFactory&&Z(l)){let{propsDefaults:u}=r;if(n in u)o=u[n];else{let f=pi(r);o=u[n]=l.call(null,t),f()}}else o=l;r.ce&&r.ce._setProp(n,o)}i[0]&&(s&&!a?o=!1:i[1]&&(o===""||o===Ke(n))&&(o=!0))}return o}function rE(e,t,n=!1){let o=t.propsCache,r=o.get(e);if(r)return r;let s=e.props,i={},a=[];if(!s&&!!1)return se(e)&&o.set(e,Nn),Nn;if(H(s))for(let f=0;f<s.length;f++){let c=le(s[f]);ef(c)&&(i[c]=ee)}else if(s)for(let f in s){let c=le(f);if(ef(c)){let p=s[f],d=i[c]=H(p)||Z(p)?{type:p}:q({},p),v=d.type,m=!1,N=!0;if(H(v))for(let C=0;C<v.length;++C){let y=v[C],E=Z(y)&&y.name;if(E==="Boolean"){m=!0;break}else E==="String"&&(N=!1)}else m=Z(v)&&v.name==="Boolean";d[0]=m,d[1]=N,(m||ae(d,"default"))&&a.push(c)}}let u=[i,a];return se(e)&&o.set(e,u),u}function ef(e){return e[0]!=="$"&&!Pt(e)}var dl=e=>e==="_"||e==="_ctx"||e==="$stable",hl=e=>H(e)?e.map(st):[st(e)],sE=(e,t,n)=>{if(t._n)return t;let o=ol((...r)=>hl(t(...r)),n);return o._c=!1,o},Cf=(e,t,n)=>{let o=e._ctx;for(let r in e){if(dl(r))continue;let s=e[r];if(Z(s))t[r]=sE(r,s,o);else if(s!=null){let i=hl(s);t[r]=()=>i}}},Af=(e,t)=>{let n=hl(t);e.slots.default=()=>n},Df=(e,t,n)=>{for(let o in t)(n||!dl(o))&&(e[o]=t[o])},iE=(e,t,n)=>{let o=e.slots=Tf();if(e.vnode.shapeFlag&32){let r=t._;r?(Df(o,t,n),n&&vs(o,"_",r,!0)):Cf(t,o)}else t&&Af(e,t)},aE=(e,t,n)=>{let{vnode:o,slots:r}=e,s=!0,i=ee;if(o.shapeFlag&32){let a=t._;a?n&&a===1?s=!1:Df(r,t,n):(s=!t.$stable,Cf(t,r)),i=t}else t&&(Af(e,t),i={default:1});if(s)for(let a in r)!dl(a)&&i[a]==null&&delete r[a]};function lE(){let e=[]}var we=Js;function ml(e){return If(e)}function gl(e){return If(e,eg)}function If(e,t){lE();let n=or();n.__VUE__=!0;let{insert:o,remove:r,patchProp:s,createElement:i,createText:a,createComment:l,setText:u,setElementText:f,parentNode:c,nextSibling:p,setScopeId:d=De,insertStaticContent:v}=e,m=(h,_,x,R=null,A=null,k=null,U=void 0,F=null,L=!!_.dynamicChildren)=>{if(h===_)return;h&&!wt(h,_)&&(R=es(h),Qe(h,A,k,!0),h=null),_.patchFlag===-2&&(L=!1,_.dynamicChildren=null),_.dynamicChildren&&h&&h.dynamicChildren&&h.dynamicChildren.hasOnce&&(_.dynamicChildren===Nn&&(_.dynamicChildren=[]),_.dynamicChildren.hasOnce=!0);let{type:I,ref:X,shapeFlag:B}=_;switch(I){case Cn:N(h,_,x,R);break;case xe:C(h,_,x,R);break;case un:h==null&&y(_,x,R,U);break;case Ve:$(h,_,x,R,A,k,U,F,L);break;default:B&1?O(h,_,x,R,A,k,U,F,L):B&6?P(h,_,x,R,A,k,U,F,L):(B&64||B&128)&&I.process(h,_,x,R,A,k,U,F,L,ho)}X!=null&&A?Do(X,h&&h.ref,k,_||h,!_):X==null&&h&&h.ref!=null&&Do(h.ref,null,k,h,!0)},N=(h,_,x,R)=>{if(h==null)o(_.el=a(_.children),x,R);else{let A=_.el=h.el;_.children!==h.children&&u(A,_.children)}},C=(h,_,x,R)=>{h==null?o(_.el=l(_.children||""),x,R):_.el=h.el},y=(h,_,x,R)=>{[h.el,h.anchor]=v(h.children,_,x,R,h.el,h.anchor)},E=(h,_,x,R)=>{if(_.children!==h.children){let A=p(h.anchor);g(h),[_.el,_.anchor]=v(_.children,x,A,R)}else _.el=h.el,_.anchor=h.anchor},b=({el:h,anchor:_},x,R)=>{let A;for(;h&&h!==_;)A=p(h),o(h,x,R),h=A;o(_,x,R)},g=({el:h,anchor:_})=>{let x;for(;h&&h!==_;)x=p(h),r(h),h=x;r(_)},O=(h,_,x,R,A,k,U,F,L)=>{if(_.type==="svg"?U="svg":_.type==="math"&&(U="mathml"),h==null)D(_,x,R,A,k,U,F,L);else{let I=h.el&&h.el._isVueCE?h.el:null;try{I&&I._beginPatch(),V(h,_,A,k,U,F,L)}finally{I&&I._endPatch()}}},D=(h,_,x,R,A,k,U,F)=>{let L,I,{props:X,shapeFlag:B,transition:K,dirs:G}=h;if(L=h.el=i(h.type,k,X&&X.is,X),B&8?f(L,h.children):B&16&&T(h.children,L,null,R,A,Ka(h,k),U,F),G&&jt(h,null,R,"created"),S(L,h,h.scopeId,U,R),X){for(let me in X)me!=="value"&&!Pt(me)&&s(L,me,null,X[me],k,R);"value"in X&&s(L,"value",null,X.value,k),(I=X.onVnodeBeforeMount)&&rt(I,R,h)}G&&jt(h,null,R,"beforeMount");let ce=kf(A,K);ce?K.beforeEnter(L):K&&!K.persisted&&(L[Za]=!0),o(L,_,x),((I=X&&X.onVnodeMounted)||ce||G)&&we(()=>{let de;I&&rt(I,R,h),ce&&K.enter(L),G&&jt(h,null,R,"mounted")},A)},S=(h,_,x,R,A)=>{if(x&&d(h,x),R)for(let k=0;k<R.length;k++)d(h,R[k]);if(A){let k=A.subTree;if(_===k||qs(k.type)&&(k.ssContent===_||k.ssFallback===_)){let U=A.vnode;S(h,U,U.scopeId,U.slotScopeIds,A.parent)}}},T=(h,_,x,R,A,k,U,F,L=0)=>{for(let I=L;I<h.length;I++){let X=h[I]=F?ln(h[I]):st(h[I]);m(null,X,_,x,R,A,k,U,F)}},V=(h,_,x,R,A,k,U)=>{let F=_.el=h.el,{patchFlag:L,dynamicChildren:I,dirs:X}=_;L|=h.patchFlag&16;let B=h.props||ee,K=_.props||ee,G;if(x&&qn(x,!1),(G=K.onVnodeBeforeUpdate)&&rt(G,x,_,h),X&&jt(_,h,x,"beforeUpdate"),x&&qn(x,!0),I&&(!h.dynamicChildren||h.dynamicChildren.length!==I.length)&&(L=0,U=!1,I=null),(B.innerHTML&&K.innerHTML==null||B.textContent&&K.textContent==null)&&f(F,""),I?M(h.dynamicChildren,I,F,x,R,Ka(_,A),k):U||he(h,_,F,null,x,R,Ka(_,A),k,!1),L>0){if(L&16)w(F,B,K,x,A);else if(L&2&&B.class!==K.class&&s(F,"class",null,K.class,A),L&4&&s(F,"style",B.style,K.style,A),L&8){let ce=_.dynamicProps;for(let me=0;me<ce.length;me++){let de=ce[me],Ce=B[de],Le=K[de];(Le!==Ce||de==="value")&&s(F,de,Ce,Le,A,x)}}L&1&&h.children!==_.children&&f(F,_.children)}else!U&&I==null&&w(F,B,K,x,A);((G=K.onVnodeUpdated)||X)&&we(()=>{G&&rt(G,x,_,h),X&&jt(_,h,x,"updated")},R)},M=(h,_,x,R,A,k,U)=>{for(let F=0;F<_.length;F++){let L=h[F],I=_[F],X=L.el||Io(L),B=X&&(L.type===Ve||!wt(L,I)||L.shapeFlag&198)?c(X):x;m(L,I,B,null,R,A,k,U,!0)}},w=(h,_,x,R,A)=>{if(_!==x){if(_!==ee)for(let k in _)!Pt(k)&&!(k in x)&&s(h,k,_[k],null,A,R);for(let k in x){if(Pt(k))continue;let U=x[k],F=_[k];U!==F&&k!=="value"&&s(h,k,F,U,A,R)}"value"in x&&s(h,"value",_.value,x.value,A)}},$=(h,_,x,R,A,k,U,F,L)=>{let I=_.el=h?h.el:a(""),X=_.anchor=h?h.anchor:a(""),{patchFlag:B,dynamicChildren:K,slotScopeIds:G}=_;G&&(F=F?F.concat(G):G),h==null?(o(I,x,R),o(X,x,R),T(_.children||[],x,X,A,k,U,F,L)):B>0&&B&64&&K&&h.dynamicChildren&&h.dynamicChildren.length===K.length?(M(h.dynamicChildren,K,x,A,k,U,F),(_.key!=null||A&&_===A.subTree)&&El(h,_,!0)):he(h,_,x,X,A,k,U,F,L)},P=(h,_,x,R,A,k,U,F,L)=>{_.slotScopeIds=F,h==null?_.shapeFlag&512?A.ctx.activate(_,x,R,U,L):W(_,x,R,A,k,U,L):j(h,_,L)},W=(h,_,x,R,A,k,U)=>{let F=h.component=Hf(h,R,A);if(Or(h)&&(F.ctx.renderer=ho),Wf(F,!1,U),F.asyncDep){if(A&&A.registerDep(F,ie,U,k),!h.el){let L=F.subTree=ye(xe);C(null,L,_,x),h.placeholder=L.el}}else ie(F,h,_,x,A,k,U)},j=(h,_,x)=>{let R=_.component=h.component;if(tE(h,_,x))if(R.asyncDep&&!R.asyncResolved){_.el=h.el,_.placeholder=h.placeholder,fe(R,_,x);return}else R.next=_,R.update();else _.el=h.el,_.placeholder=h.placeholder,R.vnode=_},ie=(h,_,x,R,A,k,U)=>{let F=()=>{if(h.isMounted){let{next:B,bu:K,u:G,parent:ce,vnode:me}=h;{let ut=Vf(h);if(ut){B&&(B.el=me.el,fe(h,B,U)),ut.asyncDep.then(()=>{let Jt=()=>{h.job.flags&8||(A&&A.pendingBranch?we(Jt,A):I())};Jt.flags=48,we(Jt,A)});return}}let de=B,Ce;qn(h,!1),B?(B.el=me.el,fe(h,B,U)):B=me,K&&xn(K),(Ce=B.props&&B.props.onVnodeBeforeUpdate)&&rt(Ce,ce,B,me),qn(h,!0);let Le=Bs(h),yt=h.subTree;h.subTree=Le,m(yt,Le,c(yt.el||Io(yt)),es(yt),h,A,k),B.el=Le.el,de===null&&ui(h,Le.el),G&&we(G,A),(Ce=B.props&&B.props.onVnodeUpdated)&&we(()=>rt(Ce,ce,B,me),A)}else{let B,{el:K,props:G}=_,{bm:ce,m:me,parent:de,root:Ce,type:Le}=h,yt=cn(_);if(qn(h,!1),ce&&xn(ce),!yt&&(B=G&&G.onVnodeBeforeMount)&&rt(B,de,_),qn(h,!0),K&&Yi){let ut=()=>{h.subTree=Bs(h),Yi(K,h.subTree,h,A,null)};yt&&Le.__asyncHydrate?Le.__asyncHydrate(K,h,ut):ut()}else{Ce.ce&&Ce.ce._hasShadowRoot()&&Ce.ce._injectChildStyle(Le,h.parent?h.parent.type:void 0);let ut=h.subTree=Bs(h);m(null,ut,x,R,h,A,k),_.el=ut.el}if(me&&we(me,A),!yt&&(B=G&&G.onVnodeMounted)){let ut=_;we(()=>rt(B,de,ut),A)}(_.shapeFlag&256||de&&cn(de.vnode)&&de.vnode.shapeFlag&256)&&h.a&&we(h.a,A),h.isMounted=!0,_=x=R=null}};h.scope.on();let L=h.effect=new rn(F);h.scope.off();let I=h.update=L.run.bind(L),X=h.job=L.runIfDirty.bind(L);X.i=h,X.id=h.uid,L.scheduler=()=>ni(X),qn(h,!0),I()},fe=(h,_,x)=>{_.component=h;let R=h.vnode.props;h.vnode=_,h.next=null,oE(h,_.props,R,x),aE(h,_.children,x),St(),af(h),xt()},he=(h,_,x,R,A,k,U,F,L=!1)=>{let I=h&&h.children,X=h?h.shapeFlag:0,B=_.children,{patchFlag:K,shapeFlag:G}=_;if(K>0){if(K&128){Me(I,B,x,R,A,k,U,F,L);return}else if(K&256){re(I,B,x,R,A,k,U,F,L);return}}G&8?(X&16&&Xo(I,A,k),B!==I&&f(x,B)):X&16?G&16?Me(I,B,x,R,A,k,U,F,L):Xo(I,A,k,!0):(X&8&&f(x,""),G&16&&T(B,x,R,A,k,U,F,L))},re=(h,_,x,R,A,k,U,F,L)=>{h=h||Nn,_=_||Nn;let I=h.length,X=_.length,B=Math.min(I,X),K;for(K=0;K<B;K++){let G=_[K]=L?ln(_[K]):st(_[K]);m(h[K],G,x,null,A,k,U,F,L)}I>X?Xo(h,A,k,!0,!1,B):T(_,x,R,A,k,U,F,L,B)},Me=(h,_,x,R,A,k,U,F,L)=>{let I=0,X=_.length,B=h.length-1,K=X-1;for(;I<=B&&I<=K;){let G=h[I],ce=_[I]=L?ln(_[I]):st(_[I]);if(wt(G,ce))m(G,ce,x,null,A,k,U,F,L);else break;I++}for(;I<=B&&I<=K;){let G=h[B],ce=_[K]=L?ln(_[K]):st(_[K]);if(wt(G,ce))m(G,ce,x,null,A,k,U,F,L);else break;B--,K--}if(I>B){if(I<=K){let G=K+1,ce=G<X?_[G].el:R;for(;I<=K;)m(null,_[I]=L?ln(_[I]):st(_[I]),x,ce,A,k,U,F,L),I++}}else if(I>K)for(;I<=B;)Qe(h[I],A,k,!0),I++;else{let G=I,ce=I,me=new Map;for(I=ce;I<=K;I++){let ft=_[I]=L?ln(_[I]):st(_[I]);ft.key!=null&&me.set(ft.key,I)}let de,Ce=0,Le=K-ce+1,yt=!1,ut=0,Jt=new Array(Le);for(I=0;I<Le;I++)Jt[I]=0;for(I=G;I<=B;I++){let ft=h[I];if(Ce>=Le){Qe(ft,A,k,!0);continue}let $t;if(ft.key!=null)$t=me.get(ft.key);else for(de=ce;de<=K;de++)if(Jt[de-ce]===0&&wt(ft,_[de])){$t=de;break}$t===void 0?Qe(ft,A,k,!0):(Jt[$t-ce]=I+1,$t>=ut?ut=$t:yt=!0,m(ft,_[$t],x,null,A,k,U,F,L),Ce++)}let Ic=yt?cE(Jt):Nn;for(de=Ic.length-1,I=Le-1;I>=0;I--){let ft=ce+I,$t=_[ft],kc=_[ft+1],Vc=ft+1<X?kc.el||Io(kc):R;Jt[I]===0?m(null,$t,x,Vc,A,k,U,F,L):yt&&(de<0||I!==Ic[de]?ge($t,x,Vc,2):de--)}}},ge=(h,_,x,R,A=null)=>{let{el:k,type:U,transition:F,children:L,shapeFlag:I}=h;if(I&6){ge(h.component.subTree,_,x,R);return}if(I&128){h.suspense.move(_,x,R);return}if(I&64){U.move(h,_,x,ho);return}if(U===Ve){o(k,_,x);for(let B=0;B<L.length;B++)ge(L[B],_,x,R);o(h.anchor,_,x);return}if(U===un){b(h,_,x);return}if(R!==2&&I&1&&F)if(R===0)F.persisted&&!k[mt]?o(k,_,x):(F.beforeEnter(k),o(k,_,x),we(()=>F.enter(k),A));else{let{leave:B,delayLeave:K,afterLeave:G}=F,ce=()=>{h.ctx.isUnmounted?r(k):o(k,_,x)},me=()=>{let de=k._isLeaving||!!k[mt];k._isLeaving&&k[mt](!0),F.persisted&&!de?ce():B(k,()=>{ce(),G&&G()})};K?K(k,ce,me):me()}else o(k,_,x)},Qe=(h,_,x,R=!1,A=!1)=>{let{type:k,props:U,ref:F,children:L,dynamicChildren:I,shapeFlag:X,patchFlag:B,dirs:K,cacheIndex:G,memo:ce}=h;if((B===-2||I&&I.hasOnce)&&(A=!1),F!=null&&(St(),Do(F,null,x,h,!0),xt()),G!=null&&(!h.ctx||h.ctx===_)&&(_.renderCache[G]=void 0),X&256&&_.ctx.deactivate(h))return;let me=X&1&&K,de=!cn(h),Ce;if(de&&(Ce=U&&U.onVnodeBeforeUnmount)&&rt(Ce,_,h),X&6)Ih(h.component,x,R);else{if(X&128){h.suspense.unmount(x,R);return}me&&jt(h,null,_,"beforeUnmount"),X&64?h.type.remove(h,_,x,ho,R):I&&!I.hasOnce&&(k!==Ve||B>0&&B&64)?Xo(I,_,x,!1,!0):(k===Ve&&B&384||!A&&X&16)&&Xo(L,_,x),R&&qi(h)}let Le=ce!=null&&G==null;(de&&(Ce=U&&U.onVnodeUnmounted)||me||Le)&&we(()=>{Ce&&rt(Ce,_,h),me&&jt(h,null,_,"unmounted"),Le&&(h.el=null)},x)},qi=h=>{let{type:_,el:x,anchor:R,transition:A}=h,k=_===Ve;if(k&&!A){Ac(x,R);return}if(_===un){g(h),A&&!A.persisted&&A.afterLeave&&A.afterLeave();return}let U=k?_r(h):h,F=()=>{k?c(x)&&Ac(x,R):r(x),A&&!A.persisted&&A.afterLeave&&A.afterLeave()};if(U&&U.shapeFlag&1&&A&&!A.persisted){let{leave:L,delayLeave:I}=A,X=U.el,B=()=>L(X,F);I?I(X,F,B):B()}else F()},Ac=(h,_)=>{let x;for(;h!==_;)x=p(h),r(h),h=x;r(_)},Ih=(h,_,x)=>{let{bum:R,scope:A,job:k,subTree:U,um:F,m:L,a:I}=h;Gs(L),Gs(I),R&&xn(R),A.stop(),k?(k.flags|=8,Qe(U,h,_,x)):U&&(U.transition=h.vnode.transition,Qe(U,h,_,x)),F&&we(F,_);let X=()=>{h.isUnmounted=!0};X.flags=16,we(X,_)},Xo=(h,_,x,R=!1,A=!1,k=0)=>{for(let U=k;U<h.length;U++)Qe(h[U],_,x,R,A)},es=h=>{if(h.shapeFlag&6)return es(h.component.subTree);if(h.shapeFlag&128)return h.suspense.next();let _=p(h.anchor||h.el),x=_&&_[hf];return x?p(x):_},Dc=(h,_,x)=>{let R=h&&_._vnode?void 0:h&&h.component?h.component.uid:SE();Pm(()=>{h==null?_._vnode&&Qe(_._vnode,null,null,!0):m(_._vnode||null,h,_,null,null,null,x),_._vnode=h},R)},ho={p:m,um:Qe,m:ge,r:qi,mt:W,mc:T,pc:he,pbc:M,n:es,o:e},Ji,Yi;return t&&([Ji,Yi]=t(ho)),{render:Dc,hydrate:Ji,createApp:qg(Dc,Ji)}}function Ka({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function qn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function kf(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function El(e,t,n=!1){let o=e.children,r=t.children;if(H(o)&&H(r))for(let s=0;s<o.length;s++){let i=o[s],a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=ln(r[s]),a.el=i.el),!n&&a.patchFlag!==-2&&El(i,a)),a.type===Cn&&(a.patchFlag===-1&&(a=r[s]=ln(a)),a.el=i.el),a.type===xe&&!a.el&&(a.el=i.el)}}function cE(e){let t=e.slice(),n=[0],o,r,s,i,a,l=e.length;for(o=0;o<l;o++){let u=e[o];if(u!==0){if(r=n[n.length-1],e[r]<u){t[o]=r,n.push(o);continue}for(s=0,i=n.length-1;s<i;)a=s+i>>1,e[n[a]]<u?s=a+1:i=a;u<e[n[s]]&&(s>0&&(t[o]=n[s-1]),n[s]=o)}}for(s=n.length,i=n[s-1];s-- >0;)n[s]=i,i=t[i];return n}function Vf(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Vf(t)}function Gs(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Io(e){if(e.placeholder)return e.placeholder;let t=e.component;if(t)return Io(t.subTree);let n=e.suspense;return n&&n.activeBranch?Io(n.activeBranch):null}var qs=e=>e.__isSuspense,Qa=0,Za=Symbol("_deferredEnter"),uE={name:"Suspense",__isSuspense:!0,process(e,t,n,o,r,s,i,a,l,u){if(e==null)pE(t,n,o,r,s,i,a,l,u);else{let f=e.suspense;if(s&&s.deps>0&&!s.isHydrating){let c=f.parentComponent;if(!!c&&c.suspense===s&&c.suspenseId!==s.pendingId?s.pendingBranch&&!wt(t.ssContent,f.pendingBranch||f.activeBranch):!f.isInFallback){t.suspense=f,f.vnode=t,t.el=e.el;return}}dE(e,t,n,o,r,i,a,l,u)}},hydrate:hE,normalize:mE},fE=uE;function br(e,t){let n=e.props&&e.props[t];Z(n)&&n()}function tf(e){let t=[];el(e,t,!0),t.length&&Kt(t)}function el(e,t,n){let{el:o,transition:r,children:s,shapeFlag:i}=e;if(i&6){el(e.component.subTree,t,n);return}if(!(i&192)&&(i&1&&(!n&&o&&o[Za]&&(o[Za]=void 0,r&&!r.persisted&&(r.beforeEnter(o),t.push(()=>r.enter(o)))),n=!1),i&16))for(let a=0;a<s.length;a++)el(s[a],t,n)}function pE(e,t,n,o,r,s,i,a,l){let{p:u,o:{createElement:f}}=l,c=f("div"),p=e.suspense=Rf(e,r,o,t,c,n,s,i,a,l);u(null,p.pendingBranch=e.ssContent,c,null,o,p,s,i),p.deps>0?(br(e,"onPending"),br(e,"onFallback"),u(null,e.ssFallback,t,n,o,null,s,i),ko(p,e.ssFallback)):p.resolve(!1,!0)}function dE(e,t,n,o,r,s,i,a,{p:l,um:u,o:{createElement:f}}){let c=t.suspense=e.suspense;c.vnode=t,t.el=e.el;let p=t.ssContent,d=t.ssFallback,{activeBranch:v,pendingBranch:m,isInFallback:N,isHydrating:C}=c;if(m)c.pendingBranch=p,wt(m,p)?(c.deps++,l(m,p,C?n:c.hiddenContainer,null,r,c,s,i,a),c.deps--,c.deps<=0?c.resolve():N&&!C&&!c.isFallbackMountPending&&(l(v,d,n,o,r,null,s,i,a),ko(c,d))):(c.pendingId=Qa++,C?(c.isHydrating=!1,c.activeBranch=m):u(m,r,c),c.deps=0,Pf(c),c.hiddenContainer=f("div"),N?(l(null,p,c.hiddenContainer,null,r,c,s,i,a),c.deps<=0?c.resolve():c.isFallbackMountPending||(l(v,d,n,o,r,null,s,i,a),ko(c,d))):v&&wt(v,p)?(l(v,p,n,o,r,c,s,i,a),c.resolve(!0)):(l(null,p,c.hiddenContainer,null,r,c,s,i,a),c.deps<=0&&c.resolve()));else if(v&&wt(v,p))l(v,p,n,o,r,c,s,i,a),ko(c,p);else if(br(t,"onPending"),c.pendingBranch=p,c.pendingId=Qa++,l(null,p,c.hiddenContainer,null,r,c,s,i,a),c.deps<=0)c.resolve();else{let{timeout:y}=c;y>0?c.timeoutTimer=setTimeout(()=>{c.timeoutTimer=void 0,c.fallback(c.vnode.ssFallback)},y):y===0&&c.fallback(d)}}function Rf(e,t,n,o,r,s,i,a,l,u,f=!1){let{p:c,m:p,um:d,n:v,o:{parentNode:m,remove:N}}=u,C,y=gE(e);y&&t&&t.pendingBranch&&(C=t.pendingId,t.deps++);let E=e.props?No(e.props.timeout):void 0,b=s,g={vnode:e,parent:t,parentComponent:n,namespace:i,container:o,hiddenContainer:r,deps:0,pendingId:Qa++,timeout:typeof E=="number"?E:-1,timeoutTimer:void 0,activeBranch:null,isFallbackMountPending:!1,pendingBranch:null,isInFallback:!f,isHydrating:f,isUnmounted:!1,effects:[],resolve(O=!1,D=!1){let{vnode:S,activeBranch:T,pendingBranch:V,pendingId:M,effects:w,parentComponent:$,container:P,isInFallback:W}=g,j=g.parent;for(;j&&!j.pendingBranch;)j=j.parent;let ie=!1;if(g.isHydrating)g.isHydrating=!1;else if(!O){ie=T&&V.transition&&V.transition.mode==="out-in";let he=!1;ie&&(T.transition.afterLeave=()=>{if(M===g.pendingId&&!g.isUnmounted){tf(V),p(V,P,s===b&&!he?v(T):s,0);let re=!1;if(j){let Me=P,ge;for(;ge=m(Me);)Me=ge;re=Me===j.hiddenContainer}re||Kt(w),W&&S.ssFallback&&(S.ssFallback.el=null)}}),T&&!g.isFallbackMountPending&&(m(T.el||Io(T))===P&&(s=v(T),he=!0),d(T,$,g,!0),!ie&&W&&S.ssFallback&&we(()=>S.ssFallback.el=null,g)),ie||(tf(V),p(V,P,s,0))}clearTimeout(g.timeoutTimer),g.timeoutTimer=void 0,g.isFallbackMountPending=!1,ko(g,V),g.pendingBranch=null,g.isInFallback=!1;let fe=0;for(let he=0;he<w.length;he++){let re=w[he];re.flags&32?Kt(re):w[fe++]=re}if(w.length=fe,j)for(let he=0;he<w.length;he++)j.effects.push(w[he]);else ie||Kt(w);g.effects=[],y&&t&&t.pendingBranch&&C===t.pendingId&&(C=void 0,t.deps--,t.deps===0&&!D&&t.resolve()),br(S,"onResolve")},fallback(O){if(g.isUnmounted||!g.pendingBranch)return;let{vnode:D,activeBranch:S,parentComponent:T,container:V,namespace:M}=g;br(D,"onFallback");let w=v(S),$=()=>{if(g.isFallbackMountPending=!1,g.isUnmounted||!g.isInFallback)return;let W=g.vnode.ssFallback;c(null,W,V,w,T,null,M,a,l),ko(g,W)},P=O.transition&&O.transition.mode==="out-in";P&&(g.isFallbackMountPending=!0,S.transition.afterLeave=$),g.isInFallback=!0,d(S,T,null,!0),P||$()},move(O,D,S){g.activeBranch&&p(g.activeBranch,O,D,S),g.container=O},next(){return g.activeBranch&&v(g.activeBranch)},registerDep(O,D,S,T){let V=!!g.pendingBranch;V&&g.deps++;let M=O.vnode.el,w=$=>{O.asyncResolved=!0;let{vnode:P}=O;tl(O,$,!1),M&&(P.el=M);let W=!M&&O.subTree.el;D(O,P,m(M||O.subTree.el),M?null:v(O.subTree),g,T,S),W&&(P.placeholder=null,N(W)),ui(O,P.el)};O.asyncDep.catch($=>(O.scope.active&&oo($,O,0,!1,!0),()=>null)).then($=>{if(O.isUnmounted||g.isUnmounted)return;let P=V&&g.pendingId===O.suspenseId;if(xr(),!O.scope.active){P&&--g.deps===0&&g.resolve();return}if(!P&&g.pendingBranch){let W=()=>{O.isUnmounted||g.isUnmounted||!O.scope.active||(g.pendingBranch?Js(W,g):w($))};W.flags=48,Js(W,g);return}w($),P&&--g.deps===0&&g.resolve()})},unmount(O,D){if(g.isUnmounted=!0,clearTimeout(g.timeoutTimer),g.timeoutTimer=void 0,C!==void 0){let S=g.parent,T=C;C=void 0,Kt(()=>{S.pendingId===T&&!S.isUnmounted&&--S.deps===0&&S.resolve()})}g.activeBranch&&d(g.activeBranch,n,O,D),g.pendingBranch&&(d(g.pendingBranch,n,g,D),Pf(g))}};return g}function hE(e,t,n,o,r,s,i,a,l){let u=t.suspense=Rf(t,o,n,e.parentNode,document.createElement("div"),null,r,s,i,a,!0),f=l(e,u.pendingBranch=t.ssContent,n,u,s,i);return u.deps===0&&u.resolve(!1,!0),f}function mE(e){let{shapeFlag:t,children:n}=e,o=t&32;e.ssContent=nf(o?n.default:n),e.ssFallback=o?nf(n.fallback):ye(xe)}function nf(e){let t;if(Z(e)){let n=eo&&e._c;n&&(e._d=!1,Nr()),e=e(),n&&(e._d=!0,t=Xe,fi())}return H(e)&&(e=pl(e)),e=st(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter(n=>n!==e)),e}function Pf(e){let{effects:t}=e;for(let n=0;n<t.length;n++){let o=t[n];o.flags&16&&Kt(o)}t.length=0}function Js(e,t){t&&t.pendingBranch?H(e)?t.effects.push(...e):t.effects.push(e):Kt(e)}function ko(e,t){e.activeBranch=t;let{vnode:n,parentComponent:o}=e,r=t.el;for(;!r&&t.component;)t=t.component.subTree,r=t.el;n.el=r,o&&o.subTree===n&&(o.vnode.el=r,ui(o,r))}function gE(e){let t=e.props&&e.props.suspensible;return t!=null&&t!==!1}var Ve=Symbol.for("v-fgt"),Cn=Symbol.for("v-txt"),xe=Symbol.for("v-cmt"),un=Symbol.for("v-stc"),fn=[],Xe=null;function Nr(e=!1){fn.push(Xe=e?null:[])}function fi(){fn.pop(),Xe=fn[fn.length-1]||null}var eo=1;function Sr(e,t=!1){eo+=e,e<0&&Xe&&t&&(Xe.hasOnce=!0)}function Mf(e){return e.dynamicChildren=eo>0?Xe||Nn:null,fi(),eo>0&&Xe&&Xe.push(e),e}function EE(e,t,n,o,r,s){return Mf(vl(e,t,n,o,r,s,!0))}function Ys(e,t,n,o,r){return Mf(ye(e,t,n,o,r,!0))}function pn(e){return e?e.__v_isVNode===!0:!1}function wt(e,t){return e.type===t.type&&e.key===t.key}var vE;function _E(e){vE=e}var Lf=({key:e})=>e??null,Hs=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?z(e)||Ne(e)||Z(e)?{i:je,r:e,k:t,f:!!n}:e:null);function vl(e,t=null,n=null,o=0,r=null,s=e===Ve?0:1,i=!1,a=!1){let l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Lf(t),ref:t&&Hs(t),scopeId:oi,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:o,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:je};return a?(Qs(l,n),s&128&&e.normalize(l)):n&&(l.shapeFlag|=z(n)?8:16),eo>0&&!i&&Xe&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&Xe.push(l),l}var ye=yE;function yE(e,t=null,n=null,o=0,r=null,s=!1){if((!e||e===_f)&&(e=xe),pn(e)){let a=Xt(e,t,!0);return n&&Qs(a,n),eo>0&&!s&&Xe&&(a.shapeFlag&6?Xe[Xe.indexOf(e)]=a:Xe.push(a)),a.patchFlag=-2,a}if(CE(e)&&(e=e.__vccOpts),t){t=$f(t);let{class:a,style:l}=t;a&&!z(a)&&(t.class=Wn(a)),se(l)&&(zn(l)&&!H(l)&&(l=q({},l)),t.style=jn(l))}let i=z(e)?1:qs(e)?128:si(e)?64:se(e)?4:Z(e)?2:0;return vl(e,t,n,o,r,i,s,!0)}function $f(e){return e?zn(e)?q({},e):wf(e)?q({},e[zf]||e):e:null}function Xt(e,t,n=!1,o=!1){let{props:r,ref:s,patchFlag:i,children:a,transition:l}=e,u=t?Uf(r||{},t):r,f={__v_isVNode:!0,__v_skip:!0,type:e.type,props:u,key:u&&Lf(u),ref:t&&t.ref?n&&s?H(s)?s.concat(Hs(t)):[s,Hs(t)]:Hs(t):s,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Ve?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Xt(e.ssContent),ssFallback:e.ssFallback&&Xt(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce,cacheIndex:e.cacheIndex};return l&&o&&Ot(f,l.clone(f)),f}function _l(e=" ",t=0){return ye(Cn,null,e,t)}function bE(e,t){let n=ye(un,null,e);return n.staticCount=t,n}function Ff(e="",t=!1){return t?(Nr(),Ys(xe,null,e)):ye(xe,null,e)}function st(e){return e==null||typeof e=="boolean"?ye(xe):H(e)?ye(Ve,null,e.slice()):pn(e)?ln(e):ye(Cn,null,String(e))}function ln(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Xt(e)}function Qs(e,t){let n=0,{shapeFlag:o}=e;if(t==null)t=null;else if(H(t))n=16;else if(typeof t=="object")if(o&65){let r=t.default;r&&(r._c&&(r._d=!1),Qs(e,r()),r._c&&(r._d=!0));return}else{n=32;let r=t._;!r&&!wf(t)?t._ctx=je:r===3&&je&&(je.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else if(Z(t)){if(o&65){Qs(e,{default:t});return}t={default:t,_ctx:je},n=32}else t=String(t),o&64?(n=16,t=[_l(t)]):n=8;e.children=t,e.shapeFlag|=n}function Uf(...e){let t={};for(let n=0;n<e.length;n++){let o=e[n];for(let r in o)if(r==="class")t.class!==o.class&&(t.class=Wn([t.class,o.class]));else if(r==="style")t.style=jn([t.style,o.style]);else if(Ft(r)){let s=t[r],i=o[r];i&&s!==i&&!(H(s)&&s.includes(i))?t[r]=s?[].concat(s,i):i:i==null&&s==null&&!yo(r)&&(t[r]=i)}else r!==""&&(t[r]=o[r])}return t}function rt(e,t,n,o=null){gt(e,t,7,[n,o])}var NE=bf(),Bf=0;function SE(){return Bf}function Hf(e,t,n){let o=e.type,r=(t?t.appContext:e.appContext)||NE,s={uid:Bf++,vnode:e,type:o,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Xn(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:rE(o,r),emitsOptions:Qg(o,r),emit:null,emitted:null,propsDefaults:ee,inheritAttrs:o.inheritAttrs,ctx:ee,data:ee,props:ee,attrs:ee,slots:ee,refs:ee,setupState:ee,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=Yg.bind(null,s),e.ce&&e.ce(s),s}var He=null,ze=()=>He||je,Zs,An;{let e=or(),t=(n,o)=>{let r;return(r=e[n])||(r=e[n]=[]),r.push(o),s=>{r.length>1?r.forEach(i=>i(s)):r[0](s)}};Zs=t("__VUE_INSTANCE_SETTERS__",n=>He=n),An=t("__VUE_SSR_SETTERS__",n=>to=n)}var pi=e=>{let t=He;return Zs(e),e.scope.on(),()=>{e.scope.off(),Zs(t)}},xr=()=>{He&&He.scope.off(),Zs(null)};function jf(e){return e.vnode.shapeFlag&4}var to=!1;function Wf(e,t=!1,n=!1){t&&An(t);let{props:o,children:r}=e.vnode,s=jf(e);nE(e,o,s,t),iE(e,r,n||t);let i=s?xE(e,t):void 0;return t&&An(!1),i}function xE(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,qa);let{setup:o}=n;if(o){St();let r=e.setupContext=o.length>1?Gf(e):null,s=pi(e),i=no(o,e,0,[e.props,r]),a=gs(i);if(xt(),s(),(a||e.sp)&&!cn(e)&&Ef(e),a){if(i.then(xr,xr),t)return i.then(l=>{An(!0);try{tl(e,l,t)}finally{An(!1)}}).catch(l=>{oo(l,e,0,void 0,!0),e.ssrRender=(u,f)=>f("<!---->")});e.asyncDep=i}else tl(e,i,t)}else Xf(e,t)}function tl(e,t,n){Z(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:se(t)&&(e.setupState=pr(t)),Xf(e,n)}var ei,nl;function yl(e){ei=e,nl=t=>{t.render._rc&&(t.withProxy=new Proxy(t.ctx,Rg))}}var Kf=()=>!ei;function Xf(e,t,n){let o=e.type;if(!e.render){if(!t&&ei&&!o.render){let r=o.template||!1;if(r){let{isCustomElement:s,compilerOptions:i}=e.appContext.config,{delimiters:a,compilerOptions:l}=o,u=q(q({isCustomElement:s,delimiters:a},i),l);o.render=ei(r,u)}}e.render=o.render||De,nl&&nl(e)}}var zf=Symbol(),TE={get(e,t){return Be(e,"get",""),t===zf?e:e[t]}};function Gf(e){let t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,TE),slots:e.slots,emit:e.emit,expose:t}}function Ar(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(pr(Is(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in gr)return gr[n](e)},has(t,n){return n in t||n in gr}})):e.proxy}var wE=/(?:^|[-_])\w/g,OE=e=>e.replace(wE,t=>t.toUpperCase()).replace(/[-_]/g,"");function ti(e,t=!0){return Z(e)?e.displayName||e.name:e.name||t&&e.__name}function qf(e,t,n=!1){let o=ti(t);if(!o&&t.__file){let r=t.__file.match(/([^/\\]+)\.\w+$/);r&&(o=r[1])}if(!o&&e){let r=s=>{for(let i in s)if(s[i]===t)return i};o=r(e.components)||e.parent&&r(e.parent.type.components)||r(e.appContext.components)}return o?OE(o):n?"App":"Anonymous"}function CE(e){return Z(e)&&"__vccOpts"in e}var Fe=(e,t)=>Uu(e,t,to);function bl(e,t,n){try{Sr(-1);let o=arguments.length;return o===2?se(t)&&!H(t)?pn(t)?ye(e,null,[t]):ye(e,t):ye(e,null,t):(o>3?n=Array.prototype.slice.call(arguments,2):o===3&&pn(n)&&(n=[n]),ye(e,t,n))}finally{Sr(1)}}function Jf(){return;function s(c){let p=[];c.type.props&&c.props&&p.push(i("props",Y(c.props))),c.setupState!==ee&&p.push(i("setup",c.setupState)),c.data!==ee&&p.push(i("data",Y(c.data)));let d=l(c,"computed");d&&p.push(i("computed",d));let v=l(c,"inject");return v&&p.push(i("injected",v)),p.push(["div",{},["span",{style:o.style+";opacity:0.66"},"$ (internal): "],["object",{object:c}]]),p}function i(c,p){return p=q({},p),Object.keys(p).length?["div",{style:"line-height:1.25em;margin-bottom:0.6em"},["div",{style:"color:#476582"},c],["div",{style:"padding-left:1.25em"},...Object.keys(p).map(d=>["div",{},["span",o,d+": "],a(p[d],!1)])]]:["span",{}]}function a(c,p=!0){return typeof c=="number"?["span",t,c]:typeof c=="string"?["span",n,JSON.stringify(c)]:typeof c=="boolean"?["span",o,c]:se(c)?["object",{object:p?Y(c):c}]:["span",n,String(c)]}function l(c,p){let d=c.type;if(Z(d))return;let v={};for(let m in c.ctx)u(d,m,p)&&(v[m]=c.ctx[m]);return v}function u(c,p,d){let v=c[d];if(H(v)&&v.includes(p)||se(v)&&p in v||c.extends&&u(c.extends,p,d)||c.mixins&&c.mixins.some(m=>u(m,p,d)))return!0}function f(c){return $e(c)?"ShallowRef":c.effect?"ComputedRef":"Ref"}}function AE(e,t,n,o){let r=n[o];if(r&&Yf(r,e))return r;let s=t();return s.memo=e.slice(),s.cacheIndex=o,n[o]=s}function Yf(e,t){let n=e.memo;if(n.length!=t.length)return!1;for(let o=0;o<n.length;o++)if(Ie(n[o],t[o]))return!1;return eo>0&&Xe&&Xe.push(e),!0}var Qf="3.5.46",di=De,DE=km,IE=Co,kE=cf,VE={createComponentInstance:Hf,setupComponent:Wf,renderComponentRoot:Bs,setCurrentRenderingInstance:vr,isVNode:pn,normalizeVNode:st,getComponentPublicInstance:Ar,ensureValidVNode:fl,pushWarningContext:xm,popWarningContext:Tm},RE=VE,PE=null,ME=null,LE=null;var wl,Zf=typeof window<"u"&&window.trustedTypes;if(Zf)try{wl=Zf.createPolicy("vue",{createHTML:e=>e})}catch{}var yp=wl?e=>wl.createHTML(e):e=>e,$E="http://www.w3.org/2000/svg",FE="http://www.w3.org/1998/Math/MathML",hn=typeof document<"u"?document:null,ep=hn&&hn.createElement("template"),bp={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,o)=>{let r=t==="svg"?hn.createElementNS($E,e):t==="mathml"?hn.createElementNS(FE,e):n?hn.createElement(e,{is:n}):hn.createElement(e);return e==="select"&&o&&o.multiple!=null&&r.setAttribute("multiple",o.multiple),r},createText:e=>hn.createTextNode(e),createComment:e=>hn.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>hn.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,o,r,s){let i=n?n.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),!(r===s||!(r=r.nextSibling)););else{ep.innerHTML=yp(o==="svg"?`<svg>${e}</svg>`:o==="mathml"?`<math>${e}</math>`:e);let a=ep.content;if(o==="svg"||o==="mathml"){let l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Dn="transition",Dr="animation",Ro=Symbol("_vtc"),Np={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Sp=q({},ai,Np),UE=e=>(e.displayName="Transition",e.props=Sp,e),BE=UE((e,{slots:t})=>bl(rl,xp(e),t)),ro=(e,t=[])=>{H(e)?e.forEach(n=>n(...t)):e&&e(...t)},tp=e=>e?H(e)?e.some(t=>t.length>1):e.length>1:!1;function xp(e){let t={};for(let w in e)w in Np||(t[w]=e[w]);if(e.css===!1)return t;let{name:n="v",type:o,duration:r,enterFromClass:s=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:a=`${n}-enter-to`,appearFromClass:l=s,appearActiveClass:u=i,appearToClass:f=a,leaveFromClass:c=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:d=`${n}-leave-to`}=e,v=HE(r),m=v&&v[0],N=v&&v[1],{onBeforeEnter:C,onEnter:y,onEnterCancelled:E,onLeave:b,onLeaveCancelled:g,onBeforeAppear:O=C,onAppear:D=y,onAppearCancelled:S=E}=t,T=(w,$,P,W)=>{w._enterResolve=void 0,w._enterCancelled=W,In(w,$?f:a),In(w,$?u:i),P&&P()},V=(w,$)=>{w._leaveResolve=void 0,w._isLeaving=!1,In(w,c),In(w,d),In(w,p),$&&$()},M=w=>($,P)=>{let W=w?D:y,j=()=>{$._enterResolve===j&&T($,w,P)};$._enterResolve=j,ro(W,[$,j]),np(()=>{In($,w?l:s),$._enterResolve===j&&(zt($,w?f:a),tp(W)||op($,o,m,j))})};return q(t,{onBeforeEnter(w){ro(C,[w]),zt(w,s),zt(w,i)},onBeforeAppear(w){ro(O,[w]),zt(w,l),zt(w,u)},onEnter:M(!1),onAppear:M(!0),onLeave(w,$){w._isLeaving=!0;let P=()=>{w._leaveResolve===P&&V(w,$)};w._leaveResolve=P,zt(w,c),w._enterCancelled?(zt(w,p),Ol(w)):(Ol(w),zt(w,p)),np(()=>{w._leaveResolve===P&&(In(w,c),zt(w,d),tp(b)||op(w,o,N,P))}),ro(b,[w,P])},onEnterCancelled(w){T(w,!1,void 0,!0),ro(E,[w])},onAppearCancelled(w){T(w,!0,void 0,!0),ro(S,[w])},onLeaveCancelled(w){V(w),ro(g,[w])}})}function HE(e){if(e==null)return null;if(se(e))return[Nl(e.enter),Nl(e.leave)];{let t=Nl(e);return[t,t]}}function Nl(e){return No(e)}function zt(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e[Ro]||(e[Ro]=new Set)).add(t)}function In(e,t){t.split(/\s+/).forEach(o=>o&&e.classList.remove(o));let n=e[Ro];n&&(n.delete(t),n.size||(e[Ro]=void 0))}function np(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}var jE=0;function op(e,t,n,o){let r=e._endId=++jE,s=()=>{r===e._endId&&o()};if(n!=null)return setTimeout(s,n);let{type:i,timeout:a,propCount:l}=Tp(e,t);if(!i)return o();let u=i+"end",f=0,c=()=>{e.removeEventListener(u,p),s()},p=d=>{d.target===e&&++f>=l&&c()};setTimeout(()=>{f<l&&c()},a+1),e.addEventListener(u,p)}function Tp(e,t){let n=window.getComputedStyle(e),o=v=>(n[v]||"").split(", "),r=o(`${Dn}Delay`),s=o(`${Dn}Duration`),i=rp(r,s),a=o(`${Dr}Delay`),l=o(`${Dr}Duration`),u=rp(a,l),f=null,c=0,p=0;t===Dn?i>0&&(f=Dn,c=i,p=s.length):t===Dr?u>0&&(f=Dr,c=u,p=l.length):(c=Math.max(i,u),f=c>0?i>u?Dn:Dr:null,p=f?f===Dn?s.length:l.length:0);let d=f===Dn&&/\b(?:transform|all)(?:,|$)/.test(o(`${Dn}Property`).toString());return{type:f,timeout:c,propCount:p,hasTransform:d}}function rp(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,o)=>sp(n)+sp(e[o])))}function sp(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function Ol(e){return(e?e.ownerDocument:document).body.offsetHeight}function WE(e,t,n){let o=e[Ro];o&&(t=(t?[t,...o]:[...o]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}var Ei=Symbol("_vod"),Il=Symbol("_vsh"),wp={name:"show",beforeMount(e,{value:t},{transition:n}){e[Ei]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):Ir(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:o}){!t!=!n&&(o?t?(o.beforeEnter(e),Ir(e,!0),o.enter(e)):o.leave(e,()=>{Ir(e,!1)}):Ir(e,t))},beforeUnmount(e,{value:t}){Ir(e,t)}};function Ir(e,t){e.style.display=t?e[Ei]:"none",e[Il]=!t}function KE(){wp.getSSRProps=({value:e})=>{if(!e)return{style:{display:"none"}}}}var Op=Symbol("");function XE(e){let t=ze();if(!t)return;let n=(s=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(i=>vi(i,s))},o={uid:String(t.uid),update:n};To(()=>o.update=void 0),t.ut=(s,i)=>{s&&(s[Po]=[i,o],Cp(s),Cl(s)),n()};let r=()=>{let s=e(t.proxy);t.ce?vi(t.ce,s):Al(t.subTree,s),n(s)};il(()=>{Kt(r)}),Cr(()=>{Vo(r,De,{flush:"post"});let s=new MutationObserver(r);s.observe(t.subTree.el.parentNode,{childList:!0}),ll(()=>s.disconnect())})}var Po=Symbol("");function Cl(e,t){let[n,o]=e[Po],r;if(o.update)for(let s=e;s&&s!==n;s=s.nextSibling)s.nodeType===1&&(!t||(t===!0||t.has(s))&&(s.getAttribute("data-v-owner")||o.uid)===o.uid)&&(s.setAttribute("data-v-owner",o.uid),r=o.update);return r}function Cp(e){let t=e.parentNode;if(t){let n=t[Po];n||(n=t[Po]=new Set,new MutationObserver(zE).observe(t,{childList:!0})),n.add(e)}}function zE(e,t){let n=e[0].target,o=n[Po],r=new Set;for(let{addedNodes:i}of e)i.forEach(a=>r.add(a));let s=new Set;o.forEach(i=>{i.parentNode!==n?(o.delete(i),Cp(i),s.add(Cl(i,!0))):r.size&&s.add(Cl(i,r))}),s.forEach(i=>i&&i()),o.size||(t.disconnect(),n[Po]=void 0)}function Al(e,t){if(e.shapeFlag&128){let n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push(()=>{Al(n.activeBranch,t)})}for(;e.component;)e=e.component.subTree;if(e.shapeFlag&1&&e.el)vi(e.el,t);else if(e.type===Ve)e.children.forEach(n=>Al(n,t));else if(e.type===un){let{el:n,anchor:o}=e;for(;n&&(vi(n,t),n!==o);)n=n.nextSibling}}function vi(e,t){if(e.nodeType===1){let n=e.style,o="";for(let r in t){let s=Sa(t[r]);n.setProperty(`--${r}`,s),o+=`--${r}: ${s};`}n[Op]=o}}var GE=/(?:^|;)\s*display\s*:/;function qE(e,t,n){let o=e.style,r=z(n),s=!1;if(n&&!r){if(t)if(z(t))for(let i of t.split(";")){let a=i.slice(0,i.indexOf(":")).trim();n[a]==null&&kr(o,a,"")}else for(let i in t)n[i]==null&&kr(o,i,"");for(let i in n){i==="display"&&(s=!0);let a=n[i];a!=null?YE(e,i,!z(t)&&t?t[i]:void 0,a)||kr(o,i,a):kr(o,i,"")}}else if(r){if(t!==n){let i=o[Op];i&&(n+=";"+i),o.cssText=n,s=GE.test(n)}}else t&&e.removeAttribute("style");Ei in e&&((!r||t!==n)&&(e[Ei]=s?o.display:""),e[Il]&&(o.display="none"))}var hi=/\s*!important$/;function kr(e,t,n){if(H(n))n.forEach(o=>kr(e,t,o));else if(n==null&&(n=""),t.startsWith("--"))hi.test(n)?e.setProperty(t,n.replace(hi,""),"important"):e.setProperty(t,n);else{let o=JE(e,t);hi.test(n)?e.setProperty(Ke(o),n.replace(hi,""),"important"):e[o]=n}}var ip=["Webkit","Moz","ms"],Sl={};function JE(e,t){let n=Sl[t];if(n)return n;let o=le(t);if(o!=="filter"&&o in e)return Sl[t]=o;o=Nt(o);for(let r=0;r<ip.length;r++){let s=ip[r]+o;if(s in e)return Sl[t]=s}return t}function YE(e,t,n,o){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&z(o)&&n===o}var ap="http://www.w3.org/1999/xlink";function lp(e,t,n,o,r,s=fu(t)){o&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(ap,t.slice(6,t.length)):e.setAttributeNS(ap,t,n):n==null||s&&!_s(n)?e.removeAttribute(t):e.setAttribute(t,s?"":Ae(n)?String(n):n)}function cp(e,t,n,o,r){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?yp(n):n);return}let s=e.tagName;if(t==="value"&&s!=="PROGRESS"&&!s.includes("-")){let a=s==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let i=!1;if(n===""||n==null){let a=typeof e[t];a==="boolean"?n=_s(n):n==null&&a==="string"?(n="",i=!0):a==="number"&&(n=0,i=!0)}try{e[t]=n}catch{}i&&e.removeAttribute(r||t)}function mn(e,t,n,o){e.addEventListener(t,n,o)}function QE(e,t,n,o){e.removeEventListener(t,n,o)}var up=Symbol("_vei");function ZE(e,t,n,o,r=null){let s=e[up]||(e[up]={}),i=s[t];if(o&&i)i.value=o;else{let[a,l]=nv(t);if(o){let u=s[t]=sv(o,r);mn(e,a,u,l)}else i&&(QE(e,a,i,l),s[t]=void 0)}}var ev=/(Once|Passive|Capture)$/,tv=/^on:?(?:Once|Passive|Capture)$/;function nv(e){let t,n;for(;(n=e.match(ev))&&!tv.test(e);)t||(t={}),e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===":"?e.slice(3):Ke(e.slice(2)),t]}var xl=0,ov=Promise.resolve(),rv=()=>xl||(ov.then(()=>xl=0),xl=Date.now());function sv(e,t){let n=o=>{if(!o._vts)o._vts=Date.now();else if(o._vts<=n.attached)return;let r=n.value;if(H(r)){let s=o.stopImmediatePropagation;o.stopImmediatePropagation=()=>{s.call(o),o._stopped=!0};let i=r.slice(),a=[o];for(let l=0;l<i.length&&!o._stopped;l++){let u=i[l];u&&gt(u,t,5,a)}}else gt(r,t,5,[o])};return n.value=e,n.attached=rv(),n}var fp=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Ap=(e,t,n,o,r,s)=>{let i=r==="svg";t==="class"?WE(e,o,i):t==="style"?qE(e,n,o):Ft(t)?yo(t)||ZE(e,t,n,o,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):iv(e,t,o,i))?(cp(e,t,o),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&lp(e,t,o,i,s,t!=="value")):e._isVueCE&&(av(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!z(o)))?cp(e,le(t),o,s,t):(t==="true-value"?e._trueValue=o:t==="false-value"&&(e._falseValue=o),lp(e,t,o,i))};function iv(e,t,n,o){if(o)return!!(t==="innerHTML"||t==="textContent"||t in e&&fp(t)&&Z(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){let r=e.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return fp(t)&&z(n)?!1:t in e}function av(e,t){let n=e._def.props;if(!n)return!1;let o=le(t);return Array.isArray(n)?n.some(r=>le(r)===o):Object.keys(n).some(r=>le(r)===o)}var pp={};function Dp(e,t,n){let o=it(e,t);bo(o)&&(o=q({},o,t));class r extends _i{constructor(i){super(o,i,n)}}return r.def=o,r}var lv=((e,t)=>Dp(e,t,Hp)),cv=typeof HTMLElement<"u"?HTMLElement:class{},_i=class e extends cv{constructor(t,n={},o=Rr){super(),this._def=t,this._props=n,this._createApp=o,this._isVueCE=!0,this._instance=null,this._app=null,this._nonce=this._def.nonce,this._connected=!1,this._resolved=!1,this._patching=!1,this._dirty=!1,this._numberProps=null,this._styleChildren=new WeakSet,this._styleAnchors=new WeakMap,this._ob=null,this.shadowRoot&&o!==Rr?this._root=this.shadowRoot:t.shadowRoot!==!1?(this.attachShadow(q({},t.shadowRootOptions,{mode:"open"})),this._root=this.shadowRoot):this._root=this}connectedCallback(){if(!this.isConnected)return;!this.shadowRoot&&!this._resolved&&this._parseSlots(),this._connected=!0;let t=this;for(;t=t&&(t.assignedSlot||t.parentNode||t.host);)if(t instanceof e){this._parent=t;break}this._instance||(this._resolved?this._mount(this._def):t&&t._pendingResolve?this._pendingResolve=t._pendingResolve.then(()=>{if(this._pendingResolve=void 0,this.isConnected)return this._resolveDef()}):this._resolveDef())}_setParent(t=this._parent){t&&(this._instance.parent=t._instance,this._inheritParentContext(t))}_inheritParentContext(t=this._parent){t&&this._app&&Object.setPrototypeOf(this._app._context.provides,t._instance.provides)}disconnectedCallback(){this._connected=!1,Tr(()=>{this._connected||(this._ob&&(this._ob.disconnect(),this._ob=null),this._app&&this._app.unmount(),this._instance&&(this._instance.ce=void 0),this._app=this._instance=null,this._teleportTargets&&(this._teleportTargets.clear(),this._teleportTargets=void 0))})}_processMutations(t){for(let n of t)this._setAttr(n.attributeName)}_resolveDef(){if(this._pendingResolve)return this._pendingResolve;for(let o=0;o<this.attributes.length;o++)this._setAttr(this.attributes[o].name);this._ob=new MutationObserver(this._processMutations.bind(this)),this._ob.observe(this,{attributes:!0});let t=(o,r=!1)=>{this._resolved=!0,this._pendingResolve=void 0;let{props:s,styles:i}=o,a;if(s&&!H(s))for(let l in s){let u=s[l];(u===Number||u&&u.type===Number)&&(l in this._props&&(this._props[l]=No(this._props[l])),(a||(a=Object.create(null)))[le(l)]=!0)}this._numberProps=a,this._resolveProps(o),this.shadowRoot&&this._applyStyles(i),this._connected&&this._mount(o)},n=this._def.__asyncLoader;if(n)return this._pendingResolve=n().then(o=>{o.configureApp=this._def.configureApp,t(this._def=o,!0)}),this._pendingResolve;t(this._def)}_mount(t){this._app=this._createApp(t),this._inheritParentContext(),t.configureApp&&t.configureApp(this._app),this._app._ceVNode=this._createVNode(),this._app.mount(this._root);let n=this._instance&&this._instance.exposed;if(n)for(let o in n)ae(this,o)||Object.defineProperty(this,o,{get:()=>Gn(n[o])})}_resolveProps(t){let{props:n}=t,o=H(n)?n:Object.keys(n||{});for(let r of Object.keys(this))r[0]!=="_"&&o.includes(r)&&this._setProp(r,this[r]);for(let r of o.map(le))Object.defineProperty(this,r,{get(){return this._getProp(r)},set(s){this._setProp(r,s,!0,!this._patching)}})}_setAttr(t){if(t.startsWith("data-v-"))return;let n=this.hasAttribute(t),o=n?this.getAttribute(t):pp,r=le(t);n&&this._numberProps&&this._numberProps[r]&&(o=No(o)),this._setProp(r,o,!1,!0)}_getProp(t){return this._props[t]}_setProp(t,n,o=!0,r=!1){if(n!==this._props[t]&&(this._dirty=!0,n===pp?delete this._props[t]:(this._props[t]=n,t==="key"&&this._app&&(this._app._ceVNode.key=n)),r&&this._instance&&this._update(),o)){let s=this._ob;s&&(this._processMutations(s.takeRecords()),s.disconnect()),n===!0?this.setAttribute(Ke(t),""):typeof n=="string"||typeof n=="number"?this.setAttribute(Ke(t),n+""):n||this.removeAttribute(Ke(t)),s&&s.observe(this,{attributes:!0})}}_update(){let t=this._createVNode();this._app&&(t.appContext=this._app._context),Bp(t,this._root)}_createVNode(){let t={};this.shadowRoot||(t.onVnodeMounted=t.onVnodeUpdated=this._renderSlots.bind(this));let n=ye(this._def,q(t,this._props));return this._instance||(n.ce=o=>{this._instance=o,o.ce=this,o.isCE=!0;let r=(s,i)=>{this.dispatchEvent(new CustomEvent(s,bo(i[0])?q({detail:i},i[0]):{detail:i}))};o.emit=(s,...i)=>{r(s,i),Ke(s)!==s&&r(Ke(s),i)},this._setParent()}),n}_applyStyles(t,n,o){if(!t)return;if(n){if(n===this._def||this._styleChildren.has(n))return;this._styleChildren.add(n)}let r=this._nonce,s=this.shadowRoot,i=o?this._getStyleAnchor(o)||this._getStyleAnchor(this._def):this._getRootStyleInsertionAnchor(s),a=null;for(let l=t.length-1;l>=0;l--){let u=document.createElement("style");r&&u.setAttribute("nonce",r),u.textContent=t[l],s.insertBefore(u,a||i),a=u,l===0&&(o||this._styleAnchors.set(this._def,u),n&&this._styleAnchors.set(n,u))}}_getStyleAnchor(t){if(!t)return null;let n=this._styleAnchors.get(t);return n&&n.parentNode===this.shadowRoot?n:(n&&this._styleAnchors.delete(t),null)}_getRootStyleInsertionAnchor(t){for(let n=0;n<t.childNodes.length;n++){let o=t.childNodes[n];if(!(o instanceof HTMLStyleElement))return o}return null}_parseSlots(){let t=this._slots={},n;for(;n=this.firstChild;){let o=n.nodeType===1&&n.getAttribute("slot")||"default";(t[o]||(t[o]=[])).push(n),this.removeChild(n)}}_renderSlots(){let t=this._getSlots(),n=this._instance.type.__scopeId;for(let o=0;o<t.length;o++){let r=t[o],s=r.getAttribute("name")||"default",i=this._slots[s],a=r.parentNode;if(i)for(let l of i){if(n&&l.nodeType===1){let u=n+"-s",f=document.createTreeWalker(l,1);l.setAttribute(u,"");let c;for(;c=f.nextNode();)c.setAttribute(u,"")}a.insertBefore(l,r)}else for(;r.firstChild;)a.insertBefore(r.firstChild,r);a.removeChild(r)}}_getSlots(){let t=[this];this._teleportTargets&&t.push(...this._teleportTargets);let n=new Set;for(let o of t){let r=o.querySelectorAll("slot");for(let s=0;s<r.length;s++)n.add(r[s])}return Array.from(n)}_injectChildStyle(t,n){this._applyStyles(t.styles,t,n)}_beginPatch(){this._patching=!0,this._dirty=!1}_endPatch(){this._patching=!1,this._dirty&&this._instance&&this._update()}_hasShadowRoot(){return this._def.shadowRoot!==!1}_removeChildStyle(t){}};function Ip(e){let t=ze(),n=t&&t.ce;return n||null}function uv(){let e=Ip();return e&&e.shadowRoot}function fv(e="$style"){{let t=ze();if(!t)return ee;let n=t.type.__cssModules;if(!n)return ee;let o=n[e];return o||ee}}var kp=new WeakMap,Vp=new WeakMap,yi=Symbol("_moveCb"),dp=Symbol("_enterCb"),Dl=new WeakMap,pv=e=>(delete e.props.mode,e),dv=pv({name:"TransitionGroup",props:q({},Sp,{tag:String,moveClass:String}),setup(e,{slots:t}){let n=ze(),o=ii(),r,s,i,a,l=()=>(a===void 0&&(a=r.length>0&&bv(r[0].el,n.vnode.el,hp(e))),a);return li(()=>{if(Dl.delete(n),!l()){r=[],i=void 0;return}let u=hp(e);r.forEach(mv);let f=i&&yv(i,n.vnode.el);i=void 0,r.forEach(p=>gv(p,f));let c=r.filter(Ev);Ol(n.vnode.el),c.forEach(p=>{let d=p.el,v=d.style;zt(d,u),v.transform=v.webkitTransform=v.transitionDuration="";let m=d[yi]=N=>{N&&N.target!==d||(!N||N.propertyName.endsWith("transform"))&&(d.removeEventListener("transitionend",m),d[yi]=null,In(d,u))};d.addEventListener("transitionend",m)}),r=[]}),()=>{let u=Y(e),f=xp(u),c=u.tag||Ve;if(r=[],a=void 0,s)for(let p=0;p<s.length;p++){let d=s[p];d.el&&d.el instanceof Element&&!d.el[Il]&&(r.push(d),Ot(d,Zn(d,f,o,n)),kp.set(d,Ni(d.el)))}s=t.default?wr(t.default()):[];for(let p=0;p<s.length;p++){let d=s[p];d.key!=null&&Ot(d,Zn(d,f,o,n))}return r.length&&(i=vv(n),Dl.set(n,l)),ye(c,null,s)}}}),hv=dv;function mv(e){let t=e.el;t[yi]&&t[yi](),t[dp]&&t[dp]()}function hp(e){return e.moveClass||`${e.name||"v"}-move`}function gv(e,t){Vp.set(e,Ni(e.el,t))}function Ev(e){let t=kp.get(e),n=Vp.get(e),o=t.left-n.left,r=t.top-n.top;if(o||r){let s=e.el,i=s.style,a=s.getBoundingClientRect(),l=1,u=1;return s.offsetWidth&&(l=a.width/s.offsetWidth),s.offsetHeight&&(u=a.height/s.offsetHeight),(!Number.isFinite(l)||l===0)&&(l=1),(!Number.isFinite(u)||u===0)&&(u=1),Math.abs(l-1)<.01&&(l=1),Math.abs(u-1)<.01&&(u=1),i.transform=i.webkitTransform=`translate(${o/l}px,${r/u}px)`,i.transitionDuration="0s",e}}function Ni(e,t){let n=e.getBoundingClientRect();return{left:n.left-(t?t.left:0),top:n.top-(t?t.top:0)}}function vv(e){let t;for(let n=e.parent;n;n=n.parent){let o=Dl.get(n);if(o){let r=_v(n.vnode.el,e.vnode.el);r&&(t||(t=[])).push(q(Ni(r),{item:r,willMove:o}))}}return t}function _v(e,t){let n=e.nodeType===1?e:e.parentNode;for(;t&&t.parentNode!==n;)t=t.parentNode;if(t&&t.nodeType===1)return t}function yv(e,t){let n=e.find(o=>o.willMove()&&o.item.contains(t));return n&&Ni(n.item,n)}function bv(e,t,n){let o=e.cloneNode(),r=e[Ro];r&&r.forEach(a=>{a.split(/\s+/).forEach(l=>l&&o.classList.remove(l))}),n.split(/\s+/).forEach(a=>a&&o.classList.add(a)),o.style.display="none";let s=t.nodeType===1?t:t.parentNode;s.appendChild(o);let{hasTransform:i}=Tp(o);return s.removeChild(o),i}var kn=e=>{let t=e.props["onUpdate:modelValue"]||!1;return H(t)?n=>xn(t,n):t};function Nv(e){e.target.composing=!0}function mp(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}var Et=Symbol("_assign"),mi=Symbol("_initialValue");function Tl(e,t,n){return t&&(e=e.trim()),n&&(e=Hn(e)),e}var bi={created(e,{modifiers:{lazy:t,trim:n,number:o}},r){e.parentNode&&(e.type==="text"?e[mi]=e.defaultValue.replace(/[\r\n]/g,""):e.type==="textarea"&&(e[mi]=e.defaultValue.replace(/\r\n?/g,`
`))),e[Et]=kn(r);let s=o||r.props&&r.props.type==="number";mn(e,t?"change":"input",i=>{i.target.composing||e[Et](Tl(e.value,n,s))}),(n||s)&&mn(e,"change",()=>{e.value=Tl(e.value,n,s)}),t||(mn(e,"compositionstart",Nv),mn(e,"compositionend",mp),mn(e,"change",mp))},mounted(e,{value:t,modifiers:{trim:n,number:o}}){let r=t??"",s=e[mi];delete e[mi],s!==void 0&&(e.type==="text"||e.type==="textarea")&&e.value!==s?e[Et](Tl(e.value,n,o)):e.value=r},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:o,trim:r,number:s}},i){if(e[Et]=kn(i),e.composing)return;let a=(s||e.type==="number")&&!/^0\d/.test(e.value)?Hn(e.value):e.value,l=t??"";if(a===l)return;let u=e.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===e&&e.type!=="range"&&(o&&t===n||r&&e.value.trim()===l)||(e.value=l)}},kl={deep:!0,created(e,t,n){e[Et]=kn(n),mn(e,"change",()=>{let o=e._modelValue,r=Mo(e),s=e.checked,i=e[Et];if(H(o)){let a=rr(o,r),l=a!==-1;if(s&&!l)i(o.concat(r));else if(!s&&l){let u=[...o];u.splice(a,1),i(u)}}else if(bt(o)){let a=new Set(o);s?a.add(r):a.delete(r),i(a)}else i(Pp(e,s))})},mounted:gp,beforeUpdate(e,t,n){e[Et]=kn(n),gp(e,t,n)}};function gp(e,{value:t,oldValue:n},o){e._modelValue=t;let r;if(H(t))r=rr(t,o.props.value)>-1;else if(bt(t))r=t.has(o.props.value);else{if(t===n)return;r=ot(t,Pp(e,!0))}e.checked!==r&&(e.checked=r)}var Vl={created(e,{value:t},n){e.checked=ot(t,n.props.value),e[Et]=kn(n),mn(e,"change",()=>{e[Et](Mo(e))})},beforeUpdate(e,{value:t,oldValue:n},o){e[Et]=kn(o),t!==n&&(e.checked=ot(t,o.props.value))}},Rp={deep:!0,created(e,{value:t,modifiers:{number:n}},o){e._modelValue=t,mn(e,"change",()=>{let r=Array.prototype.filter.call(e.options,l=>l.selected).map(l=>n?Hn(Mo(l)):Mo(l)),s=e.multiple,i=s?bt(e._modelValue)?new Set(r):r:r[0],a=e._pendingValue=[s,s?H(i)?r.slice():r:i];try{e[Et](i)}finally{Tr(()=>{e._pendingValue===a&&(e._pendingValue=void 0)})}}),e[Et]=kn(o)},mounted(e,{value:t,modifiers:{number:n}}){Ep(e,t,n)},beforeUpdate(e,{value:t},n){e._modelValue=t,e[Et]=kn(n)},updated(e,{value:t,modifiers:{number:n}}){let o=e._pendingValue;e._pendingValue=void 0,(!o||o[0]!==e.multiple||!Sv(t,o[1],o[0]))&&Ep(e,t,n)}};function Sv(e,t,n){if(!n)return ot(e,t);if(H(e))return ot(e,t);if(bt(e)){if(e.size!==t.length)return!1;for(let o of t)if(!e.has(o))return!1;return!0}return!1}function Ep(e,t,n=!1){let o=e.multiple,r=H(t);if(!(o&&!r&&!bt(t))){for(let s=0,i=e.options.length;s<i;s++){let a=e.options[s],l=Mo(a);if(o)if(r){let u=typeof l;u==="string"||u==="number"?a.selected=t.some(f=>String(f)===String(l)):a.selected=rr(t,l)>-1}else a.selected=t.has(l)||n&&typeof l=="string"&&t.has(Hn(l));else if(ot(Mo(a),t)){e.selectedIndex!==s&&(e.selectedIndex=s);return}}!o&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function Mo(e){return"_value"in e?e._value:e.value}function Pp(e,t){let n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}var Mp={created(e,t,n){gi(e,t,n,null,"created")},mounted(e,t,n){gi(e,t,n,null,"mounted")},beforeUpdate(e,t,n,o){gi(e,t,n,o,"beforeUpdate")},updated(e,t,n,o){gi(e,t,n,o,"updated")}};function Lp(e,t){switch(e){case"SELECT":return Rp;case"TEXTAREA":return bi;default:switch(t){case"checkbox":return kl;case"radio":return Vl;default:return bi}}}function gi(e,t,n,o,r){let i=Lp(e.tagName,n.props&&n.props.type)[r];i&&i(e,t,n,o)}function xv(){bi.getSSRProps=({value:e})=>({value:e}),Vl.getSSRProps=({value:e},t)=>{if(t.props&&ot(t.props.value,e))return{checked:!0}},kl.getSSRProps=({value:e},t)=>{if(H(e)){if(t.props&&rr(e,t.props.value)>-1)return{checked:!0}}else if(bt(e)){if(t.props&&e.has(t.props.value))return{checked:!0}}else if(e)return{checked:!0}},Mp.getSSRProps=(e,t)=>{if(typeof t.type!="string")return;let n=Lp(t.type.toUpperCase(),t.props&&t.props.type);if(n.getSSRProps)return n.getSSRProps(e,t)}}var Tv=["ctrl","shift","alt","meta"],wv={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Tv.some(n=>e[`${n}Key`]&&!t.includes(n))},Ov=(e,t)=>{if(!e)return e;let n=e._withMods||(e._withMods={}),o=t.join(".");return n[o]||(n[o]=((r,...s)=>{for(let i=0;i<t.length;i++){let a=wv[t[i]];if(a&&a(r,t))return}return e(r,...s)}))},Cv={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Av=(e,t)=>{let n=e._withKeys||(e._withKeys={}),o=t.join(".");return n[o]||(n[o]=(r=>{if(!("key"in r))return;let s=Ke(r.key);if(t.some(i=>i===s||Cv[i]===s))return e(r)}))},$p=q({patchProp:Ap},bp),Vr,vp=!1;function Fp(){return Vr||(Vr=ml($p))}function Up(){return Vr=vp?Vr:gl($p),vp=!0,Vr}var Bp=((...e)=>{Fp().render(...e)}),Dv=((...e)=>{Up().hydrate(...e)}),Rr=((...e)=>{let t=Fp().createApp(...e),{mount:n}=t;return t.mount=o=>{let r=Wp(o);if(!r)return;let s=t._component;!Z(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");let i=n(r,!1,jp(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),i},t}),Hp=((...e)=>{let t=Up().createApp(...e),{mount:n}=t;return t.mount=o=>{let r=Wp(o);if(r)return n(r,!0,jp(r))},t});function jp(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Wp(e){return z(e)?document.querySelector(e):e}var _p=!1,Iv=()=>{_p||(_p=!0,xv(),KE())};var Lr=Symbol(""),Mr=Symbol(""),Xl=Symbol(""),Ai=Symbol(""),ld=Symbol(""),co=Symbol(""),cd=Symbol(""),ud=Symbol(""),zl=Symbol(""),Gl=Symbol(""),Hr=Symbol(""),ql=Symbol(""),fd=Symbol(""),Jl=Symbol(""),Yl=Symbol(""),Ql=Symbol(""),Zl=Symbol(""),ec=Symbol(""),tc=Symbol(""),pd=Symbol(""),dd=Symbol(""),jr=Symbol(""),Di=Symbol(""),nc=Symbol(""),oc=Symbol(""),$r=Symbol(""),Wr=Symbol(""),rc=Symbol(""),Ll=Symbol(""),kv=Symbol(""),$l=Symbol(""),Ii=Symbol(""),Vv=Symbol(""),Rv=Symbol(""),sc=Symbol(""),Pv=Symbol(""),Mv=Symbol(""),ic=Symbol(""),hd=Symbol(""),Lo={[Lr]:"Fragment",[Mr]:"Teleport",[Xl]:"Suspense",[Ai]:"KeepAlive",[ld]:"BaseTransition",[co]:"openBlock",[cd]:"createBlock",[ud]:"createElementBlock",[zl]:"createVNode",[Gl]:"createElementVNode",[Hr]:"createCommentVNode",[ql]:"createTextVNode",[fd]:"createStaticVNode",[Jl]:"resolveComponent",[Yl]:"resolveDynamicComponent",[Ql]:"resolveDirective",[Zl]:"resolveFilter",[ec]:"withDirectives",[tc]:"renderList",[pd]:"renderSlot",[dd]:"createSlots",[jr]:"toDisplayString",[Di]:"mergeProps",[nc]:"normalizeClass",[oc]:"normalizeStyle",[$r]:"normalizeProps",[Wr]:"guardReactiveProps",[rc]:"toHandlers",[Ll]:"camelize",[kv]:"capitalize",[$l]:"toHandlerKey",[Ii]:"setBlockTracking",[Vv]:"pushScopeId",[Rv]:"popScopeId",[sc]:"withCtx",[Pv]:"unref",[Mv]:"isRef",[ic]:"withMemo",[hd]:"isMemoSame"};function md(e){Object.getOwnPropertySymbols(e).forEach(t=>{Lo[t]=e[t]})}var _t={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function Lv(e,t=""){return{type:0,source:t,children:e,helpers:new Set,components:[],directives:[],hoists:[],imports:[],cached:[],temps:0,codegenNode:void 0,loc:_t}}function Fr(e,t,n,o,r,s,i,a=!1,l=!1,u=!1,f=_t){return e&&(a?(e.helper(co),e.helper(Uo(e.inSSR,u))):e.helper(Fo(e.inSSR,u)),i&&e.helper(ec)),{type:13,tag:t,props:n,children:o,patchFlag:r,dynamicProps:s,directives:i,isBlock:a,disableTracking:l,isComponent:u,loc:f}}function ao(e,t=_t){return{type:17,loc:t,elements:e}}function Ct(e,t=_t){return{type:15,loc:t,properties:e}}function Oe(e,t){return{type:16,loc:_t,key:z(e)?J(e,!0):e,value:t}}function J(e,t=!1,n=_t,o=0){return{type:4,loc:n,content:e,isStatic:t,constType:t?3:o}}function At(e,t=_t){return{type:8,loc:t,children:e}}function Pe(e,t=[],n=_t){return{type:14,loc:n,callee:e,arguments:t}}function $o(e,t=void 0,n=!1,o=!1,r=_t){return{type:18,params:e,returns:t,newline:n,isSlot:o,loc:r}}function Fl(e,t,n,o=!0){return{type:19,test:e,consequent:t,alternate:n,newline:o,loc:_t}}function $v(e,t,n=!1,o=!1){return{type:20,index:e,value:t,needPauseTracking:n,inVOnce:o,needArraySpread:!1,loc:_t}}function Fv(e){return{type:21,body:e,loc:_t}}function Fo(e,t){return e||t?zl:Gl}function Uo(e,t){return e||t?cd:ud}function ac(e,{helper:t,removeHelper:n,inSSR:o}){e.isBlock||(e.isBlock=!0,n(Fo(o,e.isComponent)),t(co),t(Uo(o,e.isComponent)))}var Kp=new Uint8Array([123,123]),Xp=new Uint8Array([125,125]);function zp(e){return e>=97&&e<=122||e>=65&&e<=90}function vt(e){return e===32||e===10||e===9||e===12||e===13}function Vn(e){return e===47||e===62||vt(e)}function ki(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}var Ge={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])},Ul=class{constructor(t,n){this.stack=t,this.cbs=n,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=Kp,this.delimiterClose=Xp,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0}get inSFCRoot(){return this.mode===2&&this.stack.length===0}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=Kp,this.delimiterClose=Xp}getPos(t){let n=1,o=t+1,r=this.newlines.length,s=-1;if(r>100){let i=-1,a=r;for(;i+1<a;){let l=i+a>>>1;this.newlines[l]<t?i=l:a=l}s=i}else for(let i=r-1;i>=0;i--)if(t>this.newlines[i]){s=i;break}return s>=0&&(n=s+2,o=t-this.newlines[s]),{column:o,line:n,offset:t}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(t){t===60?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t))}stateInterpolationOpen(t){if(t===this.delimiterOpen[this.delimiterIndex])if(this.delimiterIndex===this.delimiterOpen.length-1){let n=this.index+1-this.delimiterOpen.length;n>this.sectionStart&&this.cbs.ontext(this.sectionStart,n),this.state=3,this.sectionStart=n}else this.delimiterIndex++;else this.inRCDATA?(this.state=32,this.stateInRCDATA(t)):(this.state=1,this.stateText(t))}stateInterpolation(t){t===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(t))}stateInterpolationClose(t){t===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(t))}stateSpecialStartSequence(t){let n=this.sequenceIndex===this.currentSequence.length;if(!(n?Vn(t):(t|32)===this.currentSequence[this.sequenceIndex]))this.inRCDATA=!1;else if(!n){this.sequenceIndex++;return}this.sequenceIndex=0,this.state=6,this.stateInTagName(t)}stateInRCDATA(t){if(this.sequenceIndex===this.currentSequence.length){if(t===62||vt(t)){let n=this.index-this.currentSequence.length;if(this.sectionStart<n){let o=this.index;this.index=n,this.cbs.ontext(this.sectionStart,n),this.index=o}this.sectionStart=n+2,this.stateInClosingTagName(t),this.inRCDATA=!1;return}this.sequenceIndex=0}(t|32)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:this.sequenceIndex===0?this.currentSequence===Ge.TitleEnd||this.currentSequence===Ge.TextareaEnd&&!this.inSFCRoot?!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t)):this.fastForwardTo(60)&&(this.sequenceIndex=1):this.sequenceIndex=+(t===60)}stateCDATASequence(t){t===Ge.Cdata[this.sequenceIndex]?++this.sequenceIndex===Ge.Cdata.length&&(this.state=28,this.currentSequence=Ge.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(t))}fastForwardTo(t){for(;++this.index<this.buffer.length;){let n=this.buffer.charCodeAt(this.index);if(n===10&&this.newlines.push(this.index),n===t)return!0}return this.index=this.buffer.length-1,!1}stateInCommentLike(t){t===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===Ge.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):this.sequenceIndex===0?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):t!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0)}startSpecial(t,n){this.enterRCDATA(t,n),this.state=31}enterRCDATA(t,n){this.inRCDATA=!0,this.currentSequence=t,this.sequenceIndex=n}stateBeforeTagName(t){t===33?(this.state=22,this.sectionStart=this.index+1):t===63?(this.state=24,this.sectionStart=this.index+1):zp(t)?(this.sectionStart=this.index,this.mode===0?this.state=6:this.inSFCRoot?this.state=34:this.inXML?this.state=6:t===116?this.state=30:this.state=t===115?29:6):t===47?this.state=8:(this.state=1,this.stateText(t))}stateInTagName(t){Vn(t)&&this.handleTagName(t)}stateInSFCRootTagName(t){if(Vn(t)){let n=this.buffer.slice(this.sectionStart,this.index);n!=="template"&&this.enterRCDATA(ki("</"+n),0),this.handleTagName(t)}}handleTagName(t){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)}stateBeforeClosingTagName(t){vt(t)||(t===62?(this.state=1,this.sectionStart=this.index+1):(this.state=zp(t)?9:27,this.sectionStart=this.index))}stateInClosingTagName(t){(t===62||vt(t))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(t))}stateAfterClosingTagName(t){t===62&&(this.state=1,this.sectionStart=this.index+1)}stateBeforeAttrName(t){t===62?(this.cbs.onopentagend(this.index),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):t===47?this.state=7:t===60&&this.peek()===47?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):vt(t)||this.handleAttrStart(t)}handleAttrStart(t){t===118&&this.peek()===45?(this.state=13,this.sectionStart=this.index):t===46||t===58||t===64||t===35?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index)}stateInSelfClosingTag(t){t===62?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):vt(t)||(this.state=11,this.stateBeforeAttrName(t))}stateInAttrName(t){(t===61||Vn(t))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(t))}stateInDirName(t){t===61||Vn(t)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===58?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):t===46&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDirArg(t){t===61||Vn(t)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===91?this.state=15:t===46&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDynamicDirArg(t){t===93?this.state=14:(t===61||Vn(t))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(t))}stateInDirModifier(t){t===61||Vn(t)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===46&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1)}handleAttrNameEnd(t){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(t)}stateAfterAttrName(t){t===61?this.state=18:t===47||t===62?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)):vt(t)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(t))}stateBeforeAttrValue(t){t===34?(this.state=19,this.sectionStart=this.index+1):t===39?(this.state=20,this.sectionStart=this.index+1):vt(t)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(t))}handleInAttrValue(t,n){(t===n||this.fastForwardTo(n))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(n===34?3:2,this.index+1),this.state=11)}stateInAttrValueDoubleQuotes(t){this.handleInAttrValue(t,34)}stateInAttrValueSingleQuotes(t){this.handleInAttrValue(t,39)}stateInAttrValueNoQuotes(t){vt(t)||t===62?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(t)):(t===39||t===60||t===61||t===96)&&this.cbs.onerr(18,this.index)}stateBeforeDeclaration(t){t===91?(this.state=26,this.sequenceIndex=0):this.state=t===45?25:23}stateInDeclaration(t){(t===62||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1)}stateInProcessingInstruction(t){(t===62||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeComment(t){t===45?(this.state=28,this.currentSequence=Ge.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23}stateInSpecialComment(t){(t===62||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeSpecialS(t){t===Ge.ScriptEnd[3]?this.startSpecial(Ge.ScriptEnd,4):t===Ge.StyleEnd[3]?this.startSpecial(Ge.StyleEnd,4):(this.state=6,this.stateInTagName(t))}stateBeforeSpecialT(t){t===Ge.TitleEnd[3]?this.startSpecial(Ge.TitleEnd,4):t===Ge.TextareaEnd[3]?this.startSpecial(Ge.TextareaEnd,4):(this.state=6,this.stateInTagName(t))}startEntity(){}stateInEntity(){}parse(t){for(this.buffer=t;this.index<this.buffer.length;){let n=this.buffer.charCodeAt(this.index);switch(n===10&&this.state!==33&&this.newlines.push(this.index),this.state){case 1:{this.stateText(n);break}case 2:{this.stateInterpolationOpen(n);break}case 3:{this.stateInterpolation(n);break}case 4:{this.stateInterpolationClose(n);break}case 31:{this.stateSpecialStartSequence(n);break}case 32:{this.stateInRCDATA(n);break}case 26:{this.stateCDATASequence(n);break}case 19:{this.stateInAttrValueDoubleQuotes(n);break}case 12:{this.stateInAttrName(n);break}case 13:{this.stateInDirName(n);break}case 14:{this.stateInDirArg(n);break}case 15:{this.stateInDynamicDirArg(n);break}case 16:{this.stateInDirModifier(n);break}case 28:{this.stateInCommentLike(n);break}case 27:{this.stateInSpecialComment(n);break}case 11:{this.stateBeforeAttrName(n);break}case 6:{this.stateInTagName(n);break}case 34:{this.stateInSFCRootTagName(n);break}case 9:{this.stateInClosingTagName(n);break}case 5:{this.stateBeforeTagName(n);break}case 17:{this.stateAfterAttrName(n);break}case 20:{this.stateInAttrValueSingleQuotes(n);break}case 18:{this.stateBeforeAttrValue(n);break}case 8:{this.stateBeforeClosingTagName(n);break}case 10:{this.stateAfterClosingTagName(n);break}case 29:{this.stateBeforeSpecialS(n);break}case 30:{this.stateBeforeSpecialT(n);break}case 21:{this.stateInAttrValueNoQuotes(n);break}case 7:{this.stateInSelfClosingTag(n);break}case 23:{this.stateInDeclaration(n);break}case 22:{this.stateBeforeDeclaration(n);break}case 25:{this.stateBeforeComment(n);break}case 24:{this.stateInProcessingInstruction(n);break}case 33:{this.stateInEntity();break}}this.index++}this.cleanup(),this.finish()}cleanup(){this.sectionStart!==this.index&&(this.state===1||this.state===32&&this.sequenceIndex===0?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):(this.state===19||this.state===20||this.state===21)&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index))}finish(){this.handleTrailingData(),this.cbs.onend()}handleTrailingData(){let t=this.buffer.length;this.sectionStart>=t||(this.state===28?this.currentSequence===Ge.CdataEnd?this.cbs.oncdata(this.sectionStart,t):this.cbs.oncomment(this.sectionStart,t):this.state===6||this.state===11||this.state===18||this.state===17||this.state===12||this.state===13||this.state===14||this.state===15||this.state===16||this.state===20||this.state===19||this.state===21||this.state===9||this.cbs.ontext(this.sectionStart,t))}emitCodePoint(t,n){}};function Gp(e,{compatConfig:t}){let n=t&&t[e];return e==="MODE"?n||3:n}function lo(e,t){let n=Gp("MODE",t),o=Gp(e,t);return n===3?o===!0:o!==!1}function Bo(e,t,n,...o){return lo(e,t)}function lc(e){throw e}function gd(e){}function _e(e,t,n,o){let r=`https://vuejs.org/error-reference/#compiler-${e}`,s=new SyntaxError(String(r));return s.code=e,s.loc=t,s}var Je=e=>e.type===4&&e.isStatic;function Ed(e){switch(e){case"Teleport":case"teleport":return Mr;case"Suspense":case"suspense":return Xl;case"KeepAlive":case"keep-alive":return Ai;case"BaseTransition":case"base-transition":return ld}}var Uv=/^$|^\d|[^\$\w\xA0-\uFFFF]/,cc=e=>!Uv.test(e),vd=/[A-Za-z_$\xA0-\uFFFF]/,Bv=/[\.\?\w$\xA0-\uFFFF]/,Hv=/\s+[.[]\s*|\s*[.[]\s+/g,_d=e=>e.type===4?e.content:e.loc.source,jv=e=>{let t=_d(e).trim().replace(Hv,a=>a.trim()),n=0,o=[],r=0,s=0,i=null;for(let a=0;a<t.length;a++){let l=t.charAt(a);switch(n){case 0:if(l==="[")o.push(n),n=1,r++;else if(l==="(")o.push(n),n=2,s++;else if(!(a===0?vd:Bv).test(l))return!1;break;case 1:l==="'"||l==='"'||l==="`"?(o.push(n),n=3,i=l):l==="["?r++:l==="]"&&(--r||(n=o.pop()));break;case 2:if(l==="'"||l==='"'||l==="`")o.push(n),n=3,i=l;else if(l==="(")s++;else if(l===")"){if(a===t.length-1)return!1;--s||(n=o.pop())}break;case 3:l===i&&(n=o.pop(),i=null);break}}return!r&&!s};var yd=jv,Wv=/^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/,Kv=e=>Wv.test(_d(e));var Xv=Kv;function lt(e,t,n=!1){for(let o=0;o<e.props.length;o++){let r=e.props[o];if(r.type===7&&(n||r.exp)&&(z(t)?r.name===t:t.test(r.name)))return r}}function Kr(e,t,n=!1,o=!1){for(let r=0;r<e.props.length;r++){let s=e.props[r];if(s.type===6){if(n)continue;if(s.name===t&&(s.value||o))return s}else if(s.name==="bind"&&(s.exp||o)&&Pn(s.arg,t))return s}}function Pn(e,t){return!!(e&&Je(e)&&e.content===t)}function bd(e){return e.props.some(t=>t.type===7&&t.name==="bind"&&(!t.arg||t.arg.type!==4||!t.arg.isStatic))}function Pl(e){return e.type===5||e.type===2}function qp(e){return e.type===7&&e.name==="pre"}function zv(e){return e.type===7&&e.name==="slot"}function Vi(e){return e.type===1&&e.tagType===3}function Ri(e){return e.type===1&&e.tagType===2}var Gv=new Set([$r,Wr]);function uc(e,t=[]){if(e&&!z(e)&&e.type===14){let n=e.callee;if(!z(n)&&Gv.has(n))return uc(e.arguments[0],t.concat(e))}return[e,t]}function Pi(e,t,n){if(e.type!==13&&qv(e,t))return;let o,r=e.type===13?e.props:e.arguments[2],s=[],i;if(r&&!z(r)&&r.type===14){let a=uc(r);r=a[0],s=a[1],i=s[s.length-1]}if(r==null||z(r))o=Ct([t]);else if(r.type===14){let a=r.arguments[0];!z(a)&&a.type===15?Bl(t,a)||a.properties.unshift(t):r.callee===rc?o=Pe(n.helper(Di),[Ct([t]),r]):r.arguments.unshift(Ct([t])),!o&&(o=r)}else r.type===15?(Bl(t,r)||r.properties.unshift(t),o=r):(o=Pe(n.helper(Di),[Ct([t]),r]),i&&i.callee===Wr&&(i=s[s.length-2]));e.type===13?i?i.arguments[0]=o:e.props=o:i?i.arguments[0]=o:e.arguments[2]=o}function qv(e,t){var n,o,r;if(t.key.type!==4||t.key.content!=="key")return!1;let s=e.arguments[2];if(s&&!z(s)){let[i]=uc(s);if(i&&!z(i)&&i.type===15&&Bl(t,i))return!0}return(n=e.arguments)[2]||(n[2]="{}"),(o=e.arguments)[3]||(o[3]="undefined"),(r=e.arguments)[4]||(r[4]="undefined"),e.arguments[5]=t.value,!0}function Bl(e,t){let n=!1;if(e.key.type===4){let o=e.key.content;n=t.properties.some(r=>r.key.type===4&&r.key.content===o)}return n}function Ur(e,t){return`_${t}_${e.replace(/[^\w]/g,(n,o)=>n==="-"?"_":e.charCodeAt(o).toString())}`}function Jv(e){return e.type===14&&e.callee===ic?e.arguments[1].returns:e}var Yv=/([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;function Nd(e){for(let t=0;t<e.length;t++)if(!vt(e.charCodeAt(t)))return!1;return!0}function fc(e){return e.type===2&&Nd(e.content)||e.type===12&&fc(e.content)}function Li(e){return e.type===3||fc(e)}var Sd={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:Sn,isPreTag:Sn,isIgnoreNewlineTag:Sn,isCustomElement:Sn,onError:lc,onWarn:gd,comments:!1,prefixIdentifiers:!1},ue=Sd,Br=null,vn="",qe=null,ne=null,at="",En=-1,so=-1,pc=0,Rn=!1,Hl=null,be=[],Te=new Ul(be,{onerr:gn,ontext(e,t){Si(We(e,t),e,t)},ontextentity(e,t,n){Si(e,t,n)},oninterpolation(e,t){if(Rn)return Si(We(e,t),e,t);let n=e+Te.delimiterOpen.length,o=t-Te.delimiterClose.length;for(;vt(vn.charCodeAt(n));)n++;for(;vt(vn.charCodeAt(o-1));)o--;let r=We(n,o);r.includes("&")&&(r=ue.decodeEntities(r,!1)),jl({type:5,content:wi(r,!1,Re(n,o)),loc:Re(e,t)})},onopentagname(e,t){let n=We(e,t);qe={type:1,tag:n,ns:ue.getNamespace(n,be[0],ue.ns),tagType:0,props:[],children:[],loc:Re(e-1,t),codegenNode:void 0}},onopentagend(e){Yp(e)},onclosetag(e,t){let n=We(e,t);if(!ue.isVoidTag(n)){let o=!1;for(let r=0;r<be.length;r++)if(be[r].tag.toLowerCase()===n.toLowerCase()){o=!0,r>0&&gn(24,be[0].loc.start.offset);for(let i=0;i<=r;i++){let a=be.shift();Ti(a,t,i<r)}break}o||gn(23,xd(e,60))}},onselfclosingtag(e){let t=qe.tag;qe.isSelfClosing=!0,Yp(e),be[0]&&be[0].tag===t&&Ti(be.shift(),e)},onattribname(e,t){ne={type:6,name:We(e,t),nameLoc:Re(e,t),value:void 0,loc:Re(e)}},ondirname(e,t){let n=We(e,t),o=n==="."||n===":"?"bind":n==="@"?"on":n==="#"?"slot":n.slice(2);if(!Rn&&o===""&&gn(26,e),Rn||o==="")ne={type:6,name:n,nameLoc:Re(e,t),value:void 0,loc:Re(e)};else if(ne={type:7,name:o,rawName:n,exp:void 0,arg:void 0,modifiers:n==="."?[J("prop")]:[],loc:Re(e)},o==="pre"){Rn=Te.inVPre=!0,Hl=qe;let r=qe.props;for(let s=0;s<r.length;s++)r[s].type===7&&(r[s]=a_(r[s]))}},ondirarg(e,t){if(e===t)return;let n=We(e,t);if(Rn&&!qp(ne))ne.name+=n,io(ne.nameLoc,t);else{let o=n[0]!=="[";ne.arg=wi(o?n:n.slice(1,-1),o,Re(e,t),o?3:0)}},ondirmodifier(e,t){let n=We(e,t);if(Rn&&!qp(ne))ne.name+="."+n,io(ne.nameLoc,t);else if(ne.name==="slot"){let o=ne.arg;o&&(o.content+="."+n,io(o.loc,t))}else{let o=J(n,!0,Re(e,t));ne.modifiers.push(o)}},onattribdata(e,t){at+=We(e,t),En<0&&(En=e),so=t},onattribentity(e,t,n){at+=e,En<0&&(En=t),so=n},onattribnameend(e){let t=ne.loc.start.offset,n=We(t,e);ne.type===7&&(ne.rawName=n),qe.props.some(o=>(o.type===7?o.rawName:o.name)===n)&&gn(2,t)},onattribend(e,t){if(qe&&ne){if(io(ne.loc,t),e!==0)if(at.includes("&")&&(at=ue.decodeEntities(at,!0)),ne.type===6)ne.name==="class"&&(at=wd(at).trim()),e===1&&!at&&gn(13,t),ne.value={type:2,content:at,loc:e===1?Re(En,so):Re(En-1,so+1)},Te.inSFCRoot&&qe.tag==="template"&&ne.name==="lang"&&at&&at!=="html"&&Te.enterRCDATA(ki("</template"),0);else{let n=0;ne.exp=wi(at,!1,Re(En,so),0,n),ne.name==="for"&&(ne.forParseResult=Zv(ne.exp));let o=-1;ne.name==="bind"&&(o=ne.modifiers.findIndex(r=>r.content==="sync"))>-1&&Bo("COMPILER_V_BIND_SYNC",ue,ne.loc,ne.arg.loc.source)&&(ne.name="model",ne.modifiers.splice(o,1))}(ne.type!==7||ne.name!=="pre")&&qe.props.push(ne)}at="",En=so=-1},oncomment(e,t){ue.comments&&jl({type:3,content:We(e,t),loc:Re(e-4,t+3)})},onend(){let e=vn.length;for(let t=0;t<be.length;t++)Ti(be[t],e-1),gn(24,be[t].loc.start.offset)},oncdata(e,t){(be[0]?be[0].ns:ue.ns)!==0?Si(We(e,t),e,t):gn(1,e-9)},onprocessinginstruction(e){(be[0]?be[0].ns:ue.ns)===0&&gn(21,e-1)}}),Jp=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,Qv=/^\(|\)$/g;function Zv(e){let t=e.loc,n=e.content,o=n.match(Yv);if(!o)return;let[,r,s]=o,i=(c,p,d=!1)=>{let v=t.start.offset+p,m=v+c.length;return wi(c,!1,Re(v,m),0,d?1:0)},a={source:i(s.trim(),n.indexOf(s,r.length)),value:void 0,key:void 0,index:void 0,finalized:!1},l=r.trim().replace(Qv,"").trim(),u=r.indexOf(l),f=l.match(Jp);if(f){l=l.replace(Jp,"").trim();let c=f[1].trim(),p;if(c&&(p=n.indexOf(c,u+l.length),a.key=i(c,p,!0)),f[2]){let d=f[2].trim();d&&(a.index=i(d,n.indexOf(d,a.key?p+c.length:u+l.length),!0))}}return l&&(a.value=i(l,u,!0)),a}function We(e,t){return vn.slice(e,t)}function Yp(e){Te.inSFCRoot&&(qe.innerLoc=Re(e+1,e+1)),jl(qe);let{tag:t,ns:n}=qe;n===0&&ue.isPreTag(t)&&pc++,ue.isVoidTag(t)?Ti(qe,e):(be.unshift(qe),(n===1||n===2)&&(Te.inXML=!0)),qe=null}function Si(e,t,n){{let s=be[0]&&be[0].tag;s!=="script"&&s!=="style"&&e.includes("&")&&(e=ue.decodeEntities(e,!1))}let o=be[0]||Br,r=o.children[o.children.length-1];r&&r.type===2?(r.content+=e,io(r.loc,n)):o.children.push({type:2,content:e,loc:Re(t,n)})}function Ti(e,t,n=!1){n?io(e.loc,xd(t,60)):io(e.loc,e_(t,62)+1),Te.inSFCRoot&&(e.children.length?e.innerLoc.end=q({},e.children[e.children.length-1].loc.end):e.innerLoc.end=q({},e.innerLoc.start),e.innerLoc.source=We(e.innerLoc.start.offset,e.innerLoc.end.offset));let{tag:o,ns:r,children:s}=e;if(Rn||(o==="slot"?e.tagType=2:Qp(e)?e.tagType=3:n_(e)&&(e.tagType=1)),Te.inRCDATA||(e.children=Td(s)),r===0&&ue.isIgnoreNewlineTag(o)){let i=s[0];i&&i.type===2&&(i.content=i.content.replace(/^\r?\n/,""))}r===0&&ue.isPreTag(o)&&pc--,Hl===e&&(Rn=Te.inVPre=!1,Hl=null),Te.inXML&&(be[0]?be[0].ns:ue.ns)===0&&(Te.inXML=!1);{let i=e.props;if(!Te.inSFCRoot&&lo("COMPILER_NATIVE_TEMPLATE",ue)&&e.tag==="template"&&!Qp(e)){let l=be[0]||Br,u=l.children.indexOf(e);l.children.splice(u,1,...e.children)}let a=i.find(l=>l.type===6&&l.name==="inline-template");a&&Bo("COMPILER_INLINE_TEMPLATE",ue,a.loc)&&e.children.length&&(a.value={type:2,content:We(e.children[0].loc.start.offset,e.children[e.children.length-1].loc.end.offset),loc:a.loc})}}function e_(e,t){let n=e;for(;vn.charCodeAt(n)!==t&&n<vn.length-1;)n++;return n}function xd(e,t){let n=e;for(;vn.charCodeAt(n)!==t&&n>=0;)n--;return n}var t_=new Set(["if","else","else-if","for","slot"]);function Qp({tag:e,props:t}){if(e==="template"){for(let n=0;n<t.length;n++)if(t[n].type===7&&t_.has(t[n].name))return!0}return!1}function n_({tag:e,props:t}){if(ue.isCustomElement(e))return!1;if(e==="component"||o_(e.charCodeAt(0))||Ed(e)||ue.isBuiltInComponent&&ue.isBuiltInComponent(e)||ue.isNativeTag&&!ue.isNativeTag(e))return!0;for(let n=0;n<t.length;n++){let o=t[n];if(o.type===6){if(o.name==="is"&&o.value){if(o.value.content.startsWith("vue:"))return!0;if(Bo("COMPILER_IS_ON_ELEMENT",ue,o.loc))return!0}}else if(o.name==="bind"&&Pn(o.arg,"is")&&Bo("COMPILER_IS_ON_ELEMENT",ue,o.loc))return!0}return!1}function o_(e){return e>64&&e<91}var r_=/\r\n/g;function Td(e){let t=ue.whitespace!=="preserve",n=!1;for(let o=0;o<e.length;o++){let r=e[o];if(r.type===2)if(pc)r.content=r.content.replace(r_,`
`);else if(Nd(r.content)){let s=e[o-1]&&e[o-1].type,i=e[o+1]&&e[o+1].type;!s||!i||t&&(s===3&&(i===3||i===1)||s===1&&(i===3||i===1&&s_(r.content)))?(n=!0,e[o]=null):r.content=" "}else t&&(r.content=wd(r.content))}return n?e.filter(Boolean):e}function s_(e){for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(n===10||n===13)return!0}return!1}function wd(e){let t="",n=!1;for(let o=0;o<e.length;o++)vt(e.charCodeAt(o))?n||(t+=" ",n=!0):(t+=e[o],n=!1);return t}function jl(e){(be[0]||Br).children.push(e)}function Re(e,t){return{start:Te.getPos(e),end:t==null?t:Te.getPos(t),source:t==null?t:We(e,t)}}function i_(e){return{start:q({},e.start),end:q({},e.end),source:e.source}}function io(e,t){e.end=Te.getPos(t),e.source=We(e.start.offset,t)}function a_(e){let t={type:6,name:e.rawName,nameLoc:Re(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){let n=e.exp.loc;n.end.offset<e.loc.end.offset&&(n.start.offset--,n.start.column--,n.end.offset++,n.end.column++),t.value={type:2,content:e.exp.content,loc:n}}return t}function wi(e,t=!1,n,o=0,r=0){return J(e,t,n,o)}function gn(e,t,n){ue.onError(_e(e,Re(t,t),void 0,n))}function l_(){Te.reset(),qe=null,ne=null,at="",En=-1,so=-1,be.length=0}function Od(e,t){if(l_(),vn=e,ue=q({},Sd),t){let r;for(r in t)t[r]!=null&&(ue[r]=t[r])}Te.mode=ue.parseMode==="html"?1:ue.parseMode==="sfc"?2:0,Te.inXML=ue.ns===1||ue.ns===2;let n=t&&t.delimiters;n&&(Te.delimiterOpen=ki(n[0]),Te.delimiterClose=ki(n[1]));let o=Br=Lv([],e);return Te.parse(vn),o.loc=Re(0,e.length),o.children=Td(o.children),Br=null,o}function c_(e,t){Oi(e,void 0,t,!!Cd(e))}function Cd(e){let t=e.children.filter(n=>n.type!==3);return t.length===1&&t[0].type===1&&!Ri(t[0])?t[0]:null}function Oi(e,t,n,o=!1,r=!1){let{children:s}=e,i=[];for(let f=0;f<s.length;f++){let c=s[f];if(c.type===1&&c.tagType===0){let p=o?0:ct(c,n);if(p>0){if(p>=2){c.codegenNode.patchFlag=-1,i.push(c);continue}}else{let d=c.codegenNode;if(d.type===13){let v=d.patchFlag;if((v===void 0||v===512||v===1)&&Dd(c,n)>=2){let m=Id(c);m&&(d.props=n.hoist(m))}d.dynamicProps&&(d.dynamicProps=n.hoist(d.dynamicProps))}}}else if(c.type===12&&(o?0:ct(c,n))>=2){c.codegenNode.type===14&&c.codegenNode.arguments.length>0&&c.codegenNode.arguments.push("-1"),i.push(c);continue}if(c.type===1){let p=c.tagType===1;p&&n.scopes.vSlot++,Oi(c,e,n,!1,r),p&&n.scopes.vSlot--}else if(c.type===11)Oi(c,e,n,c.children.length===1,!0);else if(c.type===9)for(let p=0;p<c.branches.length;p++)Oi(c.branches[p],e,n,c.branches[p].children.length===1,r)}let a=!1;if(i.length===s.length&&e.type===1){if(e.tagType===0&&e.codegenNode&&e.codegenNode.type===13&&H(e.codegenNode.children))e.codegenNode.children=l(ao(e.codegenNode.children)),a=!0;else if(e.tagType===1&&e.codegenNode&&e.codegenNode.type===13&&e.codegenNode.children&&!H(e.codegenNode.children)&&e.codegenNode.children.type===15){let f=u(e.codegenNode,"default");f&&(f.returns=l(ao(f.returns)),a=!0)}else if(e.tagType===3&&t&&t.type===1&&t.tagType===1&&t.codegenNode&&t.codegenNode.type===13&&t.codegenNode.children&&!H(t.codegenNode.children)&&t.codegenNode.children.type===15){let f=lt(e,"slot",!0),c=f&&f.arg&&u(t.codegenNode,f.arg);c&&(c.returns=l(ao(c.returns)),a=!0)}}if(!a)for(let f of i)f.codegenNode=n.cache(f.codegenNode);function l(f){let c=n.cache(f);return c.needArraySpread=!0,c}function u(f,c){if(f.children&&!H(f.children)&&f.children.type===15){let p=f.children.properties.find(d=>d.key===c||d.key.content===c);return p&&p.value}}i.length&&n.transformHoist&&n.transformHoist(s,n,e)}function ct(e,t){let{constantCache:n}=t;switch(e.type){case 1:if(e.tagType!==0)return 0;let o=n.get(e);if(o!==void 0)return o;let r=e.codegenNode;if(r.type!==13||r.isBlock&&e.tag!=="svg"&&e.tag!=="foreignObject"&&e.tag!=="math")return 0;if(r.patchFlag===void 0){let i=3,a=Dd(e,t);if(a===0)return n.set(e,0),0;a<i&&(i=a);for(let l=0;l<e.children.length;l++){let u=ct(e.children[l],t);if(u===0)return n.set(e,0),0;u<i&&(i=u)}if(i>1)for(let l=0;l<e.props.length;l++){let u=e.props[l];if(u.type===7&&u.name==="bind"&&u.exp){let f=ct(u.exp,t);if(f===0)return n.set(e,0),0;f<i&&(i=f)}}if(r.isBlock){for(let l=0;l<e.props.length;l++)if(e.props[l].type===7)return n.set(e,0),0;t.removeHelper(co),t.removeHelper(Uo(t.inSSR,r.isComponent)),r.isBlock=!1,t.helper(Fo(t.inSSR,r.isComponent))}return n.set(e,i),i}else return n.set(e,0),0;case 2:case 3:return 3;case 9:case 11:case 10:return 0;case 5:case 12:return ct(e.content,t);case 4:return e.constType;case 8:let s=3;for(let i=0;i<e.children.length;i++){let a=e.children[i];if(z(a)||Ae(a))continue;let l=ct(a,t);if(l===0)return 0;l<s&&(s=l)}return s;case 20:return 2;default:return 0}}var u_=new Set([nc,oc,$r,Wr]);function Ad(e,t){if(e.type===14&&!z(e.callee)&&u_.has(e.callee)){let n=e.arguments[0];if(n.type===4)return ct(n,t);if(n.type===14)return Ad(n,t)}return 0}function Dd(e,t){let n=3,o=Id(e);if(o&&o.type===15){let{properties:r}=o;for(let s=0;s<r.length;s++){let{key:i,value:a}=r[s],l=ct(i,t);if(l===0)return l;l<n&&(n=l);let u;if(a.type===4?u=ct(a,t):a.type===14?u=Ad(a,t):u=0,u===0)return u;u<n&&(n=u)}}return n}function Id(e){let t=e.codegenNode;if(t.type===13)return t.props}function f_(e,{filename:t="",prefixIdentifiers:n=!1,hoistStatic:o=!1,hmr:r=!1,cacheHandlers:s=!1,nodeTransforms:i=[],directiveTransforms:a={},transformHoist:l=null,isBuiltInComponent:u=De,isCustomElement:f=De,expressionPlugins:c=[],scopeId:p=null,slotted:d=!0,ssr:v=!1,inSSR:m=!1,ssrCssVars:N="",bindingMetadata:C=ee,inline:y=!1,isTS:E=!1,onError:b=lc,onWarn:g=gd,compatConfig:O}){let D=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),S={filename:t,selfName:D&&Nt(le(D[1])),prefixIdentifiers:n,hoistStatic:o,hmr:r,cacheHandlers:s,nodeTransforms:i,directiveTransforms:a,transformHoist:l,isBuiltInComponent:u,isCustomElement:f,expressionPlugins:c,scopeId:p,slotted:d,ssr:v,inSSR:m,ssrCssVars:N,bindingMetadata:C,inline:y,isTS:E,onError:b,onWarn:g,compatConfig:O,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],cached:[],constantCache:new WeakMap,vForMemoKeyedNodes:new WeakSet,temps:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,grandParent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(T){let V=S.helpers.get(T)||0;return S.helpers.set(T,V+1),T},removeHelper(T){let V=S.helpers.get(T);if(V){let M=V-1;M?S.helpers.set(T,M):S.helpers.delete(T)}},helperString(T){return`_${Lo[S.helper(T)]}`},replaceNode(T){S.parent.children[S.childIndex]=S.currentNode=T},removeNode(T){let V=S.parent.children,M=T?V.indexOf(T):S.currentNode?S.childIndex:-1;!T||T===S.currentNode?(S.currentNode=null,S.onNodeRemoved()):S.childIndex>M&&(S.childIndex--,S.onNodeRemoved()),S.parent.children.splice(M,1)},onNodeRemoved:De,addIdentifiers(T){},removeIdentifiers(T){},hoist(T){z(T)&&(T=J(T)),S.hoists.push(T);let V=J(`_hoisted_${S.hoists.length}`,!1,T.loc,2);return V.hoisted=T,V},cache(T,V=!1,M=!1){let w=$v(S.cached.length,T,V,M);return S.cached.push(w),w}};return S.filters=new Set,S}function p_(e,t){let n=f_(e,t);$i(e,n),t.hoistStatic&&c_(e,n),t.ssr||d_(e,n),e.helpers=new Set([...n.helpers.keys()]),e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached,e.transformed=!0,e.filters=[...n.filters]}function d_(e,t){let{helper:n}=t,{children:o}=e;if(o.length===1){let r=Cd(e);if(r&&r.codegenNode){let s=r.codegenNode;s.type===13&&ac(s,t),e.codegenNode=s}else e.codegenNode=o[0]}else if(o.length>1){let r=64;e.codegenNode=Fr(t,n(Lr),void 0,e.children,r,void 0,void 0,!0,void 0,!1)}}function h_(e,t){let n=0,o=()=>{n--};for(;n<e.children.length;n++){let r=e.children[n];z(r)||(t.grandParent=t.parent,t.parent=e,t.childIndex=n,t.onNodeRemoved=o,$i(r,t))}}function $i(e,t){t.currentNode=e;let{nodeTransforms:n}=t,o=[];for(let s=0;s<n.length;s++){let i=n[s](e,t);if(i&&(H(i)?o.push(...i):o.push(i)),t.currentNode)e=t.currentNode;else return}switch(e.type){case 3:t.ssr||t.helper(Hr);break;case 5:t.ssr||t.helper(jr);break;case 9:for(let s=0;s<e.branches.length;s++)$i(e.branches[s],t);break;case 10:case 11:case 1:case 0:h_(e,t);break}t.currentNode=e;let r=o.length;for(;r--;)o[r]()}function kd(e,t){let n=z(e)?o=>o===e:o=>e.test(o);return(o,r)=>{if(o.type===1){let{props:s}=o;if(o.tagType===3&&s.some(zv))return;let i=[];for(let a=0;a<s.length;a++){let l=s[a];if(l.type===7&&n(l.name)){s.splice(a,1),a--;let u=t(o,l,r);u&&i.push(u)}}return i}}}var Fi="/*@__PURE__*/",Vd=e=>`${Lo[e]}: _${Lo[e]}`;function m_(e,{mode:t="function",prefixIdentifiers:n=t==="module",sourceMap:o=!1,filename:r="template.vue.html",scopeId:s=null,optimizeImports:i=!1,runtimeGlobalName:a="Vue",runtimeModuleName:l="vue",ssrRuntimeModuleName:u="vue/server-renderer",ssr:f=!1,isTS:c=!1,inSSR:p=!1}){let d={mode:t,prefixIdentifiers:n,sourceMap:o,filename:r,scopeId:s,optimizeImports:i,runtimeGlobalName:a,runtimeModuleName:l,ssrRuntimeModuleName:u,ssr:f,isTS:c,inSSR:p,source:e.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper(m){return`_${Lo[m]}`},push(m,N=-2,C){d.code+=m},indent(){v(++d.indentLevel)},deindent(m=!1){m?--d.indentLevel:v(--d.indentLevel)},newline(){v(d.indentLevel)}};function v(m){d.push(`
`+"  ".repeat(m),0)}return d}function g_(e,t={}){let n=m_(e,t);t.onContextCreated&&t.onContextCreated(n);let{mode:o,push:r,prefixIdentifiers:s,indent:i,deindent:a,newline:l,scopeId:u,ssr:f}=n,c=Array.from(e.helpers),p=c.length>0,d=!s&&o!=="module";E_(e,n);let m=f?"ssrRender":"render",C=(f?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ");if(r(`function ${m}(${C}) {`),i(),d&&(r("with (_ctx) {"),i(),p&&(r(`const { ${c.map(Vd).join(", ")} } = _Vue
`,-1),l())),e.components.length&&(Ml(e.components,"component",n),(e.directives.length||e.temps>0)&&l()),e.directives.length&&(Ml(e.directives,"directive",n),e.temps>0&&l()),e.filters&&e.filters.length&&(l(),Ml(e.filters,"filter",n),l()),e.temps>0){r("let ");for(let y=0;y<e.temps;y++)r(`${y>0?", ":""}_temp${y}`)}return(e.components.length||e.directives.length||e.temps)&&(r(`
`,0),l()),f||r("return "),e.codegenNode?Ye(e.codegenNode,n):r("null"),d&&(a(),r("}")),a(),r("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}function E_(e,t){let{ssr:n,prefixIdentifiers:o,push:r,newline:s,runtimeModuleName:i,runtimeGlobalName:a,ssrRuntimeModuleName:l}=t,u=a,f=Array.from(e.helpers);if(f.length>0&&(r(`const _Vue = ${u}
`,-1),e.hoists.length)){let c=[zl,Gl,Hr,ql,fd].filter(p=>f.includes(p)).map(Vd).join(", ");r(`const { ${c} } = _Vue
`,-1)}v_(e.hoists,t),s(),r("return ")}function Ml(e,t,{helper:n,push:o,newline:r,isTS:s}){let i=n(t==="filter"?Zl:t==="component"?Jl:Ql);for(let a=0;a<e.length;a++){let l=e[a],u=l.endsWith("__self");u&&(l=l.slice(0,-6)),o(`const ${Ur(l,t)} = ${i}(${JSON.stringify(l)}${u?", true":""})${s?"!":""}`),a<e.length-1&&r()}}function v_(e,t){if(!e.length)return;t.pure=!0;let{push:n,newline:o}=t;o();for(let r=0;r<e.length;r++){let s=e[r];s&&(n(`const _hoisted_${r+1} = `),Ye(s,t),o())}t.pure=!1}function dc(e,t){let n=e.length>3||!1;t.push("["),n&&t.indent(),Xr(e,t,n),n&&t.deindent(),t.push("]")}function Xr(e,t,n=!1,o=!0){let{push:r,newline:s}=t;for(let i=0;i<e.length;i++){let a=e[i];z(a)?r(a,-3):H(a)?dc(a,t):Ye(a,t),i<e.length-1&&(n?(o&&r(","),s()):o&&r(", "))}}function Ye(e,t){if(z(e)){t.push(e,-3);return}if(Ae(e)){t.push(t.helper(e));return}switch(e.type){case 1:case 9:case 11:Ye(e.codegenNode,t);break;case 2:__(e,t);break;case 4:Rd(e,t);break;case 5:y_(e,t);break;case 12:Ye(e.codegenNode,t);break;case 8:Pd(e,t);break;case 3:N_(e,t);break;case 13:S_(e,t);break;case 14:T_(e,t);break;case 15:w_(e,t);break;case 17:O_(e,t);break;case 18:C_(e,t);break;case 19:A_(e,t);break;case 20:D_(e,t);break;case 21:Xr(e.body,t,!0,!1);break;case 22:break;case 23:break;case 24:break;case 25:break;case 26:break;case 10:break;default:}}function __(e,t){t.push(JSON.stringify(e.content),-3,e)}function Rd(e,t){let{content:n,isStatic:o}=e;t.push(o?JSON.stringify(n):n,-3,e)}function y_(e,t){let{push:n,helper:o,pure:r}=t;r&&n(Fi),n(`${o(jr)}(`),Ye(e.content,t),n(")")}function Pd(e,t){for(let n=0;n<e.children.length;n++){let o=e.children[n];z(o)?t.push(o,-3):Ye(o,t)}}function b_(e,t){let{push:n}=t;if(e.type===8)n("["),Pd(e,t),n("]");else if(e.isStatic){let o=cc(e.content)?e.content:JSON.stringify(e.content);n(o,-2,e)}else n(`[${e.content}]`,-3,e)}function N_(e,t){let{push:n,helper:o,pure:r}=t;r&&n(Fi),n(`${o(Hr)}(${JSON.stringify(e.content)})`,-3,e)}function S_(e,t){let{push:n,helper:o,pure:r}=t,{tag:s,props:i,children:a,patchFlag:l,dynamicProps:u,directives:f,isBlock:c,disableTracking:p,isComponent:d}=e,v;l&&(v=String(l)),f&&n(o(ec)+"("),c&&n(`(${o(co)}(${p?"true":""}), `),r&&n(Fi);let m=c?Uo(t.inSSR,d):Fo(t.inSSR,d);n(o(m)+"(",-2,e),Xr(x_([s,i,a,v,u]),t),n(")"),c&&n(")"),f&&(n(", "),Ye(f,t),n(")"))}function x_(e){let t=e.length;for(;t--&&e[t]==null;);return e.slice(0,t+1).map(n=>n||"null")}function T_(e,t){let{push:n,helper:o,pure:r}=t,s=z(e.callee)?e.callee:o(e.callee);r&&n(Fi),n(s+"(",-2,e),Xr(e.arguments,t),n(")")}function w_(e,t){let{push:n,indent:o,deindent:r,newline:s}=t,{properties:i}=e;if(!i.length){n("{}",-2,e);return}let a=i.length>1||!1;n(a?"{":"{ "),a&&o();for(let l=0;l<i.length;l++){let{key:u,value:f}=i[l];b_(u,t),n(": "),Ye(f,t),l<i.length-1&&(n(","),s())}a&&r(),n(a?"}":" }")}function O_(e,t){dc(e.elements,t)}function C_(e,t){let{push:n,indent:o,deindent:r}=t,{params:s,returns:i,body:a,newline:l,isSlot:u}=e;u&&n(`_${Lo[sc]}(`),n("(",-2,e),H(s)?Xr(s,t):s&&Ye(s,t),n(") => "),(l||a)&&(n("{"),o()),i?(l&&n("return "),H(i)?dc(i,t):Ye(i,t)):a&&Ye(a,t),(l||a)&&(r(),n("}")),u&&(e.isNonScopedSlot&&n(", undefined, true"),n(")"))}function A_(e,t){let{test:n,consequent:o,alternate:r,newline:s}=e,{push:i,indent:a,deindent:l,newline:u}=t;if(n.type===4){let c=!cc(n.content);c&&i("("),Rd(n,t),c&&i(")")}else i("("),Ye(n,t),i(")");s&&a(),t.indentLevel++,s||i(" "),i("? "),Ye(o,t),t.indentLevel--,s&&u(),s||i(" "),i(": ");let f=r.type===19;f||t.indentLevel++,Ye(r,t),f||t.indentLevel--,s&&l(!0)}function D_(e,t){let{push:n,helper:o,indent:r,deindent:s,newline:i}=t,{needPauseTracking:a,needArraySpread:l}=e;l&&n("[...("),n(`_cache[${e.index}] || (`),a&&(r(),n(`${o(Ii)}(-1`),e.inVOnce&&n(", true"),n("),"),i(),n("(")),n(`_cache[${e.index}] = `),Ye(e.value,t),a&&(n(`).cacheIndex = ${e.index},`),i(),n(`${o(Ii)}(1),`),i(),n(`_cache[${e.index}]`),s()),n(")"),l&&n(")]")}var Ub=new RegExp("\\b"+"arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b")+"\\b");var I_=kd(/^(?:if|else|else-if)$/,(e,t,n)=>k_(e,t,n,(o,r,s)=>{let i=n.parent.children,a=i.indexOf(o),l=0;for(;a-->=0;){let u=i[a];u&&u.type===9&&(l+=u.branches.length)}return()=>{if(s)o.codegenNode=ed(r,l,n);else{let u=V_(o.codegenNode);u.alternate=ed(r,l+o.branches.length-1,n)}}}));function k_(e,t,n,o){if(t.name!=="else"&&(!t.exp||!t.exp.content.trim())){let r=t.exp?t.exp.loc:e.loc;n.onError(_e(28,t.loc)),t.exp=J("true",!1,r)}if(t.name==="if"){let r=Zp(e,t),s={type:9,loc:i_(e.loc),branches:[r]};if(n.replaceNode(s),o)return o(s,r,!0)}else{let r=n.parent.children,s=[],i=r.indexOf(e);for(;i-->=-1;){let a=r[i];if(a&&Li(a)){n.removeNode(a);continue}if(a&&a.type===9){(t.name==="else-if"||t.name==="else")&&a.branches[a.branches.length-1].condition===void 0&&n.onError(_e(30,e.loc)),n.removeNode();let l=Zp(e,t);a.branches.push(l);let u=o&&o(a,l,!1);$i(l,n),u&&u(),n.currentNode=null}else n.onError(_e(30,e.loc));break}}}function Zp(e,t){let n=e.tagType===3;return{type:10,loc:e.loc,condition:t.name==="else"?void 0:t.exp,children:n&&!lt(e,"for")?e.children:[e],userKey:Kr(e,"key"),isTemplateIf:n}}function ed(e,t,n){return e.condition?Fl(e.condition,td(e,t,n),Pe(n.helper(Hr),['""',"true"])):td(e,t,n)}function td(e,t,n){let{helper:o}=n,r=Oe("key",J(`${t}`,!1,_t,2)),{children:s}=e,i=s[0];if(s.length!==1||i.type!==1)if(s.length===1&&i.type===11){let l=i.codegenNode;return Pi(l,r,n),l}else return Fr(n,o(Lr),Ct([r]),s,64,void 0,void 0,!0,!1,!1,e.loc);else{let l=i.codegenNode,u=Jv(l);return u.type===13&&ac(u,n),Pi(u,r,n),l}}function V_(e){for(;;)if(e.type===19)if(e.alternate.type===19)e=e.alternate;else return e;else e.type===20&&(e=e.value)}var R_=kd("for",(e,t,n)=>{let{helper:o,removeHelper:r}=n;return P_(e,t,n,s=>{let i=Pe(o(tc),[s.source]),a=Vi(e),l=lt(e,"memo"),u=Kr(e,"key",!1,!0);u&&u.type;let f=u&&(u.type===6?u.value?J(u.value.content,!0):void 0:u.exp),c=f?Oe("key",f):null,p=s.source.type===4&&s.source.constType>0,d=p?64:u?128:256;return s.codegenNode=Fr(n,o(Lr),void 0,i,d,void 0,void 0,!0,!p,!1,e.loc),()=>{var v;let m,{children:N}=s,C=N.length!==1||N[0].type!==1,y=Ri(e)?e:a&&e.children.length===1&&Ri(e.children[0])?e.children[0]:null;if(y)m=y.codegenNode,a&&c&&Pi(m,c,n);else if(C)m=Fr(n,o(Lr),c?Ct([c]):void 0,e.children,64,void 0,void 0,!0,void 0,!1);else{m=N[0].codegenNode,a&&c&&Pi(m,c,n);let E=!p||m.isBlockRequired===!0;m.isBlock!==E&&(m.isBlock?(r(co),r(Uo(n.inSSR,m.isComponent))):r(Fo(n.inSSR,m.isComponent))),m.isBlock=E,m.isBlock?(o(co),o(Uo(n.inSSR,m.isComponent))):(o(Fo(n.inSSR,m.isComponent)),m.needsPatch&&(m.patchFlag=((v=m.patchFlag)!=null?v:0)|512))}if(l){let E=$o(Wl(s.parseResult,[J("_cached")]));E.body=Fv([At(["const _memo = (",l.exp,")"]),At(["if (_cached && _cached.el",...f?[" && _cached.key === (",f,")"]:[],` && ${n.helperString(hd)}(_cached, _memo)) return _cached`]),At(["const _item = ",m]),J("_item.memo = _memo"),J("return _item")]),i.arguments.push(E,J("_cache"),J(String(n.cached.length))),n.cached.push(null)}else i.arguments.push($o(Wl(s.parseResult),m,!0))}})});function P_(e,t,n,o){if(!t.exp){n.onError(_e(31,t.loc));return}let r=t.forParseResult;if(!r){n.onError(_e(32,t.loc));return}Md(r,n);let{addIdentifiers:s,removeIdentifiers:i,scopes:a}=n,{source:l,value:u,key:f,index:c}=r,p={type:11,loc:t.loc,source:l,valueAlias:u,keyAlias:f,objectIndexAlias:c,parseResult:r,children:Vi(e)?e.children:[e]};n.replaceNode(p),a.vFor++;let d=o&&o(p);return()=>{a.vFor--,d&&d()}}function Md(e,t){e.finalized||(e.finalized=!0)}function Wl({value:e,key:t,index:n},o=[]){return M_([e,t,n,...o])}function M_(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map((n,o)=>n||J("_".repeat(o+1),!1))}var nd=J("undefined",!1),L_=(e,t)=>{if(e.type===1&&(e.tagType===1||e.tagType===3)){let n=lt(e,"slot");if(n)return n.exp,t.scopes.vSlot++,()=>{t.scopes.vSlot--}}};var $_=(e,t,n,o)=>$o(e,n,!1,!0,n.length?n[0].loc:o);function F_(e,t,n=$_){t.helper(sc);let{children:o,loc:r}=e,s=[],i=[],a=t.scopes.vSlot>0||t.scopes.vFor>0,l=lt(e,"slot",!0);if(l){let{arg:N,exp:C}=l;N&&!Je(N)&&(a=!0),s.push(Oe(N||J("default",!0),n(C,void 0,o,r)))}let u=!1,f=!1,c=[],p=new Set,d=0;for(let N=0;N<o.length;N++){let C=o[N],y;if(!Vi(C)||!(y=lt(C,"slot",!0))){C.type!==3&&c.push(C);continue}if(l){t.onError(_e(37,y.loc));break}u=!0;let{children:E,loc:b}=C,{arg:g=J("default",!0),exp:O,loc:D}=y,S;Je(g)?S=g?g.content:"default":a=!0;let T=lt(C,"for"),V=n(O,T,E,b),M,w;if(M=lt(C,"if"))a=!0,i.push(Fl(M.exp,xi(g,V,d++),nd));else if(w=lt(C,/^else(?:-if)?$/,!0)){let $=N,P;for(;$--&&(P=o[$],!!Li(P)););if(P&&Vi(P)&&lt(P,/^(?:else-)?if$/)){let W=i[i.length-1];for(;W.alternate.type===19;)W=W.alternate;W.alternate=w.exp?Fl(w.exp,xi(g,V,d++),nd):xi(g,V,d++)}else t.onError(_e(30,w.loc))}else if(T){a=!0;let $=T.forParseResult;$?(Md($,t),i.push(Pe(t.helper(tc),[$.source,$o(Wl($),xi(g,V),!0)]))):t.onError(_e(32,T.loc))}else{if(S){if(p.has(S)){t.onError(_e(38,D));continue}p.add(S),S==="default"&&(f=!0)}s.push(Oe(g,V))}}if(!l){let N=(C,y)=>{let E=n(C,void 0,y,r);return t.compatConfig&&(E.isNonScopedSlot=!0),Oe("default",E)};u?c.length&&!c.every(fc)&&(f?t.onError(_e(39,c[0].loc)):s.push(N(void 0,c))):s.push(N(void 0,o))}let v=a?2:Ci(e.children)?3:1,m=Ct(s.concat(Oe("_",J(v+"",!1))),r);return i.length&&(m=Pe(t.helper(dd),[m,ao(i)])),{slots:m,hasDynamicSlots:a}}function xi(e,t,n){let o=[Oe("name",e),Oe("fn",t)];return n!=null&&o.push(Oe("key",J(String(n),!0))),Ct(o)}function Ci(e){for(let t=0;t<e.length;t++){let n=e[t];switch(n.type){case 1:if(n.tagType===2||Ci(n.children))return!0;break;case 9:if(Ci(n.branches))return!0;break;case 10:case 11:if(Ci(n.children))return!0;break}}return!1}var Ld=new WeakMap,U_=(e,t)=>function(){if(e=t.currentNode,!(e.type===1&&(e.tagType===0||e.tagType===1)))return;let{tag:o,props:r}=e,s=e.tagType===1,i=s?B_(e,t):`"${o}"`,a=se(i)&&i.callee===Yl,l,u,f=0,c,p,d,v=!1,m=!1,N=a||i===Mr||i===Xl||!s&&(o==="svg"||o==="foreignObject"||o==="math");if(r.length>0){let y=$d(e,t,void 0,s,a);l=y.props,f=y.patchFlag,p=y.dynamicPropNames,v=y.needsPatch,m=y.isBlockRequired;let E=y.directives;d=E&&E.length?ao(E.map(b=>j_(b,t))):void 0,y.shouldUseBlock&&(N=!0)}if(e.children.length>0)if(i===Ai&&(N=!0,f|=1024),s&&i!==Mr&&i!==Ai){let{slots:E,hasDynamicSlots:b}=F_(e,t);u=E,b&&(f|=1024)}else if(e.children.length===1&&i!==Mr){let E=e.children[0],b=E.type,g=b===5||b===8;g&&ct(E,t)===0&&(f|=1),g||b===2?u=E:u=e.children}else u=e.children;p&&p.length&&(c=W_(p));let C=e.codegenNode=Fr(t,i,l,u,f===0?void 0:f,c,d,!!N,!1,s,e.loc);v=v&&(f===0||f===32),v&&(C.needsPatch=!0),m&&(C.isBlockRequired=!0)};function B_(e,t,n=!1){let{tag:o}=e,r=Kl(o),s=Kr(e,"is",!1,!0);if(s)if(r||lo("COMPILER_IS_ON_ELEMENT",t)){let a;if(s.type===6?a=s.value&&J(s.value.content,!0):(a=s.exp,a||(a=J("is",!1,s.arg.loc))),a)return Pe(t.helper(Yl),[a])}else s.type===6&&s.value.content.startsWith("vue:")&&(o=s.value.content.slice(4));let i=Ed(o)||t.isBuiltInComponent(o);return i?(n||t.helper(i),i):(t.helper(Jl),t.components.add(o),Ur(o,"component"))}function $d(e,t,n=e.props,o,r,s=!1){let{tag:i,loc:a,children:l}=e,u=[],f=[],c=[],p=l.length>0,d=!1,v=!1,m=0,N=!1,C=!1,y=!1,E=!1,b=!1,g=!1,O=[],D=w=>{u.length&&(f.push(Ct(od(u),a)),u=[]),w&&f.push(w)},S=()=>{t.scopes.vFor>0&&u.push(Oe(J("ref_for",!0),J("true")))},T=({key:w,value:$})=>{if(Je(w)){let P=w.content,W=Ft(P);if(W&&(!o||r)&&P.toLowerCase()!=="onclick"&&P!=="onUpdate:modelValue"&&!Pt(P)&&(E=!0),W&&Pt(P)&&(g=!0),P==="ref"&&(N=!0),W&&$.type===14&&($=$.arguments[0]),$.type===20||($.type===4||$.type===8)&&ct($,t)>0)return;P==="class"?C=!0:P==="style"?y=!0:P!=="ref"&&P!=="key"&&!O.includes(P)&&O.push(P),o&&(P==="class"||P==="style")&&!O.includes(P)&&O.push(P)}else b=!0};for(let w=0;w<n.length;w++){let $=n[w];if($.type===6){let{loc:P,name:W,nameLoc:j,value:ie}=$,fe=!0;if(W==="ref"&&(N=!0,S()),W==="is"&&(Kl(i)||ie&&ie.content.startsWith("vue:")||lo("COMPILER_IS_ON_ELEMENT",t)))continue;u.push(Oe(J(W,!0,j),J(ie?ie.content:"",fe,ie?ie.loc:P)))}else{let{name:P,arg:W,exp:j,loc:ie,modifiers:fe}=$,he=P==="bind",re=P==="on";if(P==="slot"){o||t.onError(_e(40,ie));continue}if(P==="once"||P==="memo"||P==="is"||he&&Pn(W,"is")&&(Kl(i)||lo("COMPILER_IS_ON_ELEMENT",t))||re&&s)continue;if(he&&Pn(W,"key")&&(d=!0),re&&p&&W&&Je(W)&&le(W.content)==="vue:beforeUpdate"&&(d=!0,v=!0),he&&Pn(W,"ref")&&S(),!W&&(he||re)){if(b=!0,j)if(he){if(D(),lo("COMPILER_V_BIND_OBJECT_ORDER",t)){f.unshift(j);continue}S(),D(),f.push(j)}else D({type:14,loc:ie,callee:t.helper(rc),arguments:o?[j]:[j,"true"]});else t.onError(_e(he?34:35,ie));continue}he&&fe.some(ge=>ge.content==="prop")&&(m|=32);let Me=t.directiveTransforms[P];if(Me){let{props:ge,needRuntime:Qe}=Me($,e,t);!s&&ge.forEach(T),re&&W&&!Je(W)?D(Ct(ge,a)):u.push(...ge),Qe&&(c.push($),Ae(Qe)&&Ld.set($,Qe))}else Ea(P)||(c.push($),p&&(d=!0,v=!0))}}let V;f.length?(D(),f.length>1?V=Pe(t.helper(Di),f,a):V=f[0]):u.length&&(V=Ct(od(u),a)),b?m|=16:(C&&!o&&(m|=2),y&&!o&&(m|=4),O.length&&(m|=8),E&&(m|=32));let M=(m===0||m===32)&&(N||g||c.length>0);if(!d&&M&&(m|=512),!t.inSSR&&V)switch(V.type){case 15:let w=-1,$=-1,P=!1;for(let ie=0;ie<V.properties.length;ie++){let fe=V.properties[ie].key;Je(fe)?fe.content==="class"?w=ie:fe.content==="style"&&($=ie):fe.isHandlerKey||(P=!0)}let W=V.properties[w],j=V.properties[$];P?V=Pe(t.helper($r),[V]):(W&&!Je(W.value)&&(W.value=Pe(t.helper(nc),[W.value])),j&&(y||j.value.type===4&&j.value.content.trim()[0]==="["||j.value.type===17)&&(j.value=Pe(t.helper(oc),[j.value])));break;case 14:break;default:V=Pe(t.helper($r),[Pe(t.helper(Wr),[V])]);break}return{props:V,directives:c,patchFlag:m,dynamicPropNames:O,shouldUseBlock:d,needsPatch:M,isBlockRequired:v}}function od(e){let t=new Map,n=[];for(let o=0;o<e.length;o++){let r=e[o];if(r.key.type===8||!r.key.isStatic){n.push(r);continue}let s=r.key.content,i=t.get(s);i?(s==="style"||s==="class"||Ft(s))&&H_(i,r):(t.set(s,r),n.push(r))}return n}function H_(e,t){e.value.type===17?e.value.elements.push(t.value):e.value=ao([e.value,t.value],e.loc)}function j_(e,t){let n=[],o=Ld.get(e);o?n.push(t.helperString(o)):(t.helper(Ql),t.directives.add(e.name),n.push(Ur(e.name,"directive")));let{loc:r}=e;if(e.exp&&n.push(e.exp),e.arg&&(e.exp||n.push("void 0"),n.push(e.arg)),Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));let s=J("true",!1,r);n.push(Ct(e.modifiers.map(i=>Oe(i,s)),r))}return ao(n,e.loc)}function W_(e){let t="[";for(let n=0,o=e.length;n<o;n++)t+=JSON.stringify(e[n]),n<o-1&&(t+=", ");return t+"]"}function Kl(e){return e==="component"||e==="Component"}var K_=(e,t)=>{if(Ri(e)){let{children:n,loc:o}=e,{slotName:r,slotProps:s}=X_(e,t),i=[t.prefixIdentifiers?"_ctx.$slots":"$slots",r,"{}","undefined","true"],a=2;s&&(i[2]=s,a=3),n.length&&(i[3]=$o([],n,!1,!1,o),a=4),t.scopeId&&!t.slotted&&(a=5),i.splice(a),e.codegenNode=Pe(t.helper(pd),i,o)}};function X_(e,t){let n='"default"',o,r=[];for(let s=0;s<e.props.length;s++){let i=e.props[s];if(i.type===6)i.value&&(i.name==="name"?n=JSON.stringify(i.value.content):(i.name=le(i.name),r.push(i)));else if(i.name==="bind"&&Pn(i.arg,"name")){if(i.exp)n=i.exp;else if(i.arg&&i.arg.type===4){let a=le(i.arg.content);n=i.exp=J(a,!1,i.arg.loc)}}else i.name==="bind"&&i.arg&&Je(i.arg)&&(i.arg.content=le(i.arg.content)),r.push(i)}if(r.length>0){let{props:s,directives:i}=$d(e,t,r,!1,!1);o=s,i.length&&t.onError(_e(36,i[0].loc))}return{slotName:n,slotProps:o}}var hc=(e,t,n,o)=>{let{loc:r,modifiers:s,arg:i}=e;!e.exp&&!s.length&&n.onError(_e(35,r));let a;if(i.type===4)if(i.isStatic){let c=i.content;c.startsWith("vue:")&&(c=`vnode-${c.slice(4)}`);let p=t.tagType!==0||c.startsWith("vnode")||!/[A-Z]/.test(c)?nn(le(c)):`on:${c}`;a=J(p,!0,i.loc)}else a=At([`${n.helperString($l)}(`,i,")"]);else a=i,a.children.unshift(`${n.helperString($l)}(`),a.children.push(")");let l=e.exp;l&&!l.content.trim()&&(l=void 0);let u=n.cacheHandlers&&!l&&!n.inVOnce;if(l){let c=yd(l),p=!(c||Xv(l)),d=l.content.includes(";");(p||u&&c)&&(l=At([`${p?"$event":"(...args)"} => ${d?"{":"("}`,l,d?"}":")"]))}let f={props:[Oe(a,l||J("() => {}",!1,r))]};return o&&(f=o(f)),u&&(f.props[0].value=n.cache(f.props[0].value)),f.props.forEach(c=>c.key.isHandlerKey=!0),f},z_=(e,t,n)=>{let{modifiers:o,loc:r}=e,s=e.arg,{exp:i}=e;return i&&i.type===4&&!i.content.trim()&&(i=void 0),s.type!==4?(s.children.unshift("("),s.children.push(') || ""')):s.isStatic||(s.content=s.content?`${s.content} || ""`:'""'),o.some(a=>a.content==="camel")&&(s.type===4?s.isStatic?s.content=le(s.content):s.content=`${n.helperString(Ll)}(${s.content})`:(s.children.unshift(`${n.helperString(Ll)}(`),s.children.push(")"))),n.inSSR||(o.some(a=>a.content==="prop")&&rd(s,"."),o.some(a=>a.content==="attr")&&rd(s,"^")),{props:[Oe(s,i)]}},rd=(e,t)=>{e.type===4?e.isStatic?e.content=t+e.content:e.content=`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"))},G_=(e,t)=>{if(e.type===0||e.type===1||e.type===11||e.type===10)return()=>{let n=e.children,o,r=!1;for(let s=0;s<n.length;s++){let i=n[s];if(Pl(i)){r=!0;for(let a=s+1;a<n.length;a++){let l=n[a];if(Pl(l))o||(o=n[s]=At([i],i.loc)),o.children.push(" + ",l),n.splice(a,1),a--;else{o=void 0;break}}}}if(!(!r||n.length===1&&(e.type===0||e.type===1&&e.tagType===0&&!e.props.find(s=>s.type===7&&!t.directiveTransforms[s.name])&&e.tag!=="template")))for(let s=0;s<n.length;s++){let i=n[s];if(Pl(i)||i.type===8){let a=[];(i.type!==2||i.content!==" ")&&a.push(i),!t.ssr&&ct(i,t)===0&&a.push("1"),n[s]={type:12,content:i,loc:i.loc,codegenNode:Pe(t.helper(ql),a)}}}}},sd=new WeakSet,q_=(e,t)=>{if(e.type===1&&lt(e,"once",!0))return sd.has(e)||t.inVOnce||t.inSSR?void 0:(sd.add(e),t.inVOnce=!0,t.helper(Ii),()=>{t.inVOnce=!1;let n=t.currentNode;n.codegenNode&&(n.codegenNode=t.cache(n.codegenNode,!0,!0))})},mc=(e,t,n)=>{let{exp:o,arg:r}=e;if(!o)return n.onError(_e(41,e.loc)),Pr();let s=o.loc.source.trim(),i=o.type===4?o.content:s,a=n.bindingMetadata[s];if(a==="props"||a==="props-aliased")return n.onError(_e(44,o.loc)),Pr();if(a==="literal-const"||a==="setup-const")return n.onError(_e(45,o.loc)),Pr();if(!i.trim()||!yd(o))return n.onError(_e(42,o.loc)),Pr();let l=r||J("modelValue",!0),u=r?Je(r)?`onUpdate:${le(r.content)}`:At(['"onUpdate:" + ',r]):"onUpdate:modelValue",f,c=n.isTS?"($event: any)":"$event";f=At([`${c} => ((`,o,") = $event)"]);let p=[Oe(l,e.exp),Oe(u,f)];if(e.modifiers.length&&t.tagType===1){let d=e.modifiers.map(m=>m.content).map(m=>(cc(m)?m:JSON.stringify(m))+": true").join(", "),v=r?Je(r)?`${r.content}Modifiers`:At([r,' + "Modifiers"']):"modelModifiers";p.push(Oe(v,J(`{ ${d} }`,!1,e.loc,2)))}return Pr(p)};function Pr(e=[]){return{props:e}}var J_=/[\w).+\-_$\]]/,Y_=(e,t)=>{lo("COMPILER_FILTERS",t)&&(e.type===5?Mi(e.content,t):e.type===1&&e.props.forEach(n=>{n.type===7&&n.name!=="for"&&n.exp&&Mi(n.exp,t)}))};function Mi(e,t){if(e.type===4)id(e,t);else for(let n=0;n<e.children.length;n++){let o=e.children[n];typeof o=="object"&&(o.type===4?id(o,t):o.type===8?Mi(o,t):o.type===5&&Mi(o.content,t))}}function id(e,t){let n=e.content,o=!1,r=!1,s=!1,i=!1,a=0,l=0,u=0,f=0,c,p,d,v,m=[];for(d=0;d<n.length;d++)if(p=c,c=n.charCodeAt(d),o)c===39&&p!==92&&(o=!1);else if(r)c===34&&p!==92&&(r=!1);else if(s)c===96&&p!==92&&(s=!1);else if(i)c===47&&p!==92&&(i=!1);else if(c===124&&n.charCodeAt(d+1)!==124&&n.charCodeAt(d-1)!==124&&!a&&!l&&!u)v===void 0?(f=d+1,v=n.slice(0,d).trim()):N();else{switch(c){case 34:r=!0;break;case 39:o=!0;break;case 96:s=!0;break;case 40:u++;break;case 41:u--;break;case 91:l++;break;case 93:l--;break;case 123:a++;break;case 125:a--;break}if(c===47){let C=d-1,y;for(;C>=0&&(y=n.charAt(C),y===" ");C--);(!y||!J_.test(y))&&(i=!0)}}v===void 0?v=n.slice(0,d).trim():f!==0&&N();function N(){m.push(n.slice(f,d).trim()),f=d+1}if(m.length){for(d=0;d<m.length;d++)v=Q_(v,m[d],t);e.content=v,e.ast=void 0}}function Q_(e,t,n){n.helper(Zl);let o=t.indexOf("(");if(o<0)return n.filters.add(t),`${Ur(t,"filter")}(${e})`;{let r=t.slice(0,o),s=t.slice(o+1);return n.filters.add(r),`${Ur(r,"filter")}(${e}${s!==")"?","+s:s}`}}var ad=new WeakSet,Z_=(e,t)=>{if(e.type===1){let n=lt(e,"memo");return!n||ad.has(e)||t.inSSR?void 0:(ad.add(e),()=>{let o=e.codegenNode||t.currentNode.codegenNode;o&&o.type===13&&(e.tagType!==1&&ac(o,t),e.codegenNode=Pe(t.helper(ic),[n.exp,$o(void 0,o),"_cache",String(t.cached.length)]),t.cached.push(null))})}},ey=(e,t)=>{if(e.type===1){for(let n of e.props)if(n.type===7&&n.name==="bind"&&(!n.exp||n.exp.type===4&&!n.exp.content.trim())&&n.arg){let o=n.arg;if(o.type!==4||!o.isStatic)t.onError(_e(53,o.loc)),n.exp=J("",!0,o.loc);else{let r=le(o.content);(vd.test(r[0])||r[0]==="-")&&(n.exp=J(r,!1,o.loc))}}}};function ty(e){return[[ey,q_,I_,Z_,R_,Y_,K_,U_,L_,G_],{on:hc,bind:z_,model:mc}]}function Fd(e,t={}){let n=t.onError||lc,o=t.mode==="module";t.prefixIdentifiers===!0?n(_e(48)):o&&n(_e(49));let r=!1;t.cacheHandlers&&n(_e(50)),t.scopeId&&!o&&n(_e(51));let s=q({},t,{prefixIdentifiers:r}),i=z(e)?Od(e,s):e,[a,l]=ty();return p_(i,q({},s,{nodeTransforms:[...a,...t.nodeTransforms||[]],directiveTransforms:q({},l,t.directiveTransforms||{})})),g_(i,s)}var Ud=()=>({props:[]});var Hd=Symbol(""),jd=Symbol(""),Wd=Symbol(""),Kd=Symbol(""),gc=Symbol(""),Xd=Symbol(""),zd=Symbol(""),Gd=Symbol(""),Ec=Symbol(""),qd=Symbol("");md({[Hd]:"vModelRadio",[jd]:"vModelCheckbox",[Wd]:"vModelText",[Kd]:"vModelSelect",[gc]:"vModelDynamic",[Xd]:"withModifiers",[zd]:"withKeys",[Gd]:"vShow",[Ec]:"Transition",[qd]:"TransitionGroup"});var Ho;function ny(e,t=!1){return Ho||(Ho=document.createElement("div")),t?(Ho.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,Ho.children[0].getAttribute("foo")):(Ho.innerHTML=e,Ho.textContent)}var oy={parseMode:"html",isVoidTag:cu,isNativeTag:e=>_a(e)||ya(e)||ba(e),isPreTag:e=>e==="pre",isIgnoreNewlineTag:e=>e==="pre"||e==="textarea",decodeEntities:ny,isBuiltInComponent:e=>{if(e==="Transition"||e==="transition")return Ec;if(e==="TransitionGroup"||e==="transition-group")return qd},getNamespace(e,t,n){let o=t?t.ns:n;if(t&&o===2)if(t.tag==="annotation-xml"){if(e==="svg")return 1;t.props.some(r=>r.type===6&&r.name==="encoding"&&r.value!=null&&(r.value.content==="text/html"||r.value.content==="application/xhtml+xml"))&&(o=0)}else/^m(?:[ions]|text)$/.test(t.tag)&&e!=="mglyph"&&e!=="malignmark"&&(o=0);else t&&o===1&&(t.tag==="foreignObject"||t.tag==="desc"||t.tag==="title")&&(o=0);if(o===0){if(e==="svg")return 1;if(e==="math")return 2}return o}},ry=e=>{e.type===1&&e.props.forEach((t,n)=>{t.type===6&&t.name==="style"&&t.value&&(e.props[n]={type:7,name:"bind",arg:J("style",!0,t.loc),exp:sy(t.value.content,t.loc),modifiers:[],loc:t.loc})})},sy=(e,t)=>{let n=va(e);return J(JSON.stringify(n),!1,t,3)};function _n(e,t){return _e(e,t,void 0)}var iy=(e,t,n)=>{let{exp:o,loc:r}=e;return o||n.onError(_n(54,r)),t.children.length&&(n.onError(_n(55,r)),t.children.length=0),{props:[Oe(J("innerHTML",!0,r),o||J("",!0))]}},ay=(e,t,n)=>{let{exp:o,loc:r}=e;return o||n.onError(_n(56,r)),t.children.length&&(n.onError(_n(57,r)),t.children.length=0),{props:[Oe(J("textContent",!0),o?ct(o,n)>0?o:Pe(n.helperString(jr),[o],r):J("",!0))]}},ly=(e,t,n)=>{let o=mc(e,t,n);if(!o.props.length||t.tagType===1)return o;e.arg&&n.onError(_n(59,e.arg.loc));function r(){let a=lt(t,"bind");a&&Pn(a.arg,"value")&&n.onError(_n(61,a.loc))}let{tag:s}=t,i=n.isCustomElement(s);if(s==="input"||s==="textarea"||s==="select"||i){let a=Wd,l=!1;if(s==="input"||i){let u=Kr(t,"type");if(u){if(u.type===7)a=gc;else if(u.value)switch(u.value.content){case"radio":a=Hd;break;case"checkbox":a=jd;break;case"file":l=!0,n.onError(_n(60,e.loc));break;default:break}}else bd(t)&&(a=gc)}else s==="select"&&(a=Kd);l||(o.needRuntime=n.helper(a))}else n.onError(_n(58,e.loc));return o.props=o.props.filter(a=>!(a.key.type===4&&a.key.content==="modelValue")),o},cy=Ue("passive,once,capture"),uy=Ue("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),fy=Ue("left,right"),Jd=Ue("onkeyup,onkeydown,onkeypress"),py=(e,t,n,o)=>{let r=[],s=[],i=[];for(let a=0;a<t.length;a++){let l=t[a].content;l==="native"&&Bo("COMPILER_V_ON_NATIVE",n,o)||cy(l)?i.push(l):fy(l)?Je(e)?Jd(e.content.toLowerCase())?r.push(l):s.push(l):(r.push(l),s.push(l)):uy(l)?s.push(l):r.push(l)}return{keyModifiers:r,nonKeyModifiers:s,eventOptionModifiers:i}},Bd=(e,t)=>Je(e)&&e.content.toLowerCase()==="onclick"?J(t,!0):e.type!==4?At(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,dy=(e,t,n)=>hc(e,t,n,o=>{let{modifiers:r}=e;if(!r.length)return o;let{key:s,value:i}=o.props[0],{keyModifiers:a,nonKeyModifiers:l,eventOptionModifiers:u}=py(s,r,n,e.loc);if(l.includes("right")&&(s=Bd(s,"onContextmenu")),l.includes("middle")&&(s=Bd(s,"onMouseup")),l.length&&(i=Pe(n.helper(Xd),[i,JSON.stringify(l)])),a.length&&(!Je(s)||Jd(s.content.toLowerCase()))&&(i=Pe(n.helper(zd),[i,JSON.stringify(a)])),u.length){let f=u.map(Nt).join("");s=Je(s)?J(`${s.content}${f}`,!0):At(["(",s,`) + "${f}"`])}return{props:[Oe(s,i)]}}),hy=(e,t,n)=>{let{exp:o,loc:r}=e;return o||n.onError(_n(62,r)),{props:[],needRuntime:n.helper(Gd)}},my=(e,t)=>{if(e.type===1&&e.tagType===1&&t.isBuiltInComponent(e.tag)===Ec)return()=>{if(!e.children.length)return;let o=Yd(e),r=e.children[0];if(r.type===1)for(let s of r.props)s.type===7&&s.name==="show"&&e.props.push({type:6,name:"persisted",nameLoc:e.loc,value:void 0,loc:e.loc})}};function Yd(e){let t=e.children=e.children.filter(o=>!Li(o)),n=t[0];return t.length!==1||n.type===11||n.type===9&&n.branches.some(Yd)}var gy=(e,t)=>{e.type===1&&e.tagType===0&&(e.tag==="script"||e.tag==="style")&&t.removeNode()};var Ey=[ry,my],vy={cloak:Ud,html:iy,text:ay,model:ly,on:dy,show:hy};function Qd(e,t={}){return Fd(e,q({},oy,t,{nodeTransforms:[gy,...Ey,...t.nodeTransforms||[]],directiveTransforms:q({},vy,t.directiveTransforms||{}),transformHoist:null}))}var Zd=Object.create(null);function _y(e,t){if(!z(e))if(e.nodeType)e=e.innerHTML;else return De;let n=su(e,t),o=Zd[n];if(o)return o;if(e[0]==="#"){let l=document.querySelector(e);e=l?l.innerHTML:""}let r=q({hoistStatic:!0,onError:void 0,onWarn:De},t);!r.isCustomElement&&typeof customElements<"u"&&(r.isCustomElement=l=>!!customElements.get(l));let{code:s}=Qd(e,r);function i(l,u=!1){let f=u?l.message:`Template compilation error: ${l.message}`,c=l.loc&&au(e,l.loc.start.offset,l.loc.end.offset);di(c?`${f}
${c}`:f)}let a=new Function("Vue",s)(Rl);return a._rc=!0,Zd[n]=a}yl(_y);var eh="tavern_language_vocab_v1",vc="default";function th(){return{activeBookId:vc,books:[{id:vc,name:"\u9ED8\u8BA4\u751F\u8BCD\u672C",createdAt:Date.now()}],items:[]}}var oe=th(),yy=new Set;function Mn(){try{pe().localStorage.setItem(eh,JSON.stringify(oe))}catch(e){console.warn("[TavernLanguage] \u4FDD\u5B58\u751F\u8BCD\u672C\u5931\u8D25:",e)}yy.forEach(e=>{try{e(oe)}catch{}})}function nh(){try{let e=pe().localStorage.getItem(eh);if(e){let t=JSON.parse(e);if(t&&Array.isArray(t.books)&&Array.isArray(t.items))return t.books.length===0&&t.books.push({id:vc,name:"\u9ED8\u8BA4\u751F\u8BCD\u672C",createdAt:Date.now()}),t.books.some(n=>n.id===t.activeBookId)||(t.activeBookId=t.books[0].id),oe=t,oe}}catch{}return oe=th(),oe}function _c(){return oe}function Ui(e,t){return`${String(t||"en").toLowerCase()}::${String(e||"").trim().toLowerCase()}`}function oh(e,t){let n=Ui(e,t);return oe.items.find(o=>o.key===n)||null}function Bi(e){oe.books.some(t=>t.id===e)&&(oe.activeBookId=e,Mn())}function rh(e){let t=String(e||"").trim();if(!t)return null;let n=`book_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,o={id:n,name:t,createdAt:Date.now()};return oe.books.push(o),oe.activeBookId=n,Mn(),o}function sh(e){if(oe.books.length<=1)return!1;let t=oe.books.findIndex(o=>o.id===e);if(t<0)return!1;oe.books.splice(t,1);let n=oe.books[0].id;return oe.items.forEach(o=>{o.bookId===e&&(o.bookId=n)}),oe.activeBookId===e&&(oe.activeBookId=n),Mn(),!0}function yc(e){let t=String(e.word||"").trim(),n=String(e.lang||"en").toLowerCase();if(!t)return null;let o=Ui(t,n),r=e.bookId||oe.activeBookId||oe.books[0].id,s=oe.items.find(a=>a.key===o);if(s)return s.bookId=r,e.phonetic&&(s.phonetic=e.phonetic),e.reading&&(s.reading=e.reading),e.briefCn&&(s.briefCn=e.briefCn),e.pos&&(s.pos=e.pos),e.context&&(s.context=e.context),e.audioUrl&&(s.audioUrl=e.audioUrl),s.updatedAt=Date.now(),Mn(),s;let i={id:`w_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,key:o,word:t,lang:n,bookId:r,phonetic:e.phonetic||"",reading:e.reading||"",pos:e.pos||"",briefCn:e.briefCn||"",context:e.context||"",audioUrl:e.audioUrl||"",createdAt:Date.now(),updatedAt:Date.now()};return oe.items.unshift(i),Mn(),i}function Hi(e,t=null){let n=-1;if(t){let o=Ui(e,t);n=oe.items.findIndex(r=>r.key===o)}else n=oe.items.findIndex(o=>o.id===e);return n<0?!1:(oe.items.splice(n,1),Mn(),!0)}function ih(e,t){let n=oe.items.find(o=>o.id===e);return!n||!oe.books.some(o=>o.id===t)?!1:(n.bookId=t,n.updatedAt=Date.now(),Mn(),!0)}function ah(){return JSON.stringify(oe,null,2)}function lh(e){let t=JSON.parse(e);if(!t||!Array.isArray(t.books)||!Array.isArray(t.items))throw new Error("\u65E0\u6548\u7684\u751F\u8BCD\u672C JSON \u683C\u5F0F");for(let n of t.books)n?.id&&n?.name&&!oe.books.some(o=>o.id===n.id)&&oe.books.push({id:n.id,name:n.name,createdAt:n.createdAt||Date.now()});for(let n of t.items){if(!n?.word||!n?.lang)continue;let o=Ui(n.word,n.lang);if(!oe.items.some(r=>r.key===o)){let r=oe.books.some(s=>s.id===n.bookId)?n.bookId:oe.books[0].id;oe.items.push({...n,key:o,bookId:r})}}return Mn(),oe.items.length}var te=an({config:Q(),vocab:_c(),popover:{visible:!1,loading:!1,word:"",lang:"en",contextSentence:"",entry:null,activeSourceId:"",sentenceTranslation:"",sentenceLoading:!1,showBookPicker:!1,placement:"below",style:{}},selection:{visible:!1,text:"",lang:"en",translation:"",loading:!1,style:{}},modal:{visible:!1,activeTab:"vocab"}});function zr(){te.config=JSON.parse(JSON.stringify(Q()))}function Dt(){te.vocab=JSON.parse(JSON.stringify(_c()))}function ch(){Pc(),nh(),zr(),Dt()}function uo(e="general"){te.modal.activeTab=e,te.modal.visible=!0}function bc(){te.modal.visible=!1}var Nc="tl-option-language-settings",Sc="tl-option-vocab-book",jo=null;function by(e){let t=e.getElementById("options");t&&(t.style.display="none")}function uh(e,t,n,o,r){let s=e.createElement("a");return s.id=t,s.className="tl-ignore",s.innerHTML=`<i class="fa-lg fa-solid ${n}"></i><span>${o}</span>`,s.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),by(e),uo(r)}),s}function fh(){let e=Ee();e.getElementById("tl-settings-entry")?.remove(),e.getElementById("tl-options-entry")?.remove();let t=e.querySelector("#options .options-content")||e.getElementById("options_content")||e.getElementById("options");return t?(e.getElementById(Sc)||t.appendChild(uh(e,Sc,"fa-star","\u6211\u7684\u751F\u8BCD\u672C","vocab")),e.getElementById(Nc)||t.appendChild(uh(e,Nc,"fa-language","\u5916\u8BED\u5B66\u4E60\u8BBE\u7F6E","general")),!0):!1}function ph(){if(xc(),fh())return;let e=0;jo=setInterval(()=>{e++,(fh()||e>=20)&&(clearInterval(jo),jo=null)},500)}function xc(){jo&&(clearInterval(jo),jo=null);let e=Ee();e.getElementById(Nc)?.remove(),e.getElementById(Sc)?.remove(),e.getElementById("tl-settings-entry")?.remove(),e.getElementById("tl-options-entry")?.remove()}var Gr=new Map,fo=new Map,Ny=300,Sy=4500,It={noun:{abbr:"n.",cn:"\u540D\u8BCD",tone:"noun"},"proper noun":{abbr:"prop.n.",cn:"\u4E13\u6709\u540D\u8BCD",tone:"noun"},verb:{abbr:"v.",cn:"\u52A8\u8BCD",tone:"verb"},adjective:{abbr:"adj.",cn:"\u5F62\u5BB9\u8BCD",tone:"adj"},adverb:{abbr:"adv.",cn:"\u526F\u8BCD",tone:"adv"},pronoun:{abbr:"pron.",cn:"\u4EE3\u8BCD",tone:"other"},preposition:{abbr:"prep.",cn:"\u4ECB\u8BCD",tone:"other"},conjunction:{abbr:"conj.",cn:"\u8FDE\u8BCD",tone:"other"},interjection:{abbr:"int.",cn:"\u611F\u53F9\u8BCD",tone:"other"},article:{abbr:"art.",cn:"\u51A0\u8BCD",tone:"other"},determiner:{abbr:"det.",cn:"\u9650\u5B9A\u8BCD",tone:"other"},particle:{abbr:"part.",cn:"\u52A9\u8BCD",tone:"other"},expression:{abbr:"expr.",cn:"\u60EF\u7528\u8BED",tone:"other"},numeral:{abbr:"num.",cn:"\u6570\u8BCD",tone:"other"},prefix:{abbr:"pref.",cn:"\u524D\u7F00",tone:"other"},suffix:{abbr:"suff.",cn:"\u540E\u7F00",tone:"other"}};function tt(e){let t=String(e||"").toLowerCase().trim();return It[t]?It[t]:t.includes("noun")?It.noun:t.includes("verb")?It.verb:t.includes("adj")?It.adjective:t.includes("adv")?It.adverb:t.includes("pron")?It.pronoun:t.includes("prep")?It.preposition:t.includes("conj")?It.conjunction:t.includes("interj")?It.interjection:t.includes("part")?It.particle:t.includes("expr")?It.expression:{abbr:e||"\u8BCD\u9879",cn:"",tone:"other"}}function dh(e,t){if(fo.size>=Ny){let n=fo.keys().next().value;fo.delete(n)}fo.set(e,t)}function xy(e,t){return new Promise((n,o)=>{let r=setTimeout(()=>o(new Error("\u8BCD\u5178\u8BF7\u6C42\u8D85\u65F6")),t);e.then(s=>{clearTimeout(r),n(s)},s=>{clearTimeout(r),o(s)})})}function Gt(e){if(!e||!e.id)throw new Error("[TavernLanguage] registerDictionary \u9700\u8981 id \u5B57\u6BB5");return Gr.set(e.id,e),e}function ji(e=null){let t=[...Gr.values()];return e?t.filter(n=>n.languages.includes("*")||n.languages.includes(e)):t}function hh(e){return Gr.get(e)||null}function mh(){fo.clear()}function qr(e){let t=Q(),n=nt(e),o=t.dictionaryChains?.[e];return(Array.isArray(o)&&o.length>0?o:n?.defaultDictionaries||["wiktionary","ai-context"]).filter(s=>Gr.has(s))}async function Ty(e,t){let n=Q();if(!n.autoTranslateDict||!e||!Array.isArray(e.meanings))return e;let o=[];for(let r of e.meanings)for(let s of r.definitions||[])!s.cn&&s.text&&o.length<5&&o.push(s);if(o.length===0)return e;try{let r=o.map(a=>a.text).join(`
`),i=(await Vt(r,{from:"en",to:"zh-CN",providerId:n.translator==="tavern-ai"?"google":n.translator})).split(/\r?\n/).map(a=>a.trim());i.length===o.length&&o.forEach((a,l)=>{a.cn=i[l]||""})}catch{}return e}async function Wi(e,t={}){let n=String(e||"").trim();if(!n)return null;let o=Q(),r=t.lang||o.targetLang||"en",s=nt(r),i=t.sourceId||null,a=typeof t.onUpdate=="function"?t.onUpdate:null,l=`${i||"auto"}|${r}|${n.toLowerCase()}`;if(!t.bypassCache&&fo.has(l)){let m=fo.get(l);return a&&a(m,!1),m}let u=i?[i]:qr(r),f=!1,c="",p=i!=="ai-context"?Vt(n,{from:r,to:"zh-CN",providerId:o.translator==="tavern-ai"?"google":o.translator}).then(m=>(c=m,!f&&a&&m&&a({word:n,phonetic:"",reading:"",audioUrl:"",briefCn:m,tags:[],sourceId:"",sourceName:"",meanings:[]},!0),m)).catch(()=>""):Promise.resolve(""),d=null;for(let m of u){let N=Gr.get(m);if(N&&!(!i&&m==="ai-context"&&u.length>1))try{let C=m==="ai-context"?15e3:Sy,y=await xy(N.lookup(n,{lang:r,langDef:s,context:t.context||"",config:o}),C);if(y&&y.meanings&&y.meanings.length>0){y.sourceId=N.id,y.sourceName=N.name,!y.briefCn&&c&&(y.briefCn=c),d=y;break}}catch(C){console.warn(`[TavernLanguage] \u8BCD\u5178 ${m} \u67E5\u8BCD\u5931\u8D25 (${n}):`,C?.message||C)}}if(f=!0,d){a&&a({...d},!1);let[m]=await Promise.all([d.briefCn?Promise.resolve(d.briefCn):p,Ty(d,r)]);return!d.briefCn&&m&&(d.briefCn=m),dh(l,d),a&&a({...d},!1),d}let v=c||await p;if(v){let m={word:n,phonetic:"",reading:"",audioUrl:"",briefCn:v,tags:[],sourceId:"fallback-translate",sourceName:"\u76F4\u8BD1",meanings:[{pos:"translation",posInfo:{abbr:"\u8BD1",cn:"\u76F4\u8BD1",tone:"other"},definitions:[{text:"",cn:v,example:""}]}]};return dh(l,m),a&&a(m,!1),m}return null}var qt=null,Jr=null,Yr=null,Tc=0;function Ki(){te.popover.visible=!1,te.popover.showBookPicker=!1,qt&&(qt.classList.remove("tl-word-active"),qt=null)}function wy(e){let t=pe(),n=Ee(),o=t.visualViewport?.width||t.innerWidth,r=t.visualViewport?.height||t.innerHeight,s=10,i=26,a=e.getBoundingClientRect(),l=a.top-i-s,u=r-(a.bottom+i)-s;if(l<210&&u<210){let N=n.getElementById("chat");if(N&&N.scrollHeight>N.clientHeight){let C=Math.round(r*.28),y=a.top-C;N.scrollTop+=y,a=e.getBoundingClientRect()}}let f=Math.max(s,a.top-i),c=Math.min(r-s,a.bottom+i),p=f-s,v=r-c-s>=p?"below":"above",m={};if(v==="below"){let N=Math.min(r-180,Math.round(c+6)),C=Math.max(170,Math.min(400,Math.round(r-N-s-6)));m.top=`${N}px`,m.bottom="auto",m.maxHeight=`${C}px`}else{let N=Math.min(r-180,Math.round(r-f+6)),C=Math.max(170,Math.min(400,Math.round(r-N-s-6)));m.bottom=`${N}px`,m.top="auto",m.maxHeight=`${C}px`}if(o<=640)m.left=`${s}px`,m.right=`${s}px`,m.width="auto";else{let N=Math.min(368,o-s*2),C=Math.max(s,Math.min(a.left+a.width/2-N/2,o-N-s));m.left=`${Math.round(C)}px`,m.right="auto",m.width=`${N}px`}return{placement:v,style:m}}async function gh(e,t=null){let n=e.dataset.tlWord||e.textContent||"",o=e.dataset.tlLang||Q().targetLang||"en";if(!n.trim())return;qt&&qt!==e&&qt.classList.remove("tl-word-active"),qt=e,qt.classList.add("tl-word-active");let r=Fc(e),{placement:s,style:i}=wy(e),a=++Tc,l=te.popover;l.visible=!0,l.loading=!0,l.word=n,l.lang=o,l.contextSentence=r,l.entry=null,l.activeSourceId=t||"",l.sentenceTranslation="",l.sentenceLoading=!1,l.showBookPicker=!1,l.placement=s,l.style=i,!t&&Q().autoSpeakWord&&vo(n,{lang:o}).catch(()=>{});let u=await Wi(n,{lang:o,context:r,sourceId:t,onUpdate(f,c){a!==Tc||!te.popover.visible||(l.entry=f,l.loading=c,f?.sourceId&&(l.activeSourceId=t||f.sourceId),!t&&Q().autoSpeakWord&&f?.audioUrl&&vo(n,{lang:o,audioUrl:f.audioUrl}).catch(()=>{}))}});a!==Tc||!te.popover.visible||(l.loading=!1,u&&(l.entry=u,l.activeSourceId=t||u.sourceId||""))}function Eh(){wc();let e=Ee();Jr=t=>{if(t.target?.closest?.(".tl-popover, .tl-sel-bar, .tl-modal-backdrop"))return;let n=t.target?.closest?.("span.tl-word");if(n&&Q().enabled){if(!Gc(t))return;t.stopPropagation(),gh(n);return}te.popover.visible&&Ki()},Yr=t=>{t.key==="Escape"&&te.popover.visible&&Ki()},e.addEventListener("click",Jr,!1),e.addEventListener("keydown",Yr,!1)}function wc(){Ki();let e=Ee();Jr&&(e.removeEventListener("click",Jr,!1),Jr=null),Yr&&(e.removeEventListener("keydown",Yr,!1),Yr=null)}var vh=it({name:"WordPopover",setup(){let e=te.popover,t=Fe(()=>qr(e.lang).map(v=>hh(v)).filter(Boolean)),n=Fe(()=>(te.vocab.items,oh(e.entry?.word||e.word,e.lang))),o=Fe(()=>te.vocab.books||[]);function r(){return e.entry?.word||e.word}function s(){vo(r(),{lang:e.lang,audioUrl:e.entry?.audioUrl||""}).catch(()=>{})}function i(d){d&&Qt(d,{lang:e.lang}).catch(()=>{})}function a(){e.contextSentence&&Qt(e.contextSentence,{lang:e.lang}).catch(()=>{})}async function l(){if(!(!e.contextSentence||e.sentenceLoading)){e.sentenceLoading=!0,e.sentenceTranslation="";try{e.sentenceTranslation=await Vt(e.contextSentence,{from:e.lang,to:"zh-CN"})}catch(d){e.sentenceTranslation=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${d?.message||"\u7F51\u7EDC\u5F02\u5E38"}`}finally{e.sentenceLoading=!1}}}function u(d){qt&&gh(qt,d)}function f(d){let v=e.entry?.meanings?.[0],m=v?.definitions?.[0];return{word:r(),lang:e.lang,bookId:d,phonetic:e.entry?.phonetic||"",reading:e.entry?.reading||"",pos:v?.posInfo?.abbr||v?.pos||"",briefCn:e.entry?.briefCn||m?.cn||m?.text||"",context:e.contextSentence||"",audioUrl:e.entry?.audioUrl||""}}function c(){let d=r();if(n.value)Hi(d,e.lang),Dt(),Se(`\u5DF2\u79FB\u51FA\u751F\u8BCD\u672C\uFF1A${d}`,"info");else{let v=te.vocab.activeBookId;yc(f(v)),Dt();let m=o.value.find(N=>N.id===v)?.name||"\u751F\u8BCD\u672C";Se(`\u5DF2\u6536\u85CF\u5230\u300C${m}\u300D`,"success")}}function p(d){Bi(d),yc(f(d)),Dt(),e.showBookPicker=!1;let v=o.value.find(m=>m.id===d)?.name||"\u751F\u8BCD\u672C";Se(`\u5DF2\u4FDD\u5B58\u5230\u300C${v}\u300D`,"success")}return{pop:e,sources:t,starredItem:n,books:o,closeWordPopover:Ki,onSpeakWord:s,onSpeakExample:i,onSpeakSentence:a,onTranslateSentence:l,onSwitchSource:u,onToggleStar:c,onSaveToBook:p}},template:`
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
        <div v-if="pop.entry && pop.entry.meanings && pop.entry.meanings.length">
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
                title="\u6717\u8BFB\u4F8B\u53E5"
              >
                <i class="fa-solid fa-volume-high"></i>
                <span>{{ d.example }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="pop.loading" class="tl-def-orig tl-loading-row">
          <i class="fa-solid fa-spinner fa-spin"></i>
          <span>{{ pop.entry?.briefCn ? '\u52A0\u8F7D\u8BE6\u7EC6\u8BCD\u5178...' : '\u67E5\u8BE2\u4E2D...' }}</span>
        </div>

        <div v-else-if="!pop.entry" class="tl-def-orig">
          \u672A\u627E\u5230\u8BCD\u6761\uFF0C\u53EF\u5207\u6362\u300CAI \u7CBE\u8BB2\u300D\u6216\u7FFB\u8BD1\u6574\u53E5
        </div>

        <div v-if="pop.sentenceLoading || pop.sentenceTranslation" class="tl-sentence-box">
          <div class="tl-sentence-orig">{{ pop.contextSentence }}</div>
          <div v-if="pop.sentenceLoading" class="tl-def-orig">
            <i class="fa-solid fa-spinner fa-spin"></i>
          </div>
          <div v-else class="tl-sentence-cn">{{ pop.sentenceTranslation }}</div>
        </div>
      </div>

      <div class="tl-pop-footer">
        <span class="tl-pop-footer-label">\u6574\u53E5</span>
        <div class="tl-pop-footer-actions">
          <button type="button" class="tl-icon-btn" @click="onSpeakSentence" title="\u6717\u8BFB\u6574\u53E5">
            <i class="fa-solid fa-volume-high"></i>
          </button>
          <button type="button" class="tl-icon-btn" @click="onTranslateSentence" title="\u7FFB\u8BD1\u6574\u53E5">
            <i class="fa-solid fa-language"></i>
          </button>
        </div>
      </div>
    </div>
  `});var po=null,Qr=null,Wo=null;function Xi(){te.selection.visible=!1,te.selection.text="",te.selection.translation="",te.selection.loading=!1}function Oy(e){let t=pe(),n=t.visualViewport?.width||t.innerWidth,o=t.visualViewport?.height||t.innerHeight,r=10;if(n<=640)return e.top<110?{left:`${r}px`,right:`${r}px`,top:`${Math.min(o-90,Math.round(e.bottom+12))}px`}:{left:`${r}px`,right:`${r}px`,bottom:`${Math.max(r,Math.round(o-e.top+12))}px`};let s=310,i=Math.max(r,Math.min(e.left+e.width/2-s/2,n-s-r));return e.top<110?{left:`${Math.round(i)}px`,top:`${Math.min(o-80,Math.round(e.bottom+10))}px`}:{left:`${Math.round(i)}px`,bottom:`${Math.max(r,Math.round(o-e.top+10))}px`}}function Cy(){if(!Q().enabled){Xi();return}let t=pe().getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return;let n=t.toString().replace(/\s+/g," ").trim();if(n.length<2)return;let o=t.getRangeAt(0),r=o.commonAncestorContainer.nodeType===1?o.commonAncestorContainer:o.commonAncestorContainer.parentElement;if(!r||!r.closest(".mes_text")||r.closest(".tl-trans-block, .tl-mes-footer"))return;let s=o.getBoundingClientRect();!s||s.width===0&&s.height===0||(te.selection.text=n,te.selection.lang=Q().targetLang||"en",te.selection.translation="",te.selection.loading=!1,te.selection.style=Oy(s),te.selection.visible=!0)}function _h(){Oc();let e=Ee();po=t=>{t.target?.closest?.(".tl-sel-bar, .tl-popover, .tl-modal-backdrop")||(Wo&&clearTimeout(Wo),Wo=setTimeout(Cy,70))},Qr=t=>{te.selection.visible&&!t.target?.closest?.(".tl-sel-bar")&&Xi()},e.addEventListener("mouseup",po,!1),e.addEventListener("touchend",po,!1),e.addEventListener("mousedown",Qr,!1)}function Oc(){Wo&&(clearTimeout(Wo),Wo=null),Xi();let e=Ee();po&&(e.removeEventListener("mouseup",po,!1),e.removeEventListener("touchend",po,!1),po=null),Qr&&(e.removeEventListener("mousedown",Qr,!1),Qr=null)}var yh=it({name:"SelectionBar",setup(){let e=te.selection;async function t(){if(!(!e.text||e.loading)){e.loading=!0,e.translation="";try{e.translation=await Vt(e.text,{from:e.lang,to:"zh-CN"})}catch(r){e.translation=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${r?.message||"\u7F51\u7EDC\u5F02\u5E38"}`}finally{e.loading=!1}}}function n(){e.text&&Qt(e.text,{lang:e.lang}).catch(()=>{})}async function o(){try{await pe().navigator.clipboard.writeText(e.text),Se("\u5DF2\u590D\u5236\u9009\u4E2D\u6587\u672C","success")}catch{Se("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236","warning")}}return{sel:e,onTranslate:t,onSpeak:n,onCopy:o,closeSelectionBar:Xi}},template:`
    <div v-if="sel.visible" class="tl-sel-bar tl-ignore" :style="sel.style" @click.stop>
      <div class="tl-sel-actions">
        <button type="button" class="tl-icon-btn" @click="onTranslate" title="\u7FFB\u8BD1">
          <i class="fa-solid fa-language"></i>
        </button>
        <button type="button" class="tl-icon-btn" @click="onSpeak" title="\u6717\u8BFB">
          <i class="fa-solid fa-volume-high"></i>
        </button>
        <button type="button" class="tl-icon-btn" @click="onCopy" title="\u590D\u5236">
          <i class="fa-regular fa-copy"></i>
        </button>
        <button type="button" class="tl-icon-btn" @click="closeSelectionBar" title="\u5173\u95ED">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div v-if="sel.loading || sel.translation" class="tl-sel-result">
        <span v-if="sel.loading"><i class="fa-solid fa-spinner fa-spin"></i></span>
        <span v-else>{{ sel.translation }}</span>
      </div>
    </div>
  `});var bh=it({name:"VocabBookView",setup(){let e=ht("all"),t=ht("all"),n=ht(""),o=ht(""),r=ht(!1),s=Fe(()=>te.vocab.books||[]),i=Fe(()=>(te.vocab.items||[]).length),a=Fe(()=>te.vocab.activeBookId),l=Fe(()=>go()),u=Fe(()=>{let b=n.value.trim().toLowerCase();return(te.vocab.items||[]).filter(g=>!(e.value!=="all"&&g.bookId!==e.value||t.value!=="all"&&g.lang!==t.value||b&&!`${g.word} ${g.briefCn} ${g.reading} ${g.context}`.toLowerCase().includes(b)))});function f(b){return(te.vocab.items||[]).filter(g=>g.bookId===b).length}function c(){let b=o.value.trim();if(!b)return;let g=rh(b);g&&(Dt(),e.value=g.id,o.value="",r.value=!1,Se(`\u5DF2\u65B0\u5EFA\u5355\u8BCD\u672C\u300C${g.name}\u300D`,"success"))}function p(b){Bi(b),Dt(),Se("\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u85CF\u5355\u8BCD\u672C","success")}function d(b){if(s.value.length<=1){Se("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u5355\u8BCD\u672C","warning");return}sh(b.id),Dt(),e.value===b.id&&(e.value="all"),Se(`\u5DF2\u5220\u9664\u300C${b.name}\u300D\uFF0C\u8BCD\u6761\u5DF2\u4FDD\u7559\u5230\u9ED8\u8BA4\u672C`,"info")}function v(b,g){ih(b.id,g.target.value),Dt(),Se("\u5DF2\u79FB\u52A8\u81F3\u76EE\u6807\u5355\u8BCD\u672C","success")}function m(b){Hi(b.id),Dt()}function N(b){vo(b.word,{lang:b.lang,audioUrl:b.audioUrl}).catch(()=>{})}function C(b){b.context&&Qt(b.context,{lang:b.lang}).catch(()=>{})}async function y(){try{await pe().navigator.clipboard.writeText(ah()),Se("\u751F\u8BCD\u672C JSON \u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F","success")}catch{Se("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u526A\u8D34\u677F\u6743\u9650","warning")}}function E(){let g=pe().prompt("\u8BF7\u7C98\u8D34\u4E4B\u524D\u5BFC\u51FA\u7684\u751F\u8BCD\u672C JSON\uFF1A");if(g)try{let O=lh(g);Dt(),Se(`\u5BFC\u5165\u6210\u529F\uFF0C\u5F53\u524D\u5171 ${O} \u6761\u751F\u8BCD`,"success")}catch(O){Se(`\u5BFC\u5165\u5931\u8D25\uFF1A${O?.message||"\u683C\u5F0F\u9519\u8BEF"}`,"error")}}return{selectedBookId:e,selectedLang:t,searchQuery:n,newBookName:o,showCreateBook:r,books:s,totalCount:i,activeBookId:a,languages:l,filteredItems:u,countByBook:f,onCreateBook:c,onSetDefaultBook:p,onDeleteBook:d,onMoveItem:v,onRemoveItem:m,onSpeakItem:N,onSpeakContext:C,onExport:y,onImport:E}},template:`
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

      <div v-if="showCreateBook" class="tl-inline-form">
        <input
          v-model="newBookName"
          type="text"
          class="tl-input"
          placeholder="\u8F93\u5165\u5355\u8BCD\u672C\u540D\u79F0"
          @keyup.enter="onCreateBook"
        />
        <button type="button" class="tl-btn tl-btn-primary" @click="onCreateBook">\u521B\u5EFA</button>
      </div>

      <div v-if="selectedBookId !== 'all'" class="tl-book-manage-row">
        <button
          v-if="selectedBookId !== activeBookId"
          type="button"
          class="tl-icon-btn"
          @click="onSetDefaultBook(selectedBookId)"
          title="\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u85CF\u672C"
        >
          <i class="fa-regular fa-star"></i><span>\u8BBE\u4E3A\u9ED8\u8BA4</span>
        </button>
        <span v-else class="tl-hint" style="margin:0;">
          <i class="fa-solid fa-star"></i> \u9ED8\u8BA4\u672C
        </span>
        <button
          v-if="books.length > 1"
          type="button"
          class="tl-icon-btn"
          @click="onDeleteBook(books.find(b => b.id === selectedBookId))"
          title="\u5220\u9664\u5F53\u524D\u5355\u8BCD\u672C"
        >
          <i class="fa-regular fa-trash-can"></i>
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
        <button type="button" class="tl-icon-btn" @click="onExport" title="\u5BFC\u51FA JSON">
          <i class="fa-solid fa-file-export"></i>
        </button>
        <button type="button" class="tl-icon-btn" @click="onImport" title="\u5BFC\u5165 JSON">
          <i class="fa-solid fa-file-import"></i>
        </button>
      </div>
    </div>
  `});var Ay=["details","blockquote","table","thinking","status",".status-bar","em","strong"],Nh=it({name:"SettingsModal",components:{VocabBookView:bh},setup(){let e=te.modal,t=an({enabled:!0,targetLang:"en",theme:"tavern",promptInjection:{enabled:!0,level:"B1",promptText:"",depth:0},dictionaryChains:{},autoTranslateDict:!0,autoSpeakWord:!1,translator:"google",customAi:{baseUrl:"",apiKey:"",model:""},tts:{engine:"auto",rate:1,enAccent:"us"},ui:{showWordUnderline:!0,autoShowMesButtons:!0},excludeText:""});function n(){let y=JSON.parse(JSON.stringify(Q()));Object.assign(t,y),t.promptInjection.promptText=ea(y),t.excludeText=Go(y.excludeSelectors).join(", ")}Vo(()=>e.visible,y=>{y&&n()},{immediate:!0});let o=Fe(()=>go()),r=Fe(()=>ls()),s=Fe(()=>nt(t.targetLang)),i=Fe(()=>s.value?.levels||[]),a=Fe(()=>{let y=t.targetLang,E=t.dictionaryChains?.[y];return Array.isArray(E)&&E.length>0?E:qr(y)}),l=Fe(()=>{let y=ji(t.targetLang),E=a.value;return[...E.map(b=>y.find(g=>g.id===b)).filter(Boolean),...y.filter(b=>!E.includes(b.id))]});function u(){let y=i.value;y.length&&!y.some(E=>E.id===t.promptInjection.level)&&(t.promptInjection.level=y[1]?.id||y[0].id),t.promptInjection.promptText=Jo(t.targetLang,t.promptInjection.level)}function f(){t.promptInjection.promptText=Jo(t.targetLang,t.promptInjection.level)}function c(){t.promptInjection.promptText=Jo(t.targetLang,t.promptInjection.level)}function p(y){return a.value.includes(y)}function d(y,E){let b=t.targetLang,g=[...a.value];if(E&&!g.includes(y))g.push(y);else if(!E){let O=g.indexOf(y);O>=0&&g.splice(O,1)}t.dictionaryChains={...t.dictionaryChains,[b]:g}}function v(y,E){let b=t.targetLang,g=[...a.value],O=g.indexOf(y),D=O+E;O>=0&&D>=0&&D<g.length&&([g[O],g[D]]=[g[D],g[O]],t.dictionaryChains={...t.dictionaryChains,[b]:g})}function m(y){let E=Go(t.excludeText);E.includes(y)||(E.push(y),t.excludeText=E.join(", "))}function N(){mh(),Uc(),Se("\u7F13\u5B58\u5DF2\u6E05\u7406","success")}function C(){let y=JSON.parse(JSON.stringify(t));y.excludeSelectors=Go(t.excludeText),y.tts.rate=Number(t.tts.rate)||1,delete y.excludeText,ns(y),zr(),bc(),Se("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58","success")}return{VERSION:zo,QUICK_EXCLUDE_CHIPS:Ay,modal:e,draft:t,languages:o,translators:r,currentLangDef:s,currentLevels:i,orderedDictionaries:l,closeModal:bc,onLangChange:u,onLevelChange:f,onResetPrompt:c,isDictEnabled:p,toggleDict:d,moveDict:v,addExcludeChip:m,onClearCache:N,onSave:C}},template:`
    <div v-if="modal.visible" class="tl-modal-backdrop tl-ignore" @click.self="closeModal">
      <div class="tl-modal">
        <div class="tl-modal-header">
          <div class="tl-modal-title">
            <i class="fa-solid fa-language"></i>
            <span>\u5916\u8BED\u5B66\u4E60</span>
            <span class="tl-modal-version">v{{ VERSION }}</span>
          </div>
          <button type="button" class="tl-icon-btn" @click="closeModal" title="\u5173\u95ED">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="tl-tabs">
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'vocab' }" @click="modal.activeTab = 'vocab'">\u751F\u8BCD\u672C</button>
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'general' }" @click="modal.activeTab = 'general'">\u57FA\u7840</button>
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'dict' }" @click="modal.activeTab = 'dict'">\u8BCD\u5178</button>
          <button type="button" class="tl-tab" :class="{ 'tl-active': modal.activeTab === 'exclude' }" @click="modal.activeTab = 'exclude'">\u6392\u9664</button>
        </div>

        <div class="tl-modal-body">
          <!-- Tab 0: \u751F\u8BCD\u672C -->
          <VocabBookView v-if="modal.activeTab === 'vocab'" />

          <!-- Tab 1: \u57FA\u7840 -->
          <div v-else-if="modal.activeTab === 'general'">
            <div class="tl-field-row">
              <span class="tl-label" style="margin:0;">\u542F\u7528\u63D2\u4EF6</span>
              <input type="checkbox" v-model="draft.enabled" />
            </div>

            <div class="tl-field">
              <label class="tl-label">\u5B66\u4E60\u8BED\u79CD</label>
              <select class="tl-select" v-model="draft.targetLang" @change="onLangChange">
                <option v-for="l in languages" :key="l.code" :value="l.code">{{ l.name }}</option>
              </select>
            </div>

            <div class="tl-field">
              <label class="tl-label">\u754C\u9762\u4E3B\u9898</label>
              <select class="tl-select" v-model="draft.theme">
                <option value="tavern">\u8DDF\u968F\u9152\u9986</option>
                <option value="light">\u65E5\u95F4</option>
                <option value="dark">\u591C\u95F4</option>
              </select>
            </div>

            <div class="tl-field-row">
              <span class="tl-label" style="margin:0;">\u81EA\u52A8\u6CE8\u5165\u5916\u8BED\u63D0\u793A\u8BCD</span>
              <input type="checkbox" v-model="draft.promptInjection.enabled" />
            </div>

            <div class="tl-field" :style="{ opacity: draft.promptInjection.enabled ? 1 : 0.45 }">
              <label class="tl-label">\u8BED\u8A00\u96BE\u5EA6</label>
              <select class="tl-select" v-model="draft.promptInjection.level" @change="onLevelChange">
                <option v-for="lv in currentLevels" :key="lv.id" :value="lv.id">{{ lv.label }}</option>
              </select>
            </div>

            <div class="tl-field" :style="{ opacity: draft.promptInjection.enabled ? 1 : 0.45 }">
              <div class="tl-label-row">
                <label class="tl-label" style="margin:0;">\u6CE8\u5165\u63D0\u793A\u8BCD\u5185\u5BB9</label>
                <button type="button" class="tl-icon-btn" @click="onResetPrompt" title="\u6062\u590D\u9ED8\u8BA4\u63D0\u793A\u8BCD">
                  <i class="fa-solid fa-rotate-left"></i>
                </button>
              </div>
              <textarea
                class="tl-textarea tl-prompt-textarea"
                v-model="draft.promptInjection.promptText"
                placeholder="\u8F93\u5165\u8981\u6CE8\u5165\u7ED9 AI \u7684\u5916\u8BED\u56DE\u590D\u63D0\u793A\u8BCD"
              ></textarea>
            </div>

            <div class="tl-field-row">
              <span class="tl-label" style="margin:0;">\u60AC\u505C\u4E0B\u5212\u7EBF</span>
              <input type="checkbox" v-model="draft.ui.showWordUnderline" />
            </div>

            <div class="tl-field-row">
              <span class="tl-label" style="margin:0;">\u6D88\u606F\u5E95\u90E8\u7FFB\u8BD1\u4E0E\u6717\u8BFB</span>
              <input type="checkbox" v-model="draft.ui.autoShowMesButtons" />
            </div>
          </div>

          <!-- Tab 2: \u8BCD\u5178\u4E0E\u7FFB\u8BD1 -->
          <div v-else-if="modal.activeTab === 'dict'">
            <div class="tl-field">
              <label class="tl-label">\u8BCD\u5178\u4F18\u5148\u7EA7</label>
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
              <span class="tl-label" style="margin:0;">\u91CA\u4E49\u81EA\u52A8\u8865\u5168\u4E2D\u6587</span>
              <input type="checkbox" v-model="draft.autoTranslateDict" />
            </div>

            <div class="tl-field-row">
              <span class="tl-label" style="margin:0;">\u70B9\u8BCD\u81EA\u52A8\u53D1\u97F3</span>
              <input type="checkbox" v-model="draft.autoSpeakWord" />
            </div>

            <div class="tl-field">
              <label class="tl-label">\u7FFB\u8BD1\u5F15\u64CE</label>
              <select class="tl-select" v-model="draft.translator">
                <option v-for="t in translators" :key="t.id" :value="t.id">{{ t.name }}</option>
              </select>
            </div>

            <div class="tl-field">
              <label class="tl-label">\u81EA\u5B9A\u4E49 AI \u63A5\u53E3</label>
              <input type="text" class="tl-input" style="margin-bottom:6px;" v-model="draft.customAi.baseUrl" placeholder="Base URL" />
              <input type="password" class="tl-input" style="margin-bottom:6px;" v-model="draft.customAi.apiKey" placeholder="API Key" />
              <input type="text" class="tl-input" v-model="draft.customAi.model" placeholder="\u6A21\u578B\u540D\u79F0" />
            </div>

            <div class="tl-field">
              <label class="tl-label">\u6717\u8BFB\u8BBE\u7F6E</label>
              <div class="tl-tts-grid">
                <select class="tl-select" v-model="draft.tts.engine">
                  <option value="auto">\u81EA\u52A8</option>
                  <option value="webspeech">\u6D4F\u89C8\u5668\u8BED\u97F3</option>
                  <option value="youdao">\u6709\u9053\u8BED\u97F3</option>
                </select>
                <select class="tl-select" v-model="draft.tts.enAccent">
                  <option value="us">\u7F8E\u5F0F\u82F1\u8BED</option>
                  <option value="uk">\u82F1\u5F0F\u82F1\u8BED</option>
                </select>
                <select class="tl-select" v-model.number="draft.tts.rate">
                  <option :value="0.7">0.7x</option>
                  <option :value="0.85">0.85x</option>
                  <option :value="1">1.0x</option>
                  <option :value="1.2">1.2x</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Tab 3: \u6392\u9664\u6807\u7B7E -->
          <div v-else>
            <div class="tl-field">
              <label class="tl-label">\u6392\u9664\u6807\u7B7E\u4E0E\u9009\u62E9\u5668</label>
              <textarea
                class="tl-textarea"
                v-model="draft.excludeText"
                placeholder="\u9017\u53F7\u6216\u6362\u884C\u5206\u9694\uFF0C\u5982 code, pre, details, .status-bar"
              ></textarea>
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
          </div>
        </div>

        <div v-if="modal.activeTab !== 'vocab'" class="tl-modal-footer">
          <button type="button" class="tl-icon-btn" @click="onClearCache" title="\u6E05\u7406\u7F13\u5B58">
            <i class="fa-solid fa-broom"></i>
          </button>
          <div style="flex:1;"></div>
          <button type="button" class="tl-btn" @click="closeModal">\u53D6\u6D88</button>
          <button type="button" class="tl-btn tl-btn-primary" @click="onSave">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `});var Sh="tl-vue-root",Zr=null,Ln=null,Dy=it({name:"TavernLanguageRoot",components:{WordPopover:vh,SelectionBar:yh,SettingsModal:Nh},template:`
    <WordPopover />
    <SelectionBar />
    <SettingsModal />
  `});function xh(){Cc();let e=Ee();Ln=e.createElement("div"),Ln.id=Sh,Ln.className="tl-ignore",e.body.appendChild(Ln),Zr=Rr(Dy),Zr.mount(Ln)}function Cc(){if(Zr){try{Zr.unmount()}catch{}Zr=null}Ln&&(Ln.remove(),Ln=null);let e=Ee().getElementById(Sh);e&&e.remove()}var Th=/([A-Za-z]+(?:['’][A-Za-z]+)?(?:-[A-Za-z]+)*)/g,QN=yn({code:"en",name:"\u82F1\u8BED",nativeName:"English",bcp47:"en-US",googleCode:"en",wiktionaryLang:"English",youdaoLang:"en",defaultDictionaries:["free-dict","wiktionary","ai-context"],levels:[{id:"A2",label:"A2 \u521D\u7EA7",desc:"Use simple A2-level English with short, clear sentences and high-frequency daily vocabulary."},{id:"B1",label:"B1 \u4E2D\u7EA7",desc:"Use natural B1-level intermediate English with everyday expressions and moderate sentence complexity."},{id:"B2",label:"B2 \u4E2D\u9AD8\u7EA7",desc:"Use rich, idiomatic B2-level upper-intermediate English with nuanced phrasing."},{id:"C1",label:"C1 \u9AD8\u7EA7",desc:"Use sophisticated C1-level advanced English with vivid literary vocabulary and natural idioms."},{id:"native",label:"\u6BCD\u8BED\u7EA7",desc:"Use completely natural, authentic native-level English matching the character and setting."}],tokenize(e){let t=[],n=0;Th.lastIndex=0;let o;for(;(o=Th.exec(e))!==null;){o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1});let r=o[0];t.push({text:r,lookup:r.replace(/’/g,"'"),isWord:r.length>=1}),n=o.index+r.length}return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: English]","Write your ENTIRE response strictly in English (dialogue, narration, actions, and thoughts). Do not translate into Chinese unless explicitly asked in-character.",(this.levels.find(o=>o.id===e)||this.levels[1]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var Iy=/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u3400-\u4DBFー]/,wh=/([\u4E00-\u9FFF\u3400-\u4DBF]+[\u3040-\u309F]*|[\u30A0-\u30FFー]+|[\u3040-\u309F]{2,})/g,zi=null;try{typeof Intl<"u"&&typeof Intl.Segmenter=="function"&&(zi=new Intl.Segmenter("ja",{granularity:"word"}))}catch{zi=null}var tS=yn({code:"ja",name:"\u65E5\u8BED",nativeName:"\u65E5\u672C\u8A9E",bcp47:"ja-JP",googleCode:"ja",wiktionaryLang:"Japanese",youdaoLang:"ja",defaultDictionaries:["jotoba","wiktionary","ai-context"],levels:[{id:"N5",label:"JLPT N5",desc:"Use beginner JLPT N5-level Japanese with simple grammar and basic everyday words."},{id:"N4",label:"JLPT N4",desc:"Use JLPT N4-level Japanese with clear conversational expressions."},{id:"N3",label:"JLPT N3",desc:"Use natural JLPT N3-level intermediate Japanese suitable for everyday conversation and light fiction."},{id:"N2",label:"JLPT N2",desc:"Use natural JLPT N2-level Japanese with rich expressions and nuanced tone."},{id:"native",label:"\u6BCD\u8BED\u7EA7",desc:"Use completely natural, authentic native Japanese matching the character personality and context."}],tokenize(e){if(zi){let r=[];for(let s of zi.segment(e)){let i=!!(s.isWordLike&&Iy.test(s.segment));r.push({text:s.segment,lookup:s.segment,isWord:i})}return r}let t=[],n=0;wh.lastIndex=0;let o;for(;(o=wh.exec(e))!==null;)o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1}),t.push({text:o[0],lookup:o[0],isWord:!0}),n=o.index+o[0].length;return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: Japanese]","Write your ENTIRE response strictly in Japanese (dialogue, narration, actions, and thoughts). Do not include Chinese translations or romaji unless explicitly asked.",(this.levels.find(o=>o.id===e)||this.levels[2]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var Oh="A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0152\u0153\xC6\xE6",Ch=new RegExp(`([${Oh}]+(?:-[${Oh}]+)*)`,"g"),rS=yn({code:"fr",name:"\u6CD5\u8BED",nativeName:"Fran\xE7ais",bcp47:"fr-FR",googleCode:"fr",wiktionaryLang:"French",youdaoLang:"fr",defaultDictionaries:["wiktionary","ai-context"],levels:[{id:"A2",label:"A2 \u521D\u7EA7",desc:"Use clear A2-level French with simple sentences and everyday vocabulary."},{id:"B1",label:"B1 \u4E2D\u7EA7",desc:"Use natural B1-level intermediate French with common idiomatic expressions."},{id:"B2",label:"B2 \u4E2D\u9AD8\u7EA7",desc:"Use expressive, idiomatic B2-level French with natural nuance."},{id:"C1",label:"C1 \u9AD8\u7EA7",desc:"Use refined C1-level French with rich literary vocabulary and authentic turns of phrase."},{id:"native",label:"\u6BCD\u8BED\u7EA7",desc:"Use completely authentic, natural native-level French matching the character and atmosphere."}],tokenize(e){let t=[],n=0;Ch.lastIndex=0;let o;for(;(o=Ch.exec(e))!==null;){o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1});let r=o[0];t.push({text:r,lookup:r,isWord:r.length>=1}),n=o.index+r.length}return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: French]","Write your ENTIRE response strictly in French (dialogue, narration, actions, and thoughts). Do not translate into Chinese unless explicitly asked in-character.",(this.levels.find(o=>o.id===e)||this.levels[1]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var aS=Gt({id:"free-dict",name:"Free Dictionary",description:"\u82F1\u8BED\u6743\u5A01\u5F00\u6E90\u8BCD\u5178\uFF0C\u63D0\u4F9B\u97F3\u6807\u3001\u8BCD\u6027\u3001\u4F8B\u53E5\u4E0E\u771F\u4EBA\u53D1\u97F3",languages:["en"],async lookup(e,{config:t}){let n=e.toLowerCase().replace(/^['’]+|['’]+$/g,""),o=`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(n)}`,r=await fetch(o);if(!r.ok)return null;let s=await r.json();if(!Array.isArray(s)||s.length===0)return null;let i=s[0],a=t?.tts?.enAccent||"us",l=i.phonetic||"",u="",f=Array.isArray(i.phonetics)?i.phonetics:[];for(let p of f)if(!l&&p.text&&(l=p.text),p.audio){let d=p.audio.toLowerCase();if(u||(u=p.audio),a==="uk"&&d.includes("-uk")){u=p.audio,p.text&&(l=p.text);break}if(a==="us"&&d.includes("-us")){u=p.audio,p.text&&(l=p.text);break}}let c=[];for(let p of i.meanings||[]){let d=(p.definitions||[]).slice(0,3).map(v=>({text:v.definition||"",cn:"",example:v.example||""}));d.length>0&&c.push({pos:p.partOfSpeech||"",posInfo:tt(p.partOfSpeech),definitions:d})}return c.length===0?null:{word:i.word||e,phonetic:l,reading:"",audioUrl:u,briefCn:"",tags:[],meanings:c}}});function ky(e){if(!Array.isArray(e)||e.length===0)return{raw:"word",info:tt("")};let t=e[0],n="";typeof t=="string"?n=t:t&&typeof t=="object"&&(n=Object.keys(t)[0]||"");let o=n.toLowerCase();return o.includes("noun")?{raw:"noun",info:tt("noun")}:o.includes("verb")||o.includes("godan")||o.includes("ichidan")?{raw:"verb",info:tt("verb")}:o.includes("adj")?{raw:"adjective",info:tt("adjective")}:o.includes("adv")?{raw:"adverb",info:tt("adverb")}:o.includes("part")?{raw:"particle",info:tt("particle")}:o.includes("expr")?{raw:"expression",info:tt("expression")}:{raw:n,info:tt(n)}}var uS=Gt({id:"jotoba",name:"Jotoba",description:"\u65E5\u8BED\u8BCD\u5178\uFF0C\u542B\u5047\u540D\u8BFB\u97F3\u3001\u8BCD\u6027\u4E0E\u53D1\u97F3",languages:["ja"],async lookup(e){let t=await fetch("https://jotoba.de/api/search/words",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:e,language:"English",no_english:!1})});if(!t.ok)return null;let o=(await t.json())?.words;if(!Array.isArray(o)||o.length===0)return null;let r=o.find(c=>c.reading?.kanji===e||c.reading?.kana===e)||o[0],s=r.reading?.kanji||"",i=r.reading?.kana||"",a=r.audio?`https://jotoba.de${r.audio}`:"",l=[];r.common&&l.push("\u5E38\u7528\u8BCD");let u=new Map;for(let c of(r.senses||[]).slice(0,5)){let{raw:p,info:d}=ky(c.pos),v=Array.isArray(c.glosses)?c.glosses.slice(0,4).join("; "):"";if(!v)continue;let m=d.abbr||p;u.has(m)||u.set(m,{pos:p,posInfo:d,definitions:[]}),u.get(m).definitions.push({text:v,cn:"",example:""})}let f=[...u.values()];return f.length===0?null:{word:s||i||e,phonetic:"",reading:i&&i!==s?i:"",audioUrl:a,briefCn:"",tags:l,meanings:f}}});function Ah(e){return String(e||"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g," ").trim()}var dS=Gt({id:"wiktionary",name:"Wiktionary",description:"\u591A\u8BED\u79CD\u5F00\u6E90\u8BCD\u5178\uFF0C\u8986\u76D6\u82F1/\u65E5/\u6CD5\u53CA\u5C0F\u8BED\u79CD",languages:["*"],async lookup(e,{lang:t,langDef:n}){let o=[e];e!==e.toLowerCase()&&o.push(e.toLowerCase());let r=null,s=e;for(let l of o){let u=`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(l)}`,f=await fetch(u);if(f.ok){r=await f.json(),s=l;break}}if(!r||typeof r!="object")return null;let i=r[t]||r[n?.code]||null;if(!Array.isArray(i)||i.length===0)return null;let a=[];for(let l of i.slice(0,4)){let u=[];for(let f of(l.definitions||[]).slice(0,3)){let c=Ah(f.definition);if(!c)continue;let p=Array.isArray(f.examples)&&f.examples[0]?Ah(f.examples[0]):"";u.push({text:c,cn:"",example:p})}u.length>0&&a.push({pos:l.partOfSpeech||"",posInfo:tt(l.partOfSpeech),definitions:u})}return a.length===0?null:{word:s,phonetic:"",reading:"",audioUrl:"",briefCn:"",tags:[n?.nativeName||t],meanings:a}}});async function Vy(e,t){let n=t?.customAi||{};if(n.apiKey&&n.baseUrl&&n.model){let r=`${n.baseUrl.replace(/\/+$/,"")}/chat/completions`,s=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n.apiKey}`},body:JSON.stringify({model:n.model,temperature:.2,messages:[{role:"system",content:'You are a concise multilingual dictionary. Respond ONLY in valid JSON: {"phonetic":"","reading":"","pos":"noun|verb|adjective|adverb|expression|other","briefCn":"","definitions":[{"cn":"","text":"","example":""}]}'},{role:"user",content:e}]})});if(!s.ok)throw new Error(`AI \u8BCD\u5178 HTTP ${s.status}`);return(await s.json())?.choices?.[0]?.message?.content||""}let o=$n();if(o&&typeof o.generateRaw=="function")return await o.generateRaw({user_input:`${e}

\u8BF7\u4EC5\u8F93\u51FA\u5408\u6CD5 JSON\uFF08\u4E0D\u8981 markdown \u4EE3\u7801\u5757\uFF09\uFF1A{"phonetic":"","reading":"","pos":"noun","briefCn":"","definitions":[{"cn":"","text":"","example":""}]}`,should_stream:!1});throw new Error("\u672A\u914D\u7F6E\u81EA\u5B9A\u4E49 AI \u4E14\u9152\u9986\u5F53\u524D\u4E0D\u652F\u6301 generateRaw")}var ES=Gt({id:"ai-context",name:"AI \u7CBE\u8BB2",description:"\u7ED3\u5408\u5F53\u524D\u53E5\u5B50\u89E3\u6790\u8BCD\u6027\u4E0E\u8BED\u5883\u542B\u4E49",languages:["*"],async lookup(e,{langDef:t,context:n,config:o}){let r=[`Language: ${t?.name||"Foreign"} (${t?.nativeName||""})`,`Word: ${e}`,n?`Sentence context: "${n}"`:"","Give the base form/reading/IPA, part of speech, exact Chinese meaning in this context, a concise explanation, and one short example."].filter(Boolean).join(`
`),s=await Vy(r,o),i=String(s).match(/\{[\s\S]*\}/);if(!i)throw new Error("AI \u8BCD\u5178\u8FD4\u56DE\u683C\u5F0F\u65E0\u6CD5\u89E3\u6790");let a=JSON.parse(i[0]),l=Array.isArray(a.definitions)?a.definitions.slice(0,3).map(u=>({cn:u.cn||"",text:u.text||"",example:u.example||""})):[{cn:a.briefCn||"",text:"",example:""}];return{word:e,phonetic:a.phonetic||"",reading:a.reading||"",audioUrl:"",briefCn:a.briefCn||l[0]?.cn||"",tags:["AI \u8BED\u5883\u89E3\u6790"],meanings:[{pos:a.pos||"expression",posInfo:tt(a.pos),definitions:l}]}}});var yS=Yt({id:"google",name:"Google \u7FFB\u8BD1",description:"\u514D Key\u3001\u901F\u5EA6\u5FEB",async translate(e,{from:t="auto",to:n="zh-CN"}){let r=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(t==="auto"?"auto":t)}&tl=${encodeURIComponent(n)}&dt=t&q=${encodeURIComponent(e)}`,s=await fetch(r);if(!s.ok)throw new Error(`Google Translate HTTP ${s.status}`);let i=await s.json();if(!Array.isArray(i)||!Array.isArray(i[0]))throw new Error("Google Translate \u8FD4\u56DE\u683C\u5F0F\u5F02\u5E38");return i[0].map(a=>Array.isArray(a)?a[0]:"").join("")}});var SS=Yt({id:"mymemory",name:"MyMemory",description:"\u514D\u8D39\u515C\u5E95\u7FFB\u8BD1",async translate(e,{from:t="en",to:n="zh-CN"}){let o=t==="auto"?"en":t,r=`https://api.mymemory.translated.net/get?q=${encodeURIComponent(e)}&langpair=${encodeURIComponent(o)}|${encodeURIComponent(n)}`,s=await fetch(r);if(!s.ok)throw new Error(`MyMemory HTTP ${s.status}`);let a=(await s.json())?.responseData?.translatedText;if(!a)throw new Error("MyMemory \u672A\u8FD4\u56DE\u8BD1\u6587");return a}});var OS=Yt({id:"custom-ai",name:"\u81EA\u5B9A\u4E49 AI",description:"\u4F7F\u7528\u81EA\u5B9A\u4E49 OpenAI \u517C\u5BB9\u63A5\u53E3\u7FFB\u8BD1",async translate(e,{from:t,to:n="\u7B80\u4F53\u4E2D\u6587",context:o,config:r}){let s=r?.customAi||{};if(!s.apiKey||!s.baseUrl||!s.model)throw new Error("\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u586B\u5199\u81EA\u5B9A\u4E49 AI \u7684 Base URL\u3001API Key \u4E0E\u6A21\u578B\u540D\u79F0");let i=`${s.baseUrl.replace(/\/+$/,"")}/chat/completions`,a=`You are a literary translator. Translate the user's ${t||"foreign"} text into natural, fluent ${n==="zh-CN"?"Simplified Chinese":n}. Preserve tone, emotion, and character voice. Output ONLY the translation without explanation.`,l=o&&o!==e?`Context:
${o}

Translate this text:
${e}`:e,u=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.apiKey}`},body:JSON.stringify({model:s.model,temperature:.2,messages:[{role:"system",content:a},{role:"user",content:l}]})});if(!u.ok)throw new Error(`Custom AI HTTP ${u.status}`);let c=(await u.json())?.choices?.[0]?.message?.content;if(!c)throw new Error("Custom AI \u672A\u8FD4\u56DE\u5185\u5BB9");return c.trim()}}),CS=Yt({id:"tavern-ai",name:"\u9152\u9986 API",description:"\u4F7F\u7528\u9152\u9986\u5F53\u524D\u8FDE\u63A5\u7684\u6A21\u578B\u7FFB\u8BD1",async translate(e,{from:t,to:n="\u7B80\u4F53\u4E2D\u6587"}){let o=$n();if(!o||typeof o.generateRaw!="function")throw new Error("\u5F53\u524D\u9152\u9986\u52A9\u624B\u7248\u672C\u4E0D\u652F\u6301 generateRaw");let r=`\u8BF7\u5C06\u4EE5\u4E0B${t||"\u5916\u8BED"}\u6587\u672C\u51C6\u786E\u3001\u81EA\u7136\u5730\u7FFB\u8BD1\u6210${n==="zh-CN"?"\u7B80\u4F53\u4E2D\u6587":n}\uFF0C\u4FDD\u7559\u539F\u672C\u7684\u8BED\u6C14\u4E0E\u60C5\u7EEA\u3002\u53EA\u8F93\u51FA\u4E2D\u6587\u8BD1\u6587\uFF0C\u4E0D\u8981\u9644\u52A0\u4EFB\u4F55\u89E3\u91CA\u6216\u5F15\u53F7\uFF1A

${e}`,s=await o.generateRaw({user_input:r,should_stream:!1});if(!s||typeof s!="string")throw new Error("\u9152\u9986 API \u672A\u8FD4\u56DE\u6709\u6548\u8BD1\u6587");return s.trim()}});var Ko="__TAVERN_LANG_INSTANCE__",Gi=null;function Dh(){Gi&&(Gi(),Gi=null),Eo(),ta(),ca(),wc(),Oc(),zc(),xc(),Cc(),la(),Jc();let e=pe();e[Ko]?.destroy===Dh&&delete e[Ko]}function Ry(e={}){let t=pe();if(t[Ko]&&typeof t[Ko].destroy=="function")try{t[Ko].destroy()}catch(o){console.warn("[TavernLanguage] \u6E05\u7406\u65E7\u5B9E\u4F8B\u65F6\u51FA\u73B0\u8B66\u544A:",o)}ch(),qc(),xh(),Xc(),Eh(),_h(),ph(),na(),jc(),Gi=Mc(o=>{zr(),ha(o),na(),o.enabled?aa({force:!0}):la()});let n={version:zo,init:Ry,destroy:Dh,openSettings:()=>uo("general"),openVocabBook:()=>uo("vocab"),getConfig:Q,updateConfig:ns,registerLanguage:yn,getLanguage:nt,listLanguages:go,registerDictionary:Gt,listDictionaries:ji,lookupWord:Wi,registerTranslator:Yt,listTranslators:ls,translateText:Vt};if(t[Ko]=n,!e.silent){let o=nt(Q().targetLang)?.name||Q().targetLang;Se(`\u5DF2\u52A0\u8F7D v${zo}\uFF08\u5F53\u524D\u8BED\u79CD\uFF1A${o}\uFF09`,"success")}return n}function tx(){uo("general")}function nx(){uo("vocab")}export{Dh as destroy,Ry as init,tx as openSettings,nx as openVocabBook,Gt as registerDictionary,yn as registerLanguage,Yt as registerTranslator,zo as version};
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
