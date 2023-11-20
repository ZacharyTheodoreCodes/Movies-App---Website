const authentication = require("../middlewares/authentication");
const Controller = require("../controllers/controller");
const MovieController = require("../controllers/movieController");
const GenreController = require("../controllers/genreController");

const express = require("express");

const pubRouter = require("./pubRouter");

const router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Hello World!");
});

//public
router.use("/pub", pubRouter);

//admin
router.post("/login", Controller.login);
router.use(authentication);

router.get("/movies", MovieController.getMovies);
router.get("/movies/:id", MovieController.getMovieDetails);
router.post("/movies", MovieController.addMovie);
router.put("/movies/:id", MovieController.editMovie);
router.delete("/movies/:id", MovieController.deleteMovie);

router.get("/genres", GenreController.getGenres);
router.get("/genres/:id", GenreController.getGenreDetails);
router.post("/genres", GenreController.addGenre);
router.put("/genres/:id", GenreController.editGenre);
router.delete("/genres/:id", GenreController.deleteGenre);

router.post("/add-admin", Controller.addAmin);

module.exports = router;
