const Client = require("pg").Client;
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5434,
  password: "12345678",
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
