import Link from "next/link";
import { Formik, useFormik } from "formik";
import { UserAuth } from "../../components/AuthContext";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../components/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import Head from "next/head";

const Signup = () => {
  let router = useRouter();
  const { createUser, user } = UserAuth();
  const userCollectionRef = collection(db, "users");
  useEffect(() => {
    console.log("running1");

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        router.push("/dashboard");
      } else {
        router.push("/signup");
      }
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validateOnBlur: false,

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required!"),
      password: Yup.string()
        .required("Password is required!")
        .min(6, "Password should be atleast 6 characters long"),
      confirmPassword: Yup.string()
        .required("Retype your password!")
        .oneOf([Yup.ref("password"), null], "Passwords must match!"),
    }),

    onSubmit: (values) => {
      const handleLogin = async () => {
        await createUser(values.email, values.password);

        await addDoc(userCollectionRef, {
          email: values.email,
          notes: [],
        });
        router.push("/dashboard");
      };

      handleLogin();
    },
  });

  console.log(formik.errors);
  return (
    <>
      <Head>
        <title>Task Master | Sign Up</title>
        <meta name="description" content="Sign Up" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {!user?.email && (
        <div className="flex h-full flex-col lg:flex-row min-w-[90vw]">
          <div className="lg:h-[90vh]  w-full lg:backdrop-blur lg:bg-purple-900/70 text-center text-white flex items-center justify-center flex-col rounded-t-2x lg:rounded-l-2xl l p-10 mb-10 lg:m-auto">
            <h1 className="text-8xl font-bold ">Task Master</h1>
            <p className="text-2xl">Master your tasks, conquer your day</p>
          </div>
          <div className="w-full m-auto text-center text-white">
            <h1 className="text-3xl white font-bold text-white lg:mt-5 mb-10">
              Sign Up
            </h1>
            <form
              className="text-black flex flex-col justify-center items-center"
              onSubmit={formik.handleSubmit}
            >
              {formik.errors.email ? (
                <label className="block text-red-400">
                  {formik.errors.email}
                </label>
              ) : (
                ""
              )}
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="mb-3 rounded-2xl opacity-40  text-center py-2 w-3/4 max-w-[500px] focus:outline-none"
              />
              {formik.errors.password ? (
                <label className="block text-red-400">
                  {formik.errors.password}
                </label>
              ) : (
                ""
              )}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="mb-3 rounded-2xl opacity-40 text-center py-2 w-3/4 max-w-[500px] focus:outline-none"
              />
              {formik.errors.confirmPassword ? (
                <label className="block text-red-400">
                  {formik.errors.confirmPassword}
                </label>
              ) : (
                ""
              )}
              <input
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                placeholder="Confirm Password"
                className="mb-3 rounded-2xl opacity-40 text-center py-2 w-3/4 max-w-[500px] focus:outline-none"
              />
              <button
                type="submit"
                name="submit"
                className="mb-3 rounded-3xl bg-purple-300/30  text-center p-2 w-1/2 max-w-[200px] hover:bg-purple-500/40"
              >
                Sign Up
              </button>
            </form>

            <h1>
              Already have an account?{" "}
              <span className="font-bold cursor-pointer">
                <Link href="/login">Login</Link>
              </span>
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
