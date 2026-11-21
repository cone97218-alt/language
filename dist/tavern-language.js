/**
 * Tavern Language v2.2.2 (Vue 3)
 * SillyTavern 酒馆助手沉浸式外语学习插件
 * Repo: https://github.com/cone97218-alt/language
 */
var Gh=Object.defineProperty;var qh=(e,t)=>{for(var n in t)Gh(e,n,{get:t[n],enumerable:!0})};function te(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent}catch{}return window}function ge(){return te().document}function Bn(){let e=te();return window.TavernHelper||e.TavernHelper||null}function na(){let e=te();return{eventOn:window.eventOn||e.eventOn||null,eventRemoveListener:window.eventRemoveListener||e.eventRemoveListener||null,tavern_events:window.tavern_events||e.tavern_events||null,iframe_events:window.iframe_events||e.iframe_events||null}}function Se(e,t="info"){let n=te(),o=window.toastr||n.toastr;o&&typeof o[t]=="function"?o[t](e,"\u9152\u9986\u5916\u8BED\u5B66\u4E60"):console.log(`[TavernLanguage][${t}] ${e}`)}var Jo="2.2.2",oa="tavern_language_config_v1",Jh=["script","style","noscript","iframe","svg","canvas","audio","video",".tl-ignore",".tl-trans-block",".tl-mes-footer",".tl-word",".tl-popover",".tl-sel-bar",".tl-modal-backdrop","#tl-vue-root"],ss={enabled:!0,targetLang:"en",promptInjection:{enabled:!0,level:"B1",promptText:"",depth:0},theme:"tavern",excludeSelectors:["code","pre","kbd","math","summary","button","input","textarea","select"],dictionaryChains:{en:["google-dict","free-dict","wiktionary","ai-context"],ja:["google-dict","jotoba","wiktionary","ai-context"],fr:["google-dict","wiktionary","ai-context"]},autoTranslateDict:!0,autoSpeakWord:!1,translator:"google",customAi:{baseUrl:"https://api.openai.com/v1",apiKey:"",model:"gpt-4o-mini"},tts:{engine:"auto",rate:1,enAccent:"us"},ui:{showWordUnderline:!0,autoShowMesButtons:!0}};function Eo(e,t){if(!t||typeof t!="object")return e;let n=Array.isArray(e)?[...e]:{...e};for(let o of Object.keys(t)){let r=t[o];r&&typeof r=="object"&&!Array.isArray(r)&&e[o]&&typeof e[o]=="object"&&!Array.isArray(e[o])?n[o]=Eo(e[o],r):r!==void 0&&(n[o]=Array.isArray(r)?[...r]:r)}return n}var Xe=Eo(ss,{}),ra=new Set;function Kc(){try{let e=te().localStorage.getItem(oa);if(e){let t=JSON.parse(e);if(Xe=Eo(ss,t),!t._migratedGoogleDict){for(let n of["en","ja","fr"]){let o=Xe.dictionaryChains?.[n];Array.isArray(o)&&!o.includes("google-dict")&&(Xe.dictionaryChains[n]=["google-dict",...o])}Xe._migratedGoogleDict=!0;try{te().localStorage.setItem(oa,JSON.stringify(Xe))}catch{}}}else Xe=Eo(ss,{}),Xe._migratedGoogleDict=!0}catch(e){console.warn("[TavernLanguage] \u8BFB\u53D6\u914D\u7F6E\u5931\u8D25\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u914D\u7F6E:",e),Xe=Eo(ss,{})}return Xe}function J(){return Xe}function is(e){Xe=Eo(Xe,e);try{te().localStorage.setItem(oa,JSON.stringify(Xe))}catch(t){console.warn("[TavernLanguage] \u4FDD\u5B58\u914D\u7F6E\u5931\u8D25:",t)}return ra.forEach(t=>{try{t(Xe)}catch(n){console.error("[TavernLanguage] \u914D\u7F6E\u76D1\u542C\u56DE\u8C03\u5F02\u5E38:",n)}}),Xe}function Xc(e){return ra.add(e),()=>ra.delete(e)}function Yo(e){return Array.isArray(e)?e.map(t=>String(t).trim()).filter(Boolean):String(e||"").split(/[\n,;，；]+/).map(t=>t.trim()).filter(Boolean)}function as(e=Xe){let t=Yo(e.excludeSelectors);return[...new Set([...Jh,...t])]}var Qo=new Map;function Sn(e){if(!e||!e.code)throw new Error("[TavernLanguage] registerLanguage \u9700\u8981\u5305\u542B code \u5B57\u6BB5");return Qo.set(e.code,e),e}function ot(e){return Qo.get(e)||Qo.get("en")||[...Qo.values()][0]||null}function vo(){return[...Qo.values()]}var zc="tavern-language-immersive-prompt",ls=null;function Zo(e,t){let n=ot(e);return n?n.buildPrompt(t,""):""}function sa(e=J()){let t=String(e.promptInjection?.promptText||"").trim();return t||Zo(e.targetLang,e.promptInjection?.level)}function ia(){if(typeof ls=="function"){try{ls()}catch{}ls=null}let e=Bn();if(e&&typeof e.uninjectPrompts=="function")try{e.uninjectPrompts([zc])}catch{}}function aa(){ia();let e=J();if(!e.enabled||!e.promptInjection?.enabled)return!1;let t=Bn();if(!t||typeof t.injectPrompts!="function")return!1;let n=sa(e);if(!n)return!1;try{let o=t.injectPrompts([{id:zc,role:"system",content:n,position:"in_chat",depth:Number.isFinite(Number(e.promptInjection.depth))?Number(e.promptInjection.depth):0,should_scan:!1}]);return o&&typeof o.uninject=="function"&&(ls=o.uninject),!0}catch(o){return console.warn("[TavernLanguage] injectPrompts \u6CE8\u5165\u5931\u8D25:",o),!1}}function la(e,t){if(!e||e.nodeType!==1)return!1;let n=e.tagName?e.tagName.toLowerCase():"";for(let o of t)if(o){if(/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(o)){if(n===o.toLowerCase())return!0;continue}try{if(e.matches(o))return!0}catch{}}return!1}function fs(e,t,n){let o=e.nodeType===1?e:e.parentElement;for(;o&&o!==t;){if(la(o,n))return!0;o=o.parentElement}return!1}function cs(e){if(!e)return;let t=e.querySelectorAll("span.tl-word");for(let n of t){let o=e.ownerDocument.createTextNode(n.textContent||"");n.replaceWith(o)}e.normalize(),delete e.dataset.tlTokenizedLang,delete e.dataset.tlExcludeHash}function Gc(e,t={}){if(!e)return;let n=J();if(!n.enabled){cs(e);return}let o=t.lang||n.targetLang||"en",r=ot(o);if(!r)return;let s=as(n),i=s.join("|");if(!t.force&&e.dataset.tlTokenizedLang===o&&e.dataset.tlExcludeHash===i)return;e.dataset.tlTokenizedLang&&cs(e);let a=e.ownerDocument||ge(),l=a.createTreeWalker(e,4,{acceptNode(c){return!c.nodeValue||!c.nodeValue.trim()||fs(c,e,s)?2:1}}),f=[],u;for(;u=l.nextNode();)f.push(u);for(let c of f){let p=r.tokenize(c.nodeValue);if(!p||p.length===0||!p.some(h=>h.isWord))continue;let v=a.createDocumentFragment();for(let h of p)if(h.isWord){let N=a.createElement("span");N.className="tl-word",N.textContent=h.text,N.dataset.tlWord=h.lookup||h.text,N.dataset.tlLang=o,v.appendChild(N)}else v.appendChild(a.createTextNode(h.text));c.replaceWith(v)}e.dataset.tlTokenizedLang=o,e.dataset.tlExcludeHash=i}function qc(e){if(!e)return"";let t=e.closest("p, li, blockquote, div.mes_text, h1, h2, h3, h4, h5, h6")||e.parentElement;if(!t)return e.textContent||"";let n="",o=-1,r=-1,s=t.ownerDocument.createTreeWalker(t,4,{acceptNode(u){return u.parentElement?.closest(".tl-trans-block")?2:1}}),i;for(;i=s.nextNode();){let u=i.nodeValue||"";e.contains(i)&&o===-1&&(o=n.length,r=n.length+u.length),n+=u}if(o===-1)return n.trim();let a=/[.!?。！？\n]/,l=o;for(;l>0&&!a.test(n[l-1]);)l--;let f=r;for(;f<n.length&&!a.test(n[f]);)f++;return f<n.length&&/[.!?。！？]/.test(n[f])&&f++,n.slice(l,f).replace(/\s+/g," ").trim()}var us=new Map,Lt=new Map,fa="tavern_language_trans_cache_v1",Yc=300,Jc=!1,ca=null;function Qc(){if(!Jc){Jc=!0;try{let e=te().localStorage.getItem(fa);if(!e)return;let t=JSON.parse(e);if(Array.isArray(t))for(let[n,o]of t)n&&o&&Lt.set(n,o)}catch{}}}function Yh(){ca||(ca=setTimeout(()=>{ca=null;try{let e=[...Lt.entries()].slice(-Yc);te().localStorage.setItem(fa,JSON.stringify(e))}catch{}},800))}function Qh(e,t){if(Qc(),Lt.has(e)&&Lt.delete(e),Lt.size>=Yc){let n=Lt.keys().next().value;Lt.delete(n)}Lt.set(e,t),Yh()}function en(e){if(!e||!e.id)throw new Error("[TavernLanguage] registerTranslator \u9700\u8981 id \u5B57\u6BB5");return us.set(e.id,e),e}function ps(){return[...us.values()]}function Zc(){Lt.clear();try{te().localStorage.removeItem(fa)}catch{}}async function dt(e,t={}){let n=String(e||"").trim();if(!n)return"";Qc();let o=J(),r=t.from||o.targetLang||"auto",s=t.to||"zh-CN",i=t.providerId||o.translator||"google",a=`${i}|${r}|${s}|${n}`;if(!t.bypassCache&&Lt.has(a))return Lt.get(a);let l=[i,"google","mymemory"].filter((c,p,d)=>d.indexOf(c)===p&&us.has(c)),f=null,u=!1;for(let c of l){let p=us.get(c);try{let d=await p.translate(n,{from:r,to:s,context:t.context||"",config:o});if(d&&d.trim())return Qh(a,d.trim()),d.trim()}catch(d){f=d,String(d?.message||"").includes("429")&&(u=!0),console.warn(`[TavernLanguage] \u7FFB\u8BD1\u6E90 ${c} \u5931\u8D25\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A:`,d?.message||d)}}throw u?new Error("\u514D\u8D39\u7FFB\u8BD1\u9650\u6D41\uFF08429\uFF09\uFF0C\u53EF\u7A0D\u540E\u91CD\u8BD5\u6216\u5207\u6362\u4E3A\u300C\u9152\u9986 API\u300D/\u300C\u81EA\u5B9A\u4E49 AI\u300D"):f||new Error("\u6240\u6709\u7FFB\u8BD1\u6E90\u5747\u4E0D\u53EF\u7528")}var ht=null,Ht=0;function _o(){if(Ht++,ht){try{ht.onended=null,ht.onerror=null,ht.pause(),ht.currentTime=0}catch{}ht=null}let e=te();if(e.speechSynthesis)try{e.speechSynthesis.cancel()}catch{}}function ds(e,t=1){let n=te().Audio||Audio,o=new n(e);return o.preload="auto",o.playbackRate=Math.max(.5,Math.min(2,t||1)),o}function ua(e,t){return new Promise((n,o)=>{if(t!==Ht){n(!1);return}ht=e,e.onended=()=>{ht===e&&(ht=null),n(!0)},e.onerror=s=>{ht===e&&(ht=null),o(s||new Error("\u97F3\u9891\u64AD\u653E\u5931\u8D25"))};let r=e.play();r&&typeof r.catch=="function"&&r.catch(s=>{ht===e&&(ht=null),o(s)})})}function pa(e,t,n="us"){let o=encodeURIComponent(e);if(t==="en")return`https://dict.youdao.com/dictvoice?audio=${o}&type=${n==="uk"?1:2}`;let s={ja:"jap",fr:"fr",ko:"ko",de:"de",es:"es"}[t]||t;return`https://dict.youdao.com/dictvoice?audio=${o}&le=${encodeURIComponent(s)}`}function Zh(e,t=140){let n=String(e||"").replace(/\s+/g," ").trim();if(!n)return[];if(n.length<=t)return[n];let o=n.split(/(?<=[.!?。！？\n])\s*/).map(s=>s.trim()).filter(Boolean),r=[];for(let s of o){if(s.length<=t){r.length>0&&r[r.length-1].length+1+s.length<=t?r[r.length-1]+=" "+s:r.push(s);continue}let i=s.split(/(?<=[,;，；：—])\s*/).map(l=>l.trim()).filter(Boolean),a="";for(let l of i)if(l.length>t){a&&(r.push(a),a="");let f=l;for(;f.length>t;){let u=f.lastIndexOf(" ",t);u<Math.floor(t*.5)&&(u=t),r.push(f.slice(0,u).trim()),f=f.slice(u).trim()}f&&(a=f)}else a?a.length+1+l.length<=t?a+=" "+l:(r.push(a),a=l):a=l;a&&r.push(a)}return r.filter(Boolean)}function em(e,t){if(!Array.isArray(e)||e.length===0)return null;let n=t.toLowerCase(),o=n.split("-")[0],r=e.filter(i=>i.lang&&i.lang.toLowerCase().startsWith(o));if(r.length===0)return null;let s=/(natural|neural|google|online|enhanced|premium|wavenet|siri)/i;return r.sort((i,a)=>{let l=i.lang.toLowerCase()===n?2:0,f=a.lang.toLowerCase()===n?2:0,u=s.test(i.name||"")?4:0,c=s.test(a.name||"")?4:0;return f+c-(l+u)}),r[0]}function hs(e,t,n=1,o=Ht){return new Promise((r,s)=>{if(o!==Ht){r(!1);return}let i=te(),a=i.speechSynthesis,l=i.SpeechSynthesisUtterance||window.SpeechSynthesisUtterance;if(!a||!l){s(new Error("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 Web Speech"));return}try{a.cancel()}catch{}let u=ot(t)?.bcp47||t||"en-US",c=new l(e);c.lang=u,c.rate=Math.max(.5,Math.min(2,n||1));let p=a.getVoices?a.getVoices():[],d=em(p,u);d&&(c.voice=d),c.onend=()=>r(!0),c.onerror=v=>s(v),a.speak(c)})}async function tm(e,t,n,o,r){if(e.length===0)return;let s=ds(pa(e[0],t,n),o);for(let i=0;i<e.length;i++){if(r!==Ht)return;let a=s;s=i+1<e.length?ds(pa(e[i+1],t,n),o):null;try{await ua(a,r)}catch{if(r!==Ht)return;try{await hs(e[i],t,o,r)}catch{}}}}async function yo(e,t={}){let n=String(e||"").trim();if(!n)return;_o();let o=Ht,r=J(),s=t.lang||r.targetLang||"en",i=t.rate??r.tts?.rate??1;if((r.tts?.engine||"auto")==="webspeech")return hs(n,s,i,o);if(t.audioUrl)try{await ua(ds(t.audioUrl,i),o);return}catch{if(o!==Ht)return}try{let l=pa(n,s,r.tts?.enAccent||"us");await ua(ds(l,i),o);return}catch{if(o!==Ht)return}return hs(n,s,i,o)}async function tn(e,t={}){let n=String(e||"").replace(/\s+/g," ").trim();if(!n)return;_o();let o=Ht,r=J(),s=t.lang||r.targetLang||"en",i=t.rate??r.tts?.rate??1;if((r.tts?.engine||"auto")==="webspeech")return hs(n,s,i,o);let l=Zh(n,140);await tm(l,s,r.tts?.enAccent||"us",i,o)}var er=null;function ef(e){return as(e).filter(t=>t!==".tl-word")}function ms(e,t,n){let o="",r=e.ownerDocument.createTreeWalker(e,4,{acceptNode(i){return i.parentElement?.closest(".tl-trans-block, .tl-mes-footer")||fs(i,t,n)?2:1}}),s;for(;s=r.nextNode();)o+=s.nodeValue||"";return o.replace(/\s+/g," ").trim()}function nm(e,t){let n=[...e.querySelectorAll("p, li, blockquote")].filter(r=>r.closest(".tl-mes-footer, .tl-trans-block")||la(r,t)||fs(r,e,t)||r.parentElement?.closest("p, li, blockquote")?!1:ms(r,e,t).length>0);return n.length>0?n:ms(e,e,t)?[e]:[]}async function om(e,t){let n=e.querySelector(".mes_text");if(!n)return;let o=[...n.querySelectorAll(".tl-trans-block")];if(o.length>0){let v=o[0].classList.contains("tl-hidden");o.forEach(h=>h.classList.toggle("tl-hidden",!v)),t.classList.toggle("tl-active",v);return}let r=J(),s=ef(r),i=nm(n,s);if(i.length===0)return;t.classList.add("tl-active"),t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';let a=n.ownerDocument,l=r.targetLang||"en",f=n.querySelector(".tl-mes-footer"),u=i.map(v=>{let h=ms(v,n,s),N=a.createElement("div");return N.className="tl-trans-block tl-trans-loading tl-ignore",N.textContent="\u7FFB\u8BD1\u4E2D...",v===n?f?f.insertAdjacentElement("beforebegin",N):n.appendChild(N):v.insertAdjacentElement("afterend",N),{text:h,transDiv:N}}),c=[],p=[],d=0;for(let v of u){let h=v.text.replace(/\r?\n+/g," ");p.length>0&&d+h.length+1>1500&&(c.push(p),p=[],d=0),p.push({...v,lineText:h}),d+=h.length+1}p.length>0&&c.push(p);for(let v of c){if(v.length===1){try{let h=await dt(v[0].lineText,{from:l,to:"zh-CN"});v[0].transDiv.classList.remove("tl-trans-loading"),v[0].transDiv.textContent=h}catch(h){v[0].transDiv.classList.remove("tl-trans-loading"),v[0].transDiv.textContent=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${h?.message||"\u8BF7\u91CD\u8BD5"}`}continue}try{let h=v.map(y=>y.lineText).join(`
`),C=(await dt(h,{from:l,to:"zh-CN"})).split(/\r?\n/).map(y=>y.trim()).filter(Boolean);if(C.length===v.length){v.forEach((y,E)=>{y.transDiv.classList.remove("tl-trans-loading"),y.transDiv.textContent=C[E]});continue}}catch(h){if(String(h?.message||"").includes("429")){v.forEach(N=>{N.transDiv.classList.remove("tl-trans-loading"),N.transDiv.textContent=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${h.message}`});continue}}for(let h of v)try{let N=await dt(h.lineText,{from:l,to:"zh-CN"});h.transDiv.classList.remove("tl-trans-loading"),h.transDiv.textContent=N}catch(N){h.transDiv.classList.remove("tl-trans-loading"),h.transDiv.textContent=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${N?.message||"\u8BF7\u91CD\u8BD5"}`}}t.innerHTML='<i class="fa-solid fa-language"></i>'}function tr(e,t){e.classList.toggle("tl-active",t),e.innerHTML=t?'<i class="fa-solid fa-stop"></i>':'<i class="fa-solid fa-volume-high"></i>'}async function rm(e,t){if(er===e){_o(),er=null,tr(t,!1);return}let n=e.querySelector(".mes_text");if(!n)return;let o=J(),r=ef(o),s=ms(n,n,r);if(s){e.ownerDocument.querySelectorAll('.tl-footer-icon[data-tl-mes-action="speak"].tl-active').forEach(i=>tr(i,!1)),er=e,tr(t,!0);try{await tn(s,{lang:o.targetLang||"en"})}catch{}finally{er===e&&(er=null),tr(t,!1)}}}function tf(e){e?.querySelectorAll(".tl-mes-btn").forEach(a=>a.remove());let t=J();if(!t.enabled||t.ui?.autoShowMesButtons===!1){e?.querySelector(".tl-mes-footer")?.remove();return}let n=e?.querySelector(".mes_text");if(!n||n.querySelector(".tl-mes-footer")||!n.textContent||!n.textContent.trim())return;let o=e.ownerDocument,r=o.createElement("div");r.className="tl-mes-footer tl-ignore";let s=o.createElement("button");s.type="button",s.className="tl-footer-icon",s.dataset.tlMesAction="translate",s.title="\u53CC\u8BED\u5BF9\u7167",s.innerHTML='<i class="fa-solid fa-language"></i>',s.addEventListener("click",a=>{a.stopPropagation(),om(e,s)});let i=o.createElement("button");i.type="button",i.className="tl-footer-icon",i.dataset.tlMesAction="speak",i.title="\u6717\u8BFB",tr(i,!1),i.addEventListener("click",a=>{a.stopPropagation(),rm(e,i)}),r.appendChild(s),r.appendChild(i),n.appendChild(r)}var nr=null,Hn=null,on=!1,da=[];function sm(){return[...ge().querySelectorAll("#chat .mes")]}function im(e,t={}){if(!e)return;let n=e.querySelector(".mes_text");n&&(Gc(n,t),tf(e))}function ha(e={}){let t=sm();for(let n of t)im(n,e)}function ma(){let e=ge();e.querySelectorAll("#chat .mes .mes_text").forEach(t=>cs(t)),e.querySelectorAll("#chat .mes .tl-trans-block").forEach(t=>t.remove()),e.querySelectorAll("#chat .mes .tl-mes-btn").forEach(t=>t.remove()),e.querySelectorAll("#chat .mes .tl-mes-footer").forEach(t=>t.remove())}function nn(e=280){Hn&&clearTimeout(Hn),Hn=setTimeout(()=>{Hn=null,!on&&J().enabled&&ha()},e)}function xn(e,t){let{eventOn:n,eventRemoveListener:o}=na();if(!(!n||!e))try{let r=n(e,t);da.push(()=>{try{r&&typeof r.stop=="function"?r.stop():typeof o=="function"&&o(e,t)}catch{}})}catch{}}function nf(){ga();let t=ge().getElementById("chat");t&&(nr=new MutationObserver(r=>{if(on||!J().enabled)return;r.some(i=>{let a=i.target;return!(a?.nodeType===1&&(a.classList?.contains("tl-word")||a.classList?.contains("tl-trans-block")||a.classList?.contains("tl-mes-btn")||a.classList?.contains("tl-mes-footer")||a.closest?.(".tl-popover, .tl-sel-bar, .tl-modal-backdrop, .tl-mes-footer, #tl-vue-root")))})&&nn(320)}),nr.observe(t,{childList:!0,subtree:!0}));let{tavern_events:n,iframe_events:o}=na();n&&(xn(n.GENERATION_STARTED,()=>{on=!0}),xn(n.GENERATION_STOPPED,()=>{on=!1,nn(200)}),xn(n.GENERATION_ENDED,()=>{on=!1,nn(200)}),xn(n.MESSAGE_RECEIVED,()=>{on=!1,nn(220)}),xn(n.MESSAGE_UPDATED,()=>{nn(200)}),xn(n.MESSAGE_SWIPED,()=>{nn(250)}),xn(n.CHAT_CHANGED,()=>{on=!1,nn(350)})),o&&xn(o.STREAM_TOKEN_RECEIVED_FULLY,()=>{on=!1,nn(260)}),nn(150)}function ga(){for(Hn&&(clearTimeout(Hn),Hn=null),nr&&(nr.disconnect(),nr=null);da.length>0;)da.pop()();on=!1}var of=9,am=420,lm=260,Ea=0,va=0,gs=0,or=!1,_a=!1,rf=0,Es=!1,vs=null,_s=null,ys=null,bo=null;function sf(){if(Es)return;let e=ge(),t=te();vs=n=>{n.button&&n.button!==0||(Ea=n.clientX,va=n.clientY,gs=Date.now(),or=!1,_a=!1)},_s=n=>{if(or)return;let o=n.clientX-Ea,r=n.clientY-va;Math.hypot(o,r)>of&&(or=!0)},ys=n=>{n.touches&&n.touches.length>1&&(_a=!0)},bo=()=>{rf=Date.now(),or=!0},e.addEventListener("pointerdown",vs,{passive:!0,capture:!0}),e.addEventListener("pointermove",_s,{passive:!0,capture:!0}),e.addEventListener("touchstart",ys,{passive:!0,capture:!0}),t.addEventListener("scroll",bo,{passive:!0,capture:!0}),e.addEventListener("scroll",bo,{passive:!0,capture:!0}),Es=!0}function af(){if(!Es)return;let e=ge(),t=te();vs&&e.removeEventListener("pointerdown",vs,!0),_s&&e.removeEventListener("pointermove",_s,!0),ys&&e.removeEventListener("touchstart",ys,!0),bo&&(t.removeEventListener("scroll",bo,!0),e.removeEventListener("scroll",bo,!0)),Es=!1}function lf(e){let t=Date.now();if(_a||or||t-rf<lm||gs>0&&t-gs>am)return!1;if(e&&typeof e.clientX=="number"&&gs>0){let o=e.clientX-Ea,r=e.clientY-va;if(Math.hypot(o,r)>of)return!1}let n=te().getSelection();return!(n&&n.toString().trim().length>0)}var ya="tl-injected-styles",cm=`
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
`;function ba(e=J()){let t=ge().documentElement;t&&(t.setAttribute("data-tl-theme",e.theme||"tavern"),t.setAttribute("data-tl-underline",e.ui?.showWordUnderline===!1?"0":"1"))}function cf(){let e=ge(),t=e.getElementById(ya);t||(t=e.createElement("style"),t.id=ya,e.head.appendChild(t)),t.textContent=cm,ba()}function ff(){let e=ge(),t=e.getElementById(ya);t&&t.remove(),e.documentElement.removeAttribute("data-tl-theme"),e.documentElement.removeAttribute("data-tl-underline")}var Bl={};qh(Bl,{BaseTransition:()=>ul,BaseTransitionPropsValidators:()=>pi,Comment:()=>xe,DeprecationTypes:()=>nv,EffectScope:()=>Gn,ErrorCodes:()=>Jm,ErrorTypeStrings:()=>qE,Fragment:()=>Ve,KeepAlive:()=>Mg,ReactiveEffect:()=>ln,Static:()=>dn,Suspense:()=>DE,Teleport:()=>dg,Text:()=>In,TrackOpTypes:()=>tu,Transition:()=>iv,TransitionGroup:()=>Vv,TriggerOpTypes:()=>nu,VueElement:()=>xi,assertNumber:()=>qm,callWithAsyncErrorHandling:()=>_t,callWithErrorHandling:()=>ro,camelize:()=>ce,capitalize:()=>Tt,cloneVNode:()=>Jt,compatUtils:()=>tv,computed:()=>Fe,createApp:()=>Lr,createBlock:()=>ni,createCommentVNode:()=>Qu,createElementBlock:()=>ME,createElementVNode:()=>Tl,createHydrationRenderer:()=>Sl,createPropsRestProxy:()=>uE,createRenderer:()=>Nl,createSSRApp:()=>td,createSlots:()=>Jg,createStaticVNode:()=>UE,createTextVNode:()=>wl,createVNode:()=>ye,customRef:()=>$s,defineAsyncComponent:()=>Rg,defineComponent:()=>at,defineCustomElement:()=>jp,defineEmits:()=>tE,defineExpose:()=>nE,defineModel:()=>sE,defineOptions:()=>oE,defineProps:()=>eE,defineSSRCustomElement:()=>Ov,defineSlots:()=>rE,devtools:()=>JE,effect:()=>Lf,effectScope:()=>If,getCurrentInstance:()=>qe,getCurrentScope:()=>ja,getCurrentWatcher:()=>ou,getTransitionRawChildren:()=>Ar,guardReactiveProps:()=>Yu,h:()=>Cl,handleError:()=>so,hasInjectionContext:()=>ag,hydrate:()=>qv,hydrateOnIdle:()=>Cg,hydrateOnInteraction:()=>kg,hydrateOnMediaQuery:()=>Ig,hydrateOnVisible:()=>Dg,initCustomFormatter:()=>cp,initDirectivesForSSR:()=>Jv,inject:()=>Su,isMemoSame:()=>fp,isProxy:()=>qn,isReactive:()=>mt,isReadonly:()=>tt,isRef:()=>Ne,isRuntimeOnly:()=>rp,isShallow:()=>$e,isVNode:()=>mn,markRaw:()=>Ms,mergeDefaults:()=>cE,mergeModels:()=>fE,mergeProps:()=>Zu,nextTick:()=>Cr,nodeOps:()=>Rp,normalizeClass:()=>Xn,normalizeProps:()=>Nf,normalizeStyle:()=>Kn,onActivated:()=>Lg,onBeforeMount:()=>Ug,onBeforeUnmount:()=>hl,onBeforeUpdate:()=>dl,onDeactivated:()=>$g,onErrorCaptured:()=>Wg,onMounted:()=>Ir,onRenderTracked:()=>jg,onRenderTriggered:()=>Hg,onScopeDispose:()=>Oo,onServerPrefetch:()=>Bg,onUnmounted:()=>ml,onUpdated:()=>di,onWatcherCleanup:()=>za,openBlock:()=>Tr,patchProp:()=>Hp,popScopeId:()=>og,provide:()=>ig,proxyRefs:()=>mr,pushScopeId:()=>ng,queuePostFlushCb:()=>qt,reactive:()=>fn,readonly:()=>dr,ref:()=>Et,registerRuntimeCompiler:()=>Ol,render:()=>ed,renderList:()=>qg,renderSlot:()=>Yg,resolveComponent:()=>Xg,resolveDirective:()=>Gg,resolveDynamicComponent:()=>zg,resolveFilter:()=>ev,resolveTransitionHooks:()=>to,setBlockTracking:()=>wr,setDevtoolsHook:()=>YE,setTransitionHooks:()=>Dt,shallowReactive:()=>Rs,shallowReadonly:()=>zf,shallowRef:()=>Ls,ssrContextKey:()=>xu,ssrUtils:()=>ZE,stop:()=>$f,toDisplayString:()=>Aa,toHandlerKey:()=>sn,toHandlers:()=>Qg,toRaw:()=>Q,toRef:()=>Qf,toRefs:()=>Yf,toValue:()=>Jf,transformVNodeArgs:()=>$E,triggerRef:()=>qf,unref:()=>Jn,useAttrs:()=>lE,useCssModule:()=>Dv,useCssVars:()=>uv,useHost:()=>Wp,useId:()=>mg,useModel:()=>mE,useSSRContext:()=>Tu,useShadowRoot:()=>Av,useSlots:()=>aE,useTemplateRef:()=>gg,useTransitionState:()=>ui,vModelCheckbox:()=>Fl,vModelDynamic:()=>qp,vModelRadio:()=>Ul,vModelSelect:()=>zp,vModelText:()=>wi,vShow:()=>Fp,version:()=>up,warn:()=>vi,watch:()=>Po,watchEffect:()=>lg,watchPostEffect:()=>cg,watchSyncEffect:()=>wu,withAsyncContext:()=>pE,withCtx:()=>fl,withDefaults:()=>iE,withDirectives:()=>sg,withKeys:()=>Gv,withMemo:()=>GE,withModifiers:()=>Xv,withScopeId:()=>rg});function Ue(e){let t=Object.create(null);for(let n of e.split(","))t[n]=1;return n=>n in t}var ee={},Tn=[],De=()=>{},wn=()=>!1,jt=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),No=e=>e.startsWith("onUpdate:"),q=Object.assign,rr=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},fm=Object.prototype.hasOwnProperty,le=(e,t)=>fm.call(e,t),H=Array.isArray,rn=e=>jn(e)==="[object Map]",xt=e=>jn(e)==="[object Set]",uf=e=>jn(e)==="[object Date]",Ef=e=>jn(e)==="[object RegExp]",Z=e=>typeof e=="function",z=e=>typeof e=="string",Ae=e=>typeof e=="symbol",ie=e=>e!==null&&typeof e=="object",bs=e=>(ie(e)||Z(e))&&Z(e.then)&&Z(e.catch),vf=Object.prototype.toString,jn=e=>vf.call(e),Sa=e=>jn(e).slice(8,-1),So=e=>jn(e)==="[object Object]",sr=e=>z(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,$t=Ue(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),xa=Ue("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),um=1e4,Ns=e=>{let t=Object.create(null),n=0;return(o=>{let r=t[o];return r!==void 0?r:(++n>um&&(t=Object.create(null),n=1),t[o]=e(o))})},pm=/-\w/g,ce=Ns(e=>e.replace(pm,t=>t.slice(1).toUpperCase())),dm=/\B([A-Z])/g,ze=Ns(e=>e.replace(dm,"-$1").toLowerCase()),Tt=Ns(e=>e.charAt(0).toUpperCase()+e.slice(1)),sn=Ns(e=>e?`on${Tt(e)}`:""),Ie=(e,t)=>!Object.is(e,t),On=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},Ss=(e,t,n,o=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:o,value:n})},Wn=e=>{let t=parseFloat(e);return isNaN(t)?e:t},xo=e=>{let t=z(e)?Number(e):NaN;return isNaN(t)?e:t},pf,ir=()=>pf||(pf=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function _f(e,t){return e+JSON.stringify(t,(n,o)=>typeof o=="function"?o.toString():o)}var hm="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol",yf=Ue(hm);var df=2;function bf(e,t=0,n=e.length){if(t=Math.max(0,Math.min(t,e.length)),n=Math.max(0,Math.min(n,e.length)),t>n)return"";let o=e.split(/(\r?\n)/),r=o.filter((a,l)=>l%2===1);o=o.filter((a,l)=>l%2===0);let s=0,i=[];for(let a=0;a<o.length;a++)if(s+=o[a].length+(r[a]&&r[a].length||0),s>=t){for(let l=a-df;l<=a+df||n>s;l++){if(l<0||l>=o.length)continue;let f=l+1;i.push(`${f}${" ".repeat(Math.max(3-String(f).length,0))}|  ${o[l]}`);let u=o[l].length,c=r[l]&&r[l].length||0;if(l===a){let p=t-(s-(u+c)),d=Math.max(1,n>s?u-p:n-t);i.push("   |  "+" ".repeat(p)+"^".repeat(d))}else if(l>a){if(n>s){let p=Math.max(Math.min(n-s,u),1);i.push("   |  "+"^".repeat(p))}s+=u+c}}break}return i.join(`
`)}function Kn(e){if(H(e)){let t={};for(let n=0;n<e.length;n++){let o=e[n],r=z(o)?Ta(o):Kn(o);if(r)for(let s in r)t[s]=r[s]}return t}else if(z(e)||ie(e))return e}var mm=/;(?![^(]*\))/g,gm=/:([^]+)/,Em=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function Ta(e){let t={};return e.replace(Em,n=>n.startsWith("/*")?"":n).split(mm).forEach(n=>{if(n){let o=n.split(gm);o.length>1&&(t[o[0].trim()]=o[1].trim())}}),t}function Xn(e){let t="";if(z(e))t=e;else if(H(e))for(let n=0;n<e.length;n++){let o=Xn(e[n]);o&&(t+=o+" ")}else if(ie(e))for(let n in e)e[n]&&(t+=n+" ");return t.trim()}function Nf(e){if(!e)return null;let{class:t,style:n}=e;return t&&!z(t)&&(e.class=Xn(t)),n&&(e.style=Kn(n)),e}var vm="html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot",_m="svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view",ym="annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics",bm="area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr",wa=Ue(vm),Oa=Ue(_m),Ca=Ue(ym),Sf=Ue(bm),xf="itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly",Tf=Ue(xf),Nm=Ue(xf+",async,autofocus,autoplay,controls,default,defer,disabled,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");function xs(e){return!!e||e===""}function Sm(e,t,n){if(e.length!==t.length)return!1;let o=!0;for(let r=0;o&&r<e.length;r++)o=rt(e[r],t[r],n);return o}function hf(e,t,n){if(e.size!==t.size)return!1;let o=Array.from(t),r=new Uint8Array(o.length);for(let s of e){let i=-1;for(let a=0;a<o.length;a++)if(!r[a]&&rt(s,o[a],n)){i=a;break}if(i<0)return!1;r[i]=1}return!0}function xm(e,t,n){let o=rn(e),r=rn(t);if(o||r||(o=xt(e),r=xt(t),o||r))return o&&r?hf(e,t,n):!1;let s=Object.keys(e).length,i=Object.keys(t).length;if(s!==i)return!1;for(let a in e){let l=le(e,a),f=le(t,a);if(l&&!f||!l&&f||!rt(e[a],t[a],n))return!1}return gf(e)===gf(t)}function mf(e,t,n,o){n||(n=[new Map,new Map]);let[r,s]=n;if(r.has(e)||s.has(t))return r.get(e)===t&&s.get(t)===e;r.set(e,t),s.set(t,e);let i=o(e,t,n);return r.delete(e),s.delete(t),i}function rt(e,t,n){if(e===t)return!0;let o=uf(e),r=uf(t);return o||r?o&&r?e.getTime()===t.getTime():!1:(o=Ae(e),r=Ae(t),o||r?e===t:(o=H(e),r=H(t),o||r?o&&r?mf(e,t,n,Sm):!1:(o=ie(e),r=ie(t),o||r?!o||!r?!1:mf(e,t,n,xm):String(e)===String(t))))}function ar(e,t){return e.findIndex(n=>rt(n,t))}function gf(e){return Object.getPrototypeOf(e)===null&&e[Symbol.toPrimitive]==null&&typeof e.toString!="function"&&typeof e.valueOf!="function"?jn(e):String(e)}var wf=e=>!!(e&&e.__v_isRef===!0),Aa=e=>z(e)?e:e==null?"":H(e)||ie(e)&&(e.toString===vf||!Z(e.toString))?wf(e)?Aa(e.value):JSON.stringify(e,Of,2):String(e),Of=(e,t)=>wf(t)?Of(e,t.value):rn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[o,r],s)=>(n[Na(o,s)+" =>"]=r,n),{})}:xt(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>Na(n))}:Ae(t)?Na(t):ie(t)&&!H(t)&&!So(t)?String(t):t,Na=(e,t="")=>{var n;return Ae(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};function Da(e){return e==null?"initial":typeof e=="string"?e===""?" ":e:(typeof e!="number"||Number.isFinite(e),String(e))}function Tm(e,...t){console.warn(`[Vue warn] ${e}`,...t)}var ke,Gn=class{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&ke&&(ke.active?(this.parent=ke,this.index=(ke.scopes||(ke.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes){let o=this.scopes.slice();for(t=0,n=o.length;t<n;t++)o[t].pause()}for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes){let r=this.scopes.slice();for(t=0,n=r.length;t<n;t++)r[t].resume()}let o=this.effects.slice();for(t=0,n=o.length;t<n;t++)o[t].resume()}}run(t){if(this._active){let n=ke;try{return ke=this,t()}finally{ke=n}}}on(){++this._on===1&&(this.prevScope=ke,ke=this)}off(){if(this._on>0&&--this._on===0){if(ke===this)ke=this.prevScope;else{let t=ke;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,o;for(n=0,o=this.effects.length;n<o;n++)this.effects[n].stop();for(this.effects.length=0,n=0,o=this.cleanups.length;n<o;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){let r=this.scopes.slice();for(n=0,o=r.length;n<o;n++)r[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){let r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}};function If(e){return new Gn(e)}function ja(){return ke}function Oo(e,t=!1){ke&&(ke.active?ke.cleanups.push(e):e())}var ve;var Ia=new WeakSet,ln=class{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ke&&(ke.active?ke.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ia.has(this)&&(Ia.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Vf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Cf(this),Rf(this);let t=ve,n=Ft;ve=this,Ft=!0;try{return this.fn()}finally{Pf(this),ve=t,Ft=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Xa(t);this.deps=this.depsTail=void 0,Cf(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ia.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ra(this)&&this.run()}get dirty(){return Ra(this)}},kf=0,cr,fr;function Vf(e,t=!1){if(e.flags|=8,t){e.next=fr,fr=e;return}e.next=cr,cr=e}function Wa(){kf++}function Ka(){if(--kf>0)return;if(fr){let t=fr;for(fr=void 0;t;){let n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;cr;){let t=cr;for(cr=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(o){e||(e=o)}t=n}}if(e)throw e}function Rf(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Pf(e){let t,n=e.depsTail,o=n;for(;o;){let r=o.prevDep;o.version===-1?(o===n&&(n=r),Xa(o),wm(o)):t=o,o.dep.activeLink=o.prevActiveLink,o.prevActiveLink=void 0,o=r}e.deps=t,e.depsTail=n}function Ra(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Mf(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Mf(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===ur)||(e.globalVersion=ur,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Ra(e))))return;e.flags|=2;let t=e.dep,n=ve,o=Ft;ve=e,Ft=!0;try{Rf(e);let r=e.fn(e._value);(t.version===0||Ie(r,e._value))&&(e.flags|=128,e._value=r,t.version++)}catch(r){throw t.version++,r}finally{ve=n,Ft=o,Pf(e),e.flags&=-3}}function Xa(e,t=!1){let{dep:n,prevSub:o,nextSub:r}=e;if(o&&(o.nextSub=r,e.prevSub=void 0),r&&(r.prevSub=o,e.nextSub=void 0),n.subs===e&&(n.subs=o,!o&&n.computed)){n.computed.flags&=-5;for(let s=n.computed.deps;s;s=s.nextDep)Xa(s,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function wm(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}function Lf(e,t){e.effect instanceof ln&&(e=e.effect.fn);let n=new ln(e);t&&q(n,t);try{n.run()}catch(r){throw n.stop(),r}let o=n.run.bind(n);return o.effect=n,o}function $f(e){e.effect.stop()}var Ft=!0,Ff=[];function wt(){Ff.push(Ft),Ft=!1}function Ot(){let e=Ff.pop();Ft=e===void 0?!0:e}function Cf(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let n=ve;ve=void 0;try{t()}finally{ve=n}}}var ur=0,Pa=class{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},wo=class{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!ve||!Ft||ve===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==ve)n=this.activeLink=new Pa(ve,this),ve.deps?(n.prevDep=ve.depsTail,ve.depsTail.nextDep=n,ve.depsTail=n):ve.deps=ve.depsTail=n,Uf(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){let o=n.nextDep;o.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=o),n.prevDep=ve.depsTail,n.nextDep=void 0,ve.depsTail.nextDep=n,ve.depsTail=n,ve.deps===n&&(ve.deps=o)}return n}trigger(t){this.version++,ur++,this.notify(t)}notify(t){Wa();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Ka()}}};function Uf(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let o=t.deps;o;o=o.nextDep)Uf(o)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Cs=new WeakMap,zn=Symbol(""),Ma=Symbol(""),pr=Symbol("");function Be(e,t,n){if(Ft&&ve){let o=Cs.get(e);o||Cs.set(e,o=new Map);let r=o.get(n);r||(o.set(n,r=new wo),r.map=o,r.key=n),r.track()}}function Kt(e,t,n,o,r,s){let i=Cs.get(e);if(!i){ur++;return}let a=l=>{l&&l.trigger()};if(Wa(),t==="clear")i.forEach(a);else{let l=H(e),f=l&&sr(n);if(l&&n==="length"){let u=Number(o);i.forEach((c,p)=>{(p==="length"||p===pr||!Ae(p)&&p>=u)&&a(c)})}else switch((n!==void 0||i.has(void 0))&&a(i.get(n)),f&&a(i.get(pr)),t){case"add":l?f&&a(i.get("length")):(a(i.get(zn)),rn(e)&&a(i.get(Ma)));break;case"delete":l||(a(i.get(zn)),rn(e)&&a(i.get(Ma)));break;case"set":rn(e)&&a(i.get(zn));break}}Ka()}function Om(e,t){let n=Cs.get(e);return n&&n.get(t)}function To(e){let t=Q(e);return t===e||(Be(t,"iterate",pr),$e(e))?t:tt(e)?mt(e)?t.map(n=>cn(gt(n))):t.map(cn):t.map(gt)}function hr(e){return Be(e=Q(e),"iterate",pr),e}function Wt(e,t){return tt(e)?cn(mt(e)?gt(t):t):gt(t)}var Cm={__proto__:null,[Symbol.iterator](){return ka(this,Symbol.iterator,e=>Wt(this,e))},concat(...e){return To(this).concat(...e.map(t=>H(t)?To(t):t))},entries(){return ka(this,"entries",e=>(e[1]=Wt(this,e[1]),e))},every(e,t){return an(this,"every",e,t,void 0,arguments)},filter(e,t){return an(this,"filter",e,t,n=>n.map(o=>Wt(this,o)),arguments)},find(e,t){return an(this,"find",e,t,n=>Wt(this,n),arguments)},findIndex(e,t){return an(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return an(this,"findLast",e,t,n=>Wt(this,n),arguments)},findLastIndex(e,t){return an(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return an(this,"forEach",e,t,void 0,arguments)},includes(...e){return Va(this,"includes",e)},indexOf(...e){return Va(this,"indexOf",e)},join(e){return To(this).join(e)},lastIndexOf(...e){return Va(this,"lastIndexOf",e)},map(e,t){return an(this,"map",e,t,void 0,arguments)},pop(){return lr(this,"pop")},push(...e){return lr(this,"push",e)},reduce(e,...t){return Df(this,"reduce",e,t)},reduceRight(e,...t){return Df(this,"reduceRight",e,t)},shift(){return lr(this,"shift")},some(e,t){return an(this,"some",e,t,void 0,arguments)},splice(...e){return lr(this,"splice",e)},toReversed(){return To(this).toReversed()},toSorted(e){return To(this).toSorted(e)},toSpliced(...e){return To(this).toSpliced(...e)},unshift(...e){return lr(this,"unshift",e)},values(){return ka(this,"values",e=>Wt(this,e))}};function ka(e,t,n){let o=hr(e),r=o[t],s=r.call(o);if(o!==e&&!$e(e)){if(s[Symbol.toStringTag]==="Array Iterator"){let i=Object.create(Object.getPrototypeOf(s));return i.next=()=>Af(s.next(),n),r!==Bf[t]&&Object.defineProperties(i,{return:{get(){let a=s.return;return typeof a=="function"?a.bind(s):a}},throw:{get(){let a=s.throw;return typeof a=="function"?a.bind(s):a}}}),i}s._next=s.next,s.next=()=>Af(s._next(),n)}return s}function Af(e,t){return e.done||(e.value=t(e.value)),e}var Bf=Array.prototype;function an(e,t,n,o,r,s){let i=hr(e),a=i!==e&&!$e(e),l=i[t];if(l!==Bf[t]){let c=l.apply(e,s);return a?gt(c):c}let f=n;i!==e&&(a?f=function(c,p){return n.call(this,Wt(e,c),p,e)}:n.length>2&&(f=function(c,p){return n.call(this,c,p,e)}));let u=l.call(i,f,o);return a&&r?r(u):u}function Df(e,t,n,o){let r=hr(e),s=r!==e&&!$e(e),i=n,a=!1;r!==e&&(s?(a=o.length===0,i=function(f,u,c){return a&&(a=!1,f=Wt(e,f)),n.call(this,f,Wt(e,u),c,e)}):n.length>3&&(i=function(f,u,c){return n.call(this,f,u,c,e)}));let l=r[t](i,...o);return a?Wt(e,l):l}function Va(e,t,n){let o=Q(e);Be(o,"iterate",pr);let r=o[t](...n);return(r===-1||r===!1)&&qn(n[0])?(n[0]=Q(n[0]),o[t](...n)):r}function lr(e,t,n=[]){wt(),Wa();let o=Q(e)[t].apply(e,n);return Ka(),Ot(),o}var Am=Ue("__proto__,__v_isRef,__isVue"),Hf=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Ae));function Dm(e){Ae(e)||(e=String(e));let t=Q(this);return Be(t,"has",e),t.hasOwnProperty(e)}var As=class{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,o){if(n==="__v_skip")return t.__v_skip;let r=this._isReadonly,s=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return s;if(n==="__v_raw")return o===(r?s?Xf:Kf:s?Wf:jf).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(o)?t:void 0;let i=H(t);if(!r){let l;if(i&&(l=Cm[n]))return l;if(n==="hasOwnProperty")return Dm}let a=Reflect.get(t,n,Ne(t)?t:o);if((Ae(n)?Hf.has(n):Am(n))||(r||Be(t,"get",n),s))return a;if(Ne(a)){let l=i&&sr(n)?a:a.value;return r&&ie(l)?dr(l):l}return ie(a)?r?dr(a):fn(a):a}},Ds=class extends As{constructor(t=!1){super(!1,t)}set(t,n,o,r){let s=t[n],i=H(t)&&sr(n);if(!this._isShallow){let f=tt(s);if(!$e(o)&&!tt(o)&&(s=Q(s),o=Q(o)),!i&&Ne(s)&&!Ne(o))return f||(s.value=o),!0}let a=i?Number(n)<t.length:le(t,n),l=Reflect.set(t,n,o,Ne(t)?t:r);return t===Q(r)&&l&&(a?Ie(o,s)&&Kt(t,"set",n,o,s):Kt(t,"add",n,o)),l}deleteProperty(t,n){let o=le(t,n),r=t[n],s=Reflect.deleteProperty(t,n);return s&&o&&Kt(t,"delete",n,void 0,r),s}has(t,n){let o=Reflect.has(t,n);return(!Ae(n)||!Hf.has(n))&&Be(t,"has",n),o}ownKeys(t){return Be(t,"iterate",H(t)?"length":zn),Reflect.ownKeys(t)}},Is=class extends As{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}},Im=new Ds,km=new Is,Vm=new Ds(!0),Rm=new Is(!0),La=e=>e,Ts=e=>Reflect.getPrototypeOf(e);function Pm(e,t,n){return function(...o){let r=this.__v_raw,s=Q(r),i=rn(s),a=e==="entries"||e===Symbol.iterator&&i,l=e==="keys"&&i,f=r[e](...o),u=n?La:t?cn:gt;return!t&&Be(s,"iterate",l?Ma:zn),q(Object.create(f),{next(){let{value:c,done:p}=f.next();return p?{value:c,done:p}:{value:a?[u(c[0]),u(c[1])]:u(c),done:p}}})}}function ws(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function Mm(e,t){let n={get(r){let s=this.__v_raw,i=Q(s),a=Q(r);e||(Ie(r,a)&&Be(i,"get",r),Be(i,"get",a));let{has:l}=Ts(i),f=t?La:e?cn:gt;if(l.call(i,r))return f(s.get(r));if(l.call(i,a))return f(s.get(a));s!==i&&s.get(r)},get size(){let r=this.__v_raw;return!e&&Be(Q(r),"iterate",zn),r.size},has(r){let s=this.__v_raw,i=Q(s),a=Q(r);return e||(Ie(r,a)&&Be(i,"has",r),Be(i,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){let i=this,a=i.__v_raw,l=Q(a),f=t?La:e?cn:gt;return!e&&Be(l,"iterate",zn),a.forEach((u,c)=>r.call(s,f(u),f(c),i))}};return q(n,e?{add:ws("add"),set:ws("set"),delete:ws("delete"),clear:ws("clear")}:{add(r){let s=Q(this),i=Ts(s),a=Q(r),l=!t&&!$e(r)&&!tt(r)?a:r;return i.has.call(s,l)||Ie(r,l)&&i.has.call(s,r)||Ie(a,l)&&i.has.call(s,a)||(s.add(l),Kt(s,"add",l,l)),this},set(r,s){!t&&!$e(s)&&!tt(s)&&(s=Q(s));let i=Q(this),{has:a,get:l}=Ts(i),f=a.call(i,r);f||(r=Q(r),f=a.call(i,r));let u=l.call(i,r);return i.set(r,s),f?Ie(s,u)&&Kt(i,"set",r,s,u):Kt(i,"add",r,s),this},delete(r){let s=Q(this),{has:i,get:a}=Ts(s),l=i.call(s,r);l||(r=Q(r),l=i.call(s,r));let f=a?a.call(s,r):void 0,u=s.delete(r);return l&&Kt(s,"delete",r,void 0,f),u},clear(){let r=Q(this),s=r.size!==0,i=void 0,a=r.clear();return s&&Kt(r,"clear",void 0,void 0,i),a}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=Pm(r,e,t)}),n}function Vs(e,t){let n=Mm(e,t);return(o,r,s)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_isShallow"?t:r==="__v_raw"?o:Reflect.get(le(n,r)&&r in o?n:o,r,s)}var Lm={get:Vs(!1,!1)},$m={get:Vs(!1,!0)},Fm={get:Vs(!0,!1)},Um={get:Vs(!0,!0)};var jf=new WeakMap,Wf=new WeakMap,Kf=new WeakMap,Xf=new WeakMap;function Bm(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function fn(e){return tt(e)?e:Ps(e,!1,Im,Lm,jf)}function Rs(e){return Ps(e,!1,Vm,$m,Wf)}function dr(e){return Ps(e,!0,km,Fm,Kf)}function zf(e){return Ps(e,!0,Rm,Um,Xf)}function Ps(e,t,n,o,r){if(!ie(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let s=r.get(e);if(s)return s;let i=Bm(Sa(e));if(i===0)return e;let a=new Proxy(e,i===2?o:n);return r.set(e,a),a}function mt(e){return tt(e)?mt(e.__v_raw):!!(e&&e.__v_isReactive)}function tt(e){return!!(e&&e.__v_isReadonly)}function $e(e){return!!(e&&e.__v_isShallow)}function qn(e){return e?!!e.__v_raw:!1}function Q(e){let t=e&&e.__v_raw;return t?Q(t):e}function Ms(e){return!le(e,"__v_skip")&&Object.isExtensible(e)&&Ss(e,"__v_skip",!0),e}var gt=e=>ie(e)?fn(e):e,cn=e=>ie(e)?dr(e):e;function Ne(e){return e?e.__v_isRef===!0:!1}function Et(e){return Gf(e,!1)}function Ls(e){return Gf(e,!0)}function Gf(e,t){return Ne(e)?e:new $a(e,t)}var $a=class{constructor(t,n){this.dep=new wo,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:Q(t),this._value=n?t:gt(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){let n=this._rawValue,o=this.__v_isShallow||$e(t)||tt(t);t=o?t:Q(t),Ie(t,n)&&(this._rawValue=t,this._value=o?t:gt(t),this.dep.trigger())}};function qf(e){e.dep&&e.dep.trigger()}function Jn(e){return Ne(e)?e.value:e}function Jf(e){return Z(e)?e():Jn(e)}var Hm={get:(e,t,n)=>t==="__v_raw"?e:Jn(Reflect.get(e,t,n)),set:(e,t,n,o)=>{let r=e[t];return Ne(r)&&!Ne(n)?(r.value=n,!0):Reflect.set(e,t,n,o)}};function mr(e){return mt(e)?e:new Proxy(e,Hm)}var Fa=class{constructor(t){this.__v_isRef=!0,this._value=void 0;let n=this.dep=new wo,{get:o,set:r}=t(n.track.bind(n),n.trigger.bind(n));this._get=o,this._set=r}get value(){return this._value=this._get()}set value(t){this._set(t)}};function $s(e){return new Fa(e)}function Yf(e){let t=H(e)?new Array(e.length):{};for(let n in e)t[n]=Zf(e,n);return t}var Ua=class{constructor(t,n,o){this._object=t,this._defaultValue=o,this.__v_isRef=!0,this._value=void 0,this._key=Ae(n)?n:String(n),this._raw=Q(t);let r=!0,s=t;if(!H(t)||Ae(this._key)||!sr(this._key))do r=!qn(s)||$e(s);while(r&&(s=s.__v_raw));this._shallow=r}get value(){let t=this._object[this._key];return this._shallow&&(t=Jn(t)),this._value=t===void 0?this._defaultValue:t}set value(t){if(this._shallow&&Ne(this._raw[this._key])){let n=this._object[this._key];if(Ne(n)){n.value=t;return}}this._object[this._key]=t}get dep(){return Om(this._raw,this._key)}},Ba=class{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}};function Qf(e,t,n){return Ne(e)?e:Z(e)?new Ba(e):ie(e)&&arguments.length>1?Zf(e,t,n):Et(e)}function Zf(e,t,n){return new Ua(e,t,n)}var Ha=class{constructor(t,n,o){this.fn=t,this.setter=n,this._value=void 0,this.dep=new wo(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ur-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=o}notify(){if(this.flags|=16,!(this.flags&8)&&ve!==this)return Vf(this,!0),!0}get value(){let t=this.dep.track();return Mf(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}};function eu(e,t,n=!1){let o,r;return Z(e)?o=e:(o=e.get,r=e.set),new Ha(o,r,n)}var tu={GET:"get",HAS:"has",ITERATE:"iterate"},nu={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"};var Os={},ks=new WeakMap,Cn;function ou(){return Cn}function za(e,t=!1,n=Cn){if(n){let o=ks.get(n);o||ks.set(n,o=[]),o.push(e)}}function ru(e,t,n=ee){let{immediate:o,deep:r,once:s,scheduler:i,augmentJob:a,call:l}=n,f=g=>{(n.onWarn||Tm)("Invalid watch source: ",g,"A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.")},u=g=>r?g:$e(g)||r===!1||r===0?Xt(g,1):Xt(g),c,p,d,v,h=!1,N=!1;if(Ne(e)?(p=()=>e.value,h=$e(e)):mt(e)?(p=()=>u(e),h=!0):H(e)?(N=!0,h=e.some(g=>mt(g)||$e(g)),p=()=>e.map(g=>{if(Ne(g))return g.value;if(mt(g))return u(g);if(Z(g))return l?l(g,2):g()})):Z(e)?t?p=l?()=>l(e,2):e:p=()=>{if(d){wt();try{d()}finally{Ot()}}let g=Cn;Cn=c;try{return l?l(e,3,[v]):e(v)}finally{Cn=g}}:p=De,t&&r){let g=p,O=r===!0?1/0:r;p=()=>Xt(g(),O)}let C=ja(),y=()=>{c.stop(),C&&C.active&&rr(C.effects,c)};if(s&&t){let g=t;t=(...O)=>{try{return g(...O)}finally{y()}}}let E=N?new Array(e.length).fill(Os):Os,b=g=>{if(!(!(c.flags&1)||!c.dirty&&!g))if(t){let O=c.run();if(g||r||h||(N?O.some((D,S)=>Ie(D,E[S])):Ie(O,E))){let D=Cn;wt();try{d&&d(),Cn=c;let S=[O,E===Os?void 0:N&&E[0]===Os?[]:E,v];E=O,l?l(t,3,S):t(...S)}finally{Cn=D,Ot()}}}else c.run()};return a&&a(b),c=new ln(p),c.scheduler=i?()=>i(b,!1):b,v=g=>za(g,!1,c),d=c.onStop=()=>{let g=ks.get(c);if(g){if(l)l(g,4);else for(let O of g)O();ks.delete(c)}},t?o?b(!0):E=c.run():i?i(b.bind(null,!0),!0):c.run(),y.pause=c.pause.bind(c),y.resume=c.resume.bind(c),y.stop=y,y}function Xt(e,t=1/0,n){if(t<=0||!ie(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,Ne(e))Xt(e.value,t,n);else if(H(e))for(let o=0;o<e.length;o++)Xt(e[o],t,n);else if(xt(e)||rn(e))e.forEach(o=>{Xt(o,t,n)});else if(So(e)){for(let o in e)Xt(e[o],t,n);for(let o of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,o)&&Xt(e[o],t,n)}return e}var Zn=[];function jm(e){Zn.push(e)}function Wm(){Zn.pop()}var Ga=!1;function su(e,...t){if(Ga)return;Ga=!0,wt();let n=Zn.length?Zn[Zn.length-1].component:null,o=n&&n.appContext.config.warnHandler,r=Km();if(o)ro(o,n,11,[e+t.map(s=>{var i,a;return(a=(i=s.toString)==null?void 0:i.call(s))!=null?a:JSON.stringify(s)}).join(""),n&&n.proxy,r.map(({vnode:s})=>`at <${lp(n,s.type)}>`).join(`
`),r]);else{let s=[`[Vue warn]: ${e}`,...t];r.length&&s.push(`
`,...Xm(r)),console.warn(...s)}Ot(),Ga=!1}function Km(){let e=Zn[Zn.length-1];if(!e)return[];let t=[];for(;e;){let n=t[0];n&&n.vnode===e?n.recurseCount++:t.push({vnode:e,recurseCount:0});let o=e.component&&e.component.parent;e=o&&o.vnode}return t}function Xm(e){let t=[];return e.forEach((n,o)=>{t.push(...o===0?[]:[`
`],...zm(n))}),t}function zm({vnode:e,recurseCount:t}){let n=t>0?`... (${t} recursive calls)`:"",o=e.component?e.component.parent==null:!1,r=` at <${lp(e.component,e.type,o)}`,s=">"+n;return e.props?[r,...Gm(e.props),s]:[r+s]}function Gm(e){let t=[],n=Object.keys(e);return n.slice(0,3).forEach(o=>{t.push(...Eu(o,e[o]))}),n.length>3&&t.push(" ..."),t}function Eu(e,t,n){return z(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):typeof t=="number"||typeof t=="boolean"||t==null?n?t:[`${e}=${t}`]:Ne(t)?(t=Eu(e,Q(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):Z(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=Q(t),n?t:[`${e}=`,t])}function qm(e,t){}var Jm={SETUP_FUNCTION:0,0:"SETUP_FUNCTION",RENDER_FUNCTION:1,1:"RENDER_FUNCTION",NATIVE_EVENT_HANDLER:5,5:"NATIVE_EVENT_HANDLER",COMPONENT_EVENT_HANDLER:6,6:"COMPONENT_EVENT_HANDLER",VNODE_HOOK:7,7:"VNODE_HOOK",DIRECTIVE_HOOK:8,8:"DIRECTIVE_HOOK",TRANSITION_HOOK:9,9:"TRANSITION_HOOK",APP_ERROR_HANDLER:10,10:"APP_ERROR_HANDLER",APP_WARN_HANDLER:11,11:"APP_WARN_HANDLER",FUNCTION_REF:12,12:"FUNCTION_REF",ASYNC_COMPONENT_LOADER:13,13:"ASYNC_COMPONENT_LOADER",SCHEDULER:14,14:"SCHEDULER",COMPONENT_UPDATE:15,15:"COMPONENT_UPDATE",APP_UNMOUNT_CLEANUP:16,16:"APP_UNMOUNT_CLEANUP"},Ym={sp:"serverPrefetch hook",bc:"beforeCreate hook",c:"created hook",bm:"beforeMount hook",m:"mounted hook",bu:"beforeUpdate hook",u:"updated",bum:"beforeUnmount hook",um:"unmounted hook",a:"activated hook",da:"deactivated hook",ec:"errorCaptured hook",rtc:"renderTracked hook",rtg:"renderTriggered hook",0:"setup function",1:"render function",2:"watcher getter",3:"watcher callback",4:"watcher cleanup function",5:"native event handler",6:"component event handler",7:"vnode hook",8:"directive hook",9:"transition hook",10:"app errorHandler",11:"app warnHandler",12:"ref function",13:"async component loader",14:"scheduler flush",15:"component update",16:"app unmount cleanup function"};function ro(e,t,n,o){try{return o?e(...o):e()}catch(r){so(r,t,n)}}function _t(e,t,n,o){if(Z(e)){let r=ro(e,t,n,o);return r&&bs(r)&&r.catch(s=>{so(s,t,n,void 0,!0)}),r}if(H(e)){let r=[];for(let s=0;s<e.length;s++)r.push(_t(e[s],t,n,o));return r}}function so(e,t,n,o=!0,r=!1){let s=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:a}=t&&t.appContext.config||ee;if(t){let l=t.parent,f=t.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){let c=l.ec;if(c&&!l.isUnmounted&&(!r||l.scope.active)){for(let p=0;p<c.length;p++)if(c[p](e,f,u)===!1)return}l=l.parent}if(i){wt(),ro(i,null,10,[e,f,u]),Ot();return}}Qm(e,n,s,o,a)}function Qm(e,t,n,o=!0,r=!1){if(r)throw e;console.error(e)}var nt=[],Ut=-1,Gt=[],Dn=null,Ao=0,vu=Promise.resolve(),Gs=null;function Cr(e){let t=Gs||vu;return e?t.then(this?e.bind(this):e):t}function Zm(e){let t=Ut+1,n=nt.length;for(;t<n;){let o=t+n>>>1,r=nt[o],s=yr(r);s<e||s===e&&r.flags&2?t=o+1:n=o}return t}function ai(e){if(!(e.flags&1)){let t=yr(e),n=nt[nt.length-1];!n||!(e.flags&2)&&t>=yr(n)?nt.push(e):nt.splice(Zm(t),0,e),e.flags|=1,_u()}}function _u(){Gs||(Gs=vu.then(bu))}function qt(e){if(!H(e))Dn&&e.id===-1?Dn.splice(Ao+1,0,e):e.flags&1||(Gt.push(e),e.flags|=1);else for(let t=0;t<e.length;t++)Gt.push(e[t]);_u()}function yu(e,t,n,o=Ut+1){for(;o<nt.length;o++){let r=nt[o];if(r&&r.flags&2){if(e&&r.id!==e.uid||t!==void 0&&!(r.id>=t))continue;nt.splice(o,1),o=e?o-1:Ut,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function qs(e,t,n=0){if(Gt.length){let o=Gt,r=0;if(t){o=[];for(let i=0;i<Gt.length;i++){let a=Gt[i];(a.i!==void 0?!a.i||a.i.uid<n:t.has(a))?Gt[r++]=a:o.push(a)}}let s=[...new Set(o)].sort((i,a)=>yr(i)-yr(a));if(Gt.length=r,Dn){for(let i=0;i<s.length;i++)Dn.push(s[i]);return}for(Dn=s,Ao=0;Ao<Dn.length;Ao++){let i=Dn[Ao];i.flags&4&&(i.flags&=-2),i.flags&8||i(),i.flags&=-2}Dn=null,Ao=0}}var qa=!1;function eg(e,t){if(qa){e();return}let n=t===void 0?void 0:new Set(Gt);e(),qa=!0;try{yu(void 0,t),qs(void 0,n,t)}finally{qa=!1}}var yr=e=>e.id==null?e.flags&2?-1:1/0:e.id;function bu(e){let t=De;try{for(Ut=0;Ut<nt.length;Ut++){let n=nt[Ut];n&&!(n.flags&8)&&(n.flags&4&&(n.flags&=-2),ro(n,n.i,n.i?15:14),n.flags&4||(n.flags&=-2))}}finally{for(;Ut<nt.length;Ut++){let n=nt[Ut];n&&(n.flags&=-2)}Ut=-1,nt.length=0,qs(e),Gs=null,(nt.length||Gt.length)&&bu(e)}}var tg=!1;var Do,Fs=[],iu=!1;function Nu(e,t){var n,o;Do=e,Do?(Do.enabled=!0,Fs.forEach(({event:r,args:s})=>Do.emit(r,...s)),Fs=[]):typeof window<"u"&&window.HTMLElement&&!((o=(n=window.navigator)==null?void 0:n.userAgent)!=null&&o.includes("jsdom"))?((t.__VUE_DEVTOOLS_HOOK_REPLAY__=t.__VUE_DEVTOOLS_HOOK_REPLAY__||[]).push(s=>{Nu(s,t)}),setTimeout(()=>{Do||(t.__VUE_DEVTOOLS_HOOK_REPLAY__=null,iu=!0,Fs=[])},3e3)):(iu=!0,Fs=[])}var je=null,li=null;function br(e){let t=je;return je=e,li=e&&e.type.__scopeId||null,t}function ng(e){li=e}function og(){li=null}var rg=e=>fl;function fl(e,t=je,n){if(!t||e._n)return e;let o=(...r)=>{o._d&&wr(-1);let s=br(t),i=hn.length,a;try{a=e(...r)}finally{for(let l=hn.length;l>i;l--)gi();br(s),o._d&&wr(1)}return a};return o._n=!0,o._c=!0,o._d=!0,o}function sg(e,t){if(je===null)return e;let n=kr(je),o=e.dirs||(e.dirs=[]);for(let r=0;r<t.length;r++){let[s,i,a,l=ee]=t[r];s&&(Z(s)&&(s={mounted:s,updated:s}),s.deep&&Xt(i),o.push({dir:s,instance:n,value:i,oldValue:void 0,arg:a,modifiers:l}))}return e}function zt(e,t,n,o){let r=e;if(o==="beforeMount")e._mount=e;else if(o==="beforeUpdate"){let a=t&&t._mount;a&&(a._latest=e,e._mount=a)}else if(o==="mounted"){let a=e._latest;e._mount=e._latest=void 0,a&&(r=a,a._mount=void 0)}let s=r.dirs,i=t&&t.dirs;for(let a=0;a<s.length;a++){let l=s[a];i?l.oldValue=i[a].value:o==="mounted"&&l.oldValue!==void 0&&(l=q({},l,{oldValue:void 0}));let f=l.dir[o];f&&(wt(),_t(f,n,8,[e.el,l,r,t]),Ot())}}function ig(e,t){if(He){let n=He.provides,o=He.parent&&He.parent.provides;o===n&&(n=He.provides=Object.create(o)),n[e]=t}}function Su(e,t,n=!1){let o=qe();if(o||eo){let r=eo?eo._context.provides:o?o.parent==null||o.ce?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides:void 0;if(r&&e in r)return r[e];if(arguments.length>1)return n&&Z(t)?t.call(o&&o.proxy):t}}function ag(){return!!(qe()||eo)}var xu=Symbol.for("v-scx"),Tu=()=>{{let e=Su(xu);return e}};function lg(e,t){return ci(e,null,t)}function cg(e,t){return ci(e,null,{flush:"post"})}function wu(e,t){return ci(e,null,{flush:"sync"})}function Po(e,t,n){return ci(e,t,n)}function ci(e,t,n=ee){let{immediate:o,deep:r,flush:s,once:i}=n,a=q({},n),l=t&&o||!t&&s!=="post",f;if(oo){if(s==="sync"){let d=Tu();f=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){let d=()=>{};return d.stop=De,d.resume=De,d.pause=De,d}}let u=He;a.call=(d,v,h)=>_t(d,u,v,h);let c=!1;s==="post"?a.scheduler=d=>{d.i=u,we(d,u&&u.suspense)}:s!=="sync"&&(c=!0,a.scheduler=(d,v)=>{v?d():ai(d)}),a.augmentJob=d=>{t&&(d.flags|=4),c&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};let p=ru(e,t,a);return oo&&(f?f.push(p):l&&p()),p}var An=new WeakMap,Ou=Symbol("_vte"),fi=e=>e.__isTeleport,Qn=e=>e&&(e.disabled||e.disabled===""),fg=e=>e&&(e.defer||e.defer===""),au=e=>typeof SVGElement<"u"&&e instanceof SVGElement,lu=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,Za=(e,t)=>{let n=e&&e.to;return z(n)?t?t(n):null:n},ug={name:"Teleport",__isTeleport:!0,process(e,t,n,o,r,s,i,a,l,f){let{mc:u,pc:c,pbc:p,o:{insert:d,querySelector:v,createText:h,createComment:N,parentNode:C}}=f,y=Qn(t.props),{dynamicChildren:E}=t,b=(D,S,T)=>{D.shapeFlag&16&&u(D.children,S,T,r,s,i,a,l)},g=(D=t)=>{let S=Qn(D.props),T=D.target=Za(D.props,v),V=el(T,D,h,d);T&&(i!=="svg"&&au(T)?i="svg":i!=="mathml"&&lu(T)&&(i="mathml"),r&&r.isCE&&(r.ce._teleportTargets||(r.ce._teleportTargets=new Set)).add(T),S||(b(D,T,V),Er(D,!1)))},O=D=>{let S=()=>{if(An.get(D)===S){if(An.delete(D),Qn(D.props)){let T=C(D.el)||n;b(D,T,D.anchor),Er(D,!0)}g(D)}};An.set(D,S),we(S,s)};if(e==null){let D=t.el=h(""),S=t.anchor=h("");if(d(D,n,o),d(S,n,o),fg(t.props)||s&&s.pendingBranch){O(t);return}y&&(b(t,n,S),Er(t,!0)),g()}else{t.el=e.el;let D=t.anchor=e.anchor,S=An.get(e);if(S){S.flags|=8,An.delete(e),O(t);return}t.targetStart=e.targetStart;let T=t.target=e.target,V=t.targetAnchor=e.targetAnchor,M=Qn(e.props),w=M?n:T,$=M?D:V;if(i==="svg"||au(T)?i="svg":(i==="mathml"||lu(T))&&(i="mathml"),E?(p(e.dynamicChildren,E,w,r,s,i,a),xl(e,t,!0)):l||c(e,t,w,$,r,s,i,a,!1),y)M?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):Us(t,n,D,f,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){let P=Za(t.props,v);P&&(t.target=P,Us(t,P,null,f,0))}else M&&Us(t,T,V,f,1);Er(t,y)}},remove(e,t,n,{um:o,o:{remove:r}},s){let{shapeFlag:i,children:a,anchor:l,targetStart:f,targetAnchor:u,target:c,props:p}=e,d=Qn(p),v=s||!d,h=An.get(e);if(h&&(h.flags|=8,An.delete(e)),c&&(r(f),r(u)),s&&r(l),!h&&(d||c)&&i&16)for(let N=0;N<a.length;N++){let C=a[N];o(C,t,n,v,!!C.dynamicChildren)}},move:Us,hydrate:pg};function Us(e,t,n,{o:{insert:o},m:r},s=2){s===0&&(e.targetStart&&o(e.targetStart,t,n),o(e.targetAnchor,t,n),n=e.targetAnchor);let{el:i,anchor:a,shapeFlag:l,children:f,props:u}=e,c=s===2;if(c&&o(i,t,n),!An.has(e)&&(!c||Qn(u))&&l&16)for(let p=0;p<f.length;p++)r(f[p],t,n,2);c&&o(a,t,n)}function pg(e,t,n,o,r,s,{o:{nextSibling:i,parentNode:a,querySelector:l,insert:f,createText:u}},c){function p(N,C){let y=C;for(;y;){if(y&&y.nodeType===8){if(y.data==="teleport start anchor")t.targetStart=y;else if(y.data==="teleport anchor"){t.targetAnchor=y,N._lpa=t.targetAnchor&&i(t.targetAnchor);break}}y=i(y)}}function d(N,C){C.anchor=c(i(N),C,a(N),n,o,r,s)}let v=t.target=Za(t.props,l),h=Qn(t.props);if(v){let N=v._lpa||v.firstChild;t.shapeFlag&16&&(h?(p(v,N),d(e,t),t.targetAnchor||el(v,t,u,f,a(e)===v?e:null)):(t.anchor=i(e),p(v,N),t.targetAnchor||el(v,t,u,f),c(N&&i(N),t,v,n,o,r,s))),Er(t,h)}else h&&t.shapeFlag&16&&(d(e,t),t.targetStart=e,t.targetAnchor=i(e));return t.anchor&&i(t.anchor)}var dg=ug;function Er(e,t){let n=e.ctx;n&&n.ut&&(t?n.ut(e.el,e.anchor):n.ut(e.targetStart,e.targetAnchor))}function el(e,t,n,o,r=null){let s=t.targetStart=n(""),i=t.targetAnchor=n("");return s[Ou]=i,e&&(o(s,e,r),o(i,e,r)),i}var vt=Symbol("_leaveCb"),gr=Symbol("_enterCb");function ui(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Ir(()=>{e.isMounted=!0}),hl(()=>{e.isUnmounting=!0}),e}var Ct=[Function,Array],pi={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Ct,onEnter:Ct,onAfterEnter:Ct,onEnterCancelled:Ct,onBeforeLeave:Ct,onLeave:Ct,onAfterLeave:Ct,onLeaveCancelled:Ct,onBeforeAppear:Ct,onAppear:Ct,onAfterAppear:Ct,onAppearCancelled:Ct},hg={name:"BaseTransition",props:pi,setup(e,{slots:t}){let n=qe(),o=ui();return()=>{let r=t.default&&Ar(t.default(),!0),s=r&&r.length?Cu(r):n.subTree?Qu():void 0;if(!s)return;let i=Q(e),{mode:a}=i;if(o.isLeaving)return Ja(s);let l=Js(s);if(!l)return Ja(s);let f=to(l,i,o,n);l.type!==xe&&Dt(l,f);let u=n.subTree&&Js(n.subTree);if(u&&u.type!==xe&&!At(u,l)&&Nr(n.subTree)){let c=to(u,i,o,n);if(Dt(u,c),a==="out-in"&&l.type!==xe)return o.isLeaving=!0,c.afterLeave=()=>{if(o.isLeaving=!1,!(n.job.flags&8))if(n.effect.flags&2){let p=()=>{n.job.flags&8||n.update()};p.i=n,ai(p)}else n.update();delete c.afterLeave,u=void 0},Ja(s);a==="in-out"&&l.type!==xe?c.delayLeave=(p,d,v)=>{let h=Au(o,u);h[String(u.key)]=u,p[vt]=()=>{d(),p[vt]=void 0,delete f.delayedLeave,u=void 0},f.delayedLeave=()=>{v(),delete f.delayedLeave,u=void 0}}:u=void 0}else u&&(u=void 0);return s}}};function Cu(e){let t=e[0];if(e.length>1){let n=!1;for(let o of e)if(o.type!==xe){t=o,n=!0;break}}return t}var ul=hg;function Au(e,t){let{leavingVNodes:n}=e,o=n.get(t.type);return o||(o=Object.create(null),n.set(t.type,o)),o}function to(e,t,n,o){let{appear:r,mode:s,persisted:i=!1,onBeforeEnter:a,onEnter:l,onAfterEnter:f,onEnterCancelled:u,onBeforeLeave:c,onLeave:p,onAfterLeave:d,onLeaveCancelled:v,onBeforeAppear:h,onAppear:N,onAfterAppear:C,onAppearCancelled:y}=t,E=String(e.key),b=Au(n,e),g=(S,T)=>{S&&_t(S,o,9,T)},O=(S,T)=>{let V=T[1];g(S,T),H(S)?S.every(M=>M.length<=1)&&V():S.length<=1&&V()},D={mode:s,persisted:i,beforeEnter(S){let T=a;if(!n.isMounted)if(r)T=h||a;else return;S[vt]&&S[vt](!0);let V=b[E];if(V&&At(e,V)){let M=V.el[vt];if(!M){let w=Nr(V);M=w&&w.el[vt]}M&&M()}g(T,[S])},enter(S){if(!tg&&S[vt]){D.delayedLeave&&D.delayedLeave();return}let T=l,V=f,M=u;if(!n.isMounted)if(r)T=N||l,V=C||f,M=y||u;else return;let w=!1;S[gr]=P=>{w||(w=!0,P?g(M,[S]):g(V,[S]),D.delayedLeave&&D.delayedLeave(),S[gr]=void 0)};let $=S[gr].bind(null,!1);T?O(T,[S,$]):$()},leave(S,T){let V=String(e.key);if(S[gr]&&S[gr](!0),n.isUnmounting)return T();g(c,[S]);let M=!1;S[vt]=$=>{M||(M=!0,T(),$?g(v,[S]):g(d,[S]),S[vt]=void 0,b[V]===e&&delete b[V])};let w=S[vt].bind(null,!1);b[V]=e,p?O(p,[S,w]):w()},clone(S){let T=to(S,t,n,o);return T.afterLeave=()=>{D.afterLeave&&D.afterLeave()},T.delayLeave=(V,M,w)=>{D.delayLeave?D.delayLeave(V,M,w):w()},T.delayedLeave=()=>{D.delayedLeave&&D.delayedLeave()},T}};return D}function Ja(e){if(Dr(e))return e=Jt(e),e.children=null,e}function Js(e){if(!Dr(e))return fi(e.type)&&e.children?Cu(e.children):e;if(e.component)return e.component.subTree;let{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&Z(n.default))return n.default()}}function Dt(e,t){if(e.shapeFlag&6&&e.component){e.transition=t;let n=e.component.subTree;Dt(fi(n.type)&&Js(n)||n,t)}else if(e.shapeFlag&128){let n=e.suspense;if(n){let o=n.isHydrating?n.pendingBranch:n.activeBranch;o&&Dt(o,t.clone(o))}else e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)}else if(e.transition=t,e.type===Ve&&H(e.children)){let n=_l(e.children,!1);n&&Dt(n,t)}}function Ar(e,t=!1,n){let o=[],r=0;for(let s=0;s<e.length;s++){let i=e[s],a=n==null?i.key:String(n)+String(i.key!=null?i.key:s);i.type===Ve?(i.patchFlag&128&&r++,o=o.concat(Ar(i.children,t,a))):(t||i.type!==xe)&&o.push(a!=null?Jt(i,{key:a}):i)}if(r>1)for(let s=0;s<o.length;s++)o[s].patchFlag=-2;return o}function Nr(e){if(e.component)return Nr(e.component.subTree);if(e.type===Ve){let t=H(e.children)&&_l(e.children,!1);return t?Nr(t):void 0}if(e.type!==xe)return e}function at(e,t){return Z(e)?q({name:e.name},t,{setup:e}):e}function mg(){let e=qe();return e?(e.appContext.config.idPrefix||"v")+"-"+e.ids[0]+e.ids[1]++:""}function Du(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function gg(e){let t=qe(),n=Ls(null);if(t){let r=t.refs===ee?t.refs={}:t.refs;Object.defineProperty(r,e,{enumerable:!0,get:()=>n.value,set:s=>n.value=s})}return n}function cu(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var Ys=new WeakMap;function ko(e,t,n,o,r=!1){if(H(e)){e.forEach((h,N)=>ko(h,t&&(H(t)?t[N]:t),n,o,r));return}if(pn(o)&&!r){o.shapeFlag&512&&o.type.__asyncResolved&&o.component.subTree.component&&ko(e,t,n,o.component.subTree);return}let s=o.shapeFlag&4?kr(o.component):o.el,i=r?null:s,{i:a,r:l}=e,f=t&&t.r,u=a.refs===ee?a.refs={}:a.refs,c=a.setupState,p=Q(c),d=c===ee?wn:h=>cu(u,h)?!1:le(p,h),v=(h,N)=>!(N&&cu(u,N));if(f!=null&&f!==l){if(fu(t),z(f))u[f]=null,d(f)&&(c[f]=null);else if(Ne(f)){let h=t;v(f,h.k)&&(f.value=null),h.k&&(u[h.k]=null)}}if(Z(l))ro(l,a,12,[i,u]);else{let h=z(l),N=Ne(l);if(h||N){let C=()=>{if(e.f){let y=h?d(l)?c[l]:u[l]:v(l)||!e.k?l.value:u[e.k];if(r)H(y)&&rr(y,s);else if(H(y))y.includes(s)||y.push(s);else if(h)u[l]=[s],d(l)&&(c[l]=u[l]);else{let E=[s];v(l,e.k)&&(l.value=E),e.k&&(u[e.k]=E)}}else h?(u[l]=i,d(l)&&(c[l]=i)):N&&(v(l,e.k)&&(l.value=i),e.k&&(u[e.k]=i))};if(i){let y=()=>{C(),Ys.delete(e)};y.id=-1,Ys.set(e,y),we(y,n)}else fu(e),C()}}}function fu(e){let t=Ys.get(e);t&&(t.flags|=8,Ys.delete(e))}var uu=!1,Co=()=>{uu||(console.error("Hydration completed but contains mismatches."),uu=!0)},Eg=e=>e.namespaceURI.includes("svg")&&e.tagName!=="foreignObject",vg=e=>e.namespaceURI.includes("MathML"),Bs=e=>{if(e.nodeType===1){if(Eg(e))return"svg";if(vg(e))return"mathml"}},Io=e=>e.nodeType===8;function _g(e){let{mt:t,p:n,o:{patchProp:o,createText:r,nextSibling:s,parentNode:i,remove:a,insert:l,createComment:f}}=e,u=(E,b)=>{if(!b.hasChildNodes()){n(null,E,b),qs(),b._vnode=E;return}c(b.firstChild,E,null,null,null),qs(),b._vnode=E},c=(E,b,g,O,D,S=!1)=>{S=S||!!b.dynamicChildren;let T=Io(E)&&E.data==="[",V=()=>h(E,b,g,O,D,T),{type:M,ref:w,shapeFlag:$,patchFlag:P}=b,W=E.nodeType;b.el=E,P===-2&&(S=!1,b.dynamicChildren=null);let j=null;switch(M){case In:W!==3?b.children===""?(l(b.el=r(""),i(E),E),j=E):j=V():(E.data!==b.children&&(Co(),E.data=b.children),j=s(E));break;case xe:y(E)?(j=s(E),C(b.el=E.content.firstChild,E,g)):W!==8||T?j=V():j=s(E);break;case dn:if(T&&(E=s(E),W=E.nodeType),W===1||W===3){j=E;let ae=!b.children.length;for(let pe=0;pe<b.staticCount;pe++)ae&&(b.children+=j.nodeType===1?j.outerHTML:j.data),pe===b.staticCount-1&&(b.anchor=j),j=s(j);return T?s(j):j}else V();break;case Ve:T?j=v(E,b,g,O,D,S):j=V();break;default:if($&1)(W!==1||b.type.toLowerCase()!==E.tagName.toLowerCase())&&!y(E)?j=V():j=p(E,b,g,O,D,S);else if($&6){b.slotScopeIds=D;let ae=i(E);if(T?j=N(E):Io(E)&&E.data==="teleport start"?j=N(E,E.data,"teleport end"):j=s(E),t(b,ae,null,g,O,Bs(ae),S),(pn(b)||b.component.asyncDep)&&!b.component.subTree){let pe;T?(pe=ye(dn),pe.anchor=j?j.previousSibling:ae.lastChild):pe=E.nodeType===3?wl(""):ye(E.nodeType===8?xe:"div"),pe.el=E,b.component.subTree=pe}}else $&64?W!==8?j=V():j=b.type.hydrate(E,b,g,O,D,S,e,d):$&128&&(j=b.type.hydrate(E,b,g,O,Bs(i(E)),D,S,e,c))}return w!=null&&ko(w,null,O,b),j},p=(E,b,g,O,D,S)=>{S=S||!!b.dynamicChildren;let{type:T,dynamicProps:V,props:M,patchFlag:w,shapeFlag:$,dirs:P,transition:W}=b,j=T==="input"||T==="option",ae=!!V;if(j||ae||w!==-1){P&&zt(b,null,g,"created");let pe=!1;if(y(E)){pe=Ku(null,W)&&g&&g.vnode.props&&g.vnode.props.appear;let se=E.content.firstChild;if(pe){let Me=se.getAttribute("class");Me&&(se.$cls=Me),W.beforeEnter(se)}C(se,E,g),b.el=E=se}if($&16&&!(M&&(M.innerHTML||M.textContent))){let se=d(E.firstChild,b,E,g,O,D,S);for(se&&!Ks(E,1)&&Co();se;){let Me=se;se=se.nextSibling,a(Me)}}else if($&8){let se=b.children;se[0]===`
`&&(E.tagName==="PRE"||E.tagName==="TEXTAREA")&&(se=se.slice(1));let{textContent:Me}=E;Me!==se&&Me!==se.replace(/\r\n|\r/g,`
`)&&(Ks(E,0)||Co(),E.textContent=b.children)}if(M){if(j||ae||!S||w&48){let se=E.tagName.includes("-"),Me=E.namespaceURI.includes("svg")?"svg":E.namespaceURI.includes("MathML")?"mathml":void 0;for(let Ee in M)if(j&&(Ee.endsWith("value")||Ee==="indeterminate")||jt(Ee)&&!$t(Ee)||Ee[0]==="."||se&&!$t(Ee)||V&&V.includes(Ee)){if(bg(E,Ee,M[Ee]))continue;o(E,Ee,null,M[Ee],Me,g)}}else if(M.onClick)o(E,"onClick",null,M.onClick,void 0,g);else if(w&4&&mt(M.style))for(let se in M.style)M.style[se]}let he;(he=M&&M.onVnodeBeforeMount)&&st(he,g,b),P&&zt(b,null,g,"beforeMount"),((he=M&&M.onVnodeMounted)||P||pe)&&ti(()=>{he&&st(he,g,b),pe&&W.enter(E),P&&zt(b,null,g,"mounted")},O)}return E.nextSibling},d=(E,b,g,O,D,S,T)=>{T=T||!!b.dynamicChildren;let V=b.children,M=V.length,w=!1;for(let $=0;$<M;$++){let P=T?V[$]:V[$]=it(V[$]),W=P.type===In;E?(W&&!T&&$+1<M&&it(V[$+1]).type===In&&(l(r(E.data.slice(P.children.length)),g,s(E)),E.data=P.children),E=c(E,P,O,D,S,T)):W&&!P.children?l(P.el=r(""),g):(w||(w=!0,Ks(g,1)||Co()),n(null,P,g,null,O,D,Bs(g),S))}return E},v=(E,b,g,O,D,S)=>{let{slotScopeIds:T}=b;T&&(D=D?D.concat(T):T);let V=i(E),M=d(s(E),b,V,g,O,D,S);return M&&Io(M)&&M.data==="]"?s(b.anchor=M):(Co(),l(b.anchor=f("]"),V,M),M)},h=(E,b,g,O,D,S)=>{if(Sg(E,b)||Co(),b.el=null,S){let M=N(E);for(;;){let w=s(E);if(w&&w!==M)a(w);else break}}let T=s(E),V=i(E);return a(E),n(null,b,V,T,g,O,Bs(V),D),g&&g.vnode.el===E&&(g.vnode.el=b.el,mi(g,b.el)),T},N=(E,b="[",g="]")=>{let O=0;for(;E;)if(E=s(E),E&&Io(E)&&(E.data===b&&O++,E.data===g)){if(O===0)return s(E);O--}return E},C=(E,b,g)=>{let O=b.parentNode;O&&O.replaceChild(E,b);let D=g;for(;D;)D.vnode.el===b&&(D.vnode.el=D.subTree.el=E),D=D.parent},y=E=>E.nodeType===1&&E.tagName==="TEMPLATE";return[u,c]}var yg=new Set(["src","srcset","href","poster"]);function bg(e,t,n){return yg.has(t)?e.getAttribute(t)===(n==null?null:`${n}`):!1}var Qs="data-allow-mismatch",Ng={0:"text",1:"children",2:"class",3:"style",4:"attribute"};function Ks(e,t){if(t===0||t===1)for(;e&&!e.hasAttribute(Qs);)e=e.parentElement;return pl(e&&e.getAttribute(Qs),t)}function pl(e,t){if(e==null)return!1;if(e==="")return!0;{let n=e.split(",");return t===0&&n.includes("children")?!0:n.includes(Ng[t])}}function Sg(e,t){return Ks(e.parentElement,1)||xg(e)||Tg(t)}function xg(e){return e.nodeType===1&&pl(e.getAttribute(Qs),1)}function Tg({props:e}){let t=e&&e[Qs];return typeof t=="string"&&pl(t,1)}var wg=ir().requestIdleCallback||(e=>setTimeout(e,1)),Og=ir().cancelIdleCallback||(e=>clearTimeout(e)),Cg=(e=1e4)=>t=>{let n=wg(t,{timeout:e});return()=>Og(n)};function Ag(e){let{top:t,left:n,bottom:o,right:r}=e.getBoundingClientRect(),{innerHeight:s,innerWidth:i}=window;return(t>0&&t<s||o>0&&o<s)&&(n>0&&n<i||r>0&&r<i)}var Dg=e=>(t,n)=>{let o=new IntersectionObserver(s=>{for(let i of s)if(i.isIntersecting){o.disconnect(),t();break}},e),r=s=>{if(Ag(s))return t(),o.disconnect(),!1;if(getComputedStyle(s).display==="contents"){for(let i=0;i<s.children.length;i++)if(r(s.children[i])===!1)return!1}o.observe(s)};return n(s=>{if(s instanceof Element)return r(s)}),()=>o.disconnect()},Ig=e=>t=>{if(e){let n=matchMedia(e);if(n.matches)t();else return n.addEventListener("change",t,{once:!0}),()=>n.removeEventListener("change",t)}},kg=(e=[])=>(t,n)=>{z(e)&&(e=[e]);let o=!1,r=i=>{o||(o=!0,s(),t(),i.target.dispatchEvent(new i.constructor(i.type,i)))},s=()=>{n(i=>{for(let a of e)i.removeEventListener(a,r)})};return n(i=>{for(let a of e)i.addEventListener(a,r,{once:!0})}),s};function Vg(e,t){if(Io(e)&&e.data==="["){let n=1,o=e.nextSibling;for(;o;){if(o.nodeType===1){if(t(o)===!1)break}else if(Io(o))if(o.data==="]"){if(--n===0)break}else o.data==="["&&n++;o=o.nextSibling}}else t(e)}var pn=e=>!!e.type.__asyncLoader;function Rg(e){Z(e)&&(e={loader:e});let{loader:t,loadingComponent:n,errorComponent:o,delay:r=200,hydrate:s,timeout:i,suspensible:a=!0,onError:l}=e,f=null,u,c=0,p=()=>(c++,f=null,d()),d=()=>{let v;return f||(v=f=t().catch(h=>{if(h=h instanceof Error?h:new Error(String(h)),l)return new Promise((N,C)=>{l(h,()=>N(p()),()=>C(h),c+1)});throw h}).then(h=>v!==f&&f?f:(h&&(h.__esModule||h[Symbol.toStringTag]==="Module")&&(h=h.default),u=h,h)))};return at({name:"AsyncComponentWrapper",__asyncLoader:d,__asyncHydrate(v,h,N){let C=v.isConnected,y=!1;(h.bu||(h.bu=[])).push(()=>y=!0);let E=()=>{y||!v.parentNode||C&&!v.isConnected||N()},b=s?()=>{let g=s(E,O=>Vg(v,O));g&&(h.bum||(h.bum=[])).push(g)}:E;u?b():d().then(()=>!h.isUnmounted&&b())},get __asyncResolved(){return u},setup(){let v=He;if(Du(v),u)return()=>Hs(u,v);let h=g=>{f=null,so(g,v,13,!o,!0)};if(a&&v.suspense||oo)return d().then(g=>()=>Hs(g,v)).catch(g=>(h(g),()=>o?ye(o,{error:g}):null));let N=Et(!1),C=Et(),y=Et(!!r),E,b;return Oo(()=>{E!=null&&clearTimeout(E),b!=null&&clearTimeout(b)}),r&&(b=setTimeout(()=>{v.isUnmounted||(y.value=!1)},r)),i!=null&&(E=setTimeout(()=>{if(!v.isUnmounted&&!N.value&&!C.value){let g=new Error(`Async component timed out after ${i}ms.`);h(g),C.value=g}},i)),d().then(()=>{v.isUnmounted||(N.value=!0,v.parent&&Dr(v.parent.vnode)&&v.parent.update())}).catch(g=>{if(v.isUnmounted){f=null;return}h(g),C.value=g}),()=>{if(N.value&&u)return Hs(u,v);if(C.value&&o)return ye(o,{error:C.value});if(n&&!y.value)return Hs(n,v)}}})}function Hs(e,t){let{ref:n,props:o,children:r,ce:s}=t.vnode,i=ye(e,o,r);return i.ref=n,i.ce=s,delete t.vnode.ce,i}var Dr=e=>e.type.__isKeepAlive,Pg={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){let n=qe(),o=n.ctx;if(!o.renderer)return()=>{let y=t.default&&t.default();return y&&y.length===1?y[0]:y};let r=new Map,s=new Set,i=null,a=n.suspense,{renderer:{p:l,m:f,um:u,o:{createElement:c}}}=o,p=c("div");o.activate=(y,E,b,g,O)=>{let D=y.component;f(y,E,b,0,a),l(D.vnode,y,E,b,D,a,g,y.slotScopeIds,O),we(()=>{D.isDeactivated=!1,D.a&&On(D.a);let S=y.props&&y.props.onVnodeMounted;S&&st(S,D.parent,y)},a)},o.deactivate=y=>{let E=r.get(y.key==null?y.type:y.key);if(!E||E.component!==y.component)return!1;let b=y.component;return Zs(b.m),Zs(b.a),f(y,p,null,1,a),we(()=>{b.da&&On(b.da);let g=y.props&&y.props.onVnodeUnmounted;g&&st(g,b.parent,y),b.isDeactivated=!0},a),!0};function d(y){js(y),u(y,n,a,!0)}function v(y){r.forEach((E,b)=>{let g=ii(pn(E)?E.type.__asyncResolved||{}:E.type);g&&!y(g)&&h(b)})}function h(y){let E=r.get(y);E&&(!i||!At(E,i))?d(E):i&&(js(i),E&&js(E)),r.delete(y),s.delete(y)}Po(()=>[e.include,e.exclude],([y,E])=>{y&&v(b=>vr(y,b)),E&&v(b=>!vr(E,b))},{flush:"post",deep:!0});let N=null,C=()=>{if(N!=null)if(ei(n.subTree.type)){let y=()=>{let E=Ws(n.subTree);E.component&&r.set(N,E)};n.subTree.suspense.pendingBranch?we(y,n.subTree.suspense):y()}else r.set(N,Ws(n.subTree))};return Ir(C),di(C),hl(()=>{r.forEach(y=>{let{subTree:E,suspense:b}=n,g=Ws(E);if(y.type===g.type&&y.key===g.key){js(g);let O=g.component.da;O&&we(O,b);return}d(y)})}),()=>{if(N=null,!t.default)return i=null;let y=t.default(),E=y[0];if(y.length>1)return i=null,y;if(!mn(E)||!(E.shapeFlag&4)&&!(E.shapeFlag&128))return i=null,E;let b=Ws(E);if(b.type===xe)return i=null,b;let g=b.type,O=ii(pn(b)?b.type.__asyncResolved||{}:g),{include:D,exclude:S,max:T}=e;if(D&&(!O||!vr(D,O))||S&&O&&vr(S,O))return b.shapeFlag&=-257,i=b,E;let V=b.key==null?g:b.key,M=r.get(V);return b.el&&(b=Jt(b),E.shapeFlag&128&&(E.ssContent=b)),N=V,M?(b.el=M.el,b.component=M.component,b.transition&&Dt(b,b.transition),b.shapeFlag|=512,s.delete(V),s.add(V)):(s.add(V),T&&s.size>parseInt(T,10)&&h(s.values().next().value)),b.shapeFlag|=256,i=b,ei(E.type)?E:b}}},Mg=Pg;function vr(e,t){return H(e)?e.some(n=>vr(n,t)):z(e)?e.split(",").includes(t):Ef(e)?(e.lastIndex=0,e.test(t)):!1}function Lg(e,t){Iu(e,"a",t)}function $g(e,t){Iu(e,"da",t)}function Iu(e,t,n=He){let o=e.__wdc||(e.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return e()});if(Sr(t,o,n),n){let r=n.parent;for(;r&&r.parent;)Dr(r.parent.vnode)&&Fg(o,t,n,r),r=r.parent}}function Fg(e,t,n,o){let r=Sr(t,e,o,!0),s=Sr("um",()=>rr(o[t],r),n);s.flags=16}function js(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function Ws(e){return e.shapeFlag&128?e.ssContent:e}function Sr(e,t,n=He,o=!1){if(n){let r=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...i)=>{wt();let a=Ei(n),l=_t(t,n,e,i);return a(),Ot(),l});return o?r.unshift(s):r.push(s),s}}var gn=e=>(t,n=He)=>{(!oo||e==="sp")&&Sr(e,(...o)=>t(...o),n)},Ug=gn("bm"),Ir=gn("m"),dl=gn("bu"),di=gn("u"),hl=gn("bum"),ml=gn("um"),Bg=gn("sp"),Hg=gn("rtg"),jg=gn("rtc");function Wg(e,t=He){Sr("ec",e,t)}var gl="components",Kg="directives";function Xg(e,t){return El(gl,e,!0,t)||e}var ku=Symbol.for("v-ndc");function zg(e){return z(e)?El(gl,e,!1)||e:e||ku}function Gg(e){return El(Kg,e)}function El(e,t,n=!0,o=!1){let r=je||He;if(r){let s=r.type;if(e===gl){let a=ii(s,!1);if(a&&(a===t||a===ce(t)||a===Tt(ce(t))))return s}let i=pu(r[e]||s[e],t)||pu(r.appContext[e],t);return!i&&o?s:i}}function pu(e,t){return e&&(e[t]||e[ce(t)]||e[Tt(ce(t))])}function qg(e,t,n,o){let r,s=n&&n[o],i=H(e);if(i||z(e)){let a=i&&mt(e),l=!1,f=!1;a&&(l=!$e(e),f=tt(e),e=hr(e)),r=new Array(e.length);for(let u=0,c=e.length;u<c;u++)r[u]=t(l?f?cn(gt(e[u])):gt(e[u]):e[u],u,void 0,s&&s[u])}else if(typeof e=="number")if(!Number.isInteger(e)||e<0)r=[];else{r=new Array(e);for(let a=0;a<e;a++)r[a]=t(a+1,a,void 0,s&&s[a])}else if(ie(e))if(e[Symbol.iterator])r=Array.from(e,(a,l)=>t(a,l,void 0,s&&s[l]));else{let a=Object.keys(e);r=new Array(a.length);for(let l=0,f=a.length;l<f;l++){let u=a[l];r[l]=t(e[u],u,l,s&&s[l])}}else r=[];return n&&(n[o]=r),r}function Jg(e,t){for(let n=0;n<t.length;n++){let o=t[n];if(H(o))for(let r=0;r<o.length;r++)e[o[r].name]=o[r].fn;else o&&(e[o.name]=o.key?(...r)=>{let s=o.fn(...r);return s&&(s.key=o.key),s}:o.fn)}return e}function Yg(e,t,n,o,r,s){if(n==null&&(n={}),je.ce||je.parent&&pn(je.parent)&&je.parent.ce){let f=s!=null&&n.key==null?q({},n,{key:s}):n,u=Object.keys(f).length>0;return t!=="default"&&(f.name=t),Tr(),ni(Ve,null,[ye("slot",f,o&&o())],u?-2:64)}let i=e[t];i&&i._c&&(i._d=!1);let a=hn.length;Tr();let l;try{let f=i&&vl(i(n)),u=n.key||s||f&&f.key;l=ni(Ve,{key:(u&&!Ae(u)?u:`_${t}`)+(!f&&o?"_fb":"")},f||(o?o():[]),f&&e._===1?64:-2)}catch(f){for(let u=hn.length;u>a;u--)gi();throw f}finally{i&&i._c&&(i._d=!0)}return!r&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),l}function vl(e){return e.some(t=>mn(t)?!(t.type===xe||t.type===Ve&&!vl(t.children)):!0)?e:null}function Qg(e,t){let n={};for(let o in e)n[t&&/[A-Z]/.test(o)?`on:${o}`:sn(o)]=e[o];return n}var tl=e=>e?np(e)?kr(e):tl(e.parent):null;var _r=q(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>tl(e.parent),$root:e=>tl(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>e.type,$forceUpdate:e=>e.f||(e.f=()=>{ai(e.update)}),$nextTick:e=>e.n||(e.n=Cr.bind(e.proxy)),$watch:e=>De});var Ya=(e,t)=>e!==ee&&!e.__isScriptSetup&&le(e,t),nl={get({_:e},t){if(t==="__v_skip")return!0;let{ctx:n,setupState:o,data:r,props:s,accessCache:i,type:a,appContext:l}=e;if(t[0]!=="$"){let p=i[t];if(p!==void 0)switch(p){case 1:return o[t];case 2:return r[t];case 4:return n[t];case 3:return s[t]}else{if(Ya(o,t))return i[t]=1,o[t];if(le(s,t))return i[t]=3,s[t];if(n!==ee&&le(n,t))return i[t]=4,n[t];i[t]=0}}let f=_r[t],u,c;if(f)return t==="$attrs"&&Be(e.attrs,"get",""),f(e);if((u=a.__cssModules)&&(u=u[t]))return u;if(n!==ee&&le(n,t))return i[t]=4,n[t];if(c=l.config.globalProperties,le(c,t))return c[t]},set({_:e},t,n){let{data:o,setupState:r,ctx:s}=e;return Ya(r,t)?(r[t]=n,!0):le(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(s[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:o,appContext:r,props:s,type:i}},a){let l;return!!(n[a]||Ya(t,a)||le(s,a)||le(o,a)||le(_r,a)||le(r.config.globalProperties,a)||(l=i.__cssModules)&&l[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:le(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},Zg=q({},nl,{get(e,t){if(t!==Symbol.unscopables)return nl.get(e,t,e)},has(e,t){return t[0]!=="_"&&!yf(t)}});function eE(){return null}function tE(){return null}function nE(e){}function oE(e){}function rE(){return null}function sE(){}function iE(e,t){return null}function aE(){return Vu("useSlots").slots}function lE(){return Vu("useAttrs").attrs}function Vu(e){let t=qe();return t.setupContext||(t.setupContext=ap(t))}function ol(e){return H(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}function cE(e,t){let n=ol(e);for(let o in t){if(o.startsWith("__skip"))continue;let r=n[o];r?H(r)||Z(r)?r=n[o]={type:r,default:t[o]}:r.default=t[o]:r===null&&(r=n[o]={default:t[o]}),r&&t[`__skip_${o}`]&&(r.skipFactory=!0)}return n}function fE(e,t){return!e||!t?e||t:H(e)&&H(t)?e.concat(t):q({},ol(e),ol(t))}function uE(e,t){let n={};for(let o in e)t.includes(o)||Object.defineProperty(n,o,{enumerable:!0,get:()=>e[o]});return n}function pE(e){let t=qe(),n=oo,o=e();Or(),n&&kn(!1);let r=()=>{Ei(t),n&&kn(!0)},s=()=>{qe()!==t&&t.scope.off(),Or(),n&&kn(!1)};return bs(o)&&(o=o.catch(i=>{throw r(),Promise.resolve().then(()=>Promise.resolve().then(s)),i})),[o,()=>{r(),Promise.resolve().then(s)}]}function Ru(){return{app:null,config:{isNativeTag:wn,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var dE=0;function hE(e,t){return function(o,r=null){Z(o)||(o=q({},o)),r!=null&&!ie(r)&&(r=null);let s=Ru(),i=new WeakSet,a=[],l=!1,f=s.app={_uid:dE++,_component:o,_props:r,_container:null,_context:s,_instance:null,version:up,get config(){return s.config},set config(u){},use(u,...c){return i.has(u)||(u&&Z(u.install)?(i.add(u),u.install(f,...c)):Z(u)&&(i.add(u),u(f,...c))),f},mixin(u){return f},component(u,c){return c?(s.components[u]=c,f):s.components[u]},directive(u,c){return c?(s.directives[u]=c,f):s.directives[u]},mount(u,c,p){if(!l){let d=f._ceVNode||ye(o,r);return d.appContext=s,p===!0?p="svg":p===!1&&(p=void 0),c&&t?t(d,u):e(d,u,p),l=!0,f._container=u,u.__vue_app__=f,kr(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(_t(a,f._instance,16),e(null,f._container),delete f._container.__vue_app__)},provide(u,c){return s.provides[u]=c,f},runWithContext(u){let c=eo;eo=f;try{return u()}finally{eo=c}}};return f}}var eo=null;function mE(e,t,n=ee){let o=qe(),r=ce(t),s=ze(t),i=Pu(e,r),a=$s((l,f)=>{let u,c=ee,p;return wu(()=>{let d=e[r];Ie(u,d)&&(u=d,f())}),{get(){return l(),n.get?n.get(u):u},set(d){let v=n.set?n.set(d):d;if(!Ie(v,u)&&!(c!==ee&&Ie(d,c)))return;let h=o.vnode.props,N=!!(h&&(t in h||r in h||s in h)&&(`onUpdate:${t}`in h||`onUpdate:${r}`in h||`onUpdate:${s}`in h));N||(u=d,f()),o.emit(`update:${t}`,v),Ie(d,c)&&(Ie(d,v)&&!Ie(v,p)||N&&c!==ee&&!Ie(v,u))&&f(),c=d,p=v}}});return a[Symbol.iterator]=()=>{let l=0;return{next(){return l<2?{value:l++?i||ee:a,done:!1}:{done:!0}}}},a}var Pu=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${ce(t)}Modifiers`]||e[`${ze(t)}Modifiers`];function gE(e,t,...n){if(e.isUnmounted)return;let o=e.vnode.props||ee,r=n,s=t.startsWith("update:"),i=s&&Pu(o,t.slice(7));i&&(i.trim&&(r=n.map(u=>z(u)?u.trim():u)),i.number&&(r=r.map(Wn)));let a,l=o[a=sn(t)]||o[a=sn(ce(t))];!l&&s&&(l=o[a=sn(ze(t))]),l&&_t(l,e,6,r);let f=o[a+"Once"];if(f){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,_t(f,e,6,r)}}function EE(e,t,n=!1){let o=t.emitsCache,r=o.get(e);if(r!==void 0)return r;let s=e.emits,i={};return!s&&!!1?(ie(e)&&o.set(e,null),null):(H(s)?s.forEach(l=>i[l]=null):q(i,s),ie(e)&&o.set(e,i),i)}function hi(e,t){return!e||!jt(t)?!1:(t=t.slice(2),t=t==="Once"?t:t.replace(/Once$/,""),le(e,t[0].toLowerCase()+t.slice(1))||le(e,ze(t))||le(e,t))}function Xs(e){let{type:t,vnode:n,proxy:o,withProxy:r,propsOptions:[s],slots:i,attrs:a,emit:l,render:f,renderCache:u,props:c,data:p,setupState:d,ctx:v,inheritAttrs:h}=e,N=br(e),C,y;try{if(n.shapeFlag&4){let g=r||o,O=g;C=it(f.call(O,g,u,c,d,p,v)),y=a}else{let g=t;C=it(g.length>1?g(c,{attrs:a,slots:i,emit:l}):g(c,null)),y=t.props?a:vE(a)}}catch(g){hn.length=0,so(g,e,1),C=ye(xe)}let E=C,b;if(y&&h!==!1){let g=Object.keys(y),{shapeFlag:O}=E;g.length&&O&7&&(s&&g.some(No)&&(y=_E(y,s)),E=Jt(E,y,!1,!0))}if(n.dirs&&(E=Jt(E,null,!1,!0),E.dirs=E.dirs?E.dirs.concat(n.dirs):n.dirs),n.transition){let g=fi(E.type)&&Js(E)||E;Dt(g,n.transition)}return C=E,br(N),C}function _l(e,t=!0){let n;for(let o=0;o<e.length;o++){let r=e[o];if(mn(r)){if(r.type!==xe||r.children==="v-if"){if(n)return;n=r}}else return}return n}var vE=e=>{let t;for(let n in e)(n==="class"||n==="style"||jt(n))&&((t||(t={}))[n]=e[n]);return t},_E=(e,t)=>{let n={};for(let o in e)(!No(o)||!(o.slice(9)in t))&&(n[o]=e[o]);return n};function yE(e,t,n){let{props:o,children:r,component:s}=e,{props:i,children:a,patchFlag:l}=t,f=s.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return o?du(o,i,f):!!i;if(l&8){let u=t.dynamicProps;for(let c=0;c<u.length;c++){let p=u[c];if(Mu(i,o,p)&&!hi(f,p))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:o===i?!1:o?i?du(o,i,f):!0:!!i;return!1}function du(e,t,n){let o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let r=0;r<o.length;r++){let s=o[r];if(!le(e,s)||Mu(t,e,s)&&!hi(n,s))return!0}return!1}function Mu(e,t,n){let o=e[n],r=t[n];return n==="style"&&ie(o)&&ie(r)?!rt(o,r):o!==r}function mi({vnode:e,parent:t,suspense:n},o){for(;t;){let r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.suspense.vnode.el=r.el=o,e=r),r===e)(e=t.vnode).el=o,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=o)}var Lu={},$u=()=>Object.create(Lu),Fu=e=>Object.getPrototypeOf(e)===Lu;function bE(e,t,n,o=!1){let r={},s=$u();e.propsDefaults=Object.create(null),Uu(e,t,r,s);for(let i in e.propsOptions[0])i in r||(r[i]=void 0);n?e.props=o?r:Rs(r):e.type.props?e.props=r:e.props=s,e.attrs=s}function NE(e,t,n,o){let{props:r,attrs:s,vnode:{patchFlag:i}}=e,a=Q(r),[l]=e.propsOptions,f=!1;if((o||i>0)&&!(i&16)){if(i&8){let u=e.vnode.dynamicProps;for(let c=0;c<u.length;c++){let p=u[c];if(hi(e.emitsOptions,p))continue;let d=t[p];if(l)if(le(s,p))d!==s[p]&&(s[p]=d,f=!0);else{let v=ce(p);r[v]=rl(l,a,v,d,e,!1)}else d!==s[p]&&(s[p]=d,f=!0)}}}else{Uu(e,t,r,s)&&(f=!0);let u;for(let c in a)(!t||!le(t,c)&&((u=ze(c))===c||!le(t,u)))&&(l?n&&(n[c]!==void 0||n[u]!==void 0)&&(r[c]=rl(l,a,c,void 0,e,!0)):delete r[c]);if(s!==a)for(let c in s)(!t||!le(t,c))&&(delete s[c],f=!0)}f&&Kt(e.attrs,"set","")}function Uu(e,t,n,o){let[r,s]=e.propsOptions,i=!1,a;if(t)for(let l in t){if($t(l))continue;let f=t[l],u;r&&le(r,u=ce(l))?!s||!s.includes(u)?n[u]=f:(a||(a={}))[u]=f:hi(e.emitsOptions,l)||(!(l in o)||f!==o[l])&&(o[l]=f,i=!0)}if(s){let l=Q(n),f=a||ee;for(let u=0;u<s.length;u++){let c=s[u];n[c]=rl(r,l,c,f[c],e,!le(f,c))}}return i}function rl(e,t,n,o,r,s){let i=e[n];if(i!=null){let a=le(i,"default");if(a&&o===void 0){let l=i.default;if(i.type!==Function&&!i.skipFactory&&Z(l)){let{propsDefaults:f}=r;if(n in f)o=f[n];else{let u=Ei(r);o=f[n]=l.call(null,t),u()}}else o=l;r.ce&&r.ce._setProp(n,o)}i[0]&&(s&&!a?o=!1:i[1]&&(o===""||o===ze(n))&&(o=!0))}return o}function SE(e,t,n=!1){let o=t.propsCache,r=o.get(e);if(r)return r;let s=e.props,i={},a=[];if(!s&&!!1)return ie(e)&&o.set(e,Tn),Tn;if(H(s))for(let u=0;u<s.length;u++){let c=ce(s[u]);hu(c)&&(i[c]=ee)}else if(s)for(let u in s){let c=ce(u);if(hu(c)){let p=s[u],d=i[c]=H(p)||Z(p)?{type:p}:q({},p),v=d.type,h=!1,N=!0;if(H(v))for(let C=0;C<v.length;++C){let y=v[C],E=Z(y)&&y.name;if(E==="Boolean"){h=!0;break}else E==="String"&&(N=!1)}else h=Z(v)&&v.name==="Boolean";d[0]=h,d[1]=N,(h||le(d,"default"))&&a.push(c)}}let f=[i,a];return ie(e)&&o.set(e,f),f}function hu(e){return e[0]!=="$"&&!$t(e)}var yl=e=>e==="_"||e==="_ctx"||e==="$stable",bl=e=>H(e)?e.map(it):[it(e)],xE=(e,t,n)=>{if(t._n)return t;let o=fl((...r)=>bl(t(...r)),n);return o._c=!1,o},Bu=(e,t,n)=>{let o=e._ctx;for(let r in e){if(yl(r))continue;let s=e[r];if(Z(s))t[r]=xE(r,s,o);else if(s!=null){let i=bl(s);t[r]=()=>i}}},Hu=(e,t)=>{let n=bl(t);e.slots.default=()=>n},ju=(e,t,n)=>{for(let o in t)(n||!yl(o))&&(e[o]=t[o])},TE=(e,t,n)=>{let o=e.slots=$u();if(e.vnode.shapeFlag&32){let r=t._;r?(ju(o,t,n),n&&Ss(o,"_",r,!0)):Bu(t,o)}else t&&Hu(e,t)},wE=(e,t,n)=>{let{vnode:o,slots:r}=e,s=!0,i=ee;if(o.shapeFlag&32){let a=t._;a?n&&a===1?s=!1:ju(r,t,n):(s=!t.$stable,Bu(t,r)),i=t}else t&&(Hu(e,t),i={default:1});if(s)for(let a in r)!yl(a)&&i[a]==null&&delete r[a]};function OE(){let e=[]}var we=ti;function Nl(e){return Wu(e)}function Sl(e){return Wu(e,_g)}function Wu(e,t){OE();let n=ir();n.__VUE__=!0;let{insert:o,remove:r,patchProp:s,createElement:i,createText:a,createComment:l,setText:f,setElementText:u,parentNode:c,nextSibling:p,setScopeId:d=De,insertStaticContent:v}=e,h=(m,_,x,R=null,A=null,k=null,U=void 0,F=null,L=!!_.dynamicChildren)=>{if(m===_)return;m&&!At(m,_)&&(R=rs(m),et(m,A,k,!0),m=null),_.patchFlag===-2&&(L=!1,_.dynamicChildren=null),_.dynamicChildren&&m&&m.dynamicChildren&&m.dynamicChildren.hasOnce&&(_.dynamicChildren===Tn&&(_.dynamicChildren=[]),_.dynamicChildren.hasOnce=!0);let{type:I,ref:X,shapeFlag:B}=_;switch(I){case In:N(m,_,x,R);break;case xe:C(m,_,x,R);break;case dn:m==null&&y(_,x,R,U);break;case Ve:$(m,_,x,R,A,k,U,F,L);break;default:B&1?O(m,_,x,R,A,k,U,F,L):B&6?P(m,_,x,R,A,k,U,F,L):(B&64||B&128)&&I.process(m,_,x,R,A,k,U,F,L,go)}X!=null&&A?ko(X,m&&m.ref,k,_||m,!_):X==null&&m&&m.ref!=null&&ko(m.ref,null,k,m,!0)},N=(m,_,x,R)=>{if(m==null)o(_.el=a(_.children),x,R);else{let A=_.el=m.el;_.children!==m.children&&f(A,_.children)}},C=(m,_,x,R)=>{m==null?o(_.el=l(_.children||""),x,R):_.el=m.el},y=(m,_,x,R)=>{[m.el,m.anchor]=v(m.children,_,x,R,m.el,m.anchor)},E=(m,_,x,R)=>{if(_.children!==m.children){let A=p(m.anchor);g(m),[_.el,_.anchor]=v(_.children,x,A,R)}else _.el=m.el,_.anchor=m.anchor},b=({el:m,anchor:_},x,R)=>{let A;for(;m&&m!==_;)A=p(m),o(m,x,R),m=A;o(_,x,R)},g=({el:m,anchor:_})=>{let x;for(;m&&m!==_;)x=p(m),r(m),m=x;r(_)},O=(m,_,x,R,A,k,U,F,L)=>{if(_.type==="svg"?U="svg":_.type==="math"&&(U="mathml"),m==null)D(_,x,R,A,k,U,F,L);else{let I=m.el&&m.el._isVueCE?m.el:null;try{I&&I._beginPatch(),V(m,_,A,k,U,F,L)}finally{I&&I._endPatch()}}},D=(m,_,x,R,A,k,U,F)=>{let L,I,{props:X,shapeFlag:B,transition:K,dirs:G}=m;if(L=m.el=i(m.type,k,X&&X.is,X),B&8?u(L,m.children):B&16&&T(m.children,L,null,R,A,Qa(m,k),U,F),G&&zt(m,null,R,"created"),S(L,m,m.scopeId,U,R),X){for(let me in X)me!=="value"&&!$t(me)&&s(L,me,null,X[me],k,R);"value"in X&&s(L,"value",null,X.value,k),(I=X.onVnodeBeforeMount)&&st(I,R,m)}G&&zt(m,null,R,"beforeMount");let fe=Ku(A,K);fe?K.beforeEnter(L):K&&!K.persisted&&(L[il]=!0),o(L,_,x),((I=X&&X.onVnodeMounted)||fe||G)&&we(()=>{let de;I&&st(I,R,m),fe&&K.enter(L),G&&zt(m,null,R,"mounted")},A)},S=(m,_,x,R,A)=>{if(x&&d(m,x),R)for(let k=0;k<R.length;k++)d(m,R[k]);if(A){let k=A.subTree;if(_===k||ei(k.type)&&(k.ssContent===_||k.ssFallback===_)){let U=A.vnode;S(m,U,U.scopeId,U.slotScopeIds,A.parent)}}},T=(m,_,x,R,A,k,U,F,L=0)=>{for(let I=L;I<m.length;I++){let X=m[I]=F?un(m[I]):it(m[I]);h(null,X,_,x,R,A,k,U,F)}},V=(m,_,x,R,A,k,U)=>{let F=_.el=m.el,{patchFlag:L,dynamicChildren:I,dirs:X}=_;L|=m.patchFlag&16;let B=m.props||ee,K=_.props||ee,G;if(x&&Yn(x,!1),(G=K.onVnodeBeforeUpdate)&&st(G,x,_,m),X&&zt(_,m,x,"beforeUpdate"),x&&Yn(x,!0),I&&(!m.dynamicChildren||m.dynamicChildren.length!==I.length)&&(L=0,U=!1,I=null),(B.innerHTML&&K.innerHTML==null||B.textContent&&K.textContent==null)&&u(F,""),I?M(m.dynamicChildren,I,F,x,R,Qa(_,A),k):U||he(m,_,F,null,x,R,Qa(_,A),k,!1),L>0){if(L&16)w(F,B,K,x,A);else if(L&2&&B.class!==K.class&&s(F,"class",null,K.class,A),L&4&&s(F,"style",B.style,K.style,A),L&8){let fe=_.dynamicProps;for(let me=0;me<fe.length;me++){let de=fe[me],Ce=B[de],Le=K[de];(Le!==Ce||de==="value")&&s(F,de,Ce,Le,A,x)}}L&1&&m.children!==_.children&&u(F,_.children)}else!U&&I==null&&w(F,B,K,x,A);((G=K.onVnodeUpdated)||X)&&we(()=>{G&&st(G,x,_,m),X&&zt(_,m,x,"updated")},R)},M=(m,_,x,R,A,k,U)=>{for(let F=0;F<_.length;F++){let L=m[F],I=_[F],X=L.el||Vo(L),B=X&&(L.type===Ve||!At(L,I)||L.shapeFlag&198)?c(X):x;h(L,I,B,null,R,A,k,U,!0)}},w=(m,_,x,R,A)=>{if(_!==x){if(_!==ee)for(let k in _)!$t(k)&&!(k in x)&&s(m,k,_[k],null,A,R);for(let k in x){if($t(k))continue;let U=x[k],F=_[k];U!==F&&k!=="value"&&s(m,k,F,U,A,R)}"value"in x&&s(m,"value",_.value,x.value,A)}},$=(m,_,x,R,A,k,U,F,L)=>{let I=_.el=m?m.el:a(""),X=_.anchor=m?m.anchor:a(""),{patchFlag:B,dynamicChildren:K,slotScopeIds:G}=_;G&&(F=F?F.concat(G):G),m==null?(o(I,x,R),o(X,x,R),T(_.children||[],x,X,A,k,U,F,L)):B>0&&B&64&&K&&m.dynamicChildren&&m.dynamicChildren.length===K.length?(M(m.dynamicChildren,K,x,A,k,U,F),(_.key!=null||A&&_===A.subTree)&&xl(m,_,!0)):he(m,_,x,X,A,k,U,F,L)},P=(m,_,x,R,A,k,U,F,L)=>{_.slotScopeIds=F,m==null?_.shapeFlag&512?A.ctx.activate(_,x,R,U,L):W(_,x,R,A,k,U,L):j(m,_,L)},W=(m,_,x,R,A,k,U)=>{let F=m.component=tp(m,R,A);if(Dr(m)&&(F.ctx.renderer=go),op(F,!1,U),F.asyncDep){if(A&&A.registerDep(F,ae,U,k),!m.el){let L=F.subTree=ye(xe);C(null,L,_,x),m.placeholder=L.el}}else ae(F,m,_,x,A,k,U)},j=(m,_,x)=>{let R=_.component=m.component;if(yE(m,_,x))if(R.asyncDep&&!R.asyncResolved){_.el=m.el,_.placeholder=m.placeholder,pe(R,_,x);return}else R.next=_,R.update();else _.el=m.el,_.placeholder=m.placeholder,R.vnode=_},ae=(m,_,x,R,A,k,U)=>{let F=()=>{if(m.isMounted){let{next:B,bu:K,u:G,parent:fe,vnode:me}=m;{let ut=Xu(m);if(ut){B&&(B.el=me.el,pe(m,B,U)),ut.asyncDep.then(()=>{let Zt=()=>{m.job.flags&8||(A&&A.pendingBranch?we(Zt,A):I())};Zt.flags=48,we(Zt,A)});return}}let de=B,Ce;Yn(m,!1),B?(B.el=me.el,pe(m,B,U)):B=me,K&&On(K),(Ce=B.props&&B.props.onVnodeBeforeUpdate)&&st(Ce,fe,B,me),Yn(m,!0);let Le=Xs(m),St=m.subTree;m.subTree=Le,h(St,Le,c(St.el||Vo(St)),rs(St),m,A,k),B.el=Le.el,de===null&&mi(m,Le.el),G&&we(G,A),(Ce=B.props&&B.props.onVnodeUpdated)&&we(()=>st(Ce,fe,B,me),A)}else{let B,{el:K,props:G}=_,{bm:fe,m:me,parent:de,root:Ce,type:Le}=m,St=pn(_);if(Yn(m,!1),fe&&On(fe),!St&&(B=G&&G.onVnodeBeforeMount)&&st(B,de,_),Yn(m,!0),K&&ta){let ut=()=>{m.subTree=Xs(m),ta(K,m.subTree,m,A,null)};St&&Le.__asyncHydrate?Le.__asyncHydrate(K,m,ut):ut()}else{Ce.ce&&Ce.ce._hasShadowRoot()&&Ce.ce._injectChildStyle(Le,m.parent?m.parent.type:void 0);let ut=m.subTree=Xs(m);h(null,ut,x,R,m,A,k),_.el=ut.el}if(me&&we(me,A),!St&&(B=G&&G.onVnodeMounted)){let ut=_;we(()=>st(B,de,ut),A)}(_.shapeFlag&256||de&&pn(de.vnode)&&de.vnode.shapeFlag&256)&&m.a&&we(m.a,A),m.isMounted=!0,_=x=R=null}};m.scope.on();let L=m.effect=new ln(F);m.scope.off();let I=m.update=L.run.bind(L),X=m.job=L.runIfDirty.bind(L);X.i=m,X.id=m.uid,L.scheduler=()=>ai(X),Yn(m,!0),I()},pe=(m,_,x)=>{_.component=m;let R=m.vnode.props;m.vnode=_,m.next=null,NE(m,_.props,R,x),wE(m,_.children,x),wt(),yu(m),Ot()},he=(m,_,x,R,A,k,U,F,L=!1)=>{let I=m&&m.children,X=m?m.shapeFlag:0,B=_.children,{patchFlag:K,shapeFlag:G}=_;if(K>0){if(K&128){Me(I,B,x,R,A,k,U,F,L);return}else if(K&256){se(I,B,x,R,A,k,U,F,L);return}}G&8?(X&16&&qo(I,A,k),B!==I&&u(x,B)):X&16?G&16?Me(I,B,x,R,A,k,U,F,L):qo(I,A,k,!0):(X&8&&u(x,""),G&16&&T(B,x,R,A,k,U,F,L))},se=(m,_,x,R,A,k,U,F,L)=>{m=m||Tn,_=_||Tn;let I=m.length,X=_.length,B=Math.min(I,X),K;for(K=0;K<B;K++){let G=_[K]=L?un(_[K]):it(_[K]);h(m[K],G,x,null,A,k,U,F,L)}I>X?qo(m,A,k,!0,!1,B):T(_,x,R,A,k,U,F,L,B)},Me=(m,_,x,R,A,k,U,F,L)=>{let I=0,X=_.length,B=m.length-1,K=X-1;for(;I<=B&&I<=K;){let G=m[I],fe=_[I]=L?un(_[I]):it(_[I]);if(At(G,fe))h(G,fe,x,null,A,k,U,F,L);else break;I++}for(;I<=B&&I<=K;){let G=m[B],fe=_[K]=L?un(_[K]):it(_[K]);if(At(G,fe))h(G,fe,x,null,A,k,U,F,L);else break;B--,K--}if(I>B){if(I<=K){let G=K+1,fe=G<X?_[G].el:R;for(;I<=K;)h(null,_[I]=L?un(_[I]):it(_[I]),x,fe,A,k,U,F,L),I++}}else if(I>K)for(;I<=B;)et(m[I],A,k,!0),I++;else{let G=I,fe=I,me=new Map;for(I=fe;I<=K;I++){let pt=_[I]=L?un(_[I]):it(_[I]);pt.key!=null&&me.set(pt.key,I)}let de,Ce=0,Le=K-fe+1,St=!1,ut=0,Zt=new Array(Le);for(I=0;I<Le;I++)Zt[I]=0;for(I=G;I<=B;I++){let pt=m[I];if(Ce>=Le){et(pt,A,k,!0);continue}let Bt;if(pt.key!=null)Bt=me.get(pt.key);else for(de=fe;de<=K;de++)if(Zt[de-fe]===0&&At(pt,_[de])){Bt=de;break}Bt===void 0?et(pt,A,k,!0):(Zt[Bt-fe]=I+1,Bt>=ut?ut=Bt:St=!0,h(pt,_[Bt],x,null,A,k,U,F,L),Ce++)}let Hc=St?CE(Zt):Tn;for(de=Hc.length-1,I=Le-1;I>=0;I--){let pt=fe+I,Bt=_[pt],jc=_[pt+1],Wc=pt+1<X?jc.el||Vo(jc):R;Zt[I]===0?h(null,Bt,x,Wc,A,k,U,F,L):St&&(de<0||I!==Hc[de]?Ee(Bt,x,Wc,2):de--)}}},Ee=(m,_,x,R,A=null)=>{let{el:k,type:U,transition:F,children:L,shapeFlag:I}=m;if(I&6){Ee(m.component.subTree,_,x,R);return}if(I&128){m.suspense.move(_,x,R);return}if(I&64){U.move(m,_,x,go);return}if(U===Ve){o(k,_,x);for(let B=0;B<L.length;B++)Ee(L[B],_,x,R);o(m.anchor,_,x);return}if(U===dn){b(m,_,x);return}if(R!==2&&I&1&&F)if(R===0)F.persisted&&!k[vt]?o(k,_,x):(F.beforeEnter(k),o(k,_,x),we(()=>F.enter(k),A));else{let{leave:B,delayLeave:K,afterLeave:G}=F,fe=()=>{m.ctx.isUnmounted?r(k):o(k,_,x)},me=()=>{let de=k._isLeaving||!!k[vt];k._isLeaving&&k[vt](!0),F.persisted&&!de?fe():B(k,()=>{fe(),G&&G()})};K?K(k,fe,me):me()}else o(k,_,x)},et=(m,_,x,R=!1,A=!1)=>{let{type:k,props:U,ref:F,children:L,dynamicChildren:I,shapeFlag:X,patchFlag:B,dirs:K,cacheIndex:G,memo:fe}=m;if((B===-2||I&&I.hasOnce)&&(A=!1),F!=null&&(wt(),ko(F,null,x,m,!0),Ot()),G!=null&&(!m.ctx||m.ctx===_)&&(_.renderCache[G]=void 0),X&256&&_.ctx.deactivate(m))return;let me=X&1&&K,de=!pn(m),Ce;if(de&&(Ce=U&&U.onVnodeBeforeUnmount)&&st(Ce,_,m),X&6)zh(m.component,x,R);else{if(X&128){m.suspense.unmount(x,R);return}me&&zt(m,null,_,"beforeUnmount"),X&64?m.type.remove(m,_,x,go,R):I&&!I.hasOnce&&(k!==Ve||B>0&&B&64)?qo(I,_,x,!1,!0):(k===Ve&&B&384||!A&&X&16)&&qo(L,_,x),R&&Zi(m)}let Le=fe!=null&&G==null;(de&&(Ce=U&&U.onVnodeUnmounted)||me||Le)&&we(()=>{Ce&&st(Ce,_,m),me&&zt(m,null,_,"unmounted"),Le&&(m.el=null)},x)},Zi=m=>{let{type:_,el:x,anchor:R,transition:A}=m,k=_===Ve;if(k&&!A){Uc(x,R);return}if(_===dn){g(m),A&&!A.persisted&&A.afterLeave&&A.afterLeave();return}let U=k?Nr(m):m,F=()=>{k?c(x)&&Uc(x,R):r(x),A&&!A.persisted&&A.afterLeave&&A.afterLeave()};if(U&&U.shapeFlag&1&&A&&!A.persisted){let{leave:L,delayLeave:I}=A,X=U.el,B=()=>L(X,F);I?I(X,F,B):B()}else F()},Uc=(m,_)=>{let x;for(;m!==_;)x=p(m),r(m),m=x;r(_)},zh=(m,_,x)=>{let{bum:R,scope:A,job:k,subTree:U,um:F,m:L,a:I}=m;Zs(L),Zs(I),R&&On(R),A.stop(),k?(k.flags|=8,et(U,m,_,x)):U&&(U.transition=m.vnode.transition,et(U,m,_,x)),F&&we(F,_);let X=()=>{m.isUnmounted=!0};X.flags=16,we(X,_)},qo=(m,_,x,R=!1,A=!1,k=0)=>{for(let U=k;U<m.length;U++)et(m[U],_,x,R,A)},rs=m=>{if(m.shapeFlag&6)return rs(m.component.subTree);if(m.shapeFlag&128)return m.suspense.next();let _=p(m.anchor||m.el),x=_&&_[Ou];return x?p(x):_},Bc=(m,_,x)=>{let R=m&&_._vnode?void 0:m&&m.component?m.component.uid:HE();eg(()=>{m==null?_._vnode&&et(_._vnode,null,null,!0):h(_._vnode||null,m,_,null,null,null,x),_._vnode=m},R)},go={p:h,um:et,m:Ee,r:Zi,mt:W,mc:T,pc:he,pbc:M,n:rs,o:e},ea,ta;return t&&([ea,ta]=t(go)),{render:Bc,hydrate:ea,createApp:hE(Bc,ea)}}function Qa({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Yn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Ku(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function xl(e,t,n=!1){let o=e.children,r=t.children;if(H(o)&&H(r))for(let s=0;s<o.length;s++){let i=o[s],a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=un(r[s]),a.el=i.el),!n&&a.patchFlag!==-2&&xl(i,a)),a.type===In&&(a.patchFlag===-1&&(a=r[s]=un(a)),a.el=i.el),a.type===xe&&!a.el&&(a.el=i.el)}}function CE(e){let t=e.slice(),n=[0],o,r,s,i,a,l=e.length;for(o=0;o<l;o++){let f=e[o];if(f!==0){if(r=n[n.length-1],e[r]<f){t[o]=r,n.push(o);continue}for(s=0,i=n.length-1;s<i;)a=s+i>>1,e[n[a]]<f?s=a+1:i=a;f<e[n[s]]&&(s>0&&(t[o]=n[s-1]),n[s]=o)}}for(s=n.length,i=n[s-1];s-- >0;)n[s]=i,i=t[i];return n}function Xu(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Xu(t)}function Zs(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Vo(e){if(e.placeholder)return e.placeholder;let t=e.component;if(t)return Vo(t.subTree);let n=e.suspense;return n&&n.activeBranch?Vo(n.activeBranch):null}var ei=e=>e.__isSuspense,sl=0,il=Symbol("_deferredEnter"),AE={name:"Suspense",__isSuspense:!0,process(e,t,n,o,r,s,i,a,l,f){if(e==null)IE(t,n,o,r,s,i,a,l,f);else{let u=e.suspense;if(s&&s.deps>0&&!s.isHydrating){let c=u.parentComponent;if(!!c&&c.suspense===s&&c.suspenseId!==s.pendingId?s.pendingBranch&&!At(t.ssContent,u.pendingBranch||u.activeBranch):!u.isInFallback){t.suspense=u,u.vnode=t,t.el=e.el;return}}kE(e,t,n,o,r,i,a,l,f)}},hydrate:VE,normalize:RE},DE=AE;function xr(e,t){let n=e.props&&e.props[t];Z(n)&&n()}function mu(e){let t=[];al(e,t,!0),t.length&&qt(t)}function al(e,t,n){let{el:o,transition:r,children:s,shapeFlag:i}=e;if(i&6){al(e.component.subTree,t,n);return}if(!(i&192)&&(i&1&&(!n&&o&&o[il]&&(o[il]=void 0,r&&!r.persisted&&(r.beforeEnter(o),t.push(()=>r.enter(o)))),n=!1),i&16))for(let a=0;a<s.length;a++)al(s[a],t,n)}function IE(e,t,n,o,r,s,i,a,l){let{p:f,o:{createElement:u}}=l,c=u("div"),p=e.suspense=zu(e,r,o,t,c,n,s,i,a,l);f(null,p.pendingBranch=e.ssContent,c,null,o,p,s,i),p.deps>0?(xr(e,"onPending"),xr(e,"onFallback"),f(null,e.ssFallback,t,n,o,null,s,i),Ro(p,e.ssFallback)):p.resolve(!1,!0)}function kE(e,t,n,o,r,s,i,a,{p:l,um:f,o:{createElement:u}}){let c=t.suspense=e.suspense;c.vnode=t,t.el=e.el;let p=t.ssContent,d=t.ssFallback,{activeBranch:v,pendingBranch:h,isInFallback:N,isHydrating:C}=c;if(h)c.pendingBranch=p,At(h,p)?(c.deps++,l(h,p,C?n:c.hiddenContainer,null,r,c,s,i,a),c.deps--,c.deps<=0?c.resolve():N&&!C&&!c.isFallbackMountPending&&(l(v,d,n,o,r,null,s,i,a),Ro(c,d))):(c.pendingId=sl++,C?(c.isHydrating=!1,c.activeBranch=h):f(h,r,c),c.deps=0,Gu(c),c.hiddenContainer=u("div"),N?(l(null,p,c.hiddenContainer,null,r,c,s,i,a),c.deps<=0?c.resolve():c.isFallbackMountPending||(l(v,d,n,o,r,null,s,i,a),Ro(c,d))):v&&At(v,p)?(l(v,p,n,o,r,c,s,i,a),c.resolve(!0)):(l(null,p,c.hiddenContainer,null,r,c,s,i,a),c.deps<=0&&c.resolve()));else if(v&&At(v,p))l(v,p,n,o,r,c,s,i,a),Ro(c,p);else if(xr(t,"onPending"),c.pendingBranch=p,c.pendingId=sl++,l(null,p,c.hiddenContainer,null,r,c,s,i,a),c.deps<=0)c.resolve();else{let{timeout:y}=c;y>0?c.timeoutTimer=setTimeout(()=>{c.timeoutTimer=void 0,c.fallback(c.vnode.ssFallback)},y):y===0&&c.fallback(d)}}function zu(e,t,n,o,r,s,i,a,l,f,u=!1){let{p:c,m:p,um:d,n:v,o:{parentNode:h,remove:N}}=f,C,y=PE(e);y&&t&&t.pendingBranch&&(C=t.pendingId,t.deps++);let E=e.props?xo(e.props.timeout):void 0,b=s,g={vnode:e,parent:t,parentComponent:n,namespace:i,container:o,hiddenContainer:r,deps:0,pendingId:sl++,timeout:typeof E=="number"?E:-1,timeoutTimer:void 0,activeBranch:null,isFallbackMountPending:!1,pendingBranch:null,isInFallback:!u,isHydrating:u,isUnmounted:!1,effects:[],resolve(O=!1,D=!1){let{vnode:S,activeBranch:T,pendingBranch:V,pendingId:M,effects:w,parentComponent:$,container:P,isInFallback:W}=g,j=g.parent;for(;j&&!j.pendingBranch;)j=j.parent;let ae=!1;if(g.isHydrating)g.isHydrating=!1;else if(!O){ae=T&&V.transition&&V.transition.mode==="out-in";let he=!1;ae&&(T.transition.afterLeave=()=>{if(M===g.pendingId&&!g.isUnmounted){mu(V),p(V,P,s===b&&!he?v(T):s,0);let se=!1;if(j){let Me=P,Ee;for(;Ee=h(Me);)Me=Ee;se=Me===j.hiddenContainer}se||qt(w),W&&S.ssFallback&&(S.ssFallback.el=null)}}),T&&!g.isFallbackMountPending&&(h(T.el||Vo(T))===P&&(s=v(T),he=!0),d(T,$,g,!0),!ae&&W&&S.ssFallback&&we(()=>S.ssFallback.el=null,g)),ae||(mu(V),p(V,P,s,0))}clearTimeout(g.timeoutTimer),g.timeoutTimer=void 0,g.isFallbackMountPending=!1,Ro(g,V),g.pendingBranch=null,g.isInFallback=!1;let pe=0;for(let he=0;he<w.length;he++){let se=w[he];se.flags&32?qt(se):w[pe++]=se}if(w.length=pe,j)for(let he=0;he<w.length;he++)j.effects.push(w[he]);else ae||qt(w);g.effects=[],y&&t&&t.pendingBranch&&C===t.pendingId&&(C=void 0,t.deps--,t.deps===0&&!D&&t.resolve()),xr(S,"onResolve")},fallback(O){if(g.isUnmounted||!g.pendingBranch)return;let{vnode:D,activeBranch:S,parentComponent:T,container:V,namespace:M}=g;xr(D,"onFallback");let w=v(S),$=()=>{if(g.isFallbackMountPending=!1,g.isUnmounted||!g.isInFallback)return;let W=g.vnode.ssFallback;c(null,W,V,w,T,null,M,a,l),Ro(g,W)},P=O.transition&&O.transition.mode==="out-in";P&&(g.isFallbackMountPending=!0,S.transition.afterLeave=$),g.isInFallback=!0,d(S,T,null,!0),P||$()},move(O,D,S){g.activeBranch&&p(g.activeBranch,O,D,S),g.container=O},next(){return g.activeBranch&&v(g.activeBranch)},registerDep(O,D,S,T){let V=!!g.pendingBranch;V&&g.deps++;let M=O.vnode.el,w=$=>{O.asyncResolved=!0;let{vnode:P}=O;ll(O,$,!1),M&&(P.el=M);let W=!M&&O.subTree.el;D(O,P,h(M||O.subTree.el),M?null:v(O.subTree),g,T,S),W&&(P.placeholder=null,N(W)),mi(O,P.el)};O.asyncDep.catch($=>(O.scope.active&&so($,O,0,!1,!0),()=>null)).then($=>{if(O.isUnmounted||g.isUnmounted)return;let P=V&&g.pendingId===O.suspenseId;if(Or(),!O.scope.active){P&&--g.deps===0&&g.resolve();return}if(!P&&g.pendingBranch){let W=()=>{O.isUnmounted||g.isUnmounted||!O.scope.active||(g.pendingBranch?ti(W,g):w($))};W.flags=48,ti(W,g);return}w($),P&&--g.deps===0&&g.resolve()})},unmount(O,D){if(g.isUnmounted=!0,clearTimeout(g.timeoutTimer),g.timeoutTimer=void 0,C!==void 0){let S=g.parent,T=C;C=void 0,qt(()=>{S.pendingId===T&&!S.isUnmounted&&--S.deps===0&&S.resolve()})}g.activeBranch&&d(g.activeBranch,n,O,D),g.pendingBranch&&(d(g.pendingBranch,n,g,D),Gu(g))}};return g}function VE(e,t,n,o,r,s,i,a,l){let f=t.suspense=zu(t,o,n,e.parentNode,document.createElement("div"),null,r,s,i,a,!0),u=l(e,f.pendingBranch=t.ssContent,n,f,s,i);return f.deps===0&&f.resolve(!1,!0),u}function RE(e){let{shapeFlag:t,children:n}=e,o=t&32;e.ssContent=gu(o?n.default:n),e.ssFallback=o?gu(n.fallback):ye(xe)}function gu(e){let t;if(Z(e)){let n=no&&e._c;n&&(e._d=!1,Tr()),e=e(),n&&(e._d=!0,t=Ge,gi())}return H(e)&&(e=_l(e)),e=it(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter(n=>n!==e)),e}function Gu(e){let{effects:t}=e;for(let n=0;n<t.length;n++){let o=t[n];o.flags&16&&qt(o)}t.length=0}function ti(e,t){t&&t.pendingBranch?H(e)?t.effects.push(...e):t.effects.push(e):qt(e)}function Ro(e,t){e.activeBranch=t;let{vnode:n,parentComponent:o}=e,r=t.el;for(;!r&&t.component;)t=t.component.subTree,r=t.el;n.el=r,o&&o.subTree===n&&(o.vnode.el=r,mi(o,r))}function PE(e){let t=e.props&&e.props.suspensible;return t!=null&&t!==!1}var Ve=Symbol.for("v-fgt"),In=Symbol.for("v-txt"),xe=Symbol.for("v-cmt"),dn=Symbol.for("v-stc"),hn=[],Ge=null;function Tr(e=!1){hn.push(Ge=e?null:[])}function gi(){hn.pop(),Ge=hn[hn.length-1]||null}var no=1;function wr(e,t=!1){no+=e,e<0&&Ge&&t&&(Ge.hasOnce=!0)}function qu(e){return e.dynamicChildren=no>0?Ge||Tn:null,gi(),no>0&&Ge&&Ge.push(e),e}function ME(e,t,n,o,r,s){return qu(Tl(e,t,n,o,r,s,!0))}function ni(e,t,n,o,r){return qu(ye(e,t,n,o,r,!0))}function mn(e){return e?e.__v_isVNode===!0:!1}function At(e,t){return e.type===t.type&&e.key===t.key}var LE;function $E(e){LE=e}var Ju=({key:e})=>e??null,zs=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?z(e)||Ne(e)||Z(e)?{i:je,r:e,k:t,f:!!n}:e:null);function Tl(e,t=null,n=null,o=0,r=null,s=e===Ve?0:1,i=!1,a=!1){let l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Ju(t),ref:t&&zs(t),scopeId:li,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:o,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:je};return a?(oi(l,n),s&128&&e.normalize(l)):n&&(l.shapeFlag|=z(n)?8:16),no>0&&!i&&Ge&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&Ge.push(l),l}var ye=FE;function FE(e,t=null,n=null,o=0,r=null,s=!1){if((!e||e===ku)&&(e=xe),mn(e)){let a=Jt(e,t,!0);return n&&oi(a,n),no>0&&!s&&Ge&&(a.shapeFlag&6?Ge[Ge.indexOf(e)]=a:Ge.push(a)),a.patchFlag=-2,a}if(zE(e)&&(e=e.__vccOpts),t){t=Yu(t);let{class:a,style:l}=t;a&&!z(a)&&(t.class=Xn(a)),ie(l)&&(qn(l)&&!H(l)&&(l=q({},l)),t.style=Kn(l))}let i=z(e)?1:ei(e)?128:fi(e)?64:ie(e)?4:Z(e)?2:0;return Tl(e,t,n,o,r,i,s,!0)}function Yu(e){return e?qn(e)?q({},e):Fu(e)?q({},e[ip]||e):e:null}function Jt(e,t,n=!1,o=!1){let{props:r,ref:s,patchFlag:i,children:a,transition:l}=e,f=t?Zu(r||{},t):r,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:f,key:f&&Ju(f),ref:t&&t.ref?n&&s?H(s)?s.concat(zs(t)):[s,zs(t)]:zs(t):s,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Ve?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Jt(e.ssContent),ssFallback:e.ssFallback&&Jt(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce,cacheIndex:e.cacheIndex};return l&&o&&Dt(u,l.clone(u)),u}function wl(e=" ",t=0){return ye(In,null,e,t)}function UE(e,t){let n=ye(dn,null,e);return n.staticCount=t,n}function Qu(e="",t=!1){return t?(Tr(),ni(xe,null,e)):ye(xe,null,e)}function it(e){return e==null||typeof e=="boolean"?ye(xe):H(e)?ye(Ve,null,e.slice()):mn(e)?un(e):ye(In,null,String(e))}function un(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Jt(e)}function oi(e,t){let n=0,{shapeFlag:o}=e;if(t==null)t=null;else if(H(t))n=16;else if(typeof t=="object")if(o&65){let r=t.default;r&&(r._c&&(r._d=!1),oi(e,r()),r._c&&(r._d=!0));return}else{n=32;let r=t._;!r&&!Fu(t)?t._ctx=je:r===3&&je&&(je.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else if(Z(t)){if(o&65){oi(e,{default:t});return}t={default:t,_ctx:je},n=32}else t=String(t),o&64?(n=16,t=[wl(t)]):n=8;e.children=t,e.shapeFlag|=n}function Zu(...e){let t={};for(let n=0;n<e.length;n++){let o=e[n];for(let r in o)if(r==="class")t.class!==o.class&&(t.class=Xn([t.class,o.class]));else if(r==="style")t.style=Kn([t.style,o.style]);else if(jt(r)){let s=t[r],i=o[r];i&&s!==i&&!(H(s)&&s.includes(i))?t[r]=s?[].concat(s,i):i:i==null&&s==null&&!No(r)&&(t[r]=i)}else r!==""&&(t[r]=o[r])}return t}function st(e,t,n,o=null){_t(e,t,7,[n,o])}var BE=Ru(),ep=0;function HE(){return ep}function tp(e,t,n){let o=e.type,r=(t?t.appContext:e.appContext)||BE,s={uid:ep++,vnode:e,type:o,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Gn(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:SE(o,r),emitsOptions:EE(o,r),emit:null,emitted:null,propsDefaults:ee,inheritAttrs:o.inheritAttrs,ctx:ee,data:ee,props:ee,attrs:ee,slots:ee,refs:ee,setupState:ee,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=gE.bind(null,s),e.ce&&e.ce(s),s}var He=null,qe=()=>He||je,ri,kn;{let e=ir(),t=(n,o)=>{let r;return(r=e[n])||(r=e[n]=[]),r.push(o),s=>{r.length>1?r.forEach(i=>i(s)):r[0](s)}};ri=t("__VUE_INSTANCE_SETTERS__",n=>He=n),kn=t("__VUE_SSR_SETTERS__",n=>oo=n)}var Ei=e=>{let t=He;return ri(e),e.scope.on(),()=>{e.scope.off(),ri(t)}},Or=()=>{He&&He.scope.off(),ri(null)};function np(e){return e.vnode.shapeFlag&4}var oo=!1;function op(e,t=!1,n=!1){t&&kn(t);let{props:o,children:r}=e.vnode,s=np(e);bE(e,o,s,t),TE(e,r,n||t);let i=s?jE(e,t):void 0;return t&&kn(!1),i}function jE(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,nl);let{setup:o}=n;if(o){wt();let r=e.setupContext=o.length>1?ap(e):null,s=Ei(e),i=ro(o,e,0,[e.props,r]),a=bs(i);if(Ot(),s(),(a||e.sp)&&!pn(e)&&Du(e),a){if(i.then(Or,Or),t)return i.then(l=>{kn(!0);try{ll(e,l,t)}finally{kn(!1)}}).catch(l=>{so(l,e,0,void 0,!0),e.ssrRender=(f,u)=>u("<!---->")});e.asyncDep=i}else ll(e,i,t)}else sp(e,t)}function ll(e,t,n){Z(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:ie(t)&&(e.setupState=mr(t)),sp(e,n)}var si,cl;function Ol(e){si=e,cl=t=>{t.render._rc&&(t.withProxy=new Proxy(t.ctx,Zg))}}var rp=()=>!si;function sp(e,t,n){let o=e.type;if(!e.render){if(!t&&si&&!o.render){let r=o.template||!1;if(r){let{isCustomElement:s,compilerOptions:i}=e.appContext.config,{delimiters:a,compilerOptions:l}=o,f=q(q({isCustomElement:s,delimiters:a},i),l);o.render=si(r,f)}}e.render=o.render||De,cl&&cl(e)}}var ip=Symbol(),WE={get(e,t){return Be(e,"get",""),t===ip?e:e[t]}};function ap(e){let t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,WE),slots:e.slots,emit:e.emit,expose:t}}function kr(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(mr(Ms(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in _r)return _r[n](e)},has(t,n){return n in t||n in _r}})):e.proxy}var KE=/(?:^|[-_])\w/g,XE=e=>e.replace(KE,t=>t.toUpperCase()).replace(/[-_]/g,"");function ii(e,t=!0){return Z(e)?e.displayName||e.name:e.name||t&&e.__name}function lp(e,t,n=!1){let o=ii(t);if(!o&&t.__file){let r=t.__file.match(/([^/\\]+)\.\w+$/);r&&(o=r[1])}if(!o&&e){let r=s=>{for(let i in s)if(s[i]===t)return i};o=r(e.components)||e.parent&&r(e.parent.type.components)||r(e.appContext.components)}return o?XE(o):n?"App":"Anonymous"}function zE(e){return Z(e)&&"__vccOpts"in e}var Fe=(e,t)=>eu(e,t,oo);function Cl(e,t,n){try{wr(-1);let o=arguments.length;return o===2?ie(t)&&!H(t)?mn(t)?ye(e,null,[t]):ye(e,t):ye(e,null,t):(o>3?n=Array.prototype.slice.call(arguments,2):o===3&&mn(n)&&(n=[n]),ye(e,t,n))}finally{wr(1)}}function cp(){return;function s(c){let p=[];c.type.props&&c.props&&p.push(i("props",Q(c.props))),c.setupState!==ee&&p.push(i("setup",c.setupState)),c.data!==ee&&p.push(i("data",Q(c.data)));let d=l(c,"computed");d&&p.push(i("computed",d));let v=l(c,"inject");return v&&p.push(i("injected",v)),p.push(["div",{},["span",{style:o.style+";opacity:0.66"},"$ (internal): "],["object",{object:c}]]),p}function i(c,p){return p=q({},p),Object.keys(p).length?["div",{style:"line-height:1.25em;margin-bottom:0.6em"},["div",{style:"color:#476582"},c],["div",{style:"padding-left:1.25em"},...Object.keys(p).map(d=>["div",{},["span",o,d+": "],a(p[d],!1)])]]:["span",{}]}function a(c,p=!0){return typeof c=="number"?["span",t,c]:typeof c=="string"?["span",n,JSON.stringify(c)]:typeof c=="boolean"?["span",o,c]:ie(c)?["object",{object:p?Q(c):c}]:["span",n,String(c)]}function l(c,p){let d=c.type;if(Z(d))return;let v={};for(let h in c.ctx)f(d,h,p)&&(v[h]=c.ctx[h]);return v}function f(c,p,d){let v=c[d];if(H(v)&&v.includes(p)||ie(v)&&p in v||c.extends&&f(c.extends,p,d)||c.mixins&&c.mixins.some(h=>f(h,p,d)))return!0}function u(c){return $e(c)?"ShallowRef":c.effect?"ComputedRef":"Ref"}}function GE(e,t,n,o){let r=n[o];if(r&&fp(r,e))return r;let s=t();return s.memo=e.slice(),s.cacheIndex=o,n[o]=s}function fp(e,t){let n=e.memo;if(n.length!=t.length)return!1;for(let o=0;o<n.length;o++)if(Ie(n[o],t[o]))return!1;return no>0&&Ge&&Ge.push(e),!0}var up="3.5.46",vi=De,qE=Ym,JE=Do,YE=Nu,QE={createComponentInstance:tp,setupComponent:op,renderComponentRoot:Xs,setCurrentRenderingInstance:br,isVNode:mn,normalizeVNode:it,getComponentPublicInstance:kr,ensureValidVNode:vl,pushWarningContext:jm,popWarningContext:Wm},ZE=QE,ev=null,tv=null,nv=null;var Vl,pp=typeof window<"u"&&window.trustedTypes;if(pp)try{Vl=pp.createPolicy("vue",{createHTML:e=>e})}catch{}var Vp=Vl?e=>Vl.createHTML(e):e=>e,ov="http://www.w3.org/2000/svg",rv="http://www.w3.org/1998/Math/MathML",En=typeof document<"u"?document:null,dp=En&&En.createElement("template"),Rp={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,o)=>{let r=t==="svg"?En.createElementNS(ov,e):t==="mathml"?En.createElementNS(rv,e):n?En.createElement(e,{is:n}):En.createElement(e);return e==="select"&&o&&o.multiple!=null&&r.setAttribute("multiple",o.multiple),r},createText:e=>En.createTextNode(e),createComment:e=>En.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>En.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,o,r,s){let i=n?n.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),!(r===s||!(r=r.nextSibling)););else{dp.innerHTML=Vp(o==="svg"?`<svg>${e}</svg>`:o==="mathml"?`<math>${e}</math>`:e);let a=dp.content;if(o==="svg"||o==="mathml"){let l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Vn="transition",Vr="animation",Mo=Symbol("_vtc"),Pp={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Mp=q({},pi,Pp),sv=e=>(e.displayName="Transition",e.props=Mp,e),iv=sv((e,{slots:t})=>Cl(ul,Lp(e),t)),io=(e,t=[])=>{H(e)?e.forEach(n=>n(...t)):e&&e(...t)},hp=e=>e?H(e)?e.some(t=>t.length>1):e.length>1:!1;function Lp(e){let t={};for(let w in e)w in Pp||(t[w]=e[w]);if(e.css===!1)return t;let{name:n="v",type:o,duration:r,enterFromClass:s=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:a=`${n}-enter-to`,appearFromClass:l=s,appearActiveClass:f=i,appearToClass:u=a,leaveFromClass:c=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:d=`${n}-leave-to`}=e,v=av(r),h=v&&v[0],N=v&&v[1],{onBeforeEnter:C,onEnter:y,onEnterCancelled:E,onLeave:b,onLeaveCancelled:g,onBeforeAppear:O=C,onAppear:D=y,onAppearCancelled:S=E}=t,T=(w,$,P,W)=>{w._enterResolve=void 0,w._enterCancelled=W,Rn(w,$?u:a),Rn(w,$?f:i),P&&P()},V=(w,$)=>{w._leaveResolve=void 0,w._isLeaving=!1,Rn(w,c),Rn(w,d),Rn(w,p),$&&$()},M=w=>($,P)=>{let W=w?D:y,j=()=>{$._enterResolve===j&&T($,w,P)};$._enterResolve=j,io(W,[$,j]),mp(()=>{Rn($,w?l:s),$._enterResolve===j&&(Yt($,w?u:a),hp(W)||gp($,o,h,j))})};return q(t,{onBeforeEnter(w){io(C,[w]),Yt(w,s),Yt(w,i)},onBeforeAppear(w){io(O,[w]),Yt(w,l),Yt(w,f)},onEnter:M(!1),onAppear:M(!0),onLeave(w,$){w._isLeaving=!0;let P=()=>{w._leaveResolve===P&&V(w,$)};w._leaveResolve=P,Yt(w,c),w._enterCancelled?(Yt(w,p),Rl(w)):(Rl(w),Yt(w,p)),mp(()=>{w._leaveResolve===P&&(Rn(w,c),Yt(w,d),hp(b)||gp(w,o,N,P))}),io(b,[w,P])},onEnterCancelled(w){T(w,!1,void 0,!0),io(E,[w])},onAppearCancelled(w){T(w,!0,void 0,!0),io(S,[w])},onLeaveCancelled(w){V(w),io(g,[w])}})}function av(e){if(e==null)return null;if(ie(e))return[Al(e.enter),Al(e.leave)];{let t=Al(e);return[t,t]}}function Al(e){return xo(e)}function Yt(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e[Mo]||(e[Mo]=new Set)).add(t)}function Rn(e,t){t.split(/\s+/).forEach(o=>o&&e.classList.remove(o));let n=e[Mo];n&&(n.delete(t),n.size||(e[Mo]=void 0))}function mp(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}var lv=0;function gp(e,t,n,o){let r=e._endId=++lv,s=()=>{r===e._endId&&o()};if(n!=null)return setTimeout(s,n);let{type:i,timeout:a,propCount:l}=$p(e,t);if(!i)return o();let f=i+"end",u=0,c=()=>{e.removeEventListener(f,p),s()},p=d=>{d.target===e&&++u>=l&&c()};setTimeout(()=>{u<l&&c()},a+1),e.addEventListener(f,p)}function $p(e,t){let n=window.getComputedStyle(e),o=v=>(n[v]||"").split(", "),r=o(`${Vn}Delay`),s=o(`${Vn}Duration`),i=Ep(r,s),a=o(`${Vr}Delay`),l=o(`${Vr}Duration`),f=Ep(a,l),u=null,c=0,p=0;t===Vn?i>0&&(u=Vn,c=i,p=s.length):t===Vr?f>0&&(u=Vr,c=f,p=l.length):(c=Math.max(i,f),u=c>0?i>f?Vn:Vr:null,p=u?u===Vn?s.length:l.length:0);let d=u===Vn&&/\b(?:transform|all)(?:,|$)/.test(o(`${Vn}Property`).toString());return{type:u,timeout:c,propCount:p,hasTransform:d}}function Ep(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,o)=>vp(n)+vp(e[o])))}function vp(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function Rl(e){return(e?e.ownerDocument:document).body.offsetHeight}function cv(e,t,n){let o=e[Mo];o&&(t=(t?[t,...o]:[...o]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}var Ni=Symbol("_vod"),$l=Symbol("_vsh"),Fp={name:"show",beforeMount(e,{value:t},{transition:n}){e[Ni]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):Rr(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:o}){!t!=!n&&(o?t?(o.beforeEnter(e),Rr(e,!0),o.enter(e)):o.leave(e,()=>{Rr(e,!1)}):Rr(e,t))},beforeUnmount(e,{value:t}){Rr(e,t)}};function Rr(e,t){e.style.display=t?e[Ni]:"none",e[$l]=!t}function fv(){Fp.getSSRProps=({value:e})=>{if(!e)return{style:{display:"none"}}}}var Up=Symbol("");function uv(e){let t=qe();if(!t)return;let n=(s=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(i=>Si(i,s))},o={uid:String(t.uid),update:n};Oo(()=>o.update=void 0),t.ut=(s,i)=>{s&&(s[Lo]=[i,o],Bp(s),Pl(s)),n()};let r=()=>{let s=e(t.proxy);t.ce?Si(t.ce,s):Ml(t.subTree,s),n(s)};dl(()=>{qt(r)}),Ir(()=>{Po(r,De,{flush:"post"});let s=new MutationObserver(r);s.observe(t.subTree.el.parentNode,{childList:!0}),ml(()=>s.disconnect())})}var Lo=Symbol("");function Pl(e,t){let[n,o]=e[Lo],r;if(o.update)for(let s=e;s&&s!==n;s=s.nextSibling)s.nodeType===1&&(!t||(t===!0||t.has(s))&&(s.getAttribute("data-v-owner")||o.uid)===o.uid)&&(s.setAttribute("data-v-owner",o.uid),r=o.update);return r}function Bp(e){let t=e.parentNode;if(t){let n=t[Lo];n||(n=t[Lo]=new Set,new MutationObserver(pv).observe(t,{childList:!0})),n.add(e)}}function pv(e,t){let n=e[0].target,o=n[Lo],r=new Set;for(let{addedNodes:i}of e)i.forEach(a=>r.add(a));let s=new Set;o.forEach(i=>{i.parentNode!==n?(o.delete(i),Bp(i),s.add(Pl(i,!0))):r.size&&s.add(Pl(i,r))}),s.forEach(i=>i&&i()),o.size||(t.disconnect(),n[Lo]=void 0)}function Ml(e,t){if(e.shapeFlag&128){let n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push(()=>{Ml(n.activeBranch,t)})}for(;e.component;)e=e.component.subTree;if(e.shapeFlag&1&&e.el)Si(e.el,t);else if(e.type===Ve)e.children.forEach(n=>Ml(n,t));else if(e.type===dn){let{el:n,anchor:o}=e;for(;n&&(Si(n,t),n!==o);)n=n.nextSibling}}function Si(e,t){if(e.nodeType===1){let n=e.style,o="";for(let r in t){let s=Da(t[r]);n.setProperty(`--${r}`,s),o+=`--${r}: ${s};`}n[Up]=o}}var dv=/(?:^|;)\s*display\s*:/;function hv(e,t,n){let o=e.style,r=z(n),s=!1;if(n&&!r){if(t)if(z(t))for(let i of t.split(";")){let a=i.slice(0,i.indexOf(":")).trim();n[a]==null&&Pr(o,a,"")}else for(let i in t)n[i]==null&&Pr(o,i,"");for(let i in n){i==="display"&&(s=!0);let a=n[i];a!=null?gv(e,i,!z(t)&&t?t[i]:void 0,a)||Pr(o,i,a):Pr(o,i,"")}}else if(r){if(t!==n){let i=o[Up];i&&(n+=";"+i),o.cssText=n,s=dv.test(n)}}else t&&e.removeAttribute("style");Ni in e&&((!r||t!==n)&&(e[Ni]=s?o.display:""),e[$l]&&(o.display="none"))}var _i=/\s*!important$/;function Pr(e,t,n){if(H(n))n.forEach(o=>Pr(e,t,o));else if(n==null&&(n=""),t.startsWith("--"))_i.test(n)?e.setProperty(t,n.replace(_i,""),"important"):e.setProperty(t,n);else{let o=mv(e,t);_i.test(n)?e.setProperty(ze(o),n.replace(_i,""),"important"):e[o]=n}}var _p=["Webkit","Moz","ms"],Dl={};function mv(e,t){let n=Dl[t];if(n)return n;let o=ce(t);if(o!=="filter"&&o in e)return Dl[t]=o;o=Tt(o);for(let r=0;r<_p.length;r++){let s=_p[r]+o;if(s in e)return Dl[t]=s}return t}function gv(e,t,n,o){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&z(o)&&n===o}var yp="http://www.w3.org/1999/xlink";function bp(e,t,n,o,r,s=Tf(t)){o&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(yp,t.slice(6,t.length)):e.setAttributeNS(yp,t,n):n==null||s&&!xs(n)?e.removeAttribute(t):e.setAttribute(t,s?"":Ae(n)?String(n):n)}function Np(e,t,n,o,r){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?Vp(n):n);return}let s=e.tagName;if(t==="value"&&s!=="PROGRESS"&&!s.includes("-")){let a=s==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let i=!1;if(n===""||n==null){let a=typeof e[t];a==="boolean"?n=xs(n):n==null&&a==="string"?(n="",i=!0):a==="number"&&(n=0,i=!0)}try{e[t]=n}catch{}i&&e.removeAttribute(r||t)}function vn(e,t,n,o){e.addEventListener(t,n,o)}function Ev(e,t,n,o){e.removeEventListener(t,n,o)}var Sp=Symbol("_vei");function vv(e,t,n,o,r=null){let s=e[Sp]||(e[Sp]={}),i=s[t];if(o&&i)i.value=o;else{let[a,l]=bv(t);if(o){let f=s[t]=xv(o,r);vn(e,a,f,l)}else i&&(Ev(e,a,i,l),s[t]=void 0)}}var _v=/(Once|Passive|Capture)$/,yv=/^on:?(?:Once|Passive|Capture)$/;function bv(e){let t,n;for(;(n=e.match(_v))&&!yv.test(e);)t||(t={}),e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===":"?e.slice(3):ze(e.slice(2)),t]}var Il=0,Nv=Promise.resolve(),Sv=()=>Il||(Nv.then(()=>Il=0),Il=Date.now());function xv(e,t){let n=o=>{if(!o._vts)o._vts=Date.now();else if(o._vts<=n.attached)return;let r=n.value;if(H(r)){let s=o.stopImmediatePropagation;o.stopImmediatePropagation=()=>{s.call(o),o._stopped=!0};let i=r.slice(),a=[o];for(let l=0;l<i.length&&!o._stopped;l++){let f=i[l];f&&_t(f,t,5,a)}}else _t(r,t,5,[o])};return n.value=e,n.attached=Sv(),n}var xp=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Hp=(e,t,n,o,r,s)=>{let i=r==="svg";t==="class"?cv(e,o,i):t==="style"?hv(e,n,o):jt(t)?No(t)||vv(e,t,n,o,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Tv(e,t,o,i))?(Np(e,t,o),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&bp(e,t,o,i,s,t!=="value")):e._isVueCE&&(wv(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!z(o)))?Np(e,ce(t),o,s,t):(t==="true-value"?e._trueValue=o:t==="false-value"&&(e._falseValue=o),bp(e,t,o,i))};function Tv(e,t,n,o){if(o)return!!(t==="innerHTML"||t==="textContent"||t in e&&xp(t)&&Z(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){let r=e.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return xp(t)&&z(n)?!1:t in e}function wv(e,t){let n=e._def.props;if(!n)return!1;let o=ce(t);return Array.isArray(n)?n.some(r=>ce(r)===o):Object.keys(n).some(r=>ce(r)===o)}var Tp={};function jp(e,t,n){let o=at(e,t);So(o)&&(o=q({},o,t));class r extends xi{constructor(i){super(o,i,n)}}return r.def=o,r}var Ov=((e,t)=>jp(e,t,td)),Cv=typeof HTMLElement<"u"?HTMLElement:class{},xi=class e extends Cv{constructor(t,n={},o=Lr){super(),this._def=t,this._props=n,this._createApp=o,this._isVueCE=!0,this._instance=null,this._app=null,this._nonce=this._def.nonce,this._connected=!1,this._resolved=!1,this._patching=!1,this._dirty=!1,this._numberProps=null,this._styleChildren=new WeakSet,this._styleAnchors=new WeakMap,this._ob=null,this.shadowRoot&&o!==Lr?this._root=this.shadowRoot:t.shadowRoot!==!1?(this.attachShadow(q({},t.shadowRootOptions,{mode:"open"})),this._root=this.shadowRoot):this._root=this}connectedCallback(){if(!this.isConnected)return;!this.shadowRoot&&!this._resolved&&this._parseSlots(),this._connected=!0;let t=this;for(;t=t&&(t.assignedSlot||t.parentNode||t.host);)if(t instanceof e){this._parent=t;break}this._instance||(this._resolved?this._mount(this._def):t&&t._pendingResolve?this._pendingResolve=t._pendingResolve.then(()=>{if(this._pendingResolve=void 0,this.isConnected)return this._resolveDef()}):this._resolveDef())}_setParent(t=this._parent){t&&(this._instance.parent=t._instance,this._inheritParentContext(t))}_inheritParentContext(t=this._parent){t&&this._app&&Object.setPrototypeOf(this._app._context.provides,t._instance.provides)}disconnectedCallback(){this._connected=!1,Cr(()=>{this._connected||(this._ob&&(this._ob.disconnect(),this._ob=null),this._app&&this._app.unmount(),this._instance&&(this._instance.ce=void 0),this._app=this._instance=null,this._teleportTargets&&(this._teleportTargets.clear(),this._teleportTargets=void 0))})}_processMutations(t){for(let n of t)this._setAttr(n.attributeName)}_resolveDef(){if(this._pendingResolve)return this._pendingResolve;for(let o=0;o<this.attributes.length;o++)this._setAttr(this.attributes[o].name);this._ob=new MutationObserver(this._processMutations.bind(this)),this._ob.observe(this,{attributes:!0});let t=(o,r=!1)=>{this._resolved=!0,this._pendingResolve=void 0;let{props:s,styles:i}=o,a;if(s&&!H(s))for(let l in s){let f=s[l];(f===Number||f&&f.type===Number)&&(l in this._props&&(this._props[l]=xo(this._props[l])),(a||(a=Object.create(null)))[ce(l)]=!0)}this._numberProps=a,this._resolveProps(o),this.shadowRoot&&this._applyStyles(i),this._connected&&this._mount(o)},n=this._def.__asyncLoader;if(n)return this._pendingResolve=n().then(o=>{o.configureApp=this._def.configureApp,t(this._def=o,!0)}),this._pendingResolve;t(this._def)}_mount(t){this._app=this._createApp(t),this._inheritParentContext(),t.configureApp&&t.configureApp(this._app),this._app._ceVNode=this._createVNode(),this._app.mount(this._root);let n=this._instance&&this._instance.exposed;if(n)for(let o in n)le(this,o)||Object.defineProperty(this,o,{get:()=>Jn(n[o])})}_resolveProps(t){let{props:n}=t,o=H(n)?n:Object.keys(n||{});for(let r of Object.keys(this))r[0]!=="_"&&o.includes(r)&&this._setProp(r,this[r]);for(let r of o.map(ce))Object.defineProperty(this,r,{get(){return this._getProp(r)},set(s){this._setProp(r,s,!0,!this._patching)}})}_setAttr(t){if(t.startsWith("data-v-"))return;let n=this.hasAttribute(t),o=n?this.getAttribute(t):Tp,r=ce(t);n&&this._numberProps&&this._numberProps[r]&&(o=xo(o)),this._setProp(r,o,!1,!0)}_getProp(t){return this._props[t]}_setProp(t,n,o=!0,r=!1){if(n!==this._props[t]&&(this._dirty=!0,n===Tp?delete this._props[t]:(this._props[t]=n,t==="key"&&this._app&&(this._app._ceVNode.key=n)),r&&this._instance&&this._update(),o)){let s=this._ob;s&&(this._processMutations(s.takeRecords()),s.disconnect()),n===!0?this.setAttribute(ze(t),""):typeof n=="string"||typeof n=="number"?this.setAttribute(ze(t),n+""):n||this.removeAttribute(ze(t)),s&&s.observe(this,{attributes:!0})}}_update(){let t=this._createVNode();this._app&&(t.appContext=this._app._context),ed(t,this._root)}_createVNode(){let t={};this.shadowRoot||(t.onVnodeMounted=t.onVnodeUpdated=this._renderSlots.bind(this));let n=ye(this._def,q(t,this._props));return this._instance||(n.ce=o=>{this._instance=o,o.ce=this,o.isCE=!0;let r=(s,i)=>{this.dispatchEvent(new CustomEvent(s,So(i[0])?q({detail:i},i[0]):{detail:i}))};o.emit=(s,...i)=>{r(s,i),ze(s)!==s&&r(ze(s),i)},this._setParent()}),n}_applyStyles(t,n,o){if(!t)return;if(n){if(n===this._def||this._styleChildren.has(n))return;this._styleChildren.add(n)}let r=this._nonce,s=this.shadowRoot,i=o?this._getStyleAnchor(o)||this._getStyleAnchor(this._def):this._getRootStyleInsertionAnchor(s),a=null;for(let l=t.length-1;l>=0;l--){let f=document.createElement("style");r&&f.setAttribute("nonce",r),f.textContent=t[l],s.insertBefore(f,a||i),a=f,l===0&&(o||this._styleAnchors.set(this._def,f),n&&this._styleAnchors.set(n,f))}}_getStyleAnchor(t){if(!t)return null;let n=this._styleAnchors.get(t);return n&&n.parentNode===this.shadowRoot?n:(n&&this._styleAnchors.delete(t),null)}_getRootStyleInsertionAnchor(t){for(let n=0;n<t.childNodes.length;n++){let o=t.childNodes[n];if(!(o instanceof HTMLStyleElement))return o}return null}_parseSlots(){let t=this._slots={},n;for(;n=this.firstChild;){let o=n.nodeType===1&&n.getAttribute("slot")||"default";(t[o]||(t[o]=[])).push(n),this.removeChild(n)}}_renderSlots(){let t=this._getSlots(),n=this._instance.type.__scopeId;for(let o=0;o<t.length;o++){let r=t[o],s=r.getAttribute("name")||"default",i=this._slots[s],a=r.parentNode;if(i)for(let l of i){if(n&&l.nodeType===1){let f=n+"-s",u=document.createTreeWalker(l,1);l.setAttribute(f,"");let c;for(;c=u.nextNode();)c.setAttribute(f,"")}a.insertBefore(l,r)}else for(;r.firstChild;)a.insertBefore(r.firstChild,r);a.removeChild(r)}}_getSlots(){let t=[this];this._teleportTargets&&t.push(...this._teleportTargets);let n=new Set;for(let o of t){let r=o.querySelectorAll("slot");for(let s=0;s<r.length;s++)n.add(r[s])}return Array.from(n)}_injectChildStyle(t,n){this._applyStyles(t.styles,t,n)}_beginPatch(){this._patching=!0,this._dirty=!1}_endPatch(){this._patching=!1,this._dirty&&this._instance&&this._update()}_hasShadowRoot(){return this._def.shadowRoot!==!1}_removeChildStyle(t){}};function Wp(e){let t=qe(),n=t&&t.ce;return n||null}function Av(){let e=Wp();return e&&e.shadowRoot}function Dv(e="$style"){{let t=qe();if(!t)return ee;let n=t.type.__cssModules;if(!n)return ee;let o=n[e];return o||ee}}var Kp=new WeakMap,Xp=new WeakMap,Ti=Symbol("_moveCb"),wp=Symbol("_enterCb"),Ll=new WeakMap,Iv=e=>(delete e.props.mode,e),kv=Iv({name:"TransitionGroup",props:q({},Mp,{tag:String,moveClass:String}),setup(e,{slots:t}){let n=qe(),o=ui(),r,s,i,a,l=()=>(a===void 0&&(a=r.length>0&&Uv(r[0].el,n.vnode.el,Op(e))),a);return di(()=>{if(Ll.delete(n),!l()){r=[],i=void 0;return}let f=Op(e);r.forEach(Rv);let u=i&&Fv(i,n.vnode.el);i=void 0,r.forEach(p=>Pv(p,u));let c=r.filter(Mv);Rl(n.vnode.el),c.forEach(p=>{let d=p.el,v=d.style;Yt(d,f),v.transform=v.webkitTransform=v.transitionDuration="";let h=d[Ti]=N=>{N&&N.target!==d||(!N||N.propertyName.endsWith("transform"))&&(d.removeEventListener("transitionend",h),d[Ti]=null,Rn(d,f))};d.addEventListener("transitionend",h)}),r=[]}),()=>{let f=Q(e),u=Lp(f),c=f.tag||Ve;if(r=[],a=void 0,s)for(let p=0;p<s.length;p++){let d=s[p];d.el&&d.el instanceof Element&&!d.el[$l]&&(r.push(d),Dt(d,to(d,u,o,n)),Kp.set(d,Oi(d.el)))}s=t.default?Ar(t.default()):[];for(let p=0;p<s.length;p++){let d=s[p];d.key!=null&&Dt(d,to(d,u,o,n))}return r.length&&(i=Lv(n),Ll.set(n,l)),ye(c,null,s)}}}),Vv=kv;function Rv(e){let t=e.el;t[Ti]&&t[Ti](),t[wp]&&t[wp]()}function Op(e){return e.moveClass||`${e.name||"v"}-move`}function Pv(e,t){Xp.set(e,Oi(e.el,t))}function Mv(e){let t=Kp.get(e),n=Xp.get(e),o=t.left-n.left,r=t.top-n.top;if(o||r){let s=e.el,i=s.style,a=s.getBoundingClientRect(),l=1,f=1;return s.offsetWidth&&(l=a.width/s.offsetWidth),s.offsetHeight&&(f=a.height/s.offsetHeight),(!Number.isFinite(l)||l===0)&&(l=1),(!Number.isFinite(f)||f===0)&&(f=1),Math.abs(l-1)<.01&&(l=1),Math.abs(f-1)<.01&&(f=1),i.transform=i.webkitTransform=`translate(${o/l}px,${r/f}px)`,i.transitionDuration="0s",e}}function Oi(e,t){let n=e.getBoundingClientRect();return{left:n.left-(t?t.left:0),top:n.top-(t?t.top:0)}}function Lv(e){let t;for(let n=e.parent;n;n=n.parent){let o=Ll.get(n);if(o){let r=$v(n.vnode.el,e.vnode.el);r&&(t||(t=[])).push(q(Oi(r),{item:r,willMove:o}))}}return t}function $v(e,t){let n=e.nodeType===1?e:e.parentNode;for(;t&&t.parentNode!==n;)t=t.parentNode;if(t&&t.nodeType===1)return t}function Fv(e,t){let n=e.find(o=>o.willMove()&&o.item.contains(t));return n&&Oi(n.item,n)}function Uv(e,t,n){let o=e.cloneNode(),r=e[Mo];r&&r.forEach(a=>{a.split(/\s+/).forEach(l=>l&&o.classList.remove(l))}),n.split(/\s+/).forEach(a=>a&&o.classList.add(a)),o.style.display="none";let s=t.nodeType===1?t:t.parentNode;s.appendChild(o);let{hasTransform:i}=$p(o);return s.removeChild(o),i}var Pn=e=>{let t=e.props["onUpdate:modelValue"]||!1;return H(t)?n=>On(t,n):t};function Bv(e){e.target.composing=!0}function Cp(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}var yt=Symbol("_assign"),yi=Symbol("_initialValue");function kl(e,t,n){return t&&(e=e.trim()),n&&(e=Wn(e)),e}var wi={created(e,{modifiers:{lazy:t,trim:n,number:o}},r){e.parentNode&&(e.type==="text"?e[yi]=e.defaultValue.replace(/[\r\n]/g,""):e.type==="textarea"&&(e[yi]=e.defaultValue.replace(/\r\n?/g,`
`))),e[yt]=Pn(r);let s=o||r.props&&r.props.type==="number";vn(e,t?"change":"input",i=>{i.target.composing||e[yt](kl(e.value,n,s))}),(n||s)&&vn(e,"change",()=>{e.value=kl(e.value,n,s)}),t||(vn(e,"compositionstart",Bv),vn(e,"compositionend",Cp),vn(e,"change",Cp))},mounted(e,{value:t,modifiers:{trim:n,number:o}}){let r=t??"",s=e[yi];delete e[yi],s!==void 0&&(e.type==="text"||e.type==="textarea")&&e.value!==s?e[yt](kl(e.value,n,o)):e.value=r},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:o,trim:r,number:s}},i){if(e[yt]=Pn(i),e.composing)return;let a=(s||e.type==="number")&&!/^0\d/.test(e.value)?Wn(e.value):e.value,l=t??"";if(a===l)return;let f=e.getRootNode();(f instanceof Document||f instanceof ShadowRoot)&&f.activeElement===e&&e.type!=="range"&&(o&&t===n||r&&e.value.trim()===l)||(e.value=l)}},Fl={deep:!0,created(e,t,n){e[yt]=Pn(n),vn(e,"change",()=>{let o=e._modelValue,r=$o(e),s=e.checked,i=e[yt];if(H(o)){let a=ar(o,r),l=a!==-1;if(s&&!l)i(o.concat(r));else if(!s&&l){let f=[...o];f.splice(a,1),i(f)}}else if(xt(o)){let a=new Set(o);s?a.add(r):a.delete(r),i(a)}else i(Gp(e,s))})},mounted:Ap,beforeUpdate(e,t,n){e[yt]=Pn(n),Ap(e,t,n)}};function Ap(e,{value:t,oldValue:n},o){e._modelValue=t;let r;if(H(t))r=ar(t,o.props.value)>-1;else if(xt(t))r=t.has(o.props.value);else{if(t===n)return;r=rt(t,Gp(e,!0))}e.checked!==r&&(e.checked=r)}var Ul={created(e,{value:t},n){e.checked=rt(t,n.props.value),e[yt]=Pn(n),vn(e,"change",()=>{e[yt]($o(e))})},beforeUpdate(e,{value:t,oldValue:n},o){e[yt]=Pn(o),t!==n&&(e.checked=rt(t,o.props.value))}},zp={deep:!0,created(e,{value:t,modifiers:{number:n}},o){e._modelValue=t,vn(e,"change",()=>{let r=Array.prototype.filter.call(e.options,l=>l.selected).map(l=>n?Wn($o(l)):$o(l)),s=e.multiple,i=s?xt(e._modelValue)?new Set(r):r:r[0],a=e._pendingValue=[s,s?H(i)?r.slice():r:i];try{e[yt](i)}finally{Cr(()=>{e._pendingValue===a&&(e._pendingValue=void 0)})}}),e[yt]=Pn(o)},mounted(e,{value:t,modifiers:{number:n}}){Dp(e,t,n)},beforeUpdate(e,{value:t},n){e._modelValue=t,e[yt]=Pn(n)},updated(e,{value:t,modifiers:{number:n}}){let o=e._pendingValue;e._pendingValue=void 0,(!o||o[0]!==e.multiple||!Hv(t,o[1],o[0]))&&Dp(e,t,n)}};function Hv(e,t,n){if(!n)return rt(e,t);if(H(e))return rt(e,t);if(xt(e)){if(e.size!==t.length)return!1;for(let o of t)if(!e.has(o))return!1;return!0}return!1}function Dp(e,t,n=!1){let o=e.multiple,r=H(t);if(!(o&&!r&&!xt(t))){for(let s=0,i=e.options.length;s<i;s++){let a=e.options[s],l=$o(a);if(o)if(r){let f=typeof l;f==="string"||f==="number"?a.selected=t.some(u=>String(u)===String(l)):a.selected=ar(t,l)>-1}else a.selected=t.has(l)||n&&typeof l=="string"&&t.has(Wn(l));else if(rt($o(a),t)){e.selectedIndex!==s&&(e.selectedIndex=s);return}}!o&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function $o(e){return"_value"in e?e._value:e.value}function Gp(e,t){let n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}var qp={created(e,t,n){bi(e,t,n,null,"created")},mounted(e,t,n){bi(e,t,n,null,"mounted")},beforeUpdate(e,t,n,o){bi(e,t,n,o,"beforeUpdate")},updated(e,t,n,o){bi(e,t,n,o,"updated")}};function Jp(e,t){switch(e){case"SELECT":return zp;case"TEXTAREA":return wi;default:switch(t){case"checkbox":return Fl;case"radio":return Ul;default:return wi}}}function bi(e,t,n,o,r){let i=Jp(e.tagName,n.props&&n.props.type)[r];i&&i(e,t,n,o)}function jv(){wi.getSSRProps=({value:e})=>({value:e}),Ul.getSSRProps=({value:e},t)=>{if(t.props&&rt(t.props.value,e))return{checked:!0}},Fl.getSSRProps=({value:e},t)=>{if(H(e)){if(t.props&&ar(e,t.props.value)>-1)return{checked:!0}}else if(xt(e)){if(t.props&&e.has(t.props.value))return{checked:!0}}else if(e)return{checked:!0}},qp.getSSRProps=(e,t)=>{if(typeof t.type!="string")return;let n=Jp(t.type.toUpperCase(),t.props&&t.props.type);if(n.getSSRProps)return n.getSSRProps(e,t)}}var Wv=["ctrl","shift","alt","meta"],Kv={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Wv.some(n=>e[`${n}Key`]&&!t.includes(n))},Xv=(e,t)=>{if(!e)return e;let n=e._withMods||(e._withMods={}),o=t.join(".");return n[o]||(n[o]=((r,...s)=>{for(let i=0;i<t.length;i++){let a=Kv[t[i]];if(a&&a(r,t))return}return e(r,...s)}))},zv={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Gv=(e,t)=>{let n=e._withKeys||(e._withKeys={}),o=t.join(".");return n[o]||(n[o]=(r=>{if(!("key"in r))return;let s=ze(r.key);if(t.some(i=>i===s||zv[i]===s))return e(r)}))},Yp=q({patchProp:Hp},Rp),Mr,Ip=!1;function Qp(){return Mr||(Mr=Nl(Yp))}function Zp(){return Mr=Ip?Mr:Sl(Yp),Ip=!0,Mr}var ed=((...e)=>{Qp().render(...e)}),qv=((...e)=>{Zp().hydrate(...e)}),Lr=((...e)=>{let t=Qp().createApp(...e),{mount:n}=t;return t.mount=o=>{let r=od(o);if(!r)return;let s=t._component;!Z(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");let i=n(r,!1,nd(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),i},t}),td=((...e)=>{let t=Zp().createApp(...e),{mount:n}=t;return t.mount=o=>{let r=od(o);if(r)return n(r,!0,nd(r))},t});function nd(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function od(e){return z(e)?document.querySelector(e):e}var kp=!1,Jv=()=>{kp||(kp=!0,jv(),fv())};var Ur=Symbol(""),Fr=Symbol(""),Zl=Symbol(""),Ri=Symbol(""),bd=Symbol(""),uo=Symbol(""),Nd=Symbol(""),Sd=Symbol(""),ec=Symbol(""),tc=Symbol(""),Kr=Symbol(""),nc=Symbol(""),xd=Symbol(""),oc=Symbol(""),rc=Symbol(""),sc=Symbol(""),ic=Symbol(""),ac=Symbol(""),lc=Symbol(""),Td=Symbol(""),wd=Symbol(""),Xr=Symbol(""),Pi=Symbol(""),cc=Symbol(""),fc=Symbol(""),Br=Symbol(""),zr=Symbol(""),uc=Symbol(""),Wl=Symbol(""),Yv=Symbol(""),Kl=Symbol(""),Mi=Symbol(""),Qv=Symbol(""),Zv=Symbol(""),pc=Symbol(""),e_=Symbol(""),t_=Symbol(""),dc=Symbol(""),Od=Symbol(""),Fo={[Ur]:"Fragment",[Fr]:"Teleport",[Zl]:"Suspense",[Ri]:"KeepAlive",[bd]:"BaseTransition",[uo]:"openBlock",[Nd]:"createBlock",[Sd]:"createElementBlock",[ec]:"createVNode",[tc]:"createElementVNode",[Kr]:"createCommentVNode",[nc]:"createTextVNode",[xd]:"createStaticVNode",[oc]:"resolveComponent",[rc]:"resolveDynamicComponent",[sc]:"resolveDirective",[ic]:"resolveFilter",[ac]:"withDirectives",[lc]:"renderList",[Td]:"renderSlot",[wd]:"createSlots",[Xr]:"toDisplayString",[Pi]:"mergeProps",[cc]:"normalizeClass",[fc]:"normalizeStyle",[Br]:"normalizeProps",[zr]:"guardReactiveProps",[uc]:"toHandlers",[Wl]:"camelize",[Yv]:"capitalize",[Kl]:"toHandlerKey",[Mi]:"setBlockTracking",[Qv]:"pushScopeId",[Zv]:"popScopeId",[pc]:"withCtx",[e_]:"unref",[t_]:"isRef",[dc]:"withMemo",[Od]:"isMemoSame"};function Cd(e){Object.getOwnPropertySymbols(e).forEach(t=>{Fo[t]=e[t]})}var Nt={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function n_(e,t=""){return{type:0,source:t,children:e,helpers:new Set,components:[],directives:[],hoists:[],imports:[],cached:[],temps:0,codegenNode:void 0,loc:Nt}}function Hr(e,t,n,o,r,s,i,a=!1,l=!1,f=!1,u=Nt){return e&&(a?(e.helper(uo),e.helper(Ho(e.inSSR,f))):e.helper(Bo(e.inSSR,f)),i&&e.helper(ac)),{type:13,tag:t,props:n,children:o,patchFlag:r,dynamicProps:s,directives:i,isBlock:a,disableTracking:l,isComponent:f,loc:u}}function co(e,t=Nt){return{type:17,loc:t,elements:e}}function It(e,t=Nt){return{type:15,loc:t,properties:e}}function Oe(e,t){return{type:16,loc:Nt,key:z(e)?Y(e,!0):e,value:t}}function Y(e,t=!1,n=Nt,o=0){return{type:4,loc:n,content:e,isStatic:t,constType:t?3:o}}function kt(e,t=Nt){return{type:8,loc:t,children:e}}function Pe(e,t=[],n=Nt){return{type:14,loc:n,callee:e,arguments:t}}function Uo(e,t=void 0,n=!1,o=!1,r=Nt){return{type:18,params:e,returns:t,newline:n,isSlot:o,loc:r}}function Xl(e,t,n,o=!0){return{type:19,test:e,consequent:t,alternate:n,newline:o,loc:Nt}}function o_(e,t,n=!1,o=!1){return{type:20,index:e,value:t,needPauseTracking:n,inVOnce:o,needArraySpread:!1,loc:Nt}}function r_(e){return{type:21,body:e,loc:Nt}}function Bo(e,t){return e||t?ec:tc}function Ho(e,t){return e||t?Nd:Sd}function hc(e,{helper:t,removeHelper:n,inSSR:o}){e.isBlock||(e.isBlock=!0,n(Bo(o,e.isComponent)),t(uo),t(Ho(o,e.isComponent)))}var rd=new Uint8Array([123,123]),sd=new Uint8Array([125,125]);function id(e){return e>=97&&e<=122||e>=65&&e<=90}function bt(e){return e===32||e===10||e===9||e===12||e===13}function Mn(e){return e===47||e===62||bt(e)}function Li(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}var Je={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])},zl=class{constructor(t,n){this.stack=t,this.cbs=n,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=rd,this.delimiterClose=sd,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0}get inSFCRoot(){return this.mode===2&&this.stack.length===0}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=rd,this.delimiterClose=sd}getPos(t){let n=1,o=t+1,r=this.newlines.length,s=-1;if(r>100){let i=-1,a=r;for(;i+1<a;){let l=i+a>>>1;this.newlines[l]<t?i=l:a=l}s=i}else for(let i=r-1;i>=0;i--)if(t>this.newlines[i]){s=i;break}return s>=0&&(n=s+2,o=t-this.newlines[s]),{column:o,line:n,offset:t}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(t){t===60?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t))}stateInterpolationOpen(t){if(t===this.delimiterOpen[this.delimiterIndex])if(this.delimiterIndex===this.delimiterOpen.length-1){let n=this.index+1-this.delimiterOpen.length;n>this.sectionStart&&this.cbs.ontext(this.sectionStart,n),this.state=3,this.sectionStart=n}else this.delimiterIndex++;else this.inRCDATA?(this.state=32,this.stateInRCDATA(t)):(this.state=1,this.stateText(t))}stateInterpolation(t){t===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(t))}stateInterpolationClose(t){t===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(t))}stateSpecialStartSequence(t){let n=this.sequenceIndex===this.currentSequence.length;if(!(n?Mn(t):(t|32)===this.currentSequence[this.sequenceIndex]))this.inRCDATA=!1;else if(!n){this.sequenceIndex++;return}this.sequenceIndex=0,this.state=6,this.stateInTagName(t)}stateInRCDATA(t){if(this.sequenceIndex===this.currentSequence.length){if(t===62||bt(t)){let n=this.index-this.currentSequence.length;if(this.sectionStart<n){let o=this.index;this.index=n,this.cbs.ontext(this.sectionStart,n),this.index=o}this.sectionStart=n+2,this.stateInClosingTagName(t),this.inRCDATA=!1;return}this.sequenceIndex=0}(t|32)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:this.sequenceIndex===0?this.currentSequence===Je.TitleEnd||this.currentSequence===Je.TextareaEnd&&!this.inSFCRoot?!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t)):this.fastForwardTo(60)&&(this.sequenceIndex=1):this.sequenceIndex=+(t===60)}stateCDATASequence(t){t===Je.Cdata[this.sequenceIndex]?++this.sequenceIndex===Je.Cdata.length&&(this.state=28,this.currentSequence=Je.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(t))}fastForwardTo(t){for(;++this.index<this.buffer.length;){let n=this.buffer.charCodeAt(this.index);if(n===10&&this.newlines.push(this.index),n===t)return!0}return this.index=this.buffer.length-1,!1}stateInCommentLike(t){t===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===Je.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):this.sequenceIndex===0?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):t!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0)}startSpecial(t,n){this.enterRCDATA(t,n),this.state=31}enterRCDATA(t,n){this.inRCDATA=!0,this.currentSequence=t,this.sequenceIndex=n}stateBeforeTagName(t){t===33?(this.state=22,this.sectionStart=this.index+1):t===63?(this.state=24,this.sectionStart=this.index+1):id(t)?(this.sectionStart=this.index,this.mode===0?this.state=6:this.inSFCRoot?this.state=34:this.inXML?this.state=6:t===116?this.state=30:this.state=t===115?29:6):t===47?this.state=8:(this.state=1,this.stateText(t))}stateInTagName(t){Mn(t)&&this.handleTagName(t)}stateInSFCRootTagName(t){if(Mn(t)){let n=this.buffer.slice(this.sectionStart,this.index);n!=="template"&&this.enterRCDATA(Li("</"+n),0),this.handleTagName(t)}}handleTagName(t){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)}stateBeforeClosingTagName(t){bt(t)||(t===62?(this.state=1,this.sectionStart=this.index+1):(this.state=id(t)?9:27,this.sectionStart=this.index))}stateInClosingTagName(t){(t===62||bt(t))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(t))}stateAfterClosingTagName(t){t===62&&(this.state=1,this.sectionStart=this.index+1)}stateBeforeAttrName(t){t===62?(this.cbs.onopentagend(this.index),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):t===47?this.state=7:t===60&&this.peek()===47?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):bt(t)||this.handleAttrStart(t)}handleAttrStart(t){t===118&&this.peek()===45?(this.state=13,this.sectionStart=this.index):t===46||t===58||t===64||t===35?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index)}stateInSelfClosingTag(t){t===62?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):bt(t)||(this.state=11,this.stateBeforeAttrName(t))}stateInAttrName(t){(t===61||Mn(t))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(t))}stateInDirName(t){t===61||Mn(t)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===58?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):t===46&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDirArg(t){t===61||Mn(t)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===91?this.state=15:t===46&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDynamicDirArg(t){t===93?this.state=14:(t===61||Mn(t))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(t))}stateInDirModifier(t){t===61||Mn(t)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===46&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1)}handleAttrNameEnd(t){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(t)}stateAfterAttrName(t){t===61?this.state=18:t===47||t===62?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)):bt(t)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(t))}stateBeforeAttrValue(t){t===34?(this.state=19,this.sectionStart=this.index+1):t===39?(this.state=20,this.sectionStart=this.index+1):bt(t)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(t))}handleInAttrValue(t,n){(t===n||this.fastForwardTo(n))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(n===34?3:2,this.index+1),this.state=11)}stateInAttrValueDoubleQuotes(t){this.handleInAttrValue(t,34)}stateInAttrValueSingleQuotes(t){this.handleInAttrValue(t,39)}stateInAttrValueNoQuotes(t){bt(t)||t===62?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(t)):(t===39||t===60||t===61||t===96)&&this.cbs.onerr(18,this.index)}stateBeforeDeclaration(t){t===91?(this.state=26,this.sequenceIndex=0):this.state=t===45?25:23}stateInDeclaration(t){(t===62||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1)}stateInProcessingInstruction(t){(t===62||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeComment(t){t===45?(this.state=28,this.currentSequence=Je.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23}stateInSpecialComment(t){(t===62||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeSpecialS(t){t===Je.ScriptEnd[3]?this.startSpecial(Je.ScriptEnd,4):t===Je.StyleEnd[3]?this.startSpecial(Je.StyleEnd,4):(this.state=6,this.stateInTagName(t))}stateBeforeSpecialT(t){t===Je.TitleEnd[3]?this.startSpecial(Je.TitleEnd,4):t===Je.TextareaEnd[3]?this.startSpecial(Je.TextareaEnd,4):(this.state=6,this.stateInTagName(t))}startEntity(){}stateInEntity(){}parse(t){for(this.buffer=t;this.index<this.buffer.length;){let n=this.buffer.charCodeAt(this.index);switch(n===10&&this.state!==33&&this.newlines.push(this.index),this.state){case 1:{this.stateText(n);break}case 2:{this.stateInterpolationOpen(n);break}case 3:{this.stateInterpolation(n);break}case 4:{this.stateInterpolationClose(n);break}case 31:{this.stateSpecialStartSequence(n);break}case 32:{this.stateInRCDATA(n);break}case 26:{this.stateCDATASequence(n);break}case 19:{this.stateInAttrValueDoubleQuotes(n);break}case 12:{this.stateInAttrName(n);break}case 13:{this.stateInDirName(n);break}case 14:{this.stateInDirArg(n);break}case 15:{this.stateInDynamicDirArg(n);break}case 16:{this.stateInDirModifier(n);break}case 28:{this.stateInCommentLike(n);break}case 27:{this.stateInSpecialComment(n);break}case 11:{this.stateBeforeAttrName(n);break}case 6:{this.stateInTagName(n);break}case 34:{this.stateInSFCRootTagName(n);break}case 9:{this.stateInClosingTagName(n);break}case 5:{this.stateBeforeTagName(n);break}case 17:{this.stateAfterAttrName(n);break}case 20:{this.stateInAttrValueSingleQuotes(n);break}case 18:{this.stateBeforeAttrValue(n);break}case 8:{this.stateBeforeClosingTagName(n);break}case 10:{this.stateAfterClosingTagName(n);break}case 29:{this.stateBeforeSpecialS(n);break}case 30:{this.stateBeforeSpecialT(n);break}case 21:{this.stateInAttrValueNoQuotes(n);break}case 7:{this.stateInSelfClosingTag(n);break}case 23:{this.stateInDeclaration(n);break}case 22:{this.stateBeforeDeclaration(n);break}case 25:{this.stateBeforeComment(n);break}case 24:{this.stateInProcessingInstruction(n);break}case 33:{this.stateInEntity();break}}this.index++}this.cleanup(),this.finish()}cleanup(){this.sectionStart!==this.index&&(this.state===1||this.state===32&&this.sequenceIndex===0?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):(this.state===19||this.state===20||this.state===21)&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index))}finish(){this.handleTrailingData(),this.cbs.onend()}handleTrailingData(){let t=this.buffer.length;this.sectionStart>=t||(this.state===28?this.currentSequence===Je.CdataEnd?this.cbs.oncdata(this.sectionStart,t):this.cbs.oncomment(this.sectionStart,t):this.state===6||this.state===11||this.state===18||this.state===17||this.state===12||this.state===13||this.state===14||this.state===15||this.state===16||this.state===20||this.state===19||this.state===21||this.state===9||this.cbs.ontext(this.sectionStart,t))}emitCodePoint(t,n){}};function ad(e,{compatConfig:t}){let n=t&&t[e];return e==="MODE"?n||3:n}function fo(e,t){let n=ad("MODE",t),o=ad(e,t);return n===3?o===!0:o!==!1}function jo(e,t,n,...o){return fo(e,t)}function mc(e){throw e}function Ad(e){}function _e(e,t,n,o){let r=`https://vuejs.org/error-reference/#compiler-${e}`,s=new SyntaxError(String(r));return s.code=e,s.loc=t,s}var Qe=e=>e.type===4&&e.isStatic;function Dd(e){switch(e){case"Teleport":case"teleport":return Fr;case"Suspense":case"suspense":return Zl;case"KeepAlive":case"keep-alive":return Ri;case"BaseTransition":case"base-transition":return bd}}var s_=/^$|^\d|[^\$\w\xA0-\uFFFF]/,gc=e=>!s_.test(e),Id=/[A-Za-z_$\xA0-\uFFFF]/,i_=/[\.\?\w$\xA0-\uFFFF]/,a_=/\s+[.[]\s*|\s*[.[]\s+/g,kd=e=>e.type===4?e.content:e.loc.source,l_=e=>{let t=kd(e).trim().replace(a_,a=>a.trim()),n=0,o=[],r=0,s=0,i=null;for(let a=0;a<t.length;a++){let l=t.charAt(a);switch(n){case 0:if(l==="[")o.push(n),n=1,r++;else if(l==="(")o.push(n),n=2,s++;else if(!(a===0?Id:i_).test(l))return!1;break;case 1:l==="'"||l==='"'||l==="`"?(o.push(n),n=3,i=l):l==="["?r++:l==="]"&&(--r||(n=o.pop()));break;case 2:if(l==="'"||l==='"'||l==="`")o.push(n),n=3,i=l;else if(l==="(")s++;else if(l===")"){if(a===t.length-1)return!1;--s||(n=o.pop())}break;case 3:l===i&&(n=o.pop(),i=null);break}}return!r&&!s};var Vd=l_,c_=/^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/,f_=e=>c_.test(kd(e));var u_=f_;function ct(e,t,n=!1){for(let o=0;o<e.props.length;o++){let r=e.props[o];if(r.type===7&&(n||r.exp)&&(z(t)?r.name===t:t.test(r.name)))return r}}function Gr(e,t,n=!1,o=!1){for(let r=0;r<e.props.length;r++){let s=e.props[r];if(s.type===6){if(n)continue;if(s.name===t&&(s.value||o))return s}else if(s.name==="bind"&&(s.exp||o)&&$n(s.arg,t))return s}}function $n(e,t){return!!(e&&Qe(e)&&e.content===t)}function Rd(e){return e.props.some(t=>t.type===7&&t.name==="bind"&&(!t.arg||t.arg.type!==4||!t.arg.isStatic))}function Hl(e){return e.type===5||e.type===2}function ld(e){return e.type===7&&e.name==="pre"}function p_(e){return e.type===7&&e.name==="slot"}function $i(e){return e.type===1&&e.tagType===3}function Fi(e){return e.type===1&&e.tagType===2}var d_=new Set([Br,zr]);function Ec(e,t=[]){if(e&&!z(e)&&e.type===14){let n=e.callee;if(!z(n)&&d_.has(n))return Ec(e.arguments[0],t.concat(e))}return[e,t]}function Ui(e,t,n){if(e.type!==13&&h_(e,t))return;let o,r=e.type===13?e.props:e.arguments[2],s=[],i;if(r&&!z(r)&&r.type===14){let a=Ec(r);r=a[0],s=a[1],i=s[s.length-1]}if(r==null||z(r))o=It([t]);else if(r.type===14){let a=r.arguments[0];!z(a)&&a.type===15?Gl(t,a)||a.properties.unshift(t):r.callee===uc?o=Pe(n.helper(Pi),[It([t]),r]):r.arguments.unshift(It([t])),!o&&(o=r)}else r.type===15?(Gl(t,r)||r.properties.unshift(t),o=r):(o=Pe(n.helper(Pi),[It([t]),r]),i&&i.callee===zr&&(i=s[s.length-2]));e.type===13?i?i.arguments[0]=o:e.props=o:i?i.arguments[0]=o:e.arguments[2]=o}function h_(e,t){var n,o,r;if(t.key.type!==4||t.key.content!=="key")return!1;let s=e.arguments[2];if(s&&!z(s)){let[i]=Ec(s);if(i&&!z(i)&&i.type===15&&Gl(t,i))return!0}return(n=e.arguments)[2]||(n[2]="{}"),(o=e.arguments)[3]||(o[3]="undefined"),(r=e.arguments)[4]||(r[4]="undefined"),e.arguments[5]=t.value,!0}function Gl(e,t){let n=!1;if(e.key.type===4){let o=e.key.content;n=t.properties.some(r=>r.key.type===4&&r.key.content===o)}return n}function jr(e,t){return`_${t}_${e.replace(/[^\w]/g,(n,o)=>n==="-"?"_":e.charCodeAt(o).toString())}`}function m_(e){return e.type===14&&e.callee===dc?e.arguments[1].returns:e}var g_=/([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;function Pd(e){for(let t=0;t<e.length;t++)if(!bt(e.charCodeAt(t)))return!1;return!0}function vc(e){return e.type===2&&Pd(e.content)||e.type===12&&vc(e.content)}function Hi(e){return e.type===3||vc(e)}var Md={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:wn,isPreTag:wn,isIgnoreNewlineTag:wn,isCustomElement:wn,onError:mc,onWarn:Ad,comments:!1,prefixIdentifiers:!1},ue=Md,Wr=null,bn="",Ye=null,oe=null,lt="",yn=-1,ao=-1,_c=0,Ln=!1,ql=null,be=[],Te=new zl(be,{onerr:_n,ontext(e,t){Ci(We(e,t),e,t)},ontextentity(e,t,n){Ci(e,t,n)},oninterpolation(e,t){if(Ln)return Ci(We(e,t),e,t);let n=e+Te.delimiterOpen.length,o=t-Te.delimiterClose.length;for(;bt(bn.charCodeAt(n));)n++;for(;bt(bn.charCodeAt(o-1));)o--;let r=We(n,o);r.includes("&")&&(r=ue.decodeEntities(r,!1)),Jl({type:5,content:Ii(r,!1,Re(n,o)),loc:Re(e,t)})},onopentagname(e,t){let n=We(e,t);Ye={type:1,tag:n,ns:ue.getNamespace(n,be[0],ue.ns),tagType:0,props:[],children:[],loc:Re(e-1,t),codegenNode:void 0}},onopentagend(e){fd(e)},onclosetag(e,t){let n=We(e,t);if(!ue.isVoidTag(n)){let o=!1;for(let r=0;r<be.length;r++)if(be[r].tag.toLowerCase()===n.toLowerCase()){o=!0,r>0&&_n(24,be[0].loc.start.offset);for(let i=0;i<=r;i++){let a=be.shift();Di(a,t,i<r)}break}o||_n(23,Ld(e,60))}},onselfclosingtag(e){let t=Ye.tag;Ye.isSelfClosing=!0,fd(e),be[0]&&be[0].tag===t&&Di(be.shift(),e)},onattribname(e,t){oe={type:6,name:We(e,t),nameLoc:Re(e,t),value:void 0,loc:Re(e)}},ondirname(e,t){let n=We(e,t),o=n==="."||n===":"?"bind":n==="@"?"on":n==="#"?"slot":n.slice(2);if(!Ln&&o===""&&_n(26,e),Ln||o==="")oe={type:6,name:n,nameLoc:Re(e,t),value:void 0,loc:Re(e)};else if(oe={type:7,name:o,rawName:n,exp:void 0,arg:void 0,modifiers:n==="."?[Y("prop")]:[],loc:Re(e)},o==="pre"){Ln=Te.inVPre=!0,ql=Ye;let r=Ye.props;for(let s=0;s<r.length;s++)r[s].type===7&&(r[s]=w_(r[s]))}},ondirarg(e,t){if(e===t)return;let n=We(e,t);if(Ln&&!ld(oe))oe.name+=n,lo(oe.nameLoc,t);else{let o=n[0]!=="[";oe.arg=Ii(o?n:n.slice(1,-1),o,Re(e,t),o?3:0)}},ondirmodifier(e,t){let n=We(e,t);if(Ln&&!ld(oe))oe.name+="."+n,lo(oe.nameLoc,t);else if(oe.name==="slot"){let o=oe.arg;o&&(o.content+="."+n,lo(o.loc,t))}else{let o=Y(n,!0,Re(e,t));oe.modifiers.push(o)}},onattribdata(e,t){lt+=We(e,t),yn<0&&(yn=e),ao=t},onattribentity(e,t,n){lt+=e,yn<0&&(yn=t),ao=n},onattribnameend(e){let t=oe.loc.start.offset,n=We(t,e);oe.type===7&&(oe.rawName=n),Ye.props.some(o=>(o.type===7?o.rawName:o.name)===n)&&_n(2,t)},onattribend(e,t){if(Ye&&oe){if(lo(oe.loc,t),e!==0)if(lt.includes("&")&&(lt=ue.decodeEntities(lt,!0)),oe.type===6)oe.name==="class"&&(lt=Fd(lt).trim()),e===1&&!lt&&_n(13,t),oe.value={type:2,content:lt,loc:e===1?Re(yn,ao):Re(yn-1,ao+1)},Te.inSFCRoot&&Ye.tag==="template"&&oe.name==="lang"&&lt&&lt!=="html"&&Te.enterRCDATA(Li("</template"),0);else{let n=0;oe.exp=Ii(lt,!1,Re(yn,ao),0,n),oe.name==="for"&&(oe.forParseResult=v_(oe.exp));let o=-1;oe.name==="bind"&&(o=oe.modifiers.findIndex(r=>r.content==="sync"))>-1&&jo("COMPILER_V_BIND_SYNC",ue,oe.loc,oe.arg.loc.source)&&(oe.name="model",oe.modifiers.splice(o,1))}(oe.type!==7||oe.name!=="pre")&&Ye.props.push(oe)}lt="",yn=ao=-1},oncomment(e,t){ue.comments&&Jl({type:3,content:We(e,t),loc:Re(e-4,t+3)})},onend(){let e=bn.length;for(let t=0;t<be.length;t++)Di(be[t],e-1),_n(24,be[t].loc.start.offset)},oncdata(e,t){(be[0]?be[0].ns:ue.ns)!==0?Ci(We(e,t),e,t):_n(1,e-9)},onprocessinginstruction(e){(be[0]?be[0].ns:ue.ns)===0&&_n(21,e-1)}}),cd=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,E_=/^\(|\)$/g;function v_(e){let t=e.loc,n=e.content,o=n.match(g_);if(!o)return;let[,r,s]=o,i=(c,p,d=!1)=>{let v=t.start.offset+p,h=v+c.length;return Ii(c,!1,Re(v,h),0,d?1:0)},a={source:i(s.trim(),n.indexOf(s,r.length)),value:void 0,key:void 0,index:void 0,finalized:!1},l=r.trim().replace(E_,"").trim(),f=r.indexOf(l),u=l.match(cd);if(u){l=l.replace(cd,"").trim();let c=u[1].trim(),p;if(c&&(p=n.indexOf(c,f+l.length),a.key=i(c,p,!0)),u[2]){let d=u[2].trim();d&&(a.index=i(d,n.indexOf(d,a.key?p+c.length:f+l.length),!0))}}return l&&(a.value=i(l,f,!0)),a}function We(e,t){return bn.slice(e,t)}function fd(e){Te.inSFCRoot&&(Ye.innerLoc=Re(e+1,e+1)),Jl(Ye);let{tag:t,ns:n}=Ye;n===0&&ue.isPreTag(t)&&_c++,ue.isVoidTag(t)?Di(Ye,e):(be.unshift(Ye),(n===1||n===2)&&(Te.inXML=!0)),Ye=null}function Ci(e,t,n){{let s=be[0]&&be[0].tag;s!=="script"&&s!=="style"&&e.includes("&")&&(e=ue.decodeEntities(e,!1))}let o=be[0]||Wr,r=o.children[o.children.length-1];r&&r.type===2?(r.content+=e,lo(r.loc,n)):o.children.push({type:2,content:e,loc:Re(t,n)})}function Di(e,t,n=!1){n?lo(e.loc,Ld(t,60)):lo(e.loc,__(t,62)+1),Te.inSFCRoot&&(e.children.length?e.innerLoc.end=q({},e.children[e.children.length-1].loc.end):e.innerLoc.end=q({},e.innerLoc.start),e.innerLoc.source=We(e.innerLoc.start.offset,e.innerLoc.end.offset));let{tag:o,ns:r,children:s}=e;if(Ln||(o==="slot"?e.tagType=2:ud(e)?e.tagType=3:b_(e)&&(e.tagType=1)),Te.inRCDATA||(e.children=$d(s)),r===0&&ue.isIgnoreNewlineTag(o)){let i=s[0];i&&i.type===2&&(i.content=i.content.replace(/^\r?\n/,""))}r===0&&ue.isPreTag(o)&&_c--,ql===e&&(Ln=Te.inVPre=!1,ql=null),Te.inXML&&(be[0]?be[0].ns:ue.ns)===0&&(Te.inXML=!1);{let i=e.props;if(!Te.inSFCRoot&&fo("COMPILER_NATIVE_TEMPLATE",ue)&&e.tag==="template"&&!ud(e)){let l=be[0]||Wr,f=l.children.indexOf(e);l.children.splice(f,1,...e.children)}let a=i.find(l=>l.type===6&&l.name==="inline-template");a&&jo("COMPILER_INLINE_TEMPLATE",ue,a.loc)&&e.children.length&&(a.value={type:2,content:We(e.children[0].loc.start.offset,e.children[e.children.length-1].loc.end.offset),loc:a.loc})}}function __(e,t){let n=e;for(;bn.charCodeAt(n)!==t&&n<bn.length-1;)n++;return n}function Ld(e,t){let n=e;for(;bn.charCodeAt(n)!==t&&n>=0;)n--;return n}var y_=new Set(["if","else","else-if","for","slot"]);function ud({tag:e,props:t}){if(e==="template"){for(let n=0;n<t.length;n++)if(t[n].type===7&&y_.has(t[n].name))return!0}return!1}function b_({tag:e,props:t}){if(ue.isCustomElement(e))return!1;if(e==="component"||N_(e.charCodeAt(0))||Dd(e)||ue.isBuiltInComponent&&ue.isBuiltInComponent(e)||ue.isNativeTag&&!ue.isNativeTag(e))return!0;for(let n=0;n<t.length;n++){let o=t[n];if(o.type===6){if(o.name==="is"&&o.value){if(o.value.content.startsWith("vue:"))return!0;if(jo("COMPILER_IS_ON_ELEMENT",ue,o.loc))return!0}}else if(o.name==="bind"&&$n(o.arg,"is")&&jo("COMPILER_IS_ON_ELEMENT",ue,o.loc))return!0}return!1}function N_(e){return e>64&&e<91}var S_=/\r\n/g;function $d(e){let t=ue.whitespace!=="preserve",n=!1;for(let o=0;o<e.length;o++){let r=e[o];if(r.type===2)if(_c)r.content=r.content.replace(S_,`
`);else if(Pd(r.content)){let s=e[o-1]&&e[o-1].type,i=e[o+1]&&e[o+1].type;!s||!i||t&&(s===3&&(i===3||i===1)||s===1&&(i===3||i===1&&x_(r.content)))?(n=!0,e[o]=null):r.content=" "}else t&&(r.content=Fd(r.content))}return n?e.filter(Boolean):e}function x_(e){for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(n===10||n===13)return!0}return!1}function Fd(e){let t="",n=!1;for(let o=0;o<e.length;o++)bt(e.charCodeAt(o))?n||(t+=" ",n=!0):(t+=e[o],n=!1);return t}function Jl(e){(be[0]||Wr).children.push(e)}function Re(e,t){return{start:Te.getPos(e),end:t==null?t:Te.getPos(t),source:t==null?t:We(e,t)}}function T_(e){return{start:q({},e.start),end:q({},e.end),source:e.source}}function lo(e,t){e.end=Te.getPos(t),e.source=We(e.start.offset,t)}function w_(e){let t={type:6,name:e.rawName,nameLoc:Re(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){let n=e.exp.loc;n.end.offset<e.loc.end.offset&&(n.start.offset--,n.start.column--,n.end.offset++,n.end.column++),t.value={type:2,content:e.exp.content,loc:n}}return t}function Ii(e,t=!1,n,o=0,r=0){return Y(e,t,n,o)}function _n(e,t,n){ue.onError(_e(e,Re(t,t),void 0,n))}function O_(){Te.reset(),Ye=null,oe=null,lt="",yn=-1,ao=-1,be.length=0}function Ud(e,t){if(O_(),bn=e,ue=q({},Md),t){let r;for(r in t)t[r]!=null&&(ue[r]=t[r])}Te.mode=ue.parseMode==="html"?1:ue.parseMode==="sfc"?2:0,Te.inXML=ue.ns===1||ue.ns===2;let n=t&&t.delimiters;n&&(Te.delimiterOpen=Li(n[0]),Te.delimiterClose=Li(n[1]));let o=Wr=n_([],e);return Te.parse(bn),o.loc=Re(0,e.length),o.children=$d(o.children),Wr=null,o}function C_(e,t){ki(e,void 0,t,!!Bd(e))}function Bd(e){let t=e.children.filter(n=>n.type!==3);return t.length===1&&t[0].type===1&&!Fi(t[0])?t[0]:null}function ki(e,t,n,o=!1,r=!1){let{children:s}=e,i=[];for(let u=0;u<s.length;u++){let c=s[u];if(c.type===1&&c.tagType===0){let p=o?0:ft(c,n);if(p>0){if(p>=2){c.codegenNode.patchFlag=-1,i.push(c);continue}}else{let d=c.codegenNode;if(d.type===13){let v=d.patchFlag;if((v===void 0||v===512||v===1)&&jd(c,n)>=2){let h=Wd(c);h&&(d.props=n.hoist(h))}d.dynamicProps&&(d.dynamicProps=n.hoist(d.dynamicProps))}}}else if(c.type===12&&(o?0:ft(c,n))>=2){c.codegenNode.type===14&&c.codegenNode.arguments.length>0&&c.codegenNode.arguments.push("-1"),i.push(c);continue}if(c.type===1){let p=c.tagType===1;p&&n.scopes.vSlot++,ki(c,e,n,!1,r),p&&n.scopes.vSlot--}else if(c.type===11)ki(c,e,n,c.children.length===1,!0);else if(c.type===9)for(let p=0;p<c.branches.length;p++)ki(c.branches[p],e,n,c.branches[p].children.length===1,r)}let a=!1;if(i.length===s.length&&e.type===1){if(e.tagType===0&&e.codegenNode&&e.codegenNode.type===13&&H(e.codegenNode.children))e.codegenNode.children=l(co(e.codegenNode.children)),a=!0;else if(e.tagType===1&&e.codegenNode&&e.codegenNode.type===13&&e.codegenNode.children&&!H(e.codegenNode.children)&&e.codegenNode.children.type===15){let u=f(e.codegenNode,"default");u&&(u.returns=l(co(u.returns)),a=!0)}else if(e.tagType===3&&t&&t.type===1&&t.tagType===1&&t.codegenNode&&t.codegenNode.type===13&&t.codegenNode.children&&!H(t.codegenNode.children)&&t.codegenNode.children.type===15){let u=ct(e,"slot",!0),c=u&&u.arg&&f(t.codegenNode,u.arg);c&&(c.returns=l(co(c.returns)),a=!0)}}if(!a)for(let u of i)u.codegenNode=n.cache(u.codegenNode);function l(u){let c=n.cache(u);return c.needArraySpread=!0,c}function f(u,c){if(u.children&&!H(u.children)&&u.children.type===15){let p=u.children.properties.find(d=>d.key===c||d.key.content===c);return p&&p.value}}i.length&&n.transformHoist&&n.transformHoist(s,n,e)}function ft(e,t){let{constantCache:n}=t;switch(e.type){case 1:if(e.tagType!==0)return 0;let o=n.get(e);if(o!==void 0)return o;let r=e.codegenNode;if(r.type!==13||r.isBlock&&e.tag!=="svg"&&e.tag!=="foreignObject"&&e.tag!=="math")return 0;if(r.patchFlag===void 0){let i=3,a=jd(e,t);if(a===0)return n.set(e,0),0;a<i&&(i=a);for(let l=0;l<e.children.length;l++){let f=ft(e.children[l],t);if(f===0)return n.set(e,0),0;f<i&&(i=f)}if(i>1)for(let l=0;l<e.props.length;l++){let f=e.props[l];if(f.type===7&&f.name==="bind"&&f.exp){let u=ft(f.exp,t);if(u===0)return n.set(e,0),0;u<i&&(i=u)}}if(r.isBlock){for(let l=0;l<e.props.length;l++)if(e.props[l].type===7)return n.set(e,0),0;t.removeHelper(uo),t.removeHelper(Ho(t.inSSR,r.isComponent)),r.isBlock=!1,t.helper(Bo(t.inSSR,r.isComponent))}return n.set(e,i),i}else return n.set(e,0),0;case 2:case 3:return 3;case 9:case 11:case 10:return 0;case 5:case 12:return ft(e.content,t);case 4:return e.constType;case 8:let s=3;for(let i=0;i<e.children.length;i++){let a=e.children[i];if(z(a)||Ae(a))continue;let l=ft(a,t);if(l===0)return 0;l<s&&(s=l)}return s;case 20:return 2;default:return 0}}var A_=new Set([cc,fc,Br,zr]);function Hd(e,t){if(e.type===14&&!z(e.callee)&&A_.has(e.callee)){let n=e.arguments[0];if(n.type===4)return ft(n,t);if(n.type===14)return Hd(n,t)}return 0}function jd(e,t){let n=3,o=Wd(e);if(o&&o.type===15){let{properties:r}=o;for(let s=0;s<r.length;s++){let{key:i,value:a}=r[s],l=ft(i,t);if(l===0)return l;l<n&&(n=l);let f;if(a.type===4?f=ft(a,t):a.type===14?f=Hd(a,t):f=0,f===0)return f;f<n&&(n=f)}}return n}function Wd(e){let t=e.codegenNode;if(t.type===13)return t.props}function D_(e,{filename:t="",prefixIdentifiers:n=!1,hoistStatic:o=!1,hmr:r=!1,cacheHandlers:s=!1,nodeTransforms:i=[],directiveTransforms:a={},transformHoist:l=null,isBuiltInComponent:f=De,isCustomElement:u=De,expressionPlugins:c=[],scopeId:p=null,slotted:d=!0,ssr:v=!1,inSSR:h=!1,ssrCssVars:N="",bindingMetadata:C=ee,inline:y=!1,isTS:E=!1,onError:b=mc,onWarn:g=Ad,compatConfig:O}){let D=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),S={filename:t,selfName:D&&Tt(ce(D[1])),prefixIdentifiers:n,hoistStatic:o,hmr:r,cacheHandlers:s,nodeTransforms:i,directiveTransforms:a,transformHoist:l,isBuiltInComponent:f,isCustomElement:u,expressionPlugins:c,scopeId:p,slotted:d,ssr:v,inSSR:h,ssrCssVars:N,bindingMetadata:C,inline:y,isTS:E,onError:b,onWarn:g,compatConfig:O,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],cached:[],constantCache:new WeakMap,vForMemoKeyedNodes:new WeakSet,temps:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,grandParent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(T){let V=S.helpers.get(T)||0;return S.helpers.set(T,V+1),T},removeHelper(T){let V=S.helpers.get(T);if(V){let M=V-1;M?S.helpers.set(T,M):S.helpers.delete(T)}},helperString(T){return`_${Fo[S.helper(T)]}`},replaceNode(T){S.parent.children[S.childIndex]=S.currentNode=T},removeNode(T){let V=S.parent.children,M=T?V.indexOf(T):S.currentNode?S.childIndex:-1;!T||T===S.currentNode?(S.currentNode=null,S.onNodeRemoved()):S.childIndex>M&&(S.childIndex--,S.onNodeRemoved()),S.parent.children.splice(M,1)},onNodeRemoved:De,addIdentifiers(T){},removeIdentifiers(T){},hoist(T){z(T)&&(T=Y(T)),S.hoists.push(T);let V=Y(`_hoisted_${S.hoists.length}`,!1,T.loc,2);return V.hoisted=T,V},cache(T,V=!1,M=!1){let w=o_(S.cached.length,T,V,M);return S.cached.push(w),w}};return S.filters=new Set,S}function I_(e,t){let n=D_(e,t);ji(e,n),t.hoistStatic&&C_(e,n),t.ssr||k_(e,n),e.helpers=new Set([...n.helpers.keys()]),e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached,e.transformed=!0,e.filters=[...n.filters]}function k_(e,t){let{helper:n}=t,{children:o}=e;if(o.length===1){let r=Bd(e);if(r&&r.codegenNode){let s=r.codegenNode;s.type===13&&hc(s,t),e.codegenNode=s}else e.codegenNode=o[0]}else if(o.length>1){let r=64;e.codegenNode=Hr(t,n(Ur),void 0,e.children,r,void 0,void 0,!0,void 0,!1)}}function V_(e,t){let n=0,o=()=>{n--};for(;n<e.children.length;n++){let r=e.children[n];z(r)||(t.grandParent=t.parent,t.parent=e,t.childIndex=n,t.onNodeRemoved=o,ji(r,t))}}function ji(e,t){t.currentNode=e;let{nodeTransforms:n}=t,o=[];for(let s=0;s<n.length;s++){let i=n[s](e,t);if(i&&(H(i)?o.push(...i):o.push(i)),t.currentNode)e=t.currentNode;else return}switch(e.type){case 3:t.ssr||t.helper(Kr);break;case 5:t.ssr||t.helper(Xr);break;case 9:for(let s=0;s<e.branches.length;s++)ji(e.branches[s],t);break;case 10:case 11:case 1:case 0:V_(e,t);break}t.currentNode=e;let r=o.length;for(;r--;)o[r]()}function Kd(e,t){let n=z(e)?o=>o===e:o=>e.test(o);return(o,r)=>{if(o.type===1){let{props:s}=o;if(o.tagType===3&&s.some(p_))return;let i=[];for(let a=0;a<s.length;a++){let l=s[a];if(l.type===7&&n(l.name)){s.splice(a,1),a--;let f=t(o,l,r);f&&i.push(f)}}return i}}}var Wi="/*@__PURE__*/",Xd=e=>`${Fo[e]}: _${Fo[e]}`;function R_(e,{mode:t="function",prefixIdentifiers:n=t==="module",sourceMap:o=!1,filename:r="template.vue.html",scopeId:s=null,optimizeImports:i=!1,runtimeGlobalName:a="Vue",runtimeModuleName:l="vue",ssrRuntimeModuleName:f="vue/server-renderer",ssr:u=!1,isTS:c=!1,inSSR:p=!1}){let d={mode:t,prefixIdentifiers:n,sourceMap:o,filename:r,scopeId:s,optimizeImports:i,runtimeGlobalName:a,runtimeModuleName:l,ssrRuntimeModuleName:f,ssr:u,isTS:c,inSSR:p,source:e.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper(h){return`_${Fo[h]}`},push(h,N=-2,C){d.code+=h},indent(){v(++d.indentLevel)},deindent(h=!1){h?--d.indentLevel:v(--d.indentLevel)},newline(){v(d.indentLevel)}};function v(h){d.push(`
`+"  ".repeat(h),0)}return d}function P_(e,t={}){let n=R_(e,t);t.onContextCreated&&t.onContextCreated(n);let{mode:o,push:r,prefixIdentifiers:s,indent:i,deindent:a,newline:l,scopeId:f,ssr:u}=n,c=Array.from(e.helpers),p=c.length>0,d=!s&&o!=="module";M_(e,n);let h=u?"ssrRender":"render",C=(u?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ");if(r(`function ${h}(${C}) {`),i(),d&&(r("with (_ctx) {"),i(),p&&(r(`const { ${c.map(Xd).join(", ")} } = _Vue
`,-1),l())),e.components.length&&(jl(e.components,"component",n),(e.directives.length||e.temps>0)&&l()),e.directives.length&&(jl(e.directives,"directive",n),e.temps>0&&l()),e.filters&&e.filters.length&&(l(),jl(e.filters,"filter",n),l()),e.temps>0){r("let ");for(let y=0;y<e.temps;y++)r(`${y>0?", ":""}_temp${y}`)}return(e.components.length||e.directives.length||e.temps)&&(r(`
`,0),l()),u||r("return "),e.codegenNode?Ze(e.codegenNode,n):r("null"),d&&(a(),r("}")),a(),r("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}function M_(e,t){let{ssr:n,prefixIdentifiers:o,push:r,newline:s,runtimeModuleName:i,runtimeGlobalName:a,ssrRuntimeModuleName:l}=t,f=a,u=Array.from(e.helpers);if(u.length>0&&(r(`const _Vue = ${f}
`,-1),e.hoists.length)){let c=[ec,tc,Kr,nc,xd].filter(p=>u.includes(p)).map(Xd).join(", ");r(`const { ${c} } = _Vue
`,-1)}L_(e.hoists,t),s(),r("return ")}function jl(e,t,{helper:n,push:o,newline:r,isTS:s}){let i=n(t==="filter"?ic:t==="component"?oc:sc);for(let a=0;a<e.length;a++){let l=e[a],f=l.endsWith("__self");f&&(l=l.slice(0,-6)),o(`const ${jr(l,t)} = ${i}(${JSON.stringify(l)}${f?", true":""})${s?"!":""}`),a<e.length-1&&r()}}function L_(e,t){if(!e.length)return;t.pure=!0;let{push:n,newline:o}=t;o();for(let r=0;r<e.length;r++){let s=e[r];s&&(n(`const _hoisted_${r+1} = `),Ze(s,t),o())}t.pure=!1}function yc(e,t){let n=e.length>3||!1;t.push("["),n&&t.indent(),qr(e,t,n),n&&t.deindent(),t.push("]")}function qr(e,t,n=!1,o=!0){let{push:r,newline:s}=t;for(let i=0;i<e.length;i++){let a=e[i];z(a)?r(a,-3):H(a)?yc(a,t):Ze(a,t),i<e.length-1&&(n?(o&&r(","),s()):o&&r(", "))}}function Ze(e,t){if(z(e)){t.push(e,-3);return}if(Ae(e)){t.push(t.helper(e));return}switch(e.type){case 1:case 9:case 11:Ze(e.codegenNode,t);break;case 2:$_(e,t);break;case 4:zd(e,t);break;case 5:F_(e,t);break;case 12:Ze(e.codegenNode,t);break;case 8:Gd(e,t);break;case 3:B_(e,t);break;case 13:H_(e,t);break;case 14:W_(e,t);break;case 15:K_(e,t);break;case 17:X_(e,t);break;case 18:z_(e,t);break;case 19:G_(e,t);break;case 20:q_(e,t);break;case 21:qr(e.body,t,!0,!1);break;case 22:break;case 23:break;case 24:break;case 25:break;case 26:break;case 10:break;default:}}function $_(e,t){t.push(JSON.stringify(e.content),-3,e)}function zd(e,t){let{content:n,isStatic:o}=e;t.push(o?JSON.stringify(n):n,-3,e)}function F_(e,t){let{push:n,helper:o,pure:r}=t;r&&n(Wi),n(`${o(Xr)}(`),Ze(e.content,t),n(")")}function Gd(e,t){for(let n=0;n<e.children.length;n++){let o=e.children[n];z(o)?t.push(o,-3):Ze(o,t)}}function U_(e,t){let{push:n}=t;if(e.type===8)n("["),Gd(e,t),n("]");else if(e.isStatic){let o=gc(e.content)?e.content:JSON.stringify(e.content);n(o,-2,e)}else n(`[${e.content}]`,-3,e)}function B_(e,t){let{push:n,helper:o,pure:r}=t;r&&n(Wi),n(`${o(Kr)}(${JSON.stringify(e.content)})`,-3,e)}function H_(e,t){let{push:n,helper:o,pure:r}=t,{tag:s,props:i,children:a,patchFlag:l,dynamicProps:f,directives:u,isBlock:c,disableTracking:p,isComponent:d}=e,v;l&&(v=String(l)),u&&n(o(ac)+"("),c&&n(`(${o(uo)}(${p?"true":""}), `),r&&n(Wi);let h=c?Ho(t.inSSR,d):Bo(t.inSSR,d);n(o(h)+"(",-2,e),qr(j_([s,i,a,v,f]),t),n(")"),c&&n(")"),u&&(n(", "),Ze(u,t),n(")"))}function j_(e){let t=e.length;for(;t--&&e[t]==null;);return e.slice(0,t+1).map(n=>n||"null")}function W_(e,t){let{push:n,helper:o,pure:r}=t,s=z(e.callee)?e.callee:o(e.callee);r&&n(Wi),n(s+"(",-2,e),qr(e.arguments,t),n(")")}function K_(e,t){let{push:n,indent:o,deindent:r,newline:s}=t,{properties:i}=e;if(!i.length){n("{}",-2,e);return}let a=i.length>1||!1;n(a?"{":"{ "),a&&o();for(let l=0;l<i.length;l++){let{key:f,value:u}=i[l];U_(f,t),n(": "),Ze(u,t),l<i.length-1&&(n(","),s())}a&&r(),n(a?"}":" }")}function X_(e,t){yc(e.elements,t)}function z_(e,t){let{push:n,indent:o,deindent:r}=t,{params:s,returns:i,body:a,newline:l,isSlot:f}=e;f&&n(`_${Fo[pc]}(`),n("(",-2,e),H(s)?qr(s,t):s&&Ze(s,t),n(") => "),(l||a)&&(n("{"),o()),i?(l&&n("return "),H(i)?yc(i,t):Ze(i,t)):a&&Ze(a,t),(l||a)&&(r(),n("}")),f&&(e.isNonScopedSlot&&n(", undefined, true"),n(")"))}function G_(e,t){let{test:n,consequent:o,alternate:r,newline:s}=e,{push:i,indent:a,deindent:l,newline:f}=t;if(n.type===4){let c=!gc(n.content);c&&i("("),zd(n,t),c&&i(")")}else i("("),Ze(n,t),i(")");s&&a(),t.indentLevel++,s||i(" "),i("? "),Ze(o,t),t.indentLevel--,s&&f(),s||i(" "),i(": ");let u=r.type===19;u||t.indentLevel++,Ze(r,t),u||t.indentLevel--,s&&l(!0)}function q_(e,t){let{push:n,helper:o,indent:r,deindent:s,newline:i}=t,{needPauseTracking:a,needArraySpread:l}=e;l&&n("[...("),n(`_cache[${e.index}] || (`),a&&(r(),n(`${o(Mi)}(-1`),e.inVOnce&&n(", true"),n("),"),i(),n("(")),n(`_cache[${e.index}] = `),Ze(e.value,t),a&&(n(`).cacheIndex = ${e.index},`),i(),n(`${o(Mi)}(1),`),i(),n(`_cache[${e.index}]`),s()),n(")"),l&&n(")]")}var cN=new RegExp("\\b"+"arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b")+"\\b");var J_=Kd(/^(?:if|else|else-if)$/,(e,t,n)=>Y_(e,t,n,(o,r,s)=>{let i=n.parent.children,a=i.indexOf(o),l=0;for(;a-->=0;){let f=i[a];f&&f.type===9&&(l+=f.branches.length)}return()=>{if(s)o.codegenNode=dd(r,l,n);else{let f=Q_(o.codegenNode);f.alternate=dd(r,l+o.branches.length-1,n)}}}));function Y_(e,t,n,o){if(t.name!=="else"&&(!t.exp||!t.exp.content.trim())){let r=t.exp?t.exp.loc:e.loc;n.onError(_e(28,t.loc)),t.exp=Y("true",!1,r)}if(t.name==="if"){let r=pd(e,t),s={type:9,loc:T_(e.loc),branches:[r]};if(n.replaceNode(s),o)return o(s,r,!0)}else{let r=n.parent.children,s=[],i=r.indexOf(e);for(;i-->=-1;){let a=r[i];if(a&&Hi(a)){n.removeNode(a);continue}if(a&&a.type===9){(t.name==="else-if"||t.name==="else")&&a.branches[a.branches.length-1].condition===void 0&&n.onError(_e(30,e.loc)),n.removeNode();let l=pd(e,t);a.branches.push(l);let f=o&&o(a,l,!1);ji(l,n),f&&f(),n.currentNode=null}else n.onError(_e(30,e.loc));break}}}function pd(e,t){let n=e.tagType===3;return{type:10,loc:e.loc,condition:t.name==="else"?void 0:t.exp,children:n&&!ct(e,"for")?e.children:[e],userKey:Gr(e,"key"),isTemplateIf:n}}function dd(e,t,n){return e.condition?Xl(e.condition,hd(e,t,n),Pe(n.helper(Kr),['""',"true"])):hd(e,t,n)}function hd(e,t,n){let{helper:o}=n,r=Oe("key",Y(`${t}`,!1,Nt,2)),{children:s}=e,i=s[0];if(s.length!==1||i.type!==1)if(s.length===1&&i.type===11){let l=i.codegenNode;return Ui(l,r,n),l}else return Hr(n,o(Ur),It([r]),s,64,void 0,void 0,!0,!1,!1,e.loc);else{let l=i.codegenNode,f=m_(l);return f.type===13&&hc(f,n),Ui(f,r,n),l}}function Q_(e){for(;;)if(e.type===19)if(e.alternate.type===19)e=e.alternate;else return e;else e.type===20&&(e=e.value)}var Z_=Kd("for",(e,t,n)=>{let{helper:o,removeHelper:r}=n;return ey(e,t,n,s=>{let i=Pe(o(lc),[s.source]),a=$i(e),l=ct(e,"memo"),f=Gr(e,"key",!1,!0);f&&f.type;let u=f&&(f.type===6?f.value?Y(f.value.content,!0):void 0:f.exp),c=u?Oe("key",u):null,p=s.source.type===4&&s.source.constType>0,d=p?64:f?128:256;return s.codegenNode=Hr(n,o(Ur),void 0,i,d,void 0,void 0,!0,!p,!1,e.loc),()=>{var v;let h,{children:N}=s,C=N.length!==1||N[0].type!==1,y=Fi(e)?e:a&&e.children.length===1&&Fi(e.children[0])?e.children[0]:null;if(y)h=y.codegenNode,a&&c&&Ui(h,c,n);else if(C)h=Hr(n,o(Ur),c?It([c]):void 0,e.children,64,void 0,void 0,!0,void 0,!1);else{h=N[0].codegenNode,a&&c&&Ui(h,c,n);let E=!p||h.isBlockRequired===!0;h.isBlock!==E&&(h.isBlock?(r(uo),r(Ho(n.inSSR,h.isComponent))):r(Bo(n.inSSR,h.isComponent))),h.isBlock=E,h.isBlock?(o(uo),o(Ho(n.inSSR,h.isComponent))):(o(Bo(n.inSSR,h.isComponent)),h.needsPatch&&(h.patchFlag=((v=h.patchFlag)!=null?v:0)|512))}if(l){let E=Uo(Yl(s.parseResult,[Y("_cached")]));E.body=r_([kt(["const _memo = (",l.exp,")"]),kt(["if (_cached && _cached.el",...u?[" && _cached.key === (",u,")"]:[],` && ${n.helperString(Od)}(_cached, _memo)) return _cached`]),kt(["const _item = ",h]),Y("_item.memo = _memo"),Y("return _item")]),i.arguments.push(E,Y("_cache"),Y(String(n.cached.length))),n.cached.push(null)}else i.arguments.push(Uo(Yl(s.parseResult),h,!0))}})});function ey(e,t,n,o){if(!t.exp){n.onError(_e(31,t.loc));return}let r=t.forParseResult;if(!r){n.onError(_e(32,t.loc));return}qd(r,n);let{addIdentifiers:s,removeIdentifiers:i,scopes:a}=n,{source:l,value:f,key:u,index:c}=r,p={type:11,loc:t.loc,source:l,valueAlias:f,keyAlias:u,objectIndexAlias:c,parseResult:r,children:$i(e)?e.children:[e]};n.replaceNode(p),a.vFor++;let d=o&&o(p);return()=>{a.vFor--,d&&d()}}function qd(e,t){e.finalized||(e.finalized=!0)}function Yl({value:e,key:t,index:n},o=[]){return ty([e,t,n,...o])}function ty(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map((n,o)=>n||Y("_".repeat(o+1),!1))}var md=Y("undefined",!1),ny=(e,t)=>{if(e.type===1&&(e.tagType===1||e.tagType===3)){let n=ct(e,"slot");if(n)return n.exp,t.scopes.vSlot++,()=>{t.scopes.vSlot--}}};var oy=(e,t,n,o)=>Uo(e,n,!1,!0,n.length?n[0].loc:o);function ry(e,t,n=oy){t.helper(pc);let{children:o,loc:r}=e,s=[],i=[],a=t.scopes.vSlot>0||t.scopes.vFor>0,l=ct(e,"slot",!0);if(l){let{arg:N,exp:C}=l;N&&!Qe(N)&&(a=!0),s.push(Oe(N||Y("default",!0),n(C,void 0,o,r)))}let f=!1,u=!1,c=[],p=new Set,d=0;for(let N=0;N<o.length;N++){let C=o[N],y;if(!$i(C)||!(y=ct(C,"slot",!0))){C.type!==3&&c.push(C);continue}if(l){t.onError(_e(37,y.loc));break}f=!0;let{children:E,loc:b}=C,{arg:g=Y("default",!0),exp:O,loc:D}=y,S;Qe(g)?S=g?g.content:"default":a=!0;let T=ct(C,"for"),V=n(O,T,E,b),M,w;if(M=ct(C,"if"))a=!0,i.push(Xl(M.exp,Ai(g,V,d++),md));else if(w=ct(C,/^else(?:-if)?$/,!0)){let $=N,P;for(;$--&&(P=o[$],!!Hi(P)););if(P&&$i(P)&&ct(P,/^(?:else-)?if$/)){let W=i[i.length-1];for(;W.alternate.type===19;)W=W.alternate;W.alternate=w.exp?Xl(w.exp,Ai(g,V,d++),md):Ai(g,V,d++)}else t.onError(_e(30,w.loc))}else if(T){a=!0;let $=T.forParseResult;$?(qd($,t),i.push(Pe(t.helper(lc),[$.source,Uo(Yl($),Ai(g,V),!0)]))):t.onError(_e(32,T.loc))}else{if(S){if(p.has(S)){t.onError(_e(38,D));continue}p.add(S),S==="default"&&(u=!0)}s.push(Oe(g,V))}}if(!l){let N=(C,y)=>{let E=n(C,void 0,y,r);return t.compatConfig&&(E.isNonScopedSlot=!0),Oe("default",E)};f?c.length&&!c.every(vc)&&(u?t.onError(_e(39,c[0].loc)):s.push(N(void 0,c))):s.push(N(void 0,o))}let v=a?2:Vi(e.children)?3:1,h=It(s.concat(Oe("_",Y(v+"",!1))),r);return i.length&&(h=Pe(t.helper(wd),[h,co(i)])),{slots:h,hasDynamicSlots:a}}function Ai(e,t,n){let o=[Oe("name",e),Oe("fn",t)];return n!=null&&o.push(Oe("key",Y(String(n),!0))),It(o)}function Vi(e){for(let t=0;t<e.length;t++){let n=e[t];switch(n.type){case 1:if(n.tagType===2||Vi(n.children))return!0;break;case 9:if(Vi(n.branches))return!0;break;case 10:case 11:if(Vi(n.children))return!0;break}}return!1}var Jd=new WeakMap,sy=(e,t)=>function(){if(e=t.currentNode,!(e.type===1&&(e.tagType===0||e.tagType===1)))return;let{tag:o,props:r}=e,s=e.tagType===1,i=s?iy(e,t):`"${o}"`,a=ie(i)&&i.callee===rc,l,f,u=0,c,p,d,v=!1,h=!1,N=a||i===Fr||i===Zl||!s&&(o==="svg"||o==="foreignObject"||o==="math");if(r.length>0){let y=Yd(e,t,void 0,s,a);l=y.props,u=y.patchFlag,p=y.dynamicPropNames,v=y.needsPatch,h=y.isBlockRequired;let E=y.directives;d=E&&E.length?co(E.map(b=>ly(b,t))):void 0,y.shouldUseBlock&&(N=!0)}if(e.children.length>0)if(i===Ri&&(N=!0,u|=1024),s&&i!==Fr&&i!==Ri){let{slots:E,hasDynamicSlots:b}=ry(e,t);f=E,b&&(u|=1024)}else if(e.children.length===1&&i!==Fr){let E=e.children[0],b=E.type,g=b===5||b===8;g&&ft(E,t)===0&&(u|=1),g||b===2?f=E:f=e.children}else f=e.children;p&&p.length&&(c=cy(p));let C=e.codegenNode=Hr(t,i,l,f,u===0?void 0:u,c,d,!!N,!1,s,e.loc);v=v&&(u===0||u===32),v&&(C.needsPatch=!0),h&&(C.isBlockRequired=!0)};function iy(e,t,n=!1){let{tag:o}=e,r=Ql(o),s=Gr(e,"is",!1,!0);if(s)if(r||fo("COMPILER_IS_ON_ELEMENT",t)){let a;if(s.type===6?a=s.value&&Y(s.value.content,!0):(a=s.exp,a||(a=Y("is",!1,s.arg.loc))),a)return Pe(t.helper(rc),[a])}else s.type===6&&s.value.content.startsWith("vue:")&&(o=s.value.content.slice(4));let i=Dd(o)||t.isBuiltInComponent(o);return i?(n||t.helper(i),i):(t.helper(oc),t.components.add(o),jr(o,"component"))}function Yd(e,t,n=e.props,o,r,s=!1){let{tag:i,loc:a,children:l}=e,f=[],u=[],c=[],p=l.length>0,d=!1,v=!1,h=0,N=!1,C=!1,y=!1,E=!1,b=!1,g=!1,O=[],D=w=>{f.length&&(u.push(It(gd(f),a)),f=[]),w&&u.push(w)},S=()=>{t.scopes.vFor>0&&f.push(Oe(Y("ref_for",!0),Y("true")))},T=({key:w,value:$})=>{if(Qe(w)){let P=w.content,W=jt(P);if(W&&(!o||r)&&P.toLowerCase()!=="onclick"&&P!=="onUpdate:modelValue"&&!$t(P)&&(E=!0),W&&$t(P)&&(g=!0),P==="ref"&&(N=!0),W&&$.type===14&&($=$.arguments[0]),$.type===20||($.type===4||$.type===8)&&ft($,t)>0)return;P==="class"?C=!0:P==="style"?y=!0:P!=="ref"&&P!=="key"&&!O.includes(P)&&O.push(P),o&&(P==="class"||P==="style")&&!O.includes(P)&&O.push(P)}else b=!0};for(let w=0;w<n.length;w++){let $=n[w];if($.type===6){let{loc:P,name:W,nameLoc:j,value:ae}=$,pe=!0;if(W==="ref"&&(N=!0,S()),W==="is"&&(Ql(i)||ae&&ae.content.startsWith("vue:")||fo("COMPILER_IS_ON_ELEMENT",t)))continue;f.push(Oe(Y(W,!0,j),Y(ae?ae.content:"",pe,ae?ae.loc:P)))}else{let{name:P,arg:W,exp:j,loc:ae,modifiers:pe}=$,he=P==="bind",se=P==="on";if(P==="slot"){o||t.onError(_e(40,ae));continue}if(P==="once"||P==="memo"||P==="is"||he&&$n(W,"is")&&(Ql(i)||fo("COMPILER_IS_ON_ELEMENT",t))||se&&s)continue;if(he&&$n(W,"key")&&(d=!0),se&&p&&W&&Qe(W)&&ce(W.content)==="vue:beforeUpdate"&&(d=!0,v=!0),he&&$n(W,"ref")&&S(),!W&&(he||se)){if(b=!0,j)if(he){if(D(),fo("COMPILER_V_BIND_OBJECT_ORDER",t)){u.unshift(j);continue}S(),D(),u.push(j)}else D({type:14,loc:ae,callee:t.helper(uc),arguments:o?[j]:[j,"true"]});else t.onError(_e(he?34:35,ae));continue}he&&pe.some(Ee=>Ee.content==="prop")&&(h|=32);let Me=t.directiveTransforms[P];if(Me){let{props:Ee,needRuntime:et}=Me($,e,t);!s&&Ee.forEach(T),se&&W&&!Qe(W)?D(It(Ee,a)):f.push(...Ee),et&&(c.push($),Ae(et)&&Jd.set($,et))}else xa(P)||(c.push($),p&&(d=!0,v=!0))}}let V;u.length?(D(),u.length>1?V=Pe(t.helper(Pi),u,a):V=u[0]):f.length&&(V=It(gd(f),a)),b?h|=16:(C&&!o&&(h|=2),y&&!o&&(h|=4),O.length&&(h|=8),E&&(h|=32));let M=(h===0||h===32)&&(N||g||c.length>0);if(!d&&M&&(h|=512),!t.inSSR&&V)switch(V.type){case 15:let w=-1,$=-1,P=!1;for(let ae=0;ae<V.properties.length;ae++){let pe=V.properties[ae].key;Qe(pe)?pe.content==="class"?w=ae:pe.content==="style"&&($=ae):pe.isHandlerKey||(P=!0)}let W=V.properties[w],j=V.properties[$];P?V=Pe(t.helper(Br),[V]):(W&&!Qe(W.value)&&(W.value=Pe(t.helper(cc),[W.value])),j&&(y||j.value.type===4&&j.value.content.trim()[0]==="["||j.value.type===17)&&(j.value=Pe(t.helper(fc),[j.value])));break;case 14:break;default:V=Pe(t.helper(Br),[Pe(t.helper(zr),[V])]);break}return{props:V,directives:c,patchFlag:h,dynamicPropNames:O,shouldUseBlock:d,needsPatch:M,isBlockRequired:v}}function gd(e){let t=new Map,n=[];for(let o=0;o<e.length;o++){let r=e[o];if(r.key.type===8||!r.key.isStatic){n.push(r);continue}let s=r.key.content,i=t.get(s);i?(s==="style"||s==="class"||jt(s))&&ay(i,r):(t.set(s,r),n.push(r))}return n}function ay(e,t){e.value.type===17?e.value.elements.push(t.value):e.value=co([e.value,t.value],e.loc)}function ly(e,t){let n=[],o=Jd.get(e);o?n.push(t.helperString(o)):(t.helper(sc),t.directives.add(e.name),n.push(jr(e.name,"directive")));let{loc:r}=e;if(e.exp&&n.push(e.exp),e.arg&&(e.exp||n.push("void 0"),n.push(e.arg)),Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));let s=Y("true",!1,r);n.push(It(e.modifiers.map(i=>Oe(i,s)),r))}return co(n,e.loc)}function cy(e){let t="[";for(let n=0,o=e.length;n<o;n++)t+=JSON.stringify(e[n]),n<o-1&&(t+=", ");return t+"]"}function Ql(e){return e==="component"||e==="Component"}var fy=(e,t)=>{if(Fi(e)){let{children:n,loc:o}=e,{slotName:r,slotProps:s}=uy(e,t),i=[t.prefixIdentifiers?"_ctx.$slots":"$slots",r,"{}","undefined","true"],a=2;s&&(i[2]=s,a=3),n.length&&(i[3]=Uo([],n,!1,!1,o),a=4),t.scopeId&&!t.slotted&&(a=5),i.splice(a),e.codegenNode=Pe(t.helper(Td),i,o)}};function uy(e,t){let n='"default"',o,r=[];for(let s=0;s<e.props.length;s++){let i=e.props[s];if(i.type===6)i.value&&(i.name==="name"?n=JSON.stringify(i.value.content):(i.name=ce(i.name),r.push(i)));else if(i.name==="bind"&&$n(i.arg,"name")){if(i.exp)n=i.exp;else if(i.arg&&i.arg.type===4){let a=ce(i.arg.content);n=i.exp=Y(a,!1,i.arg.loc)}}else i.name==="bind"&&i.arg&&Qe(i.arg)&&(i.arg.content=ce(i.arg.content)),r.push(i)}if(r.length>0){let{props:s,directives:i}=Yd(e,t,r,!1,!1);o=s,i.length&&t.onError(_e(36,i[0].loc))}return{slotName:n,slotProps:o}}var bc=(e,t,n,o)=>{let{loc:r,modifiers:s,arg:i}=e;!e.exp&&!s.length&&n.onError(_e(35,r));let a;if(i.type===4)if(i.isStatic){let c=i.content;c.startsWith("vue:")&&(c=`vnode-${c.slice(4)}`);let p=t.tagType!==0||c.startsWith("vnode")||!/[A-Z]/.test(c)?sn(ce(c)):`on:${c}`;a=Y(p,!0,i.loc)}else a=kt([`${n.helperString(Kl)}(`,i,")"]);else a=i,a.children.unshift(`${n.helperString(Kl)}(`),a.children.push(")");let l=e.exp;l&&!l.content.trim()&&(l=void 0);let f=n.cacheHandlers&&!l&&!n.inVOnce;if(l){let c=Vd(l),p=!(c||u_(l)),d=l.content.includes(";");(p||f&&c)&&(l=kt([`${p?"$event":"(...args)"} => ${d?"{":"("}`,l,d?"}":")"]))}let u={props:[Oe(a,l||Y("() => {}",!1,r))]};return o&&(u=o(u)),f&&(u.props[0].value=n.cache(u.props[0].value)),u.props.forEach(c=>c.key.isHandlerKey=!0),u},py=(e,t,n)=>{let{modifiers:o,loc:r}=e,s=e.arg,{exp:i}=e;return i&&i.type===4&&!i.content.trim()&&(i=void 0),s.type!==4?(s.children.unshift("("),s.children.push(') || ""')):s.isStatic||(s.content=s.content?`${s.content} || ""`:'""'),o.some(a=>a.content==="camel")&&(s.type===4?s.isStatic?s.content=ce(s.content):s.content=`${n.helperString(Wl)}(${s.content})`:(s.children.unshift(`${n.helperString(Wl)}(`),s.children.push(")"))),n.inSSR||(o.some(a=>a.content==="prop")&&Ed(s,"."),o.some(a=>a.content==="attr")&&Ed(s,"^")),{props:[Oe(s,i)]}},Ed=(e,t)=>{e.type===4?e.isStatic?e.content=t+e.content:e.content=`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"))},dy=(e,t)=>{if(e.type===0||e.type===1||e.type===11||e.type===10)return()=>{let n=e.children,o,r=!1;for(let s=0;s<n.length;s++){let i=n[s];if(Hl(i)){r=!0;for(let a=s+1;a<n.length;a++){let l=n[a];if(Hl(l))o||(o=n[s]=kt([i],i.loc)),o.children.push(" + ",l),n.splice(a,1),a--;else{o=void 0;break}}}}if(!(!r||n.length===1&&(e.type===0||e.type===1&&e.tagType===0&&!e.props.find(s=>s.type===7&&!t.directiveTransforms[s.name])&&e.tag!=="template")))for(let s=0;s<n.length;s++){let i=n[s];if(Hl(i)||i.type===8){let a=[];(i.type!==2||i.content!==" ")&&a.push(i),!t.ssr&&ft(i,t)===0&&a.push("1"),n[s]={type:12,content:i,loc:i.loc,codegenNode:Pe(t.helper(nc),a)}}}}},vd=new WeakSet,hy=(e,t)=>{if(e.type===1&&ct(e,"once",!0))return vd.has(e)||t.inVOnce||t.inSSR?void 0:(vd.add(e),t.inVOnce=!0,t.helper(Mi),()=>{t.inVOnce=!1;let n=t.currentNode;n.codegenNode&&(n.codegenNode=t.cache(n.codegenNode,!0,!0))})},Nc=(e,t,n)=>{let{exp:o,arg:r}=e;if(!o)return n.onError(_e(41,e.loc)),$r();let s=o.loc.source.trim(),i=o.type===4?o.content:s,a=n.bindingMetadata[s];if(a==="props"||a==="props-aliased")return n.onError(_e(44,o.loc)),$r();if(a==="literal-const"||a==="setup-const")return n.onError(_e(45,o.loc)),$r();if(!i.trim()||!Vd(o))return n.onError(_e(42,o.loc)),$r();let l=r||Y("modelValue",!0),f=r?Qe(r)?`onUpdate:${ce(r.content)}`:kt(['"onUpdate:" + ',r]):"onUpdate:modelValue",u,c=n.isTS?"($event: any)":"$event";u=kt([`${c} => ((`,o,") = $event)"]);let p=[Oe(l,e.exp),Oe(f,u)];if(e.modifiers.length&&t.tagType===1){let d=e.modifiers.map(h=>h.content).map(h=>(gc(h)?h:JSON.stringify(h))+": true").join(", "),v=r?Qe(r)?`${r.content}Modifiers`:kt([r,' + "Modifiers"']):"modelModifiers";p.push(Oe(v,Y(`{ ${d} }`,!1,e.loc,2)))}return $r(p)};function $r(e=[]){return{props:e}}var my=/[\w).+\-_$\]]/,gy=(e,t)=>{fo("COMPILER_FILTERS",t)&&(e.type===5?Bi(e.content,t):e.type===1&&e.props.forEach(n=>{n.type===7&&n.name!=="for"&&n.exp&&Bi(n.exp,t)}))};function Bi(e,t){if(e.type===4)_d(e,t);else for(let n=0;n<e.children.length;n++){let o=e.children[n];typeof o=="object"&&(o.type===4?_d(o,t):o.type===8?Bi(o,t):o.type===5&&Bi(o.content,t))}}function _d(e,t){let n=e.content,o=!1,r=!1,s=!1,i=!1,a=0,l=0,f=0,u=0,c,p,d,v,h=[];for(d=0;d<n.length;d++)if(p=c,c=n.charCodeAt(d),o)c===39&&p!==92&&(o=!1);else if(r)c===34&&p!==92&&(r=!1);else if(s)c===96&&p!==92&&(s=!1);else if(i)c===47&&p!==92&&(i=!1);else if(c===124&&n.charCodeAt(d+1)!==124&&n.charCodeAt(d-1)!==124&&!a&&!l&&!f)v===void 0?(u=d+1,v=n.slice(0,d).trim()):N();else{switch(c){case 34:r=!0;break;case 39:o=!0;break;case 96:s=!0;break;case 40:f++;break;case 41:f--;break;case 91:l++;break;case 93:l--;break;case 123:a++;break;case 125:a--;break}if(c===47){let C=d-1,y;for(;C>=0&&(y=n.charAt(C),y===" ");C--);(!y||!my.test(y))&&(i=!0)}}v===void 0?v=n.slice(0,d).trim():u!==0&&N();function N(){h.push(n.slice(u,d).trim()),u=d+1}if(h.length){for(d=0;d<h.length;d++)v=Ey(v,h[d],t);e.content=v,e.ast=void 0}}function Ey(e,t,n){n.helper(ic);let o=t.indexOf("(");if(o<0)return n.filters.add(t),`${jr(t,"filter")}(${e})`;{let r=t.slice(0,o),s=t.slice(o+1);return n.filters.add(r),`${jr(r,"filter")}(${e}${s!==")"?","+s:s}`}}var yd=new WeakSet,vy=(e,t)=>{if(e.type===1){let n=ct(e,"memo");return!n||yd.has(e)||t.inSSR?void 0:(yd.add(e),()=>{let o=e.codegenNode||t.currentNode.codegenNode;o&&o.type===13&&(e.tagType!==1&&hc(o,t),e.codegenNode=Pe(t.helper(dc),[n.exp,Uo(void 0,o),"_cache",String(t.cached.length)]),t.cached.push(null))})}},_y=(e,t)=>{if(e.type===1){for(let n of e.props)if(n.type===7&&n.name==="bind"&&(!n.exp||n.exp.type===4&&!n.exp.content.trim())&&n.arg){let o=n.arg;if(o.type!==4||!o.isStatic)t.onError(_e(53,o.loc)),n.exp=Y("",!0,o.loc);else{let r=ce(o.content);(Id.test(r[0])||r[0]==="-")&&(n.exp=Y(r,!1,o.loc))}}}};function yy(e){return[[_y,hy,J_,vy,Z_,gy,fy,sy,ny,dy],{on:bc,bind:py,model:Nc}]}function Qd(e,t={}){let n=t.onError||mc,o=t.mode==="module";t.prefixIdentifiers===!0?n(_e(48)):o&&n(_e(49));let r=!1;t.cacheHandlers&&n(_e(50)),t.scopeId&&!o&&n(_e(51));let s=q({},t,{prefixIdentifiers:r}),i=z(e)?Ud(e,s):e,[a,l]=yy();return I_(i,q({},s,{nodeTransforms:[...a,...t.nodeTransforms||[]],directiveTransforms:q({},l,t.directiveTransforms||{})})),P_(i,s)}var Zd=()=>({props:[]});var th=Symbol(""),nh=Symbol(""),oh=Symbol(""),rh=Symbol(""),Sc=Symbol(""),sh=Symbol(""),ih=Symbol(""),ah=Symbol(""),xc=Symbol(""),lh=Symbol("");Cd({[th]:"vModelRadio",[nh]:"vModelCheckbox",[oh]:"vModelText",[rh]:"vModelSelect",[Sc]:"vModelDynamic",[sh]:"withModifiers",[ih]:"withKeys",[ah]:"vShow",[xc]:"Transition",[lh]:"TransitionGroup"});var Wo;function by(e,t=!1){return Wo||(Wo=document.createElement("div")),t?(Wo.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,Wo.children[0].getAttribute("foo")):(Wo.innerHTML=e,Wo.textContent)}var Ny={parseMode:"html",isVoidTag:Sf,isNativeTag:e=>wa(e)||Oa(e)||Ca(e),isPreTag:e=>e==="pre",isIgnoreNewlineTag:e=>e==="pre"||e==="textarea",decodeEntities:by,isBuiltInComponent:e=>{if(e==="Transition"||e==="transition")return xc;if(e==="TransitionGroup"||e==="transition-group")return lh},getNamespace(e,t,n){let o=t?t.ns:n;if(t&&o===2)if(t.tag==="annotation-xml"){if(e==="svg")return 1;t.props.some(r=>r.type===6&&r.name==="encoding"&&r.value!=null&&(r.value.content==="text/html"||r.value.content==="application/xhtml+xml"))&&(o=0)}else/^m(?:[ions]|text)$/.test(t.tag)&&e!=="mglyph"&&e!=="malignmark"&&(o=0);else t&&o===1&&(t.tag==="foreignObject"||t.tag==="desc"||t.tag==="title")&&(o=0);if(o===0){if(e==="svg")return 1;if(e==="math")return 2}return o}},Sy=e=>{e.type===1&&e.props.forEach((t,n)=>{t.type===6&&t.name==="style"&&t.value&&(e.props[n]={type:7,name:"bind",arg:Y("style",!0,t.loc),exp:xy(t.value.content,t.loc),modifiers:[],loc:t.loc})})},xy=(e,t)=>{let n=Ta(e);return Y(JSON.stringify(n),!1,t,3)};function Nn(e,t){return _e(e,t,void 0)}var Ty=(e,t,n)=>{let{exp:o,loc:r}=e;return o||n.onError(Nn(54,r)),t.children.length&&(n.onError(Nn(55,r)),t.children.length=0),{props:[Oe(Y("innerHTML",!0,r),o||Y("",!0))]}},wy=(e,t,n)=>{let{exp:o,loc:r}=e;return o||n.onError(Nn(56,r)),t.children.length&&(n.onError(Nn(57,r)),t.children.length=0),{props:[Oe(Y("textContent",!0),o?ft(o,n)>0?o:Pe(n.helperString(Xr),[o],r):Y("",!0))]}},Oy=(e,t,n)=>{let o=Nc(e,t,n);if(!o.props.length||t.tagType===1)return o;e.arg&&n.onError(Nn(59,e.arg.loc));function r(){let a=ct(t,"bind");a&&$n(a.arg,"value")&&n.onError(Nn(61,a.loc))}let{tag:s}=t,i=n.isCustomElement(s);if(s==="input"||s==="textarea"||s==="select"||i){let a=oh,l=!1;if(s==="input"||i){let f=Gr(t,"type");if(f){if(f.type===7)a=Sc;else if(f.value)switch(f.value.content){case"radio":a=th;break;case"checkbox":a=nh;break;case"file":l=!0,n.onError(Nn(60,e.loc));break;default:break}}else Rd(t)&&(a=Sc)}else s==="select"&&(a=rh);l||(o.needRuntime=n.helper(a))}else n.onError(Nn(58,e.loc));return o.props=o.props.filter(a=>!(a.key.type===4&&a.key.content==="modelValue")),o},Cy=Ue("passive,once,capture"),Ay=Ue("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),Dy=Ue("left,right"),ch=Ue("onkeyup,onkeydown,onkeypress"),Iy=(e,t,n,o)=>{let r=[],s=[],i=[];for(let a=0;a<t.length;a++){let l=t[a].content;l==="native"&&jo("COMPILER_V_ON_NATIVE",n,o)||Cy(l)?i.push(l):Dy(l)?Qe(e)?ch(e.content.toLowerCase())?r.push(l):s.push(l):(r.push(l),s.push(l)):Ay(l)?s.push(l):r.push(l)}return{keyModifiers:r,nonKeyModifiers:s,eventOptionModifiers:i}},eh=(e,t)=>Qe(e)&&e.content.toLowerCase()==="onclick"?Y(t,!0):e.type!==4?kt(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,ky=(e,t,n)=>bc(e,t,n,o=>{let{modifiers:r}=e;if(!r.length)return o;let{key:s,value:i}=o.props[0],{keyModifiers:a,nonKeyModifiers:l,eventOptionModifiers:f}=Iy(s,r,n,e.loc);if(l.includes("right")&&(s=eh(s,"onContextmenu")),l.includes("middle")&&(s=eh(s,"onMouseup")),l.length&&(i=Pe(n.helper(sh),[i,JSON.stringify(l)])),a.length&&(!Qe(s)||ch(s.content.toLowerCase()))&&(i=Pe(n.helper(ih),[i,JSON.stringify(a)])),f.length){let u=f.map(Tt).join("");s=Qe(s)?Y(`${s.content}${u}`,!0):kt(["(",s,`) + "${u}"`])}return{props:[Oe(s,i)]}}),Vy=(e,t,n)=>{let{exp:o,loc:r}=e;return o||n.onError(Nn(62,r)),{props:[],needRuntime:n.helper(ah)}},Ry=(e,t)=>{if(e.type===1&&e.tagType===1&&t.isBuiltInComponent(e.tag)===xc)return()=>{if(!e.children.length)return;let o=fh(e),r=e.children[0];if(r.type===1)for(let s of r.props)s.type===7&&s.name==="show"&&e.props.push({type:6,name:"persisted",nameLoc:e.loc,value:void 0,loc:e.loc})}};function fh(e){let t=e.children=e.children.filter(o=>!Hi(o)),n=t[0];return t.length!==1||n.type===11||n.type===9&&n.branches.some(fh)}var Py=(e,t)=>{e.type===1&&e.tagType===0&&(e.tag==="script"||e.tag==="style")&&t.removeNode()};var My=[Sy,Ry],Ly={cloak:Zd,html:Ty,text:wy,model:Oy,on:ky,show:Vy};function uh(e,t={}){return Qd(e,q({},Ny,t,{nodeTransforms:[Py,...My,...t.nodeTransforms||[]],directiveTransforms:q({},Ly,t.directiveTransforms||{}),transformHoist:null}))}var ph=Object.create(null);function $y(e,t){if(!z(e))if(e.nodeType)e=e.innerHTML;else return De;let n=_f(e,t),o=ph[n];if(o)return o;if(e[0]==="#"){let l=document.querySelector(e);e=l?l.innerHTML:""}let r=q({hoistStatic:!0,onError:void 0,onWarn:De},t);!r.isCustomElement&&typeof customElements<"u"&&(r.isCustomElement=l=>!!customElements.get(l));let{code:s}=uh(e,r);function i(l,f=!1){let u=f?l.message:`Template compilation error: ${l.message}`,c=l.loc&&bf(e,l.loc.start.offset,l.loc.end.offset);vi(c?`${u}
${c}`:u)}let a=new Function("Vue",s)(Bl);return a._rc=!0,ph[n]=a}Ol($y);var dh="tavern_language_vocab_v1",Tc="default";function hh(){return{activeBookId:Tc,books:[{id:Tc,name:"\u9ED8\u8BA4\u751F\u8BCD\u672C",createdAt:Date.now()}],items:[]}}var re=hh(),Fy=new Set;function Fn(){try{te().localStorage.setItem(dh,JSON.stringify(re))}catch(e){console.warn("[TavernLanguage] \u4FDD\u5B58\u751F\u8BCD\u672C\u5931\u8D25:",e)}Fy.forEach(e=>{try{e(re)}catch{}})}function mh(){try{let e=te().localStorage.getItem(dh);if(e){let t=JSON.parse(e);if(t&&Array.isArray(t.books)&&Array.isArray(t.items))return t.books.length===0&&t.books.push({id:Tc,name:"\u9ED8\u8BA4\u751F\u8BCD\u672C",createdAt:Date.now()}),t.books.some(n=>n.id===t.activeBookId)||(t.activeBookId=t.books[0].id),re=t,re}}catch{}return re=hh(),re}function wc(){return re}function Ki(e,t){return`${String(t||"en").toLowerCase()}::${String(e||"").trim().toLowerCase()}`}function gh(e,t){let n=Ki(e,t);return re.items.find(o=>o.key===n)||null}function Xi(e){re.books.some(t=>t.id===e)&&(re.activeBookId=e,Fn())}function Eh(e){let t=String(e||"").trim();if(!t)return null;let n=`book_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,o={id:n,name:t,createdAt:Date.now()};return re.books.push(o),re.activeBookId=n,Fn(),o}function vh(e){if(re.books.length<=1)return!1;let t=re.books.findIndex(o=>o.id===e);if(t<0)return!1;re.books.splice(t,1);let n=re.books[0].id;return re.items.forEach(o=>{o.bookId===e&&(o.bookId=n)}),re.activeBookId===e&&(re.activeBookId=n),Fn(),!0}function Oc(e){let t=String(e.word||"").trim(),n=String(e.lang||"en").toLowerCase();if(!t)return null;let o=Ki(t,n),r=e.bookId||re.activeBookId||re.books[0].id,s=re.items.find(a=>a.key===o);if(s)return s.bookId=r,e.phonetic&&(s.phonetic=e.phonetic),e.reading&&(s.reading=e.reading),e.briefCn&&(s.briefCn=e.briefCn),e.pos&&(s.pos=e.pos),e.context&&(s.context=e.context),e.audioUrl&&(s.audioUrl=e.audioUrl),s.updatedAt=Date.now(),Fn(),s;let i={id:`w_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,key:o,word:t,lang:n,bookId:r,phonetic:e.phonetic||"",reading:e.reading||"",pos:e.pos||"",briefCn:e.briefCn||"",context:e.context||"",audioUrl:e.audioUrl||"",createdAt:Date.now(),updatedAt:Date.now()};return re.items.unshift(i),Fn(),i}function zi(e,t=null){let n=-1;if(t){let o=Ki(e,t);n=re.items.findIndex(r=>r.key===o)}else n=re.items.findIndex(o=>o.id===e);return n<0?!1:(re.items.splice(n,1),Fn(),!0)}function _h(e,t){let n=re.items.find(o=>o.id===e);return!n||!re.books.some(o=>o.id===t)?!1:(n.bookId=t,n.updatedAt=Date.now(),Fn(),!0)}function yh(){return JSON.stringify(re,null,2)}function bh(e){let t=JSON.parse(e);if(!t||!Array.isArray(t.books)||!Array.isArray(t.items))throw new Error("\u65E0\u6548\u7684\u751F\u8BCD\u672C JSON \u683C\u5F0F");for(let n of t.books)n?.id&&n?.name&&!re.books.some(o=>o.id===n.id)&&re.books.push({id:n.id,name:n.name,createdAt:n.createdAt||Date.now()});for(let n of t.items){if(!n?.word||!n?.lang)continue;let o=Ki(n.word,n.lang);if(!re.items.some(r=>r.key===o)){let r=re.books.some(s=>s.id===n.bookId)?n.bookId:re.books[0].id;re.items.push({...n,key:o,bookId:r})}}return Fn(),re.items.length}var ne=fn({config:J(),vocab:wc(),popover:{visible:!1,loading:!1,word:"",lang:"en",contextSentence:"",entry:null,activeSourceId:"",sentenceTranslation:"",sentenceLoading:!1,showBookPicker:!1,placement:"below",style:{}},selection:{visible:!1,text:"",lang:"en",translation:"",loading:!1,style:{}},modal:{visible:!1,activeTab:"vocab"}});function Jr(){ne.config=JSON.parse(JSON.stringify(J()))}function Vt(){ne.vocab=JSON.parse(JSON.stringify(wc()))}function Nh(){Kc(),mh(),Jr(),Vt()}function po(e="general"){ne.modal.activeTab=e,ne.modal.visible=!0}function Cc(){ne.modal.visible=!1}var Ac="tl-option-language-settings",Dc="tl-option-vocab-book",Ko=null;function Uy(e){let t=e.getElementById("options");t&&(t.style.display="none")}function Sh(e,t,n,o,r){let s=e.createElement("a");return s.id=t,s.className="tl-ignore",s.innerHTML=`<i class="fa-lg fa-solid ${n}"></i><span>${o}</span>`,s.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),Uy(e),po(r)}),s}function xh(){let e=ge();e.getElementById("tl-settings-entry")?.remove(),e.getElementById("tl-options-entry")?.remove();let t=e.querySelector("#options .options-content")||e.getElementById("options_content")||e.getElementById("options");return t?(e.getElementById(Dc)||t.appendChild(Sh(e,Dc,"fa-star","\u6211\u7684\u751F\u8BCD\u672C","vocab")),e.getElementById(Ac)||t.appendChild(Sh(e,Ac,"fa-language","\u5916\u8BED\u5B66\u4E60\u8BBE\u7F6E","general")),!0):!1}function Th(){if(Ic(),xh())return;let e=0;Ko=setInterval(()=>{e++,(xh()||e>=20)&&(clearInterval(Ko),Ko=null)},500)}function Ic(){Ko&&(clearInterval(Ko),Ko=null);let e=ge();e.getElementById(Ac)?.remove(),e.getElementById(Dc)?.remove(),e.getElementById("tl-settings-entry")?.remove(),e.getElementById("tl-options-entry")?.remove()}var ho=new Map,Pt=new Map,Xo=new Map,Rc="tavern_language_dict_cache_v1",Ch=400,By=4e3,wh=!1,kc=null,Rt={noun:{abbr:"n.",cn:"\u540D\u8BCD",tone:"noun"},"proper noun":{abbr:"prop.n.",cn:"\u4E13\u6709\u540D\u8BCD",tone:"noun"},verb:{abbr:"v.",cn:"\u52A8\u8BCD",tone:"verb"},adjective:{abbr:"adj.",cn:"\u5F62\u5BB9\u8BCD",tone:"adj"},adverb:{abbr:"adv.",cn:"\u526F\u8BCD",tone:"adv"},pronoun:{abbr:"pron.",cn:"\u4EE3\u8BCD",tone:"other"},preposition:{abbr:"prep.",cn:"\u4ECB\u8BCD",tone:"other"},conjunction:{abbr:"conj.",cn:"\u8FDE\u8BCD",tone:"other"},interjection:{abbr:"int.",cn:"\u611F\u53F9\u8BCD",tone:"other"},article:{abbr:"art.",cn:"\u51A0\u8BCD",tone:"other"},determiner:{abbr:"det.",cn:"\u9650\u5B9A\u8BCD",tone:"other"},particle:{abbr:"part.",cn:"\u52A9\u8BCD",tone:"other"},expression:{abbr:"expr.",cn:"\u60EF\u7528\u8BED",tone:"other"},numeral:{abbr:"num.",cn:"\u6570\u8BCD",tone:"other"},prefix:{abbr:"pref.",cn:"\u524D\u7F00",tone:"other"},suffix:{abbr:"suff.",cn:"\u540E\u7F00",tone:"other"}};function Ke(e){let t=String(e||"").toLowerCase().trim();return Rt[t]?Rt[t]:t.includes("noun")?Rt.noun:t.includes("verb")?Rt.verb:t.includes("adj")?Rt.adjective:t.includes("adv")?Rt.adverb:t.includes("pron")?Rt.pronoun:t.includes("prep")?Rt.preposition:t.includes("conj")?Rt.conjunction:t.includes("interj")?Rt.interjection:t.includes("part")?Rt.particle:t.includes("expr")?Rt.expression:{abbr:e||"\u8BCD\u9879",cn:"",tone:"other"}}function Pc(){if(!wh){wh=!0;try{let e=te().localStorage.getItem(Rc);if(!e)return;let t=JSON.parse(e);if(Array.isArray(t))for(let[n,o]of t)n&&o&&Pt.set(n,o)}catch{}}}function Hy(){kc||(kc=setTimeout(()=>{kc=null;try{let e=[...Pt.entries()].slice(-Ch);te().localStorage.setItem(Rc,JSON.stringify(e))}catch{}},600))}function Oh(e,t){if(Pc(),Pt.has(e)&&Pt.delete(e),Pt.size>=Ch){let n=Pt.keys().next().value;Pt.delete(n)}Pt.set(e,t),Hy()}function jy(e,t){return new Promise((n,o)=>{let r=setTimeout(()=>o(new Error("\u8BCD\u5178\u8BF7\u6C42\u8D85\u65F6")),t);e.then(s=>{clearTimeout(r),n(s)},s=>{clearTimeout(r),o(s)})})}function Mt(e){if(!e||!e.id)throw new Error("[TavernLanguage] registerDictionary \u9700\u8981 id \u5B57\u6BB5");return ho.set(e.id,e),e}function Gi(e=null){let t=[...ho.values()];return e?t.filter(n=>n.languages.includes("*")||n.languages.includes(e)):t}function Ah(e){return ho.get(e)||null}function Dh(){Pt.clear(),Xo.clear();try{te().localStorage.removeItem(Rc)}catch{}}function Yr(e){let t=J(),n=ot(e),o=t.dictionaryChains?.[e];return(Array.isArray(o)&&o.length>0?o:n?.defaultDictionaries||["google-dict","wiktionary","ai-context"]).filter(s=>ho.has(s))}async function Wy(e){let t=J();if(!t.autoTranslateDict||!e||!Array.isArray(e.meanings))return e;let n=[];for(let o of e.meanings)for(let r of o.definitions||[])!r.cn&&r.text&&n.length<5&&n.push(r);if(n.length===0)return e;try{let o=n.map(i=>i.text).join(`
`),s=(await dt(o,{from:"en",to:"zh-CN",providerId:t.translator==="tavern-ai"?"google":t.translator})).split(/\r?\n/).map(i=>i.trim());s.length===n.length&&n.forEach((i,a)=>{i.cn=s[a]||""})}catch{}return e}async function Vc(e,t,n){let o=e.id==="ai-context"?15e3:By,r=await jy(e.lookup(t,n),o);return r&&r.meanings&&r.meanings.length>0?(r.sourceId=e.id,r.sourceName=e.name,r):null}function Ih(e,t=null){let n=String(e||"").trim();if(!n)return;let o=t||J().targetLang||"en",r=`auto|${o}|${n.toLowerCase()}`;Pc(),!(Pt.has(r)||Xo.has(r))&&Qr(n,{lang:o}).catch(()=>{})}async function Qr(e,t={}){let n=String(e||"").trim();if(!n)return null;Pc();let o=J(),r=t.lang||o.targetLang||"en",s=ot(r),i=t.sourceId||null,a=typeof t.onUpdate=="function"?t.onUpdate:null,l=`${i||"auto"}|${r}|${n.toLowerCase()}`;if(!t.bypassCache&&Pt.has(l)){let u=Pt.get(l);return a&&a(u,!1),u}if(!t.bypassCache&&Xo.has(l)){let u=await Xo.get(l);return u&&a&&a(u,!1),u}let f=(async()=>{let u=i?[i]:Yr(r),c={lang:r,langDef:s,context:t.context||"",config:o},p=i?u:u.filter(v=>v!=="ai-context"||u.length===1),d=null;if(p.length>=2&&!i){let v=p.slice(0,2).map(h=>{let N=ho.get(h);return N?Vc(N,n,c).then(C=>{if(!C)throw new Error("empty");return C}):Promise.reject(new Error("missing"))});try{d=await Promise.any(v)}catch{d=null}if(!d&&p.length>2)for(let h of p.slice(2)){let N=ho.get(h);if(N)try{if(d=await Vc(N,n,c),d)break}catch{}}}else for(let v of p){let h=ho.get(v);if(h)try{if(d=await Vc(h,n,c),d)break}catch(N){console.warn(`[TavernLanguage] \u8BCD\u5178 ${v} \u67E5\u8BCD\u5931\u8D25 (${n}):`,N?.message||N)}}if(d)return a&&a({...d},!1),d.meanings.some(h=>(h.definitions||[]).some(N=>!N.cn&&N.text))&&o.autoTranslateDict&&(await Wy(d),a&&a({...d},!1)),Oh(l,d),d;try{let v=await dt(n,{from:r,to:"zh-CN"});if(v){let h={word:n,phonetic:"",reading:"",audioUrl:"",briefCn:v,tags:[],sourceId:"fallback-translate",sourceName:"\u76F4\u8BD1",meanings:[{pos:"translation",posInfo:{abbr:"\u8BD1",cn:"\u76F4\u8BD1",tone:"other"},definitions:[{text:"",cn:v,example:""}]}]};return Oh(l,h),a&&a(h,!1),h}}catch{}return null})();Xo.set(l,f);try{return await f}finally{Xo.delete(l)}}var Qt=null,Zr=null,es=null,ts=null,Mc=0;function qi(){ne.popover.visible=!1,ne.popover.showBookPicker=!1,Qt&&(Qt.classList.remove("tl-word-active"),Qt=null)}function Ky(e){let t=te(),n=ge(),o=t.visualViewport?.width||t.innerWidth,r=t.visualViewport?.height||t.innerHeight,s=10,i=26,a=e.getBoundingClientRect(),l=a.top-i-s,f=r-(a.bottom+i)-s;if(l<210&&f<210){let N=n.getElementById("chat");if(N&&N.scrollHeight>N.clientHeight){let C=Math.round(r*.28),y=a.top-C;N.scrollTop+=y,a=e.getBoundingClientRect()}}let u=Math.max(s,a.top-i),c=Math.min(r-s,a.bottom+i),p=u-s,v=r-c-s>=p?"below":"above",h={};if(v==="below"){let N=Math.min(r-180,Math.round(c+6)),C=Math.max(170,Math.min(400,Math.round(r-N-s-6)));h.top=`${N}px`,h.bottom="auto",h.maxHeight=`${C}px`}else{let N=Math.min(r-180,Math.round(r-u+6)),C=Math.max(170,Math.min(400,Math.round(r-N-s-6)));h.bottom=`${N}px`,h.top="auto",h.maxHeight=`${C}px`}if(o<=640)h.left=`${s}px`,h.right=`${s}px`,h.width="auto";else{let N=Math.min(368,o-s*2),C=Math.max(s,Math.min(a.left+a.width/2-N/2,o-N-s));h.left=`${Math.round(C)}px`,h.right="auto",h.width=`${N}px`}return{placement:v,style:h}}async function kh(e,t=null){let n=e.dataset.tlWord||e.textContent||"",o=e.dataset.tlLang||J().targetLang||"en";if(!n.trim())return;Qt&&Qt!==e&&Qt.classList.remove("tl-word-active"),Qt=e,Qt.classList.add("tl-word-active");let r=qc(e),{placement:s,style:i}=Ky(e),a=++Mc,l=ne.popover;l.visible=!0,l.loading=!0,l.word=n,l.lang=o,l.contextSentence=r,l.entry=null,l.activeSourceId=t||"",l.sentenceTranslation="",l.sentenceLoading=!1,l.showBookPicker=!1,l.placement=s,l.style=i,!t&&J().autoSpeakWord&&yo(n,{lang:o}).catch(()=>{});let f=await Qr(n,{lang:o,context:r,sourceId:t,onUpdate(u,c){a!==Mc||!ne.popover.visible||(l.entry=u,l.loading=c,u?.sourceId&&(l.activeSourceId=t||u.sourceId),!t&&J().autoSpeakWord&&u?.audioUrl&&yo(n,{lang:o,audioUrl:u.audioUrl}).catch(()=>{}))}});a!==Mc||!ne.popover.visible||(l.loading=!1,f&&(l.entry=f,l.activeSourceId=t||f.sourceId||""))}function Vh(){Lc();let e=ge();Zr=t=>{if(t.target?.closest?.(".tl-popover, .tl-sel-bar, .tl-modal-backdrop"))return;let n=t.target?.closest?.("span.tl-word");if(n&&J().enabled){if(!lf(t))return;t.stopPropagation(),kh(n);return}ne.popover.visible&&qi()},es=t=>{if(!J().enabled)return;let n=t.target?.closest?.("span.tl-word");if(!n)return;let o=n.dataset.tlWord||n.textContent||"",r=n.dataset.tlLang||J().targetLang||"en";o.trim()&&Ih(o,r)},ts=t=>{t.key==="Escape"&&ne.popover.visible&&qi()},e.addEventListener("pointerdown",es,{passive:!0}),e.addEventListener("click",Zr,!1),e.addEventListener("keydown",ts,!1)}function Lc(){qi();let e=ge();es&&(e.removeEventListener("pointerdown",es),es=null),Zr&&(e.removeEventListener("click",Zr,!1),Zr=null),ts&&(e.removeEventListener("keydown",ts,!1),ts=null)}var Rh=at({name:"WordPopover",setup(){let e=ne.popover,t=Fe(()=>Yr(e.lang).map(v=>Ah(v)).filter(Boolean)),n=Fe(()=>(ne.vocab.items,gh(e.entry?.word||e.word,e.lang))),o=Fe(()=>ne.vocab.books||[]);function r(){return e.entry?.word||e.word}function s(){yo(r(),{lang:e.lang,audioUrl:e.entry?.audioUrl||""}).catch(()=>{})}function i(d){d&&tn(d,{lang:e.lang}).catch(()=>{})}function a(){e.contextSentence&&tn(e.contextSentence,{lang:e.lang}).catch(()=>{})}async function l(){if(!(!e.contextSentence||e.sentenceLoading)){e.sentenceLoading=!0,e.sentenceTranslation="";try{e.sentenceTranslation=await dt(e.contextSentence,{from:e.lang,to:"zh-CN"})}catch(d){e.sentenceTranslation=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${d?.message||"\u7F51\u7EDC\u5F02\u5E38"}`}finally{e.sentenceLoading=!1}}}function f(d){Qt&&kh(Qt,d)}function u(d){let v=e.entry?.meanings?.[0],h=v?.definitions?.[0];return{word:r(),lang:e.lang,bookId:d,phonetic:e.entry?.phonetic||"",reading:e.entry?.reading||"",pos:v?.posInfo?.abbr||v?.pos||"",briefCn:e.entry?.briefCn||h?.cn||h?.text||"",context:e.contextSentence||"",audioUrl:e.entry?.audioUrl||""}}function c(){let d=r();if(n.value)zi(d,e.lang),Vt(),Se(`\u5DF2\u79FB\u51FA\u751F\u8BCD\u672C\uFF1A${d}`,"info");else{let v=ne.vocab.activeBookId;Oc(u(v)),Vt();let h=o.value.find(N=>N.id===v)?.name||"\u751F\u8BCD\u672C";Se(`\u5DF2\u6536\u85CF\u5230\u300C${h}\u300D`,"success")}}function p(d){Xi(d),Oc(u(d)),Vt(),e.showBookPicker=!1;let v=o.value.find(h=>h.id===d)?.name||"\u751F\u8BCD\u672C";Se(`\u5DF2\u4FDD\u5B58\u5230\u300C${v}\u300D`,"success")}return{pop:e,sources:t,starredItem:n,books:o,closeWordPopover:qi,onSpeakWord:s,onSpeakExample:i,onSpeakSentence:a,onTranslateSentence:l,onSwitchSource:f,onToggleStar:c,onSaveToBook:p}},template:`
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
  `});var mo=null,ns=null,zo=null;function Ji(){ne.selection.visible=!1,ne.selection.text="",ne.selection.translation="",ne.selection.loading=!1}function Xy(e){let t=te(),n=t.visualViewport?.width||t.innerWidth,o=t.visualViewport?.height||t.innerHeight,r=10;if(n<=640)return e.top<110?{left:`${r}px`,right:`${r}px`,top:`${Math.min(o-90,Math.round(e.bottom+12))}px`}:{left:`${r}px`,right:`${r}px`,bottom:`${Math.max(r,Math.round(o-e.top+12))}px`};let s=310,i=Math.max(r,Math.min(e.left+e.width/2-s/2,n-s-r));return e.top<110?{left:`${Math.round(i)}px`,top:`${Math.min(o-80,Math.round(e.bottom+10))}px`}:{left:`${Math.round(i)}px`,bottom:`${Math.max(r,Math.round(o-e.top+10))}px`}}function zy(){if(!J().enabled){Ji();return}let t=te().getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return;let n=t.toString().replace(/\s+/g," ").trim();if(n.length<2)return;let o=t.getRangeAt(0),r=o.commonAncestorContainer.nodeType===1?o.commonAncestorContainer:o.commonAncestorContainer.parentElement;if(!r||!r.closest(".mes_text")||r.closest(".tl-trans-block, .tl-mes-footer"))return;let s=o.getBoundingClientRect();!s||s.width===0&&s.height===0||(ne.selection.text=n,ne.selection.lang=J().targetLang||"en",ne.selection.translation="",ne.selection.loading=!1,ne.selection.style=Xy(s),ne.selection.visible=!0)}function Ph(){$c();let e=ge();mo=t=>{t.target?.closest?.(".tl-sel-bar, .tl-popover, .tl-modal-backdrop")||(zo&&clearTimeout(zo),zo=setTimeout(zy,70))},ns=t=>{ne.selection.visible&&!t.target?.closest?.(".tl-sel-bar")&&Ji()},e.addEventListener("mouseup",mo,!1),e.addEventListener("touchend",mo,!1),e.addEventListener("mousedown",ns,!1)}function $c(){zo&&(clearTimeout(zo),zo=null),Ji();let e=ge();mo&&(e.removeEventListener("mouseup",mo,!1),e.removeEventListener("touchend",mo,!1),mo=null),ns&&(e.removeEventListener("mousedown",ns,!1),ns=null)}var Mh=at({name:"SelectionBar",setup(){let e=ne.selection;async function t(){if(!(!e.text||e.loading)){e.loading=!0,e.translation="";try{e.translation=await dt(e.text,{from:e.lang,to:"zh-CN"})}catch(r){e.translation=`\u7FFB\u8BD1\u5931\u8D25\uFF1A${r?.message||"\u7F51\u7EDC\u5F02\u5E38"}`}finally{e.loading=!1}}}function n(){e.text&&tn(e.text,{lang:e.lang}).catch(()=>{})}async function o(){try{await te().navigator.clipboard.writeText(e.text),Se("\u5DF2\u590D\u5236\u9009\u4E2D\u6587\u672C","success")}catch{Se("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236","warning")}}return{sel:e,onTranslate:t,onSpeak:n,onCopy:o,closeSelectionBar:Ji}},template:`
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
  `});var Lh=at({name:"VocabBookView",setup(){let e=Et("all"),t=Et("all"),n=Et(""),o=Et(""),r=Et(!1),s=Fe(()=>ne.vocab.books||[]),i=Fe(()=>(ne.vocab.items||[]).length),a=Fe(()=>ne.vocab.activeBookId),l=Fe(()=>vo()),f=Fe(()=>{let b=n.value.trim().toLowerCase();return(ne.vocab.items||[]).filter(g=>!(e.value!=="all"&&g.bookId!==e.value||t.value!=="all"&&g.lang!==t.value||b&&!`${g.word} ${g.briefCn} ${g.reading} ${g.context}`.toLowerCase().includes(b)))});function u(b){return(ne.vocab.items||[]).filter(g=>g.bookId===b).length}function c(){let b=o.value.trim();if(!b)return;let g=Eh(b);g&&(Vt(),e.value=g.id,o.value="",r.value=!1,Se(`\u5DF2\u65B0\u5EFA\u5355\u8BCD\u672C\u300C${g.name}\u300D`,"success"))}function p(b){Xi(b),Vt(),Se("\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u85CF\u5355\u8BCD\u672C","success")}function d(b){if(s.value.length<=1){Se("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u5355\u8BCD\u672C","warning");return}vh(b.id),Vt(),e.value===b.id&&(e.value="all"),Se(`\u5DF2\u5220\u9664\u300C${b.name}\u300D\uFF0C\u8BCD\u6761\u5DF2\u4FDD\u7559\u5230\u9ED8\u8BA4\u672C`,"info")}function v(b,g){_h(b.id,g.target.value),Vt(),Se("\u5DF2\u79FB\u52A8\u81F3\u76EE\u6807\u5355\u8BCD\u672C","success")}function h(b){zi(b.id),Vt()}function N(b){yo(b.word,{lang:b.lang,audioUrl:b.audioUrl}).catch(()=>{})}function C(b){b.context&&tn(b.context,{lang:b.lang}).catch(()=>{})}async function y(){try{await te().navigator.clipboard.writeText(yh()),Se("\u751F\u8BCD\u672C JSON \u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F","success")}catch{Se("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u526A\u8D34\u677F\u6743\u9650","warning")}}function E(){let g=te().prompt("\u8BF7\u7C98\u8D34\u4E4B\u524D\u5BFC\u51FA\u7684\u751F\u8BCD\u672C JSON\uFF1A");if(g)try{let O=bh(g);Vt(),Se(`\u5BFC\u5165\u6210\u529F\uFF0C\u5F53\u524D\u5171 ${O} \u6761\u751F\u8BCD`,"success")}catch(O){Se(`\u5BFC\u5165\u5931\u8D25\uFF1A${O?.message||"\u683C\u5F0F\u9519\u8BEF"}`,"error")}}return{selectedBookId:e,selectedLang:t,searchQuery:n,newBookName:o,showCreateBook:r,books:s,totalCount:i,activeBookId:a,languages:l,filteredItems:f,countByBook:u,onCreateBook:c,onSetDefaultBook:p,onDeleteBook:d,onMoveItem:v,onRemoveItem:h,onSpeakItem:N,onSpeakContext:C,onExport:y,onImport:E}},template:`
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
  `});var Gy=["details","blockquote","table","thinking","status",".status-bar","em","strong"],$h=at({name:"SettingsModal",components:{VocabBookView:Lh},setup(){let e=ne.modal,t=fn({enabled:!0,targetLang:"en",theme:"tavern",promptInjection:{enabled:!0,level:"B1",promptText:"",depth:0},dictionaryChains:{},autoTranslateDict:!0,autoSpeakWord:!1,translator:"google",customAi:{baseUrl:"",apiKey:"",model:""},tts:{engine:"auto",rate:1,enAccent:"us"},ui:{showWordUnderline:!0,autoShowMesButtons:!0},excludeText:""});function n(){let y=JSON.parse(JSON.stringify(J()));Object.assign(t,y),t.promptInjection.promptText=sa(y),t.excludeText=Yo(y.excludeSelectors).join(", ")}Po(()=>e.visible,y=>{y&&n()},{immediate:!0});let o=Fe(()=>vo()),r=Fe(()=>ps()),s=Fe(()=>ot(t.targetLang)),i=Fe(()=>s.value?.levels||[]),a=Fe(()=>{let y=t.targetLang,E=t.dictionaryChains?.[y];return Array.isArray(E)&&E.length>0?E:Yr(y)}),l=Fe(()=>{let y=Gi(t.targetLang),E=a.value;return[...E.map(b=>y.find(g=>g.id===b)).filter(Boolean),...y.filter(b=>!E.includes(b.id))]});function f(){let y=i.value;y.length&&!y.some(E=>E.id===t.promptInjection.level)&&(t.promptInjection.level=y[1]?.id||y[0].id),t.promptInjection.promptText=Zo(t.targetLang,t.promptInjection.level)}function u(){t.promptInjection.promptText=Zo(t.targetLang,t.promptInjection.level)}function c(){t.promptInjection.promptText=Zo(t.targetLang,t.promptInjection.level)}function p(y){return a.value.includes(y)}function d(y,E){let b=t.targetLang,g=[...a.value];if(E&&!g.includes(y))g.push(y);else if(!E){let O=g.indexOf(y);O>=0&&g.splice(O,1)}t.dictionaryChains={...t.dictionaryChains,[b]:g}}function v(y,E){let b=t.targetLang,g=[...a.value],O=g.indexOf(y),D=O+E;O>=0&&D>=0&&D<g.length&&([g[O],g[D]]=[g[D],g[O]],t.dictionaryChains={...t.dictionaryChains,[b]:g})}function h(y){let E=Yo(t.excludeText);E.includes(y)||(E.push(y),t.excludeText=E.join(", "))}function N(){Dh(),Zc(),Se("\u7F13\u5B58\u5DF2\u6E05\u7406","success")}function C(){let y=JSON.parse(JSON.stringify(t));y.excludeSelectors=Yo(t.excludeText),y.tts.rate=Number(t.tts.rate)||1,delete y.excludeText,is(y),Jr(),Cc(),Se("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58","success")}return{VERSION:Jo,QUICK_EXCLUDE_CHIPS:Gy,modal:e,draft:t,languages:o,translators:r,currentLangDef:s,currentLevels:i,orderedDictionaries:l,closeModal:Cc,onLangChange:f,onLevelChange:u,onResetPrompt:c,isDictEnabled:p,toggleDict:d,moveDict:v,addExcludeChip:h,onClearCache:N,onSave:C}},template:`
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
  `});var Fh="tl-vue-root",os=null,Un=null,qy=at({name:"TavernLanguageRoot",components:{WordPopover:Rh,SelectionBar:Mh,SettingsModal:$h},template:`
    <WordPopover />
    <SelectionBar />
    <SettingsModal />
  `});function Uh(){Fc();let e=ge();Un=e.createElement("div"),Un.id=Fh,Un.className="tl-ignore",e.body.appendChild(Un),os=Lr(qy),os.mount(Un)}function Fc(){if(os){try{os.unmount()}catch{}os=null}Un&&(Un.remove(),Un=null);let e=ge().getElementById(Fh);e&&e.remove()}var Bh=/([A-Za-z]+(?:['’][A-Za-z]+)?(?:-[A-Za-z]+)*)/g,NS=Sn({code:"en",name:"\u82F1\u8BED",nativeName:"English",bcp47:"en-US",googleCode:"en",wiktionaryLang:"English",youdaoLang:"en",defaultDictionaries:["google-dict","free-dict","wiktionary","ai-context"],levels:[{id:"A2",label:"A2 \u521D\u7EA7",desc:"Use simple A2-level English with short, clear sentences and high-frequency daily vocabulary."},{id:"B1",label:"B1 \u4E2D\u7EA7",desc:"Use natural B1-level intermediate English with everyday expressions and moderate sentence complexity."},{id:"B2",label:"B2 \u4E2D\u9AD8\u7EA7",desc:"Use rich, idiomatic B2-level upper-intermediate English with nuanced phrasing."},{id:"C1",label:"C1 \u9AD8\u7EA7",desc:"Use sophisticated C1-level advanced English with vivid literary vocabulary and natural idioms."},{id:"native",label:"\u6BCD\u8BED\u7EA7",desc:"Use completely natural, authentic native-level English matching the character and setting."}],tokenize(e){let t=[],n=0;Bh.lastIndex=0;let o;for(;(o=Bh.exec(e))!==null;){o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1});let r=o[0];t.push({text:r,lookup:r.replace(/’/g,"'"),isWord:r.length>=1}),n=o.index+r.length}return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: English]","Write your ENTIRE response strictly in English (dialogue, narration, actions, and thoughts). Do not translate into Chinese unless explicitly asked in-character.",(this.levels.find(o=>o.id===e)||this.levels[1]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var Jy=/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u3400-\u4DBFー]/,Hh=/([\u4E00-\u9FFF\u3400-\u4DBF]+[\u3040-\u309F]*|[\u30A0-\u30FFー]+|[\u3040-\u309F]{2,})/g,Yi=null;try{typeof Intl<"u"&&typeof Intl.Segmenter=="function"&&(Yi=new Intl.Segmenter("ja",{granularity:"word"}))}catch{Yi=null}var TS=Sn({code:"ja",name:"\u65E5\u8BED",nativeName:"\u65E5\u672C\u8A9E",bcp47:"ja-JP",googleCode:"ja",wiktionaryLang:"Japanese",youdaoLang:"ja",defaultDictionaries:["google-dict","jotoba","wiktionary","ai-context"],levels:[{id:"N5",label:"JLPT N5",desc:"Use beginner JLPT N5-level Japanese with simple grammar and basic everyday words."},{id:"N4",label:"JLPT N4",desc:"Use JLPT N4-level Japanese with clear conversational expressions."},{id:"N3",label:"JLPT N3",desc:"Use natural JLPT N3-level intermediate Japanese suitable for everyday conversation and light fiction."},{id:"N2",label:"JLPT N2",desc:"Use natural JLPT N2-level Japanese with rich expressions and nuanced tone."},{id:"native",label:"\u6BCD\u8BED\u7EA7",desc:"Use completely natural, authentic native Japanese matching the character personality and context."}],tokenize(e){if(Yi){let r=[];for(let s of Yi.segment(e)){let i=!!(s.isWordLike&&Jy.test(s.segment));r.push({text:s.segment,lookup:s.segment,isWord:i})}return r}let t=[],n=0;Hh.lastIndex=0;let o;for(;(o=Hh.exec(e))!==null;)o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1}),t.push({text:o[0],lookup:o[0],isWord:!0}),n=o.index+o[0].length;return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: Japanese]","Write your ENTIRE response strictly in Japanese (dialogue, narration, actions, and thoughts). Do not include Chinese translations or romaji unless explicitly asked.",(this.levels.find(o=>o.id===e)||this.levels[2]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var jh="A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0152\u0153\xC6\xE6",Wh=new RegExp(`([${jh}]+(?:-[${jh}]+)*)`,"g"),CS=Sn({code:"fr",name:"\u6CD5\u8BED",nativeName:"Fran\xE7ais",bcp47:"fr-FR",googleCode:"fr",wiktionaryLang:"French",youdaoLang:"fr",defaultDictionaries:["google-dict","wiktionary","ai-context"],levels:[{id:"A2",label:"A2 \u521D\u7EA7",desc:"Use clear A2-level French with simple sentences and everyday vocabulary."},{id:"B1",label:"B1 \u4E2D\u7EA7",desc:"Use natural B1-level intermediate French with common idiomatic expressions."},{id:"B2",label:"B2 \u4E2D\u9AD8\u7EA7",desc:"Use expressive, idiomatic B2-level French with natural nuance."},{id:"C1",label:"C1 \u9AD8\u7EA7",desc:"Use refined C1-level French with rich literary vocabulary and authentic turns of phrase."},{id:"native",label:"\u6BCD\u8BED\u7EA7",desc:"Use completely authentic, natural native-level French matching the character and atmosphere."}],tokenize(e){let t=[],n=0;Wh.lastIndex=0;let o;for(;(o=Wh.exec(e))!==null;){o.index>n&&t.push({text:e.slice(n,o.index),isWord:!1});let r=o[0];t.push({text:r,lookup:r,isWord:r.length>=1}),n=o.index+r.length}return n<e.length&&t.push({text:e.slice(n),isWord:!1}),t},buildPrompt(e,t){return["[Language Learning Mode: French]","Write your ENTIRE response strictly in French (dialogue, narration, actions, and thoughts). Do not translate into Chinese unless explicitly asked in-character.",(this.levels.find(o=>o.id===e)||this.levels[1]).desc,t?`Additional preference: ${t}`:""].filter(Boolean).join(`
`)}});var IS=Mt({id:"google-dict",name:"\u6781\u901F\u8BCD\u5178",description:"\u5355\u6B21\u8BF7\u6C42\u76F4\u51FA\u8BCD\u6027\u4E0E\u4E2D\u6587\u91CA\u4E49\uFF0C\u54CD\u5E94\u6700\u5FEB\uFF0C\u652F\u6301\u6240\u6709\u8BED\u79CD",languages:["*"],async lookup(e,{lang:t}){let o=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(t||"auto")}&tl=zh-CN&dt=t&dt=bd&dt=rm&q=${encodeURIComponent(e)}`,r=await fetch(o);if(!r.ok)return null;let s=await r.json();if(!Array.isArray(s))return null;let i=Array.isArray(s[0])?s[0].map(f=>Array.isArray(f)?f[0]:"").join("").trim():"",a="";if(Array.isArray(s[0])){for(let f of s[0])if(Array.isArray(f)&&typeof f[3]=="string"&&f[3].trim()){a=f[3].trim();break}}let l=[];if(Array.isArray(s[1]))for(let f of s[1]){if(!Array.isArray(f))continue;let u=f[0]||"",c=Array.isArray(f[1])?f[1].slice(0,6):[];c.length!==0&&l.push({pos:u,posInfo:Ke(u),definitions:[{cn:c.join("\uFF1B"),text:"",example:""}]})}return l.length===0&&i&&l.push({pos:"translation",posInfo:{abbr:"\u8BD1",cn:"\u91CA\u4E49",tone:"other"},definitions:[{cn:i,text:"",example:""}]}),l.length===0?null:{word:e,phonetic:"",reading:t==="ja"?a:"",audioUrl:"",briefCn:i,tags:[],meanings:l}}});var RS=Mt({id:"free-dict",name:"Free Dictionary",description:"\u82F1\u8BED\u6743\u5A01\u5F00\u6E90\u8BCD\u5178\uFF0C\u63D0\u4F9B\u97F3\u6807\u3001\u8BCD\u6027\u3001\u4F8B\u53E5\u4E0E\u771F\u4EBA\u53D1\u97F3",languages:["en"],async lookup(e,{config:t}){let n=e.toLowerCase().replace(/^['’]+|['’]+$/g,""),o=`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(n)}`,r=await fetch(o);if(!r.ok)return null;let s=await r.json();if(!Array.isArray(s)||s.length===0)return null;let i=s[0],a=t?.tts?.enAccent||"us",l=i.phonetic||"",f="",u=Array.isArray(i.phonetics)?i.phonetics:[];for(let p of u)if(!l&&p.text&&(l=p.text),p.audio){let d=p.audio.toLowerCase();if(f||(f=p.audio),a==="uk"&&d.includes("-uk")){f=p.audio,p.text&&(l=p.text);break}if(a==="us"&&d.includes("-us")){f=p.audio,p.text&&(l=p.text);break}}let c=[];for(let p of i.meanings||[]){let d=(p.definitions||[]).slice(0,3).map(v=>({text:v.definition||"",cn:"",example:v.example||""}));d.length>0&&c.push({pos:p.partOfSpeech||"",posInfo:Ke(p.partOfSpeech),definitions:d})}return c.length===0?null:{word:i.word||e,phonetic:l,reading:"",audioUrl:f,briefCn:"",tags:[],meanings:c}}});function Yy(e){if(!Array.isArray(e)||e.length===0)return{raw:"word",info:Ke("")};let t=e[0],n="";typeof t=="string"?n=t:t&&typeof t=="object"&&(n=Object.keys(t)[0]||"");let o=n.toLowerCase();return o.includes("noun")?{raw:"noun",info:Ke("noun")}:o.includes("verb")||o.includes("godan")||o.includes("ichidan")?{raw:"verb",info:Ke("verb")}:o.includes("adj")?{raw:"adjective",info:Ke("adjective")}:o.includes("adv")?{raw:"adverb",info:Ke("adverb")}:o.includes("part")?{raw:"particle",info:Ke("particle")}:o.includes("expr")?{raw:"expression",info:Ke("expression")}:{raw:n,info:Ke(n)}}var LS=Mt({id:"jotoba",name:"Jotoba",description:"\u65E5\u8BED\u8BCD\u5178\uFF0C\u542B\u5047\u540D\u8BFB\u97F3\u3001\u8BCD\u6027\u4E0E\u53D1\u97F3",languages:["ja"],async lookup(e){let t=await fetch("https://jotoba.de/api/search/words",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:e,language:"English",no_english:!1})});if(!t.ok)return null;let o=(await t.json())?.words;if(!Array.isArray(o)||o.length===0)return null;let r=o.find(c=>c.reading?.kanji===e||c.reading?.kana===e)||o[0],s=r.reading?.kanji||"",i=r.reading?.kana||"",a=r.audio?`https://jotoba.de${r.audio}`:"",l=[];r.common&&l.push("\u5E38\u7528\u8BCD");let f=new Map;for(let c of(r.senses||[]).slice(0,5)){let{raw:p,info:d}=Yy(c.pos),v=Array.isArray(c.glosses)?c.glosses.slice(0,4).join("; "):"";if(!v)continue;let h=d.abbr||p;f.has(h)||f.set(h,{pos:p,posInfo:d,definitions:[]}),f.get(h).definitions.push({text:v,cn:"",example:""})}let u=[...f.values()];return u.length===0?null:{word:s||i||e,phonetic:"",reading:i&&i!==s?i:"",audioUrl:a,briefCn:"",tags:l,meanings:u}}});function Kh(e){return String(e||"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g," ").trim()}var US=Mt({id:"wiktionary",name:"Wiktionary",description:"\u591A\u8BED\u79CD\u5F00\u6E90\u8BCD\u5178\uFF0C\u8986\u76D6\u82F1/\u65E5/\u6CD5\u53CA\u5C0F\u8BED\u79CD",languages:["*"],async lookup(e,{lang:t,langDef:n}){let o=[e];e!==e.toLowerCase()&&o.push(e.toLowerCase());let r=null,s=e;for(let l of o){let f=`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(l)}`,u=await fetch(f);if(u.ok){r=await u.json(),s=l;break}}if(!r||typeof r!="object")return null;let i=r[t]||r[n?.code]||null;if(!Array.isArray(i)||i.length===0)return null;let a=[];for(let l of i.slice(0,4)){let f=[];for(let u of(l.definitions||[]).slice(0,3)){let c=Kh(u.definition);if(!c)continue;let p=Array.isArray(u.examples)&&u.examples[0]?Kh(u.examples[0]):"";f.push({text:c,cn:"",example:p})}f.length>0&&a.push({pos:l.partOfSpeech||"",posInfo:Ke(l.partOfSpeech),definitions:f})}return a.length===0?null:{word:s,phonetic:"",reading:"",audioUrl:"",briefCn:"",tags:[n?.nativeName||t],meanings:a}}});async function Qy(e,t){let n=t?.customAi||{};if(n.apiKey&&n.baseUrl&&n.model){let r=`${n.baseUrl.replace(/\/+$/,"")}/chat/completions`,s=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n.apiKey}`},body:JSON.stringify({model:n.model,temperature:.2,messages:[{role:"system",content:'You are a concise multilingual dictionary. Respond ONLY in valid JSON: {"phonetic":"","reading":"","pos":"noun|verb|adjective|adverb|expression|other","briefCn":"","definitions":[{"cn":"","text":"","example":""}]}'},{role:"user",content:e}]})});if(!s.ok)throw new Error(`AI \u8BCD\u5178 HTTP ${s.status}`);return(await s.json())?.choices?.[0]?.message?.content||""}let o=Bn();if(o&&typeof o.generateRaw=="function")return await o.generateRaw({user_input:`${e}

\u8BF7\u4EC5\u8F93\u51FA\u5408\u6CD5 JSON\uFF08\u4E0D\u8981 markdown \u4EE3\u7801\u5757\uFF09\uFF1A{"phonetic":"","reading":"","pos":"noun","briefCn":"","definitions":[{"cn":"","text":"","example":""}]}`,should_stream:!1});throw new Error("\u672A\u914D\u7F6E\u81EA\u5B9A\u4E49 AI \u4E14\u9152\u9986\u5F53\u524D\u4E0D\u652F\u6301 generateRaw")}var WS=Mt({id:"ai-context",name:"AI \u7CBE\u8BB2",description:"\u7ED3\u5408\u5F53\u524D\u53E5\u5B50\u89E3\u6790\u8BCD\u6027\u4E0E\u8BED\u5883\u542B\u4E49",languages:["*"],async lookup(e,{langDef:t,context:n,config:o}){let r=[`Language: ${t?.name||"Foreign"} (${t?.nativeName||""})`,`Word: ${e}`,n?`Sentence context: "${n}"`:"","Give the base form/reading/IPA, part of speech, exact Chinese meaning in this context, a concise explanation, and one short example."].filter(Boolean).join(`
`),s=await Qy(r,o),i=String(s).match(/\{[\s\S]*\}/);if(!i)throw new Error("AI \u8BCD\u5178\u8FD4\u56DE\u683C\u5F0F\u65E0\u6CD5\u89E3\u6790");let a=JSON.parse(i[0]),l=Array.isArray(a.definitions)?a.definitions.slice(0,3).map(f=>({cn:f.cn||"",text:f.text||"",example:f.example||""})):[{cn:a.briefCn||"",text:"",example:""}];return{word:e,phonetic:a.phonetic||"",reading:a.reading||"",audioUrl:"",briefCn:a.briefCn||l[0]?.cn||"",tags:["AI \u8BED\u5883\u89E3\u6790"],meanings:[{pos:a.pos||"expression",posInfo:Ke(a.pos),definitions:l}]}}});async function Zy(e,t,n){let o=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(t)}&tl=${encodeURIComponent(n)}&dt=t&q=${encodeURIComponent(e)}`,r=await fetch(o);if(!r.ok)throw new Error(`Google HTTP ${r.status}`);let s=await r.json();if(!Array.isArray(s)||!Array.isArray(s[0]))throw new Error("Google \u8FD4\u56DE\u683C\u5F0F\u5F02\u5E38");return s[0].map(i=>Array.isArray(i)?i[0]:"").join("")}async function eb(e,t,n){let o=`https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${encodeURIComponent(t)}&tl=${encodeURIComponent(n)}&q=${encodeURIComponent(e)}`,r=await fetch(o);if(!r.ok)throw new Error(`Google-C5 HTTP ${r.status}`);let s=await r.json();if(Array.isArray(s)){if(typeof s[0]=="string")return s[0];if(Array.isArray(s[0])&&typeof s[0][0]=="string")return s[0][0]}throw new Error("Google-C5 \u8FD4\u56DE\u683C\u5F0F\u5F02\u5E38")}var zS=en({id:"google",name:"Google \u7FFB\u8BD1",description:"\u514D Key\u3001\u901F\u5EA6\u5FEB",async translate(e,{from:t="auto",to:n="zh-CN"}){let o=t==="auto"?"auto":t;try{return await Zy(e,o,n)}catch(r){try{return await eb(e,o,n)}catch{throw r}}}});var JS=en({id:"mymemory",name:"MyMemory",description:"\u514D\u8D39\u515C\u5E95\u7FFB\u8BD1",async translate(e,{from:t="en",to:n="zh-CN"}){let o=t==="auto"?"en":t,r=`https://api.mymemory.translated.net/get?q=${encodeURIComponent(e)}&langpair=${encodeURIComponent(o)}|${encodeURIComponent(n)}`,s=await fetch(r);if(!s.ok)throw new Error(`MyMemory HTTP ${s.status}`);let a=(await s.json())?.responseData?.translatedText;if(!a)throw new Error("MyMemory \u672A\u8FD4\u56DE\u8BD1\u6587");return a}});var ex=en({id:"custom-ai",name:"\u81EA\u5B9A\u4E49 AI",description:"\u4F7F\u7528\u81EA\u5B9A\u4E49 OpenAI \u517C\u5BB9\u63A5\u53E3\u7FFB\u8BD1",async translate(e,{from:t,to:n="\u7B80\u4F53\u4E2D\u6587",context:o,config:r}){let s=r?.customAi||{};if(!s.apiKey||!s.baseUrl||!s.model)throw new Error("\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u586B\u5199\u81EA\u5B9A\u4E49 AI \u7684 Base URL\u3001API Key \u4E0E\u6A21\u578B\u540D\u79F0");let i=`${s.baseUrl.replace(/\/+$/,"")}/chat/completions`,a=`You are a literary translator. Translate the user's ${t||"foreign"} text into natural, fluent ${n==="zh-CN"?"Simplified Chinese":n}. Preserve tone, emotion, and character voice. Output ONLY the translation without explanation.`,l=o&&o!==e?`Context:
${o}

Translate this text:
${e}`:e,f=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.apiKey}`},body:JSON.stringify({model:s.model,temperature:.2,messages:[{role:"system",content:a},{role:"user",content:l}]})});if(!f.ok)throw new Error(`Custom AI HTTP ${f.status}`);let c=(await f.json())?.choices?.[0]?.message?.content;if(!c)throw new Error("Custom AI \u672A\u8FD4\u56DE\u5185\u5BB9");return c.trim()}}),tx=en({id:"tavern-ai",name:"\u9152\u9986 API",description:"\u4F7F\u7528\u9152\u9986\u5F53\u524D\u8FDE\u63A5\u7684\u6A21\u578B\u7FFB\u8BD1",async translate(e,{from:t,to:n="\u7B80\u4F53\u4E2D\u6587"}){let o=Bn();if(!o||typeof o.generateRaw!="function")throw new Error("\u5F53\u524D\u9152\u9986\u52A9\u624B\u7248\u672C\u4E0D\u652F\u6301 generateRaw");let r=`\u8BF7\u5C06\u4EE5\u4E0B${t||"\u5916\u8BED"}\u6587\u672C\u51C6\u786E\u3001\u81EA\u7136\u5730\u7FFB\u8BD1\u6210${n==="zh-CN"?"\u7B80\u4F53\u4E2D\u6587":n}\uFF0C\u4FDD\u7559\u539F\u672C\u7684\u8BED\u6C14\u4E0E\u60C5\u7EEA\u3002\u53EA\u8F93\u51FA\u4E2D\u6587\u8BD1\u6587\uFF0C\u4E0D\u8981\u9644\u52A0\u4EFB\u4F55\u89E3\u91CA\u6216\u5F15\u53F7\uFF1A

${e}`,s=await o.generateRaw({user_input:r,should_stream:!1});if(!s||typeof s!="string")throw new Error("\u9152\u9986 API \u672A\u8FD4\u56DE\u6709\u6548\u8BD1\u6587");return s.trim()}});var Go="__TAVERN_LANG_INSTANCE__",Qi=null;function Xh(){Qi&&(Qi(),Qi=null),_o(),ia(),ga(),Lc(),$c(),af(),Ic(),Fc(),ma(),ff();let e=te();e[Go]?.destroy===Xh&&delete e[Go]}function tb(){let e=ge(),t=["https://translate.googleapis.com","https://api.dictionaryapi.dev","https://en.wiktionary.org","https://jotoba.de"];for(let n of t){let o=`tl-preconnect-${n.replace(/[^a-z0-9]/gi,"")}`;if(e.getElementById(o))continue;let r=e.createElement("link");r.id=o,r.rel="preconnect",r.href=n,r.crossOrigin="anonymous",e.head.appendChild(r)}}function nb(e={}){let t=te();if(t[Go]&&typeof t[Go].destroy=="function")try{t[Go].destroy()}catch(o){console.warn("[TavernLanguage] \u6E05\u7406\u65E7\u5B9E\u4F8B\u65F6\u51FA\u73B0\u8B66\u544A:",o)}tb(),Nh(),cf(),Uh(),sf(),Vh(),Ph(),Th(),aa(),nf(),Qi=Xc(o=>{Jr(),ba(o),aa(),o.enabled?ha({force:!0}):ma()});let n={version:Jo,init:nb,destroy:Xh,openSettings:()=>po("general"),openVocabBook:()=>po("vocab"),getConfig:J,updateConfig:is,registerLanguage:Sn,getLanguage:ot,listLanguages:vo,registerDictionary:Mt,listDictionaries:Gi,lookupWord:Qr,registerTranslator:en,listTranslators:ps,translateText:dt};if(t[Go]=n,!e.silent){let o=ot(J().targetLang)?.name||J().targetLang;Se(`\u5DF2\u52A0\u8F7D v${Jo}\uFF08\u5F53\u524D\u8BED\u79CD\uFF1A${o}\uFF09`,"success")}return n}function Ax(){po("general")}function Dx(){po("vocab")}export{Xh as destroy,nb as init,Ax as openSettings,Dx as openVocabBook,Mt as registerDictionary,Sn as registerLanguage,en as registerTranslator,Jo as version};
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
