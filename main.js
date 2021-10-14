import * as d3 from 'https://unpkg.com/d3?module';
import vegaEmbed from "vega-embed";

//getting code from: https://codepen.io/ames/pen/vLVavK
//https://bost.ocks.org/mike/bubble-map/

// var svg = d3.select("svg"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height");
// Size 
var width = 460
var height = 400

// Map and projection
var projection = d3.geoMercator()
    .center([-98, 39])                // GPS of location to zoom on
    .scale(410)                       // This is like the zoom
    .translate([ width/2, height/2 ])


// Create data for circles:
var markers = [
  {
    "FIRE_YEAR": 1996,
    "NWCG_CAUSE_CLASSIFICATION": "Human",
    "NWCG_GENERAL_CAUSE": "Arson/incendiarism",
    "FIRE_SIZE": 83323,
    "LATITUDE": 39.25833333,
    "LONGITUDE": -122.9166667,
    "STATE": "CA"
  },
  {
    "FIRE_YEAR": 1999,
    "NWCG_CAUSE_CLASSIFICATION": "Human",
    "NWCG_GENERAL_CAUSE": "Arson/incendiarism",
    "FIRE_SIZE": 158000,
    "LATITUDE": 26.2337,
    "LONGITUDE": -80.7665,
    "STATE": "FL"
  },
  {
    "FIRE_YEAR": 2000,
    "NWCG_CAUSE_CLASSIFICATION": "Human",
    "NWCG_GENERAL_CAUSE": "Arson/incendiarism",
    "FIRE_SIZE": 83508,
    "LATITUDE": 43.73166667,
    "LONGITUDE": -103.8866667,
    "STATE": "SD"
  },
  {
    "FIRE_YEAR": 2002,
    "NWCG_CAUSE_CLASSIFICATION": "Human",
    "NWCG_GENERAL_CAUSE": "Arson/incendiarism",
    "FIRE_SIZE": 259158.9,
    "LATITUDE": 34.1084,
    "LONGITUDE": -110.4859,
    "STATE": "AZ"
  },
  {
    "FIRE_YEAR": 2002,
    "NWCG_CAUSE_CLASSIFICATION": "Human",
    "NWCG_GENERAL_CAUSE": "Arson/incendiarism",
    "FIRE_SIZE": 209704.1,
    "LATITUDE": 34.1362,
    "LONGITUDE": -110.7029,
    "STATE": "AZ"
  },
  {
    "FIRE_YEAR": 2002,
    "NWCG_CAUSE_CLASSIFICATION": "Human",
    "NWCG_GENERAL_CAUSE": "Arson/incendiarism",
    "FIRE_SIZE": 189688,
    "LATITUDE": 62.6994,
    "LONGITUDE": -155.6523,
    "STATE": "AK"
  },
  {
    "FIRE_YEAR": 2003,
    "NWCG_CAUSE_CLASSIFICATION": "Human",
    "NWCG_GENERAL_CAUSE": "Arson/incendiarism",
    "FIRE_SIZE": 91281,
    "LATITUDE": 34.19694444,
    "LONGITUDE": -117.2761111,
    "STATE": "CA"
  },
  {
    "FIRE_YEAR": 2009,
    "NWCG_CAUSE_CLASSIFICATION": "Human",
    "NWCG_GENERAL_CAUSE": "Arson/incendiarism",
    "FIRE_SIZE": 160371,
    "LATITUDE": 34.2425,
    "LONGITUDE": -118.1888889,
    "STATE": "CA"
  },
  {
    "FIRE_YEAR": 2012,
    "NWCG_CAUSE_CLASSIFICATION": "Human",
    "NWCG_GENERAL_CAUSE": "Arson/incendiarism",
    "FIRE_SIZE": 107847,
    "LATITUDE": 39.3231,
    "LONGITUDE": -112.3881,
    "STATE": "UT"
  },
  {
    "FIRE_YEAR": 2013,
    "NWCG_CAUSE_CLASSIFICATION": "Human",
    "NWCG_GENERAL_CAUSE": "Arson/incendiarism",
    "FIRE_SIZE": 87154.4,
    "LATITUDE": 64.68,
    "LONGITUDE": -146.58,
    "STATE": "AK"
  }
];

d3.json("assets/geojson/USA.geojson").then(function(data){
//d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data){
console.log("IN HERE");
// Filter data
//data.features = data.features.filter( function(d){return d.properties.name=="USA"});

 // create a tooltip
 var Tooltip = d3.select("#my_dataviz")
 .append("div")
 .attr("class", "tooltip")
 .style("opacity", 1)
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
      console.log(event);
      console.log(event.x);
      Tooltip
        .html(d.FIRE_SIZE + "<br>" + "long: " + d.LONGITUDE + "<br>" + "lat: " + d.LATITUDE)
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
      .domain(["1996", "1999", "2000", "2002","2003","2009","2012","2013" ])
      .range([ "#F6DDCC", "#F5CBA7", "#EB984E", "#E67E22", "#CA6F1E", "#A04000", "#873600","#6E2C00"])

 // Add a scale for bubble size
 var size = d3.scaleLinear()
 .domain([1,260000])  // What's in the data
 .range([ 2, 15])  // Size in pixel

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
  .data(markers)
  .enter()
  .append("circle")
    .attr("cx", function(d){ return projection([d.LONGITUDE, d.LATITUDE])[0] })
    .attr("cy", function(d){ return projection([d.LONGITUDE, d.LATITUDE])[1] })
    .attr("r", function(d){ return size(d.FIRE_SIZE) })
    .style("fill", function(d){ return color(d.FIRE_YEAR) })
    .attr("stroke", function(d){ return color(d.FIRE_YEAR) })
    .attr("stroke-width", 3)
    .attr("fill-opacity", .4)
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)
})


d3.select("#d3-div").append("p").text("hello from D3");

vegaEmbed("#vega-div", {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "A simple bar chart with embedded data.",
  data: {
    values: [
      { a: "A", b: 28 },
      { a: "B", b: 55 },
      { a: "C", b: 43 },
      { a: "D", b: 91 },
      { a: "E", b: 81 },
      { a: "F", b: 53 },
      { a: "G", b: 19 },
      { a: "H", b: 87 },
      { a: "I", b: 52 },
    ],
  },
  mark: "bar",
  encoding: {
    x: { field: "a", type: "nominal", axis: { labelAngle: 0 } },
    y: { field: "b", type: "quantitative" },
  },
});
