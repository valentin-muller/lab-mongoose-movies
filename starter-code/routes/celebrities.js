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

// ------------------------------------------------

celebritiesRouter.get("/new", (req, res, next) => {
    res.render("celebrities/new")
});
celebritiesRouter.post("/new", (req, res) => {
const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase })
      .then(() => {
        res.redirect("/celebrities")
    }).catch((err) => {
        console.log(err)
    });

    
})
// ------------------------------------------------


celebritiesRouter.get("/:id", (req, res, next) => {
    Celebrity.findById(req.params.id)
    .then((celebId) => {
        const data = {
            celeb: celebId
        };
        res.render("celebrities/show", data)
    }).catch((err) => {
        console.log(err);
    });
});

celebritiesRouter.post("/:id/delete", (req, res, next) => {
    Celebrity.findByIdAndRemove(req.params.id)
         .then(() => {
            res.redirect("/celebrities")
        }).catch((err) => {
            console.log(err);
            
        });
})

// ------------------------------------------------

celebritiesRouter.get("/:id/edit", (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then((celebrityEdit) => {
            const data={
                editedCeleb :celebrityEdit
            }
            res.render("/celebrities/edit",data)
        })
        .catch((err) => {
            console.log(err);
        }); 
});


celebritiesRouter.post("/:id", (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.update(req.params.id, {name, occupation, catchPhrase})
        .then(() => {
            res.redirect("/celebrities")
        }).catch((err) => {
            console.log(err);
        });
})

// ------------------------------------------------


module.exports = celebritiesRouter;