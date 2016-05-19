'use strict';

var app = angular.module('angularApp', ['ui.router', 'satellizer']);
app.config(function($stateProvider, $urlRouterProvider, $authProvider) {

        $authProvider.github({
            clientId: 'da08506b21add5c5ee7a'
        });

        $authProvider.google({
            clientId: '771142404121-evshu82nqppk0k3nodbl9eber4e0fr4j.apps.googleusercontent.com'
        });
        $authProvider.facebook({
            clientId: '897418913717572'
        });

    $stateProvider
        
        .state('home', {
            url: '/',
            templateUrl: '/html/home.html',
            controller: 'homeCtrl'
        })
        .state('browse', {
            url: '/browse/',
            templateUrl: '/html/browseusers.html',
            controller: 'browseCtrl'
        })
        .state('addImage', {
            url: '/albums/addimage',
            templateUrl: '/html/addImage.html',
            controller: 'newImageCtrl'
        })
        .state('albums', {
            url: '/albums/browse',
            templateUrl: '/html/albums.html',
            controller: 'albumsCtrl'
        })
        .state('thispicture', {
            url: '/albums/picture:id',
            templateUrl: '/html/mypicture.html',
            controller: 'pictureDetailCtrl'
        })
        .state('login', {
            url: '/login/',
            templateUrl: '/html/login.html',
            controller: 'loginCtrl'
        })
        .state('myprofile', {
            url: '/myprofile/',
            templateUrl: '/html/profile.html',
            controller: 'profileCtrl'
        })
        .state('register', {
            url: '/newuser/',
            templateUrl: '/html/register.html',
            controller: 'registerCtrl'
        })
        .state('editprofile', {
            url: '/profile/edit',
            templateUrl: '/html/editprofile.html',
            controller: 'editCtrl'
        })
        
       


    $urlRouterProvider.otherwise('/');

})
