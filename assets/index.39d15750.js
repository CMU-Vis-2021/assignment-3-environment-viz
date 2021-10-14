import{m as L,j as R,s as p,o as k,l as w,i as S,a as b}from"./vendor.8e39a08d.js";const T=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function u(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerpolicy&&(t.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?t.credentials="include":r.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(r){if(r.ep)return;r.ep=!0;const t=u(r);fetch(r.href,t)}};T();var A=650,_=400,x=1,c=26e4,y=L().center([-96,37]).scale(588).translate([A/2,_/2]);R("assets/geojson/USA.geojson").then(function(f){console.log("IN HERE");var a=p("#my_dataviz").append("div").attr("class","tooltip").style("opacity",0).style("background-color","white").style("border","solid").style("border-width","2px").style("border-radius","5px").style("padding","5px");const u=function(e,l){a.style("opacity",1)};var i=function(e,l){a.html(l.FIRE_SIZE+"<br>long: "+l.LONGITUDE+"<br>lat: "+l.LATITUDE).style("left",e.x+30+"px").style("top",e.y-30+"px")},r=function(e,l){a.style("opacity",0)},t=p("#my_dataviz").append("svg").attr("width",A).attr("height",_),o=k().domain(["arson_incendiarism","debris_and_open_burning","equipment_and_vehicle_use","power_generation","recreation_and_ceremony"]).range(["#F5CBA7","#EB984E","#E67E22","#A04000","#6E2C00"]),n=w().domain([x,c]).range([2,25]);t.append("g").selectAll("path").data(f.features).enter().append("path").attr("fill","#b8b8b8").attr("d",S().projection(y)).style("stroke","black").style("opacity",.3),console.log(markers),t.selectAll("myCircles").data(markers).enter().append("circle").attr("class",e=>"year"+e.FIRE_YEAR+" dataCircles").attr("cx",function(e){return y([e.LONGITUDE,e.LATITUDE])[0]}).attr("cy",function(e){return y([e.LONGITUDE,e.LATITUDE])[1]}).attr("r",function(e){return n(e.FIRE_SIZE)}).style("fill",function(e){return o(e.CAUSE__ABRV)}).attr("stroke",function(e){return o(e.CAUSE__ABRV)}).attr("stroke-width",3).attr("fill-opacity",.4).on("mouseover",u).on("mousemove",i).on("mouseleave",r);function m(){b(".slider").each(function(e){let h=p(this).property("value"),E="year"+h;t.selectAll(".dataCircles").transition().duration(1e3).style("opacity",0).attr("r",0),console.log("newYear = "+h),console.log(E),t.selectAll("."+E).transition().duration(1e3).style("opacity",1).attr("r",function(I){return n(I.FIRE_SIZE)})})}b(".slider").on("change",m),m();var d=[x,c/2,c],g=50,v=100,s=380;t.selectAll("legend").data(d).enter().append("circle").attr("cx",g).attr("cy",function(e){return s-n(e)}).attr("r",function(e){return n(e)}).style("fill","none").attr("stroke","black"),t.selectAll("legend").data(d).enter().append("line").attr("x1",function(e){return g+n(e)}).attr("x2",v).attr("y1",function(e){return s-n(e)*1.5}).attr("y2",function(e){return s-n(e)*1.5}).attr("stroke","black").style("stroke-dasharray","2,2"),t.selectAll("legend").data(d).enter().append("text").attr("x",v).attr("y",function(e){return s-n(e)*1.5}).text(function(e){return e==c?e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+" acres":e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}).style("font-size",12).attr("alignment-baseline","middle")});var C=document.getElementById("yearShown");myRange.oninput=function(){C.innerHTML=this.value};
