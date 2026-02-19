import React, { useState, useCallback, useEffect, useRef } from 'react'; // useRef und useEffect importieren
import {useFocusEffect} from '@react-navigation/native';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator, FlatList, Pressable } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import handleLogout from '../functions/handleLogout';
import loadMyLocations from '../functions/loadMyLocations';
import { styles , DesignConfig} from '../styling/styles.js';
import { getFirestore, collection, addDoc , query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Header from '../components/Header.js';
import Button from '../components/Button.js';
import { useNavigation } from '@react-navigation/native';


const handleAddLocation = (navigation) => {
    navigation.navigate('Locations', {
        addingLocation: true,
    });
};

const handleFindCountry = (navigation) => {
    navigation.navigate('Countries', {
        findingCountry: true,
    });
};

export default function MapPage({ route }){

    const db = getFirestore();
    const auth = getAuth();

    const user = auth.currentUser;
    const userName = (user.email).split('@')[0]
    // const {loggedIn, setLoggedIn, loggedInUser, setLoggedInUser} = useContext(UserContext) 
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const mapRef = useRef(null)

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            loadMyLocations(setLoading, setLocations);

            return () => {

            };
        }, [])
    );

    useEffect(() => {
        if (route.params?.latitude && route.params?.longitude && route.params?.delta) {
            const { latitude, longitude, delta} = route.params;
            mapRef.current.animateToRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: delta[0],
                longitudeDelta: delta[1],
            }, 1000)
        }
    }, [route.params])

    return(
        <View style = {styles.mapTopLevelContainer}> 
            <Header
                key = 'header'
                title='Map Page'
            />
            <Text style= {styles.header2Text}>Welcome back, {userName}</Text>
            <View style= {styles.mapOuterContainer}>
                <View style= {styles.mapContainer}>
                    <MapView 
                        style={[styles.map]}
                        ref = {mapRef}
                        initialRegion={{
                            latitude: 65.0445,
                            longitude: 25.28528,
                            latitudeDelta: 20,
                            longitudeDelta: 20,
                        }}
                    >
                        {locations.map((location) => {
                            const latitude = location.latitude;
                            const longitude = location.longitude;

                            if (!isNaN(latitude) && !isNaN(longitude)){
                                return (
                                    <Marker
                                        key = {location.id}
                                        coordinate = {{ latitude: latitude, longitude: longitude}}
                                        title = {location.name}
                                        description = {location.description}
                                    />
                                )
                            } return null;
                        })}
                    </MapView>
                </View>
                
            </View>
            <View style = {{flexDirection: 'row', width: '100%'}}>
                <View style = {{width: '50%', justifyContent:'flex-start', flexDirection: 'row'}}>
                    <View>
                        <Button
                            text = 'Find Country'
                            iconName = 'flag-outline'
                            onPressFunction={() => {handleFindCountry(navigation)}}                    
                        />
                    </View>
                </View>
                <View style = {{width: '50%', justifyContent:'flex-end', flexDirection: 'row'}}>
                    <View>
                        <Button
                            text = 'Add Location'
                            iconName = 'add'
                            onPressFunction={() => {handleAddLocation(navigation)}}
                        />
                    </View>
                </View>
                
            </View>
        </View>
    )
} 