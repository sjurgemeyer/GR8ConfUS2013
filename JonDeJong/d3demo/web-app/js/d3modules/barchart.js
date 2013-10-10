refreshBarChart = function (chart, modules) {
    var levels = getLevels(modules);
    var scale = d3.scale.linear()
        .domain([0, d3.max(levels)])
        .range([0, 420]);

    var rects = chart.selectAll("rect").data(modules)
        .attr("width", function (d, i) {
            return scale(d.level);
        })

    rects.enter()
        .append("rect")
        .attr("y", function (d, i) {
            return i * 26;
        })
        .attr("width", function (d, i) {
            return scale(d.level);
        })
        .attr("height", 20);


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

}