import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Mypage from 'screens/Mypage/Mypage';

const Stack = createStackNavigator();
export default function MypageRouter() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Mypage"
                component={Mypage}
            />
        </Stack.Navigator>
    );
}