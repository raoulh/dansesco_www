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
        url: '/cours',
        templateUrl: 'views/courses.html'
    })
    .state('courses.std', {
        url: '/cours/standard',
        templateUrl: 'views/danses_std.html'
    })
    .state('courses.latines', {
        url: '/cours/latines',
        templateUrl: 'views/danses_latines.html'
    })
    .state('courses.zumba', {
        url: '/cours/zumba',
        templateUrl: 'views/danses_zumba.html'
    })
    .state('courses.particulier', {
        url: '/cours/particulier',
        templateUrl: 'views/danses_particulier.html'
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
