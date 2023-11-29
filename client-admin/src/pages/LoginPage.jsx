import bgImg from "../assets/images/background.jpg";

import logo from "../assets/images/logo.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import toastOptions from "../store/constants/toastOption";
import PreLoader from "../components/PreLoader";
import { useNavigate } from "react-router-dom";
import { login } from "../store/actions/actionCreator";

export default function LoginPage() {
  const initialFormState = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState({ ...initialFormState });
  const { userLoading } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (event) => {
    const { name, value } = event?.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(login(form));
      console.log(response);
      if (!response) throw new Error("Login unsuccessful");

      setForm(initialFormState);
      navigate("/");
      toast.success("Login success", toastOptions);
    } catch (error) {
      console.log(error);
      toast.error(error?.message ? error?.message : error, toastOptions);
    }
  };

  if (userLoading) {
    return <PreLoader />;
  }

  return (
    <>
      <div
        className="relative flex h-screen overflow-y-hidden w-screen flex-col md:items-center md:justify-center md:bg-transparent bg-[#080808] text-white"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgImg}) center/cover no-repeat`,
        }}
      >
        {/* Background */}
        {/* <img
          src={bgImg}
          className="-z-10 !hidden opacity-[20%] sm:!inline bg-cover absolute"
        /> */}

        {/* Logo Icon */}
        <img
          src={logo}
          className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
          width={150}
          height={150}
        />

        {/* Log in Form */}
        <form
          className="w-full relative mt-24 space-y-8 rounded bg-[#080808] pt-10 pb-14 px-6 md:mt-0 md:max-w-md md:px-14"
          onSubmit={handleLogin}
        >
          <h1 className="text-4xl font-semibold">Sign In</h1>
          <div className="space-y-4">
            <label className="inline-block w-full">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="Email"
                className="w-full rounded bg-[#2C2C2C] px-5 py-3.5 placeholder-[gray] outline-none focus:bg-[#3b3b3b]"
              />
            </label>

            <label className="inline-block w-full">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="Password"
                className="w-full rounded bg-[#2C2C2C] px-5 py-3.5 placeholder-[gray] outline-none focus:bg-[#3b3b3b]"
              />
            </label>
          </div>

          <div className="w-full">
            <button
              className="rounded py-3 font-semibold text-center mx-auto w-full bg-[#E61B1F] hover:opacity-80 transition-all duration-100"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
