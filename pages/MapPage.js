import React, { useState, useEffect, useRef } from 'react'; // useRef und useEffect importieren
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import handleLogout from '../functions/handleLogout';
import loadMyLocations from '../functions/loadMyLocations';
export default function MapPage({ route }){

    // const {loggedIn, setLoggedIn, loggedInUser, setLoggedInUser} = useContext(UserContext) 
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);

    const mapRef = useRef(null)

    useEffect(() => {
        loadMyLocations(setLoading, setLocations);
    }, [])

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
        <View>
            <Text> Map Page </Text> 
            <MapView 
                style={styles.map}
                ref = {mapRef}
                initialRegion={{
                    longitude: 25.28528,
                    latitude: 65.0445,
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
            <Text>Test</Text>
            <Button title='Sign Out' onPress={() => handleLogout()}/>
        </View>
    )
} 

const styles = StyleSheet.create({
    map:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})