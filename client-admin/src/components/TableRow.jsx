import { Link } from "react-router-dom";
import formatDate from "../helpers/formatDate";

export default function TableRow({ label, attributes, deleteData }) {
  return (
    <tr className="border border-gray-200 text-white text-center text-base">
      {Object.keys(attributes).map((item, idx) => (
        <td
          key={idx}
          className={`px-6 py-6 ${
            item === "title" || item === "genre" || item === "name"
              ? "text-left"
              : "text-center"
          }`}
        >
          {item === "createdAt" || item === "updatedAt"
            ? formatDate(attributes[item])
            : attributes[item]}
        </td>
      ))}
      {label?.name === "movies" && (
        <td className="px-6">
          <Link
            to={`/movies/${label.id}`}
            className="border-[#E61B1F] border hover:bg-[#E61B1F] px-3 py-1.5 rounded-md hover:opacity-80 transition-all duration-100"
          >
            See Detail
          </Link>
        </td>
      )}

      <td className="px-6 py-4">
        <div className="flex items-center justify-center space-x-2 max-w-[140px] mx-auto">
          <Link
            to={`/${label.name === "movies" ? "movies" : "genres"}/${
              label.id
            }/edit`}
            className="text-[#FFFFFF] cursor-pointer font-semibold hover:underline w-1/2 text-center"
          >
            Edit
          </Link>
          <button
            className="px-1 text-[#E61B1F] cursor-pointer font-semibold hover:underline w-1/2 text-center"
            onClick={() =>
              deleteData(
                label.id,
                label.name === "movies" ? attributes.title : attributes.name
              )
            }
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
