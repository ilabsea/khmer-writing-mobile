angular.module('app')

.factory("AccountsServices", AccountsServices)
AccountsServices.$inject = ["$cordovaSQLite"]

function AccountsServices($cordovaSQLite) {
  var avatars = [ {'id': 1 , 'name': 'a.png', 'selected' : false},
                  {'id': 2 ,'name': 'b.png', 'selected' : false},
                  {'id': 3 ,'name': 'c.png', 'selected' : false},
                  {'id': 4 ,'name': 'd.png', 'selected' : false},
                  {'id': 5 ,'name': 'e.png', 'selected' : false},
                  {'id': 6 ,'name': 'f.png', 'selected' : false}];


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
    var query = "UPDATE users SET name = ? , grade = ? , type = ? , avatar_id = ? , avatar_name = ? WHERE id=?";

    var userData = [user.name, user.grade, user.type, avatar.id, avatar.name, user.id];
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
