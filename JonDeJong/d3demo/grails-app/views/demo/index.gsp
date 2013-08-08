<div>
    <h2>Modules</h2>
</div>

<div class="nav-header navbar-inner">
    <ul class="unstyled">
        <li><a href="#/barchart">Bar Chart</a></li>
        <li><a href="#/tbarchart">Transitional Bar Chart</a></li>
        <li><a href="#/dbarchart">Dynamic Bar Chart</a></li>
        <li><a href="#/linegraph">Line Graph</a></li>
        <li><a href="#/linegraph2">Line Graph 2</a></li>
        <li><a href="#/piechart">Pie Chart</a></li>
        <li><a href="#/dpiechart">Dynamic Pie Chart</a></li>
        <li><a href="#/forcechart">Force Chart</a></li>
    </ul>
</div>

<div ng-view class="container-fluid"></div>

<div ng-controller="navigationCtrl" class="padded-container">
    <input type="button" class="btn-primary" data-ng-click="randomize()" value="Randomize Data"/>
</div>