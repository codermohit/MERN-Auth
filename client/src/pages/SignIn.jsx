import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../redux/user/useUser.js";
import OAuth from "../components/OAuth.jsx";

function SignIn() {
  const [formData, setFormData] = useState({});
  const {
    loading,
    error: { isError, errorMsg },
    signInStart,
    signInFailure,
    signInSuccess,
  } = useUser();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      signInStart();

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = (await res.json()) || {};
        throw new Error(errorData?.errorMsg || "Something went wrong!");
      }

      const data = await res.json();
      if (!data) throw new Error("No data found for the request");

      signInSuccess(data);

      navigate("/");
    } catch (error) {
      const err = { isError: true, errorMsg: error.message };
      signInFailure(err);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          onSubmit={handleSubmit}
        >
          Sign In
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&#39;t have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-600">Sign up</span>
        </Link>
      </div>
      {isError && <p className="text-red-500">{errorMsg}</p>}
    </div>
  );
}

export default SignIn;
