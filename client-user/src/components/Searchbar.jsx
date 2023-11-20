import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Searchbar({ onSearch }) {
  const [form, setForm] = useState({
    search: "",
  });

  const onChange = (event) => {
    const { name, value } = event?.target || {};
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(form.search);
  };

  return (
    <form
      className="px-6 sm:px-0 pt-2 text-gray-600 mt-[20px] mb-[20px] flex justify-center gap-[10px] max-w-full w-full"
      onSubmit={handleSearch}
    >
      <input
        className="border-2 bg-black h-10 px-3 pr-16 rounded-lg text-lg text-white focus:outline-none w-full sm:w-[500px]"
        type="search"
        name="search"
        value={form.search}
        onChange={onChange}
        placeholder="Search"
      />
      <button
        type="submit"
        className=" px-3 h-10 w-14 rounded-lg hover:opacity-80 flex items-center justify-center"
      >
        <FaMagnifyingGlass className="fa-solid fa-magnifying-glass text-white text-lg" />
      </button>
    </form>
  );
}
