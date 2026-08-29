import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Picutre from "../../assets/picture.jpg";
import { useAuth } from "../../context/AuthContext";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { rememberMe: true },
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, error, login, clearError } = useAuth();
  const from =
    (location.state as { from?: { pathname: string } } | null)?.from?.pathname ||
    "/dashboard";

  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [from, isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    clearError();
    try {
      await login(data.email, data.password, data.rememberMe);
      navigate(from, { replace: true });
    } catch {
      // Error is stored on AuthContext.
    }
  };

  return (
    <section className="min-h-screen bg-[#f4f5f7] flex items-center justify-center px-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <img
              src="https://cdn.worldvectorlogo.com/logos/jira-3.svg"
              alt="Jira"
              className="w-12"
            />
            <h1 className="text-5xl font-bold text-[#172B4D]">Jira</h1>
          </div>

          <h2 className="text-4xl font-bold text-[#172B4D]">Welcome back!</h2>

          <p className="text-gray-500 mt-3 text-lg">
            Log in to continue to your account.
          </p>

          <img src={Picutre} alt="Picutre" className="mt-12 w-[450px]" />
        </div>

        {/* Right Side */}
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full mx-auto">
          <h2 className="text-4xl font-bold text-[#172B4D] mb-10">
            Log in to Jira
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="font-semibold text-gray-700 block mb-2">
                Email address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
            </div>

            {/* Password */}
            <div>
              <label className="font-semibold text-gray-700 block mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
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
                  className="absolute right-4 top-4 text-gray-500"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>
            </div>

            {/* Remember */}
            <div className="flex justify-between items-center mb-8">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" {...register("rememberMe")} />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-600 font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {error ? (
              <p className="text-red-500 text-sm text-center">{error}</p>
            ) : null}

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Register */}
          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
