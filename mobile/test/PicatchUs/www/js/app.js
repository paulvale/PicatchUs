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

    var serialize = function (obj, prefix) {
        // http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object
        var str = [];
        for (var p in obj) {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return str.join("&");
    };

    //Fix issue to send data with POST request to the server    
    $httpProvider.interceptors.push(['$q', function ($q) {
        return {
            request: function (config) {
                if (config.data && typeof config.data === 'object') {
                    // Check https://gist.github.com/brunoscopelliti/7492579 
                    // for a possible way to implement the serialize function.
                    config.data = serialize(config.data);
                }
                return config || $q.when(config);
            }
        };
    }]);
})

app.controller('SlideBoxController', ['$scope', '$http', function ($scope, $http) {
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
        console.log('onCapturePhoto ! : ');
        var win = function (r) {
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
        ft.upload(fileURI, encodeURI("http://ws.picatchus.fr/post"), win, fail, options);
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
