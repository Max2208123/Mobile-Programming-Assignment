import React, {useState, useEffect} from 'react';
import { getFirestore, collection, addDoc , query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {db, auth} from "../firebase/Config"

const loadMyLocations = async (setLoading, setLocations) => {

    const user = auth.currentUser;
    if (!user) return;

    setLoading(true)
    try {
        const loactionsRef = collection(db, "locations");

        const q = query(loactionsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const myData = [];
        querySnapshot.forEach((doc) => {
            myData.push({ id: doc.id, ...doc.data() });
        });
        setLocations(myData)
        // console.log("Meine Locations:", myData);
    } catch (e) {
        // console.error("Error while loading:", e)
    } finally {
        setLoading(false);
    }
}
export default loadMyLocations;