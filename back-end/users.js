const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");

const router = express.Router();

const userSchema  = new mongoose.Schema({
  username: String, 
  password: String,
  role: {
    type: String,
    default: "",
  }
});

// This is a hook that will be called before a user record is saved,
// allowing us to be sure to salt and hash the password first.
userSchema.pre('save', async function(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password'))
    return next();

  try {
    // generate a hash. argon2 does the salting and hashing for us
    const hash = await argon2.hash(this.password);
    // override the plaintext password with the hashed one
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// This is a method that we can call on User objects to compare the hash of the
// password the browser sends with the has of the user's true password stored in
// the database.
userSchema.methods.comparePassword = async function(password) {
  try {
    // note that we supply the hash stored in the database (first argument) and
    // the plaintext password. argon2 will do the hashing and salting and
    // comparison for us.
    const isMatch = await argon2.verify(this.password, password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

// This is a method that will be called automatically any time we convert a user
// object to JSON. It deletes the password hash from the object. This ensures
// that we never send password hashes over our API, to avoid giving away
// anything to an attacker.
userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

// create a User model from the User schema
const User = mongoose.model('User', userSchema);

const validUser = async (req, res, next) => {
  if (!req.session.userID){
    return res.status(403).send({ message: "not logged in" });
  }
  try {
    const user  = await User.findOne({
      _id: req.session.userID
    });
    if (!user) {
      return res.status(403).send({ message: "not logged in" });
    }
    req.user = user;
  } catch (error) {
    return res.status(403).send({ message: "not logged in" });
  }

  next();
};

/* API Endpoints */

router.post("/", async (req, res) => {
  if (!req.body.username || !req.body.password){
    return res.status(400).send({ message: "username and password are required" });
  }

  try {
    const existingUser = await User.findOne({username: req.body.username})
    if (existingUser) {
      return res.status(403).send({ message: "username already exists" });
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    await user.save();
    req.session.userID = user._id;
    return res.send({user: user});
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password){
    return res.sendStatus(400);
  }
  try{
    const user = await User.findOne({username: req.body.username})
    if (!user) {
      return res.status(403).send({
        message: "username or password is incorrect"
      });
    }
    if (!await user.comparePassword(req.body.password)){
      return res.status(403).send({
        message: "username or password is incorrect"
      });
    }
    req.session.userID = user._id;
    return res.send({user: user});
  } catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/", validUser, async(req, res) => {
  try {
    res.send({
      user: req.user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/", validUser, async (req, res) => {
  try {
    req.session = null;
    res. sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: User,
  valid: validUser
}

