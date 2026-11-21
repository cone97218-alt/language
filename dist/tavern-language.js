/**
 * Tavern Language v2.2.0 (Vue 3)
 * SillyTavern 酒馆助手沉浸式外语学习插件
 * Repo: https://github.com/cone97218-alt/language
 */
var Bh=Object.defineProperty;var Hh=(e,t)=>{for(var n in t)Bh(e,n,{get:t[n],enumerable:!0})};function se(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent}catch{}return window}function ge(){return se().document}function Fn(){let e=se();return window.TavernHelper||e.TavernHelper||null}function ea(){let e=se();return{eventOn:window.eventOn||e.eventOn||null,eventRemoveListener:window.eventRemoveListener||e.eventRemoveListener||null,tavern_events:window.tavern_events||e.tavern_events||null,iframe_events:window.iframe_events||e.iframe_events||null}}function Se(e,t="info"){let n=se(),o=window.toastr||n.toastr;o&&typeof o[t]=="function"?o[t](e,"\u9152\u9986\u5916\u8BED\u5B66\u4E60"):console.log(`[TavernLanguage][${t}] ${e}`)}var qo="2.2.0",ta="tavern_language_config_v1",jh=["script","style","noscript","iframe","svg","canvas","audio","video",".tl-ignore",".tl-trans-block",".tl-mes-footer",".tl-word",".tl-popover",".tl-sel-bar",".tl-modal-backdrop","#tl-vue-root"],rs={enabled:!0,targetLang:"en",promptInjection:{enabled:!0,level:"B1",promptText:"",depth:0},theme:"tavern",excludeSelectors:["code","pre","kbd","math","summary","button","input","textarea","select"],dictionaryChains:{en:["google-dict","free-dict","wiktionary","ai-context"],ja:["google-dict","jotoba","wiktionary","ai-context"],fr:["google-dict","wiktionary","ai-context"]},autoTranslateDict:!0,autoSpeakWord:!1,translator:"google",customAi:{baseUrl:"https://api.openai.com/v1",apiKey:"",model:"gpt-4o-mini"},tts:{engine:"auto",rate:1,enAccent:"us"},ui:{showWordUnderline:!0,autoShowMesButtons:!0}};function go(e,t){if(!t||typeof t!="object")return e;let n=Array.isArray(e)?[...e]:{...e};for(let o of Object.keys(t)){let r=t[o];r&&typeof r=="object"&&!Array.isArray(r)&&e[o]&&typeof e[o]=="object"&&!Array.isArray(e[o])?n[o]=go(e[o],r):r!==void 0&&(n[o]=Array.isArray(r)?[...r]:r)}return n}var Xe=go(rs,{}),na=new Set;function Bc(){try{let e=se().localStorage.getItem(ta);if(e){let t=JSON.parse(e);if(Xe=go(rs,t),!t._migratedGoogleDict){for(let n of["en","ja","fr"]){let o=Xe.dictionaryChains?.[n];Array.isArray(o)&&!o.includes("google-dict")&&(Xe.dictionaryChains[n]=["google-dict",...o])}Xe._migratedGoogleDict=!0;try{se().localStorage.setItem(ta,JSON.stringify(Xe))}catch{}}}else Xe=go(rs,{}),Xe._migratedGoogleDict=!0}catch(e){console.warn("[TavernLanguage] \u8BFB\u53D6\u914D\u7F6E\u5931\u8D25\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u914D\u7F6E:",e),Xe=go(rs,{})}return Xe}function J(){return Xe}function ss(e){Xe=go(Xe,e);try{se().localStorage.setItem(ta,JSON.stringify(Xe))}catch(t){console.warn("[TavernLanguage] \u4FDD\u5B58\u914D\u7F6E\u5931\u8D25:",t)}return na.forEach(t=>{try{t(Xe)}catch(n){console.error("[TavernLanguage] \u914D\u7F6E\u76D1\u542C\u56DE\u8C03\u5F02\u5E38:",n)}}),Xe}function Hc(e){return na.add(e),()=>na.delete(e)}function Jo(e){return Array.isArray(e)?e.map(t=>String(t).trim()).filter(Boolean):String(e||"").split(/[\n,;，；]+/).map(t=>t.trim()).filter(Boolean)}function is(e=Xe){let t=Jo(e.excludeSelectors);return[...new Set([...jh,...t])]}var Yo=new Map;function bn(e){if(!e||!e.code)throw new Error("[TavernLanguage] registerLanguage \u9700\u8981\u5305\u542B code \u5B57\u6BB5");return Yo.set(e.code,e),e}function ot(e){return Yo.get(e)||Yo.get("en")||[...Yo.values()][0]||null}function Eo(){return[...Yo.values()]}var jc="tavern-language-immersive-prompt",as=null;function Qo(e,t){let n=ot(e);return n?n.buildPrompt(t,""):""}function oa(e=J()){let t=String(e.promptInjection?.promptText||"").trim();return t||Qo(e.targetLang,e.promptInjection?.level)}function ra(){if(typeof as=="function"){try{as()}catch{}as=null}let e=Fn();if(e&&typeof e.uninjectPrompts=="function")try{e.uninjectPrompts([jc])}catch{}}function sa(){ra();let e=J();if(!e.enabled||!e.promptInjection?.enabled)return!1;let t=Fn();if(!t||typeof t.injectPrompts!="function")return!1;let n=oa(e);if(!n)return!1;try{let o=t.injectPrompts([{id:jc,role:"system",content:n,position:"in_chat",depth:Number.isFinite(Number(e.promptInjection.depth))?Number(e.promptInjection.depth):0,should_scan:!1}]);return o&&typeof o.uninject=="function"&&(as=o.uninject),!0}catch(o){return console.warn("[TavernLanguage] injectPrompts \u6CE8\u5165\u5931\u8D25:",o),!1}}function ia(e,t){if(!e||e.nodeType!==1)return!1;let n=e.tagName?e.tagName.toLowerCase():"";for(let o of t)if(o){if(/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(o)){if(n===o.toLowerCase())return!0;continue}try{if(e.matches(o))return!0}catch{}}return!1}function cs(e,t,n){let o=e.nodeType===1?e:e.parentElement;for(;o&&o!==t;){if(ia(o,n))return!0;o=o.parentElement}return!1}function ls(e){if(!e)return;let t=e.querySelectorAll("span.tl-word");for(let n of t){let o=e.ownerDocument.createTextNode(n.textContent||"");n.replaceWith(o)}e.normalize(),delete e.dataset.tlTokenizedLang,delete e.dataset.tlExcludeHash}function Wc(e,t={}){if(!e)return;let n=J();if(!n.enabled){ls(e);return}let o=t.lang||n.targetLang||"en",r=ot(o);if(!r)return;let s=is(n),i=s.join("|");if(!t.force&&e.dataset.tlTokenizedLang===o&&e.dataset.tlExcludeHash===i)return;e.dataset.tlTokenizedLang&&ls(e);let a=e.ownerDocument||ge(),l=a.createTreeWalker(e,4,{acceptNode(c){return!c.nodeValue||!c.nodeValue.trim()||cs(c,e,s)?2:1}}),u=[],f;for(;f=l.nextNode();)u.push(f);for(let c of u){let p=r.tokenize(c.nodeValue);if(!p||p.length===0||!p.some(m=>m.isWord))continue;let v=a.createDocumentFragment();for(let m of p)if(m.isWord){let N=a.createElement("span");N.className="tl-word",N.textContent=m.text,N.dataset.tlWord=m.lookup||m.text,N.dataset.tlLang=o,v.appendChild(N)}else v.appendChild(a.createTextNode(m.text));c.replaceWith(v)}e.dataset.tlTokenizedLang=o,e.dataset.tlExcludeHash=i}function Kc(e){if(!e)return"";let t=e.closest("p, li, blockquote, div.mes_text, h1, h2, h3, h4, h5, h6")||e.parentElement;if(!t)return e.textContent||"";let n="",o=-1,r=-1,s=t.ownerDocument.createTreeWalker(t,4,{acceptNode(f){return f.parentElement?.closest(".tl-trans-block")?2:1}}),i;for(;i=s.nextNode();){let f=i.nodeValue||"";e.contains(i)&&o===-1&&(o=n.length,r=n.length+f.length),n+=f}if(o===-1)return n.trim();let a=/[.!?。！？\n]/,l=o;for(;l>0&&!a.test(n[l-1]);)l--;let u=r;for(;u<n.length&&!a.test(n[u]);)u++;return u<n.length&&/[.!?。！？]/.test(n[u])&&u++,n.slice(l,u).replace(/\s+/g," ").trim()}var us=new Map,Un=new Map,Wh=400;function Kh(e,t){if(Un.size>=Wh){let n=Un.keys().next().value;Un.delete(n)}Un.set(e,t)}function Qt(e){if(!e||!e.id)throw new Error("[TavernLanguage] registerTranslator \u9700\u8981 id \u5B57\u6BB5");return us.set(e.id,e),e}function fs(){return[...us.values()]}function Xc(){Un.clear()}async function Pt(e,t={}){let n=String(e||"").trim();if(!n)return"";let o=J(),r=t.from||o.targetLang||"auto",s=t.to||"zh-CN",i=t.providerId||o.translator||"google",a=`${i}|${r}|${s}|${n}`;if(!t.bypassCache&&Un.has(a))return Un.get(a);let l=[i,"google","mymemory"].filter((f,c,p)=>p.indexOf(f)===c&&us.has(f)),u=null;for(let f of l){let c=us.get(f);try{let p=await c.translate(n,{from:r,to:s,context:t.context||"",config:o});if(p&&p.trim())return Kh(a,p.trim()),p.trim()}catch(p){u=p,console.warn(`[TavernLanguage] \u7FFB\u8BD1\u6E90 ${f} \u5931\u8D25\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A:`,p?.message||p)}}throw u||new Error("\u6240\u6709\u7FFB\u8BD1\u6E90\u5747\u4E0D\u53EF\u7528")}var Mt=null;function vo(){if(Mt){try{Mt.pause(),Mt.currentTime=0}catch{}Mt=null}let e=se();if(e.speechSynthesis)try{e.speechSynthesis.cancel()}catch{}}function ps(e,t=1){return new Promise((n,o)=>{vo();let r=se().Audio||Audio,s=new r(e);s.playbackRate=Math.max(.5,Math.min(2,t||1)),Mt=s,s.onended=()=>{Mt===s&&(Mt=null),n(!0)},s.onerror=a=>{Mt===s&&(Mt=null),o(a||new Error("\u97F3\u9891\u64AD\u653E\u5931\u8D25"))};let i=s.play();i&&typeof i.catch=="function"&&i.catch(a=>{Mt===s&&(Mt=null),o(a)})})}function aa(e,t,n="us"){let o=encodeURIComponent(e);if(t==="en")return`https://dict.youdao.com/dictvoice?audio=${o}&type=${n==="uk"?1:2}`;let s={ja:"jap",fr:"fr",ko:"ko",de:"de",es:"es"}[t]||t;return`https://dict.youdao.com/dictvoice?audio=${o}&le=${encodeURIComponent(s)}`}function la(e,t,n=1){return new Promise((o,r)=>{let s=se(),i=s.speechSynthesis,a=s.SpeechSynthesisUtterance||window.SpeechSynthesisUtterance;if(!i||!a){r(new Error("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 Web Speech \u6717\u8BFB"));return}vo();let u=ot(t)?.bcp47||t||"en-US",f=new a(e);f.lang=u,f.rate=Math.max(.5,Math.min(2,n||1));let c=i.getVoices?i.getVoices():[],p=u.split("-")[0].toLowerCase(),d=c.find(v=>v.lang&&v.lang.toLowerCase()===u.toLowerCase())||c.find(v=>v.lang&&v.lang.toLowerCase().startsWith(p));d&&(f.voice=d),f.onend=()=>o(!0),f.onerror=v=>r(v),i.speak(f)})}async function _o(e,t={}){let n=String(e||"").trim();if(!n)return;let o=J(),r=t.lang||o.targetLang||"en",s=t.rate??o.tts?.rate??1;if((o.tts?.engine||"auto")==="webspeech")return la(n,r,s);if(t.audioUrl)try{await ps(t.audioUrl,s);return}catch{}try{let a=aa(n,r,o.tts?.enAccent||"us");await ps(a,s);return}catch{}return la(n,r,s)}async function Zt(e,t={}){let n=String(e||"").replace(/\s+/g," ").trim();if(!n)return;let o=J(),r=t.lang||o.targetLang||"en",s=t.rate??o.tts?.rate??1;if((o.tts?.engine||"auto")==="youdao"&&n.length<=220)try{let a=aa(n,r,o.tts?.enAccent||"us");await ps(a,s);return}catch{}try{await la(n,r,s)}catch{if(n.length<=220){let a=aa(n,r,o.tts?.enAccent||"us");await ps(a,s)}}}var Zo=null;function zc(e){return is(e).filter(t=>t!==".tl-word")}function ds(e,t,n){let o="",r=e.ownerDocument.createTreeWalker(e,4,{acceptNode(i){return i.parentElement?.closest(".tl-trans-block, .tl-mes-footer")||cs(i,t,n)?2:1}}),s;for(;s=r.nextNode();)o+=s.nodeValue||"";return o.replace(/\s+/g," ").trim()}function Xh(e,t){let n=[...e.querySelectorAll("p, li, blockquote")].filter(r=>r.closest(".tl-mes-footer, .tl-trans-block")||ia(r,t)||cs(r,e,t)||r.parentElement?.closest("p, li, blockquote")?!1:ds(r,e,t).length>0);return n.length>0?n:ds(e,e,t)?[e]:[]}async function zh(e,t){let n=e.querySelector(".mes_text");if(!n)return;let o=[...n.querySelectorAll(".tl-trans-block")];if(o.length>0){let v=o[0].classList.contains("tl-hidden");o.forEach(m=>m.classList.toggle("tl-hidden",!v)),t.classList.toggle("tl-active",v);return}let r=J(),s=zc(r),i=Xh(n,s);if(i.length===0)return;t.classList.add("tl-active"),t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';let a=n.ownerDocument,l=r.targetLang||"en",u=n.querySelector(".tl-mes-footer"),f=i.map(v=>{let m=ds(v,n,s),N=a.createElement("div");return N.className="tl-trans-block tl-trans-loading tl-ignore",N.textContent="\u7FFB\u8BD1\u4E2D...",v===n?u?u.insertAdjacentElement("beforebegin",N):n.appendChild(N):v.insertAdjacentElement("afterend",N),{text:m,transDiv:N}}),c=3,p=0;async function d(){for(;p<f.length;){let v=f[p++];try{let m=await Pt(v.text,{from:l,to:"zh-CN"});v.transDiv.classList.remove("tl-trans-loading"),v.transDiv.textContent=m}catch(m){v.transDiv.classList.remove("tl-trans-loading"),v.transDiv.textContent=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${m?.message||"\u8BF7\u91CD\u8BD5"}`}}}await Promise.all(Array.from({length:Math.min(c,f.length)},()=>d())),t.innerHTML='<i class="fa-solid fa-language"></i>'}function er(e,t){e.classList.toggle("tl-active",t),e.innerHTML=t?'<i class="fa-solid fa-stop"></i>':'<i class="fa-solid fa-volume-high"></i>'}async function Gh(e,t){if(Zo===e){vo(),Zo=null,er(t,!1);return}let n=e.querySelector(".mes_text");if(!n)return;let o=J(),r=zc(o),s=ds(n,n,r);if(s){e.ownerDocument.querySelectorAll('.tl-footer-icon[data-tl-mes-action="speak"].tl-active').forEach(i=>er(i,!1)),Zo=e,er(t,!0);try{await Zt(s,{lang:o.targetLang||"en"})}catch{}finally{Zo===e&&(Zo=null),er(t,!1)}}}function Gc(e){e?.querySelectorAll(".tl-mes-btn").forEach(a=>a.remove());let t=J();if(!t.enabled||t.ui?.autoShowMesButtons===!1){e?.querySelector(".tl-mes-footer")?.remove();return}let n=e?.querySelector(".mes_text");if(!n||n.querySelector(".tl-mes-footer")||!n.textContent||!n.textContent.trim())return;let o=e.ownerDocument,r=o.createElement("div");r.className="tl-mes-footer tl-ignore";let s=o.createElement("button");s.type="button",s.className="tl-footer-icon",s.dataset.tlMesAction="translate",s.title="\u53CC\u8BED\u5BF9\u7167",s.innerHTML='<i class="fa-solid fa-language"></i>',s.addEventListener("click",a=>{a.stopPropagation(),zh(e,s)});let i=o.createElement("button");i.type="button",i.className="tl-footer-icon",i.dataset.tlMesAction="speak",i.title="\u6717\u8BFB",er(i,!1),i.addEventListener("click",a=>{a.stopPropagation(),Gh(e,i)}),r.appendChild(s),r.appendChild(i),n.appendChild(r)}var tr=null,Bn=null,tn=!1,ca=[];function qh(){return[...ge().querySelectorAll("#chat .mes")]}function Jh(e,t={}){if(!e)return;let n=e.querySelector(".mes_text");n&&(Wc(n,t),Gc(e))}function ua(e={}){let t=qh();for(let n of t)Jh(n,e)}function fa(){let e=ge();e.querySelectorAll("#chat .mes .mes_text").forEach(t=>ls(t)),e.querySelectorAll("#chat .mes .tl-trans-block").forEach(t=>t.remove()),e.querySelectorAll("#chat .mes .tl-mes-btn").forEach(t=>t.remove()),e.querySelectorAll("#chat .mes .tl-mes-footer").forEach(t=>t.remove())}function en(e=280){Bn&&clearTimeout(Bn),Bn=setTimeout(()=>{Bn=null,!tn&&J().enabled&&ua()},e)}function Nn(e,t){let{eventOn:n,eventRemoveListener:o}=ea();if(!(!n||!e))try{let r=n(e,t);ca.push(()=>{try{r&&typeof r.stop=="function"?r.stop():typeof o=="function"&&o(e,t)}catch{}})}catch{}}function qc(){pa();let t=ge().getElementById("chat");t&&(tr=new MutationObserver(r=>{if(tn||!J().enabled)return;r.some(i=>{let a=i.target;return!(a?.nodeType===1&&(a.classList?.contains("tl-word")||a.classList?.contains("tl-trans-block")||a.classList?.contains("tl-mes-btn")||a.classList?.contains("tl-mes-footer")||a.closest?.(".tl-popover, .tl-sel-bar, .tl-modal-backdrop, .tl-mes-footer, #tl-vue-root")))})&&en(320)}),tr.observe(t,{childList:!0,subtree:!0}));let{tavern_events:n,iframe_events:o}=ea();n&&(Nn(n.GENERATION_STARTED,()=>{tn=!0}),Nn(n.GENERATION_STOPPED,()=>{tn=!1,en(200)}),Nn(n.GENERATION_ENDED,()=>{tn=!1,en(200)}),Nn(n.MESSAGE_RECEIVED,()=>{tn=!1,en(220)}),Nn(n.MESSAGE_UPDATED,()=>{en(200)}),Nn(n.MESSAGE_SWIPED,()=>{en(250)}),Nn(n.CHAT_CHANGED,()=>{tn=!1,en(350)})),o&&Nn(o.STREAM_TOKEN_RECEIVED_FULLY,()=>{tn=!1,en(260)}),en(150)}function pa(){for(Bn&&(clearTimeout(Bn),Bn=null),tr&&(tr.disconnect(),tr=null);ca.length>0;)ca.pop()();tn=!1}var Jc=9,Yh=420,Qh=260,da=0,ha=0,hs=0,nr=!1,ma=!1,Yc=0,ms=!1,gs=null,Es=null,vs=null,yo=null;function Qc(){if(ms)return;let e=ge(),t=se();gs=n=>{n.button&&n.button!==0||(da=n.clientX,ha=n.clientY,hs=Date.now(),nr=!1,ma=!1)},Es=n=>{if(nr)return;let o=n.clientX-da,r=n.clientY-ha;Math.hypot(o,r)>Jc&&(nr=!0)},vs=n=>{n.touches&&n.touches.length>1&&(ma=!0)},yo=()=>{Yc=Date.now(),nr=!0},e.addEventListener("pointerdown",gs,{passive:!0,capture:!0}),e.addEventListener("pointermove",Es,{passive:!0,capture:!0}),e.addEventListener("touchstart",vs,{passive:!0,capture:!0}),t.addEventListener("scroll",yo,{passive:!0,capture:!0}),e.addEventListener("scroll",yo,{passive:!0,capture:!0}),ms=!0}function Zc(){if(!ms)return;let e=ge(),t=se();gs&&e.removeEventListener("pointerdown",gs,!0),Es&&e.removeEventListener("pointermove",Es,!0),vs&&e.removeEventListener("touchstart",vs,!0),yo&&(t.removeEventListener("scroll",yo,!0),e.removeEventListener("scroll",yo,!0)),ms=!1}function eu(e){let t=Date.now();if(ma||nr||t-Yc<Qh||hs>0&&t-hs>Yh)return!1;if(e&&typeof e.clientX=="number"&&hs>0){let o=e.clientX-da,r=e.clientY-ha;if(Math.hypot(o,r)>Jc)return!1}let n=se().getSelection();return!(n&&n.toString().trim().length>0)}var ga="tl-injected-styles",Zh=`
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
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
  width: 100%;
}

.tl-book-manage-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.tl-vocab-filters {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 96px;
  gap: 8px;
  width: 100%;
  align-items: center;
}

.tl-select.tl-lang-filter {
  width: 100%;
  min-width: 0;
  padding-left: 8px;
  padding-right: 6px;
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

.tl-select.tl-mini-select {
  width: auto;
  min-width: 88px;
  max-width: 150px;
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
  min-width: 0;
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
`;function Ea(e=J()){let t=ge().documentElement;t&&(t.setAttribute("data-tl-theme",e.theme||"tavern"),t.setAttribute("data-tl-underline",e.ui?.showWordUnderline===!1?"0":"1"))}function tu(){let e=ge(),t=e.getElementById(ga);t||(t=e.createElement("style"),t.id=ga,e.head.appendChild(t)),t.textContent=Zh,Ea()}function nu(){let e=ge(),t=e.getElementById(ga);t&&t.remove(),e.documentElement.removeAttribute("data-tl-theme"),e.documentElement.removeAttribute("data-tl-underline")}var Ll={};Hh(Ll,{BaseTransition:()=>al,BaseTransitionPropsValidators:()=>ui,Comment:()=>xe,DeprecationTypes:()=>XE,EffectScope:()=>zn,ErrorCodes:()=>Um,ErrorTypeStrings:()=>FE,Fragment:()=>Ve,KeepAlive:()=>wg,ReactiveEffect:()=>sn,Static:()=>fn,Suspense:()=>yE,Teleport:()=>og,Text:()=>An,TrackOpTypes:()=>zu,Transition:()=>JE,TransitionGroup:()=>Sv,TriggerOpTypes:()=>Gu,VueElement:()=>Ni,assertNumber:()=>Fm,callWithAsyncErrorHandling:()=>Et,callWithErrorHandling:()=>oo,camelize:()=>ce,capitalize:()=>St,cloneVNode:()=>Gt,compatUtils:()=>KE,computed:()=>Fe,createApp:()=>Mr,createBlock:()=>ei,createCommentVNode:()=>Kf,createElementBlock:()=>wE,createElementVNode:()=>bl,createHydrationRenderer:()=>_l,createPropsRestProxy:()=>tE,createRenderer:()=>vl,createSSRApp:()=>Gp,createSlots:()=>Ug,createStaticVNode:()=>DE,createTextVNode:()=>Nl,createVNode:()=>ye,customRef:()=>Ms,defineAsyncComponent:()=>xg,defineComponent:()=>at,defineCustomElement:()=>Mp,defineEmits:()=>Kg,defineExpose:()=>Xg,defineModel:()=>qg,defineOptions:()=>zg,defineProps:()=>Wg,defineSSRCustomElement:()=>Ev,defineSlots:()=>Gg,devtools:()=>UE,effect:()=>Au,effectScope:()=>Su,getCurrentInstance:()=>qe,getCurrentScope:()=>Fa,getCurrentWatcher:()=>qu,getTransitionRawChildren:()=>Cr,guardReactiveProps:()=>Wf,h:()=>xl,handleError:()=>ro,hasInjectionContext:()=>Ym,hydrate:()=>Fv,hydrateOnIdle:()=>vg,hydrateOnInteraction:()=>Ng,hydrateOnMediaQuery:()=>bg,hydrateOnVisible:()=>yg,initCustomFormatter:()=>np,initDirectivesForSSR:()=>Uv,inject:()=>gf,isMemoSame:()=>op,isProxy:()=>Gn,isReactive:()=>dt,isReadonly:()=>tt,isRef:()=>Ne,isRuntimeOnly:()=>Yf,isShallow:()=>$e,isVNode:()=>dn,markRaw:()=>Rs,mergeDefaults:()=>Zg,mergeModels:()=>eE,mergeProps:()=>Xf,nextTick:()=>Or,nodeOps:()=>Op,normalizeClass:()=>Kn,normalizeProps:()=>hu,normalizeStyle:()=>Wn,onActivated:()=>Og,onBeforeMount:()=>Dg,onBeforeUnmount:()=>ul,onBeforeUpdate:()=>cl,onDeactivated:()=>Cg,onErrorCaptured:()=>Rg,onMounted:()=>Dr,onRenderTracked:()=>Vg,onRenderTriggered:()=>kg,onScopeDispose:()=>wo,onServerPrefetch:()=>Ig,onUnmounted:()=>fl,onUpdated:()=>fi,onWatcherCleanup:()=>ja,openBlock:()=>xr,patchProp:()=>Pp,popScopeId:()=>zm,provide:()=>Jm,proxyRefs:()=>hr,pushScopeId:()=>Xm,queuePostFlushCb:()=>zt,reactive:()=>ln,readonly:()=>pr,ref:()=>mt,registerRuntimeCompiler:()=>Sl,render:()=>zp,renderList:()=>Fg,renderSlot:()=>Bg,resolveComponent:()=>Mg,resolveDirective:()=>$g,resolveDynamicComponent:()=>Lg,resolveFilter:()=>WE,resolveTransitionHooks:()=>eo,setBlockTracking:()=>Tr,setDevtoolsHook:()=>BE,setTransitionHooks:()=>Ct,shallowReactive:()=>ks,shallowReadonly:()=>Fu,shallowRef:()=>Ps,ssrContextKey:()=>Ef,ssrUtils:()=>jE,stop:()=>Du,toDisplayString:()=>Ta,toHandlerKey:()=>on,toHandlers:()=>Hg,toRaw:()=>Q,toRef:()=>Wu,toRefs:()=>ju,toValue:()=>Hu,transformVNodeArgs:()=>CE,triggerRef:()=>Bu,unref:()=>qn,useAttrs:()=>Qg,useCssModule:()=>yv,useCssVars:()=>tv,useHost:()=>Lp,useId:()=>sg,useModel:()=>sE,useSSRContext:()=>vf,useShadowRoot:()=>_v,useSlots:()=>Yg,useTemplateRef:()=>ig,useTransitionState:()=>ci,vModelCheckbox:()=>Pl,vModelDynamic:()=>Hp,vModelRadio:()=>Ml,vModelSelect:()=>Up,vModelText:()=>xi,vShow:()=>kp,version:()=>rp,warn:()=>gi,watch:()=>Ro,watchEffect:()=>Qm,watchPostEffect:()=>Zm,watchSyncEffect:()=>_f,withAsyncContext:()=>nE,withCtx:()=>il,withDefaults:()=>Jg,withDirectives:()=>qm,withKeys:()=>$v,withMemo:()=>$E,withModifiers:()=>Mv,withScopeId:()=>Gm});function Ue(e){let t=Object.create(null);for(let n of e.split(","))t[n]=1;return n=>n in t}var ee={},Sn=[],De=()=>{},xn=()=>!1,Bt=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),bo=e=>e.startsWith("onUpdate:"),q=Object.assign,or=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},em=Object.prototype.hasOwnProperty,le=(e,t)=>em.call(e,t),H=Array.isArray,nn=e=>Hn(e)==="[object Map]",Nt=e=>Hn(e)==="[object Set]",ou=e=>Hn(e)==="[object Date]",cu=e=>Hn(e)==="[object RegExp]",Z=e=>typeof e=="function",z=e=>typeof e=="string",Ae=e=>typeof e=="symbol",ie=e=>e!==null&&typeof e=="object",_s=e=>(ie(e)||Z(e))&&Z(e.then)&&Z(e.catch),uu=Object.prototype.toString,Hn=e=>uu.call(e),_a=e=>Hn(e).slice(8,-1),No=e=>Hn(e)==="[object Object]",rr=e=>z(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Lt=Ue(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ya=Ue("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),tm=1e4,ys=e=>{let t=Object.create(null),n=0;return(o=>{let r=t[o];return r!==void 0?r:(++n>tm&&(t=Object.create(null),n=1),t[o]=e(o))})},nm=/-\w/g,ce=ys(e=>e.replace(nm,t=>t.slice(1).toUpperCase())),om=/\B([A-Z])/g,ze=ys(e=>e.replace(om,"-$1").toLowerCase()),St=ys(e=>e.charAt(0).toUpperCase()+e.slice(1)),on=ys(e=>e?`on${St(e)}`:""),Ie=(e,t)=>!Object.is(e,t),Tn=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},bs=(e,t,n,o=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:o,value:n})},jn=e=>{let t=parseFloat(e);return isNaN(t)?e:t},So=e=>{let t=z(e)?Number(e):NaN;return isNaN(t)?e:t},ru,sr=()=>ru||(ru=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function fu(e,t){return e+JSON.stringify(t,(n,o)=>typeof o=="function"?o.toString():o)}var rm="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol",pu=Ue(rm);var su=2;function du(e,t=0,n=e.length){if(t=Math.max(0,Math.min(t,e.length)),n=Math.max(0,Math.min(n,e.length)),t>n)return"";let o=e.split(/(\r?\n)/),r=o.filter((a,l)=>l%2===1);o=o.filter((a,l)=>l%2===0);let s=0,i=[];for(let a=0;a<o.length;a++)if(s+=o[a].length+(r[a]&&r[a].length||0),s>=t){for(let l=a-su;l<=a+su||n>s;l++){if(l<0||l>=o.length)continue;let u=l+1;i.push(`${u}${" ".repeat(Math.max(3-String(u).length,0))}|  ${o[l]}`);let f=o[l].length,c=r[l]&&r[l].length||0;if(l===a){let p=t-(s-(f+c)),d=Math.max(1,n>s?f-p:n-t);i.push("   |  "+" ".repeat(p)+"^".repeat(d))}else if(l>a){if(n>s){let p=Math.max(Math.min(n-s,f),1);i.push("   |  "+"^".repeat(p))}s+=f+c}}break}return i.join(`
`)}function Wn(e){if(H(e)){let t={};for(let n=0;n<e.length;n++){let o=e[n],r=z(o)?ba(o):Wn(o);if(r)for(let s in r)t[s]=r[s]}return t}else if(z(e)||ie(e))return e}var sm=/;(?![^(]*\))/g,im=/:([^]+)/,am=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function ba(e){let t={};return e.replace(am,n=>n.startsWith("/*")?"":n).split(sm).forEach(n=>{if(n){let o=n.split(im);o.length>1&&(t[o[0].trim()]=o[1].trim())}}),t}function Kn(e){let t="";if(z(e))t=e;else if(H(e))for(let n=0;n<e.length;n++){let o=Kn(e[n]);o&&(t+=o+" ")}else if(ie(e))for(let n in e)e[n]&&(t+=n+" ");return t.trim()}function hu(e){if(!e)return null;let{class:t,style:n}=e;return t&&!z(t)&&(e.class=Kn(t)),n&&(e.style=Wn(n)),e}var lm="html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot",cm="svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view",um="annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics",fm="area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr",Na=Ue(lm),Sa=Ue(cm),xa=Ue(um),mu=Ue(fm),gu="itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly",Eu=Ue(gu),pm=Ue(gu+",async,autofocus,autoplay,controls,default,defer,disabled,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");function Ns(e){return!!e||e===""}function dm(e,t,n){if(e.length!==t.length)return!1;let o=!0;for(let r=0;o&&r<e.length;r++)o=rt(e[r],t[r],n);return o}function iu(e,t,n){if(e.size!==t.size)return!1;let o=Array.from(t),r=new Uint8Array(o.length);for(let s of e){let i=-1;for(let a=0;a<o.length;a++)if(!r[a]&&rt(s,o[a],n)){i=a;break}if(i<0)return!1;r[i]=1}return!0}function hm(e,t,n){let o=nn(e),r=nn(t);if(o||r||(o=Nt(e),r=Nt(t),o||r))return o&&r?iu(e,t,n):!1;let s=Object.keys(e).length,i=Object.keys(t).length;if(s!==i)return!1;for(let a in e){let l=le(e,a),u=le(t,a);if(l&&!u||!l&&u||!rt(e[a],t[a],n))return!1}return lu(e)===lu(t)}function au(e,t,n,o){n||(n=[new Map,new Map]);let[r,s]=n;if(r.has(e)||s.has(t))return r.get(e)===t&&s.get(t)===e;r.set(e,t),s.set(t,e);let i=o(e,t,n);return r.delete(e),s.delete(t),i}function rt(e,t,n){if(e===t)return!0;let o=ou(e),r=ou(t);return o||r?o&&r?e.getTime()===t.getTime():!1:(o=Ae(e),r=Ae(t),o||r?e===t:(o=H(e),r=H(t),o||r?o&&r?au(e,t,n,dm):!1:(o=ie(e),r=ie(t),o||r?!o||!r?!1:au(e,t,n,hm):String(e)===String(t))))}function ir(e,t){return e.findIndex(n=>rt(n,t))}function lu(e){return Object.getPrototypeOf(e)===null&&e[Symbol.toPrimitive]==null&&typeof e.toString!="function"&&typeof e.valueOf!="function"?Hn(e):String(e)}var vu=e=>!!(e&&e.__v_isRef===!0),Ta=e=>z(e)?e:e==null?"":H(e)||ie(e)&&(e.toString===uu||!Z(e.toString))?vu(e)?Ta(e.value):JSON.stringify(e,_u,2):String(e),_u=(e,t)=>vu(t)?_u(e,t.value):nn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[o,r],s)=>(n[va(o,s)+" =>"]=r,n),{})}:Nt(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>va(n))}:Ae(t)?va(t):ie(t)&&!H(t)&&!No(t)?String(t):t,va=(e,t="")=>{var n;return Ae(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};function wa(e){return e==null?"initial":typeof e=="string"?e===""?" ":e:(typeof e!="number"||Number.isFinite(e),String(e))}function mm(e,...t){console.warn(`[Vue warn] ${e}`,...t)}var ke,zn=class{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&ke&&(ke.active?(this.parent=ke,this.index=(ke.scopes||(ke.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes){let o=this.scopes.slice();for(t=0,n=o.length;t<n;t++)o[t].pause()}for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes){let r=this.scopes.slice();for(t=0,n=r.length;t<n;t++)r[t].resume()}let o=this.effects.slice();for(t=0,n=o.length;t<n;t++)o[t].resume()}}run(t){if(this._active){let n=ke;try{return ke=this,t()}finally{ke=n}}}on(){++this._on===1&&(this.prevScope=ke,ke=this)}off(){if(this._on>0&&--this._on===0){if(ke===this)ke=this.prevScope;else{let t=ke;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,o;for(n=0,o=this.effects.length;n<o;n++)this.effects[n].stop();for(this.effects.length=0,n=0,o=this.cleanups.length;n<o;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){let r=this.scopes.slice();for(n=0,o=r.length;n<o;n++)r[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){let r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}};function Su(e){return new zn(e)}function Fa(){return ke}function wo(e,t=!1){ke&&(ke.active?ke.cleanups.push(e):e())}var ve;var Oa=new WeakSet,sn=class{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ke&&(ke.active?ke.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Oa.has(this)&&(Oa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Tu(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,yu(this),wu(this);let t=ve,n=$t;ve=this,$t=!0;try{return this.fn()}finally{Ou(this),ve=t,$t=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Ha(t);this.deps=this.depsTail=void 0,yu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Oa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Da(this)&&this.run()}get dirty(){return Da(this)}},xu=0,lr,cr;function Tu(e,t=!1){if(e.flags|=8,t){e.next=cr,cr=e;return}e.next=lr,lr=e}function Ua(){xu++}function Ba(){if(--xu>0)return;if(cr){let t=cr;for(cr=void 0;t;){let n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;lr;){let t=lr;for(lr=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(o){e||(e=o)}t=n}}if(e)throw e}function wu(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Ou(e){let t,n=e.depsTail,o=n;for(;o;){let r=o.prevDep;o.version===-1?(o===n&&(n=r),Ha(o),gm(o)):t=o,o.dep.activeLink=o.prevActiveLink,o.prevActiveLink=void 0,o=r}e.deps=t,e.depsTail=n}function Da(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Cu(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Cu(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===ur)||(e.globalVersion=ur,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Da(e))))return;e.flags|=2;let t=e.dep,n=ve,o=$t;ve=e,$t=!0;try{wu(e);let r=e.fn(e._value);(t.version===0||Ie(r,e._value))&&(e.flags|=128,e._value=r,t.version++)}catch(r){throw t.version++,r}finally{ve=n,$t=o,Ou(e),e.flags&=-3}}function Ha(e,t=!1){let{dep:n,prevSub:o,nextSub:r}=e;if(o&&(o.nextSub=r,e.prevSub=void 0),r&&(r.prevSub=o,e.nextSub=void 0),n.subs===e&&(n.subs=o,!o&&n.computed)){n.computed.flags&=-5;for(let s=n.computed.deps;s;s=s.nextDep)Ha(s,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function gm(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}function Au(e,t){e.effect instanceof sn&&(e=e.effect.fn);let n=new sn(e);t&&q(n,t);try{n.run()}catch(r){throw n.stop(),r}let o=n.run.bind(n);return o.effect=n,o}function Du(e){e.effect.stop()}var $t=!0,Iu=[];function xt(){Iu.push($t),$t=!1}function Tt(){let e=Iu.pop();$t=e===void 0?!0:e}function yu(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let n=ve;ve=void 0;try{t()}finally{ve=n}}}var ur=0,Ia=class{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},To=class{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!ve||!$t||ve===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==ve)n=this.activeLink=new Ia(ve,this),ve.deps?(n.prevDep=ve.depsTail,ve.depsTail.nextDep=n,ve.depsTail=n):ve.deps=ve.depsTail=n,ku(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){let o=n.nextDep;o.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=o),n.prevDep=ve.depsTail,n.nextDep=void 0,ve.depsTail.nextDep=n,ve.depsTail=n,ve.deps===n&&(ve.deps=o)}return n}trigger(t){this.version++,ur++,this.notify(t)}notify(t){Ua();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Ba()}}};function ku(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let o=t.deps;o;o=o.nextDep)ku(o)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var ws=new WeakMap,Xn=Symbol(""),ka=Symbol(""),fr=Symbol("");function Be(e,t,n){if($t&&ve){let o=ws.get(e);o||ws.set(e,o=new Map);let r=o.get(n);r||(o.set(n,r=new To),r.map=o,r.key=n),r.track()}}function jt(e,t,n,o,r,s){let i=ws.get(e);if(!i){ur++;return}let a=l=>{l&&l.trigger()};if(Ua(),t==="clear")i.forEach(a);else{let l=H(e),u=l&&rr(n);if(l&&n==="length"){let f=Number(o);i.forEach((c,p)=>{(p==="length"||p===fr||!Ae(p)&&p>=f)&&a(c)})}else switch((n!==void 0||i.has(void 0))&&a(i.get(n)),u&&a(i.get(fr)),t){case"add":l?u&&a(i.get("length")):(a(i.get(Xn)),nn(e)&&a(i.get(ka)));break;case"delete":l||(a(i.get(Xn)),nn(e)&&a(i.get(ka)));break;case"set":nn(e)&&a(i.get(Xn));break}}Ba()}function Em(e,t){let n=ws.get(e);return n&&n.get(t)}function xo(e){let t=Q(e);return t===e||(Be(t,"iterate",fr),$e(e))?t:tt(e)?dt(e)?t.map(n=>an(ht(n))):t.map(an):t.map(ht)}function dr(e){return Be(e=Q(e),"iterate",fr),e}function Ht(e,t){return tt(e)?an(dt(e)?ht(t):t):ht(t)}var vm={__proto__:null,[Symbol.iterator](){return Ca(this,Symbol.iterator,e=>Ht(this,e))},concat(...e){return xo(this).concat(...e.map(t=>H(t)?xo(t):t))},entries(){return Ca(this,"entries",e=>(e[1]=Ht(this,e[1]),e))},every(e,t){return rn(this,"every",e,t,void 0,arguments)},filter(e,t){return rn(this,"filter",e,t,n=>n.map(o=>Ht(this,o)),arguments)},find(e,t){return rn(this,"find",e,t,n=>Ht(this,n),arguments)},findIndex(e,t){return rn(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return rn(this,"findLast",e,t,n=>Ht(this,n),arguments)},findLastIndex(e,t){return rn(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return rn(this,"forEach",e,t,void 0,arguments)},includes(...e){return Aa(this,"includes",e)},indexOf(...e){return Aa(this,"indexOf",e)},join(e){return xo(this).join(e)},lastIndexOf(...e){return Aa(this,"lastIndexOf",e)},map(e,t){return rn(this,"map",e,t,void 0,arguments)},pop(){return ar(this,"pop")},push(...e){return ar(this,"push",e)},reduce(e,...t){return Nu(this,"reduce",e,t)},reduceRight(e,...t){return Nu(this,"reduceRight",e,t)},shift(){return ar(this,"shift")},some(e,t){return rn(this,"some",e,t,void 0,arguments)},splice(...e){return ar(this,"splice",e)},toReversed(){return xo(this).toReversed()},toSorted(e){return xo(this).toSorted(e)},toSpliced(...e){return xo(this).toSpliced(...e)},unshift(...e){return ar(this,"unshift",e)},values(){return Ca(this,"values",e=>Ht(this,e))}};function Ca(e,t,n){let o=dr(e),r=o[t],s=r.call(o);if(o!==e&&!$e(e)){if(s[Symbol.toStringTag]==="Array Iterator"){let i=Object.create(Object.getPrototypeOf(s));return i.next=()=>bu(s.next(),n),r!==Vu[t]&&Object.defineProperties(i,{return:{get(){let a=s.return;return typeof a=="function"?a.bind(s):a}},throw:{get(){let a=s.throw;return typeof a=="function"?a.bind(s):a}}}),i}s._next=s.next,s.next=()=>bu(s._next(),n)}return s}function bu(e,t){return e.done||(e.value=t(e.value)),e}var Vu=Array.prototype;function rn(e,t,n,o,r,s){let i=dr(e),a=i!==e&&!$e(e),l=i[t];if(l!==Vu[t]){let c=l.apply(e,s);return a?ht(c):c}let u=n;i!==e&&(a?u=function(c,p){return n.call(this,Ht(e,c),p,e)}:n.length>2&&(u=function(c,p){return n.call(this,c,p,e)}));let f=l.call(i,u,o);return a&&r?r(f):f}function Nu(e,t,n,o){let r=dr(e),s=r!==e&&!$e(e),i=n,a=!1;r!==e&&(s?(a=o.length===0,i=function(u,f,c){return a&&(a=!1,u=Ht(e,u)),n.call(this,u,Ht(e,f),c,e)}):n.length>3&&(i=function(u,f,c){return n.call(this,u,f,c,e)}));let l=r[t](i,...o);return a?Ht(e,l):l}function Aa(e,t,n){let o=Q(e);Be(o,"iterate",fr);let r=o[t](...n);return(r===-1||r===!1)&&Gn(n[0])?(n[0]=Q(n[0]),o[t](...n)):r}function ar(e,t,n=[]){xt(),Ua();let o=Q(e)[t].apply(e,n);return Ba(),Tt(),o}var _m=Ue("__proto__,__v_isRef,__isVue"),Ru=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Ae));function ym(e){Ae(e)||(e=String(e));let t=Q(this);return Be(t,"has",e),t.hasOwnProperty(e)}var Os=class{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,o){if(n==="__v_skip")return t.__v_skip;let r=this._isReadonly,s=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return s;if(n==="__v_raw")return o===(r?s?$u:Lu:s?Mu:Pu).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(o)?t:void 0;let i=H(t);if(!r){let l;if(i&&(l=vm[n]))return l;if(n==="hasOwnProperty")return ym}let a=Reflect.get(t,n,Ne(t)?t:o);if((Ae(n)?Ru.has(n):_m(n))||(r||Be(t,"get",n),s))return a;if(Ne(a)){let l=i&&rr(n)?a:a.value;return r&&ie(l)?pr(l):l}return ie(a)?r?pr(a):ln(a):a}},Cs=class extends Os{constructor(t=!1){super(!1,t)}set(t,n,o,r){let s=t[n],i=H(t)&&rr(n);if(!this._isShallow){let u=tt(s);if(!$e(o)&&!tt(o)&&(s=Q(s),o=Q(o)),!i&&Ne(s)&&!Ne(o))return u||(s.value=o),!0}let a=i?Number(n)<t.length:le(t,n),l=Reflect.set(t,n,o,Ne(t)?t:r);return t===Q(r)&&l&&(a?Ie(o,s)&&jt(t,"set",n,o,s):jt(t,"add",n,o)),l}deleteProperty(t,n){let o=le(t,n),r=t[n],s=Reflect.deleteProperty(t,n);return s&&o&&jt(t,"delete",n,void 0,r),s}has(t,n){let o=Reflect.has(t,n);return(!Ae(n)||!Ru.has(n))&&Be(t,"has",n),o}ownKeys(t){return Be(t,"iterate",H(t)?"length":Xn),Reflect.ownKeys(t)}},As=class extends Os{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}},bm=new Cs,Nm=new As,Sm=new Cs(!0),xm=new As(!0),Va=e=>e,Ss=e=>Reflect.getPrototypeOf(e);function Tm(e,t,n){return function(...o){let r=this.__v_raw,s=Q(r),i=nn(s),a=e==="entries"||e===Symbol.iterator&&i,l=e==="keys"&&i,u=r[e](...o),f=n?Va:t?an:ht;return!t&&Be(s,"iterate",l?ka:Xn),q(Object.create(u),{next(){let{value:c,done:p}=u.next();return p?{value:c,done:p}:{value:a?[f(c[0]),f(c[1])]:f(c),done:p}}})}}function xs(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function wm(e,t){let n={get(r){let s=this.__v_raw,i=Q(s),a=Q(r);e||(Ie(r,a)&&Be(i,"get",r),Be(i,"get",a));let{has:l}=Ss(i),u=t?Va:e?an:ht;if(l.call(i,r))return u(s.get(r));if(l.call(i,a))return u(s.get(a));s!==i&&s.get(r)},get size(){let r=this.__v_raw;return!e&&Be(Q(r),"iterate",Xn),r.size},has(r){let s=this.__v_raw,i=Q(s),a=Q(r);return e||(Ie(r,a)&&Be(i,"has",r),Be(i,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){let i=this,a=i.__v_raw,l=Q(a),u=t?Va:e?an:ht;return!e&&Be(l,"iterate",Xn),a.forEach((f,c)=>r.call(s,u(f),u(c),i))}};return q(n,e?{add:xs("add"),set:xs("set"),delete:xs("delete"),clear:xs("clear")}:{add(r){let s=Q(this),i=Ss(s),a=Q(r),l=!t&&!$e(r)&&!tt(r)?a:r;return i.has.call(s,l)||Ie(r,l)&&i.has.call(s,r)||Ie(a,l)&&i.has.call(s,a)||(s.add(l),jt(s,"add",l,l)),this},set(r,s){!t&&!$e(s)&&!tt(s)&&(s=Q(s));let i=Q(this),{has:a,get:l}=Ss(i),u=a.call(i,r);u||(r=Q(r),u=a.call(i,r));let f=l.call(i,r);return i.set(r,s),u?Ie(s,f)&&jt(i,"set",r,s,f):jt(i,"add",r,s),this},delete(r){let s=Q(this),{has:i,get:a}=Ss(s),l=i.call(s,r);l||(r=Q(r),l=i.call(s,r));let u=a?a.call(s,r):void 0,f=s.delete(r);return l&&jt(s,"delete",r,void 0,u),f},clear(){let r=Q(this),s=r.size!==0,i=void 0,a=r.clear();return s&&jt(r,"clear",void 0,void 0,i),a}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=Tm(r,e,t)}),n}function Is(e,t){let n=wm(e,t);return(o,r,s)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_isShallow"?t:r==="__v_raw"?o:Reflect.get(le(n,r)&&r in o?n:o,r,s)}var Om={get:Is(!1,!1)},Cm={get:Is(!1,!0)},Am={get:Is(!0,!1)},Dm={get:Is(!0,!0)};var Pu=new WeakMap,Mu=new WeakMap,Lu=new WeakMap,$u=new WeakMap;function Im(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ln(e){return tt(e)?e:Vs(e,!1,bm,Om,Pu)}function ks(e){return Vs(e,!1,Sm,Cm,Mu)}function pr(e){return Vs(e,!0,Nm,Am,Lu)}function Fu(e){return Vs(e,!0,xm,Dm,$u)}function Vs(e,t,n,o,r){if(!ie(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let s=r.get(e);if(s)return s;let i=Im(_a(e));if(i===0)return e;let a=new Proxy(e,i===2?o:n);return r.set(e,a),a}function dt(e){return tt(e)?dt(e.__v_raw):!!(e&&e.__v_isReactive)}function tt(e){return!!(e&&e.__v_isReadonly)}function $e(e){return!!(e&&e.__v_isShallow)}function Gn(e){return e?!!e.__v_raw:!1}function Q(e){let t=e&&e.__v_raw;return t?Q(t):e}function Rs(e){return!le(e,"__v_skip")&&Object.isExtensible(e)&&bs(e,"__v_skip",!0),e}var ht=e=>ie(e)?ln(e):e,an=e=>ie(e)?pr(e):e;function Ne(e){return e?e.__v_isRef===!0:!1}function mt(e){return Uu(e,!1)}function Ps(e){return Uu(e,!0)}function Uu(e,t){return Ne(e)?e:new Ra(e,t)}var Ra=class{constructor(t,n){this.dep=new To,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:Q(t),this._value=n?t:ht(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){let n=this._rawValue,o=this.__v_isShallow||$e(t)||tt(t);t=o?t:Q(t),Ie(t,n)&&(this._rawValue=t,this._value=o?t:ht(t),this.dep.trigger())}};function Bu(e){e.dep&&e.dep.trigger()}function qn(e){return Ne(e)?e.value:e}function Hu(e){return Z(e)?e():qn(e)}var km={get:(e,t,n)=>t==="__v_raw"?e:qn(Reflect.get(e,t,n)),set:(e,t,n,o)=>{let r=e[t];return Ne(r)&&!Ne(n)?(r.value=n,!0):Reflect.set(e,t,n,o)}};function hr(e){return dt(e)?e:new Proxy(e,km)}var Pa=class{constructor(t){this.__v_isRef=!0,this._value=void 0;let n=this.dep=new To,{get:o,set:r}=t(n.track.bind(n),n.trigger.bind(n));this._get=o,this._set=r}get value(){return this._value=this._get()}set value(t){this._set(t)}};function Ms(e){return new Pa(e)}function ju(e){let t=H(e)?new Array(e.length):{};for(let n in e)t[n]=Ku(e,n);return t}var Ma=class{constructor(t,n,o){this._object=t,this._defaultValue=o,this.__v_isRef=!0,this._value=void 0,this._key=Ae(n)?n:String(n),this._raw=Q(t);let r=!0,s=t;if(!H(t)||Ae(this._key)||!rr(this._key))do r=!Gn(s)||$e(s);while(r&&(s=s.__v_raw));this._shallow=r}get value(){let t=this._object[this._key];return this._shallow&&(t=qn(t)),this._value=t===void 0?this._defaultValue:t}set value(t){if(this._shallow&&Ne(this._raw[this._key])){let n=this._object[this._key];if(Ne(n)){n.value=t;return}}this._object[this._key]=t}get dep(){return Em(this._raw,this._key)}},La=class{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}};function Wu(e,t,n){return Ne(e)?e:Z(e)?new La(e):ie(e)&&arguments.length>1?Ku(e,t,n):mt(e)}function Ku(e,t,n){return new Ma(e,t,n)}var $a=class{constructor(t,n,o){this.fn=t,this.setter=n,this._value=void 0,this.dep=new To(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ur-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=o}notify(){if(this.flags|=16,!(this.flags&8)&&ve!==this)return Tu(this,!0),!0}get value(){let t=this.dep.track();return Cu(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}};function Xu(e,t,n=!1){let o,r;return Z(e)?o=e:(o=e.get,r=e.set),new $a(o,r,n)}var zu={GET:"get",HAS:"has",ITERATE:"iterate"},Gu={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"};var Ts={},Ds=new WeakMap,wn;function qu(){return wn}function ja(e,t=!1,n=wn){if(n){let o=Ds.get(n);o||Ds.set(n,o=[]),o.push(e)}}function Ju(e,t,n=ee){let{immediate:o,deep:r,once:s,scheduler:i,augmentJob:a,call:l}=n,u=g=>{(n.onWarn||mm)("Invalid watch source: ",g,"A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.")},f=g=>r?g:$e(g)||r===!1||r===0?Wt(g,1):Wt(g),c,p,d,v,m=!1,N=!1;if(Ne(e)?(p=()=>e.value,m=$e(e)):dt(e)?(p=()=>f(e),m=!0):H(e)?(N=!0,m=e.some(g=>dt(g)||$e(g)),p=()=>e.map(g=>{if(Ne(g))return g.value;if(dt(g))return f(g);if(Z(g))return l?l(g,2):g()})):Z(e)?t?p=l?()=>l(e,2):e:p=()=>{if(d){xt();try{d()}finally{Tt()}}let g=wn;wn=c;try{return l?l(e,3,[v]):e(v)}finally{wn=g}}:p=De,t&&r){let g=p,O=r===!0?1/0:r;p=()=>Wt(g(),O)}let A=Fa(),b=()=>{c.stop(),A&&A.active&&or(A.effects,c)};if(s&&t){let g=t;t=(...O)=>{try{return g(...O)}finally{b()}}}let E=N?new Array(e.length).fill(Ts):Ts,y=g=>{if(!(!(c.flags&1)||!c.dirty&&!g))if(t){let O=c.run();if(g||r||m||(N?O.some((D,S)=>Ie(D,E[S])):Ie(O,E))){let D=wn;xt();try{d&&d(),wn=c;let S=[O,E===Ts?void 0:N&&E[0]===Ts?[]:E,v];E=O,l?l(t,3,S):t(...S)}finally{wn=D,Tt()}}}else c.run()};return a&&a(y),c=new sn(p),c.scheduler=i?()=>i(y,!1):y,v=g=>ja(g,!1,c),d=c.onStop=()=>{let g=Ds.get(c);if(g){if(l)l(g,4);else for(let O of g)O();Ds.delete(c)}},t?o?y(!0):E=c.run():i?i(y.bind(null,!0),!0):c.run(),b.pause=c.pause.bind(c),b.resume=c.resume.bind(c),b.stop=b,b}function Wt(e,t=1/0,n){if(t<=0||!ie(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,Ne(e))Wt(e.value,t,n);else if(H(e))for(let o=0;o<e.length;o++)Wt(e[o],t,n);else if(Nt(e)||nn(e))e.forEach(o=>{Wt(o,t,n)});else if(No(e)){for(let o in e)Wt(e[o],t,n);for(let o of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,o)&&Wt(e[o],t,n)}return e}var Qn=[];function Vm(e){Qn.push(e)}function Rm(){Qn.pop()}var Wa=!1;function Yu(e,...t){if(Wa)return;Wa=!0,xt();let n=Qn.length?Qn[Qn.length-1].component:null,o=n&&n.appContext.config.warnHandler,r=Pm();if(o)oo(o,n,11,[e+t.map(s=>{var i,a;return(a=(i=s.toString)==null?void 0:i.call(s))!=null?a:JSON.stringify(s)}).join(""),n&&n.proxy,r.map(({vnode:s})=>`at <${tp(n,s.type)}>`).join(`
`),r]);else{let s=[`[Vue warn]: ${e}`,...t];r.length&&s.push(`
`,...Mm(r)),console.warn(...s)}Tt(),Wa=!1}function Pm(){let e=Qn[Qn.length-1];if(!e)return[];let t=[];for(;e;){let n=t[0];n&&n.vnode===e?n.recurseCount++:t.push({vnode:e,recurseCount:0});let o=e.component&&e.component.parent;e=o&&o.vnode}return t}function Mm(e){let t=[];return e.forEach((n,o)=>{t.push(...o===0?[]:[`
`],...Lm(n))}),t}function Lm({vnode:e,recurseCount:t}){let n=t>0?`... (${t} recursive calls)`:"",o=e.component?e.component.parent==null:!1,r=` at <${tp(e.component,e.type,o)}`,s=">"+n;return e.props?[r,...$m(e.props),s]:[r+s]}function $m(e){let t=[],n=Object.keys(e);return n.slice(0,3).forEach(o=>{t.push(...uf(o,e[o]))}),n.length>3&&t.push(" ..."),t}function uf(e,t,n){return z(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):typeof t=="number"||typeof t=="boolean"||t==null?n?t:[`${e}=${t}`]:Ne(t)?(t=uf(e,Q(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):Z(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=Q(t),n?t:[`${e}=`,t])}function Fm(e,t){}var Um={SETUP_FUNCTION:0,0:"SETUP_FUNCTION",RENDER_FUNCTION:1,1:"RENDER_FUNCTION",NATIVE_EVENT_HANDLER:5,5:"NATIVE_EVENT_HANDLER",COMPONENT_EVENT_HANDLER:6,6:"COMPONENT_EVENT_HANDLER",VNODE_HOOK:7,7:"VNODE_HOOK",DIRECTIVE_HOOK:8,8:"DIRECTIVE_HOOK",TRANSITION_HOOK:9,9:"TRANSITION_HOOK",APP_ERROR_HANDLER:10,10:"APP_ERROR_HANDLER",APP_WARN_HANDLER:11,11:"APP_WARN_HANDLER",FUNCTION_REF:12,12:"FUNCTION_REF",ASYNC_COMPONENT_LOADER:13,13:"ASYNC_COMPONENT_LOADER",SCHEDULER:14,14:"SCHEDULER",COMPONENT_UPDATE:15,15:"COMPONENT_UPDATE",APP_UNMOUNT_CLEANUP:16,16:"APP_UNMOUNT_CLEANUP"},Bm={sp:"serverPrefetch hook",bc:"beforeCreate hook",c:"created hook",bm:"beforeMount hook",m:"mounted hook",bu:"beforeUpdate hook",u:"updated",bum:"beforeUnmount hook",um:"unmounted hook",a:"activated hook",da:"deactivated hook",ec:"errorCaptured hook",rtc:"renderTracked hook",rtg:"renderTriggered hook",0:"setup function",1:"render function",2:"watcher getter",3:"watcher callback",4:"watcher cleanup function",5:"native event handler",6:"component event handler",7:"vnode hook",8:"directive hook",9:"transition hook",10:"app errorHandler",11:"app warnHandler",12:"ref function",13:"async component loader",14:"scheduler flush",15:"component update",16:"app unmount cleanup function"};function oo(e,t,n,o){try{return o?e(...o):e()}catch(r){ro(r,t,n)}}function Et(e,t,n,o){if(Z(e)){let r=oo(e,t,n,o);return r&&_s(r)&&r.catch(s=>{ro(s,t,n,void 0,!0)}),r}if(H(e)){let r=[];for(let s=0;s<e.length;s++)r.push(Et(e[s],t,n,o));return r}}function ro(e,t,n,o=!0,r=!1){let s=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:a}=t&&t.appContext.config||ee;if(t){let l=t.parent,u=t.proxy,f=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){let c=l.ec;if(c&&!l.isUnmounted&&(!r||l.scope.active)){for(let p=0;p<c.length;p++)if(c[p](e,u,f)===!1)return}l=l.parent}if(i){xt(),oo(i,null,10,[e,u,f]),Tt();return}}Hm(e,n,s,o,a)}function Hm(e,t,n,o=!0,r=!1){if(r)throw e;console.error(e)}var nt=[],Ft=-1,Xt=[],Cn=null,Co=0,ff=Promise.resolve(),Xs=null;function Or(e){let t=Xs||ff;return e?t.then(this?e.bind(this):e):t}function jm(e){let t=Ft+1,n=nt.length;for(;t<n;){let o=t+n>>>1,r=nt[o],s=_r(r);s<e||s===e&&r.flags&2?t=o+1:n=o}return t}function si(e){if(!(e.flags&1)){let t=_r(e),n=nt[nt.length-1];!n||!(e.flags&2)&&t>=_r(n)?nt.push(e):nt.splice(jm(t),0,e),e.flags|=1,pf()}}function pf(){Xs||(Xs=ff.then(hf))}function zt(e){if(!H(e))Cn&&e.id===-1?Cn.splice(Co+1,0,e):e.flags&1||(Xt.push(e),e.flags|=1);else for(let t=0;t<e.length;t++)Xt.push(e[t]);pf()}function df(e,t,n,o=Ft+1){for(;o<nt.length;o++){let r=nt[o];if(r&&r.flags&2){if(e&&r.id!==e.uid||t!==void 0&&!(r.id>=t))continue;nt.splice(o,1),o=e?o-1:Ft,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function zs(e,t,n=0){if(Xt.length){let o=Xt,r=0;if(t){o=[];for(let i=0;i<Xt.length;i++){let a=Xt[i];(a.i!==void 0?!a.i||a.i.uid<n:t.has(a))?Xt[r++]=a:o.push(a)}}let s=[...new Set(o)].sort((i,a)=>_r(i)-_r(a));if(Xt.length=r,Cn){for(let i=0;i<s.length;i++)Cn.push(s[i]);return}for(Cn=s,Co=0;Co<Cn.length;Co++){let i=Cn[Co];i.flags&4&&(i.flags&=-2),i.flags&8||i(),i.flags&=-2}Cn=null,Co=0}}var Ka=!1;function Wm(e,t){if(Ka){e();return}let n=t===void 0?void 0:new Set(Xt);e(),Ka=!0;try{df(void 0,t),zs(void 0,n,t)}finally{Ka=!1}}var _r=e=>e.id==null?e.flags&2?-1:1/0:e.id;function hf(e){let t=De;try{for(Ft=0;Ft<nt.length;Ft++){let n=nt[Ft];n&&!(n.flags&8)&&(n.flags&4&&(n.flags&=-2),oo(n,n.i,n.i?15:14),n.flags&4||(n.flags&=-2))}}finally{for(;Ft<nt.length;Ft++){let n=nt[Ft];n&&(n.flags&=-2)}Ft=-1,nt.length=0,zs(e),Xs=null,(nt.length||Xt.length)&&hf(e)}}var Km=!1;var Ao,Ls=[],Qu=!1;function mf(e,t){var n,o;Ao=e,Ao?(Ao.enabled=!0,Ls.forEach(({event:r,args:s})=>Ao.emit(r,...s)),Ls=[]):typeof window<"u"&&window.HTMLElement&&!((o=(n=window.navigator)==null?void 0:n.userAgent)!=null&&o.includes("jsdom"))?((t.__VUE_DEVTOOLS_HOOK_REPLAY__=t.__VUE_DEVTOOLS_HOOK_REPLAY__||[]).push(s=>{mf(s,t)}),setTimeout(()=>{Ao||(t.__VUE_DEVTOOLS_HOOK_REPLAY__=null,Qu=!0,Ls=[])},3e3)):(Qu=!0,Ls=[])}var je=null,ii=null;function yr(e){let t=je;return je=e,ii=e&&e.type.__scopeId||null,t}function Xm(e){ii=e}function zm(){ii=null}var Gm=e=>il;function il(e,t=je,n){if(!t||e._n)return e;let o=(...r)=>{o._d&&Tr(-1);let s=yr(t),i=pn.length,a;try{a=e(...r)}finally{for(let l=pn.length;l>i;l--)hi();yr(s),o._d&&Tr(1)}return a};return o._n=!0,o._c=!0,o._d=!0,o}function qm(e,t){if(je===null)return e;let n=Ir(je),o=e.dirs||(e.dirs=[]);for(let r=0;r<t.length;r++){let[s,i,a,l=ee]=t[r];s&&(Z(s)&&(s={mounted:s,updated:s}),s.deep&&Wt(i),o.push({dir:s,instance:n,value:i,oldValue:void 0,arg:a,modifiers:l}))}return e}function Kt(e,t,n,o){let r=e;if(o==="beforeMount")e._mount=e;else if(o==="beforeUpdate"){let a=t&&t._mount;a&&(a._latest=e,e._mount=a)}else if(o==="mounted"){let a=e._latest;e._mount=e._latest=void 0,a&&(r=a,a._mount=void 0)}let s=r.dirs,i=t&&t.dirs;for(let a=0;a<s.length;a++){let l=s[a];i?l.oldValue=i[a].value:o==="mounted"&&l.oldValue!==void 0&&(l=q({},l,{oldValue:void 0}));let u=l.dir[o];u&&(xt(),Et(u,n,8,[e.el,l,r,t]),Tt())}}function Jm(e,t){if(He){let n=He.provides,o=He.parent&&He.parent.provides;o===n&&(n=He.provides=Object.create(o)),n[e]=t}}function gf(e,t,n=!1){let o=qe();if(o||Zn){let r=Zn?Zn._context.provides:o?o.parent==null||o.ce?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides:void 0;if(r&&e in r)return r[e];if(arguments.length>1)return n&&Z(t)?t.call(o&&o.proxy):t}}function Ym(){return!!(qe()||Zn)}var Ef=Symbol.for("v-scx"),vf=()=>{{let e=gf(Ef);return e}};function Qm(e,t){return ai(e,null,t)}function Zm(e,t){return ai(e,null,{flush:"post"})}function _f(e,t){return ai(e,null,{flush:"sync"})}function Ro(e,t,n){return ai(e,t,n)}function ai(e,t,n=ee){let{immediate:o,deep:r,flush:s,once:i}=n,a=q({},n),l=t&&o||!t&&s!=="post",u;if(no){if(s==="sync"){let d=vf();u=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){let d=()=>{};return d.stop=De,d.resume=De,d.pause=De,d}}let f=He;a.call=(d,v,m)=>Et(d,f,v,m);let c=!1;s==="post"?a.scheduler=d=>{d.i=f,we(d,f&&f.suspense)}:s!=="sync"&&(c=!0,a.scheduler=(d,v)=>{v?d():si(d)}),a.augmentJob=d=>{t&&(d.flags|=4),c&&(d.flags|=2,f&&(d.id=f.uid,d.i=f))};let p=Ju(e,t,a);return no&&(u?u.push(p):l&&p()),p}var On=new WeakMap,yf=Symbol("_vte"),li=e=>e.__isTeleport,Yn=e=>e&&(e.disabled||e.disabled===""),eg=e=>e&&(e.defer||e.defer===""),Zu=e=>typeof SVGElement<"u"&&e instanceof SVGElement,ef=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,qa=(e,t)=>{let n=e&&e.to;return z(n)?t?t(n):null:n},tg={name:"Teleport",__isTeleport:!0,process(e,t,n,o,r,s,i,a,l,u){let{mc:f,pc:c,pbc:p,o:{insert:d,querySelector:v,createText:m,createComment:N,parentNode:A}}=u,b=Yn(t.props),{dynamicChildren:E}=t,y=(D,S,T)=>{D.shapeFlag&16&&f(D.children,S,T,r,s,i,a,l)},g=(D=t)=>{let S=Yn(D.props),T=D.target=qa(D.props,v),V=Ja(T,D,m,d);T&&(i!=="svg"&&Zu(T)?i="svg":i!=="mathml"&&ef(T)&&(i="mathml"),r&&r.isCE&&(r.ce._teleportTargets||(r.ce._teleportTargets=new Set)).add(T),S||(y(D,T,V),gr(D,!1)))},O=D=>{let S=()=>{if(On.get(D)===S){if(On.delete(D),Yn(D.props)){let T=A(D.el)||n;y(D,T,D.anchor),gr(D,!0)}g(D)}};On.set(D,S),we(S,s)};if(e==null){let D=t.el=m(""),S=t.anchor=m("");if(d(D,n,o),d(S,n,o),eg(t.props)||s&&s.pendingBranch){O(t);return}b&&(y(t,n,S),gr(t,!0)),g()}else{t.el=e.el;let D=t.anchor=e.anchor,S=On.get(e);if(S){S.flags|=8,On.delete(e),O(t);return}t.targetStart=e.targetStart;let T=t.target=e.target,V=t.targetAnchor=e.targetAnchor,M=Yn(e.props),w=M?n:T,$=M?D:V;if(i==="svg"||Zu(T)?i="svg":(i==="mathml"||ef(T))&&(i="mathml"),E?(p(e.dynamicChildren,E,w,r,s,i,a),yl(e,t,!0)):l||c(e,t,w,$,r,s,i,a,!1),b)M?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):$s(t,n,D,u,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){let P=qa(t.props,v);P&&(t.target=P,$s(t,P,null,u,0))}else M&&$s(t,T,V,u,1);gr(t,b)}},remove(e,t,n,{um:o,o:{remove:r}},s){let{shapeFlag:i,children:a,anchor:l,targetStart:u,targetAnchor:f,target:c,props:p}=e,d=Yn(p),v=s||!d,m=On.get(e);if(m&&(m.flags|=8,On.delete(e)),c&&(r(u),r(f)),s&&r(l),!m&&(d||c)&&i&16)for(let N=0;N<a.length;N++){let A=a[N];o(A,t,n,v,!!A.dynamicChildren)}},move:$s,hydrate:ng};function $s(e,t,n,{o:{insert:o},m:r},s=2){s===0&&(e.targetStart&&o(e.targetStart,t,n),o(e.targetAnchor,t,n),n=e.targetAnchor);let{el:i,anchor:a,shapeFlag:l,children:u,props:f}=e,c=s===2;if(c&&o(i,t,n),!On.has(e)&&(!c||Yn(f))&&l&16)for(let p=0;p<u.length;p++)r(u[p],t,n,2);c&&o(a,t,n)}function ng(e,t,n,o,r,s,{o:{nextSibling:i,parentNode:a,querySelector:l,insert:u,createText:f}},c){function p(N,A){let b=A;for(;b;){if(b&&b.nodeType===8){if(b.data==="teleport start anchor")t.targetStart=b;else if(b.data==="teleport anchor"){t.targetAnchor=b,N._lpa=t.targetAnchor&&i(t.targetAnchor);break}}b=i(b)}}function d(N,A){A.anchor=c(i(N),A,a(N),n,o,r,s)}let v=t.target=qa(t.props,l),m=Yn(t.props);if(v){let N=v._lpa||v.firstChild;t.shapeFlag&16&&(m?(p(v,N),d(e,t),t.targetAnchor||Ja(v,t,f,u,a(e)===v?e:null)):(t.anchor=i(e),p(v,N),t.targetAnchor||Ja(v,t,f,u),c(N&&i(N),t,v,n,o,r,s))),gr(t,m)}else m&&t.shapeFlag&16&&(d(e,t),t.targetStart=e,t.targetAnchor=i(e));return t.anchor&&i(t.anchor)}var og=tg;function gr(e,t){let n=e.ctx;n&&n.ut&&(t?n.ut(e.el,e.anchor):n.ut(e.targetStart,e.targetAnchor))}function Ja(e,t,n,o,r=null){let s=t.targetStart=n(""),i=t.targetAnchor=n("");return s[yf]=i,e&&(o(s,e,r),o(i,e,r)),i}var gt=Symbol("_leaveCb"),mr=Symbol("_enterCb");function ci(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Dr(()=>{e.isMounted=!0}),ul(()=>{e.isUnmounting=!0}),e}var wt=[Function,Array],ui={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:wt,onEnter:wt,onAfterEnter:wt,onEnterCancelled:wt,onBeforeLeave:wt,onLeave:wt,onAfterLeave:wt,onLeaveCancelled:wt,onBeforeAppear:wt,onAppear:wt,onAfterAppear:wt,onAppearCancelled:wt},rg={name:"BaseTransition",props:ui,setup(e,{slots:t}){let n=qe(),o=ci();return()=>{let r=t.default&&Cr(t.default(),!0),s=r&&r.length?bf(r):n.subTree?Kf():void 0;if(!s)return;let i=Q(e),{mode:a}=i;if(o.isLeaving)return Xa(s);let l=Gs(s);if(!l)return Xa(s);let u=eo(l,i,o,n);l.type!==xe&&Ct(l,u);let f=n.subTree&&Gs(n.subTree);if(f&&f.type!==xe&&!Ot(f,l)&&br(n.subTree)){let c=eo(f,i,o,n);if(Ct(f,c),a==="out-in"&&l.type!==xe)return o.isLeaving=!0,c.afterLeave=()=>{if(o.isLeaving=!1,!(n.job.flags&8))if(n.effect.flags&2){let p=()=>{n.job.flags&8||n.update()};p.i=n,si(p)}else n.update();delete c.afterLeave,f=void 0},Xa(s);a==="in-out"&&l.type!==xe?c.delayLeave=(p,d,v)=>{let m=Nf(o,f);m[String(f.key)]=f,p[gt]=()=>{d(),p[gt]=void 0,delete u.delayedLeave,f=void 0},u.delayedLeave=()=>{v(),delete u.delayedLeave,f=void 0}}:f=void 0}else f&&(f=void 0);return s}}};function bf(e){let t=e[0];if(e.length>1){let n=!1;for(let o of e)if(o.type!==xe){t=o,n=!0;break}}return t}var al=rg;function Nf(e,t){let{leavingVNodes:n}=e,o=n.get(t.type);return o||(o=Object.create(null),n.set(t.type,o)),o}function eo(e,t,n,o){let{appear:r,mode:s,persisted:i=!1,onBeforeEnter:a,onEnter:l,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:c,onLeave:p,onAfterLeave:d,onLeaveCancelled:v,onBeforeAppear:m,onAppear:N,onAfterAppear:A,onAppearCancelled:b}=t,E=String(e.key),y=Nf(n,e),g=(S,T)=>{S&&Et(S,o,9,T)},O=(S,T)=>{let V=T[1];g(S,T),H(S)?S.every(M=>M.length<=1)&&V():S.length<=1&&V()},D={mode:s,persisted:i,beforeEnter(S){let T=a;if(!n.isMounted)if(r)T=m||a;else return;S[gt]&&S[gt](!0);let V=y[E];if(V&&Ot(e,V)){let M=V.el[gt];if(!M){let w=br(V);M=w&&w.el[gt]}M&&M()}g(T,[S])},enter(S){if(!Km&&S[gt]){D.delayedLeave&&D.delayedLeave();return}let T=l,V=u,M=f;if(!n.isMounted)if(r)T=N||l,V=A||u,M=b||f;else return;let w=!1;S[mr]=P=>{w||(w=!0,P?g(M,[S]):g(V,[S]),D.delayedLeave&&D.delayedLeave(),S[mr]=void 0)};let $=S[mr].bind(null,!1);T?O(T,[S,$]):$()},leave(S,T){let V=String(e.key);if(S[mr]&&S[mr](!0),n.isUnmounting)return T();g(c,[S]);let M=!1;S[gt]=$=>{M||(M=!0,T(),$?g(v,[S]):g(d,[S]),S[gt]=void 0,y[V]===e&&delete y[V])};let w=S[gt].bind(null,!1);y[V]=e,p?O(p,[S,w]):w()},clone(S){let T=eo(S,t,n,o);return T.afterLeave=()=>{D.afterLeave&&D.afterLeave()},T.delayLeave=(V,M,w)=>{D.delayLeave?D.delayLeave(V,M,w):w()},T.delayedLeave=()=>{D.delayedLeave&&D.delayedLeave()},T}};return D}function Xa(e){if(Ar(e))return e=Gt(e),e.children=null,e}function Gs(e){if(!Ar(e))return li(e.type)&&e.children?bf(e.children):e;if(e.component)return e.component.subTree;let{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&Z(n.default))return n.default()}}function Ct(e,t){if(e.shapeFlag&6&&e.component){e.transition=t;let n=e.component.subTree;Ct(li(n.type)&&Gs(n)||n,t)}else if(e.shapeFlag&128){let n=e.suspense;if(n){let o=n.isHydrating?n.pendingBranch:n.activeBranch;o&&Ct(o,t.clone(o))}else e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)}else if(e.transition=t,e.type===Ve&&H(e.children)){let n=ml(e.children,!1);n&&Ct(n,t)}}function Cr(e,t=!1,n){let o=[],r=0;for(let s=0;s<e.length;s++){let i=e[s],a=n==null?i.key:String(n)+String(i.key!=null?i.key:s);i.type===Ve?(i.patchFlag&128&&r++,o=o.concat(Cr(i.children,t,a))):(t||i.type!==xe)&&o.push(a!=null?Gt(i,{key:a}):i)}if(r>1)for(let s=0;s<o.length;s++)o[s].patchFlag=-2;return o}function br(e){if(e.component)return br(e.component.subTree);if(e.type===Ve){let t=H(e.children)&&ml(e.children,!1);return t?br(t):void 0}if(e.type!==xe)return e}function at(e,t){return Z(e)?q({name:e.name},t,{setup:e}):e}function sg(){let e=qe();return e?(e.appContext.config.idPrefix||"v")+"-"+e.ids[0]+e.ids[1]++:""}function Sf(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function ig(e){let t=qe(),n=Ps(null);if(t){let r=t.refs===ee?t.refs={}:t.refs;Object.defineProperty(r,e,{enumerable:!0,get:()=>n.value,set:s=>n.value=s})}return n}function tf(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var qs=new WeakMap;function Io(e,t,n,o,r=!1){if(H(e)){e.forEach((m,N)=>Io(m,t&&(H(t)?t[N]:t),n,o,r));return}if(un(o)&&!r){o.shapeFlag&512&&o.type.__asyncResolved&&o.component.subTree.component&&Io(e,t,n,o.component.subTree);return}let s=o.shapeFlag&4?Ir(o.component):o.el,i=r?null:s,{i:a,r:l}=e,u=t&&t.r,f=a.refs===ee?a.refs={}:a.refs,c=a.setupState,p=Q(c),d=c===ee?xn:m=>tf(f,m)?!1:le(p,m),v=(m,N)=>!(N&&tf(f,N));if(u!=null&&u!==l){if(nf(t),z(u))f[u]=null,d(u)&&(c[u]=null);else if(Ne(u)){let m=t;v(u,m.k)&&(u.value=null),m.k&&(f[m.k]=null)}}if(Z(l))oo(l,a,12,[i,f]);else{let m=z(l),N=Ne(l);if(m||N){let A=()=>{if(e.f){let b=m?d(l)?c[l]:f[l]:v(l)||!e.k?l.value:f[e.k];if(r)H(b)&&or(b,s);else if(H(b))b.includes(s)||b.push(s);else if(m)f[l]=[s],d(l)&&(c[l]=f[l]);else{let E=[s];v(l,e.k)&&(l.value=E),e.k&&(f[e.k]=E)}}else m?(f[l]=i,d(l)&&(c[l]=i)):N&&(v(l,e.k)&&(l.value=i),e.k&&(f[e.k]=i))};if(i){let b=()=>{A(),qs.delete(e)};b.id=-1,qs.set(e,b),we(b,n)}else nf(e),A()}}}function nf(e){let t=qs.get(e);t&&(t.flags|=8,qs.delete(e))}var of=!1,Oo=()=>{of||(console.error("Hydration completed but contains mismatches."),of=!0)},ag=e=>e.namespaceURI.includes("svg")&&e.tagName!=="foreignObject",lg=e=>e.namespaceURI.includes("MathML"),Fs=e=>{if(e.nodeType===1){if(ag(e))return"svg";if(lg(e))return"mathml"}},Do=e=>e.nodeType===8;function cg(e){let{mt:t,p:n,o:{patchProp:o,createText:r,nextSibling:s,parentNode:i,remove:a,insert:l,createComment:u}}=e,f=(E,y)=>{if(!y.hasChildNodes()){n(null,E,y),zs(),y._vnode=E;return}c(y.firstChild,E,null,null,null),zs(),y._vnode=E},c=(E,y,g,O,D,S=!1)=>{S=S||!!y.dynamicChildren;let T=Do(E)&&E.data==="[",V=()=>m(E,y,g,O,D,T),{type:M,ref:w,shapeFlag:$,patchFlag:P}=y,W=E.nodeType;y.el=E,P===-2&&(S=!1,y.dynamicChildren=null);let j=null;switch(M){case An:W!==3?y.children===""?(l(y.el=r(""),i(E),E),j=E):j=V():(E.data!==y.children&&(Oo(),E.data=y.children),j=s(E));break;case xe:b(E)?(j=s(E),A(y.el=E.content.firstChild,E,g)):W!==8||T?j=V():j=s(E);break;case fn:if(T&&(E=s(E),W=E.nodeType),W===1||W===3){j=E;let ae=!y.children.length;for(let pe=0;pe<y.staticCount;pe++)ae&&(y.children+=j.nodeType===1?j.outerHTML:j.data),pe===y.staticCount-1&&(y.anchor=j),j=s(j);return T?s(j):j}else V();break;case Ve:T?j=v(E,y,g,O,D,S):j=V();break;default:if($&1)(W!==1||y.type.toLowerCase()!==E.tagName.toLowerCase())&&!b(E)?j=V():j=p(E,y,g,O,D,S);else if($&6){y.slotScopeIds=D;let ae=i(E);if(T?j=N(E):Do(E)&&E.data==="teleport start"?j=N(E,E.data,"teleport end"):j=s(E),t(y,ae,null,g,O,Fs(ae),S),(un(y)||y.component.asyncDep)&&!y.component.subTree){let pe;T?(pe=ye(fn),pe.anchor=j?j.previousSibling:ae.lastChild):pe=E.nodeType===3?Nl(""):ye(E.nodeType===8?xe:"div"),pe.el=E,y.component.subTree=pe}}else $&64?W!==8?j=V():j=y.type.hydrate(E,y,g,O,D,S,e,d):$&128&&(j=y.type.hydrate(E,y,g,O,Fs(i(E)),D,S,e,c))}return w!=null&&Io(w,null,O,y),j},p=(E,y,g,O,D,S)=>{S=S||!!y.dynamicChildren;let{type:T,dynamicProps:V,props:M,patchFlag:w,shapeFlag:$,dirs:P,transition:W}=y,j=T==="input"||T==="option",ae=!!V;if(j||ae||w!==-1){P&&Kt(y,null,g,"created");let pe=!1;if(b(E)){pe=$f(null,W)&&g&&g.vnode.props&&g.vnode.props.appear;let re=E.content.firstChild;if(pe){let Me=re.getAttribute("class");Me&&(re.$cls=Me),W.beforeEnter(re)}A(re,E,g),y.el=E=re}if($&16&&!(M&&(M.innerHTML||M.textContent))){let re=d(E.firstChild,y,E,g,O,D,S);for(re&&!js(E,1)&&Oo();re;){let Me=re;re=re.nextSibling,a(Me)}}else if($&8){let re=y.children;re[0]===`
`&&(E.tagName==="PRE"||E.tagName==="TEXTAREA")&&(re=re.slice(1));let{textContent:Me}=E;Me!==re&&Me!==re.replace(/\r\n|\r/g,`
`)&&(js(E,0)||Oo(),E.textContent=y.children)}if(M){if(j||ae||!S||w&48){let re=E.tagName.includes("-"),Me=E.namespaceURI.includes("svg")?"svg":E.namespaceURI.includes("MathML")?"mathml":void 0;for(let Ee in M)if(j&&(Ee.endsWith("value")||Ee==="indeterminate")||Bt(Ee)&&!Lt(Ee)||Ee[0]==="."||re&&!Lt(Ee)||V&&V.includes(Ee)){if(fg(E,Ee,M[Ee]))continue;o(E,Ee,null,M[Ee],Me,g)}}else if(M.onClick)o(E,"onClick",null,M.onClick,void 0,g);else if(w&4&&dt(M.style))for(let re in M.style)M.style[re]}let he;(he=M&&M.onVnodeBeforeMount)&&st(he,g,y),P&&Kt(y,null,g,"beforeMount"),((he=M&&M.onVnodeMounted)||P||pe)&&Zs(()=>{he&&st(he,g,y),pe&&W.enter(E),P&&Kt(y,null,g,"mounted")},O)}return E.nextSibling},d=(E,y,g,O,D,S,T)=>{T=T||!!y.dynamicChildren;let V=y.children,M=V.length,w=!1;for(let $=0;$<M;$++){let P=T?V[$]:V[$]=it(V[$]),W=P.type===An;E?(W&&!T&&$+1<M&&it(V[$+1]).type===An&&(l(r(E.data.slice(P.children.length)),g,s(E)),E.data=P.children),E=c(E,P,O,D,S,T)):W&&!P.children?l(P.el=r(""),g):(w||(w=!0,js(g,1)||Oo()),n(null,P,g,null,O,D,Fs(g),S))}return E},v=(E,y,g,O,D,S)=>{let{slotScopeIds:T}=y;T&&(D=D?D.concat(T):T);let V=i(E),M=d(s(E),y,V,g,O,D,S);return M&&Do(M)&&M.data==="]"?s(y.anchor=M):(Oo(),l(y.anchor=u("]"),V,M),M)},m=(E,y,g,O,D,S)=>{if(dg(E,y)||Oo(),y.el=null,S){let M=N(E);for(;;){let w=s(E);if(w&&w!==M)a(w);else break}}let T=s(E),V=i(E);return a(E),n(null,y,V,T,g,O,Fs(V),D),g&&g.vnode.el===E&&(g.vnode.el=y.el,di(g,y.el)),T},N=(E,y="[",g="]")=>{let O=0;for(;E;)if(E=s(E),E&&Do(E)&&(E.data===y&&O++,E.data===g)){if(O===0)return s(E);O--}return E},A=(E,y,g)=>{let O=y.parentNode;O&&O.replaceChild(E,y);let D=g;for(;D;)D.vnode.el===y&&(D.vnode.el=D.subTree.el=E),D=D.parent},b=E=>E.nodeType===1&&E.tagName==="TEMPLATE";return[f,c]}var ug=new Set(["src","srcset","href","poster"]);function fg(e,t,n){return ug.has(t)?e.getAttribute(t)===(n==null?null:`${n}`):!1}var Js="data-allow-mismatch",pg={0:"text",1:"children",2:"class",3:"style",4:"attribute"};function js(e,t){if(t===0||t===1)for(;e&&!e.hasAttribute(Js);)e=e.parentElement;return ll(e&&e.getAttribute(Js),t)}function ll(e,t){if(e==null)return!1;if(e==="")return!0;{let n=e.split(",");return t===0&&n.includes("children")?!0:n.includes(pg[t])}}function dg(e,t){return js(e.parentElement,1)||hg(e)||mg(t)}function hg(e){return e.nodeType===1&&ll(e.getAttribute(Js),1)}function mg({props:e}){let t=e&&e[Js];return typeof t=="string"&&ll(t,1)}var gg=sr().requestIdleCallback||(e=>setTimeout(e,1)),Eg=sr().cancelIdleCallback||(e=>clearTimeout(e)),vg=(e=1e4)=>t=>{let n=gg(t,{timeout:e});return()=>Eg(n)};function _g(e){let{top:t,left:n,bottom:o,right:r}=e.getBoundingClientRect(),{innerHeight:s,innerWidth:i}=window;return(t>0&&t<s||o>0&&o<s)&&(n>0&&n<i||r>0&&r<i)}var yg=e=>(t,n)=>{let o=new IntersectionObserver(s=>{for(let i of s)if(i.isIntersecting){o.disconnect(),t();break}},e),r=s=>{if(_g(s))return t(),o.disconnect(),!1;if(getComputedStyle(s).display==="contents"){for(let i=0;i<s.children.length;i++)if(r(s.children[i])===!1)return!1}o.observe(s)};return n(s=>{if(s instanceof Element)return r(s)}),()=>o.disconnect()},bg=e=>t=>{if(e){let n=matchMedia(e);if(n.matches)t();else return n.addEventListener("change",t,{once:!0}),()=>n.removeEventListener("change",t)}},Ng=(e=[])=>(t,n)=>{z(e)&&(e=[e]);let o=!1,r=i=>{o||(o=!0,s(),t(),i.target.dispatchEvent(new i.constructor(i.type,i)))},s=()=>{n(i=>{for(let a of e)i.removeEventListener(a,r)})};return n(i=>{for(let a of e)i.addEventListener(a,r,{once:!0})}),s};function Sg(e,t){if(Do(e)&&e.data==="["){let n=1,o=e.nextSibling;for(;o;){if(o.nodeType===1){if(t(o)===!1)break}else if(Do(o))if(o.data==="]"){if(--n===0)break}else o.data==="["&&n++;o=o.nextSibling}}else t(e)}var un=e=>!!e.type.__asyncLoader;function xg(e){Z(e)&&(e={loader:e});let{loader:t,loadingComponent:n,errorComponent:o,delay:r=200,hydrate:s,timeout:i,suspensible:a=!0,onError:l}=e,u=null,f,c=0,p=()=>(c++,u=null,d()),d=()=>{let v;return u||(v=u=t().catch(m=>{if(m=m instanceof Error?m:new Error(String(m)),l)return new Promise((N,A)=>{l(m,()=>N(p()),()=>A(m),c+1)});throw m}).then(m=>v!==u&&u?u:(m&&(m.__esModule||m[Symbol.toStringTag]==="Module")&&(m=m.default),f=m,m)))};return at({name:"AsyncComponentWrapper",__asyncLoader:d,__asyncHydrate(v,m,N){let A=v.isConnected,b=!1;(m.bu||(m.bu=[])).push(()=>b=!0);let E=()=>{b||!v.parentNode||A&&!v.isConnected||N()},y=s?()=>{let g=s(E,O=>Sg(v,O));g&&(m.bum||(m.bum=[])).push(g)}:E;f?y():d().then(()=>!m.isUnmounted&&y())},get __asyncResolved(){return f},setup(){let v=He;if(Sf(v),f)return()=>Us(f,v);let m=g=>{u=null,ro(g,v,13,!o,!0)};if(a&&v.suspense||no)return d().then(g=>()=>Us(g,v)).catch(g=>(m(g),()=>o?ye(o,{error:g}):null));let N=mt(!1),A=mt(),b=mt(!!r),E,y;return wo(()=>{E!=null&&clearTimeout(E),y!=null&&clearTimeout(y)}),r&&(y=setTimeout(()=>{v.isUnmounted||(b.value=!1)},r)),i!=null&&(E=setTimeout(()=>{if(!v.isUnmounted&&!N.value&&!A.value){let g=new Error(`Async component timed out after ${i}ms.`);m(g),A.value=g}},i)),d().then(()=>{v.isUnmounted||(N.value=!0,v.parent&&Ar(v.parent.vnode)&&v.parent.update())}).catch(g=>{if(v.isUnmounted){u=null;return}m(g),A.value=g}),()=>{if(N.value&&f)return Us(f,v);if(A.value&&o)return ye(o,{error:A.value});if(n&&!b.value)return Us(n,v)}}})}function Us(e,t){let{ref:n,props:o,children:r,ce:s}=t.vnode,i=ye(e,o,r);return i.ref=n,i.ce=s,delete t.vnode.ce,i}var Ar=e=>e.type.__isKeepAlive,Tg={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){let n=qe(),o=n.ctx;if(!o.renderer)return()=>{let b=t.default&&t.default();return b&&b.length===1?b[0]:b};let r=new Map,s=new Set,i=null,a=n.suspense,{renderer:{p:l,m:u,um:f,o:{createElement:c}}}=o,p=c("div");o.activate=(b,E,y,g,O)=>{let D=b.component;u(b,E,y,0,a),l(D.vnode,b,E,y,D,a,g,b.slotScopeIds,O),we(()=>{D.isDeactivated=!1,D.a&&Tn(D.a);let S=b.props&&b.props.onVnodeMounted;S&&st(S,D.parent,b)},a)},o.deactivate=b=>{let E=r.get(b.key==null?b.type:b.key);if(!E||E.component!==b.component)return!1;let y=b.component;return Ys(y.m),Ys(y.a),u(b,p,null,1,a),we(()=>{y.da&&Tn(y.da);let g=b.props&&b.props.onVnodeUnmounted;g&&st(g,y.parent,b),y.isDeactivated=!0},a),!0};function d(b){Bs(b),f(b,n,a,!0)}function v(b){r.forEach((E,y)=>{let g=ri(un(E)?E.type.__asyncResolved||{}:E.type);g&&!b(g)&&m(y)})}function m(b){let E=r.get(b);E&&(!i||!Ot(E,i))?d(E):i&&(Bs(i),E&&Bs(E)),r.delete(b),s.delete(b)}Ro(()=>[e.include,e.exclude],([b,E])=>{b&&v(y=>Er(b,y)),E&&v(y=>!Er(E,y))},{flush:"post",deep:!0});let N=null,A=()=>{if(N!=null)if(Qs(n.subTree.type)){let b=()=>{let E=Hs(n.subTree);E.component&&r.set(N,E)};n.subTree.suspense.pendingBranch?we(b,n.subTree.suspense):b()}else r.set(N,Hs(n.subTree))};return Dr(A),fi(A),ul(()=>{r.forEach(b=>{let{subTree:E,suspense:y}=n,g=Hs(E);if(b.type===g.type&&b.key===g.key){Bs(g);let O=g.component.da;O&&we(O,y);return}d(b)})}),()=>{if(N=null,!t.default)return i=null;let b=t.default(),E=b[0];if(b.length>1)return i=null,b;if(!dn(E)||!(E.shapeFlag&4)&&!(E.shapeFlag&128))return i=null,E;let y=Hs(E);if(y.type===xe)return i=null,y;let g=y.type,O=ri(un(y)?y.type.__asyncResolved||{}:g),{include:D,exclude:S,max:T}=e;if(D&&(!O||!Er(D,O))||S&&O&&Er(S,O))return y.shapeFlag&=-257,i=y,E;let V=y.key==null?g:y.key,M=r.get(V);return y.el&&(y=Gt(y),E.shapeFlag&128&&(E.ssContent=y)),N=V,M?(y.el=M.el,y.component=M.component,y.transition&&Ct(y,y.transition),y.shapeFlag|=512,s.delete(V),s.add(V)):(s.add(V),T&&s.size>parseInt(T,10)&&m(s.values().next().value)),y.shapeFlag|=256,i=y,Qs(E.type)?E:y}}},wg=Tg;function Er(e,t){return H(e)?e.some(n=>Er(n,t)):z(e)?e.split(",").includes(t):cu(e)?(e.lastIndex=0,e.test(t)):!1}function Og(e,t){xf(e,"a",t)}function Cg(e,t){xf(e,"da",t)}function xf(e,t,n=He){let o=e.__wdc||(e.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return e()});if(Nr(t,o,n),n){let r=n.parent;for(;r&&r.parent;)Ar(r.parent.vnode)&&Ag(o,t,n,r),r=r.parent}}function Ag(e,t,n,o){let r=Nr(t,e,o,!0),s=Nr("um",()=>or(o[t],r),n);s.flags=16}function Bs(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function Hs(e){return e.shapeFlag&128?e.ssContent:e}function Nr(e,t,n=He,o=!1){if(n){let r=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...i)=>{xt();let a=mi(n),l=Et(t,n,e,i);return a(),Tt(),l});return o?r.unshift(s):r.push(s),s}}var hn=e=>(t,n=He)=>{(!no||e==="sp")&&Nr(e,(...o)=>t(...o),n)},Dg=hn("bm"),Dr=hn("m"),cl=hn("bu"),fi=hn("u"),ul=hn("bum"),fl=hn("um"),Ig=hn("sp"),kg=hn("rtg"),Vg=hn("rtc");function Rg(e,t=He){Nr("ec",e,t)}var pl="components",Pg="directives";function Mg(e,t){return dl(pl,e,!0,t)||e}var Tf=Symbol.for("v-ndc");function Lg(e){return z(e)?dl(pl,e,!1)||e:e||Tf}function $g(e){return dl(Pg,e)}function dl(e,t,n=!0,o=!1){let r=je||He;if(r){let s=r.type;if(e===pl){let a=ri(s,!1);if(a&&(a===t||a===ce(t)||a===St(ce(t))))return s}let i=rf(r[e]||s[e],t)||rf(r.appContext[e],t);return!i&&o?s:i}}function rf(e,t){return e&&(e[t]||e[ce(t)]||e[St(ce(t))])}function Fg(e,t,n,o){let r,s=n&&n[o],i=H(e);if(i||z(e)){let a=i&&dt(e),l=!1,u=!1;a&&(l=!$e(e),u=tt(e),e=dr(e)),r=new Array(e.length);for(let f=0,c=e.length;f<c;f++)r[f]=t(l?u?an(ht(e[f])):ht(e[f]):e[f],f,void 0,s&&s[f])}else if(typeof e=="number")if(!Number.isInteger(e)||e<0)r=[];else{r=new Array(e);for(let a=0;a<e;a++)r[a]=t(a+1,a,void 0,s&&s[a])}else if(ie(e))if(e[Symbol.iterator])r=Array.from(e,(a,l)=>t(a,l,void 0,s&&s[l]));else{let a=Object.keys(e);r=new Array(a.length);for(let l=0,u=a.length;l<u;l++){let f=a[l];r[l]=t(e[f],f,l,s&&s[l])}}else r=[];return n&&(n[o]=r),r}function Ug(e,t){for(let n=0;n<t.length;n++){let o=t[n];if(H(o))for(let r=0;r<o.length;r++)e[o[r].name]=o[r].fn;else o&&(e[o.name]=o.key?(...r)=>{let s=o.fn(...r);return s&&(s.key=o.key),s}:o.fn)}return e}function Bg(e,t,n,o,r,s){if(n==null&&(n={}),je.ce||je.parent&&un(je.parent)&&je.parent.ce){let u=s!=null&&n.key==null?q({},n,{key:s}):n,f=Object.keys(u).length>0;return t!=="default"&&(u.name=t),xr(),ei(Ve,null,[ye("slot",u,o&&o())],f?-2:64)}let i=e[t];i&&i._c&&(i._d=!1);let a=pn.length;xr();let l;try{let u=i&&hl(i(n)),f=n.key||s||u&&u.key;l=ei(Ve,{key:(f&&!Ae(f)?f:`_${t}`)+(!u&&o?"_fb":"")},u||(o?o():[]),u&&e._===1?64:-2)}catch(u){for(let f=pn.length;f>a;f--)hi();throw u}finally{i&&i._c&&(i._d=!0)}return!r&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),l}function hl(e){return e.some(t=>dn(t)?!(t.type===xe||t.type===Ve&&!hl(t.children)):!0)?e:null}function Hg(e,t){let n={};for(let o in e)n[t&&/[A-Z]/.test(o)?`on:${o}`:on(o)]=e[o];return n}var Ya=e=>e?qf(e)?Ir(e):Ya(e.parent):null;var vr=q(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Ya(e.parent),$root:e=>Ya(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>e.type,$forceUpdate:e=>e.f||(e.f=()=>{si(e.update)}),$nextTick:e=>e.n||(e.n=Or.bind(e.proxy)),$watch:e=>De});var za=(e,t)=>e!==ee&&!e.__isScriptSetup&&le(e,t),Qa={get({_:e},t){if(t==="__v_skip")return!0;let{ctx:n,setupState:o,data:r,props:s,accessCache:i,type:a,appContext:l}=e;if(t[0]!=="$"){let p=i[t];if(p!==void 0)switch(p){case 1:return o[t];case 2:return r[t];case 4:return n[t];case 3:return s[t]}else{if(za(o,t))return i[t]=1,o[t];if(le(s,t))return i[t]=3,s[t];if(n!==ee&&le(n,t))return i[t]=4,n[t];i[t]=0}}let u=vr[t],f,c;if(u)return t==="$attrs"&&Be(e.attrs,"get",""),u(e);if((f=a.__cssModules)&&(f=f[t]))return f;if(n!==ee&&le(n,t))return i[t]=4,n[t];if(c=l.config.globalProperties,le(c,t))return c[t]},set({_:e},t,n){let{data:o,setupState:r,ctx:s}=e;return za(r,t)?(r[t]=n,!0):le(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(s[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:o,appContext:r,props:s,type:i}},a){let l;return!!(n[a]||za(t,a)||le(s,a)||le(o,a)||le(vr,a)||le(r.config.globalProperties,a)||(l=i.__cssModules)&&l[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:le(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},jg=q({},Qa,{get(e,t){if(t!==Symbol.unscopables)return Qa.get(e,t,e)},has(e,t){return t[0]!=="_"&&!pu(t)}});function Wg(){return null}function Kg(){return null}function Xg(e){}function zg(e){}function Gg(){return null}function qg(){}function Jg(e,t){return null}function Yg(){return wf("useSlots").slots}function Qg(){return wf("useAttrs").attrs}function wf(e){let t=qe();return t.setupContext||(t.setupContext=ep(t))}function Za(e){return H(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}function Zg(e,t){let n=Za(e);for(let o in t){if(o.startsWith("__skip"))continue;let r=n[o];r?H(r)||Z(r)?r=n[o]={type:r,default:t[o]}:r.default=t[o]:r===null&&(r=n[o]={default:t[o]}),r&&t[`__skip_${o}`]&&(r.skipFactory=!0)}return n}function eE(e,t){return!e||!t?e||t:H(e)&&H(t)?e.concat(t):q({},Za(e),Za(t))}function tE(e,t){let n={};for(let o in e)t.includes(o)||Object.defineProperty(n,o,{enumerable:!0,get:()=>e[o]});return n}function nE(e){let t=qe(),n=no,o=e();wr(),n&&Dn(!1);let r=()=>{mi(t),n&&Dn(!0)},s=()=>{qe()!==t&&t.scope.off(),wr(),n&&Dn(!1)};return _s(o)&&(o=o.catch(i=>{throw r(),Promise.resolve().then(()=>Promise.resolve().then(s)),i})),[o,()=>{r(),Promise.resolve().then(s)}]}function Of(){return{app:null,config:{isNativeTag:xn,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var oE=0;function rE(e,t){return function(o,r=null){Z(o)||(o=q({},o)),r!=null&&!ie(r)&&(r=null);let s=Of(),i=new WeakSet,a=[],l=!1,u=s.app={_uid:oE++,_component:o,_props:r,_container:null,_context:s,_instance:null,version:rp,get config(){return s.config},set config(f){},use(f,...c){return i.has(f)||(f&&Z(f.install)?(i.add(f),f.install(u,...c)):Z(f)&&(i.add(f),f(u,...c))),u},mixin(f){return u},component(f,c){return c?(s.components[f]=c,u):s.components[f]},directive(f,c){return c?(s.directives[f]=c,u):s.directives[f]},mount(f,c,p){if(!l){let d=u._ceVNode||ye(o,r);return d.appContext=s,p===!0?p="svg":p===!1&&(p=void 0),c&&t?t(d,f):e(d,f,p),l=!0,u._container=f,f.__vue_app__=u,Ir(d.component)}},onUnmount(f){a.push(f)},unmount(){l&&(Et(a,u._instance,16),e(null,u._container),delete u._container.__vue_app__)},provide(f,c){return s.provides[f]=c,u},runWithContext(f){let c=Zn;Zn=u;try{return f()}finally{Zn=c}}};return u}}var Zn=null;function sE(e,t,n=ee){let o=qe(),r=ce(t),s=ze(t),i=Cf(e,r),a=Ms((l,u)=>{let f,c=ee,p;return _f(()=>{let d=e[r];Ie(f,d)&&(f=d,u())}),{get(){return l(),n.get?n.get(f):f},set(d){let v=n.set?n.set(d):d;if(!Ie(v,f)&&!(c!==ee&&Ie(d,c)))return;let m=o.vnode.props,N=!!(m&&(t in m||r in m||s in m)&&(`onUpdate:${t}`in m||`onUpdate:${r}`in m||`onUpdate:${s}`in m));N||(f=d,u()),o.emit(`update:${t}`,v),Ie(d,c)&&(Ie(d,v)&&!Ie(v,p)||N&&c!==ee&&!Ie(v,f))&&u(),c=d,p=v}}});return a[Symbol.iterator]=()=>{let l=0;return{next(){return l<2?{value:l++?i||ee:a,done:!1}:{done:!0}}}},a}var Cf=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${ce(t)}Modifiers`]||e[`${ze(t)}Modifiers`];function iE(e,t,...n){if(e.isUnmounted)return;let o=e.vnode.props||ee,r=n,s=t.startsWith("update:"),i=s&&Cf(o,t.slice(7));i&&(i.trim&&(r=n.map(f=>z(f)?f.trim():f)),i.number&&(r=r.map(jn)));let a,l=o[a=on(t)]||o[a=on(ce(t))];!l&&s&&(l=o[a=on(ze(t))]),l&&Et(l,e,6,r);let u=o[a+"Once"];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,Et(u,e,6,r)}}function aE(e,t,n=!1){let o=t.emitsCache,r=o.get(e);if(r!==void 0)return r;let s=e.emits,i={};return!s&&!!1?(ie(e)&&o.set(e,null),null):(H(s)?s.forEach(l=>i[l]=null):q(i,s),ie(e)&&o.set(e,i),i)}function pi(e,t){return!e||!Bt(t)?!1:(t=t.slice(2),t=t==="Once"?t:t.replace(/Once$/,""),le(e,t[0].toLowerCase()+t.slice(1))||le(e,ze(t))||le(e,t))}function Ws(e){let{type:t,vnode:n,proxy:o,withProxy:r,propsOptions:[s],slots:i,attrs:a,emit:l,render:u,renderCache:f,props:c,data:p,setupState:d,ctx:v,inheritAttrs:m}=e,N=yr(e),A,b;try{if(n.shapeFlag&4){let g=r||o,O=g;A=it(u.call(O,g,f,c,d,p,v)),b=a}else{let g=t;A=it(g.length>1?g(c,{attrs:a,slots:i,emit:l}):g(c,null)),b=t.props?a:lE(a)}}catch(g){pn.length=0,ro(g,e,1),A=ye(xe)}let E=A,y;if(b&&m!==!1){let g=Object.keys(b),{shapeFlag:O}=E;g.length&&O&7&&(s&&g.some(bo)&&(b=cE(b,s)),E=Gt(E,b,!1,!0))}if(n.dirs&&(E=Gt(E,null,!1,!0),E.dirs=E.dirs?E.dirs.concat(n.dirs):n.dirs),n.transition){let g=li(E.type)&&Gs(E)||E;Ct(g,n.transition)}return A=E,yr(N),A}function ml(e,t=!0){let n;for(let o=0;o<e.length;o++){let r=e[o];if(dn(r)){if(r.type!==xe||r.children==="v-if"){if(n)return;n=r}}else return}return n}var lE=e=>{let t;for(let n in e)(n==="class"||n==="style"||Bt(n))&&((t||(t={}))[n]=e[n]);return t},cE=(e,t)=>{let n={};for(let o in e)(!bo(o)||!(o.slice(9)in t))&&(n[o]=e[o]);return n};function uE(e,t,n){let{props:o,children:r,component:s}=e,{props:i,children:a,patchFlag:l}=t,u=s.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return o?sf(o,i,u):!!i;if(l&8){let f=t.dynamicProps;for(let c=0;c<f.length;c++){let p=f[c];if(Af(i,o,p)&&!pi(u,p))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:o===i?!1:o?i?sf(o,i,u):!0:!!i;return!1}function sf(e,t,n){let o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let r=0;r<o.length;r++){let s=o[r];if(!le(e,s)||Af(t,e,s)&&!pi(n,s))return!0}return!1}function Af(e,t,n){let o=e[n],r=t[n];return n==="style"&&ie(o)&&ie(r)?!rt(o,r):o!==r}function di({vnode:e,parent:t,suspense:n},o){for(;t;){let r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.suspense.vnode.el=r.el=o,e=r),r===e)(e=t.vnode).el=o,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=o)}var Df={},If=()=>Object.create(Df),kf=e=>Object.getPrototypeOf(e)===Df;function fE(e,t,n,o=!1){let r={},s=If();e.propsDefaults=Object.create(null),Vf(e,t,r,s);for(let i in e.propsOptions[0])i in r||(r[i]=void 0);n?e.props=o?r:ks(r):e.type.props?e.props=r:e.props=s,e.attrs=s}function pE(e,t,n,o){let{props:r,attrs:s,vnode:{patchFlag:i}}=e,a=Q(r),[l]=e.propsOptions,u=!1;if((o||i>0)&&!(i&16)){if(i&8){let f=e.vnode.dynamicProps;for(let c=0;c<f.length;c++){let p=f[c];if(pi(e.emitsOptions,p))continue;let d=t[p];if(l)if(le(s,p))d!==s[p]&&(s[p]=d,u=!0);else{let v=ce(p);r[v]=el(l,a,v,d,e,!1)}else d!==s[p]&&(s[p]=d,u=!0)}}}else{Vf(e,t,r,s)&&(u=!0);let f;for(let c in a)(!t||!le(t,c)&&((f=ze(c))===c||!le(t,f)))&&(l?n&&(n[c]!==void 0||n[f]!==void 0)&&(r[c]=el(l,a,c,void 0,e,!0)):delete r[c]);if(s!==a)for(let c in s)(!t||!le(t,c))&&(delete s[c],u=!0)}u&&jt(e.attrs,"set","")}function Vf(e,t,n,o){let[r,s]=e.propsOptions,i=!1,a;if(t)for(let l in t){if(Lt(l))continue;let u=t[l],f;r&&le(r,f=ce(l))?!s||!s.includes(f)?n[f]=u:(a||(a={}))[f]=u:pi(e.emitsOptions,l)||(!(l in o)||u!==o[l])&&(o[l]=u,i=!0)}if(s){let l=Q(n),u=a||ee;for(let f=0;f<s.length;f++){let c=s[f];n[c]=el(r,l,c,u[c],e,!le(u,c))}}return i}function el(e,t,n,o,r,s){let i=e[n];if(i!=null){let a=le(i,"default");if(a&&o===void 0){let l=i.default;if(i.type!==Function&&!i.skipFactory&&Z(l)){let{propsDefaults:u}=r;if(n in u)o=u[n];else{let f=mi(r);o=u[n]=l.call(null,t),f()}}else o=l;r.ce&&r.ce._setProp(n,o)}i[0]&&(s&&!a?o=!1:i[1]&&(o===""||o===ze(n))&&(o=!0))}return o}function dE(e,t,n=!1){let o=t.propsCache,r=o.get(e);if(r)return r;let s=e.props,i={},a=[];if(!s&&!!1)return ie(e)&&o.set(e,Sn),Sn;if(H(s))for(let f=0;f<s.length;f++){let c=ce(s[f]);af(c)&&(i[c]=ee)}else if(s)for(let f in s){let c=ce(f);if(af(c)){let p=s[f],d=i[c]=H(p)||Z(p)?{type:p}:q({},p),v=d.type,m=!1,N=!0;if(H(v))for(let A=0;A<v.length;++A){let b=v[A],E=Z(b)&&b.name;if(E==="Boolean"){m=!0;break}else E==="String"&&(N=!1)}else m=Z(v)&&v.name==="Boolean";d[0]=m,d[1]=N,(m||le(d,"default"))&&a.push(c)}}let u=[i,a];return ie(e)&&o.set(e,u),u}function af(e){return e[0]!=="$"&&!Lt(e)}var gl=e=>e==="_"||e==="_ctx"||e==="$stable",El=e=>H(e)?e.map(it):[it(e)],hE=(e,t,n)=>{if(t._n)return t;let o=il((...r)=>El(t(...r)),n);return o._c=!1,o},Rf=(e,t,n)=>{let o=e._ctx;for(let r in e){if(gl(r))continue;let s=e[r];if(Z(s))t[r]=hE(r,s,o);else if(s!=null){let i=El(s);t[r]=()=>i}}},Pf=(e,t)=>{let n=El(t);e.slots.default=()=>n},Mf=(e,t,n)=>{for(let o in t)(n||!gl(o))&&(e[o]=t[o])},mE=(e,t,n)=>{let o=e.slots=If();if(e.vnode.shapeFlag&32){let r=t._;r?(Mf(o,t,n),n&&bs(o,"_",r,!0)):Rf(t,o)}else t&&Pf(e,t)},gE=(e,t,n)=>{let{vnode:o,slots:r}=e,s=!0,i=ee;if(o.shapeFlag&32){let a=t._;a?n&&a===1?s=!1:Mf(r,t,n):(s=!t.$stable,Rf(t,r)),i=t}else t&&(Pf(e,t),i={default:1});if(s)for(let a in r)!gl(a)&&i[a]==null&&delete r[a]};function EE(){let e=[]}var we=Zs;function vl(e){return Lf(e)}function _l(e){return Lf(e,cg)}function Lf(e,t){EE();let n=sr();n.__VUE__=!0;let{insert:o,remove:r,patchProp:s,createElement:i,createText:a,createComment:l,setText:u,setElementText:f,parentNode:c,nextSibling:p,setScopeId:d=De,insertStaticContent:v}=e,m=(h,_,x,R=null,C=null,k=null,U=void 0,F=null,L=!!_.dynamicChildren)=>{if(h===_)return;h&&!Ot(h,_)&&(R=os(h),et(h,C,k,!0),h=null),_.patchFlag===-2&&(L=!1,_.dynamicChildren=null),_.dynamicChildren&&h&&h.dynamicChildren&&h.dynamicChildren.hasOnce&&(_.dynamicChildren===Sn&&(_.dynamicChildren=[]),_.dynamicChildren.hasOnce=!0);let{type:I,ref:X,shapeFlag:B}=_;switch(I){case An:N(h,_,x,R);break;case xe:A(h,_,x,R);break;case fn:h==null&&b(_,x,R,U);break;case Ve:$(h,_,x,R,C,k,U,F,L);break;default:B&1?O(h,_,x,R,C,k,U,F,L):B&6?P(h,_,x,R,C,k,U,F,L):(B&64||B&128)&&I.process(h,_,x,R,C,k,U,F,L,mo)}X!=null&&C?Io(X,h&&h.ref,k,_||h,!_):X==null&&h&&h.ref!=null&&Io(h.ref,null,k,h,!0)},N=(h,_,x,R)=>{if(h==null)o(_.el=a(_.children),x,R);else{let C=_.el=h.el;_.children!==h.children&&u(C,_.children)}},A=(h,_,x,R)=>{h==null?o(_.el=l(_.children||""),x,R):_.el=h.el},b=(h,_,x,R)=>{[h.el,h.anchor]=v(h.children,_,x,R,h.el,h.anchor)},E=(h,_,x,R)=>{if(_.children!==h.children){let C=p(h.anchor);g(h),[_.el,_.anchor]=v(_.children,x,C,R)}else _.el=h.el,_.anchor=h.anchor},y=({el:h,anchor:_},x,R)=>{let C;for(;h&&h!==_;)C=p(h),o(h,x,R),h=C;o(_,x,R)},g=({el:h,anchor:_})=>{let x;for(;h&&h!==_;)x=p(h),r(h),h=x;r(_)},O=(h,_,x,R,C,k,U,F,L)=>{if(_.type==="svg"?U="svg":_.type==="math"&&(U="mathml"),h==null)D(_,x,R,C,k,U,F,L);else{let I=h.el&&h.el._isVueCE?h.el:null;try{I&&I._beginPatch(),V(h,_,C,k,U,F,L)}finally{I&&I._endPatch()}}},D=(h,_,x,R,C,k,U,F)=>{let L,I,{props:X,shapeFlag:B,transition:K,dirs:G}=h;if(L=h.el=i(h.type,k,X&&X.is,X),B&8?f(L,h.children):B&16&&T(h.children,L,null,R,C,Ga(h,k),U,F),G&&Kt(h,null,R,"created"),S(L,h,h.scopeId,U,R),X){for(let me in X)me!=="value"&&!Lt(me)&&s(L,me,null,X[me],k,R);"value"in X&&s(L,"value",null,X.value,k),(I=X.onVnodeBeforeMount)&&st(I,R,h)}G&&Kt(h,null,R,"beforeMount");let ue=$f(C,K);ue?K.beforeEnter(L):K&&!K.persisted&&(L[nl]=!0),o(L,_,x),((I=X&&X.onVnodeMounted)||ue||G)&&we(()=>{let de;I&&st(I,R,h),ue&&K.enter(L),G&&Kt(h,null,R,"mounted")},C)},S=(h,_,x,R,C)=>{if(x&&d(h,x),R)for(let k=0;k<R.length;k++)d(h,R[k]);if(C){let k=C.subTree;if(_===k||Qs(k.type)&&(k.ssContent===_||k.ssFallback===_)){let U=C.vnode;S(h,U,U.scopeId,U.slotScopeIds,C.parent)}}},T=(h,_,x,R,C,k,U,F,L=0)=>{for(let I=L;I<h.length;I++){let X=h[I]=F?cn(h[I]):it(h[I]);m(null,X,_,x,R,C,k,U,F)}},V=(h,_,x,R,C,k,U)=>{let F=_.el=h.el,{patchFlag:L,dynamicChildren:I,dirs:X}=_;L|=h.patchFlag&16;let B=h.props||ee,K=_.props||ee,G;if(x&&Jn(x,!1),(G=K.onVnodeBeforeUpdate)&&st(G,x,_,h),X&&Kt(_,h,x,"beforeUpdate"),x&&Jn(x,!0),I&&(!h.dynamicChildren||h.dynamicChildren.length!==I.length)&&(L=0,U=!1,I=null),(B.innerHTML&&K.innerHTML==null||B.textContent&&K.textContent==null)&&f(F,""),I?M(h.dynamicChildren,I,F,x,R,Ga(_,C),k):U||he(h,_,F,null,x,R,Ga(_,C),k,!1),L>0){if(L&16)w(F,B,K,x,C);else if(L&2&&B.class!==K.class&&s(F,"class",null,K.class,C),L&4&&s(F,"style",B.style,K.style,C),L&8){let ue=_.dynamicProps;for(let me=0;me<ue.length;me++){let de=ue[me],Ce=B[de],Le=K[de];(Le!==Ce||de==="value")&&s(F,de,Ce,Le,C,x)}}L&1&&h.children!==_.children&&f(F,_.children)}else!U&&I==null&&w(F,B,K,x,C);((G=K.onVnodeUpdated)||X)&&we(()=>{G&&st(G,x,_,h),X&&Kt(_,h,x,"updated")},R)},M=(h,_,x,R,C,k,U)=>{for(let F=0;F<_.length;F++){let L=h[F],I=_[F],X=L.el||ko(L),B=X&&(L.type===Ve||!Ot(L,I)||L.shapeFlag&198)?c(X):x;m(L,I,B,null,R,C,k,U,!0)}},w=(h,_,x,R,C)=>{if(_!==x){if(_!==ee)for(let k in _)!Lt(k)&&!(k in x)&&s(h,k,_[k],null,C,R);for(let k in x){if(Lt(k))continue;let U=x[k],F=_[k];U!==F&&k!=="value"&&s(h,k,F,U,C,R)}"value"in x&&s(h,"value",_.value,x.value,C)}},$=(h,_,x,R,C,k,U,F,L)=>{let I=_.el=h?h.el:a(""),X=_.anchor=h?h.anchor:a(""),{patchFlag:B,dynamicChildren:K,slotScopeIds:G}=_;G&&(F=F?F.concat(G):G),h==null?(o(I,x,R),o(X,x,R),T(_.children||[],x,X,C,k,U,F,L)):B>0&&B&64&&K&&h.dynamicChildren&&h.dynamicChildren.length===K.length?(M(h.dynamicChildren,K,x,C,k,U,F),(_.key!=null||C&&_===C.subTree)&&yl(h,_,!0)):he(h,_,x,X,C,k,U,F,L)},P=(h,_,x,R,C,k,U,F,L)=>{_.slotScopeIds=F,h==null?_.shapeFlag&512?C.ctx.activate(_,x,R,U,L):W(_,x,R,C,k,U,L):j(h,_,L)},W=(h,_,x,R,C,k,U)=>{let F=h.component=Gf(h,R,C);if(Ar(h)&&(F.ctx.renderer=mo),Jf(F,!1,U),F.asyncDep){if(C&&C.registerDep(F,ae,U,k),!h.el){let L=F.subTree=ye(xe);A(null,L,_,x),h.placeholder=L.el}}else ae(F,h,_,x,C,k,U)},j=(h,_,x)=>{let R=_.component=h.component;if(uE(h,_,x))if(R.asyncDep&&!R.asyncResolved){_.el=h.el,_.placeholder=h.placeholder,pe(R,_,x);return}else R.next=_,R.update();else _.el=h.el,_.placeholder=h.placeholder,R.vnode=_},ae=(h,_,x,R,C,k,U)=>{let F=()=>{if(h.isMounted){let{next:B,bu:K,u:G,parent:ue,vnode:me}=h;{let ft=Ff(h);if(ft){B&&(B.el=me.el,pe(h,B,U)),ft.asyncDep.then(()=>{let Yt=()=>{h.job.flags&8||(C&&C.pendingBranch?we(Yt,C):I())};Yt.flags=48,we(Yt,C)});return}}let de=B,Ce;Jn(h,!1),B?(B.el=me.el,pe(h,B,U)):B=me,K&&Tn(K),(Ce=B.props&&B.props.onVnodeBeforeUpdate)&&st(Ce,ue,B,me),Jn(h,!0);let Le=Ws(h),bt=h.subTree;h.subTree=Le,m(bt,Le,c(bt.el||ko(bt)),os(bt),h,C,k),B.el=Le.el,de===null&&di(h,Le.el),G&&we(G,C),(Ce=B.props&&B.props.onVnodeUpdated)&&we(()=>st(Ce,ue,B,me),C)}else{let B,{el:K,props:G}=_,{bm:ue,m:me,parent:de,root:Ce,type:Le}=h,bt=un(_);if(Jn(h,!1),ue&&Tn(ue),!bt&&(B=G&&G.onVnodeBeforeMount)&&st(B,de,_),Jn(h,!0),K&&Zi){let ft=()=>{h.subTree=Ws(h),Zi(K,h.subTree,h,C,null)};bt&&Le.__asyncHydrate?Le.__asyncHydrate(K,h,ft):ft()}else{Ce.ce&&Ce.ce._hasShadowRoot()&&Ce.ce._injectChildStyle(Le,h.parent?h.parent.type:void 0);let ft=h.subTree=Ws(h);m(null,ft,x,R,h,C,k),_.el=ft.el}if(me&&we(me,C),!bt&&(B=G&&G.onVnodeMounted)){let ft=_;we(()=>st(B,de,ft),C)}(_.shapeFlag&256||de&&un(de.vnode)&&de.vnode.shapeFlag&256)&&h.a&&we(h.a,C),h.isMounted=!0,_=x=R=null}};h.scope.on();let L=h.effect=new sn(F);h.scope.off();let I=h.update=L.run.bind(L),X=h.job=L.runIfDirty.bind(L);X.i=h,X.id=h.uid,L.scheduler=()=>si(X),Jn(h,!0),I()},pe=(h,_,x)=>{_.component=h;let R=h.vnode.props;h.vnode=_,h.next=null,pE(h,_.props,R,x),gE(h,_.children,x),xt(),df(h),Tt()},he=(h,_,x,R,C,k,U,F,L=!1)=>{let I=h&&h.children,X=h?h.shapeFlag:0,B=_.children,{patchFlag:K,shapeFlag:G}=_;if(K>0){if(K&128){Me(I,B,x,R,C,k,U,F,L);return}else if(K&256){re(I,B,x,R,C,k,U,F,L);return}}G&8?(X&16&&Go(I,C,k),B!==I&&f(x,B)):X&16?G&16?Me(I,B,x,R,C,k,U,F,L):Go(I,C,k,!0):(X&8&&f(x,""),G&16&&T(B,x,R,C,k,U,F,L))},re=(h,_,x,R,C,k,U,F,L)=>{h=h||Sn,_=_||Sn;let I=h.length,X=_.length,B=Math.min(I,X),K;for(K=0;K<B;K++){let G=_[K]=L?cn(_[K]):it(_[K]);m(h[K],G,x,null,C,k,U,F,L)}I>X?Go(h,C,k,!0,!1,B):T(_,x,R,C,k,U,F,L,B)},Me=(h,_,x,R,C,k,U,F,L)=>{let I=0,X=_.length,B=h.length-1,K=X-1;for(;I<=B&&I<=K;){let G=h[I],ue=_[I]=L?cn(_[I]):it(_[I]);if(Ot(G,ue))m(G,ue,x,null,C,k,U,F,L);else break;I++}for(;I<=B&&I<=K;){let G=h[B],ue=_[K]=L?cn(_[K]):it(_[K]);if(Ot(G,ue))m(G,ue,x,null,C,k,U,F,L);else break;B--,K--}if(I>B){if(I<=K){let G=K+1,ue=G<X?_[G].el:R;for(;I<=K;)m(null,_[I]=L?cn(_[I]):it(_[I]),x,ue,C,k,U,F,L),I++}}else if(I>K)for(;I<=B;)et(h[I],C,k,!0),I++;else{let G=I,ue=I,me=new Map;for(I=ue;I<=K;I++){let pt=_[I]=L?cn(_[I]):it(_[I]);pt.key!=null&&me.set(pt.key,I)}let de,Ce=0,Le=K-ue+1,bt=!1,ft=0,Yt=new Array(Le);for(I=0;I<Le;I++)Yt[I]=0;for(I=G;I<=B;I++){let pt=h[I];if(Ce>=Le){et(pt,C,k,!0);continue}let Ut;if(pt.key!=null)Ut=me.get(pt.key);else for(de=ue;de<=K;de++)if(Yt[de-ue]===0&&Ot(pt,_[de])){Ut=de;break}Ut===void 0?et(pt,C,k,!0):(Yt[Ut-ue]=I+1,Ut>=ft?ft=Ut:bt=!0,m(pt,_[Ut],x,null,C,k,U,F,L),Ce++)}let $c=bt?vE(Yt):Sn;for(de=$c.length-1,I=Le-1;I>=0;I--){let pt=ue+I,Ut=_[pt],Fc=_[pt+1],Uc=pt+1<X?Fc.el||ko(Fc):R;Yt[I]===0?m(null,Ut,x,Uc,C,k,U,F,L):bt&&(de<0||I!==$c[de]?Ee(Ut,x,Uc,2):de--)}}},Ee=(h,_,x,R,C=null)=>{let{el:k,type:U,transition:F,children:L,shapeFlag:I}=h;if(I&6){Ee(h.component.subTree,_,x,R);return}if(I&128){h.suspense.move(_,x,R);return}if(I&64){U.move(h,_,x,mo);return}if(U===Ve){o(k,_,x);for(let B=0;B<L.length;B++)Ee(L[B],_,x,R);o(h.anchor,_,x);return}if(U===fn){y(h,_,x);return}if(R!==2&&I&1&&F)if(R===0)F.persisted&&!k[gt]?o(k,_,x):(F.beforeEnter(k),o(k,_,x),we(()=>F.enter(k),C));else{let{leave:B,delayLeave:K,afterLeave:G}=F,ue=()=>{h.ctx.isUnmounted?r(k):o(k,_,x)},me=()=>{let de=k._isLeaving||!!k[gt];k._isLeaving&&k[gt](!0),F.persisted&&!de?ue():B(k,()=>{ue(),G&&G()})};K?K(k,ue,me):me()}else o(k,_,x)},et=(h,_,x,R=!1,C=!1)=>{let{type:k,props:U,ref:F,children:L,dynamicChildren:I,shapeFlag:X,patchFlag:B,dirs:K,cacheIndex:G,memo:ue}=h;if((B===-2||I&&I.hasOnce)&&(C=!1),F!=null&&(xt(),Io(F,null,x,h,!0),Tt()),G!=null&&(!h.ctx||h.ctx===_)&&(_.renderCache[G]=void 0),X&256&&_.ctx.deactivate(h))return;let me=X&1&&K,de=!un(h),Ce;if(de&&(Ce=U&&U.onVnodeBeforeUnmount)&&st(Ce,_,h),X&6)Uh(h.component,x,R);else{if(X&128){h.suspense.unmount(x,R);return}me&&Kt(h,null,_,"beforeUnmount"),X&64?h.type.remove(h,_,x,mo,R):I&&!I.hasOnce&&(k!==Ve||B>0&&B&64)?Go(I,_,x,!1,!0):(k===Ve&&B&384||!C&&X&16)&&Go(L,_,x),R&&Yi(h)}let Le=ue!=null&&G==null;(de&&(Ce=U&&U.onVnodeUnmounted)||me||Le)&&we(()=>{Ce&&st(Ce,_,h),me&&Kt(h,null,_,"unmounted"),Le&&(h.el=null)},x)},Yi=h=>{let{type:_,el:x,anchor:R,transition:C}=h,k=_===Ve;if(k&&!C){Mc(x,R);return}if(_===fn){g(h),C&&!C.persisted&&C.afterLeave&&C.afterLeave();return}let U=k?br(h):h,F=()=>{k?c(x)&&Mc(x,R):r(x),C&&!C.persisted&&C.afterLeave&&C.afterLeave()};if(U&&U.shapeFlag&1&&C&&!C.persisted){let{leave:L,delayLeave:I}=C,X=U.el,B=()=>L(X,F);I?I(X,F,B):B()}else F()},Mc=(h,_)=>{let x;for(;h!==_;)x=p(h),r(h),h=x;r(_)},Uh=(h,_,x)=>{let{bum:R,scope:C,job:k,subTree:U,um:F,m:L,a:I}=h;Ys(L),Ys(I),R&&Tn(R),C.stop(),k?(k.flags|=8,et(U,h,_,x)):U&&(U.transition=h.vnode.transition,et(U,h,_,x)),F&&we(F,_);let X=()=>{h.isUnmounted=!0};X.flags=16,we(X,_)},Go=(h,_,x,R=!1,C=!1,k=0)=>{for(let U=k;U<h.length;U++)et(h[U],_,x,R,C)},os=h=>{if(h.shapeFlag&6)return os(h.component.subTree);if(h.shapeFlag&128)return h.suspense.next();let _=p(h.anchor||h.el),x=_&&_[yf];return x?p(x):_},Lc=(h,_,x)=>{let R=h&&_._vnode?void 0:h&&h.component?h.component.uid:kE();Wm(()=>{h==null?_._vnode&&et(_._vnode,null,null,!0):m(_._vnode||null,h,_,null,null,null,x),_._vnode=h},R)},mo={p:m,um:et,m:Ee,r:Yi,mt:W,mc:T,pc:he,pbc:M,n:os,o:e},Qi,Zi;return t&&([Qi,Zi]=t(mo)),{render:Lc,hydrate:Qi,createApp:rE(Lc,Qi)}}function Ga({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Jn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function $f(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function yl(e,t,n=!1){let o=e.children,r=t.children;if(H(o)&&H(r))for(let s=0;s<o.length;s++){let i=o[s],a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=cn(r[s]),a.el=i.el),!n&&a.patchFlag!==-2&&yl(i,a)),a.type===An&&(a.patchFlag===-1&&(a=r[s]=cn(a)),a.el=i.el),a.type===xe&&!a.el&&(a.el=i.el)}}function vE(e){let t=e.slice(),n=[0],o,r,s,i,a,l=e.length;for(o=0;o<l;o++){let u=e[o];if(u!==0){if(r=n[n.length-1],e[r]<u){t[o]=r,n.push(o);continue}for(s=0,i=n.length-1;s<i;)a=s+i>>1,e[n[a]]<u?s=a+1:i=a;u<e[n[s]]&&(s>0&&(t[o]=n[s-1]),n[s]=o)}}for(s=n.length,i=n[s-1];s-- >0;)n[s]=i,i=t[i];return n}function Ff(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Ff(t)}function Ys(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function ko(e){if(e.placeholder)return e.placeholder;let t=e.component;if(t)return ko(t.subTree);let n=e.suspense;return n&&n.activeBranch?ko(n.activeBranch):null}var Qs=e=>e.__isSuspense,tl=0,nl=Symbol("_deferredEnter"),_E={name:"Suspense",__isSuspense:!0,process(e,t,n,o,r,s,i,a,l,u){if(e==null)bE(t,n,o,r,s,i,a,l,u);else{let f=e.suspense;if(s&&s.deps>0&&!s.isHydrating){let c=f.parentComponent;if(!!c&&c.suspense===s&&c.suspenseId!==s.pendingId?s.pendingBranch&&!Ot(t.ssContent,f.pendingBranch||f.activeBranch):!f.isInFallback){t.suspense=f,f.vnode=t,t.el=e.el;return}}NE(e,t,n,o,r,i,a,l,u)}},hydrate:SE,normalize:xE},yE=_E;function Sr(e,t){let n=e.props&&e.props[t];Z(n)&&n()}function lf(e){let t=[];ol(e,t,!0),t.length&&zt(t)}function ol(e,t,n){let{el:o,transition:r,children:s,shapeFlag:i}=e;if(i&6){ol(e.component.subTree,t,n);return}if(!(i&192)&&(i&1&&(!n&&o&&o[nl]&&(o[nl]=void 0,r&&!r.persisted&&(r.beforeEnter(o),t.push(()=>r.enter(o)))),n=!1),i&16))for(let a=0;a<s.length;a++)ol(s[a],t,n)}function bE(e,t,n,o,r,s,i,a,l){let{p:u,o:{createElement:f}}=l,c=f("div"),p=e.suspense=Uf(e,r,o,t,c,n,s,i,a,l);u(null,p.pendingBranch=e.ssContent,c,null,o,p,s,i),p.deps>0?(Sr(e,"onPending"),Sr(e,"onFallback"),u(null,e.ssFallback,t,n,o,null,s,i),Vo(p,e.ssFallback)):p.resolve(!1,!0)}function NE(e,t,n,o,r,s,i,a,{p:l,um:u,o:{createElement:f}}){let c=t.suspense=e.suspense;c.vnode=t,t.el=e.el;let p=t.ssContent,d=t.ssFallback,{activeBranch:v,pendingBranch:m,isInFallback:N,isHydrating:A}=c;if(m)c.pendingBranch=p,Ot(m,p)?(c.deps++,l(m,p,A?n:c.hiddenContainer,null,r,c,s,i,a),c.deps--,c.deps<=0?c.resolve():N&&!A&&!c.isFallbackMountPending&&(l(v,d,n,o,r,null,s,i,a),Vo(c,d))):(c.pendingId=tl++,A?(c.isHydrating=!1,c.activeBranch=m):u(m,r,c),c.deps=0,Bf(c),c.hiddenContainer=f("div"),N?(l(null,p,c.hiddenContainer,null,r,c,s,i,a),c.deps<=0?c.resolve():c.isFallbackMountPending||(l(v,d,n,o,r,null,s,i,a),Vo(c,d))):v&&Ot(v,p)?(l(v,p,n,o,r,c,s,i,a),c.resolve(!0)):(l(null,p,c.hiddenContainer,null,r,c,s,i,a),c.deps<=0&&c.resolve()));else if(v&&Ot(v,p))l(v,p,n,o,r,c,s,i,a),Vo(c,p);else if(Sr(t,"onPending"),c.pendingBranch=p,c.pendingId=tl++,l(null,p,c.hiddenContainer,null,r,c,s,i,a),c.deps<=0)c.resolve();else{let{timeout:b}=c;b>0?c.timeoutTimer=setTimeout(()=>{c.timeoutTimer=void 0,c.fallback(c.vnode.ssFallback)},b):b===0&&c.fallback(d)}}function Uf(e,t,n,o,r,s,i,a,l,u,f=!1){let{p:c,m:p,um:d,n:v,o:{parentNode:m,remove:N}}=u,A,b=TE(e);b&&t&&t.pendingBranch&&(A=t.pendingId,t.deps++);let E=e.props?So(e.props.timeout):void 0,y=s,g={vnode:e,parent:t,parentComponent:n,namespace:i,container:o,hiddenContainer:r,deps:0,pendingId:tl++,timeout:typeof E=="number"?E:-1,timeoutTimer:void 0,activeBranch:null,isFallbackMountPending:!1,pendingBranch:null,isInFallback:!f,isHydrating:f,isUnmounted:!1,effects:[],resolve(O=!1,D=!1){let{vnode:S,activeBranch:T,pendingBranch:V,pendingId:M,effects:w,parentComponent:$,container:P,isInFallback:W}=g,j=g.parent;for(;j&&!j.pendingBranch;)j=j.parent;let ae=!1;if(g.isHydrating)g.isHydrating=!1;else if(!O){ae=T&&V.transition&&V.transition.mode==="out-in";let he=!1;ae&&(T.transition.afterLeave=()=>{if(M===g.pendingId&&!g.isUnmounted){lf(V),p(V,P,s===y&&!he?v(T):s,0);let re=!1;if(j){let Me=P,Ee;for(;Ee=m(Me);)Me=Ee;re=Me===j.hiddenContainer}re||zt(w),W&&S.ssFallback&&(S.ssFallback.el=null)}}),T&&!g.isFallbackMountPending&&(m(T.el||ko(T))===P&&(s=v(T),he=!0),d(T,$,g,!0),!ae&&W&&S.ssFallback&&we(()=>S.ssFallback.el=null,g)),ae||(lf(V),p(V,P,s,0))}clearTimeout(g.timeoutTimer),g.timeoutTimer=void 0,g.isFallbackMountPending=!1,Vo(g,V),g.pendingBranch=null,g.isInFallback=!1;let pe=0;for(let he=0;he<w.length;he++){let re=w[he];re.flags&32?zt(re):w[pe++]=re}if(w.length=pe,j)for(let he=0;he<w.length;he++)j.effects.push(w[he]);else ae||zt(w);g.effects=[],b&&t&&t.pendingBranch&&A===t.pendingId&&(A=void 0,t.deps--,t.deps===0&&!D&&t.resolve()),Sr(S,"onResolve")},fallback(O){if(g.isUnmounted||!g.pendingBranch)return;let{vnode:D,activeBranch:S,parentComponent:T,container:V,namespace:M}=g;Sr(D,"onFallback");let w=v(S),$=()=>{if(g.isFallbackMountPending=!1,g.isUnmounted||!g.isInFallback)return;let W=g.vnode.ssFallback;c(null,W,V,w,T,null,M,a,l),Vo(g,W)},P=O.transition&&O.transition.mode==="out-in";P&&(g.isFallbackMountPending=!0,S.transition.afterLeave=$),g.isInFallback=!0,d(S,T,null,!0),P||$()},move(O,D,S){g.activeBranch&&p(g.activeBranch,O,D,S),g.container=O},next(){return g.activeBranch&&v(g.activeBranch)},registerDep(O,D,S,T){let V=!!g.pendingBranch;V&&g.deps++;let M=O.vnode.el,w=$=>{O.asyncResolved=!0;let{vnode:P}=O;rl(O,$,!1),M&&(P.el=M);let W=!M&&O.subTree.el;D(O,P,m(M||O.subTree.el),M?null:v(O.subTree),g,T,S),W&&(P.placeholder=null,N(W)),di(O,P.el)};O.asyncDep.catch($=>(O.scope.active&&ro($,O,0,!1,!0),()=>null)).then($=>{if(O.isUnmounted||g.isUnmounted)return;let P=V&&g.pendingId===O.suspenseId;if(wr(),!O.scope.active){P&&--g.deps===0&&g.resolve();return}if(!P&&g.pendingBranch){let W=()=>{O.isUnmounted||g.isUnmounted||!O.scope.active||(g.pendingBranch?Zs(W,g):w($))};W.flags=48,Zs(W,g);return}w($),P&&--g.deps===0&&g.resolve()})},unmount(O,D){if(g.isUnmounted=!0,clearTimeout(g.timeoutTimer),g.timeoutTimer=void 0,A!==void 0){let S=g.parent,T=A;A=void 0,zt(()=>{S.pendingId===T&&!S.isUnmounted&&--S.deps===0&&S.resolve()})}g.activeBranch&&d(g.activeBranch,n,O,D),g.pendingBranch&&(d(g.pendingBranch,n,g,D),Bf(g))}};return g}function SE(e,t,n,o,r,s,i,a,l){let u=t.suspense=Uf(t,o,n,e.parentNode,document.createElement("div"),null,r,s,i,a,!0),f=l(e,u.pendingBranch=t.ssContent,n,u,s,i);return u.deps===0&&u.resolve(!1,!0),f}function xE(e){let{shapeFlag:t,children:n}=e,o=t&32;e.ssContent=cf(o?n.default:n),e.ssFallback=o?cf(n.fallback):ye(xe)}function cf(e){let t;if(Z(e)){let n=to&&e._c;n&&(e._d=!1,xr()),e=e(),n&&(e._d=!0,t=Ge,hi())}return H(e)&&(e=ml(e)),e=it(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter(n=>n!==e)),e}function Bf(e){let{effects:t}=e;for(let n=0;n<t.length;n++){let o=t[n];o.flags&16&&zt(o)}t.length=0}function Zs(e,t){t&&t.pendingBranch?H(e)?t.effects.push(...e):t.effects.push(e):zt(e)}function Vo(e,t){e.activeBranch=t;let{vnode:n,parentComponent:o}=e,r=t.el;for(;!r&&t.component;)t=t.component.subTree,r=t.el;n.el=r,o&&o.subTree===n&&(o.vnode.el=r,di(o,r))}function TE(e){let t=e.props&&e.props.suspensible;return t!=null&&t!==!1}var Ve=Symbol.for("v-fgt"),An=Symbol.for("v-txt"),xe=Symbol.for("v-cmt"),fn=Symbol.for("v-stc"),pn=[],Ge=null;function xr(e=!1){pn.push(Ge=e?null:[])}function hi(){pn.pop(),Ge=pn[pn.length-1]||null}var to=1;function Tr(e,t=!1){to+=e,e<0&&Ge&&t&&(Ge.hasOnce=!0)}function Hf(e){return e.dynamicChildren=to>0?Ge||Sn:null,hi(),to>0&&Ge&&Ge.push(e),e}function wE(e,t,n,o,r,s){return Hf(bl(e,t,n,o,r,s,!0))}function ei(e,t,n,o,r){return Hf(ye(e,t,n,o,r,!0))}function dn(e){return e?e.__v_isVNode===!0:!1}function Ot(e,t){return e.type===t.type&&e.key===t.key}var OE;function CE(e){OE=e}var jf=({key:e})=>e??null,Ks=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?z(e)||Ne(e)||Z(e)?{i:je,r:e,k:t,f:!!n}:e:null);function bl(e,t=null,n=null,o=0,r=null,s=e===Ve?0:1,i=!1,a=!1){let l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&jf(t),ref:t&&Ks(t),scopeId:ii,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:o,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:je};return a?(ti(l,n),s&128&&e.normalize(l)):n&&(l.shapeFlag|=z(n)?8:16),to>0&&!i&&Ge&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&Ge.push(l),l}var ye=AE;function AE(e,t=null,n=null,o=0,r=null,s=!1){if((!e||e===Tf)&&(e=xe),dn(e)){let a=Gt(e,t,!0);return n&&ti(a,n),to>0&&!s&&Ge&&(a.shapeFlag&6?Ge[Ge.indexOf(e)]=a:Ge.push(a)),a.patchFlag=-2,a}if(LE(e)&&(e=e.__vccOpts),t){t=Wf(t);let{class:a,style:l}=t;a&&!z(a)&&(t.class=Kn(a)),ie(l)&&(Gn(l)&&!H(l)&&(l=q({},l)),t.style=Wn(l))}let i=z(e)?1:Qs(e)?128:li(e)?64:ie(e)?4:Z(e)?2:0;return bl(e,t,n,o,r,i,s,!0)}function Wf(e){return e?Gn(e)?q({},e):kf(e)?q({},e[Zf]||e):e:null}function Gt(e,t,n=!1,o=!1){let{props:r,ref:s,patchFlag:i,children:a,transition:l}=e,u=t?Xf(r||{},t):r,f={__v_isVNode:!0,__v_skip:!0,type:e.type,props:u,key:u&&jf(u),ref:t&&t.ref?n&&s?H(s)?s.concat(Ks(t)):[s,Ks(t)]:Ks(t):s,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Ve?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Gt(e.ssContent),ssFallback:e.ssFallback&&Gt(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce,cacheIndex:e.cacheIndex};return l&&o&&Ct(f,l.clone(f)),f}function Nl(e=" ",t=0){return ye(An,null,e,t)}function DE(e,t){let n=ye(fn,null,e);return n.staticCount=t,n}function Kf(e="",t=!1){return t?(xr(),ei(xe,null,e)):ye(xe,null,e)}function it(e){return e==null||typeof e=="boolean"?ye(xe):H(e)?ye(Ve,null,e.slice()):dn(e)?cn(e):ye(An,null,String(e))}function cn(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Gt(e)}function ti(e,t){let n=0,{shapeFlag:o}=e;if(t==null)t=null;else if(H(t))n=16;else if(typeof t=="object")if(o&65){let r=t.default;r&&(r._c&&(r._d=!1),ti(e,r()),r._c&&(r._d=!0));return}else{n=32;let r=t._;!r&&!kf(t)?t._ctx=je:r===3&&je&&(je.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else if(Z(t)){if(o&65){ti(e,{default:t});return}t={default:t,_ctx:je},n=32}else t=String(t),o&64?(n=16,t=[Nl(t)]):n=8;e.children=t,e.shapeFlag|=n}function Xf(...e){let t={};for(let n=0;n<e.length;n++){let o=e[n];for(let r in o)if(r==="class")t.class!==o.class&&(t.class=Kn([t.class,o.class]));else if(r==="style")t.style=Wn([t.style,o.style]);else if(Bt(r)){let s=t[r],i=o[r];i&&s!==i&&!(H(s)&&s.includes(i))?t[r]=s?[].concat(s,i):i:i==null&&s==null&&!bo(r)&&(t[r]=i)}else r!==""&&(t[r]=o[r])}return t}function st(e,t,n,o=null){Et(e,t,7,[n,o])}var IE=Of(),zf=0;function kE(){return zf}function Gf(e,t,n){let o=e.type,r=(t?t.appContext:e.appContext)||IE,s={uid:zf++,vnode:e,type:o,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new zn(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:dE(o,r),emitsOptions:aE(o,r),emit:null,emitted:null,propsDefaults:ee,inheritAttrs:o.inheritAttrs,ctx:ee,data:ee,props:ee,attrs:ee,slots:ee,refs:ee,setupState:ee,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=iE.bind(null,s),e.ce&&e.ce(s),s}var He=null,qe=()=>He||je,ni,Dn;{let e=sr(),t=(n,o)=>{let r;return(r=e[n])||(r=e[n]=[]),r.push(o),s=>{r.length>1?r.forEach(i=>i(s)):r[0](s)}};ni=t("__VUE_INSTANCE_SETTERS__",n=>He=n),Dn=t("__VUE_SSR_SETTERS__",n=>no=n)}var mi=e=>{let t=He;return ni(e),e.scope.on(),()=>{e.scope.off(),ni(t)}},wr=()=>{He&&He.scope.off(),ni(null)};function qf(e){return e.vnode.shapeFlag&4}var no=!1;function Jf(e,t=!1,n=!1){t&&Dn(t);let{props:o,children:r}=e.vnode,s=qf(e);fE(e,o,s,t),mE(e,r,n||t);let i=s?VE(e,t):void 0;return t&&Dn(!1),i}function VE(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Qa);let{setup:o}=n;if(o){xt();let r=e.setupContext=o.length>1?ep(e):null,s=mi(e),i=oo(o,e,0,[e.props,r]),a=_s(i);if(Tt(),s(),(a||e.sp)&&!un(e)&&Sf(e),a){if(i.then(wr,wr),t)return i.then(l=>{Dn(!0);try{rl(e,l,t)}finally{Dn(!1)}}).catch(l=>{ro(l,e,0,void 0,!0),e.ssrRender=(u,f)=>f("<!---->")});e.asyncDep=i}else rl(e,i,t)}else Qf(e,t)}function rl(e,t,n){Z(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:ie(t)&&(e.setupState=hr(t)),Qf(e,n)}var oi,sl;function Sl(e){oi=e,sl=t=>{t.render._rc&&(t.withProxy=new Proxy(t.ctx,jg))}}var Yf=()=>!oi;function Qf(e,t,n){let o=e.type;if(!e.render){if(!t&&oi&&!o.render){let r=o.template||!1;if(r){let{isCustomElement:s,compilerOptions:i}=e.appContext.config,{delimiters:a,compilerOptions:l}=o,u=q(q({isCustomElement:s,delimiters:a},i),l);o.render=oi(r,u)}}e.render=o.render||De,sl&&sl(e)}}var Zf=Symbol(),RE={get(e,t){return Be(e,"get",""),t===Zf?e:e[t]}};function ep(e){let t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,RE),slots:e.slots,emit:e.emit,expose:t}}function Ir(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(hr(Rs(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in vr)return vr[n](e)},has(t,n){return n in t||n in vr}})):e.proxy}var PE=/(?:^|[-_])\w/g,ME=e=>e.replace(PE,t=>t.toUpperCase()).replace(/[-_]/g,"");function ri(e,t=!0){return Z(e)?e.displayName||e.name:e.name||t&&e.__name}function tp(e,t,n=!1){let o=ri(t);if(!o&&t.__file){let r=t.__file.match(/([^/\\]+)\.\w+$/);r&&(o=r[1])}if(!o&&e){let r=s=>{for(let i in s)if(s[i]===t)return i};o=r(e.components)||e.parent&&r(e.parent.type.components)||r(e.appContext.components)}return o?ME(o):n?"App":"Anonymous"}function LE(e){return Z(e)&&"__vccOpts"in e}var Fe=(e,t)=>Xu(e,t,no);function xl(e,t,n){try{Tr(-1);let o=arguments.length;return o===2?ie(t)&&!H(t)?dn(t)?ye(e,null,[t]):ye(e,t):ye(e,null,t):(o>3?n=Array.prototype.slice.call(arguments,2):o===3&&dn(n)&&(n=[n]),ye(e,t,n))}finally{Tr(1)}}function np(){return;function s(c){let p=[];c.type.props&&c.props&&p.push(i("props",Q(c.props))),c.setupState!==ee&&p.push(i("setup",c.setupState)),c.data!==ee&&p.push(i("data",Q(c.data)));let d=l(c,"computed");d&&p.push(i("computed",d));let v=l(c,"inject");return v&&p.push(i("injected",v)),p.push(["div",{},["span",{style:o.style+";opacity:0.66"},"$ (internal): "],["object",{object:c}]]),p}function i(c,p){return p=q({},p),Object.keys(p).length?["div",{style:"line-height:1.25em;margin-bottom:0.6em"},["div",{style:"color:#476582"},c],["div",{style:"padding-left:1.25em"},...Object.keys(p).map(d=>["div",{},["span",o,d+": "],a(p[d],!1)])]]:["span",{}]}function a(c,p=!0){return typeof c=="number"?["span",t,c]:typeof c=="string"?["span",n,JSON.stringify(c)]:typeof c=="boolean"?["span",o,c]:ie(c)?["object",{object:p?Q(c):c}]:["span",n,String(c)]}function l(c,p){let d=c.type;if(Z(d))return;let v={};for(let m in c.ctx)u(d,m,p)&&(v[m]=c.ctx[m]);return v}function u(c,p,d){let v=c[d];if(H(v)&&v.includes(p)||ie(v)&&p in v||c.extends&&u(c.extends,p,d)||c.mixins&&c.mixins.some(m=>u(m,p,d)))return!0}function f(c){return $e(c)?"ShallowRef":c.effect?"ComputedRef":"Ref"}}function $E(e,t,n,o){let r=n[o];if(r&&op(r,e))return r;let s=t();return s.memo=e.slice(),s.cacheIndex=o,n[o]=s}function op(e,t){let n=e.memo;if(n.length!=t.length)return!1;for(let o=0;o<n.length;o++)if(Ie(n[o],t[o]))return!1;return to>0&&Ge&&Ge.push(e),!0}var rp="3.5.46",gi=De,FE=Bm,UE=Ao,BE=mf,HE={createComponentInstance:Gf,setupComponent:Jf,renderComponentRoot:Ws,setCurrentRenderingInstance:yr,isVNode:dn,normalizeVNode:it,getComponentPublicInstance:Ir,ensureValidVNode:hl,pushWarningContext:Vm,popWarningContext:Rm},jE=HE,WE=null,KE=null,XE=null;var Al,sp=typeof window<"u"&&window.trustedTypes;if(sp)try{Al=sp.createPolicy("vue",{createHTML:e=>e})}catch{}var wp=Al?e=>Al.createHTML(e):e=>e,zE="http://www.w3.org/2000/svg",GE="http://www.w3.org/1998/Math/MathML",mn=typeof document<"u"?document:null,ip=mn&&mn.createElement("template"),Op={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,o)=>{let r=t==="svg"?mn.createElementNS(zE,e):t==="mathml"?mn.createElementNS(GE,e):n?mn.createElement(e,{is:n}):mn.createElement(e);return e==="select"&&o&&o.multiple!=null&&r.setAttribute("multiple",o.multiple),r},createText:e=>mn.createTextNode(e),createComment:e=>mn.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>mn.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,o,r,s){let i=n?n.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),!(r===s||!(r=r.nextSibling)););else{ip.innerHTML=wp(o==="svg"?`<svg>${e}</svg>`:o==="mathml"?`<math>${e}</math>`:e);let a=ip.content;if(o==="svg"||o==="mathml"){let l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},In="transition",kr="animation",Po=Symbol("_vtc"),Cp={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Ap=q({},ui,Cp),qE=e=>(e.displayName="Transition",e.props=Ap,e),JE=qE((e,{slots:t})=>xl(al,Dp(e),t)),so=(e,t=[])=>{H(e)?e.forEach(n=>n(...t)):e&&e(...t)},ap=e=>e?H(e)?e.some(t=>t.length>1):e.length>1:!1;function Dp(e){let t={};for(let w in e)w in Cp||(t[w]=e[w]);if(e.css===!1)return t;let{name:n="v",type:o,duration:r,enterFromClass:s=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:a=`${n}-enter-to`,appearFromClass:l=s,appearActiveClass:u=i,appearToClass:f=a,leaveFromClass:c=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:d=`${n}-leave-to`}=e,v=YE(r),m=v&&v[0],N=v&&v[1],{onBeforeEnter:A,onEnter:b,onEnterCancelled:E,onLeave:y,onLeaveCancelled:g,onBeforeAppear:O=A,onAppear:D=b,onAppearCancelled:S=E}=t,T=(w,$,P,W)=>{w._enterResolve=void 0,w._enterCancelled=W,kn(w,$?f:a),kn(w,$?u:i),P&&P()},V=(w,$)=>{w._leaveResolve=void 0,w._isLeaving=!1,kn(w,c),kn(w,d),kn(w,p),$&&$()},M=w=>($,P)=>{let W=w?D:b,j=()=>{$._enterResolve===j&&T($,w,P)};$._enterResolve=j,so(W,[$,j]),lp(()=>{kn($,w?l:s),$._enterResolve===j&&(qt($,w?f:a),ap(W)||cp($,o,m,j))})};return q(t,{onBeforeEnter(w){so(A,[w]),qt(w,s),qt(w,i)},onBeforeAppear(w){so(O,[w]),qt(w,l),qt(w,u)},onEnter:M(!1),onAppear:M(!0),onLeave(w,$){w._isLeaving=!0;let P=()=>{w._leaveResolve===P&&V(w,$)};w._leaveResolve=P,qt(w,c),w._enterCancelled?(qt(w,p),Dl(w)):(Dl(w),qt(w,p)),lp(()=>{w._leaveResolve===P&&(kn(w,c),qt(w,d),ap(y)||cp(w,o,N,P))}),so(y,[w,P])},onEnterCancelled(w){T(w,!1,void 0,!0),so(E,[w])},onAppearCancelled(w){T(w,!0,void 0,!0),so(S,[w])},onLeaveCancelled(w){V(w),so(g,[w])}})}function YE(e){if(e==null)return null;if(ie(e))return[Tl(e.enter),Tl(e.leave)];{let t=Tl(e);return[t,t]}}function Tl(e){return So(e)}function qt(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e[Po]||(e[Po]=new Set)).add(t)}function kn(e,t){t.split(/\s+/).forEach(o=>o&&e.classList.remove(o));let n=e[Po];n&&(n.delete(t),n.size||(e[Po]=void 0))}function lp(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}var QE=0;function cp(e,t,n,o){let r=e._endId=++QE,s=()=>{r===e._endId&&o()};if(n!=null)return setTimeout(s,n);let{type:i,timeout:a,propCount:l}=Ip(e,t);if(!i)return o();let u=i+"end",f=0,c=()=>{e.removeEventListener(u,p),s()},p=d=>{d.target===e&&++f>=l&&c()};setTimeout(()=>{f<l&&c()},a+1),e.addEventListener(u,p)}function Ip(e,t){let n=window.getComputedStyle(e),o=v=>(n[v]||"").split(", "),r=o(`${In}Delay`),s=o(`${In}Duration`),i=up(r,s),a=o(`${kr}Delay`),l=o(`${kr}Duration`),u=up(a,l),f=null,c=0,p=0;t===In?i>0&&(f=In,c=i,p=s.length):t===kr?u>0&&(f=kr,c=u,p=l.length):(c=Math.max(i,u),f=c>0?i>u?In:kr:null,p=f?f===In?s.length:l.length:0);let d=f===In&&/\b(?:transform|all)(?:,|$)/.test(o(`${In}Property`).toString());return{type:f,timeout:c,propCount:p,hasTransform:d}}function up(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,o)=>fp(n)+fp(e[o])))}function fp(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function Dl(e){return(e?e.ownerDocument:document).body.offsetHeight}function ZE(e,t,n){let o=e[Po];o&&(t=(t?[t,...o]:[...o]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}var yi=Symbol("_vod"),Rl=Symbol("_vsh"),kp={name:"show",beforeMount(e,{value:t},{transition:n}){e[yi]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):Vr(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:o}){!t!=!n&&(o?t?(o.beforeEnter(e),Vr(e,!0),o.enter(e)):o.leave(e,()=>{Vr(e,!1)}):Vr(e,t))},beforeUnmount(e,{value:t}){Vr(e,t)}};function Vr(e,t){e.style.display=t?e[yi]:"none",e[Rl]=!t}function ev(){kp.getSSRProps=({value:e})=>{if(!e)return{style:{display:"none"}}}}var Vp=Symbol("");function tv(e){let t=qe();if(!t)return;let n=(s=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(i=>bi(i,s))},o={uid:String(t.uid),update:n};wo(()=>o.update=void 0),t.ut=(s,i)=>{s&&(s[Mo]=[i,o],Rp(s),Il(s)),n()};let r=()=>{let s=e(t.proxy);t.ce?bi(t.ce,s):kl(t.subTree,s),n(s)};cl(()=>{zt(r)}),Dr(()=>{Ro(r,De,{flush:"post"});let s=new MutationObserver(r);s.observe(t.subTree.el.parentNode,{childList:!0}),fl(()=>s.disconnect())})}var Mo=Symbol("");function Il(e,t){let[n,o]=e[Mo],r;if(o.update)for(let s=e;s&&s!==n;s=s.nextSibling)s.nodeType===1&&(!t||(t===!0||t.has(s))&&(s.getAttribute("data-v-owner")||o.uid)===o.uid)&&(s.setAttribute("data-v-owner",o.uid),r=o.update);return r}function Rp(e){let t=e.parentNode;if(t){let n=t[Mo];n||(n=t[Mo]=new Set,new MutationObserver(nv).observe(t,{childList:!0})),n.add(e)}}function nv(e,t){let n=e[0].target,o=n[Mo],r=new Set;for(let{addedNodes:i}of e)i.forEach(a=>r.add(a));let s=new Set;o.forEach(i=>{i.parentNode!==n?(o.delete(i),Rp(i),s.add(Il(i,!0))):r.size&&s.add(Il(i,r))}),s.forEach(i=>i&&i()),o.size||(t.disconnect(),n[Mo]=void 0)}function kl(e,t){if(e.shapeFlag&128){let n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push(()=>{kl(n.activeBranch,t)})}for(;e.component;)e=e.component.subTree;if(e.shapeFlag&1&&e.el)bi(e.el,t);else if(e.type===Ve)e.children.forEach(n=>kl(n,t));else if(e.type===fn){let{el:n,anchor:o}=e;for(;n&&(bi(n,t),n!==o);)n=n.nextSibling}}function bi(e,t){if(e.nodeType===1){let n=e.style,o="";for(let r in t){let s=wa(t[r]);n.setProperty(`--${r}`,s),o+=`--${r}: ${s};`}n[Vp]=o}}var ov=/(?:^|;)\s*display\s*:/;function rv(e,t,n){let o=e.style,r=z(n),s=!1;if(n&&!r){if(t)if(z(t))for(let i of t.split(";")){let a=i.slice(0,i.indexOf(":")).trim();n[a]==null&&Rr(o,a,"")}else for(let i in t)n[i]==null&&Rr(o,i,"");for(let i in n){i==="display"&&(s=!0);let a=n[i];a!=null?iv(e,i,!z(t)&&t?t[i]:void 0,a)||Rr(o,i,a):Rr(o,i,"")}}else if(r){if(t!==n){let i=o[Vp];i&&(n+=";"+i),o.cssText=n,s=ov.test(n)}}else t&&e.removeAttribute("style");yi in e&&((!r||t!==n)&&(e[yi]=s?o.display:""),e[Rl]&&(o.display="none"))}var Ei=/\s*!important$/;function Rr(e,t,n){if(H(n))n.forEach(o=>Rr(e,t,o));else if(n==null&&(n=""),t.startsWith("--"))Ei.test(n)?e.setProperty(t,n.replace(Ei,""),"important"):e.setProperty(t,n);else{let o=sv(e,t);Ei.test(n)?e.setProperty(ze(o),n.replace(Ei,""),"important"):e[o]=n}}var pp=["Webkit","Moz","ms"],wl={};function sv(e,t){let n=wl[t];if(n)return n;let o=ce(t);if(o!=="filter"&&o in e)return wl[t]=o;o=St(o);for(let r=0;r<pp.length;r++){let s=pp[r]+o;if(s in e)return wl[t]=s}return t}function iv(e,t,n,o){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&z(o)&&n===o}var dp="http://www.w3.org/1999/xlink";function hp(e,t,n,o,r,s=Eu(t)){o&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(dp,t.slice(6,t.length)):e.setAttributeNS(dp,t,n):n==null||s&&!Ns(n)?e.removeAttribute(t):e.setAttribute(t,s?"":Ae(n)?String(n):n)}function mp(e,t,n,o,r){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?wp(n):n);return}let s=e.tagName;if(t==="value"&&s!=="PROGRESS"&&!s.includes("-")){let a=s==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let i=!1;if(n===""||n==null){let a=typeof e[t];a==="boolean"?n=Ns(n):n==null&&a==="string"?(n="",i=!0):a==="number"&&(n=0,i=!0)}try{e[t]=n}catch{}i&&e.removeAttribute(r||t)}function gn(e,t,n,o){e.addEventListener(t,n,o)}function av(e,t,n,o){e.removeEventListener(t,n,o)}var gp=Symbol("_vei");function lv(e,t,n,o,r=null){let s=e[gp]||(e[gp]={}),i=s[t];if(o&&i)i.value=o;else{let[a,l]=fv(t);if(o){let u=s[t]=hv(o,r);gn(e,a,u,l)}else i&&(av(e,a,i,l),s[t]=void 0)}}var cv=/(Once|Passive|Capture)$/,uv=/^on:?(?:Once|Passive|Capture)$/;function fv(e){let t,n;for(;(n=e.match(cv))&&!uv.test(e);)t||(t={}),e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===":"?e.slice(3):ze(e.slice(2)),t]}var Ol=0,pv=Promise.resolve(),dv=()=>Ol||(pv.then(()=>Ol=0),Ol=Date.now());function hv(e,t){let n=o=>{if(!o._vts)o._vts=Date.now();else if(o._vts<=n.attached)return;let r=n.value;if(H(r)){let s=o.stopImmediatePropagation;o.stopImmediatePropagation=()=>{s.call(o),o._stopped=!0};let i=r.slice(),a=[o];for(let l=0;l<i.length&&!o._stopped;l++){let u=i[l];u&&Et(u,t,5,a)}}else Et(r,t,5,[o])};return n.value=e,n.attached=dv(),n}var Ep=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Pp=(e,t,n,o,r,s)=>{let i=r==="svg";t==="class"?ZE(e,o,i):t==="style"?rv(e,n,o):Bt(t)?bo(t)||lv(e,t,n,o,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):mv(e,t,o,i))?(mp(e,t,o),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&hp(e,t,o,i,s,t!=="value")):e._isVueCE&&(gv(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!z(o)))?mp(e,ce(t),o,s,t):(t==="true-value"?e._trueValue=o:t==="false-value"&&(e._falseValue=o),hp(e,t,o,i))};function mv(e,t,n,o){if(o)return!!(t==="innerHTML"||t==="textContent"||t in e&&Ep(t)&&Z(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){let r=e.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Ep(t)&&z(n)?!1:t in e}function gv(e,t){let n=e._def.props;if(!n)return!1;let o=ce(t);return Array.isArray(n)?n.some(r=>ce(r)===o):Object.keys(n).some(r=>ce(r)===o)}var vp={};function Mp(e,t,n){let o=at(e,t);No(o)&&(o=q({},o,t));class r extends Ni{constructor(i){super(o,i,n)}}return r.def=o,r}var Ev=((e,t)=>Mp(e,t,Gp)),vv=typeof HTMLElement<"u"?HTMLElement:class{},Ni=class e extends vv{constructor(t,n={},o=Mr){super(),this._def=t,this._props=n,this._createApp=o,this._isVueCE=!0,this._instance=null,this._app=null,this._nonce=this._def.nonce,this._connected=!1,this._resolved=!1,this._patching=!1,this._dirty=!1,this._numberProps=null,this._styleChildren=new WeakSet,this._styleAnchors=new WeakMap,this._ob=null,this.shadowRoot&&o!==Mr?this._root=this.shadowRoot:t.shadowRoot!==!1?(this.attachShadow(q({},t.shadowRootOptions,{mode:"open"})),this._root=this.shadowRoot):this._root=this}connectedCallback(){if(!this.isConnected)return;!this.shadowRoot&&!this._resolved&&this._parseSlots(),this._connected=!0;let t=this;for(;t=t&&(t.assignedSlot||t.parentNode||t.host);)if(t instanceof e){this._parent=t;break}this._instance||(this._resolved?this._mount(this._def):t&&t._pendingResolve?this._pendingResolve=t._pendingResolve.then(()=>{if(this._pendingResolve=void 0,this.isConnected)return this._resolveDef()}):this._resolveDef())}_setParent(t=this._parent){t&&(this._instance.parent=t._instance,this._inheritParentContext(t))}_inheritParentContext(t=this._parent){t&&this._app&&Object.setPrototypeOf(this._app._context.provides,t._instance.provides)}disconnectedCallback(){this._connected=!1,Or(()=>{this._connected||(this._ob&&(this._ob.disconnect(),this._ob=null),this._app&&this._app.unmount(),this._instance&&(this._instance.ce=void 0),this._app=this._instance=null,this._teleportTargets&&(this._teleportTargets.clear(),this._teleportTargets=void 0))})}_processMutations(t){for(let n of t)this._setAttr(n.attributeName)}_resolveDef(){if(this._pendingResolve)return this._pendingResolve;for(let o=0;o<this.attributes.length;o++)this._setAttr(this.attributes[o].name);this._ob=new MutationObserver(this._processMutations.bind(this)),this._ob.observe(this,{attributes:!0});let t=(o,r=!1)=>{this._resolved=!0,this._pendingResolve=void 0;let{props:s,styles:i}=o,a;if(s&&!H(s))for(let l in s){let u=s[l];(u===Number||u&&u.type===Number)&&(l in this._props&&(this._props[l]=So(this._props[l])),(a||(a=Object.create(null)))[ce(l)]=!0)}this._numberProps=a,this._resolveProps(o),this.shadowRoot&&this._applyStyles(i),this._connected&&this._mount(o)},n=this._def.__asyncLoader;if(n)return this._pendingResolve=n().then(o=>{o.configureApp=this._def.configureApp,t(this._def=o,!0)}),this._pendingResolve;t(this._def)}_mount(t){this._app=this._createApp(t),this._inheritParentContext(),t.configureApp&&t.configureApp(this._app),this._app._ceVNode=this._createVNode(),this._app.mount(this._root);let n=this._instance&&this._instance.exposed;if(n)for(let o in n)le(this,o)||Object.defineProperty(this,o,{get:()=>qn(n[o])})}_resolveProps(t){let{props:n}=t,o=H(n)?n:Object.keys(n||{});for(let r of Object.keys(this))r[0]!=="_"&&o.includes(r)&&this._setProp(r,this[r]);for(let r of o.map(ce))Object.defineProperty(this,r,{get(){return this._getProp(r)},set(s){this._setProp(r,s,!0,!this._patching)}})}_setAttr(t){if(t.startsWith("data-v-"))return;let n=this.hasAttribute(t),o=n?this.getAttribute(t):vp,r=ce(t);n&&this._numberProps&&this._numberProps[r]&&(o=So(o)),this._setProp(r,o,!1,!0)}_getProp(t){return this._props[t]}_setProp(t,n,o=!0,r=!1){if(n!==this._props[t]&&(this._dirty=!0,n===vp?delete this._props[t]:(this._props[t]=n,t==="key"&&this._app&&(this._app._ceVNode.key=n)),r&&this._instance&&this._update(),o)){let s=this._ob;s&&(this._processMutations(s.takeRecords()),s.disconnect()),n===!0?this.setAttribute(ze(t),""):typeof n=="string"||typeof n=="number"?this.setAttribute(ze(t),n+""):n||this.removeAttribute(ze(t)),s&&s.observe(this,{attributes:!0})}}_update(){let t=this._createVNode();this._app&&(t.appContext=this._app._context),zp(t,this._root)}_createVNode(){let t={};this.shadowRoot||(t.onVnodeMounted=t.onVnodeUpdated=this._renderSlots.bind(this));let n=ye(this._def,q(t,this._props));return this._instance||(n.ce=o=>{this._instance=o,o.ce=this,o.isCE=!0;let r=(s,i)=>{this.dispatchEvent(new CustomEvent(s,No(i[0])?q({detail:i},i[0]):{detail:i}))};o.emit=(s,...i)=>{r(s,i),ze(s)!==s&&r(ze(s),i)},this._setParent()}),n}_applyStyles(t,n,o){if(!t)return;if(n){if(n===this._def||this._styleChildren.has(n))return;this._styleChildren.add(n)}let r=this._nonce,s=this.shadowRoot,i=o?this._getStyleAnchor(o)||this._getStyleAnchor(this._def):this._getRootStyleInsertionAnchor(s),a=null;for(let l=t.length-1;l>=0;l--){let u=document.createElement("style");r&&u.setAttribute("nonce",r),u.textContent=t[l],s.insertBefore(u,a||i),a=u,l===0&&(o||this._styleAnchors.set(this._def,u),n&&this._styleAnchors.set(n,u))}}_getStyleAnchor(t){if(!t)return null;let n=this._styleAnchors.get(t);return n&&n.parentNode===this.shadowRoot?n:(n&&this._styleAnchors.delete(t),null)}_getRootStyleInsertionAnchor(t){for(let n=0;n<t.childNodes.length;n++){let o=t.childNodes[n];if(!(o instanceof HTMLStyleElement))return o}return null}_parseSlots(){let t=this._slots={},n;for(;n=this.firstChild;){let o=n.nodeType===1&&n.getAttribute("slot")||"default";(t[o]||(t[o]=[])).push(n),this.removeChild(n)}}_renderSlots(){let t=this._getSlots(),n=this._instance.type.__scopeId;for(let o=0;o<t.length;o++){let r=t[o],s=r.getAttribute("name")||"default",i=this._slots[s],a=r.parentNode;if(i)for(let l of i){if(n&&l.nodeType===1){let u=n+"-s",f=document.createTreeWalker(l,1);l.setAttribute(u,"");let c;for(;c=f.nextNode();)c.setAttribute(u,"")}a.insertBefore(l,r)}else for(;r.firstChild;)a.insertBefore(r.firstChild,r);a.removeChild(r)}}_getSlots(){let t=[this];this._teleportTargets&&t.push(...this._teleportTargets);let n=new Set;for(let o of t){let r=o.querySelectorAll("slot");for(let s=0;s<r.length;s++)n.add(r[s])}return Array.from(n)}_injectChildStyle(t,n){this._applyStyles(t.styles,t,n)}_beginPatch(){this._patching=!0,this._dirty=!1}_endPatch(){this._patching=!1,this._dirty&&this._instance&&this._update()}_hasShadowRoot(){return this._def.shadowRoot!==!1}_removeChildStyle(t){}};function Lp(e){let t=qe(),n=t&&t.ce;return n||null}function _v(){let e=Lp();return e&&e.shadowRoot}function yv(e="$style"){{let t=qe();if(!t)return ee;let n=t.type.__cssModules;if(!n)return ee;let o=n[e];return o||ee}}var $p=new WeakMap,Fp=new WeakMap,Si=Symbol("_moveCb"),_p=Symbol("_enterCb"),Vl=new WeakMap,bv=e=>(delete e.props.mode,e),Nv=bv({name:"TransitionGroup",props:q({},Ap,{tag:String,moveClass:String}),setup(e,{slots:t}){let n=qe(),o=ci(),r,s,i,a,l=()=>(a===void 0&&(a=r.length>0&&Dv(r[0].el,n.vnode.el,yp(e))),a);return fi(()=>{if(Vl.delete(n),!l()){r=[],i=void 0;return}let u=yp(e);r.forEach(xv);let f=i&&Av(i,n.vnode.el);i=void 0,r.forEach(p=>Tv(p,f));let c=r.filter(wv);Dl(n.vnode.el),c.forEach(p=>{let d=p.el,v=d.style;qt(d,u),v.transform=v.webkitTransform=v.transitionDuration="";let m=d[Si]=N=>{N&&N.target!==d||(!N||N.propertyName.endsWith("transform"))&&(d.removeEventListener("transitionend",m),d[Si]=null,kn(d,u))};d.addEventListener("transitionend",m)}),r=[]}),()=>{let u=Q(e),f=Dp(u),c=u.tag||Ve;if(r=[],a=void 0,s)for(let p=0;p<s.length;p++){let d=s[p];d.el&&d.el instanceof Element&&!d.el[Rl]&&(r.push(d),Ct(d,eo(d,f,o,n)),$p.set(d,Ti(d.el)))}s=t.default?Cr(t.default()):[];for(let p=0;p<s.length;p++){let d=s[p];d.key!=null&&Ct(d,eo(d,f,o,n))}return r.length&&(i=Ov(n),Vl.set(n,l)),ye(c,null,s)}}}),Sv=Nv;function xv(e){let t=e.el;t[Si]&&t[Si](),t[_p]&&t[_p]()}function yp(e){return e.moveClass||`${e.name||"v"}-move`}function Tv(e,t){Fp.set(e,Ti(e.el,t))}function wv(e){let t=$p.get(e),n=Fp.get(e),o=t.left-n.left,r=t.top-n.top;if(o||r){let s=e.el,i=s.style,a=s.getBoundingClientRect(),l=1,u=1;return s.offsetWidth&&(l=a.width/s.offsetWidth),s.offsetHeight&&(u=a.height/s.offsetHeight),(!Number.isFinite(l)||l===0)&&(l=1),(!Number.isFinite(u)||u===0)&&(u=1),Math.abs(l-1)<.01&&(l=1),Math.abs(u-1)<.01&&(u=1),i.transform=i.webkitTransform=`translate(${o/l}px,${r/u}px)`,i.transitionDuration="0s",e}}function Ti(e,t){let n=e.getBoundingClientRect();return{left:n.left-(t?t.left:0),top:n.top-(t?t.top:0)}}function Ov(e){let t;for(let n=e.parent;n;n=n.parent){let o=Vl.get(n);if(o){let r=Cv(n.vnode.el,e.vnode.el);r&&(t||(t=[])).push(q(Ti(r),{item:r,willMove:o}))}}return t}function Cv(e,t){let n=e.nodeType===1?e:e.parentNode;for(;t&&t.parentNode!==n;)t=t.parentNode;if(t&&t.nodeType===1)return t}function Av(e,t){let n=e.find(o=>o.willMove()&&o.item.contains(t));return n&&Ti(n.item,n)}function Dv(e,t,n){let o=e.cloneNode(),r=e[Po];r&&r.forEach(a=>{a.split(/\s+/).forEach(l=>l&&o.classList.remove(l))}),n.split(/\s+/).forEach(a=>a&&o.classList.add(a)),o.style.display="none";let s=t.nodeType===1?t:t.parentNode;s.appendChild(o);let{hasTransform:i}=Ip(o);return s.removeChild(o),i}var Vn=e=>{let t=e.props["onUpdate:modelValue"]||!1;return H(t)?n=>Tn(t,n):t};function Iv(e){e.target.composing=!0}function bp(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}var vt=Symbol("_assign"),vi=Symbol("_initialValue");function Cl(e,t,n){return t&&(e=e.trim()),n&&(e=jn(e)),e}var xi={created(e,{modifiers:{lazy:t,trim:n,number:o}},r){e.parentNode&&(e.type==="text"?e[vi]=e.defaultValue.replace(/[\r\n]/g,""):e.type==="textarea"&&(e[vi]=e.defaultValue.replace(/\r\n?/g,`
`))),e[vt]=Vn(r);let s=o||r.props&&r.props.type==="number";gn(e,t?"change":"input",i=>{i.target.composing||e[vt](Cl(e.value,n,s))}),(n||s)&&gn(e,"change",()=>{e.value=Cl(e.value,n,s)}),t||(gn(e,"compositionstart",Iv),gn(e,"compositionend",bp),gn(e,"change",bp))},mounted(e,{value:t,modifiers:{trim:n,number:o}}){let r=t??"",s=e[vi];delete e[vi],s!==void 0&&(e.type==="text"||e.type==="textarea")&&e.value!==s?e[vt](Cl(e.value,n,o)):e.value=r},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:o,trim:r,number:s}},i){if(e[vt]=Vn(i),e.composing)return;let a=(s||e.type==="number")&&!/^0\d/.test(e.value)?jn(e.value):e.value,l=t??"";if(a===l)return;let u=e.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===e&&e.type!=="range"&&(o&&t===n||r&&e.value.trim()===l)||(e.value=l)}},Pl={deep:!0,created(e,t,n){e[vt]=Vn(n),gn(e,"change",()=>{let o=e._modelValue,r=Lo(e),s=e.checked,i=e[vt];if(H(o)){let a=ir(o,r),l=a!==-1;if(s&&!l)i(o.concat(r));else if(!s&&l){let u=[...o];u.splice(a,1),i(u)}}else if(Nt(o)){let a=new Set(o);s?a.add(r):a.delete(r),i(a)}else i(Bp(e,s))})},mounted:Np,beforeUpdate(e,t,n){e[vt]=Vn(n),Np(e,t,n)}};function Np(e,{value:t,oldValue:n},o){e._modelValue=t;let r;if(H(t))r=ir(t,o.props.value)>-1;else if(Nt(t))r=t.has(o.props.value);else{if(t===n)return;r=rt(t,Bp(e,!0))}e.checked!==r&&(e.checked=r)}var Ml={created(e,{value:t},n){e.checked=rt(t,n.props.value),e[vt]=Vn(n),gn(e,"change",()=>{e[vt](Lo(e))})},beforeUpdate(e,{value:t,oldValue:n},o){e[vt]=Vn(o),t!==n&&(e.checked=rt(t,o.props.value))}},Up={deep:!0,created(e,{value:t,modifiers:{number:n}},o){e._modelValue=t,gn(e,"change",()=>{let r=Array.prototype.filter.call(e.options,l=>l.selected).map(l=>n?jn(Lo(l)):Lo(l)),s=e.multiple,i=s?Nt(e._modelValue)?new Set(r):r:r[0],a=e._pendingValue=[s,s?H(i)?r.slice():r:i];try{e[vt](i)}finally{Or(()=>{e._pendingValue===a&&(e._pendingValue=void 0)})}}),e[vt]=Vn(o)},mounted(e,{value:t,modifiers:{number:n}}){Sp(e,t,n)},beforeUpdate(e,{value:t},n){e._modelValue=t,e[vt]=Vn(n)},updated(e,{value:t,modifiers:{number:n}}){let o=e._pendingValue;e._pendingValue=void 0,(!o||o[0]!==e.multiple||!kv(t,o[1],o[0]))&&Sp(e,t,n)}};function kv(e,t,n){if(!n)return rt(e,t);if(H(e))return rt(e,t);if(Nt(e)){if(e.size!==t.length)return!1;for(let o of t)if(!e.has(o))return!1;return!0}return!1}function Sp(e,t,n=!1){let o=e.multiple,r=H(t);if(!(o&&!r&&!Nt(t))){for(let s=0,i=e.options.length;s<i;s++){let a=e.options[s],l=Lo(a);if(o)if(r){let u=typeof l;u==="string"||u==="number"?a.selected=t.some(f=>String(f)===String(l)):a.selected=ir(t,l)>-1}else a.selected=t.has(l)||n&&typeof l=="string"&&t.has(jn(l));else if(rt(Lo(a),t)){e.selectedIndex!==s&&(e.selectedIndex=s);return}}!o&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function Lo(e){return"_value"in e?e._value:e.value}function Bp(e,t){let n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}var Hp={created(e,t,n){_i(e,t,n,null,"created")},mounted(e,t,n){_i(e,t,n,null,"mounted")},beforeUpdate(e,t,n,o){_i(e,t,n,o,"beforeUpdate")},updated(e,t,n,o){_i(e,t,n,o,"updated")}};function jp(e,t){switch(e){case"SELECT":return Up;case"TEXTAREA":return xi;default:switch(t){case"checkbox":return Pl;case"radio":return Ml;default:return xi}}}function _i(e,t,n,o,r){let i=jp(e.tagName,n.props&&n.props.type)[r];i&&i(e,t,n,o)}function Vv(){xi.getSSRProps=({value:e})=>({value:e}),Ml.getSSRProps=({value:e},t)=>{if(t.props&&rt(t.props.value,e))return{checked:!0}},Pl.getSSRProps=({value:e},t)=>{if(H(e)){if(t.props&&ir(e,t.props.value)>-1)return{checked:!0}}else if(Nt(e)){if(t.props&&e.has(t.props.value))return{checked:!0}}else if(e)return{checked:!0}},Hp.getSSRProps=(e,t)=>{if(typeof t.type!="string")return;let n=jp(t.type.toUpperCase(),t.props&&t.props.type);if(n.getSSRProps)return n.getSSRProps(e,t)}}var Rv=["ctrl","shift","alt","meta"],Pv={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Rv.some(n=>e[`${n}Key`]&&!t.includes(n))},Mv=(e,t)=>{if(!e)return e;let n=e._withMods||(e._withMods={}),o=t.join(".");return n[o]||(n[o]=((r,...s)=>{for(let i=0;i<t.length;i++){let a=Pv[t[i]];if(a&&a(r,t))return}return e(r,...s)}))},Lv={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},$v=(e,t)=>{let n=e._withKeys||(e._withKeys={}),o=t.join(".");return n[o]||(n[o]=(r=>{if(!("key"in r))return;let s=ze(r.key);if(t.some(i=>i===s||Lv[i]===s))return e(r)}))},Wp=q({patchProp:Pp},Op),Pr,xp=!1;function Kp(){return Pr||(Pr=vl(Wp))}function Xp(){return Pr=xp?Pr:_l(Wp),xp=!0,Pr}var zp=((...e)=>{Kp().render(...e)}),Fv=((...e)=>{Xp().hydrate(...e)}),Mr=((...e)=>{let t=Kp().createApp(...e),{mount:n}=t;return t.mount=o=>{let r=Jp(o);if(!r)return;let s=t._component;!Z(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");let i=n(r,!1,qp(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),i},t}),Gp=((...e)=>{let t=Xp().createApp(...e),{mount:n}=t;return t.mount=o=>{let r=Jp(o);if(r)return n(r,!0,qp(r))},t});function qp(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Jp(e){return z(e)?document.querySelector(e):e}var Tp=!1,Uv=()=>{Tp||(Tp=!0,Vv(),ev())};var Fr=Symbol(""),$r=Symbol(""),ql=Symbol(""),ki=Symbol(""),hd=Symbol(""),uo=Symbol(""),md=Symbol(""),gd=Symbol(""),Jl=Symbol(""),Yl=Symbol(""),Wr=Symbol(""),Ql=Symbol(""),Ed=Symbol(""),Zl=Symbol(""),ec=Symbol(""),tc=Symbol(""),nc=Symbol(""),oc=Symbol(""),rc=Symbol(""),vd=Symbol(""),_d=Symbol(""),Kr=Symbol(""),Vi=Symbol(""),sc=Symbol(""),ic=Symbol(""),Ur=Symbol(""),Xr=Symbol(""),ac=Symbol(""),Ul=Symbol(""),Bv=Symbol(""),Bl=Symbol(""),Ri=Symbol(""),Hv=Symbol(""),jv=Symbol(""),lc=Symbol(""),Wv=Symbol(""),Kv=Symbol(""),cc=Symbol(""),yd=Symbol(""),$o={[Fr]:"Fragment",[$r]:"Teleport",[ql]:"Suspense",[ki]:"KeepAlive",[hd]:"BaseTransition",[uo]:"openBlock",[md]:"createBlock",[gd]:"createElementBlock",[Jl]:"createVNode",[Yl]:"createElementVNode",[Wr]:"createCommentVNode",[Ql]:"createTextVNode",[Ed]:"createStaticVNode",[Zl]:"resolveComponent",[ec]:"resolveDynamicComponent",[tc]:"resolveDirective",[nc]:"resolveFilter",[oc]:"withDirectives",[rc]:"renderList",[vd]:"renderSlot",[_d]:"createSlots",[Kr]:"toDisplayString",[Vi]:"mergeProps",[sc]:"normalizeClass",[ic]:"normalizeStyle",[Ur]:"normalizeProps",[Xr]:"guardReactiveProps",[ac]:"toHandlers",[Ul]:"camelize",[Bv]:"capitalize",[Bl]:"toHandlerKey",[Ri]:"setBlockTracking",[Hv]:"pushScopeId",[jv]:"popScopeId",[lc]:"withCtx",[Wv]:"unref",[Kv]:"isRef",[cc]:"withMemo",[yd]:"isMemoSame"};function bd(e){Object.getOwnPropertySymbols(e).forEach(t=>{$o[t]=e[t]})}var yt={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function Xv(e,t=""){return{type:0,source:t,children:e,helpers:new Set,components:[],directives:[],hoists:[],imports:[],cached:[],temps:0,codegenNode:void 0,loc:yt}}function Br(e,t,n,o,r,s,i,a=!1,l=!1,u=!1,f=yt){return e&&(a?(e.helper(uo),e.helper(Bo(e.inSSR,u))):e.helper(Uo(e.inSSR,u)),i&&e.helper(oc)),{type:13,tag:t,props:n,children:o,patchFlag:r,dynamicProps:s,directives:i,isBlock:a,disableTracking:l,isComponent:u,loc:f}}function lo(e,t=yt){return{type:17,loc:t,elements:e}}function At(e,t=yt){return{type:15,loc:t,properties:e}}function Oe(e,t){return{type:16,loc:yt,key:z(e)?Y(e,!0):e,value:t}}function Y(e,t=!1,n=yt,o=0){return{type:4,loc:n,content:e,isStatic:t,constType:t?3:o}}function Dt(e,t=yt){return{type:8,loc:t,children:e}}function Pe(e,t=[],n=yt){return{type:14,loc:n,callee:e,arguments:t}}function Fo(e,t=void 0,n=!1,o=!1,r=yt){return{type:18,params:e,returns:t,newline:n,isSlot:o,loc:r}}function Hl(e,t,n,o=!0){return{type:19,test:e,consequent:t,alternate:n,newline:o,loc:yt}}function zv(e,t,n=!1,o=!1){return{type:20,index:e,value:t,needPauseTracking:n,inVOnce:o,needArraySpread:!1,loc:yt}}function Gv(e){return{type:21,body:e,loc:yt}}function Uo(e,t){return e||t?Jl:Yl}function Bo(e,t){return e||t?md:gd}function uc(e,{helper:t,removeHelper:n,inSSR:o}){e.isBlock||(e.isBlock=!0,n(Uo(o,e.isComponent)),t(uo),t(Bo(o,e.isComponent)))}var Yp=new Uint8Array([123,123]),Qp=new Uint8Array([125,125]);function Zp(e){return e>=97&&e<=122||e>=65&&e<=90}function _t(e){return e===32||e===10||e===9||e===12||e===13}function Rn(e){return e===47||e===62||_t(e)}function Pi(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}var Je={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])},jl=class{constructor(t,n){this.stack=t,this.cbs=n,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=Yp,this.delimiterClose=Qp,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0}get inSFCRoot(){return this.mode===2&&this.stack.length===0}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=Yp,this.delimiterClose=Qp}getPos(t){let n=1,o=t+1,r=this.newlines.length,s=-1;if(r>100){let i=-1,a=r;for(;i+1<a;){let l=i+a>>>1;this.newlines[l]<t?i=l:a=l}s=i}else for(let i=r-1;i>=0;i--)if(t>this.newlines[i]){s=i;break}return s>=0&&(n=s+2,o=t-this.newlines[s]),{column:o,line:n,offset:t}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(t){t===60?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t))}stateInterpolationOpen(t){if(t===this.delimiterOpen[this.delimiterIndex])if(this.delimiterIndex===this.delimiterOpen.length-1){let n=this.index+1-this.delimiterOpen.length;n>this.sectionStart&&this.cbs.ontext(this.sectionStart,n),this.state=3,this.sectionStart=n}else this.delimiterIndex++;else this.inRCDATA?(this.state=32,this.stateInRCDATA(t)):(this.state=1,this.stateText(t))}stateInterpolation(t){t===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(t))}stateInterpolationClose(t){t===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(t))}stateSpecialStartSequence(t){let n=this.sequenceIndex===this.currentSequence.length;if(!(n?Rn(t):(t|32)===this.currentSequence[this.sequenceIndex]))this.inRCDATA=!1;else if(!n){this.sequenceIndex++;return}this.sequenceIndex=0,this.state=6,this.stateInTagName(t)}stateInRCDATA(t){if(this.sequenceIndex===this.currentSequence.length){if(t===62||_t(t)){let n=this.index-this.currentSequence.length;if(this.sectionStart<n){let o=this.index;this.index=n,this.cbs.ontext(this.sectionStart,n),this.index=o}this.sectionStart=n+2,this.stateInClosingTagName(t),this.inRCDATA=!1;return}this.sequenceIndex=0}(t|32)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:this.sequenceIndex===0?this.currentSequence===Je.TitleEnd||this.currentSequence===Je.TextareaEnd&&!this.inSFCRoot?!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t)):this.fastForwardTo(60)&&(this.sequenceIndex=1):this.sequenceIndex=+(t===60)}stateCDATASequence(t){t===Je.Cdata[this.sequenceIndex]?++this.sequenceIndex===Je.Cdata.length&&(this.state=28,this.currentSequence=Je.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(t))}fastForwardTo(t){for(;++this.index<this.buffer.length;){let n=this.buffer.charCodeAt(this.index);if(n===10&&this.newlines.push(this.index),n===t)return!0}return this.index=this.buffer.length-1,!1}stateInCommentLike(t){t===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===Je.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):this.sequenceIndex===0?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):t!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0)}startSpecial(t,n){this.enterRCDATA(t,n),this.state=31}enterRCDATA(t,n){this.inRCDATA=!0,this.currentSequence=t,this.sequenceIndex=n}stateBeforeTagName(t){t===33?(this.state=22,this.sectionStart=this.index+1):t===63?(this.state=24,this.sectionStart=this.index+1):Zp(t)?(this.sectionStart=this.index,this.mode===0?this.state=6:this.inSFCRoot?this.state=34:this.inXML?this.state=6:t===116?this.state=30:this.state=t===115?29:6):t===47?this.state=8:(this.state=1,this.stateText(t))}stateInTagName(t){Rn(t)&&this.handleTagName(t)}stateInSFCRootTagName(t){if(Rn(t)){let n=this.buffer.slice(this.sectionStart,this.index);n!=="template"&&this.enterRCDATA(Pi("</"+n),0),this.handleTagName(t)}}handleTagName(t){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)}stateBeforeClosingTagName(t){_t(t)||(t===62?(this.state=1,this.sectionStart=this.index+1):(this.state=Zp(t)?9:27,this.sectionStart=this.index))}stateInClosingTagName(t){(t===62||_t(t))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(t))}stateAfterClosingTagName(t){t===62&&(this.state=1,this.sectionStart=this.index+1)}stateBeforeAttrName(t){t===62?(this.cbs.onopentagend(this.index),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):t===47?this.state=7:t===60&&this.peek()===47?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):_t(t)||this.handleAttrStart(t)}handleAttrStart(t){t===118&&this.peek()===45?(this.state=13,this.sectionStart=this.index):t===46||t===58||t===64||t===35?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index)}stateInSelfClosingTag(t){t===62?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):_t(t)||(this.state=11,this.stateBeforeAttrName(t))}stateInAttrName(t){(t===61||Rn(t))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(t))}stateInDirName(t){t===61||Rn(t)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===58?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):t===46&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDirArg(t){t===61||Rn(t)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===91?this.state=15:t===46&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDynamicDirArg(t){t===93?this.state=14:(t===61||Rn(t))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(t))}stateInDirModifier(t){t===61||Rn(t)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===46&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1)}handleAttrNameEnd(t){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(t)}stateAfterAttrName(t){t===61?this.state=18:t===47||t===62?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)):_t(t)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(t))}stateBeforeAttrValue(t){t===34?(this.state=19,this.sectionStart=this.index+1):t===39?(this.state=20,this.sectionStart=this.index+1):_t(t)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(t))}handleInAttrValue(t,n){(t===n||this.fastForwardTo(n))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(n===34?3:2,this.index+1),this.state=11)}stateInAttrValueDoubleQuotes(t){this.handleInAttrValue(t,34)}stateInAttrValueSingleQuotes(t){this.handleInAttrValue(t,39)}stateInAttrValueNoQuotes(t){_t(t)||t===62?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(t)):(t===39||t===60||t===61||t===96)&&this.cbs.onerr(18,this.index)}stateBeforeDeclaration(t){t===91?(this.state=26,this.sequenceIndex=0):this.state=t===45?25:23}stateInDeclaration(t){(t===62||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1)}stateInProcessingInstruction(t){(t===62||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeComment(t){t===45?(this.state=28,this.currentSequence=Je.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23}stateInSpecialComment(t){(t===62||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeSpecialS(t){t===Je.ScriptEnd[3]?this.startSpecial(Je.ScriptEnd,4):t===Je.StyleEnd[3]?this.startSpecial(Je.StyleEnd,4):(this.state=6,this.stateInTagName(t))}stateBeforeSpecialT(t){t===Je.TitleEnd[3]?this.startSpecial(Je.TitleEnd,4):t===Je.TextareaEnd[3]?this.startSpecial(Je.TextareaEnd,4):(this.state=6,this.stateInTagName(t))}startEntity(){}stateInEntity(){}parse(t){for(this.buffer=t;this.index<this.buffer.length;){let n=this.buffer.charCodeAt(this.index);switch(n===10&&this.state!==33&&this.newlines.push(this.index),this.state){case 1:{this.stateText(n);break}case 2:{this.stateInterpolationOpen(n);break}case 3:{this.stateInterpolation(n);break}case 4:{this.stateInterpolationClose(n);break}case 31:{this.stateSpecialStartSequence(n);break}case 32:{this.stateInRCDATA(n);break}case 26:{this.stateCDATASequence(n);break}case 19:{this.stateInAttrValueDoubleQuotes(n);break}case 12:{this.stateInAttrName(n);break}case 13:{this.stateInDirName(n);break}case 14:{this.stateInDirArg(n);break}case 15:{this.stateInDynamicDirArg(n);break}case 16:{this.stateInDirModifier(n);break}case 28:{this.stateInCommentLike(n);break}case 27:{this.stateInSpecialComment(n);break}case 11:{this.stateBeforeAttrName(n);break}case 6:{this.stateInTagName(n);break}case 34:{this.stateInSFCRootTagName(n);break}case 9:{this.stateInClosingTagName(n);break}case 5:{this.stateBeforeTagName(n);break}case 17:{this.stateAfterAttrName(n);break}case 20:{this.stateInAttrValueSingleQuotes(n);break}case 18:{this.stateBeforeAttrValue(n);break}case 8:{this.stateBeforeClosingTagName(n);break}case 10:{this.stateAfterClosingTagName(n);break}case 29:{this.stateBeforeSpecialS(n);break}case 30:{this.stateBeforeSpecialT(n);break}case 21:{this.stateInAttrValueNoQuotes(n);break}case 7:{this.stateInSelfClosingTag(n);break}case 23:{this.stateInDeclaration(n);break}case 22:{this.stateBeforeDeclaration(n);break}case 25:{this.stateBeforeComment(n);break}case 24:{this.stateInProcessingInstruction(n);break}case 33:{this.stateInEntity();break}}this.index++}this.cleanup(),this.finish()}cleanup(){this.sectionStart!==this.index&&(this.state===1||this.state===32&&this.sequenceIndex===0?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):(this.state===19||this.state===20||this.state===21)&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index))}finish(){this.handleTrailingData(),this.cbs.onend()}handleTrailingData(){let t=this.buffer.length;this.sectionStart>=t||(this.state===28?this.currentSequence===Je.CdataEnd?this.cbs.oncdata(this.sectionStart,t):this.cbs.oncomment(this.sectionStart,t):this.state===6||this.state===11||this.state===18||this.state===17||this.state===12||this.state===13||this.state===14||this.state===15||this.state===16||this.state===20||this.state===19||this.state===21||this.state===9||this.cbs.ontext(this.sectionStart,t))}emitCodePoint(t,n){}};function ed(e,{compatConfig:t}){let n=t&&t[e];return e==="MODE"?n||3:n}function co(e,t){let n=ed("MODE",t),o=ed(e,t);return n===3?o===!0:o!==!1}function Ho(e,t,n,...o){return co(e,t)}function fc(e){throw e}function Nd(e){}function _e(e,t,n,o){let r=`https://vuejs.org/error-reference/#compiler-${e}`,s=new SyntaxError(String(r));return s.code=e,s.loc=t,s}var Qe=e=>e.type===4&&e.isStatic;function Sd(e){switch(e){case"Teleport":case"teleport":return $r;case"Suspense":case"suspense":return ql;case"KeepAlive":case"keep-alive":return ki;case"BaseTransition":case"base-transition":return hd}}var qv=/^$|^\d|[^\$\w\xA0-\uFFFF]/,pc=e=>!qv.test(e),xd=/[A-Za-z_$\xA0-\uFFFF]/,Jv=/[\.\?\w$\xA0-\uFFFF]/,Yv=/\s+[.[]\s*|\s*[.[]\s+/g,Td=e=>e.type===4?e.content:e.loc.source,Qv=e=>{let t=Td(e).trim().replace(Yv,a=>a.trim()),n=0,o=[],r=0,s=0,i=null;for(let a=0;a<t.length;a++){let l=t.charAt(a);switch(n){case 0:if(l==="[")o.push(n),n=1,r++;else if(l==="(")o.push(n),n=2,s++;else if(!(a===0?xd:Jv).test(l))return!1;break;case 1:l==="'"||l==='"'||l==="`"?(o.push(n),n=3,i=l):l==="["?r++:l==="]"&&(--r||(n=o.pop()));break;case 2:if(l==="'"||l==='"'||l==="`")o.push(n),n=3,i=l;else if(l==="(")s++;else if(l===")"){if(a===t.length-1)return!1;--s||(n=o.pop())}break;case 3:l===i&&(n=o.pop(),i=null);break}}return!r&&!s};var wd=Qv,Zv=/^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/,e_=e=>Zv.test(Td(e));var t_=e_;function ct(e,t,n=!1){for(let o=0;o<e.props.length;o++){let r=e.props[o];if(r.type===7&&(n||r.exp)&&(z(t)?r.name===t:t.test(r.name)))return r}}function zr(e,t,n=!1,o=!1){for(let r=0;r<e.props.length;r++){let s=e.props[r];if(s.type===6){if(n)continue;if(s.name===t&&(s.value||o))return s}else if(s.name==="bind"&&(s.exp||o)&&Mn(s.arg,t))return s}}function Mn(e,t){return!!(e&&Qe(e)&&e.content===t)}function Od(e){return e.props.some(t=>t.type===7&&t.name==="bind"&&(!t.arg||t.arg.type!==4||!t.arg.isStatic))}function $l(e){return e.type===5||e.type===2}function td(e){return e.type===7&&e.name==="pre"}function n_(e){return e.type===7&&e.name==="slot"}function Mi(e){return e.type===1&&e.tagType===3}function Li(e){return e.type===1&&e.tagType===2}var o_=new Set([Ur,Xr]);function dc(e,t=[]){if(e&&!z(e)&&e.type===14){let n=e.callee;if(!z(n)&&o_.has(n))return dc(e.arguments[0],t.concat(e))}return[e,t]}function $i(e,t,n){if(e.type!==13&&r_(e,t))return;let o,r=e.type===13?e.props:e.arguments[2],s=[],i;if(r&&!z(r)&&r.type===14){let a=dc(r);r=a[0],s=a[1],i=s[s.length-1]}if(r==null||z(r))o=At([t]);else if(r.type===14){let a=r.arguments[0];!z(a)&&a.type===15?Wl(t,a)||a.properties.unshift(t):r.callee===ac?o=Pe(n.helper(Vi),[At([t]),r]):r.arguments.unshift(At([t])),!o&&(o=r)}else r.type===15?(Wl(t,r)||r.properties.unshift(t),o=r):(o=Pe(n.helper(Vi),[At([t]),r]),i&&i.callee===Xr&&(i=s[s.length-2]));e.type===13?i?i.arguments[0]=o:e.props=o:i?i.arguments[0]=o:e.arguments[2]=o}function r_(e,t){var n,o,r;if(t.key.type!==4||t.key.content!=="key")return!1;let s=e.arguments[2];if(s&&!z(s)){let[i]=dc(s);if(i&&!z(i)&&i.type===15&&Wl(t,i))return!0}return(n=e.arguments)[2]||(n[2]="{}"),(o=e.arguments)[3]||(o[3]="undefined"),(r=e.arguments)[4]||(r[4]="undefined"),e.arguments[5]=t.value,!0}function Wl(e,t){let n=!1;if(e.key.type===4){let o=e.key.content;n=t.properties.some(r=>r.key.type===4&&r.key.content===o)}return n}function Hr(e,t){return`_${t}_${e.replace(/[^\w]/g,(n,o)=>n==="-"?"_":e.charCodeAt(o).toString())}`}function s_(e){return e.type===14&&e.callee===cc?e.arguments[1].returns:e}var i_=/([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;function Cd(e){for(let t=0;t<e.length;t++)if(!_t(e.charCodeAt(t)))return!1;return!0}function hc(e){return e.type===2&&Cd(e.content)||e.type===12&&hc(e.content)}function Ui(e){return e.type===3||hc(e)}var Ad={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:xn,isPreTag:xn,isIgnoreNewlineTag:xn,isCustomElement:xn,onError:fc,onWarn:Nd,comments:!1,prefixIdentifiers:!1},fe=Ad,jr=null,_n="",Ye=null,ne=null,lt="",vn=-1,io=-1,mc=0,Pn=!1,Kl=null,be=[],Te=new jl(be,{onerr:En,ontext(e,t){wi(We(e,t),e,t)},ontextentity(e,t,n){wi(e,t,n)},oninterpolation(e,t){if(Pn)return wi(We(e,t),e,t);let n=e+Te.delimiterOpen.length,o=t-Te.delimiterClose.length;for(;_t(_n.charCodeAt(n));)n++;for(;_t(_n.charCodeAt(o-1));)o--;let r=We(n,o);r.includes("&")&&(r=fe.decodeEntities(r,!1)),Xl({type:5,content:Ai(r,!1,Re(n,o)),loc:Re(e,t)})},onopentagname(e,t){let n=We(e,t);Ye={type:1,tag:n,ns:fe.getNamespace(n,be[0],fe.ns),tagType:0,props:[],children:[],loc:Re(e-1,t),codegenNode:void 0}},onopentagend(e){od(e)},onclosetag(e,t){let n=We(e,t);if(!fe.isVoidTag(n)){let o=!1;for(let r=0;r<be.length;r++)if(be[r].tag.toLowerCase()===n.toLowerCase()){o=!0,r>0&&En(24,be[0].loc.start.offset);for(let i=0;i<=r;i++){let a=be.shift();Ci(a,t,i<r)}break}o||En(23,Dd(e,60))}},onselfclosingtag(e){let t=Ye.tag;Ye.isSelfClosing=!0,od(e),be[0]&&be[0].tag===t&&Ci(be.shift(),e)},onattribname(e,t){ne={type:6,name:We(e,t),nameLoc:Re(e,t),value:void 0,loc:Re(e)}},ondirname(e,t){let n=We(e,t),o=n==="."||n===":"?"bind":n==="@"?"on":n==="#"?"slot":n.slice(2);if(!Pn&&o===""&&En(26,e),Pn||o==="")ne={type:6,name:n,nameLoc:Re(e,t),value:void 0,loc:Re(e)};else if(ne={type:7,name:o,rawName:n,exp:void 0,arg:void 0,modifiers:n==="."?[Y("prop")]:[],loc:Re(e)},o==="pre"){Pn=Te.inVPre=!0,Kl=Ye;let r=Ye.props;for(let s=0;s<r.length;s++)r[s].type===7&&(r[s]=g_(r[s]))}},ondirarg(e,t){if(e===t)return;let n=We(e,t);if(Pn&&!td(ne))ne.name+=n,ao(ne.nameLoc,t);else{let o=n[0]!=="[";ne.arg=Ai(o?n:n.slice(1,-1),o,Re(e,t),o?3:0)}},ondirmodifier(e,t){let n=We(e,t);if(Pn&&!td(ne))ne.name+="."+n,ao(ne.nameLoc,t);else if(ne.name==="slot"){let o=ne.arg;o&&(o.content+="."+n,ao(o.loc,t))}else{let o=Y(n,!0,Re(e,t));ne.modifiers.push(o)}},onattribdata(e,t){lt+=We(e,t),vn<0&&(vn=e),io=t},onattribentity(e,t,n){lt+=e,vn<0&&(vn=t),io=n},onattribnameend(e){let t=ne.loc.start.offset,n=We(t,e);ne.type===7&&(ne.rawName=n),Ye.props.some(o=>(o.type===7?o.rawName:o.name)===n)&&En(2,t)},onattribend(e,t){if(Ye&&ne){if(ao(ne.loc,t),e!==0)if(lt.includes("&")&&(lt=fe.decodeEntities(lt,!0)),ne.type===6)ne.name==="class"&&(lt=kd(lt).trim()),e===1&&!lt&&En(13,t),ne.value={type:2,content:lt,loc:e===1?Re(vn,io):Re(vn-1,io+1)},Te.inSFCRoot&&Ye.tag==="template"&&ne.name==="lang"&&lt&&lt!=="html"&&Te.enterRCDATA(Pi("</template"),0);else{let n=0;ne.exp=Ai(lt,!1,Re(vn,io),0,n),ne.name==="for"&&(ne.forParseResult=l_(ne.exp));let o=-1;ne.name==="bind"&&(o=ne.modifiers.findIndex(r=>r.content==="sync"))>-1&&Ho("COMPILER_V_BIND_SYNC",fe,ne.loc,ne.arg.loc.source)&&(ne.name="model",ne.modifiers.splice(o,1))}(ne.type!==7||ne.name!=="pre")&&Ye.props.push(ne)}lt="",vn=io=-1},oncomment(e,t){fe.comments&&Xl({type:3,content:We(e,t),loc:Re(e-4,t+3)})},onend(){let e=_n.length;for(let t=0;t<be.length;t++)Ci(be[t],e-1),En(24,be[t].loc.start.offset)},oncdata(e,t){(be[0]?be[0].ns:fe.ns)!==0?wi(We(e,t),e,t):En(1,e-9)},onprocessinginstruction(e){(be[0]?be[0].ns:fe.ns)===0&&En(21,e-1)}}),nd=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,a_=/^\(|\)$/g;function l_(e){let t=e.loc,n=e.content,o=n.match(i_);if(!o)return;let[,r,s]=o,i=(c,p,d=!1)=>{let v=t.start.offset+p,m=v+c.length;return Ai(c,!1,Re(v,m),0,d?1:0)},a={source:i(s.trim(),n.indexOf(s,r.length)),value:void 0,key:void 0,index:void 0,finalized:!1},l=r.trim().replace(a_,"").trim(),u=r.indexOf(l),f=l.match(nd);if(f){l=l.replace(nd,"").trim();let c=f[1].trim(),p;if(c&&(p=n.indexOf(c,u+l.length),a.key=i(c,p,!0)),f[2]){let d=f[2].trim();d&&(a.index=i(d,n.indexOf(d,a.key?p+c.length:u+l.length),!0))}}return l&&(a.value=i(l,u,!0)),a}function We(e,t){return _n.slice(e,t)}function od(e){Te.inSFCRoot&&(Ye.innerLoc=Re(e+1,e+1)),Xl(Ye);let{tag:t,ns:n}=Ye;n===0&&fe.isPreTag(t)&&mc++,fe.isVoidTag(t)?Ci(Ye,e):(be.unshift(Ye),(n===1||n===2)&&(Te.inXML=!0)),Ye=null}function wi(e,t,n){{let s=be[0]&&be[0].tag;s!=="script"&&s!=="style"&&e.includes("&")&&(e=fe.decodeEntities(e,!1))}let o=be[0]||jr,r=o.children[o.children.length-1];r&&r.type===2?(r.content+=e,ao(r.loc,n)):o.children.push({type:2,content:e,loc:Re(t,n)})}function Ci(e,t,n=!1){n?ao(e.loc,Dd(t,60)):ao(e.loc,c_(t,62)+1),Te.inSFCRoot&&(e.children.length?e.innerLoc.end=q({},e.children[e.children.length-1].loc.end):e.innerLoc.end=q({},e.innerLoc.start),e.innerLoc.source=We(e.innerLoc.start.offset,e.innerLoc.end.offset));let{tag:o,ns:r,children:s}=e;if(Pn||(o==="slot"?e.tagType=2:rd(e)?e.tagType=3:f_(e)&&(e.tagType=1)),Te.inRCDATA||(e.children=Id(s)),r===0&&fe.isIgnoreNewlineTag(o)){let i=s[0];i&&i.type===2&&(i.content=i.content.replace(/^\r?\n/,""))}r===0&&fe.isPreTag(o)&&mc--,Kl===e&&(Pn=Te.inVPre=!1,Kl=null),Te.inXML&&(be[0]?be[0].ns:fe.ns)===0&&(Te.inXML=!1);{let i=e.props;if(!Te.inSFCRoot&&co("COMPILER_NATIVE_TEMPLATE",fe)&&e.tag==="template"&&!rd(e)){let l=be[0]||jr,u=l.children.indexOf(e);l.children.splice(u,1,...e.children)}let a=i.find(l=>l.type===6&&l.name==="inline-template");a&&Ho("COMPILER_INLINE_TEMPLATE",fe,a.loc)&&e.children.length&&(a.value={type:2,content:We(e.children[0].loc.start.offset,e.children[e.children.length-1].loc.end.offset),loc:a.loc})}}function c_(e,t){let n=e;for(;_n.charCodeAt(n)!==t&&n<_n.length-1;)n++;return n}function Dd(e,t){let n=e;for(;_n.charCodeAt(n)!==t&&n>=0;)n--;return n}var u_=new Set(["if","else","else-if","for","slot"]);function rd({tag:e,props:t}){if(e==="template"){for(let n=0;n<t.length;n++)if(t[n].type===7&&u_.has(t[n].name))return!0}return!1}function f_({tag:e,props:t}){if(fe.isCustomElement(e))return!1;if(e==="component"||p_(e.charCodeAt(0))||Sd(e)||fe.isBuiltInComponent&&fe.isBuiltInComponent(e)||fe.isNativeTag&&!fe.isNativeTag(e))return!0;for(let n=0;n<t.length;n++){let o=t[n];if(o.type===6){if(o.name==="is"&&o.value){if(o.value.content.startsWith("vue:"))return!0;if(Ho("COMPILER_IS_ON_ELEMENT",fe,o.loc))return!0}}else if(o.name==="bind"&&Mn(o.arg,"is")&&Ho("COMPILER_IS_ON_ELEMENT",fe,o.loc))return!0}return!1}function p_(e){return e>64&&e<91}var d_=/\r\n/g;function Id(e){let t=fe.whitespace!=="preserve",n=!1;for(let o=0;o<e.length;o++){let r=e[o];if(r.type===2)if(mc)r.content=r.content.replace(d_,`
`);else if(Cd(r.content)){let s=e[o-1]&&e[o-1].type,i=e[o+1]&&e[o+1].type;!s||!i||t&&(s===3&&(i===3||i===1)||s===1&&(i===3||i===1&&h_(r.content)))?(n=!0,e[o]=null):r.content=" "}else t&&(r.content=kd(r.content))}return n?e.filter(Boolean):e}function h_(e){for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(n===10||n===13)return!0}return!1}function kd(e){let t="",n=!1;for(let o=0;o<e.length;o++)_t(e.charCodeAt(o))?n||(t+=" ",n=!0):(t+=e[o],n=!1);return t}function Xl(e){(be[0]||jr).children.push(e)}function Re(e,t){return{start:Te.getPos(e),end:t==null?t:Te.getPos(t),source:t==null?t:We(e,t)}}function m_(e){return{start:q({},e.start),end:q({},e.end),source:e.source}}function ao(e,t){e.end=Te.getPos(t),e.source=We(e.start.offset,t)}function g_(e){let t={type:6,name:e.rawName,nameLoc:Re(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){let n=e.exp.loc;n.end.offset<e.loc.end.offset&&(n.start.offset--,n.start.column--,n.end.offset++,n.end.column++),t.value={type:2,content:e.exp.content,loc:n}}return t}function Ai(e,t=!1,n,o=0,r=0){return Y(e,t,n,o)}function En(e,t,n){fe.onError(_e(e,Re(t,t),void 0,n))}function E_(){Te.reset(),Ye=null,ne=null,lt="",vn=-1,io=-1,be.length=0}function Vd(e,t){if(E_(),_n=e,fe=q({},Ad),t){let r;for(r in t)t[r]!=null&&(fe[r]=t[r])}Te.mode=fe.parseMode==="html"?1:fe.parseMode==="sfc"?2:0,Te.inXML=fe.ns===1||fe.ns===2;let n=t&&t.delimiters;n&&(Te.delimiterOpen=Pi(n[0]),Te.delimiterClose=Pi(n[1]));let o=jr=Xv([],e);return Te.parse(_n),o.loc=Re(0,e.length),o.children=Id(o.children),jr=null,o}function v_(e,t){Di(e,void 0,t,!!Rd(e))}function Rd(e){let t=e.children.filter(n=>n.type!==3);return t.length===1&&t[0].type===1&&!Li(t[0])?t[0]:null}function Di(e,t,n,o=!1,r=!1){let{children:s}=e,i=[];for(let f=0;f<s.length;f++){let c=s[f];if(c.type===1&&c.tagType===0){let p=o?0:ut(c,n);if(p>0){if(p>=2){c.codegenNode.patchFlag=-1,i.push(c);continue}}else{let d=c.codegenNode;if(d.type===13){let v=d.patchFlag;if((v===void 0||v===512||v===1)&&Md(c,n)>=2){let m=Ld(c);m&&(d.props=n.hoist(m))}d.dynamicProps&&(d.dynamicProps=n.hoist(d.dynamicProps))}}}else if(c.type===12&&(o?0:ut(c,n))>=2){c.codegenNode.type===14&&c.codegenNode.arguments.length>0&&c.codegenNode.arguments.push("-1"),i.push(c);continue}if(c.type===1){let p=c.tagType===1;p&&n.scopes.vSlot++,Di(c,e,n,!1,r),p&&n.scopes.vSlot--}else if(c.type===11)Di(c,e,n,c.children.length===1,!0);else if(c.type===9)for(let p=0;p<c.branches.length;p++)Di(c.branches[p],e,n,c.branches[p].children.length===1,r)}let a=!1;if(i.length===s.length&&e.type===1){if(e.tagType===0&&e.codegenNode&&e.codegenNode.type===13&&H(e.codegenNode.children))e.codegenNode.children=l(lo(e.codegenNode.children)),a=!0;else if(e.tagType===1&&e.codegenNode&&e.codegenNode.type===13&&e.codegenNode.children&&!H(e.codegenNode.children)&&e.codegenNode.children.type===15){let f=u(e.codegenNode,"default");f&&(f.returns=l(lo(f.returns)),a=!0)}else if(e.tagType===3&&t&&t.type===1&&t.tagType===1&&t.codegenNode&&t.codegenNode.type===13&&t.codegenNode.children&&!H(t.codegenNode.children)&&t.codegenNode.children.type===15){let f=ct(e,"slot",!0),c=f&&f.arg&&u(t.codegenNode,f.arg);c&&(c.returns=l(lo(c.returns)),a=!0)}}if(!a)for(let f of i)f.codegenNode=n.cache(f.codegenNode);function l(f){let c=n.cache(f);return c.needArraySpread=!0,c}function u(f,c){if(f.children&&!H(f.children)&&f.children.type===15){let p=f.children.properties.find(d=>d.key===c||d.key.content===c);return p&&p.value}}i.length&&n.transformHoist&&n.transformHoist(s,n,e)}function ut(e,t){let{constantCache:n}=t;switch(e.type){case 1:if(e.tagType!==0)return 0;let o=n.get(e);if(o!==void 0)return o;let r=e.codegenNode;if(r.type!==13||r.isBlock&&e.tag!=="svg"&&e.tag!=="foreignObject"&&e.tag!=="math")return 0;if(r.patchFlag===void 0){let i=3,a=Md(e,t);if(a===0)return n.set(e,0),0;a<i&&(i=a);for(let l=0;l<e.children.length;l++){let u=ut(e.children[l],t);if(u===0)return n.set(e,0),0;u<i&&(i=u)}if(i>1)for(let l=0;l<e.props.length;l++){let u=e.props[l];if(u.type===7&&u.name==="bind"&&u.exp){let f=ut(u.exp,t);if(f===0)return n.set(e,0),0;f<i&&(i=f)}}if(r.isBlock){for(let l=0;l<e.props.length;l++)if(e.props[l].type===7)return n.set(e,0),0;t.removeHelper(uo),t.removeHelper(Bo(t.inSSR,r.isComponent)),r.isBlock=!1,t.helper(Uo(t.inSSR,r.isComponent))}return n.set(e,i),i}else return n.set(e,0),0;case 2:case 3:return 3;case 9:case 11:case 10:return 0;case 5:case 12:return ut(e.content,t);case 4:return e.constType;case 8:let s=3;for(let i=0;i<e.children.length;i++){let a=e.children[i];if(z(a)||Ae(a))continue;let l=ut(a,t);if(l===0)return 0;l<s&&(s=l)}return s;case 20:return 2;default:return 0}}var __=new Set([sc,ic,Ur,Xr]);function Pd(e,t){if(e.type===14&&!z(e.callee)&&__.has(e.callee)){let n=e.arguments[0];if(n.type===4)return ut(n,t);if(n.type===14)return Pd(n,t)}return 0}function Md(e,t){let n=3,o=Ld(e);if(o&&o.type===15){let{properties:r}=o;for(let s=0;s<r.length;s++){let{key:i,value:a}=r[s],l=ut(i,t);if(l===0)return l;l<n&&(n=l);let u;if(a.type===4?u=ut(a,t):a.type===14?u=Pd(a,t):u=0,u===0)return u;u<n&&(n=u)}}return n}function Ld(e){let t=e.codegenNode;if(t.type===13)return t.props}function y_(e,{filename:t="",prefixIdentifiers:n=!1,hoistStatic:o=!1,hmr:r=!1,cacheHandlers:s=!1,nodeTransforms:i=[],directiveTransforms:a={},transformHoist:l=null,isBuiltInComponent:u=De,isCustomElement:f=De,expressionPlugins:c=[],scopeId:p=null,slotted:d=!0,ssr:v=!1,inSSR:m=!1,ssrCssVars:N="",bindingMetadata:A=ee,inline:b=!1,isTS:E=!1,onError:y=fc,onWarn:g=Nd,compatConfig:O}){let D=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),S={filename:t,selfName:D&&St(ce(D[1])),prefixIdentifiers:n,hoistStatic:o,hmr:r,cacheHandlers:s,nodeTransforms:i,directiveTransforms:a,transformHoist:l,isBuiltInComponent:u,isCustomElement:f,expressionPlugins:c,scopeId:p,slotted:d,ssr:v,inSSR:m,ssrCssVars:N,bindingMetadata:A,inline:b,isTS:E,onError:y,onWarn:g,compatConfig:O,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],cached:[],constantCache:new WeakMap,vForMemoKeyedNodes:new WeakSet,temps:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,grandParent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(T){let V=S.helpers.get(T)||0;return S.helpers.set(T,V+1),T},removeHelper(T){let V=S.helpers.get(T);if(V){let M=V-1;M?S.helpers.set(T,M):S.helpers.delete(T)}},helperString(T){return`_${$o[S.helper(T)]}`},replaceNode(T){S.parent.children[S.childIndex]=S.currentNode=T},removeNode(T){let V=S.parent.children,M=T?V.indexOf(T):S.currentNode?S.childIndex:-1;!T||T===S.currentNode?(S.currentNode=null,S.onNodeRemoved()):S.childIndex>M&&(S.childIndex--,S.onNodeRemoved()),S.parent.children.splice(M,1)},onNodeRemoved:De,addIdentifiers(T){},removeIdentifiers(T){},hoist(T){z(T)&&(T=Y(T)),S.hoists.push(T);let V=Y(`_hoisted_${S.hoists.length}`,!1,T.loc,2);return V.hoisted=T,V},cache(T,V=!1,M=!1){let w=zv(S.cached.length,T,V,M);return S.cached.push(w),w}};return S.filters=new Set,S}function b_(e,t){let n=y_(e,t);Bi(e,n),t.hoistStatic&&v_(e,n),t.ssr||N_(e,n),e.helpers=new Set([...n.helpers.keys()]),e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached,e.transformed=!0,e.filters=[...n.filters]}function N_(e,t){let{helper:n}=t,{children:o}=e;if(o.length===1){let r=Rd(e);if(r&&r.codegenNode){let s=r.codegenNode;s.type===13&&uc(s,t),e.codegenNode=s}else e.codegenNode=o[0]}else if(o.length>1){let r=64;e.codegenNode=Br(t,n(Fr),void 0,e.children,r,void 0,void 0,!0,void 0,!1)}}function S_(e,t){let n=0,o=()=>{n--};for(;n<e.children.length;n++){let r=e.children[n];z(r)||(t.grandParent=t.parent,t.parent=e,t.childIndex=n,t.onNodeRemoved=o,Bi(r,t))}}function Bi(e,t){t.currentNode=e;let{nodeTransforms:n}=t,o=[];for(let s=0;s<n.length;s++){let i=n[s](e,t);if(i&&(H(i)?o.push(...i):o.push(i)),t.currentNode)e=t.currentNode;else return}switch(e.type){case 3:t.ssr||t.helper(Wr);break;case 5:t.ssr||t.helper(Kr);break;case 9:for(let s=0;s<e.branches.length;s++)Bi(e.branches[s],t);break;case 10:case 11:case 1:case 0:S_(e,t);break}t.currentNode=e;let r=o.length;for(;r--;)o[r]()}function $d(e,t){let n=z(e)?o=>o===e:o=>e.test(o);return(o,r)=>{if(o.type===1){let{props:s}=o;if(o.tagType===3&&s.some(n_))return;let i=[];for(let a=0;a<s.length;a++){let l=s[a];if(l.type===7&&n(l.name)){s.splice(a,1),a--;let u=t(o,l,r);u&&i.push(u)}}return i}}}var Hi="/*@__PURE__*/",Fd=e=>`${$o[e]}: _${$o[e]}`;function x_(e,{mode:t="function",prefixIdentifiers:n=t==="module",sourceMap:o=!1,filename:r="template.vue.html",scopeId:s=null,optimizeImports:i=!1,runtimeGlobalName:a="Vue",runtimeModuleName:l="vue",ssrRuntimeModuleName:u="vue/server-renderer",ssr:f=!1,isTS:c=!1,inSSR:p=!1}){let d={mode:t,prefixIdentifiers:n,sourceMap:o,filename:r,scopeId:s,optimizeImports:i,runtimeGlobalName:a,runtimeModuleName:l,ssrRuntimeModuleName:u,ssr:f,isTS:c,inSSR:p,source:e.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper(m){return`_${$o[m]}`},push(m,N=-2,A){d.code+=m},indent(){v(++d.indentLevel)},deindent(m=!1){m?--d.indentLevel:v(--d.indentLevel)},newline(){v(d.indentLevel)}};function v(m){d.push(`
`+"  ".repeat(m),0)}return d}function T_(e,t={}){let n=x_(e,t);t.onContextCreated&&t.onContextCreated(n);let{mode:o,push:r,prefixIdentifiers:s,indent:i,deindent:a,newline:l,scopeId:u,ssr:f}=n,c=Array.from(e.helpers),p=c.length>0,d=!s&&o!=="module";w_(e,n);let m=f?"ssrRender":"render",A=(f?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ");if(r(`function ${m}(${A}) {`),i(),d&&(r("with (_ctx) {"),i(),p&&(r(`const { ${c.map(Fd).join(", ")} } = _Vue
`,-1),l())),e.components.length&&(Fl(e.components,"component",n),(e.directives.length||e.temps>0)&&l()),e.directives.length&&(Fl(e.directives,"directive",n),e.temps>0&&l()),e.filters&&e.filters.length&&(l(),Fl(e.filters,"filter",n),l()),e.temps>0){r("let ");for(let b=0;b<e.temps;b++)r(`${b>0?", ":""}_temp${b}`)}return(e.components.length||e.directives.length||e.temps)&&(r(`
`,0),l()),f||r("return "),e.codegenNode?Ze(e.codegenNode,n):r("null"),d&&(a(),r("}")),a(),r("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}function w_(e,t){let{ssr:n,prefixIdentifiers:o,push:r,newline:s,runtimeModuleName:i,runtimeGlobalName:a,ssrRuntimeModuleName:l}=t,u=a,f=Array.from(e.helpers);if(f.length>0&&(r(`const _Vue = ${u}
`,-1),e.hoists.length)){let c=[Jl,Yl,Wr,Ql,Ed].filter(p=>f.includes(p)).map(Fd).join(", ");r(`const { ${c} } = _Vue
`,-1)}O_(e.hoists,t),s(),r("return ")}function Fl(e,t,{helper:n,push:o,newline:r,isTS:s}){let i=n(t==="filter"?nc:t==="component"?Zl:tc);for(let a=0;a<e.length;a++){let l=e[a],u=l.endsWith("__self");u&&(l=l.slice(0,-6)),o(`const ${Hr(l,t)} = ${i}(${JSON.stringify(l)}${u?", true":""})${s?"!":""}`),a<e.length-1&&r()}}function O_(e,t){if(!e.length)return;t.pure=!0;let{push:n,newline:o}=t;o();for(let r=0;r<e.length;r++){let s=e[r];s&&(n(`const _hoisted_${r+1} = `),Ze(s,t),o())}t.pure=!1}function gc(e,t){let n=e.length>3||!1;t.push("["),n&&t.indent(),Gr(e,t,n),n&&t.deindent(),t.push("]")}function Gr(e,t,n=!1,o=!0){let{push:r,newline:s}=t;for(let i=0;i<e.length;i++){let a=e[i];z(a)?r(a,-3):H(a)?gc(a,t):Ze(a,t),i<e.length-1&&(n?(o&&r(","),s()):o&&r(", "))}}function Ze(e,t){if(z(e)){t.push(e,-3);return}if(Ae(e)){t.push(t.helper(e));return}switch(e.type){case 1:case 9:case 11:Ze(e.codegenNode,t);break;case 2:C_(e,t);break;case 4:Ud(e,t);break;case 5:A_(e,t);break;case 12:Ze(e.codegenNode,t);break;case 8:Bd(e,t);break;case 3:I_(e,t);break;case 13:k_(e,t);break;case 14:R_(e,t);break;case 15:P_(e,t);break;case 17:M_(e,t);break;case 18:L_(e,t);break;case 19:$_(e,t);break;case 20:F_(e,t);break;case 21:Gr(e.body,t,!0,!1);break;case 22:break;case 23:break;case 24:break;case 25:break;case 26:break;case 10:break;default:}}function C_(e,t){t.push(JSON.stringify(e.content),-3,e)}function Ud(e,t){let{content:n,isStatic:o}=e;t.push(o?JSON.stringify(n):n,-3,e)}function A_(e,t){let{push:n,helper:o,pure:r}=t;r&&n(Hi),n(`${o(Kr)}(`),Ze(e.content,t),n(")")}function Bd(e,t){for(let n=0;n<e.children.length;n++){let o=e.children[n];z(o)?t.push(o,-3):Ze(o,t)}}function D_(e,t){let{push:n}=t;if(e.type===8)n("["),Bd(e,t),n("]");else if(e.isStatic){let o=pc(e.content)?e.content:JSON.stringify(e.content);n(o,-2,e)}else n(`[${e.content}]`,-3,e)}function I_(e,t){let{push:n,helper:o,pure:r}=t;r&&n(Hi),n(`${o(Wr)}(${JSON.stringify(e.content)})`,-3,e)}function k_(e,t){let{push:n,helper:o,pure:r}=t,{tag:s,props:i,children:a,patchFlag:l,dynamicProps:u,directives:f,isBlock:c,disableTracking:p,isComponent:d}=e,v;l&&(v=String(l)),f&&n(o(oc)+"("),c&&n(`(${o(uo)}(${p?"true":""}), `),r&&n(Hi);let m=c?Bo(t.inSSR,d):Uo(t.inSSR,d);n(o(m)+"(",-2,e),Gr(V_([s,i,a,v,u]),t),n(")"),c&&n(")"),f&&(n(", "),Ze(f,t),n(")"))}function V_(e){let t=e.length;for(;t--&&e[t]==null;);return e.slice(0,t+1).map(n=>n||"null")}function R_(e,t){let{push:n,helper:o,pure:r}=t,s=z(e.callee)?e.callee:o(e.callee);r&&n(Hi),n(s+"(",-2,e),Gr(e.arguments,t),n(")")}function P_(e,t){let{push:n,indent:o,deindent:r,newline:s}=t,{properties:i}=e;if(!i.length){n("{}",-2,e);return}let a=i.length>1||!1;n(a?"{":"{ "),a&&o();for(let l=0;l<i.length;l++){let{key:u,value:f}=i[l];D_(u,t),n(": "),Ze(f,t),l<i.length-1&&(n(","),s())}a&&r(),n(a?"}":" }")}function M_(e,t){gc(e.elements,t)}function L_(e,t){let{push:n,indent:o,deindent:r}=t,{params:s,returns:i,body:a,newline:l,isSlot:u}=e;u&&n(`_${$o[lc]}(`),n("(",-2,e),H(s)?Gr(s,t):s&&Ze(s,t),n(") => "),(l||a)&&(n("{"),o()),i?(l&&n("return "),H(i)?gc(i,t):Ze(i,t)):a&&Ze(a,t),(l||a)&&(r(),n("}")),u&&(e.isNonScopedSlot&&n(", undefined, true"),n(")"))}function $_(e,t){let{test:n,consequent:o,alternate:r,newline:s}=e,{push:i,indent:a,deindent:l,newline:u}=t;if(n.type===4){let c=!pc(n.content);c&&i("("),Ud(n,t),c&&i(")")}else i("("),Ze(n,t),i(")");s&&a(),t.indentLevel++,s||i(" "),i("? "),Ze(o,t),t.indentLevel--,s&&u(),s||i(" "),i(": ");let f=r.type===19;f||t.indentLevel++,Ze(r,t),f||t.indentLevel--,s&&l(!0)}function F_(e,t){let{push:n,helper:o,indent:r,deindent:s,newline:i}=t,{needPauseTracking:a,needArraySpread:l}=e;l&&n("[...("),n(`_cache[${e.index}] || (`),a&&(r(),n(`${o(Ri)}(-1`),e.inVOnce&&n(", true"),n("),"),i(),n("(")),n(`_cache[${e.index}] = `),Ze(e.value,t),a&&(n(`).cacheIndex = ${e.index},`),i(),n(`${o(Ri)}(1),`),i(),n(`_cache[${e.index}]`),s()),n(")"),l&&n(")]")}var Jb=new RegExp("\\b"+"arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b")+"\\b");var U_=$d(/^(?:if|else|else-if)$/,(e,t,n)=>B_(e,t,n,(o,r,s)=>{let i=n.parent.children,a=i.indexOf(o),l=0;for(;a-->=0;){let u=i[a];u&&u.type===9&&(l+=u.branches.length)}return()=>{if(s)o.codegenNode=id(r,l,n);else{let u=H_(o.codegenNode);u.alternate=id(r,l+o.branches.length-1,n)}}}));function B_(e,t,n,o){if(t.name!=="else"&&(!t.exp||!t.exp.content.trim())){let r=t.exp?t.exp.loc:e.loc;n.onError(_e(28,t.loc)),t.exp=Y("true",!1,r)}if(t.name==="if"){let r=sd(e,t),s={type:9,loc:m_(e.loc),branches:[r]};if(n.replaceNode(s),o)return o(s,r,!0)}else{let r=n.parent.children,s=[],i=r.indexOf(e);for(;i-->=-1;){let a=r[i];if(a&&Ui(a)){n.removeNode(a);continue}if(a&&a.type===9){(t.name==="else-if"||t.name==="else")&&a.branches[a.branches.length-1].condition===void 0&&n.onError(_e(30,e.loc)),n.removeNode();let l=sd(e,t);a.branches.push(l);let u=o&&o(a,l,!1);Bi(l,n),u&&u(),n.currentNode=null}else n.onError(_e(30,e.loc));break}}}function sd(e,t){let n=e.tagType===3;return{type:10,loc:e.loc,condition:t.name==="else"?void 0:t.exp,children:n&&!ct(e,"for")?e.children:[e],userKey:zr(e,"key"),isTemplateIf:n}}function id(e,t,n){return e.condition?Hl(e.condition,ad(e,t,n),Pe(n.helper(Wr),['""',"true"])):ad(e,t,n)}function ad(e,t,n){let{helper:o}=n,r=Oe("key",Y(`${t}`,!1,yt,2)),{children:s}=e,i=s[0];if(s.length!==1||i.type!==1)if(s.length===1&&i.type===11){let l=i.codegenNode;return $i(l,r,n),l}else return Br(n,o(Fr),At([r]),s,64,void 0,void 0,!0,!1,!1,e.loc);else{let l=i.codegenNode,u=s_(l);return u.type===13&&uc(u,n),$i(u,r,n),l}}function H_(e){for(;;)if(e.type===19)if(e.alternate.type===19)e=e.alternate;else return e;else e.type===20&&(e=e.value)}var j_=$d("for",(e,t,n)=>{let{helper:o,removeHelper:r}=n;return W_(e,t,n,s=>{let i=Pe(o(rc),[s.source]),a=Mi(e),l=ct(e,"memo"),u=zr(e,"key",!1,!0);u&&u.type;let f=u&&(u.type===6?u.value?Y(u.value.content,!0):void 0:u.exp),c=f?Oe("key",f):null,p=s.source.type===4&&s.source.constType>0,d=p?64:u?128:256;return s.codegenNode=Br(n,o(Fr),void 0,i,d,void 0,void 0,!0,!p,!1,e.loc),()=>{var v;let m,{children:N}=s,A=N.length!==1||N[0].type!==1,b=Li(e)?e:a&&e.children.length===1&&Li(e.children[0])?e.children[0]:null;if(b)m=b.codegenNode,a&&c&&$i(m,c,n);else if(A)m=Br(n,o(Fr),c?At([c]):void 0,e.children,64,void 0,void 0,!0,void 0,!1);else{m=N[0].codegenNode,a&&c&&$i(m,c,n);let E=!p||m.isBlockRequired===!0;m.isBlock!==E&&(m.isBlock?(r(uo),r(Bo(n.inSSR,m.isComponent))):r(Uo(n.inSSR,m.isComponent))),m.isBlock=E,m.isBlock?(o(uo),o(Bo(n.inSSR,m.isComponent))):(o(Uo(n.inSSR,m.isComponent)),m.needsPatch&&(m.patchFlag=((v=m.patchFlag)!=null?v:0)|512))}if(l){let E=Fo(zl(s.parseResult,[Y("_cached")]));E.body=Gv([Dt(["const _memo = (",l.exp,")"]),Dt(["if (_cached && _cached.el",...f?[" && _cached.key === (",f,")"]:[],` && ${n.helperString(yd)}(_cached, _memo)) return _cached`]),Dt(["const _item = ",m]),Y("_item.memo = _memo"),Y("return _item")]),i.arguments.push(E,Y("_cache"),Y(String(n.cached.length))),n.cached.push(null)}else i.arguments.push(Fo(zl(s.parseResult),m,!0))}})});function W_(e,t,n,o){if(!t.exp){n.onError(_e(31,t.loc));return}let r=t.forParseResult;if(!r){n.onError(_e(32,t.loc));return}Hd(r,n);let{addIdentifiers:s,removeIdentifiers:i,scopes:a}=n,{source:l,value:u,key:f,index:c}=r,p={type:11,loc:t.loc,source:l,valueAlias:u,keyAlias:f,objectIndexAlias:c,parseResult:r,children:Mi(e)?e.children:[e]};n.replaceNode(p),a.vFor++;let d=o&&o(p);return()=>{a.vFor--,d&&d()}}function Hd(e,t){e.finalized||(e.finalized=!0)}function zl({value:e,key:t,index:n},o=[]){return K_([e,t,n,...o])}function K_(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map((n,o)=>n||Y("_".repeat(o+1),!1))}var ld=Y("undefined",!1),X_=(e,t)=>{if(e.type===1&&(e.tagType===1||e.tagType===3)){let n=ct(e,"slot");if(n)return n.exp,t.scopes.vSlot++,()=>{t.scopes.vSlot--}}};var z_=(e,t,n,o)=>Fo(e,n,!1,!0,n.length?n[0].loc:o);function G_(e,t,n=z_){t.helper(lc);let{children:o,loc:r}=e,s=[],i=[],a=t.scopes.vSlot>0||t.scopes.vFor>0,l=ct(e,"slot",!0);if(l){let{arg:N,exp:A}=l;N&&!Qe(N)&&(a=!0),s.push(Oe(N||Y("default",!0),n(A,void 0,o,r)))}let u=!1,f=!1,c=[],p=new Set,d=0;for(let N=0;N<o.length;N++){let A=o[N],b;if(!Mi(A)||!(b=ct(A,"slot",!0))){A.type!==3&&c.push(A);continue}if(l){t.onError(_e(37,b.loc));break}u=!0;let{children:E,loc:y}=A,{arg:g=Y("default",!0),exp:O,loc:D}=b,S;Qe(g)?S=g?g.content:"default":a=!0;let T=ct(A,"for"),V=n(O,T,E,y),M,w;if(M=ct(A,"if"))a=!0,i.push(Hl(M.exp,Oi(g,V,d++),ld));else if(w=ct(A,/^else(?:-if)?$/,!0)){let $=N,P;for(;$--&&(P=o[$],!!Ui(P)););if(P&&Mi(P)&&ct(P,/^(?:else-)?if$/)){let W=i[i.length-1];for(;W.alternate.type===19;)W=W.alternate;W.alternate=w.exp?Hl(w.exp,Oi(g,V,d++),ld):Oi(g,V,d++)}else t.onError(_e(30,w.loc))}else if(T){a=!0;let $=T.forParseResult;$?(Hd($,t),i.push(Pe(t.helper(rc),[$.source,Fo(zl($),Oi(g,V),!0)]))):t.onError(_e(32,T.loc))}else{if(S){if(p.has(S)){t.onError(_e(38,D));continue}p.add(S),S==="default"&&(f=!0)}s.push(Oe(g,V))}}if(!l){let N=(A,b)=>{let E=n(A,void 0,b,r);return t.compatConfig&&(E.isNonScopedSlot=!0),Oe("default",E)};u?c.length&&!c.every(hc)&&(f?t.onError(_e(39,c[0].loc)):s.push(N(void 0,c))):s.push(N(void 0,o))}let v=a?2:Ii(e.children)?3:1,m=At(s.concat(Oe("_",Y(v+"",!1))),r);return i.length&&(m=Pe(t.helper(_d),[m,lo(i)])),{slots:m,hasDynamicSlots:a}}function Oi(e,t,n){let o=[Oe("name",e),Oe("fn",t)];return n!=null&&o.push(Oe("key",Y(String(n),!0))),At(o)}function Ii(e){for(let t=0;t<e.length;t++){let n=e[t];switch(n.type){case 1:if(n.tagType===2||Ii(n.children))return!0;break;case 9:if(Ii(n.branches))return!0;break;case 10:case 11:if(Ii(n.children))return!0;break}}return!1}var jd=new WeakMap,q_=(e,t)=>function(){if(e=t.currentNode,!(e.type===1&&(e.tagType===0||e.tagType===1)))return;let{tag:o,props:r}=e,s=e.tagType===1,i=s?J_(e,t):`"${o}"`,a=ie(i)&&i.callee===ec,l,u,f=0,c,p,d,v=!1,m=!1,N=a||i===$r||i===ql||!s&&(o==="svg"||o==="foreignObject"||o==="math");if(r.length>0){let b=Wd(e,t,void 0,s,a);l=b.props,f=b.patchFlag,p=b.dynamicPropNames,v=b.needsPatch,m=b.isBlockRequired;let E=b.directives;d=E&&E.length?lo(E.map(y=>Q_(y,t))):void 0,b.shouldUseBlock&&(N=!0)}if(e.children.length>0)if(i===ki&&(N=!0,f|=1024),s&&i!==$r&&i!==ki){let{slots:E,hasDynamicSlots:y}=G_(e,t);u=E,y&&(f|=1024)}else if(e.children.length===1&&i!==$r){let E=e.children[0],y=E.type,g=y===5||y===8;g&&ut(E,t)===0&&(f|=1),g||y===2?u=E:u=e.children}else u=e.children;p&&p.length&&(c=Z_(p));let A=e.codegenNode=Br(t,i,l,u,f===0?void 0:f,c,d,!!N,!1,s,e.loc);v=v&&(f===0||f===32),v&&(A.needsPatch=!0),m&&(A.isBlockRequired=!0)};function J_(e,t,n=!1){let{tag:o}=e,r=Gl(o),s=zr(e,"is",!1,!0);if(s)if(r||co("COMPILER_IS_ON_ELEMENT",t)){let a;if(s.type===6?a=s.value&&Y(s.value.content,!0):(a=s.exp,a||(a=Y("is",!1,s.arg.loc))),a)return Pe(t.helper(ec),[a])}else s.type===6&&s.value.content.startsWith("vue:")&&(o=s.value.content.slice(4));let i=Sd(o)||t.isBuiltInComponent(o);return i?(n||t.helper(i),i):(t.helper(Zl),t.components.add(o),Hr(o,"component"))}function Wd(e,t,n=e.props,o,r,s=!1){let{tag:i,loc:a,children:l}=e,u=[],f=[],c=[],p=l.length>0,d=!1,v=!1,m=0,N=!1,A=!1,b=!1,E=!1,y=!1,g=!1,O=[],D=w=>{u.length&&(f.push(At(cd(u),a)),u=[]),w&&f.push(w)},S=()=>{t.scopes.vFor>0&&u.push(Oe(Y("ref_for",!0),Y("true")))},T=({key:w,value:$})=>{if(Qe(w)){let P=w.content,W=Bt(P);if(W&&(!o||r)&&P.toLowerCase()!=="onclick"&&P!=="onUpdate:modelValue"&&!Lt(P)&&(E=!0),W&&Lt(P)&&(g=!0),P==="ref"&&(N=!0),W&&$.type===14&&($=$.arguments[0]),$.type===20||($.type===4||$.type===8)&&ut($,t)>0)return;P==="class"?A=!0:P==="style"?b=!0:P!=="ref"&&P!=="key"&&!O.includes(P)&&O.push(P),o&&(P==="class"||P==="style")&&!O.includes(P)&&O.push(P)}else y=!0};for(let w=0;w<n.length;w++){let $=n[w];if($.type===6){let{loc:P,name:W,nameLoc:j,value:ae}=$,pe=!0;if(W==="ref"&&(N=!0,S()),W==="is"&&(Gl(i)||ae&&ae.content.startsWith("vue:")||co("COMPILER_IS_ON_ELEMENT",t)))continue;u.push(Oe(Y(W,!0,j),Y(ae?ae.content:"",pe,ae?ae.loc:P)))}else{let{name:P,arg:W,exp:j,loc:ae,modifiers:pe}=$,he=P==="bind",re=P==="on";if(P==="slot"){o||t.onError(_e(40,ae));continue}if(P==="once"||P==="memo"||P==="is"||he&&Mn(W,"is")&&(Gl(i)||co("COMPILER_IS_ON_ELEMENT",t))||re&&s)continue;if(he&&Mn(W,"key")&&(d=!0),re&&p&&W&&Qe(W)&&ce(W.content)==="vue:beforeUpdate"&&(d=!0,v=!0),he&&Mn(W,"ref")&&S(),!W&&(he||re)){if(y=!0,j)if(he){if(D(),co("COMPILER_V_BIND_OBJECT_ORDER",t)){f.unshift(j);continue}S(),D(),f.push(j)}else D({type:14,loc:ae,callee:t.helper(ac),arguments:o?[j]:[j,"true"]});else t.onError(_e(he?34:35,ae));continue}he&&pe.some(Ee=>Ee.content==="prop")&&(m|=32);let Me=t.directiveTransforms[P];if(Me){let{props:Ee,needRuntime:et}=Me($,e,t);!s&&Ee.forEach(T),re&&W&&!Qe(W)?D(At(Ee,a)):u.push(...Ee),et&&(c.push($),Ae(et)&&jd.set($,et))}else ya(P)||(c.push($),p&&(d=!0,v=!0))}}let V;f.length?(D(),f.length>1?V=Pe(t.helper(Vi),f,a):V=f[0]):u.length&&(V=At(cd(u),a)),y?m|=16:(A&&!o&&(m|=2),b&&!o&&(m|=4),O.length&&(m|=8),E&&(m|=32));let M=(m===0||m===32)&&(N||g||c.length>0);if(!d&&M&&(m|=512),!t.inSSR&&V)switch(V.type){case 15:let w=-1,$=-1,P=!1;for(let ae=0;ae<V.properties.length;ae++){let pe=V.properties[ae].key;Qe(pe)?pe.content==="class"?w=ae:pe.content==="style"&&($=ae):pe.isHandlerKey||(P=!0)}let W=V.properties[w],j=V.properties[$];P?V=Pe(t.helper(Ur),[V]):(W&&!Qe(W.value)&&(W.value=Pe(t.helper(sc),[W.value])),j&&(b||j.value.type===4&&j.value.content.trim()[0]==="["||j.value.type===17)&&(j.value=Pe(t.helper(ic),[j.value])));break;case 14:break;default:V=Pe(t.helper(Ur),[Pe(t.helper(Xr),[V])]);break}return{props:V,directives:c,patchFlag:m,dynamicPropNames:O,shouldUseBlock:d,needsPatch:M,isBlockRequired:v}}function cd(e){let t=new Map,n=[];for(let o=0;o<e.length;o++){let r=e[o];if(r.key.type===8||!r.key.isStatic){n.push(r);continue}let s=r.key.content,i=t.get(s);i?(s==="style"||s==="class"||Bt(s))&&Y_(i,r):(t.set(s,r),n.push(r))}return n}function Y_(e,t){e.value.type===17?e.value.elements.push(t.value):e.value=lo([e.value,t.value],e.loc)}function Q_(e,t){let n=[],o=jd.get(e);o?n.push(t.helperString(o)):(t.helper(tc),t.directives.add(e.name),n.push(Hr(e.name,"directive")));let{loc:r}=e;if(e.exp&&n.push(e.exp),e.arg&&(e.exp||n.push("void 0"),n.push(e.arg)),Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));let s=Y("true",!1,r);n.push(At(e.modifiers.map(i=>Oe(i,s)),r))}return lo(n,e.loc)}function Z_(e){let t="[";for(let n=0,o=e.length;n<o;n++)t+=JSON.stringify(e[n]),n<o-1&&(t+=", ");return t+"]"}function Gl(e){return e==="component"||e==="Component"}var ey=(e,t)=>{if(Li(e)){let{children:n,loc:o}=e,{slotName:r,slotProps:s}=ty(e,t),i=[t.prefixIdentifiers?"_ctx.$slots":"$slots",r,"{}","undefined","true"],a=2;s&&(i[2]=s,a=3),n.length&&(i[3]=Fo([],n,!1,!1,o),a=4),t.scopeId&&!t.slotted&&(a=5),i.splice(a),e.codegenNode=Pe(t.helper(vd),i,o)}};function ty(e,t){let n='"default"',o,r=[];for(let s=0;s<e.props.length;s++){let i=e.props[s];if(i.type===6)i.value&&(i.name==="name"?n=JSON.stringify(i.value.content):(i.name=ce(i.name),r.push(i)));else if(i.name==="bind"&&Mn(i.arg,"name")){if(i.exp)n=i.exp;else if(i.arg&&i.arg.type===4){let a=ce(i.arg.content);n=i.exp=Y(a,!1,i.arg.loc)}}else i.name==="bind"&&i.arg&&Qe(i.arg)&&(i.arg.content=ce(i.arg.content)),r.push(i)}if(r.length>0){let{props:s,directives:i}=Wd(e,t,r,!1,!1);o=s,i.length&&t.onError(_e(36,i[0].loc))}return{slotName:n,slotProps:o}}var Ec=(e,t,n,o)=>{let{loc:r,modifiers:s,arg:i}=e;!e.exp&&!s.length&&n.onError(_e(35,r));let a;if(i.type===4)if(i.isStatic){let c=i.content;c.startsWith("vue:")&&(c=`vnode-${c.slice(4)}`);let p=t.tagType!==0||c.startsWith("vnode")||!/[A-Z]/.test(c)?on(ce(c)):`on:${c}`;a=Y(p,!0,i.loc)}else a=Dt([`${n.helperString(Bl)}(`,i,")"]);else a=i,a.children.unshift(`${n.helperString(Bl)}(`),a.children.push(")");let l=e.exp;l&&!l.content.trim()&&(l=void 0);let u=n.cacheHandlers&&!l&&!n.inVOnce;if(l){let c=wd(l),p=!(c||t_(l)),d=l.content.includes(";");(p||u&&c)&&(l=Dt([`${p?"$event":"(...args)"} => ${d?"{":"("}`,l,d?"}":")"]))}let f={props:[Oe(a,l||Y("() => {}",!1,r))]};return o&&(f=o(f)),u&&(f.props[0].value=n.cache(f.props[0].value)),f.props.forEach(c=>c.key.isHandlerKey=!0),f},ny=(e,t,n)=>{let{modifiers:o,loc:r}=e,s=e.arg,{exp:i}=e;return i&&i.type===4&&!i.content.trim()&&(i=void 0),s.type!==4?(s.children.unshift("("),s.children.push(') || ""')):s.isStatic||(s.content=s.content?`${s.content} || ""`:'""'),o.some(a=>a.content==="camel")&&(s.type===4?s.isStatic?s.content=ce(s.content):s.content=`${n.helperString(Ul)}(${s.content})`:(s.children.unshift(`${n.helperString(Ul)}(`),s.children.push(")"))),n.inSSR||(o.some(a=>a.content==="prop")&&ud(s,"."),o.some(a=>a.content==="attr")&&ud(s,"^")),{props:[Oe(s,i)]}},ud=(e,t)=>{e.type===4?e.isStatic?e.content=t+e.content:e.content=`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"))},oy=(e,t)=>{if(e.type===0||e.type===1||e.type===11||e.type===10)return()=>{let n=e.children,o,r=!1;for(let s=0;s<n.length;s++){let i=n[s];if($l(i)){r=!0;for(let a=s+1;a<n.length;a++){let l=n[a];if($l(l))o||(o=n[s]=Dt([i],i.loc)),o.children.push(" + ",l),n.splice(a,1),a--;else{o=void 0;break}}}}if(!(!r||n.length===1&&(e.type===0||e.type===1&&e.tagType===0&&!e.props.find(s=>s.type===7&&!t.directiveTransforms[s.name])&&e.tag!=="template")))for(let s=0;s<n.length;s++){let i=n[s];if($l(i)||i.type===8){let a=[];(i.type!==2||i.content!==" ")&&a.push(i),!t.ssr&&ut(i,t)===0&&a.push("1"),n[s]={type:12,content:i,loc:i.loc,codegenNode:Pe(t.helper(Ql),a)}}}}},fd=new WeakSet,ry=(e,t)=>{if(e.type===1&&ct(e,"once",!0))return fd.has(e)||t.inVOnce||t.inSSR?void 0:(fd.add(e),t.inVOnce=!0,t.helper(Ri),()=>{t.inVOnce=!1;let n=t.currentNode;n.codegenNode&&(n.codegenNode=t.cache(n.codegenNode,!0,!0))})},vc=(e,t,n)=>{let{exp:o,arg:r}=e;if(!o)return n.onError(_e(41,e.loc)),Lr();let s=o.loc.source.trim(),i=o.type===4?o.content:s,a=n.bindingMetadata[s];if(a==="props"||a==="props-aliased")return n.onError(_e(44,o.loc)),Lr();if(a==="literal-const"||a==="setup-const")return n.onError(_e(45,o.loc)),Lr();if(!i.trim()||!wd(o))return n.onError(_e(42,o.loc)),Lr();let l=r||Y("modelValue",!0),u=r?Qe(r)?`onUpdate:${ce(r.content)}`:Dt(['"onUpdate:" + ',r]):"onUpdate:modelValue",f,c=n.isTS?"($event: any)":"$event";f=Dt([`${c} => ((`,o,") = $event)"]);let p=[Oe(l,e.exp),Oe(u,f)];if(e.modifiers.length&&t.tagType===1){let d=e.modifiers.map(m=>m.content).map(m=>(pc(m)?m:JSON.stringify(m))+": true").join(", "),v=r?Qe(r)?`${r.content}Modifiers`:Dt([r,' + "Modifiers"']):"modelModifiers";p.push(Oe(v,Y(`{ ${d} }`,!1,e.loc,2)))}return Lr(p)};function Lr(e=[]){return{props:e}}var sy=/[\w).+\-_$\]]/,iy=(e,t)=>{co("COMPILER_FILTERS",t)&&(e.type===5?Fi(e.content,t):e.type===1&&e.props.forEach(n=>{n.type===7&&n.name!=="for"&&n.exp&&Fi(n.exp,t)}))};function Fi(e,t){if(e.type===4)pd(e,t);else for(let n=0;n<e.children.length;n++){let o=e.children[n];typeof o=="object"&&(o.type===4?pd(o,t):o.type===8?Fi(o,t):o.type===5&&Fi(o.content,t))}}function pd(e,t){let n=e.content,o=!1,r=!1,s=!1,i=!1,a=0,l=0,u=0,f=0,c,p,d,v,m=[];for(d=0;d<n.length;d++)if(p=c,c=n.charCodeAt(d),o)c===39&&p!==92&&(o=!1);else if(r)c===34&&p!==92&&(r=!1);else if(s)c===96&&p!==92&&(s=!1);else if(i)c===47&&p!==92&&(i=!1);else if(c===124&&n.charCodeAt(d+1)!==124&&n.charCodeAt(d-1)!==124&&!a&&!l&&!u)v===void 0?(f=d+1,v=n.slice(0,d).trim()):N();else{switch(c){case 34:r=!0;break;case 39:o=!0;break;case 96:s=!0;break;case 40:u++;break;case 41:u--;break;case 91:l++;break;case 93:l--;break;case 123:a++;break;case 125:a--;break}if(c===47){let A=d-1,b;for(;A>=0&&(b=n.charAt(A),b===" ");A--);(!b||!sy.test(b))&&(i=!0)}}v===void 0?v=n.slice(0,d).trim():f!==0&&N();function N(){m.push(n.slice(f,d).trim()),f=d+1}if(m.length){for(d=0;d<m.length;d++)v=ay(v,m[d],t);e.content=v,e.ast=void 0}}function ay(e,t,n){n.helper(nc);let o=t.indexOf("(");if(o<0)return n.filters.add(t),`${Hr(t,"filter")}(${e})`;{let r=t.slice(0,o),s=t.slice(o+1);return n.filters.add(r),`${Hr(r,"filter")}(${e}${s!==")"?","+s:s}`}}var dd=new WeakSet,ly=(e,t)=>{if(e.type===1){let n=ct(e,"memo");return!n||dd.has(e)||t.inSSR?void 0:(dd.add(e),()=>{let o=e.codegenNode||t.currentNode.codegenNode;o&&o.type===13&&(e.tagType!==1&&uc(o,t),e.codegenNode=Pe(t.helper(cc),[n.exp,Fo(void 0,o),"_cache",String(t.cached.length)]),t.cached.push(null))})}},cy=(e,t)=>{if(e.type===1){for(let n of e.props)if(n.type===7&&n.name==="bind"&&(!n.exp||n.exp.type===4&&!n.exp.content.trim())&&n.arg){let o=n.arg;if(o.type!==4||!o.isStatic)t.onError(_e(53,o.loc)),n.exp=Y("",!0,o.loc);else{let r=ce(o.content);(xd.test(r[0])||r[0]==="-")&&(n.exp=Y(r,!1,o.loc))}}}};function uy(e){return[[cy,ry,U_,ly,j_,iy,ey,q_,X_,oy],{on:Ec,bind:ny,model:vc}]}function Kd(e,t={}){let n=t.onError||fc,o=t.mode==="module";t.prefixIdentifiers===!0?n(_e(48)):o&&n(_e(49));let r=!1;t.cacheHandlers&&n(_e(50)),t.scopeId&&!o&&n(_e(51));let s=q({},t,{prefixIdentifiers:r}),i=z(e)?Vd(e,s):e,[a,l]=uy();return b_(i,q({},s,{nodeTransforms:[...a,...t.nodeTransforms||[]],directiveTransforms:q({},l,t.directiveTransforms||{})})),T_(i,s)}var Xd=()=>({props:[]});var Gd=Symbol(""),qd=Symbol(""),Jd=Symbol(""),Yd=Symbol(""),_c=Symbol(""),Qd=Symbol(""),Zd=Symbol(""),eh=Symbol(""),yc=Symbol(""),th=Symbol("");bd({[Gd]:"vModelRadio",[qd]:"vModelCheckbox",[Jd]:"vModelText",[Yd]:"vModelSelect",[_c]:"vModelDynamic",[Qd]:"withModifiers",[Zd]:"withKeys",[eh]:"vShow",[yc]:"Transition",[th]:"TransitionGroup"});var jo;function fy(e,t=!1){return jo||(jo=document.createElement("div")),t?(jo.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,jo.children[0].getAttribute("foo")):(jo.innerHTML=e,jo.textContent)}var py={parseMode:"html",isVoidTag:mu,isNativeTag:e=>Na(e)||Sa(e)||xa(e),isPreTag:e=>e==="pre",isIgnoreNewlineTag:e=>e==="pre"||e==="textarea",decodeEntities:fy,isBuiltInComponent:e=>{if(e==="Transition"||e==="transition")return yc;if(e==="TransitionGroup"||e==="transition-group")return th},getNamespace(e,t,n){let o=t?t.ns:n;if(t&&o===2)if(t.tag==="annotation-xml"){if(e==="svg")return 1;t.props.some(r=>r.type===6&&r.name==="encoding"&&r.value!=null&&(r.value.content==="text/html"||r.value.content==="application/xhtml+xml"))&&(o=0)}else/^m(?:[ions]|text)$/.test(t.tag)&&e!=="mglyph"&&e!=="malignmark"&&(o=0);else t&&o===1&&(t.tag==="foreignObject"||t.tag==="desc"||t.tag==="title")&&(o=0);if(o===0){if(e==="svg")return 1;if(e==="math")return 2}return o}},dy=e=>{e.type===1&&e.props.forEach((t,n)=>{t.type===6&&t.name==="style"&&t.value&&(e.props[n]={type:7,name:"bind",arg:Y("style",!0,t.loc),exp:hy(t.value.content,t.loc),modifiers:[],loc:t.loc})})},hy=(e,t)=>{let n=ba(e);return Y(JSON.stringify(n),!1,t,3)};function yn(e,t){return _e(e,t,void 0)}var my=(e,t,n)=>{let{exp:o,loc:r}=e;return o||n.onError(yn(54,r)),t.children.length&&(n.onError(yn(55,r)),t.children.length=0),{props:[Oe(Y("innerHTML",!0,r),o||Y("",!0))]}},gy=(e,t,n)=>{let{exp:o,loc:r}=e;return o||n.onError(yn(56,r)),t.children.length&&(n.onError(yn(57,r)),t.children.length=0),{props:[Oe(Y("textContent",!0),o?ut(o,n)>0?o:Pe(n.helperString(Kr),[o],r):Y("",!0))]}},Ey=(e,t,n)=>{let o=vc(e,t,n);if(!o.props.length||t.tagType===1)return o;e.arg&&n.onError(yn(59,e.arg.loc));function r(){let a=ct(t,"bind");a&&Mn(a.arg,"value")&&n.onError(yn(61,a.loc))}let{tag:s}=t,i=n.isCustomElement(s);if(s==="input"||s==="textarea"||s==="select"||i){let a=Jd,l=!1;if(s==="input"||i){let u=zr(t,"type");if(u){if(u.type===7)a=_c;else if(u.value)switch(u.value.content){case"radio":a=Gd;break;case"checkbox":a=qd;break;case"file":l=!0,n.onError(yn(60,e.loc));break;default:break}}else Od(t)&&(a=_c)}else s==="select"&&(a=Yd);l||(o.needRuntime=n.helper(a))}else n.onError(yn(58,e.loc));return o.props=o.props.filter(a=>!(a.key.type===4&&a.key.content==="modelValue")),o},vy=Ue("passive,once,capture"),_y=Ue("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),yy=Ue("left,right"),nh=Ue("onkeyup,onkeydown,onkeypress"),by=(e,t,n,o)=>{let r=[],s=[],i=[];for(let a=0;a<t.length;a++){let l=t[a].content;l==="native"&&Ho("COMPILER_V_ON_NATIVE",n,o)||vy(l)?i.push(l):yy(l)?Qe(e)?nh(e.content.toLowerCase())?r.push(l):s.push(l):(r.push(l),s.push(l)):_y(l)?s.push(l):r.push(l)}return{keyModifiers:r,nonKeyModifiers:s,eventOptionModifiers:i}},zd=(e,t)=>Qe(e)&&e.content.toLowerCase()==="onclick"?Y(t,!0):e.type!==4?Dt(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,Ny=(e,t,n)=>Ec(e,t,n,o=>{let{modifiers:r}=e;if(!r.length)return o;let{key:s,value:i}=o.props[0],{keyModifiers:a,nonKeyModifiers:l,eventOptionModifiers:u}=by(s,r,n,e.loc);if(l.includes("right")&&(s=zd(s,"onContextmenu")),l.includes("middle")&&(s=zd(s,"onMouseup")),l.length&&(i=Pe(n.helper(Qd),[i,JSON.stringify(l)])),a.length&&(!Qe(s)||nh(s.content.toLowerCase()))&&(i=Pe(n.helper(Zd),[i,JSON.stringify(a)])),u.length){let f=u.map(St).join("");s=Qe(s)?Y(`${s.content}${f}`,!0):Dt(["(",s,`) + "${f}"`])}return{props:[Oe(s,i)]}}),Sy=(e,t,n)=>{let{exp:o,loc:r}=e;return o||n.onError(yn(62,r)),{props:[],needRuntime:n.helper(eh)}},xy=(e,t)=>{if(e.type===1&&e.tagType===1&&t.isBuiltInComponent(e.tag)===yc)return()=>{if(!e.children.length)return;let o=oh(e),r=e.children[0];if(r.type===1)for(let s of r.props)s.type===7&&s.name==="show"&&e.props.push({type:6,name:"persisted",nameLoc:e.loc,value:void 0,loc:e.loc})}};function oh(e){let t=e.children=e.children.filter(o=>!Ui(o)),n=t[0];return t.length!==1||n.type===11||n.type===9&&n.branches.some(oh)}var Ty=(e,t)=>{e.type===1&&e.tagType===0&&(e.tag==="script"||e.tag==="style")&&t.removeNode()};var wy=[dy,xy],Oy={cloak:Xd,html:my,text:gy,model:Ey,on:Ny,show:Sy};function rh(e,t={}){return Kd(e,q({},py,t,{nodeTransforms:[Ty,...wy,...t.nodeTransforms||[]],directiveTransforms:q({},Oy,t.directiveTransforms||{}),transformHoist:null}))}var sh=Object.create(null);function Cy(e,t){if(!z(e))if(e.nodeType)e=e.innerHTML;else return De;let n=fu(e,t),o=sh[n];if(o)return o;if(e[0]==="#"){let l=document.querySelector(e);e=l?l.innerHTML:""}let r=q({hoistStatic:!0,onError:void 0,onWarn:De},t);!r.isCustomElement&&typeof customElements<"u"&&(r.isCustomElement=l=>!!customElements.get(l));let{code:s}=rh(e,r);function i(l,u=!1){let f=u?l.message:`Template compilation error: ${l.message}`,c=l.loc&&du(e,l.loc.start.offset,l.loc.end.offset);gi(c?`${f}
${c}`:f)}let a=new Function("Vue",s)(Ll);return a._rc=!0,sh[n]=a}Sl(Cy);var ih="tavern_language_vocab_v1",bc="default";function ah(){return{activeBookId:bc,books:[{id:bc,name:"\u9ED8\u8BA4\u751F\u8BCD\u672C",createdAt:Date.now()}],items:[]}}var oe=ah(),Ay=new Set;function Ln(){try{se().localStorage.setItem(ih,JSON.stringify(oe))}catch(e){console.warn("[TavernLanguage] \u4FDD\u5B58\u751F\u8BCD\u672C\u5931\u8D25:",e)}Ay.forEach(e=>{try{e(oe)}catch{}})}function lh(){try{let e=se().localStorage.getItem(ih);if(e){let t=JSON.parse(e);if(t&&Array.isArray(t.books)&&Array.isArray(t.items))return t.books.length===0&&t.books.push({id:bc,name:"\u9ED8\u8BA4\u751F\u8BCD\u672C",createdAt:Date.now()}),t.books.some(n=>n.id===t.activeBookId)||(t.activeBookId=t.books[0].id),oe=t,oe}}catch{}return oe=ah(),oe}function Nc(){return oe}function ji(e,t){return`${String(t||"en").toLowerCase()}::${String(e||"").trim().toLowerCase()}`}function ch(e,t){let n=ji(e,t);return oe.items.find(o=>o.key===n)||null}function Wi(e){oe.books.some(t=>t.id===e)&&(oe.activeBookId=e,Ln())}function uh(e){let t=String(e||"").trim();if(!t)return null;let n=`book_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,o={id:n,name:t,createdAt:Date.now()};return oe.books.push(o),oe.activeBookId=n,Ln(),o}function fh(e){if(oe.books.length<=1)return!1;let t=oe.books.findIndex(o=>o.id===e);if(t<0)return!1;oe.books.splice(t,1);let n=oe.books[0].id;return oe.items.forEach(o=>{o.bookId===e&&(o.bookId=n)}),oe.activeBookId===e&&(oe.activeBookId=n),Ln(),!0}function Sc(e){let t=String(e.word||"").trim(),n=String(e.lang||"en").toLowerCase();if(!t)return null;let o=ji(t,n),r=e.bookId||oe.activeBookId||oe.books[0].id,s=oe.items.find(a=>a.key===o);if(s)return s.bookId=r,e.phonetic&&(s.phonetic=e.phonetic),e.reading&&(s.reading=e.reading),e.briefCn&&(s.briefCn=e.briefCn),e.pos&&(s.pos=e.pos),e.context&&(s.context=e.context),e.audioUrl&&(s.audioUrl=e.audioUrl),s.updatedAt=Date.now(),Ln(),s;let i={id:`w_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,key:o,word:t,lang:n,bookId:r,phonetic:e.phonetic||"",reading:e.reading||"",pos:e.pos||"",briefCn:e.briefCn||"",context:e.context||"",audioUrl:e.audioUrl||"",createdAt:Date.now(),updatedAt:Date.now()};return oe.items.unshift(i),Ln(),i}function Ki(e,t=null){let n=-1;if(t){let o=ji(e,t);n=oe.items.findIndex(r=>r.key===o)}else n=oe.items.findIndex(o=>o.id===e);return n<0?!1:(oe.items.splice(n,1),Ln(),!0)}function ph(e,t){let n=oe.items.find(o=>o.id===e);return!n||!oe.books.some(o=>o.id===t)?!1:(n.bookId=t,n.updatedAt=Date.now(),Ln(),!0)}function dh(){return JSON.stringify(oe,null,2)}function hh(e){let t=JSON.parse(e);if(!t||!Array.isArray(t.books)||!Array.isArray(t.items))throw new Error("\u65E0\u6548\u7684\u751F\u8BCD\u672C JSON \u683C\u5F0F");for(let n of t.books)n?.id&&n?.name&&!oe.books.some(o=>o.id===n.id)&&oe.books.push({id:n.id,name:n.name,createdAt:n.createdAt||Date.now()});for(let n of t.items){if(!n?.word||!n?.lang)continue;let o=ji(n.word,n.lang);if(!oe.items.some(r=>r.key===o)){let r=oe.books.some(s=>s.id===n.bookId)?n.bookId:oe.books[0].id;oe.items.push({...n,key:o,bookId:r})}}return Ln(),oe.items.length}var te=ln({config:J(),vocab:Nc(),popover:{visible:!1,loading:!1,word:"",lang:"en",contextSentence:"",entry:null,activeSourceId:"",sentenceTranslation:"",sentenceLoading:!1,showBookPicker:!1,placement:"below",style:{}},selection:{visible:!1,text:"",lang:"en",translation:"",loading:!1,style:{}},modal:{visible:!1,activeTab:"vocab"}});function qr(){te.config=JSON.parse(JSON.stringify(J()))}function It(){te.vocab=JSON.parse(JSON.stringify(Nc()))}function mh(){Bc(),lh(),qr(),It()}function fo(e="general"){te.modal.activeTab=e,te.modal.visible=!0}function xc(){te.modal.visible=!1}var Tc="tl-option-language-settings",wc="tl-option-vocab-book",Wo=null;function Dy(e){let t=e.getElementById("options");t&&(t.style.display="none")}function gh(e,t,n,o,r){let s=e.createElement("a");return s.id=t,s.className="tl-ignore",s.innerHTML=`<i class="fa-lg fa-solid ${n}"></i><span>${o}</span>`,s.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),Dy(e),fo(r)}),s}function Eh(){let e=ge();e.getElementById("tl-settings-entry")?.remove(),e.getElementById("tl-options-entry")?.remove();let t=e.querySelector("#options .options-content")||e.getElementById("options_content")||e.getElementById("options");return t?(e.getElementById(wc)||t.appendChild(gh(e,wc,"fa-star","\u6211\u7684\u751F\u8BCD\u672C","vocab")),e.getElementById(Tc)||t.appendChild(gh(e,Tc,"fa-language","\u5916\u8BED\u5B66\u4E60\u8BBE\u7F6E","general")),!0):!1}function vh(){if(Oc(),Eh())return;let e=0;Wo=setInterval(()=>{e++,(Eh()||e>=20)&&(clearInterval(Wo),Wo=null)},500)}function Oc(){Wo&&(clearInterval(Wo),Wo=null);let e=ge();e.getElementById(Tc)?.remove(),e.getElementById(wc)?.remove(),e.getElementById("tl-settings-entry")?.remove(),e.getElementById("tl-options-entry")?.remove()}var po=new Map,Vt=new Map,Ko=new Map,Dc="tavern_language_dict_cache_v1",bh=400,Iy=4e3,_h=!1,Cc=null,kt={noun:{abbr:"n.",cn:"\u540D\u8BCD",tone:"noun"},"proper noun":{abbr:"prop.n.",cn:"\u4E13\u6709\u540D\u8BCD",tone:"noun"},verb:{abbr:"v.",cn:"\u52A8\u8BCD",tone:"verb"},adjective:{abbr:"adj.",cn:"\u5F62\u5BB9\u8BCD",tone:"adj"},adverb:{abbr:"adv.",cn:"\u526F\u8BCD",tone:"adv"},pronoun:{abbr:"pron.",cn:"\u4EE3\u8BCD",tone:"other"},preposition:{abbr:"prep.",cn:"\u4ECB\u8BCD",tone:"other"},conjunction:{abbr:"conj.",cn:"\u8FDE\u8BCD",tone:"other"},interjection:{abbr:"int.",cn:"\u611F\u53F9\u8BCD",tone:"other"},article:{abbr:"art.",cn:"\u51A0\u8BCD",tone:"other"},determiner:{abbr:"det.",cn:"\u9650\u5B9A\u8BCD",tone:"other"},particle:{abbr:"part.",cn:"\u52A9\u8BCD",tone:"other"},expression:{abbr:"expr.",cn:"\u60EF\u7528\u8BED",tone:"other"},numeral:{abbr:"num.",cn:"\u6570\u8BCD",tone:"other"},prefix:{abbr:"pref.",cn:"\u524D\u7F00",tone:"other"},suffix:{abbr:"suff.",cn:"\u540E\u7F00",tone:"other"}};function Ke(e){let t=String(e||"").toLowerCase().trim();return kt[t]?kt[t]:t.includes("noun")?kt.noun:t.includes("verb")?kt.verb:t.includes("adj")?kt.adjective:t.includes("adv")?kt.adverb:t.includes("pron")?kt.pronoun:t.includes("prep")?kt.preposition:t.includes("conj")?kt.conjunction:t.includes("interj")?kt.interjection:t.includes("part")?kt.particle:t.includes("expr")?kt.expression:{abbr:e||"\u8BCD\u9879",cn:"",tone:"other"}}function Ic(){if(!_h){_h=!0;try{let e=se().localStorage.getItem(Dc);if(!e)return;let t=JSON.parse(e);if(Array.isArray(t))for(let[n,o]of t)n&&o&&Vt.set(n,o)}catch{}}}function ky(){Cc||(Cc=setTimeout(()=>{Cc=null;try{let e=[...Vt.entries()].slice(-bh);se().localStorage.setItem(Dc,JSON.stringify(e))}catch{}},600))}function yh(e,t){if(Ic(),Vt.has(e)&&Vt.delete(e),Vt.size>=bh){let n=Vt.keys().next().value;Vt.delete(n)}Vt.set(e,t),ky()}function Vy(e,t){return new Promise((n,o)=>{let r=setTimeout(()=>o(new Error("\u8BCD\u5178\u8BF7\u6C42\u8D85\u65F6")),t);e.then(s=>{clearTimeout(r),n(s)},s=>{clearTimeout(r),o(s)})})}function Rt(e){if(!e||!e.id)throw new Error("[TavernLanguage] registerDictionary \u9700\u8981 id \u5B57\u6BB5");return po.set(e.id,e),e}function Xi(e=null){let t=[...po.values()];return e?t.filter(n=>n.languages.includes("*")||n.languages.includes(e)):t}function Nh(e){return po.get(e)||null}function Sh(){Vt.clear(),Ko.clear();try{se().localStorage.removeItem(Dc)}catch{}}function Jr(e){let t=J(),n=ot(e),o=t.dictionaryChains?.[e];return(Array.isArray(o)&&o.length>0?o:n?.defaultDictionaries||["google-dict","wiktionary","ai-context"]).filter(s=>po.has(s))}async function Ry(e){let t=J();if(!t.autoTranslateDict||!e||!Array.isArray(e.meanings))return e;let n=[];for(let o of e.meanings)for(let r of o.definitions||[])!r.cn&&r.text&&n.length<5&&n.push(r);if(n.length===0)return e;try{let o=n.map(i=>i.text).join(`
`),s=(await Pt(o,{from:"en",to:"zh-CN",providerId:t.translator==="tavern-ai"?"google":t.translator})).split(/\r?\n/).map(i=>i.trim());s.length===n.length&&n.forEach((i,a)=>{i.cn=s[a]||""})}catch{}return e}async function Ac(e,t,n){let o=e.id==="ai-context"?15e3:Iy,r=await Vy(e.lookup(t,n),o);return r&&r.meanings&&r.meanings.length>0?(r.sourceId=e.id,r.sourceName=e.name,r):null}function xh(e,t=null){let n=String(e||"").trim();if(!n)return;let o=t||J().targetLang||"en",r=`auto|${o}|${n.toLowerCase()}`;Ic(),!(Vt.has(r)||Ko.has(r))&&Yr(n,{lang:o}).catch(()=>{})}async function Yr(e,t={}){let n=String(e||"").trim();if(!n)return null;Ic();let o=J(),r=t.lang||o.targetLang||"en",s=ot(r),i=t.sourceId||null,a=typeof t.onUpdate=="function"?t.onUpdate:null,l=`${i||"auto"}|${r}|${n.toLowerCase()}`;if(!t.bypassCache&&Vt.has(l)){let f=Vt.get(l);return a&&a(f,!1),f}if(!t.bypassCache&&Ko.has(l)){let f=await Ko.get(l);return f&&a&&a(f,!1),f}let u=(async()=>{let f=i?[i]:Jr(r),c={lang:r,langDef:s,context:t.context||"",config:o},p=i?f:f.filter(v=>v!=="ai-context"||f.length===1),d=null;if(p.length>=2&&!i){let v=p.slice(0,2).map(m=>{let N=po.get(m);return N?Ac(N,n,c).then(A=>{if(!A)throw new Error("empty");return A}):Promise.reject(new Error("missing"))});try{d=await Promise.any(v)}catch{d=null}if(!d&&p.length>2)for(let m of p.slice(2)){let N=po.get(m);if(N)try{if(d=await Ac(N,n,c),d)break}catch{}}}else for(let v of p){let m=po.get(v);if(m)try{if(d=await Ac(m,n,c),d)break}catch(N){console.warn(`[TavernLanguage] \u8BCD\u5178 ${v} \u67E5\u8BCD\u5931\u8D25 (${n}):`,N?.message||N)}}if(d)return a&&a({...d},!1),d.meanings.some(m=>(m.definitions||[]).some(N=>!N.cn&&N.text))&&o.autoTranslateDict&&(await Ry(d),a&&a({...d},!1)),yh(l,d),d;try{let v=await Pt(n,{from:r,to:"zh-CN"});if(v){let m={word:n,phonetic:"",reading:"",audioUrl:"",briefCn:v,tags:[],sourceId:"fallback-translate",sourceName:"\u76F4\u8BD1",meanings:[{pos:"translation",posInfo:{abbr:"\u8BD1",cn:"\u76F4\u8BD1",tone:"other"},definitions:[{text:"",cn:v,example:""}]}]};return yh(l,m),a&&a(m,!1),m}}catch{}return null})();Ko.set(l,u);try{return await u}finally{Ko.delete(l)}}var Jt=null,Qr=null,Zr=null,es=null,kc=0;function zi(){te.popover.visible=!1,te.popover.showBookPicker=!1,Jt&&(Jt.classList.remove("tl-word-active"),Jt=null)}function Py(e){let t=se(),n=ge(),o=t.visualViewport?.width||t.innerWidth,r=t.visualViewport?.height||t.innerHeight,s=10,i=26,a=e.getBoundingClientRect(),l=a.top-i-s,u=r-(a.bottom+i)-s;if(l<210&&u<210){let N=n.getElementById("chat");if(N&&N.scrollHeight>N.clientHeight){let A=Math.round(r*.28),b=a.top-A;N.scrollTop+=b,a=e.getBoundingClientRect()}}let f=Math.max(s,a.top-i),c=Math.min(r-s,a.bottom+i),p=f-s,v=r-c-s>=p?"below":"above",m={};if(v==="below"){let N=Math.min(r-180,Math.round(c+6)),A=Math.max(170,Math.min(400,Math.round(r-N-s-6)));m.top=`${N}px`,m.bottom="auto",m.maxHeight=`${A}px`}else{let N=Math.min(r-180,Math.round(r-f+6)),A=Math.max(170,Math.min(400,Math.round(r-N-s-6)));m.bottom=`${N}px`,m.top="auto",m.maxHeight=`${A}px`}if(o<=640)m.left=`${s}px`,m.right=`${s}px`,m.width="auto";else{let N=Math.min(368,o-s*2),A=Math.max(s,Math.min(a.left+a.width/2-N/2,o-N-s));m.left=`${Math.round(A)}px`,m.right="auto",m.width=`${N}px`}return{placement:v,style:m}}async function Th(e,t=null){let n=e.dataset.tlWord||e.textContent||"",o=e.dataset.tlLang||J().targetLang||"en";if(!n.trim())return;Jt&&Jt!==e&&Jt.classList.remove("tl-word-active"),Jt=e,Jt.classList.add("tl-word-active");let r=Kc(e),{placement:s,style:i}=Py(e),a=++kc,l=te.popover;l.visible=!0,l.loading=!0,l.word=n,l.lang=o,l.contextSentence=r,l.entry=null,l.activeSourceId=t||"",l.sentenceTranslation="",l.sentenceLoading=!1,l.showBookPicker=!1,l.placement=s,l.style=i,!t&&J().autoSpeakWord&&_o(n,{lang:o}).catch(()=>{});let u=await Yr(n,{lang:o,context:r,sourceId:t,onUpdate(f,c){a!==kc||!te.popover.visible||(l.entry=f,l.loading=c,f?.sourceId&&(l.activeSourceId=t||f.sourceId),!t&&J().autoSpeakWord&&f?.audioUrl&&_o(n,{lang:o,audioUrl:f.audioUrl}).catch(()=>{}))}});a!==kc||!te.popover.visible||(l.loading=!1,u&&(l.entry=u,l.activeSourceId=t||u.sourceId||""))}function wh(){Vc();let e=ge();Qr=t=>{if(t.target?.closest?.(".tl-popover, .tl-sel-bar, .tl-modal-backdrop"))return;let n=t.target?.closest?.("span.tl-word");if(n&&J().enabled){if(!eu(t))return;t.stopPropagation(),Th(n);return}te.popover.visible&&zi()},Zr=t=>{if(!J().enabled)return;let n=t.target?.closest?.("span.tl-word");if(!n)return;let o=n.dataset.tlWord||n.textContent||"",r=n.dataset.tlLang||J().targetLang||"en";o.trim()&&xh(o,r)},es=t=>{t.key==="Escape"&&te.popover.visible&&zi()},e.addEventListener("pointerdown",Zr,{passive:!0}),e.addEventListener("click",Qr,!1),e.addEventListener("keydown",es,!1)}function Vc(){zi();let e=ge();Zr&&(e.removeEventListener("pointerdown",Zr),Zr=null),Qr&&(e.removeEventListener("click",Qr,!1),Qr=null),es&&(e.removeEventListener("keydown",es,!1),es=null)}var Oh=at({name:"WordPopover",setup(){let e=te.popover,t=Fe(()=>Jr(e.lang).map(v=>Nh(v)).filter(Boolean)),n=Fe(()=>(te.vocab.items,ch(e.entry?.word||e.word,e.lang))),o=Fe(()=>te.vocab.books||[]);function r(){return e.entry?.word||e.word}function s(){_o(r(),{lang:e.lang,audioUrl:e.entry?.audioUrl||""}).catch(()=>{})}function i(d){d&&Zt(d,{lang:e.lang}).catch(()=>{})}function a(){e.contextSentence&&Zt(e.contextSentence,{lang:e.lang}).catch(()=>{})}async function l(){if(!(!e.contextSentence||e.sentenceLoading)){e.sentenceLoading=!0,e.sentenceTranslation="";try{e.sentenceTranslation=await Pt(e.contextSentence,{from:e.lang,to:"zh-CN"})}catch(d){e.sentenceTranslation=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${d?.message||"\u7F51\u7EDC\u5F02\u5E38"}`}finally{e.sentenceLoading=!1}}}function u(d){Jt&&Th(Jt,d)}function f(d){let v=e.entry?.meanings?.[0],m=v?.definitions?.[0];return{word:r(),lang:e.lang,bookId:d,phonetic:e.entry?.phonetic||"",reading:e.entry?.reading||"",pos:v?.posInfo?.abbr||v?.pos||"",briefCn:e.entry?.briefCn||m?.cn||m?.text||"",context:e.contextSentence||"",audioUrl:e.entry?.audioUrl||""}}function c(){let d=r();if(n.value)Ki(d,e.lang),It(),Se(`\u5DF2\u79FB\u51FA\u751F\u8BCD\u672C\uFF1A${d}`,"info");else{let v=te.vocab.activeBookId;Sc(f(v)),It();let m=o.value.find(N=>N.id===v)?.name||"\u751F\u8BCD\u672C";Se(`\u5DF2\u6536\u85CF\u5230\u300C${m}\u300D`,"success")}}function p(d){Wi(d),Sc(f(d)),It(),e.showBookPicker=!1;let v=o.value.find(m=>m.id===d)?.name||"\u751F\u8BCD\u672C";Se(`\u5DF2\u4FDD\u5B58\u5230\u300C${v}\u300D`,"success")}return{pop:e,sources:t,starredItem:n,books:o,closeWordPopover:zi,onSpeakWord:s,onSpeakExample:i,onSpeakSentence:a,onTranslateSentence:l,onSwitchSource:u,onToggleStar:c,onSaveToBook:p}},template:`
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
  `});var ho=null,ts=null,Xo=null;function Gi(){te.selection.visible=!1,te.selection.text="",te.selection.translation="",te.selection.loading=!1}function My(e){let t=se(),n=t.visualViewport?.width||t.innerWidth,o=t.visualViewport?.height||t.innerHeight,r=10;if(n<=640)return e.top<110?{left:`${r}px`,right:`${r}px`,top:`${Math.min(o-90,Math.round(e.bottom+12))}px`}:{left:`${r}px`,right:`${r}px`,bottom:`${Math.max(r,Math.round(o-e.top+12))}px`};let s=310,i=Math.max(r,Math.min(e.left+e.width/2-s/2,n-s-r));return e.top<110?{left:`${Math.round(i)}px`,top:`${Math.min(o-80,Math.round(e.bottom+10))}px`}:{left:`${Math.round(i)}px`,bottom:`${Math.max(r,Math.round(o-e.top+10))}px`}}function Ly(){if(!J().enabled){Gi();return}let t=se().getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return;let n=t.toString().replace(/\s+/g," ").trim();if(n.length<2)return;let o=t.getRangeAt(0),r=o.commonAncestorContainer.nodeType===1?o.commonAncestorContainer:o.commonAncestorContainer.parentElement;if(!r||!r.closest(".mes_text")||r.closest(".tl-trans-block, .tl-mes-footer"))return;let s=o.getBoundingClientRect();!s||s.width===0&&s.height===0||(te.selection.text=n,te.selection.lang=J().targetLang||"en",te.selection.translation="",te.selection.loading=!1,te.selection.style=My(s),te.selection.visible=!0)}function Ch(){Rc();let e=ge();ho=t=>{t.target?.closest?.(".tl-sel-bar, .tl-popover, .tl-modal-backdrop")||(Xo&&clearTimeout(Xo),Xo=setTimeout(Ly,70))},ts=t=>{te.selection.visible&&!t.target?.closest?.(".tl-sel-bar")&&Gi()},e.addEventListener("mouseup",ho,!1),e.addEventListener("touchend",ho,!1),e.addEventListener("mousedown",ts,!1)}function Rc(){Xo&&(clearTimeout(Xo),Xo=null),Gi();let e=ge();ho&&(e.removeEventListener("mouseup",ho,!1),e.removeEventListener("touchend",ho,!1),ho=null),ts&&(e.removeEventListener("mousedown",ts,!1),ts=null)}var Ah=at({name:"SelectionBar",setup(){let e=te.selection;async function t(){if(!(!e.text||e.loading)){e.loading=!0,e.translation="";try{e.translation=await Pt(e.text,{from:e.lang,to:"zh-CN"})}catch(r){e.translation=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${r?.message||"\u7F51\u7EDC\u5F02\u5E38"}`}finally{e.loading=!1}}}function n(){e.text&&Zt(e.text,{lang:e.lang}).catch(()=>{})}async function o(){try{await se().navigator.clipboard.writeText(e.text),Se("\u5DF2\u590D\u5236\u9009\u4E2D\u6587\u672C","success")}catch{Se("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236","warning")}}return{sel:e,onTranslate:t,onSpeak:n,onCopy:o,closeSelectionBar:Gi}},template:`
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
  `});var Dh=at({name:"VocabBookView",setup(){let e=mt("all"),t=mt("all"),n=mt(""),o=mt(""),r=mt(!1),s=Fe(()=>te.vocab.books||[]),i=Fe(()=>(te.vocab.items||[]).length),a=Fe(()=>te.vocab.activeBookId),l=Fe(()=>Eo()),u=Fe(()=>{let y=n.value.trim().toLowerCase();return(te.vocab.items||[]).filter(g=>!(e.value!=="all"&&g.bookId!==e.value||t.value!=="all"&&g.lang!==t.value||y&&!`${g.word} ${g.briefCn} ${g.reading} ${g.context}`.toLowerCase().includes(y)))});function f(y){return(te.vocab.items||[]).filter(g=>g.bookId===y).length}function c(){let y=o.value.trim();if(!y)return;let g=uh(y);g&&(It(),e.value=g.id,o.value="",r.value=!1,Se(`\u5DF2\u65B0\u5EFA\u5355\u8BCD\u672C\u300C${g.name}\u300D`,"success"))}function p(y){Wi(y),It(),Se("\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u85CF\u5355\u8BCD\u672C","success")}function d(y){if(s.value.length<=1){Se("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u5355\u8BCD\u672C","warning");return}fh(y.id),It(),e.value===y.id&&(e.value="all"),Se(`\u5DF2\u5220\u9664\u300C${y.name}\u300D\uFF0C\u8BCD\u6761\u5DF2\u4FDD\u7559\u5230\u9ED8\u8BA4\u672C`,"info")}function v(y,g){ph(y.id,g.target.value),It(),Se("\u5DF2\u79FB\u52A8\u81F3\u76EE\u6807\u5355\u8BCD\u672C","success")}function m(y){Ki(y.id),It()}function N(y){_o(y.word,{lang:y.lang,audioUrl:y.audioUrl}).catch(()=>{})}function A(y){y.context&&Zt(y.context,{lang:y.lang}).catch(()=>{})}async function b(){try{await se().navigator.clipboard.writeText(dh()),Se("\u751F\u8BCD\u672C JSON \u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F","success")}catch{Se("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u526A\u8D34\u677F\u6743\u9650","warning")}}function E(){let g=se().prompt("\u8BF7\u7C98\u8D34\u4E4B\u524D\u5BFC\u51FA\u7684\u751F\u8BCD\u672C JSON\uFF1A");if(g)try{let O=hh(g);It(),Se(`\u5BFC\u5165\u6210\u529F\uFF0C\u5F53\u524D\u5171 ${O} \u6761\u751F\u8BCD`,"success")}catch(O){Se(`\u5BFC\u5165\u5931\u8D25\uFF1A${O?.message||"\u683C\u5F0F\u9519\u8BEF"}`,"error")}}return{selectedBookId:e,selectedLang:t,searchQuery:n,newBookName:o,showCreateBook:r,books:s,totalCount:i,activeBookId:a,languages:l,filteredItems:u,countByBook:f,onCreateBook:c,onSetDefaultBook:p,onDeleteBook:d,onMoveItem:v,onRemoveItem:m,onSpeakItem:N,onSpeakContext:A,onExport:b,onImport:E}},template:`
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
  `});var $y=["details","blockquote","table","thinking","status",".status-bar","em","strong"],Ih=at({name:"SettingsModal",components:{VocabBookView:Dh},setup(){let e=te.modal,t=ln({enabled:!0,targetLang:"en",theme:"tavern",promptInjection:{enabled:!0,level:"B1",promptText:"",depth:0},dictionaryChains:{},autoTranslateDict:!0,autoSpeakWord:!1,translator:"google",customAi:{baseUrl:"",apiKey:"",model:""},tts:{engine:"auto",rate:1,enAccent:"us"},ui:{showWordUnderline:!0,autoShowMesButtons:!0},excludeText:""});function n(){let b=JSON.parse(JSON.stringify(J()));Object.assign(t,b),t.promptInjection.promptText=oa(b),t.excludeText=Jo(b.excludeSelectors).join(", ")}Ro(()=>e.visible,b=>{b&&n()},{immediate:!0});let o=Fe(()=>Eo()),r=Fe(()=>fs()),s=Fe(()=>ot(t.targetLang)),i=Fe(()=>s.value?.levels||[]),a=Fe(()=>{let b=t.targetLang,E=t.dictionaryChains?.[b];return Array.isArray(E)&&E.length>0?E:Jr(b)}),l=Fe(()=>{let b=Xi(t.targetLang),E=a.value;return[...E.map(y=>b.find(g=>g.id===y)).filter(Boolean),...b.filter(y=>!E.includes(y.id))]});function u(){let b=i.value;b.length&&!b.some(E=>E.id===t.promptInjection.level)&&(t.promptInjection.level=b[1]?.id||b[0].id),t.promptInjection.promptText=Qo(t.targetLang,t.promptInjection.level)}function f(){t.promptInjection.promptText=Qo(t.targetLang,t.promptInjection.level)}function c(){t.promptInjection.promptText=Qo(t.targetLang,t.promptInjection.level)}function p(b){return a.value.includes(b)}function d(b,E){let y=t.targetLang,g=[...a.value];if(E&&!g.includes(b))g.push(b);else if(!E){let O=g.indexOf(b);O>=0&&g.splice(O,1)}t.dictionaryChains={...t.dictionaryChains,[y]:g}}function v(b,E){let y=t.targetLang,g=[...a.value],O=g.indexOf(b),D=O+E;O>=0&&D>=0&&D<g.length&&([g[O],g[D]]=[g[D],g[O]],t.dictionaryChains={...t.dictionaryChains,[y]:g})}function m(b){let E=Jo(t.excludeText);E.includes(b)||(E.push(b),t.excludeText=E.join(", "))}function N(){Sh(),Xc(),Se("\u7F13\u5B58\u5DF2\u6E05\u7406","success")}function A(){let b=JSON.parse(JSON.stringify(t));b.excludeSelectors=Jo(t.excludeText),b.tts.rate=Number(t.tts.rate)||1,delete b.excludeText,ss(b),qr(),xc(),Se("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58","success")}return{VERSION:qo,QUICK_EXCLUDE_CHIPS:$y,modal:e,draft:t,languages:o,translators:r,currentLangDef:s,currentLevels:i,orderedDictionaries:l,closeModal:xc,onLangChange:u,onLevelChange:f,onResetPrompt:c,isDictEnabled:p,toggleDict:d,moveDict:v,addExcludeChip:m,onClearCache:N,onSave:A}},template:`
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
  `});var kh="tl-vue-root",ns=null,$n=null,Fy=at({name:"TavernLanguageRoot",components:{WordPopover:Oh,SelectionBar:Ah,SettingsModal:Ih},template:`
    <WordPopover />
    <SelectionBar />
    <SettingsModal />
  `});function Vh(){Pc();let e=ge();$n=e.createElement("div"),$n.id=kh,$n.className="tl-ignore",e.body.appendChild($n),ns=Mr(Fy),ns.mount($n)}function Pc(){if(ns){try{ns.unmount()}catch{}ns=null}$n&&($n.remove(),$n=null);let e=ge().getElementById(kh);e&&e.remove()}var Rh=/([A-Za-z]+(?:['’][A-Za-z]+)?(?:-[A-Za-z]+)*)/g,cS=bn({code:"en",name:"\u82F1\u8BED",nativeName:"English",bcp47:"en-US",googleCode:"en",wiktionaryLang:"English",youdaoLang:"en",defaultDictionaries:["google-dict","free-dict","wiktionary","ai-context"],levels:[{id:"A2",label:"A2 \u521D\u7EA7",desc:"Use simple A2-level English with short, clear sentences and high-frequency daily vocabulary."},{id:"B1",label:"B1 \u4E2D\u7EA7",desc:"Use natural B1-level intermediate English with everyday expressions and moderate sentence complexity."},{id:"B2",label:"B2 \u4E2D\u9AD8\u7EA7",desc:"Use rich, idiomatic B2-level upper-intermediate English with nuanced phrasing."},{id:"C1",label:"C1 \u9AD8\u7EA7",desc:"Use sophisticated C1-level advanced English with vivid literary vocabulary and natural idioms."},{id:"native",label:"\u6BCD\u8BED\u7EA7",desc:"Use completely natural, authentic native-level English matching the character and setting."}],tokenize(e){let t=[],n=0;Rh.lastIndex=0;let o;for(;(o=Rh.exec(e))!==null;){o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1});let r=o[0];t.push({text:r,lookup:r.replace(/’/g,"'"),isWord:r.length>=1}),n=o.index+r.length}return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: English]","Write your ENTIRE response strictly in English (dialogue, narration, actions, and thoughts). Do not translate into Chinese unless explicitly asked in-character.",(this.levels.find(o=>o.id===e)||this.levels[1]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var Uy=/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u3400-\u4DBFー]/,Ph=/([\u4E00-\u9FFF\u3400-\u4DBF]+[\u3040-\u309F]*|[\u30A0-\u30FFー]+|[\u3040-\u309F]{2,})/g,qi=null;try{typeof Intl<"u"&&typeof Intl.Segmenter=="function"&&(qi=new Intl.Segmenter("ja",{granularity:"word"}))}catch{qi=null}var pS=bn({code:"ja",name:"\u65E5\u8BED",nativeName:"\u65E5\u672C\u8A9E",bcp47:"ja-JP",googleCode:"ja",wiktionaryLang:"Japanese",youdaoLang:"ja",defaultDictionaries:["google-dict","jotoba","wiktionary","ai-context"],levels:[{id:"N5",label:"JLPT N5",desc:"Use beginner JLPT N5-level Japanese with simple grammar and basic everyday words."},{id:"N4",label:"JLPT N4",desc:"Use JLPT N4-level Japanese with clear conversational expressions."},{id:"N3",label:"JLPT N3",desc:"Use natural JLPT N3-level intermediate Japanese suitable for everyday conversation and light fiction."},{id:"N2",label:"JLPT N2",desc:"Use natural JLPT N2-level Japanese with rich expressions and nuanced tone."},{id:"native",label:"\u6BCD\u8BED\u7EA7",desc:"Use completely natural, authentic native Japanese matching the character personality and context."}],tokenize(e){if(qi){let r=[];for(let s of qi.segment(e)){let i=!!(s.isWordLike&&Uy.test(s.segment));r.push({text:s.segment,lookup:s.segment,isWord:i})}return r}let t=[],n=0;Ph.lastIndex=0;let o;for(;(o=Ph.exec(e))!==null;)o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1}),t.push({text:o[0],lookup:o[0],isWord:!0}),n=o.index+o[0].length;return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: Japanese]","Write your ENTIRE response strictly in Japanese (dialogue, narration, actions, and thoughts). Do not include Chinese translations or romaji unless explicitly asked.",(this.levels.find(o=>o.id===e)||this.levels[2]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var Mh="A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0152\u0153\xC6\xE6",Lh=new RegExp(`([${Mh}]+(?:-[${Mh}]+)*)`,"g"),mS=bn({code:"fr",name:"\u6CD5\u8BED",nativeName:"Fran\xE7ais",bcp47:"fr-FR",googleCode:"fr",wiktionaryLang:"French",youdaoLang:"fr",defaultDictionaries:["google-dict","wiktionary","ai-context"],levels:[{id:"A2",label:"A2 \u521D\u7EA7",desc:"Use clear A2-level French with simple sentences and everyday vocabulary."},{id:"B1",label:"B1 \u4E2D\u7EA7",desc:"Use natural B1-level intermediate French with common idiomatic expressions."},{id:"B2",label:"B2 \u4E2D\u9AD8\u7EA7",desc:"Use expressive, idiomatic B2-level French with natural nuance."},{id:"C1",label:"C1 \u9AD8\u7EA7",desc:"Use refined C1-level French with rich literary vocabulary and authentic turns of phrase."},{id:"native",label:"\u6BCD\u8BED\u7EA7",desc:"Use completely authentic, natural native-level French matching the character and atmosphere."}],tokenize(e){let t=[],n=0;Lh.lastIndex=0;let o;for(;(o=Lh.exec(e))!==null;){o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1});let r=o[0];t.push({text:r,lookup:r,isWord:r.length>=1}),n=o.index+r.length}return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: French]","Write your ENTIRE response strictly in French (dialogue, narration, actions, and thoughts). Do not translate into Chinese unless explicitly asked in-character.",(this.levels.find(o=>o.id===e)||this.levels[1]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var vS=Rt({id:"google-dict",name:"\u6781\u901F\u8BCD\u5178",description:"\u5355\u6B21\u8BF7\u6C42\u76F4\u51FA\u8BCD\u6027\u4E0E\u4E2D\u6587\u91CA\u4E49\uFF0C\u54CD\u5E94\u6700\u5FEB\uFF0C\u652F\u6301\u6240\u6709\u8BED\u79CD",languages:["*"],async lookup(e,{lang:t}){let o=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(t||"auto")}&tl=zh-CN&dt=t&dt=bd&dt=rm&q=${encodeURIComponent(e)}`,r=await fetch(o);if(!r.ok)return null;let s=await r.json();if(!Array.isArray(s))return null;let i=Array.isArray(s[0])?s[0].map(u=>Array.isArray(u)?u[0]:"").join("").trim():"",a="";if(Array.isArray(s[0])){for(let u of s[0])if(Array.isArray(u)&&typeof u[3]=="string"&&u[3].trim()){a=u[3].trim();break}}let l=[];if(Array.isArray(s[1]))for(let u of s[1]){if(!Array.isArray(u))continue;let f=u[0]||"",c=Array.isArray(u[1])?u[1].slice(0,6):[];c.length!==0&&l.push({pos:f,posInfo:Ke(f),definitions:[{cn:c.join("\uFF1B"),text:"",example:""}]})}return l.length===0&&i&&l.push({pos:"translation",posInfo:{abbr:"\u8BD1",cn:"\u91CA\u4E49",tone:"other"},definitions:[{cn:i,text:"",example:""}]}),l.length===0?null:{word:e,phonetic:"",reading:t==="ja"?a:"",audioUrl:"",briefCn:i,tags:[],meanings:l}}});var bS=Rt({id:"free-dict",name:"Free Dictionary",description:"\u82F1\u8BED\u6743\u5A01\u5F00\u6E90\u8BCD\u5178\uFF0C\u63D0\u4F9B\u97F3\u6807\u3001\u8BCD\u6027\u3001\u4F8B\u53E5\u4E0E\u771F\u4EBA\u53D1\u97F3",languages:["en"],async lookup(e,{config:t}){let n=e.toLowerCase().replace(/^['’]+|['’]+$/g,""),o=`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(n)}`,r=await fetch(o);if(!r.ok)return null;let s=await r.json();if(!Array.isArray(s)||s.length===0)return null;let i=s[0],a=t?.tts?.enAccent||"us",l=i.phonetic||"",u="",f=Array.isArray(i.phonetics)?i.phonetics:[];for(let p of f)if(!l&&p.text&&(l=p.text),p.audio){let d=p.audio.toLowerCase();if(u||(u=p.audio),a==="uk"&&d.includes("-uk")){u=p.audio,p.text&&(l=p.text);break}if(a==="us"&&d.includes("-us")){u=p.audio,p.text&&(l=p.text);break}}let c=[];for(let p of i.meanings||[]){let d=(p.definitions||[]).slice(0,3).map(v=>({text:v.definition||"",cn:"",example:v.example||""}));d.length>0&&c.push({pos:p.partOfSpeech||"",posInfo:Ke(p.partOfSpeech),definitions:d})}return c.length===0?null:{word:i.word||e,phonetic:l,reading:"",audioUrl:u,briefCn:"",tags:[],meanings:c}}});function By(e){if(!Array.isArray(e)||e.length===0)return{raw:"word",info:Ke("")};let t=e[0],n="";typeof t=="string"?n=t:t&&typeof t=="object"&&(n=Object.keys(t)[0]||"");let o=n.toLowerCase();return o.includes("noun")?{raw:"noun",info:Ke("noun")}:o.includes("verb")||o.includes("godan")||o.includes("ichidan")?{raw:"verb",info:Ke("verb")}:o.includes("adj")?{raw:"adjective",info:Ke("adjective")}:o.includes("adv")?{raw:"adverb",info:Ke("adverb")}:o.includes("part")?{raw:"particle",info:Ke("particle")}:o.includes("expr")?{raw:"expression",info:Ke("expression")}:{raw:n,info:Ke(n)}}var xS=Rt({id:"jotoba",name:"Jotoba",description:"\u65E5\u8BED\u8BCD\u5178\uFF0C\u542B\u5047\u540D\u8BFB\u97F3\u3001\u8BCD\u6027\u4E0E\u53D1\u97F3",languages:["ja"],async lookup(e){let t=await fetch("https://jotoba.de/api/search/words",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:e,language:"English",no_english:!1})});if(!t.ok)return null;let o=(await t.json())?.words;if(!Array.isArray(o)||o.length===0)return null;let r=o.find(c=>c.reading?.kanji===e||c.reading?.kana===e)||o[0],s=r.reading?.kanji||"",i=r.reading?.kana||"",a=r.audio?`https://jotoba.de${r.audio}`:"",l=[];r.common&&l.push("\u5E38\u7528\u8BCD");let u=new Map;for(let c of(r.senses||[]).slice(0,5)){let{raw:p,info:d}=By(c.pos),v=Array.isArray(c.glosses)?c.glosses.slice(0,4).join("; "):"";if(!v)continue;let m=d.abbr||p;u.has(m)||u.set(m,{pos:p,posInfo:d,definitions:[]}),u.get(m).definitions.push({text:v,cn:"",example:""})}let f=[...u.values()];return f.length===0?null:{word:s||i||e,phonetic:"",reading:i&&i!==s?i:"",audioUrl:a,briefCn:"",tags:l,meanings:f}}});function $h(e){return String(e||"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g," ").trim()}var OS=Rt({id:"wiktionary",name:"Wiktionary",description:"\u591A\u8BED\u79CD\u5F00\u6E90\u8BCD\u5178\uFF0C\u8986\u76D6\u82F1/\u65E5/\u6CD5\u53CA\u5C0F\u8BED\u79CD",languages:["*"],async lookup(e,{lang:t,langDef:n}){let o=[e];e!==e.toLowerCase()&&o.push(e.toLowerCase());let r=null,s=e;for(let l of o){let u=`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(l)}`,f=await fetch(u);if(f.ok){r=await f.json(),s=l;break}}if(!r||typeof r!="object")return null;let i=r[t]||r[n?.code]||null;if(!Array.isArray(i)||i.length===0)return null;let a=[];for(let l of i.slice(0,4)){let u=[];for(let f of(l.definitions||[]).slice(0,3)){let c=$h(f.definition);if(!c)continue;let p=Array.isArray(f.examples)&&f.examples[0]?$h(f.examples[0]):"";u.push({text:c,cn:"",example:p})}u.length>0&&a.push({pos:l.partOfSpeech||"",posInfo:Ke(l.partOfSpeech),definitions:u})}return a.length===0?null:{word:s,phonetic:"",reading:"",audioUrl:"",briefCn:"",tags:[n?.nativeName||t],meanings:a}}});async function Hy(e,t){let n=t?.customAi||{};if(n.apiKey&&n.baseUrl&&n.model){let r=`${n.baseUrl.replace(/\/+$/,"")}/chat/completions`,s=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n.apiKey}`},body:JSON.stringify({model:n.model,temperature:.2,messages:[{role:"system",content:'You are a concise multilingual dictionary. Respond ONLY in valid JSON: {"phonetic":"","reading":"","pos":"noun|verb|adjective|adverb|expression|other","briefCn":"","definitions":[{"cn":"","text":"","example":""}]}'},{role:"user",content:e}]})});if(!s.ok)throw new Error(`AI \u8BCD\u5178 HTTP ${s.status}`);return(await s.json())?.choices?.[0]?.message?.content||""}let o=Fn();if(o&&typeof o.generateRaw=="function")return await o.generateRaw({user_input:`${e}

\u8BF7\u4EC5\u8F93\u51FA\u5408\u6CD5 JSON\uFF08\u4E0D\u8981 markdown \u4EE3\u7801\u5757\uFF09\uFF1A{"phonetic":"","reading":"","pos":"noun","briefCn":"","definitions":[{"cn":"","text":"","example":""}]}`,should_stream:!1});throw new Error("\u672A\u914D\u7F6E\u81EA\u5B9A\u4E49 AI \u4E14\u9152\u9986\u5F53\u524D\u4E0D\u652F\u6301 generateRaw")}var IS=Rt({id:"ai-context",name:"AI \u7CBE\u8BB2",description:"\u7ED3\u5408\u5F53\u524D\u53E5\u5B50\u89E3\u6790\u8BCD\u6027\u4E0E\u8BED\u5883\u542B\u4E49",languages:["*"],async lookup(e,{langDef:t,context:n,config:o}){let r=[`Language: ${t?.name||"Foreign"} (${t?.nativeName||""})`,`Word: ${e}`,n?`Sentence context: "${n}"`:"","Give the base form/reading/IPA, part of speech, exact Chinese meaning in this context, a concise explanation, and one short example."].filter(Boolean).join(`
`),s=await Hy(r,o),i=String(s).match(/\{[\s\S]*\}/);if(!i)throw new Error("AI \u8BCD\u5178\u8FD4\u56DE\u683C\u5F0F\u65E0\u6CD5\u89E3\u6790");let a=JSON.parse(i[0]),l=Array.isArray(a.definitions)?a.definitions.slice(0,3).map(u=>({cn:u.cn||"",text:u.text||"",example:u.example||""})):[{cn:a.briefCn||"",text:"",example:""}];return{word:e,phonetic:a.phonetic||"",reading:a.reading||"",audioUrl:"",briefCn:a.briefCn||l[0]?.cn||"",tags:["AI \u8BED\u5883\u89E3\u6790"],meanings:[{pos:a.pos||"expression",posInfo:Ke(a.pos),definitions:l}]}}});var RS=Qt({id:"google",name:"Google \u7FFB\u8BD1",description:"\u514D Key\u3001\u901F\u5EA6\u5FEB",async translate(e,{from:t="auto",to:n="zh-CN"}){let r=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(t==="auto"?"auto":t)}&tl=${encodeURIComponent(n)}&dt=t&q=${encodeURIComponent(e)}`,s=await fetch(r);if(!s.ok)throw new Error(`Google Translate HTTP ${s.status}`);let i=await s.json();if(!Array.isArray(i)||!Array.isArray(i[0]))throw new Error("Google Translate \u8FD4\u56DE\u683C\u5F0F\u5F02\u5E38");return i[0].map(a=>Array.isArray(a)?a[0]:"").join("")}});var LS=Qt({id:"mymemory",name:"MyMemory",description:"\u514D\u8D39\u515C\u5E95\u7FFB\u8BD1",async translate(e,{from:t="en",to:n="zh-CN"}){let o=t==="auto"?"en":t,r=`https://api.mymemory.translated.net/get?q=${encodeURIComponent(e)}&langpair=${encodeURIComponent(o)}|${encodeURIComponent(n)}`,s=await fetch(r);if(!s.ok)throw new Error(`MyMemory HTTP ${s.status}`);let a=(await s.json())?.responseData?.translatedText;if(!a)throw new Error("MyMemory \u672A\u8FD4\u56DE\u8BD1\u6587");return a}});var BS=Qt({id:"custom-ai",name:"\u81EA\u5B9A\u4E49 AI",description:"\u4F7F\u7528\u81EA\u5B9A\u4E49 OpenAI \u517C\u5BB9\u63A5\u53E3\u7FFB\u8BD1",async translate(e,{from:t,to:n="\u7B80\u4F53\u4E2D\u6587",context:o,config:r}){let s=r?.customAi||{};if(!s.apiKey||!s.baseUrl||!s.model)throw new Error("\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u586B\u5199\u81EA\u5B9A\u4E49 AI \u7684 Base URL\u3001API Key \u4E0E\u6A21\u578B\u540D\u79F0");let i=`${s.baseUrl.replace(/\/+$/,"")}/chat/completions`,a=`You are a literary translator. Translate the user's ${t||"foreign"} text into natural, fluent ${n==="zh-CN"?"Simplified Chinese":n}. Preserve tone, emotion, and character voice. Output ONLY the translation without explanation.`,l=o&&o!==e?`Context:
${o}

Translate this text:
${e}`:e,u=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.apiKey}`},body:JSON.stringify({model:s.model,temperature:.2,messages:[{role:"system",content:a},{role:"user",content:l}]})});if(!u.ok)throw new Error(`Custom AI HTTP ${u.status}`);let c=(await u.json())?.choices?.[0]?.message?.content;if(!c)throw new Error("Custom AI \u672A\u8FD4\u56DE\u5185\u5BB9");return c.trim()}}),HS=Qt({id:"tavern-ai",name:"\u9152\u9986 API",description:"\u4F7F\u7528\u9152\u9986\u5F53\u524D\u8FDE\u63A5\u7684\u6A21\u578B\u7FFB\u8BD1",async translate(e,{from:t,to:n="\u7B80\u4F53\u4E2D\u6587"}){let o=Fn();if(!o||typeof o.generateRaw!="function")throw new Error("\u5F53\u524D\u9152\u9986\u52A9\u624B\u7248\u672C\u4E0D\u652F\u6301 generateRaw");let r=`\u8BF7\u5C06\u4EE5\u4E0B${t||"\u5916\u8BED"}\u6587\u672C\u51C6\u786E\u3001\u81EA\u7136\u5730\u7FFB\u8BD1\u6210${n==="zh-CN"?"\u7B80\u4F53\u4E2D\u6587":n}\uFF0C\u4FDD\u7559\u539F\u672C\u7684\u8BED\u6C14\u4E0E\u60C5\u7EEA\u3002\u53EA\u8F93\u51FA\u4E2D\u6587\u8BD1\u6587\uFF0C\u4E0D\u8981\u9644\u52A0\u4EFB\u4F55\u89E3\u91CA\u6216\u5F15\u53F7\uFF1A

${e}`,s=await o.generateRaw({user_input:r,should_stream:!1});if(!s||typeof s!="string")throw new Error("\u9152\u9986 API \u672A\u8FD4\u56DE\u6709\u6548\u8BD1\u6587");return s.trim()}});var zo="__TAVERN_LANG_INSTANCE__",Ji=null;function Fh(){Ji&&(Ji(),Ji=null),vo(),ra(),pa(),Vc(),Rc(),Zc(),Oc(),Pc(),fa(),nu();let e=se();e[zo]?.destroy===Fh&&delete e[zo]}function jy(){let e=ge(),t=["https://translate.googleapis.com","https://api.dictionaryapi.dev","https://en.wiktionary.org","https://jotoba.de"];for(let n of t){let o=`tl-preconnect-${n.replace(/[^a-z0-9]/gi,"")}`;if(e.getElementById(o))continue;let r=e.createElement("link");r.id=o,r.rel="preconnect",r.href=n,r.crossOrigin="anonymous",e.head.appendChild(r)}}function Wy(e={}){let t=se();if(t[zo]&&typeof t[zo].destroy=="function")try{t[zo].destroy()}catch(o){console.warn("[TavernLanguage] \u6E05\u7406\u65E7\u5B9E\u4F8B\u65F6\u51FA\u73B0\u8B66\u544A:",o)}jy(),mh(),tu(),Vh(),Qc(),wh(),Ch(),vh(),sa(),qc(),Ji=Hc(o=>{qr(),Ea(o),sa(),o.enabled?ua({force:!0}):fa()});let n={version:qo,init:Wy,destroy:Fh,openSettings:()=>fo("general"),openVocabBook:()=>fo("vocab"),getConfig:J,updateConfig:ss,registerLanguage:bn,getLanguage:ot,listLanguages:Eo,registerDictionary:Rt,listDictionaries:Xi,lookupWord:Yr,registerTranslator:Qt,listTranslators:fs,translateText:Pt};if(t[zo]=n,!e.silent){let o=ot(J().targetLang)?.name||J().targetLang;Se(`\u5DF2\u52A0\u8F7D v${qo}\uFF08\u5F53\u524D\u8BED\u79CD\uFF1A${o}\uFF09`,"success")}return n}function gx(){fo("general")}function Ex(){fo("vocab")}export{Fh as destroy,Wy as init,gx as openSettings,Ex as openVocabBook,Rt as registerDictionary,bn as registerLanguage,Qt as registerTranslator,qo as version};
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
