import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';

import {View, Pressable, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import deleteLocation from '../functions/deleteLocation';

import StarSelector from './StarSelector';
import AddLocationMask from './AddLocationMask';

const handleNavigation = (item, navigation, delta) => {
    
    if (item.latitude && item.longitude){
        //console.log(item.latitude)
        //console.log(item.longitude)
        navigation.navigate('Map', {
            latitude: item.latitude,
            longitude: item.longitude,
            delta: delta,
        });
    }
}

const FlatListElement = ({item, setLoading, setLocations, styles, DesignConfig, isEditing, onEditPress, onCancel}) => {
    
    const navigation = useNavigation();

    return(
        <View>
            <View style = {styles.flatListElementContainer}>
            {isEditing ? (
                <View style = {styles.listElementHeaderActive}>
                    <AddLocationMask 
                        designConfig = {DesignConfig} 
                        styles={styles.addLocationMask} 
                        setLoading={setLoading} 
                        setLocations={setLocations} 
                        mode = 'edit'
                        startTitle = {item.name}
                        startRating = {item.rating}
                        startDescription = {item.description}
                        startLatitude = {item.latitude}
                        startLongitude = {item.longitude}
                        setGetsEdited={onCancel}
                        item = {item}
                    /> 
                </View>
            ) : (
                <View style = {{margin: 5,marginLeft: 10, marginRight: 10}}>
                    <View style = {styles.flatListItemTopRow}>
                        <View style = {styles.textContainer}>
                            <Text style = {styles.headerText}>{item.name}</Text>
                        </View>
                        <View style = {styles.starSelectorContainer}>
                            <StarSelector
                                setVariable = {() => {return}}
                                designConfig= {DesignConfig}
                                style = {styles.addLocationMask.starSelector}
                                startRating = {item.rating}
                                editable = {false}
                            />
                        </View>
                        <View style = {styles.pressableContainer}>
                            <Pressable onPress = {() => handleNavigation(item, navigation, [2,2])} >
                                <Ionicons name = 'location' size = {DesignConfig.icon.size} color = {DesignConfig.icon.color}/>
                            </Pressable>
                            <Pressable onPress = {onEditPress}>
                                <Ionicons name = 'settings' size = {DesignConfig.icon.size} color = {DesignConfig.icon.color}/>
                            </Pressable>
                            <Pressable onPress = {() => deleteLocation(item.id, setLoading, setLocations)}>
                                <Ionicons name = 'trash' size = {DesignConfig.icon.size} color = {DesignConfig.icon.color}/>
                            </Pressable>
                        </View>
                    </View>
                    <Text style = {styles.descriptionText}>{item.description}</Text>
                </View>
            )}
                
            </View>
        </View>
    )
}

export default FlatListElement;