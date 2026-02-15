import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
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
  { name: 'Map', component: MapPage, iconName: 'location-sharp' },
  { name: 'Locations', component: LocationListPage, iconName: 'list'},
  { name: 'Countries', component: CountriesPage, iconName: 'flag' }
];


export default function App() {
   
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  const checkLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('logged-in');
      if (value === 'true'){
        setLoggedIn(true);
        setLoggedInUser(await AsyncStorage.getItem('logged-in-user'))
      } else {
        setLoggedIn(false);
        setLoggedInUser(null);
      }
    } catch (e) {
      console.log("Reading Error:", e);
      setLoggedIn(false);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, [] );
 
  console.log(loggedIn)
  return(
    isLoading ? 
    <View style= {styles.container}>
      <ActivityIndicator size="large" color = "lightblue"/>
    </View> : (
      loggedIn 
      ? 
      <NavigationContainer>
        <View style = {styles.container}>
          <FooterMenu 
            pages = {menuPages} 
            colorActive = 'lightblue' 
            colorInactive= 'gray' 
          />
        </View>
        
      </NavigationContainer>
      : (
      <View style = {styles.containerLogin}>
        <LoginPage/>
      </View>
      )
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogin: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#AEF3E7',
  }
}) 