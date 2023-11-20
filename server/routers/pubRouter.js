const PubController = require("../controllers/pubController");
const express = require("express");

const router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Hello public world");
});

router.get("/movies", PubController.getMovies);
router.get("/movies/:slug", PubController.getMovieDetails);

module.exports = router;
