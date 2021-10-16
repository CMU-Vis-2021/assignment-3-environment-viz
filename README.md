# Visualizing Wildfires in the United States over 18 years

**Authors:** Swetha Kannan and Katelyn Morrison
**Class:** CMU Data Visualization 2021
**Assignmnet:** 3 ~ Interactive Data Visualizations

- - -

## Dataset and subsets

## Questions/Goals
* Q1 - Where are most of the fires caused by humans located within the United States?
* Q2 - How has the cause of fires changed over the years?
* Q3 - What is the most common cause of fires for each state? 

## Design Decisions

### Slider
The slider allows the user to filter the dataset by year. This functionality can highlight potential trends or outliers within and across years. In terms of the placement of the slider, we decided that it should be placed above the US map in order to emphasize that the points on the map are only a subset of the entire dataset (i.e., filtered by year). The colors used for this feature were chosen to match the overall theme of fires. 

### Map

### Bar chart

### Choose your State

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
