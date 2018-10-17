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
      first_name: 'Rudolf',
      last_name: 'Grauberger',
      matriculation_number: 00000001,
      course: 'INF',
      semester: 5,
      email: 'rudolf.grauberger@example.com'
   });
   
   const max = new student.Student({
      first_name: 'Max',
      last_name: 'Mustermann',
      matriculation_number: 00000002,
      course: 'MI',
      semester: 6,
      email: 'max.mustermann@example.com'
   });
   
   const peter = new student.Student({
      first_name: 'Peter',
      last_name: 'Mustermann',
      matriculation_number: 00000003,
      course: 'WI',
      semester: 3,
      email: 'peter.mustermann@example.com'
   });

   saveStudent(rudolf);
   saveStudent(max);
   saveStudent(peter);
}

const initDatabase = (connectionString) => {
   mongoose.connect(connectionString);

   insertTestData();
};

const getAllStudents = () => {
   return student.Student.find();
};

const createNewStudent = (newItem) => {
   return new student.Student({
      first_name: newItem.first_name,
      last_name: newItem.last_name,
      matriculation_number: newItem.matriculation_number,
      course: newItem.course,
      semster: newItem.semster,
      email: newItem.email
   }).save();
};

const getStudentByID = (id) => {
   return student.Student.findById(id);
};

const deleteStudentByID = (id) => {
   return student.Student.findByIdAndDelete(id);
};

const updateById = (id, data, properties) => {
   return student.Student.findByIdAndUpdate(id, {$set: data}, properties);
};

module.exports = {
   initDatabase,
   getAllStudents,
   createNewStudent,
   getStudentByID,
   deleteStudentByID,
   updateById
};