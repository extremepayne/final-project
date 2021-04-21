const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer')

const app = express();

// Configure multer so that it will upload to '../front-end/public/images'
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 100000000
  }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/final-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require("cookie-session");
app.use(cookieSession({
  name: "session",
  keys: ["secretValue"],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));


const themeSchema = new mongoose.Schema({
  name: String,
  description: String,
  color: String
});

const creationSchema = new mongoose.Schema({
  name: String,
  description: String,
  photos: Array,
  instagramLink: String,
  theme: {
    type: mongoose.Schema.ObjectId,
    ref: 'Theme'
  }
});

const Theme = mongoose.model('Theme', themeSchema);
const Creation = mongoose.model('Creation', creationSchema);

const users = require("./users.js");
app.use("/api/users", users.routes);
const validUser = users.valid;

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/themes', validUser, async (req, res) => {
  const theme = new Theme({
    name: req.body.name,
    description: req.body.description,
    color: req.body.color
  });
  try{
    if (req.user.role === "admin") {
      await theme.save();
      res.send(theme);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/themes', async (req, res) => {
  try {
    let themes = await Theme.find();
    res.send(themes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/themes/:themeID', validUser, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      let theme = await Theme.findOne({_id:req.params.themeID});
      if (!theme) {
        res.send(404);
        return;
      }
      theme.name = req.body.name;
      theme.description = req.body.description;
      theme.color = req.body.color;
      await theme.save();
      res.send(theme);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/themes/:themeID', validUser, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      let theme = await Theme.findOne({_id:req.params.themeID});
      if (!theme) {
        res.send(404);
        return;
      }
      await theme.delete();
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.lo(error);
    res.sendStatus(500);
  }
});

app.post('/api/themes/:themeID/creations', validUser, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      let theme = await Theme.findOne({_id: req.params.themeID});
      if (!theme){
        res.sendStatus(404);
        return;
      }
      let creation = new Creation({
        theme: theme,
        name: req.body.name,
        description: req.body.description,
        photos: req.body.photos,
        instagramLink: req.body.instagramLink
      });
      await creation.save();
      res.send(creation);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/themes/:themeID/creations', async (req, res) => {
  try {
    let theme = await Theme.findOne({_id: req.params.themeID});
    if (!theme) {
      res.send(404);
      return;
    }
    let creations = await Creation.find({theme: theme});
    res.send(creations);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
});

app.get('/api/creations', async (req, res) => {
  try {
    let creations = await Creation.find();
    res.send(creations);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
});

app.put('/api/themes/:themeID/creations/:creationID', validUser, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      let creation = await Creation.findOne({_id: req.params.creationID});
      if (!creation) {
        res.send(404);
        return;
      }
      creation.name = req.body.name;
      creation.description = req.body.description;
      creation.instagramLink = req.body.instagramLink;
      await creation.save();
      res.send(creation);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/themes/:themeID/creations/:creationID', validUser, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      let creation = await Creation.findOne({_id: req.params.creationID});
      if (!creation) {
        res.send(404);
        return;
      }
      await creation.delete();
      res.sendStatus(200);

    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
