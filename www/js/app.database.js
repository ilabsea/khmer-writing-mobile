function createTables($cordovaSQLite) {

  var users = "CREATE TABLE IF NOT EXISTS users (id integer primary key, name text, grade text, type text, avatar_id integer)";

  $cordovaSQLite.execute(db, users);

}

function setDatabaseCopied(state) {
  localStorage.setItem("databaseCopied", state);
}

function getDatabaseCopied() {
  return localStorage.getItem("databaseCopied");
}
