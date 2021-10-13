// import * as d3 from "d3";
// import vegaEmbed from "vega-embed";

//getting lots of code and insight from: https://www.d3-graph-gallery.com/index.html
//legend code insights from: https://www.d3-graph-gallery.com/graph/custom_legend.html and https://www.d3-graph-gallery.com/graph/connectedscatter_legend.html
//range slider code insights from: https://bl.ocks.org/officeofjane/9b9e606e9876e34385cc4aeab188ed73 

// Size 
var width = 650;
var height = 400;

//adjusting the size of the circle for both the bubble map and the key to use
var minRadiusRange = 1;
var maxRadiusRange = 260000;

//Defining categories for legend
var categories = ['Debris and open burning', 'Arson/incendiarism', 'Equipment and vehicle use','Recreation and ceremony', 'Misuse of fire by a minor', 'Smoking', 'Railroad operations and maintenance', 'Power generation/transmission/distribution', 'Fireworks', 'Other causes', 'Firearms and explosives use']

// Map and projection
var projection = d3.geoMercator()
    .center([-96, 37])                // GPS of location to zoom on
    .scale(588)                       // This is like the zoom
    .translate([ width/2, height/2 ])

//setting the date range for the range slider
var minDateRange = new Date("2000-01-01"),
    maxDateRange = new Date("2018-12-31")

var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%b %Y");
var parseDate = d3.timeParse("%m/%d/%y");

var x = d3.scaleTime()
      .domain([minDateRange,maxDateRange])
      .range([0,600])
      .clamp(true)

//defining color for categories and legend later
var color = d3.scaleOrdinal()
  .domain(categories)
  .range(d3.schemeSet2); //can try to set up specific colors for the legend later

var yearFilter = 2018;

// Add a scale for bubble size
var size = d3.scaleLinear()
.domain([minRadiusRange,maxRadiusRange])  // What's in the data
.range([ 2, 25])  // Size in pixel

d3.csv("assets/fire75000causehuman.csv").then((table)=>{
  d3.json("assets/geojson/USA.geojson").then(function(data){

    //**********LEGEND CODE**********//
    var svgLegend = d3.select("#legend")
      .append("svg")
      .attr("width", 300)
      .attr("height", 300)

    svgLegend.selectAll("legenddots")
      .data(categories)
      .enter()
      .append("circle")
        .attr("cx", 10)
        .attr("cy", function(d,i){ return 10 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return color(d)})

    // Add one dot in the legend for each name.
    svgLegend.selectAll("legendlabels")
      .data(categories)
      .enter()
      .append("text")
        .attr("x", 25)
        .attr("y", function(d,i){ return 10 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
    //********END OF LEGEND CODE*******//
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

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

    var svgSlider = d3.select("#slider")
        .append("svg")
        .attr("width", 650)
        .attr("height", 50);

    var slider = svgSlider.append("g")
      .attr("class", "slider")
      .attr("transform", "translate(" + 10 + "," + 50 / 4 + ")");

    // Add slider
    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function() { update(x.invert(d3.event.x), table); }));

    slider.append("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
      .selectAll("text")
        .data(x.ticks(10))
        .enter()
        .append("text")
        .attr("x", x)
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

    // var newData = table.filter(function(d) {
    //     return d.FIRE_YEAR == yearFilter;
    //   })

    function update(h, oldData){

      handle.attr("cx", x(h));
      label
        .attr("x", x(h));

        console.log("In the update function");
        console.log(formatDateIntoYear(h));

      yearFilter = formatDateIntoYear(h);

      console.log("Table before filter")
      console.log(oldData.slice(0,15))

      var newData = oldData.filter(function(d) {
        return d.FIRE_YEAR == yearFilter;
      })

      console.log("Table after filter")
      console.log(newData.slice(0,15))

      // drawData(newData, data)

      console.log("In the DrawData function")
      console.log(yearFilter);

      var firedatasvg = svg.selectAll("circle").data(newData)
      
      firedatasvg
        .enter()
        // .filter(function(d) { return (d.FIRE_YEAR == yearFilter) })
        .append("circle")
          .attr("class" , d => d.NWCG_GENERAL_CAUSE)
          .attr("cx", function(d){ return projection([d.LONGITUDE, d.LATITUDE])[0] })
          .attr("cy", function(d){ return projection([d.LONGITUDE, d.LATITUDE])[1] })
          .attr("r", function(d){ return size(d.FIRE_SIZE) })
          .style("fill", function(d){ return color(d.NWCG_GENERAL_CAUSE) })
          .attr("stroke", function(d){ return color(d.NWCG_GENERAL_CAUSE) })
          .attr("stroke-width", 3)
          .attr("fill-opacity", .4)

      firedatasvg.exit().remove()
    }
    //************TOOLTIP CODE*************//
    // var Tooltip = d3.select("#my_dataviz")
    // .append("div")
    // .attr("class", "tooltip")
    // .style("opacity", 0)
    // .style("background-color", "white")
    // .style("border", "solid")
    // .style("border-width", "2px")
    // .style("border-radius", "5px")
    // .style("padding", "5px")
   
    // // Three function that change the tooltip when user hover / move / leave a cell
    // const mouseover = function(event, d) {
    //   Tooltip.style("opacity", 1)
    // }

    // var mousemove = function(event, d) {
    //   Tooltip
    //     .html("Acres burned: " + d.FIRE_SIZE 
    //       + "<br>" + "Longitude: " + d.LONGITUDE 
    //       + "<br>" + "Latitude: " + d.LATITUDE
    //       + "<br>" + "Cause of fire: " + d.NWCG_GENERAL_CAUSE)
    //     .style("left", (event.x)+30 + "px")
    //     .style("top", (event.y)-30 + "px")
    // }

    // var mouseleave = function(event, d) {
    //   Tooltip.style("opacity", 0)
    // }
    //***********END OF TOOLTIP CODE*********//


    //******* DRAW THE MAP*******//
    
    // Adding datapoints from firedata.csv:
    
    


    

    //*********End of drawing map*******//


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

  });
});

