import React, {useState, useEffect} from 'react';
import { getFirestore , collection , addDoc, updateDoc, doc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import loadMyLocations from "./loadMyLocations.js";

const editLocation = async (locationName, description, rating, latitude, longitude, setLoading, setLocations, item) => {

    const db = getFirestore();
    const auth = getAuth();

    const user = auth.currentUser;
    
    if (!user) {
        console.error("No User logged in!");
        return;
    }
    try {
        await updateDoc(doc(db,"locations",item.id),{
            name: locationName,
            description: description,
            userId: user.uid,
            rating: parseFloat(rating),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
        })
        // console.log("Saved");
        loadMyLocations(setLoading, setLocations)
    } catch (e) {
        console.error("Error while Saving:", e)
    }
    return;
};

export default editLocation;