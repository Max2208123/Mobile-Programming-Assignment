import React, {useState, useEffect} from 'react';
import { getFirestore , collection , addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import loadMyLocations from "./loadMyLocations.js";


const addLocation = async ({locationName}, {description}, {rating}, {setLoading}, {setLocations}) => {

    const db = getFirestore();
    const auth = getAuth();

    const user = auth.currentUser;
    
    if (!user) {
        console.error("No User logged in!");
        return;
    }

    try {
        await addDoc(collection(db, "locations"), {
            name: locationName,
            description: description,
            userId: user.uid,
            createdAt: new Date(),
            rating: rating,
        })
        console.log("Saved");
        loadMyLocations(setLoading, setLocations);
    } catch (e) {
        console.error("Fehler beim Speichern:", e);
    }
}
export default addLocation;