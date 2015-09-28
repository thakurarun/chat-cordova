angular.module('starter.controllers', [])

.controller('SignUpCtrl', function ($scope) {
    $scope.model = {}
    $scope.RegisterContact = function (model) {
        console.log(model.ContactNumber);

    }
})

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
  console.log('chats control called..')
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, $ionicScrollDelegate, $timeout, $interval, Chats, Socket) {
    var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
    $scope.$on('$ionicView.enter', function (e) {
        $timeout(function () {
            viewScroll.scrollBottom();
        }, 0);
    });
    if ($stateParams.chatId == 0) { //coming from contacts..check first if chat exist with same user...
        $scope.chat = Chats.getWithUserId($stateParams.userId);
    } else {
        $scope.chat = Chats.get($stateParams.chatId); //simply find existing chat with chatId
    }
    $scope.message = {
        toUserId : $scope.chat.userId
    };
    $scope.counter = 120;
    $scope.sendMessage = function (msg) {
        Socket.initiateChat(msg);
        var temp = this.counter++;
        this.chat.chat.push({
            id: temp,
            me : 1, 
            another: 0,
            value: msg.value
        });
        this.chat.lastText = msg.value;
        msg.value = "";
        $timeout(function () {
            viewScroll.scrollBottom(true);
        }, 0);
        var self = this;
        $timeout(function () {
            var temp = self.counter++;
            self.chat.chat.push({
                id: temp,
                me : 0, 
                another: 1,
                value: "in response"
            });
            self.chat.lastText = msg.value;
            $timeout(function () {
                viewScroll.scrollBottom(true);
            }, 0);
        }, 3000);
        ///save msssage to db...TODO
    }

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
