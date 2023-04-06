import { Stack } from "expo-router";
import { FriendProvider } from "../../../context/friends";
import { StatusBar } from "react-native";

const FriendsLayout = () => {
    return (
        <FriendProvider>
            <Stack screenOptions={{
                headerTransparent: false,
                headerTitleStyle: {
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'white'
                },
                headerStyle: {
                    backgroundColor: 'black'
                },
            }}>

                <Stack.Screen name='friends' options={{
                    title: 'Friends',
                    headerTitleStyle: {
                        color: 'white'
                    }
                }} />
                <Stack.Screen name='myfriends' options={{
                    title: 'My Friends',
                    headerTitleStyle: {
                        color: 'white'
                    }
                }} />
                <Stack.Screen name='find-friends' options={{
                    title: 'Search For Friend',
                    headerTitleStyle: {
                        color: 'white'
                    }
                }} />
            </Stack>
        </FriendProvider>
    )
}

export default FriendsLayout