import "react-toastify/dist/ReactToastify.css";
import TableRow from "./TableRow";

export default function Table({ label, data, columns, deleteData }) {
  return (
    <div className="relative overflow-x-auto border-white border sm:rounded-lg mt-[40px]">
      {data?.length > 0 ? (
        <table className="w-full text-sm text-left">
          <thead className=" text-white uppercase border-white border rounded-lg bg-red-600 text-md">
            <tr>
              {columns?.map((column, idx) => (
                <th
                  scope="col"
                  className={`px-6 py-6 ${
                    column === "Genre" || column === "Movie Title"
                      ? "text-left"
                      : "text-center"
                  }`}
                  key={idx}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, idx) => (
              <TableRow
                key={idx}
                label={{ ...label, id: item.id }}
                attributes={
                  label.name === "movies"
                    ? {
                        no: idx + 1,
                        title: item.title,
                        genre: item.Genre?.name,
                        rating: item.rating,
                        createdBy: item.User?.username,
                      }
                    : {
                        no: idx + 1,
                        name: item.name,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                      }
                }
                deleteData={deleteData}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col justify-center items-center mt-[60px] ">
          <h3 className="text-2xl font-semibold mb-14">No Data Found</h3>
        </div>
      )}
    </div>
  );
}
