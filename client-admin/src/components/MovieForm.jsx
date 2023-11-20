import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import toastOptions from "../store/constants/toastOption";

import { RiArrowDropDownLine } from "react-icons/ri";
import { HiOutlinePlus } from "react-icons/hi";
import { FaXmark } from "react-icons/fa6";
import { fetchGenres } from "../store/actions/actionCreator";
import { AiFillDelete } from "react-icons/ai";

export default function MovieForm({ movie, handleSubmit }) {
  const { genres } = useSelector((state) => state.genre);
  const dispatch = useDispatch();

  const initialFormState = {
    title: movie?.title || "",
    synopsis: movie?.synopsis || "",
    trailerUrl: movie?.trailerUrl || "",
    imgUrl: movie?.imgUrl || "",
    rating: movie?.rating || "",
    genreId: movie?.genreId || null,
    Casts: movie?.Casts || [
      { name: "", profilePict: "" },
      { name: "", profilePict: "" },
      { name: "", profilePict: "" },
    ],
  };

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  const [form, setForm] = useState({ ...initialFormState });

  const onChange = (event) => {
    const { name, value } = event?.target || {};
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmitMovie = (event) => {
    event.preventDefault();
    handleSubmit(form, () => setForm(initialFormState));
  };

  const handleAddCast = () => {
    const newCast = { name: "", profilePict: "" };
    setForm({ ...form, Casts: [...form.Casts, newCast] });
  };

  const handleEditCast = (index, event) => {
    const castData = [...form.Casts];
    castData[index][event.target.name] = event.target.value;
    setForm({ ...form, Casts: castData });
  };

  const handleDeleteCast = (index) => {
    try {
      if (form?.Casts.length <= 3) throw { name: "Minimum cast is 3" };
      const castData = [...form.Casts];
      castData.splice(index, 1);
    } catch (error) {
      console.log(error);
      toast.error(error.name, toastOptions);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex justify-center items-center min-h-screen h-full w-full flex-col bg-[#2C2C2C] backdrop-blur bg-opacity-90 p-6">
      <div className="max-h-[98%] overflow-y-auto ">
        <form
          onSubmit={handleSubmitMovie}
          className=" mt-24 space-y-6 bg-[#080808] pt-10 pb-14 px-8 md:mt-0 md:max-w-md md:px-16 min-w-[600px] border-t-4 border-t-[#E61B1F]"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold">
              {movie ? "Edit" : "Add"}&nbsp;Movie
            </h1>
            <Link to="/" className="flex items-center justify-center">
              <FaXmark className="fa-solid fa-xmark text-[24px]" />
            </Link>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={onChange}
              placeholder="Movie Title"
              className="w-full rounded bg-[#080808] border-b-2 border-[#E61B1F] px-3 py-3 placeholder-[gray] outline-none focus:bg-[#3b3b3b]"
            />
          </div>

          {/* Synopsis */}
          <div className="space-y-4">
            <textarea
              id="synopsis"
              name="synopsis"
              value={form.synopsis}
              onChange={onChange}
              cols="30"
              rows="4"
              placeholder="Synopsis"
              className="w-full rounded bg-[#080808] border-b-2 border-[#E61B1F] px-3 py-3 placeholder-[gray] outline-none focus:bg-[#3b3b3b]"
            />
          </div>

          {/* Image Url */}
          <div className="space-y-4">
            <input
              type="text"
              id="imgUrl"
              name="imgUrl"
              value={form.imgUrl}
              onChange={onChange}
              placeholder="Image Url"
              className="w-full rounded bg-[#080808] border-b-2 border-[#E61B1F] px-3 py-3 placeholder-[gray] outline-none focus:bg-[#3b3b3b]"
            />
          </div>

          {/* Trailer */}
          <div className="space-y-4">
            <input
              type="text"
              id="trailerUrl"
              name="trailerUrl"
              value={form.trailerUrl}
              onChange={onChange}
              placeholder="Trailer Url"
              className="w-full rounded bg-[#080808] border-b-2 border-[#E61B1F] px-3 py-3 placeholder-[gray] outline-none focus:bg-[#3b3b3b]"
            />
          </div>

          {/* Rating */}
          <div className="space-y-4">
            <input
              type="number"
              id="rating"
              name="rating"
              value={form.rating}
              onChange={onChange}
              placeholder="Rating"
              className="w-full rounded bg-[#080808] border-b-2 border-[#E61B1F] px-3 py-3 placeholder-[gray] outline-none focus:bg-[#3b3b3b]"
            />
          </div>

          {/* Genre*/}
          <div className="space-y-4 relative">
            <select
              name="genreId"
              id="genreId"
              value={form?.genreId}
              onChange={onChange}
              className={`${
                form?.genreId ? "text-white" : "text-[#808080]"
              } w-full rounded bg-[#080808] border-b-2 border-[#E61B1F] px-3 py-3 placeholder-[gray] outline-none focus:bg-[#3b3b3b]`}
            >
              <option value="" selected disabled>
                Choose genre
              </option>
              {genres?.map((genre) => (
                <option value={genre?.id} key={genre?.id}>
                  {genre?.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-8 top-[-10px] flex items-center px-2 pointer-events-none">
              <span className="text-white select-custom-icon">
                <RiArrowDropDownLine className="absolute top-0 left-0 text-white text-[40px]" />
              </span>
            </div>
          </div>
          {/* Casts */}
          <div className="space-y-4 relative" id="cast">
            <label htmlFor="castName" className="inline-block w-full text-lg">
              Casts
            </label>
            {form.Casts.map((cast, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex-grow">
                  <input
                    type="text"
                    id="castName"
                    name="name"
                    value={cast?.name}
                    onChange={(event) => handleEditCast(idx, event)}
                    placeholder="Cast Name"
                    className="w-full rounded bg-[#080808]   px-2 py-2 placeholder-[gray] outline-none focus:bg-[#3b3b3b]"
                  />
                  <hr className="border border-[#E61B1F]" />
                  <input
                    type="text"
                    name="profilePict"
                    value={cast?.profilePict}
                    onChange={(event) => handleEditCast(idx, event)}
                    placeholder="Profile Picture URL"
                    className="w-full rounded bg-[#080808]  px-2 py-2 placeholder-[gray] outline-none focus:bg-[#3b3b3b]"
                  />
                </div>
                <button
                  className="h-full text-[22px] text-white hover:opacity-60 transition-all duration-100"
                  onClick={() => handleDeleteCast(idx)}
                  type="button"
                >
                  <AiFillDelete />
                </button>
              </div>
            ))}
          </div>

          {/* Add Cast Button */}
          <div className="space-y-4 relative" id="castsDiv">
            <button
              className="flex items-center justify-center gap-1 border-b border-[#080808] hover:border-b hover:border-white pb-1"
              type="button"
              onClick={handleAddCast}
            >
              <span>
                <HiOutlinePlus />
              </span>
              <span className="text-md">Add Cast</span>
            </button>
          </div>

          {/* Submit Button */}
          <button
            className="w-full rounded bg-[#E61B1F] py-3 font-semibold"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
