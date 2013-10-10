<div class="pull-left">
    <ul class="unstyled">
        <li data-ng-repeat="module in modules">{{module.name}}: <input type="number" data-ng-model="module.level" size="3 "/>
            <span class="btn-link" data-ng-click="remove(module)">Remove</span>
        </li>
        <li>
            <input type="text" data-ng-model="newModule.name"/><input type="number" data-ng-model="newModule.level"/><span class="btn-link" data-ng-click="add()">Add</span>
        </li>
    </ul>
</div>

<div class="pull-left" id="container"></div>
