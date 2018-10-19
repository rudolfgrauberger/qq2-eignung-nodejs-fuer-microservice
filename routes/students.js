const router = require('routes')();

const studentController = require('../controller/student.js');
const kafkalogger = require('../messaging/kafka.js');

router.addRoute('/students', (req, res, params) => {
   if (req.method !== 'GET' && req.method !== 'POST') {
      res.statusCode = 405;
      res.end();
      return;
   }

   res.statusCode = 200;
   res.setHeader('Content-Type', 'application/json');

   if (req.method === 'GET') {
      kafkalogger.logToKafka(req, params);
      studentController.getStudents(res);
   } else if (req.method === 'POST') {
      kafkalogger.logToKafka(req, params);
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
      kafkalogger.logToKafka(req, params);
   } else if (req.method === 'PATCH') {
      kafkalogger.logToKafka(req, params);
      let body = '';
      req.on('data', (chunk) => {
         body += chunk.toString();
      });
      req.on('end', () => {
         studentController.updateStudent(res, params, body);
      });
   } else if (req.method === 'DELETE') {
      kafkalogger.logToKafka(req, params);
      studentController.deleteStudent(res, params);
   }
});

const getStudentRoutes = () => router;

module.exports = {
   getStudentRoutes
};