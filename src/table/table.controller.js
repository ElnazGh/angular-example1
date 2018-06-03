// (function () {
//     'use strict';
 
//     angular
//         .module('sampleApp')
//         .controller('tableController', tableController);
 
//     tableController.$inject = ['$scope', '$rootScope', '$http']; 
 
//     function tableController($scope, $rootScope, $http) { 
//         console.log('table page Loaded');

//         //header
//         $scope.header = {name: "header.html", url: "header/header.html"};
//         $scope.formPage = true;
//         $scope.headerText = "Confirm Member Details";
//         $scope.backLinkTopText = "Cancel";
//         $scope.backLinkBottomText = "Return to search";

//         var pagination = tableState.pagination;

//           var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
//           var number = pagination.number || 10;  // Number of entries showed per page.

//         $scope.loading = false;
//         $scope.getData = function() {
//             $scope.loading = true;
//             $http.get("http://dummy.restapiexample.com/api/v1/employees")
//             .then(function(response){
//                 $scope.employees = response.data;
//                 $scope.loading = false;
//             });
//         }
//         $scope.getData();

//     }

   
// })();

(function () {
    'use strict';

    angular
        .module('sampleApp')
        .controller('tableController', tableController);

    tableController.$inject = ['$scope', '$rootScope', 'Resource'];
    function tableController($scope, $rootScope, service) {
        var vm = this;

        // vm.user = null;
        // vm.allUsers = [];
        // vm.deleteUser = deleteUser;

        // initController();

        // function initController() {
        //     loadCurrentUser();
        //     loadAllUsers();
        // }

        // function loadCurrentUser() {
        //     UserService.GetByUsername($rootScope.globals.currentUser.username)
        //         .then(function (user) {
        //             vm.user = user;
        //         });
        // }

        // function loadAllUsers() {
        //     UserService.GetAll()
        //         .then(function (users) {
        //             vm.allUsers = users;
        //         });
        // }

        // function deleteUser(id) {
        //     UserService.Delete(id)
        //     .then(function () {
        //         loadAllUsers();
        //     });
        // }

        //
        var ctrl = this;

        this.displayed = [];

        this.callServer = function callServer(tableState) {
          ctrl.isLoading = true;

          var pagination = tableState.pagination;

          var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
          var number = pagination.number || 2;  // Number of entries showed per page.

          service.getPage(start, number, tableState).then(function (result) {
            ctrl.displayed = result.data;
            tableState.pagination.numberOfPages = result.numberOfPages; //result.numberOfPages; //set the number of pages so the pagination can update
            ctrl.isLoading = false;
          });
        };

        // link table row to form 
        $rootScope.formDataKey = false;
        vm.rowClick = function rowClick (path, row) {
            $location.path( path );

            $rootScope.formDataKey = true;
            $rootScope.path = path;
            $rootScope.row = row;
        }

        //header
        $scope.header = {name: "header.view.html", url: "header/header.view.html"};
        $scope.formPage = false;
        $scope.headerText = "Scan legacy card or search for member";
        $scope.mobileHeaderText = "to import";

        //footer
        $scope.footer = {name: "footer.view.html", url: "footer/footer.view.html"};

        // Clear Search Fields
        vm.clearSearch = function clearSearch () {
            $scope.firstName = null;
            $scope.surname = null;
            $scope.dob = null;
            $scope.phone = null;
            $scope.mobile = null;
            $scope.email = null;
            $scope.address = null;
            $scope.signUpStore = null;
        }

        // Availability 
        // Set the default value of Availability
          // vm.existingMember = false;
        


        // Retrieve json data
        // var count,
        // allData = [];

        // $scope.report = [],
        // $scope.reportStoreData = [];    

        // jsonFactory.getReport()
        //   .then(function (response) {

        //     $scope.report = response.data;
        //     $scope.reportTotalData = $scope.report.total;

        //     allData = Object.keys(response.data);
        //     count = Object.keys(response.data).length;
        
        //     $scope.setStoreData();
            
        //   }, function (error) {
        //     console.error(error);
        //   });

    }

    angular.module('sampleApp')
        .factory('Resource', ['$q', '$http','$filter', '$timeout', function ($q, $http, $filter, $timeout) {

        //this would be the service to call your server, a standard bridge between your model an $http

        // the database (normally on your server)
         //var randomsItems = [];
         var randomsItems = [
            {
                "salutation": "Mr",
                "gender": "Male",
                "firstName": "John",
                "surname": "Smith",
                "dob": "25 February 1978",
                "phone": "",
                "mobile": "",
                "email": "Smith@gmail.com",
                "address": "",
                "signUpStore": "Terry White Chemists Toombul",
                "availability": "true"
            },
            {
                "salutation": "Ms",
                "gender": "Female",
                "firstName": "Wally",
                "surname": "Lewis",
                "dob": "1 December 1959",
                "phone": "0722341234",
                "mobile": "0400123123",
                "email": "test@test.com",
                "address": "11 Sunrise Street, Ashgrove, QLD",
                "signUpStore": "Ashgrove Chemmart",
                "availability": "false"
            },
            {
                "salutation": "Ms",
                "gender": "Female",
                "firstName": "Wally",
                "surname": "Lewis",
                "dob": "25 July 1982",
                "phone": "",
                "mobile": "",
                "email": "lewis@hotmail.com",
                "address": "",
                "signUpStore": "Terry White Chemists Toombul",
                "availability": ""
            },
            {
                "salutation": "Mr",
                "gender": "Male",
                "firstName": "John",
                "surname": "Smith",
                "dob": "25 June 1978",
                "phone": "",
                "mobile": "",
                "email": "Smith@gmail.com",
                "address": "",
                "signUpStore": "Terry White Chemists Toombul",
                "availability": ""
            },
            {
                "salutation": "Ms",
                "gender": "Female",
                "firstName": "Wally",
                "surname": "Lewis",
                "dob": "1 December 1959",
                "phone": "0722341234",
                "mobile": "0400123123",
                "email": "lewis@hotmail.com",
                "address": "11 Sunrise Street, Ashgrove, QLD",
                "signUpStore": "Ashgrove Chemmart",
                "availability": "true"
            },
            {
                "salutation": "Mr",
                "gender": "Male",
                "firstName": "John",
                "surname": "Smith",
                "dob": "25 February 1978",
                "phone": "",
                "mobile": "",
                "email": "Smith@gmail.com",
                "address": "",
                "signUpStore": "Terry White Chemists Toombul",
                "availability": "true"
            },
            {
                "salutation": "Ms",
                "gender": "Female",
                "firstName": "Wally",
                "surname": "Lewis",
                "dob": "1 December 1959",
                "phone": "072341234",
                "mobile": "0400123123",
                "email": "",
                "address": "11 Sunrise Street, Ashgrove, QLD",
                "signUpStore": "Ashgrove Chemmart",
                "availability": "true"
            },
            {
                "salutation": "Ms",
                "gender": "Female",
                "firstName": "Wally",
                "surname": "Lewis",
                "dob": "25 July 1982",
                "phone": "",
                "mobile": "",
                "email": "lewis@hotmail.com",
                "address": "",
                "signUpStore": "Terry White Chemists Toombul",
                "availability": "true"
            },
            {
                "salutation": "Mr",
                "gender": "Male",
                "firstName": "John",
                "surname": "Smith",
                "dob": "25 April 1978",
                "phone": "",
                "mobile": "",
                "email": "Smith@gmail.com",
                "address": "",
                "signUpStore": "Terry White Chemists Toombul",
                "availability": "false"
            },
            {
                "salutation": "Ms",
                "gender": "Female",
                "firstName": "Wally",
                "surname": "Lewis",
                "dob": "1 December 1959",
                "phone": "0722341234",
                "mobile": "0400123123",
                "email": "lewis@hotmail.com",
                "address": "11 Sunrise Street, Ashgrove, QLD",
                "signUpStore": "Ashgrove Chemmart",
                "availability": "true"
            },
            {
                "salutation": "Mr",
                "gender": "Male",
                "firstName": "John",
                "surname": "Smith",
                "dob": "25 February 1978",
                "phone": "",
                "mobile": "",
                "email": "Smith@gmail.com",
                "address": "",
                "signUpStore": "Terry White Chemists Toombul",
                "availability": "true"
            },
            {
                "salutation": "Ms",
                "gender": "Female",
                "firstName": "Wally",
                "surname": "Lewis",
                "dob": "1 December 1959",
                "phone": "0722341234",
                "mobile": "0400123123",
                "email": "test@test.com",
                "address": "11 Sunrise Street, Ashgrove, QLD",
                "signUpStore": "Ashgrove Chemmart",
                "availability": "false"
            },
            {
                "salutation": "Ms",
                "gender": "Female",
                "firstName": "Wally",
                "surname": "Lewis",
                "dob": "25 July 1982",
                "phone": "",
                "mobile": "",
                "email": "lewis@hotmail.com",
                "address": "",
                "signUpStore": "Terry White Chemists Toombul",
                "availability": ""
            },
            {
                "salutation": "Mr",
                "gender": "Male",
                "firstName": "John",
                "surname": "Smith",
                "dob": "25 June 1978",
                "phone": "",
                "mobile": "",
                "email": "Smith@gmail.com",
                "address": "",
                "signUpStore": "Terry White Chemists Toombul",
                "availability": ""
            },
            {
                "salutation": "Ms",
                "gender": "Female",
                "firstName": "Wally",
                "surname": "Lewis",
                "dob": "1 December 1959",
                "phone": "0722341234",
                "mobile": "0400123123",
                "email": "lewis@hotmail.com",
                "address": "11 Sunrise Street, Ashgrove, QLD",
                "signUpStore": "Ashgrove Chemmart",
                "availability": "true"
            },
            {
                "salutation": "Mr",
                "gender": "Male",
                "firstName": "John",
                "surname": "Smith",
                "dob": "25 February 1978",
                "phone": "",
                "mobile": "",
                "email": "Smith@gmail.com",
                "address": "",
                "signUpStore": "Terry White Chemists Toombul",
                "availability": "true"
            },
            {
                "salutation": "Ms",
                "gender": "Female",
                "firstName": "Wally",
                "surname": "Lewis",
                "dob": "1 December 1959",
                "phone": "0722341234",
                "mobile": "0400123123",
                "email": "",
                "address": "11 Sunrise Street, Ashgrove, QLD",
                "signUpStore": "Ashgrove Chemmart",
                "availability": "true"
            },
            {
                "salutation": "Ms",
                "gender": "Female",
                "firstName": "Wally",
                "surname": "Lewis",
                "dob": "25 July 1982",
                "phone": "",
                "mobile": "",
                "email": "lewis@hotmail.com",
                "address": "",
                "signUpStore": "Terry White Chemists Toombul",
                "availability": "true"
            },
            {
                "salutation": "Mr",
                "gender": "Male",
                "firstName": "John",
                "surname": "Smith",
                "dob": "25 April 1978",
                "phone": "",
                "mobile": "",
                "email": "Smith@gmail.com",
                "address": "",
                "signUpStore": "Terry White Chemists Toombul",
                "availability": "false"
            },
            {
                "salutation": "Ms",
                "gender": "Female",
                "firstName": "Wally",
                "surname": "Lewis",
                "dob": "1 December 1959",
                "phone": "0722341234",
                "mobile": "0400123123",
                "email": "lewis@hotmail.com",
                "address": "11 Sunrise Street, Ashgrove, QLD",
                "signUpStore": "Ashgrove Chemmart",
                "availability": "true"
            },
            ];

        function createRandomItem() { //id
            // var names = ['Wally', 'Elnaz', 'Wally', 'Wally', 'Wally', 'Wally', 'Wally', 'Wally', 'Wally'];
            // var surnames = ['Lewis', 'Lewis', 'Lewis', 'Lewis', 'Lewis', 'Lewis', 'Lewis', 'Lewis', 'Lewis'];

            // return {
            //     //id: id,
            //     name: names[Math.floor(Math.random() * 7)],
            //     surname: surnames[Math.floor(Math.random() * 7)],
            //     age: Math.floor(Math.random() * 1000),
            //     saved: Math.floor(Math.random() * 10000)
            // };

        }

        // for (var i = 0; i < 1000; i++) {
        //     randomsItems.push(createRandomItem(i));
        // }

        // return {
        //   getReport: function () {
        //     var deferred = $q.defer(),
        //       httpPromise = $http.get('app/result/reportData.json');

        //     httpPromise.then(function (response) {
        //       deferred.resolve(response);
        //     }, function (error) {
        //       console.error(error);
        //     });

        //     return deferred.promise;
        //   }
        // };

        //fake call to the server, normally this service would serialize table state to send it to the server (with query parameters for example) and parse the response
        //in our case, it actually performs the logic which would happened in the server
        function getPage(start, number, params) {

            var deferred = $q.defer();
                // httpPromise = $http.get('assets/js/memberData.json');

                // httpPromise.then(function (response) {
                //     deferred.resolve(response);

                //     console.log(response.data.members);
                //     randomsItems = response.data.members;

                    // var filtered = params.search.predicateObject ? $filter('filter')(randomsItems, params.search.predicateObject) : randomsItems;
                    // console.log(filtered);
                    // if (params.sort.predicate) {
                    //     filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
                    // }

                    // var result = filtered.slice(start, start + number);
                    
                    // $timeout(function () {
                    //     //note, the server passes the information about the data set size
                    //     deferred.resolve({
                    //         data: result,
                    //         numberOfPages: Math.ceil(filtered.length / number)
                    //     });
                    // }, 1500);
                  
                // }, function (error) {
                //   console.error(error);
                // });

                var filtered = params.search.predicateObject ? $filter('filter')(randomsItems, params.search.predicateObject) : randomsItems;

                if (params.sort.predicate) {
                    filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
                }

                var result = filtered.slice(start, start + number);
                
                $timeout(function () {
                    //note, the server passes the information about the data set size
                    deferred.resolve({
                        data: result,
                        numberOfPages: Math.ceil(filtered.length / number)
                    });
                }, 1500);

            return deferred.promise;
        }

        return {
            getPage: getPage
        };

    }]);

})();

