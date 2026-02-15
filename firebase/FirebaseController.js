import { addDoc , collection , onSnapshot , orderBy , query , where , getDocs } from "firebase/firestore";
import { useEffect , useState } from "react";
import { db , LOGIN_REF , USER_DATA_REF } from "./Config";

export const getUserByUsername = async (username) => {
    try {
        const usersRef = collection(db, LOGIN_REF);
        const q = query(usersRef, where("Username", "==", username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty){
            return null;
        }

        const userDoc = querySnapshot.docs[0];
        
        const data = {
            id: userDoc.id,
            ...userDoc.data()
        };
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error in FirebaseController:", error);
        throw error;
    }
}
