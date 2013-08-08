<div class="pull-left fixed-nav">
    <ul class="unstyled">
        <li data-ng-repeat="module in visibleModules" class="nav-header"><a data-ng-click="handleClick(module)">{{module.name}}: {{module.level}}</a></li>
        <li><a data-ng-show="!root" data-ng-click="levelUp()" class="nav-header">Root</a></li>
    </ul>
</div>
<div class="pull-left padded-container" id="container"></div>