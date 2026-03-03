import React from "react";
import { getAuth , signOut} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


const auth = getAuth()
const handleLogout = async () => {

    const auth = getAuth();
    try {
        await signOut(auth);
        await AsyncStorage.removeItem('username');
    } catch (error){
        console.error("Logout error", error)
    }
};
export default handleLogout;