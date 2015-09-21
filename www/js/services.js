angular.module('starter.services', [])
.factory('Chats', function () {
    // Might use a resource here that returns a JSON array
    
    // Some fake testing data
    
    var contacts = [{ "id": 1, "name": "kwhite0", "contact": "2-(758)892-8414" },
                            { "id": 2, "name": "kcrawford1", "contact": "1-(559)457-7966" },
                            { "id": 3, "name": "lreed2", "contact": "5-(579)388-0724" },
                            { "id": 4, "name": "jmendoza3", "contact": "3-(295)101-1478" },
                            { "id": 5, "name": "aryan4", "contact": "3-(512)469-9498" },
                            { "id": 6, "name": "pmurray5", "contact": "0-(751)887-6447" },
                            { "id": 7, "name": "lwoods6", "contact": "1-(372)125-5254" },
                            { "id": 8, "name": "kmills7", "contact": "1-(329)014-6936" },
                            { "id": 9, "name": "jbennett8", "contact": "5-(104)728-5744" },
                            { "id": 10, "name": "efranklin9", "contact": "8-(334)746-7361" }];
    var chats = [{
            id: 0,
            userId: 2,
            name: 'kcrawford1',
            lastText: "I m' good, how you?",
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
            chat: [{ me : 1, another: 0, value: "Hello, how are you!!" }, { me : 0, another: 1, value: "I m' good, how you." }]
        }, {
            id: 1,
            userId: 7,
            name: 'lwoods6',
            lastText: 'Hey, it\'s me',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
        }];
    
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
                    chat:[]
                };
            }
        }
    
    };
});
