<div class="pull-left">
    <ul class="unstyled">
        <li data-ng-repeat="module in modules">{{module.name}}: <input type="number" data-ng-model="module.level" size="3 " />
        </li>
    </ul>
</div>
<div class="pull-left" id="container"></div>
