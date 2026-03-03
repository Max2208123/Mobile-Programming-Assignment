import React, { useState, useEffect } from "react";
import {View, Text, Pressable} from 'react-native';
import { styles, DesignConfig } from "../styling/styles";
import { Ionicons } from '@expo/vector-icons';
import handleLogout from '../functions/handleLogout.js';
import Button from "./Button.js";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Header({title=''}){
    
    const [username, setUsername] = useState("")
    const titleText = title;

    useEffect(() => {
        const getUsername = async () => {
            try {
                const savedUsername = await AsyncStorage.getItem("username");
                if (savedUsername) {
                    setUsername(savedUsername.split('@')[0]);
                }
                //console.log(savedUsername)
            } catch (error){
                console.error("Error while loading the Username:", error)
            }
        };

        getUsername();
    }, []);
    return(
        <View style = {styles.headerContainer}>
            <View style = {styles.headerTextContainer}>
                <Text style = {styles.headerText}> {titleText} </Text>
            </View>
            <View style = {styles.flatListHeaderViewRight}>
                <Text style = {styles.flatListHeaderTextRight}>{username}</Text>
                <View style = {styles.flatListHeaderPressable}>
                    <Button
                        text = 'Sign Out'
                        iconName = 'log-out-outline'
                        onPressFunction= {() => handleLogout()}
                    />
                </View>   
            </View>
            
        </View>
    )
};