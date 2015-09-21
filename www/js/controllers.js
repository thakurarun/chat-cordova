angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, $state,Chats) {
    $scope.contacts = Chats.getAllContacts();
    $scope.initiateChat = function (data) {
        $state.go('tab.chat-detail', { chatId: 0,userId:data.id})
    }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    console.log($stateParams.chatId + ":" + $stateParams.userId)
    if ($stateParams.chatId == 0) { //coming from contacts..check first if chat exist with same user...
        $scope.chat = Chats.getWithUserId($stateParams.userId);
    } else {
        $scope.chat = Chats.get($stateParams.chatId); //simply find existing chat with chatId
    }
    console.log($scope.chat)
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
