import * as d3 from 'https://unpkg.com/d3?module'
// import vegaEmbed from "vega-embed";

//getting lots of code and insight from: https://www.d3-graph-gallery.com/index.html


// Size 
var width = 650;
var height = 400;
var widthBar = 450;
var heightBar = 250;
var margin = {top: 20, right: 30, bottom: 100, left: 130};

let activeValue = "";

var currentMapYear = '2000';

var colorrange = ["#7c0202", "#b64d24", "#b86213", "#e18820", "#de9b10", "#f3c523", "#7c5201", "#fac45a", "#fd860b", "#ffdc6c", "#ff4901", "#a43407"] //we can change these colors later :)
var colorrangeSoft = ["#edc4c4", "#c3a599", "#dfc4ab", "#efc493", "#e7d6b5", "#f7e5a6", "#cfc8bb", "#fce8c0", "#ffbb76", "#fff1c3", "#fa976f", "#a16851"]
var categories = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']


//adjusting the size of the circle for both the bubble map and the key to use
var minRadiusRange = 1;
var maxRadiusRange = 260000;

// Map and projection
var projection = d3.geoMercator()
    .center([-96, 37])                // GPS of location to zoom on
    .scale(588)                       // This is like the zoom
    .translate([ width/2, height/2 ])


// create a tooltip
 var Tooltip = d3.select("#my_dataviz")
 .append("div")
 .attr("class", "tooltip")
 .style("opacity", 0)
 .style("background-color", "white")
 .style("border", "solid")
 .style("border-width", "2px")
 .style("border-radius", "5px")
 .style("padding", "5px")

var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

var color = d3.scaleOrdinal()
      .domain(categories)
      .range(colorrange)

var colorSoft = d3.scaleOrdinal()
      .domain(categories)
      .range(colorrangeSoft)

 // Add a scale for bubble size
 var size = d3.scaleLinear()
 .domain([minRadiusRange,maxRadiusRange])  // What's in the data
 .range([ 2, 25])  // Size in pixel


