import React, {useState, useEffect} from 'react';
import { getFirestore , collection , addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import loadMyLocations from "./loadMyLocations.js";
import { Dimensions } from 'react-native';


const addLocation = async (locationName, description, rating, latitude, longitude, setLoading, setLocations) => {

    const db = getFirestore();
    const auth = getAuth();

    const user = auth.currentUser;
    
    if (!user) {
        console.error("No User logged in!");
        return;
    }

    try {
        console.log("Success");
        await addDoc(collection(db, "locations"), {
            name: locationName,
            description: description,
            userId: user.uid,
            createdAt: new Date(),
            rating: parseFloat(rating),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
        })
        console.log("Saved");
        loadMyLocations(setLoading, setLocations);
    } catch (e) {
        console.error("Error while Saving:", e);
    }
}
export default addLocation;