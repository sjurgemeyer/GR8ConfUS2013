var lineGlobals = {}
lineGlobals.width = 700;
lineGlobals.height = 500;
lineGlobals.borderPadding = 20;

function createLineGraph() {
    // Scalar functions
    lineGlobals.xScale = d3.scale.linear()
        .domain([0, 5])
        .range([lineGlobals.borderPadding, lineGlobals.width - lineGlobals.borderPadding]);

    var chart = d3.select("#container").append("svg")
        .attr("class", "chart")
        .attr("height", lineGlobals.height)
        .attr("width", lineGlobals.width);

    //Border
    var borders = [];
    borders[0] = {
        x1: 0,
        y1: lineGlobals.height - lineGlobals.borderPadding,
        x2: lineGlobals.width,
        y2: lineGlobals.height - lineGlobals.borderPadding
    };

    borders[1] = {
        x1: lineGlobals.borderPadding,
        y1: 0,
        x2: lineGlobals.borderPadding,
        y2: lineGlobals.height
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
        .attr("y", lineGlobals.height)
        .attr("x", function (d) {
            return lineGlobals.xScale(d);
        })
        .text(function (d) {
            return d;
        })

    return chart;
}

refreshLineGraph = function (chart, modules) {

    var data = createData(modules);
    var lineData = data.lines;
    var yLabelData = data.yLabels;

    var lines = chart.selectAll(".line").data(lineData);

    lines.enter()
        .append("line")
        .attr("class", "line")

    lines.attr("x1", function (d) {
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
        })
        .attr("stroke", function (d) {
            return d.c;
        });
    ;

    lines.exit().remove();

    // Y Axis Labels
    var yLabels = chart.selectAll(".y-axis-label").data(yLabelData);
    yLabels.enter().append("text")
        .attr("class", "y-axis-label")
        .attr("x", 0)
        .attr("y", function (d, i) {
            return lineGlobals.height / (i + 1) - lineGlobals.height / 2 + lineGlobals.borderPadding;
        });

    yLabels.text(function (d) {
        return d;
    });

    yLabels.exit().remove();
}


// Turn modules into line data
createData = function (modules) {
    var levels = getTimeLevels(modules);
    var maxLevel = d3.max(levels);

    var yScale = d3.scale.linear()
        .domain([0, maxLevel])
        .range([0, lineGlobals.height - lineGlobals.borderPadding]);

    var lines = [];
    var lineCount = 0;

    for (var m = 0; m < modules.length; m++) {
        if (modules[m].display) {
            for (var t = 1; t < modules[m].timeIncrementMeasurements.length; t++) {
                var line = {};
                line.x1 = lineGlobals.xScale(modules[m].timeIncrementMeasurements[t - 1].increment);
                line.y1 = lineGlobals.height - yScale(modules[m].timeIncrementMeasurements[t - 1].level);
                line.x2 = lineGlobals.xScale(modules[m].timeIncrementMeasurements[t].increment);
                line.y2 = lineGlobals.height - yScale(modules[m].timeIncrementMeasurements[t].level);
                line.c = modules[m].background;
                lines[lineCount++] = line;
            }
        }
    }

    return {lines: lines, yLabels: [Math.round(maxLevel / 2), maxLevel]};
}

getTimeLevels = function (modules) {
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