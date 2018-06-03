(function () {
    'use strict';
 
    angular
        .module('sampleApp')
        .controller('homeController', homeController)
        .filter('filterFilter', filterFilter);;
 
    homeController.$inject = ['$scope', 'filterFilter']; //'FormDataModel'
 	
 	filterFilter.$inject = ['filterFilter'];

    function homeController($scope) { //FormDataModel
        console.log('Loaded');
        $scope.message = 'This is Test';

        $scope.checked = false;

        

        //store - storeOptions
        $scope.storeOptions = [
            { name: 'Pharmacy1', selected: false, removed: true },
            { name: 'Pharmacy2', selected: false, removed: false },
            { name: 'Pharmacy3', selected: false, removed: false },
            { name: 'Pharmacy4', selected: false, removed: false }
        ];
        
        var storeOptionsLen = $scope.storeOptions.length;

        // Selected options
        $scope.storeSelectedOptions = {
            "id": "storeOptions", 
            "type": "select", 
            "name": "Stores",
            "values": [],
            "value": []
        };

        //$scope.storeSelectedOptions.value = $scope.storeSelectedOptions.values[0];

        // removing selecting option from second dropdown
        $scope.removeListItem = function removeListItem(storeSelectedOption) {
            for(var i = 0; i < storeOptionsLen; i++) {
                if($scope.storeOptions[i].name === storeSelectedOption) {
                    $scope.storeOptions[i].selected = false;
                }
            }
        }

        // Helper method to get selected selectedOptions
        // $scope.selectedOptions = function selectedOptions() {
        //   return filterFilter($scope.storeOptions, { selected: true });
        // };

        // Watch storeOptions for changes in first dropdown
        $scope.$watch('storeOptions|filter:{selected:true}', function (nv) {
            $scope.storeSelectedOptions.values = nv.map(function (storeOption) {
                return storeOption.name;
            });
            // * Return value for Store field in form
            //vm.formData.storeSelectedOptions = $scope.storeSelectedOptions.values.slice();
        }, true);

        // Deselect selected item with removed: true - Deselect disabled one 
        $scope.$watch('storeSelectedOptions', function (nv) {  
            var storeSelectedOptionsLen = $scope.storeSelectedOptions.values.length;
            
            for (var i = 0; i < storeSelectedOptionsLen; i++) {
                for (var j = 0; j < storeOptionsLen; j++) {
                    if ($scope.storeSelectedOptions.values[i] === $scope.storeOptions[j].name) {
                        if ($scope.storeOptions[j].removed == true) {
                            $scope.storeOptions[j].selected = false;
                        }
                    }
                }
            }

         }, true);

        // Store - "Add All" button
        $scope.addAll = function addAll() {
            for(var i = 0; i < storeOptionsLen; i++) {
                //if(!$scope.storeOptions[i].removed) {
                    $scope.storeOptions[i].selected = true;
                //}
            }
        }

        // Store - "Remove All" button
        $scope.removeAll = function removeAll() {
            for(var i = 0; i < storeOptionsLen; i++) {
                $scope.storeOptions[i].selected = false;
            }
        }

        // Watch storeOptions for validation
        $scope.$watch("storeOptions", function(n, o) {
            var trues = filterFilter($scope.storeOptions, { selected: true });
            $scope.hasError = trues.length;
        }, true);
    }

    function filterFilter(filterFilter) {
        return function optionSelection(input, prop) {
          return filterFilter(input, { selected: true }).map(function (storeOption) {
            return storeOption[prop];
          });
        };
    }

})();

