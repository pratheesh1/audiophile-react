import React from "react";

function SignUp() {
  return (
    <>
      <section className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-full max-w-sm">
              <div className="bg-white px-6 pt-6 pb-8 mb-4 rounded-lg shadow-lg">
                <div className="mb-4">
                  <h1 className="text-center text-2xl font-bold">Sign Up</h1>
                </div>
                <form className="">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                    <p className="text-red-500 text-xs italic">
                      Please choose a password.
                    </p>
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                    <p className="text-red-500 text-xs italic">
                      Please choose a password.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <a
                      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                      href="/"
                    >
                      Already have an account? Sign In
                    </a>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
