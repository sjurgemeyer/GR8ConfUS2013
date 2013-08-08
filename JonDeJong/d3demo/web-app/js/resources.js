/**
 * This module defines the resource mappings required by Angular JS to map to a
 * standard Grails CRUD URL scheme that uses `"/$controller/$action?/$id?"`.
 */
angular.module('grailsService', ['ngResource']).factory('Grails', function($resource) {
//    var baseUrl = $('body').data('base-url');

    var baseUrl = "/rico/";

    return $resource(baseUrl + ':objectType/:action/:id', {id: '@id', objectType: '@objectType'}, {
        list: {method: 'GET', params: {action: 'list'}, isArray: true},
        get: {method: 'GET', params: {action: 'get'}},
        save: {method: 'POST', params: {action: 'save'}},
        update: {method: 'POST', params: {action: 'update'}},
        delete: {method: 'POST', params: {action: 'delete'}}
    });
});

/**
 * A service for storing one-time messages to be displayed after redirecting to
 * another view.
 */
angular.module('flashService', []).factory('Flash', function() {
    var flash = {};

    flash.getMessage = function() {
        var value = this.message;
        this.message = undefined;
        return value;
    };

    flash.error = function(text) {
        this.message = {level: 'error', text: text};
    };
    flash.success = function(text) {
        this.message = {level: 'success', text: text};
    };
    flash.info = function(text) {
        this.message = {level: 'info', text: text};
    };

    return flash;
});

angular.module('demoResources', ['grailsService', 'flashService']);