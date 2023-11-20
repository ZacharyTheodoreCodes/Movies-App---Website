import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaPlus } from "react-icons/fa6";
import Table from "../components/Table";
import Swal from "sweetalert2";
import toastOptions from "../store/constants/toastOption";

import PreLoader from "../components/PreLoader";
import { deleteGenre, fetchGenres } from "../store/actions/actionCreator";

import Searchbar from "../components/Searchbar";

export default function GenresPage() {
  const genreColumns = ["No", "Genre", "Created At", "Updated At", "Action"];
  const { genres, genresLoading } = useSelector((state) => state.genre);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  const handleDeleteGenre = (genreId, genreName) => {
    Swal.fire({
      title: "<h2>Are you sure?</h2>",
      icon: "warning",
      html: "This genre will be deleted",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "<span>Yes</span>",
      confirmButtonColor: "#007EFF",
      cancelButtonText: "<span>Cancel</span>",
      cancelButtonColor: "#FF5564",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteGenre(+genreId));
        toast.success(`'${genreName}' has been deleted`, toastOptions);
      }
    });
  };

  const handleSearch = (query) => {
    dispatch(fetchGenres(query));
  };

  if (genresLoading) {
    return <PreLoader />;
  }

  return (
    <>
      <div className="py-[60px] sm:ml-64 px-[80px]">
        <div className="flex justify-between items-center">
          <div className="flex gap-10">
            <h1 className="font-semibold text-4xl">Genre List</h1>
            <Searchbar onSearch={handleSearch} className="w-32" />
          </div>
          <Link
            to="/genres/add"
            className="bg-[#E61B1F] rounded inline-flex items-center hover:opacity-80 transition-all duration-100 text-white py-2 px-4 text-md font-semibold"
          >
            <FaPlus />
            &nbsp;<span>Add Genre</span>
          </Link>
        </div>
        <Table
          label={{ name: "genres" }}
          data={genres}
          columns={genreColumns}
          deleteData={handleDeleteGenre}
        />
      </div>

      <Outlet />
    </>
  );
}
