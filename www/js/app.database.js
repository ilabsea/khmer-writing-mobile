function createTables($cordovaSQLite) {
  if (window.cordova) {
    db = $cordovaSQLite.openDB({ name: "khmer-writing.db" }); //device
  }else{
    db = window.openDatabase("khmer-writing.db", '1.0', 'Khmer writing mobile app database', 1024 * 1024 * 100); // browser
  }

  var classes = "CREATE TABLE IF NOT EXISTS grades (id integer primary key, name text)";
  var lessons = "CREATE TABLE IF NOT EXISTS lessons (id integer primary key, name text, grade_id integer)";
  var practiceMethods = "CREATE TABLE IF NOT EXISTS writing_methods (id integer primary key, name text)";
  var lessonContent = "CREATE TABLE IF NOT EXISTS contents (id integer primary key, grade_id integer, lesson_id integer, writing_method_id integer, content text)";

  $cordovaSQLite.execute(db, classes);
  $cordovaSQLite.execute(db, lessons);
  $cordovaSQLite.execute(db, practiceMethods);
  $cordovaSQLite.execute(db, lessonContent);

  // if(!getTablesExist()){
    insertData($cordovaSQLite);
  // }

}

function setTablesExist(value) {
  localStorage.setItem("tableExist", value);
}

function getTablesExist() {
  return localStorage.getItem('tableExist');
}

function insertData($cordovaSQLite){
  var classesInsert = "INSERT INTO grades (id, name) SELECT 1 AS 'id', 'ថា្នក់ទ​ី ១' AS 'name' UNION SELECT 2, 'ថា្នក់ទ​ី ២' UNION SELECT 3, 'ថា្នក់ទ​ី ៣'";
  var lessonsInsert = "INSERT INTO lessons (id, name, grade_id) SELECT 1 AS 'id', '១ រៀនគូសបន្ទាត់​ និង ខ្សែកោង' AS 'name', 1 AS 'class_id'"
              + " UNION SELECT 2, '២ ស្រះនិស្ស័យ', 1 "
              + " UNION SELECT 3, '៣ ព្យញ្ជនៈ​ ៣៣ តួ', 1"
              + " UNION SELECT 4, '៤ ', 1"
              + " UNION SELECT 5, '៥ ', 1"
              + " UNION SELECT 6, '៦ ', 1"
              + " UNION SELECT 7, '៧ ', 1"
              + " UNION SELECT 8, '៨ ', 1"
              + " UNION SELECT 9, '៩ ', 1"
              + " UNION SELECT 10, '១០ ', 1"
              + " UNION SELECT 11, '១១ ', 1";

  var methodsInsert = "INSERT INTO writing_methods (id, name) SELECT 1 AS 'id', ' របៀបសរស ' AS 'name'"
              + " UNION SELECT 2, ' សរសេរតាមមេីល ' "
              + " UNION SELECT 3, ' សរសេរតាមស្តាប '"
              + " UNION SELECT 4, ' សរសេរតាមរូបភាព '"

  var contentsInsert = "INSERT INTO contents (id, grade_id, lesson_id, writing_method_id, content)"
              + " SELECT 1 AS 'id', 1 AS 'grade_id', 1 AS 'lesson_id', 1 AS 'writing_method_id', 'horizontal-line' AS content"
              + " UNION SELECT 2, 1, 1, 1, 'vertical-up-line'"
              + " UNION SELECT 3, 1, 1, 1, 'vertical-down-line'"
              + " UNION SELECT 4, 1, 1, 1, 'one-mountain'"
              + " UNION SELECT 5, 1, 1, 1,'two-mountains'"
              + " UNION SELECT 6, 1, 1, 1,'w-shape-disconnect'"
              + " UNION SELECT 7, 1, 1, 1,'w-shape-connect'"
              + " UNION SELECT 8, 1, 1, 1,'m-shape-disconnect'"
              + " UNION SELECT 9, 1, 1, 1,'m-shape-connect'"
              + " UNION SELECT 10, 1, 1,1, 'three-corners-up'"
              + " UNION SELECT 11, 1, 1,1, 'three-corners-down'"
              + " UNION SELECT 12, 1, 1, 1,'half-circle-down'"
              + " UNION SELECT 13, 1, 1, 1,'half-circle-up'"
              + " UNION SELECT 14, 1, 1, 1,'two-half-circle'"


  $cordovaSQLite.execute(db, classesInsert);
  $cordovaSQLite.execute(db, lessonsInsert);
  $cordovaSQLite.execute(db, methodsInsert);
  $cordovaSQLite.execute(db, contentsInsert);



}
