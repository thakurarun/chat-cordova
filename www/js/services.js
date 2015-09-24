var app = angular.module('starter.services', []);
app.factory('Chats', function () {
    // Might use a resource here that returns a JSON array
    
    // Some fake testing data
    
    var contacts = [{ "id": "abcd", "name": "kwhite0", "contact": "2-(758)892-8414" },
                            { "id": "pqrs", "name": "kcrawford1", "contact": "1-(559)457-7966" },
                            { "id": "wxyz", "name": "lreed2", "contact": "5-(579)388-0724" }];
    var chats = [];
    
    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        },
        getAllContacts: function () {
            return contacts;
        },
        getWithUserId: function (userId) {
            var result = chats.filter(function (chat) {
                return chat.userId == userId;
            });
            if (result.length > 0) { //if length is greater than 1, then there is something fishy. . .
                return result[0]; //check for existing chat..and return latest chat...
            } else {
                var result = contacts.filter(function (contact) {
                    return contact.id == userId;
                })[0];
                return {
                    id: 100, //need new GUID for chat
                    userId: result.id,
                    name: result.name,
                    lastText: '',
                    chat: []
                };
            }
        }
    };
})
app.factory('Socket', function () {
    return {
        initiateChat : function (data,chat) {
            var socket = io("http://localhost:3000/", { query: 'name=' + data.toUserId }); //"query" :: add it to handshake while polling...
            socket.on(data.toUserId, function (response) {
                chat.chat.push({
                    id: 0,
                    me : 0, 
                    another: 1,
                    value: response
                });
            });
            
        }
    };
});
