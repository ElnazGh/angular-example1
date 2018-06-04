// Code goes here

var bookingApp = angular.module('bookingApp', ['angularUtils.directives.dirPagination']);

function MyController($scope, $http) {

  $scope.currentPage = 1;
  $scope.pageSize = 10;
  // $scope.hotels = [];
  $scope.hotels = [];
    $http.get('hotels.json').success(function(data, status, headers, config) {
     $scope.hotels = data;
   }).error(function(data, status, headers, config) {
     // log error
   });

  // var dishes = [
  //   'noodles',
  //   'sausage',
  //   'beans on toast',
  //   'cheeseburger',
  //   'battered mars bar',
  //   'crisp butty',
  //   'yorkshire pudding',
  //   'wiener schnitzel',
  //   'sauerkraut mit ei',
  //   'salad',
  //   'onion soup',
  //   'bak choi',
  //   'avacado maki'
  // ];
  // var sides = [
  //   'with chips',
  //   'a la king',
  //   'drizzled with cheese sauce',
  //   'with a side salad',
  //   'on toast',
  //   'with ketchup',
  //   'on a bed of cabbage',
  //   'wrapped in streaky bacon',
  //   'on a stick with cheese',
  //   'in pitta bread'
  // ];
  for (var i = 1; i <= 100; i++) {
    // var dish = dishes[Math.floor(Math.random() * dishes.length)];
    // var side = sides[Math.floor(Math.random() * sides.length)];
    // $scope.meals.push('meal ' + i + ': ' + dish + ' ' + side);
    // $scope.meals.push({
    //    name:"name "+ i, price: "price "+ i, rating: "rating "+ i, country:"country "+ i
    //  });
    $scope.hotels.push({
       name:"name "+ i, price: "price "+ i, stars: "stars "+ i, rating: "rating "+ i, country:"country "+ i, imageUrl:"imageUrl "+ i
     });
  }
  
  $scope.pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
  };
}

function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };
}

bookingApp.controller('MyController', ['$scope','$http', function MyController($scope, $http){
    
}]);

bookingApp.controller('MyController', MyController);
bookingApp.controller('OtherController', OtherController);