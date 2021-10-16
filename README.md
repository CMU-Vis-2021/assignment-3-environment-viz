# Visualizing Wildfires in the United States over 18 years

**Authors:** Swetha Kannan and Katelyn Morrison

**Class:** CMU Data Visualization 2021

**Assignmnet:** 3 ~ Interactive Data Visualizations

- - -

## Dataset and subsets
We retrieved our data from the US Forest Service's [Spatial Wildfire Occurence Data for The United States](https://www.fs.usda.gov/rds/archive/Catalog/RDS-2013-0009.5). The dataset was originally provided as an `.sqlite` file type and had over 2 million records of fires from 1992 - 2018. We created a subset of this dataset using SQL queries. Our filtered subset contains 259 records of fires from 2000 - 2018 that burned over 25,000 acres. We chose to limit it this timeframe  and size of fire in order to work with a mangeable dataset for an MVP. We were also limited to the file size that we could upload to GitHub - thus we limited our dataset to fit within GitHub's limits.

## Questions/Goals
Our aim was to use the US Forest Service's [Spatial Wildfire Occurence Data for The United States](https://www.fs.usda.gov/rds/archive/Catalog/RDS-2013-0009.5) in order to visualize the state of Human-made fires from 2000-2018. To do this we had our visuals answer three main questions that adress what users may want to know while allowing them to filter the data: 
* Q1 - Where are most of the fires caused by humans located within the United States?
* Q2 - How has the cause of fires changed over the years?
* Q3 - What is the most common cause of fires for each state? 

## Design Decisions
### Colors
We based our color choices on a spectrum of orange and reds to better connect the data with fires. The legend up top helps users keep in mind the complicated color spectrum but alo repeat this labeling through out the pice by allowing users to hover on colors in the map to read the label and also repeating the categories on the bar chart. This repition of colors and labels hopefully helps the user contextualize the different types of fires in the U.S. without having to completely memorize the legend. 

In other areas of the design, We pulled back color in order to let the data points stand strong. The maps and text were all made with greys and blacks.

### Text
We tried to use minimal text to both explain the function of the interactions and also walk our reader through the data. We used titles, and subheads to weave a story through the data and also used small grey print to offer instructions on how a user may interact with the visuals. 

In terms of labelling, we elected to pull back labellings on the map and bar chart in order to make the labels on the tooltips and the interactions more readable. This way, labels on the map are not competing for attention between the tooltip and the colored data points.

### Data
For readability and user-friendliness, we elected to remove the data pertaining to states that were not shown in the map: Alaska and Hawaii. This way, when users interact with the bar chart, they will not see data points that they cannot match to something they observe on the map. Hawaii did not have much fires but removing Alaska left out a few major data points. To make this known to the user, we included a caveat at the bottom of the map expressing that some fires were not shown.

### Slider
The slider allows the user to filter the dataset by year. This functionality can highlight potential trends or outliers within and across years. In terms of the placement of the slider, we decided that it should be placed above the US map in order to emphasize that the points on the map are only a subset of the entire dataset (i.e., filtered by year). The colors used for this feature were chosen to match the overall theme of fires. 

### Map and bar chart
The map and bar chart were placed overtop eachother to visually show a connection between the two. The animations also highlight this connection because, when the user interacts with the slider, they can immediately see that both the map and bar-chart animate and can thus form a connection between the two.

### Choose your State
We seperated the 'Choose-your-state' feature with a dotted line and a subhead. This way, the connection tot he other charts is severed and the user can make a visual distinction that the bottom map does not reflect whatever state they see the top map in. It also helps that while the top two visuals animate in time with eachother, the state visual does not. 

## Development Process

### Slider
Developing the slider was a challenge since it had to update both the map and the bar chart. The largest hurdle was getting it to update the map properly. After trying an implementation in d3, we settled for implementing a browser native slider instead. We then gave it a function to run on every change that was implemented inside our D3 function. this function, in turn, checked on the year the slider was pointing at and updated the data shown in the visuals to match.

### Map

### Bar chart
After creating the slider, the bar chart click-and-filter function was not too hard to implement because it relied on the same logic as the slider. Once a bar was created, the D3 creation also gave it an eventListener which activated a function whenever a bar was clicked. This function took the data, filtered it by the year on the slider, added categories together, and finally updated the visualized data ont he bar charts.

### Choose your State


## Ideas that didn't work
* D3 native slider
  - An advantage to having a slider made in d3 is that all of the years would have been spread out and labelled beneathe the slider. As it stands, we had trouble implementing a slider in d3 and so had to settle for an browser-native slider. Because of this, we had no way to map labels to the slider and therefore used simple HTML and CSS to label the beginning and end of the slider. To let users see what year they've chosen, we implented a simple changing label beneathe the slider, again using vanilla HTML and javascript. 

* Multiple Tooltips
  - Having a tooltip for the US map visualization allows the user to probe the different data points (i.e., retrieve details on demand). We wanted to incorporate this same feature with the state map visualization, but had difficulty declaring another tooltip due to them having the same class name. This issue has been resolved for now by just modifying the HTML below the state map visualization.

## Future directions

Now that we have this visualization built out in D3, it would be an easy thing to add more years as soon as the US Forest Service releases the information. This tool can be useful for scientists, politicians, etc. looking to see what human causes create the most fires in order to combat them in the future. It can also be useful for those in specific states to see what fires their state has historically been prone to. 

Alternatively, instead of looking at fires that have historically burned over 25,000 acres, this visualization can be modified to include a suite of advanced filtering features to view fires that burned less than 10 acres or between 10 and 30 acres in a given year. Fires in this dataset that burn less than 10 acres is extremely common and should be used in future visualizations with advanced filtering features. 

## Helpful Resources
Many of the features were inspired by [Yan Holt's D3 Gallery](https://www.d3-graph-gallery.com/index.html). 

## How to clone this repo

This template uses the same setup as the D3 crashcourse template.

To run it, use the following commands:

1. Install Node.js and NPM from https://nodejs.org/en/download/.
2. Clone this repository, and cd into the directory.
3. Open VSCode and open the folder you just cloned.
4. In this folder, run `npm i` to install the dependencies.
5. Open the URL displayed in the terminal (usually http://localhost:3000/). If you open the html file directly, your changes will not update the website.
6. Run `npm run dev` to watch for changes and host the web application.

You can add any changes to github using `git add .` and `git commit -m "message"` and `git push origin master`.
