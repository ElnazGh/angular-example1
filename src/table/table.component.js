(function () {
    'use strict';
 
    angular
        .module('sampleApp')
        .component('tableComponent', {
            templateUrl:  '../table/table.html',
            controller: 'tableController',
            controllerAs: 'vm'
        })
})();