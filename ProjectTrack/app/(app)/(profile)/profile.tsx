import { View, Text, Button, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useAuth } from "../../../context/auth";
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'
import Myprofile from './myprofile';


const profile = () => {
    const { signOut } = useAuth();
    const router = useRouter()
    return (
        <View style={styles.container}>


            <Myprofile />

            <View style={{ marginTop: 100 }}>

                <Pressable
                    onPress={() => router.push('/myprofile')}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                        },
                        styles.wrapperCustom,
                    ]}>
                    <Text style={styles.text}>My Profile</Text>
                </Pressable>
                <Pressable
                    onPress={signOut}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                        },
                        styles.wrapperCustom,
                    ]}>
                    <Text style={styles.text}>Sign Out</Text>
                </Pressable>
            </View>

        </View>
    )
}

export default profile


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    wrapperCustom: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 8,
        padding: 6,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
})