const Sauce = require('../models/Sauce');


exports.createSauce = (req, res, next) => {
  const newSauce = JSON.parse(req.body.sauce);
  delete newSauce._id;
  delete newSauce._userId;

  const sauce = new Sauce({
    ...newSauce,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  sauce.save()
    .then(() => res.status(201).json({
      message: 'objet enregistré'
    }))
    .catch(error => res.status(400).json({
      error
    }));
};


exports.modifySauce = (req, res, next) => {
  Sauce.updateOne({
      _id: req.params.id
    }, {
      ...req.body,
      _id: req.params.id
    })
    .then(() => res.status(200).json({
      message: 'Objet modifié !'
    }))
    .catch(error => res.status(400).json({
      error
    }));
}

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({
      _id: req.params.id
    })
    .then(() => res.status(200).json({
      message: 'Objet supprimé !'
    }))
    .catch(error => res.status(400).json({
      error
    }));
}


exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
      _id: req.params.id
    })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({
      error
    }));
}


exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({
      error
    }));
}
