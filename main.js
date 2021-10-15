import * as d3 from 'https://unpkg.com/d3?module'
// import vegaEmbed from "vega-embed";

//getting lots of code and insight from: https://www.d3-graph-gallery.com/index.html


// Size 
var width = 650;
var height = 400;
var widthBar = 450;
var heightBar = 250;
var margin = {top: 20, right: 30, bottom: 100, left: 130};

var currentMapYear = '2000';

var colorrange = ["#7c0202", "#b64d24", "#b86213", "#e18820", "#de9b10", "#f3c523", "#7c5201", "#fac45a", "#fd860b", "#ffdc6c", "#ff4901", "#a43407"] //we can change these colors later :)
var categories = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
var statesDict = {"Alabama": "AL",
              "Alaska": "AK",
              "Arizona": "AZ",
              "Arkansas": "AR",
              "California": "CA",
              "Colorado": "CO",
              "Connecticut": "CT",
              "Delaware": "DE",
              "Florida": "FL",
              "Georgia": "GA",
              "Hawaii": "HI",
              "Idaho": "ID",
              "Illinois": "IL",
              "Indiana": "IN",
              "Iowa": "IA",
              "Kansas": "KS",
              "Kentucky": "KY",
              "Louisiana": "LA",
              "Maine": "ME",
              "Maryland": "MD",
              "Massachusetts": "MA",
              "Michigan": "MI",
              "Minnesota": "MN",
              "Mississippi": "MS",
              "Missouri": "MO",
              "MT": "Montana",
              "NE": "Nebraska",
              "NV": "Nevada",
              "NH": "New Hampshire",
              "NJ": "New Jersey",
              "NM": "New Mexico",
              "NY": "New York",
              "NC": "North Carolina",
              "ND": "North Dakota",
              "OH": "Ohio",
              "OK": "Oklahoma",
              "OR": "Oregon",
              "PA": "Pennsylvania",
              "RI": "Rhode Island",
              "SC": "South Carolina",
              "SD": "South Dakota",
              "TN": "Tennessee",
              "Texas": "TX",
              "UT": "Utah",
              "VT": "Vermont",
              "VA": "Virgina",
              "WA": "Washington",
              "WV": "West Virginia",
              "WI": "Wisconsin",
              "WY": "Wyoming"
            }
var states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virgina","Washington","West Virginia","Wisconsin","Wyoming"]
var stateacr = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]
var stateProjs = {"Alabama": [-85, 30, 1000],
 "Alaska": [-150, 60, 400],
 "Arizona": [-107, 32, 1000],
 "Arkansas": [-90, 30, 1000],
 "California": [-113, 34, 1000],
 "Colorado": [],
 "Connecticut": [],
 "Delaware": [],
 "Florida": [],
 "Georgia": [],
 "Hawaii": [],
 "Idaho": [],
 "Illinois": [],
 "Indiana": [],
 "Iowa": [],
 "Kansas": [],
 "Kentucky": [],
 "Louisiana": [],
 "Maine": [],
 "Maryland": [],
 "Massachusetts": [],
 "Michigan": [],
 "Minnesota": [],
 "Mississippi": [],
 "Missouri": [],
 "Montana": [],
 "Nebraska": [],
 "Nevada": [-115, 35, 1000],
 "New Hampshire": [],
 "New Jersey": [],
 "New Mexico": [-103, 30, 1000],
 "New York": [],
 "North Carolina": [],
 "North Dakota": [],
 "Ohio": [],
 "Oklahoma": [],
 "Oregon": [],
 "Pennsylvania": [],
 "Rhode Island": [],
 "South Carolina": [],
 "South Dakota": [],
 "Tennessee": [],
 "Texas": [-95, 27, 1000],
 "Utah": [],
 "Vermont": [],
 "Virgina": [],
 "Washington": [],
 "West Virginia": [],
 "Wisconsin": [],
 "Wyoming": []}
      

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

 // Add a scale for bubble size
 var size = d3.scaleLinear()
 .domain([minRadiusRange,maxRadiusRange])  // What's in the data
 .range([ 2, 25])  // Size in pixel


