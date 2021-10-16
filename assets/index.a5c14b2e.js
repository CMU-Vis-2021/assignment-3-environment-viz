import*as r from"https://unpkg.com/d3?module";const V=function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const y of l.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&c(y)}).observe(document,{childList:!0,subtree:!0});function o(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerpolicy&&(l.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?l.credentials="include":n.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function c(n){if(n.ep)return;n.ep=!0;const l=o(n);fetch(n.href,l)}};V();var I=650,T=400,g=450,b=250,i={top:20,right:30,bottom:100,left:130};let R="";var E="2000",z=["#7c0202","#b64d24","#b86213","#e18820","#de9b10","#f3c523","#7c5201","#fac45a","#fd860b","#ffdc6c","#ff4901","#a43407"],O=["#edc4c4","#c3a599","#dfc4ab","#efc493","#e7d6b5","#f7e5a6","#cfc8bb","#fce8c0","#ffbb76","#fff1c3","#fa976f","#a16851"],N=["0","1","2","3","4","5","6","7","8","9","10","11"],B=1,A=26e4,S=r.geoMercator().center([-96,37]).scale(588).translate([I/2,T/2]),v=r.select("#my_dataviz").append("div").attr("class","tooltip").style("opacity",0).style("background-color","white").style("border","solid").style("border-width","2px").style("border-radius","5px").style("padding","5px"),s=r.select("#my_dataviz").append("svg").attr("width",I).attr("height",T),h=r.scaleOrdinal().domain(N).range(z),G=r.scaleOrdinal().domain(N).range(O),u=r.scaleLinear().domain([B,A]).range([2,25]);r.csv("assets/firesfinaldata.csv").then(x=>{r.json("assets/geojson/USA.geojson").then(function(p){s.append("g").selectAll("path").data(p.features).enter().append("path").attr("fill","#b8b8b8").attr("d",r.geoPath().projection(S)).style("stroke","black").style("opacity",.3),s.selectAll("myCircles").data(x).enter().append("circle").attr("class",t=>"year"+t.FIRE_YEAR+" dataCircles val"+t.VALUE+""+t.FIRE_YEAR).attr("cx",function(t){return S([t.LONGITUDE,t.LATITUDE])[0]}).attr("cy",function(t){return S([t.LONGITUDE,t.LATITUDE])[1]}).attr("r",function(t){return u(t.FIRE_SIZE)}).style("fill",function(t){return h(t.VALUE)}).attr("stroke",function(t){return h(t.VALUE)}).attr("stroke-width",3).attr("fill-opacity",.4).on("mouseover",function(t,a){v.style("opacity",1),v.style("display","block")}).on("mousemove",function(t,a){v.html("Fire year: "+a.FIRE_YEAR+"<br>Acres burned: "+a.FIRE_SIZE+"<br>Cause of fire: "+a.NWCG_GENERAL_CAUSE+"<br>State: "+a.STATE+"<br>County: "+a.FIPS_NAME).style("left",t.x+30+"px").style("top",t.y-30+"px")}).on("mouseleave",function(t,a){v.style("opacity",0),v.style("display","none")}),r.select("#my_dataviz").append("svg").attr("width",I).attr("height",60);var o=r.select("#my_dataviz").append("svg").attr("width",g+i.left+i.right).attr("height",b+i.top+i.bottom).attr("class","overflow-viz").append("g").attr("transform","translate("+i.left+","+i.top+")"),c=r.scaleLinear().range([0,g]);const n=o.append("g").attr("transform","translate(0,"+b+")");var l=r.scaleBand().range([0,b]).padding(.1);const y=o.append("g");o.append("text").attr("x",g/2-35).attr("y",0-i.top*2.5).attr("text-anchor","middle").style("font-size","16px").style("font-weight","bold").text("Human-made fires by cause"),o.append("text").attr("x",g/2-35).attr("y",0-i.top*1.3).attr("text-anchor","middle").style("font-size","14px").style("color","grey").style("opacity",".6").text("Click on bar to focus"),o.append("text").attr("x",g/2).attr("y",b+i.top*2.4).attr("text-anchor","middle").style("font-size","12px").style("font-weight","bold").text("Fire acres");function _(t){let a=x.filter(function(e){return e.FIRE_YEAR==t});l.domain(a.map(function(e){return e.NWCG_GENERAL_CAUSE})),y.transition().duration(1e3).call(r.axisLeft(l)),c.domain([0,r.max(a,function(e){return parseInt(e.FIRE_SIZE)})]),n.transition().duration(1e3).call(r.axisBottom(c));var f=o.selectAll("rect").data(a);f.join("rect").transition().duration(1e3).attr("x",c(0)).attr("x",c(0)).attr("class",function(e){return"val"+e.VALUE+"bar bars"}).attr("y",e=>l(e.NWCG_GENERAL_CAUSE)).attr("width",e=>c(e.FIRE_SIZE)).attr("height",l.bandwidth()).style("fill",function(e){return h(e.VALUE)}),r.selectAll("rect").on("mousedown",function(e,d){F(),this.classList.add("active"),R=""}),r.selectAll("rect").on("mouseup",C)}_(2e3);function F(){let t=document.getElementsByClassName("bars");for(let a=0;a<=t.length-1;a++)t[a].classList.remove("active")}function w(){r.selectAll(".slider").each(function(t){let f=r.select(this).property("value"),e="year"+f;E=f,_(E),s.selectAll(".dataCircles").transition().duration(1e3).style("opacity",0).attr("r",0),s.selectAll("."+e).transition().duration(1e3).style("opacity",1).attr("r",function(d){return u(d.FIRE_SIZE)})})}function C(t){r.selectAll("rect").each(function(a){r.select(this);let f=a.VALUE,e="val"+f;this.classList.contains("active")!=!0&&R!=e?(s.selectAll("."+e+""+E).transition().duration(1e3).style("opacity",.3).style("stroke",function(d){return h(d.VALUE)}).attr("fill-opacity",.4),o.selectAll("."+e+"bar").transition().duration(1e3).style("fill",function(d){return G(d.VALUE)})):(console.log("ACTIVE BUTTON DETECTED"),console.log(e+"bar"),console.log(e+"bar"),R=e,s.selectAll("."+e+""+E).transition().duration(1e3).style("opacity",1).style("stroke","black").attr("fill-opacity",.8),o.selectAll("."+e+"bar").transition().duration(1e3).style("fill",function(d){return h(d.VALUE)}))})}r.selectAll(".slider").on("change",w),r.selectAll(".checkbox").on("change",C),w();var L=[B,A/2,A],U=50,k=100,m=380;s.selectAll("legend").data(L).enter().append("circle").attr("cx",U).attr("cy",function(t){return m-u(t)}).attr("r",function(t){return u(t)}).style("fill","none").attr("stroke","black"),s.selectAll("legend").data(L).enter().append("line").attr("x1",function(t){return U+u(t)}).attr("x2",k).attr("y1",function(t){return m-u(t)*1.5}).attr("y2",function(t){return m-u(t)*1.5}).attr("stroke","black").style("stroke-dasharray","2,2"),s.selectAll("legend").data(L).enter().append("text").attr("x",k).attr("y",function(t){return m-u(t)*1.5}).text(function(t){return t==A?t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+" acres":t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}).style("font-size",12).attr("alignment-baseline","middle")})});var D=document.getElementById("yearShown");myRange.oninput=function(){D.innerHTML=this.value};