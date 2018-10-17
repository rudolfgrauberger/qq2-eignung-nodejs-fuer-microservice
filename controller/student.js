const _ = require('lodash');

const db = require('../db/database.js');

const getStudents = (res) => {
   db.getAllStudents().then((students) => {
      const jsonBody = JSON.stringify({ students });
      res.setHeader('Content-Length', jsonBody.length);
      res.write(jsonBody);
      res.end();
   }, (e) => {
      res.statusCode = 500;
      const jsonBody = JSON.stringify(e);
      res.setHeader('Content-Length', jsonBody.length);
      res.write(jsonBody);
      res.end();
   });
};

const createStudent = (path, res, student) => {
   db.createNewStudent(student).then((newItem) => {
      res.statusCode = 201;
      const jsonBody = JSON.stringify(newItem);
      res.setHeader('Location', `${path}/${newItem.id}`);
      res.setHeader('Content-Length', jsonBody.length);
      res.write(jsonBody);
      res.end();
   }, (e) => {
      res.statusCode = 400;
      const jsonBody = JSON.stringify(e);
      res.setHeader('Content-Length', jsonBody.length);
      res.write(jsonBody);
      res.end();
   });
};

const getStudent = (res, param) => {
   db.getStudentByID(param.id).then((item) => {
      if (!item) {
         res.statusCode = 404;
         res.end();
      } else {
         const jsonBody = JSON.stringify(item);
         res.setHeader('Content-Length', jsonBody.length);
         res.write(jsonBody);
         res.end();
      }
   }, (e) => {
      res.statusCode = 400;
      const jsonBody = JSON.stringify(e);
      res.setHeader('Content-Length', jsonBody.length);
      res.write(jsonBody);
      res.end();
   });
};

const updateStudent = (res, params, body) => {
   const patchBody = _.pick(JSON.parse(body), ['first_name', 'last_name', 'matriculation_number', 'course', 'email']);

   db.updateById(params.id, patchBody, { new: true }).then(() => {
      res.statusCode = 204;
      res.end();
   }, (e) => {
      res.statusCode = 500;
      const jsonBody = JSON.stringify(e);
      res.setHeader('Content-Length', jsonBody.length);
      res.write(jsonBody);
      res.end();
   });
};

const deleteStudent = (res, param) => {
   db.deleteStudentByID(param.id).then((deletedItem) => {
      res.statusCode = 200;
      const jsonBody = JSON.stringify(deletedItem);
      res.setHeader('Content-Length', jsonBody.length);
      res.write(jsonBody);
      res.end();
   }, (e) => {
      res.statusCode = 500;
      const jsonBody = JSON.stringify(e);
      res.setHeader('Content-Length', jsonBody.length);
      res.write(jsonBody);
      res.end();
   });
};

module.exports = {
   getStudents,
   createStudent,
   getStudent,
   updateStudent,
   deleteStudent
};