d3.csv("assets/firesfinaldata.csv").then((table)=>{


d3.json("assets/geojson/USA.geojson").then(function(data){

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
    //.domain([0, 540000])
    .range([ 0, widthBar]);
  //add x axis to the bar chart svg
  const xAxis = svgBar.append("g")
    .attr("transform", "translate(0," + heightBar + ")");
    //.call(d3.axisBottom(x))
    //.selectAll("text")
    //  .attr("transform", "translate(-10,0)rotate(-45)")
    //  .style("text-anchor", "end");

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, heightBar ])
    // .domain(markers.map(d => d.CAUSE__ABRV))
    .padding(.1);
  //add y axis to the bar chart svg
  const yAxis = svgBar.append("g");
       //.attr("transform", `translate(0,${widthBar})`);
    // .call(d3.axisLeft(y))
  
  //now we add the bars, wooooooo
  function updateBarChart(selectedYear){

    //only get the subset of data for the year shown
    let yearData = table.filter( function(d){return d.FIRE_YEAR==selectedYear});
    // Y axis
    y.domain(yearData.map(function(d) { return d.NWCG_GENERAL_CAUSE; } ) )
    yAxis.transition().duration(1000).call(d3.axisLeft(y) ) 

    // Add X axis
    x.domain([0, d3.max(yearData, function(d) { return d.FIRE_SIZE }) ]);
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
        .attr("class", function(d) { return "fire"+d.FIRE_SIZE } )
        .attr("x", x(0) )
        .attr("y", d => y(d.NWCG_GENERAL_CAUSE) )
        .attr("width", d => x(d.FIRE_SIZE))
        .attr("height", y.bandwidth() )
        .style("fill", function(d){ return color(d.VALUE) })
    .attr("stroke", function(d){ return color(d.VALUE) })
    .attr("stroke-width", 3)
    .attr("fill-opacity", .4)

  }
  //initializing the bar chart by calling the function we made above with the year we want to show first
  updateBarChart(2000);
        
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

  function updateBar(e){
    // For each check box:
    d3.selectAll(".checkbox").each(function(d){
      let cb = d3.select(this);
      console.log(cb)
      let ctgry = cb.property("value")
      let grp = "val" + ctgry
      console.log("group")
      console.log(grp)
      console.log("map year")
      console.log(currentMapYear)

      if(cb.property("checked")){
        console.log("SELECTED", "."+grp+""+currentMapYear);
        svg.selectAll("."+grp+""+currentMapYear).transition().duration(1000).style("opacity", 1).attr("r", function(d){ return size(d.FIRE_SIZE) })
        
       }
      else{
        console.log("NOT SELECTED");
        svg.selectAll("."+grp+""+currentMapYear).transition().duration(1000).style("opacity", 0).attr("r", 0)
      }
    })
  }

  // When the slider changes, I run a function
  d3.selectAll(".slider").on("change",updateSlider);

  // When the bar chart is clicked, I run function
  // d3.selectAll(".button").on("click",updateBar);
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


  var Statesvg = d3.select("#state")
  .append("svg")
  .attr("width", 440)
  .attr("height", 300)

  d3.select("#stateSelect")
        .selectAll('myStates')
        .data(states)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

  let element = document.getElementById("stateSelect");
  element.value = "Texas";

  // Map and projection
  var projection2 = d3.geoMercator()
    .center([stateProjs["Texas"][0], stateProjs["Texas"][1]])                // GPS of location to zoom on
      .scale(stateProjs["Texas"][2])                       // This is like the zoom
      .translate([ width/2, height/2 ])

  console.log(data.features)

  state.features = data.features.filter( function(d){return d.properties.NAME=="Texas"} )
  console.log(state.features)

  Statesvg.selectAll("path")
    .data(state.features)
    .join("path")
    .transition()
    .duration(1000)
      .attr("fill", "#b8b8b8")
        .attr("d", d3.geoPath()
            .projection(projection2)
        )
    .style("stroke", "black")
    .style("opacity", .3)     


      // Add circles:
      Statesvg.selectAll("myCircles")
      .data(table)
      .join("circle")
        .attr("class" , d => "state"+ d.STATE)
        .attr("cx", function(d){ return projection2([d.LONGITUDE, d.LATITUDE])[0] })
        .attr("cy", function(d){ return projection2([d.LONGITUDE, d.LATITUDE])[1] })
        .attr("r", 0)
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
            .style("left", (event.x)+5 + "px")
            .style("top", (event.y)-5 + "px")
        })
      .on("mouseleave", function(event, d) {
          Tooltip.style("opacity", 0);
          Tooltip.style("display", "none");
        })
    
    var currentSelection = "Texas"
  // A function that update the chart
    function updateState(selectedGroup) {

      // Create new data with the selection?
      state.features = data.features.filter(function(d){return d.properties.NAME==selectedGroup})

      var proj = d3.geoMercator()
      .center([stateProjs[selectedGroup][0], stateProjs[selectedGroup][1]])                // GPS of location to zoom on
      .scale(stateProjs[selectedGroup][2])                       // This is like the zoom
      .translate([ width/2, height/2 ])

      Statesvg.selectAll("path")
        .data(state.features)
        .join("path")
        .transition()
        .duration(1000)
          .attr("fill", "#b8b8b8")
            .attr("d", d3.geoPath()
                .projection(proj)
            )
        .style("stroke", "black")
        .style("opacity", .3) 

      // 
      console.log(selectedGroup)

      var e = document.getElementById("stateSelect");
      var strUser = e.value;
      console.log(strUser)

      let grp = statesDict[selectedGroup]

      Statesvg.selectAll("myCircles")
        .attr("class" , d => "state"+ d.STATE)
        
        .attr("r", 0)
        .style("fill", function(d){ return color(d.VALUE) })
        .attr("stroke", function(d){ return color(d.VALUE) })
        .attr("stroke-width", 3)
        .attr("fill-opacity", .4)

      console.log("group")
      console.log(grp)
      Statesvg.selectAll(".state"+grp)
        .attr("cx", function(d){ return proj([d.LONGITUDE, d.LATITUDE])[0] })
        .attr("cy", function(d){ return proj([d.LONGITUDE, d.LATITUDE])[1] })
        .transition()
        .duration(1000)
        .style("opacity", 1).attr("r", function(d){ return size(d.FIRE_SIZE) })

    }

    updateState("Texas")

    // When the button is changed, run the updateChart function
    d3.select("#stateSelect").on("change", function(event,d) {
        console.log("In on change")
        console.log("currentselection is")
        // recover the option that has been chosen
        console.log(statesDict[currentSelection])
        Statesvg.selectAll(".state"+statesDict[currentSelection]).transition().duration(1000).style("opacity", 0).attr("r", 0)
        const selectedOption = d3.select(this).property("value")
        console.log(d)
        console.log(event)
        // run the updateChart function with this selected option
        console.log("leaving on change")
        currentSelection = selectedOption
        updateState(selectedOption)
    })

})
});

var yearShown = document.getElementById("yearShown");
myRange.oninput = function() {
  // console.log(this)
  // console.log(this.value)
  yearShown.innerHTML = this.value;
}

