const express = require('express');
const mongoose = require('mongoose');

const Thing = require('./models/Thing');

const userRoutes = require('./routes/user');

const app = express();
mongoose.connect('mongodb+srv://Tb:R5ki8pWpKj8rS-a-@cluster0.4pijbyd.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));




app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.post('/api/sauces', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).jsonj({
      message: 'objet enregistré'
    }))
    .catch(error => res.status(400).json({
      error
    }));
});

app.get('/api/sauces', (req, res, next) => {
Thing.find()
.then(things => res.status(200).json(things))
.catch(error => res.status(400).json({error}));
});



app.use('/api/auth', userRoutes);


module.exports = app;
