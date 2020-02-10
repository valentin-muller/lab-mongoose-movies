var express = require("express");
var celebritiesRouter = express.Router();

const Celebrity = require("./../models/Celebrity");

celebritiesRouter.get("/", (req, res) => {
  Celebrity.find()
    .then(allCelebrities => {
      const data = {
        celebrities: {...allCelebrities}
      };
      console.log(data);
      res.render("celebrities/index", data);
    })
    .catch(err => console.log(err));
});

celebritiesRouter.get("/celebrities/:id", (req, res, next) => {
    const { _id } = req.query;

    Celebrity.findOne({_id: _id})
        .then(oneCeleb => {
            const data = {
                celeb: oneCeleb
            };
            res.render("views/show", data)
        })
        .catch(err => console.log(err));
});

module.exports = celebritiesRouter;