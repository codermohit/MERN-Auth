import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorData, setErrorData] = useState({ isError: false, errorMsg: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //set loading(bool) and error(obj)
      setLoading(true);
      setErrorData((data) => ({ ...data, isError: false, errorMsg: "" }));
      //POST the form data
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      //check for errors
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.errorMsg || "Something went wrong!");
      }
      //returned data from server
      //const data = await res.json();
      navigate("/sign-in");
    } catch (error) {
      setErrorData((err) => ({
        ...err,
        isError: true,
        errorMsg: error.message,
      }));
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData((formData) => ({ ...formData, [e.target.id]: e.target.value }));
  }

  return (
    <div className="p-3 max-w-sm mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
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
        >
          Sign up
        </button>
        <OAuth />
        {errorData.isError && (
          <p className="text-red-500">{errorData.errorMsg}</p>
        )}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-600">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
