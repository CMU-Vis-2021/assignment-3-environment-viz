import * as d3 from "d3";
import vegaEmbed from "vega-embed";

//getting lots of code and insight from: https://www.d3-graph-gallery.com/index.html



// Size 
var width = 650;
var height = 400;
var widthBar = 450;
var heightBar = 200;
var margin = {top: 20, right: 30, bottom: 40, left: 130};

var currentMapYear = '2000';

var categories = ["arson_incendiarism", "equipment_and_vehicle_use","recreation_and_ceremony"];

//adjusting the size of the circle for both the bubble map and the key to use
var minRadiusRange = 1;
var maxRadiusRange = 260000;

// Map and projection
var projection = d3.geoMercator()
    .center([-96, 37])                // GPS of location to zoom on
    .scale(588)                       // This is like the zoom
    .translate([ width/2, height/2 ])

d3.json("assets/geojson/USA.geojson").then(function(data){
//d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data){
console.log("IN HERE");
// Filter data
//data.features = data.features.filter( function(d){return d.properties.name=="USA"});

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
 
    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function(event, d) {
      Tooltip.style("opacity", 1);
      Tooltip.style("display", "block");
    }
    var mousemove = function(event, d) {
      Tooltip
        .html(d.FIRE_SIZE + "<br>Category: "+d.CAUSE__ABRV+"<br>" + "long: " + d.LONGITUDE + "<br>" + "lat: " + d.LATITUDE)
        .style("left", (event.x)+30 + "px")
        .style("top", (event.y)-30 + "px")
    }
    var mouseleave = function(event, d) {
      Tooltip.style("opacity", 0);
      Tooltip.style("display", "none");
    }


var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

var color = d3.scaleOrdinal()
      .domain(["arson_incendiarism", "debris_and_open_burning", "equipment_and_vehicle_use", "power_generation","recreation_and_ceremony"])
      .range([  "#F5CBA7", "#EB984E", "#E67E22", "#A04000","#6E2C00"])

 // Add a scale for bubble size
 var size = d3.scaleLinear()
 .domain([minRadiusRange,maxRadiusRange])  // What's in the data
 .range([ 2, 25])  // Size in pixel

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
  console.log(markers)
  svg
  .selectAll("myCircles")
  .data(markers)
  .enter()
  //.filter(function(d) { return (d.FIRE_YEAR== "2002") })
  .append("circle")
    .attr("class" , d => "year"+d.FIRE_YEAR+" dataCircles "+ d.CAUSE__ABRV+""+d.FIRE_YEAR )
    .attr("cx", function(d){ return projection([d.LONGITUDE, d.LATITUDE])[0] })
    .attr("cy", function(d){ return projection([d.LONGITUDE, d.LATITUDE])[1] })
    .attr("r", function(d){ return size(d.FIRE_SIZE) })
    .style("fill", function(d){ return color(d.CAUSE__ABRV) })
    .attr("stroke", function(d){ return color(d.CAUSE__ABRV) })
    .attr("stroke-width", 3)
    .attr("fill-opacity", .4)
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)
  

  //now we make the bar chart
  var svgBar = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", widthBar + margin.left + margin.right)
    .attr("height", heightBar + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
  
  // Add X axis of the bar chart
  var x = d3.scaleLinear()
    .domain([0, 540000])
    .range([ 0, widthBar]);
  //add x axis to the bar chart svg
  const xAxis = svgBar.append("g")
    .attr("transform", "translate(0," + heightBar + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
  
  // Y axis
  var y = d3.scaleBand()
    .range([ 0, heightBar ])
    .domain(markers.map(d => d.CAUSE__ABRV))
    .padding(.1);
  //add y axis to the bar chart svg
  const yAxis = svgBar.append("g")
    .call(d3.axisLeft(y))
  
  //now we add the bars, wooooooo
  function updateBarChart(selectedYear){

    console.log("UPDATING BAR");
    let yearData = markers.filter( function(d){return d.FIRE_YEAR==selectedYear});
    console.log(yearData);
    // Y axis
    y.domain(yearData.map(function(d) { return d.CAUSE__ABRV; } ) )
    yAxis.transition().duration(1000).call(d3.axisLeft(y) ) 

    // Add X axis
    x.domain([0, d3.max(yearData, function(d) { return d.FIRE_SIZE }) ]);
    xAxis.transition().duration(1000).call(d3.axisBottom(x));

    // map data to existing bars
    var bars = svgBar.selectAll("rect")
                  .data(yearData)

    bars
      .join("rect")
      .transition()
      .duration(1000)
        .attr("x", x(0) )
        .attr("y", d => y(d.CAUSE__ABRV) )
        .attr("width", d => x(d.FIRE_SIZE))
        .attr("height", y.bandwidth() )
        .attr("fill", "#efa768")
  }
  updateBarChart(2000);
  // svgBar.selectAll("myRect")
  //   .data(markers)
  //   .join("rect")
  //   .attr("x", x(0) )
  //   .attr("onclick", "barClicked()" )
  //   .attr("y", d => y(d.CAUSE__ABRV))
  //   .attr("width", d => x(d.FIRE_SIZE))
  //   .attr("height", y.bandwidth())
  //   .attr("fill", "#efa768")
        
  function updateSlider(){
    // For each check box:
    d3.selectAll(".slider").each(function(d){
      let cb = d3.select(this);
      let newYear = cb.property("value")
      let grp = "year"+newYear;
      currentMapYear = newYear;
      
      updateBarChart(currentMapYear);
      let allButtons = document.getElementsByClassName("button");
          for (let i = 0; i <= allButtons.length-1 ;i++){
            allButtons[i].classList.remove('active');
          }

      svg.selectAll(".dataCircles").transition().duration(1000).style("opacity", 0).attr("r",0);
      // show the group that the slider indicates
        svg.selectAll("."+grp).transition().duration(1000).style("opacity", 1).attr("r", function(d){ return size(d.FIRE_SIZE) })
      // Otherwise I hide it
    })
  }

  function updateBar(){
    // For each check box:
    d3.selectAll(".button").each(function(d){
      let cb = d3.select(this);
      let grp = cb.property("value")
      console.log(this.classList.contains("active"));

      if(this.classList.contains("active")!=true){
        console.log("NOT SELECTED");
        svg.selectAll("."+grp+""+currentMapYear).transition().duration(1000).style("opacity", 0).attr("r", 0)
       }
      else{
        console.log("SELECTED");
        svg.selectAll("."+grp+""+currentMapYear).transition().duration(1000).style("opacity", 1).attr("r", function(d){ return size(d.FIRE_SIZE) })
      }
    })
  }

  // When the slider changes, I run a function
  d3.selectAll(".slider").on("change",updateSlider);

  // When the bar chart is clicked, I run function
  d3.selectAll(".button").on("click",updateBar);


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


  //Handling the timeline slider
    
})



var yearShown = document.getElementById("yearShown");
myRange.oninput = function() {
  // console.log(this)
  // console.log(this.value)
  yearShown.innerHTML = this.value;
}




// d3.select("#d3-div").append("p").text("hello from D3");

// vegaEmbed("#vega-div", {
//   $schema: "https://vega.github.io/schema/vega-lite/v5.json",
//   description: "A simple bar chart with embedded data.",
//   data: {
//     values: [
//       { a: "A", b: 28 },
//       { a: "B", b: 55 },
//       { a: "C", b: 43 },
//       { a: "D", b: 91 },
//       { a: "E", b: 81 },
//       { a: "F", b: 53 },
//       { a: "G", b: 19 },
//       { a: "H", b: 87 },
//       { a: "I", b: 52 },
//     ],
//   },
//   mark: "bar",
//   encoding: {
//     x: { field: "a", type: "nominal", axis: { labelAngle: 0 } },
//     y: { field: "b", type: "quantitative" },
//   },
// });
