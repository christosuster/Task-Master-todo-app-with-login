import Link from "next/link";
import { useFormik } from "formik";
import { UserAuth } from "../authContext";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const router = useRouter();
  const { signIn, user } = UserAuth();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        console.log(user);
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required!"),
      password: Yup.string().required("Password is required!"),
    }),

    onSubmit: (values) => {
      const handleLogin = async () => {
        await signIn(values.email, values.password);
        console.log(user);

        router.push("/dashboard");
      };

      handleLogin();
    },
  });

  return (
    <>
      {!user?.email && (
        <div className="flex h-full flex-col lg:flex-row">
          <div className="lg:h-[90vh]  w-full lg:backdrop-blur lg:bg-purple-900/70 text-center text-white flex items-center justify-center flex-col rounded-t-2x lg:rounded-l-2xl l p-10 mb-10 lg:m-auto">
            <h1 className="text-8xl font-bold ">Task Master</h1>
            <p className="text-2xl">Master your tasks, conquer your day</p>
          </div>
          <div className="w-full m-auto text-center text-white">
            <h1 className="text-3xl white font-bold text-white lg:mt-5 mb-10">
              Login
            </h1>
            <form className="text-black" onSubmit={formik.handleSubmit}>
              <input
                required
                type="email"
                name="email"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Email"
                className="mb-3 rounded-2xl opacity-40  text-center py-2 w-3/4 max-w-[500px] focus:outline-none"
              />
              <input
                required
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Password"
                className="mb-3 rounded-2xl opacity-40 text-center py-2 w-3/4 max-w-[500px] focus:outline-none"
              />
              <button
                type="submit"
                className="mb-3 rounded-3xl bg-purple-300/30  text-center p-2 w-1/2 max-w-[200px] hover:bg-purple-500/40"
              >
                Login
              </button>
            </form>

            <h1>
              Don&apos;t have an account?{" "}
              <span className="font-bold cursor-pointer">
                {" "}
                <Link href="/signup">Sign Up</Link>
              </span>
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
