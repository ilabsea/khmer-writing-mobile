function createTables($cordovaSQLite) {

  var users = "CREATE TABLE IF NOT EXISTS users (id integer primary key, "+
              "name text, grade text, type text, avatar_id integer, avatar_name text)";

  var grades = "CREATE TABLE IF NOT EXISTS grades (id integer primary key, grade_id_api integer," +
                "name text, created_at text, updated_at text, code integer)";

  var methods = "CREATE TABLE IF NOT EXISTS writing_methods (id integer primary key,"+
                "writing_method_id_api integer, name text, created_at text, updated_at text, code integer, icon text)";

  var lessons = "CREATE TABLE IF NOT EXISTS lessons (id integer primary key, lesson_id_api integer, " +
                "name text, grade_id_api integer, created_at text, updated_at text, khmer_numeric text, background text)";

  var contents = "CREATE TABLE IF NOT EXISTS contents (id integer primary key, " +
                "content_id_api integer, lesson_id_api integer, writing_method_id_api integer, " +
                "content text, created_at text, updated_at text, content_in_khmer text, " +
                "image_clue text, audio text, image text, image_answer text)";

  var tracks = "CREATE TABLE IF NOT EXISTS tracks (id integer primary key, " +
               "user_id integer, lesson_id integer, tracks text, star integer)";

  var addGuest = "INSERT INTO users (name, grade, type, avatar_id, avatar_name) VALUES (? , ?, ? , ?, ?)";

  var guest = ["ភ្ញៀវ", "", "" , 1, "a.png"];

  $cordovaSQLite.execute(db, users);
  $cordovaSQLite.execute(db, addGuest, guest);
  $cordovaSQLite.execute(db, grades);
  $cordovaSQLite.execute(db, methods);
  $cordovaSQLite.execute(db, lessons);
  $cordovaSQLite.execute(db, contents);
  $cordovaSQLite.execute(db, tracks);
}

function setDatabaseCopied(state) {
  localStorage.setItem("databaseCopied", state);
}

function getDatabaseCopied() {
  return localStorage.getItem("databaseCopied");
}

function openDB() {
  if (window.cordova) {
    db = $cordovaSQLite.openDB({ name: "khmer-writing.db" }); //device
  }else{
    db = window.openDatabase("khmer-writing.db", '1.0', 'larvae report system database', 1024 * 1024 * 100); // browser
  }
}
