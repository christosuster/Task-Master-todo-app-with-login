import { db } from "@/pages/firebase-config";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  MdDelete,
  MdDone,
  MdDoneAll,
  MdDoneOutline,
  MdEdit,
  MdOutlineDone,
} from "react-icons/md";

const ListItem = ({ idx, e, userID }) => {
  console.log(e);
  const docRef = doc(db, "users", userID);
  const [newText, setNewText] = useState("");
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsComplete(e.complete);
  }, []);

  const cancelEdit = () => {
    setEditMode(false);
  };

  const deleteItem = () => {
    const handleDelete = async () => {
      const oldNoteData = await getDoc(docRef);
      const tempData = oldNoteData.data().notes;

      tempData.splice(idx, 1);

      await updateDoc(docRef, {
        notes: tempData,
      });
    };
    handleDelete();
    router.replace("/");
  };

  const saveEdit = () => {
    const handleSaveEdit = async () => {
      const oldNoteData = await getDoc(docRef);
      const tempData = oldNoteData.data().notes;
      console.log(tempData);
      tempData[idx].noteText = newText;
      console.log(tempData);
      await updateDoc(docRef, {
        notes: tempData,
      });
      // await updateDoc(docRef, {
      //   notes: arrayRemove(oldNoteData.data().notes[idx]),
      // });

      // await updateDoc(docRef, {
      //   notes: arrayUnion(newText),
      // });
    };
    handleSaveEdit();

    setEditMode(false);
    router.replace("/");
  };

  const completeTask = () => {
    setIsComplete(!isComplete);

    const handleComplete = async () => {
      const oldNoteData = await getDoc(docRef);
      const tempData = oldNoteData.data().notes;

      tempData[idx].complete = !isComplete;

      await updateDoc(docRef, {
        notes: tempData,
      });
    };
    handleComplete();
  };

  const editNote = () => {
    setEditMode(true);

    const handleEditNote = async () => {
      const oldNoteData = await getDoc(docRef);
      setNewText(oldNoteData.data().notes[idx].noteText);
    };
    handleEditNote();
  };
  return (
    <div
      className={
        isComplete
          ? " gap-2 flex items-center justify-center w-full text-center bg-white/30 my-3 rounded-xl p-5 font-bold text-xl"
          : " gap-2 flex items-center justify-center w-full text-center bg-white/30 my-3 rounded-xl p-5 font-bold text-xl"
      }
    >
      {editMode ? (
        ""
      ) : isComplete ? (
        <h1 className="w-4/5 break-words line-through ">{e.noteText}</h1>
      ) : (
        <h1 className="w-4/5 break-words">{e.noteText}</h1>
      )}

      {editMode && (
        <input
          value={newText}
          onChange={(evnt) => setNewText(evnt.target.value)}
          className="p-2 rounded-2xl bg-purple-300/90 text-center w-4/5 border-2 border-black"
        ></input>
      )}
      <div className="min-w-[100px] gap-2 m-auto flex">
        {!editMode && (
          <>
            <button onClick={() => completeTask()}>
              <MdDoneOutline size={30} className="hover:text-purple-800" />
            </button>
            <button onClick={() => editNote()}>
              <MdEdit size={30} className="hover:text-purple-800" />
            </button>
            <button
              onClick={() => {
                deleteItem();
              }}
            >
              <MdDelete size={30} className="hover:text-purple-800" />
            </button>
          </>
        )}

        {editMode && (
          <>
            <button onClick={cancelEdit} className="hover:text-purple-800">
              Cancel
            </button>
            <button onClick={saveEdit} className="hover:text-purple-800">
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ListItem;
