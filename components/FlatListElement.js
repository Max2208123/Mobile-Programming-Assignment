import React, {useState} from 'react';

import {View, Pressable, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import deleteLocation from '../functions/deleteLocation';

import StarSelector from './StarSelector';
import AddLocationMask from './AddLocationMask';

const FlatListElement = ({item, setLoading, setLocations, styles, DesignConfig, isEditing, onEditPress, onCancel}) => {
    
    const [getsEdited, setGetsEdited] = useState(false)

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
                        // setAddingEntry={setGetsEdited}
                        mode = 'edit'
                        startTitle = {item.name}
                        startRating = {item.rating}
                        startDescription= {item.description}
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
                        <StarSelector
                            setVariable = {() => {return}}
                            designConfig= {DesignConfig}
                            style = {styles.addLocationMask.starSelector}
                            startRating = {item.rating}
                            editable = {false}
                        />
                        <View style = {styles.pressableContainer}>
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