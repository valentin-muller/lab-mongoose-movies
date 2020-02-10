const express = require('express');
const router  = express.Router();

const celebrityRouter = require("./../routes/celebrities");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.use("/celebrities", celebrityRouter);


module.exports = router;
