import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import Picutre1 from "../assets/picture1.jpg";

const Registration = () => {
  return (
    <section className="min-h-screen bg-[#f4f5f7] flex items-center justify-center px-6 py-9">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <img
              src="https://cdn.worldvectorlogo.com/logos/jira-3.svg"
              alt="Jira"
              className="w-10"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-[#172B4D]">Jira</h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#172B4D]">
            Create your account
          </h2>

          <p className="text-gray-500 mt-3 text-sm md:text-base">
            Sign up to get started with Jira.
          </p>

          <img src={Picutre1} alt="Picutre1" className="mt-12 w-[450px] max-w-full h-auto" />
        </div>

        {/* Right Side */}
        <div className="bg-white rounded-2xl shadow-xl p-7 max-w-md w-full mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#172B4D] mb-7">
            Create Your Account
          </h2>
          {/* Full Name */}
          <div className="mb-5">
            <label className="font-semibold text-gray-700 block mb-1">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}

          <div className="mb-5">
            <label className="font-semibold text-gray-700 block mb-1">
              Email address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}

          <div className="mb-5">
            <label className="font-semibold text-gray-700 block mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <Eye
                size={20}
                className="absolute right-4 top-4 text-gray-500 cursor-pointer"
              />
            </div>
          </div>

          {/*Confirm Password */}

          <div className="mb-5">
            <label className="font-semibold text-gray-700 block mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Eye
                size={20}
                className="absolute right-4 top-4 text-gray-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Login */}

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition">
            Register
          </button>

          {/* Register */}

          <p className="text-center mt-5 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Registration;
