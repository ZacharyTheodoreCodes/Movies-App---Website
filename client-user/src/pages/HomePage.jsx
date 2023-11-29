import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import CardContainer from "../components/CardContainer";
import PreLoader from "../components/PreLoader";
import { fetchMovies } from "../store/actions/actionCreator";
import bgImg from "../assets/images/background.jpg";

export default function HomePage() {
  const { movies, moviesLoading } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  const handleSearch = (query) => {
    dispatch(fetchMovies(query));
  };

  if (moviesLoading) {
    return <PreLoader />;
  }

  return (
    <>
      <div
        className=" w-full text-center min-h-screen "
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgImg}) center/cover no-repeat`,
        }}
      >
        <Header onSearch={handleSearch} />

        <CardContainer data={movies} />
      </div>
    </>
  );
}
