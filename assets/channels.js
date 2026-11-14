(()=>{
"use strict";
const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const num=n=>Number(n||0).toLocaleString("en-US");
const usd=n=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n||0);
let intel=null,portfolio=null,showAllSources=false;
const funnels=[
{id:"wix",name:"Nassau physical spa · Wix",steps:[["Attract","Google/Bing search, AI referrals, social, ads, referrals"],["Arrive","Wix site and specific Nassau treatment page"],["Choose","In-spa / mobile service, duration and date"],["Commit","Wix Bookings and payment/confirmation"],["Fulfil & retain","Therapist delivery; settled receipts and repeat business"]],notes:"Only funnel with directly connected GA4 + Wix Analytics in this report. GA4 key events mix purchases and pre-purchase/ads actions."},
{id:"massage",name:"Massage Bahamas · standalone",steps:[["Attract","Search, social and referrals to MassageBahamas.com"],["Arrive","Dedicated mobile-massage landing/service page"],["Choose","Mobile service and eligible hotel/villa location"],["Request","Its own direct booking, checkout or enquiry flow"],["Fulfil & settle","Confirmed local therapist and completed payment"]],notes:"Distinct website and booking line. Current cross-property analytics and confirmed cash receipts are not integrated into this reporting dataset."},
{id:"country",name:"Country / city site · independent",steps:[["Attract","Country SEO, social, AI, tourism/concierge partners"],["Arrive","One of 32 independent country/city websites"],["Choose","Country, neighbourhood, service and private venue"],["Request","Native site form, WhatsApp or configured booking provider; varies"],["Confirm & settle","Locally verified provider, approved access, guest payment and actual completion"]],notes:"The 32 websites retain their own funnels. No Wix redirects or cross-links between Tranquilitas country sites. A live domain does not prove a qualified local provider."},
{id:"dispatch",name:"Regional dispatch · caribspa.org",steps:[["Attract","Qualifying country-site or direct enquiries"],["Request","Service, island, guest contact and requested date/time"],["Coordinate","Availability and professional claim/assignment"],["Payment","Guest payment link or pay-after-service"],["Settle","Job completed and local provider settlement"]],notes:"Dispatch operations are not connected to this reporting analytics feed. Do not infer booked/paid/fulfilled volume from website views."}
];
function bars(rows,k,label){const max=Math.max(1,...rows.map(x=>Number(x[k]||0)));return rows.map(x=>'<tr><td><strong>'+esc(x[label])+'</strong></td><td>'+num(x[k])+'</td><td><div class="dp-bar"><span style="width:'+Math.max(0,Math.min(100,Number(x[k]||0)/max*100)).toFixed(1)+'%"></span></div></td></tr>').join("")}
function renderSource(){const isWix=$("sourceWindow").value==="wix",set=isWix?intel.wix2026.trafficSources:intel.ga4.channels;const recent=intel.ga4;
$("periodTitle").textContent=isWix?"Wix Analytics · 2026 YTD to Oct 28":"GA4 · Oct 14 – Nov 12, 2026";
$("scopeNote").textContent=isWix?"Main Wix site only. The 2026 snapshot is not the combined country-site traffic.":"Main Wix site's connected GA4 property only. This is not the 32-site portfolio total.";
$("sessionsKpi").textContent=num(set.reduce((a,x)=>a+x.sessions,0));
$("channelKpi").textContent=num(set.filter(x=>x.sessions>0).length);
$("eventsKpi").textContent=isWix?"—":num(recent.totalKeyEvents);
$("eventsKpiNote").textContent=isWix?"Not comparable to GA4 key events":"Mixed GA4 key events, not bookings";
$("sourceTable").innerHTML=bars(set.sort((a,b)=>b.sessions-a.sessions),"sessions",isWix?"name":"name");
$("revenueNote").textContent=isWix?"Separate Wix report below shows attributed bookings and sales. Do not add those values to GA4.":"GA4 attributed revenue: "+usd(recent.channels.reduce((a,x)=>a+x.totalRevenue,0))+". This is not verified collected cash.";
}
function renderMediums(){const r=intel.ga4.sources.slice(0,showAllSources?undefined:12);$("mediumsTable").innerHTML=r.map(x=>'<tr><td><strong>'+esc(x.source)+'</strong></td><td>'+num(x.sessions)+'</td><td>'+num(x.keyEvents)+'</td></tr>').join("");$("showMediums").textContent=showAllSources?"Show fewer sources":"Show all sources ("+num(intel.ga4.sources.length)+")"}
function renderEvents(){$("eventsTable").innerHTML=intel.ga4.events.map(x=>'<tr><td>'+esc(x.event)+'</td><td>'+num(x.eventCount)+'</td><td>'+num(x.keyEvents)+'</td></tr>').join("")}
function renderWixConversions(){$("wixConversions").innerHTML=intel.wix2026.conversionSources.map(x=>'<tr><td>'+esc(x.name)+'</td><td>'+num(x.sessions)+'</td><td>'+num(x.confirmedBookings)+'</td><td>'+usd(x.wixSalesAmount)+'</td></tr>').join("");$("wixCtas").innerHTML=intel.wix2026.ctaClicks.slice(0,15).map(x=>'<tr><td>'+esc(x.name)+'</td><td>'+num(x.clicks)+'</td></tr>').join("")}
function renderInventory(){const q=$("channelSearch").value.trim().toLowerCase();const c=intel.marketingChannels.filter(x=>!q||[x.name,x.stage,x.confirmed,x.evidence].join(" ").toLowerCase().includes(q));$("channelsCount").textContent=c.length+" channel types";$("channelItems").innerHTML=c.map(x=>'<article class="dp-channel-item"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><h3>'+esc(x.name)+'</h3><span class="dp-tag '+(/not |no |pending|incomplete|partial/i.test(x.confirmed)?"pending":"")+'">'+esc(x.confirmed)+'</span></div><p><strong>Stage:</strong> '+esc(x.stage)+' · <strong>Evidence:</strong> '+esc(x.evidence)+'</p><p><strong>Customer journey:</strong> '+esc(x.primaryAction)+'</p><p><strong>Data gap / next step:</strong> '+esc(x.next)+'</p></article>').join("")||'<p class="dp-empty">No channel types match.</p>'}
function renderFunnel(){const entry=funnels.find(x=>x.id===$("funnelSelect").value)||funnels[0];$("funnelTitle").textContent=entry.name;$("funnelSteps").innerHTML=entry.steps.map((x,i)=>'<article class="dp-step"><small>STEP '+String(i+1).padStart(2,"0")+'</small><h4>'+esc(x[0])+'</h4><p>'+esc(x[1])+'</p></article>').join("");$("funnelCaution").textContent=entry.notes}
function renderSiteAudit(){const rows=portfolio.sites;$("siteAuditCount").textContent=rows.length+" market homepages inspected";$("siteFunnelsTable").innerHTML=rows.map(x=>'<tr><td><strong>'+esc(x.name)+'</strong><br><span class="dp-muted">'+esc(x.host)+'</span></td><td>'+esc((x.bookingSignals||[]).join(" · "))+'</td><td>'+esc((x.trackingIndicators||[]).join("; "))+'</td><td><span class="dp-tag pending">Not connected to site-level conversion reports</span></td></tr>').join("")}
function renderGaps(){const d=intel.inventoryWarnings;$("dataGaps").innerHTML=d.map(x=>'<li style="margin-bottom:10px">'+esc(x)+'</li>').join("")}
Promise.all([fetch("data/channel-intelligence.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Channel source missing");return r.json()}),fetch("data/website-portfolio.json",{cache:"no-store"}).then(r=>r.json())]).then(([c,w])=>{
intel=c;portfolio=w;
if(w.sites.length!==32||c.ga4.totalSessions<1)throw Error("Incomplete reporting data");
$("windowLabel").textContent=c.ga4.startDate+" to "+c.ga4.endDate;
$("measuredProperty").textContent="1 Wix domain / "+w.sites.length+" destination websites outside this channel dataset";
$("channelLoading").hidden=true;$("channelDashboard").hidden=false;
$("sourceWindow").addEventListener("change",renderSource);
$("showMediums").addEventListener("click",()=>{showAllSources=!showAllSources;renderMediums()});
$("channelSearch").addEventListener("input",renderInventory);
$("funnelSelect").addEventListener("change",renderFunnel);
renderSource();renderMediums();renderEvents();renderWixConversions();renderInventory();renderFunnel();renderGaps();renderSiteAudit();
}).catch(e=>{$("channelLoading").textContent="Unable to load channel report: "+e.message});
})();