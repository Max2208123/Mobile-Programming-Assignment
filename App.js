import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import FooterMenu from './components/FooterMenu';
import { useEffect , useState , createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Firbase imports: 
import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

// Page imports : 
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import LocationListPage from './pages/LocationListPage';
import CountriesPage from './pages/CountriesPage';

// Context imports :
import { UserContext } from './contexts/Contexts';

const menuPages = [
  { name: 'Map', component: MapPage, iconName: 'location-sharp' },
  { name: 'Locations', component: LocationListPage, iconName: 'list'},
  { name: 'Countries', component: CountriesPage, iconName: 'flag' }
];


export default function App() {

  /*
  const onLoginSuccess = async () => {
    const user = await AsyncStorage.getItem('logged-in-user');
    setLoggedInUser(user);
    setLoggedIn(true);
  }
  */

  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const auth = getAuth();

  /*
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
  */

  /*
  useEffect(() => {
    checkLoggedIn();
  }, [] );
  */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User logged in
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

  }, [])

  console.log(loggedIn)

  return(
    <UserContext.Provider value = {{loggedIn, setLoggedIn, loggedInUser, setLoggedInUser}}>
      {isLoading ? ( 
        <View style= {styles.container}>
          <ActivityIndicator size="large" color = "lightblue"/>
        </View>
      ) : (
        loggedIn ? (
          <NavigationContainer>
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