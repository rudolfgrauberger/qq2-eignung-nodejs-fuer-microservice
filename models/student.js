const mongoose = require('mongoose');

// Definiert den Aufbau des Objekts
const StudentSchema = new mongoose.Schema({
   first_name: {
      type: String
   },
   last_name: {
      type: String
   },
   matriculation_number: {
      type: Number
   },
   course: {
      type: String
   },
   semester: {
      type: Number
   },
   email: {
      type: String
   }
});

// Das muss ausgeführt werden, damit ein Constructor für Student zur Verfügung steht
const Student = mongoose.model('Student', StudentSchema);

module.exports = {
   Student
};