(function () {
    'use strict';
 
    angular
        .module('sampleApp')
        .component('homeComponent', {
            templateUrl:  '../home/home.html',
            controller: 'homeController'
        })
})();