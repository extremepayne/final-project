const reader = require("readline-sync");
const mongoose = require('mongoose');
const users = require("./users.js");

const User = users.model;

mongoose.connect('mongodb://localhost:27017/final-project', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

let username = reader.question("Username: ");
const password = reader.question("Password: ", {
  hideEchoBack: true
});

if (username === "" || password === "") {
  console.log("You need to enter a username and a password");
  process.exit();
}
User.findOne({
  username: username
}).then((user) => {
  if (user) {
    console.log("That username already exists");
    process.exit();
  }
}).then(() => {
  let user = new User({
    username: username,
    password: password,
    role: "admin"
  });
  user.save().then(() => {
    console.log("OK, admin user created with username", username);
    process.exit();
  });
}).catch(error => {
  console.log(error);
});
