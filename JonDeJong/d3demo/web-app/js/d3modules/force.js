var forceGlobals = {};
forceGlobals.width = 700;
forceGlobals.height = 600;
forceGlobals.linkDistance = 60;

initForceChart = function () {
    var chart = d3.select("#container").append("svg")
        .attr("class", "chart")
        .attr("width", forceGlobals.width)
        .attr("height", forceGlobals.height);

    return chart;
}

refreshForce = function (chart, modules) {
    var graph = createGraph(modules);
    var color = d3.scale.category20();

    graph.nodes.filter(function (element, index, array) {
            element.x = forceGlobals.width / 2;
            element.y = forceGlobals.height / 2;
            return (element.level > 0);
        }
    );

    var force = d3.layout.force()
        .charge(function (d) {
            return -100 - (2 * d.level);
        })
        .size([forceGlobals.width, forceGlobals.height])
        .linkDistance(forceGlobals.linkDistance);

    force.nodes(graph.nodes)
        .links(graph.links)
        .start();

    var link = chart.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link");

    var node = chart.selectAll(".node")
        .data(graph.nodes)
        .enter().
        append("circle")
        .attr("class", "node")
        .attr("r", function (d) {
            return d.level * 1.25;
        })
        .attr("fill", function (d, i) {
            return color(i);
        })

    // Labels
    var label = chart.selectAll(".text").data(graph.nodes)
        .enter()
        .append("text")
        .text(function (d) {
            return d.label;
        })
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        });

    force.on("tick", function () {

        link.attr("x1", function (d) {
            return d.source.x;
        })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node.attr("cx", function (d) {
            return d.x;
        })
            .attr("cy", function (d) {
                return d.y;
            });

        label.attr("x", function (d) {
            return d.x;
        })
            .attr("y", function (d) {
                return d.y;
            });
    });

}

createGraph = function (modules) {
    var graph = {};
    graph.nodes = [];
    graph.links = [];

    var node = 0;
    var link = 0;
    for (var i = 0; i < modules.length; i++) {
        var module = modules[i];
        graph.nodes[node++] = {level: module.level, label: module.name[module.name.length - 1]}
        var source = node - 1;
        for (var j = 0; j < module.subModules.length; j++) {
            var subModule = module.subModules[j];
            graph.nodes[node++] = {level: subModule.level, label: subModule.name[subModule.name.length - 1]};
            graph.links[link++] = {source: source, target: node - 1};
        }
    }
    return graph;
}