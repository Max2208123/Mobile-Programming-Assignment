import React from 'react';
import { View , Text, Button, Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';


import handleLogout from '../functions/handleLogout';


export default function MapPage(){

    // const {loggedIn, setLoggedIn, loggedInUser, setLoggedInUser} = useContext(UserContext) 
    
    return(
        <View>
            <Text> Map Page </Text> 
            <MapView style={styles.map}>
            

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