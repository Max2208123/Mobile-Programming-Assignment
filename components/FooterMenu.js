import {createBottomTabNavigator} from  '@react-navigation/bottom-tabs';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'

/*
const Tab = createBottomTabNavigator();

export default function FooterMenu(){
    return(
        <Tab.Navigator>
            <Tab.Screen name = 'Home' component={HomeScreen} />
            <Tab.Screen name = 'Profile' component={ProfileScreen} />
        </Tab.Navigator>
    )
};
*/

const Tab = createBottomTabNavigator();

function createNavigatorItems({pages}) {
    const elements = pages.map((element) => (
        <Tab.Screen 
            key = {element.name}
            name = {element.name} 
            component = {element.component}
            options = {{
                tabBarIcon: ({color, size}) => (
                    <Ionicons
                        name = {element.iconName}
                        size = {size}
                        color = {color}
                    />
                ),
            }}
        />
    ));
    return(
        elements
    ) 
}

export default function FooterMenu({pages, colorActive, colorInactive}){
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colorActive,
                tabBarInactiveTintColor: colorInactive
            }}
        >
            {createNavigatorItems({pages})}   
        </Tab.Navigator>
    )
};

