import React from 'react';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import { AntDesign, FontAwesome, EvilIcons, Entypo } from '@expo/vector-icons'; // Import the icons you want to use
//hide warning
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

//stacks
import HomeStack from "router/Home/HomeRouter";
import MypageStack from "router/Mypage/MypageRouter";
import AllJobStack from "router/AllJob/AllJobRouter";
import SigninStack from "router/Signin/SigninRouter";


// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Root = ({navigation} : RouterProps) => {
    return (
        
        <View style={{flex: 1}}>
            
        <Tab.Navigator
        screenOptions={{
            headerShown: false
          }}
          initialRouteName="홈"
        >
            <Tab.Screen
                name="마이페이지"
                component={MypageStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <EvilIcons name="user" size={size} color={color} /> // Use the AntDesign icon
                    ),
                  }}
            />
            <Tab.Screen
                name="홈"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Tab 2',
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name="home" size={size} color={color} /> // Use the AntDesign icon
                    ),
                  }}
            />
            <Tab.Screen
                name="모두보기"
                component={AllJobStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="list" size={size} color={color}/>// Use the AntDesign icon
                    ),
                  }}
            />
            {/* <Tab.Screen
                name="SettingStack"
                component={SettingStack}
            /> */}
        </Tab.Navigator>
        </View>
  
    );
};

export default Root;

//router/Root.js
  

