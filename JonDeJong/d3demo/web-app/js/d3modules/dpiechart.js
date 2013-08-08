var dPieGlobals = {};
dPieGlobals.arc_group;
dPieGlobals.label_group;
dPieGlobals.radius = 200;
dPieGlobals.innerRadius = 0;
dPieGlobals.duration = 1000;
dPieGlobals.delay = 1000;

initDPieChart = function () {
    var w = dPieGlobals.radius * 2.2;
    var h = dPieGlobals.radius * 2.2;
    var transform = "translate(" + w/2 + "," + h/2 + ")";

    var chart = d3.select("#container").append("svg")
        .attr("class", "chart")
        .attr("width", w)
        .attr("height", h);

    dPieGlobals.arc_group = chart.append("g")
        .attr("class", "arc")
        .attr("transform", transform);

    dPieGlobals.label_group = chart.append("g")
        .attr("class", "label_group")
        .attr("transform", transform);

}

// Refresh
refreshDPieChart = function ($scope) {

    var modules = $scope.visibleModules;

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
        .innerRadius(dPieGlobals.innerRadius)
        .outerRadius(dPieGlobals.radius);

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

    pieData.filter( function (element, index, array) {
            element.name = modules[index].name;
            element.level = modules[index].level;
            element.id = modules[index].id;
            return (element.level > 0);
        }
    );

    var paths = dPieGlobals.arc_group.selectAll("path").data(pieData);

    paths.enter().append("path")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)
        .on("click", function(d){
            $scope.handleD3Click(d.id);
        })
        .attr("fill", "#ffffff");


    paths.transition()
        .attr("fill", function (d, i) {
            return color(i);
        })
        .duration(dPieGlobals.duration)
        .delay(dPieGlobals.delay)
        // apply the arch function to each datum to come up with d
        .attr("d", arc);

    paths.exit()
        .transition()
        .duration(dPieGlobals.duration)
        .attr("fill", "#ffffff")
        .remove();


//    labels
    var labels = dPieGlobals.label_group.selectAll('text.value').data(pieData);

    labels.enter().append("text")
        .attr("class", "value");

    labels.transition()
        .duration(dPieGlobals.duration)
        .delay(dPieGlobals.delay)
        .attr("transform", function (d) {
            d.innerRadius = dPieGlobals.innerRadius;
            d.outerRadius = dPieGlobals.radius;
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function (d, i) {
            return d.name[d.name.length - 1];
        });

    labels.exit().remove();


}
