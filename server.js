const http = require('http');
const db = require('./db/database.js');
const routes = require('./routes/students.js');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/QQ2Project';

db.initDatabase(connectionString);

// Nutzt den Port aus der Umgebungsvariable (für Heroku benötigt)
// alternativ/lokal den Port 8080.
const port = process.env.PORT || 8080;

const router = routes.getStudentRoutes();

http.createServer((req, res) => {
   const m = router.match(req.url);
   if (m) {
      m.fn(req, res, m.params);
   } else {
      res.statusCode = 404;
      res.end();
   }
}).listen(port, () => console.log(`Server start at port ${port}`));