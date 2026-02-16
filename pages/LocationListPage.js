import React from 'react';
import { getFirestore, collection, addDoc , query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { View , Text } from 'react-native';



export default function LocationListPage(){

    return(
        <View>
            <Text> Location List Page </Text>
        </View>
    )
}