import { FaPlay, FaStar } from "react-icons/fa6";
import { BsBackspace } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BsPersonBadge } from "react-icons/bs";
import { BiInfoCircle } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import PreLoader from "../components/PreLoader";

import formatEmbedURL from "../helpers/formatEmbedURL";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../store/actions/actionCreator";

import bgImg from "../assets/images/background.jpg";

export default function MovieDetail() {
  const [showTrailer, setShowTrailer] = useState(false);
  const { movie, movieLoading } = useSelector((state) => state.movie);
  const { slug } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetails(slug));
  }, []);

  if (movieLoading) {
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
        <div className="relative space-y-8 rounded-lg bg-[#080808] text-white py-10 px-6 mx-32 md:px-10 border border-white">
          {/* Header */}
          <div className="flex justify-end">
            <Link to="/" className="flex items-center justify-center">
              <BsBackspace className="text-[24px]" />
            </Link>
          </div>

          {/* Detail */}
          <div className="grid grid-cols-3 gap-4 ">
            <div className="w-[300px] mx-auto">
              <img src={movie.imgUrl} alt="" className="w-full rounded-lg" />
            </div>

            <div className="col-span-2  font-semibold">
              <div className="flex items-end gap-12 ">
                <h1 className="text-3xl font-semibold">{movie.title}</h1>
                <div className="flex gap-2">
                  <span className="font-normal text-2xl">
                    {movie.rating}/10
                  </span>
                  <div className="flex items-center justify-center">
                    <FaStar className="text-yellow-300 text-2xl" />
                  </div>
                </div>
              </div>

              {/* Genre & Rating & Author */}
              <div className="flex items-center gap-[30px] mt-3 mb-[20px] pb-2 border-b-4 border-[#E61B1F] text-[gray]">
                <div className="flex gap-2">
                  <span>Genre:</span>
                  <span className="font-normal">
                    {movie.Genre?.name || "Unknown"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <span>Created By:</span>
                  <span className="font-normal">
                    {movie.User?.username || "Unknown"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    className="flex items-center gap-2  hover:bg-[#E61B1F]  px-4 py-1 rounded mt-0.5"
                    onClick={() => setShowTrailer(!showTrailer)}
                  >
                    <span>{showTrailer ? "Movie Info" : "Trailer"}</span>
                    {showTrailer ? <BiInfoCircle /> : <FaPlay />}
                  </button>
                </div>
              </div>

              {/* Trailer*/}
              {showTrailer ? (
                <div className="mt-3 mb-[40px]">
                  <div className="w-fit mb-[20px]">
                    <h3 className="text-xl font-semibold">Trailer</h3>
                  </div>

                  <div className="w-[500px] h-[300px]">
                    <iframe
                      className="w-full h-full"
                      src={formatEmbedURL(movie.trailerUrl)}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-10">
                    {/* SYNOPSIS */}

                    <div className="space-y-4 col-span-2 text-start  ">
                      <h3 className="text-xl">Synopsis</h3>
                      <p className="font-normal ">{movie.synopsis}</p>
                    </div>

                    {/* CASTS  */}
                    <div className="space-y-4">
                      <div className="w-fit ">
                        <h3 className="text-xl">Casts</h3>
                      </div>

                      <div className=" text-center space-y-2">
                        {movie?.Casts?.map((cast) => (
                          <div
                            className="flex flex-row gap-2 items-center justify-start"
                            key={cast.id}
                          >
                            <div className="w-[60px] h-[60px] flex items-center justify-start">
                              {cast.profilePict ? (
                                <img
                                  src={cast.profilePict}
                                  alt={`${cast.name} profile picture`}
                                  className="max-w-full max-h-full rounded-full"
                                />
                              ) : (
                                <div className="w-[60px] h-[60px] flex items-center justify-center rounded-xl bg-gray-300">
                                  <BsPersonBadge className="h-6 w-6 text-gray-600" />
                                </div>
                              )}
                            </div>

                            <span>{cast.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
