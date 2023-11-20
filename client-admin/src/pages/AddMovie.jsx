import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import toastOptions from "../store/constants/toastOption";
import MovieForm from "../components/MovieForm";
import { addMovie } from "../store/actions/actionCreator";

export default function AddGenre() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const AddMovie = async (form, cb) => {
    try {
      await dispatch(addMovie(form));
      cb();
      navigate("/");
      toast.success(`${form.title} has been added`, toastOptions);
    } catch (error) {
      console.log(error);
      toast.error(error.message ? error.message : error, toastOptions);
    }
  };

  return (
    <>
      <MovieForm handleSubmit={AddMovie} />
    </>
  );
}
