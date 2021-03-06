// var sampleApp = angular.module('sampleApp', ['ui.router'])

// sampleApp.config([
//     '$routeProvider',
//     function($routeProvider) {
//         $routeProvider
//             .when('/', {
//                 templateUrl: 'views/home.html',
//                 controller: 'homeCtrl'
//             });
//     }
// ]);

(function() {
    'use strict';

    // Creating our angular app and inject ui-router 
    // =============================================================================
    var sampleApp = angular.module('sampleApp', ['ui.router', 'smart-table'])

    // Configuring our states 
    // =============================================================================
    sampleApp.config(['$stateProvider', '$urlRouterProvider',

        function($stateProvider, $urlRouterProvider) {

            // For any unmatched url, redirect to /home
            $urlRouterProvider.otherwise('/home');
    
            $stateProvider
                // PARENT STATE: form state
                .state('home', {
                    url: '/home',
                    component: 'homeComponent'
                })
        
                // NESTED STATES: child states of 'home' state 
                // URL will become '/home/about'
                // .state('home.about', {
                //     url: '/about',
                //     component: 'aboutComponent'
                // })
                .state('/about', {
                    url: '/about',
                    component: 'aboutComponent'
                })

                .state('table', {
                    url: '/table',
                    component: 'tableComponent'
                })

                .state('form', {
                    url: '/form',
                    component: 'formComponent'
                })

                // .state('result', {
                //     url: '/result',
                //     component: 'resultComponent'
                // })
        }
    ]);

    //Allow only digits
    sampleApp
        .directive('digitsOnly', function() {
            return {
                require: 'ngModel',
                link: function (scope, element, attr, ngModelCtrl) {
                    function fromUser(text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');
                        
                        if(transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    ngModelCtrl.$parsers.push(fromUser);
                }
            }; 
        });
       
})();

