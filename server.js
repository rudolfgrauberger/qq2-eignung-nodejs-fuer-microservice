const http = require('http');

const db = require('./db/database');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/QQ2Project';

db.initDatabase(connectionString);

// Nutzt den Port aus der Umgebungsvariable (für Heroku benötigt)
// alternativ/lokal den Port 3000.
const port = process.env.PORT || 3000;

http.createServer((req, res) => {
   res.write('Hello World!');
   res.end();
}).listen(port, () => console.log(`Server start at port ${port}`));