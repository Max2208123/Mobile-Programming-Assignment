import React from "react";
import { getAuth , signOut} from "firebase/auth";


const auth = getAuth()
const handleLogout = async () => {
    try {
        /*
        setLoggedIn(false);
        setLoggedInUser(null);
        console.log("Logout  Successfull!")
        */
       await signOut(auth)
       console.log("Erfolgreich ausgeloggt!");
    } catch(e) {
        console.error("Error while logging out:",e)
    }
};
export default handleLogout;