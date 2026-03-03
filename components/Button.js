import React from 'react';
import {Pressable, View, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {styles, DesignConfig} from '../styling/styles.js'

export default function Button({text, iconName, onPressFunction, isLoading = false, buttonTextSize = 14}){

    const showIcon = (iconName !== "none")
    const isFunctional = !isLoading

    return(
        
        <Pressable onPress = {isFunctional ? () => onPressFunction() : () => {}}>
            <View style = {styles.addLocationMask.buttonContainer}>
                <Text style = {{color: styles.addLocationMask.buttonText.color, fontSize: buttonTextSize}}>{text}</Text>
                {
                    showIcon 
                    ? 
                    <Ionicons
                        name = {iconName}
                        size = {DesignConfig.icon.size}
                        color = {DesignConfig.icon.alternativeColor}
                        style = {styles.buttonIcon}
                    />
                    : 
                    null
                }
                
            </View>
        </Pressable>
    )

}