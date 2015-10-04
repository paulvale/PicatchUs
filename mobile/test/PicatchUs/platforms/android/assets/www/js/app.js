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

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $stateProvider

    .state('login', {
        url: '/login',
        templateUrl: '../www/templates/login.html'
    })

    .state('home', {
        url: '/home',
        templateUrl: '../www/templates/home.html'
    })
  
    //If the specified route is unknown, user is redirected on login.html
    $urlRouterProvider.otherwise("/login");

    //Delete all the transition between ion-view directives
    $ionicConfigProvider.views.transition('none');
})

app.controller('SlideBoxController', ['$scope', '$http', '$ionicHistory', function ($scope, $http, $ionicHistory) {
    $ionicHistory.clearHistory();
    $scope.myActiveSlide = 2;

    /*
     * UTILS
     * Convert a Javascript object in a string which can be sent with post request
     */
    Object.toparams = function ObjecttoParams(obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };

    var retries = 0;
    var onCapturePhoto = function (fileURI) {
        var win = function (response) {
            console.log(JSON.stringify(response, null, 4));
            navigator.camera.cleanup();
            retries = 0;
            alert('Done!');
        }

        var fail = function (error) {
            if (retries == 0) {
                retries++
                setTimeout(function () {
                    onCapturePhoto(fileURI)
                }, 1000)
            } else {
                retries = 0;
                navigator.camera.cleanup();
                alert('Ups. Something wrong happens!');
            }
        }

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpg";
        options.params = {filename: options.fileName}; // if we need to send parameters to the server request
        var ft = new FileTransfer();
        ft.upload(fileURI, encodeURI("http://ws.picatchus.fr/picture/post"), win, fail, options);
    };


    function onFail(message) {
        alert('Failed because: ' + message);
    }


    $scope.take_photo = function () {
        options = {
            quality: 67,
            sourceType: 1,
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType : Camera.EncodingType.JPEG,
            correctOrientation: true,
        };

        navigator.camera.getPicture(
            onCapturePhoto,
            function () {
                //Taking a picture fail, what can we do ?
            },
            options);
    };


    /*
     * SEND TEXT PARAMS
     * TESTED OK
     */
    $scope.send_text_params = function () {
        /*
         * By default, the content-type is application/json, we have to redefine the content-type as data-form in order to fill the $_POST variable in the PHP server
         * Otherwise, we get an empty array.
         */
        $http({
            url: 'http://ws.picatchus.fr/post',
            method: "POST",
            data: Object.toparams({ filename: 'PicatchUs', content: 'Lenvoi de plusieurs paramètres par la méthode POST semble fonctionner !' }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {
            console.log(data);
        }).error(function (data, status, headers, config) { });
    };
}]);

app.controller('LoginController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    Object.toparams = function ObjecttoParams(obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };

    $scope.authentication = function () {
        console.log('authentification');
        $http({
            url: 'http://ws.picatchus.fr/user/login',
            method: "POST",
            data: Object.toparams({login: $scope.login, password: $scope.password}),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {
            loginSuccess(data, status, headers, config);
        }).error(function (data, status, headers, config) {
            loginFailed(data, status, headers, config);
        })
    };

    var loginSuccess = function (data, status, headers, config) {
        if (data === "AUTH_OK" && status == 200) {
            $location.path('/home');
        } else {
            loginFailed(data, status, headers, config);
        }
    };

    var loginFailed = function (data, status, headers, config) {
        $scope.login = "";
        $scope.password = "";
    };
}]);
