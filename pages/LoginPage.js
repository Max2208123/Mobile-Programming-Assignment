import React, {useState} from 'react';
import { View , Text, TextInput, Alert} from 'react-native';
import { getAuth , signInWithEmailAndPassword , createUserWithEmailAndPassword} from "firebase/auth";
import Button from '../components/Button.js'
import {styles, DesignConfig} from "../styling/styles.js" 


export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessageUsername, setErrorMessageUsername] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("" );

    const [isLogin, setIsLogin] = useState(true)

    const leftButtonText = isLogin ? "To Registration" : "To Login"
    const rightButtonText = isLogin ? "Login" : "Register"
    const auth = getAuth();
    const localButtonTextSize = 16;

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
                console.log("Registirerung Successfull!");
                Alert.alert("Success", "Account created!");
            }

        } catch (error) {
            console.error(error);
            if (error.code === 'auth/invalid-email') setErrorMessageUsername("E-Mail invalid");
            else if (error.code === 'auth/user-not-found') setErrorMessageUsername("User does not exist");
            else if (error.code === 'auth/wrong-password') setErrorMessagePassword("Wrong Password");
            else if (error.code === 'auth/email-already-in-use') setErrorMessageUsername("E-Mail already in use");
            else if (error.code === 'auth/weak-password') setErrorMessagePassword("Password too short (min. 6 characters)");
            else if (error.code === 'auth/invalid-credential') setErrorMessagePassword("Username or Password are incorrect");
            else setErrorMessagePassword(error.message);
        } finally {
            setIsLoading(false)
        }
    }
    
    return(
        <View style = {styles.loginPage.containerOuter}>
            <View style = {styles.loginPage.containerInner}>
                <Text style= {styles.loginPage.title1}> {isLogin ? "Login" : "Register"} </Text>
                <View style = {styles.loginPage.containerInputFields}>
                    <View style = {styles.loginPage.containerInputField}>
                        <TextInput 
                            onChangeText={setEmail}
                            value = {email}
                            placeholder="Enter E-Mail"
                            style = {styles.loginPage.textInputField}
                            autoCapitalize="none"
                            keyboardType = "email-address"
                        />
                        <Text style= {styles.loginPage.errorText}>{errorMessageUsername}</Text>
                    </View>
                    <View style = {styles.loginPage.containerInputField}>
                        <TextInput 
                            onChangeText = {setPassword} 
                            value = {password}
                            placeholder = "Password"
                            secureTextEntry = {true}
                            style = {styles.loginPage.textInputField}
                        />  
                        <Text style= {styles.loginPage.errorText}>{errorMessagePassword}</Text>
                    </View> 
                </View>
                <View style = {styles.loginPage.containerButtons}>
                    <View style = {styles.loginPage.buttonContainer}>
                        <Button
                            text = {leftButtonText}
                            iconName = "none"
                            onPressFunction = {() => {
                                setIsLogin(!isLogin);
                                setErrorMessagePassword("");
                                setErrorMessageUsername("");
                            }}
                            buttonTextSize = {localButtonTextSize}
                        />
                    </View>
                    <View style = {styles.loginPage.buttonContainer}>

                        <Button
                            text = {rightButtonText}
                            iconName = "none"
                            onPressFunction = {handleLogin}
                            diable = {isLoading}
                            buttonTextSize = {localButtonTextSize}
                        />
                    </View>                   
                </View>
            </View>
        </View>
    )
}
