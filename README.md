# Visualizing Wildfires in the United States over 18 years

**Authors:** Swetha Kannan and Katelyn Morrison
**Class:** CMU Data Visualization 2021
**Assignmnet:** 3 ~ Interactive Data Visualizations

- - -

## Dataset and subsets

## Questions/Goals
Our aim was to use the US Forest Service's [Spatial Wildfire Occurence Data for The United States](https://www.fs.usda.gov/rds/archive/Catalog/RDS-2013-0009.5) in order to visualize the state of Human-made fires from 2000-2018. To do this we had our visuals answer three main questions that adress what users may want to know and also allowed them to personalize the data: 
* Q1 - Where are most of the fires caused by humans located within the United States?
* Q2 - How has the cause of fires changed over the years?
* Q3 - What is the most common cause of fires for each state? 

## Design Decisions
### Colors
We based our color choices on a spectrum of orange and reds to better connect the data with fires. The legend up top helps users keep in mind the complicated color spectrum but alo repeat this labeling through out the pice by allowing users to over on colors in the map to read the label and also repeating the categories on the bar chart. This repition of colors and labels hopefully helps the user contextualize the different types of fires in the U.S. without having to completely memorize the legend. 

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

### Map

### Bar chart

### Choose your State


## Ideas that didn't work

* Multiple Tooltips
  - Having a tooltip for the US map visualization allows the user to probe the different data points (i.e., retrieve details on demand). We wanted to incorporate this same feature with the state map visualization, but had difficulty declaring another tooltip due to them having the same class name. This issue has been resolved for now by just modifying the HTML below the state map visualization.

## Future directions

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
