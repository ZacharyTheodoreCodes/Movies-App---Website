import ScaleLoader from "react-spinners/PulseLoader";

export default function PreLoader() {
  return (
    <div className="sweet-loading flex items-center h-screen">
      <ScaleLoader size={20} color={"#E61B1F"} className="mx-auto" />
    </div>
  );
}
