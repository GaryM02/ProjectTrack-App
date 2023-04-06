import { Stack } from "expo-router";
import React from 'react'


const AuthLayout = () => {
    return (
        <Stack screenOptions={{
            headerTransparent: true,
        }}>
            <Stack.Screen name='sign-in' options={{
                title: 'Sign In',
                headerTitleStyle: {
                    color: 'white'
                }
            }} />
            <Stack.Screen name='sign-up' options={{
                title: 'Sign Up',
                headerTitleStyle: {
                    color: 'white'
                }
            }} />

        </Stack>
    )
}

export default AuthLayout