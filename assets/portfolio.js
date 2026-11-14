(()=>{
"use strict";
const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let state={sites:[],other:[],region:"all",query:""};
const number=n=>Number(n||0).toLocaleString("en-US");
function fileCsv(rows){const keys=["name","region","host","cloudflareProject","repo","areas","deliveryStatus","analyticsStatus"];const quote=t=>'"'+String(t??"").replaceAll('"','""')+'"';const csv=[keys.join(","),...rows.map(r=>keys.map(k=>quote(r[k])).join(","))].join("\r\n");const url=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"}));const a=document.createElement("a");a.href=url;a.download="Tranquilitas_32_Website_Markets.csv";document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),800)}
function eligible(r){const q=state.query;return(state.region==="all"||r.region===state.region)&&(!q||[r.name,r.host,r.areas,r.repo,r.coverageNote].join(" ").toLowerCase().includes(q))}
function card(s){const source="https://github.com/"+s.repo+(s.repoPath?"/tree/main/"+s.repoPath:"");return '<article class="dp-card"><header><span class="dp-tag">'+esc(s.region)+'</span><span class="dp-tag pending">Coverage to verify</span></header><h3>'+esc(s.name)+'</h3><span class="host">'+esc(s.host)+'</span><p>'+esc(s.areas)+'</p><div class="dp-meta"><div><b>Deployment:</b> '+esc(s.cloudflareProject)+' · custom domain configured</div><div><b>Booking:</b> independently operated website; end-to-end verification pending</div><div><b>Measurement:</b> not yet in consolidated channel totals</div><div><b>Operations:</b> '+esc(s.coverageNote)+'</div></div><div class="dp-card-actions"><a class="dp-action" href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">View live site ↗</a><a class="dp-action outline" href="'+esc(source)+'" target="_blank" rel="noopener noreferrer">Source ↗</a><a class="dp-action outline" href="markets.html?market='+encodeURIComponent(s.id)+'#market-detail">Market desk ↗</a></div></article>'}
function render(){const rows=state.sites.filter(eligible);$("portfolioCount").textContent=number(rows.length)+" of "+number(state.sites.length)+" websites";$("websiteCards").innerHTML=rows.map(card).join("")||'<div class="dp-empty">No markets match this search.</div>'}
function renderOther(){const out=state.other;$("otherProperties").innerHTML=out.map(r=>'<article class="dp-mini"><h3>'+esc(r.name)+'</h3><p>'+esc(r.role)+'</p><p><b>Reporting:</b> '+esc(r.analytics)+'</p><a href="'+esc(r.url)+'" target="_blank" rel="noopener noreferrer">'+esc(r.url)+' ↗</a></article>').join("")}
fetch("data/website-portfolio.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Portfolio source unavailable");return r.json()}).then(d=>{
 if(d.sites.length!==32||new Set(d.sites.map(x=>x.id)).size!==32)throw Error("Expected 32 distinct market domains");
 state.sites=d.sites;state.other=d.otherProperties||[];
 $("totalWebsites").textContent=number(d.sites.length);
 $("caribbeanWebsites").textContent=number(d.sites.filter(x=>x.region==="Caribbean").length);
 $("internationalWebsites").textContent=number(d.sites.filter(x=>x.region==="International").length);
 $("otherWebsiteCount").textContent=number(state.other.length);
 $("websiteLoading").hidden=true;$("websiteDashboard").hidden=false;
 $("siteSearch").addEventListener("input",e=>{state.query=e.target.value.trim().toLowerCase();render()});
 $("siteRegion").addEventListener("change",e=>{state.region=e.target.value;render()});
 $("siteExport").addEventListener("click",()=>fileCsv(state.sites));
 renderOther();render();
}).catch(e=>{$("websiteLoading").textContent="Unable to load website inventory: "+e.message});
})();