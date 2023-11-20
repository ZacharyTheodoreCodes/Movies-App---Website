import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreLoader from "../components/PreLoader";

import MovieForm from "../components/MovieForm";
import { useDispatch, useSelector } from "react-redux";
import { editMovie, fetchMovieDetails } from "../store/actions/actionCreator";
import toastOptions from "../store/constants/toastOption";

export default function EditMovie() {
  const { movie, movieLoading } = useSelector((state) => state.movie);
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetails(+id));
  }, []);

  if (movieLoading) {
    return <PreLoader />;
  }

  const EditMovie = async (form, cb) => {
    try {
      await dispatch(editMovie(id, form));
      cb();
      navigate("/");
      toast.success(`${form.title} has been edited`, toastOptions);
    } catch (error) {
      console.log(error);
      toast.error(error.message ? error.message : error, toastOptions);
    }
  };
  return (
    <>
      <MovieForm movie={movie} handleSubmit={EditMovie} />
    </>
  );
}
