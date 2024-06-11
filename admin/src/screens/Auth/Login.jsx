import React, { useEffect } from "react";
import { useState } from "react";

// components
import { Spinner } from "../components/Spinner";

// helpers
import AxiosInstance from "../../helpers/AxiosInstance";

// constants
import API_CONSTANTS from "../../config/API_CONSTANTS";
const Login = () => {
  // handlers
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState(null);

  // values
  const [email, setEmail] = useState("haiderzamanyzi@gmail.com");
  const [password, setPassword] = useState("password");

  // functions
  const handleLogin = async (e) => {
    e.preventDefault();
    const { responseData, error, loading } = await AxiosInstance(
      API_CONSTANTS.BASE_URL + API_CONSTANTS.SIGN_IN,
      "POST",
      {},
      {
        email_address: email,
        password,
      },
      {
        "Content-Type": "application/json",
      }
    );

    if (loading) {
      setIsButtonLoading(true);
      console.log("loading");
    }
    if (responseData) {
      localStorage.setItem("token", responseData.data.data.token);
      localStorage.setItem("user", JSON.stringify(responseData.data.data.auth));
      setData(responseData.data.data);
      setIsButtonLoading(false);
    }
    if (error) {
      console.log(error);
      setIsButtonLoading(false);
      setIsError(true);
      setErrorMsg(error);
    }
    console.log("DATA IN LOGIN", data);
  };

  // clear local storage on first mount only
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <>
      <section className="bg-gray-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-xl shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 drop-shadow">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 ">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline "
                  >
                    Forgot password?
                  </a>
                </div>
                {isError && (
                  <div className="flex items-start h-5">
                    <span className="font-sm text-red-500">{errorMsg}</span>
                  </div>
                )}
                <button
                  type="submit"
                  onClick={(e) => handleLogin(e)}
                  className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center  "
                >
                  {isButtonLoading ? <Spinner /> : "Sign in"}
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline "
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
