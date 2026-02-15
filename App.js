import { StyleSheet, Text, View } from 'react-native';
import FooterMenu from './components/FooterMenu';
import { useEffect , useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Page imports : 

import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import LocationListPage from './pages/LocationListPage';
import CountriesPage from './pages/CountriesPage';


const menuPages = [
  {
    name: 'Map',
    component: MapPage,
    iconName: 'location-sharp'
  },
  {
    name: 'Locations',
    component: LocationListPage,
    iconName: 'list'
  },
  {
    name: 'Countries',
    component: CountriesPage,
    iconName: 'flag'
  }
];



export default function App() {
  return(
    <NavigationContainer>
      <FooterMenu 
        pages = {menuPages} 
        colorActive = 'lightblue' 
        colorInactive= 'gray' 
      />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})