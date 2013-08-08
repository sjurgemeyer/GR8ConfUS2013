///////////////////////////////////////////////////////////
// CREATE VIS & GROUPS ////////////////////////////////////
///////////////////////////////////////////////////////////

//GROUP FOR ARCS/PATHS

var pieGlobals = {};
pieGlobals.radius = 150;
pieGlobals.innerRadius = 0;
pieGlobals.duration = 1000;
pieGlobals.delay = 1000;

initPieChart = function () {
    var w = pieGlobals.radius * 2.2;
    var h = pieGlobals.radius * 2.2;
    var transform = "translate(" + w / 2 + "," + h / 2 + ")";

    var chart = d3.select("#container").append("svg")
        .attr("class", "chart")
        .attr("width", w)
        .attr("height", h);

    pieGlobals.arc_group = chart.append("g")
        .attr("class", "arc")
        .attr("transform", transform);

    pieGlobals.label_group = chart.append("g")
        .attr("class", "label_group")
        .attr("transform", transform);

}

// Refresh
refreshPieChart = function (modules) {
    var color = d3.scale.category20();

    // Create the arc generator.
    // This function will calculate the d element for each datum
    // Base on inner radius, radius, start angle, and end angle
    var arc = d3.svg.arc()
        .startAngle(function (d) {
            return d.startAngle;
        })
        .endAngle(function (d) {
            return d.endAngle;
        })
        .innerRadius(pieGlobals.innerRadius)
        .outerRadius(pieGlobals.radius);

    // The Pie Layout
    // We tell the layout how to get the data from
    // each datum (the level)
    var pie = d3.layout.pie().value(function (d) {
        return d.level;
    });

    // Apply the pie layout to our modules.
    // This calculates the start and end angles
    // for each datum
    var pieData = pie(modules);

    pieData.filter(function (element, index, array) {
            element.name = modules[index].name;
            element.level = modules[index].level;
            return (element.level > 0);
        }
    );

    var paths = pieGlobals.arc_group.selectAll("path").data(pieData);

    paths.enter().append("path")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)
        .attr("fill", "#ffffff");

    paths.transition()
        .attr("fill", function (d, i) {
            return color(i);
        })
        .duration(pieGlobals.duration)
        .delay(pieGlobals.delay)
        // apply the arch function to each datum to come up with d
        .attr("d", arc);


//    labels
    var labels = pieGlobals.label_group.selectAll('text.value').data(pieData);

    labels.enter().append("text")
        .attr("class", "value");

    labels.transition()
        .duration(pieGlobals.duration)
        .delay(pieGlobals.delay).attr("transform", function (d) {
            d.innerRadius = pieGlobals.innerRadius;
            d.outerRadius = pieGlobals.radius;
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function (d, i) {
            return d.name[d.name.length - 1];
        });

}
