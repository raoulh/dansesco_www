'use strict';

angular.module('dansesCoApp', [
    'ngSanitize',
    'ui.router'
])
.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    //Set up the states
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'views/main.html'
    })
    .state('about', {
        url: '/about',
        templateUrl: 'views/about.html'
    })
    .state('courses', {
        url: '/courses',
        templateUrl: 'views/courses.html'
    })
    .state('news', {
        url: '/news',
        templateUrl: 'views/news.html'
    })
    .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html'
    })
})
.run(function($rootScope, $state) {
    $rootScope.$state = $state;
});
