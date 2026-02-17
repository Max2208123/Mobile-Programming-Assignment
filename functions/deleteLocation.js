import React from 'react';
import loadMyLocations from "./loadMyLocations";
import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const deleteLocation = async (id, setLoading, setLocations) => {

    const db = getFirestore();
    const auth = getAuth();

    const user = auth.currentUser;

    if (!user) {
        console.error("No user logged in!")
        return;
    }

    try {
        await deleteDoc(doc(db, "locations", id));

        console.log("Entry deleted:", id)

        loadMyLocations(setLoading, setLocations);
    } catch (e) {
        console.log("Error while deleting:", e)
    }

};

export default deleteLocation;