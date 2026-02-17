import React, {useState, useEffect} from 'react';
import { getFirestore, collection, addDoc , query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { View , Text, Button, ActivityIndicator, FlatList, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import loadMyLocations from '../functions/loadMyLocations';
import addLocation from '../functions/addLocation';
import deleteLocation from '../functions/deleteLocation.js';

import {colors} from '../styling/colors.js'


export default function LocationListPage(){

    const db = getFirestore();
    const auth = getAuth();

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);

    const [addingEntry, setAddingEntry] = useState(false);

/*
    const addLocation = async (locationName, description) => {
        const user = auth.currentUser;
        
        if (!user) {
            console.error("Kein User eingeloggt!");
            return;
        }

        try {
            await addDoc(collection(db, "locations"), {
                name: locationName,
                description: description,
                userId: user.uid,
                createdAt: new Date()
            })
            console.log("Saved");
            loadMyLocations();
        } catch (e) {
            console.error("Fehler beim Speichern:", e);
        }
    }

    const loadMyLocations = async () => {
        const user = auth.currentUser;
        if (!user) return;

        setLoading(true)
        try {
            const loactionsRef = collection(db, "locations");

            const q = query(loactionsRef, where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);

            const myData = [];
            querySnapshot.forEach((doc) => {
                myData.push({ id: doc.id, ...doc.data() });
            });
            setLocations(myData)
            console.log("Meine Locations:", myData);
        } catch (e) {
            console.error("Error while loading:", e)
        } finally {
            setLoading(false);
        }
    }
*/
    useEffect(() => {
        loadMyLocations(setLoading, setLocations);
    }, [] );


    const iconWidth = 20
    return(
        <View style = {styles.componentContainer}>
        {loading ? (
            <ActivityIndicator size = "large" />
        ) : (
            <View style = {styles.flatListContainer}>
                <View style = {styles.flatListHeader}>
                    <View style = {styles.flatListHeaderText}>
                    <Text style = {styles.headerText}>Your Locations</Text>
                    </View>
                    <View style = {styles.flatListHeaderPressable}>
                        <Pressable style = {styles.pressableHeader}>
                            <Text>Add Location</Text>
                            <Ionicons
                                name = 'add'
                                size = {iconWidth}
                            />
                        </Pressable>
                    </View>
                </View>
                <FlatList
                    style = {styles.flatList}
                    data = {locations}
                    keyExtractor = {(item) => item.id}
                    renderItem={({item}) => (
                        <View style = {styles.flatListElementContainer}>
                            <View style =  {styles.flatListItemTopRow}>
                                <View style = {styles.textContainer}>
                                    <Text style = {styles.headerText}>{item.name}</Text>
                                </View>
                                <View style = {styles.starContainer}>
                                    <Ionicons name = 'star' size = {iconWidth}/>
                                    <Ionicons name = 'star' size = {iconWidth}/>
                                    <Ionicons name = 'star' size = {iconWidth}/>
                                    <Ionicons name = 'star' size = {iconWidth}/>
                                    <Ionicons name = 'star' size = {iconWidth}/>
                                </View>
                                <View style = {styles.pressableContainer}>
                                    <Pressable>
                                        <Ionicons name = 'settings' size = {iconWidth}/>
                                    </Pressable>
                                    <Pressable onPress = {() => deleteLocation(item.id, setLoading, setLocations)}>
                                        <Ionicons name = 'trash' size = {iconWidth}/>
                                    </Pressable>
                                </View>

                            </View>
                            <Text style = {styles.descriptionText}>{item.description}</Text>
                        </View>
                    )}
                    ListEmptyComponent={<Text>No Locations found.</Text>}
                />  
            </View>  
        )} 
            <Button 
                title = 'loadMyLocations' 
                onPress= {loadMyLocations}
            />
            <Button 
                title = 'addLocation' 
                onPress =  {() => {
                        const newCount = locations.length + 1;
                        addLocation(`Test ${newCount}`, '1234 Test', setLoading, setLocations);
                }}/>
        </View>
    )
}

const styles = StyleSheet.create({

    flatListHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    flatListHeaderText:{
        width: '55%',
        justifyContent: 'flex-start',
        alignItems: ''
    },
    flatListHeaderPressable:{
        width: '45%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    pressableHeader: {
        alignItems: 'flex-end', 
        flexDirection: 'row', 
        justifyContent:'center',
    },
    flatList: {

    },
    flatListContainer:{
        alignItems: 'center',
        margin: 20,        
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: colors.lineColorDark,
        backgroundColor: colors.backgroundItem,
        
    },
    componentContainer:{
        backgroundColor: colors.backgroundScreen,
    },    
    flatListElementContainer:{
    },
    flatListItemTopRow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderTopWidth: 1,
    },

    textContainer:{
        width: '55%',
        paddingRight: '5%',
    },
    headerText:{
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.lineColorDark,
    },
    descriptionText:{
        fontSize: 14,
        color: colors.lineColorDark,

    },

    starContainer: {
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'center',
        borderWidth: 1,
    },

    pressableContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '15%',
        borderWidth: 1,
    },

    
})