import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="relative ">
      <Navbar />
      <main className="mt-[80px]">
        <Outlet />
      </main>
    </div>
  );
}
