import React, { useState } from 'react';
import { View , Text, Pressable, TextInput, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles, DesignConfig } from '../styling/styles';
import { colors } from '../styling/colors';


export default function CountriesPage(){

    const [searching, setSearching] = useState('');
    const [data, setData] = useState('');
    const [textElements, setTextElements] = useState([])



    /*
    const getFlag = async (link) => {
        try{
            const URL = 
        }
    }
    */

    const handleSearchChange = async (text) => {
        try{
            setSearching(text)
            const URL = 'https://restcountries.com/v3.1/name/'+text
            console.log('Fetching URL:', URL)
            const response = await fetch(URL)
            
            if (response.status === 404){
                return;
            }
            if (!response.ok){
                throw new Error(`Response status: ${response.status}`)
            }

            const retrievedData = await response.json();
            setData(retrievedData[0].name.common)
            console.log(retrievedData.length)
            
            let entryArray = [];
            retrievedData.map((element)=> {
                entryArray = [...entryArray,(
                <View key={element.cca3} style={styles.countryItemContainer}>
                    <View style={styles.countryFlagContainerWidth}>
                        <View style={styles.countryFlagSizeContainer}>
                            <Image
                                style= {styles.flagImage}
                                source={{uri: element.flags.png}}
                                resizeMode = 'stretch'
                            />
                        </View>
                    </View>
                    <View style={styles.countryTextContainer}>
                        <Text style={styles.countryText}>{element.name.common}</Text>
                    </View>
                    <View style={styles.countryButtonContainer}>
                        <Pressable 
                            style={styles.countryButtonPressable}
                        >
                            <Ionicons
                                style={styles.countryIcon}
                                name = 'location-outline'
                                size = {DesignConfig.icon.size}
                                color = {DesignConfig.icon.alternativeColor}
                            />
                        </Pressable>
                    </View>
                </View>)]
            });
            setTextElements(entryArray)
            
        }catch (e){
            console.log('An Error occured while fetching the data:',e)
        }finally{
            
        }
    }

    return(
        <View style = {styles.componentContainer}>
            <View style = {styles.flatListContainer}>
                <View style = {styles.pageHeaderInactive}>
                    <View style = {styles.pageHeaderLineBox}>
                        <View style = {styles.pageHeaderLineHeaderContainer}>
                            <Text style = {styles.headerText}>Countries</Text>
                        </View>
                        <View style = {styles.pageHeaderLineSearchbarContainer}> 
                            <View style = {styles.searchBarContainer}>
                                <View style = {styles.searchBarContainerBottomBorder}>
                                    <TextInput
                                        value = {searching}
                                        onChangeText = {text => handleSearchChange(text)}
                                        placeholder = 'Search'
                                        style = {styles.searchBarTextField}
                                    />
                                    <Ionicons
                                        name = 'search'
                                        size = {DesignConfig.icon.size}
                                        color = {DesignConfig.icon.color}
                                        style = {styles.searchBarIcon}
                                    />
                                </View>
                                
                            </View>
                        </View>
                    </View>
                    
                </View>
                <ScrollView>
                    {textElements}
                </ScrollView>
            </View>
        </View>
    )
}