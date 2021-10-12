import * as d3 from "d3";
import vegaEmbed from "vega-embed";

//getting lots of code and insight from: https://www.d3-graph-gallery.com/index.html

// Size 
var width = 650;
var height = 400;

//adjusting the size of the circle for both the bubble map and the key to use
var minRadiusRange = 1;
var maxRadiusRange = 260000;

// Map and projection
var projection = d3.geoMercator()
    .center([-96, 37])                // GPS of location to zoom on
    .scale(588)                       // This is like the zoom
    .translate([ width/2, height/2 ])

// var firedata = d3.csv("assets/firedata.csv").then((table)=>{
//   console.log(table.slice(0,5));
// });
d3.csv("assets/firedata.csv").then((table)=>{
  d3.json("assets/geojson/USA.geojson").then(function(data){

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
      Tooltip.style("opacity", 1)
    }
    var mousemove = function(event, d) {
      Tooltip
        .html("Acres burned: " + d.FIRE_SIZE + "<br>" + "Longitude: " + d.LONGITUDE + "<br>" + "Latitude: " + d.LATITUDE)
        .style("left", (event.x)+30 + "px")
        .style("top", (event.y)-30 + "px")
    }
    var mouseleave = function(event, d) {
      Tooltip.style("opacity", 0)
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
    svg
      .selectAll("myCircles")
      .data(table)
      .enter()
      .filter(function(d) { return (d.NWCG_GENERAL_CAUSE == "Arson/incendiarism" 
                                    || d.NWCG_GENERAL_CAUSE == "Equipment and vehicle use" 
                                    || d.NWCG_GENERAL_CAUSE == "Recreation and ceremony") })
      .append("circle")
        .attr("class" , d => d.CAUSE__ABRV )
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

      function update(){
        // For each check box:
        d3.selectAll(".checkbox").each(function(d){
          let cb = d3.select(this);
          let grp = cb.property("value");

          // If the box is check, I show the group
          if(cb.property("checked")){
            console.log("showing group");
            console.log(grp);
            svg.selectAll("."+grp).transition().duration(1000).style("opacity", 1).attr("r", function(d){ return size(d.FIRE_SIZE) })

          // Otherwise I hide it
          }else{
            svg.selectAll("."+grp).transition().duration(1000).style("opacity", 0).attr("r", 0)
          }
        })
      }

      // When a button change, I run the update function
      d3.selectAll(".checkbox").on("change",update);

      // And I initialize it at the beginning
      update();

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



//setting the date range for the range slider
var minDateRange = new Date("1993-01-01"),
    maxDateRange = new Date("2017-12-31")

var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%b %Y");
var parseDate = d3.timeParse("%m/%d/%y");

var svgSlider = d3.select("#slider")
    .append("svg")
    .attr("width", 650)
    .attr("height", 50);

var dateRange = d3.scaleTime()
  .domain([minDateRange,maxDateRange])
  .range([0,600])
  .clamp(true)

var slider = svgSlider.append("g")
  .attr("class", "slider")
  .attr("transform", "translate(" + 10 + "," + 50 / 4 + ")");

// Add slider
slider.append("line")
    .attr("class", "track")
    .attr("x1", dateRange.range()[0])
    .attr("x2", dateRange.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() { update(dateRange.invert(d3.event.dateRange)); }));

slider.append("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
    .data(dateRange.ticks(10))
    .enter()
    .append("text")
    .attr("x", dateRange)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatDateIntoYear(d); });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

var label = slider.append("text")  
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDate(minDateRange))
    .attr("transform", "translate(0," + (-25) + ")");


