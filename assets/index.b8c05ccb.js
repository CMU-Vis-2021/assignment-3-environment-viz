import*as e from"https://unpkg.com/d3?module";const q=function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const g of s.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&c(g)}).observe(document,{childList:!0,subtree:!0});function h(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(o){if(o.ep)return;o.ep=!0;const s=h(o);fetch(o.href,s)}};q();var E=650,I=400,b=450,L=250,u={top:20,right:30,bottom:100,left:130};let w="";var T="2000",$=["#7c0202","#b64d24","#b86213","#e18820","#de9b10","#f3c523","#7c5201","#fac45a","#fd860b","#ffdc6c","#ff4901","#a43407"],H=["#edc4c4","#c3a599","#dfc4ab","#efc493","#e7d6b5","#f7e5a6","#cfc8bb","#fce8c0","#ffbb76","#fff1c3","#fa976f","#a16851"],Y=["0","1","2","3","4","5","6","7","8","9","10","11"],_={Alabama:"AL",Alaska:"AK",Arizona:"AZ",Arkansas:"AR",California:"CA",Colorado:"CO",Connecticut:"CT",Delaware:"DE",Florida:"FL",Georgia:"GA",Hawaii:"HI",Idaho:"ID",Illinois:"IL",Indiana:"IN",Iowa:"IA",Kansas:"KS",Kentucky:"KY",Louisiana:"LA",Maine:"ME",Maryland:"MD",Massachusetts:"MA",Michigan:"MI",Minnesota:"MN",Mississippi:"MS",Missouri:"MO",Montana:"MT",Nebraska:"NE",Nevada:"NV","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM","New York":"NY","North Carolina":"NC","North Dakota":"ND",Ohio:"OH",Oklahoma:"OK",Oregon:"OR",Pennsylvania:"PA","Rhode Island":"RI","South Carolina":"SC","South Dakota":"SD",Tennessee:"TN",Texas:"TX",Utah:"UT",Vermont:"VT",Virgina:"VA",Washington:"WA","West Virginia":"WV",Wisconsin:"WI",Wyoming:"WY"},J=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],m={Alabama:[-82,30,1e3],Alaska:[-147,60,400],Arizona:[-107,30,1e3],Arkansas:[-87,31,1e3],California:[-113,34,1e3],Colorado:[-100,35,1e3],Connecticut:[-70,40,2e3],Delaware:[-74,38,3e3],Florida:[-80,26,1300],Georgia:[-79,30,1e3],Hawaii:[-155,19,2e3],Idaho:[-111,43,1e3],Illinois:[-84,38,1300],Indiana:[-84,38,1300],Iowa:[-91,40,1300],Kansas:[-96,37,1300],Kentucky:[-82,35,1300],Louisiana:[-89,30,1300],Maine:[-66,44,1300],Maryland:[-74,37,1500],Massachusetts:[-69,41,1900],Michigan:[-83,43,1300],Minnesota:[-92,45,1300],Mississippi:[-86,30,1300],Missouri:[-90,37,1400],Montana:[-108,46,1300],Nebraska:[-98,40,1300],Nevada:[-115,35,1e3],"New Hampshire":[-69,43,1700],"New Jersey":[-72,38,1900],"New Mexico":[-103,30,1e3],"New York":[-73,41,1400],"North Carolina":[-77,33,1300],"North Dakota":[-99,46,1300],Ohio:[-81,39,1700],Oklahoma:[-95,34,1400],Oregon:[-119,43,1300],Pennsylvania:[-76,40,1600],"Rhode Island":[-70,41,3500],"South Carolina":[-79,32,1600],"South Dakota":[-99,43,1400],Tennessee:[-82,34,1700],Texas:[-95,30,1e3],Utah:[-110,37,1400],Vermont:[-71,43,1800],Virginia:[-78,36,1500],Washington:[-118,46,1300],"West Virginia":[-79,37,1500],Wisconsin:[-88,43,1400],Wyoming:[-106,42,1300]},H=["#edc4c4","#c3a599","#dfc4ab","#efc493","#e7d6b5","#f7e5a6","#cfc8bb","#fce8c0","#ffbb76","#fff1c3","#fa976f","#a16851"],j=1,x=26e4,R=e.geoMercator().center([-96,37]).scale(588).translate([E/2,I/2]),v=e.select("#my_dataviz").append("div").attr("class","tooltip").style("opacity",0).style("background-color","white").style("border","solid").style("border-width","2px").style("border-radius","5px").style("padding","5px"),f=e.select("#my_dataviz").append("svg").attr("width",E).attr("height",I),d=e.scaleOrdinal().domain(Y).range($),X=e.scaleOrdinal().domain(Y).range(H),y=e.scaleLinear().domain([j,x]).range([2,25]);e.csv("assets/firesfinaldata.csv").then(C=>{e.json("assets/geojson/USA.geojson").then(function(p){let h=C.filter(t=>t.STATE!="AK");h=h.filter(t=>t.STATE!="HI"),f.append("g").selectAll("path").data(p.features).enter().append("path").attr("fill","#b8b8b8").attr("d",e.geoPath().projection(R)).style("stroke","black").style("opacity",.3),f.selectAll("myCircles").data(h).enter().append("circle").attr("class",t=>"year"+t.FIRE_YEAR+" dataCircles val"+t.VALUE+""+t.FIRE_YEAR).attr("cx",function(t){return R([t.LONGITUDE,t.LATITUDE])[0]}).attr("cy",function(t){return R([t.LONGITUDE,t.LATITUDE])[1]}).attr("r",function(t){return y(t.FIRE_SIZE)}).style("fill",function(t){return d(t.VALUE)}).attr("stroke",function(t){return d(t.VALUE)}).attr("stroke-width",3).attr("fill-opacity",.4).on("mouseover",function(t,r){v.style("opacity",1),v.style("display","block")}).on("mousemove",function(t,r){v.html("Fire year: "+r.FIRE_YEAR+"<br>Acres burned: "+r.FIRE_SIZE+"<br>Cause of fire: "+r.NWCG_GENERAL_CAUSE+"<br>State: "+r.STATE+"<br>County: "+r.FIPS_NAME).style("left",t.x+30+"px").style("top",t.y-30+"px")}).on("mouseleave",function(t,r){v.style("opacity",0),v.style("display","none")}),e.select("#my_dataviz").append("svg").attr("width",E).attr("height",60),e.select("#my_dataviz").append("svg").attr("width",E).attr("height",60);var c=e.select("#my_dataviz").append("svg").attr("width",b+u.left+u.right).attr("height",L+u.top+u.bottom).attr("class","overflow-viz").append("g").attr("transform","translate("+u.left+","+u.top+")"),o=e.scaleLinear().range([0,b]);const s=c.append("g").attr("transform","translate(0,"+L+")");var g=e.scaleBand().range([0,L]).padding(.1);const z=c.append("g");c.append("text").attr("x",b/2-35).attr("y",0-u.top*2.5).attr("text-anchor","middle").style("font-size","16px").style("font-weight","bold").text("Human-made fires by cause"),c.append("text").attr("x",b/2-35).attr("y",0-u.top*1.3).attr("text-anchor","middle").style("font-size","14px").style("color","grey").style("opacity",".6").text("Click on bar to focus"),c.append("text").attr("x",b/2).attr("y",L+u.top*2.4).attr("text-anchor","middle").style("font-size","12px").style("font-weight","bold").text("Fire acres");function D(t){let r=h.filter(function(a){return a.FIRE_YEAR==t});g.domain(r.map(function(a){return a.NWCG_GENERAL_CAUSE})),z.transition().duration(1e3).call(e.axisLeft(g)),o.domain([0,e.max(r,function(a){return parseInt(a.FIRE_SIZE)})]),s.transition().duration(1e3).call(e.axisBottom(o));var l=[];r.reduce(function(a,n){return a[n.NWCG_GENERAL_CAUSE]||(a[n.NWCG_GENERAL_CAUSE]={NWCG_GENERAL_CAUSE:n.NWCG_GENERAL_CAUSE,VALUE:n.VALUE,qty:0},l.push(a[n.NWCG_GENERAL_CAUSE])),a[n.NWCG_GENERAL_CAUSE].qty+=parseInt(n.FIRE_SIZE),a},{}),console.log("RESULT"),console.log(l);var i=c.selectAll("rect").data(l);i.join("rect").transition().duration(1e3).attr("x",o(0)).attr("x",o(0)).attr("class",function(a){return"val"+a.VALUE+"bar bars"}).attr("y",a=>g(a.NWCG_GENERAL_CAUSE)).attr("width",a=>o(a.qty)).attr("height",g.bandwidth()).style("fill",function(a){return d(a.VALUE)}),e.selectAll("rect").on("mousedown",function(a,n){K(),this.classList.add("active"),w=""}),e.selectAll("rect").on("mouseup",V)}D(2e3);function K(){let t=document.getElementsByClassName("bars");for(let r=0;r<=t.length-1;r++)t[r].classList.remove("active")}function F(){e.selectAll(".slider").each(function(t){let l=e.select(this).property("value"),i="year"+l;T=l,D(T),f.selectAll(".dataCircles").transition().duration(1e3).style("opacity",0).attr("r",0),f.selectAll("."+i).transition().duration(1e3).style("opacity",1).attr("r",function(a){return y(a.FIRE_SIZE)})})}function V(t){e.selectAll("rect").each(function(r){e.select(this);let l=r.VALUE,i="val"+l;this.classList.contains("active")!=!0&&w!=i?(f.selectAll("."+i+""+T).transition().duration(1e3).style("opacity",.3).style("stroke",function(a){return d(a.VALUE)}).attr("fill-opacity",.4),c.selectAll("."+i+"bar").transition().duration(1e3).style("fill",function(a){return X(a.VALUE)})):(console.log("ACTIVE BUTTON DETECTED"),console.log(i+"bar"),console.log(i+"bar"),w=i,f.selectAll("."+i+""+T).transition().duration(1e3).style("opacity",1).style("stroke","black").attr("fill-opacity",.8),c.selectAll("."+i+"bar").transition().duration(1e3).style("fill",function(a){return d(a.VALUE)}))})}e.selectAll(".slider").on("change",F),e.selectAll(".checkbox").on("change",V),F();var S=[j,x/2,x],O=50,W=100,N=380;f.selectAll("legend").data(S).enter().append("circle").attr("cx",O).attr("cy",function(t){return N-y(t)}).attr("r",function(t){return y(t)}).style("fill","none").attr("stroke","black"),f.selectAll("legend").data(S).enter().append("line").attr("x1",function(t){return O+y(t)}).attr("x2",W).attr("y1",function(t){return N-y(t)*1.5}).attr("y2",function(t){return N-y(t)*1.5}).attr("stroke","black").style("stroke-dasharray","2,2"),f.selectAll("legend").data(S).enter().append("text").attr("x",W).attr("y",function(t){return N-y(t)*1.5}).text(function(t){return t==x?t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+" acres":t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}).style("font-size",12).attr("alignment-baseline","middle");var A=e.select("#state").append("svg").attr("width",400).attr("height",300);e.select("#stateSelect").selectAll("myStates").data(J).enter().append("option").text(function(t){return t}).attr("value",function(t){return t});let P=document.getElementById("stateSelect");P.value="Texas";var k=e.geoMercator().center([m.Texas[0],m.Texas[1]]).scale(m.Texas[2]).translate([E/2,I/2]);console.log(p.features),state.features=p.features.filter(function(t){return t.properties.NAME=="Texas"}),console.log(state.features),A.selectAll("path").data(state.features).join("path").transition().duration(1e3).attr("fill","#b8b8b8").attr("d",e.geoPath().projection(k)).style("stroke","black").style("opacity",.3);let M=document.querySelector("#hover_Text");M.innerHTML="Year of Fire: <br> Cause of Fire: <br> Number of acres burned: <br>Location of Fire:";function Z(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function G(t){if(!t){M.innerHTML="Year of Fire: <br> Cause of Fire: <br> Number of acres burned: <br>Location of Fire:";return}M.innerHTML=`Year of Fire: ${t.year} <br>
    Cause of Fire: ${t.cause} <br> 
    Number of acres burned: ${Z(t.acres)} 
    <br>
    Location of Fire: ${t.county}, ${t.state}`}A.selectAll("myCircles").data(C).join("circle").attr("class",t=>"state"+t.STATE).attr("cx",function(t){return k([t.LONGITUDE,t.LATITUDE])[0]}).attr("cy",function(t){return k([t.LONGITUDE,t.LATITUDE])[1]}).attr("r",0).style("fill",function(t){return d(t.VALUE)}).attr("stroke",function(t){return d(t.VALUE)}).attr("stroke-width",3).attr("fill-opacity",.4).on("mouseover",function(t,r){G({acres:r.FIRE_SIZE,state:r.STATE,year:r.FIRE_YEAR,county:r.FIPS_NAME,cause:r.NWCG_GENERAL_CAUSE})}).on("mouseout",function(t){G()});var U="Texas";function B(t){state.features=p.features.filter(function(n){return n.properties.NAME==t});var r=e.geoMercator().center([m[t][0],m[t][1]]).scale(m[t][2]).translate([E/2,I/2]);A.selectAll("path").data(state.features).join("path").transition().duration(1e3).attr("fill","#b8b8b8").attr("d",e.geoPath().projection(r)).style("stroke","black").style("opacity",.3),console.log(t);var l=document.getElementById("stateSelect"),i=l.value;console.log(i);let a=_[t];A.selectAll("myCircles").attr("class",n=>"state"+n.STATE).attr("r",0).style("fill",function(n){return d(n.VALUE)}).attr("stroke",function(n){return d(n.VALUE)}).attr("stroke-width",3).attr("fill-opacity",.4),console.log("group"),console.log(a),A.selectAll(".state"+a).attr("cx",function(n){return r([n.LONGITUDE,n.LATITUDE])[0]}).attr("cy",function(n){return r([n.LONGITUDE,n.LATITUDE])[1]}).transition().duration(1e3).style("opacity",1).attr("r",function(n){return y(n.FIRE_SIZE)})}B("Texas"),e.select("#stateSelect").on("change",function(t,r){console.log("In on change"),console.log("currentselection is"),console.log(_[U]),A.selectAll(".state"+_[U]).transition().duration(1e3).style("opacity",0).attr("r",0);const l=e.select(this).property("value");console.log(r),console.log(t),console.log("leaving on change"),U=l,B(l)})})});var Q=document.getElementById("yearShown");myRange.oninput=function(){Q.innerHTML=this.value};
