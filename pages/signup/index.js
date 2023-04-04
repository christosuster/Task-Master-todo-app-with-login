import Link from "next/link";
import { Formik, useFormik } from "formik";
import { UserAuth } from "../../components/AuthContext";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../components/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const Signup = () => {
  let router = useRouter();
  const { createUser, user } = UserAuth();
  const userCollectionRef = collection(db, "users");
  useEffect(() => {
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

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required!"),
      password: Yup.string().required("Password is required!"),
      confirmPassword: Yup.string()
        .required()
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

  // console.log(formik.errors);
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
              Sign Up
            </h1>
            <form className="text-black" onSubmit={formik.handleSubmit}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="mb-3 rounded-2xl opacity-40  text-center py-2 w-3/4 max-w-[500px] focus:outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="mb-3 rounded-2xl opacity-40 text-center py-2 w-3/4 max-w-[500px] focus:outline-none"
              />
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
