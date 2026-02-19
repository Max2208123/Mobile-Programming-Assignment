import React from "react";
import {View, Text, Pressable} from 'react-native';
import { styles, DesignConfig } from "../styling/styles";
import { Ionicons } from '@expo/vector-icons';
import handleLogout from '../functions/handleLogout.js'
export default function Header({title=''}){

    const titleText = title;
    return(
        <View style = {styles.headerContainer}>
            <View style = {styles.headerTextContainer}>
                <Text style = {styles.headerText}> {titleText} </Text>
            </View>
            <View style = {styles.flatListHeaderPressable}>
                <Pressable onPress = {() => handleLogout()}>
                    <View style = {styles.addLocationMask.buttonContainer}>
                        <Text style = {styles.addLocationMask.buttonText}>Sign Out</Text>
                        <Ionicons
                            name = "log-out-outline"
                            size = {DesignConfig.icon.size}
                            color = {DesignConfig.icon.alternativeColor}
                            style = {styles.buttonIcon}
                        />
                    </View>
                </Pressable> 
            </View>
            
            
        </View>
    )

}