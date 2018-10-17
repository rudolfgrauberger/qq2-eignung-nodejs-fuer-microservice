const router = require('routes')();

const studentController = require('../controller/student.js');

router.addRoute('/students', (req, res, params) => {
   if (req.method !== 'GET' && req.method !== 'POST') {
      res.statusCode = 405;
      res.end();
      return;
   }

   res.statusCode = 200;
   res.setHeader('Content-Type', 'application/json');

   if (req.method === 'GET') {
      studentController.getStudents(res);
   } else if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
         body += chunk.toString();
      });
      req.on('end', () => {
         studentController.createStudent(req.url, res, JSON.parse(body));
      });
   }
});

router.addRoute('/students/:id', (req, res, params) => {
   if (req.method !== 'GET' && req.method !== 'PATCH' && req.method !== 'DELETE') {
      res.statusCode = 405;
      res.end();
      return;
   }

   res.statusCode = 200;
   res.setHeader('Content-Type', 'application/json');

   if (req.method === 'GET') {
      studentController.getStudent(res, params);
   } else if (req.method === 'PATCH') {
      let body = '';
      req.on('data', (chunk) => {
         body += chunk.toString();
      });
      req.on('end', () => {
         studentController.updateStudent(res, params, body);
      });
   } else if (req.method === 'DELETE') {
      studentController.deleteStudent(res, params);
   }
});

const getStudentRoutes = () => router;

module.exports = {
   getStudentRoutes
};