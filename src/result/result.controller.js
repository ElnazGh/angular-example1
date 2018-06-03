(function () {
    'use strict';
 
    angular
        .module('sampleApp')
        .controller('resultController', resultController)
        .filter('filterFilter', filterFilter);
 
    resultController.$inject = ['$scope', 'filterFilter', 'jsonFactory']; //, '$timeout'
    filterFilter.$inject = ['filterFilter'];

    function resultController($scope, filterFilter, jsonFactory) { //, $timeout
        var vm = this;
        vm.title = 'Please name your promotion.';
        vm.formData = {};

        // * Return value for form
        vm.formData.welcomeName = '';
        // * Return value for Store in form
        vm.formData.storeSelectedOptions = [];
        // * Return value for Bonus Voucher field in form
        vm.formData.validEmailVoucherExpiries = '';
        vm.formData.shopVoucherExpiries = '';
        vm.formData.onlineRegVoucherExpiries = '';
        // * Return value for senderName in form
        vm.formData.senderName1 = '';
        vm.formData.senderName2 = '';
        // * Return value for selectTemplate in form
        vm.formData.selectedTemplate1 = '';
        vm.formData.selectedTemplate2 = '';
        // * Return value for Days Delay in form
        vm.formData.daysDelayOptions = '';

        // vm.$onInit = activate;
        //$scope.disableBtn = true;

        // Report tabs
        $scope.reportActive = false;
        $scope.report2 = false;
        $scope.report2Active = false;

        $scope.tab = 1;
        $scope.activeBack = false;

        // Main tabs
        $scope.setTab = function setTab(newTab) {
            $scope.tab = newTab;
            if((newTab = 2) || (newTab = 3)) {
                $scope.activeBack = true;
            } 
        };

        $scope.isSet = function isSet(tabNum) {
            return $scope.tab === tabNum;
        };

        $scope.totalReports = [
            { id: 2, name: "Report Schedual1" },
            { id: 3, name: "Report Schedual2" }
        ];

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
            vm.formData.storeSelectedOptions = $scope.storeSelectedOptions.values.slice();
        }, true);

        var reportAllStore = [
            {name: 'reportAllStore', selected: false}
        ];

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

        // Watch storeOptions for validation
        $scope.$watch("storeOptions", function(n, o) {
            var trues = filterFilter($scope.storeOptions, { selected: true });
            $scope.hasError = trues.length;
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

        // Vouchers and Bonus Points
        $scope.validEmailVoucherExpiries = [
            {value: 'never', label: 'Never', selected: false},
            {value: 'voucher-expiry-2', label: 'VoucherExpiry2', selected: false},
            {value: 'voucher-expiry-3', label: 'VoucherExpiry3', selected: false}
        ];

        $scope.shopVoucherExpiries = [
            {value: 'never', label: 'Never', selected: false},
            {value: 'voucher-expiry-2', label: 'VoucherExpiry2', selected: false},
            {value: 'voucher-expiry-3', label: 'VoucherExpiry3', selected: false}
        ];

        $scope.onlineRegVoucherExpiries = [
            {value: 'never', label: 'Never', selected: false},
            {value: 'voucher-expiry-2', label: 'VoucherExpiry2', selected: false},
            {value: 'voucher-expiry-3', label: 'VoucherExpiry3', selected: false}
        ];

        // Days Delay dropdown
        $scope.daysDelayOptions = [
            {value: 30, label: 30},
            {value: 60, label: 60},
            {value: 90, label: 90}
        ];

        // Bonus Points - Email
        $scope.$watch('vm.formData.validEmailBonusPoints', function () { 
            if(!vm.formData.validEmailBonusPoints) { 
                // Empty input tag
                vm.formData.validEmailPoints = '';
            }
         });

        // Bonus Points - Shop
        $scope.$watch('vm.formData.shopBonusPoints', function () { 
            if(!vm.formData.shopBonusPoints) { 
                // Empty input tag
                vm.formData.shopPoints = '';
            }
        });

        // Bonus Points - Online Reg
        $scope.$watch('vm.formData.onlineRegBonusPoints', function () { 
            if(!vm.formData.onlineRegBonusPoints) { 
                // Empty input tag
                vm.formData.onlineRegPoints = '';
            }
        });

        // Vouchers - Valid Email 
        $scope.$watch('vm.formData.validEmailBonus', function () { 
            if(!vm.formData.validEmailBonus) { 
                vm.formData.validEmailVoucher = '';
            }

            // Empty input and select tags
            if($scope.bpVoucher && vm.formData.validEmailBonus){
                var validEmailVoucherExpiryDD = angular.element(document.querySelector('#validEmailVoucherExpiry'))["0"];
                validEmailVoucherExpiryDD.options.selectedIndex = 0;
            }

         });

        // Vouchers - Shop 
        $scope.$watch('vm.formData.shopBonus', function () { 
            if(!vm.formData.shopBonus) { 
                vm.formData.shopVoucher = '';
            }

            // Empty input and select tags
            if($scope.bpVoucher && vm.formData.shopBonus){
                var shopVoucherExpiryDD = angular.element(document.querySelector('#shopVoucherExpiry'))["0"];
                shopVoucherExpiryDD.options.selectedIndex = 0;
            }

        });

        // Vouchers - Online Reg
        $scope.$watch('vm.formData.onlineRegBonus', function () { 
            if(!vm.formData.onlineRegBonus) { 
                vm.formData.onlineRegVoucher = '';
            }

            // Empty input and select tags
            if($scope.bpVoucher && vm.formData.onlineRegBonus){
                var onlineRegVoucherExpiryDD = angular.element(document.querySelector('#onlineRegVoucherExpiry'))["0"];
                onlineRegVoucherExpiryDD.options.selectedIndex = 0;
            }

        });

        // Return Voucher Expiry selected value - dropdown
        $scope.selectedOptionFn = function selectedOptionFn(label, arr, arrName, id) {
            var arrLen = arr.length;
            for(var i = 0; i < arrLen; i++) {
                if(arr[i].label === label) {
                    arr[i].selected = true;
                }
            }

            // * Return value for Bonus Voucher in form
            switch(arrName) {
                case 'validEmailVoucherExpiries':
                    vm.formData.validEmailVoucherExpiries = label;
                    break;
                case 'shopVoucherExpiries':
                    vm.formData.shopVoucherExpiries = label;
                    break;
                case 'onlineRegVoucherExpiries':
                    vm.formData.onlineRegVoucherExpiries = label;
                    break;
                case 'daysDelayOptions':
                    vm.formData.daysDelayOptions = label;
                    break;
                default:
                //    code block
            }

            if(arrName === 'daysDelayOptions') {
                //SimplePickerChange
                $scope.SimplePickerChange(label);
            }

            // Limit to only 2 character entry
            // if(arrName === 'daysDelayOptions' && label) {
            //     console.log(id);
            //     var charCount = label.toString().length;
            //     console.log(charCount);

            //     var limit = 2;
            //     if(charCount > limit) { 
            //         var str = Number(label.toString().substr(0, limit));
            //         angular.element(document.querySelector('#'+id))["0"].value = str;
            //         console.log(str);
            //     } 

            //     /*angular.element(document.querySelector('#'+id)).on("keypress", function(e) {
            //         if(charCount == 2) { //!allowType && 
            //             e.preventDefault();
            //         } //else {
            //         //     allowType = true;
            //         // }
            //     });*/
            // }
        }

        // Email Template
        var countTemp = 0;

        // * Return value for senderName in form
        $scope.setSchedualData = function setSchedualData(schedualSec, $index) {
            switch($index) {
                case 0:
                    vm.formData.senderName1 = schedualSec;
                    break;
                case 1:
                    vm.formData.senderName2 = schedualSec;
                    break;
                default:
                    vm.formData.senderName = schedualSec;
            }
        }

        // * Return value for setTempData (Email Template) in form
        $scope.setTempData = function setTempData(selectTemplate) {
            if(selectTemplate === 'Template0') {
                vm.formData.selectedTemplate1 = selectTemplate;
            } else if (selectTemplate === 'Template1') {
                vm.formData.selectedTemplate2 = selectTemplate;
            }
        }

        // Email Template - Adding second schedual

        $scope.schedualSections = [
            {'schedualSec': 'schedualSec'}
        ];

        $scope.cloneRow = function cloneRow() {
            // Disable "schedual Second Email" button
            countTemp++;
            if (countTemp == 1) {
                $scope.addBtnDisabled = true;
                $scope.report2 = true;
                
            }
            // Stop clicking functionality - "schedual Second Email" button 
            if($scope.disableBtn || countTemp == 2) {
                return;
            }

            // Adding second schedual
            var len = $scope.schedualSections.length;
            $scope.schedualSections.push({[$scope.schedualSections[0] + len]: $scope.schedualSections[0] + len});
        }; 

        $scope.removeRow = function removeRow($index) {
            // Disable schedual remove button
            countTemp--;
            $scope.report2 = false;
            $scope.report2Active = false;
            if (countTemp == 1) {
                $scope.addBtnDisabled = true;
            } else {
                $scope.addBtnDisabled = false;
            }

            // Stop clicking functionality - schedual remove button 
            if($scope.disableBtn) {
                return;
            }
            // Removing last schedual
            $scope.schedualSections.splice($index, 1);
        }

        // Retrieve json data
        var count,
        allData = [];

        $scope.report = [],
        $scope.reportStoreData = [];    

        jsonFactory.getReport()
          .then(function (response) {

            $scope.report = response.data;
            $scope.reportTotalData = $scope.report.total;

            allData = Object.keys(response.data);
            count = Object.keys(response.data).length;
        
            $scope.setStoreData();
            
          }, function (error) {
            console.error(error);
          });

        // report - table data
        $scope.setStoreData = function setStoreData(storeName, $index) {
            //console.dir($scope.report); //$scope.datos now available 
            //$scope.storeSelectedOptions.value = storeName;

            for (var i = 0; i < count; i++) {
                if(allData[i] == storeName) {

                    switch(storeName) {
                        case 'Pharmacy1':
                            $scope.reportStoreData[$index] = $scope.report.Pharmacy1;
                            break;
                        case 'Pharmacy2':
                            $scope.reportStoreData[$index] = $scope.report.Pharmacy2;
                            break;
                        case 'Pharmacy3':
                            $scope.reportStoreData[$index] = $scope.report.Pharmacy3;
                            break;
                        case 'Pharmacy4':
                            $scope.reportStoreData[$index] = $scope.report.Pharmacy4;
                            break;
                        default:
                        //    $scope.reportStoreData
                    }
                }
            }
        }

        // //Start Comment - momentjs(required)
        // //Datepicker - angular - complete

        // $scope.date = [
        // {
        //     startDate: moment().subtract(0, "days"),
        //     endDate: moment()
        // },
        // {
        //     startDate: moment().subtract(0, "days"),
        //     endDate: moment()
        // }];

        // // $scope.date0 = {
        // //     startDate: moment().subtract(0, "days"),
        // //     endDate: moment()
        // // };
        // // $scope.date1 = {
        // //     startDate: moment().subtract(0, "days"),
        // //     endDate: moment()
        // // };

        // $scope.singleDate = moment().add(30, "days");
        // $scope.opts = {
        //     locale: {
        //         applyClass: 'btn-green',
        //         applyLabel: "Apply",
        //         fromLabel: "From",
        //         format: "YYYY-MM-DD",
        //         toLabel: "To",
        //         cancelLabel: 'Cancel',
        //         customRangeLabel: 'Custom range'
        //     },
        //     ranges: {
        //         'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        //         'Last 30 Days': [moment().subtract(29, 'days'), moment()]
        //     },
        //     startDate: '2013-01-01',
        //     endDate: '2013-12-31'
        // };

        // $scope.SimplePickerChange = function(label){
        //     $scope.date[1] = {   
        //       startDate: moment().subtract(0, "days").add(label, "days"), // $scope.date2.startDate.add(1, "days")
        //       endDate: moment().subtract(0, "days").add(label, "days")
        //     };
        //     //alert(JSON.stringify($scope.date2.startDate));
        // };

        // // $scope.setStartDate = function () {
        // //     $scope.date.startDate = moment().subtract(4, "days").toDate();
        // // };

        // // $scope.setRange = function () {
        // //     $scope.date = {
        // //         startDate: moment().subtract(5, "days"),
        // //         endDate: moment()
        // //     };
        // // };

        // //Watch for date changes
        // $scope.$watch('date[0]', function(newDate) {
        //     //$scope.date1.startDate = $scope.date1.startDate.format('YYYY-MM-DD');
        //     var fixedStartDate = localStorage.getItem("fixedStartDate"); 
        //     $scope.date[0].startDate = $scope.date[0].startDate.format('YYYY-MM-DD');
        //     $scope.date[0].endDate = $scope.date[0].endDate.format('YYYY-MM-DD');
        // }, false);

        // $scope.$watch('date[1]', function(newDate) {
        //     $scope.date[1].startDate = $scope.date[1].startDate.format('YYYY-MM-DD');
        //     $scope.date[1].endDate = $scope.date[1].endDate.format('YYYY-MM-DD');
        // }, false);

        // // console.log(moment().subtract(1, "days"));

        // // min Date
        // $scope.toggleMin = function() {
        //     $scope.minDate = ( $scope.minDate ) ? null : new Date();
        // };
        // $scope.toggleMin();

        // // End Datepicker

        // //Get today date
        // var getTodayDate = (function () {

        //     var today = new Date();
        //     var dd = today.getDate();
        //     var mm = today.getMonth()+1; //January is 0!

        //     var yyyy = today.getFullYear();
        //     if( dd < 10 ) {
        //         dd ='0'+dd;
        //     } 
        //     if( mm < 10 ) {
        //         mm ='0'+mm;
        //     } 
        //     var today = yyyy+'-'+mm+'-'+dd;

        //     return function () {return today;}
        // })();

        // // End Comment

        // report tabs
        $scope.active = function() {
            getTodayDate();

            // Set the drop down selected option on activate
            $scope.storeSelectedOptions.value[0] = $scope.storeSelectedOptions.values[0];
            $scope.storeSelectedOptions.value[1] = $scope.storeSelectedOptions.values[0];

            // Set the table data based on selcted option
            var firstSelectedElements = $scope.storeSelectedOptions.value.length;
            for(var i = 0; i < firstSelectedElements; i++) {
                $scope.setStoreData($scope.storeSelectedOptions.value[i], i);
            }

            //$scope.today = today;
            //Get Today Date

            // console.log(today);
            // var fixedStartDate = today;
            // localStorage.setItem("fixedStartDate", fixedStartDate);
            // console.log(fixedStartDate);

            $scope.reportActive = true;

            if($scope.report2) {
                $scope.report2Active = true;
            }
        }

        // function activate() {
        //     // get data from the parent component
        //     vm.formData = vm.parent.getData();
        //     console.log('Result feature loaded!');
        // }

        
    }

    function filterFilter(filterFilter) {
        return function optionSelection(input, prop) {
          return filterFilter(input, { selected: true }).map(function (storeOption) {
            return storeOption[prop];
          });
        };
    }

    // Retrieve json data
    angular.module('sampleApp')
      .factory('jsonFactory', function ($q, $http) {
        return {
          getReport: function () {
            var deferred = $q.defer(),
              httpPromise = $http.get('../result/reportData.json');

            httpPromise.then(function (response) {
              deferred.resolve(response);
            }, function (error) {
              console.error(error);
            });

            return deferred.promise;
          }
        };
    });

    // Datepicker - angular
    // angular.bootstrap(document, ['sampleApp']);
})();

// app.filter('fruitSelection', ['filterFilter', function (filterFilter) {
//     return function fruitSelection(input, prop) {
//       return filterFilter(input, { selected: true }).map(function (fruit) {
//         return fruit[prop];
//       });
//     };
//   }]);
