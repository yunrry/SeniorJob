import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Home from 'screens/Home/Home';
import Search from 'components/Search';
import SearchResults from 'screens/SearchResults/SearchResults';
import Detail from 'screens/Detail/Detail';
import Recommand from 'screens/Recommand/Recommand';

const Stack = createStackNavigator();

export default function HomeRouter() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{ title: 'Search' }}
            />
            <Stack.Screen
                name="SearchResults"
                component={SearchResults}
                options={{ title: 'Search Results' }}
            />
            <Stack.Screen
                name="DetailScreen"
                component={Detail}
                options={{ title: 'DetailScreen' }}
            />
              <Stack.Screen
                name="RecommandScreen"
                component={Recommand}
                options={{ headerShown: false, title: 'RecommandScreen' }}
            />
        </Stack.Navigator>
    );
}
