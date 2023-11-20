import { Link } from "react-router-dom";
import { BiExpandAlt } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";

export default function Card({ item }) {
  return (
    <Link
      to={`/movies/${item?.slug}`}
      className="relative rounded-lg overflow-hidden shadow-md mb-2 cursor-pointer hover:opacity-60 transition-all duration-100"
    >
      <img src={item?.imgUrl} alt="item?.title" className="w-full h-[400px]" />
      {/* 
      <div className="absolute mb-[60px] inset-0 flex items-center justify-center opacity-0 transition-all duration-500 hover:opacity-100 hover:text-[80px]">
        <BiExpandAlt className="text-[#E61B1F]" />
      </div> */}

      <div className="text-left px-1 mb-2 py-2">
        <h2 className="text-xl font-semibold text-white">{item?.title}</h2>
        <div className="flex gap-4">
          <span>{item?.Genre?.name}</span>
          <span>|</span>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-300" />
            <span>{item?.rating}/10</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
