import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FaXmark } from "react-icons/fa6";

export default function GenreForm({ genre, handleSubmit }) {
  const initialFormState = {
    name: genre?.name || "",
  };

  const [form, setForm] = useState({ ...initialFormState });

  const onChange = (event) => {
    const { name, value } = event?.target || {};
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submitGenre = (event) => {
    event.preventDefault();
    handleSubmit(form);
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex justify-center items-center min-h-screen h-full w-full flex-col bg-[#2C2C2C] backdrop-blur bg-opacity-90 p-6 ">
      <div className="max-h-[98%] overflow-y-auto">
        <form
          onSubmit={submitGenre}
          className="border-t-4 border-t-[#E61B1F] mt-24 space-y-8 rounded bg-[#080808] pt-10 pb-14 px-6 md:mt-0 md:max-w-md md:px-14 min-w-[700px]"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold">
              {genre ? "Edit" : "Add"}&nbsp;Genre
            </h1>
            <Link to="/genres" className="flex items-center justify-center ">
              <FaXmark className="fa-solid fa-xmark text-[24px]" />
            </Link>
          </div>

          {/* Input */}
          <div className="space-y-4">
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Genre Name"
              className="w-full rounded bg-[#080808] border-b-2 border-[#E61B1F] px-3 py-3 placeholder-[gray] outline-none focus:bg-[#3b3b3b]"
            />
          </div>

          {/* submit */}
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
