
import Searchbar from "./Searchbar";

export default function Header({ onSearch }) {
  return (
    <div className=" relative flex items-center place-content-between gap-10 border-b-4 mx-32 border-[#E61B1F]">
      <h1 className="font-semibold text-4xl ">
        Watch movies, anywhere, anytime..
      </h1>
      <div className="flex justify-center my-4">
        <Searchbar onSearch={onSearch} />
      </div>
    </div>
  );
}
