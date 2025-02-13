const Client = require("pg").Client;
const client = new Client({
  host: "localhost",
  user: "postgres",
<<<<<<< HEAD
  port: 5432,
  password: "moorthivijiya",
=======
  port: 5434,
  password: "12345678",
>>>>>>> 796802117feb579f5ddfeec41078bf0da29153fd
  database: "superlabs_career",
});

client.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to database");
  }
});

module.exports = client;
