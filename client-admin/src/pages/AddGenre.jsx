import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GenreForm from "../components/GenreForm";
import toastOptions from "../store/constants/toastOption";
import { addGenre } from "../store/actions/actionCreator";

export default function AddGenre() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddGenre = async (form) => {
    try {
      await dispatch(addGenre(form));
      navigate("/genres");
      toast.success(`Genre ${form.name} is added`, toastOptions);
    } catch (error) {
      console.log(error);
      toast.error(error.message ? error.message : error, toastOptions);
    }
  };

  return (
    <>
      <GenreForm handleSubmit={handleAddGenre} />
    </>
  );
}
