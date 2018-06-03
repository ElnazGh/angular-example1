(function () {
    'use strict';
 
    angular
        .module('sampleApp')
        .controller('formController', formController);
 
    formController.$inject = ['$scope', '$rootScope']; 
 
    function formController($scope, $rootScope) { 
        console.log('form page Loaded');

        //header
        $scope.header = {name: "header.html", url: "header/header.html"};
        $scope.formPage = true;
        $scope.headerText = "Confirm Member Details";
        $scope.backLinkTopText = "Cancel";
        $scope.backLinkBottomText = "Return to search";

        //footer
        $scope.footer = {name: "footer.html", url: "footer/footer.html"};

        // Search - Form
        $scope.salutation = [
            {value: 'Ms', label: 'Ms'},
            {value: 'Mrs', label: 'Mrs'},
            {value: 'Miss', label: 'Miss'},
            {value: 'Mr', label: 'Mr'}
        ];

        $scope.gender = [
            {value: 'Female', label: 'Female'},
            {value: 'Male', label: 'Male'},
            {value: 'Other', label: 'Other'}
        ];

        // Address 
        $scope.statesOrRegions = [
            {value: 'Australian Capital Territory', label: 'ACT'},
            {value: 'New South Wales', label: 'NSW'},
            {value: 'Northern Territory', label: 'NT'},
            {value: 'Queensland', label: 'QLD'},
            {value: 'South Australia', label: 'SA'},
            {value: 'Tasmania', label: 'TAS'},
            {value: 'Victoria', label: 'VIC'},
            {value: 'Western Australia', label: 'WA'}
        ];

        $scope.countries = [
            {value: 'Australia', label: 'Australia'},
            {value: 'New Zealand', label: 'New Zealand'}
        ];

        $scope.options = {
            //types: ['(cities)'],
            componentRestrictions: { country: ['AUS', 'NZ'] }
        };

        $scope.address = { // -vm
            name: '',
            place: '',
            components: {
              placeId: '',
              unittNumber: '', 
              streetNumber: '', 
              street: '',
              addressLine2: '', 
              suburb: '', 
              city: '',
              postCode: '',
              state: '',
              countryCode: '',
              country: '',
              district: '',
              location: {
                lat: '',
                long: ''
              }
            }
        };
    
        // Address - Set the default value of addressCheckbox to false - show all address fields
        $scope.addressCheckbox = false; // -vm

        // Address - Manual - on click
        $scope.setAddressFields = function setAddressFields(countryValue, stateValue) { // -vm
            if(countryValue) {
                for(var i=0; i < $scope.countries.length; i++) {
                    if($scope.countries[i].value === countryValue) {
                        $scope.address.components.country = $scope.countries[i]; // -vm
                        break;
                    }
                }
            }

            if(stateValue) {
                for(var i=0; i < $scope.statesOrRegions.length; i++) {
                    if($scope.statesOrRegions[i].value === stateValue ||
                        $scope.statesOrRegions[i].label === stateValue) {
                        $cope.address.components.state = $scope.statesOrRegions[i]; // -vm
                        break;
                    }
                }
            }
        }

        // DOB
        $scope.dayMonths = {
            0: 31, 1: 28, 2: 31, 3: 30, 4: 31, 5: 30,
            6: 31, 7: 31, 8: 30, 9: 31, 10: 30, 11: 31
        };

        $scope.months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ];

        $scope.years = [];
        $scope.days = [];

        var dayMonthsSize = Object.keys($scope.dayMonths).length;

        $scope.setDays = function setDays(monthItem) {

            var dayMonthsIndex = -1;

            for(var i = 0; i < $scope.days.length; i++) {
                $scope.days = [];
            }

            var selectedMonth = monthItem;

            for(var i = 0; i < $scope.months.length; i++) {
                if($scope.months[i] == selectedMonth) {
                    dayMonthsIndex = $scope.dayMonths[i];
                    break;
                }
            }

            // days
            if (dayMonthsIndex > -1) {
                for(var k = 1; k <= dayMonthsIndex; k++ ) {
                    $scope.days.push(k);
                }
            }
        }

        // Years
        var current_year = new Date().getFullYear(); // this year
        var end_year = current_year - 18;
        var start_year = current_year - 100;

        for(var l = end_year; l >= start_year; l--) {
            $scope.years.push(l);
        }

        // Phone, mobile and email format
        $scope.phoneNumber = /^\(?(?:\+?61|0)(?:2\)?[ -]?(?:3[ -]?[38]|[46-9][ -]?[0-9]|5[ -]?[0-35-9])|3\)?(?:4[ -]?[0-57-9]|[57-9][ -]?[0-9]|6[ -]?[1-67])|7\)?[ -]?(?:[2-4][ -]?[0-9]|5[ -]?[2-7]|7[ -]?6)|8\)?[ -]?(?:5[ -]?[1-4]|6[ -]?[0-8]|[7-9][ -]?[0-9]))(?:[ -]?[0-9]){6}$/;
        $scope.mobileNumber = /^(?:\+?61|0)4 ?(?:(?:[01] ?[0-9]|2 ?[0-57-9]|3 ?[1-9]|4 ?[7-9]|5 ?[018]) ?[0-9]|3 ?0 ?[0-5])(?: ?[0-9]){5}$/;
        $scope.emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // Selected options
        $scope.selectedOptionFn = function selectedOptionFn (id, arrName, selectedOption) { 
            // if(selectedOption) {
            //     var arrLen = arrName.length;
            //     for(var i = 0; i < arrLen; i++) {
            //         if(arrName[i].label === selectedOption) {
            //             arrName[i].selected = true;
            //         }
            //     }
            // }

            // switch(arrName) {
            //     case 'salutation':
            //         vm.salutationSelectedItem = selectedOption;
            //         break;
            //     case 'gender':
            //         vm.genderSelectedItem = selectedOption;
            //         break;
            //     default:
            //     //    code block
            // }

            // vm.salutationSelectedItem = selectedOption;
            console.log(selectedOption);

        }

        $scope.data = $rootScope.row; // -vm
        if($rootScope.formDataKey) {

            // Retrieve Data from table - home.controller
            $scope.data = $rootScope.row; // -vm

            // set selected value to a particular value
            // Salutation
            if($scope.data.salutation) { // -vm
                for (var i=0; i < $scope.salutation.length; i++) {
                    if($scope.salutation[i].value == $scope.data.salutation ) {  // -vm
                        $scope.salutationItem = $scope.salutation[i];
                    }
                }
           }
           // Gender
           if($scope.data.gender) {
                for (var i=0; i < $scope.gender.length; i++) {
                    if($scope.gender[i].value == $scope.data.gender ) { // -vm
                        $scope.genderItem = $scope.gender[i];
                    }
                }
           }

           // Month
           if($scope.data.dob) { // -vm

                var dobArr = $scope.data.dob.split(" "); // -vm

                $scope.setDays(dobArr[1]);

                //month
                if(dobArr[1]) {
                    for (var i = 0; i < $scope.months.length; i++) {
                        if($scope.months[i] == dobArr[1] ) {
                            $scope.monthItem = $scope.months[i];
                        }
                    }
               }

               // // Day
               if(dobArr[0]) {
                    for (var i=0; i < $scope.days.length; i++) {
                        if($scope.days[i] == dobArr[0] ) {
                            $scope.dayItem = $scope.days[i];
                        }
                    }
               }

               // // // Year
               if(dobArr[2]) {
                    for (var i=0; i < $scope.years.length; i++) {
                        if($scope.years[i] == dobArr[2] ) {
                            $scope.yearItem = $scope.years[i];
                        }
                    }
               }
            }
        }  
    }
})();

