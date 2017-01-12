angular.module('app')

.factory("UsersServices", UsersServices)
UsersServices.$inject = ["$cordovaSQLite"]

function UsersServices($cordovaSQLite) {
  var currentUser;

  function getUsers(index) {
    console.log('index : ', index);
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
      console.log('result : ', result);
      return result;
    });
  }

  function setCurrentUser(user) {
    currentUser = user;
  }

  function getCurrentUser() {
    return currentUser;
  }

  return{
    getUsers: getUsers,
    setCurrentUser: setCurrentUser,
    getCurrentUser: getCurrentUser
  }
}
