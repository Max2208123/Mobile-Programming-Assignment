import React, {useState, useEffect} from 'react';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { View , Text, ActivityIndicator, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import loadMyLocations from '../functions/loadMyLocations';

import {colors} from '../styling/colors.js';
import {styles, DesignConfig} from '../styling/styles.js';

import AddLocationMask from '../components/AddLocationMask.js';
import StarSelector from '../components/StarSelector.js';
import FlatListElement from '../components/FlatListElement.js';
import Header from '../components/Header.js';


export default function LocationListPage({route}){

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);

    const [activeAction, setActiveAction] = useState(null);

    useEffect(() => {
        loadMyLocations(setLoading, setLocations);
    }, [] );

    useEffect(() => {
        if (route.params?.addingLocation){
            const {addingLocation} = route.params;
            if (addingLocation){
                setActiveAction({type:'add'})
            }
        }
    }, [route.params])

    const renderHeader = () => (
        <View style = {activeAction?.type === 'add' ? styles.pageHeaderActive : styles.pageHeaderInactive}>
            <View style = {styles.flatListHeader}>
                <View style = {styles.flatListHeaderText}>
                    <Text style = {styles.headerText}>Your Locations</Text>
                </View>
                <View style = {styles.flatListHeaderPressable}>
                    <Pressable onPress={() => {
                        setActiveAction(activeAction?.type === 'add' ? null : {type:'add'});
                    }}>
                        {activeAction?.type === 'add' ? (
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
            {activeAction?.type === 'add' ? (
                <View>
                    <AddLocationMask 
                        designConfig = {DesignConfig} 
                        styles={styles.addLocationMask} 
                        setLoading={setLoading} 
                        setLocations={setLocations} 
                        setAddingEntry={() => setActiveAction(null)}/>
                </View>
            ) : (
                <View></View>
            )}
        </View>
    );

    return(
        <View style = {styles.viewTopLevelContainer}>
            <Header
                title = 'Locations'
            />
        {loading ? (
            <ActivityIndicator size = "large" />
        ) : (  
            <View style = {styles.flatListContainer}>         
                <FlatList
                    style = {styles.flatList}
                    data = {locations}
                    keyExtractor = {(item) => item.id}
                    ListHeaderComponent={renderHeader}
                    renderItem={({item}) => (
                        <FlatListElement
                            item = {item}
                            setLoading = {setLoading}
                            setLocations = {setLocations}
                            styles = {styles}
                            DesignConfig = {DesignConfig}
                            isEditing = {activeAction?.type === 'edit' && activeAction?.id === item.id}
                            onEditPress = {() => setActiveAction({type: 'edit', id: item.id})}
                            onCancel={() => setActiveAction(null)}
                        />
                    )}
                    ListEmptyComponent={<Text>No Locations found.</Text>}
                />
            </View>
                
            
        )}
        </View>
    )
}