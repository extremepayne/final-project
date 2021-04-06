const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

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

const Theme = mongoose.model('Theme', themeSchema);

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

app.listen(3000, () => console.log('Server listening on port 3000!'));
