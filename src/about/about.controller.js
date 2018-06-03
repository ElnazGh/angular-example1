(function () {
    'use strict';
 
    angular
        .module('sampleApp')
        .controller('aboutController', aboutController);
 
    aboutController.$inject = ['$scope']; //'FormDataModel'
 
    function aboutController($scope) { //FormDataModel
        console.log('Loaded');
        $scope.message = 'This is Test';

        
    }
})();

