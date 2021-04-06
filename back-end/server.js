const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer')

const app = express();

// Configure multer so that it will upload to '../front-end/public/images'
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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

app.post('/api/themes', async (req, res) => {
  const theme = new Theme({
    name: req.body.name,
    description: req.body.description,
    color: req.body.color
  });
  try{
    await theme.save();
    res.send(theme);
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

app.put('api/themes/:themeID', async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('api/themes/:themeID', async (req, res) => {
  try {
    let theme = await Theme.findOne({_id:req.params.themeID});
    if (!theme) {
      res.send(404);
      return;
    }
    await theme.delete();
    res.sendStatus(200);
  } catch (error) {
    console.lo(error);
    res.sendStatus(500);
  }
});

app.post('api/themes/:themeID/creations', async (req, res) => {
  try {
    let theme = await Theme.findOne({_id: req.params.themeID});
    if (!project){
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

app.put('/api/themes/:themeID/creations/:creationID', async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/themes/:themeID/creations/:creationID', async (req, res) => {
  try {
    let creation = await Creation.findOne({_id: req.params.creationID});
    if (!creation) {
      res.send(404);
      return;
    }
    await creation.delete();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
