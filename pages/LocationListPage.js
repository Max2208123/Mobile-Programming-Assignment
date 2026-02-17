import React, {useState, useEffect} from 'react';
import { getFirestore, collection, addDoc , query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { View , Text, Button, ActivityIndicator, FlatList, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import loadMyLocations from '../functions/loadMyLocations';
import addLocation from '../functions/addLocation';
import deleteLocation from '../functions/deleteLocation.js';

import {colors} from '../styling/colors.js';
import AddLocationMask from '../components/AddLocationMask.js';

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

    const DesignConfig = {
        icon: {
            size: 20,
            color: colors.lineColorDark
        }
    }

    return(
        <View style = {styles.componentContainer}>
        {loading ? (
            <ActivityIndicator size = "large" />
        ) : (
            <View style = {styles.flatListContainer}>
                <View style = {addingEntry ? (styles.pageHeaderActive) : (styles.pageHeaderInactive)}>
                    <View style = {styles.flatListHeader}> 
                        <View style = {styles.flatListHeaderText}>
                            <Text style = {styles.headerText}>Your Locations</Text>
                        </View>
                            <View style = {styles.flatListHeaderPressable}>
                            <Pressable onPress={() => {setAddingEntry(!addingEntry)}}
                            >
                                {addingEntry ? (
                                    <View style = {styles.addLocationMask.buttonContainer}>
                                        <Text style = {styles.addLocationMask.buttonText}>Cancel</Text>
                                        <Ionicons
                                            name = 'close-outline'
                                            size = {DesignConfig.icon.size}
                                            color = {colors.backgroundScreen}
                                            style = {styles.addLocationMask.buttonIcon}
                                        />
                                    </View>
                                ) : (
                                    <View style = {styles.addLocationMask.buttonContainer}>
                                        <Text style = {styles.addLocationMask.buttonText}>Add Location</Text>
                                        <Ionicons
                                            name = 'add'
                                            size = {DesignConfig.icon.size}
                                            color = {colors.backgroundScreen}
                                            style = {styles.addLocationMask.buttonIcon}
                                        />
                                    </View>
                                )}
                            </Pressable>
                            </View>
                    </View>
                    {addingEntry ? (
                        <View > 
                            <AddLocationMask designConfig = {DesignConfig} styles={styles.addLocationMask} setLoading={setLoading} setLocations={setLocations} setAddingEntry={setAddingEntry}/>
                        </View>
                    ) : (
                        <View> 
                            
                        </View>
                    )}
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
                                    <Ionicons name = 'star' size = {DesignConfig.icon.size} color = {DesignConfig.icon.color}/>
                                    <Ionicons name = 'star' size = {DesignConfig.icon.size} color = {DesignConfig.icon.color}/>
                                    <Ionicons name = 'star' size = {DesignConfig.icon.size} color = {DesignConfig.icon.color}/>
                                    <Ionicons name = 'star' size = {DesignConfig.icon.size} color = {DesignConfig.icon.color}/>
                                    <Ionicons name = 'star' size = {DesignConfig.icon.size} color = {DesignConfig.icon.color}/>
                                </View>
                                <View style = {styles.pressableContainer}>
                                    <Pressable>
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
                    ListEmptyComponent={<Text>No Locations found.</Text>}
                />  
            </View>  
        )} 
        </View>
    )
}

const styles = StyleSheet.create({

    pageHeaderActive: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.backgroundAccent,
        margin: 5,
        padding: 5,
        backgroundColor: colors.backgroundScreen,
        borderRadius: 10,
    },
    pageHeaderInactive:{
        margin: 5,
        padding: 6,
        borderRadius: 5,
    },
    flatListHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    flatListHeaderText:{
        width: '55%',
        justifyContent: 'center',
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
        padding: 10,
        borderRadius: 10,
        borderColor: colors.lineColorDark,
        backgroundColor: colors.backgroundItem,
        borderWidth: 1,
        borderColor: colors.lineColorDark,
        
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
    },

    pressableContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '15%',
    },
    addLocationMask:{
        componentContainer:{
            margin: 10,
            borderColor: colors.backgroundAccent,
            backgroundColor: colors.backgroundScreen,
        },
        topLineContainer:{
            flexDirection:'row',
            width: '100%',
        },
        titleInputContainer:{
            width: '55%'
        },
        titleInput:{
            margin: 5,
            padding: 5,
            borderBottomWidth: 1,
            marginRight: 5,

        },
        ratingInputContainer:{
            width: '45%',
            alignItems: 'end',
            paddingLeft: 5,
        },
        middleLineContainer:{
        },  
        descriptionInput:{
            borderBottomWidth:1,
            margin: 5,
            padding: 5,
        },      
        header2Text:{
            color: colors.lineColorDark,
            fontWeight: 'bold',
        },
        starSelector:{
            marginTop: 10,
            alignItems: 'center',
        },
        errorText:{
            color: colors.errorRed,
            textAlign: 'left',
            width: '75%',
            paddingRight: 5,
        },
        inputHeaderTopline:{
            flexDirection:'row',
            width: '100%'
        },

        bottomLineContainer:{
            flexDirection:'row',
            alignItems:'right',
            justifyContent:'flex-end',
        },
        buttonContainer:{
            flexDirection:'row',
            borderWidth: 1,
            backgroundColor: colors.backgroundAccent,
            borderRadius: 23,
            padding: 5,
            paddingLeft: 10,
            margin: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText:{
            color: colors.backgroundScreen
        },
        buttonIcon:{
            borderWidth: 1,
            borderRadius: 12,
            borderColor: colors.backgroundScreen,
            marginLeft: 5
        },
    }
})