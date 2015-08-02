// angular.module is a global place for creating, registering and retrieving Angular modules
// 'PicatchUs' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('PicatchUs', ['ionic']);

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider

    .state('login', {
        url: '/login',
        templateUrl: 'login.html'
    })

    .state('home', {
        url: '/home',
        templateUrl: 'home.html'
    })
  
    //If the specified route is unknown, user is redirected on login.html
    $urlRouterProvider.otherwise("/login");

    //Delete all the transition between ion-view directives
    $ionicConfigProvider.views.transition('none');
})

app.controller('SlideBoxController', function ($scope) {
    $scope.myActiveSlide = 2;
});

app.controller('LoginController', function ($scope) {
    //We modelize a database with users
    $scope.users = [
        {
            login: 'lwillemo',
            password: 'password',
            firstname: 'Lucas',
            name: 'Willemot'
        },
        {
            login: 'paulvale',
            password: 'password',
            firstname: 'Paul',
            name: 'Valentin'
        },
        {
            login: 'nzantour',
            password: 'password',
            firstname: 'Nicolas',
            name: 'Zantour'
        },
        {
            login: 'jlfridi',
            password: 'password',
            firstname: 'Jihane',
            name: 'Lfridi'
        }
    ];

    $scope.isUser = function (login, password) {
        //We check if the user is known
        for(user in $scope.users){
            if(login === user['login'] && password === user['password'])
                return true;
        }
        return false;
    };
});
