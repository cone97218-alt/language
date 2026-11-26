/**
 * Tavern Language v2.4.0 (Vue 3)
 * SillyTavern 酒馆助手沉浸式外语学习插件
 * Repo: https://github.com/cone97218-alt/language
 */
var dm=Object.defineProperty;var hm=(e,t)=>{for(var n in t)dm(e,n,{get:t[n],enumerable:!0})};function Z(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent}catch{}return window}function he(){return Z().document}function jn(){let e=Z();return window.TavernHelper||e.TavernHelper||null}function pa(){let e=Z();return{eventOn:window.eventOn||e.eventOn||null,eventRemoveListener:window.eventRemoveListener||e.eventRemoveListener||null,tavern_events:window.tavern_events||e.tavern_events||null,iframe_events:window.iframe_events||e.iframe_events||null}}function Ne(e,t="info"){let n=Z(),o=window.toastr||n.toastr;o&&typeof o[t]=="function"?o[t](e,"\u9152\u9986\u5916\u8BED\u5B66\u4E60"):console.log(`[TavernLanguage][${t}] ${e}`)}var er="2.4.0",da="tavern_language_config_v1",mm=["script","style","noscript","iframe","svg","canvas","audio","video",".tl-ignore",".tl-trans-block",".tl-mes-footer",".tl-word",".tl-popover",".tl-sel-bar",".tl-modal-backdrop","#tl-vue-root"],ps={enabled:!0,targetLang:"en",promptInjection:{enabled:!0,level:"B1",promptText:"",depth:0},theme:"tavern",excludeSelectors:["code","pre","kbd","math","summary","button","input","textarea","select"],dictionaryChains:{en:["offline-en","google-dict","free-dict","wiktionary","ai-context"],ja:["google-dict","jotoba","wiktionary","ai-context"],fr:["google-dict","wiktionary","ai-context"]},autoTranslateDict:!0,autoSpeakWord:!1,translator:"google",customAi:{baseUrl:"https://api.openai.com/v1",apiKey:"",model:"gpt-4o-mini"},tts:{engine:"auto",rate:1,enAccent:"us"},ui:{showWordUnderline:!0,autoShowMesButtons:!0,autoTranslateNewMessage:!1}};function _o(e,t){if(!t||typeof t!="object")return e;let n=Array.isArray(e)?[...e]:{...e};for(let o of Object.keys(t)){let r=t[o];r&&typeof r=="object"&&!Array.isArray(r)&&e[o]&&typeof e[o]=="object"&&!Array.isArray(e[o])?n[o]=_o(e[o],r):r!==void 0&&(n[o]=Array.isArray(r)?[...r]:r)}return n}var Ae=_o(ps,{}),ha=new Set;function nf(){try{let e=Z().localStorage.getItem(da);if(e){let t=JSON.parse(e);Ae=_o(ps,t);let n=!1;if(!t._migratedGoogleDict){for(let o of["en","ja","fr"]){let r=Ae.dictionaryChains?.[o];Array.isArray(r)&&!r.includes("google-dict")&&(Ae.dictionaryChains[o]=["google-dict",...r])}Ae._migratedGoogleDict=!0,n=!0}if(!t._migratedOfflineEn){let o=Ae.dictionaryChains?.en;Array.isArray(o)&&!o.includes("offline-en")&&(Ae.dictionaryChains.en=["offline-en",...o]),Ae._migratedOfflineEn=!0,n=!0}if(n)try{Z().localStorage.setItem(da,JSON.stringify(Ae))}catch{}}else Ae=_o(ps,{}),Ae._migratedGoogleDict=!0,Ae._migratedOfflineEn=!0}catch(e){console.warn("[TavernLanguage] \u8BFB\u53D6\u914D\u7F6E\u5931\u8D25\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u914D\u7F6E:",e),Ae=_o(ps,{})}return Ae}function J(){return Ae}function ds(e){Ae=_o(Ae,e);try{Z().localStorage.setItem(da,JSON.stringify(Ae))}catch(t){console.warn("[TavernLanguage] \u4FDD\u5B58\u914D\u7F6E\u5931\u8D25:",t)}return ha.forEach(t=>{try{t(Ae)}catch(n){console.error("[TavernLanguage] \u914D\u7F6E\u76D1\u542C\u56DE\u8C03\u5F02\u5E38:",n)}}),Ae}function of(e){return ha.add(e),()=>ha.delete(e)}function tr(e){return Array.isArray(e)?e.map(t=>String(t).trim()).filter(Boolean):String(e||"").split(/[\n,;，；]+/).map(t=>t.trim()).filter(Boolean)}function hs(e=Ae){let t=tr(e.excludeSelectors);return[...new Set([...mm,...t])]}var nr=new Map;function Tn(e){if(!e||!e.code)throw new Error("[TavernLanguage] registerLanguage \u9700\u8981\u5305\u542B code \u5B57\u6BB5");return nr.set(e.code,e),e}function ot(e){return nr.get(e)||nr.get("en")||[...nr.values()][0]||null}function yo(){return[...nr.values()]}var rf="tavern-language-immersive-prompt",ms=null;function or(e,t){let n=ot(e);return n?n.buildPrompt(t,""):""}function ma(e=J()){let t=String(e.promptInjection?.promptText||"").trim();return t||or(e.targetLang,e.promptInjection?.level)}function ga(){if(typeof ms=="function"){try{ms()}catch{}ms=null}let e=jn();if(e&&typeof e.uninjectPrompts=="function")try{e.uninjectPrompts([rf])}catch{}}function va(){ga();let e=J();if(!e.enabled||!e.promptInjection?.enabled)return!1;let t=jn();if(!t||typeof t.injectPrompts!="function")return!1;let n=ma(e);if(!n)return!1;try{let o=t.injectPrompts([{id:rf,role:"system",content:n,position:"in_chat",depth:Number.isFinite(Number(e.promptInjection.depth))?Number(e.promptInjection.depth):0,should_scan:!1}]);return o&&typeof o.uninject=="function"&&(ms=o.uninject),!0}catch(o){return console.warn("[TavernLanguage] injectPrompts \u6CE8\u5165\u5931\u8D25:",o),!1}}function Ea(e,t){if(!e||e.nodeType!==1)return!1;let n=e.tagName?e.tagName.toLowerCase():"";for(let o of t)if(o){if(/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(o)){if(n===o.toLowerCase())return!0;continue}try{if(e.matches(o))return!0}catch{}}return!1}function vs(e,t,n){let o=e.nodeType===1?e:e.parentElement;for(;o&&o!==t;){if(Ea(o,n))return!0;o=o.parentElement}return!1}function gs(e){if(!e)return;let t=e.querySelectorAll("span.tl-word");for(let n of t){let o=e.ownerDocument.createTextNode(n.textContent||"");n.replaceWith(o)}e.normalize(),delete e.dataset.tlTokenizedLang,delete e.dataset.tlExcludeHash}function sf(e,t={}){if(!e)return;let n=J();if(!n.enabled){gs(e);return}let o=t.lang||n.targetLang||"en",r=ot(o);if(!r)return;let s=hs(n),i=s.join("|");if(!t.force&&e.dataset.tlTokenizedLang===o&&e.dataset.tlExcludeHash===i)return;e.dataset.tlTokenizedLang&&gs(e);let a=e.ownerDocument||he(),l=a.createTreeWalker(e,4,{acceptNode(c){return!c.nodeValue||!c.nodeValue.trim()||vs(c,e,s)?2:1}}),f=[],u;for(;u=l.nextNode();)f.push(u);for(let c of f){let p=r.tokenize(c.nodeValue);if(!p||p.length===0||!p.some(m=>m.isWord))continue;let E=a.createDocumentFragment();for(let m of p)if(m.isWord){let N=a.createElement("span");N.className="tl-word",N.textContent=m.text,N.dataset.tlWord=m.lookup||m.text,N.dataset.tlLang=o,E.appendChild(N)}else E.appendChild(a.createTextNode(m.text));c.replaceWith(E)}e.dataset.tlTokenizedLang=o,e.dataset.tlExcludeHash=i}function af(e){if(!e)return"";let t=e.closest("p, li, blockquote, div.mes_text, h1, h2, h3, h4, h5, h6")||e.parentElement;if(!t)return e.textContent||"";let n="",o=-1,r=-1,s=t.ownerDocument.createTreeWalker(t,4,{acceptNode(u){return u.parentElement?.closest(".tl-trans-block")?2:1}}),i;for(;i=s.nextNode();){let u=i.nodeValue||"";e.contains(i)&&o===-1&&(o=n.length,r=n.length+u.length),n+=u}if(o===-1)return n.trim();let a=/[.!?。！？\n]/,l=o;for(;l>0&&!a.test(n[l-1]);)l--;let f=r;for(;f<n.length&&!a.test(n[f]);)f++;return f<n.length&&/[.!?。！？]/.test(n[f])&&f++,n.slice(l,f).replace(/\s+/g," ").trim()}var Es=new Map,$t=new Map,ya="tavern_language_trans_cache_v1",cf=300,lf=!1,_a=null;function ff(){if(!lf){lf=!0;try{let e=Z().localStorage.getItem(ya);if(!e)return;let t=JSON.parse(e);if(Array.isArray(t))for(let[n,o]of t)n&&o&&$t.set(n,o)}catch{}}}function gm(){_a||(_a=setTimeout(()=>{_a=null;try{let e=[...$t.entries()].slice(-cf);Z().localStorage.setItem(ya,JSON.stringify(e))}catch{}},800))}function vm(e,t){if(ff(),$t.has(e)&&$t.delete(e),$t.size>=cf){let n=$t.keys().next().value;$t.delete(n)}$t.set(e,t),gm()}function on(e){if(!e||!e.id)throw new Error("[TavernLanguage] registerTranslator \u9700\u8981 id \u5B57\u6BB5");return Es.set(e.id,e),e}function _s(){return[...Es.values()]}function uf(){$t.clear();try{Z().localStorage.removeItem(ya)}catch{}}async function mt(e,t={}){let n=String(e||"").trim();if(!n)return"";ff();let o=J(),r=t.from||o.targetLang||"auto",s=t.to||"zh-CN",i=t.providerId||o.translator||"google",a=`${i}|${r}|${s}|${n}`;if(!t.bypassCache&&$t.has(a))return $t.get(a);let l=[i,"google","mymemory"].filter((c,p,d)=>d.indexOf(c)===p&&Es.has(c)),f=null,u=!1;for(let c of l){let p=Es.get(c);try{let d=await p.translate(n,{from:r,to:s,context:t.context||"",config:o});if(d&&d.trim())return vm(a,d.trim()),d.trim()}catch(d){f=d,String(d?.message||"").includes("429")&&(u=!0),console.warn(`[TavernLanguage] \u7FFB\u8BD1\u6E90 ${c} \u5931\u8D25\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A:`,d?.message||d)}}throw u?new Error("\u514D\u8D39\u7FFB\u8BD1\u9650\u6D41\uFF08429\uFF09\uFF0C\u53EF\u7A0D\u540E\u91CD\u8BD5\u6216\u5207\u6362\u4E3A\u300C\u9152\u9986 API\u300D/\u300C\u81EA\u5B9A\u4E49 AI\u300D"):f||new Error("\u6240\u6709\u7FFB\u8BD1\u6E90\u5747\u4E0D\u53EF\u7528")}var gt=null,jt=0;function bo(){if(jt++,gt){try{gt.onended=null,gt.onerror=null,gt.pause(),gt.currentTime=0}catch{}gt=null}let e=Z();if(e.speechSynthesis)try{e.speechSynthesis.cancel()}catch{}}function ys(e,t=1){let n=Z().Audio||Audio,o=new n(e);return o.preload="auto",o.playbackRate=Math.max(.5,Math.min(2,t||1)),o}function ba(e,t){return new Promise((n,o)=>{if(t!==jt){n(!1);return}gt=e,e.onended=()=>{gt===e&&(gt=null),n(!0)},e.onerror=s=>{gt===e&&(gt=null),o(s||new Error("\u97F3\u9891\u64AD\u653E\u5931\u8D25"))};let r=e.play();r&&typeof r.catch=="function"&&r.catch(s=>{gt===e&&(gt=null),o(s)})})}function Na(e,t,n="us"){let o=encodeURIComponent(e);if(t==="en")return`https://dict.youdao.com/dictvoice?audio=${o}&type=${n==="uk"?1:2}`;let s={ja:"jap",fr:"fr",ko:"ko",de:"de",es:"es"}[t]||t;return`https://dict.youdao.com/dictvoice?audio=${o}&le=${encodeURIComponent(s)}`}function Em(e,t=140){let n=String(e||"").replace(/\s+/g," ").trim();if(!n)return[];if(n.length<=t)return[n];let o=n.split(/(?<=[.!?。！？\n])\s*/).map(s=>s.trim()).filter(Boolean),r=[];for(let s of o){if(s.length<=t){r.length>0&&r[r.length-1].length+1+s.length<=t?r[r.length-1]+=" "+s:r.push(s);continue}let i=s.split(/(?<=[,;，；：—])\s*/).map(l=>l.trim()).filter(Boolean),a="";for(let l of i)if(l.length>t){a&&(r.push(a),a="");let f=l;for(;f.length>t;){let u=f.lastIndexOf(" ",t);u<Math.floor(t*.5)&&(u=t),r.push(f.slice(0,u).trim()),f=f.slice(u).trim()}f&&(a=f)}else a?a.length+1+l.length<=t?a+=" "+l:(r.push(a),a=l):a=l;a&&r.push(a)}return r.filter(Boolean)}function _m(e,t){if(!Array.isArray(e)||e.length===0)return null;let n=t.toLowerCase(),o=n.split("-")[0],r=e.filter(i=>i.lang&&i.lang.toLowerCase().startsWith(o));if(r.length===0)return null;let s=/(natural|neural|google|online|enhanced|premium|wavenet|siri)/i;return r.sort((i,a)=>{let l=i.lang.toLowerCase()===n?2:0,f=a.lang.toLowerCase()===n?2:0,u=s.test(i.name||"")?4:0,c=s.test(a.name||"")?4:0;return f+c-(l+u)}),r[0]}function bs(e,t,n=1,o=jt){return new Promise((r,s)=>{if(o!==jt){r(!1);return}let i=Z(),a=i.speechSynthesis,l=i.SpeechSynthesisUtterance||window.SpeechSynthesisUtterance;if(!a||!l){s(new Error("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 Web Speech"));return}try{a.cancel()}catch{}let u=ot(t)?.bcp47||t||"en-US",c=new l(e);c.lang=u,c.rate=Math.max(.5,Math.min(2,n||1));let p=a.getVoices?a.getVoices():[],d=_m(p,u);d&&(c.voice=d),c.onend=()=>r(!0),c.onerror=E=>s(E),a.speak(c)})}async function ym(e,t,n,o,r){if(e.length===0)return;let s=ys(Na(e[0],t,n),o);for(let i=0;i<e.length;i++){if(r!==jt)return;let a=s;s=i+1<e.length?ys(Na(e[i+1],t,n),o):null;try{await ba(a,r)}catch{if(r!==jt)return;try{await bs(e[i],t,o,r)}catch{}}}}async function No(e,t={}){let n=String(e||"").trim();if(!n)return;bo();let o=jt,r=J(),s=t.lang||r.targetLang||"en",i=t.rate??r.tts?.rate??1;if((r.tts?.engine||"auto")==="webspeech")return bs(n,s,i,o);if(t.audioUrl)try{await ba(ys(t.audioUrl,i),o);return}catch{if(o!==jt)return}try{let l=Na(n,s,r.tts?.enAccent||"us");await ba(ys(l,i),o);return}catch{if(o!==jt)return}return bs(n,s,i,o)}async function rn(e,t={}){let n=String(e||"").replace(/\s+/g," ").trim();if(!n)return;bo();let o=jt,r=J(),s=t.lang||r.targetLang||"en",i=t.rate??r.tts?.rate??1;if((r.tts?.engine||"auto")==="webspeech")return bs(n,s,i,o);let l=Em(n,140);await ym(l,s,r.tts?.enAccent||"us",i,o)}var rr=null;function pf(e){return hs(e).filter(t=>t!==".tl-word")}function Ns(e,t,n){let o="",r=e.ownerDocument.createTreeWalker(e,4,{acceptNode(i){return i.parentElement?.closest(".tl-trans-block, .tl-mes-footer")||vs(i,t,n)?2:1}}),s;for(;s=r.nextNode();)o+=s.nodeValue||"";return o.replace(/\s+/g," ").trim()}function bm(e,t){let n=[...e.querySelectorAll("p, li, blockquote")].filter(r=>r.closest(".tl-mes-footer, .tl-trans-block")||Ea(r,t)||vs(r,e,t)||r.parentElement?.closest("p, li, blockquote")?!1:Ns(r,e,t).length>0);return n.length>0?n:Ns(e,e,t)?[e]:[]}async function df(e,t){let n=e.querySelector(".mes_text");if(!n)return;let o=[...n.querySelectorAll(".tl-trans-block")];if(o.length>0){let E=o[0].classList.contains("tl-hidden");o.forEach(m=>m.classList.toggle("tl-hidden",!E)),t.classList.toggle("tl-active",E);return}let r=J(),s=pf(r),i=bm(n,s);if(i.length===0)return;t.classList.add("tl-active"),t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';let a=n.ownerDocument,l=r.targetLang||"en",f=n.querySelector(".tl-mes-footer"),u=i.map(E=>{let m=Ns(E,n,s),N=a.createElement("div");return N.className="tl-trans-block tl-trans-loading tl-ignore",N.textContent="\u7FFB\u8BD1\u4E2D...",E===n?f?f.insertAdjacentElement("beforebegin",N):n.appendChild(N):E.insertAdjacentElement("afterend",N),{text:m,transDiv:N}}),c=[],p=[],d=0;for(let E of u){let m=E.text.replace(/\r?\n+/g," ");p.length>0&&d+m.length+1>1500&&(c.push(p),p=[],d=0),p.push({...E,lineText:m}),d+=m.length+1}p.length>0&&c.push(p);for(let E of c){if(E.length===1){try{let m=await mt(E[0].lineText,{from:l,to:"zh-CN"});E[0].transDiv.classList.remove("tl-trans-loading"),E[0].transDiv.textContent=m}catch(m){E[0].transDiv.classList.remove("tl-trans-loading"),E[0].transDiv.textContent=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${m?.message||"\u8BF7\u91CD\u8BD5"}`}continue}try{let m=E.map(b=>b.lineText).join(`
`),O=(await mt(m,{from:l,to:"zh-CN"})).split(/\r?\n/).map(b=>b.trim()).filter(Boolean);if(O.length===E.length){E.forEach((b,v)=>{b.transDiv.classList.remove("tl-trans-loading"),b.transDiv.textContent=O[v]});continue}}catch(m){if(String(m?.message||"").includes("429")){E.forEach(N=>{N.transDiv.classList.remove("tl-trans-loading"),N.transDiv.textContent=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${m.message}`});continue}}for(let m of E)try{let N=await mt(m.lineText,{from:l,to:"zh-CN"});m.transDiv.classList.remove("tl-trans-loading"),m.transDiv.textContent=N}catch(N){m.transDiv.classList.remove("tl-trans-loading"),m.transDiv.textContent=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${N?.message||"\u8BF7\u91CD\u8BD5"}`}}t.innerHTML='<i class="fa-solid fa-language"></i>'}function sr(e,t){e.classList.toggle("tl-active",t),e.innerHTML=t?'<i class="fa-solid fa-stop"></i>':'<i class="fa-solid fa-volume-high"></i>'}async function Nm(e,t){if(rr===e){bo(),rr=null,sr(t,!1);return}let n=e.querySelector(".mes_text");if(!n)return;let o=J(),r=pf(o),s=Ns(n,n,r);if(s){e.ownerDocument.querySelectorAll('.tl-footer-icon[data-tl-mes-action="speak"].tl-active').forEach(i=>sr(i,!1)),rr=e,sr(t,!0);try{await rn(s,{lang:o.targetLang||"en"})}catch{}finally{rr===e&&(rr=null),sr(t,!1)}}}function Sa(e){e?.querySelectorAll(".tl-mes-btn").forEach(a=>a.remove());let t=J();if(!t.enabled||t.ui?.autoShowMesButtons===!1){e?.querySelector(".tl-mes-footer")?.remove();return}let n=e?.querySelector(".mes_text");if(!n||n.querySelector(".tl-mes-footer")||!n.textContent||!n.textContent.trim())return;let o=e.ownerDocument,r=o.createElement("div");r.className="tl-mes-footer tl-ignore";let s=o.createElement("button");s.type="button",s.className="tl-footer-icon",s.dataset.tlMesAction="translate",s.title="\u53CC\u8BED\u5BF9\u7167",s.innerHTML='<i class="fa-solid fa-language"></i>',s.addEventListener("click",a=>{a.stopPropagation(),df(e,s)});let i=o.createElement("button");i.type="button",i.className="tl-footer-icon",i.dataset.tlMesAction="speak",i.title="\u6717\u8BFB",sr(i,!1),i.addEventListener("click",a=>{a.stopPropagation(),Nm(e,i)}),r.appendChild(s),r.appendChild(i),n.appendChild(r)}async function hf(e){if(!e)return;let t=e.querySelector(".mes_text");if(!t||t.querySelector(".tl-trans-block")||e.dataset.tlAutoTranslating==="1")return;Sa(e);let n=e.querySelector('.tl-footer-icon[data-tl-mes-action="translate"]');e.dataset.tlAutoTranslating="1";try{await df(e,n||{classList:{add(){},toggle(){}},innerHTML:""})}finally{delete e.dataset.tlAutoTranslating}}var ir=null,Wn=null,an=!1,xa=[];function Sm(){return[...he().querySelectorAll("#chat .mes")]}function mf(e,t={}){if(!e)return;let n=e.querySelector(".mes_text");n&&(sf(n,t),Sa(e))}function Ta(e={}){let t=Sm();for(let n of t)mf(n,e)}function wa(){let e=he();e.querySelectorAll("#chat .mes .mes_text").forEach(t=>gs(t)),e.querySelectorAll("#chat .mes .tl-trans-block").forEach(t=>t.remove()),e.querySelectorAll("#chat .mes .tl-mes-btn").forEach(t=>t.remove()),e.querySelectorAll("#chat .mes .tl-mes-footer").forEach(t=>t.remove())}function xm(){let e=J();if(!e.enabled||!e.ui?.autoTranslateNewMessage)return;let n=[...he().querySelectorAll("#chat .mes")].filter(r=>r.getAttribute("is_user")!=="true"),o=n[n.length-1];o&&(mf(o),hf(o).catch(()=>{}))}function sn(e=280,t=!1){Wn&&clearTimeout(Wn),Wn=setTimeout(()=>{Wn=null,!an&&J().enabled&&(Ta(),t&&xm())},e)}function wn(e,t){let{eventOn:n,eventRemoveListener:o}=pa();if(!(!n||!e))try{let r=n(e,t);xa.push(()=>{try{r&&typeof r.stop=="function"?r.stop():typeof o=="function"&&o(e,t)}catch{}})}catch{}}function gf(){Oa();let t=he().getElementById("chat");t&&(ir=new MutationObserver(r=>{if(an||!J().enabled)return;r.some(i=>{let a=i.target;return!(a?.nodeType===1&&(a.classList?.contains("tl-word")||a.classList?.contains("tl-trans-block")||a.classList?.contains("tl-mes-btn")||a.classList?.contains("tl-mes-footer")||a.closest?.(".tl-popover, .tl-sel-bar, .tl-modal-backdrop, .tl-mes-footer, #tl-vue-root")))})&&sn(320)}),ir.observe(t,{childList:!0,subtree:!0}));let{tavern_events:n,iframe_events:o}=pa();n&&(wn(n.GENERATION_STARTED,()=>{an=!0}),wn(n.GENERATION_STOPPED,()=>{an=!1,sn(200)}),wn(n.GENERATION_ENDED,()=>{an=!1,sn(220,!0)}),wn(n.MESSAGE_RECEIVED,()=>{an=!1,sn(240,!0)}),wn(n.MESSAGE_UPDATED,()=>{sn(200)}),wn(n.MESSAGE_SWIPED,()=>{sn(260,!0)}),wn(n.CHAT_CHANGED,()=>{an=!1,sn(350)})),o&&wn(o.STREAM_TOKEN_RECEIVED_FULLY,()=>{an=!1,sn(260,!0)}),sn(150)}function Oa(){for(Wn&&(clearTimeout(Wn),Wn=null),ir&&(ir.disconnect(),ir=null);xa.length>0;)xa.pop()();an=!1}var vf=9,Tm=420,wm=260,Ca=0,Aa=0,Ss=0,ar=!1,Da=!1,Ef=0,xs=!1,Ts=null,ws=null,Os=null,So=null;function _f(){if(xs)return;let e=he(),t=Z();Ts=n=>{n.button&&n.button!==0||(Ca=n.clientX,Aa=n.clientY,Ss=Date.now(),ar=!1,Da=!1)},ws=n=>{if(ar)return;let o=n.clientX-Ca,r=n.clientY-Aa;Math.hypot(o,r)>vf&&(ar=!0)},Os=n=>{n.touches&&n.touches.length>1&&(Da=!0)},So=()=>{Ef=Date.now(),ar=!0},e.addEventListener("pointerdown",Ts,{passive:!0,capture:!0}),e.addEventListener("pointermove",ws,{passive:!0,capture:!0}),e.addEventListener("touchstart",Os,{passive:!0,capture:!0}),t.addEventListener("scroll",So,{passive:!0,capture:!0}),e.addEventListener("scroll",So,{passive:!0,capture:!0}),xs=!0}function yf(){if(!xs)return;let e=he(),t=Z();Ts&&e.removeEventListener("pointerdown",Ts,!0),ws&&e.removeEventListener("pointermove",ws,!0),Os&&e.removeEventListener("touchstart",Os,!0),So&&(t.removeEventListener("scroll",So,!0),e.removeEventListener("scroll",So,!0)),xs=!1}function bf(e){let t=Date.now();if(Da||ar||t-Ef<wm||Ss>0&&t-Ss>Tm)return!1;if(e&&typeof e.clientX=="number"&&Ss>0){let o=e.clientX-Ca,r=e.clientY-Aa;if(Math.hypot(o,r)>vf)return!1}let n=Z().getSelection();return!(n&&n.toString().trim().length>0)}var Ia="tl-injected-styles",Om=`
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
`;function ka(e=J()){let t=he().documentElement;t&&(t.setAttribute("data-tl-theme",e.theme||"tavern"),t.setAttribute("data-tl-underline",e.ui?.showWordUnderline===!1?"0":"1"))}function Nf(){let e=he(),t=e.getElementById(Ia);t||(t=e.createElement("style"),t.id=Ia,e.head.appendChild(t)),t.textContent=Om,ka()}function Sf(){let e=he(),t=e.getElementById(Ia);t&&t.remove(),e.documentElement.removeAttribute("data-tl-theme"),e.documentElement.removeAttribute("data-tl-underline")}var Yl={};hm(Yl,{BaseTransition:()=>Nl,BaseTransitionPropsValidators:()=>_i,Comment:()=>xe,DeprecationTypes:()=>yE,EffectScope:()=>Jn,ErrorCodes:()=>hg,ErrorTypeStrings:()=>dE,Fragment:()=>Re,KeepAlive:()=>ev,ReactiveEffect:()=>un,Static:()=>mn,Suspense:()=>Gv,Teleport:()=>Ig,Text:()=>Vn,TrackOpTypes:()=>hu,Transition:()=>xE,TransitionGroup:()=>YE,TriggerOpTypes:()=>mu,VueElement:()=>Ii,assertNumber:()=>dg,callWithAsyncErrorHandling:()=>bt,callWithErrorHandling:()=>io,camelize:()=>ce,capitalize:()=>Ot,cloneVNode:()=>Qt,compatUtils:()=>_E,computed:()=>Ue,createApp:()=>Hr,createBlock:()=>ci,createCommentVNode:()=>up,createElementBlock:()=>eE,createElementVNode:()=>Ml,createHydrationRenderer:()=>Vl,createPropsRestProxy:()=>Av,createRenderer:()=>kl,createSSRApp:()=>hd,createSlots:()=>hv,createStaticVNode:()=>rE,createTextVNode:()=>Pl,createVNode:()=>ye,customRef:()=>Ks,defineAsyncComponent:()=>Qg,defineComponent:()=>at,defineCustomElement:()=>nd,defineEmits:()=>_v,defineExpose:()=>yv,defineModel:()=>Sv,defineOptions:()=>bv,defineProps:()=>Ev,defineSSRCustomElement:()=>KE,defineSlots:()=>Nv,devtools:()=>hE,effect:()=>Jf,effectScope:()=>Wf,getCurrentInstance:()=>qe,getCurrentScope:()=>el,getCurrentWatcher:()=>gu,getTransitionRawChildren:()=>Vr,guardReactiveProps:()=>fp,h:()=>$l,handleError:()=>ao,hasInjectionContext:()=>Tg,hydrate:()=>d_,hydrateOnIdle:()=>Xg,hydrateOnInteraction:()=>Jg,hydrateOnMediaQuery:()=>qg,hydrateOnVisible:()=>Gg,initCustomFormatter:()=>Np,initDirectivesForSSR:()=>h_,inject:()=>Pu,isMemoSame:()=>Sp,isProxy:()=>Yn,isReactive:()=>vt,isReadonly:()=>tt,isRef:()=>Se,isRuntimeOnly:()=>vp,isShallow:()=>Fe,isVNode:()=>vn,markRaw:()=>js,mergeDefaults:()=>Ov,mergeModels:()=>Cv,mergeProps:()=>pp,nextTick:()=>kr,nodeOps:()=>zp,normalizeClass:()=>Gn,normalizeProps:()=>Mf,normalizeStyle:()=>zn,onActivated:()=>tv,onBeforeMount:()=>rv,onBeforeUnmount:()=>Tl,onBeforeUpdate:()=>xl,onDeactivated:()=>nv,onErrorCaptured:()=>lv,onMounted:()=>Mr,onRenderTracked:()=>av,onRenderTriggered:()=>iv,onScopeDispose:()=>Ao,onServerPrefetch:()=>sv,onUnmounted:()=>Pr,onUpdated:()=>yi,onWatcherCleanup:()=>rl,openBlock:()=>Ar,patchProp:()=>td,popScopeId:()=>bg,provide:()=>xg,proxyRefs:()=>_r,pushScopeId:()=>yg,queuePostFlushCb:()=>Yt,reactive:()=>Gt,readonly:()=>vr,ref:()=>_t,registerRuntimeCompiler:()=>Ll,render:()=>dd,renderList:()=>dv,renderSlot:()=>mv,resolveComponent:()=>fv,resolveDirective:()=>pv,resolveDynamicComponent:()=>uv,resolveFilter:()=>EE,resolveTransitionHooks:()=>oo,setBlockTracking:()=>Dr,setDevtoolsHook:()=>mE,setTransitionHooks:()=>kt,shallowReactive:()=>Bs,shallowReadonly:()=>iu,shallowRef:()=>Ws,ssrContextKey:()=>Lu,ssrUtils:()=>vE,stop:()=>Yf,toDisplayString:()=>Ua,toHandlerKey:()=>cn,toHandlers:()=>gv,toRaw:()=>Q,toRef:()=>uu,toRefs:()=>fu,toValue:()=>cu,transformVNodeArgs:()=>nE,triggerRef:()=>lu,unref:()=>Qn,useAttrs:()=>wv,useCssModule:()=>GE,useCssVars:()=>AE,useHost:()=>od,useId:()=>Vg,useModel:()=>Vv,useSSRContext:()=>$u,useShadowRoot:()=>zE,useSlots:()=>Tv,useTemplateRef:()=>Rg,useTransitionState:()=>Ei,vModelCheckbox:()=>ql,vModelDynamic:()=>ld,vModelRadio:()=>Jl,vModelSelect:()=>id,vModelText:()=>Vi,vShow:()=>Qp,version:()=>xp,warn:()=>Ti,watch:()=>Lo,watchEffect:()=>wg,watchPostEffect:()=>Og,watchSyncEffect:()=>Fu,withAsyncContext:()=>Dv,withCtx:()=>bl,withDefaults:()=>xv,withDirectives:()=>Sg,withKeys:()=>p_,withMemo:()=>pE,withModifiers:()=>f_,withScopeId:()=>Ng});function He(e){let t=Object.create(null);for(let n of e.split(","))t[n]=1;return n=>n in t}var te={},On=[],Ie=()=>{},Cn=()=>!1,Wt=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),xo=e=>e.startsWith("onUpdate:"),q=Object.assign,lr=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},Cm=Object.prototype.hasOwnProperty,le=(e,t)=>Cm.call(e,t),H=Array.isArray,ln=e=>Kn(e)==="[object Map]",wt=e=>Kn(e)==="[object Set]",xf=e=>Kn(e)==="[object Date]",Df=e=>Kn(e)==="[object RegExp]",ee=e=>typeof e=="function",z=e=>typeof e=="string",De=e=>typeof e=="symbol",ie=e=>e!==null&&typeof e=="object",Cs=e=>(ie(e)||ee(e))&&ee(e.then)&&ee(e.catch),If=Object.prototype.toString,Kn=e=>If.call(e),Ra=e=>Kn(e).slice(8,-1),To=e=>Kn(e)==="[object Object]",cr=e=>z(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Ft=He(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ma=He("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),Am=1e4,As=e=>{let t=Object.create(null),n=0;return(o=>{let r=t[o];return r!==void 0?r:(++n>Am&&(t=Object.create(null),n=1),t[o]=e(o))})},Dm=/-\w/g,ce=As(e=>e.replace(Dm,t=>t.slice(1).toUpperCase())),Im=/\B([A-Z])/g,ze=As(e=>e.replace(Im,"-$1").toLowerCase()),Ot=As(e=>e.charAt(0).toUpperCase()+e.slice(1)),cn=As(e=>e?`on${Ot(e)}`:""),ke=(e,t)=>!Object.is(e,t),An=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},Ds=(e,t,n,o=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:o,value:n})},Xn=e=>{let t=parseFloat(e);return isNaN(t)?e:t},wo=e=>{let t=z(e)?Number(e):NaN;return isNaN(t)?e:t},Tf,fr=()=>Tf||(Tf=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function kf(e,t){return e+JSON.stringify(t,(n,o)=>typeof o=="function"?o.toString():o)}var km="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol",Vf=He(km);var wf=2;function Rf(e,t=0,n=e.length){if(t=Math.max(0,Math.min(t,e.length)),n=Math.max(0,Math.min(n,e.length)),t>n)return"";let o=e.split(/(\r?\n)/),r=o.filter((a,l)=>l%2===1);o=o.filter((a,l)=>l%2===0);let s=0,i=[];for(let a=0;a<o.length;a++)if(s+=o[a].length+(r[a]&&r[a].length||0),s>=t){for(let l=a-wf;l<=a+wf||n>s;l++){if(l<0||l>=o.length)continue;let f=l+1;i.push(`${f}${" ".repeat(Math.max(3-String(f).length,0))}|  ${o[l]}`);let u=o[l].length,c=r[l]&&r[l].length||0;if(l===a){let p=t-(s-(u+c)),d=Math.max(1,n>s?u-p:n-t);i.push("   |  "+" ".repeat(p)+"^".repeat(d))}else if(l>a){if(n>s){let p=Math.max(Math.min(n-s,u),1);i.push("   |  "+"^".repeat(p))}s+=u+c}}break}return i.join(`
`)}function zn(e){if(H(e)){let t={};for(let n=0;n<e.length;n++){let o=e[n],r=z(o)?Pa(o):zn(o);if(r)for(let s in r)t[s]=r[s]}return t}else if(z(e)||ie(e))return e}var Vm=/;(?![^(]*\))/g,Rm=/:([^]+)/,Mm=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function Pa(e){let t={};return e.replace(Mm,n=>n.startsWith("/*")?"":n).split(Vm).forEach(n=>{if(n){let o=n.split(Rm);o.length>1&&(t[o[0].trim()]=o[1].trim())}}),t}function Gn(e){let t="";if(z(e))t=e;else if(H(e))for(let n=0;n<e.length;n++){let o=Gn(e[n]);o&&(t+=o+" ")}else if(ie(e))for(let n in e)e[n]&&(t+=n+" ");return t.trim()}function Mf(e){if(!e)return null;let{class:t,style:n}=e;return t&&!z(t)&&(e.class=Gn(t)),n&&(e.style=zn(n)),e}var Pm="html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot",Lm="svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view",$m="annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics",Fm="area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr",La=He(Pm),$a=He(Lm),Fa=He($m),Pf=He(Fm),Lf="itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly",$f=He(Lf),Um=He(Lf+",async,autofocus,autoplay,controls,default,defer,disabled,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");function Is(e){return!!e||e===""}function Bm(e,t,n){if(e.length!==t.length)return!1;let o=!0;for(let r=0;o&&r<e.length;r++)o=rt(e[r],t[r],n);return o}function Of(e,t,n){if(e.size!==t.size)return!1;let o=Array.from(t),r=new Uint8Array(o.length);for(let s of e){let i=-1;for(let a=0;a<o.length;a++)if(!r[a]&&rt(s,o[a],n)){i=a;break}if(i<0)return!1;r[i]=1}return!0}function Hm(e,t,n){let o=ln(e),r=ln(t);if(o||r||(o=wt(e),r=wt(t),o||r))return o&&r?Of(e,t,n):!1;let s=Object.keys(e).length,i=Object.keys(t).length;if(s!==i)return!1;for(let a in e){let l=le(e,a),f=le(t,a);if(l&&!f||!l&&f||!rt(e[a],t[a],n))return!1}return Af(e)===Af(t)}function Cf(e,t,n,o){n||(n=[new Map,new Map]);let[r,s]=n;if(r.has(e)||s.has(t))return r.get(e)===t&&s.get(t)===e;r.set(e,t),s.set(t,e);let i=o(e,t,n);return r.delete(e),s.delete(t),i}function rt(e,t,n){if(e===t)return!0;let o=xf(e),r=xf(t);return o||r?o&&r?e.getTime()===t.getTime():!1:(o=De(e),r=De(t),o||r?e===t:(o=H(e),r=H(t),o||r?o&&r?Cf(e,t,n,Bm):!1:(o=ie(e),r=ie(t),o||r?!o||!r?!1:Cf(e,t,n,Hm):String(e)===String(t))))}function ur(e,t){return e.findIndex(n=>rt(n,t))}function Af(e){return Object.getPrototypeOf(e)===null&&e[Symbol.toPrimitive]==null&&typeof e.toString!="function"&&typeof e.valueOf!="function"?Kn(e):String(e)}var Ff=e=>!!(e&&e.__v_isRef===!0),Ua=e=>z(e)?e:e==null?"":H(e)||ie(e)&&(e.toString===If||!ee(e.toString))?Ff(e)?Ua(e.value):JSON.stringify(e,Uf,2):String(e),Uf=(e,t)=>Ff(t)?Uf(e,t.value):ln(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[o,r],s)=>(n[Va(o,s)+" =>"]=r,n),{})}:wt(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>Va(n))}:De(t)?Va(t):ie(t)&&!H(t)&&!To(t)?String(t):t,Va=(e,t="")=>{var n;return De(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};function Ba(e){return e==null?"initial":typeof e=="string"?e===""?" ":e:(typeof e!="number"||Number.isFinite(e),String(e))}function jm(e,...t){console.warn(`[Vue warn] ${e}`,...t)}var Ve,Jn=class{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Ve&&(Ve.active?(this.parent=Ve,this.index=(Ve.scopes||(Ve.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes){let o=this.scopes.slice();for(t=0,n=o.length;t<n;t++)o[t].pause()}for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes){let r=this.scopes.slice();for(t=0,n=r.length;t<n;t++)r[t].resume()}let o=this.effects.slice();for(t=0,n=o.length;t<n;t++)o[t].resume()}}run(t){if(this._active){let n=Ve;try{return Ve=this,t()}finally{Ve=n}}}on(){++this._on===1&&(this.prevScope=Ve,Ve=this)}off(){if(this._on>0&&--this._on===0){if(Ve===this)Ve=this.prevScope;else{let t=Ve;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,o;for(n=0,o=this.effects.length;n<o;n++)this.effects[n].stop();for(this.effects.length=0,n=0,o=this.cleanups.length;n<o;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){let r=this.scopes.slice();for(n=0,o=r.length;n<o;n++)r[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){let r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}};function Wf(e){return new Jn(e)}function el(){return Ve}function Ao(e,t=!1){Ve&&(Ve.active?Ve.cleanups.push(e):e())}var Ee;var Ha=new WeakSet,un=class{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ve&&(Ve.active?Ve.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ha.has(this)&&(Ha.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Xf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Bf(this),zf(this);let t=Ee,n=Ut;Ee=this,Ut=!0;try{return this.fn()}finally{Gf(this),Ee=t,Ut=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)ol(t);this.deps=this.depsTail=void 0,Bf(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ha.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ka(this)&&this.run()}get dirty(){return Ka(this)}},Kf=0,dr,hr;function Xf(e,t=!1){if(e.flags|=8,t){e.next=hr,hr=e;return}e.next=dr,dr=e}function tl(){Kf++}function nl(){if(--Kf>0)return;if(hr){let t=hr;for(hr=void 0;t;){let n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;dr;){let t=dr;for(dr=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(o){e||(e=o)}t=n}}if(e)throw e}function zf(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Gf(e){let t,n=e.depsTail,o=n;for(;o;){let r=o.prevDep;o.version===-1?(o===n&&(n=r),ol(o),Wm(o)):t=o,o.dep.activeLink=o.prevActiveLink,o.prevActiveLink=void 0,o=r}e.deps=t,e.depsTail=n}function Ka(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(qf(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function qf(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===mr)||(e.globalVersion=mr,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Ka(e))))return;e.flags|=2;let t=e.dep,n=Ee,o=Ut;Ee=e,Ut=!0;try{zf(e);let r=e.fn(e._value);(t.version===0||ke(r,e._value))&&(e.flags|=128,e._value=r,t.version++)}catch(r){throw t.version++,r}finally{Ee=n,Ut=o,Gf(e),e.flags&=-3}}function ol(e,t=!1){let{dep:n,prevSub:o,nextSub:r}=e;if(o&&(o.nextSub=r,e.prevSub=void 0),r&&(r.prevSub=o,e.nextSub=void 0),n.subs===e&&(n.subs=o,!o&&n.computed)){n.computed.flags&=-5;for(let s=n.computed.deps;s;s=s.nextDep)ol(s,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Wm(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}function Jf(e,t){e.effect instanceof un&&(e=e.effect.fn);let n=new un(e);t&&q(n,t);try{n.run()}catch(r){throw n.stop(),r}let o=n.run.bind(n);return o.effect=n,o}function Yf(e){e.effect.stop()}var Ut=!0,Qf=[];function Ct(){Qf.push(Ut),Ut=!1}function At(){let e=Qf.pop();Ut=e===void 0?!0:e}function Bf(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let n=Ee;Ee=void 0;try{t()}finally{Ee=n}}}var mr=0,Xa=class{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},Co=class{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!Ee||!Ut||Ee===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Ee)n=this.activeLink=new Xa(Ee,this),Ee.deps?(n.prevDep=Ee.depsTail,Ee.depsTail.nextDep=n,Ee.depsTail=n):Ee.deps=Ee.depsTail=n,Zf(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){let o=n.nextDep;o.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=o),n.prevDep=Ee.depsTail,n.nextDep=void 0,Ee.depsTail.nextDep=n,Ee.depsTail=n,Ee.deps===n&&(Ee.deps=o)}return n}trigger(t){this.version++,mr++,this.notify(t)}notify(t){tl();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{nl()}}};function Zf(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let o=t.deps;o;o=o.nextDep)Zf(o)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Ms=new WeakMap,qn=Symbol(""),za=Symbol(""),gr=Symbol("");function je(e,t,n){if(Ut&&Ee){let o=Ms.get(e);o||Ms.set(e,o=new Map);let r=o.get(n);r||(o.set(n,r=new Co),r.map=o,r.key=n),r.track()}}function Xt(e,t,n,o,r,s){let i=Ms.get(e);if(!i){mr++;return}let a=l=>{l&&l.trigger()};if(tl(),t==="clear")i.forEach(a);else{let l=H(e),f=l&&cr(n);if(l&&n==="length"){let u=Number(o);i.forEach((c,p)=>{(p==="length"||p===gr||!De(p)&&p>=u)&&a(c)})}else switch((n!==void 0||i.has(void 0))&&a(i.get(n)),f&&a(i.get(gr)),t){case"add":l?f&&a(i.get("length")):(a(i.get(qn)),ln(e)&&a(i.get(za)));break;case"delete":l||(a(i.get(qn)),ln(e)&&a(i.get(za)));break;case"set":ln(e)&&a(i.get(qn));break}}nl()}function Km(e,t){let n=Ms.get(e);return n&&n.get(t)}function Oo(e){let t=Q(e);return t===e||(je(t,"iterate",gr),Fe(e))?t:tt(e)?vt(e)?t.map(n=>pn(Et(n))):t.map(pn):t.map(Et)}function Er(e){return je(e=Q(e),"iterate",gr),e}function Kt(e,t){return tt(e)?pn(vt(e)?Et(t):t):Et(t)}var Xm={__proto__:null,[Symbol.iterator](){return ja(this,Symbol.iterator,e=>Kt(this,e))},concat(...e){return Oo(this).concat(...e.map(t=>H(t)?Oo(t):t))},entries(){return ja(this,"entries",e=>(e[1]=Kt(this,e[1]),e))},every(e,t){return fn(this,"every",e,t,void 0,arguments)},filter(e,t){return fn(this,"filter",e,t,n=>n.map(o=>Kt(this,o)),arguments)},find(e,t){return fn(this,"find",e,t,n=>Kt(this,n),arguments)},findIndex(e,t){return fn(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return fn(this,"findLast",e,t,n=>Kt(this,n),arguments)},findLastIndex(e,t){return fn(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return fn(this,"forEach",e,t,void 0,arguments)},includes(...e){return Wa(this,"includes",e)},indexOf(...e){return Wa(this,"indexOf",e)},join(e){return Oo(this).join(e)},lastIndexOf(...e){return Wa(this,"lastIndexOf",e)},map(e,t){return fn(this,"map",e,t,void 0,arguments)},pop(){return pr(this,"pop")},push(...e){return pr(this,"push",e)},reduce(e,...t){return jf(this,"reduce",e,t)},reduceRight(e,...t){return jf(this,"reduceRight",e,t)},shift(){return pr(this,"shift")},some(e,t){return fn(this,"some",e,t,void 0,arguments)},splice(...e){return pr(this,"splice",e)},toReversed(){return Oo(this).toReversed()},toSorted(e){return Oo(this).toSorted(e)},toSpliced(...e){return Oo(this).toSpliced(...e)},unshift(...e){return pr(this,"unshift",e)},values(){return ja(this,"values",e=>Kt(this,e))}};function ja(e,t,n){let o=Er(e),r=o[t],s=r.call(o);if(o!==e&&!Fe(e)){if(s[Symbol.toStringTag]==="Array Iterator"){let i=Object.create(Object.getPrototypeOf(s));return i.next=()=>Hf(s.next(),n),r!==eu[t]&&Object.defineProperties(i,{return:{get(){let a=s.return;return typeof a=="function"?a.bind(s):a}},throw:{get(){let a=s.throw;return typeof a=="function"?a.bind(s):a}}}),i}s._next=s.next,s.next=()=>Hf(s._next(),n)}return s}function Hf(e,t){return e.done||(e.value=t(e.value)),e}var eu=Array.prototype;function fn(e,t,n,o,r,s){let i=Er(e),a=i!==e&&!Fe(e),l=i[t];if(l!==eu[t]){let c=l.apply(e,s);return a?Et(c):c}let f=n;i!==e&&(a?f=function(c,p){return n.call(this,Kt(e,c),p,e)}:n.length>2&&(f=function(c,p){return n.call(this,c,p,e)}));let u=l.call(i,f,o);return a&&r?r(u):u}function jf(e,t,n,o){let r=Er(e),s=r!==e&&!Fe(e),i=n,a=!1;r!==e&&(s?(a=o.length===0,i=function(f,u,c){return a&&(a=!1,f=Kt(e,f)),n.call(this,f,Kt(e,u),c,e)}):n.length>3&&(i=function(f,u,c){return n.call(this,f,u,c,e)}));let l=r[t](i,...o);return a?Kt(e,l):l}function Wa(e,t,n){let o=Q(e);je(o,"iterate",gr);let r=o[t](...n);return(r===-1||r===!1)&&Yn(n[0])?(n[0]=Q(n[0]),o[t](...n)):r}function pr(e,t,n=[]){Ct(),tl();let o=Q(e)[t].apply(e,n);return nl(),At(),o}var zm=He("__proto__,__v_isRef,__isVue"),tu=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(De));function Gm(e){De(e)||(e=String(e));let t=Q(this);return je(t,"has",e),t.hasOwnProperty(e)}var Ps=class{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,o){if(n==="__v_skip")return t.__v_skip;let r=this._isReadonly,s=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return s;if(n==="__v_raw")return o===(r?s?su:ru:s?ou:nu).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(o)?t:void 0;let i=H(t);if(!r){let l;if(i&&(l=Xm[n]))return l;if(n==="hasOwnProperty")return Gm}let a=Reflect.get(t,n,Se(t)?t:o);if((De(n)?tu.has(n):zm(n))||(r||je(t,"get",n),s))return a;if(Se(a)){let l=i&&cr(n)?a:a.value;return r&&ie(l)?vr(l):l}return ie(a)?r?vr(a):Gt(a):a}},Ls=class extends Ps{constructor(t=!1){super(!1,t)}set(t,n,o,r){let s=t[n],i=H(t)&&cr(n);if(!this._isShallow){let f=tt(s);if(!Fe(o)&&!tt(o)&&(s=Q(s),o=Q(o)),!i&&Se(s)&&!Se(o))return f||(s.value=o),!0}let a=i?Number(n)<t.length:le(t,n),l=Reflect.set(t,n,o,Se(t)?t:r);return t===Q(r)&&l&&(a?ke(o,s)&&Xt(t,"set",n,o,s):Xt(t,"add",n,o)),l}deleteProperty(t,n){let o=le(t,n),r=t[n],s=Reflect.deleteProperty(t,n);return s&&o&&Xt(t,"delete",n,void 0,r),s}has(t,n){let o=Reflect.has(t,n);return(!De(n)||!tu.has(n))&&je(t,"has",n),o}ownKeys(t){return je(t,"iterate",H(t)?"length":qn),Reflect.ownKeys(t)}},$s=class extends Ps{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}},qm=new Ls,Jm=new $s,Ym=new Ls(!0),Qm=new $s(!0),Ga=e=>e,ks=e=>Reflect.getPrototypeOf(e);function Zm(e,t,n){return function(...o){let r=this.__v_raw,s=Q(r),i=ln(s),a=e==="entries"||e===Symbol.iterator&&i,l=e==="keys"&&i,f=r[e](...o),u=n?Ga:t?pn:Et;return!t&&je(s,"iterate",l?za:qn),q(Object.create(f),{next(){let{value:c,done:p}=f.next();return p?{value:c,done:p}:{value:a?[u(c[0]),u(c[1])]:u(c),done:p}}})}}function Vs(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function eg(e,t){let n={get(r){let s=this.__v_raw,i=Q(s),a=Q(r);e||(ke(r,a)&&je(i,"get",r),je(i,"get",a));let{has:l}=ks(i),f=t?Ga:e?pn:Et;if(l.call(i,r))return f(s.get(r));if(l.call(i,a))return f(s.get(a));s!==i&&s.get(r)},get size(){let r=this.__v_raw;return!e&&je(Q(r),"iterate",qn),r.size},has(r){let s=this.__v_raw,i=Q(s),a=Q(r);return e||(ke(r,a)&&je(i,"has",r),je(i,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){let i=this,a=i.__v_raw,l=Q(a),f=t?Ga:e?pn:Et;return!e&&je(l,"iterate",qn),a.forEach((u,c)=>r.call(s,f(u),f(c),i))}};return q(n,e?{add:Vs("add"),set:Vs("set"),delete:Vs("delete"),clear:Vs("clear")}:{add(r){let s=Q(this),i=ks(s),a=Q(r),l=!t&&!Fe(r)&&!tt(r)?a:r;return i.has.call(s,l)||ke(r,l)&&i.has.call(s,r)||ke(a,l)&&i.has.call(s,a)||(s.add(l),Xt(s,"add",l,l)),this},set(r,s){!t&&!Fe(s)&&!tt(s)&&(s=Q(s));let i=Q(this),{has:a,get:l}=ks(i),f=a.call(i,r);f||(r=Q(r),f=a.call(i,r));let u=l.call(i,r);return i.set(r,s),f?ke(s,u)&&Xt(i,"set",r,s,u):Xt(i,"add",r,s),this},delete(r){let s=Q(this),{has:i,get:a}=ks(s),l=i.call(s,r);l||(r=Q(r),l=i.call(s,r));let f=a?a.call(s,r):void 0,u=s.delete(r);return l&&Xt(s,"delete",r,void 0,f),u},clear(){let r=Q(this),s=r.size!==0,i=void 0,a=r.clear();return s&&Xt(r,"clear",void 0,void 0,i),a}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=Zm(r,e,t)}),n}function Us(e,t){let n=eg(e,t);return(o,r,s)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_isShallow"?t:r==="__v_raw"?o:Reflect.get(le(n,r)&&r in o?n:o,r,s)}var tg={get:Us(!1,!1)},ng={get:Us(!1,!0)},og={get:Us(!0,!1)},rg={get:Us(!0,!0)};var nu=new WeakMap,ou=new WeakMap,ru=new WeakMap,su=new WeakMap;function sg(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Gt(e){return tt(e)?e:Hs(e,!1,qm,tg,nu)}function Bs(e){return Hs(e,!1,Ym,ng,ou)}function vr(e){return Hs(e,!0,Jm,og,ru)}function iu(e){return Hs(e,!0,Qm,rg,su)}function Hs(e,t,n,o,r){if(!ie(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let s=r.get(e);if(s)return s;let i=sg(Ra(e));if(i===0)return e;let a=new Proxy(e,i===2?o:n);return r.set(e,a),a}function vt(e){return tt(e)?vt(e.__v_raw):!!(e&&e.__v_isReactive)}function tt(e){return!!(e&&e.__v_isReadonly)}function Fe(e){return!!(e&&e.__v_isShallow)}function Yn(e){return e?!!e.__v_raw:!1}function Q(e){let t=e&&e.__v_raw;return t?Q(t):e}function js(e){return!le(e,"__v_skip")&&Object.isExtensible(e)&&Ds(e,"__v_skip",!0),e}var Et=e=>ie(e)?Gt(e):e,pn=e=>ie(e)?vr(e):e;function Se(e){return e?e.__v_isRef===!0:!1}function _t(e){return au(e,!1)}function Ws(e){return au(e,!0)}function au(e,t){return Se(e)?e:new qa(e,t)}var qa=class{constructor(t,n){this.dep=new Co,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:Q(t),this._value=n?t:Et(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){let n=this._rawValue,o=this.__v_isShallow||Fe(t)||tt(t);t=o?t:Q(t),ke(t,n)&&(this._rawValue=t,this._value=o?t:Et(t),this.dep.trigger())}};function lu(e){e.dep&&e.dep.trigger()}function Qn(e){return Se(e)?e.value:e}function cu(e){return ee(e)?e():Qn(e)}var ig={get:(e,t,n)=>t==="__v_raw"?e:Qn(Reflect.get(e,t,n)),set:(e,t,n,o)=>{let r=e[t];return Se(r)&&!Se(n)?(r.value=n,!0):Reflect.set(e,t,n,o)}};function _r(e){return vt(e)?e:new Proxy(e,ig)}var Ja=class{constructor(t){this.__v_isRef=!0,this._value=void 0;let n=this.dep=new Co,{get:o,set:r}=t(n.track.bind(n),n.trigger.bind(n));this._get=o,this._set=r}get value(){return this._value=this._get()}set value(t){this._set(t)}};function Ks(e){return new Ja(e)}function fu(e){let t=H(e)?new Array(e.length):{};for(let n in e)t[n]=pu(e,n);return t}var Ya=class{constructor(t,n,o){this._object=t,this._defaultValue=o,this.__v_isRef=!0,this._value=void 0,this._key=De(n)?n:String(n),this._raw=Q(t);let r=!0,s=t;if(!H(t)||De(this._key)||!cr(this._key))do r=!Yn(s)||Fe(s);while(r&&(s=s.__v_raw));this._shallow=r}get value(){let t=this._object[this._key];return this._shallow&&(t=Qn(t)),this._value=t===void 0?this._defaultValue:t}set value(t){if(this._shallow&&Se(this._raw[this._key])){let n=this._object[this._key];if(Se(n)){n.value=t;return}}this._object[this._key]=t}get dep(){return Km(this._raw,this._key)}},Qa=class{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}};function uu(e,t,n){return Se(e)?e:ee(e)?new Qa(e):ie(e)&&arguments.length>1?pu(e,t,n):_t(e)}function pu(e,t,n){return new Ya(e,t,n)}var Za=class{constructor(t,n,o){this.fn=t,this.setter=n,this._value=void 0,this.dep=new Co(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=mr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=o}notify(){if(this.flags|=16,!(this.flags&8)&&Ee!==this)return Xf(this,!0),!0}get value(){let t=this.dep.track();return qf(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}};function du(e,t,n=!1){let o,r;return ee(e)?o=e:(o=e.get,r=e.set),new Za(o,r,n)}var hu={GET:"get",HAS:"has",ITERATE:"iterate"},mu={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"};var Rs={},Fs=new WeakMap,Dn;function gu(){return Dn}function rl(e,t=!1,n=Dn){if(n){let o=Fs.get(n);o||Fs.set(n,o=[]),o.push(e)}}function vu(e,t,n=te){let{immediate:o,deep:r,once:s,scheduler:i,augmentJob:a,call:l}=n,f=g=>{(n.onWarn||jm)("Invalid watch source: ",g,"A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.")},u=g=>r?g:Fe(g)||r===!1||r===0?zt(g,1):zt(g),c,p,d,E,m=!1,N=!1;if(Se(e)?(p=()=>e.value,m=Fe(e)):vt(e)?(p=()=>u(e),m=!0):H(e)?(N=!0,m=e.some(g=>vt(g)||Fe(g)),p=()=>e.map(g=>{if(Se(g))return g.value;if(vt(g))return u(g);if(ee(g))return l?l(g,2):g()})):ee(e)?t?p=l?()=>l(e,2):e:p=()=>{if(d){Ct();try{d()}finally{At()}}let g=Dn;Dn=c;try{return l?l(e,3,[E]):e(E)}finally{Dn=g}}:p=Ie,t&&r){let g=p,x=r===!0?1/0:r;p=()=>zt(g(),x)}let O=el(),b=()=>{c.stop(),O&&O.active&&lr(O.effects,c)};if(s&&t){let g=t;t=(...x)=>{try{return g(...x)}finally{b()}}}let v=N?new Array(e.length).fill(Rs):Rs,y=g=>{if(!(!(c.flags&1)||!c.dirty&&!g))if(t){let x=c.run();if(g||r||m||(N?x.some((C,S)=>ke(C,v[S])):ke(x,v))){let C=Dn;Ct();try{d&&d(),Dn=c;let S=[x,v===Rs?void 0:N&&v[0]===Rs?[]:v,E];v=x,l?l(t,3,S):t(...S)}finally{Dn=C,At()}}}else c.run()};return a&&a(y),c=new un(p),c.scheduler=i?()=>i(y,!1):y,E=g=>rl(g,!1,c),d=c.onStop=()=>{let g=Fs.get(c);if(g){if(l)l(g,4);else for(let x of g)x();Fs.delete(c)}},t?o?y(!0):v=c.run():i?i(y.bind(null,!0),!0):c.run(),b.pause=c.pause.bind(c),b.resume=c.resume.bind(c),b.stop=b,b}function zt(e,t=1/0,n){if(t<=0||!ie(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,Se(e))zt(e.value,t,n);else if(H(e))for(let o=0;o<e.length;o++)zt(e[o],t,n);else if(wt(e)||ln(e))e.forEach(o=>{zt(o,t,n)});else if(To(e)){for(let o in e)zt(e[o],t,n);for(let o of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,o)&&zt(e[o],t,n)}return e}var to=[];function ag(e){to.push(e)}function lg(){to.pop()}var sl=!1;function Eu(e,...t){if(sl)return;sl=!0,Ct();let n=to.length?to[to.length-1].component:null,o=n&&n.appContext.config.warnHandler,r=cg();if(o)io(o,n,11,[e+t.map(s=>{var i,a;return(a=(i=s.toString)==null?void 0:i.call(s))!=null?a:JSON.stringify(s)}).join(""),n&&n.proxy,r.map(({vnode:s})=>`at <${bp(n,s.type)}>`).join(`
`),r]);else{let s=[`[Vue warn]: ${e}`,...t];r.length&&s.push(`
`,...fg(r)),console.warn(...s)}At(),sl=!1}function cg(){let e=to[to.length-1];if(!e)return[];let t=[];for(;e;){let n=t[0];n&&n.vnode===e?n.recurseCount++:t.push({vnode:e,recurseCount:0});let o=e.component&&e.component.parent;e=o&&o.vnode}return t}function fg(e){let t=[];return e.forEach((n,o)=>{t.push(...o===0?[]:[`
`],...ug(n))}),t}function ug({vnode:e,recurseCount:t}){let n=t>0?`... (${t} recursive calls)`:"",o=e.component?e.component.parent==null:!1,r=` at <${bp(e.component,e.type,o)}`,s=">"+n;return e.props?[r,...pg(e.props),s]:[r+s]}function pg(e){let t=[],n=Object.keys(e);return n.slice(0,3).forEach(o=>{t.push(...Du(o,e[o]))}),n.length>3&&t.push(" ..."),t}function Du(e,t,n){return z(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):typeof t=="number"||typeof t=="boolean"||t==null?n?t:[`${e}=${t}`]:Se(t)?(t=Du(e,Q(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):ee(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=Q(t),n?t:[`${e}=`,t])}function dg(e,t){}var hg={SETUP_FUNCTION:0,0:"SETUP_FUNCTION",RENDER_FUNCTION:1,1:"RENDER_FUNCTION",NATIVE_EVENT_HANDLER:5,5:"NATIVE_EVENT_HANDLER",COMPONENT_EVENT_HANDLER:6,6:"COMPONENT_EVENT_HANDLER",VNODE_HOOK:7,7:"VNODE_HOOK",DIRECTIVE_HOOK:8,8:"DIRECTIVE_HOOK",TRANSITION_HOOK:9,9:"TRANSITION_HOOK",APP_ERROR_HANDLER:10,10:"APP_ERROR_HANDLER",APP_WARN_HANDLER:11,11:"APP_WARN_HANDLER",FUNCTION_REF:12,12:"FUNCTION_REF",ASYNC_COMPONENT_LOADER:13,13:"ASYNC_COMPONENT_LOADER",SCHEDULER:14,14:"SCHEDULER",COMPONENT_UPDATE:15,15:"COMPONENT_UPDATE",APP_UNMOUNT_CLEANUP:16,16:"APP_UNMOUNT_CLEANUP"},mg={sp:"serverPrefetch hook",bc:"beforeCreate hook",c:"created hook",bm:"beforeMount hook",m:"mounted hook",bu:"beforeUpdate hook",u:"updated",bum:"beforeUnmount hook",um:"unmounted hook",a:"activated hook",da:"deactivated hook",ec:"errorCaptured hook",rtc:"renderTracked hook",rtg:"renderTriggered hook",0:"setup function",1:"render function",2:"watcher getter",3:"watcher callback",4:"watcher cleanup function",5:"native event handler",6:"component event handler",7:"vnode hook",8:"directive hook",9:"transition hook",10:"app errorHandler",11:"app warnHandler",12:"ref function",13:"async component loader",14:"scheduler flush",15:"component update",16:"app unmount cleanup function"};function io(e,t,n,o){try{return o?e(...o):e()}catch(r){ao(r,t,n)}}function bt(e,t,n,o){if(ee(e)){let r=io(e,t,n,o);return r&&Cs(r)&&r.catch(s=>{ao(s,t,n,void 0,!0)}),r}if(H(e)){let r=[];for(let s=0;s<e.length;s++)r.push(bt(e[s],t,n,o));return r}}function ao(e,t,n,o=!0,r=!1){let s=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:a}=t&&t.appContext.config||te;if(t){let l=t.parent,f=t.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){let c=l.ec;if(c&&!l.isUnmounted&&(!r||l.scope.active)){for(let p=0;p<c.length;p++)if(c[p](e,f,u)===!1)return}l=l.parent}if(i){Ct(),io(i,null,10,[e,f,u]),At();return}}gg(e,n,s,o,a)}function gg(e,t,n,o=!0,r=!1){if(r)throw e;console.error(e)}var nt=[],Bt=-1,Jt=[],kn=null,Io=0,Iu=Promise.resolve(),ti=null;function kr(e){let t=ti||Iu;return e?t.then(this?e.bind(this):e):t}function vg(e){let t=Bt+1,n=nt.length;for(;t<n;){let o=t+n>>>1,r=nt[o],s=xr(r);s<e||s===e&&r.flags&2?t=o+1:n=o}return t}function hi(e){if(!(e.flags&1)){let t=xr(e),n=nt[nt.length-1];!n||!(e.flags&2)&&t>=xr(n)?nt.push(e):nt.splice(vg(t),0,e),e.flags|=1,ku()}}function ku(){ti||(ti=Iu.then(Ru))}function Yt(e){if(!H(e))kn&&e.id===-1?kn.splice(Io+1,0,e):e.flags&1||(Jt.push(e),e.flags|=1);else for(let t=0;t<e.length;t++)Jt.push(e[t]);ku()}function Vu(e,t,n,o=Bt+1){for(;o<nt.length;o++){let r=nt[o];if(r&&r.flags&2){if(e&&r.id!==e.uid||t!==void 0&&!(r.id>=t))continue;nt.splice(o,1),o=e?o-1:Bt,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function ni(e,t,n=0){if(Jt.length){let o=Jt,r=0;if(t){o=[];for(let i=0;i<Jt.length;i++){let a=Jt[i];(a.i!==void 0?!a.i||a.i.uid<n:t.has(a))?Jt[r++]=a:o.push(a)}}let s=[...new Set(o)].sort((i,a)=>xr(i)-xr(a));if(Jt.length=r,kn){for(let i=0;i<s.length;i++)kn.push(s[i]);return}for(kn=s,Io=0;Io<kn.length;Io++){let i=kn[Io];i.flags&4&&(i.flags&=-2),i.flags&8||i(),i.flags&=-2}kn=null,Io=0}}var il=!1;function Eg(e,t){if(il){e();return}let n=t===void 0?void 0:new Set(Jt);e(),il=!0;try{Vu(void 0,t),ni(void 0,n,t)}finally{il=!1}}var xr=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Ru(e){let t=Ie;try{for(Bt=0;Bt<nt.length;Bt++){let n=nt[Bt];n&&!(n.flags&8)&&(n.flags&4&&(n.flags&=-2),io(n,n.i,n.i?15:14),n.flags&4||(n.flags&=-2))}}finally{for(;Bt<nt.length;Bt++){let n=nt[Bt];n&&(n.flags&=-2)}Bt=-1,nt.length=0,ni(e),ti=null,(nt.length||Jt.length)&&Ru(e)}}var _g=!1;var ko,Xs=[],_u=!1;function Mu(e,t){var n,o;ko=e,ko?(ko.enabled=!0,Xs.forEach(({event:r,args:s})=>ko.emit(r,...s)),Xs=[]):typeof window<"u"&&window.HTMLElement&&!((o=(n=window.navigator)==null?void 0:n.userAgent)!=null&&o.includes("jsdom"))?((t.__VUE_DEVTOOLS_HOOK_REPLAY__=t.__VUE_DEVTOOLS_HOOK_REPLAY__||[]).push(s=>{Mu(s,t)}),setTimeout(()=>{ko||(t.__VUE_DEVTOOLS_HOOK_REPLAY__=null,_u=!0,Xs=[])},3e3)):(_u=!0,Xs=[])}var Ke=null,mi=null;function Tr(e){let t=Ke;return Ke=e,mi=e&&e.type.__scopeId||null,t}function yg(e){mi=e}function bg(){mi=null}var Ng=e=>bl;function bl(e,t=Ke,n){if(!t||e._n)return e;let o=(...r)=>{o._d&&Dr(-1);let s=Tr(t),i=gn.length,a;try{a=e(...r)}finally{for(let l=gn.length;l>i;l--)Si();Tr(s),o._d&&Dr(1)}return a};return o._n=!0,o._c=!0,o._d=!0,o}function Sg(e,t){if(Ke===null)return e;let n=Lr(Ke),o=e.dirs||(e.dirs=[]);for(let r=0;r<t.length;r++){let[s,i,a,l=te]=t[r];s&&(ee(s)&&(s={mounted:s,updated:s}),s.deep&&zt(i),o.push({dir:s,instance:n,value:i,oldValue:void 0,arg:a,modifiers:l}))}return e}function qt(e,t,n,o){let r=e;if(o==="beforeMount")e._mount=e;else if(o==="beforeUpdate"){let a=t&&t._mount;a&&(a._latest=e,e._mount=a)}else if(o==="mounted"){let a=e._latest;e._mount=e._latest=void 0,a&&(r=a,a._mount=void 0)}let s=r.dirs,i=t&&t.dirs;for(let a=0;a<s.length;a++){let l=s[a];i?l.oldValue=i[a].value:o==="mounted"&&l.oldValue!==void 0&&(l=q({},l,{oldValue:void 0}));let f=l.dir[o];f&&(Ct(),bt(f,n,8,[e.el,l,r,t]),At())}}function xg(e,t){if(We){let n=We.provides,o=We.parent&&We.parent.provides;o===n&&(n=We.provides=Object.create(o)),n[e]=t}}function Pu(e,t,n=!1){let o=qe();if(o||no){let r=no?no._context.provides:o?o.parent==null||o.ce?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides:void 0;if(r&&e in r)return r[e];if(arguments.length>1)return n&&ee(t)?t.call(o&&o.proxy):t}}function Tg(){return!!(qe()||no)}var Lu=Symbol.for("v-scx"),$u=()=>{{let e=Pu(Lu);return e}};function wg(e,t){return gi(e,null,t)}function Og(e,t){return gi(e,null,{flush:"post"})}function Fu(e,t){return gi(e,null,{flush:"sync"})}function Lo(e,t,n){return gi(e,t,n)}function gi(e,t,n=te){let{immediate:o,deep:r,flush:s,once:i}=n,a=q({},n),l=t&&o||!t&&s!=="post",f;if(so){if(s==="sync"){let d=$u();f=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){let d=()=>{};return d.stop=Ie,d.resume=Ie,d.pause=Ie,d}}let u=We;a.call=(d,E,m)=>bt(d,u,E,m);let c=!1;s==="post"?a.scheduler=d=>{d.i=u,we(d,u&&u.suspense)}:s!=="sync"&&(c=!0,a.scheduler=(d,E)=>{E?d():hi(d)}),a.augmentJob=d=>{t&&(d.flags|=4),c&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};let p=vu(e,t,a);return so&&(f?f.push(p):l&&p()),p}var In=new WeakMap,Uu=Symbol("_vte"),vi=e=>e.__isTeleport,eo=e=>e&&(e.disabled||e.disabled===""),Cg=e=>e&&(e.defer||e.defer===""),yu=e=>typeof SVGElement<"u"&&e instanceof SVGElement,bu=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,fl=(e,t)=>{let n=e&&e.to;return z(n)?t?t(n):null:n},Ag={name:"Teleport",__isTeleport:!0,process(e,t,n,o,r,s,i,a,l,f){let{mc:u,pc:c,pbc:p,o:{insert:d,querySelector:E,createText:m,createComment:N,parentNode:O}}=f,b=eo(t.props),{dynamicChildren:v}=t,y=(C,S,T)=>{C.shapeFlag&16&&u(C.children,S,T,r,s,i,a,l)},g=(C=t)=>{let S=eo(C.props),T=C.target=fl(C.props,E),I=ul(T,C,m,d);T&&(i!=="svg"&&yu(T)?i="svg":i!=="mathml"&&bu(T)&&(i="mathml"),r&&r.isCE&&(r.ce._teleportTargets||(r.ce._teleportTargets=new Set)).add(T),S||(y(C,T,I),br(C,!1)))},x=C=>{let S=()=>{if(In.get(C)===S){if(In.delete(C),eo(C.props)){let T=O(C.el)||n;y(C,T,C.anchor),br(C,!0)}g(C)}};In.set(C,S),we(S,s)};if(e==null){let C=t.el=m(""),S=t.anchor=m("");if(d(C,n,o),d(S,n,o),Cg(t.props)||s&&s.pendingBranch){x(t);return}b&&(y(t,n,S),br(t,!0)),g()}else{t.el=e.el;let C=t.anchor=e.anchor,S=In.get(e);if(S){S.flags|=8,In.delete(e),x(t);return}t.targetStart=e.targetStart;let T=t.target=e.target,I=t.targetAnchor=e.targetAnchor,M=eo(e.props),A=M?n:T,$=M?C:I;if(i==="svg"||yu(T)?i="svg":(i==="mathml"||bu(T))&&(i="mathml"),v?(p(e.dynamicChildren,v,A,r,s,i,a),Rl(e,t,!0)):l||c(e,t,A,$,r,s,i,a,!1),b)M?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):zs(t,n,C,f,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){let P=fl(t.props,E);P&&(t.target=P,zs(t,P,null,f,0))}else M&&zs(t,T,I,f,1);br(t,b)}},remove(e,t,n,{um:o,o:{remove:r}},s){let{shapeFlag:i,children:a,anchor:l,targetStart:f,targetAnchor:u,target:c,props:p}=e,d=eo(p),E=s||!d,m=In.get(e);if(m&&(m.flags|=8,In.delete(e)),c&&(r(f),r(u)),s&&r(l),!m&&(d||c)&&i&16)for(let N=0;N<a.length;N++){let O=a[N];o(O,t,n,E,!!O.dynamicChildren)}},move:zs,hydrate:Dg};function zs(e,t,n,{o:{insert:o},m:r},s=2){s===0&&(e.targetStart&&o(e.targetStart,t,n),o(e.targetAnchor,t,n),n=e.targetAnchor);let{el:i,anchor:a,shapeFlag:l,children:f,props:u}=e,c=s===2;if(c&&o(i,t,n),!In.has(e)&&(!c||eo(u))&&l&16)for(let p=0;p<f.length;p++)r(f[p],t,n,2);c&&o(a,t,n)}function Dg(e,t,n,o,r,s,{o:{nextSibling:i,parentNode:a,querySelector:l,insert:f,createText:u}},c){function p(N,O){let b=O;for(;b;){if(b&&b.nodeType===8){if(b.data==="teleport start anchor")t.targetStart=b;else if(b.data==="teleport anchor"){t.targetAnchor=b,N._lpa=t.targetAnchor&&i(t.targetAnchor);break}}b=i(b)}}function d(N,O){O.anchor=c(i(N),O,a(N),n,o,r,s)}let E=t.target=fl(t.props,l),m=eo(t.props);if(E){let N=E._lpa||E.firstChild;t.shapeFlag&16&&(m?(p(E,N),d(e,t),t.targetAnchor||ul(E,t,u,f,a(e)===E?e:null)):(t.anchor=i(e),p(E,N),t.targetAnchor||ul(E,t,u,f),c(N&&i(N),t,E,n,o,r,s))),br(t,m)}else m&&t.shapeFlag&16&&(d(e,t),t.targetStart=e,t.targetAnchor=i(e));return t.anchor&&i(t.anchor)}var Ig=Ag;function br(e,t){let n=e.ctx;n&&n.ut&&(t?n.ut(e.el,e.anchor):n.ut(e.targetStart,e.targetAnchor))}function ul(e,t,n,o,r=null){let s=t.targetStart=n(""),i=t.targetAnchor=n("");return s[Uu]=i,e&&(o(s,e,r),o(i,e,r)),i}var yt=Symbol("_leaveCb"),yr=Symbol("_enterCb");function Ei(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Mr(()=>{e.isMounted=!0}),Tl(()=>{e.isUnmounting=!0}),e}var Dt=[Function,Array],_i={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Dt,onEnter:Dt,onAfterEnter:Dt,onEnterCancelled:Dt,onBeforeLeave:Dt,onLeave:Dt,onAfterLeave:Dt,onLeaveCancelled:Dt,onBeforeAppear:Dt,onAppear:Dt,onAfterAppear:Dt,onAppearCancelled:Dt},kg={name:"BaseTransition",props:_i,setup(e,{slots:t}){let n=qe(),o=Ei();return()=>{let r=t.default&&Vr(t.default(),!0),s=r&&r.length?Bu(r):n.subTree?up():void 0;if(!s)return;let i=Q(e),{mode:a}=i;if(o.isLeaving)return al(s);let l=oi(s);if(!l)return al(s);let f=oo(l,i,o,n);l.type!==xe&&kt(l,f);let u=n.subTree&&oi(n.subTree);if(u&&u.type!==xe&&!It(u,l)&&wr(n.subTree)){let c=oo(u,i,o,n);if(kt(u,c),a==="out-in"&&l.type!==xe)return o.isLeaving=!0,c.afterLeave=()=>{if(o.isLeaving=!1,!(n.job.flags&8))if(n.effect.flags&2){let p=()=>{n.job.flags&8||n.update()};p.i=n,hi(p)}else n.update();delete c.afterLeave,u=void 0},al(s);a==="in-out"&&l.type!==xe?c.delayLeave=(p,d,E)=>{let m=Hu(o,u);m[String(u.key)]=u,p[yt]=()=>{d(),p[yt]=void 0,delete f.delayedLeave,u=void 0},f.delayedLeave=()=>{E(),delete f.delayedLeave,u=void 0}}:u=void 0}else u&&(u=void 0);return s}}};function Bu(e){let t=e[0];if(e.length>1){let n=!1;for(let o of e)if(o.type!==xe){t=o,n=!0;break}}return t}var Nl=kg;function Hu(e,t){let{leavingVNodes:n}=e,o=n.get(t.type);return o||(o=Object.create(null),n.set(t.type,o)),o}function oo(e,t,n,o){let{appear:r,mode:s,persisted:i=!1,onBeforeEnter:a,onEnter:l,onAfterEnter:f,onEnterCancelled:u,onBeforeLeave:c,onLeave:p,onAfterLeave:d,onLeaveCancelled:E,onBeforeAppear:m,onAppear:N,onAfterAppear:O,onAppearCancelled:b}=t,v=String(e.key),y=Hu(n,e),g=(S,T)=>{S&&bt(S,o,9,T)},x=(S,T)=>{let I=T[1];g(S,T),H(S)?S.every(M=>M.length<=1)&&I():S.length<=1&&I()},C={mode:s,persisted:i,beforeEnter(S){let T=a;if(!n.isMounted)if(r)T=m||a;else return;S[yt]&&S[yt](!0);let I=y[v];if(I&&It(e,I)){let M=I.el[yt];if(!M){let A=wr(I);M=A&&A.el[yt]}M&&M()}g(T,[S])},enter(S){if(!_g&&S[yt]){C.delayedLeave&&C.delayedLeave();return}let T=l,I=f,M=u;if(!n.isMounted)if(r)T=N||l,I=O||f,M=b||u;else return;let A=!1;S[yr]=P=>{A||(A=!0,P?g(M,[S]):g(I,[S]),C.delayedLeave&&C.delayedLeave(),S[yr]=void 0)};let $=S[yr].bind(null,!1);T?x(T,[S,$]):$()},leave(S,T){let I=String(e.key);if(S[yr]&&S[yr](!0),n.isUnmounting)return T();g(c,[S]);let M=!1;S[yt]=$=>{M||(M=!0,T(),$?g(E,[S]):g(d,[S]),S[yt]=void 0,y[I]===e&&delete y[I])};let A=S[yt].bind(null,!1);y[I]=e,p?x(p,[S,A]):A()},clone(S){let T=oo(S,t,n,o);return T.afterLeave=()=>{C.afterLeave&&C.afterLeave()},T.delayLeave=(I,M,A)=>{C.delayLeave?C.delayLeave(I,M,A):A()},T.delayedLeave=()=>{C.delayedLeave&&C.delayedLeave()},T}};return C}function al(e){if(Rr(e))return e=Qt(e),e.children=null,e}function oi(e){if(!Rr(e))return vi(e.type)&&e.children?Bu(e.children):e;if(e.component)return e.component.subTree;let{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&ee(n.default))return n.default()}}function kt(e,t){if(e.shapeFlag&6&&e.component){e.transition=t;let n=e.component.subTree;kt(vi(n.type)&&oi(n)||n,t)}else if(e.shapeFlag&128){let n=e.suspense;if(n){let o=n.isHydrating?n.pendingBranch:n.activeBranch;o&&kt(o,t.clone(o))}else e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)}else if(e.transition=t,e.type===Re&&H(e.children)){let n=Al(e.children,!1);n&&kt(n,t)}}function Vr(e,t=!1,n){let o=[],r=0;for(let s=0;s<e.length;s++){let i=e[s],a=n==null?i.key:String(n)+String(i.key!=null?i.key:s);i.type===Re?(i.patchFlag&128&&r++,o=o.concat(Vr(i.children,t,a))):(t||i.type!==xe)&&o.push(a!=null?Qt(i,{key:a}):i)}if(r>1)for(let s=0;s<o.length;s++)o[s].patchFlag=-2;return o}function wr(e){if(e.component)return wr(e.component.subTree);if(e.type===Re){let t=H(e.children)&&Al(e.children,!1);return t?wr(t):void 0}if(e.type!==xe)return e}function at(e,t){return ee(e)?q({name:e.name},t,{setup:e}):e}function Vg(){let e=qe();return e?(e.appContext.config.idPrefix||"v")+"-"+e.ids[0]+e.ids[1]++:""}function ju(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function Rg(e){let t=qe(),n=Ws(null);if(t){let r=t.refs===te?t.refs={}:t.refs;Object.defineProperty(r,e,{enumerable:!0,get:()=>n.value,set:s=>n.value=s})}return n}function Nu(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var ri=new WeakMap;function Ro(e,t,n,o,r=!1){if(H(e)){e.forEach((m,N)=>Ro(m,t&&(H(t)?t[N]:t),n,o,r));return}if(hn(o)&&!r){o.shapeFlag&512&&o.type.__asyncResolved&&o.component.subTree.component&&Ro(e,t,n,o.component.subTree);return}let s=o.shapeFlag&4?Lr(o.component):o.el,i=r?null:s,{i:a,r:l}=e,f=t&&t.r,u=a.refs===te?a.refs={}:a.refs,c=a.setupState,p=Q(c),d=c===te?Cn:m=>Nu(u,m)?!1:le(p,m),E=(m,N)=>!(N&&Nu(u,N));if(f!=null&&f!==l){if(Su(t),z(f))u[f]=null,d(f)&&(c[f]=null);else if(Se(f)){let m=t;E(f,m.k)&&(f.value=null),m.k&&(u[m.k]=null)}}if(ee(l))io(l,a,12,[i,u]);else{let m=z(l),N=Se(l);if(m||N){let O=()=>{if(e.f){let b=m?d(l)?c[l]:u[l]:E(l)||!e.k?l.value:u[e.k];if(r)H(b)&&lr(b,s);else if(H(b))b.includes(s)||b.push(s);else if(m)u[l]=[s],d(l)&&(c[l]=u[l]);else{let v=[s];E(l,e.k)&&(l.value=v),e.k&&(u[e.k]=v)}}else m?(u[l]=i,d(l)&&(c[l]=i)):N&&(E(l,e.k)&&(l.value=i),e.k&&(u[e.k]=i))};if(i){let b=()=>{O(),ri.delete(e)};b.id=-1,ri.set(e,b),we(b,n)}else Su(e),O()}}}function Su(e){let t=ri.get(e);t&&(t.flags|=8,ri.delete(e))}var xu=!1,Do=()=>{xu||(console.error("Hydration completed but contains mismatches."),xu=!0)},Mg=e=>e.namespaceURI.includes("svg")&&e.tagName!=="foreignObject",Pg=e=>e.namespaceURI.includes("MathML"),Gs=e=>{if(e.nodeType===1){if(Mg(e))return"svg";if(Pg(e))return"mathml"}},Vo=e=>e.nodeType===8;function Lg(e){let{mt:t,p:n,o:{patchProp:o,createText:r,nextSibling:s,parentNode:i,remove:a,insert:l,createComment:f}}=e,u=(v,y)=>{if(!y.hasChildNodes()){n(null,v,y),ni(),y._vnode=v;return}c(y.firstChild,v,null,null,null),ni(),y._vnode=v},c=(v,y,g,x,C,S=!1)=>{S=S||!!y.dynamicChildren;let T=Vo(v)&&v.data==="[",I=()=>m(v,y,g,x,C,T),{type:M,ref:A,shapeFlag:$,patchFlag:P}=y,W=v.nodeType;y.el=v,P===-2&&(S=!1,y.dynamicChildren=null);let j=null;switch(M){case Vn:W!==3?y.children===""?(l(y.el=r(""),i(v),v),j=v):j=I():(v.data!==y.children&&(Do(),v.data=y.children),j=s(v));break;case xe:b(v)?(j=s(v),O(y.el=v.content.firstChild,v,g)):W!==8||T?j=I():j=s(v);break;case mn:if(T&&(v=s(v),W=v.nodeType),W===1||W===3){j=v;let ae=!y.children.length;for(let pe=0;pe<y.staticCount;pe++)ae&&(y.children+=j.nodeType===1?j.outerHTML:j.data),pe===y.staticCount-1&&(y.anchor=j),j=s(j);return T?s(j):j}else I();break;case Re:T?j=E(v,y,g,x,C,S):j=I();break;default:if($&1)(W!==1||y.type.toLowerCase()!==v.tagName.toLowerCase())&&!b(v)?j=I():j=p(v,y,g,x,C,S);else if($&6){y.slotScopeIds=C;let ae=i(v);if(T?j=N(v):Vo(v)&&v.data==="teleport start"?j=N(v,v.data,"teleport end"):j=s(v),t(y,ae,null,g,x,Gs(ae),S),(hn(y)||y.component.asyncDep)&&!y.component.subTree){let pe;T?(pe=ye(mn),pe.anchor=j?j.previousSibling:ae.lastChild):pe=v.nodeType===3?Pl(""):ye(v.nodeType===8?xe:"div"),pe.el=v,y.component.subTree=pe}}else $&64?W!==8?j=I():j=y.type.hydrate(v,y,g,x,C,S,e,d):$&128&&(j=y.type.hydrate(v,y,g,x,Gs(i(v)),C,S,e,c))}return A!=null&&Ro(A,null,x,y),j},p=(v,y,g,x,C,S)=>{S=S||!!y.dynamicChildren;let{type:T,dynamicProps:I,props:M,patchFlag:A,shapeFlag:$,dirs:P,transition:W}=y,j=T==="input"||T==="option",ae=!!I;if(j||ae||A!==-1){P&&qt(y,null,g,"created");let pe=!1;if(b(v)){pe=rp(null,W)&&g&&g.vnode.props&&g.vnode.props.appear;let se=v.content.firstChild;if(pe){let Le=se.getAttribute("class");Le&&(se.$cls=Le),W.beforeEnter(se)}O(se,v,g),y.el=v=se}if($&16&&!(M&&(M.innerHTML||M.textContent))){let se=d(v.firstChild,y,v,g,x,C,S);for(se&&!Qs(v,1)&&Do();se;){let Le=se;se=se.nextSibling,a(Le)}}else if($&8){let se=y.children;se[0]===`
`&&(v.tagName==="PRE"||v.tagName==="TEXTAREA")&&(se=se.slice(1));let{textContent:Le}=v;Le!==se&&Le!==se.replace(/\r\n|\r/g,`
`)&&(Qs(v,0)||Do(),v.textContent=y.children)}if(M){if(j||ae||!S||A&48){let se=v.tagName.includes("-"),Le=v.namespaceURI.includes("svg")?"svg":v.namespaceURI.includes("MathML")?"mathml":void 0;for(let ve in M)if(j&&(ve.endsWith("value")||ve==="indeterminate")||Wt(ve)&&!Ft(ve)||ve[0]==="."||se&&!Ft(ve)||I&&I.includes(ve)){if(Fg(v,ve,M[ve]))continue;o(v,ve,null,M[ve],Le,g)}}else if(M.onClick)o(v,"onClick",null,M.onClick,void 0,g);else if(A&4&&vt(M.style))for(let se in M.style)M.style[se]}let me;(me=M&&M.onVnodeBeforeMount)&&st(me,g,y),P&&qt(y,null,g,"beforeMount"),((me=M&&M.onVnodeMounted)||P||pe)&&li(()=>{me&&st(me,g,y),pe&&W.enter(v),P&&qt(y,null,g,"mounted")},x)}return v.nextSibling},d=(v,y,g,x,C,S,T)=>{T=T||!!y.dynamicChildren;let I=y.children,M=I.length,A=!1;for(let $=0;$<M;$++){let P=T?I[$]:I[$]=it(I[$]),W=P.type===Vn;v?(W&&!T&&$+1<M&&it(I[$+1]).type===Vn&&(l(r(v.data.slice(P.children.length)),g,s(v)),v.data=P.children),v=c(v,P,x,C,S,T)):W&&!P.children?l(P.el=r(""),g):(A||(A=!0,Qs(g,1)||Do()),n(null,P,g,null,x,C,Gs(g),S))}return v},E=(v,y,g,x,C,S)=>{let{slotScopeIds:T}=y;T&&(C=C?C.concat(T):T);let I=i(v),M=d(s(v),y,I,g,x,C,S);return M&&Vo(M)&&M.data==="]"?s(y.anchor=M):(Do(),l(y.anchor=f("]"),I,M),M)},m=(v,y,g,x,C,S)=>{if(Bg(v,y)||Do(),y.el=null,S){let M=N(v);for(;;){let A=s(v);if(A&&A!==M)a(A);else break}}let T=s(v),I=i(v);return a(v),n(null,y,I,T,g,x,Gs(I),C),g&&g.vnode.el===v&&(g.vnode.el=y.el,Ni(g,y.el)),T},N=(v,y="[",g="]")=>{let x=0;for(;v;)if(v=s(v),v&&Vo(v)&&(v.data===y&&x++,v.data===g)){if(x===0)return s(v);x--}return v},O=(v,y,g)=>{let x=y.parentNode;x&&x.replaceChild(v,y);let C=g;for(;C;)C.vnode.el===y&&(C.vnode.el=C.subTree.el=v),C=C.parent},b=v=>v.nodeType===1&&v.tagName==="TEMPLATE";return[u,c]}var $g=new Set(["src","srcset","href","poster"]);function Fg(e,t,n){return $g.has(t)?e.getAttribute(t)===(n==null?null:`${n}`):!1}var si="data-allow-mismatch",Ug={0:"text",1:"children",2:"class",3:"style",4:"attribute"};function Qs(e,t){if(t===0||t===1)for(;e&&!e.hasAttribute(si);)e=e.parentElement;return Sl(e&&e.getAttribute(si),t)}function Sl(e,t){if(e==null)return!1;if(e==="")return!0;{let n=e.split(",");return t===0&&n.includes("children")?!0:n.includes(Ug[t])}}function Bg(e,t){return Qs(e.parentElement,1)||Hg(e)||jg(t)}function Hg(e){return e.nodeType===1&&Sl(e.getAttribute(si),1)}function jg({props:e}){let t=e&&e[si];return typeof t=="string"&&Sl(t,1)}var Wg=fr().requestIdleCallback||(e=>setTimeout(e,1)),Kg=fr().cancelIdleCallback||(e=>clearTimeout(e)),Xg=(e=1e4)=>t=>{let n=Wg(t,{timeout:e});return()=>Kg(n)};function zg(e){let{top:t,left:n,bottom:o,right:r}=e.getBoundingClientRect(),{innerHeight:s,innerWidth:i}=window;return(t>0&&t<s||o>0&&o<s)&&(n>0&&n<i||r>0&&r<i)}var Gg=e=>(t,n)=>{let o=new IntersectionObserver(s=>{for(let i of s)if(i.isIntersecting){o.disconnect(),t();break}},e),r=s=>{if(zg(s))return t(),o.disconnect(),!1;if(getComputedStyle(s).display==="contents"){for(let i=0;i<s.children.length;i++)if(r(s.children[i])===!1)return!1}o.observe(s)};return n(s=>{if(s instanceof Element)return r(s)}),()=>o.disconnect()},qg=e=>t=>{if(e){let n=matchMedia(e);if(n.matches)t();else return n.addEventListener("change",t,{once:!0}),()=>n.removeEventListener("change",t)}},Jg=(e=[])=>(t,n)=>{z(e)&&(e=[e]);let o=!1,r=i=>{o||(o=!0,s(),t(),i.target.dispatchEvent(new i.constructor(i.type,i)))},s=()=>{n(i=>{for(let a of e)i.removeEventListener(a,r)})};return n(i=>{for(let a of e)i.addEventListener(a,r,{once:!0})}),s};function Yg(e,t){if(Vo(e)&&e.data==="["){let n=1,o=e.nextSibling;for(;o;){if(o.nodeType===1){if(t(o)===!1)break}else if(Vo(o))if(o.data==="]"){if(--n===0)break}else o.data==="["&&n++;o=o.nextSibling}}else t(e)}var hn=e=>!!e.type.__asyncLoader;function Qg(e){ee(e)&&(e={loader:e});let{loader:t,loadingComponent:n,errorComponent:o,delay:r=200,hydrate:s,timeout:i,suspensible:a=!0,onError:l}=e,f=null,u,c=0,p=()=>(c++,f=null,d()),d=()=>{let E;return f||(E=f=t().catch(m=>{if(m=m instanceof Error?m:new Error(String(m)),l)return new Promise((N,O)=>{l(m,()=>N(p()),()=>O(m),c+1)});throw m}).then(m=>E!==f&&f?f:(m&&(m.__esModule||m[Symbol.toStringTag]==="Module")&&(m=m.default),u=m,m)))};return at({name:"AsyncComponentWrapper",__asyncLoader:d,__asyncHydrate(E,m,N){let O=E.isConnected,b=!1;(m.bu||(m.bu=[])).push(()=>b=!0);let v=()=>{b||!E.parentNode||O&&!E.isConnected||N()},y=s?()=>{let g=s(v,x=>Yg(E,x));g&&(m.bum||(m.bum=[])).push(g)}:v;u?y():d().then(()=>!m.isUnmounted&&y())},get __asyncResolved(){return u},setup(){let E=We;if(ju(E),u)return()=>qs(u,E);let m=g=>{f=null,ao(g,E,13,!o,!0)};if(a&&E.suspense||so)return d().then(g=>()=>qs(g,E)).catch(g=>(m(g),()=>o?ye(o,{error:g}):null));let N=_t(!1),O=_t(),b=_t(!!r),v,y;return Ao(()=>{v!=null&&clearTimeout(v),y!=null&&clearTimeout(y)}),r&&(y=setTimeout(()=>{E.isUnmounted||(b.value=!1)},r)),i!=null&&(v=setTimeout(()=>{if(!E.isUnmounted&&!N.value&&!O.value){let g=new Error(`Async component timed out after ${i}ms.`);m(g),O.value=g}},i)),d().then(()=>{E.isUnmounted||(N.value=!0,E.parent&&Rr(E.parent.vnode)&&E.parent.update())}).catch(g=>{if(E.isUnmounted){f=null;return}m(g),O.value=g}),()=>{if(N.value&&u)return qs(u,E);if(O.value&&o)return ye(o,{error:O.value});if(n&&!b.value)return qs(n,E)}}})}function qs(e,t){let{ref:n,props:o,children:r,ce:s}=t.vnode,i=ye(e,o,r);return i.ref=n,i.ce=s,delete t.vnode.ce,i}var Rr=e=>e.type.__isKeepAlive,Zg={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){let n=qe(),o=n.ctx;if(!o.renderer)return()=>{let b=t.default&&t.default();return b&&b.length===1?b[0]:b};let r=new Map,s=new Set,i=null,a=n.suspense,{renderer:{p:l,m:f,um:u,o:{createElement:c}}}=o,p=c("div");o.activate=(b,v,y,g,x)=>{let C=b.component;f(b,v,y,0,a),l(C.vnode,b,v,y,C,a,g,b.slotScopeIds,x),we(()=>{C.isDeactivated=!1,C.a&&An(C.a);let S=b.props&&b.props.onVnodeMounted;S&&st(S,C.parent,b)},a)},o.deactivate=b=>{let v=r.get(b.key==null?b.type:b.key);if(!v||v.component!==b.component)return!1;let y=b.component;return ii(y.m),ii(y.a),f(b,p,null,1,a),we(()=>{y.da&&An(y.da);let g=b.props&&b.props.onVnodeUnmounted;g&&st(g,y.parent,b),y.isDeactivated=!0},a),!0};function d(b){Js(b),u(b,n,a,!0)}function E(b){r.forEach((v,y)=>{let g=di(hn(v)?v.type.__asyncResolved||{}:v.type);g&&!b(g)&&m(y)})}function m(b){let v=r.get(b);v&&(!i||!It(v,i))?d(v):i&&(Js(i),v&&Js(v)),r.delete(b),s.delete(b)}Lo(()=>[e.include,e.exclude],([b,v])=>{b&&E(y=>Nr(b,y)),v&&E(y=>!Nr(v,y))},{flush:"post",deep:!0});let N=null,O=()=>{if(N!=null)if(ai(n.subTree.type)){let b=()=>{let v=Ys(n.subTree);v.component&&r.set(N,v)};n.subTree.suspense.pendingBranch?we(b,n.subTree.suspense):b()}else r.set(N,Ys(n.subTree))};return Mr(O),yi(O),Tl(()=>{r.forEach(b=>{let{subTree:v,suspense:y}=n,g=Ys(v);if(b.type===g.type&&b.key===g.key){Js(g);let x=g.component.da;x&&we(x,y);return}d(b)})}),()=>{if(N=null,!t.default)return i=null;let b=t.default(),v=b[0];if(b.length>1)return i=null,b;if(!vn(v)||!(v.shapeFlag&4)&&!(v.shapeFlag&128))return i=null,v;let y=Ys(v);if(y.type===xe)return i=null,y;let g=y.type,x=di(hn(y)?y.type.__asyncResolved||{}:g),{include:C,exclude:S,max:T}=e;if(C&&(!x||!Nr(C,x))||S&&x&&Nr(S,x))return y.shapeFlag&=-257,i=y,v;let I=y.key==null?g:y.key,M=r.get(I);return y.el&&(y=Qt(y),v.shapeFlag&128&&(v.ssContent=y)),N=I,M?(y.el=M.el,y.component=M.component,y.transition&&kt(y,y.transition),y.shapeFlag|=512,s.delete(I),s.add(I)):(s.add(I),T&&s.size>parseInt(T,10)&&m(s.values().next().value)),y.shapeFlag|=256,i=y,ai(v.type)?v:y}}},ev=Zg;function Nr(e,t){return H(e)?e.some(n=>Nr(n,t)):z(e)?e.split(",").includes(t):Df(e)?(e.lastIndex=0,e.test(t)):!1}function tv(e,t){Wu(e,"a",t)}function nv(e,t){Wu(e,"da",t)}function Wu(e,t,n=We){let o=e.__wdc||(e.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return e()});if(Or(t,o,n),n){let r=n.parent;for(;r&&r.parent;)Rr(r.parent.vnode)&&ov(o,t,n,r),r=r.parent}}function ov(e,t,n,o){let r=Or(t,e,o,!0),s=Or("um",()=>lr(o[t],r),n);s.flags=16}function Js(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function Ys(e){return e.shapeFlag&128?e.ssContent:e}function Or(e,t,n=We,o=!1){if(n){let r=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...i)=>{Ct();let a=xi(n),l=bt(t,n,e,i);return a(),At(),l});return o?r.unshift(s):r.push(s),s}}var En=e=>(t,n=We)=>{(!so||e==="sp")&&Or(e,(...o)=>t(...o),n)},rv=En("bm"),Mr=En("m"),xl=En("bu"),yi=En("u"),Tl=En("bum"),Pr=En("um"),sv=En("sp"),iv=En("rtg"),av=En("rtc");function lv(e,t=We){Or("ec",e,t)}var wl="components",cv="directives";function fv(e,t){return Ol(wl,e,!0,t)||e}var Ku=Symbol.for("v-ndc");function uv(e){return z(e)?Ol(wl,e,!1)||e:e||Ku}function pv(e){return Ol(cv,e)}function Ol(e,t,n=!0,o=!1){let r=Ke||We;if(r){let s=r.type;if(e===wl){let a=di(s,!1);if(a&&(a===t||a===ce(t)||a===Ot(ce(t))))return s}let i=Tu(r[e]||s[e],t)||Tu(r.appContext[e],t);return!i&&o?s:i}}function Tu(e,t){return e&&(e[t]||e[ce(t)]||e[Ot(ce(t))])}function dv(e,t,n,o){let r,s=n&&n[o],i=H(e);if(i||z(e)){let a=i&&vt(e),l=!1,f=!1;a&&(l=!Fe(e),f=tt(e),e=Er(e)),r=new Array(e.length);for(let u=0,c=e.length;u<c;u++)r[u]=t(l?f?pn(Et(e[u])):Et(e[u]):e[u],u,void 0,s&&s[u])}else if(typeof e=="number")if(!Number.isInteger(e)||e<0)r=[];else{r=new Array(e);for(let a=0;a<e;a++)r[a]=t(a+1,a,void 0,s&&s[a])}else if(ie(e))if(e[Symbol.iterator])r=Array.from(e,(a,l)=>t(a,l,void 0,s&&s[l]));else{let a=Object.keys(e);r=new Array(a.length);for(let l=0,f=a.length;l<f;l++){let u=a[l];r[l]=t(e[u],u,l,s&&s[l])}}else r=[];return n&&(n[o]=r),r}function hv(e,t){for(let n=0;n<t.length;n++){let o=t[n];if(H(o))for(let r=0;r<o.length;r++)e[o[r].name]=o[r].fn;else o&&(e[o.name]=o.key?(...r)=>{let s=o.fn(...r);return s&&(s.key=o.key),s}:o.fn)}return e}function mv(e,t,n,o,r,s){if(n==null&&(n={}),Ke.ce||Ke.parent&&hn(Ke.parent)&&Ke.parent.ce){let f=s!=null&&n.key==null?q({},n,{key:s}):n,u=Object.keys(f).length>0;return t!=="default"&&(f.name=t),Ar(),ci(Re,null,[ye("slot",f,o&&o())],u?-2:64)}let i=e[t];i&&i._c&&(i._d=!1);let a=gn.length;Ar();let l;try{let f=i&&Cl(i(n)),u=n.key||s||f&&f.key;l=ci(Re,{key:(u&&!De(u)?u:`_${t}`)+(!f&&o?"_fb":"")},f||(o?o():[]),f&&e._===1?64:-2)}catch(f){for(let u=gn.length;u>a;u--)Si();throw f}finally{i&&i._c&&(i._d=!0)}return!r&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),l}function Cl(e){return e.some(t=>vn(t)?!(t.type===xe||t.type===Re&&!Cl(t.children)):!0)?e:null}function gv(e,t){let n={};for(let o in e)n[t&&/[A-Z]/.test(o)?`on:${o}`:cn(o)]=e[o];return n}var pl=e=>e?mp(e)?Lr(e):pl(e.parent):null;var Sr=q(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>pl(e.parent),$root:e=>pl(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>e.type,$forceUpdate:e=>e.f||(e.f=()=>{hi(e.update)}),$nextTick:e=>e.n||(e.n=kr.bind(e.proxy)),$watch:e=>Ie});var ll=(e,t)=>e!==te&&!e.__isScriptSetup&&le(e,t),dl={get({_:e},t){if(t==="__v_skip")return!0;let{ctx:n,setupState:o,data:r,props:s,accessCache:i,type:a,appContext:l}=e;if(t[0]!=="$"){let p=i[t];if(p!==void 0)switch(p){case 1:return o[t];case 2:return r[t];case 4:return n[t];case 3:return s[t]}else{if(ll(o,t))return i[t]=1,o[t];if(le(s,t))return i[t]=3,s[t];if(n!==te&&le(n,t))return i[t]=4,n[t];i[t]=0}}let f=Sr[t],u,c;if(f)return t==="$attrs"&&je(e.attrs,"get",""),f(e);if((u=a.__cssModules)&&(u=u[t]))return u;if(n!==te&&le(n,t))return i[t]=4,n[t];if(c=l.config.globalProperties,le(c,t))return c[t]},set({_:e},t,n){let{data:o,setupState:r,ctx:s}=e;return ll(r,t)?(r[t]=n,!0):le(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(s[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:o,appContext:r,props:s,type:i}},a){let l;return!!(n[a]||ll(t,a)||le(s,a)||le(o,a)||le(Sr,a)||le(r.config.globalProperties,a)||(l=i.__cssModules)&&l[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:le(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},vv=q({},dl,{get(e,t){if(t!==Symbol.unscopables)return dl.get(e,t,e)},has(e,t){return t[0]!=="_"&&!Vf(t)}});function Ev(){return null}function _v(){return null}function yv(e){}function bv(e){}function Nv(){return null}function Sv(){}function xv(e,t){return null}function Tv(){return Xu("useSlots").slots}function wv(){return Xu("useAttrs").attrs}function Xu(e){let t=qe();return t.setupContext||(t.setupContext=yp(t))}function hl(e){return H(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}function Ov(e,t){let n=hl(e);for(let o in t){if(o.startsWith("__skip"))continue;let r=n[o];r?H(r)||ee(r)?r=n[o]={type:r,default:t[o]}:r.default=t[o]:r===null&&(r=n[o]={default:t[o]}),r&&t[`__skip_${o}`]&&(r.skipFactory=!0)}return n}function Cv(e,t){return!e||!t?e||t:H(e)&&H(t)?e.concat(t):q({},hl(e),hl(t))}function Av(e,t){let n={};for(let o in e)t.includes(o)||Object.defineProperty(n,o,{enumerable:!0,get:()=>e[o]});return n}function Dv(e){let t=qe(),n=so,o=e();Ir(),n&&Rn(!1);let r=()=>{xi(t),n&&Rn(!0)},s=()=>{qe()!==t&&t.scope.off(),Ir(),n&&Rn(!1)};return Cs(o)&&(o=o.catch(i=>{throw r(),Promise.resolve().then(()=>Promise.resolve().then(s)),i})),[o,()=>{r(),Promise.resolve().then(s)}]}function zu(){return{app:null,config:{isNativeTag:Cn,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var Iv=0;function kv(e,t){return function(o,r=null){ee(o)||(o=q({},o)),r!=null&&!ie(r)&&(r=null);let s=zu(),i=new WeakSet,a=[],l=!1,f=s.app={_uid:Iv++,_component:o,_props:r,_container:null,_context:s,_instance:null,version:xp,get config(){return s.config},set config(u){},use(u,...c){return i.has(u)||(u&&ee(u.install)?(i.add(u),u.install(f,...c)):ee(u)&&(i.add(u),u(f,...c))),f},mixin(u){return f},component(u,c){return c?(s.components[u]=c,f):s.components[u]},directive(u,c){return c?(s.directives[u]=c,f):s.directives[u]},mount(u,c,p){if(!l){let d=f._ceVNode||ye(o,r);return d.appContext=s,p===!0?p="svg":p===!1&&(p=void 0),c&&t?t(d,u):e(d,u,p),l=!0,f._container=u,u.__vue_app__=f,Lr(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(bt(a,f._instance,16),e(null,f._container),delete f._container.__vue_app__)},provide(u,c){return s.provides[u]=c,f},runWithContext(u){let c=no;no=f;try{return u()}finally{no=c}}};return f}}var no=null;function Vv(e,t,n=te){let o=qe(),r=ce(t),s=ze(t),i=Gu(e,r),a=Ks((l,f)=>{let u,c=te,p;return Fu(()=>{let d=e[r];ke(u,d)&&(u=d,f())}),{get(){return l(),n.get?n.get(u):u},set(d){let E=n.set?n.set(d):d;if(!ke(E,u)&&!(c!==te&&ke(d,c)))return;let m=o.vnode.props,N=!!(m&&(t in m||r in m||s in m)&&(`onUpdate:${t}`in m||`onUpdate:${r}`in m||`onUpdate:${s}`in m));N||(u=d,f()),o.emit(`update:${t}`,E),ke(d,c)&&(ke(d,E)&&!ke(E,p)||N&&c!==te&&!ke(E,u))&&f(),c=d,p=E}}});return a[Symbol.iterator]=()=>{let l=0;return{next(){return l<2?{value:l++?i||te:a,done:!1}:{done:!0}}}},a}var Gu=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${ce(t)}Modifiers`]||e[`${ze(t)}Modifiers`];function Rv(e,t,...n){if(e.isUnmounted)return;let o=e.vnode.props||te,r=n,s=t.startsWith("update:"),i=s&&Gu(o,t.slice(7));i&&(i.trim&&(r=n.map(u=>z(u)?u.trim():u)),i.number&&(r=r.map(Xn)));let a,l=o[a=cn(t)]||o[a=cn(ce(t))];!l&&s&&(l=o[a=cn(ze(t))]),l&&bt(l,e,6,r);let f=o[a+"Once"];if(f){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,bt(f,e,6,r)}}function Mv(e,t,n=!1){let o=t.emitsCache,r=o.get(e);if(r!==void 0)return r;let s=e.emits,i={};return!s&&!!1?(ie(e)&&o.set(e,null),null):(H(s)?s.forEach(l=>i[l]=null):q(i,s),ie(e)&&o.set(e,i),i)}function bi(e,t){return!e||!Wt(t)?!1:(t=t.slice(2),t=t==="Once"?t:t.replace(/Once$/,""),le(e,t[0].toLowerCase()+t.slice(1))||le(e,ze(t))||le(e,t))}function Zs(e){let{type:t,vnode:n,proxy:o,withProxy:r,propsOptions:[s],slots:i,attrs:a,emit:l,render:f,renderCache:u,props:c,data:p,setupState:d,ctx:E,inheritAttrs:m}=e,N=Tr(e),O,b;try{if(n.shapeFlag&4){let g=r||o,x=g;O=it(f.call(x,g,u,c,d,p,E)),b=a}else{let g=t;O=it(g.length>1?g(c,{attrs:a,slots:i,emit:l}):g(c,null)),b=t.props?a:Pv(a)}}catch(g){gn.length=0,ao(g,e,1),O=ye(xe)}let v=O,y;if(b&&m!==!1){let g=Object.keys(b),{shapeFlag:x}=v;g.length&&x&7&&(s&&g.some(xo)&&(b=Lv(b,s)),v=Qt(v,b,!1,!0))}if(n.dirs&&(v=Qt(v,null,!1,!0),v.dirs=v.dirs?v.dirs.concat(n.dirs):n.dirs),n.transition){let g=vi(v.type)&&oi(v)||v;kt(g,n.transition)}return O=v,Tr(N),O}function Al(e,t=!0){let n;for(let o=0;o<e.length;o++){let r=e[o];if(vn(r)){if(r.type!==xe||r.children==="v-if"){if(n)return;n=r}}else return}return n}var Pv=e=>{let t;for(let n in e)(n==="class"||n==="style"||Wt(n))&&((t||(t={}))[n]=e[n]);return t},Lv=(e,t)=>{let n={};for(let o in e)(!xo(o)||!(o.slice(9)in t))&&(n[o]=e[o]);return n};function $v(e,t,n){let{props:o,children:r,component:s}=e,{props:i,children:a,patchFlag:l}=t,f=s.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return o?wu(o,i,f):!!i;if(l&8){let u=t.dynamicProps;for(let c=0;c<u.length;c++){let p=u[c];if(qu(i,o,p)&&!bi(f,p))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:o===i?!1:o?i?wu(o,i,f):!0:!!i;return!1}function wu(e,t,n){let o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let r=0;r<o.length;r++){let s=o[r];if(!le(e,s)||qu(t,e,s)&&!bi(n,s))return!0}return!1}function qu(e,t,n){let o=e[n],r=t[n];return n==="style"&&ie(o)&&ie(r)?!rt(o,r):o!==r}function Ni({vnode:e,parent:t,suspense:n},o){for(;t;){let r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.suspense.vnode.el=r.el=o,e=r),r===e)(e=t.vnode).el=o,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=o)}var Ju={},Yu=()=>Object.create(Ju),Qu=e=>Object.getPrototypeOf(e)===Ju;function Fv(e,t,n,o=!1){let r={},s=Yu();e.propsDefaults=Object.create(null),Zu(e,t,r,s);for(let i in e.propsOptions[0])i in r||(r[i]=void 0);n?e.props=o?r:Bs(r):e.type.props?e.props=r:e.props=s,e.attrs=s}function Uv(e,t,n,o){let{props:r,attrs:s,vnode:{patchFlag:i}}=e,a=Q(r),[l]=e.propsOptions,f=!1;if((o||i>0)&&!(i&16)){if(i&8){let u=e.vnode.dynamicProps;for(let c=0;c<u.length;c++){let p=u[c];if(bi(e.emitsOptions,p))continue;let d=t[p];if(l)if(le(s,p))d!==s[p]&&(s[p]=d,f=!0);else{let E=ce(p);r[E]=ml(l,a,E,d,e,!1)}else d!==s[p]&&(s[p]=d,f=!0)}}}else{Zu(e,t,r,s)&&(f=!0);let u;for(let c in a)(!t||!le(t,c)&&((u=ze(c))===c||!le(t,u)))&&(l?n&&(n[c]!==void 0||n[u]!==void 0)&&(r[c]=ml(l,a,c,void 0,e,!0)):delete r[c]);if(s!==a)for(let c in s)(!t||!le(t,c))&&(delete s[c],f=!0)}f&&Xt(e.attrs,"set","")}function Zu(e,t,n,o){let[r,s]=e.propsOptions,i=!1,a;if(t)for(let l in t){if(Ft(l))continue;let f=t[l],u;r&&le(r,u=ce(l))?!s||!s.includes(u)?n[u]=f:(a||(a={}))[u]=f:bi(e.emitsOptions,l)||(!(l in o)||f!==o[l])&&(o[l]=f,i=!0)}if(s){let l=Q(n),f=a||te;for(let u=0;u<s.length;u++){let c=s[u];n[c]=ml(r,l,c,f[c],e,!le(f,c))}}return i}function ml(e,t,n,o,r,s){let i=e[n];if(i!=null){let a=le(i,"default");if(a&&o===void 0){let l=i.default;if(i.type!==Function&&!i.skipFactory&&ee(l)){let{propsDefaults:f}=r;if(n in f)o=f[n];else{let u=xi(r);o=f[n]=l.call(null,t),u()}}else o=l;r.ce&&r.ce._setProp(n,o)}i[0]&&(s&&!a?o=!1:i[1]&&(o===""||o===ze(n))&&(o=!0))}return o}function Bv(e,t,n=!1){let o=t.propsCache,r=o.get(e);if(r)return r;let s=e.props,i={},a=[];if(!s&&!!1)return ie(e)&&o.set(e,On),On;if(H(s))for(let u=0;u<s.length;u++){let c=ce(s[u]);Ou(c)&&(i[c]=te)}else if(s)for(let u in s){let c=ce(u);if(Ou(c)){let p=s[u],d=i[c]=H(p)||ee(p)?{type:p}:q({},p),E=d.type,m=!1,N=!0;if(H(E))for(let O=0;O<E.length;++O){let b=E[O],v=ee(b)&&b.name;if(v==="Boolean"){m=!0;break}else v==="String"&&(N=!1)}else m=ee(E)&&E.name==="Boolean";d[0]=m,d[1]=N,(m||le(d,"default"))&&a.push(c)}}let f=[i,a];return ie(e)&&o.set(e,f),f}function Ou(e){return e[0]!=="$"&&!Ft(e)}var Dl=e=>e==="_"||e==="_ctx"||e==="$stable",Il=e=>H(e)?e.map(it):[it(e)],Hv=(e,t,n)=>{if(t._n)return t;let o=bl((...r)=>Il(t(...r)),n);return o._c=!1,o},ep=(e,t,n)=>{let o=e._ctx;for(let r in e){if(Dl(r))continue;let s=e[r];if(ee(s))t[r]=Hv(r,s,o);else if(s!=null){let i=Il(s);t[r]=()=>i}}},tp=(e,t)=>{let n=Il(t);e.slots.default=()=>n},np=(e,t,n)=>{for(let o in t)(n||!Dl(o))&&(e[o]=t[o])},jv=(e,t,n)=>{let o=e.slots=Yu();if(e.vnode.shapeFlag&32){let r=t._;r?(np(o,t,n),n&&Ds(o,"_",r,!0)):ep(t,o)}else t&&tp(e,t)},Wv=(e,t,n)=>{let{vnode:o,slots:r}=e,s=!0,i=te;if(o.shapeFlag&32){let a=t._;a?n&&a===1?s=!1:np(r,t,n):(s=!t.$stable,ep(t,r)),i=t}else t&&(tp(e,t),i={default:1});if(s)for(let a in r)!Dl(a)&&i[a]==null&&delete r[a]};function Kv(){let e=[]}var we=li;function kl(e){return op(e)}function Vl(e){return op(e,Lg)}function op(e,t){Kv();let n=fr();n.__VUE__=!0;let{insert:o,remove:r,patchProp:s,createElement:i,createText:a,createComment:l,setText:f,setElementText:u,parentNode:c,nextSibling:p,setScopeId:d=Ie,insertStaticContent:E}=e,m=(h,_,w,R=null,D=null,V=null,U=void 0,F=null,L=!!_.dynamicChildren)=>{if(h===_)return;h&&!It(h,_)&&(R=us(h),et(h,D,V,!0),h=null),_.patchFlag===-2&&(L=!1,_.dynamicChildren=null),_.dynamicChildren&&h&&h.dynamicChildren&&h.dynamicChildren.hasOnce&&(_.dynamicChildren===On&&(_.dynamicChildren=[]),_.dynamicChildren.hasOnce=!0);let{type:k,ref:X,shapeFlag:B}=_;switch(k){case Vn:N(h,_,w,R);break;case xe:O(h,_,w,R);break;case mn:h==null&&b(_,w,R,U);break;case Re:$(h,_,w,R,D,V,U,F,L);break;default:B&1?x(h,_,w,R,D,V,U,F,L):B&6?P(h,_,w,R,D,V,U,F,L):(B&64||B&128)&&k.process(h,_,w,R,D,V,U,F,L,Eo)}X!=null&&D?Ro(X,h&&h.ref,V,_||h,!_):X==null&&h&&h.ref!=null&&Ro(h.ref,null,V,h,!0)},N=(h,_,w,R)=>{if(h==null)o(_.el=a(_.children),w,R);else{let D=_.el=h.el;_.children!==h.children&&f(D,_.children)}},O=(h,_,w,R)=>{h==null?o(_.el=l(_.children||""),w,R):_.el=h.el},b=(h,_,w,R)=>{[h.el,h.anchor]=E(h.children,_,w,R,h.el,h.anchor)},v=(h,_,w,R)=>{if(_.children!==h.children){let D=p(h.anchor);g(h),[_.el,_.anchor]=E(_.children,w,D,R)}else _.el=h.el,_.anchor=h.anchor},y=({el:h,anchor:_},w,R)=>{let D;for(;h&&h!==_;)D=p(h),o(h,w,R),h=D;o(_,w,R)},g=({el:h,anchor:_})=>{let w;for(;h&&h!==_;)w=p(h),r(h),h=w;r(_)},x=(h,_,w,R,D,V,U,F,L)=>{if(_.type==="svg"?U="svg":_.type==="math"&&(U="mathml"),h==null)C(_,w,R,D,V,U,F,L);else{let k=h.el&&h.el._isVueCE?h.el:null;try{k&&k._beginPatch(),I(h,_,D,V,U,F,L)}finally{k&&k._endPatch()}}},C=(h,_,w,R,D,V,U,F)=>{let L,k,{props:X,shapeFlag:B,transition:K,dirs:G}=h;if(L=h.el=i(h.type,V,X&&X.is,X),B&8?u(L,h.children):B&16&&T(h.children,L,null,R,D,cl(h,V),U,F),G&&qt(h,null,R,"created"),S(L,h,h.scopeId,U,R),X){for(let ge in X)ge!=="value"&&!Ft(ge)&&s(L,ge,null,X[ge],V,R);"value"in X&&s(L,"value",null,X.value,V),(k=X.onVnodeBeforeMount)&&st(k,R,h)}G&&qt(h,null,R,"beforeMount");let fe=rp(D,K);fe?K.beforeEnter(L):K&&!K.persisted&&(L[vl]=!0),o(L,_,w),((k=X&&X.onVnodeMounted)||fe||G)&&we(()=>{let de;k&&st(k,R,h),fe&&K.enter(L),G&&qt(h,null,R,"mounted")},D)},S=(h,_,w,R,D)=>{if(w&&d(h,w),R)for(let V=0;V<R.length;V++)d(h,R[V]);if(D){let V=D.subTree;if(_===V||ai(V.type)&&(V.ssContent===_||V.ssFallback===_)){let U=D.vnode;S(h,U,U.scopeId,U.slotScopeIds,D.parent)}}},T=(h,_,w,R,D,V,U,F,L=0)=>{for(let k=L;k<h.length;k++){let X=h[k]=F?dn(h[k]):it(h[k]);m(null,X,_,w,R,D,V,U,F)}},I=(h,_,w,R,D,V,U)=>{let F=_.el=h.el,{patchFlag:L,dynamicChildren:k,dirs:X}=_;L|=h.patchFlag&16;let B=h.props||te,K=_.props||te,G;if(w&&Zn(w,!1),(G=K.onVnodeBeforeUpdate)&&st(G,w,_,h),X&&qt(_,h,w,"beforeUpdate"),w&&Zn(w,!0),k&&(!h.dynamicChildren||h.dynamicChildren.length!==k.length)&&(L=0,U=!1,k=null),(B.innerHTML&&K.innerHTML==null||B.textContent&&K.textContent==null)&&u(F,""),k?M(h.dynamicChildren,k,F,w,R,cl(_,D),V):U||me(h,_,F,null,w,R,cl(_,D),V,!1),L>0){if(L&16)A(F,B,K,w,D);else if(L&2&&B.class!==K.class&&s(F,"class",null,K.class,D),L&4&&s(F,"style",B.style,K.style,D),L&8){let fe=_.dynamicProps;for(let ge=0;ge<fe.length;ge++){let de=fe[ge],Ce=B[de],$e=K[de];($e!==Ce||de==="value")&&s(F,de,Ce,$e,D,w)}}L&1&&h.children!==_.children&&u(F,_.children)}else!U&&k==null&&A(F,B,K,w,D);((G=K.onVnodeUpdated)||X)&&we(()=>{G&&st(G,w,_,h),X&&qt(_,h,w,"updated")},R)},M=(h,_,w,R,D,V,U)=>{for(let F=0;F<_.length;F++){let L=h[F],k=_[F],X=L.el||Mo(L),B=X&&(L.type===Re||!It(L,k)||L.shapeFlag&198)?c(X):w;m(L,k,B,null,R,D,V,U,!0)}},A=(h,_,w,R,D)=>{if(_!==w){if(_!==te)for(let V in _)!Ft(V)&&!(V in w)&&s(h,V,_[V],null,D,R);for(let V in w){if(Ft(V))continue;let U=w[V],F=_[V];U!==F&&V!=="value"&&s(h,V,F,U,D,R)}"value"in w&&s(h,"value",_.value,w.value,D)}},$=(h,_,w,R,D,V,U,F,L)=>{let k=_.el=h?h.el:a(""),X=_.anchor=h?h.anchor:a(""),{patchFlag:B,dynamicChildren:K,slotScopeIds:G}=_;G&&(F=F?F.concat(G):G),h==null?(o(k,w,R),o(X,w,R),T(_.children||[],w,X,D,V,U,F,L)):B>0&&B&64&&K&&h.dynamicChildren&&h.dynamicChildren.length===K.length?(M(h.dynamicChildren,K,w,D,V,U,F),(_.key!=null||D&&_===D.subTree)&&Rl(h,_,!0)):me(h,_,w,X,D,V,U,F,L)},P=(h,_,w,R,D,V,U,F,L)=>{_.slotScopeIds=F,h==null?_.shapeFlag&512?D.ctx.activate(_,w,R,U,L):W(_,w,R,D,V,U,L):j(h,_,L)},W=(h,_,w,R,D,V,U)=>{let F=h.component=hp(h,R,D);if(Rr(h)&&(F.ctx.renderer=Eo),gp(F,!1,U),F.asyncDep){if(D&&D.registerDep(F,ae,U,V),!h.el){let L=F.subTree=ye(xe);O(null,L,_,w),h.placeholder=L.el}}else ae(F,h,_,w,D,V,U)},j=(h,_,w)=>{let R=_.component=h.component;if($v(h,_,w))if(R.asyncDep&&!R.asyncResolved){_.el=h.el,_.placeholder=h.placeholder,pe(R,_,w);return}else R.next=_,R.update();else _.el=h.el,_.placeholder=h.placeholder,R.vnode=_},ae=(h,_,w,R,D,V,U)=>{let F=()=>{if(h.isMounted){let{next:B,bu:K,u:G,parent:fe,vnode:ge}=h;{let dt=sp(h);if(dt){B&&(B.el=ge.el,pe(h,B,U)),dt.asyncDep.then(()=>{let nn=()=>{h.job.flags&8||(D&&D.pendingBranch?we(nn,D):k())};nn.flags=48,we(nn,D)});return}}let de=B,Ce;Zn(h,!1),B?(B.el=ge.el,pe(h,B,U)):B=ge,K&&An(K),(Ce=B.props&&B.props.onVnodeBeforeUpdate)&&st(Ce,fe,B,ge),Zn(h,!0);let $e=Zs(h),Tt=h.subTree;h.subTree=$e,m(Tt,$e,c(Tt.el||Mo(Tt)),us(Tt),h,D,V),B.el=$e.el,de===null&&Ni(h,$e.el),G&&we(G,D),(Ce=B.props&&B.props.onVnodeUpdated)&&we(()=>st(Ce,fe,B,ge),D)}else{let B,{el:K,props:G}=_,{bm:fe,m:ge,parent:de,root:Ce,type:$e}=h,Tt=hn(_);if(Zn(h,!1),fe&&An(fe),!Tt&&(B=G&&G.onVnodeBeforeMount)&&st(B,de,_),Zn(h,!0),K&&ua){let dt=()=>{h.subTree=Zs(h),ua(K,h.subTree,h,D,null)};Tt&&$e.__asyncHydrate?$e.__asyncHydrate(K,h,dt):dt()}else{Ce.ce&&Ce.ce._hasShadowRoot()&&Ce.ce._injectChildStyle($e,h.parent?h.parent.type:void 0);let dt=h.subTree=Zs(h);m(null,dt,w,R,h,D,V),_.el=dt.el}if(ge&&we(ge,D),!Tt&&(B=G&&G.onVnodeMounted)){let dt=_;we(()=>st(B,de,dt),D)}(_.shapeFlag&256||de&&hn(de.vnode)&&de.vnode.shapeFlag&256)&&h.a&&we(h.a,D),h.isMounted=!0,_=w=R=null}};h.scope.on();let L=h.effect=new un(F);h.scope.off();let k=h.update=L.run.bind(L),X=h.job=L.runIfDirty.bind(L);X.i=h,X.id=h.uid,L.scheduler=()=>hi(X),Zn(h,!0),k()},pe=(h,_,w)=>{_.component=h;let R=h.vnode.props;h.vnode=_,h.next=null,Uv(h,_.props,R,w),Wv(h,_.children,w),Ct(),Vu(h),At()},me=(h,_,w,R,D,V,U,F,L=!1)=>{let k=h&&h.children,X=h?h.shapeFlag:0,B=_.children,{patchFlag:K,shapeFlag:G}=_;if(K>0){if(K&128){Le(k,B,w,R,D,V,U,F,L);return}else if(K&256){se(k,B,w,R,D,V,U,F,L);return}}G&8?(X&16&&Zo(k,D,V),B!==k&&u(w,B)):X&16?G&16?Le(k,B,w,R,D,V,U,F,L):Zo(k,D,V,!0):(X&8&&u(w,""),G&16&&T(B,w,R,D,V,U,F,L))},se=(h,_,w,R,D,V,U,F,L)=>{h=h||On,_=_||On;let k=h.length,X=_.length,B=Math.min(k,X),K;for(K=0;K<B;K++){let G=_[K]=L?dn(_[K]):it(_[K]);m(h[K],G,w,null,D,V,U,F,L)}k>X?Zo(h,D,V,!0,!1,B):T(_,w,R,D,V,U,F,L,B)},Le=(h,_,w,R,D,V,U,F,L)=>{let k=0,X=_.length,B=h.length-1,K=X-1;for(;k<=B&&k<=K;){let G=h[k],fe=_[k]=L?dn(_[k]):it(_[k]);if(It(G,fe))m(G,fe,w,null,D,V,U,F,L);else break;k++}for(;k<=B&&k<=K;){let G=h[B],fe=_[K]=L?dn(_[K]):it(_[K]);if(It(G,fe))m(G,fe,w,null,D,V,U,F,L);else break;B--,K--}if(k>B){if(k<=K){let G=K+1,fe=G<X?_[G].el:R;for(;k<=K;)m(null,_[k]=L?dn(_[k]):it(_[k]),w,fe,D,V,U,F,L),k++}}else if(k>K)for(;k<=B;)et(h[k],D,V,!0),k++;else{let G=k,fe=k,ge=new Map;for(k=fe;k<=K;k++){let ht=_[k]=L?dn(_[k]):it(_[k]);ht.key!=null&&ge.set(ht.key,k)}let de,Ce=0,$e=K-fe+1,Tt=!1,dt=0,nn=new Array($e);for(k=0;k<$e;k++)nn[k]=0;for(k=G;k<=B;k++){let ht=h[k];if(Ce>=$e){et(ht,D,V,!0);continue}let Ht;if(ht.key!=null)Ht=ge.get(ht.key);else for(de=fe;de<=K;de++)if(nn[de-fe]===0&&It(ht,_[de])){Ht=de;break}Ht===void 0?et(ht,D,V,!0):(nn[Ht-fe]=k+1,Ht>=dt?dt=Ht:Tt=!0,m(ht,_[Ht],w,null,D,V,U,F,L),Ce++)}let Zc=Tt?Xv(nn):On;for(de=Zc.length-1,k=$e-1;k>=0;k--){let ht=fe+k,Ht=_[ht],ef=_[ht+1],tf=ht+1<X?ef.el||Mo(ef):R;nn[k]===0?m(null,Ht,w,tf,D,V,U,F,L):Tt&&(de<0||k!==Zc[de]?ve(Ht,w,tf,2):de--)}}},ve=(h,_,w,R,D=null)=>{let{el:V,type:U,transition:F,children:L,shapeFlag:k}=h;if(k&6){ve(h.component.subTree,_,w,R);return}if(k&128){h.suspense.move(_,w,R);return}if(k&64){U.move(h,_,w,Eo);return}if(U===Re){o(V,_,w);for(let B=0;B<L.length;B++)ve(L[B],_,w,R);o(h.anchor,_,w);return}if(U===mn){y(h,_,w);return}if(R!==2&&k&1&&F)if(R===0)F.persisted&&!V[yt]?o(V,_,w):(F.beforeEnter(V),o(V,_,w),we(()=>F.enter(V),D));else{let{leave:B,delayLeave:K,afterLeave:G}=F,fe=()=>{h.ctx.isUnmounted?r(V):o(V,_,w)},ge=()=>{let de=V._isLeaving||!!V[yt];V._isLeaving&&V[yt](!0),F.persisted&&!de?fe():B(V,()=>{fe(),G&&G()})};K?K(V,fe,ge):ge()}else o(V,_,w)},et=(h,_,w,R=!1,D=!1)=>{let{type:V,props:U,ref:F,children:L,dynamicChildren:k,shapeFlag:X,patchFlag:B,dirs:K,cacheIndex:G,memo:fe}=h;if((B===-2||k&&k.hasOnce)&&(D=!1),F!=null&&(Ct(),Ro(F,null,w,h,!0),At()),G!=null&&(!h.ctx||h.ctx===_)&&(_.renderCache[G]=void 0),X&256&&_.ctx.deactivate(h))return;let ge=X&1&&K,de=!hn(h),Ce;if(de&&(Ce=U&&U.onVnodeBeforeUnmount)&&st(Ce,_,h),X&6)pm(h.component,w,R);else{if(X&128){h.suspense.unmount(w,R);return}ge&&qt(h,null,_,"beforeUnmount"),X&64?h.type.remove(h,_,w,Eo,R):k&&!k.hasOnce&&(V!==Re||B>0&&B&64)?Zo(k,_,w,!1,!0):(V===Re&&B&384||!D&&X&16)&&Zo(L,_,w),R&&ca(h)}let $e=fe!=null&&G==null;(de&&(Ce=U&&U.onVnodeUnmounted)||ge||$e)&&we(()=>{Ce&&st(Ce,_,h),ge&&qt(h,null,_,"unmounted"),$e&&(h.el=null)},w)},ca=h=>{let{type:_,el:w,anchor:R,transition:D}=h,V=_===Re;if(V&&!D){Yc(w,R);return}if(_===mn){g(h),D&&!D.persisted&&D.afterLeave&&D.afterLeave();return}let U=V?wr(h):h,F=()=>{V?c(w)&&Yc(w,R):r(w),D&&!D.persisted&&D.afterLeave&&D.afterLeave()};if(U&&U.shapeFlag&1&&D&&!D.persisted){let{leave:L,delayLeave:k}=D,X=U.el,B=()=>L(X,F);k?k(X,F,B):B()}else F()},Yc=(h,_)=>{let w;for(;h!==_;)w=p(h),r(h),h=w;r(_)},pm=(h,_,w)=>{let{bum:R,scope:D,job:V,subTree:U,um:F,m:L,a:k}=h;ii(L),ii(k),R&&An(R),D.stop(),V?(V.flags|=8,et(U,h,_,w)):U&&(U.transition=h.vnode.transition,et(U,h,_,w)),F&&we(F,_);let X=()=>{h.isUnmounted=!0};X.flags=16,we(X,_)},Zo=(h,_,w,R=!1,D=!1,V=0)=>{for(let U=V;U<h.length;U++)et(h[U],_,w,R,D)},us=h=>{if(h.shapeFlag&6)return us(h.component.subTree);if(h.shapeFlag&128)return h.suspense.next();let _=p(h.anchor||h.el),w=_&&_[Uu];return w?p(w):_},Qc=(h,_,w)=>{let R=h&&_._vnode?void 0:h&&h.component?h.component.uid:iE();Eg(()=>{h==null?_._vnode&&et(_._vnode,null,null,!0):m(_._vnode||null,h,_,null,null,null,w),_._vnode=h},R)},Eo={p:m,um:et,m:ve,r:ca,mt:W,mc:T,pc:me,pbc:M,n:us,o:e},fa,ua;return t&&([fa,ua]=t(Eo)),{render:Qc,hydrate:fa,createApp:kv(Qc,fa)}}function cl({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Zn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function rp(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Rl(e,t,n=!1){let o=e.children,r=t.children;if(H(o)&&H(r))for(let s=0;s<o.length;s++){let i=o[s],a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=dn(r[s]),a.el=i.el),!n&&a.patchFlag!==-2&&Rl(i,a)),a.type===Vn&&(a.patchFlag===-1&&(a=r[s]=dn(a)),a.el=i.el),a.type===xe&&!a.el&&(a.el=i.el)}}function Xv(e){let t=e.slice(),n=[0],o,r,s,i,a,l=e.length;for(o=0;o<l;o++){let f=e[o];if(f!==0){if(r=n[n.length-1],e[r]<f){t[o]=r,n.push(o);continue}for(s=0,i=n.length-1;s<i;)a=s+i>>1,e[n[a]]<f?s=a+1:i=a;f<e[n[s]]&&(s>0&&(t[o]=n[s-1]),n[s]=o)}}for(s=n.length,i=n[s-1];s-- >0;)n[s]=i,i=t[i];return n}function sp(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:sp(t)}function ii(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Mo(e){if(e.placeholder)return e.placeholder;let t=e.component;if(t)return Mo(t.subTree);let n=e.suspense;return n&&n.activeBranch?Mo(n.activeBranch):null}var ai=e=>e.__isSuspense,gl=0,vl=Symbol("_deferredEnter"),zv={name:"Suspense",__isSuspense:!0,process(e,t,n,o,r,s,i,a,l,f){if(e==null)qv(t,n,o,r,s,i,a,l,f);else{let u=e.suspense;if(s&&s.deps>0&&!s.isHydrating){let c=u.parentComponent;if(!!c&&c.suspense===s&&c.suspenseId!==s.pendingId?s.pendingBranch&&!It(t.ssContent,u.pendingBranch||u.activeBranch):!u.isInFallback){t.suspense=u,u.vnode=t,t.el=e.el;return}}Jv(e,t,n,o,r,i,a,l,f)}},hydrate:Yv,normalize:Qv},Gv=zv;function Cr(e,t){let n=e.props&&e.props[t];ee(n)&&n()}function Cu(e){let t=[];El(e,t,!0),t.length&&Yt(t)}function El(e,t,n){let{el:o,transition:r,children:s,shapeFlag:i}=e;if(i&6){El(e.component.subTree,t,n);return}if(!(i&192)&&(i&1&&(!n&&o&&o[vl]&&(o[vl]=void 0,r&&!r.persisted&&(r.beforeEnter(o),t.push(()=>r.enter(o)))),n=!1),i&16))for(let a=0;a<s.length;a++)El(s[a],t,n)}function qv(e,t,n,o,r,s,i,a,l){let{p:f,o:{createElement:u}}=l,c=u("div"),p=e.suspense=ip(e,r,o,t,c,n,s,i,a,l);f(null,p.pendingBranch=e.ssContent,c,null,o,p,s,i),p.deps>0?(Cr(e,"onPending"),Cr(e,"onFallback"),f(null,e.ssFallback,t,n,o,null,s,i),Po(p,e.ssFallback)):p.resolve(!1,!0)}function Jv(e,t,n,o,r,s,i,a,{p:l,um:f,o:{createElement:u}}){let c=t.suspense=e.suspense;c.vnode=t,t.el=e.el;let p=t.ssContent,d=t.ssFallback,{activeBranch:E,pendingBranch:m,isInFallback:N,isHydrating:O}=c;if(m)c.pendingBranch=p,It(m,p)?(c.deps++,l(m,p,O?n:c.hiddenContainer,null,r,c,s,i,a),c.deps--,c.deps<=0?c.resolve():N&&!O&&!c.isFallbackMountPending&&(l(E,d,n,o,r,null,s,i,a),Po(c,d))):(c.pendingId=gl++,O?(c.isHydrating=!1,c.activeBranch=m):f(m,r,c),c.deps=0,ap(c),c.hiddenContainer=u("div"),N?(l(null,p,c.hiddenContainer,null,r,c,s,i,a),c.deps<=0?c.resolve():c.isFallbackMountPending||(l(E,d,n,o,r,null,s,i,a),Po(c,d))):E&&It(E,p)?(l(E,p,n,o,r,c,s,i,a),c.resolve(!0)):(l(null,p,c.hiddenContainer,null,r,c,s,i,a),c.deps<=0&&c.resolve()));else if(E&&It(E,p))l(E,p,n,o,r,c,s,i,a),Po(c,p);else if(Cr(t,"onPending"),c.pendingBranch=p,c.pendingId=gl++,l(null,p,c.hiddenContainer,null,r,c,s,i,a),c.deps<=0)c.resolve();else{let{timeout:b}=c;b>0?c.timeoutTimer=setTimeout(()=>{c.timeoutTimer=void 0,c.fallback(c.vnode.ssFallback)},b):b===0&&c.fallback(d)}}function ip(e,t,n,o,r,s,i,a,l,f,u=!1){let{p:c,m:p,um:d,n:E,o:{parentNode:m,remove:N}}=f,O,b=Zv(e);b&&t&&t.pendingBranch&&(O=t.pendingId,t.deps++);let v=e.props?wo(e.props.timeout):void 0,y=s,g={vnode:e,parent:t,parentComponent:n,namespace:i,container:o,hiddenContainer:r,deps:0,pendingId:gl++,timeout:typeof v=="number"?v:-1,timeoutTimer:void 0,activeBranch:null,isFallbackMountPending:!1,pendingBranch:null,isInFallback:!u,isHydrating:u,isUnmounted:!1,effects:[],resolve(x=!1,C=!1){let{vnode:S,activeBranch:T,pendingBranch:I,pendingId:M,effects:A,parentComponent:$,container:P,isInFallback:W}=g,j=g.parent;for(;j&&!j.pendingBranch;)j=j.parent;let ae=!1;if(g.isHydrating)g.isHydrating=!1;else if(!x){ae=T&&I.transition&&I.transition.mode==="out-in";let me=!1;ae&&(T.transition.afterLeave=()=>{if(M===g.pendingId&&!g.isUnmounted){Cu(I),p(I,P,s===y&&!me?E(T):s,0);let se=!1;if(j){let Le=P,ve;for(;ve=m(Le);)Le=ve;se=Le===j.hiddenContainer}se||Yt(A),W&&S.ssFallback&&(S.ssFallback.el=null)}}),T&&!g.isFallbackMountPending&&(m(T.el||Mo(T))===P&&(s=E(T),me=!0),d(T,$,g,!0),!ae&&W&&S.ssFallback&&we(()=>S.ssFallback.el=null,g)),ae||(Cu(I),p(I,P,s,0))}clearTimeout(g.timeoutTimer),g.timeoutTimer=void 0,g.isFallbackMountPending=!1,Po(g,I),g.pendingBranch=null,g.isInFallback=!1;let pe=0;for(let me=0;me<A.length;me++){let se=A[me];se.flags&32?Yt(se):A[pe++]=se}if(A.length=pe,j)for(let me=0;me<A.length;me++)j.effects.push(A[me]);else ae||Yt(A);g.effects=[],b&&t&&t.pendingBranch&&O===t.pendingId&&(O=void 0,t.deps--,t.deps===0&&!C&&t.resolve()),Cr(S,"onResolve")},fallback(x){if(g.isUnmounted||!g.pendingBranch)return;let{vnode:C,activeBranch:S,parentComponent:T,container:I,namespace:M}=g;Cr(C,"onFallback");let A=E(S),$=()=>{if(g.isFallbackMountPending=!1,g.isUnmounted||!g.isInFallback)return;let W=g.vnode.ssFallback;c(null,W,I,A,T,null,M,a,l),Po(g,W)},P=x.transition&&x.transition.mode==="out-in";P&&(g.isFallbackMountPending=!0,S.transition.afterLeave=$),g.isInFallback=!0,d(S,T,null,!0),P||$()},move(x,C,S){g.activeBranch&&p(g.activeBranch,x,C,S),g.container=x},next(){return g.activeBranch&&E(g.activeBranch)},registerDep(x,C,S,T){let I=!!g.pendingBranch;I&&g.deps++;let M=x.vnode.el,A=$=>{x.asyncResolved=!0;let{vnode:P}=x;_l(x,$,!1),M&&(P.el=M);let W=!M&&x.subTree.el;C(x,P,m(M||x.subTree.el),M?null:E(x.subTree),g,T,S),W&&(P.placeholder=null,N(W)),Ni(x,P.el)};x.asyncDep.catch($=>(x.scope.active&&ao($,x,0,!1,!0),()=>null)).then($=>{if(x.isUnmounted||g.isUnmounted)return;let P=I&&g.pendingId===x.suspenseId;if(Ir(),!x.scope.active){P&&--g.deps===0&&g.resolve();return}if(!P&&g.pendingBranch){let W=()=>{x.isUnmounted||g.isUnmounted||!x.scope.active||(g.pendingBranch?li(W,g):A($))};W.flags=48,li(W,g);return}A($),P&&--g.deps===0&&g.resolve()})},unmount(x,C){if(g.isUnmounted=!0,clearTimeout(g.timeoutTimer),g.timeoutTimer=void 0,O!==void 0){let S=g.parent,T=O;O=void 0,Yt(()=>{S.pendingId===T&&!S.isUnmounted&&--S.deps===0&&S.resolve()})}g.activeBranch&&d(g.activeBranch,n,x,C),g.pendingBranch&&(d(g.pendingBranch,n,g,C),ap(g))}};return g}function Yv(e,t,n,o,r,s,i,a,l){let f=t.suspense=ip(t,o,n,e.parentNode,document.createElement("div"),null,r,s,i,a,!0),u=l(e,f.pendingBranch=t.ssContent,n,f,s,i);return f.deps===0&&f.resolve(!1,!0),u}function Qv(e){let{shapeFlag:t,children:n}=e,o=t&32;e.ssContent=Au(o?n.default:n),e.ssFallback=o?Au(n.fallback):ye(xe)}function Au(e){let t;if(ee(e)){let n=ro&&e._c;n&&(e._d=!1,Ar()),e=e(),n&&(e._d=!0,t=Ge,Si())}return H(e)&&(e=Al(e)),e=it(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter(n=>n!==e)),e}function ap(e){let{effects:t}=e;for(let n=0;n<t.length;n++){let o=t[n];o.flags&16&&Yt(o)}t.length=0}function li(e,t){t&&t.pendingBranch?H(e)?t.effects.push(...e):t.effects.push(e):Yt(e)}function Po(e,t){e.activeBranch=t;let{vnode:n,parentComponent:o}=e,r=t.el;for(;!r&&t.component;)t=t.component.subTree,r=t.el;n.el=r,o&&o.subTree===n&&(o.vnode.el=r,Ni(o,r))}function Zv(e){let t=e.props&&e.props.suspensible;return t!=null&&t!==!1}var Re=Symbol.for("v-fgt"),Vn=Symbol.for("v-txt"),xe=Symbol.for("v-cmt"),mn=Symbol.for("v-stc"),gn=[],Ge=null;function Ar(e=!1){gn.push(Ge=e?null:[])}function Si(){gn.pop(),Ge=gn[gn.length-1]||null}var ro=1;function Dr(e,t=!1){ro+=e,e<0&&Ge&&t&&(Ge.hasOnce=!0)}function lp(e){return e.dynamicChildren=ro>0?Ge||On:null,Si(),ro>0&&Ge&&Ge.push(e),e}function eE(e,t,n,o,r,s){return lp(Ml(e,t,n,o,r,s,!0))}function ci(e,t,n,o,r){return lp(ye(e,t,n,o,r,!0))}function vn(e){return e?e.__v_isVNode===!0:!1}function It(e,t){return e.type===t.type&&e.key===t.key}var tE;function nE(e){tE=e}var cp=({key:e})=>e??null,ei=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?z(e)||Se(e)||ee(e)?{i:Ke,r:e,k:t,f:!!n}:e:null);function Ml(e,t=null,n=null,o=0,r=null,s=e===Re?0:1,i=!1,a=!1){let l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&cp(t),ref:t&&ei(t),scopeId:mi,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:o,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Ke};return a?(fi(l,n),s&128&&e.normalize(l)):n&&(l.shapeFlag|=z(n)?8:16),ro>0&&!i&&Ge&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&Ge.push(l),l}var ye=oE;function oE(e,t=null,n=null,o=0,r=null,s=!1){if((!e||e===Ku)&&(e=xe),vn(e)){let a=Qt(e,t,!0);return n&&fi(a,n),ro>0&&!s&&Ge&&(a.shapeFlag&6?Ge[Ge.indexOf(e)]=a:Ge.push(a)),a.patchFlag=-2,a}if(uE(e)&&(e=e.__vccOpts),t){t=fp(t);let{class:a,style:l}=t;a&&!z(a)&&(t.class=Gn(a)),ie(l)&&(Yn(l)&&!H(l)&&(l=q({},l)),t.style=zn(l))}let i=z(e)?1:ai(e)?128:vi(e)?64:ie(e)?4:ee(e)?2:0;return Ml(e,t,n,o,r,i,s,!0)}function fp(e){return e?Yn(e)?q({},e):Qu(e)?q({},e[_p]||e):e:null}function Qt(e,t,n=!1,o=!1){let{props:r,ref:s,patchFlag:i,children:a,transition:l}=e,f=t?pp(r||{},t):r,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:f,key:f&&cp(f),ref:t&&t.ref?n&&s?H(s)?s.concat(ei(t)):[s,ei(t)]:ei(t):s,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Re?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Qt(e.ssContent),ssFallback:e.ssFallback&&Qt(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce,cacheIndex:e.cacheIndex};return l&&o&&kt(u,l.clone(u)),u}function Pl(e=" ",t=0){return ye(Vn,null,e,t)}function rE(e,t){let n=ye(mn,null,e);return n.staticCount=t,n}function up(e="",t=!1){return t?(Ar(),ci(xe,null,e)):ye(xe,null,e)}function it(e){return e==null||typeof e=="boolean"?ye(xe):H(e)?ye(Re,null,e.slice()):vn(e)?dn(e):ye(Vn,null,String(e))}function dn(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Qt(e)}function fi(e,t){let n=0,{shapeFlag:o}=e;if(t==null)t=null;else if(H(t))n=16;else if(typeof t=="object")if(o&65){let r=t.default;r&&(r._c&&(r._d=!1),fi(e,r()),r._c&&(r._d=!0));return}else{n=32;let r=t._;!r&&!Qu(t)?t._ctx=Ke:r===3&&Ke&&(Ke.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else if(ee(t)){if(o&65){fi(e,{default:t});return}t={default:t,_ctx:Ke},n=32}else t=String(t),o&64?(n=16,t=[Pl(t)]):n=8;e.children=t,e.shapeFlag|=n}function pp(...e){let t={};for(let n=0;n<e.length;n++){let o=e[n];for(let r in o)if(r==="class")t.class!==o.class&&(t.class=Gn([t.class,o.class]));else if(r==="style")t.style=zn([t.style,o.style]);else if(Wt(r)){let s=t[r],i=o[r];i&&s!==i&&!(H(s)&&s.includes(i))?t[r]=s?[].concat(s,i):i:i==null&&s==null&&!xo(r)&&(t[r]=i)}else r!==""&&(t[r]=o[r])}return t}function st(e,t,n,o=null){bt(e,t,7,[n,o])}var sE=zu(),dp=0;function iE(){return dp}function hp(e,t,n){let o=e.type,r=(t?t.appContext:e.appContext)||sE,s={uid:dp++,vnode:e,type:o,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Jn(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Bv(o,r),emitsOptions:Mv(o,r),emit:null,emitted:null,propsDefaults:te,inheritAttrs:o.inheritAttrs,ctx:te,data:te,props:te,attrs:te,slots:te,refs:te,setupState:te,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=Rv.bind(null,s),e.ce&&e.ce(s),s}var We=null,qe=()=>We||Ke,ui,Rn;{let e=fr(),t=(n,o)=>{let r;return(r=e[n])||(r=e[n]=[]),r.push(o),s=>{r.length>1?r.forEach(i=>i(s)):r[0](s)}};ui=t("__VUE_INSTANCE_SETTERS__",n=>We=n),Rn=t("__VUE_SSR_SETTERS__",n=>so=n)}var xi=e=>{let t=We;return ui(e),e.scope.on(),()=>{e.scope.off(),ui(t)}},Ir=()=>{We&&We.scope.off(),ui(null)};function mp(e){return e.vnode.shapeFlag&4}var so=!1;function gp(e,t=!1,n=!1){t&&Rn(t);let{props:o,children:r}=e.vnode,s=mp(e);Fv(e,o,s,t),jv(e,r,n||t);let i=s?aE(e,t):void 0;return t&&Rn(!1),i}function aE(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,dl);let{setup:o}=n;if(o){Ct();let r=e.setupContext=o.length>1?yp(e):null,s=xi(e),i=io(o,e,0,[e.props,r]),a=Cs(i);if(At(),s(),(a||e.sp)&&!hn(e)&&ju(e),a){if(i.then(Ir,Ir),t)return i.then(l=>{Rn(!0);try{_l(e,l,t)}finally{Rn(!1)}}).catch(l=>{ao(l,e,0,void 0,!0),e.ssrRender=(f,u)=>u("<!---->")});e.asyncDep=i}else _l(e,i,t)}else Ep(e,t)}function _l(e,t,n){ee(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:ie(t)&&(e.setupState=_r(t)),Ep(e,n)}var pi,yl;function Ll(e){pi=e,yl=t=>{t.render._rc&&(t.withProxy=new Proxy(t.ctx,vv))}}var vp=()=>!pi;function Ep(e,t,n){let o=e.type;if(!e.render){if(!t&&pi&&!o.render){let r=o.template||!1;if(r){let{isCustomElement:s,compilerOptions:i}=e.appContext.config,{delimiters:a,compilerOptions:l}=o,f=q(q({isCustomElement:s,delimiters:a},i),l);o.render=pi(r,f)}}e.render=o.render||Ie,yl&&yl(e)}}var _p=Symbol(),lE={get(e,t){return je(e,"get",""),t===_p?e:e[t]}};function yp(e){let t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,lE),slots:e.slots,emit:e.emit,expose:t}}function Lr(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(_r(js(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Sr)return Sr[n](e)},has(t,n){return n in t||n in Sr}})):e.proxy}var cE=/(?:^|[-_])\w/g,fE=e=>e.replace(cE,t=>t.toUpperCase()).replace(/[-_]/g,"");function di(e,t=!0){return ee(e)?e.displayName||e.name:e.name||t&&e.__name}function bp(e,t,n=!1){let o=di(t);if(!o&&t.__file){let r=t.__file.match(/([^/\\]+)\.\w+$/);r&&(o=r[1])}if(!o&&e){let r=s=>{for(let i in s)if(s[i]===t)return i};o=r(e.components)||e.parent&&r(e.parent.type.components)||r(e.appContext.components)}return o?fE(o):n?"App":"Anonymous"}function uE(e){return ee(e)&&"__vccOpts"in e}var Ue=(e,t)=>du(e,t,so);function $l(e,t,n){try{Dr(-1);let o=arguments.length;return o===2?ie(t)&&!H(t)?vn(t)?ye(e,null,[t]):ye(e,t):ye(e,null,t):(o>3?n=Array.prototype.slice.call(arguments,2):o===3&&vn(n)&&(n=[n]),ye(e,t,n))}finally{Dr(1)}}function Np(){return;function s(c){let p=[];c.type.props&&c.props&&p.push(i("props",Q(c.props))),c.setupState!==te&&p.push(i("setup",c.setupState)),c.data!==te&&p.push(i("data",Q(c.data)));let d=l(c,"computed");d&&p.push(i("computed",d));let E=l(c,"inject");return E&&p.push(i("injected",E)),p.push(["div",{},["span",{style:o.style+";opacity:0.66"},"$ (internal): "],["object",{object:c}]]),p}function i(c,p){return p=q({},p),Object.keys(p).length?["div",{style:"line-height:1.25em;margin-bottom:0.6em"},["div",{style:"color:#476582"},c],["div",{style:"padding-left:1.25em"},...Object.keys(p).map(d=>["div",{},["span",o,d+": "],a(p[d],!1)])]]:["span",{}]}function a(c,p=!0){return typeof c=="number"?["span",t,c]:typeof c=="string"?["span",n,JSON.stringify(c)]:typeof c=="boolean"?["span",o,c]:ie(c)?["object",{object:p?Q(c):c}]:["span",n,String(c)]}function l(c,p){let d=c.type;if(ee(d))return;let E={};for(let m in c.ctx)f(d,m,p)&&(E[m]=c.ctx[m]);return E}function f(c,p,d){let E=c[d];if(H(E)&&E.includes(p)||ie(E)&&p in E||c.extends&&f(c.extends,p,d)||c.mixins&&c.mixins.some(m=>f(m,p,d)))return!0}function u(c){return Fe(c)?"ShallowRef":c.effect?"ComputedRef":"Ref"}}function pE(e,t,n,o){let r=n[o];if(r&&Sp(r,e))return r;let s=t();return s.memo=e.slice(),s.cacheIndex=o,n[o]=s}function Sp(e,t){let n=e.memo;if(n.length!=t.length)return!1;for(let o=0;o<n.length;o++)if(ke(n[o],t[o]))return!1;return ro>0&&Ge&&Ge.push(e),!0}var xp="3.5.46",Ti=Ie,dE=mg,hE=ko,mE=Mu,gE={createComponentInstance:hp,setupComponent:gp,renderComponentRoot:Zs,setCurrentRenderingInstance:Tr,isVNode:vn,normalizeVNode:it,getComponentPublicInstance:Lr,ensureValidVNode:Cl,pushWarningContext:ag,popWarningContext:lg},vE=gE,EE=null,_E=null,yE=null;var jl,Tp=typeof window<"u"&&window.trustedTypes;if(Tp)try{jl=Tp.createPolicy("vue",{createHTML:e=>e})}catch{}var Xp=jl?e=>jl.createHTML(e):e=>e,bE="http://www.w3.org/2000/svg",NE="http://www.w3.org/1998/Math/MathML",_n=typeof document<"u"?document:null,wp=_n&&_n.createElement("template"),zp={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,o)=>{let r=t==="svg"?_n.createElementNS(bE,e):t==="mathml"?_n.createElementNS(NE,e):n?_n.createElement(e,{is:n}):_n.createElement(e);return e==="select"&&o&&o.multiple!=null&&r.setAttribute("multiple",o.multiple),r},createText:e=>_n.createTextNode(e),createComment:e=>_n.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>_n.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,o,r,s){let i=n?n.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),!(r===s||!(r=r.nextSibling)););else{wp.innerHTML=Xp(o==="svg"?`<svg>${e}</svg>`:o==="mathml"?`<math>${e}</math>`:e);let a=wp.content;if(o==="svg"||o==="mathml"){let l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Mn="transition",$r="animation",$o=Symbol("_vtc"),Gp={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},qp=q({},_i,Gp),SE=e=>(e.displayName="Transition",e.props=qp,e),xE=SE((e,{slots:t})=>$l(Nl,Jp(e),t)),lo=(e,t=[])=>{H(e)?e.forEach(n=>n(...t)):e&&e(...t)},Op=e=>e?H(e)?e.some(t=>t.length>1):e.length>1:!1;function Jp(e){let t={};for(let A in e)A in Gp||(t[A]=e[A]);if(e.css===!1)return t;let{name:n="v",type:o,duration:r,enterFromClass:s=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:a=`${n}-enter-to`,appearFromClass:l=s,appearActiveClass:f=i,appearToClass:u=a,leaveFromClass:c=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:d=`${n}-leave-to`}=e,E=TE(r),m=E&&E[0],N=E&&E[1],{onBeforeEnter:O,onEnter:b,onEnterCancelled:v,onLeave:y,onLeaveCancelled:g,onBeforeAppear:x=O,onAppear:C=b,onAppearCancelled:S=v}=t,T=(A,$,P,W)=>{A._enterResolve=void 0,A._enterCancelled=W,Pn(A,$?u:a),Pn(A,$?f:i),P&&P()},I=(A,$)=>{A._leaveResolve=void 0,A._isLeaving=!1,Pn(A,c),Pn(A,d),Pn(A,p),$&&$()},M=A=>($,P)=>{let W=A?C:b,j=()=>{$._enterResolve===j&&T($,A,P)};$._enterResolve=j,lo(W,[$,j]),Cp(()=>{Pn($,A?l:s),$._enterResolve===j&&(Zt($,A?u:a),Op(W)||Ap($,o,m,j))})};return q(t,{onBeforeEnter(A){lo(O,[A]),Zt(A,s),Zt(A,i)},onBeforeAppear(A){lo(x,[A]),Zt(A,l),Zt(A,f)},onEnter:M(!1),onAppear:M(!0),onLeave(A,$){A._isLeaving=!0;let P=()=>{A._leaveResolve===P&&I(A,$)};A._leaveResolve=P,Zt(A,c),A._enterCancelled?(Zt(A,p),Wl(A)):(Wl(A),Zt(A,p)),Cp(()=>{A._leaveResolve===P&&(Pn(A,c),Zt(A,d),Op(y)||Ap(A,o,N,P))}),lo(y,[A,P])},onEnterCancelled(A){T(A,!1,void 0,!0),lo(v,[A])},onAppearCancelled(A){T(A,!0,void 0,!0),lo(S,[A])},onLeaveCancelled(A){I(A),lo(g,[A])}})}function TE(e){if(e==null)return null;if(ie(e))return[Fl(e.enter),Fl(e.leave)];{let t=Fl(e);return[t,t]}}function Fl(e){return wo(e)}function Zt(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e[$o]||(e[$o]=new Set)).add(t)}function Pn(e,t){t.split(/\s+/).forEach(o=>o&&e.classList.remove(o));let n=e[$o];n&&(n.delete(t),n.size||(e[$o]=void 0))}function Cp(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}var wE=0;function Ap(e,t,n,o){let r=e._endId=++wE,s=()=>{r===e._endId&&o()};if(n!=null)return setTimeout(s,n);let{type:i,timeout:a,propCount:l}=Yp(e,t);if(!i)return o();let f=i+"end",u=0,c=()=>{e.removeEventListener(f,p),s()},p=d=>{d.target===e&&++u>=l&&c()};setTimeout(()=>{u<l&&c()},a+1),e.addEventListener(f,p)}function Yp(e,t){let n=window.getComputedStyle(e),o=E=>(n[E]||"").split(", "),r=o(`${Mn}Delay`),s=o(`${Mn}Duration`),i=Dp(r,s),a=o(`${$r}Delay`),l=o(`${$r}Duration`),f=Dp(a,l),u=null,c=0,p=0;t===Mn?i>0&&(u=Mn,c=i,p=s.length):t===$r?f>0&&(u=$r,c=f,p=l.length):(c=Math.max(i,f),u=c>0?i>f?Mn:$r:null,p=u?u===Mn?s.length:l.length:0);let d=u===Mn&&/\b(?:transform|all)(?:,|$)/.test(o(`${Mn}Property`).toString());return{type:u,timeout:c,propCount:p,hasTransform:d}}function Dp(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,o)=>Ip(n)+Ip(e[o])))}function Ip(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function Wl(e){return(e?e.ownerDocument:document).body.offsetHeight}function OE(e,t,n){let o=e[$o];o&&(t=(t?[t,...o]:[...o]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}var Ai=Symbol("_vod"),Gl=Symbol("_vsh"),Qp={name:"show",beforeMount(e,{value:t},{transition:n}){e[Ai]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):Fr(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:o}){!t!=!n&&(o?t?(o.beforeEnter(e),Fr(e,!0),o.enter(e)):o.leave(e,()=>{Fr(e,!1)}):Fr(e,t))},beforeUnmount(e,{value:t}){Fr(e,t)}};function Fr(e,t){e.style.display=t?e[Ai]:"none",e[Gl]=!t}function CE(){Qp.getSSRProps=({value:e})=>{if(!e)return{style:{display:"none"}}}}var Zp=Symbol("");function AE(e){let t=qe();if(!t)return;let n=(s=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(i=>Di(i,s))},o={uid:String(t.uid),update:n};Ao(()=>o.update=void 0),t.ut=(s,i)=>{s&&(s[Fo]=[i,o],ed(s),Kl(s)),n()};let r=()=>{let s=e(t.proxy);t.ce?Di(t.ce,s):Xl(t.subTree,s),n(s)};xl(()=>{Yt(r)}),Mr(()=>{Lo(r,Ie,{flush:"post"});let s=new MutationObserver(r);s.observe(t.subTree.el.parentNode,{childList:!0}),Pr(()=>s.disconnect())})}var Fo=Symbol("");function Kl(e,t){let[n,o]=e[Fo],r;if(o.update)for(let s=e;s&&s!==n;s=s.nextSibling)s.nodeType===1&&(!t||(t===!0||t.has(s))&&(s.getAttribute("data-v-owner")||o.uid)===o.uid)&&(s.setAttribute("data-v-owner",o.uid),r=o.update);return r}function ed(e){let t=e.parentNode;if(t){let n=t[Fo];n||(n=t[Fo]=new Set,new MutationObserver(DE).observe(t,{childList:!0})),n.add(e)}}function DE(e,t){let n=e[0].target,o=n[Fo],r=new Set;for(let{addedNodes:i}of e)i.forEach(a=>r.add(a));let s=new Set;o.forEach(i=>{i.parentNode!==n?(o.delete(i),ed(i),s.add(Kl(i,!0))):r.size&&s.add(Kl(i,r))}),s.forEach(i=>i&&i()),o.size||(t.disconnect(),n[Fo]=void 0)}function Xl(e,t){if(e.shapeFlag&128){let n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push(()=>{Xl(n.activeBranch,t)})}for(;e.component;)e=e.component.subTree;if(e.shapeFlag&1&&e.el)Di(e.el,t);else if(e.type===Re)e.children.forEach(n=>Xl(n,t));else if(e.type===mn){let{el:n,anchor:o}=e;for(;n&&(Di(n,t),n!==o);)n=n.nextSibling}}function Di(e,t){if(e.nodeType===1){let n=e.style,o="";for(let r in t){let s=Ba(t[r]);n.setProperty(`--${r}`,s),o+=`--${r}: ${s};`}n[Zp]=o}}var IE=/(?:^|;)\s*display\s*:/;function kE(e,t,n){let o=e.style,r=z(n),s=!1;if(n&&!r){if(t)if(z(t))for(let i of t.split(";")){let a=i.slice(0,i.indexOf(":")).trim();n[a]==null&&Ur(o,a,"")}else for(let i in t)n[i]==null&&Ur(o,i,"");for(let i in n){i==="display"&&(s=!0);let a=n[i];a!=null?RE(e,i,!z(t)&&t?t[i]:void 0,a)||Ur(o,i,a):Ur(o,i,"")}}else if(r){if(t!==n){let i=o[Zp];i&&(n+=";"+i),o.cssText=n,s=IE.test(n)}}else t&&e.removeAttribute("style");Ai in e&&((!r||t!==n)&&(e[Ai]=s?o.display:""),e[Gl]&&(o.display="none"))}var wi=/\s*!important$/;function Ur(e,t,n){if(H(n))n.forEach(o=>Ur(e,t,o));else if(n==null&&(n=""),t.startsWith("--"))wi.test(n)?e.setProperty(t,n.replace(wi,""),"important"):e.setProperty(t,n);else{let o=VE(e,t);wi.test(n)?e.setProperty(ze(o),n.replace(wi,""),"important"):e[o]=n}}var kp=["Webkit","Moz","ms"],Ul={};function VE(e,t){let n=Ul[t];if(n)return n;let o=ce(t);if(o!=="filter"&&o in e)return Ul[t]=o;o=Ot(o);for(let r=0;r<kp.length;r++){let s=kp[r]+o;if(s in e)return Ul[t]=s}return t}function RE(e,t,n,o){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&z(o)&&n===o}var Vp="http://www.w3.org/1999/xlink";function Rp(e,t,n,o,r,s=$f(t)){o&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Vp,t.slice(6,t.length)):e.setAttributeNS(Vp,t,n):n==null||s&&!Is(n)?e.removeAttribute(t):e.setAttribute(t,s?"":De(n)?String(n):n)}function Mp(e,t,n,o,r){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?Xp(n):n);return}let s=e.tagName;if(t==="value"&&s!=="PROGRESS"&&!s.includes("-")){let a=s==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let i=!1;if(n===""||n==null){let a=typeof e[t];a==="boolean"?n=Is(n):n==null&&a==="string"?(n="",i=!0):a==="number"&&(n=0,i=!0)}try{e[t]=n}catch{}i&&e.removeAttribute(r||t)}function yn(e,t,n,o){e.addEventListener(t,n,o)}function ME(e,t,n,o){e.removeEventListener(t,n,o)}var Pp=Symbol("_vei");function PE(e,t,n,o,r=null){let s=e[Pp]||(e[Pp]={}),i=s[t];if(o&&i)i.value=o;else{let[a,l]=FE(t);if(o){let f=s[t]=HE(o,r);yn(e,a,f,l)}else i&&(ME(e,a,i,l),s[t]=void 0)}}var LE=/(Once|Passive|Capture)$/,$E=/^on:?(?:Once|Passive|Capture)$/;function FE(e){let t,n;for(;(n=e.match(LE))&&!$E.test(e);)t||(t={}),e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===":"?e.slice(3):ze(e.slice(2)),t]}var Bl=0,UE=Promise.resolve(),BE=()=>Bl||(UE.then(()=>Bl=0),Bl=Date.now());function HE(e,t){let n=o=>{if(!o._vts)o._vts=Date.now();else if(o._vts<=n.attached)return;let r=n.value;if(H(r)){let s=o.stopImmediatePropagation;o.stopImmediatePropagation=()=>{s.call(o),o._stopped=!0};let i=r.slice(),a=[o];for(let l=0;l<i.length&&!o._stopped;l++){let f=i[l];f&&bt(f,t,5,a)}}else bt(r,t,5,[o])};return n.value=e,n.attached=BE(),n}var Lp=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,td=(e,t,n,o,r,s)=>{let i=r==="svg";t==="class"?OE(e,o,i):t==="style"?kE(e,n,o):Wt(t)?xo(t)||PE(e,t,n,o,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):jE(e,t,o,i))?(Mp(e,t,o),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Rp(e,t,o,i,s,t!=="value")):e._isVueCE&&(WE(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!z(o)))?Mp(e,ce(t),o,s,t):(t==="true-value"?e._trueValue=o:t==="false-value"&&(e._falseValue=o),Rp(e,t,o,i))};function jE(e,t,n,o){if(o)return!!(t==="innerHTML"||t==="textContent"||t in e&&Lp(t)&&ee(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){let r=e.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Lp(t)&&z(n)?!1:t in e}function WE(e,t){let n=e._def.props;if(!n)return!1;let o=ce(t);return Array.isArray(n)?n.some(r=>ce(r)===o):Object.keys(n).some(r=>ce(r)===o)}var $p={};function nd(e,t,n){let o=at(e,t);To(o)&&(o=q({},o,t));class r extends Ii{constructor(i){super(o,i,n)}}return r.def=o,r}var KE=((e,t)=>nd(e,t,hd)),XE=typeof HTMLElement<"u"?HTMLElement:class{},Ii=class e extends XE{constructor(t,n={},o=Hr){super(),this._def=t,this._props=n,this._createApp=o,this._isVueCE=!0,this._instance=null,this._app=null,this._nonce=this._def.nonce,this._connected=!1,this._resolved=!1,this._patching=!1,this._dirty=!1,this._numberProps=null,this._styleChildren=new WeakSet,this._styleAnchors=new WeakMap,this._ob=null,this.shadowRoot&&o!==Hr?this._root=this.shadowRoot:t.shadowRoot!==!1?(this.attachShadow(q({},t.shadowRootOptions,{mode:"open"})),this._root=this.shadowRoot):this._root=this}connectedCallback(){if(!this.isConnected)return;!this.shadowRoot&&!this._resolved&&this._parseSlots(),this._connected=!0;let t=this;for(;t=t&&(t.assignedSlot||t.parentNode||t.host);)if(t instanceof e){this._parent=t;break}this._instance||(this._resolved?this._mount(this._def):t&&t._pendingResolve?this._pendingResolve=t._pendingResolve.then(()=>{if(this._pendingResolve=void 0,this.isConnected)return this._resolveDef()}):this._resolveDef())}_setParent(t=this._parent){t&&(this._instance.parent=t._instance,this._inheritParentContext(t))}_inheritParentContext(t=this._parent){t&&this._app&&Object.setPrototypeOf(this._app._context.provides,t._instance.provides)}disconnectedCallback(){this._connected=!1,kr(()=>{this._connected||(this._ob&&(this._ob.disconnect(),this._ob=null),this._app&&this._app.unmount(),this._instance&&(this._instance.ce=void 0),this._app=this._instance=null,this._teleportTargets&&(this._teleportTargets.clear(),this._teleportTargets=void 0))})}_processMutations(t){for(let n of t)this._setAttr(n.attributeName)}_resolveDef(){if(this._pendingResolve)return this._pendingResolve;for(let o=0;o<this.attributes.length;o++)this._setAttr(this.attributes[o].name);this._ob=new MutationObserver(this._processMutations.bind(this)),this._ob.observe(this,{attributes:!0});let t=(o,r=!1)=>{this._resolved=!0,this._pendingResolve=void 0;let{props:s,styles:i}=o,a;if(s&&!H(s))for(let l in s){let f=s[l];(f===Number||f&&f.type===Number)&&(l in this._props&&(this._props[l]=wo(this._props[l])),(a||(a=Object.create(null)))[ce(l)]=!0)}this._numberProps=a,this._resolveProps(o),this.shadowRoot&&this._applyStyles(i),this._connected&&this._mount(o)},n=this._def.__asyncLoader;if(n)return this._pendingResolve=n().then(o=>{o.configureApp=this._def.configureApp,t(this._def=o,!0)}),this._pendingResolve;t(this._def)}_mount(t){this._app=this._createApp(t),this._inheritParentContext(),t.configureApp&&t.configureApp(this._app),this._app._ceVNode=this._createVNode(),this._app.mount(this._root);let n=this._instance&&this._instance.exposed;if(n)for(let o in n)le(this,o)||Object.defineProperty(this,o,{get:()=>Qn(n[o])})}_resolveProps(t){let{props:n}=t,o=H(n)?n:Object.keys(n||{});for(let r of Object.keys(this))r[0]!=="_"&&o.includes(r)&&this._setProp(r,this[r]);for(let r of o.map(ce))Object.defineProperty(this,r,{get(){return this._getProp(r)},set(s){this._setProp(r,s,!0,!this._patching)}})}_setAttr(t){if(t.startsWith("data-v-"))return;let n=this.hasAttribute(t),o=n?this.getAttribute(t):$p,r=ce(t);n&&this._numberProps&&this._numberProps[r]&&(o=wo(o)),this._setProp(r,o,!1,!0)}_getProp(t){return this._props[t]}_setProp(t,n,o=!0,r=!1){if(n!==this._props[t]&&(this._dirty=!0,n===$p?delete this._props[t]:(this._props[t]=n,t==="key"&&this._app&&(this._app._ceVNode.key=n)),r&&this._instance&&this._update(),o)){let s=this._ob;s&&(this._processMutations(s.takeRecords()),s.disconnect()),n===!0?this.setAttribute(ze(t),""):typeof n=="string"||typeof n=="number"?this.setAttribute(ze(t),n+""):n||this.removeAttribute(ze(t)),s&&s.observe(this,{attributes:!0})}}_update(){let t=this._createVNode();this._app&&(t.appContext=this._app._context),dd(t,this._root)}_createVNode(){let t={};this.shadowRoot||(t.onVnodeMounted=t.onVnodeUpdated=this._renderSlots.bind(this));let n=ye(this._def,q(t,this._props));return this._instance||(n.ce=o=>{this._instance=o,o.ce=this,o.isCE=!0;let r=(s,i)=>{this.dispatchEvent(new CustomEvent(s,To(i[0])?q({detail:i},i[0]):{detail:i}))};o.emit=(s,...i)=>{r(s,i),ze(s)!==s&&r(ze(s),i)},this._setParent()}),n}_applyStyles(t,n,o){if(!t)return;if(n){if(n===this._def||this._styleChildren.has(n))return;this._styleChildren.add(n)}let r=this._nonce,s=this.shadowRoot,i=o?this._getStyleAnchor(o)||this._getStyleAnchor(this._def):this._getRootStyleInsertionAnchor(s),a=null;for(let l=t.length-1;l>=0;l--){let f=document.createElement("style");r&&f.setAttribute("nonce",r),f.textContent=t[l],s.insertBefore(f,a||i),a=f,l===0&&(o||this._styleAnchors.set(this._def,f),n&&this._styleAnchors.set(n,f))}}_getStyleAnchor(t){if(!t)return null;let n=this._styleAnchors.get(t);return n&&n.parentNode===this.shadowRoot?n:(n&&this._styleAnchors.delete(t),null)}_getRootStyleInsertionAnchor(t){for(let n=0;n<t.childNodes.length;n++){let o=t.childNodes[n];if(!(o instanceof HTMLStyleElement))return o}return null}_parseSlots(){let t=this._slots={},n;for(;n=this.firstChild;){let o=n.nodeType===1&&n.getAttribute("slot")||"default";(t[o]||(t[o]=[])).push(n),this.removeChild(n)}}_renderSlots(){let t=this._getSlots(),n=this._instance.type.__scopeId;for(let o=0;o<t.length;o++){let r=t[o],s=r.getAttribute("name")||"default",i=this._slots[s],a=r.parentNode;if(i)for(let l of i){if(n&&l.nodeType===1){let f=n+"-s",u=document.createTreeWalker(l,1);l.setAttribute(f,"");let c;for(;c=u.nextNode();)c.setAttribute(f,"")}a.insertBefore(l,r)}else for(;r.firstChild;)a.insertBefore(r.firstChild,r);a.removeChild(r)}}_getSlots(){let t=[this];this._teleportTargets&&t.push(...this._teleportTargets);let n=new Set;for(let o of t){let r=o.querySelectorAll("slot");for(let s=0;s<r.length;s++)n.add(r[s])}return Array.from(n)}_injectChildStyle(t,n){this._applyStyles(t.styles,t,n)}_beginPatch(){this._patching=!0,this._dirty=!1}_endPatch(){this._patching=!1,this._dirty&&this._instance&&this._update()}_hasShadowRoot(){return this._def.shadowRoot!==!1}_removeChildStyle(t){}};function od(e){let t=qe(),n=t&&t.ce;return n||null}function zE(){let e=od();return e&&e.shadowRoot}function GE(e="$style"){{let t=qe();if(!t)return te;let n=t.type.__cssModules;if(!n)return te;let o=n[e];return o||te}}var rd=new WeakMap,sd=new WeakMap,ki=Symbol("_moveCb"),Fp=Symbol("_enterCb"),zl=new WeakMap,qE=e=>(delete e.props.mode,e),JE=qE({name:"TransitionGroup",props:q({},qp,{tag:String,moveClass:String}),setup(e,{slots:t}){let n=qe(),o=Ei(),r,s,i,a,l=()=>(a===void 0&&(a=r.length>0&&r_(r[0].el,n.vnode.el,Up(e))),a);return yi(()=>{if(zl.delete(n),!l()){r=[],i=void 0;return}let f=Up(e);r.forEach(QE);let u=i&&o_(i,n.vnode.el);i=void 0,r.forEach(p=>ZE(p,u));let c=r.filter(e_);Wl(n.vnode.el),c.forEach(p=>{let d=p.el,E=d.style;Zt(d,f),E.transform=E.webkitTransform=E.transitionDuration="";let m=d[ki]=N=>{N&&N.target!==d||(!N||N.propertyName.endsWith("transform"))&&(d.removeEventListener("transitionend",m),d[ki]=null,Pn(d,f))};d.addEventListener("transitionend",m)}),r=[]}),()=>{let f=Q(e),u=Jp(f),c=f.tag||Re;if(r=[],a=void 0,s)for(let p=0;p<s.length;p++){let d=s[p];d.el&&d.el instanceof Element&&!d.el[Gl]&&(r.push(d),kt(d,oo(d,u,o,n)),rd.set(d,Ri(d.el)))}s=t.default?Vr(t.default()):[];for(let p=0;p<s.length;p++){let d=s[p];d.key!=null&&kt(d,oo(d,u,o,n))}return r.length&&(i=t_(n),zl.set(n,l)),ye(c,null,s)}}}),YE=JE;function QE(e){let t=e.el;t[ki]&&t[ki](),t[Fp]&&t[Fp]()}function Up(e){return e.moveClass||`${e.name||"v"}-move`}function ZE(e,t){sd.set(e,Ri(e.el,t))}function e_(e){let t=rd.get(e),n=sd.get(e),o=t.left-n.left,r=t.top-n.top;if(o||r){let s=e.el,i=s.style,a=s.getBoundingClientRect(),l=1,f=1;return s.offsetWidth&&(l=a.width/s.offsetWidth),s.offsetHeight&&(f=a.height/s.offsetHeight),(!Number.isFinite(l)||l===0)&&(l=1),(!Number.isFinite(f)||f===0)&&(f=1),Math.abs(l-1)<.01&&(l=1),Math.abs(f-1)<.01&&(f=1),i.transform=i.webkitTransform=`translate(${o/l}px,${r/f}px)`,i.transitionDuration="0s",e}}function Ri(e,t){let n=e.getBoundingClientRect();return{left:n.left-(t?t.left:0),top:n.top-(t?t.top:0)}}function t_(e){let t;for(let n=e.parent;n;n=n.parent){let o=zl.get(n);if(o){let r=n_(n.vnode.el,e.vnode.el);r&&(t||(t=[])).push(q(Ri(r),{item:r,willMove:o}))}}return t}function n_(e,t){let n=e.nodeType===1?e:e.parentNode;for(;t&&t.parentNode!==n;)t=t.parentNode;if(t&&t.nodeType===1)return t}function o_(e,t){let n=e.find(o=>o.willMove()&&o.item.contains(t));return n&&Ri(n.item,n)}function r_(e,t,n){let o=e.cloneNode(),r=e[$o];r&&r.forEach(a=>{a.split(/\s+/).forEach(l=>l&&o.classList.remove(l))}),n.split(/\s+/).forEach(a=>a&&o.classList.add(a)),o.style.display="none";let s=t.nodeType===1?t:t.parentNode;s.appendChild(o);let{hasTransform:i}=Yp(o);return s.removeChild(o),i}var Ln=e=>{let t=e.props["onUpdate:modelValue"]||!1;return H(t)?n=>An(t,n):t};function s_(e){e.target.composing=!0}function Bp(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}var Nt=Symbol("_assign"),Oi=Symbol("_initialValue");function Hl(e,t,n){return t&&(e=e.trim()),n&&(e=Xn(e)),e}var Vi={created(e,{modifiers:{lazy:t,trim:n,number:o}},r){e.parentNode&&(e.type==="text"?e[Oi]=e.defaultValue.replace(/[\r\n]/g,""):e.type==="textarea"&&(e[Oi]=e.defaultValue.replace(/\r\n?/g,`
`))),e[Nt]=Ln(r);let s=o||r.props&&r.props.type==="number";yn(e,t?"change":"input",i=>{i.target.composing||e[Nt](Hl(e.value,n,s))}),(n||s)&&yn(e,"change",()=>{e.value=Hl(e.value,n,s)}),t||(yn(e,"compositionstart",s_),yn(e,"compositionend",Bp),yn(e,"change",Bp))},mounted(e,{value:t,modifiers:{trim:n,number:o}}){let r=t??"",s=e[Oi];delete e[Oi],s!==void 0&&(e.type==="text"||e.type==="textarea")&&e.value!==s?e[Nt](Hl(e.value,n,o)):e.value=r},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:o,trim:r,number:s}},i){if(e[Nt]=Ln(i),e.composing)return;let a=(s||e.type==="number")&&!/^0\d/.test(e.value)?Xn(e.value):e.value,l=t??"";if(a===l)return;let f=e.getRootNode();(f instanceof Document||f instanceof ShadowRoot)&&f.activeElement===e&&e.type!=="range"&&(o&&t===n||r&&e.value.trim()===l)||(e.value=l)}},ql={deep:!0,created(e,t,n){e[Nt]=Ln(n),yn(e,"change",()=>{let o=e._modelValue,r=Uo(e),s=e.checked,i=e[Nt];if(H(o)){let a=ur(o,r),l=a!==-1;if(s&&!l)i(o.concat(r));else if(!s&&l){let f=[...o];f.splice(a,1),i(f)}}else if(wt(o)){let a=new Set(o);s?a.add(r):a.delete(r),i(a)}else i(ad(e,s))})},mounted:Hp,beforeUpdate(e,t,n){e[Nt]=Ln(n),Hp(e,t,n)}};function Hp(e,{value:t,oldValue:n},o){e._modelValue=t;let r;if(H(t))r=ur(t,o.props.value)>-1;else if(wt(t))r=t.has(o.props.value);else{if(t===n)return;r=rt(t,ad(e,!0))}e.checked!==r&&(e.checked=r)}var Jl={created(e,{value:t},n){e.checked=rt(t,n.props.value),e[Nt]=Ln(n),yn(e,"change",()=>{e[Nt](Uo(e))})},beforeUpdate(e,{value:t,oldValue:n},o){e[Nt]=Ln(o),t!==n&&(e.checked=rt(t,o.props.value))}},id={deep:!0,created(e,{value:t,modifiers:{number:n}},o){e._modelValue=t,yn(e,"change",()=>{let r=Array.prototype.filter.call(e.options,l=>l.selected).map(l=>n?Xn(Uo(l)):Uo(l)),s=e.multiple,i=s?wt(e._modelValue)?new Set(r):r:r[0],a=e._pendingValue=[s,s?H(i)?r.slice():r:i];try{e[Nt](i)}finally{kr(()=>{e._pendingValue===a&&(e._pendingValue=void 0)})}}),e[Nt]=Ln(o)},mounted(e,{value:t,modifiers:{number:n}}){jp(e,t,n)},beforeUpdate(e,{value:t},n){e._modelValue=t,e[Nt]=Ln(n)},updated(e,{value:t,modifiers:{number:n}}){let o=e._pendingValue;e._pendingValue=void 0,(!o||o[0]!==e.multiple||!i_(t,o[1],o[0]))&&jp(e,t,n)}};function i_(e,t,n){if(!n)return rt(e,t);if(H(e))return rt(e,t);if(wt(e)){if(e.size!==t.length)return!1;for(let o of t)if(!e.has(o))return!1;return!0}return!1}function jp(e,t,n=!1){let o=e.multiple,r=H(t);if(!(o&&!r&&!wt(t))){for(let s=0,i=e.options.length;s<i;s++){let a=e.options[s],l=Uo(a);if(o)if(r){let f=typeof l;f==="string"||f==="number"?a.selected=t.some(u=>String(u)===String(l)):a.selected=ur(t,l)>-1}else a.selected=t.has(l)||n&&typeof l=="string"&&t.has(Xn(l));else if(rt(Uo(a),t)){e.selectedIndex!==s&&(e.selectedIndex=s);return}}!o&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function Uo(e){return"_value"in e?e._value:e.value}function ad(e,t){let n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}var ld={created(e,t,n){Ci(e,t,n,null,"created")},mounted(e,t,n){Ci(e,t,n,null,"mounted")},beforeUpdate(e,t,n,o){Ci(e,t,n,o,"beforeUpdate")},updated(e,t,n,o){Ci(e,t,n,o,"updated")}};function cd(e,t){switch(e){case"SELECT":return id;case"TEXTAREA":return Vi;default:switch(t){case"checkbox":return ql;case"radio":return Jl;default:return Vi}}}function Ci(e,t,n,o,r){let i=cd(e.tagName,n.props&&n.props.type)[r];i&&i(e,t,n,o)}function a_(){Vi.getSSRProps=({value:e})=>({value:e}),Jl.getSSRProps=({value:e},t)=>{if(t.props&&rt(t.props.value,e))return{checked:!0}},ql.getSSRProps=({value:e},t)=>{if(H(e)){if(t.props&&ur(e,t.props.value)>-1)return{checked:!0}}else if(wt(e)){if(t.props&&e.has(t.props.value))return{checked:!0}}else if(e)return{checked:!0}},ld.getSSRProps=(e,t)=>{if(typeof t.type!="string")return;let n=cd(t.type.toUpperCase(),t.props&&t.props.type);if(n.getSSRProps)return n.getSSRProps(e,t)}}var l_=["ctrl","shift","alt","meta"],c_={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>l_.some(n=>e[`${n}Key`]&&!t.includes(n))},f_=(e,t)=>{if(!e)return e;let n=e._withMods||(e._withMods={}),o=t.join(".");return n[o]||(n[o]=((r,...s)=>{for(let i=0;i<t.length;i++){let a=c_[t[i]];if(a&&a(r,t))return}return e(r,...s)}))},u_={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},p_=(e,t)=>{let n=e._withKeys||(e._withKeys={}),o=t.join(".");return n[o]||(n[o]=(r=>{if(!("key"in r))return;let s=ze(r.key);if(t.some(i=>i===s||u_[i]===s))return e(r)}))},fd=q({patchProp:td},zp),Br,Wp=!1;function ud(){return Br||(Br=kl(fd))}function pd(){return Br=Wp?Br:Vl(fd),Wp=!0,Br}var dd=((...e)=>{ud().render(...e)}),d_=((...e)=>{pd().hydrate(...e)}),Hr=((...e)=>{let t=ud().createApp(...e),{mount:n}=t;return t.mount=o=>{let r=gd(o);if(!r)return;let s=t._component;!ee(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");let i=n(r,!1,md(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),i},t}),hd=((...e)=>{let t=pd().createApp(...e),{mount:n}=t;return t.mount=o=>{let r=gd(o);if(r)return n(r,!0,md(r))},t});function md(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function gd(e){return z(e)?document.querySelector(e):e}var Kp=!1,h_=()=>{Kp||(Kp=!0,a_(),CE())};var Kr=Symbol(""),Wr=Symbol(""),cc=Symbol(""),Bi=Symbol(""),Rd=Symbol(""),ho=Symbol(""),Md=Symbol(""),Pd=Symbol(""),fc=Symbol(""),uc=Symbol(""),Jr=Symbol(""),pc=Symbol(""),Ld=Symbol(""),dc=Symbol(""),hc=Symbol(""),mc=Symbol(""),gc=Symbol(""),vc=Symbol(""),Ec=Symbol(""),$d=Symbol(""),Fd=Symbol(""),Yr=Symbol(""),Hi=Symbol(""),_c=Symbol(""),yc=Symbol(""),Xr=Symbol(""),Qr=Symbol(""),bc=Symbol(""),ec=Symbol(""),m_=Symbol(""),tc=Symbol(""),ji=Symbol(""),g_=Symbol(""),v_=Symbol(""),Nc=Symbol(""),E_=Symbol(""),__=Symbol(""),Sc=Symbol(""),Ud=Symbol(""),Bo={[Kr]:"Fragment",[Wr]:"Teleport",[cc]:"Suspense",[Bi]:"KeepAlive",[Rd]:"BaseTransition",[ho]:"openBlock",[Md]:"createBlock",[Pd]:"createElementBlock",[fc]:"createVNode",[uc]:"createElementVNode",[Jr]:"createCommentVNode",[pc]:"createTextVNode",[Ld]:"createStaticVNode",[dc]:"resolveComponent",[hc]:"resolveDynamicComponent",[mc]:"resolveDirective",[gc]:"resolveFilter",[vc]:"withDirectives",[Ec]:"renderList",[$d]:"renderSlot",[Fd]:"createSlots",[Yr]:"toDisplayString",[Hi]:"mergeProps",[_c]:"normalizeClass",[yc]:"normalizeStyle",[Xr]:"normalizeProps",[Qr]:"guardReactiveProps",[bc]:"toHandlers",[ec]:"camelize",[m_]:"capitalize",[tc]:"toHandlerKey",[ji]:"setBlockTracking",[g_]:"pushScopeId",[v_]:"popScopeId",[Nc]:"withCtx",[E_]:"unref",[__]:"isRef",[Sc]:"withMemo",[Ud]:"isMemoSame"};function Bd(e){Object.getOwnPropertySymbols(e).forEach(t=>{Bo[t]=e[t]})}var xt={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function y_(e,t=""){return{type:0,source:t,children:e,helpers:new Set,components:[],directives:[],hoists:[],imports:[],cached:[],temps:0,codegenNode:void 0,loc:xt}}function zr(e,t,n,o,r,s,i,a=!1,l=!1,f=!1,u=xt){return e&&(a?(e.helper(ho),e.helper(Wo(e.inSSR,f))):e.helper(jo(e.inSSR,f)),i&&e.helper(vc)),{type:13,tag:t,props:n,children:o,patchFlag:r,dynamicProps:s,directives:i,isBlock:a,disableTracking:l,isComponent:f,loc:u}}function uo(e,t=xt){return{type:17,loc:t,elements:e}}function Vt(e,t=xt){return{type:15,loc:t,properties:e}}function Oe(e,t){return{type:16,loc:xt,key:z(e)?Y(e,!0):e,value:t}}function Y(e,t=!1,n=xt,o=0){return{type:4,loc:n,content:e,isStatic:t,constType:t?3:o}}function Rt(e,t=xt){return{type:8,loc:t,children:e}}function Pe(e,t=[],n=xt){return{type:14,loc:n,callee:e,arguments:t}}function Ho(e,t=void 0,n=!1,o=!1,r=xt){return{type:18,params:e,returns:t,newline:n,isSlot:o,loc:r}}function nc(e,t,n,o=!0){return{type:19,test:e,consequent:t,alternate:n,newline:o,loc:xt}}function b_(e,t,n=!1,o=!1){return{type:20,index:e,value:t,needPauseTracking:n,inVOnce:o,needArraySpread:!1,loc:xt}}function N_(e){return{type:21,body:e,loc:xt}}function jo(e,t){return e||t?fc:uc}function Wo(e,t){return e||t?Md:Pd}function xc(e,{helper:t,removeHelper:n,inSSR:o}){e.isBlock||(e.isBlock=!0,n(jo(o,e.isComponent)),t(ho),t(Wo(o,e.isComponent)))}var vd=new Uint8Array([123,123]),Ed=new Uint8Array([125,125]);function _d(e){return e>=97&&e<=122||e>=65&&e<=90}function St(e){return e===32||e===10||e===9||e===12||e===13}function $n(e){return e===47||e===62||St(e)}function Wi(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}var Je={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])},oc=class{constructor(t,n){this.stack=t,this.cbs=n,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=vd,this.delimiterClose=Ed,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0}get inSFCRoot(){return this.mode===2&&this.stack.length===0}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=vd,this.delimiterClose=Ed}getPos(t){let n=1,o=t+1,r=this.newlines.length,s=-1;if(r>100){let i=-1,a=r;for(;i+1<a;){let l=i+a>>>1;this.newlines[l]<t?i=l:a=l}s=i}else for(let i=r-1;i>=0;i--)if(t>this.newlines[i]){s=i;break}return s>=0&&(n=s+2,o=t-this.newlines[s]),{column:o,line:n,offset:t}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(t){t===60?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t))}stateInterpolationOpen(t){if(t===this.delimiterOpen[this.delimiterIndex])if(this.delimiterIndex===this.delimiterOpen.length-1){let n=this.index+1-this.delimiterOpen.length;n>this.sectionStart&&this.cbs.ontext(this.sectionStart,n),this.state=3,this.sectionStart=n}else this.delimiterIndex++;else this.inRCDATA?(this.state=32,this.stateInRCDATA(t)):(this.state=1,this.stateText(t))}stateInterpolation(t){t===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(t))}stateInterpolationClose(t){t===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(t))}stateSpecialStartSequence(t){let n=this.sequenceIndex===this.currentSequence.length;if(!(n?$n(t):(t|32)===this.currentSequence[this.sequenceIndex]))this.inRCDATA=!1;else if(!n){this.sequenceIndex++;return}this.sequenceIndex=0,this.state=6,this.stateInTagName(t)}stateInRCDATA(t){if(this.sequenceIndex===this.currentSequence.length){if(t===62||St(t)){let n=this.index-this.currentSequence.length;if(this.sectionStart<n){let o=this.index;this.index=n,this.cbs.ontext(this.sectionStart,n),this.index=o}this.sectionStart=n+2,this.stateInClosingTagName(t),this.inRCDATA=!1;return}this.sequenceIndex=0}(t|32)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:this.sequenceIndex===0?this.currentSequence===Je.TitleEnd||this.currentSequence===Je.TextareaEnd&&!this.inSFCRoot?!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t)):this.fastForwardTo(60)&&(this.sequenceIndex=1):this.sequenceIndex=+(t===60)}stateCDATASequence(t){t===Je.Cdata[this.sequenceIndex]?++this.sequenceIndex===Je.Cdata.length&&(this.state=28,this.currentSequence=Je.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(t))}fastForwardTo(t){for(;++this.index<this.buffer.length;){let n=this.buffer.charCodeAt(this.index);if(n===10&&this.newlines.push(this.index),n===t)return!0}return this.index=this.buffer.length-1,!1}stateInCommentLike(t){t===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===Je.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):this.sequenceIndex===0?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):t!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0)}startSpecial(t,n){this.enterRCDATA(t,n),this.state=31}enterRCDATA(t,n){this.inRCDATA=!0,this.currentSequence=t,this.sequenceIndex=n}stateBeforeTagName(t){t===33?(this.state=22,this.sectionStart=this.index+1):t===63?(this.state=24,this.sectionStart=this.index+1):_d(t)?(this.sectionStart=this.index,this.mode===0?this.state=6:this.inSFCRoot?this.state=34:this.inXML?this.state=6:t===116?this.state=30:this.state=t===115?29:6):t===47?this.state=8:(this.state=1,this.stateText(t))}stateInTagName(t){$n(t)&&this.handleTagName(t)}stateInSFCRootTagName(t){if($n(t)){let n=this.buffer.slice(this.sectionStart,this.index);n!=="template"&&this.enterRCDATA(Wi("</"+n),0),this.handleTagName(t)}}handleTagName(t){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)}stateBeforeClosingTagName(t){St(t)||(t===62?(this.state=1,this.sectionStart=this.index+1):(this.state=_d(t)?9:27,this.sectionStart=this.index))}stateInClosingTagName(t){(t===62||St(t))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(t))}stateAfterClosingTagName(t){t===62&&(this.state=1,this.sectionStart=this.index+1)}stateBeforeAttrName(t){t===62?(this.cbs.onopentagend(this.index),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):t===47?this.state=7:t===60&&this.peek()===47?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):St(t)||this.handleAttrStart(t)}handleAttrStart(t){t===118&&this.peek()===45?(this.state=13,this.sectionStart=this.index):t===46||t===58||t===64||t===35?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index)}stateInSelfClosingTag(t){t===62?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):St(t)||(this.state=11,this.stateBeforeAttrName(t))}stateInAttrName(t){(t===61||$n(t))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(t))}stateInDirName(t){t===61||$n(t)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===58?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):t===46&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDirArg(t){t===61||$n(t)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===91?this.state=15:t===46&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDynamicDirArg(t){t===93?this.state=14:(t===61||$n(t))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(t))}stateInDirModifier(t){t===61||$n(t)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===46&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1)}handleAttrNameEnd(t){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(t)}stateAfterAttrName(t){t===61?this.state=18:t===47||t===62?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)):St(t)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(t))}stateBeforeAttrValue(t){t===34?(this.state=19,this.sectionStart=this.index+1):t===39?(this.state=20,this.sectionStart=this.index+1):St(t)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(t))}handleInAttrValue(t,n){(t===n||this.fastForwardTo(n))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(n===34?3:2,this.index+1),this.state=11)}stateInAttrValueDoubleQuotes(t){this.handleInAttrValue(t,34)}stateInAttrValueSingleQuotes(t){this.handleInAttrValue(t,39)}stateInAttrValueNoQuotes(t){St(t)||t===62?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(t)):(t===39||t===60||t===61||t===96)&&this.cbs.onerr(18,this.index)}stateBeforeDeclaration(t){t===91?(this.state=26,this.sequenceIndex=0):this.state=t===45?25:23}stateInDeclaration(t){(t===62||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1)}stateInProcessingInstruction(t){(t===62||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeComment(t){t===45?(this.state=28,this.currentSequence=Je.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23}stateInSpecialComment(t){(t===62||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeSpecialS(t){t===Je.ScriptEnd[3]?this.startSpecial(Je.ScriptEnd,4):t===Je.StyleEnd[3]?this.startSpecial(Je.StyleEnd,4):(this.state=6,this.stateInTagName(t))}stateBeforeSpecialT(t){t===Je.TitleEnd[3]?this.startSpecial(Je.TitleEnd,4):t===Je.TextareaEnd[3]?this.startSpecial(Je.TextareaEnd,4):(this.state=6,this.stateInTagName(t))}startEntity(){}stateInEntity(){}parse(t){for(this.buffer=t;this.index<this.buffer.length;){let n=this.buffer.charCodeAt(this.index);switch(n===10&&this.state!==33&&this.newlines.push(this.index),this.state){case 1:{this.stateText(n);break}case 2:{this.stateInterpolationOpen(n);break}case 3:{this.stateInterpolation(n);break}case 4:{this.stateInterpolationClose(n);break}case 31:{this.stateSpecialStartSequence(n);break}case 32:{this.stateInRCDATA(n);break}case 26:{this.stateCDATASequence(n);break}case 19:{this.stateInAttrValueDoubleQuotes(n);break}case 12:{this.stateInAttrName(n);break}case 13:{this.stateInDirName(n);break}case 14:{this.stateInDirArg(n);break}case 15:{this.stateInDynamicDirArg(n);break}case 16:{this.stateInDirModifier(n);break}case 28:{this.stateInCommentLike(n);break}case 27:{this.stateInSpecialComment(n);break}case 11:{this.stateBeforeAttrName(n);break}case 6:{this.stateInTagName(n);break}case 34:{this.stateInSFCRootTagName(n);break}case 9:{this.stateInClosingTagName(n);break}case 5:{this.stateBeforeTagName(n);break}case 17:{this.stateAfterAttrName(n);break}case 20:{this.stateInAttrValueSingleQuotes(n);break}case 18:{this.stateBeforeAttrValue(n);break}case 8:{this.stateBeforeClosingTagName(n);break}case 10:{this.stateAfterClosingTagName(n);break}case 29:{this.stateBeforeSpecialS(n);break}case 30:{this.stateBeforeSpecialT(n);break}case 21:{this.stateInAttrValueNoQuotes(n);break}case 7:{this.stateInSelfClosingTag(n);break}case 23:{this.stateInDeclaration(n);break}case 22:{this.stateBeforeDeclaration(n);break}case 25:{this.stateBeforeComment(n);break}case 24:{this.stateInProcessingInstruction(n);break}case 33:{this.stateInEntity();break}}this.index++}this.cleanup(),this.finish()}cleanup(){this.sectionStart!==this.index&&(this.state===1||this.state===32&&this.sequenceIndex===0?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):(this.state===19||this.state===20||this.state===21)&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index))}finish(){this.handleTrailingData(),this.cbs.onend()}handleTrailingData(){let t=this.buffer.length;this.sectionStart>=t||(this.state===28?this.currentSequence===Je.CdataEnd?this.cbs.oncdata(this.sectionStart,t):this.cbs.oncomment(this.sectionStart,t):this.state===6||this.state===11||this.state===18||this.state===17||this.state===12||this.state===13||this.state===14||this.state===15||this.state===16||this.state===20||this.state===19||this.state===21||this.state===9||this.cbs.ontext(this.sectionStart,t))}emitCodePoint(t,n){}};function yd(e,{compatConfig:t}){let n=t&&t[e];return e==="MODE"?n||3:n}function po(e,t){let n=yd("MODE",t),o=yd(e,t);return n===3?o===!0:o!==!1}function Ko(e,t,n,...o){return po(e,t)}function Tc(e){throw e}function Hd(e){}function _e(e,t,n,o){let r=`https://vuejs.org/error-reference/#compiler-${e}`,s=new SyntaxError(String(r));return s.code=e,s.loc=t,s}var Qe=e=>e.type===4&&e.isStatic;function jd(e){switch(e){case"Teleport":case"teleport":return Wr;case"Suspense":case"suspense":return cc;case"KeepAlive":case"keep-alive":return Bi;case"BaseTransition":case"base-transition":return Rd}}var S_=/^$|^\d|[^\$\w\xA0-\uFFFF]/,wc=e=>!S_.test(e),Wd=/[A-Za-z_$\xA0-\uFFFF]/,x_=/[\.\?\w$\xA0-\uFFFF]/,T_=/\s+[.[]\s*|\s*[.[]\s+/g,Kd=e=>e.type===4?e.content:e.loc.source,w_=e=>{let t=Kd(e).trim().replace(T_,a=>a.trim()),n=0,o=[],r=0,s=0,i=null;for(let a=0;a<t.length;a++){let l=t.charAt(a);switch(n){case 0:if(l==="[")o.push(n),n=1,r++;else if(l==="(")o.push(n),n=2,s++;else if(!(a===0?Wd:x_).test(l))return!1;break;case 1:l==="'"||l==='"'||l==="`"?(o.push(n),n=3,i=l):l==="["?r++:l==="]"&&(--r||(n=o.pop()));break;case 2:if(l==="'"||l==='"'||l==="`")o.push(n),n=3,i=l;else if(l==="(")s++;else if(l===")"){if(a===t.length-1)return!1;--s||(n=o.pop())}break;case 3:l===i&&(n=o.pop(),i=null);break}}return!r&&!s};var Xd=w_,O_=/^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/,C_=e=>O_.test(Kd(e));var A_=C_;function ct(e,t,n=!1){for(let o=0;o<e.props.length;o++){let r=e.props[o];if(r.type===7&&(n||r.exp)&&(z(t)?r.name===t:t.test(r.name)))return r}}function Zr(e,t,n=!1,o=!1){for(let r=0;r<e.props.length;r++){let s=e.props[r];if(s.type===6){if(n)continue;if(s.name===t&&(s.value||o))return s}else if(s.name==="bind"&&(s.exp||o)&&Un(s.arg,t))return s}}function Un(e,t){return!!(e&&Qe(e)&&e.content===t)}function zd(e){return e.props.some(t=>t.type===7&&t.name==="bind"&&(!t.arg||t.arg.type!==4||!t.arg.isStatic))}function Ql(e){return e.type===5||e.type===2}function bd(e){return e.type===7&&e.name==="pre"}function D_(e){return e.type===7&&e.name==="slot"}function Ki(e){return e.type===1&&e.tagType===3}function Xi(e){return e.type===1&&e.tagType===2}var I_=new Set([Xr,Qr]);function Oc(e,t=[]){if(e&&!z(e)&&e.type===14){let n=e.callee;if(!z(n)&&I_.has(n))return Oc(e.arguments[0],t.concat(e))}return[e,t]}function zi(e,t,n){if(e.type!==13&&k_(e,t))return;let o,r=e.type===13?e.props:e.arguments[2],s=[],i;if(r&&!z(r)&&r.type===14){let a=Oc(r);r=a[0],s=a[1],i=s[s.length-1]}if(r==null||z(r))o=Vt([t]);else if(r.type===14){let a=r.arguments[0];!z(a)&&a.type===15?rc(t,a)||a.properties.unshift(t):r.callee===bc?o=Pe(n.helper(Hi),[Vt([t]),r]):r.arguments.unshift(Vt([t])),!o&&(o=r)}else r.type===15?(rc(t,r)||r.properties.unshift(t),o=r):(o=Pe(n.helper(Hi),[Vt([t]),r]),i&&i.callee===Qr&&(i=s[s.length-2]));e.type===13?i?i.arguments[0]=o:e.props=o:i?i.arguments[0]=o:e.arguments[2]=o}function k_(e,t){var n,o,r;if(t.key.type!==4||t.key.content!=="key")return!1;let s=e.arguments[2];if(s&&!z(s)){let[i]=Oc(s);if(i&&!z(i)&&i.type===15&&rc(t,i))return!0}return(n=e.arguments)[2]||(n[2]="{}"),(o=e.arguments)[3]||(o[3]="undefined"),(r=e.arguments)[4]||(r[4]="undefined"),e.arguments[5]=t.value,!0}function rc(e,t){let n=!1;if(e.key.type===4){let o=e.key.content;n=t.properties.some(r=>r.key.type===4&&r.key.content===o)}return n}function Gr(e,t){return`_${t}_${e.replace(/[^\w]/g,(n,o)=>n==="-"?"_":e.charCodeAt(o).toString())}`}function V_(e){return e.type===14&&e.callee===Sc?e.arguments[1].returns:e}var R_=/([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;function Gd(e){for(let t=0;t<e.length;t++)if(!St(e.charCodeAt(t)))return!1;return!0}function Cc(e){return e.type===2&&Gd(e.content)||e.type===12&&Cc(e.content)}function qi(e){return e.type===3||Cc(e)}var qd={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:Cn,isPreTag:Cn,isIgnoreNewlineTag:Cn,isCustomElement:Cn,onError:Tc,onWarn:Hd,comments:!1,prefixIdentifiers:!1},ue=qd,qr=null,Sn="",Ye=null,oe=null,lt="",Nn=-1,co=-1,Ac=0,Fn=!1,sc=null,be=[],Te=new oc(be,{onerr:bn,ontext(e,t){Mi(Xe(e,t),e,t)},ontextentity(e,t,n){Mi(e,t,n)},oninterpolation(e,t){if(Fn)return Mi(Xe(e,t),e,t);let n=e+Te.delimiterOpen.length,o=t-Te.delimiterClose.length;for(;St(Sn.charCodeAt(n));)n++;for(;St(Sn.charCodeAt(o-1));)o--;let r=Xe(n,o);r.includes("&")&&(r=ue.decodeEntities(r,!1)),ic({type:5,content:$i(r,!1,Me(n,o)),loc:Me(e,t)})},onopentagname(e,t){let n=Xe(e,t);Ye={type:1,tag:n,ns:ue.getNamespace(n,be[0],ue.ns),tagType:0,props:[],children:[],loc:Me(e-1,t),codegenNode:void 0}},onopentagend(e){Sd(e)},onclosetag(e,t){let n=Xe(e,t);if(!ue.isVoidTag(n)){let o=!1;for(let r=0;r<be.length;r++)if(be[r].tag.toLowerCase()===n.toLowerCase()){o=!0,r>0&&bn(24,be[0].loc.start.offset);for(let i=0;i<=r;i++){let a=be.shift();Li(a,t,i<r)}break}o||bn(23,Jd(e,60))}},onselfclosingtag(e){let t=Ye.tag;Ye.isSelfClosing=!0,Sd(e),be[0]&&be[0].tag===t&&Li(be.shift(),e)},onattribname(e,t){oe={type:6,name:Xe(e,t),nameLoc:Me(e,t),value:void 0,loc:Me(e)}},ondirname(e,t){let n=Xe(e,t),o=n==="."||n===":"?"bind":n==="@"?"on":n==="#"?"slot":n.slice(2);if(!Fn&&o===""&&bn(26,e),Fn||o==="")oe={type:6,name:n,nameLoc:Me(e,t),value:void 0,loc:Me(e)};else if(oe={type:7,name:o,rawName:n,exp:void 0,arg:void 0,modifiers:n==="."?[Y("prop")]:[],loc:Me(e)},o==="pre"){Fn=Te.inVPre=!0,sc=Ye;let r=Ye.props;for(let s=0;s<r.length;s++)r[s].type===7&&(r[s]=W_(r[s]))}},ondirarg(e,t){if(e===t)return;let n=Xe(e,t);if(Fn&&!bd(oe))oe.name+=n,fo(oe.nameLoc,t);else{let o=n[0]!=="[";oe.arg=$i(o?n:n.slice(1,-1),o,Me(e,t),o?3:0)}},ondirmodifier(e,t){let n=Xe(e,t);if(Fn&&!bd(oe))oe.name+="."+n,fo(oe.nameLoc,t);else if(oe.name==="slot"){let o=oe.arg;o&&(o.content+="."+n,fo(o.loc,t))}else{let o=Y(n,!0,Me(e,t));oe.modifiers.push(o)}},onattribdata(e,t){lt+=Xe(e,t),Nn<0&&(Nn=e),co=t},onattribentity(e,t,n){lt+=e,Nn<0&&(Nn=t),co=n},onattribnameend(e){let t=oe.loc.start.offset,n=Xe(t,e);oe.type===7&&(oe.rawName=n),Ye.props.some(o=>(o.type===7?o.rawName:o.name)===n)&&bn(2,t)},onattribend(e,t){if(Ye&&oe){if(fo(oe.loc,t),e!==0)if(lt.includes("&")&&(lt=ue.decodeEntities(lt,!0)),oe.type===6)oe.name==="class"&&(lt=Qd(lt).trim()),e===1&&!lt&&bn(13,t),oe.value={type:2,content:lt,loc:e===1?Me(Nn,co):Me(Nn-1,co+1)},Te.inSFCRoot&&Ye.tag==="template"&&oe.name==="lang"&&lt&&lt!=="html"&&Te.enterRCDATA(Wi("</template"),0);else{let n=0;oe.exp=$i(lt,!1,Me(Nn,co),0,n),oe.name==="for"&&(oe.forParseResult=P_(oe.exp));let o=-1;oe.name==="bind"&&(o=oe.modifiers.findIndex(r=>r.content==="sync"))>-1&&Ko("COMPILER_V_BIND_SYNC",ue,oe.loc,oe.arg.loc.source)&&(oe.name="model",oe.modifiers.splice(o,1))}(oe.type!==7||oe.name!=="pre")&&Ye.props.push(oe)}lt="",Nn=co=-1},oncomment(e,t){ue.comments&&ic({type:3,content:Xe(e,t),loc:Me(e-4,t+3)})},onend(){let e=Sn.length;for(let t=0;t<be.length;t++)Li(be[t],e-1),bn(24,be[t].loc.start.offset)},oncdata(e,t){(be[0]?be[0].ns:ue.ns)!==0?Mi(Xe(e,t),e,t):bn(1,e-9)},onprocessinginstruction(e){(be[0]?be[0].ns:ue.ns)===0&&bn(21,e-1)}}),Nd=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,M_=/^\(|\)$/g;function P_(e){let t=e.loc,n=e.content,o=n.match(R_);if(!o)return;let[,r,s]=o,i=(c,p,d=!1)=>{let E=t.start.offset+p,m=E+c.length;return $i(c,!1,Me(E,m),0,d?1:0)},a={source:i(s.trim(),n.indexOf(s,r.length)),value:void 0,key:void 0,index:void 0,finalized:!1},l=r.trim().replace(M_,"").trim(),f=r.indexOf(l),u=l.match(Nd);if(u){l=l.replace(Nd,"").trim();let c=u[1].trim(),p;if(c&&(p=n.indexOf(c,f+l.length),a.key=i(c,p,!0)),u[2]){let d=u[2].trim();d&&(a.index=i(d,n.indexOf(d,a.key?p+c.length:f+l.length),!0))}}return l&&(a.value=i(l,f,!0)),a}function Xe(e,t){return Sn.slice(e,t)}function Sd(e){Te.inSFCRoot&&(Ye.innerLoc=Me(e+1,e+1)),ic(Ye);let{tag:t,ns:n}=Ye;n===0&&ue.isPreTag(t)&&Ac++,ue.isVoidTag(t)?Li(Ye,e):(be.unshift(Ye),(n===1||n===2)&&(Te.inXML=!0)),Ye=null}function Mi(e,t,n){{let s=be[0]&&be[0].tag;s!=="script"&&s!=="style"&&e.includes("&")&&(e=ue.decodeEntities(e,!1))}let o=be[0]||qr,r=o.children[o.children.length-1];r&&r.type===2?(r.content+=e,fo(r.loc,n)):o.children.push({type:2,content:e,loc:Me(t,n)})}function Li(e,t,n=!1){n?fo(e.loc,Jd(t,60)):fo(e.loc,L_(t,62)+1),Te.inSFCRoot&&(e.children.length?e.innerLoc.end=q({},e.children[e.children.length-1].loc.end):e.innerLoc.end=q({},e.innerLoc.start),e.innerLoc.source=Xe(e.innerLoc.start.offset,e.innerLoc.end.offset));let{tag:o,ns:r,children:s}=e;if(Fn||(o==="slot"?e.tagType=2:xd(e)?e.tagType=3:F_(e)&&(e.tagType=1)),Te.inRCDATA||(e.children=Yd(s)),r===0&&ue.isIgnoreNewlineTag(o)){let i=s[0];i&&i.type===2&&(i.content=i.content.replace(/^\r?\n/,""))}r===0&&ue.isPreTag(o)&&Ac--,sc===e&&(Fn=Te.inVPre=!1,sc=null),Te.inXML&&(be[0]?be[0].ns:ue.ns)===0&&(Te.inXML=!1);{let i=e.props;if(!Te.inSFCRoot&&po("COMPILER_NATIVE_TEMPLATE",ue)&&e.tag==="template"&&!xd(e)){let l=be[0]||qr,f=l.children.indexOf(e);l.children.splice(f,1,...e.children)}let a=i.find(l=>l.type===6&&l.name==="inline-template");a&&Ko("COMPILER_INLINE_TEMPLATE",ue,a.loc)&&e.children.length&&(a.value={type:2,content:Xe(e.children[0].loc.start.offset,e.children[e.children.length-1].loc.end.offset),loc:a.loc})}}function L_(e,t){let n=e;for(;Sn.charCodeAt(n)!==t&&n<Sn.length-1;)n++;return n}function Jd(e,t){let n=e;for(;Sn.charCodeAt(n)!==t&&n>=0;)n--;return n}var $_=new Set(["if","else","else-if","for","slot"]);function xd({tag:e,props:t}){if(e==="template"){for(let n=0;n<t.length;n++)if(t[n].type===7&&$_.has(t[n].name))return!0}return!1}function F_({tag:e,props:t}){if(ue.isCustomElement(e))return!1;if(e==="component"||U_(e.charCodeAt(0))||jd(e)||ue.isBuiltInComponent&&ue.isBuiltInComponent(e)||ue.isNativeTag&&!ue.isNativeTag(e))return!0;for(let n=0;n<t.length;n++){let o=t[n];if(o.type===6){if(o.name==="is"&&o.value){if(o.value.content.startsWith("vue:"))return!0;if(Ko("COMPILER_IS_ON_ELEMENT",ue,o.loc))return!0}}else if(o.name==="bind"&&Un(o.arg,"is")&&Ko("COMPILER_IS_ON_ELEMENT",ue,o.loc))return!0}return!1}function U_(e){return e>64&&e<91}var B_=/\r\n/g;function Yd(e){let t=ue.whitespace!=="preserve",n=!1;for(let o=0;o<e.length;o++){let r=e[o];if(r.type===2)if(Ac)r.content=r.content.replace(B_,`
`);else if(Gd(r.content)){let s=e[o-1]&&e[o-1].type,i=e[o+1]&&e[o+1].type;!s||!i||t&&(s===3&&(i===3||i===1)||s===1&&(i===3||i===1&&H_(r.content)))?(n=!0,e[o]=null):r.content=" "}else t&&(r.content=Qd(r.content))}return n?e.filter(Boolean):e}function H_(e){for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(n===10||n===13)return!0}return!1}function Qd(e){let t="",n=!1;for(let o=0;o<e.length;o++)St(e.charCodeAt(o))?n||(t+=" ",n=!0):(t+=e[o],n=!1);return t}function ic(e){(be[0]||qr).children.push(e)}function Me(e,t){return{start:Te.getPos(e),end:t==null?t:Te.getPos(t),source:t==null?t:Xe(e,t)}}function j_(e){return{start:q({},e.start),end:q({},e.end),source:e.source}}function fo(e,t){e.end=Te.getPos(t),e.source=Xe(e.start.offset,t)}function W_(e){let t={type:6,name:e.rawName,nameLoc:Me(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){let n=e.exp.loc;n.end.offset<e.loc.end.offset&&(n.start.offset--,n.start.column--,n.end.offset++,n.end.column++),t.value={type:2,content:e.exp.content,loc:n}}return t}function $i(e,t=!1,n,o=0,r=0){return Y(e,t,n,o)}function bn(e,t,n){ue.onError(_e(e,Me(t,t),void 0,n))}function K_(){Te.reset(),Ye=null,oe=null,lt="",Nn=-1,co=-1,be.length=0}function Zd(e,t){if(K_(),Sn=e,ue=q({},qd),t){let r;for(r in t)t[r]!=null&&(ue[r]=t[r])}Te.mode=ue.parseMode==="html"?1:ue.parseMode==="sfc"?2:0,Te.inXML=ue.ns===1||ue.ns===2;let n=t&&t.delimiters;n&&(Te.delimiterOpen=Wi(n[0]),Te.delimiterClose=Wi(n[1]));let o=qr=y_([],e);return Te.parse(Sn),o.loc=Me(0,e.length),o.children=Yd(o.children),qr=null,o}function X_(e,t){Fi(e,void 0,t,!!eh(e))}function eh(e){let t=e.children.filter(n=>n.type!==3);return t.length===1&&t[0].type===1&&!Xi(t[0])?t[0]:null}function Fi(e,t,n,o=!1,r=!1){let{children:s}=e,i=[];for(let u=0;u<s.length;u++){let c=s[u];if(c.type===1&&c.tagType===0){let p=o?0:ft(c,n);if(p>0){if(p>=2){c.codegenNode.patchFlag=-1,i.push(c);continue}}else{let d=c.codegenNode;if(d.type===13){let E=d.patchFlag;if((E===void 0||E===512||E===1)&&nh(c,n)>=2){let m=oh(c);m&&(d.props=n.hoist(m))}d.dynamicProps&&(d.dynamicProps=n.hoist(d.dynamicProps))}}}else if(c.type===12&&(o?0:ft(c,n))>=2){c.codegenNode.type===14&&c.codegenNode.arguments.length>0&&c.codegenNode.arguments.push("-1"),i.push(c);continue}if(c.type===1){let p=c.tagType===1;p&&n.scopes.vSlot++,Fi(c,e,n,!1,r),p&&n.scopes.vSlot--}else if(c.type===11)Fi(c,e,n,c.children.length===1,!0);else if(c.type===9)for(let p=0;p<c.branches.length;p++)Fi(c.branches[p],e,n,c.branches[p].children.length===1,r)}let a=!1;if(i.length===s.length&&e.type===1){if(e.tagType===0&&e.codegenNode&&e.codegenNode.type===13&&H(e.codegenNode.children))e.codegenNode.children=l(uo(e.codegenNode.children)),a=!0;else if(e.tagType===1&&e.codegenNode&&e.codegenNode.type===13&&e.codegenNode.children&&!H(e.codegenNode.children)&&e.codegenNode.children.type===15){let u=f(e.codegenNode,"default");u&&(u.returns=l(uo(u.returns)),a=!0)}else if(e.tagType===3&&t&&t.type===1&&t.tagType===1&&t.codegenNode&&t.codegenNode.type===13&&t.codegenNode.children&&!H(t.codegenNode.children)&&t.codegenNode.children.type===15){let u=ct(e,"slot",!0),c=u&&u.arg&&f(t.codegenNode,u.arg);c&&(c.returns=l(uo(c.returns)),a=!0)}}if(!a)for(let u of i)u.codegenNode=n.cache(u.codegenNode);function l(u){let c=n.cache(u);return c.needArraySpread=!0,c}function f(u,c){if(u.children&&!H(u.children)&&u.children.type===15){let p=u.children.properties.find(d=>d.key===c||d.key.content===c);return p&&p.value}}i.length&&n.transformHoist&&n.transformHoist(s,n,e)}function ft(e,t){let{constantCache:n}=t;switch(e.type){case 1:if(e.tagType!==0)return 0;let o=n.get(e);if(o!==void 0)return o;let r=e.codegenNode;if(r.type!==13||r.isBlock&&e.tag!=="svg"&&e.tag!=="foreignObject"&&e.tag!=="math")return 0;if(r.patchFlag===void 0){let i=3,a=nh(e,t);if(a===0)return n.set(e,0),0;a<i&&(i=a);for(let l=0;l<e.children.length;l++){let f=ft(e.children[l],t);if(f===0)return n.set(e,0),0;f<i&&(i=f)}if(i>1)for(let l=0;l<e.props.length;l++){let f=e.props[l];if(f.type===7&&f.name==="bind"&&f.exp){let u=ft(f.exp,t);if(u===0)return n.set(e,0),0;u<i&&(i=u)}}if(r.isBlock){for(let l=0;l<e.props.length;l++)if(e.props[l].type===7)return n.set(e,0),0;t.removeHelper(ho),t.removeHelper(Wo(t.inSSR,r.isComponent)),r.isBlock=!1,t.helper(jo(t.inSSR,r.isComponent))}return n.set(e,i),i}else return n.set(e,0),0;case 2:case 3:return 3;case 9:case 11:case 10:return 0;case 5:case 12:return ft(e.content,t);case 4:return e.constType;case 8:let s=3;for(let i=0;i<e.children.length;i++){let a=e.children[i];if(z(a)||De(a))continue;let l=ft(a,t);if(l===0)return 0;l<s&&(s=l)}return s;case 20:return 2;default:return 0}}var z_=new Set([_c,yc,Xr,Qr]);function th(e,t){if(e.type===14&&!z(e.callee)&&z_.has(e.callee)){let n=e.arguments[0];if(n.type===4)return ft(n,t);if(n.type===14)return th(n,t)}return 0}function nh(e,t){let n=3,o=oh(e);if(o&&o.type===15){let{properties:r}=o;for(let s=0;s<r.length;s++){let{key:i,value:a}=r[s],l=ft(i,t);if(l===0)return l;l<n&&(n=l);let f;if(a.type===4?f=ft(a,t):a.type===14?f=th(a,t):f=0,f===0)return f;f<n&&(n=f)}}return n}function oh(e){let t=e.codegenNode;if(t.type===13)return t.props}function G_(e,{filename:t="",prefixIdentifiers:n=!1,hoistStatic:o=!1,hmr:r=!1,cacheHandlers:s=!1,nodeTransforms:i=[],directiveTransforms:a={},transformHoist:l=null,isBuiltInComponent:f=Ie,isCustomElement:u=Ie,expressionPlugins:c=[],scopeId:p=null,slotted:d=!0,ssr:E=!1,inSSR:m=!1,ssrCssVars:N="",bindingMetadata:O=te,inline:b=!1,isTS:v=!1,onError:y=Tc,onWarn:g=Hd,compatConfig:x}){let C=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),S={filename:t,selfName:C&&Ot(ce(C[1])),prefixIdentifiers:n,hoistStatic:o,hmr:r,cacheHandlers:s,nodeTransforms:i,directiveTransforms:a,transformHoist:l,isBuiltInComponent:f,isCustomElement:u,expressionPlugins:c,scopeId:p,slotted:d,ssr:E,inSSR:m,ssrCssVars:N,bindingMetadata:O,inline:b,isTS:v,onError:y,onWarn:g,compatConfig:x,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],cached:[],constantCache:new WeakMap,vForMemoKeyedNodes:new WeakSet,temps:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,grandParent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(T){let I=S.helpers.get(T)||0;return S.helpers.set(T,I+1),T},removeHelper(T){let I=S.helpers.get(T);if(I){let M=I-1;M?S.helpers.set(T,M):S.helpers.delete(T)}},helperString(T){return`_${Bo[S.helper(T)]}`},replaceNode(T){S.parent.children[S.childIndex]=S.currentNode=T},removeNode(T){let I=S.parent.children,M=T?I.indexOf(T):S.currentNode?S.childIndex:-1;!T||T===S.currentNode?(S.currentNode=null,S.onNodeRemoved()):S.childIndex>M&&(S.childIndex--,S.onNodeRemoved()),S.parent.children.splice(M,1)},onNodeRemoved:Ie,addIdentifiers(T){},removeIdentifiers(T){},hoist(T){z(T)&&(T=Y(T)),S.hoists.push(T);let I=Y(`_hoisted_${S.hoists.length}`,!1,T.loc,2);return I.hoisted=T,I},cache(T,I=!1,M=!1){let A=b_(S.cached.length,T,I,M);return S.cached.push(A),A}};return S.filters=new Set,S}function q_(e,t){let n=G_(e,t);Ji(e,n),t.hoistStatic&&X_(e,n),t.ssr||J_(e,n),e.helpers=new Set([...n.helpers.keys()]),e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached,e.transformed=!0,e.filters=[...n.filters]}function J_(e,t){let{helper:n}=t,{children:o}=e;if(o.length===1){let r=eh(e);if(r&&r.codegenNode){let s=r.codegenNode;s.type===13&&xc(s,t),e.codegenNode=s}else e.codegenNode=o[0]}else if(o.length>1){let r=64;e.codegenNode=zr(t,n(Kr),void 0,e.children,r,void 0,void 0,!0,void 0,!1)}}function Y_(e,t){let n=0,o=()=>{n--};for(;n<e.children.length;n++){let r=e.children[n];z(r)||(t.grandParent=t.parent,t.parent=e,t.childIndex=n,t.onNodeRemoved=o,Ji(r,t))}}function Ji(e,t){t.currentNode=e;let{nodeTransforms:n}=t,o=[];for(let s=0;s<n.length;s++){let i=n[s](e,t);if(i&&(H(i)?o.push(...i):o.push(i)),t.currentNode)e=t.currentNode;else return}switch(e.type){case 3:t.ssr||t.helper(Jr);break;case 5:t.ssr||t.helper(Yr);break;case 9:for(let s=0;s<e.branches.length;s++)Ji(e.branches[s],t);break;case 10:case 11:case 1:case 0:Y_(e,t);break}t.currentNode=e;let r=o.length;for(;r--;)o[r]()}function rh(e,t){let n=z(e)?o=>o===e:o=>e.test(o);return(o,r)=>{if(o.type===1){let{props:s}=o;if(o.tagType===3&&s.some(D_))return;let i=[];for(let a=0;a<s.length;a++){let l=s[a];if(l.type===7&&n(l.name)){s.splice(a,1),a--;let f=t(o,l,r);f&&i.push(f)}}return i}}}var Yi="/*@__PURE__*/",sh=e=>`${Bo[e]}: _${Bo[e]}`;function Q_(e,{mode:t="function",prefixIdentifiers:n=t==="module",sourceMap:o=!1,filename:r="template.vue.html",scopeId:s=null,optimizeImports:i=!1,runtimeGlobalName:a="Vue",runtimeModuleName:l="vue",ssrRuntimeModuleName:f="vue/server-renderer",ssr:u=!1,isTS:c=!1,inSSR:p=!1}){let d={mode:t,prefixIdentifiers:n,sourceMap:o,filename:r,scopeId:s,optimizeImports:i,runtimeGlobalName:a,runtimeModuleName:l,ssrRuntimeModuleName:f,ssr:u,isTS:c,inSSR:p,source:e.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper(m){return`_${Bo[m]}`},push(m,N=-2,O){d.code+=m},indent(){E(++d.indentLevel)},deindent(m=!1){m?--d.indentLevel:E(--d.indentLevel)},newline(){E(d.indentLevel)}};function E(m){d.push(`
`+"  ".repeat(m),0)}return d}function Z_(e,t={}){let n=Q_(e,t);t.onContextCreated&&t.onContextCreated(n);let{mode:o,push:r,prefixIdentifiers:s,indent:i,deindent:a,newline:l,scopeId:f,ssr:u}=n,c=Array.from(e.helpers),p=c.length>0,d=!s&&o!=="module";ey(e,n);let m=u?"ssrRender":"render",O=(u?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ");if(r(`function ${m}(${O}) {`),i(),d&&(r("with (_ctx) {"),i(),p&&(r(`const { ${c.map(sh).join(", ")} } = _Vue
`,-1),l())),e.components.length&&(Zl(e.components,"component",n),(e.directives.length||e.temps>0)&&l()),e.directives.length&&(Zl(e.directives,"directive",n),e.temps>0&&l()),e.filters&&e.filters.length&&(l(),Zl(e.filters,"filter",n),l()),e.temps>0){r("let ");for(let b=0;b<e.temps;b++)r(`${b>0?", ":""}_temp${b}`)}return(e.components.length||e.directives.length||e.temps)&&(r(`
`,0),l()),u||r("return "),e.codegenNode?Ze(e.codegenNode,n):r("null"),d&&(a(),r("}")),a(),r("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}function ey(e,t){let{ssr:n,prefixIdentifiers:o,push:r,newline:s,runtimeModuleName:i,runtimeGlobalName:a,ssrRuntimeModuleName:l}=t,f=a,u=Array.from(e.helpers);if(u.length>0&&(r(`const _Vue = ${f}
`,-1),e.hoists.length)){let c=[fc,uc,Jr,pc,Ld].filter(p=>u.includes(p)).map(sh).join(", ");r(`const { ${c} } = _Vue
`,-1)}ty(e.hoists,t),s(),r("return ")}function Zl(e,t,{helper:n,push:o,newline:r,isTS:s}){let i=n(t==="filter"?gc:t==="component"?dc:mc);for(let a=0;a<e.length;a++){let l=e[a],f=l.endsWith("__self");f&&(l=l.slice(0,-6)),o(`const ${Gr(l,t)} = ${i}(${JSON.stringify(l)}${f?", true":""})${s?"!":""}`),a<e.length-1&&r()}}function ty(e,t){if(!e.length)return;t.pure=!0;let{push:n,newline:o}=t;o();for(let r=0;r<e.length;r++){let s=e[r];s&&(n(`const _hoisted_${r+1} = `),Ze(s,t),o())}t.pure=!1}function Dc(e,t){let n=e.length>3||!1;t.push("["),n&&t.indent(),es(e,t,n),n&&t.deindent(),t.push("]")}function es(e,t,n=!1,o=!0){let{push:r,newline:s}=t;for(let i=0;i<e.length;i++){let a=e[i];z(a)?r(a,-3):H(a)?Dc(a,t):Ze(a,t),i<e.length-1&&(n?(o&&r(","),s()):o&&r(", "))}}function Ze(e,t){if(z(e)){t.push(e,-3);return}if(De(e)){t.push(t.helper(e));return}switch(e.type){case 1:case 9:case 11:Ze(e.codegenNode,t);break;case 2:ny(e,t);break;case 4:ih(e,t);break;case 5:oy(e,t);break;case 12:Ze(e.codegenNode,t);break;case 8:ah(e,t);break;case 3:sy(e,t);break;case 13:iy(e,t);break;case 14:ly(e,t);break;case 15:cy(e,t);break;case 17:fy(e,t);break;case 18:uy(e,t);break;case 19:py(e,t);break;case 20:dy(e,t);break;case 21:es(e.body,t,!0,!1);break;case 22:break;case 23:break;case 24:break;case 25:break;case 26:break;case 10:break;default:}}function ny(e,t){t.push(JSON.stringify(e.content),-3,e)}function ih(e,t){let{content:n,isStatic:o}=e;t.push(o?JSON.stringify(n):n,-3,e)}function oy(e,t){let{push:n,helper:o,pure:r}=t;r&&n(Yi),n(`${o(Yr)}(`),Ze(e.content,t),n(")")}function ah(e,t){for(let n=0;n<e.children.length;n++){let o=e.children[n];z(o)?t.push(o,-3):Ze(o,t)}}function ry(e,t){let{push:n}=t;if(e.type===8)n("["),ah(e,t),n("]");else if(e.isStatic){let o=wc(e.content)?e.content:JSON.stringify(e.content);n(o,-2,e)}else n(`[${e.content}]`,-3,e)}function sy(e,t){let{push:n,helper:o,pure:r}=t;r&&n(Yi),n(`${o(Jr)}(${JSON.stringify(e.content)})`,-3,e)}function iy(e,t){let{push:n,helper:o,pure:r}=t,{tag:s,props:i,children:a,patchFlag:l,dynamicProps:f,directives:u,isBlock:c,disableTracking:p,isComponent:d}=e,E;l&&(E=String(l)),u&&n(o(vc)+"("),c&&n(`(${o(ho)}(${p?"true":""}), `),r&&n(Yi);let m=c?Wo(t.inSSR,d):jo(t.inSSR,d);n(o(m)+"(",-2,e),es(ay([s,i,a,E,f]),t),n(")"),c&&n(")"),u&&(n(", "),Ze(u,t),n(")"))}function ay(e){let t=e.length;for(;t--&&e[t]==null;);return e.slice(0,t+1).map(n=>n||"null")}function ly(e,t){let{push:n,helper:o,pure:r}=t,s=z(e.callee)?e.callee:o(e.callee);r&&n(Yi),n(s+"(",-2,e),es(e.arguments,t),n(")")}function cy(e,t){let{push:n,indent:o,deindent:r,newline:s}=t,{properties:i}=e;if(!i.length){n("{}",-2,e);return}let a=i.length>1||!1;n(a?"{":"{ "),a&&o();for(let l=0;l<i.length;l++){let{key:f,value:u}=i[l];ry(f,t),n(": "),Ze(u,t),l<i.length-1&&(n(","),s())}a&&r(),n(a?"}":" }")}function fy(e,t){Dc(e.elements,t)}function uy(e,t){let{push:n,indent:o,deindent:r}=t,{params:s,returns:i,body:a,newline:l,isSlot:f}=e;f&&n(`_${Bo[Nc]}(`),n("(",-2,e),H(s)?es(s,t):s&&Ze(s,t),n(") => "),(l||a)&&(n("{"),o()),i?(l&&n("return "),H(i)?Dc(i,t):Ze(i,t)):a&&Ze(a,t),(l||a)&&(r(),n("}")),f&&(e.isNonScopedSlot&&n(", undefined, true"),n(")"))}function py(e,t){let{test:n,consequent:o,alternate:r,newline:s}=e,{push:i,indent:a,deindent:l,newline:f}=t;if(n.type===4){let c=!wc(n.content);c&&i("("),ih(n,t),c&&i(")")}else i("("),Ze(n,t),i(")");s&&a(),t.indentLevel++,s||i(" "),i("? "),Ze(o,t),t.indentLevel--,s&&f(),s||i(" "),i(": ");let u=r.type===19;u||t.indentLevel++,Ze(r,t),u||t.indentLevel--,s&&l(!0)}function dy(e,t){let{push:n,helper:o,indent:r,deindent:s,newline:i}=t,{needPauseTracking:a,needArraySpread:l}=e;l&&n("[...("),n(`_cache[${e.index}] || (`),a&&(r(),n(`${o(ji)}(-1`),e.inVOnce&&n(", true"),n("),"),i(),n("(")),n(`_cache[${e.index}] = `),Ze(e.value,t),a&&(n(`).cacheIndex = ${e.index},`),i(),n(`${o(ji)}(1),`),i(),n(`_cache[${e.index}]`),s()),n(")"),l&&n(")]")}var UN=new RegExp("\\b"+"arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b")+"\\b");var hy=rh(/^(?:if|else|else-if)$/,(e,t,n)=>my(e,t,n,(o,r,s)=>{let i=n.parent.children,a=i.indexOf(o),l=0;for(;a-->=0;){let f=i[a];f&&f.type===9&&(l+=f.branches.length)}return()=>{if(s)o.codegenNode=wd(r,l,n);else{let f=gy(o.codegenNode);f.alternate=wd(r,l+o.branches.length-1,n)}}}));function my(e,t,n,o){if(t.name!=="else"&&(!t.exp||!t.exp.content.trim())){let r=t.exp?t.exp.loc:e.loc;n.onError(_e(28,t.loc)),t.exp=Y("true",!1,r)}if(t.name==="if"){let r=Td(e,t),s={type:9,loc:j_(e.loc),branches:[r]};if(n.replaceNode(s),o)return o(s,r,!0)}else{let r=n.parent.children,s=[],i=r.indexOf(e);for(;i-->=-1;){let a=r[i];if(a&&qi(a)){n.removeNode(a);continue}if(a&&a.type===9){(t.name==="else-if"||t.name==="else")&&a.branches[a.branches.length-1].condition===void 0&&n.onError(_e(30,e.loc)),n.removeNode();let l=Td(e,t);a.branches.push(l);let f=o&&o(a,l,!1);Ji(l,n),f&&f(),n.currentNode=null}else n.onError(_e(30,e.loc));break}}}function Td(e,t){let n=e.tagType===3;return{type:10,loc:e.loc,condition:t.name==="else"?void 0:t.exp,children:n&&!ct(e,"for")?e.children:[e],userKey:Zr(e,"key"),isTemplateIf:n}}function wd(e,t,n){return e.condition?nc(e.condition,Od(e,t,n),Pe(n.helper(Jr),['""',"true"])):Od(e,t,n)}function Od(e,t,n){let{helper:o}=n,r=Oe("key",Y(`${t}`,!1,xt,2)),{children:s}=e,i=s[0];if(s.length!==1||i.type!==1)if(s.length===1&&i.type===11){let l=i.codegenNode;return zi(l,r,n),l}else return zr(n,o(Kr),Vt([r]),s,64,void 0,void 0,!0,!1,!1,e.loc);else{let l=i.codegenNode,f=V_(l);return f.type===13&&xc(f,n),zi(f,r,n),l}}function gy(e){for(;;)if(e.type===19)if(e.alternate.type===19)e=e.alternate;else return e;else e.type===20&&(e=e.value)}var vy=rh("for",(e,t,n)=>{let{helper:o,removeHelper:r}=n;return Ey(e,t,n,s=>{let i=Pe(o(Ec),[s.source]),a=Ki(e),l=ct(e,"memo"),f=Zr(e,"key",!1,!0);f&&f.type;let u=f&&(f.type===6?f.value?Y(f.value.content,!0):void 0:f.exp),c=u?Oe("key",u):null,p=s.source.type===4&&s.source.constType>0,d=p?64:f?128:256;return s.codegenNode=zr(n,o(Kr),void 0,i,d,void 0,void 0,!0,!p,!1,e.loc),()=>{var E;let m,{children:N}=s,O=N.length!==1||N[0].type!==1,b=Xi(e)?e:a&&e.children.length===1&&Xi(e.children[0])?e.children[0]:null;if(b)m=b.codegenNode,a&&c&&zi(m,c,n);else if(O)m=zr(n,o(Kr),c?Vt([c]):void 0,e.children,64,void 0,void 0,!0,void 0,!1);else{m=N[0].codegenNode,a&&c&&zi(m,c,n);let v=!p||m.isBlockRequired===!0;m.isBlock!==v&&(m.isBlock?(r(ho),r(Wo(n.inSSR,m.isComponent))):r(jo(n.inSSR,m.isComponent))),m.isBlock=v,m.isBlock?(o(ho),o(Wo(n.inSSR,m.isComponent))):(o(jo(n.inSSR,m.isComponent)),m.needsPatch&&(m.patchFlag=((E=m.patchFlag)!=null?E:0)|512))}if(l){let v=Ho(ac(s.parseResult,[Y("_cached")]));v.body=N_([Rt(["const _memo = (",l.exp,")"]),Rt(["if (_cached && _cached.el",...u?[" && _cached.key === (",u,")"]:[],` && ${n.helperString(Ud)}(_cached, _memo)) return _cached`]),Rt(["const _item = ",m]),Y("_item.memo = _memo"),Y("return _item")]),i.arguments.push(v,Y("_cache"),Y(String(n.cached.length))),n.cached.push(null)}else i.arguments.push(Ho(ac(s.parseResult),m,!0))}})});function Ey(e,t,n,o){if(!t.exp){n.onError(_e(31,t.loc));return}let r=t.forParseResult;if(!r){n.onError(_e(32,t.loc));return}lh(r,n);let{addIdentifiers:s,removeIdentifiers:i,scopes:a}=n,{source:l,value:f,key:u,index:c}=r,p={type:11,loc:t.loc,source:l,valueAlias:f,keyAlias:u,objectIndexAlias:c,parseResult:r,children:Ki(e)?e.children:[e]};n.replaceNode(p),a.vFor++;let d=o&&o(p);return()=>{a.vFor--,d&&d()}}function lh(e,t){e.finalized||(e.finalized=!0)}function ac({value:e,key:t,index:n},o=[]){return _y([e,t,n,...o])}function _y(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map((n,o)=>n||Y("_".repeat(o+1),!1))}var Cd=Y("undefined",!1),yy=(e,t)=>{if(e.type===1&&(e.tagType===1||e.tagType===3)){let n=ct(e,"slot");if(n)return n.exp,t.scopes.vSlot++,()=>{t.scopes.vSlot--}}};var by=(e,t,n,o)=>Ho(e,n,!1,!0,n.length?n[0].loc:o);function Ny(e,t,n=by){t.helper(Nc);let{children:o,loc:r}=e,s=[],i=[],a=t.scopes.vSlot>0||t.scopes.vFor>0,l=ct(e,"slot",!0);if(l){let{arg:N,exp:O}=l;N&&!Qe(N)&&(a=!0),s.push(Oe(N||Y("default",!0),n(O,void 0,o,r)))}let f=!1,u=!1,c=[],p=new Set,d=0;for(let N=0;N<o.length;N++){let O=o[N],b;if(!Ki(O)||!(b=ct(O,"slot",!0))){O.type!==3&&c.push(O);continue}if(l){t.onError(_e(37,b.loc));break}f=!0;let{children:v,loc:y}=O,{arg:g=Y("default",!0),exp:x,loc:C}=b,S;Qe(g)?S=g?g.content:"default":a=!0;let T=ct(O,"for"),I=n(x,T,v,y),M,A;if(M=ct(O,"if"))a=!0,i.push(nc(M.exp,Pi(g,I,d++),Cd));else if(A=ct(O,/^else(?:-if)?$/,!0)){let $=N,P;for(;$--&&(P=o[$],!!qi(P)););if(P&&Ki(P)&&ct(P,/^(?:else-)?if$/)){let W=i[i.length-1];for(;W.alternate.type===19;)W=W.alternate;W.alternate=A.exp?nc(A.exp,Pi(g,I,d++),Cd):Pi(g,I,d++)}else t.onError(_e(30,A.loc))}else if(T){a=!0;let $=T.forParseResult;$?(lh($,t),i.push(Pe(t.helper(Ec),[$.source,Ho(ac($),Pi(g,I),!0)]))):t.onError(_e(32,T.loc))}else{if(S){if(p.has(S)){t.onError(_e(38,C));continue}p.add(S),S==="default"&&(u=!0)}s.push(Oe(g,I))}}if(!l){let N=(O,b)=>{let v=n(O,void 0,b,r);return t.compatConfig&&(v.isNonScopedSlot=!0),Oe("default",v)};f?c.length&&!c.every(Cc)&&(u?t.onError(_e(39,c[0].loc)):s.push(N(void 0,c))):s.push(N(void 0,o))}let E=a?2:Ui(e.children)?3:1,m=Vt(s.concat(Oe("_",Y(E+"",!1))),r);return i.length&&(m=Pe(t.helper(Fd),[m,uo(i)])),{slots:m,hasDynamicSlots:a}}function Pi(e,t,n){let o=[Oe("name",e),Oe("fn",t)];return n!=null&&o.push(Oe("key",Y(String(n),!0))),Vt(o)}function Ui(e){for(let t=0;t<e.length;t++){let n=e[t];switch(n.type){case 1:if(n.tagType===2||Ui(n.children))return!0;break;case 9:if(Ui(n.branches))return!0;break;case 10:case 11:if(Ui(n.children))return!0;break}}return!1}var ch=new WeakMap,Sy=(e,t)=>function(){if(e=t.currentNode,!(e.type===1&&(e.tagType===0||e.tagType===1)))return;let{tag:o,props:r}=e,s=e.tagType===1,i=s?xy(e,t):`"${o}"`,a=ie(i)&&i.callee===hc,l,f,u=0,c,p,d,E=!1,m=!1,N=a||i===Wr||i===cc||!s&&(o==="svg"||o==="foreignObject"||o==="math");if(r.length>0){let b=fh(e,t,void 0,s,a);l=b.props,u=b.patchFlag,p=b.dynamicPropNames,E=b.needsPatch,m=b.isBlockRequired;let v=b.directives;d=v&&v.length?uo(v.map(y=>wy(y,t))):void 0,b.shouldUseBlock&&(N=!0)}if(e.children.length>0)if(i===Bi&&(N=!0,u|=1024),s&&i!==Wr&&i!==Bi){let{slots:v,hasDynamicSlots:y}=Ny(e,t);f=v,y&&(u|=1024)}else if(e.children.length===1&&i!==Wr){let v=e.children[0],y=v.type,g=y===5||y===8;g&&ft(v,t)===0&&(u|=1),g||y===2?f=v:f=e.children}else f=e.children;p&&p.length&&(c=Oy(p));let O=e.codegenNode=zr(t,i,l,f,u===0?void 0:u,c,d,!!N,!1,s,e.loc);E=E&&(u===0||u===32),E&&(O.needsPatch=!0),m&&(O.isBlockRequired=!0)};function xy(e,t,n=!1){let{tag:o}=e,r=lc(o),s=Zr(e,"is",!1,!0);if(s)if(r||po("COMPILER_IS_ON_ELEMENT",t)){let a;if(s.type===6?a=s.value&&Y(s.value.content,!0):(a=s.exp,a||(a=Y("is",!1,s.arg.loc))),a)return Pe(t.helper(hc),[a])}else s.type===6&&s.value.content.startsWith("vue:")&&(o=s.value.content.slice(4));let i=jd(o)||t.isBuiltInComponent(o);return i?(n||t.helper(i),i):(t.helper(dc),t.components.add(o),Gr(o,"component"))}function fh(e,t,n=e.props,o,r,s=!1){let{tag:i,loc:a,children:l}=e,f=[],u=[],c=[],p=l.length>0,d=!1,E=!1,m=0,N=!1,O=!1,b=!1,v=!1,y=!1,g=!1,x=[],C=A=>{f.length&&(u.push(Vt(Ad(f),a)),f=[]),A&&u.push(A)},S=()=>{t.scopes.vFor>0&&f.push(Oe(Y("ref_for",!0),Y("true")))},T=({key:A,value:$})=>{if(Qe(A)){let P=A.content,W=Wt(P);if(W&&(!o||r)&&P.toLowerCase()!=="onclick"&&P!=="onUpdate:modelValue"&&!Ft(P)&&(v=!0),W&&Ft(P)&&(g=!0),P==="ref"&&(N=!0),W&&$.type===14&&($=$.arguments[0]),$.type===20||($.type===4||$.type===8)&&ft($,t)>0)return;P==="class"?O=!0:P==="style"?b=!0:P!=="ref"&&P!=="key"&&!x.includes(P)&&x.push(P),o&&(P==="class"||P==="style")&&!x.includes(P)&&x.push(P)}else y=!0};for(let A=0;A<n.length;A++){let $=n[A];if($.type===6){let{loc:P,name:W,nameLoc:j,value:ae}=$,pe=!0;if(W==="ref"&&(N=!0,S()),W==="is"&&(lc(i)||ae&&ae.content.startsWith("vue:")||po("COMPILER_IS_ON_ELEMENT",t)))continue;f.push(Oe(Y(W,!0,j),Y(ae?ae.content:"",pe,ae?ae.loc:P)))}else{let{name:P,arg:W,exp:j,loc:ae,modifiers:pe}=$,me=P==="bind",se=P==="on";if(P==="slot"){o||t.onError(_e(40,ae));continue}if(P==="once"||P==="memo"||P==="is"||me&&Un(W,"is")&&(lc(i)||po("COMPILER_IS_ON_ELEMENT",t))||se&&s)continue;if(me&&Un(W,"key")&&(d=!0),se&&p&&W&&Qe(W)&&ce(W.content)==="vue:beforeUpdate"&&(d=!0,E=!0),me&&Un(W,"ref")&&S(),!W&&(me||se)){if(y=!0,j)if(me){if(C(),po("COMPILER_V_BIND_OBJECT_ORDER",t)){u.unshift(j);continue}S(),C(),u.push(j)}else C({type:14,loc:ae,callee:t.helper(bc),arguments:o?[j]:[j,"true"]});else t.onError(_e(me?34:35,ae));continue}me&&pe.some(ve=>ve.content==="prop")&&(m|=32);let Le=t.directiveTransforms[P];if(Le){let{props:ve,needRuntime:et}=Le($,e,t);!s&&ve.forEach(T),se&&W&&!Qe(W)?C(Vt(ve,a)):f.push(...ve),et&&(c.push($),De(et)&&ch.set($,et))}else Ma(P)||(c.push($),p&&(d=!0,E=!0))}}let I;u.length?(C(),u.length>1?I=Pe(t.helper(Hi),u,a):I=u[0]):f.length&&(I=Vt(Ad(f),a)),y?m|=16:(O&&!o&&(m|=2),b&&!o&&(m|=4),x.length&&(m|=8),v&&(m|=32));let M=(m===0||m===32)&&(N||g||c.length>0);if(!d&&M&&(m|=512),!t.inSSR&&I)switch(I.type){case 15:let A=-1,$=-1,P=!1;for(let ae=0;ae<I.properties.length;ae++){let pe=I.properties[ae].key;Qe(pe)?pe.content==="class"?A=ae:pe.content==="style"&&($=ae):pe.isHandlerKey||(P=!0)}let W=I.properties[A],j=I.properties[$];P?I=Pe(t.helper(Xr),[I]):(W&&!Qe(W.value)&&(W.value=Pe(t.helper(_c),[W.value])),j&&(b||j.value.type===4&&j.value.content.trim()[0]==="["||j.value.type===17)&&(j.value=Pe(t.helper(yc),[j.value])));break;case 14:break;default:I=Pe(t.helper(Xr),[Pe(t.helper(Qr),[I])]);break}return{props:I,directives:c,patchFlag:m,dynamicPropNames:x,shouldUseBlock:d,needsPatch:M,isBlockRequired:E}}function Ad(e){let t=new Map,n=[];for(let o=0;o<e.length;o++){let r=e[o];if(r.key.type===8||!r.key.isStatic){n.push(r);continue}let s=r.key.content,i=t.get(s);i?(s==="style"||s==="class"||Wt(s))&&Ty(i,r):(t.set(s,r),n.push(r))}return n}function Ty(e,t){e.value.type===17?e.value.elements.push(t.value):e.value=uo([e.value,t.value],e.loc)}function wy(e,t){let n=[],o=ch.get(e);o?n.push(t.helperString(o)):(t.helper(mc),t.directives.add(e.name),n.push(Gr(e.name,"directive")));let{loc:r}=e;if(e.exp&&n.push(e.exp),e.arg&&(e.exp||n.push("void 0"),n.push(e.arg)),Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));let s=Y("true",!1,r);n.push(Vt(e.modifiers.map(i=>Oe(i,s)),r))}return uo(n,e.loc)}function Oy(e){let t="[";for(let n=0,o=e.length;n<o;n++)t+=JSON.stringify(e[n]),n<o-1&&(t+=", ");return t+"]"}function lc(e){return e==="component"||e==="Component"}var Cy=(e,t)=>{if(Xi(e)){let{children:n,loc:o}=e,{slotName:r,slotProps:s}=Ay(e,t),i=[t.prefixIdentifiers?"_ctx.$slots":"$slots",r,"{}","undefined","true"],a=2;s&&(i[2]=s,a=3),n.length&&(i[3]=Ho([],n,!1,!1,o),a=4),t.scopeId&&!t.slotted&&(a=5),i.splice(a),e.codegenNode=Pe(t.helper($d),i,o)}};function Ay(e,t){let n='"default"',o,r=[];for(let s=0;s<e.props.length;s++){let i=e.props[s];if(i.type===6)i.value&&(i.name==="name"?n=JSON.stringify(i.value.content):(i.name=ce(i.name),r.push(i)));else if(i.name==="bind"&&Un(i.arg,"name")){if(i.exp)n=i.exp;else if(i.arg&&i.arg.type===4){let a=ce(i.arg.content);n=i.exp=Y(a,!1,i.arg.loc)}}else i.name==="bind"&&i.arg&&Qe(i.arg)&&(i.arg.content=ce(i.arg.content)),r.push(i)}if(r.length>0){let{props:s,directives:i}=fh(e,t,r,!1,!1);o=s,i.length&&t.onError(_e(36,i[0].loc))}return{slotName:n,slotProps:o}}var Ic=(e,t,n,o)=>{let{loc:r,modifiers:s,arg:i}=e;!e.exp&&!s.length&&n.onError(_e(35,r));let a;if(i.type===4)if(i.isStatic){let c=i.content;c.startsWith("vue:")&&(c=`vnode-${c.slice(4)}`);let p=t.tagType!==0||c.startsWith("vnode")||!/[A-Z]/.test(c)?cn(ce(c)):`on:${c}`;a=Y(p,!0,i.loc)}else a=Rt([`${n.helperString(tc)}(`,i,")"]);else a=i,a.children.unshift(`${n.helperString(tc)}(`),a.children.push(")");let l=e.exp;l&&!l.content.trim()&&(l=void 0);let f=n.cacheHandlers&&!l&&!n.inVOnce;if(l){let c=Xd(l),p=!(c||A_(l)),d=l.content.includes(";");(p||f&&c)&&(l=Rt([`${p?"$event":"(...args)"} => ${d?"{":"("}`,l,d?"}":")"]))}let u={props:[Oe(a,l||Y("() => {}",!1,r))]};return o&&(u=o(u)),f&&(u.props[0].value=n.cache(u.props[0].value)),u.props.forEach(c=>c.key.isHandlerKey=!0),u},Dy=(e,t,n)=>{let{modifiers:o,loc:r}=e,s=e.arg,{exp:i}=e;return i&&i.type===4&&!i.content.trim()&&(i=void 0),s.type!==4?(s.children.unshift("("),s.children.push(') || ""')):s.isStatic||(s.content=s.content?`${s.content} || ""`:'""'),o.some(a=>a.content==="camel")&&(s.type===4?s.isStatic?s.content=ce(s.content):s.content=`${n.helperString(ec)}(${s.content})`:(s.children.unshift(`${n.helperString(ec)}(`),s.children.push(")"))),n.inSSR||(o.some(a=>a.content==="prop")&&Dd(s,"."),o.some(a=>a.content==="attr")&&Dd(s,"^")),{props:[Oe(s,i)]}},Dd=(e,t)=>{e.type===4?e.isStatic?e.content=t+e.content:e.content=`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"))},Iy=(e,t)=>{if(e.type===0||e.type===1||e.type===11||e.type===10)return()=>{let n=e.children,o,r=!1;for(let s=0;s<n.length;s++){let i=n[s];if(Ql(i)){r=!0;for(let a=s+1;a<n.length;a++){let l=n[a];if(Ql(l))o||(o=n[s]=Rt([i],i.loc)),o.children.push(" + ",l),n.splice(a,1),a--;else{o=void 0;break}}}}if(!(!r||n.length===1&&(e.type===0||e.type===1&&e.tagType===0&&!e.props.find(s=>s.type===7&&!t.directiveTransforms[s.name])&&e.tag!=="template")))for(let s=0;s<n.length;s++){let i=n[s];if(Ql(i)||i.type===8){let a=[];(i.type!==2||i.content!==" ")&&a.push(i),!t.ssr&&ft(i,t)===0&&a.push("1"),n[s]={type:12,content:i,loc:i.loc,codegenNode:Pe(t.helper(pc),a)}}}}},Id=new WeakSet,ky=(e,t)=>{if(e.type===1&&ct(e,"once",!0))return Id.has(e)||t.inVOnce||t.inSSR?void 0:(Id.add(e),t.inVOnce=!0,t.helper(ji),()=>{t.inVOnce=!1;let n=t.currentNode;n.codegenNode&&(n.codegenNode=t.cache(n.codegenNode,!0,!0))})},kc=(e,t,n)=>{let{exp:o,arg:r}=e;if(!o)return n.onError(_e(41,e.loc)),jr();let s=o.loc.source.trim(),i=o.type===4?o.content:s,a=n.bindingMetadata[s];if(a==="props"||a==="props-aliased")return n.onError(_e(44,o.loc)),jr();if(a==="literal-const"||a==="setup-const")return n.onError(_e(45,o.loc)),jr();if(!i.trim()||!Xd(o))return n.onError(_e(42,o.loc)),jr();let l=r||Y("modelValue",!0),f=r?Qe(r)?`onUpdate:${ce(r.content)}`:Rt(['"onUpdate:" + ',r]):"onUpdate:modelValue",u,c=n.isTS?"($event: any)":"$event";u=Rt([`${c} => ((`,o,") = $event)"]);let p=[Oe(l,e.exp),Oe(f,u)];if(e.modifiers.length&&t.tagType===1){let d=e.modifiers.map(m=>m.content).map(m=>(wc(m)?m:JSON.stringify(m))+": true").join(", "),E=r?Qe(r)?`${r.content}Modifiers`:Rt([r,' + "Modifiers"']):"modelModifiers";p.push(Oe(E,Y(`{ ${d} }`,!1,e.loc,2)))}return jr(p)};function jr(e=[]){return{props:e}}var Vy=/[\w).+\-_$\]]/,Ry=(e,t)=>{po("COMPILER_FILTERS",t)&&(e.type===5?Gi(e.content,t):e.type===1&&e.props.forEach(n=>{n.type===7&&n.name!=="for"&&n.exp&&Gi(n.exp,t)}))};function Gi(e,t){if(e.type===4)kd(e,t);else for(let n=0;n<e.children.length;n++){let o=e.children[n];typeof o=="object"&&(o.type===4?kd(o,t):o.type===8?Gi(o,t):o.type===5&&Gi(o.content,t))}}function kd(e,t){let n=e.content,o=!1,r=!1,s=!1,i=!1,a=0,l=0,f=0,u=0,c,p,d,E,m=[];for(d=0;d<n.length;d++)if(p=c,c=n.charCodeAt(d),o)c===39&&p!==92&&(o=!1);else if(r)c===34&&p!==92&&(r=!1);else if(s)c===96&&p!==92&&(s=!1);else if(i)c===47&&p!==92&&(i=!1);else if(c===124&&n.charCodeAt(d+1)!==124&&n.charCodeAt(d-1)!==124&&!a&&!l&&!f)E===void 0?(u=d+1,E=n.slice(0,d).trim()):N();else{switch(c){case 34:r=!0;break;case 39:o=!0;break;case 96:s=!0;break;case 40:f++;break;case 41:f--;break;case 91:l++;break;case 93:l--;break;case 123:a++;break;case 125:a--;break}if(c===47){let O=d-1,b;for(;O>=0&&(b=n.charAt(O),b===" ");O--);(!b||!Vy.test(b))&&(i=!0)}}E===void 0?E=n.slice(0,d).trim():u!==0&&N();function N(){m.push(n.slice(u,d).trim()),u=d+1}if(m.length){for(d=0;d<m.length;d++)E=My(E,m[d],t);e.content=E,e.ast=void 0}}function My(e,t,n){n.helper(gc);let o=t.indexOf("(");if(o<0)return n.filters.add(t),`${Gr(t,"filter")}(${e})`;{let r=t.slice(0,o),s=t.slice(o+1);return n.filters.add(r),`${Gr(r,"filter")}(${e}${s!==")"?","+s:s}`}}var Vd=new WeakSet,Py=(e,t)=>{if(e.type===1){let n=ct(e,"memo");return!n||Vd.has(e)||t.inSSR?void 0:(Vd.add(e),()=>{let o=e.codegenNode||t.currentNode.codegenNode;o&&o.type===13&&(e.tagType!==1&&xc(o,t),e.codegenNode=Pe(t.helper(Sc),[n.exp,Ho(void 0,o),"_cache",String(t.cached.length)]),t.cached.push(null))})}},Ly=(e,t)=>{if(e.type===1){for(let n of e.props)if(n.type===7&&n.name==="bind"&&(!n.exp||n.exp.type===4&&!n.exp.content.trim())&&n.arg){let o=n.arg;if(o.type!==4||!o.isStatic)t.onError(_e(53,o.loc)),n.exp=Y("",!0,o.loc);else{let r=ce(o.content);(Wd.test(r[0])||r[0]==="-")&&(n.exp=Y(r,!1,o.loc))}}}};function $y(e){return[[Ly,ky,hy,Py,vy,Ry,Cy,Sy,yy,Iy],{on:Ic,bind:Dy,model:kc}]}function uh(e,t={}){let n=t.onError||Tc,o=t.mode==="module";t.prefixIdentifiers===!0?n(_e(48)):o&&n(_e(49));let r=!1;t.cacheHandlers&&n(_e(50)),t.scopeId&&!o&&n(_e(51));let s=q({},t,{prefixIdentifiers:r}),i=z(e)?Zd(e,s):e,[a,l]=$y();return q_(i,q({},s,{nodeTransforms:[...a,...t.nodeTransforms||[]],directiveTransforms:q({},l,t.directiveTransforms||{})})),Z_(i,s)}var ph=()=>({props:[]});var hh=Symbol(""),mh=Symbol(""),gh=Symbol(""),vh=Symbol(""),Vc=Symbol(""),Eh=Symbol(""),_h=Symbol(""),yh=Symbol(""),Rc=Symbol(""),bh=Symbol("");Bd({[hh]:"vModelRadio",[mh]:"vModelCheckbox",[gh]:"vModelText",[vh]:"vModelSelect",[Vc]:"vModelDynamic",[Eh]:"withModifiers",[_h]:"withKeys",[yh]:"vShow",[Rc]:"Transition",[bh]:"TransitionGroup"});var Xo;function Fy(e,t=!1){return Xo||(Xo=document.createElement("div")),t?(Xo.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,Xo.children[0].getAttribute("foo")):(Xo.innerHTML=e,Xo.textContent)}var Uy={parseMode:"html",isVoidTag:Pf,isNativeTag:e=>La(e)||$a(e)||Fa(e),isPreTag:e=>e==="pre",isIgnoreNewlineTag:e=>e==="pre"||e==="textarea",decodeEntities:Fy,isBuiltInComponent:e=>{if(e==="Transition"||e==="transition")return Rc;if(e==="TransitionGroup"||e==="transition-group")return bh},getNamespace(e,t,n){let o=t?t.ns:n;if(t&&o===2)if(t.tag==="annotation-xml"){if(e==="svg")return 1;t.props.some(r=>r.type===6&&r.name==="encoding"&&r.value!=null&&(r.value.content==="text/html"||r.value.content==="application/xhtml+xml"))&&(o=0)}else/^m(?:[ions]|text)$/.test(t.tag)&&e!=="mglyph"&&e!=="malignmark"&&(o=0);else t&&o===1&&(t.tag==="foreignObject"||t.tag==="desc"||t.tag==="title")&&(o=0);if(o===0){if(e==="svg")return 1;if(e==="math")return 2}return o}},By=e=>{e.type===1&&e.props.forEach((t,n)=>{t.type===6&&t.name==="style"&&t.value&&(e.props[n]={type:7,name:"bind",arg:Y("style",!0,t.loc),exp:Hy(t.value.content,t.loc),modifiers:[],loc:t.loc})})},Hy=(e,t)=>{let n=Pa(e);return Y(JSON.stringify(n),!1,t,3)};function xn(e,t){return _e(e,t,void 0)}var jy=(e,t,n)=>{let{exp:o,loc:r}=e;return o||n.onError(xn(54,r)),t.children.length&&(n.onError(xn(55,r)),t.children.length=0),{props:[Oe(Y("innerHTML",!0,r),o||Y("",!0))]}},Wy=(e,t,n)=>{let{exp:o,loc:r}=e;return o||n.onError(xn(56,r)),t.children.length&&(n.onError(xn(57,r)),t.children.length=0),{props:[Oe(Y("textContent",!0),o?ft(o,n)>0?o:Pe(n.helperString(Yr),[o],r):Y("",!0))]}},Ky=(e,t,n)=>{let o=kc(e,t,n);if(!o.props.length||t.tagType===1)return o;e.arg&&n.onError(xn(59,e.arg.loc));function r(){let a=ct(t,"bind");a&&Un(a.arg,"value")&&n.onError(xn(61,a.loc))}let{tag:s}=t,i=n.isCustomElement(s);if(s==="input"||s==="textarea"||s==="select"||i){let a=gh,l=!1;if(s==="input"||i){let f=Zr(t,"type");if(f){if(f.type===7)a=Vc;else if(f.value)switch(f.value.content){case"radio":a=hh;break;case"checkbox":a=mh;break;case"file":l=!0,n.onError(xn(60,e.loc));break;default:break}}else zd(t)&&(a=Vc)}else s==="select"&&(a=vh);l||(o.needRuntime=n.helper(a))}else n.onError(xn(58,e.loc));return o.props=o.props.filter(a=>!(a.key.type===4&&a.key.content==="modelValue")),o},Xy=He("passive,once,capture"),zy=He("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),Gy=He("left,right"),Nh=He("onkeyup,onkeydown,onkeypress"),qy=(e,t,n,o)=>{let r=[],s=[],i=[];for(let a=0;a<t.length;a++){let l=t[a].content;l==="native"&&Ko("COMPILER_V_ON_NATIVE",n,o)||Xy(l)?i.push(l):Gy(l)?Qe(e)?Nh(e.content.toLowerCase())?r.push(l):s.push(l):(r.push(l),s.push(l)):zy(l)?s.push(l):r.push(l)}return{keyModifiers:r,nonKeyModifiers:s,eventOptionModifiers:i}},dh=(e,t)=>Qe(e)&&e.content.toLowerCase()==="onclick"?Y(t,!0):e.type!==4?Rt(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,Jy=(e,t,n)=>Ic(e,t,n,o=>{let{modifiers:r}=e;if(!r.length)return o;let{key:s,value:i}=o.props[0],{keyModifiers:a,nonKeyModifiers:l,eventOptionModifiers:f}=qy(s,r,n,e.loc);if(l.includes("right")&&(s=dh(s,"onContextmenu")),l.includes("middle")&&(s=dh(s,"onMouseup")),l.length&&(i=Pe(n.helper(Eh),[i,JSON.stringify(l)])),a.length&&(!Qe(s)||Nh(s.content.toLowerCase()))&&(i=Pe(n.helper(_h),[i,JSON.stringify(a)])),f.length){let u=f.map(Ot).join("");s=Qe(s)?Y(`${s.content}${u}`,!0):Rt(["(",s,`) + "${u}"`])}return{props:[Oe(s,i)]}}),Yy=(e,t,n)=>{let{exp:o,loc:r}=e;return o||n.onError(xn(62,r)),{props:[],needRuntime:n.helper(yh)}},Qy=(e,t)=>{if(e.type===1&&e.tagType===1&&t.isBuiltInComponent(e.tag)===Rc)return()=>{if(!e.children.length)return;let o=Sh(e),r=e.children[0];if(r.type===1)for(let s of r.props)s.type===7&&s.name==="show"&&e.props.push({type:6,name:"persisted",nameLoc:e.loc,value:void 0,loc:e.loc})}};function Sh(e){let t=e.children=e.children.filter(o=>!qi(o)),n=t[0];return t.length!==1||n.type===11||n.type===9&&n.branches.some(Sh)}var Zy=(e,t)=>{e.type===1&&e.tagType===0&&(e.tag==="script"||e.tag==="style")&&t.removeNode()};var eb=[By,Qy],tb={cloak:ph,html:jy,text:Wy,model:Ky,on:Jy,show:Yy};function xh(e,t={}){return uh(e,q({},Uy,t,{nodeTransforms:[Zy,...eb,...t.nodeTransforms||[]],directiveTransforms:q({},tb,t.directiveTransforms||{}),transformHoist:null}))}var Th=Object.create(null);function nb(e,t){if(!z(e))if(e.nodeType)e=e.innerHTML;else return Ie;let n=kf(e,t),o=Th[n];if(o)return o;if(e[0]==="#"){let l=document.querySelector(e);e=l?l.innerHTML:""}let r=q({hoistStatic:!0,onError:void 0,onWarn:Ie},t);!r.isCustomElement&&typeof customElements<"u"&&(r.isCustomElement=l=>!!customElements.get(l));let{code:s}=xh(e,r);function i(l,f=!1){let u=f?l.message:`Template compilation error: ${l.message}`,c=l.loc&&Rf(e,l.loc.start.offset,l.loc.end.offset);Ti(c?`${u}
${c}`:u)}let a=new Function("Vue",s)(Yl);return a._rc=!0,Th[n]=a}Ll(nb);var wh="tavern_language_vocab_v1",Mc="default";function Oh(){return{activeBookId:Mc,books:[{id:Mc,name:"\u9ED8\u8BA4\u751F\u8BCD\u672C",createdAt:Date.now()}],items:[]}}var re=Oh(),ob=new Set;function Bn(){try{Z().localStorage.setItem(wh,JSON.stringify(re))}catch(e){console.warn("[TavernLanguage] \u4FDD\u5B58\u751F\u8BCD\u672C\u5931\u8D25:",e)}ob.forEach(e=>{try{e(re)}catch{}})}function Ch(){try{let e=Z().localStorage.getItem(wh);if(e){let t=JSON.parse(e);if(t&&Array.isArray(t.books)&&Array.isArray(t.items))return t.books.length===0&&t.books.push({id:Mc,name:"\u9ED8\u8BA4\u751F\u8BCD\u672C",createdAt:Date.now()}),t.books.some(n=>n.id===t.activeBookId)||(t.activeBookId=t.books[0].id),re=t,re}}catch{}return re=Oh(),re}function Pc(){return re}function Qi(e,t){return`${String(t||"en").toLowerCase()}::${String(e||"").trim().toLowerCase()}`}function Ah(e,t){let n=Qi(e,t);return re.items.find(o=>o.key===n)||null}function Zi(e){re.books.some(t=>t.id===e)&&(re.activeBookId=e,Bn())}function Dh(e){let t=String(e||"").trim();if(!t)return null;let n=`book_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,o={id:n,name:t,createdAt:Date.now()};return re.books.push(o),re.activeBookId=n,Bn(),o}function Ih(e){if(re.books.length<=1)return!1;let t=re.books.findIndex(o=>o.id===e);if(t<0)return!1;re.books.splice(t,1);let n=re.books[0].id;return re.items.forEach(o=>{o.bookId===e&&(o.bookId=n)}),re.activeBookId===e&&(re.activeBookId=n),Bn(),!0}function Lc(e){let t=String(e.word||"").trim(),n=String(e.lang||"en").toLowerCase();if(!t)return null;let o=Qi(t,n),r=e.bookId||re.activeBookId||re.books[0].id,s=re.items.find(a=>a.key===o);if(s)return s.bookId=r,e.phonetic&&(s.phonetic=e.phonetic),e.reading&&(s.reading=e.reading),e.briefCn&&(s.briefCn=e.briefCn),e.pos&&(s.pos=e.pos),e.context&&(s.context=e.context),e.audioUrl&&(s.audioUrl=e.audioUrl),s.updatedAt=Date.now(),Bn(),s;let i={id:`w_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,key:o,word:t,lang:n,bookId:r,phonetic:e.phonetic||"",reading:e.reading||"",pos:e.pos||"",briefCn:e.briefCn||"",context:e.context||"",audioUrl:e.audioUrl||"",createdAt:Date.now(),updatedAt:Date.now()};return re.items.unshift(i),Bn(),i}function ea(e,t=null){let n=-1;if(t){let o=Qi(e,t);n=re.items.findIndex(r=>r.key===o)}else n=re.items.findIndex(o=>o.id===e);return n<0?!1:(re.items.splice(n,1),Bn(),!0)}function kh(e,t){let n=re.items.find(o=>o.id===e);return!n||!re.books.some(o=>o.id===t)?!1:(n.bookId=t,n.updatedAt=Date.now(),Bn(),!0)}function Vh(){return JSON.stringify(re,null,2)}function Rh(e){let t=JSON.parse(e);if(!t||!Array.isArray(t.books)||!Array.isArray(t.items))throw new Error("\u65E0\u6548\u7684\u751F\u8BCD\u672C JSON \u683C\u5F0F");for(let n of t.books)n?.id&&n?.name&&!re.books.some(o=>o.id===n.id)&&re.books.push({id:n.id,name:n.name,createdAt:n.createdAt||Date.now()});for(let n of t.items){if(!n?.word||!n?.lang)continue;let o=Qi(n.word,n.lang);if(!re.items.some(r=>r.key===o)){let r=re.books.some(s=>s.id===n.bookId)?n.bookId:re.books[0].id;re.items.push({...n,key:o,bookId:r})}}return Bn(),re.items.length}var ne=Gt({config:J(),vocab:Pc(),popover:{visible:!1,loading:!1,word:"",lang:"en",contextSentence:"",entry:null,activeSourceId:"",sentenceTranslation:"",sentenceLoading:!1,showBookPicker:!1,placement:"below",style:{}},selection:{visible:!1,text:"",lang:"en",translation:"",loading:!1,style:{}},modal:{visible:!1,activeTab:"vocab"}});function ts(){ne.config=JSON.parse(JSON.stringify(J()))}function Mt(){ne.vocab=JSON.parse(JSON.stringify(Pc()))}function Mh(){nf(),Ch(),ts(),Mt()}function mo(e="general"){ne.modal.activeTab=e,ne.modal.visible=!0}function $c(){ne.modal.visible=!1}var Fc="tl-option-language-settings",Uc="tl-option-vocab-book",zo=null;function rb(e){let t=e.getElementById("options");t&&(t.style.display="none")}function Ph(e,t,n,o,r){let s=e.createElement("a");return s.id=t,s.className="tl-ignore",s.innerHTML=`<i class="fa-lg fa-solid ${n}"></i><span>${o}</span>`,s.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),rb(e),mo(r)}),s}function Lh(){let e=he();e.getElementById("tl-settings-entry")?.remove(),e.getElementById("tl-options-entry")?.remove();let t=e.querySelector("#options .options-content")||e.getElementById("options_content")||e.getElementById("options");return t?(e.getElementById(Uc)||t.appendChild(Ph(e,Uc,"fa-star","\u6211\u7684\u751F\u8BCD\u672C","vocab")),e.getElementById(Fc)||t.appendChild(Ph(e,Fc,"fa-language","\u5916\u8BED\u5B66\u4E60\u8BBE\u7F6E","general")),!0):!1}function $h(){if(Bc(),Lh())return;let e=0;zo=setInterval(()=>{e++,(Lh()||e>=20)&&(clearInterval(zo),zo=null)},500)}function Bc(){zo&&(clearInterval(zo),zo=null);let e=he();e.getElementById(Fc)?.remove(),e.getElementById(Uc)?.remove(),e.getElementById("tl-settings-entry")?.remove(),e.getElementById("tl-options-entry")?.remove()}var en=new Map,Lt=new Map,Go=new Map,jc="tavern_language_dict_cache_v1",Bh=400,sb=4e3,Fh=!1,Hc=null,Pt={noun:{abbr:"n.",cn:"\u540D\u8BCD",tone:"noun"},"proper noun":{abbr:"prop.n.",cn:"\u4E13\u6709\u540D\u8BCD",tone:"noun"},verb:{abbr:"v.",cn:"\u52A8\u8BCD",tone:"verb"},adjective:{abbr:"adj.",cn:"\u5F62\u5BB9\u8BCD",tone:"adj"},adverb:{abbr:"adv.",cn:"\u526F\u8BCD",tone:"adv"},pronoun:{abbr:"pron.",cn:"\u4EE3\u8BCD",tone:"other"},preposition:{abbr:"prep.",cn:"\u4ECB\u8BCD",tone:"other"},conjunction:{abbr:"conj.",cn:"\u8FDE\u8BCD",tone:"other"},interjection:{abbr:"int.",cn:"\u611F\u53F9\u8BCD",tone:"other"},article:{abbr:"art.",cn:"\u51A0\u8BCD",tone:"other"},determiner:{abbr:"det.",cn:"\u9650\u5B9A\u8BCD",tone:"other"},particle:{abbr:"part.",cn:"\u52A9\u8BCD",tone:"other"},expression:{abbr:"expr.",cn:"\u60EF\u7528\u8BED",tone:"other"},numeral:{abbr:"num.",cn:"\u6570\u8BCD",tone:"other"},prefix:{abbr:"pref.",cn:"\u524D\u7F00",tone:"other"},suffix:{abbr:"suff.",cn:"\u540E\u7F00",tone:"other"}};function Be(e){let t=String(e||"").toLowerCase().trim();return Pt[t]?Pt[t]:t.includes("noun")?Pt.noun:t.includes("verb")?Pt.verb:t.includes("adj")?Pt.adjective:t.includes("adv")?Pt.adverb:t.includes("pron")?Pt.pronoun:t.includes("prep")?Pt.preposition:t.includes("conj")?Pt.conjunction:t.includes("interj")?Pt.interjection:t.includes("part")?Pt.particle:t.includes("expr")?Pt.expression:{abbr:e||"\u8BCD\u9879",cn:"",tone:"other"}}function Wc(){if(!Fh){Fh=!0;try{let e=Z().localStorage.getItem(jc);if(!e)return;let t=JSON.parse(e);if(Array.isArray(t))for(let[n,o]of t)n&&o&&Lt.set(n,o)}catch{}}}function ib(){Hc||(Hc=setTimeout(()=>{Hc=null;try{let e=[...Lt.entries()].slice(-Bh);Z().localStorage.setItem(jc,JSON.stringify(e))}catch{}},600))}function Uh(e,t){if(Wc(),Lt.has(e)&&Lt.delete(e),Lt.size>=Bh){let n=Lt.keys().next().value;Lt.delete(n)}Lt.set(e,t),ib()}function ab(e,t){return new Promise((n,o)=>{let r=setTimeout(()=>o(new Error("\u8BCD\u5178\u8BF7\u6C42\u8D85\u65F6")),t);e.then(s=>{clearTimeout(r),n(s)},s=>{clearTimeout(r),o(s)})})}function ut(e){if(!e||!e.id)throw new Error("[TavernLanguage] registerDictionary \u9700\u8981 id \u5B57\u6BB5");return en.set(e.id,e),e}function na(e=null){let t=[...en.values()];return e?t.filter(n=>n.languages.includes("*")||n.languages.includes(e)):t}function Hh(e){return en.get(e)||null}function jh(){Lt.clear(),Go.clear();try{Z().localStorage.removeItem(jc)}catch{}}function ns(e){let t=J(),n=ot(e),o=t.dictionaryChains?.[e];return(Array.isArray(o)&&o.length>0?o:n?.defaultDictionaries||["google-dict","wiktionary","ai-context"]).filter(s=>en.has(s))}async function lb(e){let t=J();if(!t.autoTranslateDict||!e||!Array.isArray(e.meanings))return e;let n=[];for(let o of e.meanings)for(let r of o.definitions||[])!r.cn&&r.text&&n.length<5&&n.push(r);if(n.length===0)return e;try{let o=n.map(i=>i.text).join(`
`),s=(await mt(o,{from:"en",to:"zh-CN",providerId:t.translator==="tavern-ai"?"google":t.translator})).split(/\r?\n/).map(i=>i.trim());s.length===n.length&&n.forEach((i,a)=>{i.cn=s[a]||""})}catch{}return e}async function ta(e,t,n){let o=e.id==="ai-context"?15e3:sb,r=await ab(e.lookup(t,n),o);return r&&r.meanings&&r.meanings.length>0?(r.sourceId=e.id,r.sourceName=e.name,r):null}function Wh(e,t=null){let n=String(e||"").trim();if(!n)return;let o=t||J().targetLang||"en",r=`auto|${o}|${n.toLowerCase()}`;Wc(),!(Lt.has(r)||Go.has(r))&&os(n,{lang:o}).catch(()=>{})}async function os(e,t={}){let n=String(e||"").trim();if(!n)return null;Wc();let o=J(),r=t.lang||o.targetLang||"en",s=ot(r),i=t.sourceId||null,a=typeof t.onUpdate=="function"?t.onUpdate:null,l=`${i||"auto"}|${r}|${n.toLowerCase()}`;if(!t.bypassCache&&Lt.has(l)){let u=Lt.get(l);return a&&a(u,!1),u}if(!t.bypassCache&&Go.has(l)){let u=await Go.get(l);return u&&a&&a(u,!1),u}let f=(async()=>{let u=i?[i]:ns(r),c={lang:r,langDef:s,context:t.context||"",config:o},p=i?u:u.filter(N=>N!=="ai-context"||u.length===1),d=null,E=!1;if(!i){let N=p.filter(O=>en.get(O)?.isLocal);for(let O of N){let b=en.get(O);if(b)try{if(d=await ta(b,n,c),d){E=!0;break}}catch{}}}let m=i?p:p.filter(N=>!en.get(N)?.isLocal);if(!d&&m.length>=2&&!i){let N=m.slice(0,2).map(O=>{let b=en.get(O);return b?ta(b,n,c).then(v=>{if(!v)throw new Error("empty");return v}):Promise.reject(new Error("missing"))});try{d=await Promise.any(N)}catch{d=null}if(!d&&m.length>2)for(let O of m.slice(2)){let b=en.get(O);if(b)try{if(d=await ta(b,n,c),d)break}catch{}}}else if(!d)for(let N of m){let O=en.get(N);if(O)try{if(d=await ta(O,n,c),d)break}catch(b){console.warn(`[TavernLanguage] \u8BCD\u5178 ${N} \u67E5\u8BCD\u5931\u8D25 (${n}):`,b?.message||b)}}if(d)return a&&a({...d},!1),d.meanings.some(O=>(O.definitions||[]).some(b=>!b.cn&&b.text))&&o.autoTranslateDict&&(await lb(d),a&&a({...d},!1)),E||Uh(l,d),d;try{let N=await mt(n,{from:r,to:"zh-CN"});if(N){let O={word:n,phonetic:"",reading:"",audioUrl:"",briefCn:N,tags:[],sourceId:"fallback-translate",sourceName:"\u76F4\u8BD1",meanings:[{pos:"translation",posInfo:{abbr:"\u8BD1",cn:"\u76F4\u8BD1",tone:"other"},definitions:[{text:"",cn:N,example:""}]}]};return Uh(l,O),a&&a(O,!1),O}}catch{}return null})();Go.set(l,f);try{return await f}finally{Go.delete(l)}}var tn=null,rs=null,ss=null,is=null,Kc=0;function oa(){ne.popover.visible=!1,ne.popover.showBookPicker=!1,tn&&(tn.classList.remove("tl-word-active"),tn=null)}function cb(e){let t=Z(),n=he(),o=t.visualViewport?.width||t.innerWidth,r=t.visualViewport?.height||t.innerHeight,s=10,i=26,a=e.getBoundingClientRect(),l=a.top-i-s,f=r-(a.bottom+i)-s;if(l<210&&f<210){let N=n.getElementById("chat");if(N&&N.scrollHeight>N.clientHeight){let O=Math.round(r*.28),b=a.top-O;N.scrollTop+=b,a=e.getBoundingClientRect()}}let u=Math.max(s,a.top-i),c=Math.min(r-s,a.bottom+i),p=u-s,E=r-c-s>=p?"below":"above",m={};if(E==="below"){let N=Math.min(r-180,Math.round(c+6)),O=Math.max(170,Math.min(400,Math.round(r-N-s-6)));m.top=`${N}px`,m.bottom="auto",m.maxHeight=`${O}px`}else{let N=Math.min(r-180,Math.round(r-u+6)),O=Math.max(170,Math.min(400,Math.round(r-N-s-6)));m.bottom=`${N}px`,m.top="auto",m.maxHeight=`${O}px`}if(o<=640)m.left=`${s}px`,m.right=`${s}px`,m.width="auto";else{let N=Math.min(368,o-s*2),O=Math.max(s,Math.min(a.left+a.width/2-N/2,o-N-s));m.left=`${Math.round(O)}px`,m.right="auto",m.width=`${N}px`}return{placement:E,style:m}}async function Kh(e,t=null){let n=e.dataset.tlWord||e.textContent||"",o=e.dataset.tlLang||J().targetLang||"en";if(!n.trim())return;tn&&tn!==e&&tn.classList.remove("tl-word-active"),tn=e,tn.classList.add("tl-word-active");let r=af(e),{placement:s,style:i}=cb(e),a=++Kc,l=ne.popover;l.visible=!0,l.loading=!0,l.word=n,l.lang=o,l.contextSentence=r,l.entry=null,l.activeSourceId=t||"",l.sentenceTranslation="",l.sentenceLoading=!1,l.showBookPicker=!1,l.placement=s,l.style=i,!t&&J().autoSpeakWord&&No(n,{lang:o}).catch(()=>{});let f=await os(n,{lang:o,context:r,sourceId:t,onUpdate(u,c){a!==Kc||!ne.popover.visible||(l.entry=u,l.loading=c,u?.sourceId&&(l.activeSourceId=t||u.sourceId),!t&&J().autoSpeakWord&&u?.audioUrl&&No(n,{lang:o,audioUrl:u.audioUrl}).catch(()=>{}))}});a!==Kc||!ne.popover.visible||(l.loading=!1,f&&(l.entry=f,l.activeSourceId=t||f.sourceId||""))}function Xh(){Xc();let e=he();rs=t=>{if(t.target?.closest?.(".tl-popover, .tl-sel-bar, .tl-modal-backdrop"))return;let n=t.target?.closest?.("span.tl-word");if(n&&J().enabled){if(!bf(t))return;t.stopPropagation(),Kh(n);return}ne.popover.visible&&oa()},ss=t=>{if(!J().enabled)return;let n=t.target?.closest?.("span.tl-word");if(!n)return;let o=n.dataset.tlWord||n.textContent||"",r=n.dataset.tlLang||J().targetLang||"en";o.trim()&&Wh(o,r)},is=t=>{t.key==="Escape"&&ne.popover.visible&&oa()},e.addEventListener("pointerdown",ss,{passive:!0}),e.addEventListener("click",rs,!1),e.addEventListener("keydown",is,!1)}function Xc(){oa();let e=he();ss&&(e.removeEventListener("pointerdown",ss),ss=null),rs&&(e.removeEventListener("click",rs,!1),rs=null),is&&(e.removeEventListener("keydown",is,!1),is=null)}var zh=at({name:"WordPopover",setup(){let e=ne.popover,t=Ue(()=>ns(e.lang).map(E=>Hh(E)).filter(Boolean)),n=Ue(()=>(ne.vocab.items,Ah(e.entry?.word||e.word,e.lang))),o=Ue(()=>ne.vocab.books||[]);function r(){return e.entry?.word||e.word}function s(){No(r(),{lang:e.lang,audioUrl:e.entry?.audioUrl||""}).catch(()=>{})}function i(d){d&&rn(d,{lang:e.lang}).catch(()=>{})}function a(){e.contextSentence&&rn(e.contextSentence,{lang:e.lang}).catch(()=>{})}async function l(){if(!(!e.contextSentence||e.sentenceLoading)){e.sentenceLoading=!0,e.sentenceTranslation="";try{e.sentenceTranslation=await mt(e.contextSentence,{from:e.lang,to:"zh-CN"})}catch(d){e.sentenceTranslation=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${d?.message||"\u7F51\u7EDC\u5F02\u5E38"}`}finally{e.sentenceLoading=!1}}}function f(d){tn&&Kh(tn,d)}function u(d){let E=e.entry?.meanings?.[0],m=E?.definitions?.[0];return{word:r(),lang:e.lang,bookId:d,phonetic:e.entry?.phonetic||"",reading:e.entry?.reading||"",pos:E?.posInfo?.abbr||E?.pos||"",briefCn:e.entry?.briefCn||m?.cn||m?.text||"",context:e.contextSentence||"",audioUrl:e.entry?.audioUrl||""}}function c(){let d=r();if(n.value)ea(d,e.lang),Mt(),Ne(`\u5DF2\u79FB\u51FA\u751F\u8BCD\u672C\uFF1A${d}`,"info");else{let E=ne.vocab.activeBookId;Lc(u(E)),Mt();let m=o.value.find(N=>N.id===E)?.name||"\u751F\u8BCD\u672C";Ne(`\u5DF2\u6536\u85CF\u5230\u300C${m}\u300D`,"success")}}function p(d){Zi(d),Lc(u(d)),Mt(),e.showBookPicker=!1;let E=o.value.find(m=>m.id===d)?.name||"\u751F\u8BCD\u672C";Ne(`\u5DF2\u4FDD\u5B58\u5230\u300C${E}\u300D`,"success")}return{pop:e,sources:t,starredItem:n,books:o,closeWordPopover:oa,onSpeakWord:s,onSpeakExample:i,onSpeakSentence:a,onTranslateSentence:l,onSwitchSource:f,onToggleStar:c,onSaveToBook:p}},template:`
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
  `});var go=null,as=null,qo=null;function ra(){ne.selection.visible=!1,ne.selection.text="",ne.selection.translation="",ne.selection.loading=!1}function fb(e){let t=Z(),n=t.visualViewport?.width||t.innerWidth,o=t.visualViewport?.height||t.innerHeight,r=10;if(n<=640)return e.top<110?{left:`${r}px`,right:`${r}px`,top:`${Math.min(o-90,Math.round(e.bottom+12))}px`}:{left:`${r}px`,right:`${r}px`,bottom:`${Math.max(r,Math.round(o-e.top+12))}px`};let s=310,i=Math.max(r,Math.min(e.left+e.width/2-s/2,n-s-r));return e.top<110?{left:`${Math.round(i)}px`,top:`${Math.min(o-80,Math.round(e.bottom+10))}px`}:{left:`${Math.round(i)}px`,bottom:`${Math.max(r,Math.round(o-e.top+10))}px`}}function ub(){if(!J().enabled){ra();return}let t=Z().getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return;let n=t.toString().replace(/\s+/g," ").trim();if(n.length<2)return;let o=t.getRangeAt(0),r=o.commonAncestorContainer.nodeType===1?o.commonAncestorContainer:o.commonAncestorContainer.parentElement;if(!r||!r.closest(".mes_text")||r.closest(".tl-trans-block, .tl-mes-footer"))return;let s=o.getBoundingClientRect();!s||s.width===0&&s.height===0||(ne.selection.text=n,ne.selection.lang=J().targetLang||"en",ne.selection.translation="",ne.selection.loading=!1,ne.selection.style=fb(s),ne.selection.visible=!0)}function Gh(){zc();let e=he();go=t=>{t.target?.closest?.(".tl-sel-bar, .tl-popover, .tl-modal-backdrop")||(qo&&clearTimeout(qo),qo=setTimeout(ub,70))},as=t=>{ne.selection.visible&&!t.target?.closest?.(".tl-sel-bar")&&ra()},e.addEventListener("mouseup",go,!1),e.addEventListener("touchend",go,!1),e.addEventListener("mousedown",as,!1)}function zc(){qo&&(clearTimeout(qo),qo=null),ra();let e=he();go&&(e.removeEventListener("mouseup",go,!1),e.removeEventListener("touchend",go,!1),go=null),as&&(e.removeEventListener("mousedown",as,!1),as=null)}var qh=at({name:"SelectionBar",setup(){let e=ne.selection;async function t(){if(!(!e.text||e.loading)){e.loading=!0,e.translation="";try{e.translation=await mt(e.text,{from:e.lang,to:"zh-CN"})}catch(r){e.translation=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${r?.message||"\u7F51\u7EDC\u5F02\u5E38"}`}finally{e.loading=!1}}}function n(){e.text&&rn(e.text,{lang:e.lang}).catch(()=>{})}async function o(){try{await Z().navigator.clipboard.writeText(e.text),Ne("\u5DF2\u590D\u5236\u9009\u4E2D\u6587\u672C","success")}catch{Ne("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236","warning")}}return{sel:e,onTranslate:t,onSpeak:n,onCopy:o,closeSelectionBar:ra}},template:`
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
  `});var Jh=at({name:"VocabBookView",setup(){let e=_t("all"),t=_t("all"),n=_t(""),o=_t(""),r=_t(!1),s=Ue(()=>ne.vocab.books||[]),i=Ue(()=>(ne.vocab.items||[]).length),a=Ue(()=>ne.vocab.activeBookId),l=Ue(()=>yo()),f=Ue(()=>{let y=n.value.trim().toLowerCase();return(ne.vocab.items||[]).filter(g=>!(e.value!=="all"&&g.bookId!==e.value||t.value!=="all"&&g.lang!==t.value||y&&!`${g.word} ${g.briefCn} ${g.reading} ${g.context}`.toLowerCase().includes(y)))});function u(y){return(ne.vocab.items||[]).filter(g=>g.bookId===y).length}function c(){let y=o.value.trim();if(!y)return;let g=Dh(y);g&&(Mt(),e.value=g.id,o.value="",r.value=!1,Ne(`\u5DF2\u65B0\u5EFA\u5355\u8BCD\u672C\u300C${g.name}\u300D`,"success"))}function p(y){Zi(y),Mt(),Ne("\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u85CF\u5355\u8BCD\u672C","success")}function d(y){if(s.value.length<=1){Ne("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u5355\u8BCD\u672C","warning");return}Ih(y.id),Mt(),e.value===y.id&&(e.value="all"),Ne(`\u5DF2\u5220\u9664\u300C${y.name}\u300D\uFF0C\u8BCD\u6761\u5DF2\u4FDD\u7559\u5230\u9ED8\u8BA4\u672C`,"info")}function E(y,g){kh(y.id,g.target.value),Mt(),Ne("\u5DF2\u79FB\u52A8\u81F3\u76EE\u6807\u5355\u8BCD\u672C","success")}function m(y){ea(y.id),Mt()}function N(y){No(y.word,{lang:y.lang,audioUrl:y.audioUrl}).catch(()=>{})}function O(y){y.context&&rn(y.context,{lang:y.lang}).catch(()=>{})}async function b(){try{await Z().navigator.clipboard.writeText(Vh()),Ne("\u751F\u8BCD\u672C JSON \u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F","success")}catch{Ne("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u526A\u8D34\u677F\u6743\u9650","warning")}}function v(){let g=Z().prompt("\u8BF7\u7C98\u8D34\u4E4B\u524D\u5BFC\u51FA\u7684\u751F\u8BCD\u672C JSON\uFF1A");if(g)try{let x=Rh(g);Mt(),Ne(`\u5BFC\u5165\u6210\u529F\uFF0C\u5F53\u524D\u5171 ${x} \u6761\u751F\u8BCD`,"success")}catch(x){Ne(`\u5BFC\u5165\u5931\u8D25\uFF1A${x?.message||"\u683C\u5F0F\u9519\u8BEF"}`,"error")}}return{selectedBookId:e,selectedLang:t,searchQuery:n,newBookName:o,showCreateBook:r,books:s,totalCount:i,activeBookId:a,languages:l,filteredItems:f,countByBook:u,onCreateBook:c,onSetDefaultBook:p,onDeleteBook:d,onMoveItem:E,onRemoveItem:m,onSpeakItem:N,onSpeakContext:O,onExport:b,onImport:v}},template:`
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
  `});var pb="tavern_language_offline_dicts",Yo="dicts",Qh="en-core",Zh="v1",db=["https://fastly.jsdelivr.net/gh/cone97218-alt/language@main/data/dict-en-core.tsv","https://cdn.jsdelivr.net/gh/cone97218-alt/language@main/data/dict-en-core.tsv","https://raw.githubusercontent.com/cone97218-alt/language/main/data/dict-en-core.tsv"],pt=new Map,sa=new Map,ia="idle",Gc=0,em="",ls=null,qc=new Set;function Jo(e,t=""){ia=e,em=t;let n=vo();qc.forEach(o=>{try{o(n)}catch{}})}function vo(){return{status:ia,count:Gc,error:em}}function tm(e){return qc.add(e),()=>qc.delete(e)}function nm(){return new Promise((e,t)=>{let n=Z().indexedDB;if(!n){t(new Error("\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 IndexedDB"));return}let o=n.open(pb,1);o.onupgradeneeded=()=>{let r=o.result;r.objectStoreNames.contains(Yo)||r.createObjectStore(Yo,{keyPath:"id"})},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error||new Error("\u6253\u5F00\u79BB\u7EBF\u8BCD\u5E93\u6570\u636E\u5E93\u5931\u8D25"))})}async function hb(){let e=await nm();return new Promise((t,n)=>{let r=e.transaction(Yo,"readonly").objectStore(Yo).get(Qh);r.onsuccess=()=>{e.close(),t(r.result||null)},r.onerror=()=>{e.close(),n(r.error)}})}async function mb(e,t){let n=await nm();return new Promise((o,r)=>{let s=n.transaction(Yo,"readwrite");s.objectStore(Yo).put({id:Qh,version:Zh,count:t,text:e,updatedAt:Date.now()}),s.oncomplete=()=>{n.close(),o()},s.onerror=()=>{n.close(),r(s.error)}})}function Yh(e){pt.clear(),sa.clear();let t=e.split(`
`),n=!1;for(let o=0;o<t.length;o++){let r=t[o];if(!r||r.charCodeAt(0)===35)continue;if(r==="===LEMMA==="){n=!0;continue}let s=r.indexOf("	");if(s<=0)continue;let i=r.slice(0,s),a=r.slice(s+1);n?sa.set(i,a):pt.set(i,a)}return Gc=pt.size,Gc}async function gb(){let e=db.map(async t=>{let n=await fetch(t,{cache:"default"});if(!n.ok)throw new Error(`HTTP ${n.status}`);let o=await n.text();if(!o.startsWith("#v1")||!o.includes("===LEMMA==="))throw new Error("\u8BCD\u5E93\u6570\u636E\u683C\u5F0F\u65E0\u6548");return o});return Promise.any(e)}function cs({forceDownload:e=!1}={}){return!e&&ia==="ready"&&pt.size>0?Promise.resolve(vo()):(!e&&ls||(ls=(async()=>{try{if(!e){Jo("loading");try{let o=await hb();if(o&&o.version===Zh&&typeof o.text=="string"&&o.text.length>1e4&&(Yh(o.text),pt.size>0))return Jo("ready"),vo()}catch{}}Jo("downloading");let t=await gb(),n=Yh(t);return n>0?(mb(t,n).catch(()=>{}),Jo("ready")):Jo("error","\u8BCD\u5E93\u4E3A\u7A7A"),vo()}catch(t){return Jo("error",t?.message||"\u4E0B\u8F7D\u5931\u8D25"),vo()}finally{ls=null}})()),ls)}var vb={n:"noun",pl:"noun",v:"verb",vt:"verb",vi:"verb",aux:"verb",modal:"verb",a:"adjective",adj:"adjective",ad:"adverb",adv:"adverb",prep:"preposition",conj:"conjunction",pron:"pronoun",int:"interjection",interj:"interjection",art:"article",num:"numeral",det:"determiner",abbr:"noun"};function Eb(e){let t=String(e||"").split("\\n").map(r=>r.trim()).filter(Boolean),n=new Map,o="";for(let r of t){let s="",i=r,a=r.match(/^([a-z]{1,6})\.(?:\/[a-z]{1,6}\.)*\s+(.+)$/i);a&&(s=a[1].toLowerCase(),i=a[2].trim()),o||(o=i);let l=vb[s]||s||"other",f=l==="other"?{abbr:"\u91CA\u4E49",cn:"",tone:"other"}:Be(l),u=f.abbr||l;n.has(u)||n.set(u,{pos:l,posInfo:f,definitions:[]}),n.get(u).definitions.push({cn:i,text:"",example:""})}return{briefCn:o,meanings:[...n.values()]}}function _b(e){let t=[],n=o=>{o&&o.length>=2&&o!==e&&!t.includes(o)&&t.push(o)};if((e.endsWith("'s")||e.endsWith("\u2019s"))&&n(e.slice(0,-2)),(e.endsWith("n't")||e.endsWith("n\u2019t"))&&n(e.slice(0,-3)),e.endsWith("ies")&&e.length>4&&n(e.slice(0,-3)+"y"),e.endsWith("ves")&&e.length>4&&(n(e.slice(0,-3)+"f"),n(e.slice(0,-3)+"fe")),e.endsWith("es")&&e.length>3&&n(e.slice(0,-2)),e.endsWith("s")&&!e.endsWith("ss")&&e.length>3&&n(e.slice(0,-1)),e.endsWith("ied")&&e.length>4&&n(e.slice(0,-3)+"y"),e.endsWith("ed")&&e.length>4){let o=e.slice(0,-2);o.length>=3&&o[o.length-1]===o[o.length-2]&&n(o.slice(0,-1)),n(o),n(o+"e")}if(e.endsWith("ying")&&e.length>5&&n(e.slice(0,-4)+"ie"),e.endsWith("ing")&&e.length>5){let o=e.slice(0,-3);o.length>=3&&o[o.length-1]===o[o.length-2]&&n(o.slice(0,-1)),n(o),n(o+"e")}if(e.endsWith("ier")&&e.length>4&&n(e.slice(0,-3)+"y"),e.endsWith("iest")&&e.length>5&&n(e.slice(0,-4)+"y"),e.endsWith("er")&&e.length>4){let o=e.slice(0,-2);o.length>=3&&o[o.length-1]===o[o.length-2]&&n(o.slice(0,-1)),n(o),n(o+"e")}if(e.endsWith("est")&&e.length>5){let o=e.slice(0,-3);o.length>=3&&o[o.length-1]===o[o.length-2]&&n(o.slice(0,-1)),n(o),n(o+"e")}return e.endsWith("ily")&&e.length>5?n(e.slice(0,-3)+"y"):e.endsWith("ly")&&e.length>4&&(n(e.slice(0,-2)),n(e.slice(0,-2)+"e")),t}function yb(e){let t=String(e||"").trim().toLowerCase().replace(/^['’]+|['’]+$/g,"");if(!t)return null;if(pt.has(t))return{matchedWord:t,raw:pt.get(t),isLemma:!1};let n=sa.get(t);if(n&&pt.has(n))return{matchedWord:n,raw:pt.get(n),isLemma:!0};let o=_b(t);for(let r of o){if(pt.has(r))return{matchedWord:r,raw:pt.get(r),isLemma:!0};let s=sa.get(r);if(s&&pt.has(s))return{matchedWord:s,raw:pt.get(s),isLemma:!0}}return null}var $S=ut({id:"offline-en",name:"\u672C\u5730\u8BCD\u5178",description:"\u79BB\u7EBF 3 \u4E07\u6838\u5FC3\u82F1\u8BED\u8BCD\u5E93\uFF0C0ms \u77AC\u5F00\uFF0C\u65E0\u9700\u8054\u7F51",languages:["en"],isLocal:!0,async lookup(e){if(pt.size===0)return ia==="idle"&&cs(),null;let t=yb(e);if(!t)return null;let n=t.raw.indexOf("	"),o=n>=0?t.raw.slice(0,n).trim():"",r=n>=0?t.raw.slice(n+1):t.raw,{briefCn:s,meanings:i}=Eb(r);return i.length===0?null:{word:e,phonetic:o?`/${o}/`:"",reading:"",audioUrl:"",briefCn:s,tags:t.isLemma?[`\u539F\u5F62 ${t.matchedWord}`]:[],meanings:i}}});var bb=["details","blockquote","table","thinking","status",".status-bar","em","strong"],om=at({name:"SettingsModal",components:{VocabBookView:Jh},setup(){let e=ne.modal,t=Gt(vo()),n=tm(x=>{t.status=x.status,t.count=x.count,t.error=x.error});Pr(()=>n());let o=Ue(()=>t.status==="ready"?`\u5DF2\u5C31\u7EEA \xB7 ${t.count.toLocaleString()} \u8BCD`:t.status==="downloading"?"\u4E0B\u8F7D\u4E2D...":t.status==="loading"?"\u52A0\u8F7D\u4E2D...":t.status==="error"?`\u672A\u5C31\u7EEA \xB7 ${t.error||"\u7F51\u7EDC\u5F02\u5E38"}`:"\u672A\u52A0\u8F7D");async function r(){if(t.status==="downloading")return;let x=await cs({forceDownload:!0});x.status==="ready"?Ne(`\u672C\u5730\u8BCD\u5E93\u5DF2\u66F4\u65B0\uFF08${x.count.toLocaleString()} \u8BCD\uFF09`,"success"):Ne(`\u672C\u5730\u8BCD\u5E93\u4E0B\u8F7D\u5931\u8D25\uFF1A${x.error||"\u8BF7\u68C0\u67E5\u7F51\u7EDC"}`,"error")}let s=Gt({enabled:!0,targetLang:"en",theme:"tavern",promptInjection:{enabled:!0,level:"B1",promptText:"",depth:0},dictionaryChains:{},autoTranslateDict:!0,autoSpeakWord:!1,translator:"google",customAi:{baseUrl:"",apiKey:"",model:""},tts:{engine:"auto",rate:1,enAccent:"us"},ui:{showWordUnderline:!0,autoShowMesButtons:!0,autoTranslateNewMessage:!1},excludeText:""});function i(){let x=JSON.parse(JSON.stringify(J()));Object.assign(s,x),s.promptInjection.promptText=ma(x),s.excludeText=tr(x.excludeSelectors).join(", ")}Lo(()=>e.visible,x=>{x&&i()},{immediate:!0});let a=Ue(()=>yo()),l=Ue(()=>_s()),f=Ue(()=>ot(s.targetLang)),u=Ue(()=>f.value?.levels||[]),c=Ue(()=>{let x=s.targetLang,C=s.dictionaryChains?.[x];return Array.isArray(C)&&C.length>0?C:ns(x)}),p=Ue(()=>{let x=na(s.targetLang),C=c.value;return[...C.map(S=>x.find(T=>T.id===S)).filter(Boolean),...x.filter(S=>!C.includes(S.id))]});function d(){let x=u.value;x.length&&!x.some(C=>C.id===s.promptInjection.level)&&(s.promptInjection.level=x[1]?.id||x[0].id),s.promptInjection.promptText=or(s.targetLang,s.promptInjection.level)}function E(){s.promptInjection.promptText=or(s.targetLang,s.promptInjection.level)}function m(){s.promptInjection.promptText=or(s.targetLang,s.promptInjection.level)}function N(x){return c.value.includes(x)}function O(x,C){let S=s.targetLang,T=[...c.value];if(C&&!T.includes(x))T.push(x);else if(!C){let I=T.indexOf(x);I>=0&&T.splice(I,1)}s.dictionaryChains={...s.dictionaryChains,[S]:T}}function b(x,C){let S=s.targetLang,T=[...c.value],I=T.indexOf(x),M=I+C;I>=0&&M>=0&&M<T.length&&([T[I],T[M]]=[T[M],T[I]],s.dictionaryChains={...s.dictionaryChains,[S]:T})}function v(x){let C=tr(s.excludeText);C.includes(x)||(C.push(x),s.excludeText=C.join(", "))}function y(){jh(),uf(),Ne("\u7F13\u5B58\u5DF2\u6E05\u7406","success")}function g(){let x=JSON.parse(JSON.stringify(s));x.excludeSelectors=tr(s.excludeText),x.tts.rate=Number(s.tts.rate)||1,delete x.excludeText,ds(x),ts(),$c(),Ne("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58","success")}return{VERSION:er,QUICK_EXCLUDE_CHIPS:bb,modal:e,draft:s,languages:a,translators:l,currentLangDef:f,currentLevels:u,orderedDictionaries:p,closeModal:$c,onLangChange:d,onLevelChange:E,onResetPrompt:m,isDictEnabled:N,toggleDict:O,moveDict:b,addExcludeChip:v,offlineDict:t,offlineStatusText:o,onRefreshOfflineDict:r,onClearCache:y,onSave:g}},template:`
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
              <span class="tl-label" style="margin:0;">\u8F93\u51FA\u540E\u81EA\u52A8\u9010\u6BB5\u53CC\u8BED\u7FFB\u8BD1</span>
              <input type="checkbox" v-model="draft.ui.autoTranslateNewMessage" />
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
            <div v-if="draft.targetLang === 'en'" class="tl-field-row">
              <div style="min-width:0;">
                <div class="tl-label" style="margin:0;">\u672C\u5730\u79BB\u7EBF\u82F1\u8BED\u8BCD\u5E93</div>
                <div class="tl-dict-row-desc">{{ offlineStatusText }}</div>
              </div>
              <button
                type="button"
                class="tl-icon-btn"
                :disabled="offlineDict.status === 'downloading'"
                @click="onRefreshOfflineDict"
                title="\u91CD\u65B0\u4E0B\u8F7D\u79BB\u7EBF\u8BCD\u5E93"
              >
                <i class="fa-solid fa-rotate" :class="{ 'fa-spin': offlineDict.status === 'downloading' || offlineDict.status === 'loading' }"></i>
              </button>
            </div>

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
  `});var rm="tl-vue-root",fs=null,Hn=null,Nb=at({name:"TavernLanguageRoot",components:{WordPopover:zh,SelectionBar:qh,SettingsModal:om},template:`
    <WordPopover />
    <SelectionBar />
    <SettingsModal />
  `});function sm(){Jc();let e=he();Hn=e.createElement("div"),Hn.id=rm,Hn.className="tl-ignore",e.body.appendChild(Hn),fs=Hr(Nb),fs.mount(Hn)}function Jc(){if(fs){try{fs.unmount()}catch{}fs=null}Hn&&(Hn.remove(),Hn=null);let e=he().getElementById(rm);e&&e.remove()}var im=/([A-Za-z]+(?:['’][A-Za-z]+)?(?:-[A-Za-z]+)*)/g,rx=Tn({code:"en",name:"\u82F1\u8BED",nativeName:"English",bcp47:"en-US",googleCode:"en",wiktionaryLang:"English",youdaoLang:"en",defaultDictionaries:["offline-en","google-dict","free-dict","wiktionary","ai-context"],levels:[{id:"A2",label:"A2 \u521D\u7EA7",desc:"Use simple A2-level English with short, clear sentences and high-frequency daily vocabulary."},{id:"B1",label:"B1 \u4E2D\u7EA7",desc:"Use natural B1-level intermediate English with everyday expressions and moderate sentence complexity."},{id:"B2",label:"B2 \u4E2D\u9AD8\u7EA7",desc:"Use rich, idiomatic B2-level upper-intermediate English with nuanced phrasing."},{id:"C1",label:"C1 \u9AD8\u7EA7",desc:"Use sophisticated C1-level advanced English with vivid literary vocabulary and natural idioms."},{id:"native",label:"\u6BCD\u8BED\u7EA7",desc:"Use completely natural, authentic native-level English matching the character and setting."}],tokenize(e){let t=[],n=0;im.lastIndex=0;let o;for(;(o=im.exec(e))!==null;){o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1});let r=o[0];t.push({text:r,lookup:r.replace(/’/g,"'"),isWord:r.length>=1}),n=o.index+r.length}return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: English]","Write your ENTIRE response strictly in English (dialogue, narration, actions, and thoughts). Do not translate into Chinese unless explicitly asked in-character.",(this.levels.find(o=>o.id===e)||this.levels[1]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var Sb=/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u3400-\u4DBFー]/,am=/([\u4E00-\u9FFF\u3400-\u4DBF]+[\u3040-\u309F]*|[\u30A0-\u30FFー]+|[\u3040-\u309F]{2,})/g,aa=null;try{typeof Intl<"u"&&typeof Intl.Segmenter=="function"&&(aa=new Intl.Segmenter("ja",{granularity:"word"}))}catch{aa=null}var ax=Tn({code:"ja",name:"\u65E5\u8BED",nativeName:"\u65E5\u672C\u8A9E",bcp47:"ja-JP",googleCode:"ja",wiktionaryLang:"Japanese",youdaoLang:"ja",defaultDictionaries:["google-dict","jotoba","wiktionary","ai-context"],levels:[{id:"N5",label:"JLPT N5",desc:"Use beginner JLPT N5-level Japanese with simple grammar and basic everyday words."},{id:"N4",label:"JLPT N4",desc:"Use JLPT N4-level Japanese with clear conversational expressions."},{id:"N3",label:"JLPT N3",desc:"Use natural JLPT N3-level intermediate Japanese suitable for everyday conversation and light fiction."},{id:"N2",label:"JLPT N2",desc:"Use natural JLPT N2-level Japanese with rich expressions and nuanced tone."},{id:"native",label:"\u6BCD\u8BED\u7EA7",desc:"Use completely natural, authentic native Japanese matching the character personality and context."}],tokenize(e){if(aa){let r=[];for(let s of aa.segment(e)){let i=!!(s.isWordLike&&Sb.test(s.segment));r.push({text:s.segment,lookup:s.segment,isWord:i})}return r}let t=[],n=0;am.lastIndex=0;let o;for(;(o=am.exec(e))!==null;)o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1}),t.push({text:o[0],lookup:o[0],isWord:!0}),n=o.index+o[0].length;return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: Japanese]","Write your ENTIRE response strictly in Japanese (dialogue, narration, actions, and thoughts). Do not include Chinese translations or romaji unless explicitly asked.",(this.levels.find(o=>o.id===e)||this.levels[2]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var lm="A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0152\u0153\xC6\xE6",cm=new RegExp(`([${lm}]+(?:-[${lm}]+)*)`,"g"),fx=Tn({code:"fr",name:"\u6CD5\u8BED",nativeName:"Fran\xE7ais",bcp47:"fr-FR",googleCode:"fr",wiktionaryLang:"French",youdaoLang:"fr",defaultDictionaries:["google-dict","wiktionary","ai-context"],levels:[{id:"A2",label:"A2 \u521D\u7EA7",desc:"Use clear A2-level French with simple sentences and everyday vocabulary."},{id:"B1",label:"B1 \u4E2D\u7EA7",desc:"Use natural B1-level intermediate French with common idiomatic expressions."},{id:"B2",label:"B2 \u4E2D\u9AD8\u7EA7",desc:"Use expressive, idiomatic B2-level French with natural nuance."},{id:"C1",label:"C1 \u9AD8\u7EA7",desc:"Use refined C1-level French with rich literary vocabulary and authentic turns of phrase."},{id:"native",label:"\u6BCD\u8BED\u7EA7",desc:"Use completely authentic, natural native-level French matching the character and atmosphere."}],tokenize(e){let t=[],n=0;cm.lastIndex=0;let o;for(;(o=cm.exec(e))!==null;){o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1});let r=o[0];t.push({text:r,lookup:r,isWord:r.length>=1}),n=o.index+r.length}return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: French]","Write your ENTIRE response strictly in French (dialogue, narration, actions, and thoughts). Do not translate into Chinese unless explicitly asked in-character.",(this.levels.find(o=>o.id===e)||this.levels[1]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var dx=ut({id:"google-dict",name:"\u6781\u901F\u8BCD\u5178",description:"\u5355\u6B21\u8BF7\u6C42\u76F4\u51FA\u8BCD\u6027\u4E0E\u4E2D\u6587\u91CA\u4E49\uFF0C\u54CD\u5E94\u6700\u5FEB\uFF0C\u652F\u6301\u6240\u6709\u8BED\u79CD",languages:["*"],async lookup(e,{lang:t}){let o=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(t||"auto")}&tl=zh-CN&dt=t&dt=bd&dt=rm&q=${encodeURIComponent(e)}`,r=await fetch(o);if(!r.ok)return null;let s=await r.json();if(!Array.isArray(s))return null;let i=Array.isArray(s[0])?s[0].map(f=>Array.isArray(f)?f[0]:"").join("").trim():"",a="";if(Array.isArray(s[0])){for(let f of s[0])if(Array.isArray(f)&&typeof f[3]=="string"&&f[3].trim()){a=f[3].trim();break}}let l=[];if(Array.isArray(s[1]))for(let f of s[1]){if(!Array.isArray(f))continue;let u=f[0]||"",c=Array.isArray(f[1])?f[1].slice(0,6):[];c.length!==0&&l.push({pos:u,posInfo:Be(u),definitions:[{cn:c.join("\uFF1B"),text:"",example:""}]})}return l.length===0&&i&&l.push({pos:"translation",posInfo:{abbr:"\u8BD1",cn:"\u91CA\u4E49",tone:"other"},definitions:[{cn:i,text:"",example:""}]}),l.length===0?null:{word:e,phonetic:"",reading:t==="ja"?a:"",audioUrl:"",briefCn:i,tags:[],meanings:l}}});var gx=ut({id:"free-dict",name:"Free Dictionary",description:"\u82F1\u8BED\u6743\u5A01\u5F00\u6E90\u8BCD\u5178\uFF0C\u63D0\u4F9B\u97F3\u6807\u3001\u8BCD\u6027\u3001\u4F8B\u53E5\u4E0E\u771F\u4EBA\u53D1\u97F3",languages:["en"],async lookup(e,{config:t}){let n=e.toLowerCase().replace(/^['’]+|['’]+$/g,""),o=`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(n)}`,r=await fetch(o);if(!r.ok)return null;let s=await r.json();if(!Array.isArray(s)||s.length===0)return null;let i=s[0],a=t?.tts?.enAccent||"us",l=i.phonetic||"",f="",u=Array.isArray(i.phonetics)?i.phonetics:[];for(let p of u)if(!l&&p.text&&(l=p.text),p.audio){let d=p.audio.toLowerCase();if(f||(f=p.audio),a==="uk"&&d.includes("-uk")){f=p.audio,p.text&&(l=p.text);break}if(a==="us"&&d.includes("-us")){f=p.audio,p.text&&(l=p.text);break}}let c=[];for(let p of i.meanings||[]){let d=(p.definitions||[]).slice(0,3).map(E=>({text:E.definition||"",cn:"",example:E.example||""}));d.length>0&&c.push({pos:p.partOfSpeech||"",posInfo:Be(p.partOfSpeech),definitions:d})}return c.length===0?null:{word:i.word||e,phonetic:l,reading:"",audioUrl:f,briefCn:"",tags:[],meanings:c}}});function xb(e){if(!Array.isArray(e)||e.length===0)return{raw:"word",info:Be("")};let t=e[0],n="";typeof t=="string"?n=t:t&&typeof t=="object"&&(n=Object.keys(t)[0]||"");let o=n.toLowerCase();return o.includes("noun")?{raw:"noun",info:Be("noun")}:o.includes("verb")||o.includes("godan")||o.includes("ichidan")?{raw:"verb",info:Be("verb")}:o.includes("adj")?{raw:"adjective",info:Be("adjective")}:o.includes("adv")?{raw:"adverb",info:Be("adverb")}:o.includes("part")?{raw:"particle",info:Be("particle")}:o.includes("expr")?{raw:"expression",info:Be("expression")}:{raw:n,info:Be(n)}}var _x=ut({id:"jotoba",name:"Jotoba",description:"\u65E5\u8BED\u8BCD\u5178\uFF0C\u542B\u5047\u540D\u8BFB\u97F3\u3001\u8BCD\u6027\u4E0E\u53D1\u97F3",languages:["ja"],async lookup(e){let t=await fetch("https://jotoba.de/api/search/words",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:e,language:"English",no_english:!1})});if(!t.ok)return null;let o=(await t.json())?.words;if(!Array.isArray(o)||o.length===0)return null;let r=o.find(c=>c.reading?.kanji===e||c.reading?.kana===e)||o[0],s=r.reading?.kanji||"",i=r.reading?.kana||"",a=r.audio?`https://jotoba.de${r.audio}`:"",l=[];r.common&&l.push("\u5E38\u7528\u8BCD");let f=new Map;for(let c of(r.senses||[]).slice(0,5)){let{raw:p,info:d}=xb(c.pos),E=Array.isArray(c.glosses)?c.glosses.slice(0,4).join("; "):"";if(!E)continue;let m=d.abbr||p;f.has(m)||f.set(m,{pos:p,posInfo:d,definitions:[]}),f.get(m).definitions.push({text:E,cn:"",example:""})}let u=[...f.values()];return u.length===0?null:{word:s||i||e,phonetic:"",reading:i&&i!==s?i:"",audioUrl:a,briefCn:"",tags:l,meanings:u}}});function fm(e){return String(e||"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g," ").trim()}var Nx=ut({id:"wiktionary",name:"Wiktionary",description:"\u591A\u8BED\u79CD\u5F00\u6E90\u8BCD\u5178\uFF0C\u8986\u76D6\u82F1/\u65E5/\u6CD5\u53CA\u5C0F\u8BED\u79CD",languages:["*"],async lookup(e,{lang:t,langDef:n}){let o=[e];e!==e.toLowerCase()&&o.push(e.toLowerCase());let r=null,s=e;for(let l of o){let f=`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(l)}`,u=await fetch(f);if(u.ok){r=await u.json(),s=l;break}}if(!r||typeof r!="object")return null;let i=r[t]||r[n?.code]||null;if(!Array.isArray(i)||i.length===0)return null;let a=[];for(let l of i.slice(0,4)){let f=[];for(let u of(l.definitions||[]).slice(0,3)){let c=fm(u.definition);if(!c)continue;let p=Array.isArray(u.examples)&&u.examples[0]?fm(u.examples[0]):"";f.push({text:c,cn:"",example:p})}f.length>0&&a.push({pos:l.partOfSpeech||"",posInfo:Be(l.partOfSpeech),definitions:f})}return a.length===0?null:{word:s,phonetic:"",reading:"",audioUrl:"",briefCn:"",tags:[n?.nativeName||t],meanings:a}}});async function Tb(e,t){let n=t?.customAi||{};if(n.apiKey&&n.baseUrl&&n.model){let r=`${n.baseUrl.replace(/\/+$/,"")}/chat/completions`,s=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n.apiKey}`},body:JSON.stringify({model:n.model,temperature:.2,messages:[{role:"system",content:'You are a concise multilingual dictionary. Respond ONLY in valid JSON: {"phonetic":"","reading":"","pos":"noun|verb|adjective|adverb|expression|other","briefCn":"","definitions":[{"cn":"","text":"","example":""}]}'},{role:"user",content:e}]})});if(!s.ok)throw new Error(`AI \u8BCD\u5178 HTTP ${s.status}`);return(await s.json())?.choices?.[0]?.message?.content||""}let o=jn();if(o&&typeof o.generateRaw=="function")return await o.generateRaw({user_input:`${e}

\u8BF7\u4EC5\u8F93\u51FA\u5408\u6CD5 JSON\uFF08\u4E0D\u8981 markdown \u4EE3\u7801\u5757\uFF09\uFF1A{"phonetic":"","reading":"","pos":"noun","briefCn":"","definitions":[{"cn":"","text":"","example":""}]}`,should_stream:!1});throw new Error("\u672A\u914D\u7F6E\u81EA\u5B9A\u4E49 AI \u4E14\u9152\u9986\u5F53\u524D\u4E0D\u652F\u6301 generateRaw")}var wx=ut({id:"ai-context",name:"AI \u7CBE\u8BB2",description:"\u7ED3\u5408\u5F53\u524D\u53E5\u5B50\u89E3\u6790\u8BCD\u6027\u4E0E\u8BED\u5883\u542B\u4E49",languages:["*"],async lookup(e,{langDef:t,context:n,config:o}){let r=[`Language: ${t?.name||"Foreign"} (${t?.nativeName||""})`,`Word: ${e}`,n?`Sentence context: "${n}"`:"","Give the base form/reading/IPA, part of speech, exact Chinese meaning in this context, a concise explanation, and one short example."].filter(Boolean).join(`
`),s=await Tb(r,o),i=String(s).match(/\{[\s\S]*\}/);if(!i)throw new Error("AI \u8BCD\u5178\u8FD4\u56DE\u683C\u5F0F\u65E0\u6CD5\u89E3\u6790");let a=JSON.parse(i[0]),l=Array.isArray(a.definitions)?a.definitions.slice(0,3).map(f=>({cn:f.cn||"",text:f.text||"",example:f.example||""})):[{cn:a.briefCn||"",text:"",example:""}];return{word:e,phonetic:a.phonetic||"",reading:a.reading||"",audioUrl:"",briefCn:a.briefCn||l[0]?.cn||"",tags:["AI \u8BED\u5883\u89E3\u6790"],meanings:[{pos:a.pos||"expression",posInfo:Be(a.pos),definitions:l}]}}});function wb(e,t=1400){if(e.length<=t)return[e];let n=e.split(/(?<=[.!?。！？\n])/).filter(Boolean),o=[],r="";for(let s of n)if(s.length>t){r&&(o.push(r),r="");for(let i=0;i<s.length;i+=t)o.push(s.slice(i,i+t))}else r.length+s.length>t?(o.push(r),r=s):r+=s;return r&&o.push(r),o}async function Ob(e,t,n){let o=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(t)}&tl=${encodeURIComponent(n)}&dt=t&q=${encodeURIComponent(e)}`,r=await fetch(o);if(!r.ok)throw new Error(`Google HTTP ${r.status}`);let s=await r.json();if(!Array.isArray(s)||!Array.isArray(s[0]))throw new Error("Google \u8FD4\u56DE\u683C\u5F0F\u5F02\u5E38");return s[0].map(i=>Array.isArray(i)?i[0]:"").join("")}async function Cb(e,t,n){let o=`https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${encodeURIComponent(t)}&tl=${encodeURIComponent(n)}&q=${encodeURIComponent(e)}`,r=await fetch(o);if(!r.ok)throw new Error(`Google-C5 HTTP ${r.status}`);let s=await r.json();if(Array.isArray(s)){if(typeof s[0]=="string")return s[0];if(Array.isArray(s[0])&&typeof s[0][0]=="string")return s[0][0]}throw new Error("Google-C5 \u8FD4\u56DE\u683C\u5F0F\u5F02\u5E38")}async function Ab(e,t,n){try{return await Ob(e,t,n)}catch(o){try{return await Cb(e,t,n)}catch{throw o}}}var Ax=on({id:"google",name:"Google \u7FFB\u8BD1",description:"\u514D Key\u3001\u901F\u5EA6\u5FEB",async translate(e,{from:t="auto",to:n="zh-CN"}){let o=t==="auto"?"auto":t,r=wb(e,1400),s=[];for(let i of r)s.push(await Ab(i,o,n));return s.join("")}});function Db(e,t=420){if(e.length<=t)return[e];let n=e.split(/(?<=[.!?。！？\n])\s*/).filter(Boolean),o=[],r="";for(let s of n)if(s.length>t){r&&(o.push(r),r="");let i=s;for(;i.length>t;){let a=i.lastIndexOf(" ",t);a<Math.floor(t*.5)&&(a=t),o.push(i.slice(0,a).trim()),i=i.slice(a).trim()}i&&(r=i)}else r?r.length+1+s.length<=t?r+=" "+s:(o.push(r),r=s):r=s;return r&&o.push(r),o}async function Ib(e,t,n){let o=`https://api.mymemory.translated.net/get?q=${encodeURIComponent(e)}&langpair=${encodeURIComponent(t)}|${encodeURIComponent(n)}`,r=await fetch(o);if(!r.ok)throw new Error(`MyMemory HTTP ${r.status}`);let i=(await r.json())?.responseData?.translatedText;if(!i||/QUERY LENGTH LIMIT EXCEEDED|MYMEMORY WARNING/i.test(i))throw new Error(i||"MyMemory \u672A\u8FD4\u56DE\u8BD1\u6587");return i}var kx=on({id:"mymemory",name:"MyMemory",description:"\u514D\u8D39\u515C\u5E95\u7FFB\u8BD1",async translate(e,{from:t="en",to:n="zh-CN"}){let o=t==="auto"?"en":t,r=Db(e,420),s=[];for(let i of r)s.push(await Ib(i,o,n));return s.join(" ")}});var Px=on({id:"custom-ai",name:"\u81EA\u5B9A\u4E49 AI",description:"\u4F7F\u7528\u81EA\u5B9A\u4E49 OpenAI \u517C\u5BB9\u63A5\u53E3\u7FFB\u8BD1",async translate(e,{from:t,to:n="\u7B80\u4F53\u4E2D\u6587",context:o,config:r}){let s=r?.customAi||{};if(!s.apiKey||!s.baseUrl||!s.model)throw new Error("\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u586B\u5199\u81EA\u5B9A\u4E49 AI \u7684 Base URL\u3001API Key \u4E0E\u6A21\u578B\u540D\u79F0");let i=`${s.baseUrl.replace(/\/+$/,"")}/chat/completions`,a=`You are a literary translator. Translate the user's ${t||"foreign"} text into natural, fluent ${n==="zh-CN"?"Simplified Chinese":n}. Preserve tone, emotion, and character voice. Output ONLY the translation without explanation.`,l=o&&o!==e?`Context:
${o}

Translate this text:
${e}`:e,f=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.apiKey}`},body:JSON.stringify({model:s.model,temperature:.2,messages:[{role:"system",content:a},{role:"user",content:l}]})});if(!f.ok)throw new Error(`Custom AI HTTP ${f.status}`);let c=(await f.json())?.choices?.[0]?.message?.content;if(!c)throw new Error("Custom AI \u672A\u8FD4\u56DE\u5185\u5BB9");return c.trim()}}),Lx=on({id:"tavern-ai",name:"\u9152\u9986 API",description:"\u4F7F\u7528\u9152\u9986\u5F53\u524D\u8FDE\u63A5\u7684\u6A21\u578B\u7FFB\u8BD1",async translate(e,{from:t,to:n="\u7B80\u4F53\u4E2D\u6587"}){let o=jn();if(!o||typeof o.generateRaw!="function")throw new Error("\u5F53\u524D\u9152\u9986\u52A9\u624B\u7248\u672C\u4E0D\u652F\u6301 generateRaw");let r=`\u8BF7\u5C06\u4EE5\u4E0B${t||"\u5916\u8BED"}\u6587\u672C\u51C6\u786E\u3001\u81EA\u7136\u5730\u7FFB\u8BD1\u6210${n==="zh-CN"?"\u7B80\u4F53\u4E2D\u6587":n}\uFF0C\u4FDD\u7559\u539F\u672C\u7684\u8BED\u6C14\u4E0E\u60C5\u7EEA\u3002\u53EA\u8F93\u51FA\u4E2D\u6587\u8BD1\u6587\uFF0C\u4E0D\u8981\u9644\u52A0\u4EFB\u4F55\u89E3\u91CA\u6216\u5F15\u53F7\uFF1A

${e}`,s=await o.generateRaw({user_input:r,should_stream:!1});if(!s||typeof s!="string")throw new Error("\u9152\u9986 API \u672A\u8FD4\u56DE\u6709\u6548\u8BD1\u6587");return s.trim()}});var Qo="__TAVERN_LANG_INSTANCE__",la=null;function um(){la&&(la(),la=null),bo(),ga(),Oa(),Xc(),zc(),yf(),Bc(),Jc(),wa(),Sf();let e=Z();e[Qo]?.destroy===um&&delete e[Qo]}function kb(){let e=he(),t=["https://translate.googleapis.com","https://api.dictionaryapi.dev","https://en.wiktionary.org","https://jotoba.de"];for(let n of t){let o=`tl-preconnect-${n.replace(/[^a-z0-9]/gi,"")}`;if(e.getElementById(o))continue;let r=e.createElement("link");r.id=o,r.rel="preconnect",r.href=n,r.crossOrigin="anonymous",e.head.appendChild(r)}}function Vb(e={}){let t=Z();if(t[Qo]&&typeof t[Qo].destroy=="function")try{t[Qo].destroy()}catch(o){console.warn("[TavernLanguage] \u6E05\u7406\u65E7\u5B9E\u4F8B\u65F6\u51FA\u73B0\u8B66\u544A:",o)}kb(),Mh(),Nf(),sm(),_f(),Xh(),Gh(),$h(),va(),gf(),setTimeout(()=>{cs().catch(()=>{})},250),la=of(o=>{ts(),ka(o),va(),o.enabled?Ta({force:!0}):wa()});let n={version:er,init:Vb,destroy:um,openSettings:()=>mo("general"),openVocabBook:()=>mo("vocab"),getConfig:J,updateConfig:ds,registerLanguage:Tn,getLanguage:ot,listLanguages:yo,registerDictionary:ut,listDictionaries:na,lookupWord:os,registerTranslator:on,listTranslators:_s,translateText:mt};if(t[Qo]=n,!e.silent){let o=ot(J().targetLang)?.name||J().targetLang;Ne(`\u5DF2\u52A0\u8F7D v${er}\uFF08\u5F53\u524D\u8BED\u79CD\uFF1A${o}\uFF09`,"success")}return n}function pT(){mo("general")}function dT(){mo("vocab")}export{um as destroy,Vb as init,pT as openSettings,dT as openVocabBook,ut as registerDictionary,Tn as registerLanguage,on as registerTranslator,er as version};
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
