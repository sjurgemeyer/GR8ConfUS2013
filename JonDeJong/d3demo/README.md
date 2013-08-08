# d3demo

Demoing D3 with Angularjs and Grails

## Overview

This is a demo of various graph types in D3, originally written for G8Conf US 2013.

d3demo is a Grails 2.2 Application. If you have Grails 2.2 running, you can clone or fork this repo, call "grails run-app", and get it running.

##### NOTE:
This is a demo application only and as such, has not been cross-browser tested. It has only been tested in the latest version of Chrome, which as of this writing is 28.

## The Simple Example

There is a very simple single page example in /Example/example.html. This is a standalone page designed to demo very basic selections, joins, and DOM manipulations.

## The Charts

There are eight different charts modelling the same data set in HTML SVG tags. Each chart has a corresponding JS file in web-app/js/d3modules folder. This file hold the relevant D3 Javascript code that renders the chart. This leads to way more code than is needed for this application --there's lots of duplicate code that could be refactored into a shared location -- but it makes it easier to read as almost entirely self contained modules. However, there is some common utility code in d3chart.js.

#### Bar Chart

Bar Chart is a very simple bar chart using SVG Rects.

#### Transitional Bar Chart

Transitional Bar Chart takes the simple example and adds transitions. There are varying transitions in the code documented and commented out. You can change which is applied to see the effects of each.

#### Dynamic Bar Chart

The Dynamic Bar Chart adds to the Bar Chart by making it dynamic. The user can add and remove data dynamically using the enter and exit selections.

#### Line Graph

The Line Graph is a simple line graph allowing the user to dynamically add and remove data to the graph. This models our data changing over time (see [Data Model] (#the-data-model)). This line graph is built by manually calculating points and adding SVG Line elements.

#### Line Graph 2

To the user, Line Graph 2 appears the same as Line Graph. Under the hood, however, it uses the D3 Line generator and outputs SVG Path elements instead of Lines.

#### Pie Chart

Pie Chart is a basic Pie Chart using the D3 Arch Generator and Pie Layout.

#### Dynamic Pie Chart

Dynamic Pie Chart adds to Pie Chart by adding click events and transitions.

#### Force Chart

Force Chart is a very simple bubble chart utilizing the the D3 Force Layout.

## The Data Model

The data model consists of Modules, Submodules, and TimeIncrementMeasurements. Each module and submodule contains a "level" (the value). This is intended to mimic data that both consists of other data, and changes over time. The are 6 time increments (0-5) measuring the level of a given module or submodule at that increment. Each module's level is the sum of the levels of it's submodules.

## Architectural Overview

d3demo runs on Grails 2.2. At startup, it populates an H2 database instance with random data. The ModuleController fetches this data and creates a JSON string. This JSON string is fetched by Angularjs controllers and passed off to the D3 modules.

The navigation and ng-view around this app resides in demo/index.

The Angualrjs cotnrollers are defined in /web-app/js/angular-controllers.js. These fetch the appropriate HTML partials via the Grails PartialController. These partials are very small fragments. Most of the DOM is built up with D3 and in some cases, Angularjs. The Angularjs controllers also fetch the JSON representation of the model, massage it if necessary, and make the relevant function calls into the D3 modules.





