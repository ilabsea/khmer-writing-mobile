function createTables($cordovaSQLite) {

  var users = "CREATE TABLE IF NOT EXISTS users (id integer primary key, name text, grade text, type text, avatar_id integer, avatar_name text)";
  var addGuest = "INSERT INTO users (name, grade, type, avatar_id, avatar_name) VALUES (? , ?, ? , ?, ?)";

  var guest = ["ភ្ញៀវ", "", "" , 1, "a.png"];

  $cordovaSQLite.execute(db, users);
  $cordovaSQLite.execute(db, addGuest, guest);
}

function setDatabaseCopied(state) {
  localStorage.setItem("databaseCopied", state);
}

function getDatabaseCopied() {
  return localStorage.getItem("databaseCopied");
}
