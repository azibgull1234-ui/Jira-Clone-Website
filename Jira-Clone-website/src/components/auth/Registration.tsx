import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Picutre1 from "../../assets/picture1.jpg";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerAccount, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const password = watch("password") ?? "";

  const getPasswordStrength = (value: string) => {
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[^A-Za-z0-9]/.test(value);
    const score = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;

    if (!value) {
      return { label: "", color: "bg-transparent", width: "0%" };
    }
    if (value.length < 6) {
      return { label: "Weak", color: "bg-red-500", width: "25%" };
    }
    if (score >= 4 && value.length >= 8) {
      return { label: "Strong", color: "bg-green-500", width: "100%" };
    }
    if (score >= 3) {
      return { label: "Medium", color: "bg-yellow-400", width: "66%" };
    }
    return { label: "Weak", color: "bg-red-500", width: "50%" };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    clearError();

    try {
      await registerAccount(data.fullName, data.email, data.password);
      navigate("/login", { replace: true });
    } catch {
      // Error is stored on AuthContext.
    }
  };
  return (
    <section className="min-h-screen bg-[#f4f5f7] flex items-center justify-center px-3 py-4">
      <div className="max-w-3xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="https://cdn.worldvectorlogo.com/logos/jira-3.svg"
              alt="Jira"
              className="w-10"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-[#172B4D]">
              Jira
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#172B4D]">
            Create your account
          </h2>

          <p className="text-gray-500 mt-2 text-sm md:text-sm">
            Sign up to get started with Jira.
          </p>

          <img
            src={Picutre1}
            alt="Picutre1"
            className="mt-8 w-[300px] max-w-full h-auto"
          />
        </div>

        {/* Right Side */}
        <div className="bg-white rounded-2xl shadow-xl p-4 max-w-sm w-full mx-auto md:fixed md:right-8 md:top-1/2 md:transform md:-translate-y-1/2 md:z-50">
          <h2 className="text-2xl font-bold text-[#172B4D] mb-4">
            Create Your Account
          </h2>
          {/* Full Name */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="mb-3">
              <label className="font-semibold text-gray-700 block mb-1 text-sm">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                {...register("fullName", { required: "Full name is required" })}
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName?.message}
              </p>
            </div>
            {/* Email */}
            <div className="mb-3">
              <label className="font-semibold text-gray-700 block mb-1 text-sm">
                Email address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
            </div>
            {/* Password */}
            <div className="mb-3">
              <label className="font-semibold text-gray-700 block mb-1 text-sm">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full border rounded-lg px-3 py-2.5 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-3.5 text-gray-500"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-red-500 text-xs mt-1">
                {errors.password?.message}
              </p>
              <div className="mt-1">
                <div className="flex items-center justify-between text-[11px] font-medium">
                  <span
                    className={
                      passwordStrength.label === "Strong"
                        ? "text-green-600"
                        : passwordStrength.label === "Medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }
                  >
                    {passwordStrength.label
                      ? `Strength: ${passwordStrength.label}`
                      : "Strength: Enter a password"}
                  </span>
                  <span className="text-gray-500 text-xs">
                    Use uppercase, number, symbol
                  </span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{ width: passwordStrength.width }}
                  />
                </div>
              </div>
            </div>
            {/*Confirm Password */}
            <div className="mb-3">
              <label className="font-semibold text-gray-700 block mb-1 text-sm">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full border rounded-lg px-3 py-2.5 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-3.5 text-gray-500"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword?.message}
              </p>
            </div>
            {error ? (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-base font-semibold transition disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
          {/* Login */}

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
