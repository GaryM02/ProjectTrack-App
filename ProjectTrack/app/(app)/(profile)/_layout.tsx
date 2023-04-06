import { Stack } from "expo-router";


const ProfileLayout = () => {
    return (
        <Stack screenOptions={{
            headerTransparent: false,
            headerTitleStyle: {
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white'
            },
            headerStyle: {
                backgroundColor: 'black'
            }
        }}>
            <Stack.Screen name='profile' options={{
                title: 'Profile',
                headerTitleStyle: {
                    color: 'white'
                }
            }} />
            <Stack.Screen name='myprofile' options={{
                title: 'My Profile',
                headerTitleStyle: {
                    color: 'white'
                }
            }} />


        </Stack>
    )
}

export default ProfileLayout