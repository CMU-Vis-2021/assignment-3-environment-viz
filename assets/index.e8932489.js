const I=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function d(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=d(e);fetch(e.href,r)}};I();var L=650,N=400,R=1,f=26e4,m=["Debris and open burning","Arson/incendiarism","Equipment and vehicle use","Recreation and ceremony","Misuse of fire by a minor","Smoking","Railroad operations and maintenance","Power generation/transmission/distribution","Fireworks","Other causes","Firearms and explosives use"],v=d3.geoMercator().center([-96,37]).scale(588).translate([L/2,N/2]),w=new Date("2000-01-01"),C=new Date("2018-12-31"),h=d3.timeFormat("%Y"),T=d3.timeFormat("%b %Y");d3.timeParse("%m/%d/%y");var l=d3.scaleTime().domain([w,C]).range([0,600]).clamp(!0),p=d3.scaleOrdinal().domain(m).range(d3.schemeSet2),y=2018,o=d3.scaleLinear().domain([R,f]).range([2,25]);d3.csv("assets/fire75000causehuman.csv").then(x=>{d3.json("assets/geojson/USA.geojson").then(function(s){var d=d3.select("#legend").append("svg").attr("width",300).attr("height",300);d.selectAll("legenddots").data(m).enter().append("circle").attr("cx",10).attr("cy",function(t,i){return 10+i*25}).attr("r",7).style("fill",function(t){return p(t)}),d.selectAll("legendlabels").data(m).enter().append("text").attr("x",25).attr("y",function(t,i){return 10+i*25}).style("fill",function(t){return p(t)}).text(function(t){return t}).attr("text-anchor","left").style("alignment-baseline","middle");var n=d3.select("#my_dataviz").append("svg").attr("width",L).attr("height",N);n.append("g").selectAll("path").data(s.features).enter().append("path").attr("fill","#b8b8b8").attr("d",d3.geoPath().projection(v)).style("stroke","black").style("opacity",.3);var e=d3.select("#slider").append("svg").attr("width",650).attr("height",50),r=e.append("g").attr("class","slider").attr("transform","translate("+10+","+50/4+")");r.append("line").attr("class","track").attr("x1",l.range()[0]).attr("x2",l.range()[1]).select(function(){return this.parentNode.appendChild(this.cloneNode(!0))}).attr("class","track-inset").select(function(){return this.parentNode.appendChild(this.cloneNode(!0))}).attr("class","track-overlay").call(d3.drag().on("start.interrupt",function(){r.interrupt()}).on("start drag",function(){S(l.invert(d3.event.x),x)})),r.append("g",".track-overlay").attr("class","ticks").attr("transform","translate(0,"+18+")").selectAll("text").data(l.ticks(10)).enter().append("text").attr("x",l).attr("y",10).attr("text-anchor","middle").text(function(t){return h(t)});var c=r.insert("circle",".track-overlay").attr("class","handle").attr("r",9),D=r.append("text").attr("class","label").attr("text-anchor","middle").text(T(w)).attr("transform","translate(0,"+-25+")");function S(t,i){c.attr("cx",l(t)),D.attr("x",l(t)),console.log("In the update function"),console.log(h(t)),y=h(t),console.log("Table before filter"),console.log(i.slice(0,15));var E=i.filter(function(a){return a.FIRE_YEAR==y});console.log("Table after filter"),console.log(E.slice(0,15)),console.log("In the DrawData function"),console.log(y);var k=n.selectAll("circle").data(E);k.enter().append("circle").attr("class",a=>a.NWCG_GENERAL_CAUSE).attr("cx",function(a){return v([a.LONGITUDE,a.LATITUDE])[0]}).attr("cy",function(a){return v([a.LONGITUDE,a.LATITUDE])[1]}).attr("r",function(a){return o(a.FIRE_SIZE)}).style("fill",function(a){return p(a.NWCG_GENERAL_CAUSE)}).attr("stroke",function(a){return p(a.NWCG_GENERAL_CAUSE)}).attr("stroke-width",3).attr("fill-opacity",.4),k.exit().remove()}var g=[R,f/2,f],b=50,A=100,u=380;n.selectAll("legend").data(g).enter().append("circle").attr("cx",b).attr("cy",function(t){return u-o(t)}).attr("r",function(t){return o(t)}).style("fill","none").attr("stroke","black"),n.selectAll("legend").data(g).enter().append("line").attr("x1",function(t){return b+o(t)}).attr("x2",A).attr("y1",function(t){return u-o(t)*1.5}).attr("y2",function(t){return u-o(t)*1.5}).attr("stroke","black").style("stroke-dasharray","2,2"),n.selectAll("legend").data(g).enter().append("text").attr("x",A).attr("y",function(t){return u-o(t)*1.5}).text(function(t){return t==f?t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+" acres":t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}).style("font-size",12).attr("alignment-baseline","middle")})});
