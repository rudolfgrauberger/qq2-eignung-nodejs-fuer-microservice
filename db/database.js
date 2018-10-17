const mongoose = require('mongoose');
const student = require('../models/student');

mongoose.Promise = global.Promise;

const saveStudent = (student) => {
   student.save().then(() => {
      console.log(`Saved student ${student}`);
   }, (e) => {
      console.log(`Unable to save ${student}`);
   });
};

const insertTestData = () => {
   const rudolf = new student.Student({
      Vorname: 'Rudolf',
      Nachname: 'Grauberger',
      Matrikelnummer: 00000001,
      Studiengang: 'INF',
      Semester: 5,
      EMail: 'rudolf.grauberger@example.com'
   });
   
   const max = new student.Student({
      Vorname: 'Max',
      Nachname: 'Mustermann',
      Matrikelnummer: 00000002,
      Studiengang: 'MI',
      Semester: 6,
      EMail: 'max.mustermann@example.com'
   });
   
   const peter = new student.Student({
      Vorname: 'Peter',
      Nachname: 'Mustermann',
      Matrikelnummer: 00000003,
      Studiengang: 'WI',
      Semester: 3,
      EMail: 'peter.mustermann@example.com'
   });

   saveStudent(rudolf);
   saveStudent(max);
   saveStudent(peter);
}

const initDatabase = (connectionString) => {
   mongoose.connect(connectionString);

   insertTestData();
};

module.exports = {
   initDatabase
};