var demo = angular.module('d3demo', ['ui', 'demoResources']);

demo.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/barchart', {templateUrl: '/d3demo/partial/module/list', controller: BarChartCtrl}).
        when('/tbarchart', {templateUrl: '/d3demo/partial/module/list', controller: TransitionalBarChartCtrl}).
        when('/dbarchart', {templateUrl: '/d3demo/partial/module/dynamicBar', controller: DynamicBarChartCtrl}).
        when('/linegraph', {templateUrl: '/d3demo/partial/module/linegraph', controller: LineGraphCtrl}).
        when('/linegraph2', {templateUrl: '/d3demo/partial/module/linegraph', controller: LineGraph2Ctrl}).
        when('/piechart', {templateUrl: '/d3demo/partial/module/list', controller: PieChartCtrl}).
        when('/dpiechart', {templateUrl: '/d3demo/partial/module/chart', controller: DynamicPieChartCtrl}).
        when('/forcechart', {templateUrl: '/d3demo/partial/module/container', controller: ForceChartCtrl}).
        otherwise({redirectTo: '/barchart'});
}]);

function navigationCtrl($scope, $http, $route) {
    $scope.randomize = function () {
        $http.get('/d3demo/module/randomize').success(function(data) {
            $route.reload();
        });
    }
}

function BarChartCtrl($scope, $http) {
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data.modules;
        $scope.chart = createChart($scope.modules.length);

        $scope.$watch('modules', function() {
            refreshBarChart($scope.chart, $scope.modules);
        }, true);

    });

}

function TransitionalBarChartCtrl($scope, $http) {
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data.modules;
        $scope.chart = createChart($scope.modules.length);

        createTBarChart($scope.chart, $scope.modules);

        $scope.$watch('modules', function() {
            refreshTBarChart($scope.chart, $scope.modules);
        }, true);

    });

}

function DynamicBarChartCtrl($scope, $http) {
    $scope.newModule = {};
    $scope.newModule.name= 'New';
    $scope.newModule.level = 20;

    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data.modules;
        $scope.chart = createChart($scope.modules.length);

        $scope.$watch('modules', function() {
            refreshDBarChart($scope.chart, $scope.modules);
        }, true);

    });

    $scope.remove = function(module) {
        var index = -1;
        for(var i=0; i<$scope.modules.length; i++) {
            var m  = $scope.modules[i];
            if(m == module) {
                var index = i;
                break;
            }
        }
        if(index != -1) {
            $scope.modules.splice(index, 1);
        }
    }

    $scope.add = function() {
        var module = {};
        module.name = $scope.newModule.name;
        module.level = $scope.newModule.level;
        $scope.modules[$scope.modules.length] = module;
    }
}

function LineGraphCtrl($scope, $http) {
    $scope.color = d3.scale.category20();
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data.modules;
        for(var i=0;i<$scope.modules.length;i++){
            $scope.modules[i].background = $scope.color(i);
            $scope.modules[i].display = false;
        }
        $scope.modules[0].display = true;
        $scope.chart = createLineGraph();

        $scope.$watch('modules', function() {
            refreshLineGraph($scope.chart, $scope.modules);
        }, true);

    });
}

function LineGraph2Ctrl($scope, $http) {
    $scope.color = d3.scale.category20();
    $http.get('/d3demo/module/list/').success(function (data) {

        $scope.modules = data.modules;
        for(var i=0;i<$scope.modules.length;i++){
            $scope.modules[i].background = $scope.color(i);
            $scope.modules[i].display = false;
        }
        $scope.modules[0].display = true;
        $scope.chart = createLineGraph2();

        $scope.$watch('modules', function() {
            refreshLineGraph2($scope.chart, $scope.modules);
        }, true);

    });
}

function PieChartCtrl($scope, $http) {
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data.modules;

        initPieChart();

        $scope.$watch('modules', function() {
            refreshPieChart($scope.modules);
        }, true);

    });
}

function DynamicPieChartCtrl($scope, $http) {
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data.modules;
        $scope.visibleModules = $scope.modules;

        $scope.root = true;

        initDPieChart();
        refreshDPieChart($scope);

        $scope.handleClick = function(module) {
            if($scope.root) {
                $scope.root = false;
                $scope.visibleModules = module.subModules;
                refreshDPieChart($scope);
            }
        }

        $scope.levelUp = function() {
            $scope.root = true;
            $scope.visibleModules = $scope.modules;
            refreshDPieChart($scope);
        }

        $scope.handleD3Click = function(id) {
            if($scope.root) {
                for(var i=0; i<$scope.modules.length; i++) {
                    if($scope.modules[i].id == id && $scope.modules[i].subModules) {
                        $scope.visibleModules = $scope.modules[i].subModules;
                        $scope.root = false;
                        refreshDPieChart($scope);
                    }
                }
            } else {
                $scope.root = true;
                $scope.visibleModules = $scope.modules;
                refreshDPieChart($scope);
            }
        }
    });
}

function ForceChartCtrl($scope, $http) {
    $http.get('/d3demo/module/list/').success(function (data) {
        $scope.modules = data.modules;
        $scope.chart = initForceChart();

        $scope.$watch('modules', function() {
            refreshForce($scope.chart, $scope.modules);
        }, true);
    });
}

