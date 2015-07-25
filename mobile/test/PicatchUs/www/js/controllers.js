angular.module('starter.controllers', [])

.controller('TakePictureCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('AlbumsCtrl', function ($scope) {
    $scope.albums = [
        { id: 1, album: 'UTCéenne 2015', date: '28 Septembre 2015' },
        { id: 2, album: 'Gala 2015', date: '23 Novembre 2015' },
        { id: 3, album: 'IF 2016', date: '26 et 27 mai 2015' },
    ];
});
