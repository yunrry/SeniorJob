import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Signin from 'screens/Signin/Signin';
// import Login from 'screens/Signin/Login';

const Stack = createStackNavigator();
export default function SigninRouter() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Singin"
                component={Signin}
            />
        </Stack.Navigator>
    );
}