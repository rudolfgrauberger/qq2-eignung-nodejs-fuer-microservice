const mongoose = require('mongoose');

// Definiert den Aufbau des Objekts
const StudentSchema = new mongoose.Schema({
   Vorname: {
      type: String
   },
   Nachname: {
      type: String
   },
   Matrikelnummer: {
      type: Number
   },
   Studiengang: {
      type: String
   },
   Semester: {
      type: Number
   },
   EMail: {
      type: String
   }
});

// Das muss ausgeführt werden, damit ein Constructor für Student zur Verfügung steht
const Student = mongoose.model('Student', StudentSchema);

module.exports = {
   Student
};