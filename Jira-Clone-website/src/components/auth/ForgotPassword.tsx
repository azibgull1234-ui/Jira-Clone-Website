import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { requestPasswordReset } from "../../Services/authService";
import Picutre from "../../assets/picture.jpg";

interface FormData {
  email: string;
}

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError(null);
    setLoading(true);
    try {
      await requestPasswordReset(data.email);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#f4f5f7] px-6">
      <div className="grid w-full max-w-5xl items-center gap-16 md:grid-cols-2">
        <div className="hidden flex-col justify-center md:flex">
          <div className="mb-8 flex items-center gap-3">
            <img
              src="https://cdn.worldvectorlogo.com/logos/jira-3.svg"
              alt="Jira"
              className="w-12"
            />
            <h1 className="text-5xl font-bold text-[#172B4D]">Jira</h1>
          </div>
          <h2 className="text-4xl font-bold text-[#172B4D]">Reset your password</h2>
          <p className="mt-3 text-lg text-gray-500">
            Enter your email and we’ll send you a reset link.
          </p>
          <img src={Picutre} alt="" className="mt-12 w-[450px]" />
        </div>

        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">
          <h2 className="mb-6 text-3xl font-bold text-[#172B4D]">Forgot password</h2>

          {submitted ? (
            <div className="space-y-6">
              <p className="text-gray-600">
                If an account exists for that email, a reset link has been sent.
                Check your inbox and follow the instructions.
              </p>
              <Link
                to="/login"
                className="block w-full rounded-lg bg-blue-600 py-3 text-center text-lg font-semibold text-white hover:bg-blue-700"
              >
                Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
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
                <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
              </div>

              {error ? <p className="text-sm text-red-500">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-gray-600">
            Remembered your password?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
