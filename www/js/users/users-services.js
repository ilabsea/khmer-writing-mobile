angular.module('app')

.factory("UsersServices", UsersServices)
UsersServices.$inject = ["$cordovaSQLite"]

function UsersServices($cordovaSQLite) {
  var currentUser;

  function getUsers(index) {
    var limit = 2;
    if(index == 0)
      limit = 1;
    var query = "SELECT * FROM users LIMIT (?) OFFSET (?)";
    return places = $cordovaSQLite.execute(db, query, [limit, index]).then(function(res) {
      var result = [];
      if(res.rows.length > 0){
        var i = 0,
            l = res.rows.length
        for(;i<l;i++){
          result.push(res.rows.item(i));
        }
      }
      return result;
    });
  }

  function setCurrentUser(user) {
    currentUser = user;
  }

  function getCurrentUser() {
    return currentUser;
  }

  function numberOfUsers() {
    var countSql = "SELECT count(*) AS count FROM users";
    return $cordovaSQLite.execute(db, countSql, []).then(function (res) {
      return res.rows.item(0).count;
    });
  }

  function deleteUser() {
    var deleteSql = "DELETE FROM users WHERE id = " + currentUser.id;
    return $cordovaSQLite.execute(db, deleteSql, []).then(function(success){
      return success;
    }, function(error){
      console.log('error : ', error);
    });
  }

  return{
    getUsers: getUsers,
    setCurrentUser: setCurrentUser,
    getCurrentUser: getCurrentUser,
    numberOfUsers: numberOfUsers,
    deleteUser: deleteUser
  }
}
