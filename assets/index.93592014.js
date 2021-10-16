import*as e from"https://unpkg.com/d3?module";const $=function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const g of i.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&s(g)}).observe(document,{childList:!0,subtree:!0});function h(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=h(n);fetch(n.href,i)}};$();var v=650,N=400,b=450,T=250,u={top:20,right:30,bottom:100,left:130};let U="";var x="2000",J=["#7c0202","#b64d24","#b86213","#e18820","#de9b10","#f3c523","#7c5201","#fac45a","#fd860b","#ffdc6c","#ff4901","#a43407"],Y=["#edc4c4","#c3a599","#dfc4ab","#efc493","#e7d6b5","#f7e5a6","#cfc8bb","#fce8c0","#ffbb76","#fff1c3","#fa976f","#a16851"],j=["0","1","2","3","4","5","6","7","8","9","10","11"],R={Alabama:"AL",Alaska:"AK",Arizona:"AZ",Arkansas:"AR",California:"CA",Colorado:"CO",Connecticut:"CT",Delaware:"DE",Florida:"FL",Georgia:"GA",Hawaii:"HI",Idaho:"ID",Illinois:"IL",Indiana:"IN",Iowa:"IA",Kansas:"KS",Kentucky:"KY",Louisiana:"LA",Maine:"ME",Maryland:"MD",Massachusetts:"MA",Michigan:"MI",Minnesota:"MN",Mississippi:"MS",Missouri:"MO",Montana:"MT",Nebraska:"NE",Nevada:"NV","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM","New York":"NY","North Carolina":"NC","North Dakota":"ND",Ohio:"OH",Oklahoma:"OK",Oregon:"OR",Pennsylvania:"PA","Rhode Island":"RI","South Carolina":"SC","South Dakota":"SD",Tennessee:"TN",Texas:"TX",Utah:"UT",Vermont:"VT",Virgina:"VA",Washington:"WA","West Virginia":"WV",Wisconsin:"WI",Wyoming:"WY"},q=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],m={Alabama:[-82,30,1e3],Alaska:[-147,60,400],Arizona:[-107,30,1e3],Arkansas:[-87,31,1e3],California:[-113,34,1e3],Colorado:[-100,35,1e3],Connecticut:[-70,40,2e3],Delaware:[-74,38,3e3],Florida:[-80,26,1300],Georgia:[-79,30,1e3],Hawaii:[-155,19,2e3],Idaho:[-111,43,1e3],Illinois:[-84,38,1300],Indiana:[-84,38,1300],Iowa:[-91,40,1300],Kansas:[-96,37,1300],Kentucky:[-82,35,1300],Louisiana:[-89,30,1300],Maine:[-66,44,1300],Maryland:[-74,37,1500],Massachusetts:[-69,41,1900],Michigan:[-83,43,1300],Minnesota:[-92,45,1300],Mississippi:[-86,30,1300],Missouri:[-90,37,1400],Montana:[-108,46,1300],Nebraska:[-98,40,1300],Nevada:[-115,35,1e3],"New Hampshire":[-69,43,1700],"New Jersey":[-72,38,1900],"New Mexico":[-103,30,1e3],"New York":[-73,41,1400],"North Carolina":[-77,33,1300],"North Dakota":[-99,46,1300],Ohio:[-81,39,1700],Oklahoma:[-95,34,1400],Oregon:[-119,43,1300],Pennsylvania:[-76,40,1600],"Rhode Island":[-70,41,3500],"South Carolina":[-79,32,1600],"South Dakota":[-99,43,1400],Tennessee:[-82,34,1700],Texas:[-95,30,1e3],Utah:[-110,37,1400],Vermont:[-71,43,1800],Virginia:[-78,36,1500],Washington:[-118,46,1300],"West Virginia":[-79,37,1500],Wisconsin:[-88,43,1400],Wyoming:[-106,42,1300]},Y=["#edc4c4","#c3a599","#dfc4ab","#efc493","#e7d6b5","#f7e5a6","#cfc8bb","#fce8c0","#ffbb76","#fff1c3","#fa976f","#a16851"],z=1,L=26e4,D=e.geoMercator().center([-96,37]).scale(588).translate([v/2,N/2]),E=e.select("#my_dataviz").append("div").attr("class","tooltip").style("opacity",0).style("background-color","white").style("border","solid").style("border-width","2px").style("border-radius","5px").style("padding","5px"),f=e.select("#my_dataviz").append("svg").attr("width",v).attr("height",N),d=e.scaleOrdinal().domain(j).range(J),X=e.scaleOrdinal().domain(j).range(Y),y=e.scaleLinear().domain([z,L]).range([2,25]);e.csv("assets/firesfinaldata.csv").then(S=>{e.json("assets/geojson/USA.geojson").then(function(p){let h=S.filter(t=>t.STATE!="AK");h=h.filter(t=>t.STATE!="HI"),f.append("g").selectAll("path").data(p.features).enter().append("path").attr("fill","#b8b8b8").attr("d",e.geoPath().projection(D)).style("stroke","black").style("opacity",.3),f.selectAll("myCircles").data(h).enter().append("circle").attr("class",t=>"year"+t.FIRE_YEAR+" dataCircles val"+t.VALUE+""+t.FIRE_YEAR).attr("cx",function(t){return D([t.LONGITUDE,t.LATITUDE])[0]}).attr("cy",function(t){return D([t.LONGITUDE,t.LATITUDE])[1]}).attr("r",function(t){return y(t.FIRE_SIZE)}).style("fill",function(t){return d(t.VALUE)}).attr("stroke",function(t){return d(t.VALUE)}).attr("stroke-width",3).attr("fill-opacity",.4).on("mouseover",function(t,a){E.style("opacity",1),E.style("display","block")}).on("mousemove",function(t,a){E.html("Fire year: "+a.FIRE_YEAR+"<br>Acres burned: "+a.FIRE_SIZE+"<br>Cause of fire: "+a.NWCG_GENERAL_CAUSE+"<br>State: "+a.STATE+"<br>County: "+a.FIPS_NAME).style("left",t.x+30+"px").style("top",t.y-30+"px")}).on("mouseleave",function(t,a){E.style("opacity",0),E.style("display","none")}),e.select("#my_dataviz").append("svg").attr("width",v).attr("height",60);var s=e.select("#my_dataviz").append("svg").attr("width",b+u.left+u.right).attr("height",T+u.top+u.bottom).attr("class","overflow-viz").append("g").attr("transform","translate("+u.left+","+u.top+")"),n=e.scaleLinear().range([0,b]);const i=s.append("g").attr("transform","translate(0,"+T+")");var g=e.scaleBand().range([0,T]).padding(.1);const G=s.append("g");s.append("text").attr("x",b/2-35).attr("y",0-u.top*2.5).attr("text-anchor","middle").style("font-size","16px").style("font-weight","bold").text("Human-made fires by cause"),s.append("text").attr("x",b/2-35).attr("y",0-u.top*1.3).attr("text-anchor","middle").style("font-size","14px").style("color","grey").style("opacity",".6").text("Click on bar to focus"),s.append("text").attr("x",b/2).attr("y",T+u.top*2.4).attr("text-anchor","middle").style("font-size","12px").style("font-weight","bold").text("Fire acres");function F(t){let a=h.filter(function(r){return r.FIRE_YEAR==t});g.domain(a.map(function(r){return r.NWCG_GENERAL_CAUSE})),G.transition().duration(1e3).call(e.axisLeft(g)),n.domain([0,e.max(a,function(r){return parseInt(r.FIRE_SIZE)})]),i.transition().duration(1e3).call(e.axisBottom(n));var l=s.selectAll("rect").data(a);l.join("rect").transition().duration(1e3).attr("x",n(0)).attr("x",n(0)).attr("class",function(r){return"val"+r.VALUE+"bar bars"}).attr("y",r=>g(r.NWCG_GENERAL_CAUSE)).attr("width",r=>n(r.FIRE_SIZE)).attr("height",g.bandwidth()).style("fill",function(r){return d(r.VALUE)}),e.selectAll("rect").on("mousedown",function(r,c){K(),this.classList.add("active"),U=""}),e.selectAll("rect").on("mouseup",O)}F(2e3);function K(){let t=document.getElementsByClassName("bars");for(let a=0;a<=t.length-1;a++)t[a].classList.remove("active")}function _(){e.selectAll(".slider").each(function(t){let l=e.select(this).property("value"),r="year"+l;x=l,F(x),f.selectAll(".dataCircles").transition().duration(1e3).style("opacity",0).attr("r",0),f.selectAll("."+r).transition().duration(1e3).style("opacity",1).attr("r",function(c){return y(c.FIRE_SIZE)})})}function O(t){e.selectAll("rect").each(function(a){e.select(this);let l=a.VALUE,r="val"+l;this.classList.contains("active")!=!0&&U!=r?(f.selectAll("."+r+""+x).transition().duration(1e3).style("opacity",.3).style("stroke",function(c){return d(c.VALUE)}).attr("fill-opacity",.4),s.selectAll("."+r+"bar").transition().duration(1e3).style("fill",function(c){return X(c.VALUE)})):(console.log("ACTIVE BUTTON DETECTED"),console.log(r+"bar"),console.log(r+"bar"),U=r,f.selectAll("."+r+""+x).transition().duration(1e3).style("opacity",1).style("stroke","black").attr("fill-opacity",.8),s.selectAll("."+r+"bar").transition().duration(1e3).style("fill",function(c){return d(c.VALUE)}))})}e.selectAll(".slider").on("change",_),e.selectAll(".checkbox").on("change",O),_();var k=[z,L/2,L],V=50,W=100,I=380;f.selectAll("legend").data(k).enter().append("circle").attr("cx",V).attr("cy",function(t){return I-y(t)}).attr("r",function(t){return y(t)}).style("fill","none").attr("stroke","black"),f.selectAll("legend").data(k).enter().append("line").attr("x1",function(t){return V+y(t)}).attr("x2",W).attr("y1",function(t){return I-y(t)*1.5}).attr("y2",function(t){return I-y(t)*1.5}).attr("stroke","black").style("stroke-dasharray","2,2"),f.selectAll("legend").data(k).enter().append("text").attr("x",W).attr("y",function(t){return I-y(t)*1.5}).text(function(t){return t==L?t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+" acres":t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}).style("font-size",12).attr("alignment-baseline","middle");var A=e.select("#state").append("svg").attr("width",400).attr("height",300);e.select("#stateSelect").selectAll("myStates").data(q).enter().append("option").text(function(t){return t}).attr("value",function(t){return t});let P=document.getElementById("stateSelect");P.value="Texas";var M=e.geoMercator().center([m.Texas[0],m.Texas[1]]).scale(m.Texas[2]).translate([v/2,N/2]);console.log(p.features),state.features=p.features.filter(function(t){return t.properties.NAME=="Texas"}),console.log(state.features),A.selectAll("path").data(state.features).join("path").transition().duration(1e3).attr("fill","#b8b8b8").attr("d",e.geoPath().projection(M)).style("stroke","black").style("opacity",.3);let C=document.querySelector("#hover_Text");C.innerHTML="Year of Fire: <br> Cause of Fire: <br> Number of acres burned: <br>Location of Fire:";function Z(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function B(t){if(!t){C.innerHTML="Year of Fire: <br> Cause of Fire: <br> Number of acres burned: <br>Location of Fire:";return}C.innerHTML=`Year of Fire: ${t.year} <br>
    Cause of Fire: ${t.cause} <br> 
    Number of acres burned: ${Z(t.acres)} 
    <br>
    Location of Fire: ${t.county}, ${t.state}`}A.selectAll("myCircles").data(S).join("circle").attr("class",t=>"state"+t.STATE).attr("cx",function(t){return M([t.LONGITUDE,t.LATITUDE])[0]}).attr("cy",function(t){return M([t.LONGITUDE,t.LATITUDE])[1]}).attr("r",0).style("fill",function(t){return d(t.VALUE)}).attr("stroke",function(t){return d(t.VALUE)}).attr("stroke-width",3).attr("fill-opacity",.4).on("mouseover",function(t,a){B({acres:a.FIRE_SIZE,state:a.STATE,year:a.FIRE_YEAR,county:a.FIPS_NAME,cause:a.NWCG_GENERAL_CAUSE})}).on("mouseout",function(t){B()});var w="Texas";function H(t){state.features=p.features.filter(function(o){return o.properties.NAME==t});var a=e.geoMercator().center([m[t][0],m[t][1]]).scale(m[t][2]).translate([v/2,N/2]);A.selectAll("path").data(state.features).join("path").transition().duration(1e3).attr("fill","#b8b8b8").attr("d",e.geoPath().projection(a)).style("stroke","black").style("opacity",.3),console.log(t);var l=document.getElementById("stateSelect"),r=l.value;console.log(r);let c=R[t];A.selectAll("myCircles").attr("class",o=>"state"+o.STATE).attr("r",0).style("fill",function(o){return d(o.VALUE)}).attr("stroke",function(o){return d(o.VALUE)}).attr("stroke-width",3).attr("fill-opacity",.4),console.log("group"),console.log(c),A.selectAll(".state"+c).attr("cx",function(o){return a([o.LONGITUDE,o.LATITUDE])[0]}).attr("cy",function(o){return a([o.LONGITUDE,o.LATITUDE])[1]}).transition().duration(1e3).style("opacity",1).attr("r",function(o){return y(o.FIRE_SIZE)})}H("Texas"),e.select("#stateSelect").on("change",function(t,a){console.log("In on change"),console.log("currentselection is"),console.log(R[w]),A.selectAll(".state"+R[w]).transition().duration(1e3).style("opacity",0).attr("r",0);const l=e.select(this).property("value");console.log(a),console.log(t),console.log("leaving on change"),w=l,H(l)})})});var Q=document.getElementById("yearShown");myRange.oninput=function(){Q.innerHTML=this.value};