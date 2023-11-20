import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaPlus } from "react-icons/fa6";
import Table from "../components/Table";
import Swal from "sweetalert2";

import PreLoader from "../components/PreLoader";
import { deleteMovie, fetchMovies } from "../store/actions/actionCreator";

import toastOptions from "../store/constants/toastOption";

import Searchbar from "../components/Searchbar";

export default function MoviesPage() {
  const movieColumns = [
    "No",
    "Movie Title",
    "Genre",
    "Rating",
    "Created By",
    "Details",
    "Action",
  ];
  const { movies, moviesLoading } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  const handleDeleteMovie = (movieId, movieTitle) => {
    Swal.fire({
      title: "<h2>Are you sure?</h2>",
      icon: "warning",
      html: "This movie will be deleted",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "<span>Yes</span>",
      confirmButtonColor: "#007EFF",
      cancelButtonText: "<span>Cancel</span>",
      cancelButtonColor: "#FF5564",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMovie(+movieId));
        toast.success(`'${movieTitle}' has been deleted`, toastOptions);
      }
    });
  };

  const handleSearch = (query) => {
    dispatch(fetchMovies(query));
  };

  if (moviesLoading) {
    return <PreLoader />;
  }
  return (
    <>
      <div className="py-[60px] sm:ml-64 px-[80px]">
        <div className="flex justify-between items-center">
          <div className="flex gap-10">
            <h1 className="font-semibold text-4xl">Movie List</h1>
            <Searchbar onSearch={handleSearch} className="w-32" />
          </div>
          <Link
            to="/movies/add"
            className="bg-[#E61B1F] rounded inline-flex items-center hover:opacity-80 transition-all duration-100 text-white py-2 px-4 text-md font-semibold"
          >
            <FaPlus />
            &nbsp;<span>Add Movie</span>
          </Link>
        </div>
        <Table
          label={{ name: "movies" }}
          data={movies}
          columns={movieColumns}
          deleteData={handleDeleteMovie}
        />
      </div>

      <Outlet />
    </>
  );
}
