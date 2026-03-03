import React, {useState} from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


function Star({position, currentRating, onPress, designConfig}){
    let iconName = 'star-outline';
    if (currentRating >= position){
        iconName = 'star';
    } else if (currentRating === position - 0.5) {
        iconName = 'star-half';
    }

    const size = designConfig?.icon?.size || 10;
    const color = designConfig?.icon?.color || 'red';
    return (
        <Pressable onPress = {() => {
                onPress(position);
            }
        }>

            <Ionicons
                name = {iconName}
                size = {size}
                color = {color}
            />
        </Pressable>
    )
}

export default function StarSelector({setVariable, designConfig, style, startRating = 0, editable = true}){

    const [rating, setRating] = useState(startRating)
    
    const handleStarPress = (starPosition) => {
        if (editable){
            let newRating;
            if (rating === starPosition && rating != 1) {
                newRating = starPosition - 0.5;
            } else {
                newRating = starPosition
            }
            setRating(newRating);

            if (setVariable){
                setVariable(newRating);
            }
        } else {
            return;
        }
    }

    return(
        <View style = {style}>
            <View style = {{flexDirection:'row'}}>
                {[1,2,3,4,5].map((position) => (
                    <Star
                        key = {position}
                        position = {position}
                        currentRating={rating}
                        onPress={handleStarPress}
                        designConfig = {designConfig}
                    />
                ))}
            </View>
        </View>
    )
}