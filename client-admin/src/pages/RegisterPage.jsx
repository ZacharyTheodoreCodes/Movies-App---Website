import { useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import toastOptions from "../store/constants/toastOption";
import { addAdmin } from "../store/actions/actionCreator";
import PreLoader from "../components/PreLoader";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const { userLoading } = useSelector((state) => state.user);
  const initialFormState = {
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  };

  const [form, setForm] = useState({ ...initialFormState });
  const dispatch = useDispatch();

  const onChange = (event) => {
    const { name, value } = event?.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const registerAdmin = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(addAdmin(form));
      if (!response) throw new Error("Register failed");

      setForm(initialFormState);
      toast.success(
        `Register success, ${response.payload?.username} `,
        toastOptions
      );
    } catch (error) {
      console.log(error);
      toast.error(error.message ? error.message : error, toastOptions);
    }
  };

  if (userLoading) {
    return <PreLoader />;
  }

  return (
    <>
      <div className="py-[60px] sm:ml-64 px-[50px]">
        <h1 className="font-semibold text-2xl mb-4 w-fit py-2 border-b-4 border-[#E61B1F] ">
          Register New Admin
        </h1>
        <form onSubmit={registerAdmin} className="w-[60%] flex-col space-y-6">
          <div>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={onChange}
              placeholder="username"
              className="w-full rounded bg-[#080808] border-b-2 border-[#E61B1F] px-3 py-3 placeholder-[gray] outline-none focus:bg-[#3b3b3b]"
            />
          </div>

          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="email"
              className="w-full rounded bg-[#080808] border-b-2 border-[#E61B1F] px-3 py-3 placeholder-[gray] outline-none focus:bg-[#3b3b3b]"
            />
          </div>

          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="password"
              className="w-full rounded bg-[#080808] border-b-2 border-[#E61B1F] px-3 py-3 placeholder-[gray] outline-none focus:bg-[#3b3b3b]"
            />
          </div>

          <div>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={onChange}
              placeholder="phone number"
              className="w-full rounded bg-[#080808] border-b-2 border-[#E61B1F] px-3 py-3 placeholder-[gray] outline-none focus:bg-[#3b3b3b]"
            />
          </div>

          <div>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={onChange}
              placeholder="address"
              className="w-full rounded bg-[#080808] border-b-2 border-[#E61B1F] px-3 py-3 placeholder-[gray] outline-none focus:bg-[#3b3b3b]"
            />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 text-center">
            <button
              className="bg-[#E61B1F] hover:opacity-80 transition-all duration-100 text-white py-3 px-4 text-sm font-semibold rounded"
              type="submit"
            >
              <span className="text-md">Save</span>
            </button>
            <Link
              to="/"
              className="border border-white hover:opacity-80 transition-all duration-100 text-white py-3 px-4 text-sm font-semibold rounded hover:bg-[gray] "
            >
              <span className="text-md">Cancel</span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
