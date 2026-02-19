import React from 'react';
import {Pressable, View, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {styles, DesignConfig} from '../styling/styles.js'

export default function Button({text, iconName, onPressFunction}){
    return(
        
        <Pressable onPress = {() => onPressFunction()}>
            <View style = {styles.addLocationMask.buttonContainer}>
                <Text style = {styles.addLocationMask.buttonText}>{text}</Text>
                <Ionicons
                    name = {iconName}
                    size = {DesignConfig.icon.size}
                    color = {DesignConfig.icon.alternativeColor}
                    style = {styles.buttonIcon}
                />
            </View>
        </Pressable>
    )

}