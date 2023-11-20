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
    <form className=" text-gray-600 flex gap-[10px]" onSubmit={handleSearch}>
      <input
        className="border-2 border-white bg-black h-full px-3 pr-16 rounded-md text-sm text-white focus:outline-none min-w-[400px]"
        type="search"
        name="search"
        value={form.search}
        onChange={onChange}
        placeholder="Search by title"
      />
      <button
        type="submit"
        className="px-3 rounded-md hover:opacity-80 transition-all duration-100"
      >
        <FaMagnifyingGlass className="fa-solid fa-magnifying-glass text-white" />
      </button>
    </form>
  );
}
