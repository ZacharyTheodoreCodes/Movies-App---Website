import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import toastOptions from "../store/constants/toastOption";
import "react-toastify/dist/ReactToastify.css";

import GenreForm from "../components/GenreForm";
import PreLoader from "../components/PreLoader";
import { editGenre, fetchGenreDetails } from "../store/actions/actionCreator";

export default function EditGenre() {
  const { genre, genreLoading } = useSelector((state) => state.genre);
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenreDetails(+id));
  }, []);

  const handleEditGenre = async (form) => {
    try {
      await dispatch(editGenre(+id, form));
      navigate("/genres");
      toast.success(`Genre has been edited to ${form.name}`, toastOptions);
    } catch (error) {
      console.log(error);
      toast.error(error.message ? error.message : error, toastOptions);
    }
  };

  if (genreLoading) {
    return <PreLoader />;
  }

  return (
    <>
      <GenreForm genre={genre} handleSubmit={handleEditGenre} />
    </>
  );
}
