import React, { useEffect, useState } from "react";
import { UserAuth } from "../../components/AuthContext";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../components/FirebaseConfig";
import ListItem from "@/components/ListItem";
import Head from "next/head";

const Dashboard = () => {
  const router = useRouter();
  const { user, logout } = UserAuth();
  const userCollectionRef = collection(db, "users");
  const [userData, setUserData] = useState([]);
  const [userID, setUserID] = useState("");
  const [newData, setNewData] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        getUsers(user);
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    });

    const getUsers = async (currentUser) => {
      const data = await getDocs(userCollectionRef);
      data.docs.map((e) => {
        if (e.data().email == currentUser.email) {
          setUserData(e.data().notes);
          // console.log(e.id);
          setUserID(e.id);
        }
      });
    };
  }, [userData]);
  const addNote = () => {
    const handleAddNote = async () => {
      const notesData = await getDoc(doc(db, "users", userID));
      // console.log(notesData.data().notes);
      await updateDoc(doc(db, "users", userID), {
        notes: [
          ...notesData.data().notes,
          { noteText: newData, complete: false },
        ],
      });
    };
    handleAddNote();

    document.getElementById("inputField").value = "";
    // router.replace("/");
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Task Master</title>
        <meta name="description" content="Task Master" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {user?.email && (
        <div className="w-[95vw] ">
          <nav className="text-xl font-bold text-purple-300 flex bg-purple-900/50 rounded-t-2xl p-5 items-center justify-between">
            <h1>{user && user.email}</h1>
            <button onClick={handleLogout}>Logout</button>
          </nav>
          <div className=" p-3">
            <div className="flex items-center justify-center gap-2 max-w-[700px] m-auto">
              <input
                id="inputField"
                type="text"
                placeholder="Input your task"
                className="rounded-3xl p-3 w-4/5 bg-white/70 text-black focus:outline-purple-800"
                onChange={(e) => {
                  setNewData(e.target.value);
                }}
              />
              <button
                onClick={() => addNote()}
                className="rounded-3xl p-3 w-1/5 bg-white/30 font-bold text-black/60 hover:bg-purple-900/50 hover:text-white/80"
              >
                Add Task
              </button>
            </div>
            <div>
              {userData.map((elem, idx) => {
                // console.log(elem, idx);
                return (
                  <ListItem idx={idx} e={elem} userID={userID} key={idx} />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
