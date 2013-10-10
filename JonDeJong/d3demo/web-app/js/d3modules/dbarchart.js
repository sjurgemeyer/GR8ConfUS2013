refreshDBarChart = function (chart, modules) {
    // modify the size of the chart
    chart.attr("height", 26 * modules.length);

    var levels = getLevels(modules);
    var scale = d3.scale.linear()
        .domain([0, d3.max(levels)])
        .range([0, 420]);

    var rects = chart.selectAll("rect").data(modules);

    rects.enter()
        .append("rect")
        .attr("y", function (d, i) {
            return i * 26;
        })
        .attr("height", 20);

    // remove old rects
    rects.exit().remove();

    rects.transition().duration(1000).attr("width", function (d, i) {
        return scale(d.level);
    })

    var texts = chart.selectAll("text").data(modules).text(function (d, i) {
        return d.name + ": " + d.level;
    });

    texts.enter()
        .append("text")
        .attr("y", function (d, i) {
            return ((i + 1) * 26) - 8;
        })
        .attr("x", 0)
        .text(function (d, i) {
            return d.name + ": " + d.level;
        })
        .attr("fill", "black");

    // remove old labels
    texts.exit().remove();

}