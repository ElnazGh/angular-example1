(function () {
    'use strict';
 
    angular
        .module('sampleApp')
        .component('aboutComponent', {
            templateUrl:  '../about/about.html',
            controller: 'aboutController'
        })
})();