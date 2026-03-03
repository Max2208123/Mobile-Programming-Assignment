import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import FooterMenu from './components/FooterMenu';
import { useEffect , useState , createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firbase imports: 
import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { auth } from './firebase/Config' ;

// Page imports : 
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import LocationListPage from './pages/LocationListPage';
import CountriesPage from './pages/CountriesPage';

// Context imports :
import { UserContext } from './contexts/Contexts';

// Style imports:
import { colors } from './styling/colors';

const menuPages = [
  { name: 'Map', component: MapPage, iconName: 'location-sharp' },
  { name: 'Locations', component: LocationListPage, iconName: 'list'},
  { name: 'Countries', component: CountriesPage, iconName: 'flag' }
];

export default function App() {


  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkStorageAndAuth = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('username');
        if (savedUser) {
          setLoggedInUser(savedUser);
          setLoggedIn(true)
        }
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setLoggedInUser(user.email);
            setLoggedIn(true);
          } else {
            setLoggedInUser(null);
            setLoggedIn(false);
          }
          setIsLoading(false);
        });
        return unsubscribe;
      } catch(e) {
        setIsLoading(false)
      }  
    };
    checkStorageAndAuth();
    /*
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User detected:", user.email);
        setLoggedInUser(user.email);
        setLoggedIn(true)
      } else {
        setLoggedInUser(null);
        setLoggedIn(false)
      }
      setIsLoading(false);
    });

    return unsubscribe;
    */
  }, [])

  console.log(loggedIn)

  return(
    <UserContext.Provider value = {{loggedIn, setLoggedIn, loggedInUser, setLoggedInUser}} style = {{backgroundColor: colors.backgroundColor}}>
      {isLoading ? ( 
        <View style= {styles.container}>
          <ActivityIndicator size="large" color = "lightblue"/>
        </View>
      ) : (
        loggedIn ? (
          <NavigationContainer style =  {styles.container}>
            <FooterMenu 
              pages = {menuPages}  
              colorActive = 'lightblue' 
              colorInactive= 'gray' 
            />
          </NavigationContainer>
        ) : (
          <View style = {styles.containerLogin}>
            <LoginPage />
          </View>
        )
      )}
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEF3E7',
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