# Test der Eignung von JavaScript inkl. NodeJS für Microservices
In diesem Projekt wird die Sprache JavaScript mit dem Framework NodeJS im Rahmen des QQ2-Projekts [Eignung von Programmiersprachen und Frameworks für Microservices](https://blogs.gm.fh-koeln.de/bente/2018/09/24/qq2-projekt-eignung-von-programmiersprachen-und-frameworks-fuer-microservices/) getestet.

Dafür werden die nachfolgenden Aufgaben erledigt:
- 1. Einrichtung (Entwicklungsumgebung, Datenbank-System)
- 2. Datenbank-Anbindung (Objekt Student mit den Attributen (Vorname, Nachname, Matrikelnummer, Studiengang, Semester und E-Mail wenn möglich mit ORM)
- 3. REST Schnittstelle (Anlegen/Ändern/Löschen eines neuen Studenten, Ausgeben einer Liste aller Studenten, Ausgeben eines Studenten)
- 4. Logging (Jede CRUD-Operation über bereitgestellten Apache Kafka (Publish-Subscribe) protokollieren)

## REST-API

| URI  | HTTP-Verb | Request-Body | Beschreibung |
| ------------- | ------------- | ------------- | ------------- |
| /students  | GET  |   | Anzeigen aller Studenten |
| /students/{id}  | GET  |    | Anzeigen eines Studenten |
| /students | POST | ```{first_name: <string>, last_name: <string>, matriculation_number <integer>, course: <string>, email: <string>}``` | Anlegen eines neuen Studenten |
| /students/{id} | PATCH | ```{attribute: <new_value>}``` | Ändern eines Studenten |
| /students/{id} | DELETE | | Löschen eines Studenten |

**Hinweis:** Bei allen anderen Routen wird 404 zurückgeliefert!

## Online
Damit das Projekt nicht erst heruntergeladen werden muss, wird der Stand vom ```master```-Branch auf Heroku unter [https://qq2-nodejs.herokuapp.com/](https://qq2-nodejs.herokuapp.com/) gehostet.

Zum Testen bitte die oben in der Tabelle angegebenen Routen aufrufen z. B. [https://qq2-nodejs.herokuapp.com/students](https://qq2-nodejs.herokuapp.com/students) führt ein GET aus und lädt damit alle Studenten.

## Lokal
### Voraussetzung
Um das Projekt auszuführen müssen folgende Programme auf dem System installiert sein:
- [Git](https://git-scm.com)
- [NodeJS](https://nodejs.org)

### Download

Am einfachsten ist es, dass Projekt mit dem nachfolgenden Befehl herunterzuladen:

```sh
> git clone https://github.com/rudolfgrauberger/qq2-eignung-nodejs-fuer-microservice.git
```

### Einrichtung
Mit den nachfolgenden Befehlen wechselt man in das gerade ausgecheckte Verzeichnis und installiert alle benötige Pakete.

```sh
> cd qq2-eignung-nodejs-fuer-microservice
> npm install
```

### Ausführen
Das geht am einfachsten mit dem Befehl:

```sh
> npm start
```

Danach erreich man im Browser unter http://localhost:8080/students die Route für die REST-API.
