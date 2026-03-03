import React from "react";
import { getAuth , signOut} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


const auth = getAuth()
const handleLogout = async () => {
    /*
    try {
        
        setLoggedIn(false);
        setLoggedInUser(null);
        console.log("Logout  Successfull!")
        
       await signOut(auth)
       console.log("Erfolgreich ausgeloggt!");
    } catch(e) {
        console.error("Error while logging out:",e)
    }  */
    const auth = getAuth();
    try {
        await signOut(auth);
        await AsyncStorage.removeItem('username');
    } catch (error){
        console.error("Logout error", error)
    }
};
export default handleLogout;