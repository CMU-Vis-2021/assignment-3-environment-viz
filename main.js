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

let activeValue = "";

var colorrange = ["#7c0202", "#b64d24", "#b86213", "#e18820", "#de9b10", "#f3c523", "#7c5201", "#fac45a", "#fd860b", "#ffdc6c", "#ff4901", "#a43407"] //we can change these colors later :)
var colorrangeSoft = ["#edc4c4", "#c3a599", "#dfc4ab", "#efc493", "#e7d6b5", "#f7e5a6", "#cfc8bb", "#fce8c0", "#ffbb76", "#fff1c3", "#fa976f", "#a16851"]
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
              "Montana": "MT",
              "Nebraska": "NE",
              "Nevada": "NV",
              "New Hampshire": "NH",
              "New Jersey": "NJ",
              "New Mexico": "NM",
              "New York": "NY",
              "North Carolina": "NC",
              "North Dakota": "ND",
              "Ohio": "OH",
              "Oklahoma": "OK",
              "Oregon": "OR",
              "Pennsylvania": "PA",
              "Rhode Island": "RI",
              "South Carolina": "SC",
              "South Dakota": "SD",
              "Tennessee": "TN",
              "Texas": "TX",
              "Utah": "UT",
              "Vermont": "VT",
              "Virgina": "VA",
              "Washington": "WA",
              "West Virginia": "WV",
              "Wisconsin": "WI",
              "Wyoming": "WY"
            }
var states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]
var stateacr = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]
var stateProjs = {"Alabama": [-82, 30, 1000],
 "Alaska": [-147, 60, 400],
 "Arizona": [-107, 30, 1000],
 "Arkansas": [-87, 31, 1000],
 "California": [-113, 34, 1000],
 "Colorado": [-100, 35, 1000],
 "Connecticut": [-70, 40, 2000],
 "Delaware": [-74, 38, 3000],
 "Florida": [-80,26,1300],
 "Georgia": [-79,30,1000],
 "Hawaii": [-155,19,2000],
 "Idaho": [-111, 43, 1000],
 "Illinois": [-84, 38, 1300],
 "Indiana": [-84, 38, 1300],
 "Iowa": [-91, 40, 1300],
 "Kansas": [-96, 37, 1300],
 "Kentucky": [-82, 35, 1300],
 "Louisiana": [-89, 30, 1300],
 "Maine": [-66, 44, 1300],
 "Maryland": [-74, 37, 1500],
 "Massachusetts": [-69, 41, 1900],
 "Michigan": [-83, 43, 1300],
 "Minnesota": [-92, 45, 1300],
 "Mississippi": [-86, 30, 1300],
 "Missouri": [-90, 37, 1400],
 "Montana": [-108, 46, 1300],
 "Nebraska": [-98,40,1300],
 "Nevada": [-115, 35, 1000],
 "New Hampshire": [-69, 43, 1700],
 "New Jersey": [-72, 38, 1900],
 "New Mexico": [-103, 30, 1000],
 "New York": [-73, 41, 1400],
 "North Carolina": [-77, 33, 1300],
 "North Dakota": [-99, 46, 1300],
 "Ohio": [-81,39,1700],
 "Oklahoma": [-95,34,1400],
 "Oregon": [-119, 43, 1300],
 "Pennsylvania": [-76, 40, 1600],
 "Rhode Island": [-70, 41, 3500],
 "South Carolina": [-79, 32, 1600],
 "South Dakota": [-99, 43, 1400],
 "Tennessee": [-82, 34, 1700],
 "Texas": [-95, 30, 1000],
 "Utah": [-110, 37, 1400],
 "Vermont": [-71, 43, 1800],
 "Virginia": [-78, 36, 1500],
 "Washington": [-118,46,1300],
 "West Virginia": [-79, 37, 1500],
 "Wisconsin": [-88, 43,1400],
 "Wyoming": [-106, 42, 1300]}
var colorrangeSoft = ["#edc4c4", "#c3a599", "#dfc4ab", "#efc493", "#e7d6b5", "#f7e5a6", "#cfc8bb", "#fce8c0", "#ffbb76", "#fff1c3", "#fa976f", "#a16851"]


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

  let land_states = table.filter((d) => {return d.STATE != "AK"})
  land_states = land_states.filter((d) => {return d.STATE != "HI"})

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
  .data(land_states)
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
    let yearData = land_states.filter( function(d){return d.FIRE_YEAR==selectedYear});
    // Y axis
    y.domain(yearData.map(function(d) { return d.NWCG_GENERAL_CAUSE; } ) )
    yAxis.transition().duration(1000).call(d3.axisLeft(y) ) 

    // Add X axis
    x.domain([0, d3.max(yearData, function(d) { return parseInt(d.FIRE_SIZE) }) ]);
    xAxis.transition().duration(1000).call(d3.axisBottom(x));
    // xAxis.selectAll("g")
    //      .call(d3.axisBottom(x)) 

    //inspired by: https://www.codegrepper.com/code-examples/javascript/javascript+group+by+sum+array+reduce
    var result = [];
    yearData.reduce(function(res, value) {
      if (!res[value.NWCG_GENERAL_CAUSE]) {
        res[value.NWCG_GENERAL_CAUSE] = { NWCG_GENERAL_CAUSE: value.NWCG_GENERAL_CAUSE, VALUE: value.VALUE, qty: 0 };
        result.push(res[value.NWCG_GENERAL_CAUSE])
      }
      res[value.NWCG_GENERAL_CAUSE].qty += parseInt(value.FIRE_SIZE);
      return res;
    }, {});

    console.log("RESULT")
    console.log(result)

    // map data to existing bars
    var bars = svgBar.selectAll("rect")
                  .data(result)

    bars
      .join("rect")
      .transition()
      .duration(1000)
        .attr("x", x(0) )
        .attr("x", x(0) )
        .attr("class",function(d){ return "val"+d.VALUE+"bar bars" })
        .attr("y", d => y(d.NWCG_GENERAL_CAUSE) )
        .attr("width", d => x(d.qty))
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


  var Statesvg = d3.select("#state")
  .append("svg")
  .attr("width", 400)
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

let selectElem = document.querySelector("#hover_Text");
selectElem.innerHTML = "Year of Fire: <br> Cause of Fire: <br> Number of acres burned: <br>Location of Fire:";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  function setHover(d) {
    if (!d) {
      selectElem.innerHTML = "Year of Fire: <br> Cause of Fire: <br> Number of acres burned: <br>Location of Fire:";
      return;
    }

    selectElem.innerHTML = `Year of Fire: ${d.year} <br>
    Cause of Fire: ${d.cause} <br> 
    Number of acres burned: ${numberWithCommas(d.acres)} 
    <br>
    Location of Fire: ${d.county}, ${d.state}`;
  }


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
      .on("mouseover", function (_, d) {
        setHover({
        acres: d.FIRE_SIZE,
        state: d.STATE,
        year: d.FIRE_YEAR,
        county: d.FIPS_NAME,
        cause: d.NWCG_GENERAL_CAUSE
        });
      })
    .on("mouseout", function (_) {
      setHover();
    });
    
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