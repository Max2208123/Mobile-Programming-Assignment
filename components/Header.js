import React from "react";
import {View, Text, Pressable} from 'react-native';
import { styles, DesignConfig } from "../styling/styles";
import { Ionicons } from '@expo/vector-icons';
import handleLogout from '../functions/handleLogout.js';
import Button from "./Button.js";


export default function Header({title=''}){

    const titleText = title;
    return(
        <View style = {styles.headerContainer}>
            <View style = {styles.headerTextContainer}>
                <Text style = {styles.headerText}> {titleText} </Text>
            </View>
            <View style = {styles.flatListHeaderPressable}>
                <Button
                    text = 'Sign Out'
                    iconName = 'log-out-outline'
                    onPressFunction= {() => handleLogout()}
                />
            </View>
        </View>
    )

}