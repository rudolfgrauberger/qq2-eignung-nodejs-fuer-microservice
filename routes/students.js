const router = require('routes')();

const studentController = require('../controller/student.js');
const kafkalogger = require('../messaging/kafka.js');

router.addRoute('/students', (req, res, params) => {
   if (req.method !== 'GET' && req.method !== 'POST') {
      res.statusCode = 405;
      res.end();
      kafkalogger.logToKafka(req, res, params);
      return;
   }

   res.statusCode = 200;
   res.setHeader('Content-Type', 'application/json');

   if (req.method === 'GET') {
      studentController.getStudents(res);
      kafkalogger.logToKafka(req, res, params);
   } else if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
         body += chunk.toString();
      });
      req.on('end', () => {
         studentController.createStudent(req.url, res, JSON.parse(body));
         kafkalogger.logToKafka(req, res, params);
      });
   }
});

router.addRoute('/students/:id', (req, res, params) => {
   if (req.method !== 'GET' && req.method !== 'PATCH' && req.method !== 'DELETE') {
      res.statusCode = 405;
      res.end();
      kafkalogger.logToKafka(req, res, params);
      return;
   }

   res.statusCode = 200;
   res.setHeader('Content-Type', 'application/json');

   if (req.method === 'GET') {
      studentController.getStudent(res, params);
      kafkalogger.logToKafka(req, res, params);
   } else if (req.method === 'PATCH') {
      let body = '';
      req.on('data', (chunk) => {
         body += chunk.toString();
      });
      req.on('end', () => {
         studentController.updateStudent(res, params, body);
         kafkalogger.logToKafka(req, res, params);
      });
   } else if (req.method === 'DELETE') {
      studentController.deleteStudent(res, params);
      kafkalogger.logToKafka(req, res, params);
   }
});

const getStudentRoutes = () => router;

module.exports = {
   getStudentRoutes
};