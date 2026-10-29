
(function(){
'use strict';
var state={year:'2026',site:'combined',metric:'sales',data:null};
var $=function(id){return document.getElementById(id);};
var num=new Intl.NumberFormat('en-US',{maximumFractionDigits:0});
var moneyFmt=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
var pctFmt=new Intl.NumberFormat('en-US',{style:'percent',maximumFractionDigits:1});
function money(v){return typeof v==='number'&&Number.isFinite(v)?moneyFmt.format(v):'—';}
function nfmt(v){return typeof v==='number'&&Number.isFinite(v)?num.format(v):'—';}
function shortMoney(v){if(!Number.isFinite(v))return '—';return Math.abs(v)>=100000?'$'+(v/1000).toFixed(1)+'K':money(v);}
function esc(v){return String(v??'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function change(a,b){return typeof a==='number'&&typeof b==='number'&&b>0?(a/b-1)*100:null;}
function changeLabel(a,b,suffix){var v=change(a,b);return v===null?'No valid comparison':(v>=0?'+':'')+v.toFixed(1)+'% '+(suffix||'vs comparison period');}
function siteKeys(){return state.site==='combined'?['main','legacy']:[state.site];}
function periodMetric(period,model){
 var records=state.data.periods.records.filter(function(r){return r.period===period&&r.model===model&&siteKeys().indexOf(r.site)>=0;});
 var out={};records.forEach(function(r){Object.entries(r.values||{}).forEach(function(e){if(typeof e[1]==='number'&&e[0]!=='order_value_avg'&&e[0]!=='site_bounce_ratio'&&e[0]!=='pages_per_session_avg')out[e[0]]=(out[e[0]]||0)+e[1];});});
 if(model==='sales'&&out.sales_count)out.order_value_avg=out.total_sales_amount/out.sales_count;
 if(model==='traffic'){var sess=0,weighted=0;records.forEach(function(r){var x=r.values||{};if(x.site_bounce_ratio!=null){sess+=(x.sessions_count||0);weighted+=(x.site_bounce_ratio||0)*(x.sessions_count||0);}});out.site_bounce_ratio=sess?weighted/sess:null;}
 return out;
}
function monthRows(model){
 var rows={};state.data.history.series.filter(function(r){return r.model===model&&siteKeys().indexOf(r.site)>=0;}).forEach(function(ser){
  (ser.rows||[]).forEach(function(r){if(!r.month||r.month.slice(0,4)!==state.year)return;
   if(!rows[r.month])rows[r.month]={month:r.month};
   Object.entries(r).forEach(function(entry){if(entry[0]!=='month'&&typeof entry[1]==='number'&&!entry[0].endsWith('_avg')&&!entry[0].endsWith('_ratio'))rows[r.month][entry[0]]=(rows[r.month][entry[0]]||0)+entry[1];});
  });
 });return Object.values(rows).sort(function(a,b){return a.month.localeCompare(b.month);});
}
function breakdown(key){
 var merged=new Map();state.data.breakdowns.breakdowns.filter(function(x){return x.report===key&&x.year===state.year&&siteKeys().indexOf(x.site)>=0;}).forEach(function(group){
 (group.rows||[]).forEach(function(row){var label=String(row.label??'').trim()||'(not specified)';var id=label.toLowerCase();var current=merged.get(id)||{label:label,_weight:0,_weightedPos:0};
 Object.entries(row).forEach(function(e){if(e[0]==='label'||typeof e[1]!=='number')return;if(e[0]==='position_avg'){var w=row.impressions_count||1;current._weightedPos+=e[1]*w;current._weight+=w;}else current[e[0]]=(current[e[0]]||0)+e[1];});
 merged.set(id,current);
 });});
 return Array.from(merged.values()).map(function(x){if(x._weight)x.position_avg=x._weightedPos/x._weight;delete x._weight;delete x._weightedPos;return x;});
}
function kpi(label,value,meta,highlight,changeVal){
 return '<div class="kpi'+(highlight?' highlight':'')+'"><span class="kpi-label">'+esc(label)+'</span><strong class="kpi-value">'+esc(value)+'</strong><span class="kpi-meta'+(typeof changeVal==='number'?(changeVal>=0?' positive':' negative'):'')+'">'+esc(meta)+'</span></div>';
}
function renderKpis(){
 var s=periodMetric(state.year,'sales'),b=periodMetric(state.year,'bookings'),t=periodMetric(state.year,'traffic');
 var prior=state.year==='2026'?'2025-YTD-matched':state.year==='2025'?'2024':null;
 var ps=prior?periodMetric(prior,'sales'):{},pb=prior?periodMetric(prior,'bookings'):{},pt=prior?periodMetric(prior,'traffic'):{};
 var note=state.year==='2026'?'vs same dates in 2025':state.year==='2025'?'vs 2024 full year':'historical baseline';
 var cells=[
  {label:'Wix sales value',val:shortMoney(s.total_sales_amount),v:s.total_sales_amount,p:ps.total_sales_amount,h:true},
  {label:'Sales orders',val:nfmt(s.sales_count),v:s.sales_count,p:ps.sales_count},
  {label:'Average order value',val:money(s.order_value_avg),v:s.order_value_avg,p:ps.order_value_avg},
  {label:'Confirmed bookings',val:nfmt(b.confirmed_bookings_count),v:b.confirmed_bookings_count,p:pb.confirmed_bookings_count}
 ];
 $('kpiGrid').innerHTML=cells.map(function(c){return kpi(c.label,c.val,prior?changeLabel(c.v,c.p,note):'Reported 2024 actual',c.h,prior?change(c.v,c.p):null);}).join('');
 $('periodDescription').textContent=state.year==='2026'?'Year to date · Jan 1 – Oct 28, 2026':'Full calendar year · '+state.year;
 $('coveragePill').textContent=state.year==='2026'?'Partial year · as of Oct 28':'Full calendar year';
}
function renderTrend(){
 var model=state.metric==='sales'?'sales':state.metric==='bookings'?'bookings':'traffic';
 var field=state.metric==='sales'?'total_sales_amount':state.metric==='bookings'?'confirmed_bookings_count':'sessions_count';
 var raw=monthRows(model),all=[];
 var count=state.year==='2026'?10:12;
 for(var i=1;i<=count;i++){var key=state.year+'-'+String(i).padStart(2,'0');var item=raw.find(function(r){return r.month===key;});all.push({month:key,value:item?.[field]||0});}
 var max=Math.max.apply(null,all.map(function(x){return x.value;}));if(!max)max=1;
 var w=850,h=270,l=55,r=21,top=21,bottom=44,innerH=h-top-bottom,innerW=w-l-r;
 var x=function(i){return l+(i/(Math.max(1,count-1)))*innerW;};var y=function(v){return top+innerH-(v/max)*innerH;};
 var p=all.map(function(a,i){return x(i).toFixed(1)+','+y(a.value).toFixed(1);}).join(' ');
 var a='M'+x(0).toFixed(1)+' '+y(0).toFixed(1)+' L'+p.replace(/,/g,' ').replace(/ /g,' ')+' L'+x(count-1).toFixed(1)+' '+y(0).toFixed(1)+' Z';
 var svg='<svg viewBox="0 0 850 270" role="img" aria-label="'+esc(state.metric)+' monthly chart '+state.year+'"><defs><linearGradient id="mintFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#85dbc0" stop-opacity=".32"/><stop offset="100%" stop-color="#85dbc0" stop-opacity=".012"/></linearGradient></defs>';
 for(var j=0;j<5;j++){var val=max*j/4,yy=y(val);svg+='<line x1="'+l+'" x2="'+(w-r)+'" y1="'+yy+'" y2="'+yy+'" stroke="#25414b" stroke-dasharray="4 5"/><text x="0" y="'+(yy+4)+'" fill="#7899a0" font-size="12" font-family="Manrope">'+esc(state.metric==='sales'?'$'+(val/1000).toFixed(0)+'k':nfmt(val))+'</text>';}
 var points=all.map(function(a,i){return x(i)+','+y(a.value);}).join(' ');
 var poly=all.map(function(z,i){return x(i)+','+y(z.value);}).join(' ');
 var fillpath='M'+x(0)+' '+y(0)+' L'+all.map(function(z,i){return x(i)+' '+y(z.value);}).join(' L')+' L'+x(count-1)+' '+y(0)+' Z';
 svg+='<path d="'+fillpath+'" fill="url(#mintFill)"/><polyline fill="none" stroke="#9ee9cd" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" points="'+poly+'"/>';
 all.forEach(function(d,i){svg+='<circle cx="'+x(i)+'" cy="'+y(d.value)+'" r="4.5" fill="#a5f0d2" stroke="#0c202b" stroke-width="2"><title>'+esc(d.month)+' · '+esc(state.metric==='sales'?money(d.value):nfmt(d.value))+'</title></circle><text text-anchor="middle" x="'+x(i)+'" y="'+(h-12)+'" fill="#8eabb0" font-family="Manrope" font-size="12">'+esc(new Date(d.month+'-15').toLocaleString('en-US',{month:'short'}))+'</text>';});
 svg+='</svg>';$('trendChart').innerHTML=svg;
 var heading=$('trendChart').closest('.panel').querySelector('h3');heading.textContent=state.metric==='sales'?'Sales value over time':state.metric==='bookings'?'Confirmed bookings over time':'Site sessions over time';
}
function renderInsights(){
 var items=[],s=periodMetric(state.year,'sales'),t=periodMetric(state.year,'traffic'),b=periodMetric(state.year,'bookings');
 if(state.year==='2026'){
  var ps=periodMetric('2025-YTD-matched','sales'),pt=periodMetric('2025-YTD-matched','traffic'),pb=periodMetric('2025-YTD-matched','bookings');
  items.push({title:'More sales value, fewer transactions',body:'Through October 28, Wix sales value is '+changeLabel(s.total_sales_amount,ps.total_sales_amount,'year over year')+' while orders are '+changeLabel(s.sales_count,ps.sales_count,'year over year')+'. Pricing and product mix matter more than raw order volume.'});
  items.push({title:'Traffic growth is not yet booking growth',body:'Sessions are '+changeLabel(t.sessions_count,pt.sessions_count,'vs 2025')+' while confirmed bookings are '+changeLabel(b.confirmed_bookings_count,pb.confirmed_bookings_count,'vs 2025')+'. Investigate the booking funnel and channel quality before increasing acquisition spend.'});
  items.push({title:'Higher realized ticket',body:'Average Wix order value moved from '+money(ps.order_value_avg)+' to '+money(s.order_value_avg)+'. Prioritize contribution per completed booking, not discount-led volume.'});
 }else if(state.year==='2025'){
  var old=periodMetric('2024','sales');items.push({title:'Scale shift in the sales record',body:'Reported Wix sales value increased '+changeLabel(s.total_sales_amount,old.total_sales_amount,'vs 2024')+'. The comparison also reflects migration from the legacy website, so confirm merchant and operational continuity.'});
  items.push({title:'Established a larger booking base',body:nfmt(b.confirmed_bookings_count)+' confirmed Wix bookings and '+nfmt(s.sales_count)+' Wix sales orders. Evaluate utilization and direct service costs before calling this growth profitable.'});
  items.push({title:'Channel choice matters',body:'Use organic search, concierge and direct-booking performance to allocate distribution partnerships, not only total traffic.'});
 }else{
  items.push({title:'Two-site transition year',body:'2024 contains operating activity on both the original site and the replacement site. The reporting system keeps the histories separate, then aggregates additive business measures.'});
  items.push({title:'Historical baseline, not complete P&L',body:nfmt(s.sales_count)+' reported Wix orders and '+nfmt(b.confirmed_bookings_count)+' confirmed bookings. These figures require reconciliation with actual bank receipts and therapist payouts.'});
  items.push({title:'Early demand foundation',body:nfmt(t.sessions_count)+' total site sessions across both Wix properties. Visitor counts may overlap between sites and should not be represented as unique company-wide people.'});
 }
 $('insights').innerHTML=items.map(function(i,idx){return '<div class="insight"><div class="insight-number">0'+(idx+1)+'</div><div><div class="insight-title">'+esc(i.title)+'</div><p>'+esc(i.body)+'</p></div></div>';}).join('');
}
function renderQuarters(){
 var yrs=['2024','2025','2026'];var html='';
 yrs.forEach(function(y){for(var q=1;q<=4;q++){var key=y+'-Q'+q,s=periodMetric(key,'sales'),b=periodMetric(key,'bookings'),t=periodMetric(key,'traffic'),partial=key==='2026-Q4';
 html+='<tr'+(y===state.year?' class="current-year"':'')+'><td>'+esc(key)+(partial?'<span class="q-partial">PARTIAL</span>':'')+'</td><td>'+money(s.total_sales_amount)+'</td><td>'+nfmt(s.sales_count)+'</td><td>'+money(s.order_value_avg)+'</td><td>'+nfmt(b.bookings_count)+'</td><td>'+nfmt(b.confirmed_bookings_count)+'</td><td>'+nfmt(t.sessions_count)+'</td></tr>';}});$('quarterTable').innerHTML=html;
 var cards=['2024','2025','2026'].map(function(y){var s=periodMetric(y,'sales'),b=periodMetric(y,'bookings');return '<article class="annual-card'+(state.year===y?' active':'')+'"><div class="year">'+y+'</div><div class="year-caption">'+(y==='2026'?'YEAR TO DATE · THROUGH OCTOBER 28':'FULL CALENDAR YEAR')+'</div><div class="year-sales">'+money(s.total_sales_amount)+'</div><span class="subtle">Wix reported sales value</span><div class="year-foot"><span><strong>'+nfmt(s.sales_count)+'</strong> sales orders</span><span><strong>'+nfmt(b.confirmed_bookings_count)+'</strong> confirmed bookings</span></div></article>';});
 $('annualCards').innerHTML=cards.join('');
}
function barList(id,rows,valueKey,formatter,gold){var list=rows.filter(function(x){return typeof x[valueKey]==='number'&&x[valueKey]>0;}).sort(function(a,b){return b[valueKey]-a[valueKey];}).slice(0,7);if(!list.length){$(id).innerHTML='<div class="empty">No recorded observations for this site and period.</div>';return;}var max=list[0][valueKey]||1;$(id).innerHTML=list.map(function(r){var v=r[valueKey];return '<div class="bar-item" title="'+esc(r.label)+'"><span class="bar-name">'+esc(r.label)+'</span><span class="bar-value">'+esc(formatter(v))+'</span><div class="bar-track"><div class="bar-fill'+(gold?' gold':'')+'" style="width:'+Math.max(1,v/max*100).toFixed(1)+'%"></div></div></div>';}).join('');}
function renderServices(){barList('serviceBars',breakdown('service_sales'),'total_items_sales_amount',money,false);barList('bookingServices',breakdown('booking_services'),'confirmed_bookings_count',nfmt,true);}
function prettyChannel(s){return String(s||'Unknown').replace(/^wix_/,'').replace(/_/g,' ');}
function renderAcquisition(){
 var colors=['#94e5ca','#e1bf89','#6aacc0','#b79ad1','#d48e84','#456d77'];
 var channels=breakdown('traffic_sources').filter(function(x){return x.sessions_count>0;}).sort(function(a,b){return b.sessions_count-a.sessions_count;});
 var total=channels.reduce(function(sum,r){return sum+r.sessions_count;},0);
 if(!total){$('channelMix').innerHTML='<div class="empty">No reported acquisition data.</div>';}else{
 var top=channels.slice(0,5),other=channels.slice(5).reduce(function(n,r){return n+r.sessions_count;},0);if(other)top.push({label:'other',sessions_count:other});
 var offset=0,segments=top.map(function(x,i){var start=offset;offset+=x.sessions_count/total*100;return colors[i%colors.length]+' '+start.toFixed(2)+'% '+offset.toFixed(2)+'%';});
 $('channelMix').innerHTML='<div class="donut" style="background:conic-gradient('+segments.join(',')+')"><div class="donut-inner"><strong>'+nfmt(total)+'</strong><small>Sessions</small></div></div><div class="channel-legend">'+top.map(function(x,i){return '<div class="channel-line"><i class="swatch" style="background:'+colors[i%colors.length]+'"></i><span class="channel-name">'+esc(prettyChannel(x.label))+'</span><strong>'+pctFmt.format(x.sessions_count/total)+'</strong></div>';}).join('')+'</div>';
 }
 barList('countries',breakdown('countries'),'sessions_count',nfmt,true);
 var terms=breakdown('google_queries').filter(function(x){return x.clicks_count>0;}).sort(function(a,b){return b.clicks_count-a.clicks_count;}).slice(0,8);
 $('searchTerms').innerHTML=terms.length?terms.map(function(t){return '<div class="report-item"><div class="name" title="'+esc(t.label)+'">'+esc(t.label)+'</div><div class="value">'+nfmt(t.clicks_count)+' clicks</div><div class="caption">'+nfmt(t.impressions_count)+' impressions'+(typeof t.position_avg==='number'?' · Avg. pos. '+t.position_avg.toFixed(1):'')+'</div></div>';}).join(''):'<div class="empty">No recorded Google Search query data.</div>';
 barList('ctaClicks',breakdown('cta_clicks'),'clicks_count',nfmt,false);
}
function renderBookings(){
 var b=periodMetric(state.year,'bookings'),t=periodMetric(state.year,'traffic');
 var vals=[['Total bookings',b.bookings_count,'All statuses'],['Confirmed',b.confirmed_bookings_count,'Excludes pending/cancelled'],['Cancellations',b.canceled_bookings_count,'Reported Wix cancellations'],['Booking clients',b.customers_count,'Site-level unique customers']];
 $('bookingMetrics').innerHTML=vals.map(function(v){return '<div class="booking-tile"><span class="name">'+esc(v[0])+'</span><strong class="value">'+nfmt(v[1])+'</strong><span class="small">'+esc(v[2])+'</span></div>';}).join('');
 var rows=breakdown('conversion_sources').filter(function(x){return (x.sessions_count||0)>0;}).sort(function(a,b){return (b.total_sales_amount||0)-(a.total_sales_amount||0);}).slice(0,10);
 $('conversionTable').innerHTML=rows.length?rows.map(function(x){return '<tr><td>'+esc(prettyChannel(x.label))+'</td><td>'+nfmt(x.sessions_count)+'</td><td>'+nfmt(x.confirmed_bookings_count)+'</td><td>'+money(x.total_sales_amount)+'</td></tr>';}).join(''):'<tr><td colspan="4">No records in period</td></tr>';
}
function renderMethod(){
 var topics=[['traffic','Visitor sessions & page views'],['sales','Order values & sales'],['bookings','Booking activity'],['sale_items','Product mix'],['button_clicks','CTA interactions'],['conversion','Attributed conversions'],['google_search','Google Search metrics'],['contacts','CRM contact aggregates'],['transactions','Recorded payment activity'],['site_search','Internal site searches']];
 $('methodGrid').innerHTML=topics.map(function(x){
 var set=state.data.history.series.filter(function(s){return s.model===x[0]&&siteKeys().indexOf(s.site)>=0;});var months=new Set();set.forEach(function(g){(g.rows||[]).forEach(function(r){months.add(r.month);});});var dates=Array.from(months).sort();
 return '<div class="method-card"><span class="status">'+(dates.length?'● REPORTED':'◌ NO OBSERVATIONS')+'</span><strong>'+esc(x[1])+'</strong><small>'+esc(dates.length?dates.length+' monthly periods · '+dates[0]+' to '+dates[dates.length-1]:'Model available; no data returned for this source')+'</small></div>';
 }).join('');
}
function render(){
 if(!state.data)return;
 document.querySelectorAll('[data-year]').forEach(function(b){b.classList.toggle('selected',b.dataset.year===state.year);});
 renderKpis();renderTrend();renderInsights();renderQuarters();renderServices();renderAcquisition();renderBookings();renderMethod();
}
function activateNav(){
 var hash=location.hash||'#overview';document.querySelectorAll('.nav-link').forEach(function(a){a.classList.toggle('active',a.getAttribute('href')===hash);});
}
function init(){
 document.querySelectorAll('[data-year]').forEach(function(b){b.addEventListener('click',function(){state.year=b.dataset.year;render();});});
 $('siteSelect').addEventListener('change',function(e){state.site=e.target.value;render();});
 $('chartMetric').addEventListener('change',function(e){state.metric=e.target.value;renderTrend();});
 $('printButton').addEventListener('click',function(){window.print();});
 window.addEventListener('hashchange',activateNav);activateNav();
 Promise.all(['data/wix-history.json','data/wix-periods.json','data/wix-breakdowns.json'].map(function(path){return fetch(path,{cache:'no-cache'}).then(function(response){if(!response.ok)throw Error(path+' '+response.status);return response.json();});}))
 .then(function(data){state.data={history:data[0],periods:data[1],breakdowns:data[2]};$('loading').hidden=true;$('dashboard').hidden=false;render();})
 .catch(function(err){$('loading').innerHTML='<strong>Data could not be loaded.</strong><p>This dashboard must be served over HTTP(S) with the three JSON files in the data directory.</p><p>'+esc(err.message)+'</p>';});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
