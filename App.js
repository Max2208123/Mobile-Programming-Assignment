import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import FooterMenu from './components/FooterMenu';
import { useEffect , useState , createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initializeApp} from 'firebase/app';
// Page imports : 

import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import LocationListPage from './pages/LocationListPage';
import CountriesPage from './pages/CountriesPage';

// Context imports :

import { UserContext } from './contexts/Contexts';

/*
const firebaseConfig = {
  apiKey: "AIzaSyBzfSedBgTwuGgFqDr1DNqTjLwA8adO87c",
  authDomain: "mobile-programming-c8111.firebaseapp.com",
  projectId: "mobile-programming-c8111",
  storageBucket: "mobile-programming-c8111.firebasestorage.app",
  messagingSenderId: "903217529740",
  appId: "1:903217529740:web:c70cf265b1e5ab13ef4ca9",
  measurementId: "G-TLY3HLF8W9"
}
const app = initializeApp(firebaseConfig)
*/

const menuPages = [
  { name: 'Map', component: MapPage, iconName: 'location-sharp' },
  { name: 'Locations', component: LocationListPage, iconName: 'list'},
  { name: 'Countries', component: CountriesPage, iconName: 'flag' }
];


export default function App() {

  const onLoginSuccess = async () => {
    const user = await AsyncStorage.getItem('logged-in-user');
    setLoggedInUser(user);
    setLoggedIn(true);
  }

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
      <UserContext.Provider value = {{loggedIn, setLoggedIn, loggedInUser, setLoggedInUser}}>
        <NavigationContainer>
          <FooterMenu 
            pages = {menuPages}  
            colorActive = 'lightblue' 
            colorInactive= 'gray' 
          />
        </NavigationContainer>
      </UserContext.Provider>
      
      : (
      <View style = {styles.containerLogin}>
        <LoginPage onLogin = {onLoginSuccess}/>
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