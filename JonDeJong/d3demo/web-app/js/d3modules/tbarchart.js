createTBarChart = function (chart, modules) {
    var levels = getLevels(modules);
    var scale = d3.scale.linear()
        .domain([0, d3.max(levels)])
        .range([0, 420]);

    chart.selectAll("rect").data(modules)
        .enter().append("rect")
        .attr("y", function (d, i) {
            return i * 26;
        })
        .attr("width", function (d, i) {
            return scale(d.level);
        })
        .attr("height", 20);

    chart.selectAll("text").data(modules)
        .enter().append("text")
        .attr("y", function (d, i) {
            return ((i + 1) * 26) - 8;
        })
        .attr("x", 0)
        .text(function (d, i) {
            return d.name + ": " + d.level;
        })
        .attr("fill", "black");
}

refreshTBarChart = function (chart, modules) {
    var levels = getLevels(modules);
    var scale = d3.scale.linear()
        .domain([0, d3.max(levels)])
        .range([0, 420]);

    var rects = chart.selectAll("rect").data(modules);

    // Basic Transition
    rects.transition().attr("width", function (d, i) {
        return scale(d.level);
    });

// Transition with 3 second delay
//    rects.transition().delay(3000).attr("width", function (d, i) {
//        return scale(d.level);
//    });


// Modify duration
//    rects.transition().duration(5000).attr("width", function(d, i){
//        return scale(d.level);
//    });

// Use a function to modify the duration
//    rects.transition().duration(extendTransition).attr("width", function(d, i){
//        return scale(d.level);
//    });

// User a function to stagger the delay
//    rects.transition().delay(staggeredDelay).attr("width", function(d, i){
//        return scale(d.level);
//    });


// Chain duration and delay functions
//    rects.transition().duration(extendTransition).delay(staggeredDelay).attr("width", function(d, i){
//        return scale(d.level);
//    });

}

var extendTransition = function (d) {
    return 40 * d.level;
}

var staggeredDelay = function (d, i) {
    return i * 500;
}

