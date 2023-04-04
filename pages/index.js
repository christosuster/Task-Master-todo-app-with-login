import Head from "next/head";
import { Inter } from "next/font/google";
import Dashboard from "./dashboard";
import { useRouter } from "next/router";
import { UserAuth } from "../components/AuthContext";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { user } = UserAuth();
  useEffect(() => {
    if (user?.email) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Task Master</title>
        <meta name="description" content="Task Master" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </>
  );
}
