angular.module('app')

.factory("AccountsServices", AccountsServices)
AccountsServices.$inject = ["$cordovaSQLite"]

function AccountsServices($cordovaSQLite) {
  var avatars = [ {'id': 1 , 'name': 'a.png', 'selected' : false},
                  {'id': 2 ,'name': 'a.png', 'selected' : false},
                  {'id': 3 ,'name': 'a.png', 'selected' : false},
                  {'id': 4 ,'name': 'a.png', 'selected' : false},
                  {'id': 5 ,'name': 'a.png', 'selected' : false},
                  {'id': 6 ,'name': 'a.png', 'selected' : false}];


  function getAvatars() {
    return avatars;
  }

  function addUser(user, avatar) {
    var query = "INSERT INTO users (name, grade, type, avatar_id) VALUES (? , ?, ? , ?)";

    var userData = [user.name, user.grade, user.type, avatar.id];
    $cordovaSQLite.execute(db, query, userData).then(function(success){
      console.log('success : ', success);
    }, function(error){
      console.log('error : ', error);
    });
  }

  return{
    getAvatars: getAvatars,
    addUser: addUser
  }
}
