modules = {

    jquery {
        resource url:'js/jquery-1.9.1.js'
        resource url:'js/jquery-ui.js'
    }

    application {
        resource url:'js/application.js'
    }

    bootstrap {
        resource url:'css/bootstrap.css'
        resource url:'css/bootstrap-responsive.css'
    }

    angular {
        resource url: 'js/angular.min.js'
        resource url: 'js/angular-resource.min.js'
        resource url:'js/angular-ui.js'
        resource url: 'css/angular-ui.css'
    }

    demoResources {
        resource url: 'js/resources.js'
    }

    d3 {
        resource url: 'js/d3.min.js'
    }

    d3modules {
        resource url: 'js/d3modules/d3chart.js'
        resource url:'js/d3modules/barchart.js'
        resource url:'js/d3modules/tbarchart.js'
        resource url:'js/d3modules/dbarchart.js'
        resource url:'js/d3modules/piechart.js'
        resource url:'js/d3modules/dpiechart.js'
        resource url:'js/d3modules/force.js'
        resource url:'js/d3modules/linegraph.js'
        resource url:'js/d3modules/linegraph2.js'
    }

    d3demo {
        dependsOn(['angular', 'bootstrap', 'demoResources', 'd3', 'd3modules'])
        resource url:'js/angular-controllers.js'
        resource url:'css/d3demo.css'
    }

}