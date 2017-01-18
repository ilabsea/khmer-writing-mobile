angular.module('app')

.factory("AccountsServices", AccountsServices)
AccountsServices.$inject = ["$cordovaSQLite"]

function AccountsServices($cordovaSQLite) {
  var avatars = [ {'id': 1 , 'name': 'boy.png', 'selected' : false},
                  {'id': 2 ,'name': 'girl.png', 'selected' : false},
                  {'id': 3 ,'name': 'avatar.png', 'selected' : false},
                  {'id': 4 ,'name': 'boy.png', 'selected' : false},
                  {'id': 5 ,'name': 'girl.png', 'selected' : false},
                  {'id': 6 ,'name': 'boy.png', 'selected' : false}];


  function getAvatars() {
    return avatars;
  }

  function addUser(user, avatar) {
    var query = "INSERT INTO users (name, grade, type, avatar_id, avatar_name) VALUES (? , ?, ? , ?, ?)";

    var userData = [user.name, user.grade, user.type, avatar.id, avatar.name];
    return $cordovaSQLite.execute(db, query, userData).then(function(success){
      user.id = success.insertId;
      user.avatar_id = avatar.id;
      user.avatar_name = avatar.name;
      return user;
    });
  }

  function editUser(user, avatar) {
    var query = "UPDATE users SET name = ? , grade = ? , type = ? , avatar_id = ? , avatar_name = ?";

    var userData = [user.name, user.grade, user.type, avatar.id, avatar.name];
    return $cordovaSQLite.execute(db, query, userData).then(function(success){
      user.avatar_id = avatar.id;
      user.avatar_name = avatar.name;
      return user;
    });
  }

  return{
    getAvatars: getAvatars,
    addUser: addUser,
    editUser: editUser
  }
}
