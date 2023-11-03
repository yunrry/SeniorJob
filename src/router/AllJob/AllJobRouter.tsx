import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Detail from 'screens/Detail/Detail';
//screens
import AllJob from 'screens/AllJob/AllJob';

const Stack = createStackNavigator();
export default function AllJobRouter() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="AllJob"
                component={AllJob}
            />
            {/* <Stack.Screen
                name="DetailScreen"
                component={Detail}
                options={{ title: 'AllDetailScreen' }}
            /> */}
        </Stack.Navigator>
    );
}