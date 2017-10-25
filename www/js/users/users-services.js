angular.module('app')

.factory("UsersServices", UsersServices)
UsersServices.$inject = ["$cordovaSQLite", 'Helper']

function UsersServices($cordovaSQLite, Helper) {
  var currentUser;

  function getUsers(offset, limit) {
    var query = "SELECT * FROM users LIMIT (?) OFFSET (?)";
    return $cordovaSQLite.execute(db, query, [limit, offset]).then(function(res) {
      return Helper.generateResult(res);
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
