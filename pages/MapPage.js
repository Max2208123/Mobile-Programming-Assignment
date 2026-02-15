import React, {useContext} from 'react';
import { View , Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../contexts/Contexts';

export default function MapPage(){

    const {loggedIn, setLoggedIn, loggedInUser, setLoggedInUser} = useContext(UserContext) 

    const handleLogout = async () => {
        try{
            setLoggedIn(false);
            setLoggedInUser(null);
            console.log("Logout  Successfull!")
        } catch(e) {
            console.error("Error while logging out:",e)
        }
    }
    return(
        <View>
            <Text> Map Page </Text>
            <Button title='Sign Out' onPress={() => handleLogout()}/>
        </View>
    )
} 