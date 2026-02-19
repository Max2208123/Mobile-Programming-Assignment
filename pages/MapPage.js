import React, { useEffect, useRef } from 'react'; // useRef und useEffect importieren
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import handleLogout from '../functions/handleLogout';

export default function MapPage({ route }){

    // const {loggedIn, setLoggedIn, loggedInUser, setLoggedInUser} = useContext(UserContext) 
    
    const mapRef = useRef(null)

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
            />
            

            
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