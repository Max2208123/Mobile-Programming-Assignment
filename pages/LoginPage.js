import React, {useState} from 'react';
import { View , Text, TextInput, StyleSheet, Button, Pressable, ActivityIndicator, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByUsername } from '../firebase/FirebaseController';
import { getAuth , signInWithEmailAndPassword , createUserWithEmailAndPassword} from "firebase/auth";

export default function LoginPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const [usernameInput, setUsernameInput] = useState("");
    // const [passwordInput, setPasswordInput] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessageUsername, setErrorMessageUsername] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");

    const [isLogin, setIsLogin] = useState(true)

    const auth = getAuth();

    const handleLogin = async () => {
        setErrorMessagePassword("");
        setErrorMessageUsername("");
        setIsLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("Login Successfull!");
            } else {
                await createUserWithEmailAndPassword(auth,email,password);
                console.log("Registirerung erfolgreich!");
                Alert.alert("Erfolg", "Account erstellt!");
            }
            /*
            const user = await getUserByUsername(usernameInput);
            console.log(user)
            if (!user){
                setErrorMessageUsername("The Username does not exist");
                
                setIsLoading(false);
                return;
            }

            if (user.Password === passwordInput){
                console.log("Login successfull!")
                await AsyncStorage.setItem('logged-in', 'true');
                await AsyncStorage.setItem('logged-in-user', usernameInput);
                if (onLogin) onLogin();
            } else {
                setErrorMessageUsername("Wrong Password")
            } */
        } catch (error) {
            // setErrorMessagePassword("Connection Error... Try again");
            console.error(error);
            if (error.code === 'auth/invalid-email') setErrorMessageUsername("E-Mail invalid");
            else if (error.code === 'auth/user-not-found') setErrorMessageUsername("User does not exist");
            else if (error.code === 'auth/wrong-password') setErrorMessagePassword("Wrong Password");
            else if (error.code === 'auth/email-already-in-use') setErrorMessageUsername("E-Mail already in use");
            else if (error.code === 'auth/weak-password') setErrorMessagePassword("Password too short (min. 6 characters)");
            else setErrorMessagePassword(error.message);
        } finally {
            setIsLoading(false)
        }
    }
    
    return(
        <View style = {styles.containerOuter}>
            <View style = {styles.containerInner}>
                <Text style= {styles.title1}> {isLogin ? "Login" : "Register"} </Text>
                <View style = {styles.containerInputFields}>
                    <View style = {styles.containerInputField}>
                        <TextInput 
                            onChangeText={setEmail}
                            value = {email}
                            placeholder="Enter E-Mail"
                            style = {styles.textInputField}
                            autoCapitalize="none"
                            keyboardType = "email-address"
                        />
                        <Text style= {styles.errorText}>{errorMessageUsername}</Text>
                    </View>
                    <View style = {styles.containerInputField}>
                        <TextInput 
                            onChangeText = {setPassword} 
                            value = {password}
                            placeholder = "Password"
                            secureTextEntry = {true}
                            style = {styles.textInputField}
                        />  
                        <Text style= {styles.errorText}>{errorMessagePassword}</Text>
                    </View> 
                </View>
                <View style = {styles.containerButtons}>
                    <View style = {styles.buttonContainer}>
                        <Pressable style = {styles.pressable} onPress={() => {
                            setIsLogin(!isLogin);
                            setErrorMessagePassword("");
                            setErrorMessageUsername("");
                        }}>
                            <Text style = {styles.pressableText}>{isLogin ? "To Registration" : "To Login"}</Text>
                        </Pressable>
                    </View>
                    <View style = {styles.buttonContainer}>
                        <Pressable style = {styles.pressable} onPress = {handleLogin} disabled = {isLoading}>
                            {isLoading ? <ActivityIndicator color = '#AEF3E7'/> : (
                                <Text style={styles.pressableText}>
                                    {isLogin ? "Login" : "Sign Up"}
                                </Text>
                            )}
                        </Pressable>
                    </View>                   
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInputField: {
        borderWidth: 1,
        fontSize: 24,
        borderRadius: 48,
        borderColor: '#254E70',
        color: '#254E70',
        paddingLeft: 20,
    },
    containerInner: {
        borderColor: '#254E70',
        width: '100%',
        height: '100%',
        borderWidth: 1,
        justifyContent:'center',
        padding: 10,        
    },
    containerOuter: {        
        width : '80%',
        height: '40%',
        backgroundColor: '#8EE3EF',
        alignItems:'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
    },
    title1: {
        fontSize: 32,
        marginBottom: 10,
        marginTop: 20,
    },
    errorText:{
        color: '#C33C54',
        paddingLeft: '8%',
        paddingRight: '8%',
        fontWeight:'bold'
    },
    containerInputField:{
        marginTop: 5
    },
    containerInputFields:{
        marginTop: 10,
        marginBottom: 0,
    },



    buttonContainer:{
        width: '40%',
        marginRight: '5%',   
        marginLeft:'5%' ,
        marginTop: '5%',
    },
    containerButtons:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'end',
    },
    pressable:{
        backgroundColor: '#37718E',
        borderWidth: 1,
        height: 54,
        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pressableText:{
        color: '#AEF3E7',
        fontSize: 14,
    }
})