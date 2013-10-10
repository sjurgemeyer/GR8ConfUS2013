var lineGlobals2 = {}
lineGlobals2.width = 700;
lineGlobals2.height = 500;
lineGlobals2.borderPadding = 20;

function createLineGraph2() {
    // Scalar functions
    lineGlobals2.xScale = d3.scale.linear()
        .domain([0, 5])
        .range([lineGlobals2.borderPadding, lineGlobals2.width - lineGlobals2.borderPadding]);

    var chart = d3.select("#container").append("svg")
        .attr("class", "chart")
        .attr("height", lineGlobals2.height)
        .attr("width", lineGlobals2.width);

    //Border
    var borders = [];
    borders[0] = {
        x1: 0,
        y1: lineGlobals2.height - lineGlobals2.borderPadding,
        x2: lineGlobals2.width,
        y2: lineGlobals2.height - lineGlobals2.borderPadding
    };

    borders[1] = {
        x1: lineGlobals2.borderPadding,
        y1: 0,
        x2: lineGlobals2.borderPadding,
        y2: lineGlobals2.height
    };

    chart.selectAll(".chart-border").data(borders).enter()
        .append("line")
        .attr("class", "chart-border").attr("x1", function (d) {
            return d.x1;
        })
        .attr("y1", function (d) {
            return d.y1;
        })
        .attr("x2", function (d) {
            return d.x2;
        })
        .attr("y2", function (d) {
            return d.y2;
        });

    var times = [0, 1, 2, 3, 4, 5];

    // X Axis Labels
    chart.selectAll(".x-axis-label").data(times)
        .enter().append("text")
        .attr("y", lineGlobals2.height)
        .attr("x", function (d) {
            return lineGlobals2.xScale(d);
        })
        .text(function (d) {
            return d;
        })

    return chart;
}

refreshLineGraph2 = function (chart, modules) {

    var data = createData2(modules);
    var lineData = data.lines;
    var yLabelData = data.yLabels;

    var line = d3.svg.line()
        .x(function (d, i) {
            return lineGlobals2.xScale(i);

        })
        .y(function (d) {
            return lineGlobals2.height - lineGlobals2.yScale(d);
        })

    var lines = chart.selectAll("path").data(lineData);

    lines.enter().append("path")
        .attr("class", "line");

    lines.attr("d", function(d) {
            return line(d.points);
        })
        .attr("stroke", function(d){
            return d.c;
        })
        // This is a path not a line, don't fill it.
        .attr("fill", 'none');


    lines.exit().remove();

    // Y Axis Labels
    var yLabels = chart.selectAll(".y-axis-label").data(yLabelData);
    yLabels.enter().append("text")
        .attr("class", "y-axis-label")
        .attr("x", 0)
        .attr("y", function (d, i) {
            return lineGlobals2.height / (i + 1) - lineGlobals2.height / 2 + lineGlobals2.borderPadding;
        });

    yLabels.text(function (d) {
        return d;
    });

    yLabels.exit().remove();
}


createData2 = function (modules) {
    var levels = getTimeLevels2(modules);
    var maxLevel = d3.max(levels);

    lineGlobals2.yScale = d3.scale.linear()
        .domain([0, maxLevel])
        .range([0, lineGlobals2.height - lineGlobals2.borderPadding]);

    var lines = [];
    var lineCount = 0;

    for (var m = 0; m < modules.length; m++) {
        if(modules[m].display) {
            var points = [];
            for (var t = 0; t < modules[m].timeIncrementMeasurements.length; t++) {
                points[t] = modules[m].timeIncrementMeasurements[t].level;
            }
            lines[lineCount++] = {points: points, c: modules[m].background};
        }
    }

    return {lines: lines, yLabels: [Math.round(maxLevel / 2), maxLevel]};
}

getTimeLevels2 = function (modules) {
    var levels = new Array();
    var levelCount = 0;
    for (var i = 0; i < modules.length; i++) {
        if (modules[i].display) {
            for (var j = 0; j < modules[i].timeIncrementMeasurements.length; j++) {
                levels[levelCount++] = modules[i].timeIncrementMeasurements[j].level;
            }
        }
    }
    return levels;
}