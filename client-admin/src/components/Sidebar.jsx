import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { FaHome, FaLink, FaBookReader, FaSignOutAlt } from "react-icons/fa";

import logo from '../assets/images/logo.png'
export default function Sidebar() {
  const navigate = useNavigate();

  const signOut = () => {
    Swal.fire({
      title: "<h2>Are you sure?</h2>",
      icon: "warning",
      html: "You will be logged out",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "<span>Yes</span>",
      confirmButtonColor: "#007EFF",
      cancelButtonText: "<span>Cancel</span>",
      cancelButtonColor: "#FF5564",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/login");
      }
    });
  };

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r-2 border-[#2C2C2C] "
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#080808] text-[#FFFFFF]">
          <div className="mt-[44px] mb-[40px] px-[34px] pb-2">
            <img src={logo} alt="iflix logo" />
          </div>

          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "hover:bg-[#2C2C2C] bg-[#2C2C2C] flex items-center p-2 rounded-lg"
                    : "hover:bg-[#2C2C2C] flex items-center p-2 rounded-lg "
                }
              >
                <span className="w-10 h-6 flex items-center justify-center">
                  <FaHome />
                </span>
                <span className="ml-2">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/genres"
                className={({ isActive }) =>
                  isActive
                    ? "hover:bg-[#2C2C2C] bg-[#2C2C2C] flex items-center p-2 rounded-lg"
                    : "hover:bg-[#2C2C2C] flex items-center p-2 rounded-lg "
                }
              >
                <span className="w-10 h-6 flex items-center justify-center">
                  <FaLink />
                </span>
                <span className="ml-2">Genres</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "hover:bg-[#2C2C2C] bg-[#2C2C2C] flex items-center p-2 rounded-lg"
                    : "hover:bg-[#2C2C2C] flex items-center p-2 rounded-lg "
                }
              >
                <span className="w-10 h-6 flex items-center justify-center">
                  <FaBookReader />
                </span>
                <span className="ml-2">Register Admin</span>
              </NavLink>
            </li>
            <li>
              <button
                className="hover:bg-[#2C2C2C] flex items-center p-2 rounded-lg w-full"
                onClick={signOut}
              >
                <span className="w-10 h-6 flex items-center justify-center">
                  <FaSignOutAlt />
                </span>
                <span className="ml-2">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
