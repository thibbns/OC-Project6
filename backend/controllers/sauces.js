const Sauce = require('../models/Sauce');


exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);

  delete sauceObject._id;
  delete sauceObject._userId;

  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });



  sauce.save()
    .then(() => res.status(201).json({
      message: 'Sauce enregistrée'
    }))
    .catch(
      (error) => {
        console.log(error)
        res.status(404).json({
          error: error
        });
      }
    );
};


exports.modifySauce = (req, res, next) => {
  Sauce.updateOne({
      _id: req.params.id
    }, {
      ...req.body,
      _id: req.params.id
    })
    .then(() => res.status(200).json({
      message: 'Sauce modifiée !'
    }))
    .catch(error => res.status(400).json({
      error
    }));
}


exports.like = (req, res, next) => {

  let userId = req.body.userId;
  let like = req.body.like

  switch (like) {
    case 1:
      Sauce.updateOne({
          _id: req.params.id
        }, {
          $push: {
            usersLiked: userId
          },
          $inc: {
            likes: 1
          }
        })
        .then(() => res.status(201).json({
          message: "like ajouté"
        }))
        .catch((error) => res.status(400).json({
          error
        }))
      break;

    case 0:
      Sauce.findOne({
          _id: req.params.id
        })
        .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne({
                _id: req.params.id
              }, {
                $pull: {
                  usersLiked: userId
                },
                $inc: {
                  likes: -1
                }
              })
              .then(() => res.status(201).json({
                message: "like supprimé"
              }))
              .catch((error) => res.status(400).json({
                error
              }))
          } else {
            (sauce.usersDisliked.includes(userId))
            Sauce.updateOne({
                _id: req.params.id
              }, {
                $pull: {
                  usersDisLiked: userId
                },
                $inc: {
                  dislikes: -1
                }
              })
              .then(() => res.status(201).json({
                message: "dislike supprimé"
              }))
              .catch((error) => res.status(400).json({
                error
              }))
          }
        })
        .catch((error) => res.status(400).json({
          error
        }))
      break;

    case -1:
      Sauce.updateOne({
          _id: req.params.id
        }, {
          $push: {
            usersDisliked: userId
          },
          $inc: {
            dislikes: 1
          }
        })
        .then(() => res.status(201).json({
          message: "dislike ajouté"
        }))
        .catch((error) => res.status(400).json({
          error
        }))
      break;


    default:
      console.log("erreur")
  };


}




exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({
      _id: req.params.id
    })
    .then(() => res.status(200).json({
      message: 'Sauce supprimée !'
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