d3.csv("assets/firesfinaldata.csv").then((table)=>{


d3.json("assets/geojson/USA.geojson").then(function(data){

// Filter data
//data.features = data.features.filter( function(d){return d.properties.name=="USA"});

  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
      .attr("fill", "#b8b8b8")
      .attr("d", d3.geoPath()
          .projection(projection)
      )
    .style("stroke", "black")
    .style("opacity", .3)

  // Add circles:
  svg
  .selectAll("myCircles")
  .data(table)
  .enter()
  //.filter(function(d) { return (d.FIRE_YEAR== "2002") })
  .append("circle")
    .attr("class" , d => "year"+d.FIRE_YEAR+" dataCircles val"+ d.VALUE+""+d.FIRE_YEAR )
    .attr("cx", function(d){ return projection([d.LONGITUDE, d.LATITUDE])[0] })
    .attr("cy", function(d){ return projection([d.LONGITUDE, d.LATITUDE])[1] })
    .attr("r", function(d){ return size(d.FIRE_SIZE) })
    .style("fill", function(d){ return color(d.VALUE) })
    .attr("stroke", function(d){ return color(d.VALUE) })
    .attr("stroke-width", 3)
    .attr("fill-opacity", .4)
  .on("mouseover", function(event, d) {
      Tooltip.style("opacity", 1);
      Tooltip.style("display", "block");
    })
  .on("mousemove", function(event, d) {
      Tooltip
        .html("Fire year: " + d.FIRE_YEAR + "<br>Acres burned: " + d.FIRE_SIZE + "<br>Cause of fire: "+ d.NWCG_GENERAL_CAUSE+"<br>State: " + d.STATE + "<br>County: " + d.FIPS_NAME)
        .style("left", (event.x)+30 + "px")
        .style("top", (event.y)-30 + "px")
    })
  .on("mouseleave", function(event, d) {
      Tooltip.style("opacity", 0);
      Tooltip.style("display", "none");
    })

   //this is nothing important, just a very hacky way to add spacing between the map and bar chart
   d3.select("#my_dataviz")
   .append("svg")
     .attr("width", width)
     .attr("height", 60)

  //now we make the bar chart
  var svgBar = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", widthBar + margin.left + margin.right)
    .attr("height", heightBar + margin.top + margin.bottom)
    .attr("class","overflow-viz")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
  
  // Add X axis of the bar chart
  var x = d3.scaleLinear()
    .range([ 0, widthBar]);
  //add x axis to the bar chart svg
  const xAxis = svgBar.append("g")
    .attr("transform", "translate(0," + heightBar + ")");


  // Y axis
  var y = d3.scaleBand()
    .range([ 0, heightBar ])
    .padding(.1);
  //add y axis to the bar chart svg
  const yAxis = svgBar.append("g");
  
  //add labels for the bar chart
  svgBar.append("text")
    .attr("x", (widthBar / 2)-35) // 35 is arbitrary. Just need it to make title look centered            
    .attr("y", 0 - (margin.top*2.5))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("font-weight", "bold") 
    .text("Human-made fires by cause"); //Title of bar chart

  svgBar.append("text")
    .attr("x", (widthBar / 2)-35)             
    .attr("y", 0 - (margin.top*1.3))
    .attr("text-anchor", "middle")  
    .style("font-size", "14px") 
    .style("color", "grey")
    .style("opacity", ".6") 
    .text("Click on bar to focus"); // instructions for how to interact with bar chart
  
  svgBar.append("text")
    .attr("x", (widthBar / 2))             
    .attr("y", heightBar + (margin.top *2.4))
    .attr("text-anchor", "middle")  
    .style("font-size", "12px") 
    .style("font-weight", "bold") 
    .text("Fire acres"); //label for the x axis of the bar chart
    
  //now we add the bars, wooooooo
  function updateBarChart(selectedYear){

    //only get the subset of data for the year shown
    let yearData = table.filter( function(d){return d.FIRE_YEAR==selectedYear});
    // Y axis
    y.domain(yearData.map(function(d) { return d.NWCG_GENERAL_CAUSE; } ) )
    yAxis.transition().duration(1000).call(d3.axisLeft(y) ) 

    // Add X axis
    x.domain([0, d3.max(yearData, function(d) { return parseInt(d.FIRE_SIZE) }) ]);
    xAxis.transition().duration(1000).call(d3.axisBottom(x));
    // xAxis.selectAll("g")
    //      .call(d3.axisBottom(x)) 

    // map data to existing bars
    var bars = svgBar.selectAll("rect")
                  .data(yearData)

    bars
      .join("rect")
      .transition()
      .duration(1000)
        .attr("x", x(0) )
        .attr("x", x(0) )
        .attr("class",function(d){ return "val"+d.VALUE+"bar bars" })
        .attr("y", d => y(d.NWCG_GENERAL_CAUSE) )
        .attr("width", d => x(d.FIRE_SIZE))
        .attr("height", y.bandwidth() )
        .style("fill", function(d){ return color(d.VALUE) })
    // .attr("stroke", function(d){ return color(d.VALUE) })
    // .attr("stroke-width", 3)
    // .attr("fill-opacity", .4)
        // let allBars = document.getElementsByClassName("bars")
        // for(let i = 0; i <allBars.length; i++){
        //   console.log("BARRR");
        //   allBars[i].addEventListener("click", function() { toggleActive(this); });
        // }
   // When the bar chart is clicked, I run function
    d3.selectAll("rect").on("mousedown",function(event, d) {toggleActive(); this.classList.add("active"); selectedCategory = d.NWCG_GENERAL_CAUSE; activeValue = "";});
    d3.selectAll("rect").on("mouseup",updateBar);
  }
  //initializing the bar chart by calling the function we made above with the year we want to show first
  updateBarChart(2000);
  
  var selectedCategory = "";
  
  function toggleActive(){
      // console.log("ACTIVATREE");
      let allBars = document.getElementsByClassName("bars");
        for (let i = 0; i <= allBars.length-1 ;i++){
          allBars[i].classList.remove('active');
        }
  }


  function updateSlider(){
    // For each check box:
    d3.selectAll(".slider").each(function(d){
      let cb = d3.select(this);
      let newYear = cb.property("value")
      let grp = "year"+newYear;
      currentMapYear = newYear;
      
      updateBarChart(currentMapYear);

      svg.selectAll(".dataCircles").transition().duration(1000).style("opacity", 0).attr("r",0);
      // show the group that the slider indicates
      svg.selectAll("."+grp).transition().duration(1000).style("opacity", 1).attr("r", function(d){ return size(d.FIRE_SIZE) })
      // Otherwise I hide it
    })
  }


  function updateBar(e){
    // For each check box:
    // console.log("in UPDATE BAR")
    d3.selectAll("rect").each(function(d){
      let cb = d3.select(this);
      let ctgry = d.VALUE;
      let grp = "val" + ctgry;

      //console.log(grp+""+currentMapYear);
      if(this.classList.contains("active")!=true && activeValue != grp){
        //console.log(grp+"bar");
        // console.log("NOT ACTIVE");
        // console.log(grp);
        // console.log(activeValue);
        // console.log(activeValue != grp);
        svg.selectAll("."+grp+""+currentMapYear).transition().duration(1000).style("opacity", .3).style("stroke",  function(d){ return color(d.VALUE) }).attr("fill-opacity", .4);
        svgBar.selectAll("."+grp+"bar").transition().duration(1000).style("fill", function(d){ return colorSoft(d.VALUE) });
       }
      else{
        console.log("ACTIVE BUTTON DETECTED");
        console.log(grp+"bar");
        console.log(grp+"bar");
        //console.log(this);
        activeValue = grp;
        // console.log(activeValue);
        // console.log(grp);
        svg.selectAll("."+grp+""+currentMapYear).transition().duration(1000).style("opacity", 1).style("stroke",  "black" ).attr("fill-opacity", .8)
        svgBar.selectAll("."+grp+"bar").transition().duration(1000).style("fill", function(d){ return color(d.VALUE) });
      }
    })
  }

  function test (e){
    console.log("this is a test");
  }
  // When the slider changes, I run a function
  d3.selectAll(".slider").on("change",updateSlider);

  // When the bar chart is clicked, I run function
  // d3.selectAll("rect").on("mousedown",function(event, d) {toggleActive(); this.classList.add("active"); selectedCategory = d.NWCG_GENERAL_CAUSE; activeValue = "";});
  // d3.selectAll("rect").on("mouseup",updateBar);

  d3.selectAll(".checkbox").on("change",updateBar);

  // And I initialize it at the beginning
  updateSlider();
  //updateBar();

  //now I'm making the key
  var valuesToShow = [minRadiusRange, maxRadiusRange/2, maxRadiusRange]
  var xCircle = 50
  var xLabel = 100
  var yCircle = 380


  svg
  .selectAll("legend")
  .data(valuesToShow)
  .enter()
  .append("circle")
    .attr("cx", xCircle)
    .attr("cy", function(d){ return yCircle - size(d) } )
    .attr("r", function(d){ return size(d) })
    .style("fill", "none")
    .attr("stroke", "black")
  svg
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("line")
      .attr('x1', function(d){ return xCircle + size(d) } )
      .attr('x2', xLabel)
      .attr('y1', function(d){ return yCircle - size(d)*1.5 } )
      .attr('y2', function(d){ return yCircle - size(d)*1.5 } )
      .attr('stroke', 'black')
      .style('stroke-dasharray', ('2,2'))
  
  // Add legend: labels
  svg
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("text")
      .attr('x', xLabel)
      .attr('y', function(d){ return yCircle - size(d)*1.5 } )
      .text( function(d){ if(d == maxRadiusRange){return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" acres"}else{return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} } )
      .style("font-size", 12)
      .attr('alignment-baseline', 'middle')
    
})
});


var yearShown = document.getElementById("yearShown");
myRange.oninput = function() {
  // console.log(this)
  // console.log(this.value)
  yearShown.innerHTML = this.value;
}
