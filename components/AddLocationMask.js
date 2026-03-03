import React, {useState } from "react";
import { Pressable, TextInput, View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { geocodeAsync , requestForegroundPermissionsAsync } from 'expo-location';
import StarSelector from "./StarSelector.js";
import { colors } from "../styling/colors.js";

import addLocation from "../functions/addLocation.js";
import editLocation from "../functions/editLocation.js";

const testInputs = (title, setTitleErrorMessage, rating, setRatingErrorMessage, description, setDescriptionErrorMessage, latitude, setLatitudeErrorMessage, longitude, setLongitudeErrorMessage) => {
    
    setTitleErrorMessage('');
    setRatingErrorMessage('');
    setDescriptionErrorMessage('');
    setLongitudeErrorMessage('');
    setLatitudeErrorMessage('');

    if (title.length < 3){
        setTitleErrorMessage('Title too short (min. 3)');
        return false;
    } else if (title.length > 20){
        setTitleErrorMessage('Title too long (max. 20)');
        return false;
    } else if (rating < 1) {
        setRatingErrorMessage('Choose a Rating');
        return false;
    } else if (rating > 5) {
        return false;
    } else if (longitude == '' || latitude == ''){
        if(longitude == ''){
            setLongitudeErrorMessage('required')
        }
        if(latitude == ''){
            setLatitudeErrorMessage('required')
        }
        return false;
    } else if (longitude > 180 || longitude < -180 || latitude > 90 || latitude < -90){
        if(longitude > 180 || longitude < -180){
            setLongitudeErrorMessage('does not exist')
        }
        if(latitude > 180 || latitude < -180){
            setLatitudeErrorMessage('does not exist')
        }
        return false;
    }
    return true;
}

const handleAdding = async (title, setTitleErrorMessage, rating, setRatingErrorMessage, description, setDescriptionErrorMessage, latitude, setLatitudeErrorMessage, longitude, setLongitudeErrorMessage, setLoading, setLocations, setAddingEntry) => {
    
    const correct = testInputs(title, setTitleErrorMessage, rating, setRatingErrorMessage, description, setDescriptionErrorMessage, latitude, setLatitudeErrorMessage, longitude, setLongitudeErrorMessage)
    console.log(correct)
    if (correct){
        addLocation(title, description, rating, latitude, longitude, setLoading, setLocations);
        setAddingEntry(false);
        return;
    } else {
        return
    }

    

};

const handleEditing = async (title, setTitleErrorMessage, rating, setRatingErrorMessage, description, setDescriptionErrorMessage, latitude, setLatitudeErrorMessage, longitude, setLongitudeErrorMessage, setLoading, setLocations, setGetsEdited, item) => {
    
    const correct = testInputs(title, setTitleErrorMessage, rating, setRatingErrorMessage, description, setDescriptionErrorMessage, latitude, setLatitudeErrorMessage, longitude, setLongitudeErrorMessage)
    if (correct) {
        editLocation(title, description, rating, latitude, longitude, setLoading, setLocations, item);
        setGetsEdited(false);
        return;
    } else {
        return;
    }
    
}

export default function AddLocationMask({designConfig, styles, setLoading, setLocations, setAddingEntry, mode = 'add' , startTitle = '', startRating = 0, startLatitude='', startLongitude='', startDescription = '', setGetsEdited, item = 'header'}) {

    const [rating, setRating] = useState(startRating);
    const [title, setTitle] = useState(startTitle);
    const [description, setDescription] = useState(startDescription);
    const [latitude, setLatitude] = useState(startLatitude);    
    const [longitude, setLongitude] = useState(startLongitude);

    const [titleErrorMessage, setTitleErrorMessage] = useState('');
    const [ratingErrorMessage, setRatingErrorMessage] = useState('');
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');
    const [latitudeErrorMessage, setLatitudeErrorMessage] = useState('');
    const [longitudeErrorMessage, setLongitudeErrorMessage] = useState('');



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
                            onChangeText =  {setTitle}
                            onEndEditing = {async (e) => {
                                const text = e.nativeEvent.text;
                                
                                try {
                                    const {status}= await requestForegroundPermissionsAsync();
                                    if (status !== 'granted') return;

                                    const result = await geocodeAsync(text);
                                    if (result && result.length > 0){
                                            setLongitude(parseFloat(result[0].longitude.toString().slice(0,10)));
                                            setLatitude(parseFloat(result[0].latitude.toString().slice(0,10)));
                                    } 
                                }catch (e) {
                                    console.log("An error occured while setting the Location:", e)
                                }
                            }}
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
                <View style = {styles.middleLineContainer}>
                    <View style = {styles.inputHeaderTopline}>                        
                        <Text style = {styles.header3Text}>Latitude:</Text>
                        <Text style = {styles.error3Text}>{latitudeErrorMessage}</Text>
                        <View style = {styles.coordinationInputContainerMiddle}></View>
                        <Text style = {styles.header3Text}>Longitude:</Text>
                        <Text style = {styles.error3Text}>{longitudeErrorMessage}</Text>
                    </View>
                    <View style = {styles.coordinationInputContainer}>
                       <View style = {styles.coordinationInputContainerLeft}>
                            <TextInput
                                style = {styles.coordinationInput}
                                value = {latitude.toString()}
                                onChangeText={(text) => {
                                    const sanitizedText = text.replace(/[^0-9.,\-]/g,'');
                                    setLatitude(sanitizedText);
                                }}
                                keyboardType='decimal-pad'
                            />
                        </View>
                        <View style = {styles.coordinationInputContainerMiddle}>
                        </View>
                        <View style = {styles.coordinationInputContainerRight}>
                            <TextInput
                                style = {styles.coordinationInput}
                                value = {longitude.toString()}
                                onChangeText={(text) => {
                                    const sanitizedText = parseFloat(text.replace(/[^0-9.,\-]/g,''));
                                    setLongitude(sanitizedText);
                                }}
                                keyboardType='decimal-pad'
                            />
                        </View> 
                    </View>
                    
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
                                latitude,
                                setLatitudeErrorMessage,
                                longitude,
                                setLongitudeErrorMessage,
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
                                latitude,
                                setLatitudeErrorMessage,
                                longitude,
                                setLongitudeErrorMessage,
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
