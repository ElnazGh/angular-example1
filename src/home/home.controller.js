(function () {
    'use strict';
 
    angular
        .module('sampleApp')
        .controller('homeController', homeController);
 
    homeController.$inject = ['$scope']; //'FormDataModel'
 
    function homeController($scope) { //FormDataModel
        console.log('Loaded');
        $scope.message = 'This is Test';
    }
})();

