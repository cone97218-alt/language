/**
 * Tavern Language v2.2.1 (Vue 3)
 * SillyTavern 酒馆助手沉浸式外语学习插件
 * Repo: https://github.com/cone97218-alt/language
 */
var jh=Object.defineProperty;var Wh=(e,t)=>{for(var n in t)jh(e,n,{get:t[n],enumerable:!0})};function se(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent}catch{}return window}function ge(){return se().document}function Un(){let e=se();return window.TavernHelper||e.TavernHelper||null}function na(){let e=se();return{eventOn:window.eventOn||e.eventOn||null,eventRemoveListener:window.eventRemoveListener||e.eventRemoveListener||null,tavern_events:window.tavern_events||e.tavern_events||null,iframe_events:window.iframe_events||e.iframe_events||null}}function Se(e,t="info"){let n=se(),o=window.toastr||n.toastr;o&&typeof o[t]=="function"?o[t](e,"\u9152\u9986\u5916\u8BED\u5B66\u4E60"):console.log(`[TavernLanguage][${t}] ${e}`)}var Jo="2.2.1",oa="tavern_language_config_v1",Kh=["script","style","noscript","iframe","svg","canvas","audio","video",".tl-ignore",".tl-trans-block",".tl-mes-footer",".tl-word",".tl-popover",".tl-sel-bar",".tl-modal-backdrop","#tl-vue-root"],ss={enabled:!0,targetLang:"en",promptInjection:{enabled:!0,level:"B1",promptText:"",depth:0},theme:"tavern",excludeSelectors:["code","pre","kbd","math","summary","button","input","textarea","select"],dictionaryChains:{en:["google-dict","free-dict","wiktionary","ai-context"],ja:["google-dict","jotoba","wiktionary","ai-context"],fr:["google-dict","wiktionary","ai-context"]},autoTranslateDict:!0,autoSpeakWord:!1,translator:"google",customAi:{baseUrl:"https://api.openai.com/v1",apiKey:"",model:"gpt-4o-mini"},tts:{engine:"auto",rate:1,enAccent:"us"},ui:{showWordUnderline:!0,autoShowMesButtons:!0}};function Eo(e,t){if(!t||typeof t!="object")return e;let n=Array.isArray(e)?[...e]:{...e};for(let o of Object.keys(t)){let r=t[o];r&&typeof r=="object"&&!Array.isArray(r)&&e[o]&&typeof e[o]=="object"&&!Array.isArray(e[o])?n[o]=Eo(e[o],r):r!==void 0&&(n[o]=Array.isArray(r)?[...r]:r)}return n}var Xe=Eo(ss,{}),ra=new Set;function jc(){try{let e=se().localStorage.getItem(oa);if(e){let t=JSON.parse(e);if(Xe=Eo(ss,t),!t._migratedGoogleDict){for(let n of["en","ja","fr"]){let o=Xe.dictionaryChains?.[n];Array.isArray(o)&&!o.includes("google-dict")&&(Xe.dictionaryChains[n]=["google-dict",...o])}Xe._migratedGoogleDict=!0;try{se().localStorage.setItem(oa,JSON.stringify(Xe))}catch{}}}else Xe=Eo(ss,{}),Xe._migratedGoogleDict=!0}catch(e){console.warn("[TavernLanguage] \u8BFB\u53D6\u914D\u7F6E\u5931\u8D25\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u914D\u7F6E:",e),Xe=Eo(ss,{})}return Xe}function J(){return Xe}function is(e){Xe=Eo(Xe,e);try{se().localStorage.setItem(oa,JSON.stringify(Xe))}catch(t){console.warn("[TavernLanguage] \u4FDD\u5B58\u914D\u7F6E\u5931\u8D25:",t)}return ra.forEach(t=>{try{t(Xe)}catch(n){console.error("[TavernLanguage] \u914D\u7F6E\u76D1\u542C\u56DE\u8C03\u5F02\u5E38:",n)}}),Xe}function Wc(e){return ra.add(e),()=>ra.delete(e)}function Yo(e){return Array.isArray(e)?e.map(t=>String(t).trim()).filter(Boolean):String(e||"").split(/[\n,;，；]+/).map(t=>t.trim()).filter(Boolean)}function as(e=Xe){let t=Yo(e.excludeSelectors);return[...new Set([...Kh,...t])]}var Qo=new Map;function Nn(e){if(!e||!e.code)throw new Error("[TavernLanguage] registerLanguage \u9700\u8981\u5305\u542B code \u5B57\u6BB5");return Qo.set(e.code,e),e}function ot(e){return Qo.get(e)||Qo.get("en")||[...Qo.values()][0]||null}function vo(){return[...Qo.values()]}var Kc="tavern-language-immersive-prompt",ls=null;function Zo(e,t){let n=ot(e);return n?n.buildPrompt(t,""):""}function sa(e=J()){let t=String(e.promptInjection?.promptText||"").trim();return t||Zo(e.targetLang,e.promptInjection?.level)}function ia(){if(typeof ls=="function"){try{ls()}catch{}ls=null}let e=Un();if(e&&typeof e.uninjectPrompts=="function")try{e.uninjectPrompts([Kc])}catch{}}function aa(){ia();let e=J();if(!e.enabled||!e.promptInjection?.enabled)return!1;let t=Un();if(!t||typeof t.injectPrompts!="function")return!1;let n=sa(e);if(!n)return!1;try{let o=t.injectPrompts([{id:Kc,role:"system",content:n,position:"in_chat",depth:Number.isFinite(Number(e.promptInjection.depth))?Number(e.promptInjection.depth):0,should_scan:!1}]);return o&&typeof o.uninject=="function"&&(ls=o.uninject),!0}catch(o){return console.warn("[TavernLanguage] injectPrompts \u6CE8\u5165\u5931\u8D25:",o),!1}}function la(e,t){if(!e||e.nodeType!==1)return!1;let n=e.tagName?e.tagName.toLowerCase():"";for(let o of t)if(o){if(/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(o)){if(n===o.toLowerCase())return!0;continue}try{if(e.matches(o))return!0}catch{}}return!1}function us(e,t,n){let o=e.nodeType===1?e:e.parentElement;for(;o&&o!==t;){if(la(o,n))return!0;o=o.parentElement}return!1}function cs(e){if(!e)return;let t=e.querySelectorAll("span.tl-word");for(let n of t){let o=e.ownerDocument.createTextNode(n.textContent||"");n.replaceWith(o)}e.normalize(),delete e.dataset.tlTokenizedLang,delete e.dataset.tlExcludeHash}function Xc(e,t={}){if(!e)return;let n=J();if(!n.enabled){cs(e);return}let o=t.lang||n.targetLang||"en",r=ot(o);if(!r)return;let s=as(n),i=s.join("|");if(!t.force&&e.dataset.tlTokenizedLang===o&&e.dataset.tlExcludeHash===i)return;e.dataset.tlTokenizedLang&&cs(e);let a=e.ownerDocument||ge(),l=a.createTreeWalker(e,4,{acceptNode(c){return!c.nodeValue||!c.nodeValue.trim()||us(c,e,s)?2:1}}),u=[],f;for(;f=l.nextNode();)u.push(f);for(let c of u){let p=r.tokenize(c.nodeValue);if(!p||p.length===0||!p.some(m=>m.isWord))continue;let v=a.createDocumentFragment();for(let m of p)if(m.isWord){let N=a.createElement("span");N.className="tl-word",N.textContent=m.text,N.dataset.tlWord=m.lookup||m.text,N.dataset.tlLang=o,v.appendChild(N)}else v.appendChild(a.createTextNode(m.text));c.replaceWith(v)}e.dataset.tlTokenizedLang=o,e.dataset.tlExcludeHash=i}function zc(e){if(!e)return"";let t=e.closest("p, li, blockquote, div.mes_text, h1, h2, h3, h4, h5, h6")||e.parentElement;if(!t)return e.textContent||"";let n="",o=-1,r=-1,s=t.ownerDocument.createTreeWalker(t,4,{acceptNode(f){return f.parentElement?.closest(".tl-trans-block")?2:1}}),i;for(;i=s.nextNode();){let f=i.nodeValue||"";e.contains(i)&&o===-1&&(o=n.length,r=n.length+f.length),n+=f}if(o===-1)return n.trim();let a=/[.!?。！？\n]/,l=o;for(;l>0&&!a.test(n[l-1]);)l--;let u=r;for(;u<n.length&&!a.test(n[u]);)u++;return u<n.length&&/[.!?。！？]/.test(n[u])&&u++,n.slice(l,u).replace(/\s+/g," ").trim()}var fs=new Map,Bn=new Map,Xh=400;function zh(e,t){if(Bn.size>=Xh){let n=Bn.keys().next().value;Bn.delete(n)}Bn.set(e,t)}function Zt(e){if(!e||!e.id)throw new Error("[TavernLanguage] registerTranslator \u9700\u8981 id \u5B57\u6BB5");return fs.set(e.id,e),e}function ps(){return[...fs.values()]}function Gc(){Bn.clear()}async function Mt(e,t={}){let n=String(e||"").trim();if(!n)return"";let o=J(),r=t.from||o.targetLang||"auto",s=t.to||"zh-CN",i=t.providerId||o.translator||"google",a=`${i}|${r}|${s}|${n}`;if(!t.bypassCache&&Bn.has(a))return Bn.get(a);let l=[i,"google","mymemory"].filter((f,c,p)=>p.indexOf(f)===c&&fs.has(f)),u=null;for(let f of l){let c=fs.get(f);try{let p=await c.translate(n,{from:r,to:s,context:t.context||"",config:o});if(p&&p.trim())return zh(a,p.trim()),p.trim()}catch(p){u=p,console.warn(`[TavernLanguage] \u7FFB\u8BD1\u6E90 ${f} \u5931\u8D25\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A:`,p?.message||p)}}throw u||new Error("\u6240\u6709\u7FFB\u8BD1\u6E90\u5747\u4E0D\u53EF\u7528")}var dt=null,Bt=0;function _o(){if(Bt++,dt){try{dt.onended=null,dt.onerror=null,dt.pause(),dt.currentTime=0}catch{}dt=null}let e=se();if(e.speechSynthesis)try{e.speechSynthesis.cancel()}catch{}}function ds(e,t=1){let n=se().Audio||Audio,o=new n(e);return o.preload="auto",o.playbackRate=Math.max(.5,Math.min(2,t||1)),o}function ca(e,t){return new Promise((n,o)=>{if(t!==Bt){n(!1);return}dt=e,e.onended=()=>{dt===e&&(dt=null),n(!0)},e.onerror=s=>{dt===e&&(dt=null),o(s||new Error("\u97F3\u9891\u64AD\u653E\u5931\u8D25"))};let r=e.play();r&&typeof r.catch=="function"&&r.catch(s=>{dt===e&&(dt=null),o(s)})})}function ua(e,t,n="us"){let o=encodeURIComponent(e);if(t==="en")return`https://dict.youdao.com/dictvoice?audio=${o}&type=${n==="uk"?1:2}`;let s={ja:"jap",fr:"fr",ko:"ko",de:"de",es:"es"}[t]||t;return`https://dict.youdao.com/dictvoice?audio=${o}&le=${encodeURIComponent(s)}`}function Gh(e,t=140){let n=String(e||"").replace(/\s+/g," ").trim();if(!n)return[];if(n.length<=t)return[n];let o=n.split(/(?<=[.!?。！？\n])\s*/).map(s=>s.trim()).filter(Boolean),r=[];for(let s of o){if(s.length<=t){r.length>0&&r[r.length-1].length+1+s.length<=t?r[r.length-1]+=" "+s:r.push(s);continue}let i=s.split(/(?<=[,;，；：—])\s*/).map(l=>l.trim()).filter(Boolean),a="";for(let l of i)if(l.length>t){a&&(r.push(a),a="");let u=l;for(;u.length>t;){let f=u.lastIndexOf(" ",t);f<Math.floor(t*.5)&&(f=t),r.push(u.slice(0,f).trim()),u=u.slice(f).trim()}u&&(a=u)}else a?a.length+1+l.length<=t?a+=" "+l:(r.push(a),a=l):a=l;a&&r.push(a)}return r.filter(Boolean)}function qh(e,t){if(!Array.isArray(e)||e.length===0)return null;let n=t.toLowerCase(),o=n.split("-")[0],r=e.filter(i=>i.lang&&i.lang.toLowerCase().startsWith(o));if(r.length===0)return null;let s=/(natural|neural|google|online|enhanced|premium|wavenet|siri)/i;return r.sort((i,a)=>{let l=i.lang.toLowerCase()===n?2:0,u=a.lang.toLowerCase()===n?2:0,f=s.test(i.name||"")?4:0,c=s.test(a.name||"")?4:0;return u+c-(l+f)}),r[0]}function hs(e,t,n=1,o=Bt){return new Promise((r,s)=>{if(o!==Bt){r(!1);return}let i=se(),a=i.speechSynthesis,l=i.SpeechSynthesisUtterance||window.SpeechSynthesisUtterance;if(!a||!l){s(new Error("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 Web Speech"));return}try{a.cancel()}catch{}let f=ot(t)?.bcp47||t||"en-US",c=new l(e);c.lang=f,c.rate=Math.max(.5,Math.min(2,n||1));let p=a.getVoices?a.getVoices():[],d=qh(p,f);d&&(c.voice=d),c.onend=()=>r(!0),c.onerror=v=>s(v),a.speak(c)})}async function Jh(e,t,n,o,r){if(e.length===0)return;let s=ds(ua(e[0],t,n),o);for(let i=0;i<e.length;i++){if(r!==Bt)return;let a=s;s=i+1<e.length?ds(ua(e[i+1],t,n),o):null;try{await ca(a,r)}catch{if(r!==Bt)return;try{await hs(e[i],t,o,r)}catch{}}}}async function yo(e,t={}){let n=String(e||"").trim();if(!n)return;_o();let o=Bt,r=J(),s=t.lang||r.targetLang||"en",i=t.rate??r.tts?.rate??1;if((r.tts?.engine||"auto")==="webspeech")return hs(n,s,i,o);if(t.audioUrl)try{await ca(ds(t.audioUrl,i),o);return}catch{if(o!==Bt)return}try{let l=ua(n,s,r.tts?.enAccent||"us");await ca(ds(l,i),o);return}catch{if(o!==Bt)return}return hs(n,s,i,o)}async function en(e,t={}){let n=String(e||"").replace(/\s+/g," ").trim();if(!n)return;_o();let o=Bt,r=J(),s=t.lang||r.targetLang||"en",i=t.rate??r.tts?.rate??1;if((r.tts?.engine||"auto")==="webspeech")return hs(n,s,i,o);let l=Gh(n,140);await Jh(l,s,r.tts?.enAccent||"us",i,o)}var er=null;function qc(e){return as(e).filter(t=>t!==".tl-word")}function ms(e,t,n){let o="",r=e.ownerDocument.createTreeWalker(e,4,{acceptNode(i){return i.parentElement?.closest(".tl-trans-block, .tl-mes-footer")||us(i,t,n)?2:1}}),s;for(;s=r.nextNode();)o+=s.nodeValue||"";return o.replace(/\s+/g," ").trim()}function Yh(e,t){let n=[...e.querySelectorAll("p, li, blockquote")].filter(r=>r.closest(".tl-mes-footer, .tl-trans-block")||la(r,t)||us(r,e,t)||r.parentElement?.closest("p, li, blockquote")?!1:ms(r,e,t).length>0);return n.length>0?n:ms(e,e,t)?[e]:[]}async function Qh(e,t){let n=e.querySelector(".mes_text");if(!n)return;let o=[...n.querySelectorAll(".tl-trans-block")];if(o.length>0){let v=o[0].classList.contains("tl-hidden");o.forEach(m=>m.classList.toggle("tl-hidden",!v)),t.classList.toggle("tl-active",v);return}let r=J(),s=qc(r),i=Yh(n,s);if(i.length===0)return;t.classList.add("tl-active"),t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';let a=n.ownerDocument,l=r.targetLang||"en",u=n.querySelector(".tl-mes-footer"),f=i.map(v=>{let m=ms(v,n,s),N=a.createElement("div");return N.className="tl-trans-block tl-trans-loading tl-ignore",N.textContent="\u7FFB\u8BD1\u4E2D...",v===n?u?u.insertAdjacentElement("beforebegin",N):n.appendChild(N):v.insertAdjacentElement("afterend",N),{text:m,transDiv:N}}),c=3,p=0;async function d(){for(;p<f.length;){let v=f[p++];try{let m=await Mt(v.text,{from:l,to:"zh-CN"});v.transDiv.classList.remove("tl-trans-loading"),v.transDiv.textContent=m}catch(m){v.transDiv.classList.remove("tl-trans-loading"),v.transDiv.textContent=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${m?.message||"\u8BF7\u91CD\u8BD5"}`}}}await Promise.all(Array.from({length:Math.min(c,f.length)},()=>d())),t.innerHTML='<i class="fa-solid fa-language"></i>'}function tr(e,t){e.classList.toggle("tl-active",t),e.innerHTML=t?'<i class="fa-solid fa-stop"></i>':'<i class="fa-solid fa-volume-high"></i>'}async function Zh(e,t){if(er===e){_o(),er=null,tr(t,!1);return}let n=e.querySelector(".mes_text");if(!n)return;let o=J(),r=qc(o),s=ms(n,n,r);if(s){e.ownerDocument.querySelectorAll('.tl-footer-icon[data-tl-mes-action="speak"].tl-active').forEach(i=>tr(i,!1)),er=e,tr(t,!0);try{await en(s,{lang:o.targetLang||"en"})}catch{}finally{er===e&&(er=null),tr(t,!1)}}}function Jc(e){e?.querySelectorAll(".tl-mes-btn").forEach(a=>a.remove());let t=J();if(!t.enabled||t.ui?.autoShowMesButtons===!1){e?.querySelector(".tl-mes-footer")?.remove();return}let n=e?.querySelector(".mes_text");if(!n||n.querySelector(".tl-mes-footer")||!n.textContent||!n.textContent.trim())return;let o=e.ownerDocument,r=o.createElement("div");r.className="tl-mes-footer tl-ignore";let s=o.createElement("button");s.type="button",s.className="tl-footer-icon",s.dataset.tlMesAction="translate",s.title="\u53CC\u8BED\u5BF9\u7167",s.innerHTML='<i class="fa-solid fa-language"></i>',s.addEventListener("click",a=>{a.stopPropagation(),Qh(e,s)});let i=o.createElement("button");i.type="button",i.className="tl-footer-icon",i.dataset.tlMesAction="speak",i.title="\u6717\u8BFB",tr(i,!1),i.addEventListener("click",a=>{a.stopPropagation(),Zh(e,i)}),r.appendChild(s),r.appendChild(i),n.appendChild(r)}var nr=null,Hn=null,nn=!1,fa=[];function em(){return[...ge().querySelectorAll("#chat .mes")]}function tm(e,t={}){if(!e)return;let n=e.querySelector(".mes_text");n&&(Xc(n,t),Jc(e))}function pa(e={}){let t=em();for(let n of t)tm(n,e)}function da(){let e=ge();e.querySelectorAll("#chat .mes .mes_text").forEach(t=>cs(t)),e.querySelectorAll("#chat .mes .tl-trans-block").forEach(t=>t.remove()),e.querySelectorAll("#chat .mes .tl-mes-btn").forEach(t=>t.remove()),e.querySelectorAll("#chat .mes .tl-mes-footer").forEach(t=>t.remove())}function tn(e=280){Hn&&clearTimeout(Hn),Hn=setTimeout(()=>{Hn=null,!nn&&J().enabled&&pa()},e)}function Sn(e,t){let{eventOn:n,eventRemoveListener:o}=na();if(!(!n||!e))try{let r=n(e,t);fa.push(()=>{try{r&&typeof r.stop=="function"?r.stop():typeof o=="function"&&o(e,t)}catch{}})}catch{}}function Yc(){ha();let t=ge().getElementById("chat");t&&(nr=new MutationObserver(r=>{if(nn||!J().enabled)return;r.some(i=>{let a=i.target;return!(a?.nodeType===1&&(a.classList?.contains("tl-word")||a.classList?.contains("tl-trans-block")||a.classList?.contains("tl-mes-btn")||a.classList?.contains("tl-mes-footer")||a.closest?.(".tl-popover, .tl-sel-bar, .tl-modal-backdrop, .tl-mes-footer, #tl-vue-root")))})&&tn(320)}),nr.observe(t,{childList:!0,subtree:!0}));let{tavern_events:n,iframe_events:o}=na();n&&(Sn(n.GENERATION_STARTED,()=>{nn=!0}),Sn(n.GENERATION_STOPPED,()=>{nn=!1,tn(200)}),Sn(n.GENERATION_ENDED,()=>{nn=!1,tn(200)}),Sn(n.MESSAGE_RECEIVED,()=>{nn=!1,tn(220)}),Sn(n.MESSAGE_UPDATED,()=>{tn(200)}),Sn(n.MESSAGE_SWIPED,()=>{tn(250)}),Sn(n.CHAT_CHANGED,()=>{nn=!1,tn(350)})),o&&Sn(o.STREAM_TOKEN_RECEIVED_FULLY,()=>{nn=!1,tn(260)}),tn(150)}function ha(){for(Hn&&(clearTimeout(Hn),Hn=null),nr&&(nr.disconnect(),nr=null);fa.length>0;)fa.pop()();nn=!1}var Qc=9,nm=420,om=260,ma=0,ga=0,gs=0,or=!1,Ea=!1,Zc=0,Es=!1,vs=null,_s=null,ys=null,bo=null;function eu(){if(Es)return;let e=ge(),t=se();vs=n=>{n.button&&n.button!==0||(ma=n.clientX,ga=n.clientY,gs=Date.now(),or=!1,Ea=!1)},_s=n=>{if(or)return;let o=n.clientX-ma,r=n.clientY-ga;Math.hypot(o,r)>Qc&&(or=!0)},ys=n=>{n.touches&&n.touches.length>1&&(Ea=!0)},bo=()=>{Zc=Date.now(),or=!0},e.addEventListener("pointerdown",vs,{passive:!0,capture:!0}),e.addEventListener("pointermove",_s,{passive:!0,capture:!0}),e.addEventListener("touchstart",ys,{passive:!0,capture:!0}),t.addEventListener("scroll",bo,{passive:!0,capture:!0}),e.addEventListener("scroll",bo,{passive:!0,capture:!0}),Es=!0}function tu(){if(!Es)return;let e=ge(),t=se();vs&&e.removeEventListener("pointerdown",vs,!0),_s&&e.removeEventListener("pointermove",_s,!0),ys&&e.removeEventListener("touchstart",ys,!0),bo&&(t.removeEventListener("scroll",bo,!0),e.removeEventListener("scroll",bo,!0)),Es=!1}function nu(e){let t=Date.now();if(Ea||or||t-Zc<om||gs>0&&t-gs>nm)return!1;if(e&&typeof e.clientX=="number"&&gs>0){let o=e.clientX-ma,r=e.clientY-ga;if(Math.hypot(o,r)>Qc)return!1}let n=se().getSelection();return!(n&&n.toString().trim().length>0)}var va="tl-injected-styles",rm=`
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
`;function _a(e=J()){let t=ge().documentElement;t&&(t.setAttribute("data-tl-theme",e.theme||"tavern"),t.setAttribute("data-tl-underline",e.ui?.showWordUnderline===!1?"0":"1"))}function ou(){let e=ge(),t=e.getElementById(va);t||(t=e.createElement("style"),t.id=va,e.head.appendChild(t)),t.textContent=rm,_a()}function ru(){let e=ge(),t=e.getElementById(va);t&&t.remove(),e.documentElement.removeAttribute("data-tl-theme"),e.documentElement.removeAttribute("data-tl-underline")}var Fl={};Wh(Fl,{BaseTransition:()=>cl,BaseTransitionPropsValidators:()=>pi,Comment:()=>xe,DeprecationTypes:()=>YE,EffectScope:()=>Gn,ErrorCodes:()=>Km,ErrorTypeStrings:()=>WE,Fragment:()=>Ve,KeepAlive:()=>Ig,ReactiveEffect:()=>an,Static:()=>pn,Suspense:()=>TE,Teleport:()=>lg,Text:()=>Dn,TrackOpTypes:()=>qu,Transition:()=>tv,TransitionGroup:()=>Cv,TriggerOpTypes:()=>Ju,VueElement:()=>xi,assertNumber:()=>Wm,callWithAsyncErrorHandling:()=>vt,callWithErrorHandling:()=>ro,camelize:()=>ce,capitalize:()=>xt,cloneVNode:()=>qt,compatUtils:()=>JE,computed:()=>Fe,createApp:()=>Lr,createBlock:()=>ni,createCommentVNode:()=>zf,createElementBlock:()=>IE,createElementVNode:()=>Sl,createHydrationRenderer:()=>bl,createPropsRestProxy:()=>iE,createRenderer:()=>yl,createSSRApp:()=>Jp,createSlots:()=>Kg,createStaticVNode:()=>PE,createTextVNode:()=>xl,createVNode:()=>ye,customRef:()=>$s,defineAsyncComponent:()=>Ag,defineComponent:()=>at,defineCustomElement:()=>$p,defineEmits:()=>Jg,defineExpose:()=>Yg,defineModel:()=>eE,defineOptions:()=>Qg,defineProps:()=>qg,defineSSRCustomElement:()=>Nv,defineSlots:()=>Zg,devtools:()=>KE,effect:()=>Iu,effectScope:()=>Tu,getCurrentInstance:()=>qe,getCurrentScope:()=>Ba,getCurrentWatcher:()=>Yu,getTransitionRawChildren:()=>Ar,guardReactiveProps:()=>Xf,h:()=>wl,handleError:()=>so,hasInjectionContext:()=>ng,hydrate:()=>Wv,hydrateOnIdle:()=>Sg,hydrateOnInteraction:()=>Og,hydrateOnMediaQuery:()=>wg,hydrateOnVisible:()=>Tg,initCustomFormatter:()=>rp,initDirectivesForSSR:()=>Kv,inject:()=>vf,isMemoSame:()=>sp,isProxy:()=>qn,isReactive:()=>ht,isReadonly:()=>tt,isRef:()=>Ne,isRuntimeOnly:()=>Zf,isShallow:()=>$e,isVNode:()=>hn,markRaw:()=>Ms,mergeDefaults:()=>rE,mergeModels:()=>sE,mergeProps:()=>Gf,nextTick:()=>Cr,nodeOps:()=>Ap,normalizeClass:()=>Xn,normalizeProps:()=>gu,normalizeStyle:()=>Kn,onActivated:()=>kg,onBeforeMount:()=>Pg,onBeforeUnmount:()=>pl,onBeforeUpdate:()=>fl,onDeactivated:()=>Vg,onErrorCaptured:()=>Fg,onMounted:()=>Ir,onRenderTracked:()=>$g,onRenderTriggered:()=>Lg,onScopeDispose:()=>Oo,onServerPrefetch:()=>Mg,onUnmounted:()=>dl,onUpdated:()=>di,onWatcherCleanup:()=>Ka,openBlock:()=>Tr,patchProp:()=>Lp,popScopeId:()=>Qm,provide:()=>tg,proxyRefs:()=>mr,pushScopeId:()=>Ym,queuePostFlushCb:()=>Gt,reactive:()=>cn,readonly:()=>dr,ref:()=>gt,registerRuntimeCompiler:()=>Tl,render:()=>qp,renderList:()=>Wg,renderSlot:()=>Xg,resolveComponent:()=>Bg,resolveDirective:()=>jg,resolveDynamicComponent:()=>Hg,resolveFilter:()=>qE,resolveTransitionHooks:()=>to,setBlockTracking:()=>wr,setDevtoolsHook:()=>XE,setTransitionHooks:()=>At,shallowReactive:()=>Rs,shallowReadonly:()=>Bu,shallowRef:()=>Ls,ssrContextKey:()=>_f,ssrUtils:()=>GE,stop:()=>ku,toDisplayString:()=>Oa,toHandlerKey:()=>rn,toHandlers:()=>zg,toRaw:()=>Q,toRef:()=>Xu,toRefs:()=>Ku,toValue:()=>Wu,transformVNodeArgs:()=>VE,triggerRef:()=>ju,unref:()=>Jn,useAttrs:()=>oE,useCssModule:()=>Tv,useCssVars:()=>iv,useHost:()=>Fp,useId:()=>ug,useModel:()=>uE,useSSRContext:()=>yf,useShadowRoot:()=>xv,useSlots:()=>nE,useTemplateRef:()=>fg,useTransitionState:()=>fi,vModelCheckbox:()=>Ll,vModelDynamic:()=>Wp,vModelRadio:()=>$l,vModelSelect:()=>Hp,vModelText:()=>wi,vShow:()=>Rp,version:()=>ip,warn:()=>vi,watch:()=>Po,watchEffect:()=>og,watchPostEffect:()=>rg,watchSyncEffect:()=>bf,withAsyncContext:()=>aE,withCtx:()=>ll,withDefaults:()=>tE,withDirectives:()=>eg,withKeys:()=>jv,withMemo:()=>jE,withModifiers:()=>Bv,withScopeId:()=>Zm});function Ue(e){let t=Object.create(null);for(let n of e.split(","))t[n]=1;return n=>n in t}var ee={},xn=[],De=()=>{},Tn=()=>!1,Ht=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),No=e=>e.startsWith("onUpdate:"),q=Object.assign,rr=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},sm=Object.prototype.hasOwnProperty,le=(e,t)=>sm.call(e,t),H=Array.isArray,on=e=>jn(e)==="[object Map]",St=e=>jn(e)==="[object Set]",su=e=>jn(e)==="[object Date]",fu=e=>jn(e)==="[object RegExp]",Z=e=>typeof e=="function",z=e=>typeof e=="string",Ae=e=>typeof e=="symbol",ie=e=>e!==null&&typeof e=="object",bs=e=>(ie(e)||Z(e))&&Z(e.then)&&Z(e.catch),pu=Object.prototype.toString,jn=e=>pu.call(e),ba=e=>jn(e).slice(8,-1),So=e=>jn(e)==="[object Object]",sr=e=>z(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Lt=Ue(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Na=Ue("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),im=1e4,Ns=e=>{let t=Object.create(null),n=0;return(o=>{let r=t[o];return r!==void 0?r:(++n>im&&(t=Object.create(null),n=1),t[o]=e(o))})},am=/-\w/g,ce=Ns(e=>e.replace(am,t=>t.slice(1).toUpperCase())),lm=/\B([A-Z])/g,ze=Ns(e=>e.replace(lm,"-$1").toLowerCase()),xt=Ns(e=>e.charAt(0).toUpperCase()+e.slice(1)),rn=Ns(e=>e?`on${xt(e)}`:""),Ie=(e,t)=>!Object.is(e,t),wn=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},Ss=(e,t,n,o=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:o,value:n})},Wn=e=>{let t=parseFloat(e);return isNaN(t)?e:t},xo=e=>{let t=z(e)?Number(e):NaN;return isNaN(t)?e:t},iu,ir=()=>iu||(iu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function du(e,t){return e+JSON.stringify(t,(n,o)=>typeof o=="function"?o.toString():o)}var cm="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol",hu=Ue(cm);var au=2;function mu(e,t=0,n=e.length){if(t=Math.max(0,Math.min(t,e.length)),n=Math.max(0,Math.min(n,e.length)),t>n)return"";let o=e.split(/(\r?\n)/),r=o.filter((a,l)=>l%2===1);o=o.filter((a,l)=>l%2===0);let s=0,i=[];for(let a=0;a<o.length;a++)if(s+=o[a].length+(r[a]&&r[a].length||0),s>=t){for(let l=a-au;l<=a+au||n>s;l++){if(l<0||l>=o.length)continue;let u=l+1;i.push(`${u}${" ".repeat(Math.max(3-String(u).length,0))}|  ${o[l]}`);let f=o[l].length,c=r[l]&&r[l].length||0;if(l===a){let p=t-(s-(f+c)),d=Math.max(1,n>s?f-p:n-t);i.push("   |  "+" ".repeat(p)+"^".repeat(d))}else if(l>a){if(n>s){let p=Math.max(Math.min(n-s,f),1);i.push("   |  "+"^".repeat(p))}s+=f+c}}break}return i.join(`
`)}function Kn(e){if(H(e)){let t={};for(let n=0;n<e.length;n++){let o=e[n],r=z(o)?Sa(o):Kn(o);if(r)for(let s in r)t[s]=r[s]}return t}else if(z(e)||ie(e))return e}var um=/;(?![^(]*\))/g,fm=/:([^]+)/,pm=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function Sa(e){let t={};return e.replace(pm,n=>n.startsWith("/*")?"":n).split(um).forEach(n=>{if(n){let o=n.split(fm);o.length>1&&(t[o[0].trim()]=o[1].trim())}}),t}function Xn(e){let t="";if(z(e))t=e;else if(H(e))for(let n=0;n<e.length;n++){let o=Xn(e[n]);o&&(t+=o+" ")}else if(ie(e))for(let n in e)e[n]&&(t+=n+" ");return t.trim()}function gu(e){if(!e)return null;let{class:t,style:n}=e;return t&&!z(t)&&(e.class=Xn(t)),n&&(e.style=Kn(n)),e}var dm="html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot",hm="svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view",mm="annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics",gm="area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr",xa=Ue(dm),Ta=Ue(hm),wa=Ue(mm),Eu=Ue(gm),vu="itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly",_u=Ue(vu),Em=Ue(vu+",async,autofocus,autoplay,controls,default,defer,disabled,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");function xs(e){return!!e||e===""}function vm(e,t,n){if(e.length!==t.length)return!1;let o=!0;for(let r=0;o&&r<e.length;r++)o=rt(e[r],t[r],n);return o}function lu(e,t,n){if(e.size!==t.size)return!1;let o=Array.from(t),r=new Uint8Array(o.length);for(let s of e){let i=-1;for(let a=0;a<o.length;a++)if(!r[a]&&rt(s,o[a],n)){i=a;break}if(i<0)return!1;r[i]=1}return!0}function _m(e,t,n){let o=on(e),r=on(t);if(o||r||(o=St(e),r=St(t),o||r))return o&&r?lu(e,t,n):!1;let s=Object.keys(e).length,i=Object.keys(t).length;if(s!==i)return!1;for(let a in e){let l=le(e,a),u=le(t,a);if(l&&!u||!l&&u||!rt(e[a],t[a],n))return!1}return uu(e)===uu(t)}function cu(e,t,n,o){n||(n=[new Map,new Map]);let[r,s]=n;if(r.has(e)||s.has(t))return r.get(e)===t&&s.get(t)===e;r.set(e,t),s.set(t,e);let i=o(e,t,n);return r.delete(e),s.delete(t),i}function rt(e,t,n){if(e===t)return!0;let o=su(e),r=su(t);return o||r?o&&r?e.getTime()===t.getTime():!1:(o=Ae(e),r=Ae(t),o||r?e===t:(o=H(e),r=H(t),o||r?o&&r?cu(e,t,n,vm):!1:(o=ie(e),r=ie(t),o||r?!o||!r?!1:cu(e,t,n,_m):String(e)===String(t))))}function ar(e,t){return e.findIndex(n=>rt(n,t))}function uu(e){return Object.getPrototypeOf(e)===null&&e[Symbol.toPrimitive]==null&&typeof e.toString!="function"&&typeof e.valueOf!="function"?jn(e):String(e)}var yu=e=>!!(e&&e.__v_isRef===!0),Oa=e=>z(e)?e:e==null?"":H(e)||ie(e)&&(e.toString===pu||!Z(e.toString))?yu(e)?Oa(e.value):JSON.stringify(e,bu,2):String(e),bu=(e,t)=>yu(t)?bu(e,t.value):on(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[o,r],s)=>(n[ya(o,s)+" =>"]=r,n),{})}:St(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>ya(n))}:Ae(t)?ya(t):ie(t)&&!H(t)&&!So(t)?String(t):t,ya=(e,t="")=>{var n;return Ae(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};function Ca(e){return e==null?"initial":typeof e=="string"?e===""?" ":e:(typeof e!="number"||Number.isFinite(e),String(e))}function ym(e,...t){console.warn(`[Vue warn] ${e}`,...t)}var ke,Gn=class{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&ke&&(ke.active?(this.parent=ke,this.index=(ke.scopes||(ke.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes){let o=this.scopes.slice();for(t=0,n=o.length;t<n;t++)o[t].pause()}for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes){let r=this.scopes.slice();for(t=0,n=r.length;t<n;t++)r[t].resume()}let o=this.effects.slice();for(t=0,n=o.length;t<n;t++)o[t].resume()}}run(t){if(this._active){let n=ke;try{return ke=this,t()}finally{ke=n}}}on(){++this._on===1&&(this.prevScope=ke,ke=this)}off(){if(this._on>0&&--this._on===0){if(ke===this)ke=this.prevScope;else{let t=ke;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,o;for(n=0,o=this.effects.length;n<o;n++)this.effects[n].stop();for(this.effects.length=0,n=0,o=this.cleanups.length;n<o;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){let r=this.scopes.slice();for(n=0,o=r.length;n<o;n++)r[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){let r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}};function Tu(e){return new Gn(e)}function Ba(){return ke}function Oo(e,t=!1){ke&&(ke.active?ke.cleanups.push(e):e())}var ve;var Aa=new WeakSet,an=class{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ke&&(ke.active?ke.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Aa.has(this)&&(Aa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Ou(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Nu(this),Cu(this);let t=ve,n=$t;ve=this,$t=!0;try{return this.fn()}finally{Au(this),ve=t,$t=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Wa(t);this.deps=this.depsTail=void 0,Nu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Aa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ka(this)&&this.run()}get dirty(){return ka(this)}},wu=0,cr,ur;function Ou(e,t=!1){if(e.flags|=8,t){e.next=ur,ur=e;return}e.next=cr,cr=e}function Ha(){wu++}function ja(){if(--wu>0)return;if(ur){let t=ur;for(ur=void 0;t;){let n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;cr;){let t=cr;for(cr=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(o){e||(e=o)}t=n}}if(e)throw e}function Cu(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Au(e){let t,n=e.depsTail,o=n;for(;o;){let r=o.prevDep;o.version===-1?(o===n&&(n=r),Wa(o),bm(o)):t=o,o.dep.activeLink=o.prevActiveLink,o.prevActiveLink=void 0,o=r}e.deps=t,e.depsTail=n}function ka(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Du(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Du(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===fr)||(e.globalVersion=fr,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!ka(e))))return;e.flags|=2;let t=e.dep,n=ve,o=$t;ve=e,$t=!0;try{Cu(e);let r=e.fn(e._value);(t.version===0||Ie(r,e._value))&&(e.flags|=128,e._value=r,t.version++)}catch(r){throw t.version++,r}finally{ve=n,$t=o,Au(e),e.flags&=-3}}function Wa(e,t=!1){let{dep:n,prevSub:o,nextSub:r}=e;if(o&&(o.nextSub=r,e.prevSub=void 0),r&&(r.prevSub=o,e.nextSub=void 0),n.subs===e&&(n.subs=o,!o&&n.computed)){n.computed.flags&=-5;for(let s=n.computed.deps;s;s=s.nextDep)Wa(s,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function bm(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}function Iu(e,t){e.effect instanceof an&&(e=e.effect.fn);let n=new an(e);t&&q(n,t);try{n.run()}catch(r){throw n.stop(),r}let o=n.run.bind(n);return o.effect=n,o}function ku(e){e.effect.stop()}var $t=!0,Vu=[];function Tt(){Vu.push($t),$t=!1}function wt(){let e=Vu.pop();$t=e===void 0?!0:e}function Nu(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let n=ve;ve=void 0;try{t()}finally{ve=n}}}var fr=0,Va=class{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},wo=class{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!ve||!$t||ve===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==ve)n=this.activeLink=new Va(ve,this),ve.deps?(n.prevDep=ve.depsTail,ve.depsTail.nextDep=n,ve.depsTail=n):ve.deps=ve.depsTail=n,Ru(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){let o=n.nextDep;o.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=o),n.prevDep=ve.depsTail,n.nextDep=void 0,ve.depsTail.nextDep=n,ve.depsTail=n,ve.deps===n&&(ve.deps=o)}return n}trigger(t){this.version++,fr++,this.notify(t)}notify(t){Ha();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{ja()}}};function Ru(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let o=t.deps;o;o=o.nextDep)Ru(o)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Cs=new WeakMap,zn=Symbol(""),Ra=Symbol(""),pr=Symbol("");function Be(e,t,n){if($t&&ve){let o=Cs.get(e);o||Cs.set(e,o=new Map);let r=o.get(n);r||(o.set(n,r=new wo),r.map=o,r.key=n),r.track()}}function Wt(e,t,n,o,r,s){let i=Cs.get(e);if(!i){fr++;return}let a=l=>{l&&l.trigger()};if(Ha(),t==="clear")i.forEach(a);else{let l=H(e),u=l&&sr(n);if(l&&n==="length"){let f=Number(o);i.forEach((c,p)=>{(p==="length"||p===pr||!Ae(p)&&p>=f)&&a(c)})}else switch((n!==void 0||i.has(void 0))&&a(i.get(n)),u&&a(i.get(pr)),t){case"add":l?u&&a(i.get("length")):(a(i.get(zn)),on(e)&&a(i.get(Ra)));break;case"delete":l||(a(i.get(zn)),on(e)&&a(i.get(Ra)));break;case"set":on(e)&&a(i.get(zn));break}}ja()}function Nm(e,t){let n=Cs.get(e);return n&&n.get(t)}function To(e){let t=Q(e);return t===e||(Be(t,"iterate",pr),$e(e))?t:tt(e)?ht(e)?t.map(n=>ln(mt(n))):t.map(ln):t.map(mt)}function hr(e){return Be(e=Q(e),"iterate",pr),e}function jt(e,t){return tt(e)?ln(ht(e)?mt(t):t):mt(t)}var Sm={__proto__:null,[Symbol.iterator](){return Da(this,Symbol.iterator,e=>jt(this,e))},concat(...e){return To(this).concat(...e.map(t=>H(t)?To(t):t))},entries(){return Da(this,"entries",e=>(e[1]=jt(this,e[1]),e))},every(e,t){return sn(this,"every",e,t,void 0,arguments)},filter(e,t){return sn(this,"filter",e,t,n=>n.map(o=>jt(this,o)),arguments)},find(e,t){return sn(this,"find",e,t,n=>jt(this,n),arguments)},findIndex(e,t){return sn(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return sn(this,"findLast",e,t,n=>jt(this,n),arguments)},findLastIndex(e,t){return sn(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return sn(this,"forEach",e,t,void 0,arguments)},includes(...e){return Ia(this,"includes",e)},indexOf(...e){return Ia(this,"indexOf",e)},join(e){return To(this).join(e)},lastIndexOf(...e){return Ia(this,"lastIndexOf",e)},map(e,t){return sn(this,"map",e,t,void 0,arguments)},pop(){return lr(this,"pop")},push(...e){return lr(this,"push",e)},reduce(e,...t){return xu(this,"reduce",e,t)},reduceRight(e,...t){return xu(this,"reduceRight",e,t)},shift(){return lr(this,"shift")},some(e,t){return sn(this,"some",e,t,void 0,arguments)},splice(...e){return lr(this,"splice",e)},toReversed(){return To(this).toReversed()},toSorted(e){return To(this).toSorted(e)},toSpliced(...e){return To(this).toSpliced(...e)},unshift(...e){return lr(this,"unshift",e)},values(){return Da(this,"values",e=>jt(this,e))}};function Da(e,t,n){let o=hr(e),r=o[t],s=r.call(o);if(o!==e&&!$e(e)){if(s[Symbol.toStringTag]==="Array Iterator"){let i=Object.create(Object.getPrototypeOf(s));return i.next=()=>Su(s.next(),n),r!==Pu[t]&&Object.defineProperties(i,{return:{get(){let a=s.return;return typeof a=="function"?a.bind(s):a}},throw:{get(){let a=s.throw;return typeof a=="function"?a.bind(s):a}}}),i}s._next=s.next,s.next=()=>Su(s._next(),n)}return s}function Su(e,t){return e.done||(e.value=t(e.value)),e}var Pu=Array.prototype;function sn(e,t,n,o,r,s){let i=hr(e),a=i!==e&&!$e(e),l=i[t];if(l!==Pu[t]){let c=l.apply(e,s);return a?mt(c):c}let u=n;i!==e&&(a?u=function(c,p){return n.call(this,jt(e,c),p,e)}:n.length>2&&(u=function(c,p){return n.call(this,c,p,e)}));let f=l.call(i,u,o);return a&&r?r(f):f}function xu(e,t,n,o){let r=hr(e),s=r!==e&&!$e(e),i=n,a=!1;r!==e&&(s?(a=o.length===0,i=function(u,f,c){return a&&(a=!1,u=jt(e,u)),n.call(this,u,jt(e,f),c,e)}):n.length>3&&(i=function(u,f,c){return n.call(this,u,f,c,e)}));let l=r[t](i,...o);return a?jt(e,l):l}function Ia(e,t,n){let o=Q(e);Be(o,"iterate",pr);let r=o[t](...n);return(r===-1||r===!1)&&qn(n[0])?(n[0]=Q(n[0]),o[t](...n)):r}function lr(e,t,n=[]){Tt(),Ha();let o=Q(e)[t].apply(e,n);return ja(),wt(),o}var xm=Ue("__proto__,__v_isRef,__isVue"),Mu=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Ae));function Tm(e){Ae(e)||(e=String(e));let t=Q(this);return Be(t,"has",e),t.hasOwnProperty(e)}var As=class{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,o){if(n==="__v_skip")return t.__v_skip;let r=this._isReadonly,s=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return s;if(n==="__v_raw")return o===(r?s?Uu:Fu:s?$u:Lu).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(o)?t:void 0;let i=H(t);if(!r){let l;if(i&&(l=Sm[n]))return l;if(n==="hasOwnProperty")return Tm}let a=Reflect.get(t,n,Ne(t)?t:o);if((Ae(n)?Mu.has(n):xm(n))||(r||Be(t,"get",n),s))return a;if(Ne(a)){let l=i&&sr(n)?a:a.value;return r&&ie(l)?dr(l):l}return ie(a)?r?dr(a):cn(a):a}},Ds=class extends As{constructor(t=!1){super(!1,t)}set(t,n,o,r){let s=t[n],i=H(t)&&sr(n);if(!this._isShallow){let u=tt(s);if(!$e(o)&&!tt(o)&&(s=Q(s),o=Q(o)),!i&&Ne(s)&&!Ne(o))return u||(s.value=o),!0}let a=i?Number(n)<t.length:le(t,n),l=Reflect.set(t,n,o,Ne(t)?t:r);return t===Q(r)&&l&&(a?Ie(o,s)&&Wt(t,"set",n,o,s):Wt(t,"add",n,o)),l}deleteProperty(t,n){let o=le(t,n),r=t[n],s=Reflect.deleteProperty(t,n);return s&&o&&Wt(t,"delete",n,void 0,r),s}has(t,n){let o=Reflect.has(t,n);return(!Ae(n)||!Mu.has(n))&&Be(t,"has",n),o}ownKeys(t){return Be(t,"iterate",H(t)?"length":zn),Reflect.ownKeys(t)}},Is=class extends As{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}},wm=new Ds,Om=new Is,Cm=new Ds(!0),Am=new Is(!0),Pa=e=>e,Ts=e=>Reflect.getPrototypeOf(e);function Dm(e,t,n){return function(...o){let r=this.__v_raw,s=Q(r),i=on(s),a=e==="entries"||e===Symbol.iterator&&i,l=e==="keys"&&i,u=r[e](...o),f=n?Pa:t?ln:mt;return!t&&Be(s,"iterate",l?Ra:zn),q(Object.create(u),{next(){let{value:c,done:p}=u.next();return p?{value:c,done:p}:{value:a?[f(c[0]),f(c[1])]:f(c),done:p}}})}}function ws(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function Im(e,t){let n={get(r){let s=this.__v_raw,i=Q(s),a=Q(r);e||(Ie(r,a)&&Be(i,"get",r),Be(i,"get",a));let{has:l}=Ts(i),u=t?Pa:e?ln:mt;if(l.call(i,r))return u(s.get(r));if(l.call(i,a))return u(s.get(a));s!==i&&s.get(r)},get size(){let r=this.__v_raw;return!e&&Be(Q(r),"iterate",zn),r.size},has(r){let s=this.__v_raw,i=Q(s),a=Q(r);return e||(Ie(r,a)&&Be(i,"has",r),Be(i,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){let i=this,a=i.__v_raw,l=Q(a),u=t?Pa:e?ln:mt;return!e&&Be(l,"iterate",zn),a.forEach((f,c)=>r.call(s,u(f),u(c),i))}};return q(n,e?{add:ws("add"),set:ws("set"),delete:ws("delete"),clear:ws("clear")}:{add(r){let s=Q(this),i=Ts(s),a=Q(r),l=!t&&!$e(r)&&!tt(r)?a:r;return i.has.call(s,l)||Ie(r,l)&&i.has.call(s,r)||Ie(a,l)&&i.has.call(s,a)||(s.add(l),Wt(s,"add",l,l)),this},set(r,s){!t&&!$e(s)&&!tt(s)&&(s=Q(s));let i=Q(this),{has:a,get:l}=Ts(i),u=a.call(i,r);u||(r=Q(r),u=a.call(i,r));let f=l.call(i,r);return i.set(r,s),u?Ie(s,f)&&Wt(i,"set",r,s,f):Wt(i,"add",r,s),this},delete(r){let s=Q(this),{has:i,get:a}=Ts(s),l=i.call(s,r);l||(r=Q(r),l=i.call(s,r));let u=a?a.call(s,r):void 0,f=s.delete(r);return l&&Wt(s,"delete",r,void 0,u),f},clear(){let r=Q(this),s=r.size!==0,i=void 0,a=r.clear();return s&&Wt(r,"clear",void 0,void 0,i),a}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=Dm(r,e,t)}),n}function Vs(e,t){let n=Im(e,t);return(o,r,s)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_isShallow"?t:r==="__v_raw"?o:Reflect.get(le(n,r)&&r in o?n:o,r,s)}var km={get:Vs(!1,!1)},Vm={get:Vs(!1,!0)},Rm={get:Vs(!0,!1)},Pm={get:Vs(!0,!0)};var Lu=new WeakMap,$u=new WeakMap,Fu=new WeakMap,Uu=new WeakMap;function Mm(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function cn(e){return tt(e)?e:Ps(e,!1,wm,km,Lu)}function Rs(e){return Ps(e,!1,Cm,Vm,$u)}function dr(e){return Ps(e,!0,Om,Rm,Fu)}function Bu(e){return Ps(e,!0,Am,Pm,Uu)}function Ps(e,t,n,o,r){if(!ie(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let s=r.get(e);if(s)return s;let i=Mm(ba(e));if(i===0)return e;let a=new Proxy(e,i===2?o:n);return r.set(e,a),a}function ht(e){return tt(e)?ht(e.__v_raw):!!(e&&e.__v_isReactive)}function tt(e){return!!(e&&e.__v_isReadonly)}function $e(e){return!!(e&&e.__v_isShallow)}function qn(e){return e?!!e.__v_raw:!1}function Q(e){let t=e&&e.__v_raw;return t?Q(t):e}function Ms(e){return!le(e,"__v_skip")&&Object.isExtensible(e)&&Ss(e,"__v_skip",!0),e}var mt=e=>ie(e)?cn(e):e,ln=e=>ie(e)?dr(e):e;function Ne(e){return e?e.__v_isRef===!0:!1}function gt(e){return Hu(e,!1)}function Ls(e){return Hu(e,!0)}function Hu(e,t){return Ne(e)?e:new Ma(e,t)}var Ma=class{constructor(t,n){this.dep=new wo,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:Q(t),this._value=n?t:mt(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){let n=this._rawValue,o=this.__v_isShallow||$e(t)||tt(t);t=o?t:Q(t),Ie(t,n)&&(this._rawValue=t,this._value=o?t:mt(t),this.dep.trigger())}};function ju(e){e.dep&&e.dep.trigger()}function Jn(e){return Ne(e)?e.value:e}function Wu(e){return Z(e)?e():Jn(e)}var Lm={get:(e,t,n)=>t==="__v_raw"?e:Jn(Reflect.get(e,t,n)),set:(e,t,n,o)=>{let r=e[t];return Ne(r)&&!Ne(n)?(r.value=n,!0):Reflect.set(e,t,n,o)}};function mr(e){return ht(e)?e:new Proxy(e,Lm)}var La=class{constructor(t){this.__v_isRef=!0,this._value=void 0;let n=this.dep=new wo,{get:o,set:r}=t(n.track.bind(n),n.trigger.bind(n));this._get=o,this._set=r}get value(){return this._value=this._get()}set value(t){this._set(t)}};function $s(e){return new La(e)}function Ku(e){let t=H(e)?new Array(e.length):{};for(let n in e)t[n]=zu(e,n);return t}var $a=class{constructor(t,n,o){this._object=t,this._defaultValue=o,this.__v_isRef=!0,this._value=void 0,this._key=Ae(n)?n:String(n),this._raw=Q(t);let r=!0,s=t;if(!H(t)||Ae(this._key)||!sr(this._key))do r=!qn(s)||$e(s);while(r&&(s=s.__v_raw));this._shallow=r}get value(){let t=this._object[this._key];return this._shallow&&(t=Jn(t)),this._value=t===void 0?this._defaultValue:t}set value(t){if(this._shallow&&Ne(this._raw[this._key])){let n=this._object[this._key];if(Ne(n)){n.value=t;return}}this._object[this._key]=t}get dep(){return Nm(this._raw,this._key)}},Fa=class{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}};function Xu(e,t,n){return Ne(e)?e:Z(e)?new Fa(e):ie(e)&&arguments.length>1?zu(e,t,n):gt(e)}function zu(e,t,n){return new $a(e,t,n)}var Ua=class{constructor(t,n,o){this.fn=t,this.setter=n,this._value=void 0,this.dep=new wo(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=fr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=o}notify(){if(this.flags|=16,!(this.flags&8)&&ve!==this)return Ou(this,!0),!0}get value(){let t=this.dep.track();return Du(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}};function Gu(e,t,n=!1){let o,r;return Z(e)?o=e:(o=e.get,r=e.set),new Ua(o,r,n)}var qu={GET:"get",HAS:"has",ITERATE:"iterate"},Ju={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"};var Os={},ks=new WeakMap,On;function Yu(){return On}function Ka(e,t=!1,n=On){if(n){let o=ks.get(n);o||ks.set(n,o=[]),o.push(e)}}function Qu(e,t,n=ee){let{immediate:o,deep:r,once:s,scheduler:i,augmentJob:a,call:l}=n,u=g=>{(n.onWarn||ym)("Invalid watch source: ",g,"A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.")},f=g=>r?g:$e(g)||r===!1||r===0?Kt(g,1):Kt(g),c,p,d,v,m=!1,N=!1;if(Ne(e)?(p=()=>e.value,m=$e(e)):ht(e)?(p=()=>f(e),m=!0):H(e)?(N=!0,m=e.some(g=>ht(g)||$e(g)),p=()=>e.map(g=>{if(Ne(g))return g.value;if(ht(g))return f(g);if(Z(g))return l?l(g,2):g()})):Z(e)?t?p=l?()=>l(e,2):e:p=()=>{if(d){Tt();try{d()}finally{wt()}}let g=On;On=c;try{return l?l(e,3,[v]):e(v)}finally{On=g}}:p=De,t&&r){let g=p,O=r===!0?1/0:r;p=()=>Kt(g(),O)}let A=Ba(),b=()=>{c.stop(),A&&A.active&&rr(A.effects,c)};if(s&&t){let g=t;t=(...O)=>{try{return g(...O)}finally{b()}}}let E=N?new Array(e.length).fill(Os):Os,y=g=>{if(!(!(c.flags&1)||!c.dirty&&!g))if(t){let O=c.run();if(g||r||m||(N?O.some((D,S)=>Ie(D,E[S])):Ie(O,E))){let D=On;Tt();try{d&&d(),On=c;let S=[O,E===Os?void 0:N&&E[0]===Os?[]:E,v];E=O,l?l(t,3,S):t(...S)}finally{On=D,wt()}}}else c.run()};return a&&a(y),c=new an(p),c.scheduler=i?()=>i(y,!1):y,v=g=>Ka(g,!1,c),d=c.onStop=()=>{let g=ks.get(c);if(g){if(l)l(g,4);else for(let O of g)O();ks.delete(c)}},t?o?y(!0):E=c.run():i?i(y.bind(null,!0),!0):c.run(),b.pause=c.pause.bind(c),b.resume=c.resume.bind(c),b.stop=b,b}function Kt(e,t=1/0,n){if(t<=0||!ie(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,Ne(e))Kt(e.value,t,n);else if(H(e))for(let o=0;o<e.length;o++)Kt(e[o],t,n);else if(St(e)||on(e))e.forEach(o=>{Kt(o,t,n)});else if(So(e)){for(let o in e)Kt(e[o],t,n);for(let o of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,o)&&Kt(e[o],t,n)}return e}var Zn=[];function $m(e){Zn.push(e)}function Fm(){Zn.pop()}var Xa=!1;function Zu(e,...t){if(Xa)return;Xa=!0,Tt();let n=Zn.length?Zn[Zn.length-1].component:null,o=n&&n.appContext.config.warnHandler,r=Um();if(o)ro(o,n,11,[e+t.map(s=>{var i,a;return(a=(i=s.toString)==null?void 0:i.call(s))!=null?a:JSON.stringify(s)}).join(""),n&&n.proxy,r.map(({vnode:s})=>`at <${op(n,s.type)}>`).join(`
`),r]);else{let s=[`[Vue warn]: ${e}`,...t];r.length&&s.push(`
`,...Bm(r)),console.warn(...s)}wt(),Xa=!1}function Um(){let e=Zn[Zn.length-1];if(!e)return[];let t=[];for(;e;){let n=t[0];n&&n.vnode===e?n.recurseCount++:t.push({vnode:e,recurseCount:0});let o=e.component&&e.component.parent;e=o&&o.vnode}return t}function Bm(e){let t=[];return e.forEach((n,o)=>{t.push(...o===0?[]:[`
`],...Hm(n))}),t}function Hm({vnode:e,recurseCount:t}){let n=t>0?`... (${t} recursive calls)`:"",o=e.component?e.component.parent==null:!1,r=` at <${op(e.component,e.type,o)}`,s=">"+n;return e.props?[r,...jm(e.props),s]:[r+s]}function jm(e){let t=[],n=Object.keys(e);return n.slice(0,3).forEach(o=>{t.push(...pf(o,e[o]))}),n.length>3&&t.push(" ..."),t}function pf(e,t,n){return z(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):typeof t=="number"||typeof t=="boolean"||t==null?n?t:[`${e}=${t}`]:Ne(t)?(t=pf(e,Q(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):Z(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=Q(t),n?t:[`${e}=`,t])}function Wm(e,t){}var Km={SETUP_FUNCTION:0,0:"SETUP_FUNCTION",RENDER_FUNCTION:1,1:"RENDER_FUNCTION",NATIVE_EVENT_HANDLER:5,5:"NATIVE_EVENT_HANDLER",COMPONENT_EVENT_HANDLER:6,6:"COMPONENT_EVENT_HANDLER",VNODE_HOOK:7,7:"VNODE_HOOK",DIRECTIVE_HOOK:8,8:"DIRECTIVE_HOOK",TRANSITION_HOOK:9,9:"TRANSITION_HOOK",APP_ERROR_HANDLER:10,10:"APP_ERROR_HANDLER",APP_WARN_HANDLER:11,11:"APP_WARN_HANDLER",FUNCTION_REF:12,12:"FUNCTION_REF",ASYNC_COMPONENT_LOADER:13,13:"ASYNC_COMPONENT_LOADER",SCHEDULER:14,14:"SCHEDULER",COMPONENT_UPDATE:15,15:"COMPONENT_UPDATE",APP_UNMOUNT_CLEANUP:16,16:"APP_UNMOUNT_CLEANUP"},Xm={sp:"serverPrefetch hook",bc:"beforeCreate hook",c:"created hook",bm:"beforeMount hook",m:"mounted hook",bu:"beforeUpdate hook",u:"updated",bum:"beforeUnmount hook",um:"unmounted hook",a:"activated hook",da:"deactivated hook",ec:"errorCaptured hook",rtc:"renderTracked hook",rtg:"renderTriggered hook",0:"setup function",1:"render function",2:"watcher getter",3:"watcher callback",4:"watcher cleanup function",5:"native event handler",6:"component event handler",7:"vnode hook",8:"directive hook",9:"transition hook",10:"app errorHandler",11:"app warnHandler",12:"ref function",13:"async component loader",14:"scheduler flush",15:"component update",16:"app unmount cleanup function"};function ro(e,t,n,o){try{return o?e(...o):e()}catch(r){so(r,t,n)}}function vt(e,t,n,o){if(Z(e)){let r=ro(e,t,n,o);return r&&bs(r)&&r.catch(s=>{so(s,t,n,void 0,!0)}),r}if(H(e)){let r=[];for(let s=0;s<e.length;s++)r.push(vt(e[s],t,n,o));return r}}function so(e,t,n,o=!0,r=!1){let s=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:a}=t&&t.appContext.config||ee;if(t){let l=t.parent,u=t.proxy,f=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){let c=l.ec;if(c&&!l.isUnmounted&&(!r||l.scope.active)){for(let p=0;p<c.length;p++)if(c[p](e,u,f)===!1)return}l=l.parent}if(i){Tt(),ro(i,null,10,[e,u,f]),wt();return}}zm(e,n,s,o,a)}function zm(e,t,n,o=!0,r=!1){if(r)throw e;console.error(e)}var nt=[],Ft=-1,zt=[],An=null,Ao=0,df=Promise.resolve(),Gs=null;function Cr(e){let t=Gs||df;return e?t.then(this?e.bind(this):e):t}function Gm(e){let t=Ft+1,n=nt.length;for(;t<n;){let o=t+n>>>1,r=nt[o],s=yr(r);s<e||s===e&&r.flags&2?t=o+1:n=o}return t}function ai(e){if(!(e.flags&1)){let t=yr(e),n=nt[nt.length-1];!n||!(e.flags&2)&&t>=yr(n)?nt.push(e):nt.splice(Gm(t),0,e),e.flags|=1,hf()}}function hf(){Gs||(Gs=df.then(gf))}function Gt(e){if(!H(e))An&&e.id===-1?An.splice(Ao+1,0,e):e.flags&1||(zt.push(e),e.flags|=1);else for(let t=0;t<e.length;t++)zt.push(e[t]);hf()}function mf(e,t,n,o=Ft+1){for(;o<nt.length;o++){let r=nt[o];if(r&&r.flags&2){if(e&&r.id!==e.uid||t!==void 0&&!(r.id>=t))continue;nt.splice(o,1),o=e?o-1:Ft,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function qs(e,t,n=0){if(zt.length){let o=zt,r=0;if(t){o=[];for(let i=0;i<zt.length;i++){let a=zt[i];(a.i!==void 0?!a.i||a.i.uid<n:t.has(a))?zt[r++]=a:o.push(a)}}let s=[...new Set(o)].sort((i,a)=>yr(i)-yr(a));if(zt.length=r,An){for(let i=0;i<s.length;i++)An.push(s[i]);return}for(An=s,Ao=0;Ao<An.length;Ao++){let i=An[Ao];i.flags&4&&(i.flags&=-2),i.flags&8||i(),i.flags&=-2}An=null,Ao=0}}var za=!1;function qm(e,t){if(za){e();return}let n=t===void 0?void 0:new Set(zt);e(),za=!0;try{mf(void 0,t),qs(void 0,n,t)}finally{za=!1}}var yr=e=>e.id==null?e.flags&2?-1:1/0:e.id;function gf(e){let t=De;try{for(Ft=0;Ft<nt.length;Ft++){let n=nt[Ft];n&&!(n.flags&8)&&(n.flags&4&&(n.flags&=-2),ro(n,n.i,n.i?15:14),n.flags&4||(n.flags&=-2))}}finally{for(;Ft<nt.length;Ft++){let n=nt[Ft];n&&(n.flags&=-2)}Ft=-1,nt.length=0,qs(e),Gs=null,(nt.length||zt.length)&&gf(e)}}var Jm=!1;var Do,Fs=[],ef=!1;function Ef(e,t){var n,o;Do=e,Do?(Do.enabled=!0,Fs.forEach(({event:r,args:s})=>Do.emit(r,...s)),Fs=[]):typeof window<"u"&&window.HTMLElement&&!((o=(n=window.navigator)==null?void 0:n.userAgent)!=null&&o.includes("jsdom"))?((t.__VUE_DEVTOOLS_HOOK_REPLAY__=t.__VUE_DEVTOOLS_HOOK_REPLAY__||[]).push(s=>{Ef(s,t)}),setTimeout(()=>{Do||(t.__VUE_DEVTOOLS_HOOK_REPLAY__=null,ef=!0,Fs=[])},3e3)):(ef=!0,Fs=[])}var je=null,li=null;function br(e){let t=je;return je=e,li=e&&e.type.__scopeId||null,t}function Ym(e){li=e}function Qm(){li=null}var Zm=e=>ll;function ll(e,t=je,n){if(!t||e._n)return e;let o=(...r)=>{o._d&&wr(-1);let s=br(t),i=dn.length,a;try{a=e(...r)}finally{for(let l=dn.length;l>i;l--)gi();br(s),o._d&&wr(1)}return a};return o._n=!0,o._c=!0,o._d=!0,o}function eg(e,t){if(je===null)return e;let n=kr(je),o=e.dirs||(e.dirs=[]);for(let r=0;r<t.length;r++){let[s,i,a,l=ee]=t[r];s&&(Z(s)&&(s={mounted:s,updated:s}),s.deep&&Kt(i),o.push({dir:s,instance:n,value:i,oldValue:void 0,arg:a,modifiers:l}))}return e}function Xt(e,t,n,o){let r=e;if(o==="beforeMount")e._mount=e;else if(o==="beforeUpdate"){let a=t&&t._mount;a&&(a._latest=e,e._mount=a)}else if(o==="mounted"){let a=e._latest;e._mount=e._latest=void 0,a&&(r=a,a._mount=void 0)}let s=r.dirs,i=t&&t.dirs;for(let a=0;a<s.length;a++){let l=s[a];i?l.oldValue=i[a].value:o==="mounted"&&l.oldValue!==void 0&&(l=q({},l,{oldValue:void 0}));let u=l.dir[o];u&&(Tt(),vt(u,n,8,[e.el,l,r,t]),wt())}}function tg(e,t){if(He){let n=He.provides,o=He.parent&&He.parent.provides;o===n&&(n=He.provides=Object.create(o)),n[e]=t}}function vf(e,t,n=!1){let o=qe();if(o||eo){let r=eo?eo._context.provides:o?o.parent==null||o.ce?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides:void 0;if(r&&e in r)return r[e];if(arguments.length>1)return n&&Z(t)?t.call(o&&o.proxy):t}}function ng(){return!!(qe()||eo)}var _f=Symbol.for("v-scx"),yf=()=>{{let e=vf(_f);return e}};function og(e,t){return ci(e,null,t)}function rg(e,t){return ci(e,null,{flush:"post"})}function bf(e,t){return ci(e,null,{flush:"sync"})}function Po(e,t,n){return ci(e,t,n)}function ci(e,t,n=ee){let{immediate:o,deep:r,flush:s,once:i}=n,a=q({},n),l=t&&o||!t&&s!=="post",u;if(oo){if(s==="sync"){let d=yf();u=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){let d=()=>{};return d.stop=De,d.resume=De,d.pause=De,d}}let f=He;a.call=(d,v,m)=>vt(d,f,v,m);let c=!1;s==="post"?a.scheduler=d=>{d.i=f,we(d,f&&f.suspense)}:s!=="sync"&&(c=!0,a.scheduler=(d,v)=>{v?d():ai(d)}),a.augmentJob=d=>{t&&(d.flags|=4),c&&(d.flags|=2,f&&(d.id=f.uid,d.i=f))};let p=Qu(e,t,a);return oo&&(u?u.push(p):l&&p()),p}var Cn=new WeakMap,Nf=Symbol("_vte"),ui=e=>e.__isTeleport,Qn=e=>e&&(e.disabled||e.disabled===""),sg=e=>e&&(e.defer||e.defer===""),tf=e=>typeof SVGElement<"u"&&e instanceof SVGElement,nf=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,Ya=(e,t)=>{let n=e&&e.to;return z(n)?t?t(n):null:n},ig={name:"Teleport",__isTeleport:!0,process(e,t,n,o,r,s,i,a,l,u){let{mc:f,pc:c,pbc:p,o:{insert:d,querySelector:v,createText:m,createComment:N,parentNode:A}}=u,b=Qn(t.props),{dynamicChildren:E}=t,y=(D,S,T)=>{D.shapeFlag&16&&f(D.children,S,T,r,s,i,a,l)},g=(D=t)=>{let S=Qn(D.props),T=D.target=Ya(D.props,v),V=Qa(T,D,m,d);T&&(i!=="svg"&&tf(T)?i="svg":i!=="mathml"&&nf(T)&&(i="mathml"),r&&r.isCE&&(r.ce._teleportTargets||(r.ce._teleportTargets=new Set)).add(T),S||(y(D,T,V),Er(D,!1)))},O=D=>{let S=()=>{if(Cn.get(D)===S){if(Cn.delete(D),Qn(D.props)){let T=A(D.el)||n;y(D,T,D.anchor),Er(D,!0)}g(D)}};Cn.set(D,S),we(S,s)};if(e==null){let D=t.el=m(""),S=t.anchor=m("");if(d(D,n,o),d(S,n,o),sg(t.props)||s&&s.pendingBranch){O(t);return}b&&(y(t,n,S),Er(t,!0)),g()}else{t.el=e.el;let D=t.anchor=e.anchor,S=Cn.get(e);if(S){S.flags|=8,Cn.delete(e),O(t);return}t.targetStart=e.targetStart;let T=t.target=e.target,V=t.targetAnchor=e.targetAnchor,M=Qn(e.props),w=M?n:T,$=M?D:V;if(i==="svg"||tf(T)?i="svg":(i==="mathml"||nf(T))&&(i="mathml"),E?(p(e.dynamicChildren,E,w,r,s,i,a),Nl(e,t,!0)):l||c(e,t,w,$,r,s,i,a,!1),b)M?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):Us(t,n,D,u,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){let P=Ya(t.props,v);P&&(t.target=P,Us(t,P,null,u,0))}else M&&Us(t,T,V,u,1);Er(t,b)}},remove(e,t,n,{um:o,o:{remove:r}},s){let{shapeFlag:i,children:a,anchor:l,targetStart:u,targetAnchor:f,target:c,props:p}=e,d=Qn(p),v=s||!d,m=Cn.get(e);if(m&&(m.flags|=8,Cn.delete(e)),c&&(r(u),r(f)),s&&r(l),!m&&(d||c)&&i&16)for(let N=0;N<a.length;N++){let A=a[N];o(A,t,n,v,!!A.dynamicChildren)}},move:Us,hydrate:ag};function Us(e,t,n,{o:{insert:o},m:r},s=2){s===0&&(e.targetStart&&o(e.targetStart,t,n),o(e.targetAnchor,t,n),n=e.targetAnchor);let{el:i,anchor:a,shapeFlag:l,children:u,props:f}=e,c=s===2;if(c&&o(i,t,n),!Cn.has(e)&&(!c||Qn(f))&&l&16)for(let p=0;p<u.length;p++)r(u[p],t,n,2);c&&o(a,t,n)}function ag(e,t,n,o,r,s,{o:{nextSibling:i,parentNode:a,querySelector:l,insert:u,createText:f}},c){function p(N,A){let b=A;for(;b;){if(b&&b.nodeType===8){if(b.data==="teleport start anchor")t.targetStart=b;else if(b.data==="teleport anchor"){t.targetAnchor=b,N._lpa=t.targetAnchor&&i(t.targetAnchor);break}}b=i(b)}}function d(N,A){A.anchor=c(i(N),A,a(N),n,o,r,s)}let v=t.target=Ya(t.props,l),m=Qn(t.props);if(v){let N=v._lpa||v.firstChild;t.shapeFlag&16&&(m?(p(v,N),d(e,t),t.targetAnchor||Qa(v,t,f,u,a(e)===v?e:null)):(t.anchor=i(e),p(v,N),t.targetAnchor||Qa(v,t,f,u),c(N&&i(N),t,v,n,o,r,s))),Er(t,m)}else m&&t.shapeFlag&16&&(d(e,t),t.targetStart=e,t.targetAnchor=i(e));return t.anchor&&i(t.anchor)}var lg=ig;function Er(e,t){let n=e.ctx;n&&n.ut&&(t?n.ut(e.el,e.anchor):n.ut(e.targetStart,e.targetAnchor))}function Qa(e,t,n,o,r=null){let s=t.targetStart=n(""),i=t.targetAnchor=n("");return s[Nf]=i,e&&(o(s,e,r),o(i,e,r)),i}var Et=Symbol("_leaveCb"),gr=Symbol("_enterCb");function fi(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Ir(()=>{e.isMounted=!0}),pl(()=>{e.isUnmounting=!0}),e}var Ot=[Function,Array],pi={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Ot,onEnter:Ot,onAfterEnter:Ot,onEnterCancelled:Ot,onBeforeLeave:Ot,onLeave:Ot,onAfterLeave:Ot,onLeaveCancelled:Ot,onBeforeAppear:Ot,onAppear:Ot,onAfterAppear:Ot,onAppearCancelled:Ot},cg={name:"BaseTransition",props:pi,setup(e,{slots:t}){let n=qe(),o=fi();return()=>{let r=t.default&&Ar(t.default(),!0),s=r&&r.length?Sf(r):n.subTree?zf():void 0;if(!s)return;let i=Q(e),{mode:a}=i;if(o.isLeaving)return Ga(s);let l=Js(s);if(!l)return Ga(s);let u=to(l,i,o,n);l.type!==xe&&At(l,u);let f=n.subTree&&Js(n.subTree);if(f&&f.type!==xe&&!Ct(f,l)&&Nr(n.subTree)){let c=to(f,i,o,n);if(At(f,c),a==="out-in"&&l.type!==xe)return o.isLeaving=!0,c.afterLeave=()=>{if(o.isLeaving=!1,!(n.job.flags&8))if(n.effect.flags&2){let p=()=>{n.job.flags&8||n.update()};p.i=n,ai(p)}else n.update();delete c.afterLeave,f=void 0},Ga(s);a==="in-out"&&l.type!==xe?c.delayLeave=(p,d,v)=>{let m=xf(o,f);m[String(f.key)]=f,p[Et]=()=>{d(),p[Et]=void 0,delete u.delayedLeave,f=void 0},u.delayedLeave=()=>{v(),delete u.delayedLeave,f=void 0}}:f=void 0}else f&&(f=void 0);return s}}};function Sf(e){let t=e[0];if(e.length>1){let n=!1;for(let o of e)if(o.type!==xe){t=o,n=!0;break}}return t}var cl=cg;function xf(e,t){let{leavingVNodes:n}=e,o=n.get(t.type);return o||(o=Object.create(null),n.set(t.type,o)),o}function to(e,t,n,o){let{appear:r,mode:s,persisted:i=!1,onBeforeEnter:a,onEnter:l,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:c,onLeave:p,onAfterLeave:d,onLeaveCancelled:v,onBeforeAppear:m,onAppear:N,onAfterAppear:A,onAppearCancelled:b}=t,E=String(e.key),y=xf(n,e),g=(S,T)=>{S&&vt(S,o,9,T)},O=(S,T)=>{let V=T[1];g(S,T),H(S)?S.every(M=>M.length<=1)&&V():S.length<=1&&V()},D={mode:s,persisted:i,beforeEnter(S){let T=a;if(!n.isMounted)if(r)T=m||a;else return;S[Et]&&S[Et](!0);let V=y[E];if(V&&Ct(e,V)){let M=V.el[Et];if(!M){let w=Nr(V);M=w&&w.el[Et]}M&&M()}g(T,[S])},enter(S){if(!Jm&&S[Et]){D.delayedLeave&&D.delayedLeave();return}let T=l,V=u,M=f;if(!n.isMounted)if(r)T=N||l,V=A||u,M=b||f;else return;let w=!1;S[gr]=P=>{w||(w=!0,P?g(M,[S]):g(V,[S]),D.delayedLeave&&D.delayedLeave(),S[gr]=void 0)};let $=S[gr].bind(null,!1);T?O(T,[S,$]):$()},leave(S,T){let V=String(e.key);if(S[gr]&&S[gr](!0),n.isUnmounting)return T();g(c,[S]);let M=!1;S[Et]=$=>{M||(M=!0,T(),$?g(v,[S]):g(d,[S]),S[Et]=void 0,y[V]===e&&delete y[V])};let w=S[Et].bind(null,!1);y[V]=e,p?O(p,[S,w]):w()},clone(S){let T=to(S,t,n,o);return T.afterLeave=()=>{D.afterLeave&&D.afterLeave()},T.delayLeave=(V,M,w)=>{D.delayLeave?D.delayLeave(V,M,w):w()},T.delayedLeave=()=>{D.delayedLeave&&D.delayedLeave()},T}};return D}function Ga(e){if(Dr(e))return e=qt(e),e.children=null,e}function Js(e){if(!Dr(e))return ui(e.type)&&e.children?Sf(e.children):e;if(e.component)return e.component.subTree;let{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&Z(n.default))return n.default()}}function At(e,t){if(e.shapeFlag&6&&e.component){e.transition=t;let n=e.component.subTree;At(ui(n.type)&&Js(n)||n,t)}else if(e.shapeFlag&128){let n=e.suspense;if(n){let o=n.isHydrating?n.pendingBranch:n.activeBranch;o&&At(o,t.clone(o))}else e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)}else if(e.transition=t,e.type===Ve&&H(e.children)){let n=El(e.children,!1);n&&At(n,t)}}function Ar(e,t=!1,n){let o=[],r=0;for(let s=0;s<e.length;s++){let i=e[s],a=n==null?i.key:String(n)+String(i.key!=null?i.key:s);i.type===Ve?(i.patchFlag&128&&r++,o=o.concat(Ar(i.children,t,a))):(t||i.type!==xe)&&o.push(a!=null?qt(i,{key:a}):i)}if(r>1)for(let s=0;s<o.length;s++)o[s].patchFlag=-2;return o}function Nr(e){if(e.component)return Nr(e.component.subTree);if(e.type===Ve){let t=H(e.children)&&El(e.children,!1);return t?Nr(t):void 0}if(e.type!==xe)return e}function at(e,t){return Z(e)?q({name:e.name},t,{setup:e}):e}function ug(){let e=qe();return e?(e.appContext.config.idPrefix||"v")+"-"+e.ids[0]+e.ids[1]++:""}function Tf(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function fg(e){let t=qe(),n=Ls(null);if(t){let r=t.refs===ee?t.refs={}:t.refs;Object.defineProperty(r,e,{enumerable:!0,get:()=>n.value,set:s=>n.value=s})}return n}function of(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var Ys=new WeakMap;function ko(e,t,n,o,r=!1){if(H(e)){e.forEach((m,N)=>ko(m,t&&(H(t)?t[N]:t),n,o,r));return}if(fn(o)&&!r){o.shapeFlag&512&&o.type.__asyncResolved&&o.component.subTree.component&&ko(e,t,n,o.component.subTree);return}let s=o.shapeFlag&4?kr(o.component):o.el,i=r?null:s,{i:a,r:l}=e,u=t&&t.r,f=a.refs===ee?a.refs={}:a.refs,c=a.setupState,p=Q(c),d=c===ee?Tn:m=>of(f,m)?!1:le(p,m),v=(m,N)=>!(N&&of(f,N));if(u!=null&&u!==l){if(rf(t),z(u))f[u]=null,d(u)&&(c[u]=null);else if(Ne(u)){let m=t;v(u,m.k)&&(u.value=null),m.k&&(f[m.k]=null)}}if(Z(l))ro(l,a,12,[i,f]);else{let m=z(l),N=Ne(l);if(m||N){let A=()=>{if(e.f){let b=m?d(l)?c[l]:f[l]:v(l)||!e.k?l.value:f[e.k];if(r)H(b)&&rr(b,s);else if(H(b))b.includes(s)||b.push(s);else if(m)f[l]=[s],d(l)&&(c[l]=f[l]);else{let E=[s];v(l,e.k)&&(l.value=E),e.k&&(f[e.k]=E)}}else m?(f[l]=i,d(l)&&(c[l]=i)):N&&(v(l,e.k)&&(l.value=i),e.k&&(f[e.k]=i))};if(i){let b=()=>{A(),Ys.delete(e)};b.id=-1,Ys.set(e,b),we(b,n)}else rf(e),A()}}}function rf(e){let t=Ys.get(e);t&&(t.flags|=8,Ys.delete(e))}var sf=!1,Co=()=>{sf||(console.error("Hydration completed but contains mismatches."),sf=!0)},pg=e=>e.namespaceURI.includes("svg")&&e.tagName!=="foreignObject",dg=e=>e.namespaceURI.includes("MathML"),Bs=e=>{if(e.nodeType===1){if(pg(e))return"svg";if(dg(e))return"mathml"}},Io=e=>e.nodeType===8;function hg(e){let{mt:t,p:n,o:{patchProp:o,createText:r,nextSibling:s,parentNode:i,remove:a,insert:l,createComment:u}}=e,f=(E,y)=>{if(!y.hasChildNodes()){n(null,E,y),qs(),y._vnode=E;return}c(y.firstChild,E,null,null,null),qs(),y._vnode=E},c=(E,y,g,O,D,S=!1)=>{S=S||!!y.dynamicChildren;let T=Io(E)&&E.data==="[",V=()=>m(E,y,g,O,D,T),{type:M,ref:w,shapeFlag:$,patchFlag:P}=y,W=E.nodeType;y.el=E,P===-2&&(S=!1,y.dynamicChildren=null);let j=null;switch(M){case Dn:W!==3?y.children===""?(l(y.el=r(""),i(E),E),j=E):j=V():(E.data!==y.children&&(Co(),E.data=y.children),j=s(E));break;case xe:b(E)?(j=s(E),A(y.el=E.content.firstChild,E,g)):W!==8||T?j=V():j=s(E);break;case pn:if(T&&(E=s(E),W=E.nodeType),W===1||W===3){j=E;let ae=!y.children.length;for(let pe=0;pe<y.staticCount;pe++)ae&&(y.children+=j.nodeType===1?j.outerHTML:j.data),pe===y.staticCount-1&&(y.anchor=j),j=s(j);return T?s(j):j}else V();break;case Ve:T?j=v(E,y,g,O,D,S):j=V();break;default:if($&1)(W!==1||y.type.toLowerCase()!==E.tagName.toLowerCase())&&!b(E)?j=V():j=p(E,y,g,O,D,S);else if($&6){y.slotScopeIds=D;let ae=i(E);if(T?j=N(E):Io(E)&&E.data==="teleport start"?j=N(E,E.data,"teleport end"):j=s(E),t(y,ae,null,g,O,Bs(ae),S),(fn(y)||y.component.asyncDep)&&!y.component.subTree){let pe;T?(pe=ye(pn),pe.anchor=j?j.previousSibling:ae.lastChild):pe=E.nodeType===3?xl(""):ye(E.nodeType===8?xe:"div"),pe.el=E,y.component.subTree=pe}}else $&64?W!==8?j=V():j=y.type.hydrate(E,y,g,O,D,S,e,d):$&128&&(j=y.type.hydrate(E,y,g,O,Bs(i(E)),D,S,e,c))}return w!=null&&ko(w,null,O,y),j},p=(E,y,g,O,D,S)=>{S=S||!!y.dynamicChildren;let{type:T,dynamicProps:V,props:M,patchFlag:w,shapeFlag:$,dirs:P,transition:W}=y,j=T==="input"||T==="option",ae=!!V;if(j||ae||w!==-1){P&&Xt(y,null,g,"created");let pe=!1;if(b(E)){pe=Uf(null,W)&&g&&g.vnode.props&&g.vnode.props.appear;let re=E.content.firstChild;if(pe){let Me=re.getAttribute("class");Me&&(re.$cls=Me),W.beforeEnter(re)}A(re,E,g),y.el=E=re}if($&16&&!(M&&(M.innerHTML||M.textContent))){let re=d(E.firstChild,y,E,g,O,D,S);for(re&&!Ks(E,1)&&Co();re;){let Me=re;re=re.nextSibling,a(Me)}}else if($&8){let re=y.children;re[0]===`
`&&(E.tagName==="PRE"||E.tagName==="TEXTAREA")&&(re=re.slice(1));let{textContent:Me}=E;Me!==re&&Me!==re.replace(/\r\n|\r/g,`
`)&&(Ks(E,0)||Co(),E.textContent=y.children)}if(M){if(j||ae||!S||w&48){let re=E.tagName.includes("-"),Me=E.namespaceURI.includes("svg")?"svg":E.namespaceURI.includes("MathML")?"mathml":void 0;for(let Ee in M)if(j&&(Ee.endsWith("value")||Ee==="indeterminate")||Ht(Ee)&&!Lt(Ee)||Ee[0]==="."||re&&!Lt(Ee)||V&&V.includes(Ee)){if(gg(E,Ee,M[Ee]))continue;o(E,Ee,null,M[Ee],Me,g)}}else if(M.onClick)o(E,"onClick",null,M.onClick,void 0,g);else if(w&4&&ht(M.style))for(let re in M.style)M.style[re]}let he;(he=M&&M.onVnodeBeforeMount)&&st(he,g,y),P&&Xt(y,null,g,"beforeMount"),((he=M&&M.onVnodeMounted)||P||pe)&&ti(()=>{he&&st(he,g,y),pe&&W.enter(E),P&&Xt(y,null,g,"mounted")},O)}return E.nextSibling},d=(E,y,g,O,D,S,T)=>{T=T||!!y.dynamicChildren;let V=y.children,M=V.length,w=!1;for(let $=0;$<M;$++){let P=T?V[$]:V[$]=it(V[$]),W=P.type===Dn;E?(W&&!T&&$+1<M&&it(V[$+1]).type===Dn&&(l(r(E.data.slice(P.children.length)),g,s(E)),E.data=P.children),E=c(E,P,O,D,S,T)):W&&!P.children?l(P.el=r(""),g):(w||(w=!0,Ks(g,1)||Co()),n(null,P,g,null,O,D,Bs(g),S))}return E},v=(E,y,g,O,D,S)=>{let{slotScopeIds:T}=y;T&&(D=D?D.concat(T):T);let V=i(E),M=d(s(E),y,V,g,O,D,S);return M&&Io(M)&&M.data==="]"?s(y.anchor=M):(Co(),l(y.anchor=u("]"),V,M),M)},m=(E,y,g,O,D,S)=>{if(vg(E,y)||Co(),y.el=null,S){let M=N(E);for(;;){let w=s(E);if(w&&w!==M)a(w);else break}}let T=s(E),V=i(E);return a(E),n(null,y,V,T,g,O,Bs(V),D),g&&g.vnode.el===E&&(g.vnode.el=y.el,mi(g,y.el)),T},N=(E,y="[",g="]")=>{let O=0;for(;E;)if(E=s(E),E&&Io(E)&&(E.data===y&&O++,E.data===g)){if(O===0)return s(E);O--}return E},A=(E,y,g)=>{let O=y.parentNode;O&&O.replaceChild(E,y);let D=g;for(;D;)D.vnode.el===y&&(D.vnode.el=D.subTree.el=E),D=D.parent},b=E=>E.nodeType===1&&E.tagName==="TEMPLATE";return[f,c]}var mg=new Set(["src","srcset","href","poster"]);function gg(e,t,n){return mg.has(t)?e.getAttribute(t)===(n==null?null:`${n}`):!1}var Qs="data-allow-mismatch",Eg={0:"text",1:"children",2:"class",3:"style",4:"attribute"};function Ks(e,t){if(t===0||t===1)for(;e&&!e.hasAttribute(Qs);)e=e.parentElement;return ul(e&&e.getAttribute(Qs),t)}function ul(e,t){if(e==null)return!1;if(e==="")return!0;{let n=e.split(",");return t===0&&n.includes("children")?!0:n.includes(Eg[t])}}function vg(e,t){return Ks(e.parentElement,1)||_g(e)||yg(t)}function _g(e){return e.nodeType===1&&ul(e.getAttribute(Qs),1)}function yg({props:e}){let t=e&&e[Qs];return typeof t=="string"&&ul(t,1)}var bg=ir().requestIdleCallback||(e=>setTimeout(e,1)),Ng=ir().cancelIdleCallback||(e=>clearTimeout(e)),Sg=(e=1e4)=>t=>{let n=bg(t,{timeout:e});return()=>Ng(n)};function xg(e){let{top:t,left:n,bottom:o,right:r}=e.getBoundingClientRect(),{innerHeight:s,innerWidth:i}=window;return(t>0&&t<s||o>0&&o<s)&&(n>0&&n<i||r>0&&r<i)}var Tg=e=>(t,n)=>{let o=new IntersectionObserver(s=>{for(let i of s)if(i.isIntersecting){o.disconnect(),t();break}},e),r=s=>{if(xg(s))return t(),o.disconnect(),!1;if(getComputedStyle(s).display==="contents"){for(let i=0;i<s.children.length;i++)if(r(s.children[i])===!1)return!1}o.observe(s)};return n(s=>{if(s instanceof Element)return r(s)}),()=>o.disconnect()},wg=e=>t=>{if(e){let n=matchMedia(e);if(n.matches)t();else return n.addEventListener("change",t,{once:!0}),()=>n.removeEventListener("change",t)}},Og=(e=[])=>(t,n)=>{z(e)&&(e=[e]);let o=!1,r=i=>{o||(o=!0,s(),t(),i.target.dispatchEvent(new i.constructor(i.type,i)))},s=()=>{n(i=>{for(let a of e)i.removeEventListener(a,r)})};return n(i=>{for(let a of e)i.addEventListener(a,r,{once:!0})}),s};function Cg(e,t){if(Io(e)&&e.data==="["){let n=1,o=e.nextSibling;for(;o;){if(o.nodeType===1){if(t(o)===!1)break}else if(Io(o))if(o.data==="]"){if(--n===0)break}else o.data==="["&&n++;o=o.nextSibling}}else t(e)}var fn=e=>!!e.type.__asyncLoader;function Ag(e){Z(e)&&(e={loader:e});let{loader:t,loadingComponent:n,errorComponent:o,delay:r=200,hydrate:s,timeout:i,suspensible:a=!0,onError:l}=e,u=null,f,c=0,p=()=>(c++,u=null,d()),d=()=>{let v;return u||(v=u=t().catch(m=>{if(m=m instanceof Error?m:new Error(String(m)),l)return new Promise((N,A)=>{l(m,()=>N(p()),()=>A(m),c+1)});throw m}).then(m=>v!==u&&u?u:(m&&(m.__esModule||m[Symbol.toStringTag]==="Module")&&(m=m.default),f=m,m)))};return at({name:"AsyncComponentWrapper",__asyncLoader:d,__asyncHydrate(v,m,N){let A=v.isConnected,b=!1;(m.bu||(m.bu=[])).push(()=>b=!0);let E=()=>{b||!v.parentNode||A&&!v.isConnected||N()},y=s?()=>{let g=s(E,O=>Cg(v,O));g&&(m.bum||(m.bum=[])).push(g)}:E;f?y():d().then(()=>!m.isUnmounted&&y())},get __asyncResolved(){return f},setup(){let v=He;if(Tf(v),f)return()=>Hs(f,v);let m=g=>{u=null,so(g,v,13,!o,!0)};if(a&&v.suspense||oo)return d().then(g=>()=>Hs(g,v)).catch(g=>(m(g),()=>o?ye(o,{error:g}):null));let N=gt(!1),A=gt(),b=gt(!!r),E,y;return Oo(()=>{E!=null&&clearTimeout(E),y!=null&&clearTimeout(y)}),r&&(y=setTimeout(()=>{v.isUnmounted||(b.value=!1)},r)),i!=null&&(E=setTimeout(()=>{if(!v.isUnmounted&&!N.value&&!A.value){let g=new Error(`Async component timed out after ${i}ms.`);m(g),A.value=g}},i)),d().then(()=>{v.isUnmounted||(N.value=!0,v.parent&&Dr(v.parent.vnode)&&v.parent.update())}).catch(g=>{if(v.isUnmounted){u=null;return}m(g),A.value=g}),()=>{if(N.value&&f)return Hs(f,v);if(A.value&&o)return ye(o,{error:A.value});if(n&&!b.value)return Hs(n,v)}}})}function Hs(e,t){let{ref:n,props:o,children:r,ce:s}=t.vnode,i=ye(e,o,r);return i.ref=n,i.ce=s,delete t.vnode.ce,i}var Dr=e=>e.type.__isKeepAlive,Dg={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){let n=qe(),o=n.ctx;if(!o.renderer)return()=>{let b=t.default&&t.default();return b&&b.length===1?b[0]:b};let r=new Map,s=new Set,i=null,a=n.suspense,{renderer:{p:l,m:u,um:f,o:{createElement:c}}}=o,p=c("div");o.activate=(b,E,y,g,O)=>{let D=b.component;u(b,E,y,0,a),l(D.vnode,b,E,y,D,a,g,b.slotScopeIds,O),we(()=>{D.isDeactivated=!1,D.a&&wn(D.a);let S=b.props&&b.props.onVnodeMounted;S&&st(S,D.parent,b)},a)},o.deactivate=b=>{let E=r.get(b.key==null?b.type:b.key);if(!E||E.component!==b.component)return!1;let y=b.component;return Zs(y.m),Zs(y.a),u(b,p,null,1,a),we(()=>{y.da&&wn(y.da);let g=b.props&&b.props.onVnodeUnmounted;g&&st(g,y.parent,b),y.isDeactivated=!0},a),!0};function d(b){js(b),f(b,n,a,!0)}function v(b){r.forEach((E,y)=>{let g=ii(fn(E)?E.type.__asyncResolved||{}:E.type);g&&!b(g)&&m(y)})}function m(b){let E=r.get(b);E&&(!i||!Ct(E,i))?d(E):i&&(js(i),E&&js(E)),r.delete(b),s.delete(b)}Po(()=>[e.include,e.exclude],([b,E])=>{b&&v(y=>vr(b,y)),E&&v(y=>!vr(E,y))},{flush:"post",deep:!0});let N=null,A=()=>{if(N!=null)if(ei(n.subTree.type)){let b=()=>{let E=Ws(n.subTree);E.component&&r.set(N,E)};n.subTree.suspense.pendingBranch?we(b,n.subTree.suspense):b()}else r.set(N,Ws(n.subTree))};return Ir(A),di(A),pl(()=>{r.forEach(b=>{let{subTree:E,suspense:y}=n,g=Ws(E);if(b.type===g.type&&b.key===g.key){js(g);let O=g.component.da;O&&we(O,y);return}d(b)})}),()=>{if(N=null,!t.default)return i=null;let b=t.default(),E=b[0];if(b.length>1)return i=null,b;if(!hn(E)||!(E.shapeFlag&4)&&!(E.shapeFlag&128))return i=null,E;let y=Ws(E);if(y.type===xe)return i=null,y;let g=y.type,O=ii(fn(y)?y.type.__asyncResolved||{}:g),{include:D,exclude:S,max:T}=e;if(D&&(!O||!vr(D,O))||S&&O&&vr(S,O))return y.shapeFlag&=-257,i=y,E;let V=y.key==null?g:y.key,M=r.get(V);return y.el&&(y=qt(y),E.shapeFlag&128&&(E.ssContent=y)),N=V,M?(y.el=M.el,y.component=M.component,y.transition&&At(y,y.transition),y.shapeFlag|=512,s.delete(V),s.add(V)):(s.add(V),T&&s.size>parseInt(T,10)&&m(s.values().next().value)),y.shapeFlag|=256,i=y,ei(E.type)?E:y}}},Ig=Dg;function vr(e,t){return H(e)?e.some(n=>vr(n,t)):z(e)?e.split(",").includes(t):fu(e)?(e.lastIndex=0,e.test(t)):!1}function kg(e,t){wf(e,"a",t)}function Vg(e,t){wf(e,"da",t)}function wf(e,t,n=He){let o=e.__wdc||(e.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return e()});if(Sr(t,o,n),n){let r=n.parent;for(;r&&r.parent;)Dr(r.parent.vnode)&&Rg(o,t,n,r),r=r.parent}}function Rg(e,t,n,o){let r=Sr(t,e,o,!0),s=Sr("um",()=>rr(o[t],r),n);s.flags=16}function js(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function Ws(e){return e.shapeFlag&128?e.ssContent:e}function Sr(e,t,n=He,o=!1){if(n){let r=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...i)=>{Tt();let a=Ei(n),l=vt(t,n,e,i);return a(),wt(),l});return o?r.unshift(s):r.push(s),s}}var mn=e=>(t,n=He)=>{(!oo||e==="sp")&&Sr(e,(...o)=>t(...o),n)},Pg=mn("bm"),Ir=mn("m"),fl=mn("bu"),di=mn("u"),pl=mn("bum"),dl=mn("um"),Mg=mn("sp"),Lg=mn("rtg"),$g=mn("rtc");function Fg(e,t=He){Sr("ec",e,t)}var hl="components",Ug="directives";function Bg(e,t){return ml(hl,e,!0,t)||e}var Of=Symbol.for("v-ndc");function Hg(e){return z(e)?ml(hl,e,!1)||e:e||Of}function jg(e){return ml(Ug,e)}function ml(e,t,n=!0,o=!1){let r=je||He;if(r){let s=r.type;if(e===hl){let a=ii(s,!1);if(a&&(a===t||a===ce(t)||a===xt(ce(t))))return s}let i=af(r[e]||s[e],t)||af(r.appContext[e],t);return!i&&o?s:i}}function af(e,t){return e&&(e[t]||e[ce(t)]||e[xt(ce(t))])}function Wg(e,t,n,o){let r,s=n&&n[o],i=H(e);if(i||z(e)){let a=i&&ht(e),l=!1,u=!1;a&&(l=!$e(e),u=tt(e),e=hr(e)),r=new Array(e.length);for(let f=0,c=e.length;f<c;f++)r[f]=t(l?u?ln(mt(e[f])):mt(e[f]):e[f],f,void 0,s&&s[f])}else if(typeof e=="number")if(!Number.isInteger(e)||e<0)r=[];else{r=new Array(e);for(let a=0;a<e;a++)r[a]=t(a+1,a,void 0,s&&s[a])}else if(ie(e))if(e[Symbol.iterator])r=Array.from(e,(a,l)=>t(a,l,void 0,s&&s[l]));else{let a=Object.keys(e);r=new Array(a.length);for(let l=0,u=a.length;l<u;l++){let f=a[l];r[l]=t(e[f],f,l,s&&s[l])}}else r=[];return n&&(n[o]=r),r}function Kg(e,t){for(let n=0;n<t.length;n++){let o=t[n];if(H(o))for(let r=0;r<o.length;r++)e[o[r].name]=o[r].fn;else o&&(e[o.name]=o.key?(...r)=>{let s=o.fn(...r);return s&&(s.key=o.key),s}:o.fn)}return e}function Xg(e,t,n,o,r,s){if(n==null&&(n={}),je.ce||je.parent&&fn(je.parent)&&je.parent.ce){let u=s!=null&&n.key==null?q({},n,{key:s}):n,f=Object.keys(u).length>0;return t!=="default"&&(u.name=t),Tr(),ni(Ve,null,[ye("slot",u,o&&o())],f?-2:64)}let i=e[t];i&&i._c&&(i._d=!1);let a=dn.length;Tr();let l;try{let u=i&&gl(i(n)),f=n.key||s||u&&u.key;l=ni(Ve,{key:(f&&!Ae(f)?f:`_${t}`)+(!u&&o?"_fb":"")},u||(o?o():[]),u&&e._===1?64:-2)}catch(u){for(let f=dn.length;f>a;f--)gi();throw u}finally{i&&i._c&&(i._d=!0)}return!r&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),l}function gl(e){return e.some(t=>hn(t)?!(t.type===xe||t.type===Ve&&!gl(t.children)):!0)?e:null}function zg(e,t){let n={};for(let o in e)n[t&&/[A-Z]/.test(o)?`on:${o}`:rn(o)]=e[o];return n}var Za=e=>e?Yf(e)?kr(e):Za(e.parent):null;var _r=q(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Za(e.parent),$root:e=>Za(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>e.type,$forceUpdate:e=>e.f||(e.f=()=>{ai(e.update)}),$nextTick:e=>e.n||(e.n=Cr.bind(e.proxy)),$watch:e=>De});var qa=(e,t)=>e!==ee&&!e.__isScriptSetup&&le(e,t),el={get({_:e},t){if(t==="__v_skip")return!0;let{ctx:n,setupState:o,data:r,props:s,accessCache:i,type:a,appContext:l}=e;if(t[0]!=="$"){let p=i[t];if(p!==void 0)switch(p){case 1:return o[t];case 2:return r[t];case 4:return n[t];case 3:return s[t]}else{if(qa(o,t))return i[t]=1,o[t];if(le(s,t))return i[t]=3,s[t];if(n!==ee&&le(n,t))return i[t]=4,n[t];i[t]=0}}let u=_r[t],f,c;if(u)return t==="$attrs"&&Be(e.attrs,"get",""),u(e);if((f=a.__cssModules)&&(f=f[t]))return f;if(n!==ee&&le(n,t))return i[t]=4,n[t];if(c=l.config.globalProperties,le(c,t))return c[t]},set({_:e},t,n){let{data:o,setupState:r,ctx:s}=e;return qa(r,t)?(r[t]=n,!0):le(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(s[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:o,appContext:r,props:s,type:i}},a){let l;return!!(n[a]||qa(t,a)||le(s,a)||le(o,a)||le(_r,a)||le(r.config.globalProperties,a)||(l=i.__cssModules)&&l[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:le(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},Gg=q({},el,{get(e,t){if(t!==Symbol.unscopables)return el.get(e,t,e)},has(e,t){return t[0]!=="_"&&!hu(t)}});function qg(){return null}function Jg(){return null}function Yg(e){}function Qg(e){}function Zg(){return null}function eE(){}function tE(e,t){return null}function nE(){return Cf("useSlots").slots}function oE(){return Cf("useAttrs").attrs}function Cf(e){let t=qe();return t.setupContext||(t.setupContext=np(t))}function tl(e){return H(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}function rE(e,t){let n=tl(e);for(let o in t){if(o.startsWith("__skip"))continue;let r=n[o];r?H(r)||Z(r)?r=n[o]={type:r,default:t[o]}:r.default=t[o]:r===null&&(r=n[o]={default:t[o]}),r&&t[`__skip_${o}`]&&(r.skipFactory=!0)}return n}function sE(e,t){return!e||!t?e||t:H(e)&&H(t)?e.concat(t):q({},tl(e),tl(t))}function iE(e,t){let n={};for(let o in e)t.includes(o)||Object.defineProperty(n,o,{enumerable:!0,get:()=>e[o]});return n}function aE(e){let t=qe(),n=oo,o=e();Or(),n&&In(!1);let r=()=>{Ei(t),n&&In(!0)},s=()=>{qe()!==t&&t.scope.off(),Or(),n&&In(!1)};return bs(o)&&(o=o.catch(i=>{throw r(),Promise.resolve().then(()=>Promise.resolve().then(s)),i})),[o,()=>{r(),Promise.resolve().then(s)}]}function Af(){return{app:null,config:{isNativeTag:Tn,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var lE=0;function cE(e,t){return function(o,r=null){Z(o)||(o=q({},o)),r!=null&&!ie(r)&&(r=null);let s=Af(),i=new WeakSet,a=[],l=!1,u=s.app={_uid:lE++,_component:o,_props:r,_container:null,_context:s,_instance:null,version:ip,get config(){return s.config},set config(f){},use(f,...c){return i.has(f)||(f&&Z(f.install)?(i.add(f),f.install(u,...c)):Z(f)&&(i.add(f),f(u,...c))),u},mixin(f){return u},component(f,c){return c?(s.components[f]=c,u):s.components[f]},directive(f,c){return c?(s.directives[f]=c,u):s.directives[f]},mount(f,c,p){if(!l){let d=u._ceVNode||ye(o,r);return d.appContext=s,p===!0?p="svg":p===!1&&(p=void 0),c&&t?t(d,f):e(d,f,p),l=!0,u._container=f,f.__vue_app__=u,kr(d.component)}},onUnmount(f){a.push(f)},unmount(){l&&(vt(a,u._instance,16),e(null,u._container),delete u._container.__vue_app__)},provide(f,c){return s.provides[f]=c,u},runWithContext(f){let c=eo;eo=u;try{return f()}finally{eo=c}}};return u}}var eo=null;function uE(e,t,n=ee){let o=qe(),r=ce(t),s=ze(t),i=Df(e,r),a=$s((l,u)=>{let f,c=ee,p;return bf(()=>{let d=e[r];Ie(f,d)&&(f=d,u())}),{get(){return l(),n.get?n.get(f):f},set(d){let v=n.set?n.set(d):d;if(!Ie(v,f)&&!(c!==ee&&Ie(d,c)))return;let m=o.vnode.props,N=!!(m&&(t in m||r in m||s in m)&&(`onUpdate:${t}`in m||`onUpdate:${r}`in m||`onUpdate:${s}`in m));N||(f=d,u()),o.emit(`update:${t}`,v),Ie(d,c)&&(Ie(d,v)&&!Ie(v,p)||N&&c!==ee&&!Ie(v,f))&&u(),c=d,p=v}}});return a[Symbol.iterator]=()=>{let l=0;return{next(){return l<2?{value:l++?i||ee:a,done:!1}:{done:!0}}}},a}var Df=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${ce(t)}Modifiers`]||e[`${ze(t)}Modifiers`];function fE(e,t,...n){if(e.isUnmounted)return;let o=e.vnode.props||ee,r=n,s=t.startsWith("update:"),i=s&&Df(o,t.slice(7));i&&(i.trim&&(r=n.map(f=>z(f)?f.trim():f)),i.number&&(r=r.map(Wn)));let a,l=o[a=rn(t)]||o[a=rn(ce(t))];!l&&s&&(l=o[a=rn(ze(t))]),l&&vt(l,e,6,r);let u=o[a+"Once"];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,vt(u,e,6,r)}}function pE(e,t,n=!1){let o=t.emitsCache,r=o.get(e);if(r!==void 0)return r;let s=e.emits,i={};return!s&&!!1?(ie(e)&&o.set(e,null),null):(H(s)?s.forEach(l=>i[l]=null):q(i,s),ie(e)&&o.set(e,i),i)}function hi(e,t){return!e||!Ht(t)?!1:(t=t.slice(2),t=t==="Once"?t:t.replace(/Once$/,""),le(e,t[0].toLowerCase()+t.slice(1))||le(e,ze(t))||le(e,t))}function Xs(e){let{type:t,vnode:n,proxy:o,withProxy:r,propsOptions:[s],slots:i,attrs:a,emit:l,render:u,renderCache:f,props:c,data:p,setupState:d,ctx:v,inheritAttrs:m}=e,N=br(e),A,b;try{if(n.shapeFlag&4){let g=r||o,O=g;A=it(u.call(O,g,f,c,d,p,v)),b=a}else{let g=t;A=it(g.length>1?g(c,{attrs:a,slots:i,emit:l}):g(c,null)),b=t.props?a:dE(a)}}catch(g){dn.length=0,so(g,e,1),A=ye(xe)}let E=A,y;if(b&&m!==!1){let g=Object.keys(b),{shapeFlag:O}=E;g.length&&O&7&&(s&&g.some(No)&&(b=hE(b,s)),E=qt(E,b,!1,!0))}if(n.dirs&&(E=qt(E,null,!1,!0),E.dirs=E.dirs?E.dirs.concat(n.dirs):n.dirs),n.transition){let g=ui(E.type)&&Js(E)||E;At(g,n.transition)}return A=E,br(N),A}function El(e,t=!0){let n;for(let o=0;o<e.length;o++){let r=e[o];if(hn(r)){if(r.type!==xe||r.children==="v-if"){if(n)return;n=r}}else return}return n}var dE=e=>{let t;for(let n in e)(n==="class"||n==="style"||Ht(n))&&((t||(t={}))[n]=e[n]);return t},hE=(e,t)=>{let n={};for(let o in e)(!No(o)||!(o.slice(9)in t))&&(n[o]=e[o]);return n};function mE(e,t,n){let{props:o,children:r,component:s}=e,{props:i,children:a,patchFlag:l}=t,u=s.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return o?lf(o,i,u):!!i;if(l&8){let f=t.dynamicProps;for(let c=0;c<f.length;c++){let p=f[c];if(If(i,o,p)&&!hi(u,p))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:o===i?!1:o?i?lf(o,i,u):!0:!!i;return!1}function lf(e,t,n){let o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let r=0;r<o.length;r++){let s=o[r];if(!le(e,s)||If(t,e,s)&&!hi(n,s))return!0}return!1}function If(e,t,n){let o=e[n],r=t[n];return n==="style"&&ie(o)&&ie(r)?!rt(o,r):o!==r}function mi({vnode:e,parent:t,suspense:n},o){for(;t;){let r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.suspense.vnode.el=r.el=o,e=r),r===e)(e=t.vnode).el=o,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=o)}var kf={},Vf=()=>Object.create(kf),Rf=e=>Object.getPrototypeOf(e)===kf;function gE(e,t,n,o=!1){let r={},s=Vf();e.propsDefaults=Object.create(null),Pf(e,t,r,s);for(let i in e.propsOptions[0])i in r||(r[i]=void 0);n?e.props=o?r:Rs(r):e.type.props?e.props=r:e.props=s,e.attrs=s}function EE(e,t,n,o){let{props:r,attrs:s,vnode:{patchFlag:i}}=e,a=Q(r),[l]=e.propsOptions,u=!1;if((o||i>0)&&!(i&16)){if(i&8){let f=e.vnode.dynamicProps;for(let c=0;c<f.length;c++){let p=f[c];if(hi(e.emitsOptions,p))continue;let d=t[p];if(l)if(le(s,p))d!==s[p]&&(s[p]=d,u=!0);else{let v=ce(p);r[v]=nl(l,a,v,d,e,!1)}else d!==s[p]&&(s[p]=d,u=!0)}}}else{Pf(e,t,r,s)&&(u=!0);let f;for(let c in a)(!t||!le(t,c)&&((f=ze(c))===c||!le(t,f)))&&(l?n&&(n[c]!==void 0||n[f]!==void 0)&&(r[c]=nl(l,a,c,void 0,e,!0)):delete r[c]);if(s!==a)for(let c in s)(!t||!le(t,c))&&(delete s[c],u=!0)}u&&Wt(e.attrs,"set","")}function Pf(e,t,n,o){let[r,s]=e.propsOptions,i=!1,a;if(t)for(let l in t){if(Lt(l))continue;let u=t[l],f;r&&le(r,f=ce(l))?!s||!s.includes(f)?n[f]=u:(a||(a={}))[f]=u:hi(e.emitsOptions,l)||(!(l in o)||u!==o[l])&&(o[l]=u,i=!0)}if(s){let l=Q(n),u=a||ee;for(let f=0;f<s.length;f++){let c=s[f];n[c]=nl(r,l,c,u[c],e,!le(u,c))}}return i}function nl(e,t,n,o,r,s){let i=e[n];if(i!=null){let a=le(i,"default");if(a&&o===void 0){let l=i.default;if(i.type!==Function&&!i.skipFactory&&Z(l)){let{propsDefaults:u}=r;if(n in u)o=u[n];else{let f=Ei(r);o=u[n]=l.call(null,t),f()}}else o=l;r.ce&&r.ce._setProp(n,o)}i[0]&&(s&&!a?o=!1:i[1]&&(o===""||o===ze(n))&&(o=!0))}return o}function vE(e,t,n=!1){let o=t.propsCache,r=o.get(e);if(r)return r;let s=e.props,i={},a=[];if(!s&&!!1)return ie(e)&&o.set(e,xn),xn;if(H(s))for(let f=0;f<s.length;f++){let c=ce(s[f]);cf(c)&&(i[c]=ee)}else if(s)for(let f in s){let c=ce(f);if(cf(c)){let p=s[f],d=i[c]=H(p)||Z(p)?{type:p}:q({},p),v=d.type,m=!1,N=!0;if(H(v))for(let A=0;A<v.length;++A){let b=v[A],E=Z(b)&&b.name;if(E==="Boolean"){m=!0;break}else E==="String"&&(N=!1)}else m=Z(v)&&v.name==="Boolean";d[0]=m,d[1]=N,(m||le(d,"default"))&&a.push(c)}}let u=[i,a];return ie(e)&&o.set(e,u),u}function cf(e){return e[0]!=="$"&&!Lt(e)}var vl=e=>e==="_"||e==="_ctx"||e==="$stable",_l=e=>H(e)?e.map(it):[it(e)],_E=(e,t,n)=>{if(t._n)return t;let o=ll((...r)=>_l(t(...r)),n);return o._c=!1,o},Mf=(e,t,n)=>{let o=e._ctx;for(let r in e){if(vl(r))continue;let s=e[r];if(Z(s))t[r]=_E(r,s,o);else if(s!=null){let i=_l(s);t[r]=()=>i}}},Lf=(e,t)=>{let n=_l(t);e.slots.default=()=>n},$f=(e,t,n)=>{for(let o in t)(n||!vl(o))&&(e[o]=t[o])},yE=(e,t,n)=>{let o=e.slots=Vf();if(e.vnode.shapeFlag&32){let r=t._;r?($f(o,t,n),n&&Ss(o,"_",r,!0)):Mf(t,o)}else t&&Lf(e,t)},bE=(e,t,n)=>{let{vnode:o,slots:r}=e,s=!0,i=ee;if(o.shapeFlag&32){let a=t._;a?n&&a===1?s=!1:$f(r,t,n):(s=!t.$stable,Mf(t,r)),i=t}else t&&(Lf(e,t),i={default:1});if(s)for(let a in r)!vl(a)&&i[a]==null&&delete r[a]};function NE(){let e=[]}var we=ti;function yl(e){return Ff(e)}function bl(e){return Ff(e,hg)}function Ff(e,t){NE();let n=ir();n.__VUE__=!0;let{insert:o,remove:r,patchProp:s,createElement:i,createText:a,createComment:l,setText:u,setElementText:f,parentNode:c,nextSibling:p,setScopeId:d=De,insertStaticContent:v}=e,m=(h,_,x,R=null,C=null,k=null,U=void 0,F=null,L=!!_.dynamicChildren)=>{if(h===_)return;h&&!Ct(h,_)&&(R=rs(h),et(h,C,k,!0),h=null),_.patchFlag===-2&&(L=!1,_.dynamicChildren=null),_.dynamicChildren&&h&&h.dynamicChildren&&h.dynamicChildren.hasOnce&&(_.dynamicChildren===xn&&(_.dynamicChildren=[]),_.dynamicChildren.hasOnce=!0);let{type:I,ref:X,shapeFlag:B}=_;switch(I){case Dn:N(h,_,x,R);break;case xe:A(h,_,x,R);break;case pn:h==null&&b(_,x,R,U);break;case Ve:$(h,_,x,R,C,k,U,F,L);break;default:B&1?O(h,_,x,R,C,k,U,F,L):B&6?P(h,_,x,R,C,k,U,F,L):(B&64||B&128)&&I.process(h,_,x,R,C,k,U,F,L,go)}X!=null&&C?ko(X,h&&h.ref,k,_||h,!_):X==null&&h&&h.ref!=null&&ko(h.ref,null,k,h,!0)},N=(h,_,x,R)=>{if(h==null)o(_.el=a(_.children),x,R);else{let C=_.el=h.el;_.children!==h.children&&u(C,_.children)}},A=(h,_,x,R)=>{h==null?o(_.el=l(_.children||""),x,R):_.el=h.el},b=(h,_,x,R)=>{[h.el,h.anchor]=v(h.children,_,x,R,h.el,h.anchor)},E=(h,_,x,R)=>{if(_.children!==h.children){let C=p(h.anchor);g(h),[_.el,_.anchor]=v(_.children,x,C,R)}else _.el=h.el,_.anchor=h.anchor},y=({el:h,anchor:_},x,R)=>{let C;for(;h&&h!==_;)C=p(h),o(h,x,R),h=C;o(_,x,R)},g=({el:h,anchor:_})=>{let x;for(;h&&h!==_;)x=p(h),r(h),h=x;r(_)},O=(h,_,x,R,C,k,U,F,L)=>{if(_.type==="svg"?U="svg":_.type==="math"&&(U="mathml"),h==null)D(_,x,R,C,k,U,F,L);else{let I=h.el&&h.el._isVueCE?h.el:null;try{I&&I._beginPatch(),V(h,_,C,k,U,F,L)}finally{I&&I._endPatch()}}},D=(h,_,x,R,C,k,U,F)=>{let L,I,{props:X,shapeFlag:B,transition:K,dirs:G}=h;if(L=h.el=i(h.type,k,X&&X.is,X),B&8?f(L,h.children):B&16&&T(h.children,L,null,R,C,Ja(h,k),U,F),G&&Xt(h,null,R,"created"),S(L,h,h.scopeId,U,R),X){for(let me in X)me!=="value"&&!Lt(me)&&s(L,me,null,X[me],k,R);"value"in X&&s(L,"value",null,X.value,k),(I=X.onVnodeBeforeMount)&&st(I,R,h)}G&&Xt(h,null,R,"beforeMount");let ue=Uf(C,K);ue?K.beforeEnter(L):K&&!K.persisted&&(L[rl]=!0),o(L,_,x),((I=X&&X.onVnodeMounted)||ue||G)&&we(()=>{let de;I&&st(I,R,h),ue&&K.enter(L),G&&Xt(h,null,R,"mounted")},C)},S=(h,_,x,R,C)=>{if(x&&d(h,x),R)for(let k=0;k<R.length;k++)d(h,R[k]);if(C){let k=C.subTree;if(_===k||ei(k.type)&&(k.ssContent===_||k.ssFallback===_)){let U=C.vnode;S(h,U,U.scopeId,U.slotScopeIds,C.parent)}}},T=(h,_,x,R,C,k,U,F,L=0)=>{for(let I=L;I<h.length;I++){let X=h[I]=F?un(h[I]):it(h[I]);m(null,X,_,x,R,C,k,U,F)}},V=(h,_,x,R,C,k,U)=>{let F=_.el=h.el,{patchFlag:L,dynamicChildren:I,dirs:X}=_;L|=h.patchFlag&16;let B=h.props||ee,K=_.props||ee,G;if(x&&Yn(x,!1),(G=K.onVnodeBeforeUpdate)&&st(G,x,_,h),X&&Xt(_,h,x,"beforeUpdate"),x&&Yn(x,!0),I&&(!h.dynamicChildren||h.dynamicChildren.length!==I.length)&&(L=0,U=!1,I=null),(B.innerHTML&&K.innerHTML==null||B.textContent&&K.textContent==null)&&f(F,""),I?M(h.dynamicChildren,I,F,x,R,Ja(_,C),k):U||he(h,_,F,null,x,R,Ja(_,C),k,!1),L>0){if(L&16)w(F,B,K,x,C);else if(L&2&&B.class!==K.class&&s(F,"class",null,K.class,C),L&4&&s(F,"style",B.style,K.style,C),L&8){let ue=_.dynamicProps;for(let me=0;me<ue.length;me++){let de=ue[me],Ce=B[de],Le=K[de];(Le!==Ce||de==="value")&&s(F,de,Ce,Le,C,x)}}L&1&&h.children!==_.children&&f(F,_.children)}else!U&&I==null&&w(F,B,K,x,C);((G=K.onVnodeUpdated)||X)&&we(()=>{G&&st(G,x,_,h),X&&Xt(_,h,x,"updated")},R)},M=(h,_,x,R,C,k,U)=>{for(let F=0;F<_.length;F++){let L=h[F],I=_[F],X=L.el||Vo(L),B=X&&(L.type===Ve||!Ct(L,I)||L.shapeFlag&198)?c(X):x;m(L,I,B,null,R,C,k,U,!0)}},w=(h,_,x,R,C)=>{if(_!==x){if(_!==ee)for(let k in _)!Lt(k)&&!(k in x)&&s(h,k,_[k],null,C,R);for(let k in x){if(Lt(k))continue;let U=x[k],F=_[k];U!==F&&k!=="value"&&s(h,k,F,U,C,R)}"value"in x&&s(h,"value",_.value,x.value,C)}},$=(h,_,x,R,C,k,U,F,L)=>{let I=_.el=h?h.el:a(""),X=_.anchor=h?h.anchor:a(""),{patchFlag:B,dynamicChildren:K,slotScopeIds:G}=_;G&&(F=F?F.concat(G):G),h==null?(o(I,x,R),o(X,x,R),T(_.children||[],x,X,C,k,U,F,L)):B>0&&B&64&&K&&h.dynamicChildren&&h.dynamicChildren.length===K.length?(M(h.dynamicChildren,K,x,C,k,U,F),(_.key!=null||C&&_===C.subTree)&&Nl(h,_,!0)):he(h,_,x,X,C,k,U,F,L)},P=(h,_,x,R,C,k,U,F,L)=>{_.slotScopeIds=F,h==null?_.shapeFlag&512?C.ctx.activate(_,x,R,U,L):W(_,x,R,C,k,U,L):j(h,_,L)},W=(h,_,x,R,C,k,U)=>{let F=h.component=Jf(h,R,C);if(Dr(h)&&(F.ctx.renderer=go),Qf(F,!1,U),F.asyncDep){if(C&&C.registerDep(F,ae,U,k),!h.el){let L=F.subTree=ye(xe);A(null,L,_,x),h.placeholder=L.el}}else ae(F,h,_,x,C,k,U)},j=(h,_,x)=>{let R=_.component=h.component;if(mE(h,_,x))if(R.asyncDep&&!R.asyncResolved){_.el=h.el,_.placeholder=h.placeholder,pe(R,_,x);return}else R.next=_,R.update();else _.el=h.el,_.placeholder=h.placeholder,R.vnode=_},ae=(h,_,x,R,C,k,U)=>{let F=()=>{if(h.isMounted){let{next:B,bu:K,u:G,parent:ue,vnode:me}=h;{let ft=Bf(h);if(ft){B&&(B.el=me.el,pe(h,B,U)),ft.asyncDep.then(()=>{let Qt=()=>{h.job.flags&8||(C&&C.pendingBranch?we(Qt,C):I())};Qt.flags=48,we(Qt,C)});return}}let de=B,Ce;Yn(h,!1),B?(B.el=me.el,pe(h,B,U)):B=me,K&&wn(K),(Ce=B.props&&B.props.onVnodeBeforeUpdate)&&st(Ce,ue,B,me),Yn(h,!0);let Le=Xs(h),Nt=h.subTree;h.subTree=Le,m(Nt,Le,c(Nt.el||Vo(Nt)),rs(Nt),h,C,k),B.el=Le.el,de===null&&mi(h,Le.el),G&&we(G,C),(Ce=B.props&&B.props.onVnodeUpdated)&&we(()=>st(Ce,ue,B,me),C)}else{let B,{el:K,props:G}=_,{bm:ue,m:me,parent:de,root:Ce,type:Le}=h,Nt=fn(_);if(Yn(h,!1),ue&&wn(ue),!Nt&&(B=G&&G.onVnodeBeforeMount)&&st(B,de,_),Yn(h,!0),K&&ta){let ft=()=>{h.subTree=Xs(h),ta(K,h.subTree,h,C,null)};Nt&&Le.__asyncHydrate?Le.__asyncHydrate(K,h,ft):ft()}else{Ce.ce&&Ce.ce._hasShadowRoot()&&Ce.ce._injectChildStyle(Le,h.parent?h.parent.type:void 0);let ft=h.subTree=Xs(h);m(null,ft,x,R,h,C,k),_.el=ft.el}if(me&&we(me,C),!Nt&&(B=G&&G.onVnodeMounted)){let ft=_;we(()=>st(B,de,ft),C)}(_.shapeFlag&256||de&&fn(de.vnode)&&de.vnode.shapeFlag&256)&&h.a&&we(h.a,C),h.isMounted=!0,_=x=R=null}};h.scope.on();let L=h.effect=new an(F);h.scope.off();let I=h.update=L.run.bind(L),X=h.job=L.runIfDirty.bind(L);X.i=h,X.id=h.uid,L.scheduler=()=>ai(X),Yn(h,!0),I()},pe=(h,_,x)=>{_.component=h;let R=h.vnode.props;h.vnode=_,h.next=null,EE(h,_.props,R,x),bE(h,_.children,x),Tt(),mf(h),wt()},he=(h,_,x,R,C,k,U,F,L=!1)=>{let I=h&&h.children,X=h?h.shapeFlag:0,B=_.children,{patchFlag:K,shapeFlag:G}=_;if(K>0){if(K&128){Me(I,B,x,R,C,k,U,F,L);return}else if(K&256){re(I,B,x,R,C,k,U,F,L);return}}G&8?(X&16&&qo(I,C,k),B!==I&&f(x,B)):X&16?G&16?Me(I,B,x,R,C,k,U,F,L):qo(I,C,k,!0):(X&8&&f(x,""),G&16&&T(B,x,R,C,k,U,F,L))},re=(h,_,x,R,C,k,U,F,L)=>{h=h||xn,_=_||xn;let I=h.length,X=_.length,B=Math.min(I,X),K;for(K=0;K<B;K++){let G=_[K]=L?un(_[K]):it(_[K]);m(h[K],G,x,null,C,k,U,F,L)}I>X?qo(h,C,k,!0,!1,B):T(_,x,R,C,k,U,F,L,B)},Me=(h,_,x,R,C,k,U,F,L)=>{let I=0,X=_.length,B=h.length-1,K=X-1;for(;I<=B&&I<=K;){let G=h[I],ue=_[I]=L?un(_[I]):it(_[I]);if(Ct(G,ue))m(G,ue,x,null,C,k,U,F,L);else break;I++}for(;I<=B&&I<=K;){let G=h[B],ue=_[K]=L?un(_[K]):it(_[K]);if(Ct(G,ue))m(G,ue,x,null,C,k,U,F,L);else break;B--,K--}if(I>B){if(I<=K){let G=K+1,ue=G<X?_[G].el:R;for(;I<=K;)m(null,_[I]=L?un(_[I]):it(_[I]),x,ue,C,k,U,F,L),I++}}else if(I>K)for(;I<=B;)et(h[I],C,k,!0),I++;else{let G=I,ue=I,me=new Map;for(I=ue;I<=K;I++){let pt=_[I]=L?un(_[I]):it(_[I]);pt.key!=null&&me.set(pt.key,I)}let de,Ce=0,Le=K-ue+1,Nt=!1,ft=0,Qt=new Array(Le);for(I=0;I<Le;I++)Qt[I]=0;for(I=G;I<=B;I++){let pt=h[I];if(Ce>=Le){et(pt,C,k,!0);continue}let Ut;if(pt.key!=null)Ut=me.get(pt.key);else for(de=ue;de<=K;de++)if(Qt[de-ue]===0&&Ct(pt,_[de])){Ut=de;break}Ut===void 0?et(pt,C,k,!0):(Qt[Ut-ue]=I+1,Ut>=ft?ft=Ut:Nt=!0,m(pt,_[Ut],x,null,C,k,U,F,L),Ce++)}let Uc=Nt?SE(Qt):xn;for(de=Uc.length-1,I=Le-1;I>=0;I--){let pt=ue+I,Ut=_[pt],Bc=_[pt+1],Hc=pt+1<X?Bc.el||Vo(Bc):R;Qt[I]===0?m(null,Ut,x,Hc,C,k,U,F,L):Nt&&(de<0||I!==Uc[de]?Ee(Ut,x,Hc,2):de--)}}},Ee=(h,_,x,R,C=null)=>{let{el:k,type:U,transition:F,children:L,shapeFlag:I}=h;if(I&6){Ee(h.component.subTree,_,x,R);return}if(I&128){h.suspense.move(_,x,R);return}if(I&64){U.move(h,_,x,go);return}if(U===Ve){o(k,_,x);for(let B=0;B<L.length;B++)Ee(L[B],_,x,R);o(h.anchor,_,x);return}if(U===pn){y(h,_,x);return}if(R!==2&&I&1&&F)if(R===0)F.persisted&&!k[Et]?o(k,_,x):(F.beforeEnter(k),o(k,_,x),we(()=>F.enter(k),C));else{let{leave:B,delayLeave:K,afterLeave:G}=F,ue=()=>{h.ctx.isUnmounted?r(k):o(k,_,x)},me=()=>{let de=k._isLeaving||!!k[Et];k._isLeaving&&k[Et](!0),F.persisted&&!de?ue():B(k,()=>{ue(),G&&G()})};K?K(k,ue,me):me()}else o(k,_,x)},et=(h,_,x,R=!1,C=!1)=>{let{type:k,props:U,ref:F,children:L,dynamicChildren:I,shapeFlag:X,patchFlag:B,dirs:K,cacheIndex:G,memo:ue}=h;if((B===-2||I&&I.hasOnce)&&(C=!1),F!=null&&(Tt(),ko(F,null,x,h,!0),wt()),G!=null&&(!h.ctx||h.ctx===_)&&(_.renderCache[G]=void 0),X&256&&_.ctx.deactivate(h))return;let me=X&1&&K,de=!fn(h),Ce;if(de&&(Ce=U&&U.onVnodeBeforeUnmount)&&st(Ce,_,h),X&6)Hh(h.component,x,R);else{if(X&128){h.suspense.unmount(x,R);return}me&&Xt(h,null,_,"beforeUnmount"),X&64?h.type.remove(h,_,x,go,R):I&&!I.hasOnce&&(k!==Ve||B>0&&B&64)?qo(I,_,x,!1,!0):(k===Ve&&B&384||!C&&X&16)&&qo(L,_,x),R&&Zi(h)}let Le=ue!=null&&G==null;(de&&(Ce=U&&U.onVnodeUnmounted)||me||Le)&&we(()=>{Ce&&st(Ce,_,h),me&&Xt(h,null,_,"unmounted"),Le&&(h.el=null)},x)},Zi=h=>{let{type:_,el:x,anchor:R,transition:C}=h,k=_===Ve;if(k&&!C){$c(x,R);return}if(_===pn){g(h),C&&!C.persisted&&C.afterLeave&&C.afterLeave();return}let U=k?Nr(h):h,F=()=>{k?c(x)&&$c(x,R):r(x),C&&!C.persisted&&C.afterLeave&&C.afterLeave()};if(U&&U.shapeFlag&1&&C&&!C.persisted){let{leave:L,delayLeave:I}=C,X=U.el,B=()=>L(X,F);I?I(X,F,B):B()}else F()},$c=(h,_)=>{let x;for(;h!==_;)x=p(h),r(h),h=x;r(_)},Hh=(h,_,x)=>{let{bum:R,scope:C,job:k,subTree:U,um:F,m:L,a:I}=h;Zs(L),Zs(I),R&&wn(R),C.stop(),k?(k.flags|=8,et(U,h,_,x)):U&&(U.transition=h.vnode.transition,et(U,h,_,x)),F&&we(F,_);let X=()=>{h.isUnmounted=!0};X.flags=16,we(X,_)},qo=(h,_,x,R=!1,C=!1,k=0)=>{for(let U=k;U<h.length;U++)et(h[U],_,x,R,C)},rs=h=>{if(h.shapeFlag&6)return rs(h.component.subTree);if(h.shapeFlag&128)return h.suspense.next();let _=p(h.anchor||h.el),x=_&&_[Nf];return x?p(x):_},Fc=(h,_,x)=>{let R=h&&_._vnode?void 0:h&&h.component?h.component.uid:LE();qm(()=>{h==null?_._vnode&&et(_._vnode,null,null,!0):m(_._vnode||null,h,_,null,null,null,x),_._vnode=h},R)},go={p:m,um:et,m:Ee,r:Zi,mt:W,mc:T,pc:he,pbc:M,n:rs,o:e},ea,ta;return t&&([ea,ta]=t(go)),{render:Fc,hydrate:ea,createApp:cE(Fc,ea)}}function Ja({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Yn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Uf(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Nl(e,t,n=!1){let o=e.children,r=t.children;if(H(o)&&H(r))for(let s=0;s<o.length;s++){let i=o[s],a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=un(r[s]),a.el=i.el),!n&&a.patchFlag!==-2&&Nl(i,a)),a.type===Dn&&(a.patchFlag===-1&&(a=r[s]=un(a)),a.el=i.el),a.type===xe&&!a.el&&(a.el=i.el)}}function SE(e){let t=e.slice(),n=[0],o,r,s,i,a,l=e.length;for(o=0;o<l;o++){let u=e[o];if(u!==0){if(r=n[n.length-1],e[r]<u){t[o]=r,n.push(o);continue}for(s=0,i=n.length-1;s<i;)a=s+i>>1,e[n[a]]<u?s=a+1:i=a;u<e[n[s]]&&(s>0&&(t[o]=n[s-1]),n[s]=o)}}for(s=n.length,i=n[s-1];s-- >0;)n[s]=i,i=t[i];return n}function Bf(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Bf(t)}function Zs(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Vo(e){if(e.placeholder)return e.placeholder;let t=e.component;if(t)return Vo(t.subTree);let n=e.suspense;return n&&n.activeBranch?Vo(n.activeBranch):null}var ei=e=>e.__isSuspense,ol=0,rl=Symbol("_deferredEnter"),xE={name:"Suspense",__isSuspense:!0,process(e,t,n,o,r,s,i,a,l,u){if(e==null)wE(t,n,o,r,s,i,a,l,u);else{let f=e.suspense;if(s&&s.deps>0&&!s.isHydrating){let c=f.parentComponent;if(!!c&&c.suspense===s&&c.suspenseId!==s.pendingId?s.pendingBranch&&!Ct(t.ssContent,f.pendingBranch||f.activeBranch):!f.isInFallback){t.suspense=f,f.vnode=t,t.el=e.el;return}}OE(e,t,n,o,r,i,a,l,u)}},hydrate:CE,normalize:AE},TE=xE;function xr(e,t){let n=e.props&&e.props[t];Z(n)&&n()}function uf(e){let t=[];sl(e,t,!0),t.length&&Gt(t)}function sl(e,t,n){let{el:o,transition:r,children:s,shapeFlag:i}=e;if(i&6){sl(e.component.subTree,t,n);return}if(!(i&192)&&(i&1&&(!n&&o&&o[rl]&&(o[rl]=void 0,r&&!r.persisted&&(r.beforeEnter(o),t.push(()=>r.enter(o)))),n=!1),i&16))for(let a=0;a<s.length;a++)sl(s[a],t,n)}function wE(e,t,n,o,r,s,i,a,l){let{p:u,o:{createElement:f}}=l,c=f("div"),p=e.suspense=Hf(e,r,o,t,c,n,s,i,a,l);u(null,p.pendingBranch=e.ssContent,c,null,o,p,s,i),p.deps>0?(xr(e,"onPending"),xr(e,"onFallback"),u(null,e.ssFallback,t,n,o,null,s,i),Ro(p,e.ssFallback)):p.resolve(!1,!0)}function OE(e,t,n,o,r,s,i,a,{p:l,um:u,o:{createElement:f}}){let c=t.suspense=e.suspense;c.vnode=t,t.el=e.el;let p=t.ssContent,d=t.ssFallback,{activeBranch:v,pendingBranch:m,isInFallback:N,isHydrating:A}=c;if(m)c.pendingBranch=p,Ct(m,p)?(c.deps++,l(m,p,A?n:c.hiddenContainer,null,r,c,s,i,a),c.deps--,c.deps<=0?c.resolve():N&&!A&&!c.isFallbackMountPending&&(l(v,d,n,o,r,null,s,i,a),Ro(c,d))):(c.pendingId=ol++,A?(c.isHydrating=!1,c.activeBranch=m):u(m,r,c),c.deps=0,jf(c),c.hiddenContainer=f("div"),N?(l(null,p,c.hiddenContainer,null,r,c,s,i,a),c.deps<=0?c.resolve():c.isFallbackMountPending||(l(v,d,n,o,r,null,s,i,a),Ro(c,d))):v&&Ct(v,p)?(l(v,p,n,o,r,c,s,i,a),c.resolve(!0)):(l(null,p,c.hiddenContainer,null,r,c,s,i,a),c.deps<=0&&c.resolve()));else if(v&&Ct(v,p))l(v,p,n,o,r,c,s,i,a),Ro(c,p);else if(xr(t,"onPending"),c.pendingBranch=p,c.pendingId=ol++,l(null,p,c.hiddenContainer,null,r,c,s,i,a),c.deps<=0)c.resolve();else{let{timeout:b}=c;b>0?c.timeoutTimer=setTimeout(()=>{c.timeoutTimer=void 0,c.fallback(c.vnode.ssFallback)},b):b===0&&c.fallback(d)}}function Hf(e,t,n,o,r,s,i,a,l,u,f=!1){let{p:c,m:p,um:d,n:v,o:{parentNode:m,remove:N}}=u,A,b=DE(e);b&&t&&t.pendingBranch&&(A=t.pendingId,t.deps++);let E=e.props?xo(e.props.timeout):void 0,y=s,g={vnode:e,parent:t,parentComponent:n,namespace:i,container:o,hiddenContainer:r,deps:0,pendingId:ol++,timeout:typeof E=="number"?E:-1,timeoutTimer:void 0,activeBranch:null,isFallbackMountPending:!1,pendingBranch:null,isInFallback:!f,isHydrating:f,isUnmounted:!1,effects:[],resolve(O=!1,D=!1){let{vnode:S,activeBranch:T,pendingBranch:V,pendingId:M,effects:w,parentComponent:$,container:P,isInFallback:W}=g,j=g.parent;for(;j&&!j.pendingBranch;)j=j.parent;let ae=!1;if(g.isHydrating)g.isHydrating=!1;else if(!O){ae=T&&V.transition&&V.transition.mode==="out-in";let he=!1;ae&&(T.transition.afterLeave=()=>{if(M===g.pendingId&&!g.isUnmounted){uf(V),p(V,P,s===y&&!he?v(T):s,0);let re=!1;if(j){let Me=P,Ee;for(;Ee=m(Me);)Me=Ee;re=Me===j.hiddenContainer}re||Gt(w),W&&S.ssFallback&&(S.ssFallback.el=null)}}),T&&!g.isFallbackMountPending&&(m(T.el||Vo(T))===P&&(s=v(T),he=!0),d(T,$,g,!0),!ae&&W&&S.ssFallback&&we(()=>S.ssFallback.el=null,g)),ae||(uf(V),p(V,P,s,0))}clearTimeout(g.timeoutTimer),g.timeoutTimer=void 0,g.isFallbackMountPending=!1,Ro(g,V),g.pendingBranch=null,g.isInFallback=!1;let pe=0;for(let he=0;he<w.length;he++){let re=w[he];re.flags&32?Gt(re):w[pe++]=re}if(w.length=pe,j)for(let he=0;he<w.length;he++)j.effects.push(w[he]);else ae||Gt(w);g.effects=[],b&&t&&t.pendingBranch&&A===t.pendingId&&(A=void 0,t.deps--,t.deps===0&&!D&&t.resolve()),xr(S,"onResolve")},fallback(O){if(g.isUnmounted||!g.pendingBranch)return;let{vnode:D,activeBranch:S,parentComponent:T,container:V,namespace:M}=g;xr(D,"onFallback");let w=v(S),$=()=>{if(g.isFallbackMountPending=!1,g.isUnmounted||!g.isInFallback)return;let W=g.vnode.ssFallback;c(null,W,V,w,T,null,M,a,l),Ro(g,W)},P=O.transition&&O.transition.mode==="out-in";P&&(g.isFallbackMountPending=!0,S.transition.afterLeave=$),g.isInFallback=!0,d(S,T,null,!0),P||$()},move(O,D,S){g.activeBranch&&p(g.activeBranch,O,D,S),g.container=O},next(){return g.activeBranch&&v(g.activeBranch)},registerDep(O,D,S,T){let V=!!g.pendingBranch;V&&g.deps++;let M=O.vnode.el,w=$=>{O.asyncResolved=!0;let{vnode:P}=O;il(O,$,!1),M&&(P.el=M);let W=!M&&O.subTree.el;D(O,P,m(M||O.subTree.el),M?null:v(O.subTree),g,T,S),W&&(P.placeholder=null,N(W)),mi(O,P.el)};O.asyncDep.catch($=>(O.scope.active&&so($,O,0,!1,!0),()=>null)).then($=>{if(O.isUnmounted||g.isUnmounted)return;let P=V&&g.pendingId===O.suspenseId;if(Or(),!O.scope.active){P&&--g.deps===0&&g.resolve();return}if(!P&&g.pendingBranch){let W=()=>{O.isUnmounted||g.isUnmounted||!O.scope.active||(g.pendingBranch?ti(W,g):w($))};W.flags=48,ti(W,g);return}w($),P&&--g.deps===0&&g.resolve()})},unmount(O,D){if(g.isUnmounted=!0,clearTimeout(g.timeoutTimer),g.timeoutTimer=void 0,A!==void 0){let S=g.parent,T=A;A=void 0,Gt(()=>{S.pendingId===T&&!S.isUnmounted&&--S.deps===0&&S.resolve()})}g.activeBranch&&d(g.activeBranch,n,O,D),g.pendingBranch&&(d(g.pendingBranch,n,g,D),jf(g))}};return g}function CE(e,t,n,o,r,s,i,a,l){let u=t.suspense=Hf(t,o,n,e.parentNode,document.createElement("div"),null,r,s,i,a,!0),f=l(e,u.pendingBranch=t.ssContent,n,u,s,i);return u.deps===0&&u.resolve(!1,!0),f}function AE(e){let{shapeFlag:t,children:n}=e,o=t&32;e.ssContent=ff(o?n.default:n),e.ssFallback=o?ff(n.fallback):ye(xe)}function ff(e){let t;if(Z(e)){let n=no&&e._c;n&&(e._d=!1,Tr()),e=e(),n&&(e._d=!0,t=Ge,gi())}return H(e)&&(e=El(e)),e=it(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter(n=>n!==e)),e}function jf(e){let{effects:t}=e;for(let n=0;n<t.length;n++){let o=t[n];o.flags&16&&Gt(o)}t.length=0}function ti(e,t){t&&t.pendingBranch?H(e)?t.effects.push(...e):t.effects.push(e):Gt(e)}function Ro(e,t){e.activeBranch=t;let{vnode:n,parentComponent:o}=e,r=t.el;for(;!r&&t.component;)t=t.component.subTree,r=t.el;n.el=r,o&&o.subTree===n&&(o.vnode.el=r,mi(o,r))}function DE(e){let t=e.props&&e.props.suspensible;return t!=null&&t!==!1}var Ve=Symbol.for("v-fgt"),Dn=Symbol.for("v-txt"),xe=Symbol.for("v-cmt"),pn=Symbol.for("v-stc"),dn=[],Ge=null;function Tr(e=!1){dn.push(Ge=e?null:[])}function gi(){dn.pop(),Ge=dn[dn.length-1]||null}var no=1;function wr(e,t=!1){no+=e,e<0&&Ge&&t&&(Ge.hasOnce=!0)}function Wf(e){return e.dynamicChildren=no>0?Ge||xn:null,gi(),no>0&&Ge&&Ge.push(e),e}function IE(e,t,n,o,r,s){return Wf(Sl(e,t,n,o,r,s,!0))}function ni(e,t,n,o,r){return Wf(ye(e,t,n,o,r,!0))}function hn(e){return e?e.__v_isVNode===!0:!1}function Ct(e,t){return e.type===t.type&&e.key===t.key}var kE;function VE(e){kE=e}var Kf=({key:e})=>e??null,zs=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?z(e)||Ne(e)||Z(e)?{i:je,r:e,k:t,f:!!n}:e:null);function Sl(e,t=null,n=null,o=0,r=null,s=e===Ve?0:1,i=!1,a=!1){let l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Kf(t),ref:t&&zs(t),scopeId:li,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:o,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:je};return a?(oi(l,n),s&128&&e.normalize(l)):n&&(l.shapeFlag|=z(n)?8:16),no>0&&!i&&Ge&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&Ge.push(l),l}var ye=RE;function RE(e,t=null,n=null,o=0,r=null,s=!1){if((!e||e===Of)&&(e=xe),hn(e)){let a=qt(e,t,!0);return n&&oi(a,n),no>0&&!s&&Ge&&(a.shapeFlag&6?Ge[Ge.indexOf(e)]=a:Ge.push(a)),a.patchFlag=-2,a}if(HE(e)&&(e=e.__vccOpts),t){t=Xf(t);let{class:a,style:l}=t;a&&!z(a)&&(t.class=Xn(a)),ie(l)&&(qn(l)&&!H(l)&&(l=q({},l)),t.style=Kn(l))}let i=z(e)?1:ei(e)?128:ui(e)?64:ie(e)?4:Z(e)?2:0;return Sl(e,t,n,o,r,i,s,!0)}function Xf(e){return e?qn(e)?q({},e):Rf(e)?q({},e[tp]||e):e:null}function qt(e,t,n=!1,o=!1){let{props:r,ref:s,patchFlag:i,children:a,transition:l}=e,u=t?Gf(r||{},t):r,f={__v_isVNode:!0,__v_skip:!0,type:e.type,props:u,key:u&&Kf(u),ref:t&&t.ref?n&&s?H(s)?s.concat(zs(t)):[s,zs(t)]:zs(t):s,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Ve?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&qt(e.ssContent),ssFallback:e.ssFallback&&qt(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce,cacheIndex:e.cacheIndex};return l&&o&&At(f,l.clone(f)),f}function xl(e=" ",t=0){return ye(Dn,null,e,t)}function PE(e,t){let n=ye(pn,null,e);return n.staticCount=t,n}function zf(e="",t=!1){return t?(Tr(),ni(xe,null,e)):ye(xe,null,e)}function it(e){return e==null||typeof e=="boolean"?ye(xe):H(e)?ye(Ve,null,e.slice()):hn(e)?un(e):ye(Dn,null,String(e))}function un(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:qt(e)}function oi(e,t){let n=0,{shapeFlag:o}=e;if(t==null)t=null;else if(H(t))n=16;else if(typeof t=="object")if(o&65){let r=t.default;r&&(r._c&&(r._d=!1),oi(e,r()),r._c&&(r._d=!0));return}else{n=32;let r=t._;!r&&!Rf(t)?t._ctx=je:r===3&&je&&(je.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else if(Z(t)){if(o&65){oi(e,{default:t});return}t={default:t,_ctx:je},n=32}else t=String(t),o&64?(n=16,t=[xl(t)]):n=8;e.children=t,e.shapeFlag|=n}function Gf(...e){let t={};for(let n=0;n<e.length;n++){let o=e[n];for(let r in o)if(r==="class")t.class!==o.class&&(t.class=Xn([t.class,o.class]));else if(r==="style")t.style=Kn([t.style,o.style]);else if(Ht(r)){let s=t[r],i=o[r];i&&s!==i&&!(H(s)&&s.includes(i))?t[r]=s?[].concat(s,i):i:i==null&&s==null&&!No(r)&&(t[r]=i)}else r!==""&&(t[r]=o[r])}return t}function st(e,t,n,o=null){vt(e,t,7,[n,o])}var ME=Af(),qf=0;function LE(){return qf}function Jf(e,t,n){let o=e.type,r=(t?t.appContext:e.appContext)||ME,s={uid:qf++,vnode:e,type:o,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Gn(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:vE(o,r),emitsOptions:pE(o,r),emit:null,emitted:null,propsDefaults:ee,inheritAttrs:o.inheritAttrs,ctx:ee,data:ee,props:ee,attrs:ee,slots:ee,refs:ee,setupState:ee,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=fE.bind(null,s),e.ce&&e.ce(s),s}var He=null,qe=()=>He||je,ri,In;{let e=ir(),t=(n,o)=>{let r;return(r=e[n])||(r=e[n]=[]),r.push(o),s=>{r.length>1?r.forEach(i=>i(s)):r[0](s)}};ri=t("__VUE_INSTANCE_SETTERS__",n=>He=n),In=t("__VUE_SSR_SETTERS__",n=>oo=n)}var Ei=e=>{let t=He;return ri(e),e.scope.on(),()=>{e.scope.off(),ri(t)}},Or=()=>{He&&He.scope.off(),ri(null)};function Yf(e){return e.vnode.shapeFlag&4}var oo=!1;function Qf(e,t=!1,n=!1){t&&In(t);let{props:o,children:r}=e.vnode,s=Yf(e);gE(e,o,s,t),yE(e,r,n||t);let i=s?$E(e,t):void 0;return t&&In(!1),i}function $E(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,el);let{setup:o}=n;if(o){Tt();let r=e.setupContext=o.length>1?np(e):null,s=Ei(e),i=ro(o,e,0,[e.props,r]),a=bs(i);if(wt(),s(),(a||e.sp)&&!fn(e)&&Tf(e),a){if(i.then(Or,Or),t)return i.then(l=>{In(!0);try{il(e,l,t)}finally{In(!1)}}).catch(l=>{so(l,e,0,void 0,!0),e.ssrRender=(u,f)=>f("<!---->")});e.asyncDep=i}else il(e,i,t)}else ep(e,t)}function il(e,t,n){Z(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:ie(t)&&(e.setupState=mr(t)),ep(e,n)}var si,al;function Tl(e){si=e,al=t=>{t.render._rc&&(t.withProxy=new Proxy(t.ctx,Gg))}}var Zf=()=>!si;function ep(e,t,n){let o=e.type;if(!e.render){if(!t&&si&&!o.render){let r=o.template||!1;if(r){let{isCustomElement:s,compilerOptions:i}=e.appContext.config,{delimiters:a,compilerOptions:l}=o,u=q(q({isCustomElement:s,delimiters:a},i),l);o.render=si(r,u)}}e.render=o.render||De,al&&al(e)}}var tp=Symbol(),FE={get(e,t){return Be(e,"get",""),t===tp?e:e[t]}};function np(e){let t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,FE),slots:e.slots,emit:e.emit,expose:t}}function kr(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(mr(Ms(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in _r)return _r[n](e)},has(t,n){return n in t||n in _r}})):e.proxy}var UE=/(?:^|[-_])\w/g,BE=e=>e.replace(UE,t=>t.toUpperCase()).replace(/[-_]/g,"");function ii(e,t=!0){return Z(e)?e.displayName||e.name:e.name||t&&e.__name}function op(e,t,n=!1){let o=ii(t);if(!o&&t.__file){let r=t.__file.match(/([^/\\]+)\.\w+$/);r&&(o=r[1])}if(!o&&e){let r=s=>{for(let i in s)if(s[i]===t)return i};o=r(e.components)||e.parent&&r(e.parent.type.components)||r(e.appContext.components)}return o?BE(o):n?"App":"Anonymous"}function HE(e){return Z(e)&&"__vccOpts"in e}var Fe=(e,t)=>Gu(e,t,oo);function wl(e,t,n){try{wr(-1);let o=arguments.length;return o===2?ie(t)&&!H(t)?hn(t)?ye(e,null,[t]):ye(e,t):ye(e,null,t):(o>3?n=Array.prototype.slice.call(arguments,2):o===3&&hn(n)&&(n=[n]),ye(e,t,n))}finally{wr(1)}}function rp(){return;function s(c){let p=[];c.type.props&&c.props&&p.push(i("props",Q(c.props))),c.setupState!==ee&&p.push(i("setup",c.setupState)),c.data!==ee&&p.push(i("data",Q(c.data)));let d=l(c,"computed");d&&p.push(i("computed",d));let v=l(c,"inject");return v&&p.push(i("injected",v)),p.push(["div",{},["span",{style:o.style+";opacity:0.66"},"$ (internal): "],["object",{object:c}]]),p}function i(c,p){return p=q({},p),Object.keys(p).length?["div",{style:"line-height:1.25em;margin-bottom:0.6em"},["div",{style:"color:#476582"},c],["div",{style:"padding-left:1.25em"},...Object.keys(p).map(d=>["div",{},["span",o,d+": "],a(p[d],!1)])]]:["span",{}]}function a(c,p=!0){return typeof c=="number"?["span",t,c]:typeof c=="string"?["span",n,JSON.stringify(c)]:typeof c=="boolean"?["span",o,c]:ie(c)?["object",{object:p?Q(c):c}]:["span",n,String(c)]}function l(c,p){let d=c.type;if(Z(d))return;let v={};for(let m in c.ctx)u(d,m,p)&&(v[m]=c.ctx[m]);return v}function u(c,p,d){let v=c[d];if(H(v)&&v.includes(p)||ie(v)&&p in v||c.extends&&u(c.extends,p,d)||c.mixins&&c.mixins.some(m=>u(m,p,d)))return!0}function f(c){return $e(c)?"ShallowRef":c.effect?"ComputedRef":"Ref"}}function jE(e,t,n,o){let r=n[o];if(r&&sp(r,e))return r;let s=t();return s.memo=e.slice(),s.cacheIndex=o,n[o]=s}function sp(e,t){let n=e.memo;if(n.length!=t.length)return!1;for(let o=0;o<n.length;o++)if(Ie(n[o],t[o]))return!1;return no>0&&Ge&&Ge.push(e),!0}var ip="3.5.46",vi=De,WE=Xm,KE=Do,XE=Ef,zE={createComponentInstance:Jf,setupComponent:Qf,renderComponentRoot:Xs,setCurrentRenderingInstance:br,isVNode:hn,normalizeVNode:it,getComponentPublicInstance:kr,ensureValidVNode:gl,pushWarningContext:$m,popWarningContext:Fm},GE=zE,qE=null,JE=null,YE=null;var Il,ap=typeof window<"u"&&window.trustedTypes;if(ap)try{Il=ap.createPolicy("vue",{createHTML:e=>e})}catch{}var Cp=Il?e=>Il.createHTML(e):e=>e,QE="http://www.w3.org/2000/svg",ZE="http://www.w3.org/1998/Math/MathML",gn=typeof document<"u"?document:null,lp=gn&&gn.createElement("template"),Ap={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,o)=>{let r=t==="svg"?gn.createElementNS(QE,e):t==="mathml"?gn.createElementNS(ZE,e):n?gn.createElement(e,{is:n}):gn.createElement(e);return e==="select"&&o&&o.multiple!=null&&r.setAttribute("multiple",o.multiple),r},createText:e=>gn.createTextNode(e),createComment:e=>gn.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>gn.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,o,r,s){let i=n?n.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),!(r===s||!(r=r.nextSibling)););else{lp.innerHTML=Cp(o==="svg"?`<svg>${e}</svg>`:o==="mathml"?`<math>${e}</math>`:e);let a=lp.content;if(o==="svg"||o==="mathml"){let l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},kn="transition",Vr="animation",Mo=Symbol("_vtc"),Dp={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Ip=q({},pi,Dp),ev=e=>(e.displayName="Transition",e.props=Ip,e),tv=ev((e,{slots:t})=>wl(cl,kp(e),t)),io=(e,t=[])=>{H(e)?e.forEach(n=>n(...t)):e&&e(...t)},cp=e=>e?H(e)?e.some(t=>t.length>1):e.length>1:!1;function kp(e){let t={};for(let w in e)w in Dp||(t[w]=e[w]);if(e.css===!1)return t;let{name:n="v",type:o,duration:r,enterFromClass:s=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:a=`${n}-enter-to`,appearFromClass:l=s,appearActiveClass:u=i,appearToClass:f=a,leaveFromClass:c=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:d=`${n}-leave-to`}=e,v=nv(r),m=v&&v[0],N=v&&v[1],{onBeforeEnter:A,onEnter:b,onEnterCancelled:E,onLeave:y,onLeaveCancelled:g,onBeforeAppear:O=A,onAppear:D=b,onAppearCancelled:S=E}=t,T=(w,$,P,W)=>{w._enterResolve=void 0,w._enterCancelled=W,Vn(w,$?f:a),Vn(w,$?u:i),P&&P()},V=(w,$)=>{w._leaveResolve=void 0,w._isLeaving=!1,Vn(w,c),Vn(w,d),Vn(w,p),$&&$()},M=w=>($,P)=>{let W=w?D:b,j=()=>{$._enterResolve===j&&T($,w,P)};$._enterResolve=j,io(W,[$,j]),up(()=>{Vn($,w?l:s),$._enterResolve===j&&(Jt($,w?f:a),cp(W)||fp($,o,m,j))})};return q(t,{onBeforeEnter(w){io(A,[w]),Jt(w,s),Jt(w,i)},onBeforeAppear(w){io(O,[w]),Jt(w,l),Jt(w,u)},onEnter:M(!1),onAppear:M(!0),onLeave(w,$){w._isLeaving=!0;let P=()=>{w._leaveResolve===P&&V(w,$)};w._leaveResolve=P,Jt(w,c),w._enterCancelled?(Jt(w,p),kl(w)):(kl(w),Jt(w,p)),up(()=>{w._leaveResolve===P&&(Vn(w,c),Jt(w,d),cp(y)||fp(w,o,N,P))}),io(y,[w,P])},onEnterCancelled(w){T(w,!1,void 0,!0),io(E,[w])},onAppearCancelled(w){T(w,!0,void 0,!0),io(S,[w])},onLeaveCancelled(w){V(w),io(g,[w])}})}function nv(e){if(e==null)return null;if(ie(e))return[Ol(e.enter),Ol(e.leave)];{let t=Ol(e);return[t,t]}}function Ol(e){return xo(e)}function Jt(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e[Mo]||(e[Mo]=new Set)).add(t)}function Vn(e,t){t.split(/\s+/).forEach(o=>o&&e.classList.remove(o));let n=e[Mo];n&&(n.delete(t),n.size||(e[Mo]=void 0))}function up(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}var ov=0;function fp(e,t,n,o){let r=e._endId=++ov,s=()=>{r===e._endId&&o()};if(n!=null)return setTimeout(s,n);let{type:i,timeout:a,propCount:l}=Vp(e,t);if(!i)return o();let u=i+"end",f=0,c=()=>{e.removeEventListener(u,p),s()},p=d=>{d.target===e&&++f>=l&&c()};setTimeout(()=>{f<l&&c()},a+1),e.addEventListener(u,p)}function Vp(e,t){let n=window.getComputedStyle(e),o=v=>(n[v]||"").split(", "),r=o(`${kn}Delay`),s=o(`${kn}Duration`),i=pp(r,s),a=o(`${Vr}Delay`),l=o(`${Vr}Duration`),u=pp(a,l),f=null,c=0,p=0;t===kn?i>0&&(f=kn,c=i,p=s.length):t===Vr?u>0&&(f=Vr,c=u,p=l.length):(c=Math.max(i,u),f=c>0?i>u?kn:Vr:null,p=f?f===kn?s.length:l.length:0);let d=f===kn&&/\b(?:transform|all)(?:,|$)/.test(o(`${kn}Property`).toString());return{type:f,timeout:c,propCount:p,hasTransform:d}}function pp(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,o)=>dp(n)+dp(e[o])))}function dp(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function kl(e){return(e?e.ownerDocument:document).body.offsetHeight}function rv(e,t,n){let o=e[Mo];o&&(t=(t?[t,...o]:[...o]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}var Ni=Symbol("_vod"),Ml=Symbol("_vsh"),Rp={name:"show",beforeMount(e,{value:t},{transition:n}){e[Ni]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):Rr(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:o}){!t!=!n&&(o?t?(o.beforeEnter(e),Rr(e,!0),o.enter(e)):o.leave(e,()=>{Rr(e,!1)}):Rr(e,t))},beforeUnmount(e,{value:t}){Rr(e,t)}};function Rr(e,t){e.style.display=t?e[Ni]:"none",e[Ml]=!t}function sv(){Rp.getSSRProps=({value:e})=>{if(!e)return{style:{display:"none"}}}}var Pp=Symbol("");function iv(e){let t=qe();if(!t)return;let n=(s=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(i=>Si(i,s))},o={uid:String(t.uid),update:n};Oo(()=>o.update=void 0),t.ut=(s,i)=>{s&&(s[Lo]=[i,o],Mp(s),Vl(s)),n()};let r=()=>{let s=e(t.proxy);t.ce?Si(t.ce,s):Rl(t.subTree,s),n(s)};fl(()=>{Gt(r)}),Ir(()=>{Po(r,De,{flush:"post"});let s=new MutationObserver(r);s.observe(t.subTree.el.parentNode,{childList:!0}),dl(()=>s.disconnect())})}var Lo=Symbol("");function Vl(e,t){let[n,o]=e[Lo],r;if(o.update)for(let s=e;s&&s!==n;s=s.nextSibling)s.nodeType===1&&(!t||(t===!0||t.has(s))&&(s.getAttribute("data-v-owner")||o.uid)===o.uid)&&(s.setAttribute("data-v-owner",o.uid),r=o.update);return r}function Mp(e){let t=e.parentNode;if(t){let n=t[Lo];n||(n=t[Lo]=new Set,new MutationObserver(av).observe(t,{childList:!0})),n.add(e)}}function av(e,t){let n=e[0].target,o=n[Lo],r=new Set;for(let{addedNodes:i}of e)i.forEach(a=>r.add(a));let s=new Set;o.forEach(i=>{i.parentNode!==n?(o.delete(i),Mp(i),s.add(Vl(i,!0))):r.size&&s.add(Vl(i,r))}),s.forEach(i=>i&&i()),o.size||(t.disconnect(),n[Lo]=void 0)}function Rl(e,t){if(e.shapeFlag&128){let n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push(()=>{Rl(n.activeBranch,t)})}for(;e.component;)e=e.component.subTree;if(e.shapeFlag&1&&e.el)Si(e.el,t);else if(e.type===Ve)e.children.forEach(n=>Rl(n,t));else if(e.type===pn){let{el:n,anchor:o}=e;for(;n&&(Si(n,t),n!==o);)n=n.nextSibling}}function Si(e,t){if(e.nodeType===1){let n=e.style,o="";for(let r in t){let s=Ca(t[r]);n.setProperty(`--${r}`,s),o+=`--${r}: ${s};`}n[Pp]=o}}var lv=/(?:^|;)\s*display\s*:/;function cv(e,t,n){let o=e.style,r=z(n),s=!1;if(n&&!r){if(t)if(z(t))for(let i of t.split(";")){let a=i.slice(0,i.indexOf(":")).trim();n[a]==null&&Pr(o,a,"")}else for(let i in t)n[i]==null&&Pr(o,i,"");for(let i in n){i==="display"&&(s=!0);let a=n[i];a!=null?fv(e,i,!z(t)&&t?t[i]:void 0,a)||Pr(o,i,a):Pr(o,i,"")}}else if(r){if(t!==n){let i=o[Pp];i&&(n+=";"+i),o.cssText=n,s=lv.test(n)}}else t&&e.removeAttribute("style");Ni in e&&((!r||t!==n)&&(e[Ni]=s?o.display:""),e[Ml]&&(o.display="none"))}var _i=/\s*!important$/;function Pr(e,t,n){if(H(n))n.forEach(o=>Pr(e,t,o));else if(n==null&&(n=""),t.startsWith("--"))_i.test(n)?e.setProperty(t,n.replace(_i,""),"important"):e.setProperty(t,n);else{let o=uv(e,t);_i.test(n)?e.setProperty(ze(o),n.replace(_i,""),"important"):e[o]=n}}var hp=["Webkit","Moz","ms"],Cl={};function uv(e,t){let n=Cl[t];if(n)return n;let o=ce(t);if(o!=="filter"&&o in e)return Cl[t]=o;o=xt(o);for(let r=0;r<hp.length;r++){let s=hp[r]+o;if(s in e)return Cl[t]=s}return t}function fv(e,t,n,o){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&z(o)&&n===o}var mp="http://www.w3.org/1999/xlink";function gp(e,t,n,o,r,s=_u(t)){o&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(mp,t.slice(6,t.length)):e.setAttributeNS(mp,t,n):n==null||s&&!xs(n)?e.removeAttribute(t):e.setAttribute(t,s?"":Ae(n)?String(n):n)}function Ep(e,t,n,o,r){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?Cp(n):n);return}let s=e.tagName;if(t==="value"&&s!=="PROGRESS"&&!s.includes("-")){let a=s==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let i=!1;if(n===""||n==null){let a=typeof e[t];a==="boolean"?n=xs(n):n==null&&a==="string"?(n="",i=!0):a==="number"&&(n=0,i=!0)}try{e[t]=n}catch{}i&&e.removeAttribute(r||t)}function En(e,t,n,o){e.addEventListener(t,n,o)}function pv(e,t,n,o){e.removeEventListener(t,n,o)}var vp=Symbol("_vei");function dv(e,t,n,o,r=null){let s=e[vp]||(e[vp]={}),i=s[t];if(o&&i)i.value=o;else{let[a,l]=gv(t);if(o){let u=s[t]=_v(o,r);En(e,a,u,l)}else i&&(pv(e,a,i,l),s[t]=void 0)}}var hv=/(Once|Passive|Capture)$/,mv=/^on:?(?:Once|Passive|Capture)$/;function gv(e){let t,n;for(;(n=e.match(hv))&&!mv.test(e);)t||(t={}),e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===":"?e.slice(3):ze(e.slice(2)),t]}var Al=0,Ev=Promise.resolve(),vv=()=>Al||(Ev.then(()=>Al=0),Al=Date.now());function _v(e,t){let n=o=>{if(!o._vts)o._vts=Date.now();else if(o._vts<=n.attached)return;let r=n.value;if(H(r)){let s=o.stopImmediatePropagation;o.stopImmediatePropagation=()=>{s.call(o),o._stopped=!0};let i=r.slice(),a=[o];for(let l=0;l<i.length&&!o._stopped;l++){let u=i[l];u&&vt(u,t,5,a)}}else vt(r,t,5,[o])};return n.value=e,n.attached=vv(),n}var _p=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Lp=(e,t,n,o,r,s)=>{let i=r==="svg";t==="class"?rv(e,o,i):t==="style"?cv(e,n,o):Ht(t)?No(t)||dv(e,t,n,o,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):yv(e,t,o,i))?(Ep(e,t,o),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&gp(e,t,o,i,s,t!=="value")):e._isVueCE&&(bv(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!z(o)))?Ep(e,ce(t),o,s,t):(t==="true-value"?e._trueValue=o:t==="false-value"&&(e._falseValue=o),gp(e,t,o,i))};function yv(e,t,n,o){if(o)return!!(t==="innerHTML"||t==="textContent"||t in e&&_p(t)&&Z(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){let r=e.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return _p(t)&&z(n)?!1:t in e}function bv(e,t){let n=e._def.props;if(!n)return!1;let o=ce(t);return Array.isArray(n)?n.some(r=>ce(r)===o):Object.keys(n).some(r=>ce(r)===o)}var yp={};function $p(e,t,n){let o=at(e,t);So(o)&&(o=q({},o,t));class r extends xi{constructor(i){super(o,i,n)}}return r.def=o,r}var Nv=((e,t)=>$p(e,t,Jp)),Sv=typeof HTMLElement<"u"?HTMLElement:class{},xi=class e extends Sv{constructor(t,n={},o=Lr){super(),this._def=t,this._props=n,this._createApp=o,this._isVueCE=!0,this._instance=null,this._app=null,this._nonce=this._def.nonce,this._connected=!1,this._resolved=!1,this._patching=!1,this._dirty=!1,this._numberProps=null,this._styleChildren=new WeakSet,this._styleAnchors=new WeakMap,this._ob=null,this.shadowRoot&&o!==Lr?this._root=this.shadowRoot:t.shadowRoot!==!1?(this.attachShadow(q({},t.shadowRootOptions,{mode:"open"})),this._root=this.shadowRoot):this._root=this}connectedCallback(){if(!this.isConnected)return;!this.shadowRoot&&!this._resolved&&this._parseSlots(),this._connected=!0;let t=this;for(;t=t&&(t.assignedSlot||t.parentNode||t.host);)if(t instanceof e){this._parent=t;break}this._instance||(this._resolved?this._mount(this._def):t&&t._pendingResolve?this._pendingResolve=t._pendingResolve.then(()=>{if(this._pendingResolve=void 0,this.isConnected)return this._resolveDef()}):this._resolveDef())}_setParent(t=this._parent){t&&(this._instance.parent=t._instance,this._inheritParentContext(t))}_inheritParentContext(t=this._parent){t&&this._app&&Object.setPrototypeOf(this._app._context.provides,t._instance.provides)}disconnectedCallback(){this._connected=!1,Cr(()=>{this._connected||(this._ob&&(this._ob.disconnect(),this._ob=null),this._app&&this._app.unmount(),this._instance&&(this._instance.ce=void 0),this._app=this._instance=null,this._teleportTargets&&(this._teleportTargets.clear(),this._teleportTargets=void 0))})}_processMutations(t){for(let n of t)this._setAttr(n.attributeName)}_resolveDef(){if(this._pendingResolve)return this._pendingResolve;for(let o=0;o<this.attributes.length;o++)this._setAttr(this.attributes[o].name);this._ob=new MutationObserver(this._processMutations.bind(this)),this._ob.observe(this,{attributes:!0});let t=(o,r=!1)=>{this._resolved=!0,this._pendingResolve=void 0;let{props:s,styles:i}=o,a;if(s&&!H(s))for(let l in s){let u=s[l];(u===Number||u&&u.type===Number)&&(l in this._props&&(this._props[l]=xo(this._props[l])),(a||(a=Object.create(null)))[ce(l)]=!0)}this._numberProps=a,this._resolveProps(o),this.shadowRoot&&this._applyStyles(i),this._connected&&this._mount(o)},n=this._def.__asyncLoader;if(n)return this._pendingResolve=n().then(o=>{o.configureApp=this._def.configureApp,t(this._def=o,!0)}),this._pendingResolve;t(this._def)}_mount(t){this._app=this._createApp(t),this._inheritParentContext(),t.configureApp&&t.configureApp(this._app),this._app._ceVNode=this._createVNode(),this._app.mount(this._root);let n=this._instance&&this._instance.exposed;if(n)for(let o in n)le(this,o)||Object.defineProperty(this,o,{get:()=>Jn(n[o])})}_resolveProps(t){let{props:n}=t,o=H(n)?n:Object.keys(n||{});for(let r of Object.keys(this))r[0]!=="_"&&o.includes(r)&&this._setProp(r,this[r]);for(let r of o.map(ce))Object.defineProperty(this,r,{get(){return this._getProp(r)},set(s){this._setProp(r,s,!0,!this._patching)}})}_setAttr(t){if(t.startsWith("data-v-"))return;let n=this.hasAttribute(t),o=n?this.getAttribute(t):yp,r=ce(t);n&&this._numberProps&&this._numberProps[r]&&(o=xo(o)),this._setProp(r,o,!1,!0)}_getProp(t){return this._props[t]}_setProp(t,n,o=!0,r=!1){if(n!==this._props[t]&&(this._dirty=!0,n===yp?delete this._props[t]:(this._props[t]=n,t==="key"&&this._app&&(this._app._ceVNode.key=n)),r&&this._instance&&this._update(),o)){let s=this._ob;s&&(this._processMutations(s.takeRecords()),s.disconnect()),n===!0?this.setAttribute(ze(t),""):typeof n=="string"||typeof n=="number"?this.setAttribute(ze(t),n+""):n||this.removeAttribute(ze(t)),s&&s.observe(this,{attributes:!0})}}_update(){let t=this._createVNode();this._app&&(t.appContext=this._app._context),qp(t,this._root)}_createVNode(){let t={};this.shadowRoot||(t.onVnodeMounted=t.onVnodeUpdated=this._renderSlots.bind(this));let n=ye(this._def,q(t,this._props));return this._instance||(n.ce=o=>{this._instance=o,o.ce=this,o.isCE=!0;let r=(s,i)=>{this.dispatchEvent(new CustomEvent(s,So(i[0])?q({detail:i},i[0]):{detail:i}))};o.emit=(s,...i)=>{r(s,i),ze(s)!==s&&r(ze(s),i)},this._setParent()}),n}_applyStyles(t,n,o){if(!t)return;if(n){if(n===this._def||this._styleChildren.has(n))return;this._styleChildren.add(n)}let r=this._nonce,s=this.shadowRoot,i=o?this._getStyleAnchor(o)||this._getStyleAnchor(this._def):this._getRootStyleInsertionAnchor(s),a=null;for(let l=t.length-1;l>=0;l--){let u=document.createElement("style");r&&u.setAttribute("nonce",r),u.textContent=t[l],s.insertBefore(u,a||i),a=u,l===0&&(o||this._styleAnchors.set(this._def,u),n&&this._styleAnchors.set(n,u))}}_getStyleAnchor(t){if(!t)return null;let n=this._styleAnchors.get(t);return n&&n.parentNode===this.shadowRoot?n:(n&&this._styleAnchors.delete(t),null)}_getRootStyleInsertionAnchor(t){for(let n=0;n<t.childNodes.length;n++){let o=t.childNodes[n];if(!(o instanceof HTMLStyleElement))return o}return null}_parseSlots(){let t=this._slots={},n;for(;n=this.firstChild;){let o=n.nodeType===1&&n.getAttribute("slot")||"default";(t[o]||(t[o]=[])).push(n),this.removeChild(n)}}_renderSlots(){let t=this._getSlots(),n=this._instance.type.__scopeId;for(let o=0;o<t.length;o++){let r=t[o],s=r.getAttribute("name")||"default",i=this._slots[s],a=r.parentNode;if(i)for(let l of i){if(n&&l.nodeType===1){let u=n+"-s",f=document.createTreeWalker(l,1);l.setAttribute(u,"");let c;for(;c=f.nextNode();)c.setAttribute(u,"")}a.insertBefore(l,r)}else for(;r.firstChild;)a.insertBefore(r.firstChild,r);a.removeChild(r)}}_getSlots(){let t=[this];this._teleportTargets&&t.push(...this._teleportTargets);let n=new Set;for(let o of t){let r=o.querySelectorAll("slot");for(let s=0;s<r.length;s++)n.add(r[s])}return Array.from(n)}_injectChildStyle(t,n){this._applyStyles(t.styles,t,n)}_beginPatch(){this._patching=!0,this._dirty=!1}_endPatch(){this._patching=!1,this._dirty&&this._instance&&this._update()}_hasShadowRoot(){return this._def.shadowRoot!==!1}_removeChildStyle(t){}};function Fp(e){let t=qe(),n=t&&t.ce;return n||null}function xv(){let e=Fp();return e&&e.shadowRoot}function Tv(e="$style"){{let t=qe();if(!t)return ee;let n=t.type.__cssModules;if(!n)return ee;let o=n[e];return o||ee}}var Up=new WeakMap,Bp=new WeakMap,Ti=Symbol("_moveCb"),bp=Symbol("_enterCb"),Pl=new WeakMap,wv=e=>(delete e.props.mode,e),Ov=wv({name:"TransitionGroup",props:q({},Ip,{tag:String,moveClass:String}),setup(e,{slots:t}){let n=qe(),o=fi(),r,s,i,a,l=()=>(a===void 0&&(a=r.length>0&&Pv(r[0].el,n.vnode.el,Np(e))),a);return di(()=>{if(Pl.delete(n),!l()){r=[],i=void 0;return}let u=Np(e);r.forEach(Av);let f=i&&Rv(i,n.vnode.el);i=void 0,r.forEach(p=>Dv(p,f));let c=r.filter(Iv);kl(n.vnode.el),c.forEach(p=>{let d=p.el,v=d.style;Jt(d,u),v.transform=v.webkitTransform=v.transitionDuration="";let m=d[Ti]=N=>{N&&N.target!==d||(!N||N.propertyName.endsWith("transform"))&&(d.removeEventListener("transitionend",m),d[Ti]=null,Vn(d,u))};d.addEventListener("transitionend",m)}),r=[]}),()=>{let u=Q(e),f=kp(u),c=u.tag||Ve;if(r=[],a=void 0,s)for(let p=0;p<s.length;p++){let d=s[p];d.el&&d.el instanceof Element&&!d.el[Ml]&&(r.push(d),At(d,to(d,f,o,n)),Up.set(d,Oi(d.el)))}s=t.default?Ar(t.default()):[];for(let p=0;p<s.length;p++){let d=s[p];d.key!=null&&At(d,to(d,f,o,n))}return r.length&&(i=kv(n),Pl.set(n,l)),ye(c,null,s)}}}),Cv=Ov;function Av(e){let t=e.el;t[Ti]&&t[Ti](),t[bp]&&t[bp]()}function Np(e){return e.moveClass||`${e.name||"v"}-move`}function Dv(e,t){Bp.set(e,Oi(e.el,t))}function Iv(e){let t=Up.get(e),n=Bp.get(e),o=t.left-n.left,r=t.top-n.top;if(o||r){let s=e.el,i=s.style,a=s.getBoundingClientRect(),l=1,u=1;return s.offsetWidth&&(l=a.width/s.offsetWidth),s.offsetHeight&&(u=a.height/s.offsetHeight),(!Number.isFinite(l)||l===0)&&(l=1),(!Number.isFinite(u)||u===0)&&(u=1),Math.abs(l-1)<.01&&(l=1),Math.abs(u-1)<.01&&(u=1),i.transform=i.webkitTransform=`translate(${o/l}px,${r/u}px)`,i.transitionDuration="0s",e}}function Oi(e,t){let n=e.getBoundingClientRect();return{left:n.left-(t?t.left:0),top:n.top-(t?t.top:0)}}function kv(e){let t;for(let n=e.parent;n;n=n.parent){let o=Pl.get(n);if(o){let r=Vv(n.vnode.el,e.vnode.el);r&&(t||(t=[])).push(q(Oi(r),{item:r,willMove:o}))}}return t}function Vv(e,t){let n=e.nodeType===1?e:e.parentNode;for(;t&&t.parentNode!==n;)t=t.parentNode;if(t&&t.nodeType===1)return t}function Rv(e,t){let n=e.find(o=>o.willMove()&&o.item.contains(t));return n&&Oi(n.item,n)}function Pv(e,t,n){let o=e.cloneNode(),r=e[Mo];r&&r.forEach(a=>{a.split(/\s+/).forEach(l=>l&&o.classList.remove(l))}),n.split(/\s+/).forEach(a=>a&&o.classList.add(a)),o.style.display="none";let s=t.nodeType===1?t:t.parentNode;s.appendChild(o);let{hasTransform:i}=Vp(o);return s.removeChild(o),i}var Rn=e=>{let t=e.props["onUpdate:modelValue"]||!1;return H(t)?n=>wn(t,n):t};function Mv(e){e.target.composing=!0}function Sp(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}var _t=Symbol("_assign"),yi=Symbol("_initialValue");function Dl(e,t,n){return t&&(e=e.trim()),n&&(e=Wn(e)),e}var wi={created(e,{modifiers:{lazy:t,trim:n,number:o}},r){e.parentNode&&(e.type==="text"?e[yi]=e.defaultValue.replace(/[\r\n]/g,""):e.type==="textarea"&&(e[yi]=e.defaultValue.replace(/\r\n?/g,`
`))),e[_t]=Rn(r);let s=o||r.props&&r.props.type==="number";En(e,t?"change":"input",i=>{i.target.composing||e[_t](Dl(e.value,n,s))}),(n||s)&&En(e,"change",()=>{e.value=Dl(e.value,n,s)}),t||(En(e,"compositionstart",Mv),En(e,"compositionend",Sp),En(e,"change",Sp))},mounted(e,{value:t,modifiers:{trim:n,number:o}}){let r=t??"",s=e[yi];delete e[yi],s!==void 0&&(e.type==="text"||e.type==="textarea")&&e.value!==s?e[_t](Dl(e.value,n,o)):e.value=r},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:o,trim:r,number:s}},i){if(e[_t]=Rn(i),e.composing)return;let a=(s||e.type==="number")&&!/^0\d/.test(e.value)?Wn(e.value):e.value,l=t??"";if(a===l)return;let u=e.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===e&&e.type!=="range"&&(o&&t===n||r&&e.value.trim()===l)||(e.value=l)}},Ll={deep:!0,created(e,t,n){e[_t]=Rn(n),En(e,"change",()=>{let o=e._modelValue,r=$o(e),s=e.checked,i=e[_t];if(H(o)){let a=ar(o,r),l=a!==-1;if(s&&!l)i(o.concat(r));else if(!s&&l){let u=[...o];u.splice(a,1),i(u)}}else if(St(o)){let a=new Set(o);s?a.add(r):a.delete(r),i(a)}else i(jp(e,s))})},mounted:xp,beforeUpdate(e,t,n){e[_t]=Rn(n),xp(e,t,n)}};function xp(e,{value:t,oldValue:n},o){e._modelValue=t;let r;if(H(t))r=ar(t,o.props.value)>-1;else if(St(t))r=t.has(o.props.value);else{if(t===n)return;r=rt(t,jp(e,!0))}e.checked!==r&&(e.checked=r)}var $l={created(e,{value:t},n){e.checked=rt(t,n.props.value),e[_t]=Rn(n),En(e,"change",()=>{e[_t]($o(e))})},beforeUpdate(e,{value:t,oldValue:n},o){e[_t]=Rn(o),t!==n&&(e.checked=rt(t,o.props.value))}},Hp={deep:!0,created(e,{value:t,modifiers:{number:n}},o){e._modelValue=t,En(e,"change",()=>{let r=Array.prototype.filter.call(e.options,l=>l.selected).map(l=>n?Wn($o(l)):$o(l)),s=e.multiple,i=s?St(e._modelValue)?new Set(r):r:r[0],a=e._pendingValue=[s,s?H(i)?r.slice():r:i];try{e[_t](i)}finally{Cr(()=>{e._pendingValue===a&&(e._pendingValue=void 0)})}}),e[_t]=Rn(o)},mounted(e,{value:t,modifiers:{number:n}}){Tp(e,t,n)},beforeUpdate(e,{value:t},n){e._modelValue=t,e[_t]=Rn(n)},updated(e,{value:t,modifiers:{number:n}}){let o=e._pendingValue;e._pendingValue=void 0,(!o||o[0]!==e.multiple||!Lv(t,o[1],o[0]))&&Tp(e,t,n)}};function Lv(e,t,n){if(!n)return rt(e,t);if(H(e))return rt(e,t);if(St(e)){if(e.size!==t.length)return!1;for(let o of t)if(!e.has(o))return!1;return!0}return!1}function Tp(e,t,n=!1){let o=e.multiple,r=H(t);if(!(o&&!r&&!St(t))){for(let s=0,i=e.options.length;s<i;s++){let a=e.options[s],l=$o(a);if(o)if(r){let u=typeof l;u==="string"||u==="number"?a.selected=t.some(f=>String(f)===String(l)):a.selected=ar(t,l)>-1}else a.selected=t.has(l)||n&&typeof l=="string"&&t.has(Wn(l));else if(rt($o(a),t)){e.selectedIndex!==s&&(e.selectedIndex=s);return}}!o&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function $o(e){return"_value"in e?e._value:e.value}function jp(e,t){let n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}var Wp={created(e,t,n){bi(e,t,n,null,"created")},mounted(e,t,n){bi(e,t,n,null,"mounted")},beforeUpdate(e,t,n,o){bi(e,t,n,o,"beforeUpdate")},updated(e,t,n,o){bi(e,t,n,o,"updated")}};function Kp(e,t){switch(e){case"SELECT":return Hp;case"TEXTAREA":return wi;default:switch(t){case"checkbox":return Ll;case"radio":return $l;default:return wi}}}function bi(e,t,n,o,r){let i=Kp(e.tagName,n.props&&n.props.type)[r];i&&i(e,t,n,o)}function $v(){wi.getSSRProps=({value:e})=>({value:e}),$l.getSSRProps=({value:e},t)=>{if(t.props&&rt(t.props.value,e))return{checked:!0}},Ll.getSSRProps=({value:e},t)=>{if(H(e)){if(t.props&&ar(e,t.props.value)>-1)return{checked:!0}}else if(St(e)){if(t.props&&e.has(t.props.value))return{checked:!0}}else if(e)return{checked:!0}},Wp.getSSRProps=(e,t)=>{if(typeof t.type!="string")return;let n=Kp(t.type.toUpperCase(),t.props&&t.props.type);if(n.getSSRProps)return n.getSSRProps(e,t)}}var Fv=["ctrl","shift","alt","meta"],Uv={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Fv.some(n=>e[`${n}Key`]&&!t.includes(n))},Bv=(e,t)=>{if(!e)return e;let n=e._withMods||(e._withMods={}),o=t.join(".");return n[o]||(n[o]=((r,...s)=>{for(let i=0;i<t.length;i++){let a=Uv[t[i]];if(a&&a(r,t))return}return e(r,...s)}))},Hv={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},jv=(e,t)=>{let n=e._withKeys||(e._withKeys={}),o=t.join(".");return n[o]||(n[o]=(r=>{if(!("key"in r))return;let s=ze(r.key);if(t.some(i=>i===s||Hv[i]===s))return e(r)}))},Xp=q({patchProp:Lp},Ap),Mr,wp=!1;function zp(){return Mr||(Mr=yl(Xp))}function Gp(){return Mr=wp?Mr:bl(Xp),wp=!0,Mr}var qp=((...e)=>{zp().render(...e)}),Wv=((...e)=>{Gp().hydrate(...e)}),Lr=((...e)=>{let t=zp().createApp(...e),{mount:n}=t;return t.mount=o=>{let r=Qp(o);if(!r)return;let s=t._component;!Z(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");let i=n(r,!1,Yp(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),i},t}),Jp=((...e)=>{let t=Gp().createApp(...e),{mount:n}=t;return t.mount=o=>{let r=Qp(o);if(r)return n(r,!0,Yp(r))},t});function Yp(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Qp(e){return z(e)?document.querySelector(e):e}var Op=!1,Kv=()=>{Op||(Op=!0,$v(),sv())};var Ur=Symbol(""),Fr=Symbol(""),Yl=Symbol(""),Ri=Symbol(""),gd=Symbol(""),fo=Symbol(""),Ed=Symbol(""),vd=Symbol(""),Ql=Symbol(""),Zl=Symbol(""),Kr=Symbol(""),ec=Symbol(""),_d=Symbol(""),tc=Symbol(""),nc=Symbol(""),oc=Symbol(""),rc=Symbol(""),sc=Symbol(""),ic=Symbol(""),yd=Symbol(""),bd=Symbol(""),Xr=Symbol(""),Pi=Symbol(""),ac=Symbol(""),lc=Symbol(""),Br=Symbol(""),zr=Symbol(""),cc=Symbol(""),Hl=Symbol(""),Xv=Symbol(""),jl=Symbol(""),Mi=Symbol(""),zv=Symbol(""),Gv=Symbol(""),uc=Symbol(""),qv=Symbol(""),Jv=Symbol(""),fc=Symbol(""),Nd=Symbol(""),Fo={[Ur]:"Fragment",[Fr]:"Teleport",[Yl]:"Suspense",[Ri]:"KeepAlive",[gd]:"BaseTransition",[fo]:"openBlock",[Ed]:"createBlock",[vd]:"createElementBlock",[Ql]:"createVNode",[Zl]:"createElementVNode",[Kr]:"createCommentVNode",[ec]:"createTextVNode",[_d]:"createStaticVNode",[tc]:"resolveComponent",[nc]:"resolveDynamicComponent",[oc]:"resolveDirective",[rc]:"resolveFilter",[sc]:"withDirectives",[ic]:"renderList",[yd]:"renderSlot",[bd]:"createSlots",[Xr]:"toDisplayString",[Pi]:"mergeProps",[ac]:"normalizeClass",[lc]:"normalizeStyle",[Br]:"normalizeProps",[zr]:"guardReactiveProps",[cc]:"toHandlers",[Hl]:"camelize",[Xv]:"capitalize",[jl]:"toHandlerKey",[Mi]:"setBlockTracking",[zv]:"pushScopeId",[Gv]:"popScopeId",[uc]:"withCtx",[qv]:"unref",[Jv]:"isRef",[fc]:"withMemo",[Nd]:"isMemoSame"};function Sd(e){Object.getOwnPropertySymbols(e).forEach(t=>{Fo[t]=e[t]})}var bt={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function Yv(e,t=""){return{type:0,source:t,children:e,helpers:new Set,components:[],directives:[],hoists:[],imports:[],cached:[],temps:0,codegenNode:void 0,loc:bt}}function Hr(e,t,n,o,r,s,i,a=!1,l=!1,u=!1,f=bt){return e&&(a?(e.helper(fo),e.helper(Ho(e.inSSR,u))):e.helper(Bo(e.inSSR,u)),i&&e.helper(sc)),{type:13,tag:t,props:n,children:o,patchFlag:r,dynamicProps:s,directives:i,isBlock:a,disableTracking:l,isComponent:u,loc:f}}function co(e,t=bt){return{type:17,loc:t,elements:e}}function Dt(e,t=bt){return{type:15,loc:t,properties:e}}function Oe(e,t){return{type:16,loc:bt,key:z(e)?Y(e,!0):e,value:t}}function Y(e,t=!1,n=bt,o=0){return{type:4,loc:n,content:e,isStatic:t,constType:t?3:o}}function It(e,t=bt){return{type:8,loc:t,children:e}}function Pe(e,t=[],n=bt){return{type:14,loc:n,callee:e,arguments:t}}function Uo(e,t=void 0,n=!1,o=!1,r=bt){return{type:18,params:e,returns:t,newline:n,isSlot:o,loc:r}}function Wl(e,t,n,o=!0){return{type:19,test:e,consequent:t,alternate:n,newline:o,loc:bt}}function Qv(e,t,n=!1,o=!1){return{type:20,index:e,value:t,needPauseTracking:n,inVOnce:o,needArraySpread:!1,loc:bt}}function Zv(e){return{type:21,body:e,loc:bt}}function Bo(e,t){return e||t?Ql:Zl}function Ho(e,t){return e||t?Ed:vd}function pc(e,{helper:t,removeHelper:n,inSSR:o}){e.isBlock||(e.isBlock=!0,n(Bo(o,e.isComponent)),t(fo),t(Ho(o,e.isComponent)))}var Zp=new Uint8Array([123,123]),ed=new Uint8Array([125,125]);function td(e){return e>=97&&e<=122||e>=65&&e<=90}function yt(e){return e===32||e===10||e===9||e===12||e===13}function Pn(e){return e===47||e===62||yt(e)}function Li(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}var Je={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])},Kl=class{constructor(t,n){this.stack=t,this.cbs=n,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=Zp,this.delimiterClose=ed,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0}get inSFCRoot(){return this.mode===2&&this.stack.length===0}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=Zp,this.delimiterClose=ed}getPos(t){let n=1,o=t+1,r=this.newlines.length,s=-1;if(r>100){let i=-1,a=r;for(;i+1<a;){let l=i+a>>>1;this.newlines[l]<t?i=l:a=l}s=i}else for(let i=r-1;i>=0;i--)if(t>this.newlines[i]){s=i;break}return s>=0&&(n=s+2,o=t-this.newlines[s]),{column:o,line:n,offset:t}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(t){t===60?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t))}stateInterpolationOpen(t){if(t===this.delimiterOpen[this.delimiterIndex])if(this.delimiterIndex===this.delimiterOpen.length-1){let n=this.index+1-this.delimiterOpen.length;n>this.sectionStart&&this.cbs.ontext(this.sectionStart,n),this.state=3,this.sectionStart=n}else this.delimiterIndex++;else this.inRCDATA?(this.state=32,this.stateInRCDATA(t)):(this.state=1,this.stateText(t))}stateInterpolation(t){t===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(t))}stateInterpolationClose(t){t===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(t))}stateSpecialStartSequence(t){let n=this.sequenceIndex===this.currentSequence.length;if(!(n?Pn(t):(t|32)===this.currentSequence[this.sequenceIndex]))this.inRCDATA=!1;else if(!n){this.sequenceIndex++;return}this.sequenceIndex=0,this.state=6,this.stateInTagName(t)}stateInRCDATA(t){if(this.sequenceIndex===this.currentSequence.length){if(t===62||yt(t)){let n=this.index-this.currentSequence.length;if(this.sectionStart<n){let o=this.index;this.index=n,this.cbs.ontext(this.sectionStart,n),this.index=o}this.sectionStart=n+2,this.stateInClosingTagName(t),this.inRCDATA=!1;return}this.sequenceIndex=0}(t|32)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:this.sequenceIndex===0?this.currentSequence===Je.TitleEnd||this.currentSequence===Je.TextareaEnd&&!this.inSFCRoot?!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t)):this.fastForwardTo(60)&&(this.sequenceIndex=1):this.sequenceIndex=+(t===60)}stateCDATASequence(t){t===Je.Cdata[this.sequenceIndex]?++this.sequenceIndex===Je.Cdata.length&&(this.state=28,this.currentSequence=Je.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(t))}fastForwardTo(t){for(;++this.index<this.buffer.length;){let n=this.buffer.charCodeAt(this.index);if(n===10&&this.newlines.push(this.index),n===t)return!0}return this.index=this.buffer.length-1,!1}stateInCommentLike(t){t===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===Je.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):this.sequenceIndex===0?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):t!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0)}startSpecial(t,n){this.enterRCDATA(t,n),this.state=31}enterRCDATA(t,n){this.inRCDATA=!0,this.currentSequence=t,this.sequenceIndex=n}stateBeforeTagName(t){t===33?(this.state=22,this.sectionStart=this.index+1):t===63?(this.state=24,this.sectionStart=this.index+1):td(t)?(this.sectionStart=this.index,this.mode===0?this.state=6:this.inSFCRoot?this.state=34:this.inXML?this.state=6:t===116?this.state=30:this.state=t===115?29:6):t===47?this.state=8:(this.state=1,this.stateText(t))}stateInTagName(t){Pn(t)&&this.handleTagName(t)}stateInSFCRootTagName(t){if(Pn(t)){let n=this.buffer.slice(this.sectionStart,this.index);n!=="template"&&this.enterRCDATA(Li("</"+n),0),this.handleTagName(t)}}handleTagName(t){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)}stateBeforeClosingTagName(t){yt(t)||(t===62?(this.state=1,this.sectionStart=this.index+1):(this.state=td(t)?9:27,this.sectionStart=this.index))}stateInClosingTagName(t){(t===62||yt(t))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(t))}stateAfterClosingTagName(t){t===62&&(this.state=1,this.sectionStart=this.index+1)}stateBeforeAttrName(t){t===62?(this.cbs.onopentagend(this.index),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):t===47?this.state=7:t===60&&this.peek()===47?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):yt(t)||this.handleAttrStart(t)}handleAttrStart(t){t===118&&this.peek()===45?(this.state=13,this.sectionStart=this.index):t===46||t===58||t===64||t===35?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index)}stateInSelfClosingTag(t){t===62?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):yt(t)||(this.state=11,this.stateBeforeAttrName(t))}stateInAttrName(t){(t===61||Pn(t))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(t))}stateInDirName(t){t===61||Pn(t)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===58?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):t===46&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDirArg(t){t===61||Pn(t)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===91?this.state=15:t===46&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDynamicDirArg(t){t===93?this.state=14:(t===61||Pn(t))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(t))}stateInDirModifier(t){t===61||Pn(t)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===46&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1)}handleAttrNameEnd(t){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(t)}stateAfterAttrName(t){t===61?this.state=18:t===47||t===62?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)):yt(t)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(t))}stateBeforeAttrValue(t){t===34?(this.state=19,this.sectionStart=this.index+1):t===39?(this.state=20,this.sectionStart=this.index+1):yt(t)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(t))}handleInAttrValue(t,n){(t===n||this.fastForwardTo(n))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(n===34?3:2,this.index+1),this.state=11)}stateInAttrValueDoubleQuotes(t){this.handleInAttrValue(t,34)}stateInAttrValueSingleQuotes(t){this.handleInAttrValue(t,39)}stateInAttrValueNoQuotes(t){yt(t)||t===62?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(t)):(t===39||t===60||t===61||t===96)&&this.cbs.onerr(18,this.index)}stateBeforeDeclaration(t){t===91?(this.state=26,this.sequenceIndex=0):this.state=t===45?25:23}stateInDeclaration(t){(t===62||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1)}stateInProcessingInstruction(t){(t===62||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeComment(t){t===45?(this.state=28,this.currentSequence=Je.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23}stateInSpecialComment(t){(t===62||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeSpecialS(t){t===Je.ScriptEnd[3]?this.startSpecial(Je.ScriptEnd,4):t===Je.StyleEnd[3]?this.startSpecial(Je.StyleEnd,4):(this.state=6,this.stateInTagName(t))}stateBeforeSpecialT(t){t===Je.TitleEnd[3]?this.startSpecial(Je.TitleEnd,4):t===Je.TextareaEnd[3]?this.startSpecial(Je.TextareaEnd,4):(this.state=6,this.stateInTagName(t))}startEntity(){}stateInEntity(){}parse(t){for(this.buffer=t;this.index<this.buffer.length;){let n=this.buffer.charCodeAt(this.index);switch(n===10&&this.state!==33&&this.newlines.push(this.index),this.state){case 1:{this.stateText(n);break}case 2:{this.stateInterpolationOpen(n);break}case 3:{this.stateInterpolation(n);break}case 4:{this.stateInterpolationClose(n);break}case 31:{this.stateSpecialStartSequence(n);break}case 32:{this.stateInRCDATA(n);break}case 26:{this.stateCDATASequence(n);break}case 19:{this.stateInAttrValueDoubleQuotes(n);break}case 12:{this.stateInAttrName(n);break}case 13:{this.stateInDirName(n);break}case 14:{this.stateInDirArg(n);break}case 15:{this.stateInDynamicDirArg(n);break}case 16:{this.stateInDirModifier(n);break}case 28:{this.stateInCommentLike(n);break}case 27:{this.stateInSpecialComment(n);break}case 11:{this.stateBeforeAttrName(n);break}case 6:{this.stateInTagName(n);break}case 34:{this.stateInSFCRootTagName(n);break}case 9:{this.stateInClosingTagName(n);break}case 5:{this.stateBeforeTagName(n);break}case 17:{this.stateAfterAttrName(n);break}case 20:{this.stateInAttrValueSingleQuotes(n);break}case 18:{this.stateBeforeAttrValue(n);break}case 8:{this.stateBeforeClosingTagName(n);break}case 10:{this.stateAfterClosingTagName(n);break}case 29:{this.stateBeforeSpecialS(n);break}case 30:{this.stateBeforeSpecialT(n);break}case 21:{this.stateInAttrValueNoQuotes(n);break}case 7:{this.stateInSelfClosingTag(n);break}case 23:{this.stateInDeclaration(n);break}case 22:{this.stateBeforeDeclaration(n);break}case 25:{this.stateBeforeComment(n);break}case 24:{this.stateInProcessingInstruction(n);break}case 33:{this.stateInEntity();break}}this.index++}this.cleanup(),this.finish()}cleanup(){this.sectionStart!==this.index&&(this.state===1||this.state===32&&this.sequenceIndex===0?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):(this.state===19||this.state===20||this.state===21)&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index))}finish(){this.handleTrailingData(),this.cbs.onend()}handleTrailingData(){let t=this.buffer.length;this.sectionStart>=t||(this.state===28?this.currentSequence===Je.CdataEnd?this.cbs.oncdata(this.sectionStart,t):this.cbs.oncomment(this.sectionStart,t):this.state===6||this.state===11||this.state===18||this.state===17||this.state===12||this.state===13||this.state===14||this.state===15||this.state===16||this.state===20||this.state===19||this.state===21||this.state===9||this.cbs.ontext(this.sectionStart,t))}emitCodePoint(t,n){}};function nd(e,{compatConfig:t}){let n=t&&t[e];return e==="MODE"?n||3:n}function uo(e,t){let n=nd("MODE",t),o=nd(e,t);return n===3?o===!0:o!==!1}function jo(e,t,n,...o){return uo(e,t)}function dc(e){throw e}function xd(e){}function _e(e,t,n,o){let r=`https://vuejs.org/error-reference/#compiler-${e}`,s=new SyntaxError(String(r));return s.code=e,s.loc=t,s}var Qe=e=>e.type===4&&e.isStatic;function Td(e){switch(e){case"Teleport":case"teleport":return Fr;case"Suspense":case"suspense":return Yl;case"KeepAlive":case"keep-alive":return Ri;case"BaseTransition":case"base-transition":return gd}}var e_=/^$|^\d|[^\$\w\xA0-\uFFFF]/,hc=e=>!e_.test(e),wd=/[A-Za-z_$\xA0-\uFFFF]/,t_=/[\.\?\w$\xA0-\uFFFF]/,n_=/\s+[.[]\s*|\s*[.[]\s+/g,Od=e=>e.type===4?e.content:e.loc.source,o_=e=>{let t=Od(e).trim().replace(n_,a=>a.trim()),n=0,o=[],r=0,s=0,i=null;for(let a=0;a<t.length;a++){let l=t.charAt(a);switch(n){case 0:if(l==="[")o.push(n),n=1,r++;else if(l==="(")o.push(n),n=2,s++;else if(!(a===0?wd:t_).test(l))return!1;break;case 1:l==="'"||l==='"'||l==="`"?(o.push(n),n=3,i=l):l==="["?r++:l==="]"&&(--r||(n=o.pop()));break;case 2:if(l==="'"||l==='"'||l==="`")o.push(n),n=3,i=l;else if(l==="(")s++;else if(l===")"){if(a===t.length-1)return!1;--s||(n=o.pop())}break;case 3:l===i&&(n=o.pop(),i=null);break}}return!r&&!s};var Cd=o_,r_=/^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/,s_=e=>r_.test(Od(e));var i_=s_;function ct(e,t,n=!1){for(let o=0;o<e.props.length;o++){let r=e.props[o];if(r.type===7&&(n||r.exp)&&(z(t)?r.name===t:t.test(r.name)))return r}}function Gr(e,t,n=!1,o=!1){for(let r=0;r<e.props.length;r++){let s=e.props[r];if(s.type===6){if(n)continue;if(s.name===t&&(s.value||o))return s}else if(s.name==="bind"&&(s.exp||o)&&Ln(s.arg,t))return s}}function Ln(e,t){return!!(e&&Qe(e)&&e.content===t)}function Ad(e){return e.props.some(t=>t.type===7&&t.name==="bind"&&(!t.arg||t.arg.type!==4||!t.arg.isStatic))}function Ul(e){return e.type===5||e.type===2}function od(e){return e.type===7&&e.name==="pre"}function a_(e){return e.type===7&&e.name==="slot"}function $i(e){return e.type===1&&e.tagType===3}function Fi(e){return e.type===1&&e.tagType===2}var l_=new Set([Br,zr]);function mc(e,t=[]){if(e&&!z(e)&&e.type===14){let n=e.callee;if(!z(n)&&l_.has(n))return mc(e.arguments[0],t.concat(e))}return[e,t]}function Ui(e,t,n){if(e.type!==13&&c_(e,t))return;let o,r=e.type===13?e.props:e.arguments[2],s=[],i;if(r&&!z(r)&&r.type===14){let a=mc(r);r=a[0],s=a[1],i=s[s.length-1]}if(r==null||z(r))o=Dt([t]);else if(r.type===14){let a=r.arguments[0];!z(a)&&a.type===15?Xl(t,a)||a.properties.unshift(t):r.callee===cc?o=Pe(n.helper(Pi),[Dt([t]),r]):r.arguments.unshift(Dt([t])),!o&&(o=r)}else r.type===15?(Xl(t,r)||r.properties.unshift(t),o=r):(o=Pe(n.helper(Pi),[Dt([t]),r]),i&&i.callee===zr&&(i=s[s.length-2]));e.type===13?i?i.arguments[0]=o:e.props=o:i?i.arguments[0]=o:e.arguments[2]=o}function c_(e,t){var n,o,r;if(t.key.type!==4||t.key.content!=="key")return!1;let s=e.arguments[2];if(s&&!z(s)){let[i]=mc(s);if(i&&!z(i)&&i.type===15&&Xl(t,i))return!0}return(n=e.arguments)[2]||(n[2]="{}"),(o=e.arguments)[3]||(o[3]="undefined"),(r=e.arguments)[4]||(r[4]="undefined"),e.arguments[5]=t.value,!0}function Xl(e,t){let n=!1;if(e.key.type===4){let o=e.key.content;n=t.properties.some(r=>r.key.type===4&&r.key.content===o)}return n}function jr(e,t){return`_${t}_${e.replace(/[^\w]/g,(n,o)=>n==="-"?"_":e.charCodeAt(o).toString())}`}function u_(e){return e.type===14&&e.callee===fc?e.arguments[1].returns:e}var f_=/([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;function Dd(e){for(let t=0;t<e.length;t++)if(!yt(e.charCodeAt(t)))return!1;return!0}function gc(e){return e.type===2&&Dd(e.content)||e.type===12&&gc(e.content)}function Hi(e){return e.type===3||gc(e)}var Id={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:Tn,isPreTag:Tn,isIgnoreNewlineTag:Tn,isCustomElement:Tn,onError:dc,onWarn:xd,comments:!1,prefixIdentifiers:!1},fe=Id,Wr=null,yn="",Ye=null,ne=null,lt="",_n=-1,ao=-1,Ec=0,Mn=!1,zl=null,be=[],Te=new Kl(be,{onerr:vn,ontext(e,t){Ci(We(e,t),e,t)},ontextentity(e,t,n){Ci(e,t,n)},oninterpolation(e,t){if(Mn)return Ci(We(e,t),e,t);let n=e+Te.delimiterOpen.length,o=t-Te.delimiterClose.length;for(;yt(yn.charCodeAt(n));)n++;for(;yt(yn.charCodeAt(o-1));)o--;let r=We(n,o);r.includes("&")&&(r=fe.decodeEntities(r,!1)),Gl({type:5,content:Ii(r,!1,Re(n,o)),loc:Re(e,t)})},onopentagname(e,t){let n=We(e,t);Ye={type:1,tag:n,ns:fe.getNamespace(n,be[0],fe.ns),tagType:0,props:[],children:[],loc:Re(e-1,t),codegenNode:void 0}},onopentagend(e){sd(e)},onclosetag(e,t){let n=We(e,t);if(!fe.isVoidTag(n)){let o=!1;for(let r=0;r<be.length;r++)if(be[r].tag.toLowerCase()===n.toLowerCase()){o=!0,r>0&&vn(24,be[0].loc.start.offset);for(let i=0;i<=r;i++){let a=be.shift();Di(a,t,i<r)}break}o||vn(23,kd(e,60))}},onselfclosingtag(e){let t=Ye.tag;Ye.isSelfClosing=!0,sd(e),be[0]&&be[0].tag===t&&Di(be.shift(),e)},onattribname(e,t){ne={type:6,name:We(e,t),nameLoc:Re(e,t),value:void 0,loc:Re(e)}},ondirname(e,t){let n=We(e,t),o=n==="."||n===":"?"bind":n==="@"?"on":n==="#"?"slot":n.slice(2);if(!Mn&&o===""&&vn(26,e),Mn||o==="")ne={type:6,name:n,nameLoc:Re(e,t),value:void 0,loc:Re(e)};else if(ne={type:7,name:o,rawName:n,exp:void 0,arg:void 0,modifiers:n==="."?[Y("prop")]:[],loc:Re(e)},o==="pre"){Mn=Te.inVPre=!0,zl=Ye;let r=Ye.props;for(let s=0;s<r.length;s++)r[s].type===7&&(r[s]=b_(r[s]))}},ondirarg(e,t){if(e===t)return;let n=We(e,t);if(Mn&&!od(ne))ne.name+=n,lo(ne.nameLoc,t);else{let o=n[0]!=="[";ne.arg=Ii(o?n:n.slice(1,-1),o,Re(e,t),o?3:0)}},ondirmodifier(e,t){let n=We(e,t);if(Mn&&!od(ne))ne.name+="."+n,lo(ne.nameLoc,t);else if(ne.name==="slot"){let o=ne.arg;o&&(o.content+="."+n,lo(o.loc,t))}else{let o=Y(n,!0,Re(e,t));ne.modifiers.push(o)}},onattribdata(e,t){lt+=We(e,t),_n<0&&(_n=e),ao=t},onattribentity(e,t,n){lt+=e,_n<0&&(_n=t),ao=n},onattribnameend(e){let t=ne.loc.start.offset,n=We(t,e);ne.type===7&&(ne.rawName=n),Ye.props.some(o=>(o.type===7?o.rawName:o.name)===n)&&vn(2,t)},onattribend(e,t){if(Ye&&ne){if(lo(ne.loc,t),e!==0)if(lt.includes("&")&&(lt=fe.decodeEntities(lt,!0)),ne.type===6)ne.name==="class"&&(lt=Rd(lt).trim()),e===1&&!lt&&vn(13,t),ne.value={type:2,content:lt,loc:e===1?Re(_n,ao):Re(_n-1,ao+1)},Te.inSFCRoot&&Ye.tag==="template"&&ne.name==="lang"&&lt&&lt!=="html"&&Te.enterRCDATA(Li("</template"),0);else{let n=0;ne.exp=Ii(lt,!1,Re(_n,ao),0,n),ne.name==="for"&&(ne.forParseResult=d_(ne.exp));let o=-1;ne.name==="bind"&&(o=ne.modifiers.findIndex(r=>r.content==="sync"))>-1&&jo("COMPILER_V_BIND_SYNC",fe,ne.loc,ne.arg.loc.source)&&(ne.name="model",ne.modifiers.splice(o,1))}(ne.type!==7||ne.name!=="pre")&&Ye.props.push(ne)}lt="",_n=ao=-1},oncomment(e,t){fe.comments&&Gl({type:3,content:We(e,t),loc:Re(e-4,t+3)})},onend(){let e=yn.length;for(let t=0;t<be.length;t++)Di(be[t],e-1),vn(24,be[t].loc.start.offset)},oncdata(e,t){(be[0]?be[0].ns:fe.ns)!==0?Ci(We(e,t),e,t):vn(1,e-9)},onprocessinginstruction(e){(be[0]?be[0].ns:fe.ns)===0&&vn(21,e-1)}}),rd=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,p_=/^\(|\)$/g;function d_(e){let t=e.loc,n=e.content,o=n.match(f_);if(!o)return;let[,r,s]=o,i=(c,p,d=!1)=>{let v=t.start.offset+p,m=v+c.length;return Ii(c,!1,Re(v,m),0,d?1:0)},a={source:i(s.trim(),n.indexOf(s,r.length)),value:void 0,key:void 0,index:void 0,finalized:!1},l=r.trim().replace(p_,"").trim(),u=r.indexOf(l),f=l.match(rd);if(f){l=l.replace(rd,"").trim();let c=f[1].trim(),p;if(c&&(p=n.indexOf(c,u+l.length),a.key=i(c,p,!0)),f[2]){let d=f[2].trim();d&&(a.index=i(d,n.indexOf(d,a.key?p+c.length:u+l.length),!0))}}return l&&(a.value=i(l,u,!0)),a}function We(e,t){return yn.slice(e,t)}function sd(e){Te.inSFCRoot&&(Ye.innerLoc=Re(e+1,e+1)),Gl(Ye);let{tag:t,ns:n}=Ye;n===0&&fe.isPreTag(t)&&Ec++,fe.isVoidTag(t)?Di(Ye,e):(be.unshift(Ye),(n===1||n===2)&&(Te.inXML=!0)),Ye=null}function Ci(e,t,n){{let s=be[0]&&be[0].tag;s!=="script"&&s!=="style"&&e.includes("&")&&(e=fe.decodeEntities(e,!1))}let o=be[0]||Wr,r=o.children[o.children.length-1];r&&r.type===2?(r.content+=e,lo(r.loc,n)):o.children.push({type:2,content:e,loc:Re(t,n)})}function Di(e,t,n=!1){n?lo(e.loc,kd(t,60)):lo(e.loc,h_(t,62)+1),Te.inSFCRoot&&(e.children.length?e.innerLoc.end=q({},e.children[e.children.length-1].loc.end):e.innerLoc.end=q({},e.innerLoc.start),e.innerLoc.source=We(e.innerLoc.start.offset,e.innerLoc.end.offset));let{tag:o,ns:r,children:s}=e;if(Mn||(o==="slot"?e.tagType=2:id(e)?e.tagType=3:g_(e)&&(e.tagType=1)),Te.inRCDATA||(e.children=Vd(s)),r===0&&fe.isIgnoreNewlineTag(o)){let i=s[0];i&&i.type===2&&(i.content=i.content.replace(/^\r?\n/,""))}r===0&&fe.isPreTag(o)&&Ec--,zl===e&&(Mn=Te.inVPre=!1,zl=null),Te.inXML&&(be[0]?be[0].ns:fe.ns)===0&&(Te.inXML=!1);{let i=e.props;if(!Te.inSFCRoot&&uo("COMPILER_NATIVE_TEMPLATE",fe)&&e.tag==="template"&&!id(e)){let l=be[0]||Wr,u=l.children.indexOf(e);l.children.splice(u,1,...e.children)}let a=i.find(l=>l.type===6&&l.name==="inline-template");a&&jo("COMPILER_INLINE_TEMPLATE",fe,a.loc)&&e.children.length&&(a.value={type:2,content:We(e.children[0].loc.start.offset,e.children[e.children.length-1].loc.end.offset),loc:a.loc})}}function h_(e,t){let n=e;for(;yn.charCodeAt(n)!==t&&n<yn.length-1;)n++;return n}function kd(e,t){let n=e;for(;yn.charCodeAt(n)!==t&&n>=0;)n--;return n}var m_=new Set(["if","else","else-if","for","slot"]);function id({tag:e,props:t}){if(e==="template"){for(let n=0;n<t.length;n++)if(t[n].type===7&&m_.has(t[n].name))return!0}return!1}function g_({tag:e,props:t}){if(fe.isCustomElement(e))return!1;if(e==="component"||E_(e.charCodeAt(0))||Td(e)||fe.isBuiltInComponent&&fe.isBuiltInComponent(e)||fe.isNativeTag&&!fe.isNativeTag(e))return!0;for(let n=0;n<t.length;n++){let o=t[n];if(o.type===6){if(o.name==="is"&&o.value){if(o.value.content.startsWith("vue:"))return!0;if(jo("COMPILER_IS_ON_ELEMENT",fe,o.loc))return!0}}else if(o.name==="bind"&&Ln(o.arg,"is")&&jo("COMPILER_IS_ON_ELEMENT",fe,o.loc))return!0}return!1}function E_(e){return e>64&&e<91}var v_=/\r\n/g;function Vd(e){let t=fe.whitespace!=="preserve",n=!1;for(let o=0;o<e.length;o++){let r=e[o];if(r.type===2)if(Ec)r.content=r.content.replace(v_,`
`);else if(Dd(r.content)){let s=e[o-1]&&e[o-1].type,i=e[o+1]&&e[o+1].type;!s||!i||t&&(s===3&&(i===3||i===1)||s===1&&(i===3||i===1&&__(r.content)))?(n=!0,e[o]=null):r.content=" "}else t&&(r.content=Rd(r.content))}return n?e.filter(Boolean):e}function __(e){for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(n===10||n===13)return!0}return!1}function Rd(e){let t="",n=!1;for(let o=0;o<e.length;o++)yt(e.charCodeAt(o))?n||(t+=" ",n=!0):(t+=e[o],n=!1);return t}function Gl(e){(be[0]||Wr).children.push(e)}function Re(e,t){return{start:Te.getPos(e),end:t==null?t:Te.getPos(t),source:t==null?t:We(e,t)}}function y_(e){return{start:q({},e.start),end:q({},e.end),source:e.source}}function lo(e,t){e.end=Te.getPos(t),e.source=We(e.start.offset,t)}function b_(e){let t={type:6,name:e.rawName,nameLoc:Re(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){let n=e.exp.loc;n.end.offset<e.loc.end.offset&&(n.start.offset--,n.start.column--,n.end.offset++,n.end.column++),t.value={type:2,content:e.exp.content,loc:n}}return t}function Ii(e,t=!1,n,o=0,r=0){return Y(e,t,n,o)}function vn(e,t,n){fe.onError(_e(e,Re(t,t),void 0,n))}function N_(){Te.reset(),Ye=null,ne=null,lt="",_n=-1,ao=-1,be.length=0}function Pd(e,t){if(N_(),yn=e,fe=q({},Id),t){let r;for(r in t)t[r]!=null&&(fe[r]=t[r])}Te.mode=fe.parseMode==="html"?1:fe.parseMode==="sfc"?2:0,Te.inXML=fe.ns===1||fe.ns===2;let n=t&&t.delimiters;n&&(Te.delimiterOpen=Li(n[0]),Te.delimiterClose=Li(n[1]));let o=Wr=Yv([],e);return Te.parse(yn),o.loc=Re(0,e.length),o.children=Vd(o.children),Wr=null,o}function S_(e,t){ki(e,void 0,t,!!Md(e))}function Md(e){let t=e.children.filter(n=>n.type!==3);return t.length===1&&t[0].type===1&&!Fi(t[0])?t[0]:null}function ki(e,t,n,o=!1,r=!1){let{children:s}=e,i=[];for(let f=0;f<s.length;f++){let c=s[f];if(c.type===1&&c.tagType===0){let p=o?0:ut(c,n);if(p>0){if(p>=2){c.codegenNode.patchFlag=-1,i.push(c);continue}}else{let d=c.codegenNode;if(d.type===13){let v=d.patchFlag;if((v===void 0||v===512||v===1)&&$d(c,n)>=2){let m=Fd(c);m&&(d.props=n.hoist(m))}d.dynamicProps&&(d.dynamicProps=n.hoist(d.dynamicProps))}}}else if(c.type===12&&(o?0:ut(c,n))>=2){c.codegenNode.type===14&&c.codegenNode.arguments.length>0&&c.codegenNode.arguments.push("-1"),i.push(c);continue}if(c.type===1){let p=c.tagType===1;p&&n.scopes.vSlot++,ki(c,e,n,!1,r),p&&n.scopes.vSlot--}else if(c.type===11)ki(c,e,n,c.children.length===1,!0);else if(c.type===9)for(let p=0;p<c.branches.length;p++)ki(c.branches[p],e,n,c.branches[p].children.length===1,r)}let a=!1;if(i.length===s.length&&e.type===1){if(e.tagType===0&&e.codegenNode&&e.codegenNode.type===13&&H(e.codegenNode.children))e.codegenNode.children=l(co(e.codegenNode.children)),a=!0;else if(e.tagType===1&&e.codegenNode&&e.codegenNode.type===13&&e.codegenNode.children&&!H(e.codegenNode.children)&&e.codegenNode.children.type===15){let f=u(e.codegenNode,"default");f&&(f.returns=l(co(f.returns)),a=!0)}else if(e.tagType===3&&t&&t.type===1&&t.tagType===1&&t.codegenNode&&t.codegenNode.type===13&&t.codegenNode.children&&!H(t.codegenNode.children)&&t.codegenNode.children.type===15){let f=ct(e,"slot",!0),c=f&&f.arg&&u(t.codegenNode,f.arg);c&&(c.returns=l(co(c.returns)),a=!0)}}if(!a)for(let f of i)f.codegenNode=n.cache(f.codegenNode);function l(f){let c=n.cache(f);return c.needArraySpread=!0,c}function u(f,c){if(f.children&&!H(f.children)&&f.children.type===15){let p=f.children.properties.find(d=>d.key===c||d.key.content===c);return p&&p.value}}i.length&&n.transformHoist&&n.transformHoist(s,n,e)}function ut(e,t){let{constantCache:n}=t;switch(e.type){case 1:if(e.tagType!==0)return 0;let o=n.get(e);if(o!==void 0)return o;let r=e.codegenNode;if(r.type!==13||r.isBlock&&e.tag!=="svg"&&e.tag!=="foreignObject"&&e.tag!=="math")return 0;if(r.patchFlag===void 0){let i=3,a=$d(e,t);if(a===0)return n.set(e,0),0;a<i&&(i=a);for(let l=0;l<e.children.length;l++){let u=ut(e.children[l],t);if(u===0)return n.set(e,0),0;u<i&&(i=u)}if(i>1)for(let l=0;l<e.props.length;l++){let u=e.props[l];if(u.type===7&&u.name==="bind"&&u.exp){let f=ut(u.exp,t);if(f===0)return n.set(e,0),0;f<i&&(i=f)}}if(r.isBlock){for(let l=0;l<e.props.length;l++)if(e.props[l].type===7)return n.set(e,0),0;t.removeHelper(fo),t.removeHelper(Ho(t.inSSR,r.isComponent)),r.isBlock=!1,t.helper(Bo(t.inSSR,r.isComponent))}return n.set(e,i),i}else return n.set(e,0),0;case 2:case 3:return 3;case 9:case 11:case 10:return 0;case 5:case 12:return ut(e.content,t);case 4:return e.constType;case 8:let s=3;for(let i=0;i<e.children.length;i++){let a=e.children[i];if(z(a)||Ae(a))continue;let l=ut(a,t);if(l===0)return 0;l<s&&(s=l)}return s;case 20:return 2;default:return 0}}var x_=new Set([ac,lc,Br,zr]);function Ld(e,t){if(e.type===14&&!z(e.callee)&&x_.has(e.callee)){let n=e.arguments[0];if(n.type===4)return ut(n,t);if(n.type===14)return Ld(n,t)}return 0}function $d(e,t){let n=3,o=Fd(e);if(o&&o.type===15){let{properties:r}=o;for(let s=0;s<r.length;s++){let{key:i,value:a}=r[s],l=ut(i,t);if(l===0)return l;l<n&&(n=l);let u;if(a.type===4?u=ut(a,t):a.type===14?u=Ld(a,t):u=0,u===0)return u;u<n&&(n=u)}}return n}function Fd(e){let t=e.codegenNode;if(t.type===13)return t.props}function T_(e,{filename:t="",prefixIdentifiers:n=!1,hoistStatic:o=!1,hmr:r=!1,cacheHandlers:s=!1,nodeTransforms:i=[],directiveTransforms:a={},transformHoist:l=null,isBuiltInComponent:u=De,isCustomElement:f=De,expressionPlugins:c=[],scopeId:p=null,slotted:d=!0,ssr:v=!1,inSSR:m=!1,ssrCssVars:N="",bindingMetadata:A=ee,inline:b=!1,isTS:E=!1,onError:y=dc,onWarn:g=xd,compatConfig:O}){let D=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),S={filename:t,selfName:D&&xt(ce(D[1])),prefixIdentifiers:n,hoistStatic:o,hmr:r,cacheHandlers:s,nodeTransforms:i,directiveTransforms:a,transformHoist:l,isBuiltInComponent:u,isCustomElement:f,expressionPlugins:c,scopeId:p,slotted:d,ssr:v,inSSR:m,ssrCssVars:N,bindingMetadata:A,inline:b,isTS:E,onError:y,onWarn:g,compatConfig:O,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],cached:[],constantCache:new WeakMap,vForMemoKeyedNodes:new WeakSet,temps:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,grandParent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(T){let V=S.helpers.get(T)||0;return S.helpers.set(T,V+1),T},removeHelper(T){let V=S.helpers.get(T);if(V){let M=V-1;M?S.helpers.set(T,M):S.helpers.delete(T)}},helperString(T){return`_${Fo[S.helper(T)]}`},replaceNode(T){S.parent.children[S.childIndex]=S.currentNode=T},removeNode(T){let V=S.parent.children,M=T?V.indexOf(T):S.currentNode?S.childIndex:-1;!T||T===S.currentNode?(S.currentNode=null,S.onNodeRemoved()):S.childIndex>M&&(S.childIndex--,S.onNodeRemoved()),S.parent.children.splice(M,1)},onNodeRemoved:De,addIdentifiers(T){},removeIdentifiers(T){},hoist(T){z(T)&&(T=Y(T)),S.hoists.push(T);let V=Y(`_hoisted_${S.hoists.length}`,!1,T.loc,2);return V.hoisted=T,V},cache(T,V=!1,M=!1){let w=Qv(S.cached.length,T,V,M);return S.cached.push(w),w}};return S.filters=new Set,S}function w_(e,t){let n=T_(e,t);ji(e,n),t.hoistStatic&&S_(e,n),t.ssr||O_(e,n),e.helpers=new Set([...n.helpers.keys()]),e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached,e.transformed=!0,e.filters=[...n.filters]}function O_(e,t){let{helper:n}=t,{children:o}=e;if(o.length===1){let r=Md(e);if(r&&r.codegenNode){let s=r.codegenNode;s.type===13&&pc(s,t),e.codegenNode=s}else e.codegenNode=o[0]}else if(o.length>1){let r=64;e.codegenNode=Hr(t,n(Ur),void 0,e.children,r,void 0,void 0,!0,void 0,!1)}}function C_(e,t){let n=0,o=()=>{n--};for(;n<e.children.length;n++){let r=e.children[n];z(r)||(t.grandParent=t.parent,t.parent=e,t.childIndex=n,t.onNodeRemoved=o,ji(r,t))}}function ji(e,t){t.currentNode=e;let{nodeTransforms:n}=t,o=[];for(let s=0;s<n.length;s++){let i=n[s](e,t);if(i&&(H(i)?o.push(...i):o.push(i)),t.currentNode)e=t.currentNode;else return}switch(e.type){case 3:t.ssr||t.helper(Kr);break;case 5:t.ssr||t.helper(Xr);break;case 9:for(let s=0;s<e.branches.length;s++)ji(e.branches[s],t);break;case 10:case 11:case 1:case 0:C_(e,t);break}t.currentNode=e;let r=o.length;for(;r--;)o[r]()}function Ud(e,t){let n=z(e)?o=>o===e:o=>e.test(o);return(o,r)=>{if(o.type===1){let{props:s}=o;if(o.tagType===3&&s.some(a_))return;let i=[];for(let a=0;a<s.length;a++){let l=s[a];if(l.type===7&&n(l.name)){s.splice(a,1),a--;let u=t(o,l,r);u&&i.push(u)}}return i}}}var Wi="/*@__PURE__*/",Bd=e=>`${Fo[e]}: _${Fo[e]}`;function A_(e,{mode:t="function",prefixIdentifiers:n=t==="module",sourceMap:o=!1,filename:r="template.vue.html",scopeId:s=null,optimizeImports:i=!1,runtimeGlobalName:a="Vue",runtimeModuleName:l="vue",ssrRuntimeModuleName:u="vue/server-renderer",ssr:f=!1,isTS:c=!1,inSSR:p=!1}){let d={mode:t,prefixIdentifiers:n,sourceMap:o,filename:r,scopeId:s,optimizeImports:i,runtimeGlobalName:a,runtimeModuleName:l,ssrRuntimeModuleName:u,ssr:f,isTS:c,inSSR:p,source:e.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper(m){return`_${Fo[m]}`},push(m,N=-2,A){d.code+=m},indent(){v(++d.indentLevel)},deindent(m=!1){m?--d.indentLevel:v(--d.indentLevel)},newline(){v(d.indentLevel)}};function v(m){d.push(`
`+"  ".repeat(m),0)}return d}function D_(e,t={}){let n=A_(e,t);t.onContextCreated&&t.onContextCreated(n);let{mode:o,push:r,prefixIdentifiers:s,indent:i,deindent:a,newline:l,scopeId:u,ssr:f}=n,c=Array.from(e.helpers),p=c.length>0,d=!s&&o!=="module";I_(e,n);let m=f?"ssrRender":"render",A=(f?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ");if(r(`function ${m}(${A}) {`),i(),d&&(r("with (_ctx) {"),i(),p&&(r(`const { ${c.map(Bd).join(", ")} } = _Vue
`,-1),l())),e.components.length&&(Bl(e.components,"component",n),(e.directives.length||e.temps>0)&&l()),e.directives.length&&(Bl(e.directives,"directive",n),e.temps>0&&l()),e.filters&&e.filters.length&&(l(),Bl(e.filters,"filter",n),l()),e.temps>0){r("let ");for(let b=0;b<e.temps;b++)r(`${b>0?", ":""}_temp${b}`)}return(e.components.length||e.directives.length||e.temps)&&(r(`
`,0),l()),f||r("return "),e.codegenNode?Ze(e.codegenNode,n):r("null"),d&&(a(),r("}")),a(),r("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}function I_(e,t){let{ssr:n,prefixIdentifiers:o,push:r,newline:s,runtimeModuleName:i,runtimeGlobalName:a,ssrRuntimeModuleName:l}=t,u=a,f=Array.from(e.helpers);if(f.length>0&&(r(`const _Vue = ${u}
`,-1),e.hoists.length)){let c=[Ql,Zl,Kr,ec,_d].filter(p=>f.includes(p)).map(Bd).join(", ");r(`const { ${c} } = _Vue
`,-1)}k_(e.hoists,t),s(),r("return ")}function Bl(e,t,{helper:n,push:o,newline:r,isTS:s}){let i=n(t==="filter"?rc:t==="component"?tc:oc);for(let a=0;a<e.length;a++){let l=e[a],u=l.endsWith("__self");u&&(l=l.slice(0,-6)),o(`const ${jr(l,t)} = ${i}(${JSON.stringify(l)}${u?", true":""})${s?"!":""}`),a<e.length-1&&r()}}function k_(e,t){if(!e.length)return;t.pure=!0;let{push:n,newline:o}=t;o();for(let r=0;r<e.length;r++){let s=e[r];s&&(n(`const _hoisted_${r+1} = `),Ze(s,t),o())}t.pure=!1}function vc(e,t){let n=e.length>3||!1;t.push("["),n&&t.indent(),qr(e,t,n),n&&t.deindent(),t.push("]")}function qr(e,t,n=!1,o=!0){let{push:r,newline:s}=t;for(let i=0;i<e.length;i++){let a=e[i];z(a)?r(a,-3):H(a)?vc(a,t):Ze(a,t),i<e.length-1&&(n?(o&&r(","),s()):o&&r(", "))}}function Ze(e,t){if(z(e)){t.push(e,-3);return}if(Ae(e)){t.push(t.helper(e));return}switch(e.type){case 1:case 9:case 11:Ze(e.codegenNode,t);break;case 2:V_(e,t);break;case 4:Hd(e,t);break;case 5:R_(e,t);break;case 12:Ze(e.codegenNode,t);break;case 8:jd(e,t);break;case 3:M_(e,t);break;case 13:L_(e,t);break;case 14:F_(e,t);break;case 15:U_(e,t);break;case 17:B_(e,t);break;case 18:H_(e,t);break;case 19:j_(e,t);break;case 20:W_(e,t);break;case 21:qr(e.body,t,!0,!1);break;case 22:break;case 23:break;case 24:break;case 25:break;case 26:break;case 10:break;default:}}function V_(e,t){t.push(JSON.stringify(e.content),-3,e)}function Hd(e,t){let{content:n,isStatic:o}=e;t.push(o?JSON.stringify(n):n,-3,e)}function R_(e,t){let{push:n,helper:o,pure:r}=t;r&&n(Wi),n(`${o(Xr)}(`),Ze(e.content,t),n(")")}function jd(e,t){for(let n=0;n<e.children.length;n++){let o=e.children[n];z(o)?t.push(o,-3):Ze(o,t)}}function P_(e,t){let{push:n}=t;if(e.type===8)n("["),jd(e,t),n("]");else if(e.isStatic){let o=hc(e.content)?e.content:JSON.stringify(e.content);n(o,-2,e)}else n(`[${e.content}]`,-3,e)}function M_(e,t){let{push:n,helper:o,pure:r}=t;r&&n(Wi),n(`${o(Kr)}(${JSON.stringify(e.content)})`,-3,e)}function L_(e,t){let{push:n,helper:o,pure:r}=t,{tag:s,props:i,children:a,patchFlag:l,dynamicProps:u,directives:f,isBlock:c,disableTracking:p,isComponent:d}=e,v;l&&(v=String(l)),f&&n(o(sc)+"("),c&&n(`(${o(fo)}(${p?"true":""}), `),r&&n(Wi);let m=c?Ho(t.inSSR,d):Bo(t.inSSR,d);n(o(m)+"(",-2,e),qr($_([s,i,a,v,u]),t),n(")"),c&&n(")"),f&&(n(", "),Ze(f,t),n(")"))}function $_(e){let t=e.length;for(;t--&&e[t]==null;);return e.slice(0,t+1).map(n=>n||"null")}function F_(e,t){let{push:n,helper:o,pure:r}=t,s=z(e.callee)?e.callee:o(e.callee);r&&n(Wi),n(s+"(",-2,e),qr(e.arguments,t),n(")")}function U_(e,t){let{push:n,indent:o,deindent:r,newline:s}=t,{properties:i}=e;if(!i.length){n("{}",-2,e);return}let a=i.length>1||!1;n(a?"{":"{ "),a&&o();for(let l=0;l<i.length;l++){let{key:u,value:f}=i[l];P_(u,t),n(": "),Ze(f,t),l<i.length-1&&(n(","),s())}a&&r(),n(a?"}":" }")}function B_(e,t){vc(e.elements,t)}function H_(e,t){let{push:n,indent:o,deindent:r}=t,{params:s,returns:i,body:a,newline:l,isSlot:u}=e;u&&n(`_${Fo[uc]}(`),n("(",-2,e),H(s)?qr(s,t):s&&Ze(s,t),n(") => "),(l||a)&&(n("{"),o()),i?(l&&n("return "),H(i)?vc(i,t):Ze(i,t)):a&&Ze(a,t),(l||a)&&(r(),n("}")),u&&(e.isNonScopedSlot&&n(", undefined, true"),n(")"))}function j_(e,t){let{test:n,consequent:o,alternate:r,newline:s}=e,{push:i,indent:a,deindent:l,newline:u}=t;if(n.type===4){let c=!hc(n.content);c&&i("("),Hd(n,t),c&&i(")")}else i("("),Ze(n,t),i(")");s&&a(),t.indentLevel++,s||i(" "),i("? "),Ze(o,t),t.indentLevel--,s&&u(),s||i(" "),i(": ");let f=r.type===19;f||t.indentLevel++,Ze(r,t),f||t.indentLevel--,s&&l(!0)}function W_(e,t){let{push:n,helper:o,indent:r,deindent:s,newline:i}=t,{needPauseTracking:a,needArraySpread:l}=e;l&&n("[...("),n(`_cache[${e.index}] || (`),a&&(r(),n(`${o(Mi)}(-1`),e.inVOnce&&n(", true"),n("),"),i(),n("(")),n(`_cache[${e.index}] = `),Ze(e.value,t),a&&(n(`).cacheIndex = ${e.index},`),i(),n(`${o(Mi)}(1),`),i(),n(`_cache[${e.index}]`),s()),n(")"),l&&n(")]")}var tN=new RegExp("\\b"+"arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b")+"\\b");var K_=Ud(/^(?:if|else|else-if)$/,(e,t,n)=>X_(e,t,n,(o,r,s)=>{let i=n.parent.children,a=i.indexOf(o),l=0;for(;a-->=0;){let u=i[a];u&&u.type===9&&(l+=u.branches.length)}return()=>{if(s)o.codegenNode=ld(r,l,n);else{let u=z_(o.codegenNode);u.alternate=ld(r,l+o.branches.length-1,n)}}}));function X_(e,t,n,o){if(t.name!=="else"&&(!t.exp||!t.exp.content.trim())){let r=t.exp?t.exp.loc:e.loc;n.onError(_e(28,t.loc)),t.exp=Y("true",!1,r)}if(t.name==="if"){let r=ad(e,t),s={type:9,loc:y_(e.loc),branches:[r]};if(n.replaceNode(s),o)return o(s,r,!0)}else{let r=n.parent.children,s=[],i=r.indexOf(e);for(;i-->=-1;){let a=r[i];if(a&&Hi(a)){n.removeNode(a);continue}if(a&&a.type===9){(t.name==="else-if"||t.name==="else")&&a.branches[a.branches.length-1].condition===void 0&&n.onError(_e(30,e.loc)),n.removeNode();let l=ad(e,t);a.branches.push(l);let u=o&&o(a,l,!1);ji(l,n),u&&u(),n.currentNode=null}else n.onError(_e(30,e.loc));break}}}function ad(e,t){let n=e.tagType===3;return{type:10,loc:e.loc,condition:t.name==="else"?void 0:t.exp,children:n&&!ct(e,"for")?e.children:[e],userKey:Gr(e,"key"),isTemplateIf:n}}function ld(e,t,n){return e.condition?Wl(e.condition,cd(e,t,n),Pe(n.helper(Kr),['""',"true"])):cd(e,t,n)}function cd(e,t,n){let{helper:o}=n,r=Oe("key",Y(`${t}`,!1,bt,2)),{children:s}=e,i=s[0];if(s.length!==1||i.type!==1)if(s.length===1&&i.type===11){let l=i.codegenNode;return Ui(l,r,n),l}else return Hr(n,o(Ur),Dt([r]),s,64,void 0,void 0,!0,!1,!1,e.loc);else{let l=i.codegenNode,u=u_(l);return u.type===13&&pc(u,n),Ui(u,r,n),l}}function z_(e){for(;;)if(e.type===19)if(e.alternate.type===19)e=e.alternate;else return e;else e.type===20&&(e=e.value)}var G_=Ud("for",(e,t,n)=>{let{helper:o,removeHelper:r}=n;return q_(e,t,n,s=>{let i=Pe(o(ic),[s.source]),a=$i(e),l=ct(e,"memo"),u=Gr(e,"key",!1,!0);u&&u.type;let f=u&&(u.type===6?u.value?Y(u.value.content,!0):void 0:u.exp),c=f?Oe("key",f):null,p=s.source.type===4&&s.source.constType>0,d=p?64:u?128:256;return s.codegenNode=Hr(n,o(Ur),void 0,i,d,void 0,void 0,!0,!p,!1,e.loc),()=>{var v;let m,{children:N}=s,A=N.length!==1||N[0].type!==1,b=Fi(e)?e:a&&e.children.length===1&&Fi(e.children[0])?e.children[0]:null;if(b)m=b.codegenNode,a&&c&&Ui(m,c,n);else if(A)m=Hr(n,o(Ur),c?Dt([c]):void 0,e.children,64,void 0,void 0,!0,void 0,!1);else{m=N[0].codegenNode,a&&c&&Ui(m,c,n);let E=!p||m.isBlockRequired===!0;m.isBlock!==E&&(m.isBlock?(r(fo),r(Ho(n.inSSR,m.isComponent))):r(Bo(n.inSSR,m.isComponent))),m.isBlock=E,m.isBlock?(o(fo),o(Ho(n.inSSR,m.isComponent))):(o(Bo(n.inSSR,m.isComponent)),m.needsPatch&&(m.patchFlag=((v=m.patchFlag)!=null?v:0)|512))}if(l){let E=Uo(ql(s.parseResult,[Y("_cached")]));E.body=Zv([It(["const _memo = (",l.exp,")"]),It(["if (_cached && _cached.el",...f?[" && _cached.key === (",f,")"]:[],` && ${n.helperString(Nd)}(_cached, _memo)) return _cached`]),It(["const _item = ",m]),Y("_item.memo = _memo"),Y("return _item")]),i.arguments.push(E,Y("_cache"),Y(String(n.cached.length))),n.cached.push(null)}else i.arguments.push(Uo(ql(s.parseResult),m,!0))}})});function q_(e,t,n,o){if(!t.exp){n.onError(_e(31,t.loc));return}let r=t.forParseResult;if(!r){n.onError(_e(32,t.loc));return}Wd(r,n);let{addIdentifiers:s,removeIdentifiers:i,scopes:a}=n,{source:l,value:u,key:f,index:c}=r,p={type:11,loc:t.loc,source:l,valueAlias:u,keyAlias:f,objectIndexAlias:c,parseResult:r,children:$i(e)?e.children:[e]};n.replaceNode(p),a.vFor++;let d=o&&o(p);return()=>{a.vFor--,d&&d()}}function Wd(e,t){e.finalized||(e.finalized=!0)}function ql({value:e,key:t,index:n},o=[]){return J_([e,t,n,...o])}function J_(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map((n,o)=>n||Y("_".repeat(o+1),!1))}var ud=Y("undefined",!1),Y_=(e,t)=>{if(e.type===1&&(e.tagType===1||e.tagType===3)){let n=ct(e,"slot");if(n)return n.exp,t.scopes.vSlot++,()=>{t.scopes.vSlot--}}};var Q_=(e,t,n,o)=>Uo(e,n,!1,!0,n.length?n[0].loc:o);function Z_(e,t,n=Q_){t.helper(uc);let{children:o,loc:r}=e,s=[],i=[],a=t.scopes.vSlot>0||t.scopes.vFor>0,l=ct(e,"slot",!0);if(l){let{arg:N,exp:A}=l;N&&!Qe(N)&&(a=!0),s.push(Oe(N||Y("default",!0),n(A,void 0,o,r)))}let u=!1,f=!1,c=[],p=new Set,d=0;for(let N=0;N<o.length;N++){let A=o[N],b;if(!$i(A)||!(b=ct(A,"slot",!0))){A.type!==3&&c.push(A);continue}if(l){t.onError(_e(37,b.loc));break}u=!0;let{children:E,loc:y}=A,{arg:g=Y("default",!0),exp:O,loc:D}=b,S;Qe(g)?S=g?g.content:"default":a=!0;let T=ct(A,"for"),V=n(O,T,E,y),M,w;if(M=ct(A,"if"))a=!0,i.push(Wl(M.exp,Ai(g,V,d++),ud));else if(w=ct(A,/^else(?:-if)?$/,!0)){let $=N,P;for(;$--&&(P=o[$],!!Hi(P)););if(P&&$i(P)&&ct(P,/^(?:else-)?if$/)){let W=i[i.length-1];for(;W.alternate.type===19;)W=W.alternate;W.alternate=w.exp?Wl(w.exp,Ai(g,V,d++),ud):Ai(g,V,d++)}else t.onError(_e(30,w.loc))}else if(T){a=!0;let $=T.forParseResult;$?(Wd($,t),i.push(Pe(t.helper(ic),[$.source,Uo(ql($),Ai(g,V),!0)]))):t.onError(_e(32,T.loc))}else{if(S){if(p.has(S)){t.onError(_e(38,D));continue}p.add(S),S==="default"&&(f=!0)}s.push(Oe(g,V))}}if(!l){let N=(A,b)=>{let E=n(A,void 0,b,r);return t.compatConfig&&(E.isNonScopedSlot=!0),Oe("default",E)};u?c.length&&!c.every(gc)&&(f?t.onError(_e(39,c[0].loc)):s.push(N(void 0,c))):s.push(N(void 0,o))}let v=a?2:Vi(e.children)?3:1,m=Dt(s.concat(Oe("_",Y(v+"",!1))),r);return i.length&&(m=Pe(t.helper(bd),[m,co(i)])),{slots:m,hasDynamicSlots:a}}function Ai(e,t,n){let o=[Oe("name",e),Oe("fn",t)];return n!=null&&o.push(Oe("key",Y(String(n),!0))),Dt(o)}function Vi(e){for(let t=0;t<e.length;t++){let n=e[t];switch(n.type){case 1:if(n.tagType===2||Vi(n.children))return!0;break;case 9:if(Vi(n.branches))return!0;break;case 10:case 11:if(Vi(n.children))return!0;break}}return!1}var Kd=new WeakMap,ey=(e,t)=>function(){if(e=t.currentNode,!(e.type===1&&(e.tagType===0||e.tagType===1)))return;let{tag:o,props:r}=e,s=e.tagType===1,i=s?ty(e,t):`"${o}"`,a=ie(i)&&i.callee===nc,l,u,f=0,c,p,d,v=!1,m=!1,N=a||i===Fr||i===Yl||!s&&(o==="svg"||o==="foreignObject"||o==="math");if(r.length>0){let b=Xd(e,t,void 0,s,a);l=b.props,f=b.patchFlag,p=b.dynamicPropNames,v=b.needsPatch,m=b.isBlockRequired;let E=b.directives;d=E&&E.length?co(E.map(y=>oy(y,t))):void 0,b.shouldUseBlock&&(N=!0)}if(e.children.length>0)if(i===Ri&&(N=!0,f|=1024),s&&i!==Fr&&i!==Ri){let{slots:E,hasDynamicSlots:y}=Z_(e,t);u=E,y&&(f|=1024)}else if(e.children.length===1&&i!==Fr){let E=e.children[0],y=E.type,g=y===5||y===8;g&&ut(E,t)===0&&(f|=1),g||y===2?u=E:u=e.children}else u=e.children;p&&p.length&&(c=ry(p));let A=e.codegenNode=Hr(t,i,l,u,f===0?void 0:f,c,d,!!N,!1,s,e.loc);v=v&&(f===0||f===32),v&&(A.needsPatch=!0),m&&(A.isBlockRequired=!0)};function ty(e,t,n=!1){let{tag:o}=e,r=Jl(o),s=Gr(e,"is",!1,!0);if(s)if(r||uo("COMPILER_IS_ON_ELEMENT",t)){let a;if(s.type===6?a=s.value&&Y(s.value.content,!0):(a=s.exp,a||(a=Y("is",!1,s.arg.loc))),a)return Pe(t.helper(nc),[a])}else s.type===6&&s.value.content.startsWith("vue:")&&(o=s.value.content.slice(4));let i=Td(o)||t.isBuiltInComponent(o);return i?(n||t.helper(i),i):(t.helper(tc),t.components.add(o),jr(o,"component"))}function Xd(e,t,n=e.props,o,r,s=!1){let{tag:i,loc:a,children:l}=e,u=[],f=[],c=[],p=l.length>0,d=!1,v=!1,m=0,N=!1,A=!1,b=!1,E=!1,y=!1,g=!1,O=[],D=w=>{u.length&&(f.push(Dt(fd(u),a)),u=[]),w&&f.push(w)},S=()=>{t.scopes.vFor>0&&u.push(Oe(Y("ref_for",!0),Y("true")))},T=({key:w,value:$})=>{if(Qe(w)){let P=w.content,W=Ht(P);if(W&&(!o||r)&&P.toLowerCase()!=="onclick"&&P!=="onUpdate:modelValue"&&!Lt(P)&&(E=!0),W&&Lt(P)&&(g=!0),P==="ref"&&(N=!0),W&&$.type===14&&($=$.arguments[0]),$.type===20||($.type===4||$.type===8)&&ut($,t)>0)return;P==="class"?A=!0:P==="style"?b=!0:P!=="ref"&&P!=="key"&&!O.includes(P)&&O.push(P),o&&(P==="class"||P==="style")&&!O.includes(P)&&O.push(P)}else y=!0};for(let w=0;w<n.length;w++){let $=n[w];if($.type===6){let{loc:P,name:W,nameLoc:j,value:ae}=$,pe=!0;if(W==="ref"&&(N=!0,S()),W==="is"&&(Jl(i)||ae&&ae.content.startsWith("vue:")||uo("COMPILER_IS_ON_ELEMENT",t)))continue;u.push(Oe(Y(W,!0,j),Y(ae?ae.content:"",pe,ae?ae.loc:P)))}else{let{name:P,arg:W,exp:j,loc:ae,modifiers:pe}=$,he=P==="bind",re=P==="on";if(P==="slot"){o||t.onError(_e(40,ae));continue}if(P==="once"||P==="memo"||P==="is"||he&&Ln(W,"is")&&(Jl(i)||uo("COMPILER_IS_ON_ELEMENT",t))||re&&s)continue;if(he&&Ln(W,"key")&&(d=!0),re&&p&&W&&Qe(W)&&ce(W.content)==="vue:beforeUpdate"&&(d=!0,v=!0),he&&Ln(W,"ref")&&S(),!W&&(he||re)){if(y=!0,j)if(he){if(D(),uo("COMPILER_V_BIND_OBJECT_ORDER",t)){f.unshift(j);continue}S(),D(),f.push(j)}else D({type:14,loc:ae,callee:t.helper(cc),arguments:o?[j]:[j,"true"]});else t.onError(_e(he?34:35,ae));continue}he&&pe.some(Ee=>Ee.content==="prop")&&(m|=32);let Me=t.directiveTransforms[P];if(Me){let{props:Ee,needRuntime:et}=Me($,e,t);!s&&Ee.forEach(T),re&&W&&!Qe(W)?D(Dt(Ee,a)):u.push(...Ee),et&&(c.push($),Ae(et)&&Kd.set($,et))}else Na(P)||(c.push($),p&&(d=!0,v=!0))}}let V;f.length?(D(),f.length>1?V=Pe(t.helper(Pi),f,a):V=f[0]):u.length&&(V=Dt(fd(u),a)),y?m|=16:(A&&!o&&(m|=2),b&&!o&&(m|=4),O.length&&(m|=8),E&&(m|=32));let M=(m===0||m===32)&&(N||g||c.length>0);if(!d&&M&&(m|=512),!t.inSSR&&V)switch(V.type){case 15:let w=-1,$=-1,P=!1;for(let ae=0;ae<V.properties.length;ae++){let pe=V.properties[ae].key;Qe(pe)?pe.content==="class"?w=ae:pe.content==="style"&&($=ae):pe.isHandlerKey||(P=!0)}let W=V.properties[w],j=V.properties[$];P?V=Pe(t.helper(Br),[V]):(W&&!Qe(W.value)&&(W.value=Pe(t.helper(ac),[W.value])),j&&(b||j.value.type===4&&j.value.content.trim()[0]==="["||j.value.type===17)&&(j.value=Pe(t.helper(lc),[j.value])));break;case 14:break;default:V=Pe(t.helper(Br),[Pe(t.helper(zr),[V])]);break}return{props:V,directives:c,patchFlag:m,dynamicPropNames:O,shouldUseBlock:d,needsPatch:M,isBlockRequired:v}}function fd(e){let t=new Map,n=[];for(let o=0;o<e.length;o++){let r=e[o];if(r.key.type===8||!r.key.isStatic){n.push(r);continue}let s=r.key.content,i=t.get(s);i?(s==="style"||s==="class"||Ht(s))&&ny(i,r):(t.set(s,r),n.push(r))}return n}function ny(e,t){e.value.type===17?e.value.elements.push(t.value):e.value=co([e.value,t.value],e.loc)}function oy(e,t){let n=[],o=Kd.get(e);o?n.push(t.helperString(o)):(t.helper(oc),t.directives.add(e.name),n.push(jr(e.name,"directive")));let{loc:r}=e;if(e.exp&&n.push(e.exp),e.arg&&(e.exp||n.push("void 0"),n.push(e.arg)),Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));let s=Y("true",!1,r);n.push(Dt(e.modifiers.map(i=>Oe(i,s)),r))}return co(n,e.loc)}function ry(e){let t="[";for(let n=0,o=e.length;n<o;n++)t+=JSON.stringify(e[n]),n<o-1&&(t+=", ");return t+"]"}function Jl(e){return e==="component"||e==="Component"}var sy=(e,t)=>{if(Fi(e)){let{children:n,loc:o}=e,{slotName:r,slotProps:s}=iy(e,t),i=[t.prefixIdentifiers?"_ctx.$slots":"$slots",r,"{}","undefined","true"],a=2;s&&(i[2]=s,a=3),n.length&&(i[3]=Uo([],n,!1,!1,o),a=4),t.scopeId&&!t.slotted&&(a=5),i.splice(a),e.codegenNode=Pe(t.helper(yd),i,o)}};function iy(e,t){let n='"default"',o,r=[];for(let s=0;s<e.props.length;s++){let i=e.props[s];if(i.type===6)i.value&&(i.name==="name"?n=JSON.stringify(i.value.content):(i.name=ce(i.name),r.push(i)));else if(i.name==="bind"&&Ln(i.arg,"name")){if(i.exp)n=i.exp;else if(i.arg&&i.arg.type===4){let a=ce(i.arg.content);n=i.exp=Y(a,!1,i.arg.loc)}}else i.name==="bind"&&i.arg&&Qe(i.arg)&&(i.arg.content=ce(i.arg.content)),r.push(i)}if(r.length>0){let{props:s,directives:i}=Xd(e,t,r,!1,!1);o=s,i.length&&t.onError(_e(36,i[0].loc))}return{slotName:n,slotProps:o}}var _c=(e,t,n,o)=>{let{loc:r,modifiers:s,arg:i}=e;!e.exp&&!s.length&&n.onError(_e(35,r));let a;if(i.type===4)if(i.isStatic){let c=i.content;c.startsWith("vue:")&&(c=`vnode-${c.slice(4)}`);let p=t.tagType!==0||c.startsWith("vnode")||!/[A-Z]/.test(c)?rn(ce(c)):`on:${c}`;a=Y(p,!0,i.loc)}else a=It([`${n.helperString(jl)}(`,i,")"]);else a=i,a.children.unshift(`${n.helperString(jl)}(`),a.children.push(")");let l=e.exp;l&&!l.content.trim()&&(l=void 0);let u=n.cacheHandlers&&!l&&!n.inVOnce;if(l){let c=Cd(l),p=!(c||i_(l)),d=l.content.includes(";");(p||u&&c)&&(l=It([`${p?"$event":"(...args)"} => ${d?"{":"("}`,l,d?"}":")"]))}let f={props:[Oe(a,l||Y("() => {}",!1,r))]};return o&&(f=o(f)),u&&(f.props[0].value=n.cache(f.props[0].value)),f.props.forEach(c=>c.key.isHandlerKey=!0),f},ay=(e,t,n)=>{let{modifiers:o,loc:r}=e,s=e.arg,{exp:i}=e;return i&&i.type===4&&!i.content.trim()&&(i=void 0),s.type!==4?(s.children.unshift("("),s.children.push(') || ""')):s.isStatic||(s.content=s.content?`${s.content} || ""`:'""'),o.some(a=>a.content==="camel")&&(s.type===4?s.isStatic?s.content=ce(s.content):s.content=`${n.helperString(Hl)}(${s.content})`:(s.children.unshift(`${n.helperString(Hl)}(`),s.children.push(")"))),n.inSSR||(o.some(a=>a.content==="prop")&&pd(s,"."),o.some(a=>a.content==="attr")&&pd(s,"^")),{props:[Oe(s,i)]}},pd=(e,t)=>{e.type===4?e.isStatic?e.content=t+e.content:e.content=`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"))},ly=(e,t)=>{if(e.type===0||e.type===1||e.type===11||e.type===10)return()=>{let n=e.children,o,r=!1;for(let s=0;s<n.length;s++){let i=n[s];if(Ul(i)){r=!0;for(let a=s+1;a<n.length;a++){let l=n[a];if(Ul(l))o||(o=n[s]=It([i],i.loc)),o.children.push(" + ",l),n.splice(a,1),a--;else{o=void 0;break}}}}if(!(!r||n.length===1&&(e.type===0||e.type===1&&e.tagType===0&&!e.props.find(s=>s.type===7&&!t.directiveTransforms[s.name])&&e.tag!=="template")))for(let s=0;s<n.length;s++){let i=n[s];if(Ul(i)||i.type===8){let a=[];(i.type!==2||i.content!==" ")&&a.push(i),!t.ssr&&ut(i,t)===0&&a.push("1"),n[s]={type:12,content:i,loc:i.loc,codegenNode:Pe(t.helper(ec),a)}}}}},dd=new WeakSet,cy=(e,t)=>{if(e.type===1&&ct(e,"once",!0))return dd.has(e)||t.inVOnce||t.inSSR?void 0:(dd.add(e),t.inVOnce=!0,t.helper(Mi),()=>{t.inVOnce=!1;let n=t.currentNode;n.codegenNode&&(n.codegenNode=t.cache(n.codegenNode,!0,!0))})},yc=(e,t,n)=>{let{exp:o,arg:r}=e;if(!o)return n.onError(_e(41,e.loc)),$r();let s=o.loc.source.trim(),i=o.type===4?o.content:s,a=n.bindingMetadata[s];if(a==="props"||a==="props-aliased")return n.onError(_e(44,o.loc)),$r();if(a==="literal-const"||a==="setup-const")return n.onError(_e(45,o.loc)),$r();if(!i.trim()||!Cd(o))return n.onError(_e(42,o.loc)),$r();let l=r||Y("modelValue",!0),u=r?Qe(r)?`onUpdate:${ce(r.content)}`:It(['"onUpdate:" + ',r]):"onUpdate:modelValue",f,c=n.isTS?"($event: any)":"$event";f=It([`${c} => ((`,o,") = $event)"]);let p=[Oe(l,e.exp),Oe(u,f)];if(e.modifiers.length&&t.tagType===1){let d=e.modifiers.map(m=>m.content).map(m=>(hc(m)?m:JSON.stringify(m))+": true").join(", "),v=r?Qe(r)?`${r.content}Modifiers`:It([r,' + "Modifiers"']):"modelModifiers";p.push(Oe(v,Y(`{ ${d} }`,!1,e.loc,2)))}return $r(p)};function $r(e=[]){return{props:e}}var uy=/[\w).+\-_$\]]/,fy=(e,t)=>{uo("COMPILER_FILTERS",t)&&(e.type===5?Bi(e.content,t):e.type===1&&e.props.forEach(n=>{n.type===7&&n.name!=="for"&&n.exp&&Bi(n.exp,t)}))};function Bi(e,t){if(e.type===4)hd(e,t);else for(let n=0;n<e.children.length;n++){let o=e.children[n];typeof o=="object"&&(o.type===4?hd(o,t):o.type===8?Bi(o,t):o.type===5&&Bi(o.content,t))}}function hd(e,t){let n=e.content,o=!1,r=!1,s=!1,i=!1,a=0,l=0,u=0,f=0,c,p,d,v,m=[];for(d=0;d<n.length;d++)if(p=c,c=n.charCodeAt(d),o)c===39&&p!==92&&(o=!1);else if(r)c===34&&p!==92&&(r=!1);else if(s)c===96&&p!==92&&(s=!1);else if(i)c===47&&p!==92&&(i=!1);else if(c===124&&n.charCodeAt(d+1)!==124&&n.charCodeAt(d-1)!==124&&!a&&!l&&!u)v===void 0?(f=d+1,v=n.slice(0,d).trim()):N();else{switch(c){case 34:r=!0;break;case 39:o=!0;break;case 96:s=!0;break;case 40:u++;break;case 41:u--;break;case 91:l++;break;case 93:l--;break;case 123:a++;break;case 125:a--;break}if(c===47){let A=d-1,b;for(;A>=0&&(b=n.charAt(A),b===" ");A--);(!b||!uy.test(b))&&(i=!0)}}v===void 0?v=n.slice(0,d).trim():f!==0&&N();function N(){m.push(n.slice(f,d).trim()),f=d+1}if(m.length){for(d=0;d<m.length;d++)v=py(v,m[d],t);e.content=v,e.ast=void 0}}function py(e,t,n){n.helper(rc);let o=t.indexOf("(");if(o<0)return n.filters.add(t),`${jr(t,"filter")}(${e})`;{let r=t.slice(0,o),s=t.slice(o+1);return n.filters.add(r),`${jr(r,"filter")}(${e}${s!==")"?","+s:s}`}}var md=new WeakSet,dy=(e,t)=>{if(e.type===1){let n=ct(e,"memo");return!n||md.has(e)||t.inSSR?void 0:(md.add(e),()=>{let o=e.codegenNode||t.currentNode.codegenNode;o&&o.type===13&&(e.tagType!==1&&pc(o,t),e.codegenNode=Pe(t.helper(fc),[n.exp,Uo(void 0,o),"_cache",String(t.cached.length)]),t.cached.push(null))})}},hy=(e,t)=>{if(e.type===1){for(let n of e.props)if(n.type===7&&n.name==="bind"&&(!n.exp||n.exp.type===4&&!n.exp.content.trim())&&n.arg){let o=n.arg;if(o.type!==4||!o.isStatic)t.onError(_e(53,o.loc)),n.exp=Y("",!0,o.loc);else{let r=ce(o.content);(wd.test(r[0])||r[0]==="-")&&(n.exp=Y(r,!1,o.loc))}}}};function my(e){return[[hy,cy,K_,dy,G_,fy,sy,ey,Y_,ly],{on:_c,bind:ay,model:yc}]}function zd(e,t={}){let n=t.onError||dc,o=t.mode==="module";t.prefixIdentifiers===!0?n(_e(48)):o&&n(_e(49));let r=!1;t.cacheHandlers&&n(_e(50)),t.scopeId&&!o&&n(_e(51));let s=q({},t,{prefixIdentifiers:r}),i=z(e)?Pd(e,s):e,[a,l]=my();return w_(i,q({},s,{nodeTransforms:[...a,...t.nodeTransforms||[]],directiveTransforms:q({},l,t.directiveTransforms||{})})),D_(i,s)}var Gd=()=>({props:[]});var Jd=Symbol(""),Yd=Symbol(""),Qd=Symbol(""),Zd=Symbol(""),bc=Symbol(""),eh=Symbol(""),th=Symbol(""),nh=Symbol(""),Nc=Symbol(""),oh=Symbol("");Sd({[Jd]:"vModelRadio",[Yd]:"vModelCheckbox",[Qd]:"vModelText",[Zd]:"vModelSelect",[bc]:"vModelDynamic",[eh]:"withModifiers",[th]:"withKeys",[nh]:"vShow",[Nc]:"Transition",[oh]:"TransitionGroup"});var Wo;function gy(e,t=!1){return Wo||(Wo=document.createElement("div")),t?(Wo.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,Wo.children[0].getAttribute("foo")):(Wo.innerHTML=e,Wo.textContent)}var Ey={parseMode:"html",isVoidTag:Eu,isNativeTag:e=>xa(e)||Ta(e)||wa(e),isPreTag:e=>e==="pre",isIgnoreNewlineTag:e=>e==="pre"||e==="textarea",decodeEntities:gy,isBuiltInComponent:e=>{if(e==="Transition"||e==="transition")return Nc;if(e==="TransitionGroup"||e==="transition-group")return oh},getNamespace(e,t,n){let o=t?t.ns:n;if(t&&o===2)if(t.tag==="annotation-xml"){if(e==="svg")return 1;t.props.some(r=>r.type===6&&r.name==="encoding"&&r.value!=null&&(r.value.content==="text/html"||r.value.content==="application/xhtml+xml"))&&(o=0)}else/^m(?:[ions]|text)$/.test(t.tag)&&e!=="mglyph"&&e!=="malignmark"&&(o=0);else t&&o===1&&(t.tag==="foreignObject"||t.tag==="desc"||t.tag==="title")&&(o=0);if(o===0){if(e==="svg")return 1;if(e==="math")return 2}return o}},vy=e=>{e.type===1&&e.props.forEach((t,n)=>{t.type===6&&t.name==="style"&&t.value&&(e.props[n]={type:7,name:"bind",arg:Y("style",!0,t.loc),exp:_y(t.value.content,t.loc),modifiers:[],loc:t.loc})})},_y=(e,t)=>{let n=Sa(e);return Y(JSON.stringify(n),!1,t,3)};function bn(e,t){return _e(e,t,void 0)}var yy=(e,t,n)=>{let{exp:o,loc:r}=e;return o||n.onError(bn(54,r)),t.children.length&&(n.onError(bn(55,r)),t.children.length=0),{props:[Oe(Y("innerHTML",!0,r),o||Y("",!0))]}},by=(e,t,n)=>{let{exp:o,loc:r}=e;return o||n.onError(bn(56,r)),t.children.length&&(n.onError(bn(57,r)),t.children.length=0),{props:[Oe(Y("textContent",!0),o?ut(o,n)>0?o:Pe(n.helperString(Xr),[o],r):Y("",!0))]}},Ny=(e,t,n)=>{let o=yc(e,t,n);if(!o.props.length||t.tagType===1)return o;e.arg&&n.onError(bn(59,e.arg.loc));function r(){let a=ct(t,"bind");a&&Ln(a.arg,"value")&&n.onError(bn(61,a.loc))}let{tag:s}=t,i=n.isCustomElement(s);if(s==="input"||s==="textarea"||s==="select"||i){let a=Qd,l=!1;if(s==="input"||i){let u=Gr(t,"type");if(u){if(u.type===7)a=bc;else if(u.value)switch(u.value.content){case"radio":a=Jd;break;case"checkbox":a=Yd;break;case"file":l=!0,n.onError(bn(60,e.loc));break;default:break}}else Ad(t)&&(a=bc)}else s==="select"&&(a=Zd);l||(o.needRuntime=n.helper(a))}else n.onError(bn(58,e.loc));return o.props=o.props.filter(a=>!(a.key.type===4&&a.key.content==="modelValue")),o},Sy=Ue("passive,once,capture"),xy=Ue("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),Ty=Ue("left,right"),rh=Ue("onkeyup,onkeydown,onkeypress"),wy=(e,t,n,o)=>{let r=[],s=[],i=[];for(let a=0;a<t.length;a++){let l=t[a].content;l==="native"&&jo("COMPILER_V_ON_NATIVE",n,o)||Sy(l)?i.push(l):Ty(l)?Qe(e)?rh(e.content.toLowerCase())?r.push(l):s.push(l):(r.push(l),s.push(l)):xy(l)?s.push(l):r.push(l)}return{keyModifiers:r,nonKeyModifiers:s,eventOptionModifiers:i}},qd=(e,t)=>Qe(e)&&e.content.toLowerCase()==="onclick"?Y(t,!0):e.type!==4?It(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,Oy=(e,t,n)=>_c(e,t,n,o=>{let{modifiers:r}=e;if(!r.length)return o;let{key:s,value:i}=o.props[0],{keyModifiers:a,nonKeyModifiers:l,eventOptionModifiers:u}=wy(s,r,n,e.loc);if(l.includes("right")&&(s=qd(s,"onContextmenu")),l.includes("middle")&&(s=qd(s,"onMouseup")),l.length&&(i=Pe(n.helper(eh),[i,JSON.stringify(l)])),a.length&&(!Qe(s)||rh(s.content.toLowerCase()))&&(i=Pe(n.helper(th),[i,JSON.stringify(a)])),u.length){let f=u.map(xt).join("");s=Qe(s)?Y(`${s.content}${f}`,!0):It(["(",s,`) + "${f}"`])}return{props:[Oe(s,i)]}}),Cy=(e,t,n)=>{let{exp:o,loc:r}=e;return o||n.onError(bn(62,r)),{props:[],needRuntime:n.helper(nh)}},Ay=(e,t)=>{if(e.type===1&&e.tagType===1&&t.isBuiltInComponent(e.tag)===Nc)return()=>{if(!e.children.length)return;let o=sh(e),r=e.children[0];if(r.type===1)for(let s of r.props)s.type===7&&s.name==="show"&&e.props.push({type:6,name:"persisted",nameLoc:e.loc,value:void 0,loc:e.loc})}};function sh(e){let t=e.children=e.children.filter(o=>!Hi(o)),n=t[0];return t.length!==1||n.type===11||n.type===9&&n.branches.some(sh)}var Dy=(e,t)=>{e.type===1&&e.tagType===0&&(e.tag==="script"||e.tag==="style")&&t.removeNode()};var Iy=[vy,Ay],ky={cloak:Gd,html:yy,text:by,model:Ny,on:Oy,show:Cy};function ih(e,t={}){return zd(e,q({},Ey,t,{nodeTransforms:[Dy,...Iy,...t.nodeTransforms||[]],directiveTransforms:q({},ky,t.directiveTransforms||{}),transformHoist:null}))}var ah=Object.create(null);function Vy(e,t){if(!z(e))if(e.nodeType)e=e.innerHTML;else return De;let n=du(e,t),o=ah[n];if(o)return o;if(e[0]==="#"){let l=document.querySelector(e);e=l?l.innerHTML:""}let r=q({hoistStatic:!0,onError:void 0,onWarn:De},t);!r.isCustomElement&&typeof customElements<"u"&&(r.isCustomElement=l=>!!customElements.get(l));let{code:s}=ih(e,r);function i(l,u=!1){let f=u?l.message:`Template compilation error: ${l.message}`,c=l.loc&&mu(e,l.loc.start.offset,l.loc.end.offset);vi(c?`${f}
${c}`:f)}let a=new Function("Vue",s)(Fl);return a._rc=!0,ah[n]=a}Tl(Vy);var lh="tavern_language_vocab_v1",Sc="default";function ch(){return{activeBookId:Sc,books:[{id:Sc,name:"\u9ED8\u8BA4\u751F\u8BCD\u672C",createdAt:Date.now()}],items:[]}}var oe=ch(),Ry=new Set;function $n(){try{se().localStorage.setItem(lh,JSON.stringify(oe))}catch(e){console.warn("[TavernLanguage] \u4FDD\u5B58\u751F\u8BCD\u672C\u5931\u8D25:",e)}Ry.forEach(e=>{try{e(oe)}catch{}})}function uh(){try{let e=se().localStorage.getItem(lh);if(e){let t=JSON.parse(e);if(t&&Array.isArray(t.books)&&Array.isArray(t.items))return t.books.length===0&&t.books.push({id:Sc,name:"\u9ED8\u8BA4\u751F\u8BCD\u672C",createdAt:Date.now()}),t.books.some(n=>n.id===t.activeBookId)||(t.activeBookId=t.books[0].id),oe=t,oe}}catch{}return oe=ch(),oe}function xc(){return oe}function Ki(e,t){return`${String(t||"en").toLowerCase()}::${String(e||"").trim().toLowerCase()}`}function fh(e,t){let n=Ki(e,t);return oe.items.find(o=>o.key===n)||null}function Xi(e){oe.books.some(t=>t.id===e)&&(oe.activeBookId=e,$n())}function ph(e){let t=String(e||"").trim();if(!t)return null;let n=`book_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,o={id:n,name:t,createdAt:Date.now()};return oe.books.push(o),oe.activeBookId=n,$n(),o}function dh(e){if(oe.books.length<=1)return!1;let t=oe.books.findIndex(o=>o.id===e);if(t<0)return!1;oe.books.splice(t,1);let n=oe.books[0].id;return oe.items.forEach(o=>{o.bookId===e&&(o.bookId=n)}),oe.activeBookId===e&&(oe.activeBookId=n),$n(),!0}function Tc(e){let t=String(e.word||"").trim(),n=String(e.lang||"en").toLowerCase();if(!t)return null;let o=Ki(t,n),r=e.bookId||oe.activeBookId||oe.books[0].id,s=oe.items.find(a=>a.key===o);if(s)return s.bookId=r,e.phonetic&&(s.phonetic=e.phonetic),e.reading&&(s.reading=e.reading),e.briefCn&&(s.briefCn=e.briefCn),e.pos&&(s.pos=e.pos),e.context&&(s.context=e.context),e.audioUrl&&(s.audioUrl=e.audioUrl),s.updatedAt=Date.now(),$n(),s;let i={id:`w_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,key:o,word:t,lang:n,bookId:r,phonetic:e.phonetic||"",reading:e.reading||"",pos:e.pos||"",briefCn:e.briefCn||"",context:e.context||"",audioUrl:e.audioUrl||"",createdAt:Date.now(),updatedAt:Date.now()};return oe.items.unshift(i),$n(),i}function zi(e,t=null){let n=-1;if(t){let o=Ki(e,t);n=oe.items.findIndex(r=>r.key===o)}else n=oe.items.findIndex(o=>o.id===e);return n<0?!1:(oe.items.splice(n,1),$n(),!0)}function hh(e,t){let n=oe.items.find(o=>o.id===e);return!n||!oe.books.some(o=>o.id===t)?!1:(n.bookId=t,n.updatedAt=Date.now(),$n(),!0)}function mh(){return JSON.stringify(oe,null,2)}function gh(e){let t=JSON.parse(e);if(!t||!Array.isArray(t.books)||!Array.isArray(t.items))throw new Error("\u65E0\u6548\u7684\u751F\u8BCD\u672C JSON \u683C\u5F0F");for(let n of t.books)n?.id&&n?.name&&!oe.books.some(o=>o.id===n.id)&&oe.books.push({id:n.id,name:n.name,createdAt:n.createdAt||Date.now()});for(let n of t.items){if(!n?.word||!n?.lang)continue;let o=Ki(n.word,n.lang);if(!oe.items.some(r=>r.key===o)){let r=oe.books.some(s=>s.id===n.bookId)?n.bookId:oe.books[0].id;oe.items.push({...n,key:o,bookId:r})}}return $n(),oe.items.length}var te=cn({config:J(),vocab:xc(),popover:{visible:!1,loading:!1,word:"",lang:"en",contextSentence:"",entry:null,activeSourceId:"",sentenceTranslation:"",sentenceLoading:!1,showBookPicker:!1,placement:"below",style:{}},selection:{visible:!1,text:"",lang:"en",translation:"",loading:!1,style:{}},modal:{visible:!1,activeTab:"vocab"}});function Jr(){te.config=JSON.parse(JSON.stringify(J()))}function kt(){te.vocab=JSON.parse(JSON.stringify(xc()))}function Eh(){jc(),uh(),Jr(),kt()}function po(e="general"){te.modal.activeTab=e,te.modal.visible=!0}function wc(){te.modal.visible=!1}var Oc="tl-option-language-settings",Cc="tl-option-vocab-book",Ko=null;function Py(e){let t=e.getElementById("options");t&&(t.style.display="none")}function vh(e,t,n,o,r){let s=e.createElement("a");return s.id=t,s.className="tl-ignore",s.innerHTML=`<i class="fa-lg fa-solid ${n}"></i><span>${o}</span>`,s.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),Py(e),po(r)}),s}function _h(){let e=ge();e.getElementById("tl-settings-entry")?.remove(),e.getElementById("tl-options-entry")?.remove();let t=e.querySelector("#options .options-content")||e.getElementById("options_content")||e.getElementById("options");return t?(e.getElementById(Cc)||t.appendChild(vh(e,Cc,"fa-star","\u6211\u7684\u751F\u8BCD\u672C","vocab")),e.getElementById(Oc)||t.appendChild(vh(e,Oc,"fa-language","\u5916\u8BED\u5B66\u4E60\u8BBE\u7F6E","general")),!0):!1}function yh(){if(Ac(),_h())return;let e=0;Ko=setInterval(()=>{e++,(_h()||e>=20)&&(clearInterval(Ko),Ko=null)},500)}function Ac(){Ko&&(clearInterval(Ko),Ko=null);let e=ge();e.getElementById(Oc)?.remove(),e.getElementById(Cc)?.remove(),e.getElementById("tl-settings-entry")?.remove(),e.getElementById("tl-options-entry")?.remove()}var ho=new Map,Rt=new Map,Xo=new Map,kc="tavern_language_dict_cache_v1",Sh=400,My=4e3,bh=!1,Dc=null,Vt={noun:{abbr:"n.",cn:"\u540D\u8BCD",tone:"noun"},"proper noun":{abbr:"prop.n.",cn:"\u4E13\u6709\u540D\u8BCD",tone:"noun"},verb:{abbr:"v.",cn:"\u52A8\u8BCD",tone:"verb"},adjective:{abbr:"adj.",cn:"\u5F62\u5BB9\u8BCD",tone:"adj"},adverb:{abbr:"adv.",cn:"\u526F\u8BCD",tone:"adv"},pronoun:{abbr:"pron.",cn:"\u4EE3\u8BCD",tone:"other"},preposition:{abbr:"prep.",cn:"\u4ECB\u8BCD",tone:"other"},conjunction:{abbr:"conj.",cn:"\u8FDE\u8BCD",tone:"other"},interjection:{abbr:"int.",cn:"\u611F\u53F9\u8BCD",tone:"other"},article:{abbr:"art.",cn:"\u51A0\u8BCD",tone:"other"},determiner:{abbr:"det.",cn:"\u9650\u5B9A\u8BCD",tone:"other"},particle:{abbr:"part.",cn:"\u52A9\u8BCD",tone:"other"},expression:{abbr:"expr.",cn:"\u60EF\u7528\u8BED",tone:"other"},numeral:{abbr:"num.",cn:"\u6570\u8BCD",tone:"other"},prefix:{abbr:"pref.",cn:"\u524D\u7F00",tone:"other"},suffix:{abbr:"suff.",cn:"\u540E\u7F00",tone:"other"}};function Ke(e){let t=String(e||"").toLowerCase().trim();return Vt[t]?Vt[t]:t.includes("noun")?Vt.noun:t.includes("verb")?Vt.verb:t.includes("adj")?Vt.adjective:t.includes("adv")?Vt.adverb:t.includes("pron")?Vt.pronoun:t.includes("prep")?Vt.preposition:t.includes("conj")?Vt.conjunction:t.includes("interj")?Vt.interjection:t.includes("part")?Vt.particle:t.includes("expr")?Vt.expression:{abbr:e||"\u8BCD\u9879",cn:"",tone:"other"}}function Vc(){if(!bh){bh=!0;try{let e=se().localStorage.getItem(kc);if(!e)return;let t=JSON.parse(e);if(Array.isArray(t))for(let[n,o]of t)n&&o&&Rt.set(n,o)}catch{}}}function Ly(){Dc||(Dc=setTimeout(()=>{Dc=null;try{let e=[...Rt.entries()].slice(-Sh);se().localStorage.setItem(kc,JSON.stringify(e))}catch{}},600))}function Nh(e,t){if(Vc(),Rt.has(e)&&Rt.delete(e),Rt.size>=Sh){let n=Rt.keys().next().value;Rt.delete(n)}Rt.set(e,t),Ly()}function $y(e,t){return new Promise((n,o)=>{let r=setTimeout(()=>o(new Error("\u8BCD\u5178\u8BF7\u6C42\u8D85\u65F6")),t);e.then(s=>{clearTimeout(r),n(s)},s=>{clearTimeout(r),o(s)})})}function Pt(e){if(!e||!e.id)throw new Error("[TavernLanguage] registerDictionary \u9700\u8981 id \u5B57\u6BB5");return ho.set(e.id,e),e}function Gi(e=null){let t=[...ho.values()];return e?t.filter(n=>n.languages.includes("*")||n.languages.includes(e)):t}function xh(e){return ho.get(e)||null}function Th(){Rt.clear(),Xo.clear();try{se().localStorage.removeItem(kc)}catch{}}function Yr(e){let t=J(),n=ot(e),o=t.dictionaryChains?.[e];return(Array.isArray(o)&&o.length>0?o:n?.defaultDictionaries||["google-dict","wiktionary","ai-context"]).filter(s=>ho.has(s))}async function Fy(e){let t=J();if(!t.autoTranslateDict||!e||!Array.isArray(e.meanings))return e;let n=[];for(let o of e.meanings)for(let r of o.definitions||[])!r.cn&&r.text&&n.length<5&&n.push(r);if(n.length===0)return e;try{let o=n.map(i=>i.text).join(`
`),s=(await Mt(o,{from:"en",to:"zh-CN",providerId:t.translator==="tavern-ai"?"google":t.translator})).split(/\r?\n/).map(i=>i.trim());s.length===n.length&&n.forEach((i,a)=>{i.cn=s[a]||""})}catch{}return e}async function Ic(e,t,n){let o=e.id==="ai-context"?15e3:My,r=await $y(e.lookup(t,n),o);return r&&r.meanings&&r.meanings.length>0?(r.sourceId=e.id,r.sourceName=e.name,r):null}function wh(e,t=null){let n=String(e||"").trim();if(!n)return;let o=t||J().targetLang||"en",r=`auto|${o}|${n.toLowerCase()}`;Vc(),!(Rt.has(r)||Xo.has(r))&&Qr(n,{lang:o}).catch(()=>{})}async function Qr(e,t={}){let n=String(e||"").trim();if(!n)return null;Vc();let o=J(),r=t.lang||o.targetLang||"en",s=ot(r),i=t.sourceId||null,a=typeof t.onUpdate=="function"?t.onUpdate:null,l=`${i||"auto"}|${r}|${n.toLowerCase()}`;if(!t.bypassCache&&Rt.has(l)){let f=Rt.get(l);return a&&a(f,!1),f}if(!t.bypassCache&&Xo.has(l)){let f=await Xo.get(l);return f&&a&&a(f,!1),f}let u=(async()=>{let f=i?[i]:Yr(r),c={lang:r,langDef:s,context:t.context||"",config:o},p=i?f:f.filter(v=>v!=="ai-context"||f.length===1),d=null;if(p.length>=2&&!i){let v=p.slice(0,2).map(m=>{let N=ho.get(m);return N?Ic(N,n,c).then(A=>{if(!A)throw new Error("empty");return A}):Promise.reject(new Error("missing"))});try{d=await Promise.any(v)}catch{d=null}if(!d&&p.length>2)for(let m of p.slice(2)){let N=ho.get(m);if(N)try{if(d=await Ic(N,n,c),d)break}catch{}}}else for(let v of p){let m=ho.get(v);if(m)try{if(d=await Ic(m,n,c),d)break}catch(N){console.warn(`[TavernLanguage] \u8BCD\u5178 ${v} \u67E5\u8BCD\u5931\u8D25 (${n}):`,N?.message||N)}}if(d)return a&&a({...d},!1),d.meanings.some(m=>(m.definitions||[]).some(N=>!N.cn&&N.text))&&o.autoTranslateDict&&(await Fy(d),a&&a({...d},!1)),Nh(l,d),d;try{let v=await Mt(n,{from:r,to:"zh-CN"});if(v){let m={word:n,phonetic:"",reading:"",audioUrl:"",briefCn:v,tags:[],sourceId:"fallback-translate",sourceName:"\u76F4\u8BD1",meanings:[{pos:"translation",posInfo:{abbr:"\u8BD1",cn:"\u76F4\u8BD1",tone:"other"},definitions:[{text:"",cn:v,example:""}]}]};return Nh(l,m),a&&a(m,!1),m}}catch{}return null})();Xo.set(l,u);try{return await u}finally{Xo.delete(l)}}var Yt=null,Zr=null,es=null,ts=null,Rc=0;function qi(){te.popover.visible=!1,te.popover.showBookPicker=!1,Yt&&(Yt.classList.remove("tl-word-active"),Yt=null)}function Uy(e){let t=se(),n=ge(),o=t.visualViewport?.width||t.innerWidth,r=t.visualViewport?.height||t.innerHeight,s=10,i=26,a=e.getBoundingClientRect(),l=a.top-i-s,u=r-(a.bottom+i)-s;if(l<210&&u<210){let N=n.getElementById("chat");if(N&&N.scrollHeight>N.clientHeight){let A=Math.round(r*.28),b=a.top-A;N.scrollTop+=b,a=e.getBoundingClientRect()}}let f=Math.max(s,a.top-i),c=Math.min(r-s,a.bottom+i),p=f-s,v=r-c-s>=p?"below":"above",m={};if(v==="below"){let N=Math.min(r-180,Math.round(c+6)),A=Math.max(170,Math.min(400,Math.round(r-N-s-6)));m.top=`${N}px`,m.bottom="auto",m.maxHeight=`${A}px`}else{let N=Math.min(r-180,Math.round(r-f+6)),A=Math.max(170,Math.min(400,Math.round(r-N-s-6)));m.bottom=`${N}px`,m.top="auto",m.maxHeight=`${A}px`}if(o<=640)m.left=`${s}px`,m.right=`${s}px`,m.width="auto";else{let N=Math.min(368,o-s*2),A=Math.max(s,Math.min(a.left+a.width/2-N/2,o-N-s));m.left=`${Math.round(A)}px`,m.right="auto",m.width=`${N}px`}return{placement:v,style:m}}async function Oh(e,t=null){let n=e.dataset.tlWord||e.textContent||"",o=e.dataset.tlLang||J().targetLang||"en";if(!n.trim())return;Yt&&Yt!==e&&Yt.classList.remove("tl-word-active"),Yt=e,Yt.classList.add("tl-word-active");let r=zc(e),{placement:s,style:i}=Uy(e),a=++Rc,l=te.popover;l.visible=!0,l.loading=!0,l.word=n,l.lang=o,l.contextSentence=r,l.entry=null,l.activeSourceId=t||"",l.sentenceTranslation="",l.sentenceLoading=!1,l.showBookPicker=!1,l.placement=s,l.style=i,!t&&J().autoSpeakWord&&yo(n,{lang:o}).catch(()=>{});let u=await Qr(n,{lang:o,context:r,sourceId:t,onUpdate(f,c){a!==Rc||!te.popover.visible||(l.entry=f,l.loading=c,f?.sourceId&&(l.activeSourceId=t||f.sourceId),!t&&J().autoSpeakWord&&f?.audioUrl&&yo(n,{lang:o,audioUrl:f.audioUrl}).catch(()=>{}))}});a!==Rc||!te.popover.visible||(l.loading=!1,u&&(l.entry=u,l.activeSourceId=t||u.sourceId||""))}function Ch(){Pc();let e=ge();Zr=t=>{if(t.target?.closest?.(".tl-popover, .tl-sel-bar, .tl-modal-backdrop"))return;let n=t.target?.closest?.("span.tl-word");if(n&&J().enabled){if(!nu(t))return;t.stopPropagation(),Oh(n);return}te.popover.visible&&qi()},es=t=>{if(!J().enabled)return;let n=t.target?.closest?.("span.tl-word");if(!n)return;let o=n.dataset.tlWord||n.textContent||"",r=n.dataset.tlLang||J().targetLang||"en";o.trim()&&wh(o,r)},ts=t=>{t.key==="Escape"&&te.popover.visible&&qi()},e.addEventListener("pointerdown",es,{passive:!0}),e.addEventListener("click",Zr,!1),e.addEventListener("keydown",ts,!1)}function Pc(){qi();let e=ge();es&&(e.removeEventListener("pointerdown",es),es=null),Zr&&(e.removeEventListener("click",Zr,!1),Zr=null),ts&&(e.removeEventListener("keydown",ts,!1),ts=null)}var Ah=at({name:"WordPopover",setup(){let e=te.popover,t=Fe(()=>Yr(e.lang).map(v=>xh(v)).filter(Boolean)),n=Fe(()=>(te.vocab.items,fh(e.entry?.word||e.word,e.lang))),o=Fe(()=>te.vocab.books||[]);function r(){return e.entry?.word||e.word}function s(){yo(r(),{lang:e.lang,audioUrl:e.entry?.audioUrl||""}).catch(()=>{})}function i(d){d&&en(d,{lang:e.lang}).catch(()=>{})}function a(){e.contextSentence&&en(e.contextSentence,{lang:e.lang}).catch(()=>{})}async function l(){if(!(!e.contextSentence||e.sentenceLoading)){e.sentenceLoading=!0,e.sentenceTranslation="";try{e.sentenceTranslation=await Mt(e.contextSentence,{from:e.lang,to:"zh-CN"})}catch(d){e.sentenceTranslation=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${d?.message||"\u7F51\u7EDC\u5F02\u5E38"}`}finally{e.sentenceLoading=!1}}}function u(d){Yt&&Oh(Yt,d)}function f(d){let v=e.entry?.meanings?.[0],m=v?.definitions?.[0];return{word:r(),lang:e.lang,bookId:d,phonetic:e.entry?.phonetic||"",reading:e.entry?.reading||"",pos:v?.posInfo?.abbr||v?.pos||"",briefCn:e.entry?.briefCn||m?.cn||m?.text||"",context:e.contextSentence||"",audioUrl:e.entry?.audioUrl||""}}function c(){let d=r();if(n.value)zi(d,e.lang),kt(),Se(`\u5DF2\u79FB\u51FA\u751F\u8BCD\u672C\uFF1A${d}`,"info");else{let v=te.vocab.activeBookId;Tc(f(v)),kt();let m=o.value.find(N=>N.id===v)?.name||"\u751F\u8BCD\u672C";Se(`\u5DF2\u6536\u85CF\u5230\u300C${m}\u300D`,"success")}}function p(d){Xi(d),Tc(f(d)),kt(),e.showBookPicker=!1;let v=o.value.find(m=>m.id===d)?.name||"\u751F\u8BCD\u672C";Se(`\u5DF2\u4FDD\u5B58\u5230\u300C${v}\u300D`,"success")}return{pop:e,sources:t,starredItem:n,books:o,closeWordPopover:qi,onSpeakWord:s,onSpeakExample:i,onSpeakSentence:a,onTranslateSentence:l,onSwitchSource:u,onToggleStar:c,onSaveToBook:p}},template:`
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
  `});var mo=null,ns=null,zo=null;function Ji(){te.selection.visible=!1,te.selection.text="",te.selection.translation="",te.selection.loading=!1}function By(e){let t=se(),n=t.visualViewport?.width||t.innerWidth,o=t.visualViewport?.height||t.innerHeight,r=10;if(n<=640)return e.top<110?{left:`${r}px`,right:`${r}px`,top:`${Math.min(o-90,Math.round(e.bottom+12))}px`}:{left:`${r}px`,right:`${r}px`,bottom:`${Math.max(r,Math.round(o-e.top+12))}px`};let s=310,i=Math.max(r,Math.min(e.left+e.width/2-s/2,n-s-r));return e.top<110?{left:`${Math.round(i)}px`,top:`${Math.min(o-80,Math.round(e.bottom+10))}px`}:{left:`${Math.round(i)}px`,bottom:`${Math.max(r,Math.round(o-e.top+10))}px`}}function Hy(){if(!J().enabled){Ji();return}let t=se().getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return;let n=t.toString().replace(/\s+/g," ").trim();if(n.length<2)return;let o=t.getRangeAt(0),r=o.commonAncestorContainer.nodeType===1?o.commonAncestorContainer:o.commonAncestorContainer.parentElement;if(!r||!r.closest(".mes_text")||r.closest(".tl-trans-block, .tl-mes-footer"))return;let s=o.getBoundingClientRect();!s||s.width===0&&s.height===0||(te.selection.text=n,te.selection.lang=J().targetLang||"en",te.selection.translation="",te.selection.loading=!1,te.selection.style=By(s),te.selection.visible=!0)}function Dh(){Mc();let e=ge();mo=t=>{t.target?.closest?.(".tl-sel-bar, .tl-popover, .tl-modal-backdrop")||(zo&&clearTimeout(zo),zo=setTimeout(Hy,70))},ns=t=>{te.selection.visible&&!t.target?.closest?.(".tl-sel-bar")&&Ji()},e.addEventListener("mouseup",mo,!1),e.addEventListener("touchend",mo,!1),e.addEventListener("mousedown",ns,!1)}function Mc(){zo&&(clearTimeout(zo),zo=null),Ji();let e=ge();mo&&(e.removeEventListener("mouseup",mo,!1),e.removeEventListener("touchend",mo,!1),mo=null),ns&&(e.removeEventListener("mousedown",ns,!1),ns=null)}var Ih=at({name:"SelectionBar",setup(){let e=te.selection;async function t(){if(!(!e.text||e.loading)){e.loading=!0,e.translation="";try{e.translation=await Mt(e.text,{from:e.lang,to:"zh-CN"})}catch(r){e.translation=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${r?.message||"\u7F51\u7EDC\u5F02\u5E38"}`}finally{e.loading=!1}}}function n(){e.text&&en(e.text,{lang:e.lang}).catch(()=>{})}async function o(){try{await se().navigator.clipboard.writeText(e.text),Se("\u5DF2\u590D\u5236\u9009\u4E2D\u6587\u672C","success")}catch{Se("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236","warning")}}return{sel:e,onTranslate:t,onSpeak:n,onCopy:o,closeSelectionBar:Ji}},template:`
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
  `});var kh=at({name:"VocabBookView",setup(){let e=gt("all"),t=gt("all"),n=gt(""),o=gt(""),r=gt(!1),s=Fe(()=>te.vocab.books||[]),i=Fe(()=>(te.vocab.items||[]).length),a=Fe(()=>te.vocab.activeBookId),l=Fe(()=>vo()),u=Fe(()=>{let y=n.value.trim().toLowerCase();return(te.vocab.items||[]).filter(g=>!(e.value!=="all"&&g.bookId!==e.value||t.value!=="all"&&g.lang!==t.value||y&&!`${g.word} ${g.briefCn} ${g.reading} ${g.context}`.toLowerCase().includes(y)))});function f(y){return(te.vocab.items||[]).filter(g=>g.bookId===y).length}function c(){let y=o.value.trim();if(!y)return;let g=ph(y);g&&(kt(),e.value=g.id,o.value="",r.value=!1,Se(`\u5DF2\u65B0\u5EFA\u5355\u8BCD\u672C\u300C${g.name}\u300D`,"success"))}function p(y){Xi(y),kt(),Se("\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u85CF\u5355\u8BCD\u672C","success")}function d(y){if(s.value.length<=1){Se("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u5355\u8BCD\u672C","warning");return}dh(y.id),kt(),e.value===y.id&&(e.value="all"),Se(`\u5DF2\u5220\u9664\u300C${y.name}\u300D\uFF0C\u8BCD\u6761\u5DF2\u4FDD\u7559\u5230\u9ED8\u8BA4\u672C`,"info")}function v(y,g){hh(y.id,g.target.value),kt(),Se("\u5DF2\u79FB\u52A8\u81F3\u76EE\u6807\u5355\u8BCD\u672C","success")}function m(y){zi(y.id),kt()}function N(y){yo(y.word,{lang:y.lang,audioUrl:y.audioUrl}).catch(()=>{})}function A(y){y.context&&en(y.context,{lang:y.lang}).catch(()=>{})}async function b(){try{await se().navigator.clipboard.writeText(mh()),Se("\u751F\u8BCD\u672C JSON \u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F","success")}catch{Se("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u526A\u8D34\u677F\u6743\u9650","warning")}}function E(){let g=se().prompt("\u8BF7\u7C98\u8D34\u4E4B\u524D\u5BFC\u51FA\u7684\u751F\u8BCD\u672C JSON\uFF1A");if(g)try{let O=gh(g);kt(),Se(`\u5BFC\u5165\u6210\u529F\uFF0C\u5F53\u524D\u5171 ${O} \u6761\u751F\u8BCD`,"success")}catch(O){Se(`\u5BFC\u5165\u5931\u8D25\uFF1A${O?.message||"\u683C\u5F0F\u9519\u8BEF"}`,"error")}}return{selectedBookId:e,selectedLang:t,searchQuery:n,newBookName:o,showCreateBook:r,books:s,totalCount:i,activeBookId:a,languages:l,filteredItems:u,countByBook:f,onCreateBook:c,onSetDefaultBook:p,onDeleteBook:d,onMoveItem:v,onRemoveItem:m,onSpeakItem:N,onSpeakContext:A,onExport:b,onImport:E}},template:`
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
  `});var jy=["details","blockquote","table","thinking","status",".status-bar","em","strong"],Vh=at({name:"SettingsModal",components:{VocabBookView:kh},setup(){let e=te.modal,t=cn({enabled:!0,targetLang:"en",theme:"tavern",promptInjection:{enabled:!0,level:"B1",promptText:"",depth:0},dictionaryChains:{},autoTranslateDict:!0,autoSpeakWord:!1,translator:"google",customAi:{baseUrl:"",apiKey:"",model:""},tts:{engine:"auto",rate:1,enAccent:"us"},ui:{showWordUnderline:!0,autoShowMesButtons:!0},excludeText:""});function n(){let b=JSON.parse(JSON.stringify(J()));Object.assign(t,b),t.promptInjection.promptText=sa(b),t.excludeText=Yo(b.excludeSelectors).join(", ")}Po(()=>e.visible,b=>{b&&n()},{immediate:!0});let o=Fe(()=>vo()),r=Fe(()=>ps()),s=Fe(()=>ot(t.targetLang)),i=Fe(()=>s.value?.levels||[]),a=Fe(()=>{let b=t.targetLang,E=t.dictionaryChains?.[b];return Array.isArray(E)&&E.length>0?E:Yr(b)}),l=Fe(()=>{let b=Gi(t.targetLang),E=a.value;return[...E.map(y=>b.find(g=>g.id===y)).filter(Boolean),...b.filter(y=>!E.includes(y.id))]});function u(){let b=i.value;b.length&&!b.some(E=>E.id===t.promptInjection.level)&&(t.promptInjection.level=b[1]?.id||b[0].id),t.promptInjection.promptText=Zo(t.targetLang,t.promptInjection.level)}function f(){t.promptInjection.promptText=Zo(t.targetLang,t.promptInjection.level)}function c(){t.promptInjection.promptText=Zo(t.targetLang,t.promptInjection.level)}function p(b){return a.value.includes(b)}function d(b,E){let y=t.targetLang,g=[...a.value];if(E&&!g.includes(b))g.push(b);else if(!E){let O=g.indexOf(b);O>=0&&g.splice(O,1)}t.dictionaryChains={...t.dictionaryChains,[y]:g}}function v(b,E){let y=t.targetLang,g=[...a.value],O=g.indexOf(b),D=O+E;O>=0&&D>=0&&D<g.length&&([g[O],g[D]]=[g[D],g[O]],t.dictionaryChains={...t.dictionaryChains,[y]:g})}function m(b){let E=Yo(t.excludeText);E.includes(b)||(E.push(b),t.excludeText=E.join(", "))}function N(){Th(),Gc(),Se("\u7F13\u5B58\u5DF2\u6E05\u7406","success")}function A(){let b=JSON.parse(JSON.stringify(t));b.excludeSelectors=Yo(t.excludeText),b.tts.rate=Number(t.tts.rate)||1,delete b.excludeText,is(b),Jr(),wc(),Se("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58","success")}return{VERSION:Jo,QUICK_EXCLUDE_CHIPS:jy,modal:e,draft:t,languages:o,translators:r,currentLangDef:s,currentLevels:i,orderedDictionaries:l,closeModal:wc,onLangChange:u,onLevelChange:f,onResetPrompt:c,isDictEnabled:p,toggleDict:d,moveDict:v,addExcludeChip:m,onClearCache:N,onSave:A}},template:`
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
  `});var Rh="tl-vue-root",os=null,Fn=null,Wy=at({name:"TavernLanguageRoot",components:{WordPopover:Ah,SelectionBar:Ih,SettingsModal:Vh},template:`
    <WordPopover />
    <SelectionBar />
    <SettingsModal />
  `});function Ph(){Lc();let e=ge();Fn=e.createElement("div"),Fn.id=Rh,Fn.className="tl-ignore",e.body.appendChild(Fn),os=Lr(Wy),os.mount(Fn)}function Lc(){if(os){try{os.unmount()}catch{}os=null}Fn&&(Fn.remove(),Fn=null);let e=ge().getElementById(Rh);e&&e.remove()}var Mh=/([A-Za-z]+(?:['’][A-Za-z]+)?(?:-[A-Za-z]+)*)/g,hS=Nn({code:"en",name:"\u82F1\u8BED",nativeName:"English",bcp47:"en-US",googleCode:"en",wiktionaryLang:"English",youdaoLang:"en",defaultDictionaries:["google-dict","free-dict","wiktionary","ai-context"],levels:[{id:"A2",label:"A2 \u521D\u7EA7",desc:"Use simple A2-level English with short, clear sentences and high-frequency daily vocabulary."},{id:"B1",label:"B1 \u4E2D\u7EA7",desc:"Use natural B1-level intermediate English with everyday expressions and moderate sentence complexity."},{id:"B2",label:"B2 \u4E2D\u9AD8\u7EA7",desc:"Use rich, idiomatic B2-level upper-intermediate English with nuanced phrasing."},{id:"C1",label:"C1 \u9AD8\u7EA7",desc:"Use sophisticated C1-level advanced English with vivid literary vocabulary and natural idioms."},{id:"native",label:"\u6BCD\u8BED\u7EA7",desc:"Use completely natural, authentic native-level English matching the character and setting."}],tokenize(e){let t=[],n=0;Mh.lastIndex=0;let o;for(;(o=Mh.exec(e))!==null;){o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1});let r=o[0];t.push({text:r,lookup:r.replace(/’/g,"'"),isWord:r.length>=1}),n=o.index+r.length}return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: English]","Write your ENTIRE response strictly in English (dialogue, narration, actions, and thoughts). Do not translate into Chinese unless explicitly asked in-character.",(this.levels.find(o=>o.id===e)||this.levels[1]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var Ky=/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u3400-\u4DBFー]/,Lh=/([\u4E00-\u9FFF\u3400-\u4DBF]+[\u3040-\u309F]*|[\u30A0-\u30FFー]+|[\u3040-\u309F]{2,})/g,Yi=null;try{typeof Intl<"u"&&typeof Intl.Segmenter=="function"&&(Yi=new Intl.Segmenter("ja",{granularity:"word"}))}catch{Yi=null}var ES=Nn({code:"ja",name:"\u65E5\u8BED",nativeName:"\u65E5\u672C\u8A9E",bcp47:"ja-JP",googleCode:"ja",wiktionaryLang:"Japanese",youdaoLang:"ja",defaultDictionaries:["google-dict","jotoba","wiktionary","ai-context"],levels:[{id:"N5",label:"JLPT N5",desc:"Use beginner JLPT N5-level Japanese with simple grammar and basic everyday words."},{id:"N4",label:"JLPT N4",desc:"Use JLPT N4-level Japanese with clear conversational expressions."},{id:"N3",label:"JLPT N3",desc:"Use natural JLPT N3-level intermediate Japanese suitable for everyday conversation and light fiction."},{id:"N2",label:"JLPT N2",desc:"Use natural JLPT N2-level Japanese with rich expressions and nuanced tone."},{id:"native",label:"\u6BCD\u8BED\u7EA7",desc:"Use completely natural, authentic native Japanese matching the character personality and context."}],tokenize(e){if(Yi){let r=[];for(let s of Yi.segment(e)){let i=!!(s.isWordLike&&Ky.test(s.segment));r.push({text:s.segment,lookup:s.segment,isWord:i})}return r}let t=[],n=0;Lh.lastIndex=0;let o;for(;(o=Lh.exec(e))!==null;)o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1}),t.push({text:o[0],lookup:o[0],isWord:!0}),n=o.index+o[0].length;return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: Japanese]","Write your ENTIRE response strictly in Japanese (dialogue, narration, actions, and thoughts). Do not include Chinese translations or romaji unless explicitly asked.",(this.levels.find(o=>o.id===e)||this.levels[2]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var $h="A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0152\u0153\xC6\xE6",Fh=new RegExp(`([${$h}]+(?:-[${$h}]+)*)`,"g"),yS=Nn({code:"fr",name:"\u6CD5\u8BED",nativeName:"Fran\xE7ais",bcp47:"fr-FR",googleCode:"fr",wiktionaryLang:"French",youdaoLang:"fr",defaultDictionaries:["google-dict","wiktionary","ai-context"],levels:[{id:"A2",label:"A2 \u521D\u7EA7",desc:"Use clear A2-level French with simple sentences and everyday vocabulary."},{id:"B1",label:"B1 \u4E2D\u7EA7",desc:"Use natural B1-level intermediate French with common idiomatic expressions."},{id:"B2",label:"B2 \u4E2D\u9AD8\u7EA7",desc:"Use expressive, idiomatic B2-level French with natural nuance."},{id:"C1",label:"C1 \u9AD8\u7EA7",desc:"Use refined C1-level French with rich literary vocabulary and authentic turns of phrase."},{id:"native",label:"\u6BCD\u8BED\u7EA7",desc:"Use completely authentic, natural native-level French matching the character and atmosphere."}],tokenize(e){let t=[],n=0;Fh.lastIndex=0;let o;for(;(o=Fh.exec(e))!==null;){o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1});let r=o[0];t.push({text:r,lookup:r,isWord:r.length>=1}),n=o.index+r.length}return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: French]","Write your ENTIRE response strictly in French (dialogue, narration, actions, and thoughts). Do not translate into Chinese unless explicitly asked in-character.",(this.levels.find(o=>o.id===e)||this.levels[1]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var SS=Pt({id:"google-dict",name:"\u6781\u901F\u8BCD\u5178",description:"\u5355\u6B21\u8BF7\u6C42\u76F4\u51FA\u8BCD\u6027\u4E0E\u4E2D\u6587\u91CA\u4E49\uFF0C\u54CD\u5E94\u6700\u5FEB\uFF0C\u652F\u6301\u6240\u6709\u8BED\u79CD",languages:["*"],async lookup(e,{lang:t}){let o=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(t||"auto")}&tl=zh-CN&dt=t&dt=bd&dt=rm&q=${encodeURIComponent(e)}`,r=await fetch(o);if(!r.ok)return null;let s=await r.json();if(!Array.isArray(s))return null;let i=Array.isArray(s[0])?s[0].map(u=>Array.isArray(u)?u[0]:"").join("").trim():"",a="";if(Array.isArray(s[0])){for(let u of s[0])if(Array.isArray(u)&&typeof u[3]=="string"&&u[3].trim()){a=u[3].trim();break}}let l=[];if(Array.isArray(s[1]))for(let u of s[1]){if(!Array.isArray(u))continue;let f=u[0]||"",c=Array.isArray(u[1])?u[1].slice(0,6):[];c.length!==0&&l.push({pos:f,posInfo:Ke(f),definitions:[{cn:c.join("\uFF1B"),text:"",example:""}]})}return l.length===0&&i&&l.push({pos:"translation",posInfo:{abbr:"\u8BD1",cn:"\u91CA\u4E49",tone:"other"},definitions:[{cn:i,text:"",example:""}]}),l.length===0?null:{word:e,phonetic:"",reading:t==="ja"?a:"",audioUrl:"",briefCn:i,tags:[],meanings:l}}});var wS=Pt({id:"free-dict",name:"Free Dictionary",description:"\u82F1\u8BED\u6743\u5A01\u5F00\u6E90\u8BCD\u5178\uFF0C\u63D0\u4F9B\u97F3\u6807\u3001\u8BCD\u6027\u3001\u4F8B\u53E5\u4E0E\u771F\u4EBA\u53D1\u97F3",languages:["en"],async lookup(e,{config:t}){let n=e.toLowerCase().replace(/^['’]+|['’]+$/g,""),o=`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(n)}`,r=await fetch(o);if(!r.ok)return null;let s=await r.json();if(!Array.isArray(s)||s.length===0)return null;let i=s[0],a=t?.tts?.enAccent||"us",l=i.phonetic||"",u="",f=Array.isArray(i.phonetics)?i.phonetics:[];for(let p of f)if(!l&&p.text&&(l=p.text),p.audio){let d=p.audio.toLowerCase();if(u||(u=p.audio),a==="uk"&&d.includes("-uk")){u=p.audio,p.text&&(l=p.text);break}if(a==="us"&&d.includes("-us")){u=p.audio,p.text&&(l=p.text);break}}let c=[];for(let p of i.meanings||[]){let d=(p.definitions||[]).slice(0,3).map(v=>({text:v.definition||"",cn:"",example:v.example||""}));d.length>0&&c.push({pos:p.partOfSpeech||"",posInfo:Ke(p.partOfSpeech),definitions:d})}return c.length===0?null:{word:i.word||e,phonetic:l,reading:"",audioUrl:u,briefCn:"",tags:[],meanings:c}}});function Xy(e){if(!Array.isArray(e)||e.length===0)return{raw:"word",info:Ke("")};let t=e[0],n="";typeof t=="string"?n=t:t&&typeof t=="object"&&(n=Object.keys(t)[0]||"");let o=n.toLowerCase();return o.includes("noun")?{raw:"noun",info:Ke("noun")}:o.includes("verb")||o.includes("godan")||o.includes("ichidan")?{raw:"verb",info:Ke("verb")}:o.includes("adj")?{raw:"adjective",info:Ke("adjective")}:o.includes("adv")?{raw:"adverb",info:Ke("adverb")}:o.includes("part")?{raw:"particle",info:Ke("particle")}:o.includes("expr")?{raw:"expression",info:Ke("expression")}:{raw:n,info:Ke(n)}}var AS=Pt({id:"jotoba",name:"Jotoba",description:"\u65E5\u8BED\u8BCD\u5178\uFF0C\u542B\u5047\u540D\u8BFB\u97F3\u3001\u8BCD\u6027\u4E0E\u53D1\u97F3",languages:["ja"],async lookup(e){let t=await fetch("https://jotoba.de/api/search/words",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:e,language:"English",no_english:!1})});if(!t.ok)return null;let o=(await t.json())?.words;if(!Array.isArray(o)||o.length===0)return null;let r=o.find(c=>c.reading?.kanji===e||c.reading?.kana===e)||o[0],s=r.reading?.kanji||"",i=r.reading?.kana||"",a=r.audio?`https://jotoba.de${r.audio}`:"",l=[];r.common&&l.push("\u5E38\u7528\u8BCD");let u=new Map;for(let c of(r.senses||[]).slice(0,5)){let{raw:p,info:d}=Xy(c.pos),v=Array.isArray(c.glosses)?c.glosses.slice(0,4).join("; "):"";if(!v)continue;let m=d.abbr||p;u.has(m)||u.set(m,{pos:p,posInfo:d,definitions:[]}),u.get(m).definitions.push({text:v,cn:"",example:""})}let f=[...u.values()];return f.length===0?null:{word:s||i||e,phonetic:"",reading:i&&i!==s?i:"",audioUrl:a,briefCn:"",tags:l,meanings:f}}});function Uh(e){return String(e||"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g," ").trim()}var kS=Pt({id:"wiktionary",name:"Wiktionary",description:"\u591A\u8BED\u79CD\u5F00\u6E90\u8BCD\u5178\uFF0C\u8986\u76D6\u82F1/\u65E5/\u6CD5\u53CA\u5C0F\u8BED\u79CD",languages:["*"],async lookup(e,{lang:t,langDef:n}){let o=[e];e!==e.toLowerCase()&&o.push(e.toLowerCase());let r=null,s=e;for(let l of o){let u=`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(l)}`,f=await fetch(u);if(f.ok){r=await f.json(),s=l;break}}if(!r||typeof r!="object")return null;let i=r[t]||r[n?.code]||null;if(!Array.isArray(i)||i.length===0)return null;let a=[];for(let l of i.slice(0,4)){let u=[];for(let f of(l.definitions||[]).slice(0,3)){let c=Uh(f.definition);if(!c)continue;let p=Array.isArray(f.examples)&&f.examples[0]?Uh(f.examples[0]):"";u.push({text:c,cn:"",example:p})}u.length>0&&a.push({pos:l.partOfSpeech||"",posInfo:Ke(l.partOfSpeech),definitions:u})}return a.length===0?null:{word:s,phonetic:"",reading:"",audioUrl:"",briefCn:"",tags:[n?.nativeName||t],meanings:a}}});async function zy(e,t){let n=t?.customAi||{};if(n.apiKey&&n.baseUrl&&n.model){let r=`${n.baseUrl.replace(/\/+$/,"")}/chat/completions`,s=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n.apiKey}`},body:JSON.stringify({model:n.model,temperature:.2,messages:[{role:"system",content:'You are a concise multilingual dictionary. Respond ONLY in valid JSON: {"phonetic":"","reading":"","pos":"noun|verb|adjective|adverb|expression|other","briefCn":"","definitions":[{"cn":"","text":"","example":""}]}'},{role:"user",content:e}]})});if(!s.ok)throw new Error(`AI \u8BCD\u5178 HTTP ${s.status}`);return(await s.json())?.choices?.[0]?.message?.content||""}let o=Un();if(o&&typeof o.generateRaw=="function")return await o.generateRaw({user_input:`${e}

\u8BF7\u4EC5\u8F93\u51FA\u5408\u6CD5 JSON\uFF08\u4E0D\u8981 markdown \u4EE3\u7801\u5757\uFF09\uFF1A{"phonetic":"","reading":"","pos":"noun","briefCn":"","definitions":[{"cn":"","text":"","example":""}]}`,should_stream:!1});throw new Error("\u672A\u914D\u7F6E\u81EA\u5B9A\u4E49 AI \u4E14\u9152\u9986\u5F53\u524D\u4E0D\u652F\u6301 generateRaw")}var MS=Pt({id:"ai-context",name:"AI \u7CBE\u8BB2",description:"\u7ED3\u5408\u5F53\u524D\u53E5\u5B50\u89E3\u6790\u8BCD\u6027\u4E0E\u8BED\u5883\u542B\u4E49",languages:["*"],async lookup(e,{langDef:t,context:n,config:o}){let r=[`Language: ${t?.name||"Foreign"} (${t?.nativeName||""})`,`Word: ${e}`,n?`Sentence context: "${n}"`:"","Give the base form/reading/IPA, part of speech, exact Chinese meaning in this context, a concise explanation, and one short example."].filter(Boolean).join(`
`),s=await zy(r,o),i=String(s).match(/\{[\s\S]*\}/);if(!i)throw new Error("AI \u8BCD\u5178\u8FD4\u56DE\u683C\u5F0F\u65E0\u6CD5\u89E3\u6790");let a=JSON.parse(i[0]),l=Array.isArray(a.definitions)?a.definitions.slice(0,3).map(u=>({cn:u.cn||"",text:u.text||"",example:u.example||""})):[{cn:a.briefCn||"",text:"",example:""}];return{word:e,phonetic:a.phonetic||"",reading:a.reading||"",audioUrl:"",briefCn:a.briefCn||l[0]?.cn||"",tags:["AI \u8BED\u5883\u89E3\u6790"],meanings:[{pos:a.pos||"expression",posInfo:Ke(a.pos),definitions:l}]}}});var FS=Zt({id:"google",name:"Google \u7FFB\u8BD1",description:"\u514D Key\u3001\u901F\u5EA6\u5FEB",async translate(e,{from:t="auto",to:n="zh-CN"}){let r=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(t==="auto"?"auto":t)}&tl=${encodeURIComponent(n)}&dt=t&q=${encodeURIComponent(e)}`,s=await fetch(r);if(!s.ok)throw new Error(`Google Translate HTTP ${s.status}`);let i=await s.json();if(!Array.isArray(i)||!Array.isArray(i[0]))throw new Error("Google Translate \u8FD4\u56DE\u683C\u5F0F\u5F02\u5E38");return i[0].map(a=>Array.isArray(a)?a[0]:"").join("")}});var HS=Zt({id:"mymemory",name:"MyMemory",description:"\u514D\u8D39\u515C\u5E95\u7FFB\u8BD1",async translate(e,{from:t="en",to:n="zh-CN"}){let o=t==="auto"?"en":t,r=`https://api.mymemory.translated.net/get?q=${encodeURIComponent(e)}&langpair=${encodeURIComponent(o)}|${encodeURIComponent(n)}`,s=await fetch(r);if(!s.ok)throw new Error(`MyMemory HTTP ${s.status}`);let a=(await s.json())?.responseData?.translatedText;if(!a)throw new Error("MyMemory \u672A\u8FD4\u56DE\u8BD1\u6587");return a}});var XS=Zt({id:"custom-ai",name:"\u81EA\u5B9A\u4E49 AI",description:"\u4F7F\u7528\u81EA\u5B9A\u4E49 OpenAI \u517C\u5BB9\u63A5\u53E3\u7FFB\u8BD1",async translate(e,{from:t,to:n="\u7B80\u4F53\u4E2D\u6587",context:o,config:r}){let s=r?.customAi||{};if(!s.apiKey||!s.baseUrl||!s.model)throw new Error("\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u586B\u5199\u81EA\u5B9A\u4E49 AI \u7684 Base URL\u3001API Key \u4E0E\u6A21\u578B\u540D\u79F0");let i=`${s.baseUrl.replace(/\/+$/,"")}/chat/completions`,a=`You are a literary translator. Translate the user's ${t||"foreign"} text into natural, fluent ${n==="zh-CN"?"Simplified Chinese":n}. Preserve tone, emotion, and character voice. Output ONLY the translation without explanation.`,l=o&&o!==e?`Context:
${o}

Translate this text:
${e}`:e,u=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.apiKey}`},body:JSON.stringify({model:s.model,temperature:.2,messages:[{role:"system",content:a},{role:"user",content:l}]})});if(!u.ok)throw new Error(`Custom AI HTTP ${u.status}`);let c=(await u.json())?.choices?.[0]?.message?.content;if(!c)throw new Error("Custom AI \u672A\u8FD4\u56DE\u5185\u5BB9");return c.trim()}}),zS=Zt({id:"tavern-ai",name:"\u9152\u9986 API",description:"\u4F7F\u7528\u9152\u9986\u5F53\u524D\u8FDE\u63A5\u7684\u6A21\u578B\u7FFB\u8BD1",async translate(e,{from:t,to:n="\u7B80\u4F53\u4E2D\u6587"}){let o=Un();if(!o||typeof o.generateRaw!="function")throw new Error("\u5F53\u524D\u9152\u9986\u52A9\u624B\u7248\u672C\u4E0D\u652F\u6301 generateRaw");let r=`\u8BF7\u5C06\u4EE5\u4E0B${t||"\u5916\u8BED"}\u6587\u672C\u51C6\u786E\u3001\u81EA\u7136\u5730\u7FFB\u8BD1\u6210${n==="zh-CN"?"\u7B80\u4F53\u4E2D\u6587":n}\uFF0C\u4FDD\u7559\u539F\u672C\u7684\u8BED\u6C14\u4E0E\u60C5\u7EEA\u3002\u53EA\u8F93\u51FA\u4E2D\u6587\u8BD1\u6587\uFF0C\u4E0D\u8981\u9644\u52A0\u4EFB\u4F55\u89E3\u91CA\u6216\u5F15\u53F7\uFF1A

${e}`,s=await o.generateRaw({user_input:r,should_stream:!1});if(!s||typeof s!="string")throw new Error("\u9152\u9986 API \u672A\u8FD4\u56DE\u6709\u6548\u8BD1\u6587");return s.trim()}});var Go="__TAVERN_LANG_INSTANCE__",Qi=null;function Bh(){Qi&&(Qi(),Qi=null),_o(),ia(),ha(),Pc(),Mc(),tu(),Ac(),Lc(),da(),ru();let e=se();e[Go]?.destroy===Bh&&delete e[Go]}function Gy(){let e=ge(),t=["https://translate.googleapis.com","https://api.dictionaryapi.dev","https://en.wiktionary.org","https://jotoba.de"];for(let n of t){let o=`tl-preconnect-${n.replace(/[^a-z0-9]/gi,"")}`;if(e.getElementById(o))continue;let r=e.createElement("link");r.id=o,r.rel="preconnect",r.href=n,r.crossOrigin="anonymous",e.head.appendChild(r)}}function qy(e={}){let t=se();if(t[Go]&&typeof t[Go].destroy=="function")try{t[Go].destroy()}catch(o){console.warn("[TavernLanguage] \u6E05\u7406\u65E7\u5B9E\u4F8B\u65F6\u51FA\u73B0\u8B66\u544A:",o)}Gy(),Eh(),ou(),Ph(),eu(),Ch(),Dh(),yh(),aa(),Yc(),Qi=Wc(o=>{Jr(),_a(o),aa(),o.enabled?pa({force:!0}):da()});let n={version:Jo,init:qy,destroy:Bh,openSettings:()=>po("general"),openVocabBook:()=>po("vocab"),getConfig:J,updateConfig:is,registerLanguage:Nn,getLanguage:ot,listLanguages:vo,registerDictionary:Pt,listDictionaries:Gi,lookupWord:Qr,registerTranslator:Zt,listTranslators:ps,translateText:Mt};if(t[Go]=n,!e.silent){let o=ot(J().targetLang)?.name||J().targetLang;Se(`\u5DF2\u52A0\u8F7D v${Jo}\uFF08\u5F53\u524D\u8BED\u79CD\uFF1A${o}\uFF09`,"success")}return n}function bx(){po("general")}function Nx(){po("vocab")}export{Bh as destroy,qy as init,bx as openSettings,Nx as openVocabBook,Pt as registerDictionary,Nn as registerLanguage,Zt as registerTranslator,Jo as version};
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
