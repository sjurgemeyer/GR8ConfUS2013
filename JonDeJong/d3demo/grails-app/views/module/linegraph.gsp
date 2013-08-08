<div class="pull-left">
    <ul class="unstyled">
        <li data-ng-repeat="module in modules" ng-style="{'background-color': module.background}"><input type="checkbox" ng-model="module.display"/>{{module.name}}</li>
    </ul>
</div>
<div class="pull-left padded-container" id="container"></div>

