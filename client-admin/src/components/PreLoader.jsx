import ScaleLoader from "react-spinners/PulseLoader";

export default function PreLoader() {
  return (
    <div className="fixed top-0 left-0 z-50 flex justify-center items-center min-h-screen h-full w-full flex-col bg-[#2C2C2C] backdrop-blur bg-opacity-90 p-6">
      <ScaleLoader size={20} color={"#E61B1F"} className="mx-auto" />
    </div>
  );
}
