(function () {
    'use strict';
 
    angular
        .module('sampleApp')
        .component('resultComponent', {
            templateUrl:  '../result/result.html',
            controller: 'resultController',
            controllerAs: 'vm',
            // require: {
            //     // access to the functionality of the parent component called 'formComponent'
            //     parent: '^formComponent'
            // }
        })
})();