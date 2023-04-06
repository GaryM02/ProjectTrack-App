import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const Layout = () => {


    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: 'black'
            }

        }}>

            <Tabs.Screen name='index' options={{
                tabBarLabel: "Home",
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons name="ios-home" size={24} color={tabInfo.focused ? "#3390FF" : "white"} />
                    );
                },

            }} />
            <Tabs.Screen name='(projects)' options={{
                tabBarLabel: "Projects",
                tabBarIcon: (tabInfo) => {
                    return (
                        <FontAwesome5 name="project-diagram" size={24} color={tabInfo.focused ? "#3390FF" : "white"} />
                    );
                },
            }} />
            <Tabs.Screen name='(friends)' options={{
                tabBarLabel: "Friends",
                tabBarIcon: (tabInfo) => {
                    return (
                        <FontAwesome5 name="user-friends" size={24} color={tabInfo.focused ? "#3390FF" : "white"} />
                    );
                },
            }} />
            <Tabs.Screen name='(profile)' options={{
                tabBarLabel: "Profile",
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons name="ios-person" size={24} color={tabInfo.focused ? "#3390FF" : "white"} />
                    );
                },
            }} />
        </Tabs>
    )
}
export default Layout;

