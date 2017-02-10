function createTables($cordovaSQLite) {

  var users = "CREATE TABLE IF NOT EXISTS users (id integer primary key, name text, grade text, type text, avatar_id integer, avatar_name text)";
  var grades = "CREATE TABLE IF NOT EXISTS grades (id integer primary key, name text, code integer)";
  var writingMethods = "CREATE TABLE IF NOT EXISTS writing_methods (id integer primary key, name text, code integer)";
  var lessons = "CREATE TABLE IF NOT EXISTS lessons (id integer primary key, name text, khmer_numeric text, grade_id integer)";
  var contents = "CREATE TABLE IF NOT EXISTS contents (id integer primary key, content text, content_in_khmer text, clue text, audio text, image text, writing_method_id integer, lesson_id integer)"

  var addGuest = "INSERT INTO users (name, grade, type, avatar_id, avatar_name) VALUES (? , ?, ? , ?, ?)";

  var addGrades = "INSERT INTO grades (id, name, code) SELECT 1 AS 'id', 'ថ្នាក់ទី ១' AS 'name', 1 AS 'code' UNION SELECT 2, 'ថ្នាក់ទី ២', 2 UNION SELECT 3, 'ថ្នាក់ទី ៣' , 3";

  var addMethods = "INSERT INTO writing_methods (id, name, code) SELECT 1 AS 'id', ' របៀបសរសរ ' AS 'name' , 1 AS 'code'"
              + " UNION SELECT 2, ' សរសេរតាមមេីល ' , 2 "
              + " UNION SELECT 3, ' សរសេរតាមស្តាប ' , 3"
              + " UNION SELECT 4, ' សរសេរតាមរូបភាព ' , 4";

  var guest = ["ភ្ញៀវ", "", "" , 1, "a.png"];

  $cordovaSQLite.execute(db, users);
  $cordovaSQLite.execute(db, grades);
  $cordovaSQLite.execute(db, lessons);
  $cordovaSQLite.execute(db, writingMethods);
  $cordovaSQLite.execute(db, contents);

  $cordovaSQLite.execute(db, addGuest, guest);
  $cordovaSQLite.execute(db, addGrades)
  $cordovaSQLite.execute(db, addMethods).then(function(){
    setDatabaseCreated(true);
  });

}

function setDatabaseCreated(state) {
  localStorage.setItem("databaseCreated", state);
}

function getDatabaseCreated() {
  return localStorage.getItem("databaseCreated");
}
