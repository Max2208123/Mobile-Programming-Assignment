import React, {useState, useContext, createContext} from "react";
import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import StarSelector from "./StarSelector.js";
import { colors } from "../styling/colors.js";

import addLocation from "../functions/addLocation.js";
import editLocation from "../functions/editLocation.js";

const handleAdding = async (title, setTitleErrorMessage, rating, setRatingErrorMessage, description, setDescriptionErrorMessage, setLoading, setLocations, setAddingEntry) => {

    setTitleErrorMessage('');
    setRatingErrorMessage('');
    setDescriptionErrorMessage('');

    if (title.length < 3){
        setTitleErrorMessage('Title too short (min. 3)');
        return;
    } else if (title.length > 20){
        setTitleErrorMessage('Title too long (max. 20)');
        return;
    } else if (rating < 1) {
        setRatingErrorMessage('Choose a Rating');
        return;
    } else if (rating > 5) {
        return;
    };
    addLocation(title, description, rating, setLoading, setLocations);
    setAddingEntry(false);
    return;

};

const handleEditing = async (title, setTitleErrorMessage, rating, setRatingErrorMessage, description, setDescriptionErrorMessage, setLoading, setLocations, setGetsEdited, item) => {
    setTitleErrorMessage('');
    setRatingErrorMessage('');
    setDescriptionErrorMessage('');

    if (title.length < 3){
        setTitleErrorMessage('Title too short (min. 3)');
        return;
    } else if (title.length > 20){
        setTitleErrorMessage('Title too long (max. 20)');
        return;
    } else if (rating < 1) {
        setRatingErrorMessage('Choose a Rating');
        return;
    } else if (rating > 5) {
        return;
    };
    editLocation(title, description, rating, setLoading, setLocations, item);
    setGetsEdited(false);

    return;
}

export default function AddLocationMask({designConfig, styles, setLoading, setLocations, setAddingEntry, mode = 'add' , startTitle = '', startRating = 0, startDescription = '', setGetsEdited, item = 'header'}) {

    const [rating, setRating] = useState(startRating);
    const [title, setTitle] = useState(startTitle);
    const [description, setDescription] = useState(startDescription);

    console.log(rating)
    // Error Messages:
    const [titleErrorMessage, setTitleErrorMessage] = useState('');
    const [ratingErrorMessage, setRatingErrorMessage] = useState('');
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');

    return(
        <View>
            <View style={styles.componentContainer}>
                {mode === 'edit' ? (
                    <View>
                        <View style = {styles.bottomLineContainer}>
                            <Pressable onPress = {() => setGetsEdited(false)} >
                                <View style = {styles.buttonContainer}>
                                <Text style = {styles.buttonText}>Cancel</Text>
                                <Ionicons
                                    name = 'close-outline'
                                    size = {designConfig.icon.size}
                                    color = {colors.backgroundScreen}
                                    style = {styles.buttonIcon}
                                />
                                </View>
                            </Pressable>
                        </View>
                    </View>
                ) : (
                    <View></View>
                )}
                <View style= {styles.topLineContainer}>
                    <View style = {styles.titleInputContainer}>
                        <View style = {styles.inputHeaderTopline}>
                            <Text style = {styles.header2Text}>Title:</Text>
                            <Text style = {styles.errorText}>{titleErrorMessage}</Text>
                        </View>
                        <TextInput
                            style = {styles.titleInput}
                            value = {title}
                            onChangeText = {setTitle}
                            placeholder = 'Add Location Title'
                        />
                    </View>
                    <View style = {styles.ratingInputContainer}>
                        <View style = {styles.inputHeaderTopline}>
                            <Text style = {styles.header2Text}>Rating:</Text>
                            <Text style = {styles.errorText}>{ratingErrorMessage}</Text>
                        </View>
                        <StarSelector
                            setVariable = {setRating}
                            designConfig = {designConfig}
                            style = {styles.starSelector}
                            startRating = {mode === 'edit'?rating:0}

                        />
                    </View>
                </View>
                <View style = {styles.middleLineContainer}>
                    <View style = {styles.inputHeaderTopline}>
                        <Text style = {styles.header2Text}>Description:</Text>
                        <Text style = {styles.errorText}>{descriptionErrorMessage}</Text>
                    </View>
                    <TextInput
                        style = {styles.descriptionInput}
                        value = {description}
                        onChangeText = {setDescription}
                        placeholder="Add Location Description"
                    />
                </View>
                <View style = {styles.bottomLineContainer}>
                    <Pressable onPress = {() => {
                        if (mode === 'add'){
                            handleAdding(
                                title,
                                setTitleErrorMessage,
                                rating,
                                setRatingErrorMessage,
                                description,
                                setDescriptionErrorMessage,
                                setLoading,
                                setLocations,
                                setAddingEntry
                        )} else if (mode === 'edit') {
                            handleEditing(
                                title,
                                setTitleErrorMessage,
                                rating,
                                setRatingErrorMessage,
                                description,
                                setDescriptionErrorMessage,
                                setLoading,
                                setLocations,
                                setGetsEdited,
                                item
                            )
                        } else {
                            return
                        }
                    }}>
                        <View style={styles.buttonContainer}>
                            <Text style = {styles.buttonText}>{mode === 'add' ? 'Add Location' : 'Save Changes'}</Text>
                            <Ionicons
                                name = {mode === 'add' ? 'add' : 'checkmark-outline'}
                                size = {designConfig.icon.size}
                                color = {colors.backgroundScreen}
                                style = {styles.buttonIcon}
                            /> 
                        </View>
                        
                    </Pressable>
                </View>
            </View>
        </View>
    )
    
}
