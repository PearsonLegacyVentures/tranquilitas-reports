(()=>{
"use strict";
const $=id=>document.getElementById(id);
const esc=x=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const number=x=>Number(x||0).toLocaleString("en-US");
const usd=x=>"$"+Number(x||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
const periodLabel=x=>{const a=new Date(x.start+"T12:00:00");const b=new Date(x.end+"T12:00:00");return a.toLocaleDateString("en-US",{month:"short",day:"numeric"})+"–"+b.toLocaleDateString("en-US",{day:"numeric"});};
const statusLabel=x=>({"REPORTED_PAID":"Reported paid*","INVOICED_DUE":"Invoiced / due","NOT_VERIFIED":"Not verified"}[x]||"Unknown");
function card(k,v,n,i){return '<div class="kpi'+(i===0?' highlight':'')+'"><span class="kpi-label">'+esc(k)+'</span><strong class="kpi-value">'+esc(v)+'</strong><span class="kpi-meta">'+esc(n)+'</span></div>'}
function insight(n,title,body){return '<div class="insight"><div class="insight-number">'+esc(n)+'</div><div><div class="insight-title">'+esc(title)+'</div><p>'+esc(body)+'</p></div></div>'}
function render(d){
 const s=d.sourceWeekSummary,items=d.weekly;
 $("opsKpis").innerHTML=[
  card("Completed · manual",number(s.handRecordedCompletedNassauEngagements),"Six reported Nassau periods",0),
  card("Known manual collections",usd(s.handRecordedKnownCollectionIncludingNonserviceAndPendingUSD),"Includes pending / net receipt items",1),
  card("Therapist payouts",usd(s.handRecordedTherapistPayoutUSD),"Standard 10% included",2),
  card("Collections less payouts",usd(s.residualBeforeOperatingCostsUSD),"Not net profit · fees excluded",3)
 ].join("");
 const mx=Math.max(1,...items.flatMap(x=>[x.nassauCompleted,x.wixConfirmed]));
 $("comparisonBars").innerHTML=items.map(x=>{
  const b1=(x.nassauCompleted/mx*100).toFixed(1),b2=(x.wixConfirmed/mx*100).toFixed(1);
  return '<div class="compare-item"><div class="compare-head"><strong>'+esc(periodLabel(x))+'</strong><span>Manual '+number(x.nassauCompleted)+' / Wix '+number(x.wixConfirmed)+'</span></div><div class="compare-track"><span class="compare-manual" style="width:'+b1+'%"></span></div><div class="compare-track"><span class="compare-wix" style="width:'+b2+'%"></span></div></div>';
 }).join("");
 $("opsInsights").innerHTML=[
  insight("01","Different recognition bases","Wix confirmed bookings are not a count of services with collected payments. Weekly reports reflect manually recorded completed engagements, including channels outside Wix."),
  insight("02","Some amounts already include other components","A $200 JA event transfer was marked pending; one week includes $30 room-rental income. Viator net payouts and additional tips are already part of reported amounts."),
  insight("03","Versions matter","September 21–27 is the FINAL CORRECTED report. August 17–23 uses the UPDATED therapist-payout figure. Earlier files must not be counted again.")
 ].join("");
 $("weeklyTable").innerHTML=items.map(x=>'<tr><td><strong>'+esc(periodLabel(x))+'</strong><small class="ops-year">2026</small></td><td>'+number(x.nassauCompleted)+'</td><td>'+number(x.wixConfirmed)+'</td><td>'+usd(x.knownCollectionsUSD)+'</td><td>'+usd(x.wixSalesValueUSD)+'</td><td>'+usd(x.therapistPayoutsUSD)+'</td><td><span class="source-tag">NOT MATCHED</span></td></tr>').join("");
 $("weekFlags").innerHTML=items.filter(x=>/pending|supersed|room rental|room-rental|reconciliation variance/i.test(x.collectionNotes+" "+x.reportVersion)).map(x=>'<div class="ops-flag"><div class="flag-date">'+esc(periodLabel(x))+'</div><strong>'+esc(x.reportVersion)+'</strong><p>'+esc(x.collectionNotes)+'</p></div>').join("");
 const c=d.commissionSummary;
 $("commissionKpis").innerHTML=[
  ["Distinct reported commissions",usd(c.distinctExplicitBookingCommissionsUSD),"Not all received"],
  ["Reported paid",usd(c.reportedPaidByUserUSD),"User-described payment; not bank matched"],
  ["Invoiced / due",usd(c.reportedInvoicedDueUSD),"Outstanding"],
  ["Other recorded",usd(c.recordedWithoutPaymentEvidenceUSD),"Payment not verified"]
 ].map(([a,b,c])=>'<article class="commission-card"><span>'+esc(a)+'</span><strong>'+esc(b)+'</strong><small>'+esc(c)+'</small></article>').join("");
 $("commissionRows").innerHTML=d.commissionRecords.filter(x=>x.includeInDocumentedInvoiced).map(c=>'<tr><td>'+esc(c.country)+'</td><td>'+esc(c.period)+'</td><td>'+usd(c.USD)+'</td><td><span class="source-tag '+(c.paymentState==="REPORTED_PAID"?"paid":c.paymentState==="INVOICED_DUE"?"due":"")+'">'+esc(statusLabel(c.paymentState))+'</span></td><td><span class="ops-note">'+esc(c.notes)+'</span></td></tr>').join("");
 $("pendingReports").innerHTML=d.emailedReportsLocatedButNotRead.map(x=>'<div class="pending-report"><span>'+esc(x.period.replaceAll("_"," "))+'</span><strong>'+esc(x.source.replace("Zoho Mail attachment: ",""))+'</strong><small>Attachment verified in spa mailbox · content not yet read</small></div>').join("");
 $("auditRules").innerHTML=[
  insight("01","No duplicate revenue recognition","Manual collections are not added to Wix year-to-date sales value. Booking-level matching is required."),
  insight("02","Caribbean tracker ≠ commission received","The separate '+usd(c.trackerModeledCommissionsNotVerifiedUSD)+' modeled commission total is excluded from the verified receipt and invoiced summary."),
  insight("03","Tip treatment is explicit","The regular 10% gratuity is already in guest totals and therapist payouts. Stated extra tips were also included in the reported sums; no second addition."),
  insight("04","November awaits actual PDFs","Alex’s Nov 2–8 and Nov 9–15 reports have been found in the mail attachments but their numbers were not accessible via this mail connection. Wix November 1–17 remains independently reported.")
 ].join("");
}
fetch("data/weekly-reconciliation.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("HTTP "+r.status);return r.json()}).then(d=>{$("opsLoading").hidden=true;$("opsDashboard").hidden=false;render(d);$("printReport").addEventListener("click",()=>window.print())}).catch(e=>{$("opsLoading").textContent="Unable to load weekly reconciliation: "+e.message});
})();