import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
//hide warning
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();


import SigninRouter from "router/Signin/SigninRouter";
import Root from "router/Root";
import { onAuthStateChanged, User } from '@firebase/auth';
import { FIREBASE_AUTH } from '../../firebaseConfig';

const Stack = createStackNavigator();


export default function index() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('user', user);
            setUser(user);
        });
    }, []);

    return (
        <NavigationContainer>

        <Stack.Navigator
        screenOptions={{
            headerShown: false
          }}>
              {user ? (
                <Stack.Screen name="Root" component={Root} />      
 
              ) : (
                <Stack.Screen name="SigninStack" component={SigninRouter} />
        )}
        
          {/* <Stack.Screen name="Root" component={Root} />       */}
 
        </Stack.Navigator>
        </NavigationContainer>
        
    );

    
};

//router/index.js